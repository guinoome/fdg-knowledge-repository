---
document_id: FPJIS-CORE-3518
title: FPM-REQ-001 Fire Pump Inspection Evidence Completeness Pilot
status: Proposed Illustrative Requirement; NOT build authorized
owner: FPJIS
created: 2026-10-15
requirement_id: FPM-REQ-001
implementation_status: NOT_CLAIMED
verification_status: NOT_VERIFIED
supersedes: none
---

# FPM-REQ-001 — Fire Pump Inspection Evidence Completeness

**Status: illustrative proposal, not implemented, verified or authorized to build.**

Demonstrate a **single canonical requirement record with linked business, product/functional, system/software and verification views**, governed through [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS Linked Requirements Views]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/03_Requirements_Traceability_and_Verification_Standard|Traceability Standard]]. All acceptance IDs below are **proposed**, not passed tests.

## 1. Identity and business view — WHY

- Requirement: **FPM-REQ-001**; proposed parent business outcome: **FPM-BIZ-001** (not separately approved).
- Title: **Fire pump inspection evidence completeness**.
- Requirement type: FUNCTIONAL, with potential linked DATA / SECURITY / OFFLINE child requirements where independently testable.
- Business objective: **Provide repeatable, auditable fire-pump maintenance service with reliable records, reduce manual reporting, and prevent unsupported completion claims.**
- Proposed measurement: required evidence completeness, preparation time per report, unresolved sync conflicts, audit reconstruction effort and number of unauthorized approval attempts. Baselines, denominators, samples and targets remain to be approved. No efficiency or ROI improvement is claimed.
- Business sponsor and domain acceptance authority: pending identification.

## 2. Product and functional view — WHAT

The technician **shall capture the required checklist results, observations, readings and applicable supporting attachments** for the assigned maintenance visit.

- Capture visit, asset, responsible technician, editable permitted dates, pre/post churn-test measurements and checklist version where required.
- Support draft, submitted, reviewer-evaluated and approval status; a saved or synchronized draft is **not** approved.
- Identify missing mandatory data at submission and retain a recoverable draft.
- Represent unsynced, failed-sync and **Conflict — Review Required** states without suppressing either conflicting history.
- Maintain reading/checklist/edit provenance; allow controlled authorized corrections and audit trail.
- Expose findings and recommended action only from approved engineering rules and evidence; do not invent regulatory compliance.
- Distinguish field technician completion, client e-signature (where adopted), reviewer approval and engineering acceptance; they are not interchangeable.

## 3. Software view — required behavior, not architecture choice

The software shall preserve locally captured inspection records through application restart while offline; maintain record IDs, actor/time/version provenance; safely retry eligible synchronization; expose conflicts and failures; and enforce reviewer authority so an unapproved visit cannot appear approved.

Choice of local database, sync algorithm, device hardware, backend, API/schema and UI component implementation **belongs to separate architecture/design decisions**. Offline authorization revocation and replay, attachment durability, privacy, storage encryption, audit retention, clock drift, and conflict resolution need explicit engineering/security dispositions before deployment.

## 4. Proposed acceptance and negative tests

| ID | Verifiable expected result | Test method | Required evidence |
| --- | --- | --- | --- |
| **FPM-AC-001** | Omitted required checklist/reading fields block final submission; draft remains readable and missing fields identified | partial/boundary input tests | test run, field set, observed state, exact revision |
| **FPM-AC-002** | Data captured without network survives forced close and relaunch with correct visit identity and measurement values | offline restart test | before/after durable record snapshots and runtime |
| **FPM-AC-003** | Concurrent conflicting changes show **Conflict — Review Required**; neither authoritative history is silently lost | deterministic two-writer conflict simulation | both revisions, conflict event and resolution log |
| **FPM-AC-004** | Submitted visit identifies asset, accountable technician, date, reading sources and revision/edit trail | record and report provenance review | exported record/report, corresponding source refs |
| **FPM-AC-005** | Technician lacking reviewer authority cannot create an authoritative approval or claim approved completion | RBAC/API negative tests | denied request, access-policy version, audit event |
| **FPM-AC-006** | Interrupted/replayed sync cannot duplicate visits or readings; unsynced failure remains visible | idempotency and reconnect tests | counts, stable IDs, retry history and version |
| **FPM-AC-007** | Missing/unreadable expected attachment is flagged in report; never represented as attached evidence | attachment failure test | output and error/exception evidence |
| **FPM-AC-008** | Revoked approval permission is rejected at authoritative boundary on reconnection | offline revocation/reconnect security test | policy revision, rejection and audit event |

**Acceptance ownership, criticality, method details, thresholds, devices and required subset are not baselined.** Criteria not in an authorized early vertical slice are explicitly deferred, not falsely marked passed. Failures of safety/data-integrity/auth controls may block even the earliest slice.

## 5. One-record manifest projection — PROPOSED

~~~yaml
schema_version: fpjis-requirement-views/0.1-proposed
requirement_id: FPM-REQ-001
project_id: pending-project-baseline
module_id: Maintenance_PM
type: FUNCTIONAL
status: PROPOSED
revision: 0
parent_requirement_ids: [FPM-BIZ-001]
source_ref: approved-source-pending
business_view:
  outcome_ref: FPM-BIZ-001
  objective: repeatable_auditable_maintenance
product_view:
  user_roles: [technician, engineering_reviewer]
  outcome: complete_traceable_inspection
functional_view:
  workflow_ref: fire_pump_visit
  required_checklist_ref: awaiting_FEIS_approval
software_view:
  required_qualities: [offline_durability, provenance, conflict_review, authorization]
  design_refs: []
acceptance_criteria_ids: [FPM-AC-001, FPM-AC-002, FPM-AC-003, FPM-AC-004, FPM-AC-005, FPM-AC-006, FPM-AC-007, FPM-AC-008]
work_package_refs: []
implementation_refs: []
test_refs: []
evidence_refs: []
approval_refs: []
build_authorization_ref: null
deployment_authorization_ref: null
verification_status: NOT_VERIFIED
operational_validation_status: NOT_MEASURED
~~~

This YAML is an **illustrative view projection**, not a separately maintained source of truth or a production-ready manifest/schema. Adapt the fields through the existing [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|FPJIS Evidence Manifest Contract]] before implementation.

## 6. Hard unknowns / decisions to resolve

1. **Engineering rules:** Fire-pump equipment type, manufacturer instructions, edition/jurisdiction of applicable standards, accepted churn test method, measurement thresholds and defect severity. These come from approved FEIS/domain authority, **not this example**.
2. **Roles:** Technician, lead technician, reviewer, client signatory and approval authority, including separation of duties, delegated approvals and corrections.
3. **Data:** Required observations/reading metadata, attachment categories, provenance, retention, privacy, data integrity, equipment identity and acceptable offline restoration behavior.
4. **Offline/sync:** Connection-loss tests, idempotent replay, conflict policy, clock skew, storage exhaustion, shared devices, auth expiry and revocation.
5. **Report claims:** Rules for submitted versus reviewed versus approved, client signature versus engineering approval, and missing-evidence/warning presentation.
6. **Authorizations:** Specific project/work-package readiness, build approval, engineering sign-off, pilot customer/property permissions and deployment release gate.
7. **Verification:** Test harness, versioned test data, expected results, reviewer acceptance and evidence custody are not supplied by this proposed document.

## 7. Potential narrow slices — not authorization

| Candidate slice | User-visible finished behavior | Tests to scope | Independent blockers |
| --- | --- | --- | --- |
| A — durable field draft | New visit, capture and recover draft after restart without network | AC-001, AC-002, AC-004 | identity, permissions, secure storage and backup must already be adequate |
| B — conflict-safe sync | Synchronize, reject duplicate replay, surface conflict for review | AC-003, AC-006 | approved conflict resolution and reconciliation authority |
| C — review/report control | Reviewer authority, report evidence, attachment failures and offline revocation | AC-005, AC-007, AC-008 | no unsafe prior release, approval boundary and negative tests |

The earliest slice must still contain any security/privacy or professional safeguard that is a true dependency. Each slice requires **100% applicable scoped blueprint readiness, no critical blocker and separate build authorization**. Do not implement all future architecture in the first pilot.

## 8. Ownership, evidence and lifecycle

- **FPJIS**: requirement ownership, parent/child links, AC IDs, readiness, work packages, versioned baseline and acceptance evidence.
- **FEIS**: domain-specific fire pump/maintenance technical rules — [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|Maintenance & Reliability]].
- **FBPOIS/FMIS**: actual inspection and maintenance execution, assignments and history — [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FMIS]].
- **CORE**: evidence and provenance machinery — [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|CORE Evidence & Provenance]].
- **FAIS**: independent audit and preservation of findings — [[22_FDG_Audit_Intelligence_System/15_Evidence_and_Traceability/FAIS-EVT-1500 - Evidence and Traceability Framework|FAIS Evidence & Traceability]].

**Operational next move:** capture a real approved checklist, authorize one bounded module, execute normal/negative/offline test cases on exact revisions, obtain domain reviewer acceptance, measure work effort and report evidence, and preserve results in the FDG Knowledge Repository.

**Current verdict:** NOT TESTED; NOT VERIFIED; NOT ACCEPTED; NO BUILD OR DEPLOYMENT AUTHORIZATION; NO CLAIM OF ACTUAL TECHNICAL FIRE PUMP ACCEPTANCE.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|Core Completion]] → this pilot.
