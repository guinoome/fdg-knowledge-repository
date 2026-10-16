export function runControlTests(createControls,schema,fixture){
 const C=createControls(schema),tests=[],copy=()=>JSON.parse(JSON.stringify(fixture)),check=(name,a,b)=>{const pass=typeof b==='number'?Math.abs(a-b)<1e-7:a===b;tests.push({name,actual:a,expected:b,pass});if(!pass)throw Error(name);};let s=copy(),m=C.calculate(s);
 check('sample budget',m.budget,150000);check('sample actual',m.actual,40000);check('remaining forecast',m.etc,125000);check('open commitments separate',m.open,50000);check('EAC avoids double counting',m.eac,165000);check('negative headroom indicates overrun',m.vac,-15000);check('budget weighted reviewed progress',m.progress,8/15);check('uniform calendar-day plan',m.planned,2/3);check('forecast finish variance days',m.rows[0].slip,2);check('known reviewed zero retained',m.rows[1].progress,0);check('explicit zero actual retained',m.rows[1].actual,0);check('blank forecast unavailable',C.calculate(C.blank()).eac,null);
 s=copy();s.costs=s.costs.filter(x=>x.task!=='A-002');check('missing actual stays unknown',C.calculate(s).actual,null);
 s=copy();s.costs.push({...s.costs[0],id:'FUTURE',date:'2026-10-17',amount:99000});check('future cost excluded',C.calculate(s).actual,40000);
 s=copy();s.costs.push({...s.costs[0],id:'CREDIT',type:'Credit',amount:5000});check('credit reduces actual',C.calculate(s).actual,35000);
 s=copy();s.costs.push({...s.costs[0]});check('duplicate actual invalidates total',C.calculate(s).actual,null);
 s=copy();s.tasks[0].etc=20000;check('ETC below commitment blocks forecast',C.calculate(s).eac,null);
 s=copy();s.tasks[0].etc=null;check('unknown ETC blocks forecast',C.calculate(s).eac,null);
 s=copy();s.tasks[0].forecastDate='2026-10-17';check('future forecast excluded',C.calculate(s).eac,null);
 s=copy();s.commitments.push({...s.commitments[0],id:'OLDER',date:'2026-10-15',remaining:50000});check('successive commitment snapshots not summed',C.calculate(s).open,50000);
 s=copy();s.commitments.push({...s.commitments[0],id:'SAME-DAY'});check('same-date snapshot conflict blocks forecast',C.calculate(s).eac,null);
 s=copy();s.updates.push({...s.updates[0],id:'REVIEW-CONFLICT'});check('conflicting same-date reviews unavailable',C.calculate(s).progress,null);
 s=copy();s.updates[0].source='';check('review evidence missing excluded',C.calculate(s).progress,null);
 s=copy();s.updates[0].reviewDate='2026-10-17';check('future review excluded',C.calculate(s).progress,null);
 s=copy();s.tasks[1].forecastStart='2026-10-18';check('FS overlap warning',C.calculate(s).warnings.some(x=>x.includes('Finish-to-start overlap')),true);
 s=copy();s.tasks[0].predecessors='A-002';check('cycle warning',C.calculate(s).warnings.some(x=>x.includes('Dependency cycle')),true);
 s=copy();s.tasks[0].predecessors='MISSING';check('missing dependency warning',C.calculate(s).warnings.some(x=>x.includes('missing predecessor')),true);
 s=copy();s.tasks[1].forecastFinish='2026-10-15';check('overdue forecast identified',C.calculate(s).overdue,1);
 s=copy();s.locked=true;let blocked=false;try{C.validate(s,'tasks',{...s.tasks[0],budget:123},'A-001');}catch(e){blocked=true;}check('frozen baseline budget edit blocked',blocked,true);
 check('JSON normalization round trip',C.calculate(C.normalize(JSON.parse(JSON.stringify(fixture)))).eac,165000);s=copy();s.locked=true;check('missing frozen snapshot flagged',C.calculate(s).warnings.some(x=>x.includes('Frozen baseline differs')),true);
 s=copy();s.costs.push({...s.costs[0],id:'ORPHAN',task:'NO-ACTIVITY'});check('unmapped actual cost blocks project forecast',C.calculate(s).eac,null);
 check('calendar date validation',C.date('2026-02-31'),false);
 return tests;
}