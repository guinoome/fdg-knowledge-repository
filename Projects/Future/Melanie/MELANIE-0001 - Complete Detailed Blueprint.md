---
document_id: MELANIE-0001
title: Future Melanie Project — Complete Detailed Blueprint
status: Future Build Blueprint / Architecture Baseline
owner: FDG Ecosystem
created: 2026-10-10
implementation_state: Not yet claimed as fully built
market_sequence: Philippine-first, international-ready
knowledge_policy: Extend existing FDG knowledge; do not duplicate or deplete
---

# MELANIE-0001 — Future Melanie Project Complete Detailed Blueprint

## 1. Executive Definition

**Melanie** is the future implementation program for turning FDG's governed engineering-company and construction-management knowledge into a commercially usable, modular, local-first, evidence-driven project operating platform.

The first major domain is **Construction Management / Project Controls**, because FDG already has a mature architecture covering bidding, planning, estimating, execution, progress, reporting, document control, QA/QC, commercial controls, T&C, turnover, personnel handover, embedded role guidance, and a template-to-platform commercial ladder.

Melanie is not a replacement architecture.

It is the project that implements the architecture.

## 2. Problem Melanie Solves

Construction organizations frequently operate through disconnected spreadsheets, Word forms, messaging threads, shared-drive folders, manually prepared dashboards, duplicated daily/weekly/monthly reports, independent BOQ/billing files, isolated RFI/submittal trackers, personal engineer notes, undocumented decisions, inconsistent revisions, and employee-specific project memory.

The result is repeated encoding and weak continuity.

Melanie's primary operating thesis is:

> **One validated project event should update every legitimate downstream view that depends on it.**

Example:

~~~text
Site engineer records:
- WBS item
- location
- quantity accomplished
- manpower
- equipment
- material
- photos
- issue/constraint
- inspection state

Validated once
        ↓
Updates:
- daily report
- weekly report
- monthly report
- project dashboard
- planned-vs-actual
- S-curve
- manpower report
- equipment report
- material usage
- QA/QC state
- issue/constraint register
- billing-support quantity
- executive summary
~~~

The architecture governing this is:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting & Progress Architecture]].

## 3. Product Vision

Melanie should feel simpler than the underlying architecture.

The primary construction experience is:

~~~text
PLAN
ESTIMATE
EXECUTE
TRACK
DOCUMENT
~~~

governed by:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FDG Project Control Console]].

Behind that simple surface sits the complete FEIS-CM lifecycle.

Therefore:

~~~text
Simple Experience
≠
Simplified Engineering Governance
~~~

## 4. Product Structure

Recommended future structure:

~~~text
MELANIE
│
├── Company Core
│   ├── Organization
│   ├── Branch / Department
│   ├── Users
│   ├── Roles / Authority
│   ├── Clients
│   ├── Projects / Sites
│   ├── Documents / Evidence
│   ├── Approvals
│   ├── Notifications
│   ├── Audit
│   └── Subscription / Entitlements
│
├── Construction Management
│   ├── PLAN
│   ├── ESTIMATE
│   ├── EXECUTE
│   ├── TRACK
│   └── DOCUMENT
│
├── Role Workbenches
│   ├── Project Manager
│   ├── Construction Manager
│   ├── Site Engineer
│   ├── Project Controls
│   ├── QS / Commercial
│   ├── QA/QC
│   ├── Document Controller
│   ├── T&C / Turnover
│   └── Executive / Client views
│
├── Field PWA
├── Knowledge / Toolkit Layer
├── Workflow Automation
├── Analytics / Intelligence
└── Export / Integration Layer
~~~

## 5. Shared Company Core

Melanie shall consume:

[[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|FDG Engineering Company Core]].

Minimum shared entities:

~~~text
Organization
Branch
Department
Client
Consultant
Contractor
Supplier
Project
Site
Contract
Package
User
Role
Authority
ProjectMembership
WBS
WorkPackage
Task
Action
Evidence
Document
Revision
Decision
Approval
Issue
Risk
Constraint
AuditEvent
Handover
KnowledgeReturn
~~~

These objects must be reusable by future independently sellable FDG Engineering modules.

Melanie must not hard-wire Construction Management assumptions into the Company Core.

## 6. Named Identity and Subscription Control

Standard user access shall follow:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0004 - Named User Session and Subscription Control Standard|Named User Session & Subscription Control]].

Default rule:

> One paid named user = one named human identity = one active interactive session at a time.

A user moving from phone to laptop can perform controlled session takeover.

Do not rely on precise geolocation as the primary account-sharing control.

Approved account types may separately exist for kiosk, site tablet, service account, system integration, or approved shared terminal.

Historical authorship must never be transferred by renaming accounts.

## 7. Offline / Local-First Architecture

Field workflows should be local-first/offline-capable where practical.

Offline-capable records include today's assigned work, site event capture, daily accomplishment, manpower/equipment, photos, inspections/checklists, materials, issues/constraints, readings, signatures, and punch items.

Required states:

~~~text
LOCAL DRAFT
QUEUED FOR SYNC
SYNCED
CONFLICT — REVIEW REQUIRED
REJECTED / NEEDS CORRECTION
~~~

Offline records must retain named user, device/session, local timestamp, project/site, source revision where relevant, sync timestamp, and conflict history.

## 8. PLAN — Detailed Capability Blueprint

### 8.1 Project Setup
Capture project identity, client, contract, location, project type, start/finish, working calendar, currencies, units, reporting periods, organizational roles, and baseline revision.

### 8.2 WBS / Work Package Structure
Support hierarchical WBS, area/system/package dimensions, codes, descriptions, planned quantities, BOQ relationship, responsible organization, and predecessor/successor relations.

### 8.3 Schedule
Support baseline, current schedule, look-ahead, milestones, dependencies, critical-path/criticality presentation where available, schedule revisions, and approved recovery baseline.

### 8.4 Planning Registers
Support milestones, actions, constraints, risks, interfaces, deliverables, decisions, procurement needs, submittals, inspections, and drawing requirements.

### 8.5 Resource Planning
Support manpower plan, equipment plan, subcontractor plan, mobilization plan, logistics, and site facilities.

## 9. ESTIMATE — Detailed Capability Blueprint

### 9.1 Quantity Takeoff
Support source drawing/document, markup/reference, quantity item, unit, formula, measurement basis, author, reviewer, revision, and confidence/evidence.

### 9.2 BOQ / BOM
Maintain distinction between BOQ contract/commercial quantity baseline, BOM material requirement, site-issued material, and actual usage.

### 9.3 Rate Build-Up
Components may include material, labor, equipment, subcontract, wastage, logistics, temporary works, preliminaries, overhead, contingency, and margin according to commercial authority.

### 9.4 Cost States
Do not collapse:

~~~text
Estimate
Budget
Committed
Actual
Forecast
Variation Proposed
Variation Approved
Billable
Billed
Paid
~~~

### 9.5 Commercial / Estimate Evidence
Each cost should preserve source, quote/pricebook, effective date, assumptions, revision, and approval status.

## 10. EXECUTE — Detailed Capability Blueprint

### 10.1 Daily Site Event
Core event fields:

~~~text
event_id
project
date/time
location
WBS/work package
activity
quantity accomplished
unit
manpower
equipment
materials
weather/site condition
inspection status
safety state
issue/constraint
photo/evidence
reported_by
reviewed_by
validation_state
~~~

### 10.2 Manpower
Track company/subcontractor, trade, planned, actual, hours, area/activity, overtime where governed, and productivity relationship.

### 10.3 Equipment
Track equipment, owner, operator, location, planned, actual hours, productive/idle/down, activity, and fuel/consumption where applicable.

### 10.4 Material
Track requisition, PO status, delivery, receipt, inspection, storage, issue, usage, balance, shortage, rejection, and substitute/approval.

### 10.5 Quality
Support ITP, inspection request/WIR, MIR, checklist, hold/witness point, test, NCR, corrective action, punch/snags, and closure evidence.

### 10.6 HSE Interface
Melanie may surface permits, observations, toolbox status, incidents/near misses, safety blockers, and required evidence. Safety authority remains with the authorized process/system.

## 11. TRACK — Detailed Capability Blueprint

### 11.1 Progress State Separation

At minimum distinguish:

~~~text
Field Reported Quantity
Verified Physical Quantity
QA/QC Accepted Quantity
Commercially Billable Quantity
Billed Quantity
Paid Quantity
~~~

This is mandatory to prevent false progress and billing contamination.

### 11.2 Planned vs Actual
Support baseline, current, forecast, physical progress, weighted progress, variance, and milestone risk.

### 11.3 S-Curve
Generate from governed progress/cost records. Do not rely on a separately maintained S-curve spreadsheet once the platform is the source of truth.

### 11.4 Productivity
Examples include quantity/labor-hour, quantity/crew-day, quantity/equipment-hour, and planned vs actual productivity.

### 11.5 Delay / Constraint
Capture event, date, affected activity, responsible/causal classification, evidence, duration, notice requirement, mitigation, recovery action, and status.

### 11.6 Reports
Generate DPR, WPR, MPR, project status, executive summary, manpower, equipment, material/procurement, photo, QA/QC, HSE summary, and closeout readiness.

Reports are projections of validated data.

## 12. DOCUMENT — Detailed Capability Blueprint

Controlled document types include drawings, specifications, RFI, site instruction, WIR/IR, MIR, method statement, technical/material submittal, NCR, transmittal, MOM, correspondence, change/variation, contractual notice, claim support, T&C records, punch list, as-builts, O&M manuals, warranties, training, asset register, and turnover dossier.

Each controlled document should preserve document ID, type, project/package, revision, status, originator, recipient, issue date, response due, linked WBS/asset, superseded relation, evidence/file, and approvals.

## 13. Attention Center

Melanie should use an action-oriented Attention Center rather than generic alerts.

Categories may include critical delay, decision required, overdue RFI, overdue submittal, inspection due, material risk, procurement risk, QA/QC blocker, safety blocker, notice deadline, milestone risk, and punch/turnover gap.

Each item should display what happened, why it matters, supporting evidence, impact/consequence, owner, due date, and permitted next action.

## 14. Construction Manager and Role Workbenches

The role-aware layer consumes:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Role Intelligence & Guided Workflow]].

Modes:
- Ask / Explain
- Review
- Draft
- Plan
- Compare
- Act Through Workflow

The Workbench should not be a blank chatbot.

It should surface today's priorities, open risks/constraints, pending decisions, inspections, RFIs, submittals, progress/commercial concerns, turnover readiness, evidence, and role-specific next actions.

## 15. Project Continuity

Melanie must preserve:

> People may leave. Project knowledge must remain.

Consume:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Project Continuity & Personnel Handover]].

A replacement engineer should see completed, pending, overdue, reasons, evidence, prior decisions, current revisions, unresolved risks, open RFIs/submittals/inspections, commercial state where authorized, milestones, next actions, and critical contacts.

The system should auto-generate a continuation brief from live records.

## 16. Embedded Learning

Melanie should support workflow learning without duplicating the repository.

A Learn This Workflow action may explain why the step exists, required inputs, common mistakes, governing knowledge, example output, and acceptance criteria.

Canonical source:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|Embedded Learning & Competency]].

## 17. Construction Toolkit Commercial On-Ramp

Melanie should be reachable through:

[[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]].

Product ladder:

~~~text
Free Resource
→ FDG Construction Toolkit
→ Connected Toolkit
→ Melanie / Full Construction Platform
→ Multi-Project
→ Enterprise / White-Label
→ Professional Services
~~~

A customer may begin with spreadsheets/templates without forcing immediate enterprise adoption.

## 18. Toolkit Migration

Toolkits should use upgrade-compatible structures.

Migration:

~~~text
XLSX/DOCX/CSV
→ Import
→ Mapping
→ Validation
→ Duplicate Detection
→ Conflict Review
→ Canonical Records
→ Generated Platform Outputs
~~~

Imported data is not automatically trusted.

Store source file, source row/cell where practical, importer, import time, validation, and conflicts.

## 19. Modular Commercial Architecture

Melanie should allow independently sellable modules.

Possible packaging:

### Company Core
Shared identity/project/document/approval foundation.

### Construction Management
Full Plan/Estimate/Execute/Track/Document capability.

### Project Controls
Planning, schedule, progress, S-curve, reporting.

### Estimating / QTO
QTO/BOQ/rate/cost.

### QA/QC
Inspection/submittal/NCR/punch.

### Document Control
Drawings/RFI/transmittals/correspondence.

### T&C / Turnover
Readiness/tests/punch/O&M/as-built/warranty.

Modules must interoperate through the common model and not duplicate project identity or evidence.

## 20. Philippine-First, International-Ready

Initial product assumptions should prioritize Philippine construction practice.

However tax, legal forms, codes, permit terminology, contract terminology, regulatory requirements, currency, and localization must remain separable from universal construction workflow logic.

FRCIM/FLIS owns legal/regulatory authority.

Future jurisdiction packs should not require redesigning the domain core.

## 21. Experience / UI Standard

Melanie should follow:

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|FPIS Experience Intelligence]].

Preferred characteristics:
- premium;
- non-generic;
- mobile-first;
- dense but readable;
- hero + transparent live-data overlay;
- clear animation where state changes matter;
- real interactions rather than screenshot theater.

Desktop should provide a multi-panel command console.

Mobile should prioritize task/action surfaces, fast field capture, bottom-sheet Attention Center, offline state, and large touch targets.

## 22. Security / Privacy

Consume FSIS.

Minimum controls include named identity, RBAC, project membership, record-level authority where needed, active-session control, audit trail, evidence access, secure uploads, tenant isolation, least privilege, revocation, and export controls.

Sensitive personnel/commercial/legal data must be scoped by role.

## 23. Evidence / Provenance

Every important record should answer:

~~~text
Who?
What?
When?
Where?
Source?
Revision?
Evidence?
Calculated or entered?
Reviewed?
Approved?
Superseded?
~~~

Generated content should preserve provider/model, task pack/version, source context, reviewer, and final workflow record.

No generated recommendation becomes official merely because it was generated.

## 24. Workflow Automation

FWAIS may route RFIs/submittals, remind due dates, create follow-ups, detect missing required fields, assemble report drafts, detect stale items, propose next actions, and prepare workflow records.

FWAIS may not independently approve engineering, accept NCR closure, approve billing, issue binding instructions, sign contractual notices, or waive safety/quality gates.

## 25. Analytics / Predictive Intelligence

Start with deterministic project controls.

Then add statistical trend detection, schedule risk, procurement risk, productivity deviation, likely milestone slippage, cash-flow forecast, and turnover-readiness risk.

Predictive outputs must preserve model, version, confidence, evidence, limitations, and human review.

Do not jump to ML before reliable project data exists.

## 26. Data Architecture

Recommended core relational domains:

~~~text
organizations
branches
users
roles
memberships

clients
projects
sites
contracts
packages

wbs_items
activities
milestones
work_packages

boq_items
bom_items
estimate_lines
cost_records

site_events
progress_records
manpower_records
equipment_records
material_records

risks
constraints
issues
actions
decisions

rfis
submittals
inspections
ncrs
punch_items

documents
document_revisions
transmittals
correspondence

report_periods
report_snapshots
billing_support

evidence
approvals
audit_events
handover_records
knowledge_candidates
~~~

Avoid one giant generic records table unless justified by a controlled polymorphic design.

## 27. API / Service Boundaries

Recommended logical services:
- Identity / Access
- Organization / Project
- Planning
- Estimating / Cost
- Site Execution
- Progress
- Materials / Procurement
- QA/QC
- Document Control
- Commercial
- Reporting
- Evidence
- Handover / Continuity
- Notifications
- Search
- Export
- Workflow Automation
- Model Adapter

Implementation may begin as a modular monolith.

Do not force microservices before scale/ownership justifies them.

## 28. Release Maturity States

Every Melanie capability should carry one of:

~~~text
DESIGNED
BUILD_READY
IMPLEMENTED
TESTED
DEPLOYED
COMMERCIALLY_VALIDATED
~~~

Never infer IMPLEMENTED from a blueprint.

Never infer COMMERCIALLY_VALIDATED from deployment.

## 29. Recommended Build Sequence

### Phase M0 — Repository / Scope Lock
Read canonical knowledge, establish project workspace, define source-of-truth boundaries, and resolve architecture conflicts before coding.

### Phase M1 — Company Core
Organization, user, role, project, site, project membership, documents/evidence, audit, named-session control.

### Phase M2 — Project Setup + PLAN
WBS, activities, milestones, actions, constraints, risks, look-ahead, dashboard shell.

### Phase M3 — EXECUTE Field Capture
Site events, manpower, equipment, photos, issues, offline PWA, sync/conflict.

### Phase M4 — TRACK / Capture Once
Verified progress, planned vs actual, daily/weekly/monthly report projection, S-curve, dashboard, manpower/equipment/material reports.

### Phase M5 — DOCUMENT / QAQC
Drawing register, RFI, submittal, inspection, NCR, transmittal, punch.

### Phase M6 — ESTIMATE / Commercial Basis
QTO, BOQ, BOM, rate build-up, cost baseline, variations, billing-support separation.

### Phase M7 — T&C / Turnover / Continuity
Testing, punch, O&M, as-builts, warranty, asset register, continuation brief, turnover readiness.

### Phase M8 — Toolkit Migration
Import/export, starter toolkit, connected toolkit, platform migration.

### Phase M9 — Role Workbenches
Construction Manager, Project Manager, Site Engineer, Project Controls, QA/QC, QS, Document Controller.

### Phase M10 — Automation / Intelligence
FWAIS routing, attention reasoning, trend/forecast, predictive candidates.

### Phase M11 — Multi-Project / Enterprise
Portfolio, company templates, standard workflows, tenant branding, integrations, enterprise analytics.

## 30. Minimum Viable Commercial Pilot

Do not start by building every FEIS-CM feature.

Recommended pilot:

~~~text
Company + Project Setup
+
WBS
+
Daily Site Event
+
Manpower
+
Progress Quantity
+
Photo Evidence
+
Risk / Constraint / Action
+
RFI / Inspection basic registers
+
Daily Report
+
Weekly Report
+
S-Curve / Dashboard
~~~

Critical demonstration:

> A single site update changes the relevant dashboard and report projections without re-encoding the same fact.

This should be the first proof that Melanie is more than a template pack.

## 31. Acceptance Tests — Core

### Identity
- historical author cannot be changed by seat reassignment;
- one named interactive session enforced under standard plan;
- controlled takeover works.

### Project
- record cannot exist without project scope;
- project membership controls access.

### Capture Once
- validated site event updates every intended downstream projection;
- changing source event recalculates dependent views;
- no stale report metric remains silently active.

### Progress
- reported, verified, accepted, billable, billed, paid quantities remain distinct.

### Documents
- superseded revision is not shown as current;
- RFI/submittal due/response state is traceable.

### Offline
- user can capture supported records offline;
- sync retains author/device/timestamps;
- conflicts become Conflict — Review Required.

### Reporting
- DPR/WPR/MPR values reconcile to governed records;
- report narrative may be assisted, but metrics cannot be fabricated.

### Continuity
- successor brief is generated from live project records;
- departed user retains historical attribution.

### Toolkit Migration
- import retains source provenance;
- duplicates/conflicts require review;
- imported data is not automatically approved.

## 32. Acceptance Tests — Commercial / Governance

- module entitlement does not alter underlying record ownership;
- expired module access does not delete company/project history;
- price/promotion configuration is outside FEIS engineering semantics;
- user cannot bypass authority by using a role workbench;
- generated draft is not official until committed through workflow;
- toolkit purchase does not imply full-platform entitlement unless commercial policy says so.

## 33. KPI Framework

### Product Operations
- active organizations;
- active projects;
- named active users;
- sync success;
- offline conflict rate;
- report generation time;
- source-to-report reconciliation errors.

### Project Value
- report preparation time saved;
- duplicate encoding reduced;
- RFI/submittal turnaround;
- inspection turnaround;
- constraint aging;
- schedule variance;
- data completeness;
- closeout completeness.

### Commercial
- toolkit conversion;
- trial-to-paid;
- project activation;
- module attach rate;
- retention;
- service conversion.

Commercial metrics belong to FBIS.

## 34. Failure Modes / Anti-Patterns

Do not build Melanie as a giant static dashboard, 100 disconnected spreadsheets inside a web shell, a blank chatbot, one generic CRUD database, a replacement for FEIS-CM, a place where every system's authority is merged, an AI-generated project status without evidence, a cloud-only field app with no offline strategy, a platform that loses history when users leave, a subscription scheme that deletes customer records when entitlement expires, or a system that reports progress from billing quantity alone.

## 35. Decision Log — Initial

### Decision 1
Melanie stays inside the existing FDG Knowledge Repository.

### Decision 2
Construction Management is the first major implementation vertical.

### Decision 3
The top-level construction experience uses Plan / Estimate / Execute / Track / Document.

### Decision 4
The canonical construction lifecycle remains FEIS-CM; the five labels are UX projection only.

### Decision 5
Capture Once is mandatory.

### Decision 6
One active interactive session per standard named seat remains default.

### Decision 7
Modules can be independently sellable but must share Company Core and project identity.

### Decision 8
Philippines first; jurisdiction-specific rules remain separable.

### Decision 9
Toolkit is an on-ramp, not a competing source of truth.

### Decision 10
Implementation maturity must be explicit and cannot be inferred from knowledge maturity.

## 36. Future Extension Beyond Construction

After Construction Management proves the Company Core and operating model, Melanie may host/activate other independently sellable FDG Engineering modules, such as Testing & Commissioning, Maintenance / PM, Energy Audit, RCA, BIM, QTO, Construction Inspection, CAPEX, and Computational Validation.

Each retains domain authority and can reuse identity, projects, roles, evidence, documents, approvals, notifications, audit, billing/subscription, and experience composition.

## 37. Definition of Success

Melanie succeeds when a project team can answer, from one governed operating environment:

1. What was planned?
2. What did it cost/what is the estimate?
3. What happened today?
4. What is actual progress?
5. What is delayed and why?
6. What decisions are pending?
7. What materials/documents/inspections are blocking work?
8. What evidence supports the status?
9. What can be billed?
10. What must happen next?
11. What is required for handover?
12. Can a replacement engineer continue without reconstructing history?

and when one validated site update can legitimately propagate through multiple downstream outputs without duplicate encoding.

## 38. Connected Knowledge

- [[Projects/Future/Melanie/Melanie_Project_Master_Index|Melanie Project Master Index]]
- [[Projects/Future/Melanie/MELANIE-0900 - Future Build and Agent Handover|Melanie Build & Agent Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]]
- [[05_Knowledge_Architecture/FDG_CROSS_SYSTEM_RELATIONSHIP_MAP|FDG Cross-System Relationship Map]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → [[Projects/Future/Melanie/Melanie_Project_Master_Index|Melanie]] → this document

---

## Detailed Construction Project Control Build Contract — 2026-10-10

The complete build-oriented specification for the first Melanie vertical is now:

[[Projects/Future/Melanie/MELANIE-0100 - Construction Project Control Platform Detailed Build Specification|MELANIE-0100 — Construction Project Control Platform Detailed Build Specification]].

It operationalizes this blueprint into:
- role/persona map;
- full Plan / Estimate / Execute / Track / Document screen map;
- shared domain model;
- progress-state separation;
- RFI / submittal / inspection / NCR / variation state machines;
- Capture Once dependency graph;
- report projection contracts;
- toolkit migration model;
- offline synchronization and conflict states;
- named-user/session and authority model;
- Attention Center;
- project search/memory;
- continuation brief;
- role Workbench contract;
- automation boundaries;
- predictive-intelligence progression;
- modular-monolith technical architecture;
- API principles;
- data-integrity/evidence/audit contracts;
- commercial journey;
- pilot demo script;
- WP0–WP12 implementation packages;
- unit/integration/E2E/regression testing strategy;
- first-release, full-vertical and commercial-validation gates.

This is additive. The current document remains the master future-project blueprint; MELANIE-0100 is the build specification beneath it.
