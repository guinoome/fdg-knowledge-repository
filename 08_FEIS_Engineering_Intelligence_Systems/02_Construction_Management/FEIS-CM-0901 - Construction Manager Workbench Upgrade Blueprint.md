# FEIS-CM-0901 — FDG Construction Manager Workbench Upgrade Blueprint

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Commercial Package:** FDG Engineering Construction Management  
**Status:** Build-Ready Direction / Agent Handover  
**Owner / Final Authority:** Francis  
**Effective:** 2026-10-04  
**Evolution Rule:** Additive; do not delete approved Construction Management architecture.

## Mission

Upgrade FDG Engineering Construction Management from a strong lifecycle/data architecture into a role-aware operating environment that helps Construction Managers review, plan, draft, compare, verify and execute governed project work without replacing authoritative records or professional judgment.

## Strategic Position

The target is **not** an AI course and not a generic construction chatbot.

The target is:

> Project operating system + construction knowledge + document intelligence + governed workflow assistance + embedded capability development.

## Reuse First

Do not rebuild capabilities already governed by:

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Continuity and Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0004 - Named User Session and Subscription Control Standard|Named User Session Control]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding-to-Turnover Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]]

The new work is an intelligence/workbench layer over the existing model.

## Target Product Surfaces

### A. Construction Manager Home

Near-full-bleed project hero + transparent live operational overlay.

Show:

- project identity
- lifecycle state
- physical progress
- key milestones
- schedule variance
- pending decisions
- high-severity risks/constraints
- RFI / submittal / inspection queues
- commercial alerts where authorized
- turnover/readiness state where relevant

### B. Today's Work

A prioritized, evidence-backed action surface:

- overdue
- blocking
- critical path
- inspection due
- material/submittal dependency
- decision required
- notice/claim deadline
- handover dependency

Each item must explain **why it is prioritized**.

### C. Ask Project

A context-aware question surface grounded in:

- canonical project records
- current documents
- approved repository knowledge
- authority scope

Answers should cite the project evidence used.

### D. Review Files

Upload/select files and run governed review tasks:

- tender requirement extraction
- revision comparison
- scope gap review
- specification summary
- submittal review support
- contract obligation extraction
- closeout completeness review

### E. Prepare / Draft

Generate controlled drafts for:

- RFI
- clarification
- meeting minutes
- action items
- progress narrative
- executive update
- method-statement outline
- bid response section
- variation/claim event summary
- turnover narrative

### F. Compare

Structured comparison workspace for:

- revisions
- quotes
- bid vs contract
- plan vs actual
- required vs submitted
- approved vs installed
- required closeout vs available evidence

### G. Learn This Workflow

Embedded, short guidance attached to the live task.

## Core Technical Components

### 1. Context Assembly Service

Input:

- user
- role
- authority
- project
- current screen/task
- lifecycle stage
- selected work package/document

Output:

- minimal governed context packet
- source references
- missing-context flags
- sensitive-data handling instructions

### 2. Task / Skill Registry

Provider-neutral definitions for reusable workflows.

Initial schema:

```yaml
capability_id:
name:
roles:
lifecycle_stage:
objective:
required_context:
allowed_sources:
inputs:
steps:
deterministic_services:
evidence_required:
prohibited_assumptions:
verification_rules:
output_schema:
workflow_destination:
approval_authority:
exception_states:
version:
provenance:
acceptance_tests:
```

### 3. Document Intelligence Pipeline

Ingest → classify → extract metadata → resolve revision → extract candidate assertions → attach evidence pointers → detect conflicts/missing files → human verify → create/update governed records.

### 4. Evidence / Provenance Layer

Every machine-assisted output must be able to disclose:

- source record
- source document/revision
- evidence pointer
- calculation service
- knowledge asset
- model/tool
- user reviewer
- transformation history

### 5. Workflow Action Bridge

Accepted outputs may create or update governed objects only through explicit permissioned actions.

### 6. Embedded Learning Engine

Task-context → required capability → short guidance → practice/check → real task → evidence → competency update.

## Initial Data Objects to Add

Avoid duplicating existing project objects. Add only the minimum new objects:

### workbench_task

- id
- project_id
- capability_id
- requested_by
- role_context
- scope
- status
- created_at
- completed_at
- source_context_manifest_id

### context_manifest

- id
- project_id
- task_id
- records[]
- documents[]
- knowledge_assets[]
- revision_state
- missing_context[]
- authority_snapshot
- created_at

### machine_assisted_output

- id
- task_id
- provider
- model
- output_type
- structured_output
- facts[]
- assumptions[]
- unknowns[]
- conflicts[]
- recommendations[]
- evidence_links[]
- confidence_notes
- created_at

### verification_record

- id
- output_id
- verification_level
- reviewer
- review_notes
- accepted_items[]
- rejected_items[]
- corrected_items[]
- decision_at

### capability_definition

- id
- version
- governed_source
- role
- lifecycle
- schema
- status

### user_capability_state

- user_id
- capability_id
- state
- evidence_refs[]
- verified_by
- verified_at
- refresh_due

## Priority Task Packs

### P0 — Read / Understand

1. Project Situation Brief
2. What Changed Since Last Review
3. Document / Revision Summary
4. Open Risks and Constraints
5. Pending Decisions
6. Successor Continuation Brief

### P1 — Preconstruction

7. Bid / No-Bid Review
8. Tender Compliance Matrix
9. Scope Gap / Interface Review
10. Addendum Impact Review
11. Clarification Draft
12. Bid Red-Team Review

### P2 — Execution / Controls

13. Daily Priority Brief
14. Look-Ahead Constraint Review
15. Progress Variance Narrative
16. Missing Evidence Check
17. RFI / Submittal Priority Review
18. Inspection Readiness Review
19. Material / Procurement Risk Review

### P3 — Commercial

20. Billing Support Completeness
21. Variation Event Triage
22. Claim / Notice Deadline Review
23. BOQ Accomplishment Reconciliation

### P4 — Closeout

24. Punch Closure Readiness
25. T&C Readiness Summary
26. Turnover Completeness Matrix
27. O&M / As-Built Gap Review
28. Lessons Learned Capture

## Build Sequence

### Stage 0 — Governance and Contract Tests

Create:

- capability schema
- evidence-link schema
- verification-level rules
- approval-boundary tests
- conflict-state tests
- provider-adapter contract

**Exit criteria:**

- generated content cannot become approved truth by default
- unsupported assertions are detectable
- current user authority is enforced
- provider can be replaced without rewriting task definitions

### Stage 1 — Read-Only Construction Manager Workbench

Implement:

- role/project context
- Project Situation Brief
- Ask Project
- Pending Decisions
- Risks/Constraints
- document selection
- source-linked answers

**Exit criteria:**

- answer cites source records/documents
- missing evidence is explicit
- superseded revision is flagged
- no write actions occur

### Stage 2 — File Review and Verification

Implement:

- tender/spec/drawing document intake
- metadata/revision handling
- evidence pointers
- comparison
- requirement extraction
- conflict detection
- verification workflow

**Exit criteria:**

- reviewer can navigate from extracted assertion to source
- changed revision triggers impact review
- conflicting sources produce Conflict — Review Required

### Stage 3 — Draft-to-Workflow

Implement:

- RFI/clarification drafts
- meeting/action drafts
- progress narratives
- review/accept/edit
- governed creation of official records

**Exit criteria:**

- final record preserves machine provenance and human edits
- user explicitly commits the record
- approval workflow is respected

### Stage 4 — Preconstruction Intelligence

Implement:

- Bid / No-Bid
- compliance matrix
- scope/interface review
- addendum impact
- bid risk
- estimate-assumption review
- red-team review

**Exit criteria:**

- each finding links to tender evidence
- commercial assumptions are isolated from facts
- incomplete tender data cannot be silently filled

### Stage 5 — Project Controls / Commercial Intelligence

Implement:

- planned vs actual
- constraint-based look-ahead
- BOQ progress reconciliation
- billing support completeness
- variation/claim event visibility
- deadline alerts

**Exit criteria:**

- field quantity, verified quantity, QA/QC accepted quantity, billable quantity, billed quantity and paid quantity remain distinct
- calculations use governed deterministic engines where available

### Stage 6 — Field PWA / Offline Workbench

Implement mobile-first:

- daily priorities
- site event capture
- photo/evidence capture
- offline guidance cache
- conflict-aware sync

**Exit criteria:**

- offline activity remains attributable
- sync preserves lineage
- no duplicate silent overwrite

### Stage 7 — Embedded Learning / Competency

Implement:

- role onboarding
- Learn This Workflow
- Check My Work
- successor mode
- capability state
- learning evidence
- manager readiness view

**Exit criteria:**

- learning content points to governed repository knowledge
- competency evidence is inspectable
- internal completion is not misrepresented as statutory credential

### Stage 8 — Knowledge Flywheel

Implement:

- exception/lesson capture
- review queue
- approved DCKL integration
- capability/task-pack versioning
- impact notification to affected workflows

**Exit criteria:**

- operational learning can improve future workflows
- approved older knowledge is preserved with successor links/version history

## Acceptance Test Matrix

### Provenance

Given a generated tender finding, the user can identify the exact source document, revision and evidence pointer.

### Unknowns

Given a missing attachment, the Workbench states that the information is unavailable rather than fabricating an answer.

### Revision

Given Rev A and Rev B, the Workbench does not treat Rev A extraction as current without warning.

### Authority

Given a Construction Manager without commercial approval authority, the Workbench may prepare billing review material but cannot approve billing.

### Capture Once

Given an approved site progress event, the Workbench reuses it in reporting rather than requiring re-entry.

### Conflict

Given drawing/spec mismatch, the Workbench creates Conflict — Review Required and routes it to the proper decision workflow.

### Provider Replacement

Given a change from Provider A to Provider B, canonical task definitions, project records, evidence and learning states remain valid.

### Continuity

Given user replacement, the successor can open the project, receive a continuation brief, see current responsibilities and launch the relevant workflow guidance.

## Security / Privacy Requirements

- tenant isolation
- role-based access
- least-privilege project context
- sensitive document classification
- provider-routing policy
- audit trail
- named-user attribution
- no cross-client learning from confidential material without lawful authorization
- offline cache encryption appropriate to implementation

## Commercial Packaging Direction

Possible packaging without data silos:

### Base

FDG Engineering Construction Management

### Role Experience Packs

- Construction Manager
- Site Engineer
- QA/QC
- Project Controls
- Commercial / QS
- Commissioning / Turnover

These are governed UI/task/learning configurations over one shared project model, not separate databases or code forks.

### Enterprise

- tenant branding
- organization-specific SOP overlays
- organization capability matrix
- approved private knowledge pack
- controlled provider routing
- enterprise analytics

## Metrics

Measure whether the Workbench improves organizational performance:

- time to find governing project evidence
- time to prepare daily/weekly reports
- RFI/submittal cycle time
- missed requirement rate
- document revision error rate
- overdue constraint age
- rework due to information failure
- turnover completeness at first review
- successor time-to-effective-work
- duplicate encoding eliminated
- percentage of assistant outputs accepted/edited/rejected
- unsupported-assertion rate
- knowledge-return adoption

Do not optimize only for prompt count, chat usage or token volume.

## Agent Build Rules

A coding agent starting this work must:

1. read [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|FEIS-CM-0900]]
2. preserve existing collaborator work
3. declare owned work package/files
4. build smallest testable slice
5. keep model adapters replaceable
6. keep project truth in structured records
7. add acceptance tests before scaling automation
8. link new capability objects back to governing knowledge
9. surface cross-package conflicts instead of rewriting neighboring work
10. return new lessons to DCKL only after review

## Research Provenance

This upgrade was triggered by external benchmark review captured in:

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-RSCH-0001 - Tixu Construction Manager Benchmark Extraction 2026-10-04|Tixu Construction Manager Benchmark Extraction]]

No Tixu proprietary course content is copied.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Role Intelligence and Guided Workflow]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Document Intelligence and Verification]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|Embedded Learning and Competency]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-016_NEX_CORE_INTEGRATION_ARCHITECTURE_STANDARD|Nex Core Integration]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document

---

## Project Control Console Relationship — 2026-10-10

The [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FDG Project Control Console]] provides the simplified cross-role navigation model:

~~~text
PLAN
→ ESTIMATE
→ EXECUTE
→ TRACK
→ DOCUMENT
~~~

The Construction Manager Workbench remains the role-aware intelligence/execution layer.

Relationship:

~~~text
Project Control Console
        ↓
selected project-control area
        ↓
Role / Authority / Current Project State
        ↓
Construction Manager Workbench Task
        ↓
Evidence-linked guidance / action
        ↓
Canonical project record
~~~

Therefore the Console answers **where to work**, while the Workbench answers **what this role should do next, why, and with what evidence/authority**.

## FDG Project Operations OS Detailed Blueprint Relationship — 2026-10-10

The Construction Manager Workbench is the first role-oriented experience within the broader future implementation defined by:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FEIS-CM-0902 — FDG Project Operations OS Complete Detailed Blueprint]].

Relationship:

~~~text
FDG Project Operations OS
        ↓
FDG Engineering Construction Management
        ↓
FDG Project Control Console
        ↓
FDG Construction Manager Workbench
        ↓
Evidence-linked task guidance and workflow actions
~~~

The Workbench remains provider-neutral and cannot become a separate source of project truth.
