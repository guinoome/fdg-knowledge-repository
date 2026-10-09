---
document_id: FEIS-MNT-0004
title: Maintenance Program Readiness and Maturity Assessment Standard
status: Proposed Engineering Standard
owner: FEIS Maintenance & Reliability Intelligence
created: 2026-10-09
---

# FEIS-MNT-0004 — Maintenance Program Readiness & Maturity Assessment Standard

## 1. Purpose

Define an explainable assessment for determining whether a maintenance organization is capable of consistently turning asset needs into safe, planned, executable, verified, and learning-driven maintenance.

This is the third readiness layer in the FEIS maintenance architecture:

~~~text
Work Ready
Asset Maintenance Ready
Maintenance Program Ready
~~~

It does not replace work-order or asset-level readiness.

## 2. Core Principle

A maintenance organization is not "ready" because it owns a CMMS, has a PM calendar, or closes many work orders.

Program readiness requires aligned capability across people, process, engineering data, materials, planning/scheduling, execution quality, reliability, governance, and learning.

## 3. Assessment Domains

### A. Governance & Ownership
Evaluate:
- maintenance policy/charter;
- decision authority;
- role clarity;
- escalation;
- engineering/operations boundary;
- approval authority;
- exception governance;
- auditability.

### B. Asset Information
Evaluate:
- asset hierarchy;
- master-data completeness;
- stable IDs;
- technical attributes;
- criticality;
- configuration/change control;
- document linkage;
- ownership.

### C. Maintenance Strategy
Evaluate:
- preventive / condition / predictive / run-to-failure rationale;
- statutory requirements;
- PM coverage;
- strategy review;
- failure-mode alignment;
- optimization process.

### D. Work Identification & Triage
Evaluate:
- request quality;
- duplicate detection;
- priority model;
- emergency classification;
- defect evidence;
- containment;
- conversion from request to approved work.

### E. Planning
Evaluate:
- Planning Backlog;
- planner role/capacity;
- field investigation;
- JobPlan reuse;
- labor/duration estimates;
- parts/tools identification;
- safety/access prerequisites;
- test/acceptance planning.

### F. Readiness & Constraints
Evaluate:
- readiness dimensions;
- Ready-to-Schedule gate;
- waiting-reason taxonomy;
- constraint ownership;
- blocker aging;
- authorized exceptions;
- Ready Backlog quality.

### G. Scheduling
Evaluate:
- schedulable capacity;
- weekly/daily commitment;
- operations coordination;
- maintenance windows;
- frozen schedule;
- break-in control;
- schedule compliance.

### H. Workforce & Competency
Evaluate:
- trade coverage;
- skill/certification;
- cross-training;
- supervision;
- contractor capability;
- workload;
- training plan;
- technical competency evidence.

### I. Materials / Spares / Tools
Evaluate:
- critical-spares strategy;
- min/max/reorder;
- lead times;
- reservation;
- kitting/staging;
- substitute control;
- special tools;
- calibrated test equipment;
- procurement interface.

### J. Safety / Permit / Isolation
Evaluate:
- hazards;
- LOTO;
- permit integration;
- energized/critical work controls;
- work-at-height/confined-space/hot-work interfaces;
- safe restoration.

### K. Execution & Field Evidence
Evaluate:
- mobile/offline execution;
- procedure access;
- readings/checklists;
- photos/evidence;
- actual labor/material capture;
- findings/follow-up;
- technician feedback;
- quality of completion records.

### L. Post-Maintenance Test & Return to Service
Evaluate:
- defined PMT;
- acceptance rules;
- technical verification;
- failed-test handling;
- restoration controls;
- operations acceptance;
- restrictions/degraded return.

### M. Reliability & Defect Elimination
Evaluate:
- failure capture;
- repeat-failure detection;
- RCA;
- FMEA where applicable;
- MTBF/MTTR;
- rework;
- bad-actor review;
- corrective/preventive improvements;
- effectiveness verification.

### N. Cost / Performance Intelligence
Evaluate:
- maintenance cost by asset/system;
- labor/material/contractor cost;
- planned vs reactive mix;
- backlog labor hours;
- schedule performance;
- availability;
- verified value from improvements.

### O. CMMS / FMIS & Data Quality
Evaluate:
- system-of-record clarity;
- workflow fit;
- data validation;
- role/access;
- revision/history;
- offline behavior;
- integration boundaries;
- searchability;
- data ownership;
- backups/export/audit controls.

### P. Project-to-Maintenance Handover
Evaluate:
- maintenance involvement in design/procurement;
- maintainability requirements;
- T&C baseline;
- asset data handover;
- PM/JobPlan setup;
- spares/tools;
- manuals/as-builts;
- training;
- Maintenance-Ready Gate.

### Q. Learning & Continuous Improvement
Evaluate:
- execution feedback;
- JobPlan improvement;
- PM optimization;
- reliability learning;
- lessons learned;
- recurring constraint analysis;
- standards/procedure change governance;
- verified outcome capture.

## 4. Evidence Levels

Each domain assessment should distinguish evidence quality.

Recommended evidence classes:

~~~text
E0 — No Evidence
E1 — Claimed / Verbal
E2 — Documented
E3 — Implemented / Transaction Evidence
E4 — Measured / Repeated
E5 — Verified Effective / Audited Outcome
~~~

A policy document alone cannot prove operational maturity.

## 5. Capability States

Recommended domain states:

~~~text
0 — Absent
1 — Reactive / Ad Hoc
2 — Defined
3 — Operational
4 — Measured / Controlled
5 — Learning / Optimized
~~~

These are maturity descriptors, not marketing grades.

## 6. Critical Gates

Regardless of aggregate score, the program must surface critical blockers such as:

- critical assets missing from asset register;
- unsafe isolation/permit control;
- statutory maintenance obligations unmanaged;
- critical spare gaps with no mitigation;
- no controlled return-to-service process for critical equipment;
- systemic failed PMT/rework without corrective action;
- inability to reconstruct maintenance history;
- work regularly executed without sufficient scope/safety information;
- new critical assets entering operation without minimum maintenance setup.

A high average score cannot hide a critical blocker.

## 7. Assessment Record

Recommended object:

~~~text
MaintenanceProgramReadinessAssessment
├── assessment_id
├── organization / site
├── scope
├── assessment_date
├── assessor
├── domains[]
├── evidence_refs[]
├── maturity_state_by_domain
├── critical_blockers[]
├── strengths[]
├── gaps[]
├── recommendations[]
├── prioritized_actions[]
├── target_state
├── reassessment_date
└── approval / review
~~~

## 8. Gap Prioritization

Rank improvement actions by:

- safety/regulatory consequence;
- operational consequence;
- reliability impact;
- frequency/recurrence;
- backlog impact;
- maintainability;
- effort/cost;
- dependency;
- time-to-value.

Do not automatically prioritize the lowest-scoring domain if a different domain carries greater consequence.

## 9. Improvement Roadmap

Recommended sequence:

~~~text
Stabilize Safety / Compliance
→ Establish Asset & Work Data
→ Improve Triage / Planning / Readiness
→ Establish Schedule Discipline
→ Strengthen Materials / Workforce
→ Improve Execution Evidence
→ Close Reliability Loop
→ Add Analytics / Optimization
→ Add Predictive / Advanced Automation
~~~

This sequencing is intentionally foundation-first.

## 10. Assessment Outputs

Possible outputs:

- executive readiness summary;
- domain maturity matrix;
- critical blocker register;
- backlog/readiness baseline;
- asset-data gap register;
- JobPlan / PM gap register;
- spares/tool readiness register;
- KPI baseline;
- 30/60/90-day action plan;
- longer-term capability roadmap;
- reassessment plan.

## 11. FBPOIS / FMIS Application

FBPOIS/FMIS may use the assessment to prioritize implementation and data cleanup, but the score is not a substitute for actual transactional evidence.

The detailed operating system remains:

[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FMIS]].

## 12. Service Application

FDG Service Intelligence may package a bounded Maintenance Program Readiness Assessment as a service only after scope, evidence burden, professional boundaries and customer value are validated.

Service output should identify:
- facts;
- missing evidence;
- risks;
- recommendations;
- client-owned decisions.

## 13. Audit Relationship

FAIS may independently audit whether:
- evidence supports claimed maturity;
- readiness exceptions are controlled;
- corrective actions close systemic gaps;
- improvements remain effective.

Assessment and audit are related but not identical.

## 14. Predictive Technology Gate

Advanced predictive maintenance should not be treated as evidence of a mature maintenance program if:

- asset data is poor;
- work orders are unreliable;
- failure modes are not captured;
- readiness and planning are weak;
- PMT/outcome data is missing.

The progression remains:

~~~text
Reliable Maintenance Data
→ Controlled Work Management
→ Reliability Analytics
→ Statistical / Predictive Models
→ Verified Intervention Outcomes
~~~

## 15. Acceptance Criteria

A compliant assessment must:

1. define scope;
2. rate all applicable domains;
3. reference evidence;
4. distinguish documentation from implementation;
5. expose critical blockers separately from score;
6. preserve assessor/reviewer;
7. provide prioritized actions;
8. retain previous assessments;
9. show progress/regression over time;
10. avoid unsupported claims of maturity.

## 16. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0000 - Maintenance and Reliability Intelligence Architecture|Maintenance & Reliability Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|Work Readiness, Planning & Scheduling]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0002 - Asset Maintenance Readiness and Project Handover Standard|Asset Maintenance Readiness]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|Data Model, KPI & Acceptance Tests]]
- [[14_FDG_Service_Intelligence_System/02_Service_Portfolio/Operations_and_Maintenance_Services/FSvIS-OM-0001 - Maintenance Evidence and Monthly Engineering Reporting Service|Maintenance Evidence & Monthly Reporting Service]]
- [[22_FDG_Audit_Intelligence_System/17_Corrective_and_Preventive_Actions/FAIS-CAPA-1700 - Corrective and Preventive Action|FAIS CAPA]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability Intelligence Master Index]] → this document
