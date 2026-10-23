import {createEstimator} from '../../html/engine.mjs';
import {runEstimatorTests} from '../../html/tests.mjs';
import {readFile} from 'node:fs/promises';
const fixture=JSON.parse(await readFile(new URL('../../html/sample.json',import.meta.url),'utf8'));
export function runC24EstimateEdges(createEstimator,fixture){
 const E=createEstimator(),out=[],copy=()=>JSON.parse(JSON.stringify(fixture)),run=(id,mutate,select,expected,category)=>{let actual,error;try{const s=copy();mutate(s);actual=select(s);}catch(e){error=e.message;actual={error};}out.push({id,category,expected,actual,pass:!error&&Object.is(actual,expected)});};
 run('Q01_numeric_string_unknown',s=>s.items[0].material='2000',s=>E.calculate(E.normalize(s)).direct,null,'numeric');
 run('Q02_explicit_zero_quantity',s=>{s.items=[s.items[1]];s.items[0].manual=0;},s=>E.calculate(s).direct,0,'zero_unknown');
 run('Q03_negative_quantity',s=>s.items[1].manual=-1,s=>E.calculate(s).direct,null,'numeric');
 run('Q04_finite_operands_overflow_line',s=>{s.items=[s.items[0]];s.items[0].length=1e308;},s=>E.calculate(s).direct,null,'overflow');
 run('Q05_finite_lines_overflow_sum',s=>{s.items=[s.items[1],{...s.items[1],id:'Q-003'}];for(const r of s.items){r.manual=1;r.material=1e308;r.labor=0;r.waste=0;}},s=>E.calculate(s).direct,null,'overflow');
 run('Q06_pricing_overflow',s=>{s.project.indirect=1e308;s.project.contingency=1000;},s=>E.calculate(s).total,null,'overflow');
 run('Q07_missing_ID',s=>s.items[0].id=null,s=>E.calculate(E.normalize(s)).direct,null,'identity');
 run('Q08_whitespace_ID',s=>s.items[0].id='   ',s=>E.calculate(E.normalize(s)).direct,null,'identity');
 run('Q09_active_duplicate_blocks',s=>s.items[1].id=s.items[0].id,s=>E.calculate(s).direct,null,'identity');
 run('Q10_archived_duplicate_import_or_total_block',s=>s.items.push({...s.items[0],archived:true}),s=>{try{const n=E.normalize(s);return E.calculate(n).direct===null;}catch{return true;}},true,'identity');
 run('Q11_archived_excluded',s=>s.items[1].archived=true,s=>E.calculate(s).direct,34020,'archive');
 run('Q12_all_archived_unknown',s=>s.items.forEach(r=>r.archived=true),s=>E.calculate(s).direct,null,'archive');
 return out;
}
const baseline=runEstimatorTests(createEstimator,fixture);
const focused=runC24EstimateEdges(createEstimator,fixture);
console.log(JSON.stringify({baseline,focused},(k,v)=>typeof v==='number'&&!Number.isFinite(v)?String(v):v,2));
process.exitCode=focused.some(x=>!x.pass)?1:0;
