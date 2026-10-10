---
document_id: FEIS-CM-0902
title: FDG Project Operations OS — Construction Project Management Complete Detailed Blueprint
status: Future Build Specification / Implementation-Ready Blueprint
owner: FDG Ecosystem
created: 2026-10-10
implementation_state: BUILD_READY when dependencies are resolved; not yet claimed as implemented
knowledge_policy: Additive; implement existing governed architecture without duplication
---

# FEIS-CM-0902 — FDG Project Operations OS — Construction Project Management Complete Detailed Blueprint


## 0. Canonical Identity and Placement

This blueprint belongs to the existing **Construction Project Management / FDG Project Operations OS** work.

Canonical naming:

~~~text
FDG Project Operations OS
        ↓
Initial Reference Implementation:
FDG Engineering Construction Management
        ↓
Primary Cross-Role Experience:
FDG Project Control Console
        ↓
First Role Experience:
FDG Construction Manager Workbench
~~~

Historical shorthand may refer to **FDG Construction OS**, but this document does not create a new intelligence-system mother, a separate source of truth, or a new top-level OS repository branch.

Canonical knowledge remains under:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FEIS Engineering Construction Management]]

with shared construction knowledge under:

[[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|FDG Digital Construction & Engineering Knowledge Library]].

The architecture composes existing FDG capabilities. Shared project/company concepts initially reuse [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]], deployment/synchronization patterns remain compatible with FPIS control/edge patterns, and construction lifecycle/engineering acceptance authority remains under FEIS.

Do **not** create a separate top-level "FDG Project Operations OS" folder unless a future governed repository decision explicitly authorizes one.


## 1. Purpose

This document converts the approved FDG Project Operations OS / Construction Management architecture into a build-oriented specification for its first major commercial vertical: FDG Engineering Construction Management / Project Controls.

It does not create a new construction system. It implements:

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FEIS Construction Management Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FEIS Construction Management]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FDG Project Control Console]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]]

The specification is intended as a common build contract for future OpenAI, Codex, Claude, local-model, or human implementation teams.

## 2. Product Definition

The initial FDG Engineering Construction Management reference implementation is a local-first, mobile-capable, evidence-driven Construction Project Control platform.

Primary experience:

~~~text
PLAN
→ ESTIMATE
→ EXECUTE
→ TRACK
→ DOCUMENT
~~~

Canonical lifecycle and authority remain under FEIS-CM.

The core behavior to prove is:

> A validated project event is recorded once, then every legitimate dependent view recalculates from that same source record.

## 3. Product Boundary

### In scope

- engineering-company shared project foundation;
- construction project setup;
- WBS/work packages;
- baseline/current planning;
- field execution capture;
- progress validation;
- manpower/equipment/material records;
- risk/constraint/action/decision;
- RFI/submittal/inspection/NCR;
- document control;
- daily/weekly/monthly reports;
- dashboard / S-curve / progress;
- estimate/cost basis;
- variation and billing-support separation;
- T&C/turnover;
- project continuity;
- toolkit migration;
- offline field capture;
- audit/provenance;
- role Workbenches;
- controlled automation;
- future analytics/predictive adapters.

### Out of scope as duplicated authority

- HR/payroll;
- legal-rule authorship;
- accounting ledger;
- enterprise procurement ownership;
- safety authority;
- general CRM authority;
- FPJIS project-build governance;
- provider-specific model logic.

These remain connected systems/interfaces.

## 4. Required Reading Before Build

1. [[Projects/Future/FDG Project Operations OS/FDG Project Operations OS-0001 - Complete Detailed Blueprint|FDG Project Operations OS Complete Detailed Blueprint]]
2. [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]
3. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management Master Index]]
4. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Construction Lifecycle]]
5. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Architecture]]
6. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Project Continuity]]
7. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0004 - Named User Session and Subscription Control Standard|Named User Session Control]]
8. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Role Intelligence]]
9. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Construction Document Intelligence]]
10. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|Embedded Learning]]
11. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]]
12. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]
13. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Construction Manager Workbench]]
14. [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]]
15. [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Toolkit → Platform]]
16. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|FEIS-CM-0900 — Multi-Collaborator Build Handover]]

## 5. Capability Maturity Labels

Every capability must carry one explicit state:

~~~text
DESIGNED
BUILD_READY
IMPLEMENTED
TESTED
DEPLOYED
COMMERCIALLY_VALIDATED
~~~

Blueprint existence never means implemented. Deployment never means commercially validated.

## 6. Initial Roles

- Owner / Company Administrator
- Project Manager
- Construction Manager
- Project Controls Engineer
- Site Engineer
- QS / Commercial Engineer
- QA/QC Engineer
- Document Controller
- T&C / Turnover Engineer
- Client / Consultant Reviewer
- Executive / Read-Only

Each role consumes the same project truth through different authority and experience projections.

## 7. Project Control Console

Primary navigation:

~~~text
HOME
PLAN
ESTIMATE
EXECUTE
TRACK
DOCUMENT
WORKBENCH
SEARCH
ATTENTION
~~~

Persistent context:
- organization;
- project;
- package;
- discipline;
- area/system;
- reporting period;
- active role;
- data freshness;
- offline/sync state.

## 8. HOME — Project Command Interface

The home screen should answer:

1. What is current project status?
2. What changed?
3. What needs attention?
4. What decision is needed?
5. What should happen next?

Recommended sections:

### Hero + Live Data Overlay
- project identity;
- project phase;
- physical progress;
- planned progress;
- variance;
- next milestone;
- last validated update;
- decomposable project health.

### Main intelligence
- planned vs actual / S-curve;
- milestones / schedule;
- cost / commitments;
- procurement / materials;
- RFI / submittal / inspection aging;
- risk / constraints;
- variation / claims;
- Attention Center;
- recent evidence;
- upcoming work;
- handover readiness.

## 9. PLAN — Detailed Screen Map

1. Project Setup
2. WBS
3. Baseline Schedule
4. Current Schedule
5. Milestones
6. Look-Ahead
7. Risks
8. Constraints
9. Actions
10. Decisions
11. Procurement Plan
12. Submittal Plan
13. Inspection Plan
14. Manpower Plan
15. Equipment Plan
16. Mobilization / Logistics
17. Deliverables
18. Interface Matrix

Minimum WBS fields:

~~~text
wbs_id
project_id
parent_id
code
name
description
package
discipline
area
system
unit
planned_quantity
weight
start
finish
responsible_org
responsible_role
status
baseline_revision
~~~

## 10. ESTIMATE — Detailed Screen Map

1. QTO
2. BOQ
3. BOM
4. Material Rates
5. Labor Rates
6. Equipment Rates
7. Rate Build-Up
8. Estimate
9. Budget
10. Supplier/Subcontractor Comparison
11. Procurement Forecast
12. Variation Costing
13. Claim Support
14. Cost Summary

Commercial states must remain separate:

~~~text
ESTIMATE
BUDGET
COMMITTED
ACTUAL
FORECAST
VARIATION_PROPOSED
VARIATION_APPROVED
BILLABLE
BILLED
PAID
~~~

Each cost line preserves source, quantity, unit, formula/basis, rate source, effective date, revision, reviewer, and approval.

## 11. EXECUTE — Detailed Screen Map

1. Today
2. Site Event
3. Daily Accomplishment
4. Manpower
5. Equipment
6. Material Delivery
7. Material Issue / Usage
8. Inspection
9. Quality
10. Safety Interface
11. Constraint / Issue
12. Photo Evidence
13. Site Instruction
14. Punch / Deficiency
15. Offline Queue

SiteEvent minimum contract:

~~~text
site_event_id
project_id
date_time
reporting_date
location_id
wbs_id
work_package_id
activity_id
description
reported_quantity
unit
manpower_summary
equipment_summary
material_summary
weather_or_site_condition
inspection_state
quality_state
safety_state
constraint_refs
photo_refs
document_refs
reported_by
validation_state
validated_by
validated_at
source_device
sync_state
revision
~~~

## 12. TRACK — Detailed Screen Map

1. Progress Dashboard
2. S-Curve
3. Planned vs Actual
4. Milestones
5. Productivity
6. Manpower Performance
7. Equipment Utilization
8. Material / Procurement
9. Workflow Aging
10. Risk / Constraint
11. Delay Analysis
12. Recovery Plan
13. Variation / Claim
14. Cost / Forecast
15. Daily Report
16. Weekly Report
17. Monthly Report
18. Executive Summary
19. Photo Report
20. Handover Readiness

## 13. DOCUMENT — Detailed Screen Map

1. Document Register
2. Drawing Register
3. RFI
4. Site Instruction
5. WIR / IR
6. MIR
7. Method Statement
8. Material Submittal
9. Technical Submittal
10. NCR
11. Transmittal
12. Meeting Minutes
13. Correspondence
14. Variation / Change Notice
15. Contractual Notice
16. Claim Support
17. Punch List
18. T&C
19. As-Built Register
20. O&M Manual Register
21. Warranty Register
22. Training Records
23. Asset Register
24. Turnover Dossier

## 14. Shared Domain Model

Core entities:

~~~text
Organization
Branch
Department
User
Role
Authority
ProjectMembership

Client
Consultant
Contractor
Supplier

Project
Site
Contract
Package
Discipline
Area
System

WBSItem
Activity
Milestone
WorkPackage

QuantityItem
QTORecord
BOQItem
BOMItem
EstimateLine
RateBuildUp
BudgetLine
CostRecord
Variation
BillingSupport

SiteEvent
ProgressRecord
ManpowerRecord
EquipmentRecord
MaterialRecord

Risk
Constraint
Issue
Action
Decision

RFI
Submittal
Inspection
MIR
NCR
PunchItem

Document
DocumentRevision
Transmittal
Correspondence
MeetingMinute

ReportPeriod
ReportSnapshot

Evidence
Approval
AuditEvent
Comment
Notification

TestRecord
TurnoverItem
AssetHandoverRecord
HandoverPackage
ContinuationBrief
~~~

## 15. Domain Relationship Rules

- Every operational record belongs to one project.
- WBS/work package connects planning to execution and progress.
- Evidence may be referenced by multiple legitimate records.
- Controlled baselines/documents preserve revisions.
- Authorship, review, and approval are distinct.
- Deletion never destroys required audit history.
- Imported data remains source-tagged until validated.

## 16. Capture Once Dependency Graph

~~~text
SiteEvent
├── quantity
├── manpower
├── equipment
├── material
├── photo
├── issue / constraint
└── inspection state
        ↓
Validation
        ↓
Canonical Records
        ├── Progress
        ├── Daily Report
        ├── Weekly Report
        ├── Monthly Report
        ├── S-Curve
        ├── Manpower Report
        ├── Equipment Report
        ├── Material Usage
        ├── QA/QC Status
        ├── Constraint Register
        ├── Billing Support Candidate
        └── Executive Summary
~~~

No legitimate downstream output should require manual re-encoding of the same event.

## 17. Progress State Model

Mandatory states:

~~~text
FIELD_REPORTED
PHYSICALLY_VERIFIED
QAQC_ACCEPTED
COMMERCIALLY_BILLABLE
BILLED
PAID
~~~

Example:

~~~text
Reported = 100 m²
Verified = 95 m²
QA/QC Accepted = 90 m²
Billable = 90 m²
Billed = 80 m²
Paid = 70 m²
~~~

The UI must never collapse these into one ambiguous quantity.

## 18. Progress and S-Curve Calculations

Work-item progress:

~~~text
progress_percent
=
approved_progress_quantity
÷
approved_scope_quantity
× 100
~~~

The applicable approved-progress state must be defined by project method.

Weighted project progress:

~~~text
project_progress
=
sum(item_progress × approved_weight)
÷
sum(approved_weight)
~~~

Weight basis must be explicit and controlled.

S-Curve inputs:
- approved baseline;
- reporting calendar;
- progress weights;
- actual accepted progress;
- current/forecast schedule if used.

S-Curve outputs:
- planned cumulative;
- actual cumulative;
- forecast cumulative;
- variance;
- evidence reference.

## 19. RFI State Machine

~~~text
DRAFT
→ INTERNAL_REVIEW
→ ISSUED
→ ACKNOWLEDGED
→ RESPONSE_RECEIVED
→ RESPONSE_UNDER_REVIEW
→ CLOSED
~~~

Overdue state is derived from due date and non-closure.

Minimum fields:
- number;
- subject;
- originator;
- recipient;
- linked drawing/WBS;
- question;
- evidence;
- issued date;
- due date;
- response;
- impact;
- disposition;
- close authority.

## 20. Submittal State Machine

~~~text
DRAFT
→ INTERNAL_REVIEW
→ SUBMITTED
→ UNDER_REVIEW
→ APPROVED
→ APPROVED_WITH_COMMENTS
→ REVISE_RESUBMIT
→ REJECTED
→ CLOSED
~~~

All resubmissions preserve revision history.

## 21. Inspection State Machine

~~~text
DRAFT
→ REQUESTED
→ SCHEDULED
→ INSPECTED
→ PASSED
→ PASSED_WITH_COMMENTS
→ FAILED
→ RECTIFICATION
→ REINSPECTION
→ CLOSED
~~~

Outcome must reference evidence and acceptance criteria.

## 22. NCR State Machine

~~~text
OPEN
→ CONTAINMENT
→ REVIEW_OR_ROOT_CAUSE
→ CORRECTIVE_ACTION
→ VERIFICATION
→ CLOSED
~~~

Where formal RCA is required, consume governed RCA capability instead of inventing a second method.

## 23. Variation / Change State Machine

~~~text
IDENTIFIED
→ NOTICE_REQUIRED
→ NOTICE_ISSUED
→ TECHNICAL_EVALUATION
→ COST_EVALUATION
→ SUBMITTED
→ UNDER_REVIEW
→ APPROVED
→ REJECTED
→ WITHDRAWN
→ INCORPORATED
~~~

Commercial and contractual authority remains role-governed.

## 24. Document Revision Contract

Minimum:

~~~text
document_id
document_number
document_type
title
project_or_package
revision
status
originator
recipient
issue_date
response_due
current_revision_flag
supersedes_revision
file_or_evidence
linked_wbs
linked_asset
approval_state
~~~

Only one revision may be current under a controlled rule. Superseded files remain retrievable.

## 25. Report Projection Contract

### Daily Report
Derived from:
- site events;
- manpower;
- equipment;
- material;
- inspections;
- HSE status;
- constraints/issues;
- photos;
- weather/site conditions.

### Weekly Report
Derived from:
- validated daily records;
- progress movement;
- schedule/milestones;
- workflow aging;
- constraints/risks;
- procurement/material;
- commercial changes;
- look-ahead.

### Monthly Report
Derived from:
- approved reporting period;
- progress;
- schedule;
- cost/commercial state where authorized;
- productivity;
- procurement;
- quality/HSE;
- decisions;
- major risks;
- recovery;
- evidence.

Narrative may be assisted. Numeric facts may not be fabricated.

## 26. Toolkit Migration

Examples:

~~~text
Daily Report XLSX
→ SiteEvent + Manpower + Equipment + Material + Photo

RFI Tracker XLSX
→ RFI

Submittal Tracker XLSX
→ Submittal

Material Tracker XLSX
→ Material records

S-Curve XLSX
→ Baseline + ProgressRecord

Risk Register XLSX
→ Risk

Action Tracker XLSX
→ Action
~~~

Import process:

~~~text
Upload
→ Detect Template / Version
→ Map
→ Validate
→ Detect Duplicates
→ Flag Conflicts
→ Preview
→ Authorized Commit
→ Preserve Provenance
~~~

## 27. Offline Architecture

~~~text
Canonical Cloud Store
        ↑       ↓
Sync Engine
        ↑       ↓
Local Device Store
        ↓
Field PWA
~~~

Supported offline first:
- today's work;
- site event;
- manpower;
- equipment;
- photos;
- inspection/checklist;
- material receipt/use;
- issue/constraint;
- punch.

States:

~~~text
LOCAL_DRAFT
QUEUED
SYNCING
SYNCED
CONFLICT_REVIEW_REQUIRED
REJECTED
~~~

No silent conflict overwrite.

## 28. Identity and Session Contract

Default named seat rule:

> One named human identity = one active interactive session at a time.

Requirements:
- controlled takeover;
- revoke;
- historical authorship preserved;
- no user renaming to transfer history;
- kiosk/system/service accounts require explicit special account types and restricted authority.

## 29. Permission Model

Permission layers:

1. organization role;
2. project membership;
3. project role;
4. module entitlement;
5. record/state authority;
6. approval authority.

Examples:
- Site Engineer may create field records but not approve billing.
- QA/QC may disposition inspections under assigned authority.
- Document Controller may issue revisions but not approve engineering content.
- Client reviewer may approve scoped submissions but not edit source records.

## 30. Attention Center

AttentionItem fields:

~~~text
attention_id
type
severity
subject
why_it_matters
evidence_refs
impact
owner
due_at
recommended_next_action
allowed_actions
source_rule
status
~~~

Examples:
- overdue RFI;
- critical material delay;
- milestone risk;
- failed inspection;
- unresolved NCR;
- contractual notice deadline;
- missing turnover document.

## 31. Search and Project Memory

Search should cover, subject to authority:

- documents;
- RFIs;
- decisions;
- site events;
- inspections;
- photos/evidence;
- risks/constraints;
- reports;
- correspondence;
- commercial records.

Results expose type, context, current/superseded state, date, author, evidence, and permissions.

## 32. Continuation Brief

Auto-generated from live records:

~~~text
Project Identity
Current Phase
Overall Progress
Next Milestones
Current Schedule Risks
Critical Constraints
Pending Decisions
Open RFIs
Open Submittals
Open Inspections / NCR
Procurement Risks
Commercial Issues
T&C / Turnover Status
Recent Key Decisions
Important Evidence
Immediate Next Actions
Role Contacts
~~~

This is not a manually maintained parallel handover file.

## 33. Role Workbench Contract

Inputs:
- role;
- authority;
- project state;
- due dates;
- open work;
- evidence.

Modes:
- Explain
- Review
- Draft
- Plan
- Compare
- Act Through Workflow

The Workbench cannot bypass permissions.

## 34. Automation Contract

Permitted:
- reminders;
- routing;
- stale-item detection;
- missing-field detection;
- report drafts;
- draft correspondence;
- next-action proposals;
- schedule candidates;
- handover package assembly.

Requires human/domain authority:
- engineering approval;
- NCR closure;
- inspection acceptance;
- variation approval;
- billing approval;
- contractual notice issuance;
- final handover acceptance.

## 35. Predictive Intelligence Roadmap

Progression:

~~~text
Deterministic Project Controls
→ Statistical Trend Detection
→ Forecast
→ Predictive Risk
→ Optimization
→ Bounded Automation
~~~

Future candidates:
- milestone delay probability;
- procurement delay risk;
- productivity deterioration;
- cost overrun risk;
- RFI/submittal bottleneck;
- turnover-readiness risk.

Governed by:
[[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Predictive Intelligence]].

## 36. Technical Architecture

Initial architecture should prefer a modular monolith unless evidence justifies service decomposition.

~~~text
Presentation / PWA
        ↓
Application Services
        ↓
Domain Layer
        ↓
Repository / Data Access
        ↓
Canonical Database + Object Storage
        ↓
Audit / Evidence / Search
~~~

Provider adapters:
- authentication;
- files/storage;
- email/notifications;
- report/document generation;
- spreadsheet import/export;
- model providers;
- future ERP/accounting/procurement integrations.

## 37. Suggested Code Modules

~~~text
core
identity
organizations
projects
planning
estimating
execution
progress
materials
quality
documents
commercial
reporting
handover
evidence
audit
search
sync
notifications
automation
adapters
~~~

These are logical boundaries, not mandatory separate services.

## 38. API Principles

- stable IDs;
- explicit project scope;
- idempotent import/sync;
- optimistic concurrency;
- server-side authorization;
- audit of controlled actions;
- structured errors;
- provenance on generated outputs.

Representative resources:

~~~text
/projects
/projects/{id}/wbs
/projects/{id}/site-events
/projects/{id}/progress
/projects/{id}/risks
/projects/{id}/constraints
/projects/{id}/rfis
/projects/{id}/submittals
/projects/{id}/inspections
/projects/{id}/documents
/projects/{id}/reports
/projects/{id}/turnover
/imports
/sync
/search
~~~

## 39. Data Integrity Rules

- no orphan project records;
- stable IDs never reused;
- explicit units;
- timezone-aware timestamps;
- planned/forecast/actual states separated;
- current/superseded state separated;
- author/reviewer/approver separated;
- controlled records preserve history;
- report snapshots preserve source cutoff;
- no hidden fallback formulas;
- stale records cannot silently appear current.

## 40. Evidence Model

Minimum:

~~~text
evidence_id
project_id
file_hash_or_reference
source
captured_or_uploaded_by
captured_at
device_or_source
record_links
classification
revision
retention_state
validation_state
~~~

Evidence may legitimately support more than one record through references.

## 41. Report Snapshot

ReportSnapshot records:
- project;
- report type;
- period;
- generated timestamp;
- source cutoff;
- source revision set/hash where practical;
- metrics;
- narrative;
- attachments;
- generated by;
- reviewer;
- approval;
- issued version.

A later source correction cannot silently rewrite an already issued historical report.

## 42. Audit Events

Audit:
- login/session takeover;
- role changes;
- project membership;
- approvals;
- document revisions;
- progress validation;
- billing-support validation;
- variation disposition;
- NCR closure;
- report issue;
- import commit;
- conflict resolution;
- handover acceptance.

## 43. Commercial Journey

~~~text
Public Content / Mini Tool
        ↓
Starter Toolkit
        ↓
Complete Toolkit
        ↓
Connected Toolkit
        ↓
Import Existing Data
        ↓
Activate Full Project
        ↓
Team Collaboration
        ↓
Portfolio
        ↓
Enterprise / White-Label
        ↓
Professional Services
~~~

Customers should be able to outgrow files without abandoning their data.

## 44. Starter Toolkit Compatibility

Recommended first toolkit:

1. Project Master
2. WBS / Activities
3. Milestones
4. Daily Progress
5. Manpower
6. Equipment
7. Material / Procurement
8. RFI / Submittal / Inspection
9. Risk / Constraint / Action
10. S-Curve / Dashboard
11. DPR / WPR / MPR

Toolkit fields should map to future canonical records where practical.

## 45. Minimum Commercial Pilot

Recommended vertically complete pilot:

~~~text
Organization / Project
        ↓
WBS
        ↓
Daily Site Event
        ↓
Manpower + Quantity + Photos
        ↓
Validation
        ↓
Progress
        ↓
Dashboard
        ↓
Daily Report
        ↓
Weekly Report
        ↓
S-Curve
~~~

Also include:
- Risk / Constraint / Action
- basic RFI
- basic Inspection
- one offline capture path

This proves FDG's differentiation from static template packs.

## 46. Pilot Demo Script

A real demonstration must show:

1. create/open project;
2. temporarily lose network;
3. capture site event with quantity/manpower/photo;
4. local draft persists;
5. sync after connectivity returns;
6. reviewer validates;
7. dashboard changes;
8. S-curve changes;
9. DPR includes event;
10. WPR changes;
11. evidence opens;
12. audit identifies author/reviewer;
13. continuation brief reflects the update.

Static screenshots or hardcoded metrics do not satisfy this test.

## 47. Build Work Packages

### WP0 — Architecture Lock
- canonical reading;
- conflicts;
- implementation repository;
- environment;
- ADRs;
- data dictionary.

### WP1 — Company Core
- organization;
- user;
- role;
- project;
- membership;
- session;
- audit;
- file/evidence shell.

### WP2 — PLAN Foundation
- WBS;
- activities/milestones;
- risk;
- constraint;
- action;
- dashboard shell.

### WP3 — Field EXECUTE
- SiteEvent;
- manpower;
- equipment;
- photos;
- offline queue;
- sync.

### WP4 — TRACK / Capture Once
- progress validation;
- planned vs actual;
- S-curve;
- DPR/WPR;
- dependency propagation.

### WP5 — DOCUMENT + QA/QC
- document revision;
- RFI;
- submittal;
- inspection;
- NCR;
- punch;
- transmittal.

### WP6 — ESTIMATE
- QTO;
- BOQ;
- BOM;
- rates;
- estimate/budget;
- supplier comparison.

### WP7 — Commercial / Change
- variation;
- billing support;
- commercial state separation.

### WP8 — T&C / Turnover
- tests;
- punch;
- O&M/as-built/warranty;
- handover;
- continuation brief.

### WP9 — Toolkit Migration
- original toolkit;
- import;
- mapping;
- validation;
- provenance;
- export.

### WP10 — Role Workbenches
- Construction Manager;
- Project Manager;
- Site Engineer;
- Project Controls;
- QA/QC;
- QS;
- Document Controller.

### WP11 — Automation
- reminders;
- routing;
- report drafts;
- Attention Center;
- stale-item detection.

### WP12 — Portfolio / Enterprise
- multi-project;
- company templates;
- branding;
- integrations;
- tenant controls.

## 48. Test Strategy

### Unit
- calculations;
- state transitions;
- permissions;
- report transforms.

### Integration
- site event → progress;
- progress → dashboard;
- progress → report;
- document revision → current state;
- import → canonical record;
- sync → conflict.

### End-to-End
- role workflow;
- offline capture;
- project creation;
- RFI cycle;
- inspection cycle;
- report issue;
- turnover.

### Regression
Every fixed project-truth defect receives a regression test.

## 49. Core Acceptance Tests

1. One source site event updates every intended projection.
2. Editing source event recalculates dependent values.
3. Historical issued report snapshot stays immutable.
4. Reported quantity never automatically becomes billable.
5. Superseded drawing never appears as current.
6. Project membership blocks unauthorized access.
7. Role cannot self-escalate authority.
8. Offline capture syncs without losing authorship/timestamp.
9. Concurrent conflict becomes Review Required.
10. Import conflict cannot silently overwrite canonical data.
11. User departure does not remove historical authorship.
12. Continuation brief reconstructs current project state.
13. Dashboard metric can open source/evidence.
14. Attention item exposes why, impact, owner, due, action.
15. Toolkit import preserves provenance.

## 50. Security and Privacy

Consume FSIS.

Minimum:
- secure authentication;
- tenant/project isolation;
- RBAC;
- server-side authorization;
- controlled file access;
- audit;
- revoke;
- input validation;
- backup/recovery;
- secret management;
- export control.

Collect only necessary personnel/project data. Biometric or precise-location expansion requires separate justified design.

## 51. Philippine-First / International-Ready

Initial packs may support Philippine terminology, currency, workflows, and document conventions.

Jurisdiction-specific legal/regulatory truth remains in FRCIM.

Prepare for:
- currencies;
- units;
- languages;
- contract systems;
- tax;
- regulatory packs;
- terminology.

## 52. Knowledge Return Loop

~~~text
Build
→ Test
→ Deploy
→ Real Use
→ Outcome / Problem
→ Evidence
→ Learning Candidate
→ Review
→ Knowledge Update
→ Next Build
~~~

Conversation alone is not sufficient evidence for a canonical implementation change.

## 53. Known Risks

- scope explosion;
- dashboard-before-data;
- spreadsheet duplication;
- permission complexity;
- offline conflict;
- commercial/engineering contamination;
- provider lock-in;
- false capability claims.

Mitigation: vertical slices, explicit authority, data-first architecture, provider adapters, acceptance tests, and maturity labels.

## 54. Open Decisions Before WP1

Resolve through implementation ADRs:

- implementation repository;
- web/PWA framework;
- database;
- offline/local store;
- sync strategy;
- object storage;
- authentication provider/adapter;
- deployment target;
- report generator;
- spreadsheet import/export library;
- search implementation;
- observability;
- backup/recovery.

These decisions must not rewrite the domain architecture.

## 55. First Release Gate

Suggested release claim:

**FDG Construction Project Controls — Pilot**

Release only when:
- real project setup works;
- named roles work;
- WBS works;
- field capture works;
- one offline path works;
- progress validation works;
- dashboard derives from source;
- DPR/WPR derive from same source;
- S-curve derives from source;
- evidence/audit is visible;
- basic RFI and inspection work;
- regression tests pass.

## 56. Full Vertical Completion Gate

The Construction Management vertical may claim broad completion only after Plan, Estimate, Execute, Track, Document, T&C/Turnover, continuity, offline field operation, toolkit migration, role authority, audit/evidence, and core acceptance tests are implemented and tested.

## 57. Commercial Validation Gate

COMMERCIALLY_VALIDATED requires evidence such as:
- real customer organization;
- repeat usage;
- paid entitlement or contracted deployment;
- measurable outcome;
- known support/defect burden;
- continuation or retention evidence.

Deployment alone is not commercial validation.

## 58. Future FDG Module Reuse

The Company Core should later support independently sellable FDG modules such as:
- Testing & Commissioning;
- Maintenance / PM;
- Energy Audit;
- RCA;
- BIM;
- QTO;
- Construction Inspection;
- CAPEX;
- Computational Validation.

Each retains domain authority while reusing identity, project, evidence, documents, approvals, notifications, audit, billing/entitlement, and experience infrastructure.

## 59. Non-Depletion Rule

This build specification does not delete, replace, or reduce existing FEIS-CM, DCKL, FPIS, FBIS, FWAIS, FPJIS, FSIS, FAIS, FRCIM, or FDG CORE knowledge.

If implementation reveals a contradiction:

1. preserve the current rule;
2. record the conflict;
3. gather evidence;
4. propose controlled evolution;
5. approve;
6. update canonical knowledge;
7. then change implementation.

## 60. Definition of Done

A future implementation team can consider the platform architecture successfully realized only when it can demonstrate:

~~~text
ONE PROJECT EVENT
        ↓
ONE VALIDATED SOURCE
        ↓
MULTIPLE CONSISTENT OUTPUTS
        ↓
TRACEABLE EVIDENCE
        ↓
ROLE-GOVERNED DECISIONS
        ↓
PROJECT CONTINUITY
        ↓
MEASURED CUSTOMER VALUE
~~~

without duplicate encoding, hidden source changes, or unsupported capability claims.

## 61. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management Master Index]]
- [[Projects/Future/FDG Project Operations OS/FDG Project Operations OS-0001 - Complete Detailed Blueprint|FDG Project Operations OS Complete Detailed Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|FEIS-CM-0900 — Multi-Collaborator Build Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FDG Project Control Console]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]]
- [[05_Knowledge_Architecture/FDG_CROSS_SYSTEM_RELATIONSHIP_MAP|FDG Cross-System Relationship Map]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → [[Projects/Future/FDG Project Operations OS/Melanie_Project_Master_Index|FDG Project Operations OS]] → this document
