---
document_id: FEIS-MNT-0001
title: Maintenance Work Readiness Planning and Scheduling Standard
status: Proposed Engineering Standard
owner: FEIS Maintenance & Reliability Intelligence
created: 2026-10-09
---

# FEIS-MNT-0001 — Maintenance Work Readiness, Planning & Scheduling Standard

## 1. Purpose

Define how identified maintenance work becomes a safe, executable, resource-ready job before it enters a committed schedule.

This standard is a domain extension to:

- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-004_MAINTENANCE_INTELLIGENCE_MODULE_STANDARD|FEIP Maintenance Intelligence]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|FMIS Corrective Maintenance & Work Orders]]

## 2. Core Rule

> **Do not schedule work that is not ready, unless an authorized exception explicitly accepts the remaining constraint.**

A date on a work order does not make it ready.

A technician assignment does not make it ready.

A part existing somewhere in inventory does not make it ready.

## 3. Work Readiness Lifecycle

~~~text
Request
→ Triage
→ Approved Work
→ Awaiting Planning
→ In Planning
→ Constraints Identified
→ Constraints Removed
→ Ready to Schedule
→ Scheduled
→ Execution Ready
→ In Progress
→ Testing / Verification
→ Ready for Return to Service
→ Closed
~~~

Deferred and Cancelled remain available as controlled terminal/holding states.

## 4. Two Independent State Axes

Every work order should have both:

### Workflow status
Examples:
- New
- Approved
- Scheduled
- In Progress
- Completed
- Closed

### Readiness state
Examples:
- Awaiting Planning
- Waiting Material
- Waiting Access
- Waiting Contractor
- Ready to Schedule
- Constraint Reopened

This prevents one status field from hiding why work cannot proceed.

## 5. Readiness Gate Dimensions

A work order may be Ready to Schedule only when every applicable dimension is Ready, Not Applicable, or explicitly accepted by authorized exception.

### Scope
- problem/scope clear;
- exact asset/location identified;
- boundaries/interfaces known;
- expected outcome defined.

### Priority / Criticality
- priority assigned;
- asset criticality known where relevant;
- consequence of delay understood;
- emergency classification justified.

### Technical Method
- job plan/procedure available;
- sequence understandable;
- drawings/manuals available;
- special technical instructions attached;
- engineering clarification resolved where required.

### Labor
- required trade(s);
- skill/competency;
- certification;
- crew size;
- estimated labor hours;
- estimated elapsed duration.

### Materials
- required materials identified;
- required spare parts identified;
- approved substitutes identified if allowed;
- inventory/PO status known;
- reservation/kitting requirement satisfied.

### Tools / Equipment
- standard tools;
- special tools;
- lifting gear;
- scaffolding/access equipment;
- test instruments;
- calibration status where relevant.

### Safety
- hazard identification;
- JHA/JSA where required;
- LOTO/isolation;
- work permit;
- confined space/hot work/height controls where applicable;
- PPE;
- energy-control verification.

### Access / Operations
- room/area access;
- tenant/guest/production access;
- shutdown window;
- utility isolation window;
- operations approval;
- weather/environmental restriction where relevant.

### Contractor / External Service
- scope defined;
- contractor available;
- RAMS/method statement accepted where required;
- permits/documents valid;
- mobilization lead time known.

### Quality / Acceptance
- inspection/test requirement;
- hold/witness points;
- post-maintenance test;
- acceptance criteria;
- return-to-service verifier.

## 6. Readiness Dimension State

Recommended state values:

~~~text
READY
PENDING
BLOCKED
NOT_APPLICABLE
AUTHORIZED_EXCEPTION
~~~

Each non-Ready state should carry:
- owner;
- reason;
- due date;
- last update;
- evidence;
- escalation state.

## 7. Readiness Calculation

Recommended logic:

~~~text
IF any required dimension == BLOCKED
    overall = BLOCKED

ELSE IF any required dimension == PENDING
    overall = NOT_READY

ELSE IF any dimension == AUTHORIZED_EXCEPTION
    overall = READY_WITH_EXCEPTION

ELSE
    overall = READY_TO_SCHEDULE
~~~

This may be configured by criticality, but hidden exceptions are prohibited.

## 8. Work Order Quality Gate

Poorly written requests should not be silently converted into poor work orders.

Minimum triage checks:

- asset/location known;
- condition/problem understandable;
- requester evidence sufficient;
- duplicate work checked;
- emergency/priority justified;
- maintenance vs project vs operations responsibility determined;
- safety-critical condition escalated;
- immediate containment recorded if required.

## 9. Planning Backlog

The Planning Backlog contains work approved for maintenance but not yet fully ready.

Suggested planning states:

~~~text
Awaiting Planning
Planner Investigation
Waiting Technical Information
Waiting Engineering
Waiting Material
Waiting Vendor Quote / Contractor
Waiting Permit / Safety
Waiting Access / Operations
Waiting Approval
Ready to Schedule
~~~

The user should be able to filter by:
- criticality;
- age;
- waiting reason;
- planner;
- trade;
- asset;
- property/plant;
- material status;
- contractor;
- outage/window.

## 10. Ready Backlog

A Ready Backlog record must expose:

- ready date;
- priority;
- criticality;
- estimated labor hours;
- estimated duration;
- trade/crew;
- materials reserved/kitted state;
- operations window;
- expiration of readiness assumptions;
- recommended schedule window;
- risk of deferral.

A job can leave Ready Backlog if a prerequisite becomes invalid.

Example:

~~~text
Part Reserved
→ Part issued to another emergency
→ Material constraint reopened
→ Work returns to Waiting Material
~~~

## 11. Ready Backlog Coverage

One useful capacity metric:

~~~text
Ready Backlog Coverage (weeks)
=
Ready Backlog Labor Hours
÷
Average Available Scheduled Labor Hours per Week
~~~

Compute by:
- trade;
- crew;
- property;
- plant;
- criticality.

Do not use one organization-wide number when trades cannot substitute for one another.

## 12. Work Package

A WorkPackage is the execution-ready projection of a planned work order.

Required sections may include:

1. identity;
2. asset/location;
3. scope;
4. condition/history;
5. planned method;
6. safety/isolations;
7. labor;
8. materials/kit;
9. tools/special equipment;
10. drawings/references;
11. access/window;
12. contractor information;
13. tests/acceptance;
14. evidence requirements;
15. return-to-service;
16. execution feedback.

## 13. Job Plan Reuse

Repeated work should use a JobPlan library when technically appropriate.

JobPlan statuses:

- Draft
- Under Review
- Approved
- In Use
- Change Proposed
- Superseded
- Retired

Each instantiated job must record the JobPlan version used.

## 14. Material Kitting

Material readiness is not binary inventory availability.

Recommended chain:

~~~text
Required
→ Identified
→ On Hand
→ Reserved
→ Picked
→ Kitted
→ Staged
→ Issued
→ Consumed / Returned
~~~

For high-priority scheduled work, Ready status may require Kitted or Staged rather than merely On Hand.

## 15. Schedule Creation

A schedule should consume:
- Ready Backlog;
- labor capacity;
- maintenance windows;
- operations/production constraints;
- outage dependencies;
- priority/criticality;
- route/location efficiency where useful;
- contractor commitment;
- statutory/due dates.

## 16. Capacity Model

Recommended:

~~~text
Gross Labor Capacity
- Leave
- Training
- Meetings
- Planned Administrative Time
- Reserved Emergency Capacity
=
Schedulable Capacity
~~~

Then:

~~~text
Schedule Load %
=
Scheduled Labor Hours
÷
Schedulable Capacity Hours
× 100
~~~

A 100% scheduled load is not always desirable if the operation requires reserved capacity for emergent work.

## 17. Weekly Schedule Commitment

When a weekly schedule is committed, store:

- version;
- commitment timestamp;
- approved work;
- crew;
- planned hours;
- operations agreement;
- access/outage assumptions;
- frozen-period rule;
- contingency/reserved capacity.

Later changes must remain visible.

## 18. Break-In Work

Break-In Work is work inserted after the schedule commitment.

Record:
- work order;
- reason;
- source;
- emergency/urgent basis;
- hours consumed;
- displaced work;
- approving role;
- consequence.

High break-in frequency is a maintenance-system signal, not merely a planner inconvenience.

## 19. Schedule Compliance

Measure at least two views:

### Work-order count

~~~text
Completed Scheduled WOs
÷
Committed Scheduled WOs
~~~

### Labor-hour basis

~~~text
Completed Scheduled Labor Hours
÷
Committed Scheduled Labor Hours
~~~

Do not hide partial completion.

Reason codes for missed scheduled work should include:
- emergency break-in;
- material issue;
- operations denied access;
- contractor issue;
- manpower issue;
- duration overrun;
- planning defect;
- equipment condition changed;
- weather;
- safety stop;
- other controlled reason.

## 20. Planning Accuracy

Recommended measures:

### Labor estimate variance

~~~text
(actual_labor_hours - estimated_labor_hours)
÷ estimated_labor_hours
~~~

### Duration variance

~~~text
actual_elapsed_duration
vs
planned_duration
~~~

### Material plan quality
- missing material count;
- unused material returned;
- emergency material requests.

### Work-pack quality
- technician clarification needed;
- missing drawing/procedure;
- missing tool;
- missing permit;
- unplanned rework.

## 21. First-Pass Execution Quality

A planned job should be evaluated for:
- completed without scope clarification;
- completed without emergency material request;
- completed without unplanned tool/equipment delay;
- passed post-maintenance test first attempt;
- did not require rework within defined period;
- evidence complete.

This can form a WorkPackageQualityScore, but the underlying dimensions must remain visible.

## 22. Planner Feedback Loop

At closeout:

~~~text
Technician Feedback
→ Planner Review
→ JobPlan Change Candidate
→ Engineering Review if needed
→ Approved Revision
→ Future Work
~~~

No model/automation may silently rewrite a controlled job plan.

## 23. Priority vs Readiness

A critical job can remain Not Ready.

The interface must support:

~~~text
Priority: Critical
Readiness: Waiting Material
~~~

and trigger escalation.

Priority is "how important".

Readiness is "can we execute".

They are not interchangeable.

## 24. Emergency Work

Emergency work may bypass normal planning depth only under controlled emergency governance.

Even emergency work should capture, as feasible:
- asset;
- hazard;
- scope;
- isolation;
- competency;
- material/tool;
- technical authority;
- test/return-to-service;
- retrospective planning/reliability review.

Emergency bypass should be measured.

## 25. PM Work

A PM occurrence should inherit a JobPlan/PM Definition where available.

Before committing PM to schedule:
- asset available;
- required material/service kit ready;
- permit/access available;
- technician competency available;
- expected duration known.

This reduces PM compliance achieved through rushed or incomplete execution.

## 26. Operations Coordination

Operations may own:
- access;
- occupancy/production window;
- operational isolation acceptance;
- return-to-service acceptance where applicable.

Maintenance owns:
- work method;
- technical execution;
- maintenance evidence;
- technical verification.

The schedule requires the interface, not a transfer of authority.

## 27. Contractor Work

Contractor jobs require, as applicable:
- approved vendor;
- scope;
- quotation/PO/commercial authorization;
- method statement/RAMS;
- competency;
- insurance/documents;
- site access;
- safety induction;
- materials;
- supervision;
- acceptance/test criteria.

Contractor availability is a readiness dimension.

## 28. Automation

FWAIS may:
- detect missing readiness dimensions;
- issue reminders;
- route blockers;
- calculate readiness score;
- propose schedule candidates;
- generate work packs from approved job plans;
- notify operations;
- detect aging constraints.

FWAIS shall not:
- fabricate technical methods;
- mark critical jobs Ready on incomplete evidence;
- override permit/safety requirements;
- close work based solely on status updates.

## 29. Required FMIS Integration

FBPOIS/FMIS should support this standard through:
- separate workflow_status and readiness_state;
- readiness assessments;
- constraints;
- job plans;
- work packages;
- schedule commitments;
- schedule change history;
- execution feedback;
- plan-quality metrics.

## 30. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0000 - Maintenance and Reliability Intelligence Architecture|Maintenance & Reliability Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|Data Model, KPI & Acceptance Tests]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/07_FMIS_Maintenance_Resources_and_Workforce|FMIS Resources & Workforce]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/08_FMIS_Materials_Spares_and_Procurement|FMIS Materials & Spares]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence Master Index]] → this document
