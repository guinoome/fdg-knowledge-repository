import {createRequire} from 'node:module';
import crypto from 'node:crypto';
const require=createRequire((process.env.FDG_NODE_MODULES||process.cwd()+'/node_modules')+'/fdg-package.cjs');
const JSZip=require('jszip');
export async function packageToolkit(input){
 const files={};for(const [path,entry] of Object.entries(input.files)){
  if(path.startsWith('/')||path.split('/').includes('..'))throw Error('Unsafe package path');
  files[path]=Buffer.from(entry.content,entry.encoding==='base64'?'base64':'utf8');
 }
 const checks=[];
 function assert(name,condition,detail){checks.push({name,pass:!!condition,detail});if(!condition)throw Error(name);}
 const schema=JSON.parse(files['schema/toolkit-schema.json'].toString());
 assert('thirteen register schemas',schema.registers.length===13);
 assert('eleven printable forms',(files['forms.html'].toString().match(/class="page"/g)||[]).length===11);
 assert('forms have no external resources',!/<(?:script|link)|(?:src)=/i.test(files['forms.html'].toString()));
 for(const d of schema.registers){
  const headers=d.fields.filter(k=>!(d.computed||[]).includes(k));
  for(const mode of ['blank','sample']){
   const data=files['csv/'+mode+'/'+d.sheet+'.csv'].toString();
   assert(mode+' CSV schema '+d.sheet,data.split(/\r?\n/)[0]===headers.join(','));
  }
 }
 for(const name of ['FDG-CMT-PH-Blank.xlsx','FDG-CMT-PH-Worked-Example.xlsx']){
  const z=await JSZip.loadAsync(files[name],{checkCRC32:true});
  const paths=Object.keys(z.files),workbook=await z.file('xl/workbook.xml').async('string');
  assert(name+' seventeen sheets',(workbook.match(/<\w*:sheet\s/g)||[]).length===17);
  assert(name+' thirteen tables',paths.filter(p=>/^xl\/tables\/[^/]+\.xml$/.test(p)).length===13);
  assert(name+' no macros or external links',!paths.some(p=>/vbaProject|externalLink/.test(p)));
  let formulas=0,validations=0,errors=0;
  for(const p of paths.filter(p=>/^xl\/worksheets\/sheet\d+\.xml$/.test(p))){
   const xml=await z.file(p).async('string');
   formulas+=(xml.match(/<(?:\w+:)?f[ >]/g)||[]).length;
   validations+=(xml.match(/<(?:\w+:)?dataValidation\s/g)||[]).length;
   errors+=(xml.match(/\bt="e"/g)||[]).length;
  }
  assert(name+' formula cells retained',formulas>=3400,{formulas});
  assert(name+' dropdown validation retained',validations>=10,{validations});
  assert(name+' no cached Excel errors',errors===0,{errors});
 }
 const manifest={product:'FDG Construction Management Professional Toolkit — Philippines Edition',version:schema.version,source_baseline:'91c6fc7346ace8dbf2f7ec86880c6e4b24c2289b',status:'Review candidate; native application and user acceptance pending',files:Object.entries(files).sort(([a],[b])=>a.localeCompare(b)).map(([path,bytes])=>({path,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')}))};
 files['MANIFEST.json']=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
 const zip=new JSZip();for(const [path,bytes]of Object.entries(files))zip.file(path,bytes,{date:new Date('2026-10-16T00:00:00Z')});
 const bytes=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'});
 const restored=await JSZip.loadAsync(bytes,{checkCRC32:true});
 for(const entry of manifest.files){const b=await restored.file(entry.path).async('nodebuffer');assert('ZIP integrity '+entry.path,crypto.createHash('sha256').update(b).digest('hex')===entry.sha256);}
 return {checks,manifest,zip:{bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),base64:bytes.toString('base64')},fileCount:Object.keys(files).length};
}
if(process.env.FDG_PACKAGE_STDIN==='1'){let input='';for await(const chunk of process.stdin)input+=chunk;console.log(JSON.stringify(await packageToolkit(JSON.parse(input))));}
