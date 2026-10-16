import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import readline from 'node:readline';
const require=createRequire((process.env.FDG_NODE_MODULES||process.cwd()+'/node_modules')+'/fdg-toolkit-run.cjs');
const {Workbook,SpreadsheetFile}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const crypto=await import('node:crypto');
const JSZip=require('jszip');
const schema={"id":"FDG-CMT-PH","version":"1.0.0-rc.1","capacity":200,"dates":"ISO8601 displayed yyyy-mm-dd","currency":"PHP","jurisdiction":"Philippines; contract-specific forms and technical criteria remain user-approved","commonStatuses":["Draft","Submitted","In Review","Accepted","Rejected","Superseded","Conflict - Review Required"],"registers":[{"sheet":"WBS","title":"Work breakdown and progress basis","fields":["wbs_id","project_id","activity","unit","baseline_qty","weight","planned_fraction","accepted_events","accepted_qty","accepted_fraction","weighted_actual","weighted_plan","owner","revision","source_ref","basis_check"],"computed":["accepted_events","accepted_qty","accepted_fraction","weighted_actual","weighted_plan","basis_check"]},{"sheet":"Daily","title":"Daily site progress","fields":["event_id","project_id","wbs_id","event_date","description","unit","reported_qty","accepted_qty","review_state","evidence_ref","prepared_by","reviewer","review_date","revision","source_ref","evidence_check","unit_check","quantity_check"],"computed":["evidence_check","unit_check","quantity_check"]},{"sheet":"Kickoff","title":"Project startup and kickoff","fields":["item_id","project_id","item","owner","due_date","status","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"RFI","title":"Request for information register","fields":["rfi_id","project_id","wbs_id","subject","raised_date","due_date","owner","status","response_ref","evidence_ref","reviewer","review_date","revision","source_ref","next_action"]},{"sheet":"Submittals","title":"Submittal register","fields":["submittal_id","project_id","wbs_id","document_title","document_revision","submitted_date","due_date","owner","status","response_ref","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"Issues","title":"Issues, constraints and delays","fields":["issue_id","project_id","wbs_id","category","description","observed_date","impact_basis","owner","due_date","status","next_action","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"QAQC","title":"QA/QC status register","fields":["inspection_id","project_id","wbs_id","record_type","description","method_standard_ref","acceptance_criterion","observed_result","inspection_date","owner","status","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"Changes","title":"Variation and change register","fields":["change_id","project_id","wbs_id","description","cause","notice_date","cost_impact_php","time_impact_days","owner","status","authorization_ref","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"Billing","title":"Progress billing evidence index","fields":["billing_id","project_id","wbs_id","description","unit","reported_qty","accepted_qty","billable_qty","billed_qty","paid_qty","unit_rate_php","billable_authority_ref","billing_ref","payment_ref","evidence_ref","owner","revision","source_ref"]},{"sheet":"Punch","title":"Punch list","fields":["punch_id","project_id","wbs_id","location","description","responsible_trade","owner","due_date","status","closure_evidence_ref","verified_by","verification_date","revision","source_ref"]},{"sheet":"Turnover","title":"Turnover and closeout tracker","fields":["turnover_id","project_id","wbs_id","deliverable_type","description","responsibility_receiver","owner","due_date","status","blocking_issue_ref","evidence_ref","reviewer","review_date","revision","source_ref"]},{"sheet":"Evidence","title":"Evidence index","fields":["evidence_id","project_id","record_type","origin","locator","captured_date","captured_by","checksum","access_class","verification_status","revision","source_ref"]},{"sheet":"History","title":"Revision and decision log","fields":["history_id","project_id","target_record_id","prior_revision","new_revision","change_reason","actor","occurred_date","decision_ref","evidence_ref"]}]};
const N=200,first=7,last=206;
const col=n=>{let s='';while(n>0){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;};
const label=k=>k.split('_').map(w=>({id:'ID',wbs:'WBS',rfi:'RFI',qaqc:'QA/QC',php:'PHP',qty:'Quantity',ref:'Reference'}[w]||w[0].toUpperCase()+w.slice(1))).join(' ');
const status=['Draft','Submitted','In Review','Accepted','Rejected','Superseded','Conflict - Review Required'];
const records=schema.registers;
const synthetic={
WBS:[['WBS-001','DEMO-PH-001','Concrete slab','m3',100,.6,.5,null,null,null,null,null,'Demo Site Engineer',1,'DEMO-BASIS-001'],['WBS-002','DEMO-PH-001','Pipe installation','m',200,.4,.25,null,null,null,null,null,'Demo Site Engineer',1,'DEMO-BASIS-002']],
Daily:[
['D-001','DEMO-PH-001','WBS-001','2026-10-12','Concrete placement','m3',20,20,'Accepted','E-001','Demo Engineer','Demo Reviewer','2026-10-13',1,'DEMO-FIELD-001'],
['D-002','DEMO-PH-001','WBS-001','2026-10-16','Concrete placement; quantity adjustment pending','m3',30,25,'Accepted','E-002','Demo Engineer','Demo Reviewer','2026-10-16',1,'DEMO-FIELD-002'],
['D-003','DEMO-PH-001','WBS-001','2026-10-17','Future-dated event excluded from cutoff','m3',50,50,'Accepted','E-003','Demo Engineer','Demo Reviewer','2026-10-17',1,'DEMO-FIELD-003'],
['D-004','DEMO-PH-001','WBS-002','2026-10-15','Pipe installation','m',50,40,'Accepted','E-004','Demo Engineer','Demo Reviewer','2026-10-16',1,'DEMO-FIELD-004'],
['D-005','DEMO-PH-001','WBS-002','2026-10-16','Unreviewed field quantity','m',10,null,'Submitted','E-005','Demo Engineer',null,null,1,'DEMO-FIELD-005']],
Kickoff:[['K-001','DEMO-PH-001','Confirm reporting and approval matrix','Demo PM','2026-10-10','Accepted','E-006','Demo Reviewer','2026-10-10',1,'DEMO-MOM-001']],
RFI:[['RFI-001','DEMO-PH-001','WBS-002','Confirm pipe route','2026-10-10','2026-10-14','Demo Coordinator','Submitted',null,'E-007',null,null,1,'DEMO-DWG-001','Obtain consultant response']],
Submittals:[['SUB-001','DEMO-PH-001','WBS-002','Pipe material datasheet','A','2026-10-12','2026-10-20','Demo Coordinator','In Review',null,'E-008',null,null,1,'DEMO-SPEC-001']],
Issues:[['ISS-001','DEMO-PH-001','WBS-002','Constraint','Route clearance not confirmed','2026-10-12','Linked RFI-001; schedule impact not yet evaluated','Demo PM','2026-10-14','Open','Resolve RFI-001','E-007',null,null,1,'DEMO-ISSUE-001']],
QAQC:[['QC-001','DEMO-PH-001','WBS-001','WIR','Slab placement observation','DEMO-ITP-001','Project-specific criterion pending qualified review','Example observation only','2026-10-16','Demo QA Engineer','In Review','E-002',null,null,1,'DEMO-WIR-001']],
Changes:[['CHG-001','DEMO-PH-001','WBS-002','Potential reroute','RFI response pending','2026-10-16',null,null,'Demo QS','Draft',null,'E-007',null,null,1,'DEMO-CHANGE-001']],
Billing:[['BIL-001','DEMO-PH-001','WBS-001','Example evidence index','m3',50,45,null,null,null,1000,null,null,null,'E-001; E-002','Demo QS',1,'DEMO-BILL-001']],
Punch:[['P-001','DEMO-PH-001','WBS-002','Zone A','Complete identification tags','Mechanical','Demo Supervisor','2026-10-22','Open',null,null,null,1,'DEMO-PUNCH-001']],
Turnover:[['T-001','DEMO-PH-001','WBS-002','O&M manual','Submit approved O&M record','Demo Facility Manager','Demo Doc Controller','2026-10-25','Pending','ISS-001',null,null,null,1,'DEMO-TURN-001']],
Evidence:Array.from({length:8},(_,i)=>['E-'+String(i+1).padStart(3,'0'),'DEMO-PH-001','Synthetic fixture','FDG worked example','DEMO-ONLY/no-real-file','2026-10-16','Demo Author',null,'Public synthetic','Illustrative - not real evidence',1,'FDG-CMT-SAMPLE']),
History:[['H-001','DEMO-PH-001','D-002',0,1,'Synthetic example prepared','Demo Author','2026-10-16','DEMO-DECISION-001','E-002']]
};
function dateValue(v,k){return typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&/date$/.test(k)?new Date(v+'T00:00:00Z'):v;}
function baseSheet(wb,name,title,ncols=8){
 const s=wb.worksheets.add(name);s.showGridLines=false;
 s.getRange('A1:'+col(ncols)+'16').format.font={name:'Arial',size:10,color:'#172A2A'};
 s.getRange('A2').values=[[title]];s.getRange('A2').format.font={name:'Arial',size:15,bold:true,color:'#163F35'};
 s.getRange('A2:'+col(ncols)+'2').format.rowHeight=26;
 s.getRange('A:'+col(ncols)).format.columnWidth=19;
 return s;
}
function set(s,a,v){s.getRange(a).values=[[v]];}
function formula(s,a,v){s.getRange(a).formulas=[[v]];}
function rowFormula(s,c,fn){s.getRange(c+first+':'+c+last).formulas=Array.from({length:N},(_,i)=>[fn(i+first)]);s.getRange(c+first+':'+c+last).format.fill='#EAF1EE';}
function table(wb,d,sample){
 const m=d.fields.length,s=baseSheet(wb,d.sheet,d.title,m);
 s.getRange('A4').values=[[sample?'SYNTHETIC EXAMPLE ONLY - replace with a separately saved blank workbook':'Blank template - enter your approved project records']];
 s.getRange('A4').format.font={name:'Arial',size:10,italic:true,color:'#526660'};
 s.getRange('A6:'+col(m)+'6').values=[d.fields.map(label)];
 s.getRange('A6:'+col(m)+'6').format={fill:'#173F35',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:42,verticalAlignment:'center',horizontalAlignment:'center'};
 s.getRange('A7:'+col(m)+last).format.font={name:'Arial',size:10,color:'#172A2A'};
 s.getRange('A7:'+col(m)+last).format.rowHeight=22;
 s.getRange('A7:'+col(m)+last).format.fill='#FFFBEB';
 s.tables.add('A6:'+col(m)+last,true,'TK_'+d.sheet);
 s.freezePanes.freezeRows(6);s.freezePanes.freezeColumns(2);
 for(let i=0;i<m;i++){const k=d.fields[i],c=col(i+1),r=s.getRange(c+first+':'+c+last);
  if(/date$/.test(k))r.setNumberFormat('yyyy-mm-dd');
  if(/qty|weight|fraction|php|days/.test(k))r.setNumberFormat(/weight|fraction/.test(k)?'0.0%':/php/.test(k)?'"PHP "#,##0.00':'#,##0.00');
  if(/revision/.test(k))r.setNumberFormat('0');
  if(/status$|review_state/.test(k)){r.dataValidation={rule:{type:'list',values:d.sheet==='Issues'||d.sheet==='Punch'?['Open','In Progress','Ready for Verification','Closed','Conflict - Review Required']:d.sheet==='Turnover'?['Pending','Submitted','In Review','Accepted','Conflict - Review Required']:k==='verification_status'?['Unverified','Verified','Missing','Conflict - Review Required','Illustrative - not real evidence']:status}};
   r.conditionalFormats.add('containsText',{text:'Conflict',format:{fill:'#FDE8E7',font:{color:'#9B1C1C',bold:true}}});}
  if(/description|subject|title|criterion|observed_result|change_reason|impact_basis|next_action|item$|locator/.test(k))s.getRange(c+':'+c).format.columnWidth=34;
 }
 if(sample&&synthetic[d.sheet]){const rows=synthetic[d.sheet].map(row=>Array.from({length:m},(_,i)=>dateValue(row[i]??null,d.fields[i])));s.getRange('A7:'+col(m)+(6+rows.length)).values=rows;}
 return s;
}
function makeWorkbook(sample){
 const wb=Workbook.create();
 const start=baseSheet(wb,'Start','FDG Construction Management Professional Toolkit',8);
 const dash=baseSheet(wb,'Dashboard','Project management dashboard',8);
 const report=baseSheet(wb,'Report','Period progress report',12);
 const setup=baseSheet(wb,'Setup','Project profile and report controls',5);
 const sheets={Start:start,Dashboard:dash,Report:report,Setup:setup};
 for(const d of records)sheets[d.sheet]=table(wb,d,sample);
 const guides=[
 ['Edition','Philippines Edition / v1.0.0-rc.1'],
 ['Use','Save a private copy before entering real project records.'],
 ['1 Setup','Enter project ID, project name, as-of date and reporting interval in Setup.'],
 ['2 Baseline','Enter unique WBS IDs, units, approved baseline quantities and weights totaling 100%.'],
 ['3 Capture','Record Daily events once. Reported quantity and accepted quantity remain separate.'],
 ['4 Review','Enter actual reviewer identity, evidence and dates. A selected status is not a signature.'],
 ['5 Report','Report uses the selected interval; Dashboard uses the as-of date.'],
 ['6 Control','Use the registers, Evidence and History. Preserve prior issued revisions.'],
 ['Capacity','200 rows per register (rows7-206). Extend ALL formulas, validation and ranges before more rows.'],
 ['Input colors','Pale amber: editable. Pale green: calculated; do not overwrite.'],
 ['Privacy','Public source contains blank templates and synthetic examples only. Keep client copies private.'],
 ['Limits','Single-editor files. No automatic permission enforcement, conflict merging or legal certification.'],
 ['Sample mode',sample?'SYNTHETIC EXAMPLE - not real work, payment or acceptance':'BLANK TEMPLATE - no real project loaded'],
 ['Help','Read IMPLEMENTATION_GUIDE.md in this release folder.']
 ];
 start.getRange('A5:B18').values=guides;start.getRange('A5:A18').format.font={bold:true};start.getRange('B:B').format.columnWidth=98;
 const settings=[
 ['Project ID',sample?'DEMO-PH-001':null],
 ['Project name',sample?'Synthetic Cebu MEP Demonstration':null],
 ['As-of date',sample?new Date('2026-10-16T00:00:00Z'):null],
 ['Report start',sample?new Date('2026-10-12T00:00:00Z'):null],
 ['Report end',sample?new Date('2026-10-16T00:00:00Z'):null],
 ['Prepared by',sample?'Demo Site Engineer':null],
 ['Reviewed by',null],
 ['Issue revision',sample?1:null],
 ['Review / issue state','Draft'],
 ['Currency','PHP'],
 ['Jurisdiction','Philippines; project and contract rules require review'],
 ['Evidence custody',null]
 ];
 setup.getRange('A4:B15').values=settings;setup.getRange('B4:B15').format.fill='#FFFBEB';setup.getRange('B6:B8').setNumberFormat('yyyy-mm-dd');setup.getRange('B:B').format.columnWidth=64;
 const w=sheets.WBS,d=sheets.Daily;
 rowFormula(w,'H',r=>'=IF(A'+r+'="","",COUNTIFS(Daily!$C$7:$C$206,A'+r+',Daily!$B$7:$B$206,B'+r+',Daily!$I$7:$I$206,"Accepted",Daily!$P$7:$P$206,"Recorded - verify authority",Daily!$Q$7:$Q$206,"Matched",Daily!$R$7:$R$206,"Recorded",Daily!$M$7:$M$206,">0",Daily!$M$7:$M$206,"<="&Setup!$B$6,Daily!$D$7:$D$206,"<="&Setup!$B$6))');
 rowFormula(w,'I',r=>'=IF(A'+r+'="","",IF(H'+r+'=0,"",SUMIFS(Daily!$H$7:$H$206,Daily!$C$7:$C$206,A'+r+',Daily!$B$7:$B$206,B'+r+',Daily!$I$7:$I$206,"Accepted",Daily!$P$7:$P$206,"Recorded - verify authority",Daily!$Q$7:$Q$206,"Matched",Daily!$R$7:$R$206,"Recorded",Daily!$M$7:$M$206,">0",Daily!$M$7:$M$206,"<="&Setup!$B$6,Daily!$D$7:$D$206,"<="&Setup!$B$6)))');
 rowFormula(w,'J',r=>'=IF(A'+r+'="","",IF(OR(NOT(ISNUMBER(E'+r+')),E'+r+'<=0,I'+r+'=""),"",I'+r+'/E'+r+'))');
 rowFormula(w,'K',r=>'=IF(A'+r+'="","",IF(OR(J'+r+'="",NOT(ISNUMBER(F'+r+'))),"",J'+r+'*F'+r+'))');
 rowFormula(w,'L',r=>'=IF(A'+r+'="","",IF(OR(NOT(ISNUMBER(F'+r+')),NOT(ISNUMBER(G'+r+'))),"",F'+r+'*G'+r+'))');
 rowFormula(d,'P',r=>'=IF(A'+r+'="","",IF(I'+r+'<>"Accepted","Review pending",IF(OR(J'+r+'="",L'+r+'="",M'+r+'=""),"Missing approval evidence","Recorded - verify authority")))');
 rowFormula(d,'Q',r=>'=IF(A'+r+'="","",IF(COUNTIFS(WBS!$A$7:$A$206,C'+r+',WBS!$B$7:$B$206,B'+r+',WBS!$D$7:$D$206,F'+r+')=1,"Matched","Check WBS / unit"))');
 rowFormula(d,'R',r=>'=IF(A'+r+'="","",IF(OR(NOT(ISNUMBER(G'+r+')),G'+r+'<0),"Check reported quantity",IF(I'+r+'="Accepted",IF(OR(NOT(ISNUMBER(H'+r+')),H'+r+'<0,H'+r+'>G'+r+'),"Check accepted quantity","Recorded"),"Not accepted")))');
 dash.getRange('A4:A15').values=[['Project'],['As-of date'],['Accepted weighted progress'],['Planned weighted progress'],['Variance (percentage points)'],['RFI overdue (not accepted/rejected)'],['Open issues'],['Open punch items'],['Turnover pending acceptance'],['WBS weight total'],['Progress basis'],['Evidence / quantity warnings']];
 formula(dash,'B4','=IF(Setup!B4="","No project selected",Setup!B4)');
 formula(dash,'B5','=IF(Setup!B6="","",Setup!B6)');dash.getRange('B5').setNumberFormat('yyyy-mm-dd');
 rowFormula(w,'P',r=>'=IF(A'+r+'="","",IF(AND(COUNTIFS($A$7:$A$206,A'+r+',$B$7:$B$206,B'+r+')=1,B'+r+'=Setup!$B$4,D'+r+'<>"",ISNUMBER(E'+r+'),E'+r+'>0,ISNUMBER(F'+r+'),F'+r+'>=0,F'+r+'<=1,ISNUMBER(G'+r+'),G'+r+'>=0,G'+r+'<=1,O'+r+'<>""),"Valid","Review baseline / ID / weight"))');
 const valid='AND(COUNTIFS(WBS!$P$7:$P$206,"Valid")=COUNTA(WBS!$A$7:$A$206),Setup!$B$4<>"",ISNUMBER(Setup!$B$6),COUNT(WBS!$F$7:$F$206)=COUNTA(WBS!$A$7:$A$206),ABS(SUM(WBS!$F$7:$F$206)-1)<0.000001,COUNTA(WBS!$A$7:$A$206)>0)';
 formula(dash,'B6','=IF(AND('+valid+',COUNT(WBS!$K$7:$K$206)=COUNTA(WBS!$A$7:$A$206)),SUM(WBS!$K$7:$K$206),"n.a.")');
 formula(dash,'B7','=IF(AND('+valid+',COUNT(WBS!$L$7:$L$206)=COUNTA(WBS!$A$7:$A$206)),SUM(WBS!$L$7:$L$206),"n.a.")');
 formula(dash,'B8','=IF(AND(ISNUMBER(B6),ISNUMBER(B7)),B6-B7,"n.a.")');dash.getRange('B6:B8').setNumberFormat('0.0%');
 formula(dash,'B9','=IF(Setup!B6="","n.a.",COUNTIFS(RFI!$A$7:$A$206,"<>",RFI!$F$7:$F$206,">0",RFI!$F$7:$F$206,"<"&Setup!B6,RFI!$H$7:$H$206,"<>Accepted",RFI!$H$7:$H$206,"<>Rejected"))');
 formula(dash,'B10','=COUNTIFS(Issues!$A$7:$A$206,"<>",Issues!$J$7:$J$206,"<>Closed")');
 formula(dash,'B11','=COUNTIFS(Punch!$A$7:$A$206,"<>",Punch!$I$7:$I$206,"<>Closed")');
 formula(dash,'B12','=COUNTIFS(Turnover!$A$7:$A$206,"<>",Turnover!$I$7:$I$206,"<>Accepted")');
 formula(dash,'B13','=IF(COUNTA(WBS!A7:A206)=0,"n.a.",SUM(WBS!F7:F206))');dash.getRange('B13').setNumberFormat('0.0%');
 formula(dash,'B14','=IF('+valid+',"Review data and approvals","Missing project, date or complete 100% weights")');
 formula(dash,'B15','=COUNTIFS(Daily!$A$7:$A$206,"<>",Daily!$P$7:$P$206,"Missing approval evidence")+COUNTIFS(Daily!$A$7:$A$206,"<>",Daily!$Q$7:$Q$206,"Check WBS / unit")+COUNTIFS(Daily!$A$7:$A$206,"<>",Daily!$R$7:$R$206,"Check*")');
 dash.getRange('A:A').format.columnWidth=42;dash.getRange('B:B').format.columnWidth=60;dash.getRange('A4:B15').format.rowHeight=26;
 set(dash,'A18','Progress is evidence-based recorded quantity, not certification, billability or payment.');
 dash.getRange('A18').format.font={italic:true,size:10,color:'#526660'};
 report.getRange('A4:F4').values=[['Project',null,'Start',null,'End',null]];formula(report,'B4','=IF(Setup!B4="","",Setup!B4)');formula(report,'D4','=IF(Setup!B7="","",Setup!B7)');formula(report,'F4','=IF(Setup!B8="","",Setup!B8)');report.getRange('D4:F4').setNumberFormat('yyyy-mm-dd');
 report.getRange('A6:H6').values=[['WBS ID','Activity','Unit','Reported in period','Accepted in period','Accepted to cutoff','Baseline quantity','Accepted fraction']];
 report.getRange('A6:H6').format={fill:'#173F35',font:{bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:42};
 for(let r=first;r<=last;r++){
  for(const [c,f]of Object.entries({A:'=IF(WBS!A'+r+'="","",WBS!A'+r+')',B:'=IF(A'+r+'="","",WBS!C'+r+')',C:'=IF(A'+r+'="","",WBS!D'+r+')',
   D:'=IF(OR(A'+r+'="",Setup!$B$7="",Setup!$B$8="",Setup!$B$8<Setup!$B$7),"",SUMIFS(Daily!$G$7:$G$206,Daily!$C$7:$C$206,A'+r+',Daily!$B$7:$B$206,Setup!$B$4,Daily!$D$7:$D$206,">="&Setup!$B$7,Daily!$D$7:$D$206,"<="&Setup!$B$8))',
   E:'=IF(OR(A'+r+'="",Setup!$B$7="",Setup!$B$8="",Setup!$B$8<Setup!$B$7),"",SUMIFS(Daily!$H$7:$H$206,Daily!$C$7:$C$206,A'+r+',Daily!$B$7:$B$206,Setup!$B$4,Daily!$I$7:$I$206,"Accepted",Daily!$P$7:$P$206,"Recorded - verify authority",Daily!$Q$7:$Q$206,"Matched",Daily!$R$7:$R$206,"Recorded",Daily!$M$7:$M$206,">0",Daily!$M$7:$M$206,"<="&Setup!$B$6,Daily!$D$7:$D$206,">="&Setup!$B$7,Daily!$D$7:$D$206,"<="&Setup!$B$8))',
   F:'=IF(A'+r+'="","",WBS!I'+r+')',G:'=IF(A'+r+'="","",WBS!E'+r+')',H:'=IF(A'+r+'="","",WBS!J'+r+')'}))formula(report,c+r,f);
 }
 report.getRange('D7:G206').setNumberFormat('#,##0.00');report.getRange('H7:H206').setNumberFormat('0.0%');report.getRange('B:B').format.columnWidth=34;report.freezePanes.freezeRows(6);
 wb.recalculate();return{wb,sheets,sample};
}
const blank=makeWorkbook(false),sample=makeWorkbook(true);
const cases=[];
function test(name,actual,expected){const pass=typeof expected==='number'?Math.abs(actual-expected)<1e-8:actual===expected;cases.push({name,actual,expected,pass});if(!pass)throw Error(name+': '+actual+' != '+expected);}
const cell=(b,s,c)=>b.sheets[s].getRange(c).values[0][0];
test('sample accepted weighted progress',cell(sample,'Dashboard','B6'),.35);
test('sample planned weighted progress',cell(sample,'Dashboard','B7'),.4);
test('sample variance',cell(sample,'Dashboard','B8'),-.05);
test('future event excluded from accepted quantity',cell(sample,'WBS','I7'),45);
test('period reported concrete quantity',cell(sample,'Report','D7'),50);
test('period accepted concrete quantity',cell(sample,'Report','E7'),45);
test('unreviewed pipe quantity excluded',cell(sample,'Report','E8'),40);
test('overdue RFI',cell(sample,'Dashboard','B9'),1);
test('blank progress unavailable',cell(blank,'Dashboard','B6'),'n.a.');
set(sample.sheets.WBS,'E7',0);sample.wb.recalculate();test('zero baseline no false progress',cell(sample,'Dashboard','B6'),'n.a.');set(sample.sheets.WBS,'E7',100);
set(sample.sheets.WBS,'F8',.3);sample.wb.recalculate();test('incomplete weights no false progress',cell(sample,'Dashboard','B6'),'n.a.');set(sample.sheets.WBS,'F8',.4);
set(sample.sheets.Daily,'H7',0);sample.wb.recalculate();test('true zero accepted quantity preserved',cell(sample,'WBS','I7'),25);set(sample.sheets.Daily,'H7',20);

set(sample.sheets.Daily,'J7',null);sample.wb.recalculate();test('missing evidence excluded',cell(sample,'WBS','I7'),25);set(sample.sheets.Daily,'J7','E-001');
set(sample.sheets.Daily,'F7','kg');sample.wb.recalculate();test('wrong unit excluded',cell(sample,'WBS','I7'),25);set(sample.sheets.Daily,'F7','m3');
set(sample.sheets.Daily,'M7',new Date('2026-10-18T00:00:00Z'));sample.wb.recalculate();test('future approval excluded',cell(sample,'WBS','I7'),25);set(sample.sheets.Daily,'M7',new Date('2026-10-13T00:00:00Z'));
sample.sheets.Daily.getRange('A206:O206').values=[['D-END','DEMO-PH-001','WBS-001',new Date('2026-10-16T00:00:00Z'),'Last capacity row','m3',5,5,'Accepted','E-001','Demo Engineer','Demo Reviewer',new Date('2026-10-16T00:00:00Z'),1,'DEMO-END']];
sample.wb.recalculate();test('last prepared row included',cell(sample,'WBS','I7'),50);sample.sheets.Daily.getRange('A206:O206').clear({applyTo:'contents'});
set(sample.sheets.Setup,'B8',new Date('2026-10-11T00:00:00Z'));sample.wb.recalculate();test('reversed report interval unavailable',cell(sample,'Report','D7'),'');set(sample.sheets.Setup,'B8',new Date('2026-10-16T00:00:00Z'));
sample.wb.recalculate();blank.wb.recalculate();
console.log(JSON.stringify({ready:true,cases,sheets:['Start','Dashboard','Report','Setup',...records.map(x=>x.sheet)],capacity:N}));
const rl=readline.createInterface({input:process.stdin,crlfDelay:Infinity});
for await(const line of rl){try{const cmd=JSON.parse(line);const b=cmd.mode==='blank'?blank:sample;
 if(cmd.op==='export'){const file=await SpreadsheetFile.exportXlsx(b.wb);const bytes=Buffer.from(await file.arrayBuffer());const imported=await SpreadsheetFile.importXlsx(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));imported.recalculate();const zip=await JSZip.loadAsync(bytes);const xml=await zip.file('xl/workbook.xml').async('string');console.log(JSON.stringify({op:'export',mode:cmd.mode,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),reimport:await imported.inspect({kind:'table',range:'Dashboard!A4:B15',include:'values,formulas',tableMaxRows:12,tableMaxCols:2,maxChars:5000}),noMacros:!Object.keys(zip.files).some(x=>/vbaProject|externalLink/.test(x)),workbookXml:xml.slice(0,400),base64:bytes.toString('base64')}));}
 else if(cmd.op==='render'){const image=await b.wb.render({sheetName:cmd.sheet,range:cmd.range||'A1:H12',scale:1,format:'png'});console.log(JSON.stringify({op:'render',sheet:cmd.sheet,base64:Buffer.from(await image.arrayBuffer()).toString('base64')}));}
 else if(cmd.op==='inspect'){console.log(JSON.stringify({op:'inspect',result:await b.wb.inspect(cmd.options)}));}
 else if(cmd.op==='exit'){rl.close();break;}
 }catch(e){console.log(JSON.stringify({error:String(e),stack:e.stack?.split('\n').slice(0,4)}));}}
