// TC01: one test/retest chain per dossier, using original registers only.
const tcPrefix='FDG-TC-1 | Test pack: ',tcRevisionPrefix='FDG-TC-1 | Pack revision: ';
function tcActive(s,k){return(s.registers[k]||[]).filter(r=>!r._archived&&r.project_id===s.project.id);}
function tcHas(v){return typeof v==='string'&&v.trim().length>0;}
function tcPerson(v){return String(v||'').normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('en');}
function tcPunchClosureError(s,r,E){
 if(!tcHas(r.owner)||!tcHas(r.closure_evidence_ref)||!tcHas(r.verified_by)||!E.date(r.verification_date)||!E.date(s.project.asOf)||r.verification_date>s.project.asOf)return 'Punch closure needs its repair owner, actual closure evidence, verifier and verification date at or before cutoff.';
 if(r.owner&&tcPerson(r.owner)===tcPerson(r.verified_by))return 'Punch verifier must differ from the recorded repair owner; names remain manual declarations.';
 return '';
}
function tcChain(s,pack,E){
 const all=tcActive(s,'Tests').filter(r=>r.test_pack_ref===pack.id),rows=all.filter(r=>E.date(r.test_date)&&E.date(s.project.asOf)&&r.test_date<=s.project.asOf),excluded=all.filter(r=>!rows.includes(r)),problems=[];
 for(const r of all)if(!E.date(r.test_date))problems.push(r.id+': test date missing/invalid');
 for(const r of rows){
  if(!tcHas(r.id))problems.push('Test ID missing or not text');
  if(tcActive(s,'Tests').filter(x=>x.id===r.id).length!==1)problems.push(r.id+': duplicate test ID');
  if(r.wbs_id!==pack.wbs_id)problems.push(r.id+': work item differs from test pack');
  if(r.retest_ref){const parents=rows.filter(x=>x.id===r.retest_ref);if(parents.length!==1||r.retest_ref===r.id)problems.push(r.id+': retest predecessor missing/ambiguous');else if(r.test_date<parents[0].test_date)problems.push(r.id+': retest precedes its source');}
 }
 const leaves=rows.filter(r=>!rows.some(x=>x.retest_ref===r.id));
 if(rows.length&&leaves.length!==1)problems.push('Competing or cyclic test chains; resolve source references or scope separate test packs');
 for(const r of rows){const seen=new Set();let node=r;while(node?.retest_ref){if(seen.has(node.id)){problems.push(r.id+': retest cycle');break;}seen.add(node.id);node=rows.find(x=>x.id===node.retest_ref);}}
 return{rows,excluded,problems:[...new Set(problems)],latest:problems.length||leaves.length!==1?null:leaves[0]};
}
function commissioningReadiness(s,id,E){
 const packs=tcActive(s,'TestPacks').filter(r=>r.id===id),pack=packs[0],reasons=[];
 if(packs.length!==1)return{pack:pack||null,ready:false,reasons:['Test pack identity missing or duplicated'],chain:{rows:[],excluded:[],problems:[],latest:null},punch:[],ncr:[]};
 if(!tcHas(pack.id)||!tcHas(pack.wbs_id))reasons.push('Pack/work identifiers must be recorded text');
 const work=tcActive(s,'WBS').filter(w=>w.wbs_id===pack.wbs_id);if(work.length!==1)reasons.push('Unique linked work item is required');
 if(!E.date(s.project.asOf))reasons.push('Set a valid project cutoff');
 if(!tcHas(pack.procedure_ref)||!tcHas(pack.prerequisite)||!tcHas(pack.hold_point))reasons.push('Procedure, prerequisite and hold/witness-point basis must be recorded');
 if(pack.status!=='Accepted'||!tcHas(pack.reviewer)||!tcHas(pack.evidence_ref)||!E.date(pack.review_date)||pack.review_date>s.project.asOf)reasons.push('Readiness review/evidence at the cutoff is missing');
 if(String(pack.blocker||'').trim())reasons.push('Recorded pack blocker: '+pack.blocker);
 const chain=tcChain(s,pack,E);reasons.push(...chain.problems);const last=chain.latest;
 if(!last)reasons.push('No unique eligible final test/retest');
 else{
  if(!['Passed','Accepted'].includes(last.status)||!['pass','passed'].includes(String(last.outcome||'').trim().toLowerCase()))reasons.push(last.id+': latest outcome is not a recorded pass');
  if(!tcHas(last.method_ref)||!tcHas(last.acceptance_criterion)||!tcHas(last.observed_result)||!tcHas(last.evidence_ref)||!tcHas(last.owner)||!tcHas(last.reviewer)||!E.date(last.review_date)||last.review_date<last.test_date||last.review_date>s.project.asOf)reasons.push(last.id+': actual method/criterion/result/performer/review/evidence is incomplete');
  if(E.date(pack.review_date)&&last.test_date<pack.review_date)reasons.push(last.id+': test predates the recorded pack readiness review');
  if(String(last.source_ref||'').startsWith(tcRevisionPrefix)&&last.source_ref!==tcRevisionPrefix+pack.id+' / '+pack.revision)reasons.push(last.id+': pack revision changed; review test basis');
 }
 const relevant=r=>!r.wbs_id||r.wbs_id===pack.wbs_id;
 const punch=tcActive(s,'Punch').filter(relevant).map(record=>({record,reason:tcActive(s,'Punch').filter(x=>x.punch_id===record.punch_id).length!==1?'Duplicate punch ID':record.status!=='Closed'?'Punch remains '+(record.status||'unresolved'):tcPunchClosureError(s,record,E)})).filter(x=>x.reason);
 const ncr=tcActive(s,'NCR').filter(relevant).map(record=>{let reason=tcActive(s,'NCR').filter(x=>x.id===record.id).length!==1?'Duplicate NCR ID':record.status!=='Closed'?'NCR remains '+(record.status||'unresolved'):!tcHas(record.reviewer)||!tcHas(record.evidence_ref)||!tcHas(record.verification_ref)||!E.date(record.review_date)||record.review_date>s.project.asOf?'NCR closeout evidence/review missing at cutoff':'';if(!reason&&String(record.source_ref||'').startsWith('FDG-QA-1 | Inspection record: '))reason=inspectionClosureError(s,record,E);return{record,reason};}).filter(x=>x.reason);
 for(const x of punch)reasons.push(x.record.punch_id+': '+x.reason);for(const x of ncr)reasons.push(x.record.id+': '+x.reason);
 return{pack,ready:reasons.length===0,reasons:[...new Set(reasons)],chain,punch,ncr};
}
function commissioningTurnoverError(s,r,E){
 const packs=tcActive(s,'TestPacks').filter(p=>r.source_ref===tcPrefix+p.id);
 if(packs.length!==1)return 'Turnover needs its unique original test pack.';
 const q=commissioningReadiness(s,packs[0].id,E);
 if(r.wbs_id!==packs[0].wbs_id)return 'Turnover and test pack work items must match.';
 if(!q.ready)return 'Test dossier blocked: '+q.reasons.slice(0,3).join('; ');
 if(!tcHas(r.responsibility_receiver)||!tcHas(r.reviewer)||tcPerson(r.reviewer)!==tcPerson(r.responsibility_receiver)||!tcHas(r.evidence_ref)||!E.date(r.review_date)||r.review_date>s.project.asOf||r.review_date<q.chain.latest.review_date||r.review_date<packs[0].review_date)return 'Receipt needs the named receiving person, actual evidence and a date after the test/readiness reviews and at or before cutoff.';
 return '';
}
export function createCommissioning(L,G){
 const E=L.E,copy=L.copy,text=(v,label)=>{const a=String(v||'').trim();if(!a)throw Error(label+' is required.');if(a.length>6000)throw Error(label+' is too long.');return a;};
 const empty=k=>Object.fromEntries(L.defs[k].fields.filter(f=>!L.defs[k].computed?.includes(f)).map(f=>[f,null]));
 const one=(s,k,id)=>{const a=tcActive(s,k).filter(r=>r[L.defs[k].fields[0]]===id);if(a.length!==1)throw Error('Original source missing or duplicated.');return a[0];};
 const room=(s,k)=>{if(s.registers[k].length>=500)throw Error('Record limit reached. Preserve a controlled package first.');};
 const date=(s,v,min='')=>{if(!E.date(v)||!E.date(s.project.asOf)||v>s.project.asOf||min&&v<min)throw Error('Use a valid date after the source date and on or before cutoff.');return v;};
 function create(s,input){
  one(s,'WBS',input.work);room(s,'TestPacks');const n=copy(s),title=text(input.title,'Test package name'),r={...empty('TestPacks'),id:G.nextId(n,'TestPacks','PACK'),project_id:s.project.id,wbs_id:input.work,system:title,title,owner:s.project.preparedBy||null,status:'Draft',revision:1,source_ref:'FDG-TC-1 | Manual test plan',_archived:false};L.validate(n,'TestPacks',r,null);n.registers.TestPacks.push(r);return n;
 }
 function release(s,id,input){
  const p=one(s,'TestPacks',id);if(p.status==='Accepted')throw Error('Readiness is already recorded; revise source explicitly before a new basis.');if(String(p.blocker||'').trim())throw Error('Resolve the original pack blocker before recording readiness.');if(input.declaration!==true)throw Error('Confirm actual prerequisite/hold-point review under project authority.');
  const n=copy(s),r=one(n,'TestPacks',id);Object.assign(r,{procedure_ref:text(input.procedure,'Procedure reference'),prerequisite:text(input.prerequisite,'Prerequisite review basis'),hold_point:text(input.hold,'Hold/witness-point basis'),reviewer:text(input.reviewer,'Actual readiness reviewer'),review_date:date(s,input.date),evidence_ref:text(input.evidence,'Readiness review/authority evidence'),status:'Accepted',revision:(Number(r.revision)||0)+1});L.validate(n,'TestPacks',r,id);return n;
 }
 function record(s,id,input){
  const p=one(s,'TestPacks',id);one(s,'WBS',p.wbs_id);room(s,'Tests');const chain=tcChain(s,p,E);if(chain.problems.length)throw Error(chain.problems.join('; '));if(!['Passed','Failed'].includes(input.outcome))throw Error('Choose the actual test outcome.');if(input.declaration!==true)throw Error('Confirm this is an actual test/review declaration.');
  const d=date(s,input.date,chain.latest?.test_date||''),review=date(s,input.reviewDate,d),n=copy(s),r={...empty('Tests'),id:G.nextId(n,'Tests','TEST'),project_id:s.project.id,wbs_id:p.wbs_id,test_pack_ref:id,system:p.system,test_date:d,method_ref:text(input.method,'Method reference'),acceptance_criterion:text(input.criterion,'Acceptance criterion'),observed_result:text(input.observed,'Measured/observed result with units where applicable'),outcome:input.outcome,witness:String(input.witness||'').trim()||null,retest_ref:chain.latest?.id||null,owner:text(input.performer,'Test performer'),status:input.outcome,reviewer:text(input.reviewer,'Actual result reviewer'),review_date:review,evidence_ref:text(input.evidence,'Test evidence reference'),revision:1,source_ref:tcRevisionPrefix+p.id+' / '+p.revision,_archived:false};L.validate(n,'Tests',r,null);n.registers.Tests.push(r);return n;
 }
 function punch(s,id,input){
  const p=one(s,'TestPacks',id);room(s,'Punch');const n=copy(s);if(!E.date(input.due))throw Error('Choose a valid due date.');const r={...empty('Punch'),punch_id:G.nextId(n,'Punch','PUNCH'),project_id:s.project.id,wbs_id:p.wbs_id,location:String(input.location||'').trim()||null,description:text(input.description,'Outstanding item'),owner:text(input.owner,'Responsible person'),due_date:input.due,status:'Open',revision:1,source_ref:tcPrefix+id,_archived:false};L.validate(n,'Punch',r,null);n.registers.Punch.push(r);return n;
 }
 function closePunch(s,id,input){
  const n=copy(s),r=one(n,'Punch',id);if(r.status==='Closed')throw Error('Punch closeout already recorded.');Object.assign(r,{closure_evidence_ref:text(input.evidence,'Actual closure evidence'),verified_by:text(input.verifier,'Actual verifier'),verification_date:date(s,input.date),status:'Closed',revision:(Number(r.revision)||0)+1});L.validate(n,'Punch',r,id);return n;
 }
 function prepare(s,id,input){
  const p=one(s,'TestPacks',id);room(s,'Turnover');if(tcActive(s,'Turnover').some(r=>r.source_ref===tcPrefix+id))throw Error('A turnover record already exists for this dossier.');if(!E.date(input.due))throw Error('Choose a valid target delivery date.');
  const n=copy(s),r={...empty('Turnover'),turnover_id:G.nextId(n,'Turnover','DOSSIER'),project_id:s.project.id,wbs_id:p.wbs_id,deliverable_type:'Testing dossier',description:p.title,responsibility_receiver:text(input.receiver,'Receiving person'),owner:p.owner||s.project.preparedBy||null,due_date:input.due,status:'Pending',revision:1,source_ref:tcPrefix+id,_archived:false};L.validate(n,'Turnover',r,null);n.registers.Turnover.push(r);return n;
 }
 function receive(s,id,input){
  const n=copy(s),r=one(n,'Turnover',id);if(r.status==='Accepted')throw Error('Receipt already retained; use an explicit source revision for corrections.');if(input.declaration!==true)throw Error('Confirm actual dossier receipt under project authority.');
  Object.assign(r,{reviewer:text(input.receiver,'Actual receiving person'),review_date:date(s,input.date),evidence_ref:text(input.evidence,'Receipt/authority evidence'),status:'Accepted',revision:(Number(r.revision)||0)+1});L.validate(n,'Turnover',r,id);return n;
 }
 function summary(s){return tcActive(s,'TestPacks').map(p=>{const q=commissioningReadiness(s,p.id,E);return{...q,turnover:tcActive(s,'Turnover').filter(r=>r.source_ref===tcPrefix+p.id).map(record=>({record,issue:record.status==='Accepted'?commissioningTurnoverError(s,record,E):null}))};});}
 return{create,release,record,punch,closePunch,prepare,receive,summary};
}
