// Reproduce the preservation and file-target wiki checks, without promoting authority.
import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {scanWithMetadata} from '../2026-09-30-architecture-critical-review/scan-snapshot.mjs';
const root=fileURLToPath(new URL('../../../',import.meta.url));
const baseline='2425ee27785c67b2e0740e745d9e793f1552ef84';
const git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8',maxBuffer:64*1024*1024});
const blob=bytes=>createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
const entries=git('ls-tree','-r','-z',baseline).split('\0').filter(Boolean).map(row=>{
  const [,mode,type,sha,path]=row.match(/^(\d+) (\w+) ([a-f0-9]+)\t([\s\S]+)$/);
  return {mode,type,sha,path};
});
const oldByPath=new Map(entries.map(e=>[e.path,e]));
let paths=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(Boolean);
const working={},original={},added={},preservation=[];
for(const path of paths.filter(p=>/\.md$/i.test(p))){
  const bytes=readFileSync(root+path),content=bytes.toString('utf8'),old=oldByPath.get(path);
  working[path]=content;
  if(old){
    const prior=blob(bytes)===old.sha?bytes:execFileSync('git',['-C',root,'cat-file','blob',old.sha]);
    original[path]=prior.toString('utf8');
    if(!bytes.equals(prior)){
      const kept=bytes.subarray(0,prior.length).equals(prior);
      preservation.push({path,originalBlob:old.sha,originalBytes:prior.length,preservedAsExactPrefix:kept});
      if(!kept) throw new Error('Original Markdown changed: '+path);
      added[path]=content.slice(original[path].length);
    }
  }else added[path]=content;
}
for(const e of entries) if(!paths.includes(e.path)) throw new Error('Baseline file deleted: '+e.path);
const workingEntries=paths.map(path=>({type:'blob',path}));
const before=scanWithMetadata(entries,original),after=scanWithMetadata(workingEntries,working);
const newLinks=scanWithMetadata(workingEntries,added).links;
const broken=newLinks.filter(l=>l.status!=='OK');
const newDuplicateIds=after.duplicateIds.filter(d=>!before.duplicateIds.some(old=>old.id===d.id));
const queue=after.metadata.filter(m=>m.status==='Approved'&&!m.effective_date).map(m=>({
  path:m.path,document_id:m.document_id||null,status:m.status,
  evidenceState:'approval-declared; effective-date-evidence-incomplete',action:'Recover real evidence or record a prospective scoped decision; do not backdate'
}));
writeFileSync(new URL('./approval-evidence-queue.json',import.meta.url),JSON.stringify({baseline,scope:'Recognized exact Approved headers; not a finding that approval never occurred',count:queue.length,documents:queue},null,2)+'\n');
// Keep the manifest limited to reviewed implementation/decision targets, avoiding self-hashes.
const targets=[
  '05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01.md',
  '05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30.md',
  '05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01.md',
  '09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01.md',
  '01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK.md',
  'Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html',
  'Projects/Active/AI/FDG-FP/history/FDG-FP-HydroCal.pre-2026-10-01.html.txt',
  'Projects/Active/FWIS/capabilities-2026-10-01.json',
  'Projects/Active/FWIS/verify/capability-check.mjs'
].map(path=>({path,gitBlob:blob(readFileSync(root+path))}));
const result={baseline,before:before.summary,after:after.summary,markdownAddenda:preservation,
  addedWikiLinks:newLinks.length,addedWikiLinksNotUniquelyResolved:broken,newDuplicateIds,
  approvalEvidenceQueueCount:queue.length,targets,
  limitations:['File targets only; headings, block IDs and YAML aliases not resolved','Existing unresolved/ambiguous references preserved','This check cannot verify approval or engineering correctness']};
console.log(JSON.stringify(result,null,2));
if(broken.length||newDuplicateIds.length) process.exitCode=1;
