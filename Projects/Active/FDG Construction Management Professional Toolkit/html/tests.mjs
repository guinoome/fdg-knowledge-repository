export function runWorkingTests(createEngine,schema,fixture){
 const e=createEngine(schema),copy=()=>JSON.parse(JSON.stringify(fixture)),tests=[];
 const check=(name,actual,expected)=>{const pass=typeof expected==='number'?Math.abs(actual-expected)<1e-9:actual===expected;tests.push({name,actual,expected,pass});if(!pass)throw Error(name);};
 let s=copy();check('synthetic accepted progress',e.calculate(s).actual,.35);check('planned progress',e.calculate(s).plan,.4);check('variance',e.calculate(s).variance,-.05);check('period concrete reported',e.calculate(s).rows[0].reportedPeriod,50);check('period concrete accepted',e.calculate(s).rows[0].acceptedPeriod,45);check('future accepted event excluded',e.calculate(s).rows[0].accepted,45);check('unreviewed pipe excluded',e.calculate(s).rows[1].accepted,40);check('blank project unavailable',e.calculate(e.blank()).actual,null);
 s=copy();s.registers.WBS[0].baseline_qty=0;check('zero baseline unavailable',e.calculate(s).actual,null);
 s=copy();s.registers.WBS[1].weight=.3;check('incomplete weights unavailable',e.calculate(s).actual,null);
 s=copy();s.registers.Daily[0].accepted_qty=0;check('reviewed zero preserved',e.calculate(s).rows[0].accepted,25);
 s=copy();s.registers.Daily[0].evidence_ref='';check('missing evidence excluded',e.calculate(s).rows[0].accepted,25);
 s=copy();s.registers.Daily[0].unit='kg';check('wrong unit excluded from accepted',e.calculate(s).rows[0].accepted,25);check('wrong unit excluded from reported',e.calculate(s).rows[0].reportedPeriod,30);
 s=copy();s.registers.Daily[1].event_id='D-001';check('duplicate source events excluded',e.calculate(s).rows[0].accepted,null);
 s=copy();s.registers.Daily[0]._archived=true;check('archived event excluded',e.calculate(s).rows[0].accepted,25);
 s=copy();s.registers.Daily[0].review_date='2026-10-18';check('future review excluded',e.calculate(s).rows[0].accepted,25);
 s=copy();s.project.start='2026-10-17';s.project.end='2026-10-16';check('reversed period unavailable',e.calculate(s).rows[0].reportedPeriod,null);
 s=copy();s.registers.WBS[0].activity='=DANGEROUS';check('CSV injection neutralized',e.csv(s,'WBS').includes("'=DANGEROUS"),true);
 check('JSON normalization round trip',e.calculate(e.normalize(JSON.parse(JSON.stringify(fixture)))).actual,.35);
 let rejected=false;try{e.normalize({version:500});}catch(x){rejected=true;}check('invalid backup rejected',rejected,true);
 check('nonexistent calendar date rejected',e.date('2026-02-31'),false);
 return tests;
}