import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createEstimator} from '../html/engine.mjs';
import {runEstimatorTests} from '../html/tests.mjs';
import {buildEstimateHtml} from '../build/build-html.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const e=createEstimator(),sample=JSON.parse(read('html/sample.json'));
const checks=runEstimatorTests(createEstimator,sample).map(t=>t.name);
const check=(name,fn)=>{fn();checks.push(name);};
const copy=()=>structuredClone(sample);
for(const length of [5999,6000,6001,12000])check(`project note JSON recovery at ${length} characters`,()=>{
 const s=copy();s.project.notes='N'.repeat(length);assert.equal(e.normalize(JSON.parse(JSON.stringify(s))).project.notes,s.project.notes);
});
check('item description, source and note survive undo/import normalization',()=>{
 const s=copy();for(const key of ['description','source','note'])s.items[0][key]='Text '.repeat(1300)+'END';
 const recovered=e.normalize(JSON.parse(JSON.stringify(s)));for(const key of ['description','source','note'])assert.equal(recovered.items[0][key],s.items[0][key]);
 assert.equal(e.calculate(recovered).total,e.calculate(sample).total);
});
check('saved HTML data and embedded engine preserve Unicode and literal closing-script text',()=>{
 const s=copy();s.project.notes='📐測定'.repeat(2000)+'</script><tag>END';
 const html=buildEstimateHtml({initial:s,sample,core:read('html/engine.mjs'),app:'',css:'',shell:''});
 const data=JSON.parse(html.match(/<script id="project-data" type="application\/json">(.*?)<\/script>/s)[1]);
 const code=html.match(/<script>(.*?)<\/script>/s)[1];
 const recovered=vm.runInNewContext(code+';createEstimator().normalize('+JSON.stringify(data)+')');
 assert.equal(recovered.project.notes,s.project.notes);
});
check('backup format and maximum item guards remain enforced',()=>{
 assert.throws(()=>e.normalize({...sample,format:'other'}),/valid FDG QTO backup/);
 assert.throws(()=>e.normalize({...sample,items:Array(1001).fill(sample.items[0])}),/maximum1000/);
 assert.throws(()=>e.normalize({...sample,project:{...sample.project,notes:{bad:true}}}),/Invalid project value/);
});
check('distributed embedded engine passes original regressions and long-text recovery',()=>{
 const html=read('distribution/FDG-QTO-BOQ-Working-Template.html');
 const core=html.slice(html.indexOf('function createEstimator(){'),html.indexOf('const C=createEstimator();'));
 const factory=vm.runInNewContext(core+';createEstimator');
 assert.equal(runEstimatorTests(factory,sample).length,18);
 const s=copy();s.project.notes='D'.repeat(7000);assert.equal(factory().normalize(s).project.notes,s.project.notes);
});
console.log(JSON.stringify({runtime:process.version,passed:checks.length,checks},null,2));
