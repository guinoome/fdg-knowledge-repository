---
document_id: FEIS-MNT-0000
title: Maintenance and Reliability Intelligence Architecture
status: Proposed Architecture Extension
owner: FDG Ecosystem
created: 2026-10-09
system: FEIS
branch: Maintenance and Reliability Intelligence
---

# FEIS-MNT-0000 — Maintenance & Reliability Intelligence Architecture

## 1. Purpose

Define the reusable FEIS engineering architecture for maintenance work management, planning, scheduling, readiness, reliability feedback, maintainability, and project-to-operations maintenance handover.

This architecture deepens, but does not replace:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-004_MAINTENANCE_INTELLIGENCE_MODULE_STANDARD|FEIP Maintenance Intelligence]].

The operating implementation for building/facility maintenance remains:

[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FBPOIS / FMIS]].

## 2. Core Principle

Maintenance performance is not determined only by whether work orders exist or are closed.

High-quality maintenance requires that the **right work is identified, sufficiently planned, realistically scheduled, safely executed, technically verified, and converted into reliability learning**.

The canonical loop is:

~~~text
Need / Defect / PM Trigger
→ Triage
→ Planning
→ Constraint Removal
→ Ready-to-Schedule
→ Schedule Commitment
→ Execution
→ Post-Maintenance Test
→ Return to Service
→ Feedback
→ Job-Plan Improvement
→ Reliability Learning
~~~

## 3. Three Readiness Layers

### 3.1 Work Readiness

Question:

> Can this specific maintenance job be committed to a schedule and executed efficiently and safely?

### 3.2 Asset Maintenance Readiness

Question:

> Can operations and maintenance sustain this asset from Day 1 using complete, validated engineering and maintenance information?

### 3.3 Maintenance Program Readiness

Question:

> Does the organization have the process, people, data, systems, governance, resources, and learning loop required to maintain its assets effectively?

FDG systems shall not compress these into one boolean.

## 4. System Ownership

| Capability | Primary owner |
|---|---|
| Engineering maintenance methods, job-plan structure, maintainability, readiness criteria, technical acceptance | FEIS |
| Facility work orders, PM occurrences, assignments, operating backlog, maintenance history, plant status | FBPOIS / FMIS |
| Asset/project delivery and implementation gates | FPJIS / FEIS Construction Management |
| Workflow automation and routing | FWAIS |
| Inventory / procurement commercial execution | Enterprise Procurement / FBIS interfaces according to authority |
| Legal/regulatory obligation | FLIS / FRCIM |
| Independent process/control audit | FAIS |
| Evidence/provenance mechanisms | FDG CORE |
| Predictive models | FDG CORE Predictive Intelligence + domain authority |
| Service packaging | FDG Service Intelligence |

## 5. Work Management Lifecycle

Recommended lifecycle:

~~~text
Observation / PM / Alarm / Request
        ↓
Maintenance Request
        ↓
Triage
        ↓
Approved Work Order
        ↓
Planning Backlog
        ↓
Job Plan / Work Package
        ↓
Constraint Removal
        ↓
Ready Backlog
        ↓
Capacity / Window Scheduling
        ↓
Committed Schedule
        ↓
Execution
        ↓
Testing / Verification
        ↓
Return to Service
        ↓
Technical Closeout
        ↓
History / Feedback / Reliability
~~~

## 6. Workflow Status Must Be Separate From Readiness

A work order may be:

~~~text
Workflow Status = Open
Readiness State = Waiting Material
~~~

or:

~~~text
Workflow Status = Approved
Readiness State = Ready to Schedule
~~~

or:

~~~text
Workflow Status = Scheduled
Readiness State = Constraint Reopened
~~~

Therefore FMIS shall not overload one status field to represent both workflow progress and planning readiness.

## 7. Recommended Work Readiness States

~~~text
Needs Triage
Awaiting Planning
In Planning
Waiting Material
Waiting Contractor
Waiting Engineering
Waiting Permit / Safety
Waiting Access / Operations
Waiting Tool / Special Equipment
Waiting Approval
Ready to Schedule
Scheduled
Constraint Reopened
Execution Ready
In Execution
Testing / Verification
Ready for Return to Service
Closed
Deferred
Cancelled
~~~

The exact UI vocabulary may be configured, but semantic meaning must remain explicit.

## 8. Readiness Dimensions

A Ready-to-Schedule gate should evaluate, as applicable:

- scope clarity;
- correct asset/location;
- priority/criticality;
- failure/defect description;
- engineering basis;
- job plan/procedure;
- safety hazards;
- isolations / LOTO;
- permits;
- labor trade/skill;
- crew size;
- estimated labor hours;
- duration;
- required materials;
- spare parts;
- material reservation / kit;
- tools;
- special equipment;
- lifting/scaffolding;
- contractor;
- technical drawings/manuals;
- access;
- operations/production window;
- environmental constraints;
- prerequisites;
- inspection/test requirements;
- acceptance criteria;
- post-maintenance test;
- return-to-service authority.

Each dimension may be:
- Ready
- Pending
- Blocked
- Not Applicable
- Accepted Risk / Authorized Exception

An overall Ready state should derive from the dimensions, with any override requiring authority and reason.

## 9. Work Package

The WorkPackage is the execution contract between planning and field execution.

Minimum content:

~~~text
WorkPackage
├── work_order
├── asset / exact location
├── scope
├── problem / condition
├── history / relevant failures
├── method / job plan
├── safety / hazards
├── isolation / LOTO
├── permits
├── required trade / skills
├── crew / duration estimate
├── materials / spares / kit
├── tools / special equipment
├── drawings / manuals
├── access / outage window
├── contractor scope
├── hold / witness points
├── test / acceptance criteria
├── restoration / return-to-service
├── required evidence
└── feedback fields
~~~

A WorkPackage may be templated by asset/job type and instantiated for each work order.

## 10. Job Plan Library

Recurring maintenance work should progressively become reusable JobPlans.

~~~text
Completed Work
→ Feedback
→ Planner Review
→ JobPlan Improvement
→ Future WorkPackage
~~~

JobPlan content may include:
- standard task sequence;
- standard labor/trade;
- expected duration;
- standard tools;
- parts/BOM;
- safety controls;
- permits;
- reference documents;
- test points;
- acceptance criteria;
- evidence requirements;
- common failure modes;
- historical actual duration;
- historical material usage.

JobPlan versioning is mandatory for controlled recurring work.

## 11. Planning and Scheduling Are Different Functions

### Planning answers:
- What exactly needs to be done?
- How should it be done?
- What resources are required?
- What must be ready first?
- How long should it take?
- How will successful completion be verified?

### Scheduling answers:
- When will the work be done?
- Which crew performs it?
- Which work window is available?
- Which jobs fit available capacity?
- What is the committed sequence?

The system may allow one person to perform both roles in a small team, but the functions should remain conceptually separate.

## 12. Planning Role

The maintenance planner should be able to:

- review incoming work;
- inspect/clarify job scope;
- inspect job site where necessary;
- review asset history;
- identify materials and services;
- identify tools/special equipment;
- identify safety/permit needs;
- estimate labor and duration;
- create/update job plan;
- identify execution constraints;
- move work into Ready Backlog only when criteria are met;
- review completed-job feedback.

## 13. Scheduling Role

The scheduler / supervisor / authorized role should be able to:

- view Ready Backlog;
- view available labor capacity;
- view maintenance windows;
- view operations constraints;
- balance criticality and priority;
- create daily/weekly schedule;
- reserve capacity;
- identify schedule break-ins;
- publish/communicate committed schedule;
- measure schedule compliance.

## 14. Ready Backlog

The Ready Backlog is not simply "all open work".

It contains only work orders meeting the Ready-to-Schedule gate.

Required views:

~~~text
Total Backlog
├── Needs Planning
├── In Planning
├── Waiting Material
├── Waiting Contractor
├── Waiting Access
├── Waiting Permit / Safety
├── Waiting Engineering
├── Waiting Approval
├── Ready to Schedule
├── Scheduled
└── Deferred
~~~

This exposes where work is actually stuck.

## 15. Constraint Register

Each blocking condition should be a structured MaintenanceConstraint.

Examples:
- material unavailable;
- long-lead spare;
- contractor unavailable;
- access unavailable;
- room occupied;
- production window unavailable;
- shutdown not approved;
- permit pending;
- engineering clarification;
- drawing/manual missing;
- special tool unavailable;
- crane/scaffold required;
- manpower unavailable;
- safety prerequisite;
- regulatory prerequisite.

Constraint fields:
- type;
- owner;
- date identified;
- required-by date;
- expected resolution;
- actual resolution;
- blocker severity;
- linked work orders;
- escalation;
- evidence.

## 16. Material Reservation and Kitting

A part existing in inventory does not automatically mean the job is material-ready.

Material readiness states should include:

~~~text
Identified
On Hand
Reserved
Picked
Kitted
Staged
Issued
Consumed
Returned
Short
Substituted — Review Required
~~~

The Ready gate may require **Reserved/Kitted/Staged** depending on criticality and operating practice.

## 17. Weekly / Daily Scheduling Pattern

A mature process may use:

~~~text
Backlog Review
→ Planning
→ Constraint Removal
→ Ready Backlog Review
→ Operations Coordination
→ Capacity Check
→ Weekly Schedule Commitment
→ Daily Adjustment Within Governance
→ Execute
→ Schedule Compliance Review
~~~

Emergency work may break the schedule, but the break-in should be measured rather than normalized.

## 18. Schedule Commitment

A ScheduleCommitment should record:

- schedule period;
- frozen/committed time;
- crew/trade;
- capacity hours;
- scheduled labor hours;
- work orders;
- planned outage/access windows;
- operations approval where required;
- baseline version;
- changes after commitment;
- break-in work;
- reasons;
- achieved work;
- uncompleted reason.

## 19. Execution Feedback

Technicians should not only close the job.

They should return planning intelligence:

- actual labor hours;
- actual elapsed time;
- actual parts;
- unexpected work;
- missing part/tool;
- access issue;
- safety issue;
- procedure issue;
- better task sequence;
- additional defect;
- follow-up work;
- test result;
- condition after work;
- photos/evidence.

This is the mechanism by which job plans improve.

## 20. Return-to-Service Gate

Work completion and return to service are separate when consequence warrants.

Recommended sequence:

~~~text
Repair Complete
→ Post-Maintenance Test
→ Defect Cleared?
→ Safety / Protection Restored?
→ Guards / Covers / Isolation Restored?
→ Operational Test
→ Technical Verification
→ Operations Acceptance where required
→ Returned to Service
~~~

## 21. Planning Quality Loop

~~~text
Estimate
vs
Actual
        ↓
Variance
        ↓
Reason
        ↓
JobPlan Update Candidate
        ↓
Planner / Engineering Review
        ↓
Approved JobPlan Revision
~~~

The system should learn from execution without silently rewriting controlled procedures.

## 22. Reliability Feedback

Work-management data must feed reliability:

~~~text
Repeat Work
Schedule Break-In
Emergency Work
Planning Defect
Material Shortage
Repair Duration
Failure Mode
Post-Maintenance Test
        ↓
Reliability Analysis
        ↓
PM / Strategy / Spare / Design Change
~~~

This connects to:

[[07_Nex_Core_Intelligence/NEX_CORE_FAILURE_MODE_AND_RELIABILITY_INTELLIGENCE_STANDARD|Nex Failure Mode & Reliability Intelligence]].

## 23. Asset Maintenance Readiness

A new/modified asset should not be considered operations-ready solely because commissioning passed.

Maintenance readiness also requires, as applicable:

- asset hierarchy / IDs;
- master data;
- criticality;
- manufacturer/model/serial;
- design/operating ranges;
- commissioning baseline;
- maintenance strategy;
- PM tasks/triggers;
- job plans;
- lubrication requirements;
- calibration requirements;
- consumables/spare parts;
- critical spares;
- tools/special tools;
- manuals/drawings;
- warranty;
- service contract;
- OEM contacts;
- isolations/LOTO points;
- training;
- regulatory obligations;
- monitoring points;
- condition baseline;
- CMMS/FMIS loaded records;
- ownership/responsibility;
- open punch exceptions.

Detailed gate:

[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0002 - Asset Maintenance Readiness and Project Handover Standard|FEIS-MNT-0002]].

## 24. Maintenance Program Readiness

The organization should periodically be able to assess:

- asset-register completeness;
- criticality coverage;
- PM/strategy coverage;
- job-plan coverage;
- backlog quality;
- ready-backlog health;
- material/spare readiness;
- schedule discipline;
- workforce skills;
- contractor readiness;
- documentation quality;
- failure feedback;
- KPI quality;
- CMMS/FMIS data quality;
- reporting;
- governance;
- auditability;
- learning.

This can become a scored assessment but the score must remain explainable by dimension.

## 25. Local-First / Field Behavior

Core technician functions should support offline capture where practical:

- open assigned work;
- read work package;
- access cached documents;
- record readings;
- checklist completion;
- photos;
- parts used;
- labor/time;
- findings;
- test results;
- feedback;
- signature/verification.

Synchronization conflicts remain:

**Conflict — Review Required.**

## 26. Predictive Intelligence Boundary

Condition monitoring or predictive models may create:

~~~text
Prediction / Anomaly
→ Maintenance Request Candidate
→ Human / Rule Triage
→ Work Order
→ Normal Readiness / Planning Process
~~~

A prediction does not bypass:
- work readiness;
- safety;
- parts;
- access;
- engineering authority;
- verification.

## 27. Automation Boundary

FWAIS may:

- route requests;
- detect missing readiness fields;
- notify constraint owners;
- identify aging blockers;
- propose schedules;
- generate work-pack drafts;
- assemble evidence;
- trigger follow-up;
- produce reports.

FWAIS may not mark high-consequence work Ready or Returned to Service by inference alone.

## 28. Governance

High-consequence readiness exceptions require explicit authority.

Examples:
- life-safety system;
- critical plant;
- statutory inspection;
- energized work;
- material substitution;
- bypassed acceptance test;
- critical spare unavailable;
- degraded return-to-service condition.

## 29. Related Standards

- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|Work Readiness, Planning & Scheduling]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0002 - Asset Maintenance Readiness and Project Handover Standard|Asset Maintenance Readiness]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|Data Model, KPI & Acceptance Tests]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|FMIS Corrective Maintenance & Work Orders]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/08_FMIS_Materials_Spares_and_Procurement|FMIS Materials, Spares & Procurement]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/09_FMIS_Maintenance_Status_and_Reliability|FMIS Maintenance Status & Reliability]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence Master Index]] → this document
