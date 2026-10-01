// Executes actual app methods with explicit DOM/storage/PDF sinks.
// This is NOT a rendered browser test, a PDF layout test, or engineering validation.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html = readFileSync(new URL('../FDG-FP-HydroCal.html', import.meta.url), 'utf8');
const declaration = name => {
  const match = html.match(new RegExp('^const '+name+' = \\{[\\s\\S]*?^\\};','m'));
  assert.ok(match, name);
  return match[0];
};
function fixture(values = {}) {
  const nodes = new Map(), storage = new Map(), pdfText = [], toasts = [];
  const node = id => {
    if(!nodes.has(id)) nodes.set(id, {
      id, value:String(values[id] ?? ''), style:{}, innerHTML:'', textContent:'',
      getAttribute:()=>null, closest:()=>null
    });
    return nodes.get(id);
  };
  const numbers = Object.keys(values).map(node);
  const selected = ['Project Info','Hydraulic','Fire Pump','Hose Reel'];
  const sink = new Proxy({
    text:t=>pdfText.push(String(t)), getNumberOfPages:()=>1,
    splitTextToSize:t=>[String(t)], save:name=>{context.savedPDF=name;}
  }, {get:(target,key)=>target[key] || (()=>{})});
  const context = vm.createContext({
    document:{querySelectorAll:()=>selected.map(value=>({value}))},
    $:node, qsa:selector=>selector.includes('input[type="number"]')?numbers:[],
    localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},
    sessionStorage:{getItem:()=>null}, console,
    toast:(...args)=>toasts.push(args), showModal:(title,body)=>{context.modal=body;},
    window:{jspdf:{jsPDF:function(){return sink;}}},
    FIRE_CODES:[{id:'diagnostic',name:'Diagnostic',params:{velocityMax:32}}],
    HAZARDS:{light:{}}, OCCUPANCIES:[],
    Chart:function(canvas,config){context.lastChart=config;this.destroy=()=>{};},
    HYDROCAL_METHOD_VERSION:'2026-10-01.1'
  });
  const utils = html.slice(html.indexOf('const numVal ='),html.indexOf('// Remediation version'));
  const pipe = html.match(/^const PIPE_DATA = \{[\s\S]*?^\};\r?\nconst PIPE_SIZES_SORTED = [^\r\n]+/m)[0];
  vm.runInContext(utils+'\n'+pipe+'\n'+['Eng','App','Hydraulic','FirePump','PipeSizing','HoseReel','Reports'].map(declaration).join('\n')+
    '\nglobalThis.api={Eng,App,Hydraulic,FirePump,PipeSizing,HoseReel,Reports,validateInputs};',context);
  const {App}=context.api;
  App.state=App.getDefaultState(); App.state.fireCode='diagnostic';
  // Rendering unrelated dashboard/navigation is excluded; calculation/result logic is real.
  for(const method of ['renderHomeStats','updateProgress','logCalculation','restoreFormValues']) App[method]=()=>{};
  return {...context.api,context,node,numbers,storage,pdfText,toasts};
}
const hydValues={hydQ:200,hydC:120,hydD:4.026,hydL:0,hydFittings:0,hydElev:0};
const fpValues={fpFlow:500,fpHead:100,fpEfficiency:80,fpSafety:15,fpSuction:0,fpType:'electric'};
test('Actual Hydraulic.calculate retains zero and rejects missing/nonfinite source evidence',()=>{
  for(const source of [0,null,undefined,NaN,-1]){
    const f=fixture(hydValues); f.App.state.waterSupply.staticPressure=source; f.Hydraulic.calculate();
    assert.equal(f.App.state.calculations.hydraulic.residualP, source===0?0:null);
    assert.equal(f.App.state.calculations.hydraulic.requirementOutcome,'insufficient-evidence');
    assert.doesNotMatch(f.node('hydraulicCalcOutput').innerHTML,/All hydraulic parameters acceptable/);
  }
});
test('Actual Hydraulic.calculate retains adverse pressure despite passing velocity; PDF carries FAIL',async()=>{
  const f=fixture({...hydValues,hydElev:300}); f.App.state.waterSupply.staticPressure=80; f.Hydraulic.calculate();
  const result=f.App.state.calculations.hydraulic;
  assert.ok(Math.abs(result.residualP+49.9)<1e-9);
  assert.equal(result.velOk,true); assert.equal(result.requirementOutcome,'fail');
  assert.match(f.node('hydraulicCalcOutput').innerHTML,/FAIL — adverse/);
  await f.Reports.generatePDF();
  assert.match(f.pdfText.join('\n'),/FAIL - review required/);
});
test('Main pump, illustrative curve and jockey use converted pressure; NPSH remains unassessed',()=>{
  const f=fixture(fpValues);
  // A select control is not a numeric form input.
  f.numbers.splice(f.numbers.findIndex(n=>n.id==='fpType'),1);
  f.FirePump.calculate(); const r=f.App.state.calculations.firePump;
  assert.ok(Math.abs(r.bhp-36.458333333333336)<1e-9);
  assert.equal(r.headFt,231); assert.equal(r.npshA,null);
  assert.equal(r.npshStatus,'insufficient-evidence');
  assert.match(f.node('pumpCalcOutput').innerHTML,/231.00 ft/);
  assert.doesNotMatch(f.node('pumpCalcOutput').innerHTML,/PASS/);
  assert.ok(Math.abs(f.context.lastChart.data.datasets[1].data[10]-r.bhp)<1e-9);
  assert.match(f.context.lastChart.options.plugins.title.text,/Illustrative/);
  f.FirePump.calcJockey();
  const expected=f.Eng.pumpBHPFromPsi(5,115,60).toFixed(2);
  assert.ok(f.context.modal.includes('BHP = '+expected+' HP'));
  assert.match(f.context.modal,/2.31 ft\/psi/);
  assert.doesNotMatch(f.context.modal,/Design Per NFPA/);
});
test('Actual numeric validator rejects blank/nonfinite and preserves explicitly entered zero',()=>{
  const f=fixture({n:''});
  assert.equal(f.validateInputs('fixture'),false);
  f.node('n').value='Infinity'; assert.equal(f.validateInputs('fixture'),false);
  f.node('n').value='0'; assert.equal(f.validateInputs('fixture'),true);
});
test('PipeSizing renders no feasible candidate with no green recommendation',()=>{
  const f=fixture({psFlow:10000,psMaxVel:1,psCFactor:120});
  f.node('psUnit').value='in'; f.PipeSizing.calculate();
  assert.equal(f.App.state.calculations.pipeSize.recommended,null);
  assert.match(f.node('pipeSizeOutput').innerHTML,/No feasible size/);
  assert.doesNotMatch(f.node('pipeSizeOutput').innerHTML,/tag-pass/);
});
test('New result archives original numbers; material input invalidation blocks draft export',()=>{
  const f=fixture(hydValues);
  f.App.state.calculations.hydraulic={residualP:80,legacyMarker:'preserve'};
  f.Hydraulic.calculate();
  assert.equal(f.App.state.calculationRevisions[0].result.residualP,80);
  assert.equal(f.App.state.calculationRevisions[0].result.legacyMarker,'preserve');
  assert.equal(f.App.canExportDraft(),true);
  f.App.markResultsForReview('Input changed',['hydraulic']);
  assert.equal(f.App.canExportDraft(),false);
});
test('Reload preserves legacy answers, stores original JSON and requires explicit recalculation',()=>{
  const f=fixture(); const saved=f.App.getDefaultState();
  saved.calculations.firePump={bhp:15.782828,legacyMarker:'preserve'};
  const raw=JSON.stringify(saved); f.storage.set('fdg_fp_state_v2',raw);
  f.App.loadState();
  assert.equal(f.App.state.calculations.firePump.bhp,15.782828);
  assert.equal(f.App.state.calculations.firePump.requiresRecalculation,true);
  assert.equal(f.storage.get('fdg_fp_pre_remediation_2026_10_01'),raw);
  assert.equal(f.App.canExportDraft(),false);
});
test('Failed preservation backup prevents overwriting the original local project',()=>{
  const f=fixture(); const raw=JSON.stringify(f.App.getDefaultState());
  f.storage.set('fdg_fp_state_v2',raw);
  f.context.localStorage.setItem=()=>{throw new Error('Storage full');};
  f.App.loadState(); f.App.state.project.name='New work'; f.App.saveState();
  assert.equal(f.storage.get('fdg_fp_state_v2'),raw);
  assert.match(f.node('autoSaveStatus').textContent,/original retained/);
});
test('Actual PDF method emits draft, unknown NPSH and unknown pressure without approval claims',async()=>{
  const f=fixture(fpValues); f.numbers.splice(f.numbers.findIndex(n=>n.id==='fpType'),1);
  f.FirePump.calculate();
  f.App.recordCalculation('hydraulic',{Q:200,D:4.026,velocity:5,frictionLoss:0,totalLoss:0,residualP:null,requirementOutcome:'insufficient-evidence'});
  f.App.state.project.approvedBy='User-entered name';
  await f.Reports.generatePDF();
  const text=f.pdfText.join('\n');
  assert.match(f.context.savedPDF,/-DRAFT.pdf$/);
  assert.match(text,/DRAFT - ENGINEERING REVIEW REQUIRED/);
  assert.match(text,/Insufficient evidence - not assessed/);
  assert.match(text,/Missing source pressure/);
  assert.match(text,/Proposed Approver \(unverified\)/);
  assert.doesNotMatch(text,/has been prepared in accordance with/);
});
test('Stale results block PDF export before any document is emitted',async()=>{
  const f=fixture(); f.App.state.calculations.firePump={bhp:15.78};
  await f.Reports.generatePDF();
  assert.equal(f.pdfText.length,0); assert.equal(f.context.savedPDF,undefined);
});
