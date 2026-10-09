---
document_id: FEIS-MNT-0003
title: Maintenance Readiness Data Model KPI and Acceptance Tests
status: Build Specification
owner: FEIS Maintenance & Reliability Intelligence
created: 2026-10-09
---

# FEIS-MNT-0003 — Maintenance Readiness Data Model, KPI & Acceptance Tests

## 1. Purpose

Define implementation-oriented entities, relationships, metrics, and tests for the Maintenance & Reliability Intelligence extension.

## 2. Additive Data Objects

Recommended domain objects:

~~~text
MaintenanceRequest
WorkOrder
WorkReadinessAssessment
ReadinessDimension
MaintenanceConstraint
JobPlan
JobPlanRevision
WorkPackage
MaterialRequirement
MaterialReservation
MaterialKit
SchedulePeriod
ScheduleCommitment
ScheduledWork
ScheduleChange
BreakInWork
ExecutionFeedback
PostMaintenanceTest
ReturnToServiceRecord
AssetMaintenanceReadinessAssessment
AssetReadinessDimension
TurnoverOpenItem
MaintenanceProgramReadinessAssessment
~~~

These extend existing FMIS data; they do not replace current entities.

## 3. WorkReadinessAssessment

Minimum fields:

~~~text
assessment_id
work_order_id
assessment_revision
assessed_at
assessed_by
overall_state
ready_to_schedule_at
exception_count
critical_blocker_count
notes
evidence_refs[]
~~~

## 4. ReadinessDimension

Minimum fields:

~~~text
dimension_id
assessment_id
dimension_type
applicable
state
owner
blocking_reason
required_by
expected_resolution
actual_resolution
exception_authority
exception_reason
evidence_refs[]
~~~

Dimension types may include:
- SCOPE
- TECHNICAL_METHOD
- LABOR
- MATERIAL
- TOOLS
- SAFETY
- PERMIT
- ISOLATION
- ACCESS
- OPERATIONS_WINDOW
- CONTRACTOR
- ENGINEERING
- QUALITY_TEST
- RETURN_TO_SERVICE

## 5. MaintenanceConstraint

Minimum fields:

~~~text
constraint_id
work_order_id
type
status
severity
owner
identified_at
target_resolution
resolved_at
description
dependency
escalation_state
evidence_refs[]
~~~

## 6. JobPlan

Minimum fields:

~~~text
job_plan_id
name
asset_class / task_family
status
current_revision
owner
approval_authority
estimated_labor
estimated_duration
trade_requirements
standard_materials
standard_tools
safety_controls
procedure_steps
test_requirements
acceptance_criteria
evidence_requirements
source_refs
~~~

## 7. JobPlanRevision

Preserve:
- revision;
- change reason;
- source feedback;
- author;
- reviewer;
- approver;
- effective date;
- superseded date.

Never overwrite a plan revision used by historical work.

## 8. WorkPackage

Minimum identifiers:
- work_package_id;
- work_order_id;
- job_plan_revision;
- generated_at;
- generated_by;
- readiness_assessment_id;
- schedule_commitment_id if scheduled;
- document revision;
- issue status.

## 9. MaterialRequirement

Fields:
- work order/job plan;
- item;
- quantity;
- unit;
- required date;
- critical/optional;
- substitute rule;
- source of requirement.

## 10. MaterialReservation / Kit

Reservation:
- requested quantity;
- reserved quantity;
- stock location;
- reservation time;
- expiry/release;
- shortage.

Kit:
- kit ID;
- work order;
- items;
- completeness;
- staged location;
- prepared by;
- verified by;
- stage time.

## 11. SchedulePeriod

Fields:
- period type (day/week/outage);
- start/end;
- property/plant;
- crew/trade;
- gross capacity;
- unavailable capacity;
- reserved emergency capacity;
- schedulable capacity.

## 12. ScheduleCommitment

Fields:
- version;
- committed at;
- committed by;
- operations agreement;
- baseline scheduled work;
- scheduled hours;
- load percentage;
- freeze rule;
- change log.

## 13. BreakInWork

Fields:
- inserted work;
- insertion time;
- reason;
- priority;
- approval;
- labor hours;
- displaced jobs;
- impact.

## 14. ExecutionFeedback

Fields:
- actual labor;
- elapsed duration;
- actual materials;
- unused materials;
- unexpected scope;
- missing parts/tools;
- access issues;
- method/procedure issues;
- safety issues;
- test result;
- follow-up work;
- job-plan change proposal;
- evidence.

## 15. PostMaintenanceTest

Fields:
- test type;
- test procedure;
- precondition;
- measured result;
- acceptance rule;
- pass/fail;
- witness;
- evidence;
- failed-test follow-up.

## 16. ReturnToServiceRecord

Fields:
- work complete;
- PMT complete;
- guards/restoration complete;
- isolation restored;
- protection restored;
- operating status;
- technical verifier;
- operations acceptance if required;
- restrictions;
- timestamp.

## 17. AssetMaintenanceReadinessAssessment

Fields:
- asset/system;
- project/change reference;
- assessment revision;
- readiness profile;
- overall status;
- blockers;
- open items;
- approvers;
- target handover;
- actual ready date.

## 18. KPI Model

### 18.1 Backlog
- Total Backlog Count
- Total Backlog Labor Hours
- Backlog Age
- Awaiting Planning Hours
- In-Planning Hours
- Waiting-Material Hours
- Waiting-Access Hours
- Ready Backlog Hours
- Deferred Backlog Hours

### 18.2 Ready Backlog Coverage

~~~text
Ready Hours
÷
Weekly Schedulable Hours
=
Ready Backlog Weeks
~~~

Compute by trade/crew.

### 18.3 Planning Lead Time

~~~text
Ready-to-Schedule Timestamp
-
Approved Work Order Timestamp
~~~

Break down by constraint category.

### 18.4 Constraint Aging

Time from:
- constraint identified;
to:
- resolved.

### 18.5 Schedule Load

~~~text
Scheduled Hours
÷
Schedulable Capacity
~~~

### 18.6 Schedule Compliance — Count

~~~text
Completed Scheduled WOs
÷
Committed WOs
~~~

### 18.7 Schedule Compliance — Hours

~~~text
Completed Scheduled Hours
÷
Committed Scheduled Hours
~~~

### 18.8 Break-In Rate

~~~text
Break-In Labor Hours
÷
Total Executed Maintenance Labor Hours
~~~

Also provide a work-order-count view.

### 18.9 Planned Work Percentage

Recommended definition:

~~~text
Executed labor hours from Ready-to-Schedule jobs
÷
Total executed maintenance labor hours
~~~

### 18.10 Emergency Work Percentage

Emergency labor / total labor.

### 18.11 Estimate Accuracy

- labor variance;
- duration variance;
- material variance.

### 18.12 First-Pass Work Package Quality

Possible dimensions:
- no scope clarification;
- no material emergency;
- no missing tool;
- no permit failure;
- PMT pass first attempt;
- evidence complete.

### 18.13 Rework / Repeat Work

Track:
- repeat same failure mode;
- repeat same repair;
- rework within defined period;
- failed PMT;
- reopened WO.

### 18.14 Asset Readiness

- % new assets assessed;
- % maintenance-ready before operational handover;
- open critical readiness blockers;
- data completeness;
- PM strategy completeness;
- approved manual/datasheet coverage;
- spares readiness;
- training completion.

## 19. KPI Anti-Gaming

Do not optimize:
- WO closure count at the expense of quality;
- PM compliance at the expense of technical completeness;
- schedule compliance by scheduling too little;
- ready-backlog percentage by deferring difficult work;
- backlog age by canceling valid work;
- labor utilization by eliminating necessary planning/training.

Every KPI should have companion quality/risk indicators.

## 20. Core Acceptance Tests

### A. Status/readiness separation
Changing workflow status does not silently change readiness state.

### B. Blocker enforcement
Any mandatory dimension in BLOCKED prevents Ready-to-Schedule unless authorized exception rules explicitly permit it.

### C. Evidence
Ready state records the assessment revision and evidence available at the time.

### D. Reopened constraint
If reserved material becomes unavailable, the system removes the job from clean Ready state and records the reason.

### E. Material kitting
For a profile requiring KIT_COMPLETE, inventory On Hand alone cannot satisfy readiness.

### F. Access
A job requiring room/plant access cannot be Ready if the window is unconfirmed.

### G. Safety
A required permit or isolation not approved blocks readiness.

### H. Schedule source
Committed schedule accepts only Ready/authorized-exception work unless emergency workflow is invoked.

### I. Schedule version
Post-commitment changes create history; no silent overwrite.

### J. Break-in
Inserted work records reason, approval, hours, and displaced work.

### K. Job-plan history
Historical work retains the exact JobPlan revision used.

### L. Feedback
Execution feedback can create a JobPlan change candidate but cannot automatically publish a new approved revision.

### M. PMT
Critical work cannot reach Returned-to-Service if required PMT failed or is missing.

### N. Return-to-service
Completed status is distinct from Returned-to-Service when profile requires separate acceptance.

### O. Asset readiness
Commissioning PASS alone cannot satisfy Asset Maintenance Ready if mandatory maintenance-readiness dimensions are missing.

### P. Wrong datasheet/manual
A document tied to a different model or superseded revision fails the documentation gate.

### Q. PM load
A new asset cannot pass a profile requiring PM setup until required PM definitions are loaded/validated.

### R. Critical spares
If critical-spare policy requires initial stock, zero stock blocks readiness unless an authorized exception exists.

### S. Training
Where specialized competence is mandatory, incomplete training blocks readiness.

### T. Turnover open items
READY_WITH_OPEN_ITEMS is prohibited if any open item is classified Critical Blocker.

## 21. Advanced Acceptance Tests

### Capacity
Schedule Load uses schedulable—not gross—capacity.

### Multi-trade
Ready-backlog coverage is calculated separately for non-interchangeable trades.

### Planner quality
Estimate variance can be linked back to JobPlan version and task family.

### Reliability
Repeated work can link to failure mode/RCA and trigger reliability review.

### Offline
Technician can complete planned offline capture and sync later without losing evidence; conflicts are surfaced.

### Audit
Readiness overrides, schedule changes, job-plan approvals, and return-to-service approvals are auditable.

## 22. Dashboard Views

### Planner
- Needs Planning
- Aging Constraints
- Ready Backlog
- Jobs Awaiting Material
- Jobs Awaiting Access
- JobPlan Change Candidates

### Supervisor / Scheduler
- Crew Capacity
- Ready Backlog by Trade
- Weekly Schedule
- Break-In Work
- Schedule Risk
- Material Kit Status

### Engineering Manager
- Total/Ready Backlog
- Critical Overdue
- Schedule Compliance
- Planned vs Reactive
- Planning Lead Time
- Constraint Pareto
- Rework
- Reliability issues

### Chief Engineer
- property/plant risk;
- critical backlog;
- critical asset readiness;
- emergency-work trend;
- maintenance program readiness;
- cost/reliability relationship.

## 23. Data Quality Rules

- stable IDs;
- explicit units;
- time-zone-aware timestamps;
- reason codes;
- evidence references;
- revision history;
- actor attribution;
- no silent status inference;
- imported data remains source-tagged;
- planned/estimated/actual values remain separate.

## 24. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|Work Readiness Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0002 - Asset Maintenance Readiness and Project Handover Standard|Asset Maintenance Readiness]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/03_FMIS_Data_Architecture|FMIS Data Architecture]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/10_FMIS_Dashboard_and_KPI_Model|FMIS Dashboard & KPI Model]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence Master Index]] → this document
