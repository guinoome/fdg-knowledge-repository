// WP03: explicit source links over QAQC/NCR; never changes Daily acceptance.
const inspectionLinks={
 finding:'Field inspection finding',repair:'Corrective work submission',recheck:'Corrective reinspection',
 findingRef:id=>'FDG-QA-1 | Inspection record: '+id,repairRef:id=>'FDG-QA-1 | Repair submission for NCR: '+id,
 recheckRef:(id,repair,authority)=>'FDG-QA-1 | Reinspection of NCR: '+id+'\nRepair record: '+repair+'\nAuthority reference: '+authority
};
function inspectionPerson(value){return String(value||'').normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('en');}
function inspectionLinkedFinding(s,n){
 const matches=s.registers.QAQC.filter(r=>!r._archived&&r.project_id===s.project.id&&r.record_type===inspectionLinks.finding&&n.source_ref===inspectionLinks.findingRef(r.inspection_id));
 return matches.length===1?matches[0]:null;
}
function inspectionRepair(s,n){
 const rows=s.registers.QAQC.filter(r=>!r._archived&&r.project_id===s.project.id&&r.record_type===inspectionLinks.repair&&r.source_ref===inspectionLinks.repairRef(n.id));
 const latest=rows.slice().sort((a,b)=>String(b.inspection_date).localeCompare(String(a.inspection_date))||String(b.inspection_id).localeCompare(String(a.inspection_id)))[0];
 return latest&&rows.filter(r=>r.inspection_id===latest.inspection_id).length===1?latest:null;
}
// Used by both guided and Advanced saves; typed names remain manual declarations.
export function inspectionClosureError(s,n,E){
 const finding=inspectionLinkedFinding(s,n),repair=inspectionRepair(s,n);
 if(!finding||!repair)return 'Retain a unique original finding and repair submission before closeout.';
 if(!finding.evidence_ref||!repair.evidence_ref||!repair.observed_result||!repair.owner||!n.owner)return 'Finding and repair evidence, performer and assigned owner are required.';
 const rechecks=s.registers.QAQC.filter(r=>!r._archived&&r.inspection_id===n.verification_ref&&r.project_id===s.project.id);
 if(rechecks.length!==1)return 'Closeout needs a unique linked reinspection record.';
 const v=rechecks[0],lines=String(v.source_ref||'').split('\n');
 if(v.record_type!==inspectionLinks.recheck||lines[0]!=='FDG-QA-1 | Reinspection of NCR: '+n.id||lines[1]!=='Repair record: '+repair.inspection_id||!lines[2]?.startsWith('Authority reference: ')||!lines[2].slice(21).trim())return 'Reinspection must link this correction, its latest repair and actual authority reference.';
 if(v.wbs_id!==n.wbs_id||finding.wbs_id!==n.wbs_id||repair.wbs_id!==n.wbs_id)return 'Finding, repair and reinspection must refer to the same work item.';
 if(v.status!=='Passed'||!v.method_standard_ref||!v.acceptance_criterion||!v.observed_result||!v.evidence_ref||!v.reviewer||v.reviewer!==n.reviewer||v.owner!==v.reviewer||v.review_date!==n.review_date)return 'Closeout needs a passed reinspection with method, criterion, observed result, evidence and matching reviewer/date.';
 if(!E.date(finding.inspection_date)||!E.date(repair.inspection_date)||!E.date(v.inspection_date)||!E.date(v.review_date)||!E.date(s.project.asOf)||repair.inspection_date<finding.inspection_date||v.inspection_date<repair.inspection_date||v.review_date<v.inspection_date||v.review_date>s.project.asOf)return 'Reinspection must follow the finding/repair and be on or before the cutoff.';
 const subsequent=s.registers.QAQC.filter(r=>!r._archived&&r.project_id===s.project.id&&r.record_type===inspectionLinks.recheck&&String(r.source_ref||'').split('\n')[0]==='FDG-QA-1 | Reinspection of NCR: '+n.id&&String(r.source_ref||'').split('\n')[1]==='Repair record: '+repair.inspection_id&&r.inspection_id!==v.inspection_id);
 if(subsequent.some(r=>String(r.inspection_date)>String(v.inspection_date)||r.inspection_date===v.inspection_date&&String(r.inspection_id)>String(v.inspection_id)))return 'A later reinspection exists; review its outcome before closing.';
 const who=inspectionPerson(v.reviewer);
 if(!who||who===inspectionPerson(n.owner)||who===inspectionPerson(repair.owner))return 'Use a verifier different from the repair owner and performer. Names are declarations, not authenticated identity.';
 return '';
}
export function createInspectionWorkflow(L,G){
 const E=L.E,copy=L.copy,text=(v,label)=>{const t=String(v||'').trim();if(!t)throw Error(label+' is required.');if(t.length>6000)throw Error(label+' is too long.');return t;};
 const empty=k=>Object.fromEntries(L.defs[k].fields.filter(f=>!L.defs[k].computed?.includes(f)).map(f=>[f,null]));
 const byId=(s,k,id)=>{const rows=L.active(s,k).filter(r=>r[L.defs[k].fields[0]]===id&&r.project_id===s.project.id);if(rows.length!==1)throw Error('Source record missing or duplicated.');return rows[0];};
 const work=(s,id)=>byId(s,'WBS',id);
 const date=(s,value,min='')=>{if(!E.date(value)||!E.date(s.project.asOf)||value>s.project.asOf||min&&value<min)throw Error('Use a valid date after the source date and on or before the project cutoff.');return value;};
 const room=(s,k)=>{if(s.registers[k].length>=500)throw Error('Record limit reached. Preserve a controlled package first.');};
 function add(s,input){
  work(s,input.work);room(s,'QAQC');const n=copy(s),finding=text(input.finding,'Finding'),r={...empty('QAQC'),inspection_id:G.nextId(n,'QAQC','INSPECT'),project_id:s.project.id,wbs_id:input.work,record_type:inspectionLinks.finding,description:finding,observed_result:finding,inspection_date:date(s,input.date),owner:text(input.inspector,'Inspector'),status:'Inspected',evidence_ref:text(input.evidence,'Finding evidence reference'),revision:1,source_ref:'Manual field observation; no acceptance declared',_archived:false};
  L.validate(n,'QAQC',r,null);n.registers.QAQC.push(r);return n;
 }
 function assign(s,id,input){
  const finding=byId(s,'QAQC',id);if(finding.record_type!==inspectionLinks.finding)throw Error('Choose a guided field finding.');work(s,finding.wbs_id);room(s,'NCR');
  if(L.active(s,'NCR').some(r=>r.source_ref===inspectionLinks.findingRef(id)))throw Error('This finding already has a correction record.');
  if(!E.date(input.due)||input.due<finding.inspection_date)throw Error('Choose a due date on or after the finding.');
  const category=String(input.category||'').trim(),priority=String(input.priority||'').trim();if(!!category!==!!priority)throw Error('Record both classification and priority rationale, or leave both blank.');if(category)room(s,'Issues');
  const n=copy(s),r={...empty('NCR'),id:G.nextId(n,'NCR','FIX'),project_id:s.project.id,wbs_id:finding.wbs_id,title:finding.description,observation:finding.observed_result,criterion_ref:finding.method_standard_ref||null,corrective_action:text(input.action,'Corrective action'),due_date:input.due,owner:text(input.owner,'Responsible person'),status:'Corrective Action',evidence_ref:finding.evidence_ref,revision:1,source_ref:inspectionLinks.findingRef(id),_archived:false};L.validate(n,'NCR',r,null);n.registers.NCR.push(r);
  if(category){const issue={...empty('Issues'),issue_id:G.nextId(n,'Issues','QAISSUE'),project_id:s.project.id,wbs_id:finding.wbs_id,category:text(category,'Classification'),description:finding.description,observed_date:finding.inspection_date,impact_basis:text(priority,'Priority rationale'),owner:r.owner,due_date:r.due_date,status:'Open',next_action:'Follow corrective record '+r.id,evidence_ref:finding.evidence_ref,revision:1,source_ref:inspectionLinks.findingRef(id),_archived:false};L.validate(n,'Issues',issue,null);n.registers.Issues.push(issue);}
  return n;
 }
 function submit(s,id,input){
  const correction=byId(s,'NCR',id),finding=inspectionLinkedFinding(s,correction);if(!finding||correction.status!=='Corrective Action')throw Error('Submit a repair for an open assigned correction.');room(s,'QAQC');
  const prior=inspectionRepair(s,correction),lastDate=L.active(s,'QAQC').filter(r=>String(r.source_ref||'').split('\n')[0]==='FDG-QA-1 | Reinspection of NCR: '+id).map(r=>r.inspection_date).filter(E.date).sort().at(-1),minDate=[prior?.inspection_date,finding.inspection_date,lastDate].filter(E.date).sort().at(-1),n=copy(s),r={...empty('QAQC'),inspection_id:G.nextId(n,'QAQC','REPAIR'),project_id:s.project.id,wbs_id:correction.wbs_id,record_type:inspectionLinks.repair,description:text(input.note,'Repair performed'),observed_result:String(input.note).trim(),inspection_date:date(s,input.date,minDate),owner:text(input.performer,'Repair performer'),status:'Requested',evidence_ref:text(input.evidence,'Corrective evidence reference'),revision:1,source_ref:inspectionLinks.repairRef(id),_archived:false};
  L.validate(n,'QAQC',r,null);n.registers.QAQC.push(r);const a=byId(n,'NCR',id);a.status='Verification';a.verification_ref=null;a.reviewer=null;a.review_date=null;a.revision=(a.revision||0)+1;L.validate(n,'NCR',a,id);return n;
 }
 function verify(s,id,input){
  const correction=byId(s,'NCR',id),repair=inspectionRepair(s,correction);if(!inspectionLinkedFinding(s,correction)||!repair||correction.status!=='Verification')throw Error('Submit corrective evidence before recording reinspection.');room(s,'QAQC');
  const verifier=text(input.verifier,'Actual verifier');if([correction.owner,repair.owner].some(v=>inspectionPerson(v)===inspectionPerson(verifier)))throw Error('Verifier must differ from the repair owner and performer.');if(!['pass','fail'].includes(input.result))throw Error('Choose pass or fail from the actual inspection.');if(input.declaration!==true)throw Error('Confirm this is an actual inspection declaration under the recorded authority.');
  const authority=text(input.authority,'Authority reference');if(authority.includes('\n')||authority.includes('\r'))throw Error('Use one line for the authority reference.');if(inspectionLinks.recheckRef(id,repair.inspection_id,authority).length>6000)throw Error('Shorten the authority reference so its complete source link can be retained.');
  const n=copy(s),d=date(s,input.date,repair.inspection_date),r={...empty('QAQC'),inspection_id:G.nextId(n,'QAQC','RECHECK'),project_id:s.project.id,wbs_id:correction.wbs_id,record_type:inspectionLinks.recheck,description:'Reinspection of '+id,method_standard_ref:text(input.method,'Method reference'),acceptance_criterion:text(input.criterion,'Acceptance criterion'),observed_result:text(input.observed,'Observed result'),inspection_date:d,owner:verifier,status:input.result==='pass'?'Passed':'Failed',evidence_ref:text(input.evidence,'Verification evidence reference'),reviewer:verifier,review_date:d,revision:1,source_ref:inspectionLinks.recheckRef(id,repair.inspection_id,authority),_archived:false};
  L.validate(n,'QAQC',r,null);n.registers.QAQC.push(r);const a=byId(n,'NCR',id);a.status=input.result==='pass'?'Closed':'Corrective Action';a.verification_ref=r.inspection_id;a.reviewer=verifier;a.review_date=d;a.revision=(a.revision||0)+1;L.validate(n,'NCR',a,id);for(const issue of L.active(n,'Issues').filter(x=>x.project_id===s.project.id&&x.source_ref===a.source_ref&&x.next_action==='Follow corrective record '+id)){issue.status=input.result==='pass'?'Closed':'Open';issue.reviewer=verifier;issue.review_date=d;issue.evidence_ref=r.evidence_ref;issue.revision=(issue.revision||0)+1;L.validate(n,'Issues',issue,issue.issue_id);}return n;
 }
 function summary(s){
  return L.active(s,'QAQC').filter(r=>r.project_id===s.project.id&&r.record_type===inspectionLinks.finding).map(finding=>{const corrections=L.active(s,'NCR').filter(r=>r.project_id===s.project.id&&r.source_ref===inspectionLinks.findingRef(finding.inspection_id));return{finding,sourceIssue:!E.date(finding.inspection_date)||!E.date(s.project.asOf)||finding.inspection_date>s.project.asOf?'Finding date missing or after project cutoff; review original source.':null,classification:L.active(s,'Issues').filter(r=>r.project_id===s.project.id&&r.source_ref===inspectionLinks.findingRef(finding.inspection_id)),corrections:corrections.map(correction=>({record:correction,repair:inspectionRepair(s,correction),history:L.active(s,'QAQC').filter(r=>r.project_id===s.project.id&&(r.source_ref===inspectionLinks.repairRef(correction.id)||String(r.source_ref||'').split('\n')[0]==='FDG-QA-1 | Reinspection of NCR: '+correction.id)),closureIssue:correction.status==='Closed'?inspectionClosureError(s,correction,E):null}))};});
 }
 return{add,assign,submit,verify,summary};
}
