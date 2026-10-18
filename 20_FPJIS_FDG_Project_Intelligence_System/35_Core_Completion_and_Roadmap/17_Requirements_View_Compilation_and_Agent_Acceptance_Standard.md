---
document_id: FPJIS-CORE-3517
title: FPJIS Linked Requirements Views and Agent Acceptance Standard
status: Controlled Architecture Extension; pilot validation pending
owner: FPJIS
created: 2026-10-15
origin: User-supplied PM Learn BRD PRD FRD SRS transcript; FDG requirements review
decision: Adopt the principle, correct terminology, integrate existing FPJIS governance
implementation_status: DOCUMENTATION_ONLY
supersedes: none
---

# FPJIS Linked Requirements Views and Agent Acceptance Standard

## Governing decision

**ADOPT THE PRINCIPLE, CORRECT THE TERMINOLOGY, AND INTEGRATE IT INTO EXISTING FPJIS.**

Do not create another requirements engine, a parallel database or mandatory piles of BRD, PRD and SRS files. One canonical, versioned requirement record (or explicit parent/child requirements for truly distinct scope) exposes the relevant **business, product, functional, system/software, architecture and verification views**. All views trace to the same source and accepted baseline.

The purpose is not more documentation. Any new engineer or provider-replaceable agent must establish: **why it matters; what is required; where it was implemented; which revision was tested; who accepted it; what evidence exists; and what remains incomplete.**

This is an **additive interpretation** of [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/03_Requirements_Traceability_and_Verification_Standard|FPJIS Requirements Traceability]], [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Requirement_Blueprint|Requirement Blueprint]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Evidence Manifest]]. Existing IDs, statuses, blueprint gates and approval authority are not replaced.

## Educational transcript assessment: useful principles and corrections

| Term | Primary question | Correct interpretation |
| --- | --- | --- |
| BRD / Business | WHY? | Business objective, sponsor, problem, value, measures, risks and constraints |
| PRD / Product | WHAT outcome for whom? | User roles, product behavior, UX, scenarios, outcomes and acceptance |
| FRD / Functional | WHAT exact behavior? | Inputs, triggers, state changes, calculations, permissions, errors and exceptions |
| SyRS / System (where needed) | WHAT end-to-end system qualities? | System boundaries, stakeholders, interfaces, operating environment and constraints |
| SRS / Software | WHAT must software do? | Required software functions, interfaces, security, reliability, performance, data and offline behavior |
| Architecture / Design | HOW will it be built? | ADRs, components, schemas, APIs, chosen algorithms, migrations and deployment architecture |
| V&V / Acceptance | HOW is it proven? | Measurable criteria, negative cases, test method, actual result, evidence, reviewer and operational validity |

**Corrections:** PRD and FRD overlap but are not automatically synonyms. SRS is a requirements specification, not a synonym for detailed coding/database design. BRD → PRD → SRS is a useful communication shorthand, not a mandatory waterfall or fixed document ownership. Approval, verification, changes and source authority are essential additional dimensions.

**External-source classification:** User-provided educational transcript is a teaching/reference source, not a binding FDG engineering standard. Primary references for independent future review include ISO/IEC/IEEE 29148:2018, NASA Systems Engineering Handbook, and INCOSE guidance; no claim of independently certified compliance is made.

## Canonical trace graph

~~~text
Source / stakeholder need
 → Business objective (WHY)
 → Requirement ID with relevant product/functional/system/software views (WHAT)
 → Acceptance Criterion IDs
 → Approved FPJIS Blueprint + ADR (HOW)
 → Authorized bounded work package
 → Implemented artifact + exact revision
 → Test / test run + actual expected-versus-observed result
 → Preserved evidence / review + acceptance authority
 → Named release baseline + measured operational outcome
 → Controlled patch, learning and future reuse
~~~

Typed links should distinguish: derives_from, satisfies, decomposes, constrains, implemented_by, tested_by, evidenced_by, approved_by, changes and supersedes. Keep source version, author/owner, dates and audit provenance. A link alone does **not** prove correctness.

A business outcome may have its own parent ID and several child functional/software requirements. Never force unrelated behaviors into one ambiguous mega-requirement just to achieve 'one record'. **One canonical owned fact, with linked representations**, is the constraint.

## Backward-compatible view profile

Do not rewrite existing manifests. Optional linked extensions to the current Requirement Blueprint and fpjis-manifest.yaml may include:

~~~yaml
schema_version: fpjis-requirement-views/0.1-proposed
requirement_id: FPM-REQ-001
parent_requirement_ids: [FPM-BIZ-001]
type: FUNCTIONAL
status: PROPOSED
source_ref: approved-brief-pending
business_view: {outcome_ref: FPM-BIZ-001}
product_view: {user_role_refs: [technician], outcome: traceable_PM_visit}
functional_view: {workflow_ref: fire_pump_visit}
software_view: {constraint_refs: [offline, provenance, conflicts, authorization]}
design_refs: []
acceptance_criteria_ids: [FPM-AC-001]
work_package_refs: []
implementation_refs: []
test_refs: []
evidence_refs: []
approval_refs: []
revision: 0
~~~

**Sample only.** This is not yet a deployed JSON Schema or second authoritative requirements repository. Existing fields/status vocabulary remain authoritative, and older manifest versions must remain readable until a controlled migration is approved.

## Roles and authority

- **FPJIS** owns requirement IDs, cross-view traceability, approved project baselines, bounded work packages, readiness, change impact and acceptance governance.
- **FDG CORE** owns reusable provenance, evidence, review and decision mechanisms, **not** engineering rule authority: [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|CORE Evidence & Provenance]].
- **FEIS** owns engineering semantics, calculations, equipment acceptance and maintainability rules: [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|FEIS Maintenance & Reliability]].
- **FBPOIS/FMIS** owns actual plant maintenance execution events, assignments and maintenance histories: [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FMIS]].
- **FLIS/FRCIM** owns regulatory source/obligation authority; do not replicate rule catalogs.
- **FMCIS** governs collaborator task ownership, noninterference and handovers. **FAIS** independently audits conclusions, evidence and remediation: [[22_FDG_Audit_Intelligence_System/15_Evidence_and_Traceability/FAIS-EVT-1500 - Evidence and Traceability Framework|FAIS Evidence & Traceability]].
- **Knowledge Repository** preserves canonical records, decisions, revisions, full-path wikilinks and learning independently of model/vendor.

## Work-package compilation and agent execution

1. Requirements/architecture compiler resolves ambiguity, checks reuse, identifies sources and produces applicable linked views, precise acceptance IDs, architecture decisions and scope/non-scope.
2. Builder implements **only** the authorized smallest complete vertical slice. No silent expansion or rewriting a collaborator's ownership. Return changed files, exact commit, tests, environment, failures and exceptions.
3. QA/auditor independently inspects real code and test-run evidence; generated tests or an agent's statement are not evidence of passing.
4. Engineering/domain reviewer approves technical acceptance; business/product sponsor approves the authorized outcome. Build authorization and remote deployment authorization remain separate.
5. FPJIS records status, evidence, unresolved issues, change impacts, named baseline and handover.

Reuse [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Traceable Patches Standard]], not a parallel agent workflow.

## Evidence-bound gates

**Before bounded build authorization:** approved source, unambiguous applicable behavior, owner, priority, dependency and risk; each material requirement has measurable ACs with verification methods and expected results; security, privacy, data, API, offline, regulatory and engineering rule applicability dispositioned; work package 100% ready for its *bounded* scope; explicit human build approval.

**Before VERIFIED:** tests/evaluations actually executed on the identified revision and environment, observed results recorded, negative cases examined, immutable/reproducible evidence linked and independently reviewed when required.

**Before ACCEPTED:** authorized owner reviews test failures, deviations, unresolved blockers, scope and evidence. Before OPERATIONALLY_VALIDATED: actual use/outcome metrics are measured rather than inferred.

Hard blockers for safety, security, privacy, false approval, data loss or regulated calculations override any numerical readiness. Waivers need explicit scope/authority; never silently count failures as passes.

## Measurement and no-false-green policy

Retain FPJIS's **four separate percentages**: Blueprint Implementation Readiness, Implementation Completion, Validation Completion and Operational Maturity. View coverage is a diagnostic measure, never a fifth conflated completion score.

Track requirement→AC coverage, requirement→accepted-implementation coverage, AC→valid-evidence coverage, orphan implementations, stale tests after requirements changes, exception/waiver counts, context retrieval effort and correction/handover effort. Publish numerator, denominator, timestamp, scope, formula, source revision and blockers. A new document does **not** justify increasing the historical **89.5%** generic FPJIS blueprint-readiness score.

## Pilot, validation and promotion sequence

1. Verify reuse against the existing standards and locate the authoritative active project record.
2. Establish an approved, bounded candidate using [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/18_FPM-REQ-001_Fire_Pump_Inspection_Evidence_Completeness_Pilot|FPM-REQ-001 Fire Pump Pilot]].
3. Obtain engineering procedures, role/authorization and offline/security decisions; baseline required ACs and hard blockers.
4. Paper-test normal, boundary, restart/offline, two-writer conflict, replay, permissions and false-approval scenarios.
5. Issue a separately authorized finite implementation package. Deliver and accept one complete slice locally.
6. Measure verified acceptance, defects, rework, handover and operational benefit against baseline.
7. Only then promote tested patterns to generic reusable contracts and consider optional manifest linting/checker/dashboard software.

**Current state:** documentation/design extension only; pilot software NOT BUILT, NOT TESTED, NOT ACCEPTED, NOT DEPLOYMENT AUTHORIZED. No current FPJIS percentage changes.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/00_Master_Index|FPJIS Core Completion & Roadmap]] → this standard.

## Founder source-to-build hard gate — 2026-10-19

**Binding project rule:** **No build starts with a material unresolved source-to-requirement gap. No feature is declared complete without working evidence and appropriate acceptance.**

Before setting BUILD_AUTHORIZED for any bounded work package, the FPJIS owner/independent reviewer shall verify against **current main and active project build**, not merely chat memory:

| Question | Required truthful record |
| --- | --- |
| Did the founder discuss or approve something that affects this exact task? | Original source or traceable historical provenance; approval status and exact applicable requirement; missing history explicitly UNKNOWN |
| Has the reference/decision actually reached canonical GitHub? | Current main commit, exact file/revision/owner. ON_BRANCH and private-chat/Library-only are **not** main |
| Is the work package implementable without guesswork? | Defined user scenario, input/output, data/offline/permission/error rules, exact source paths, test fixtures with expected outcomes, owner and reviewer |
| What is materially unresolved? | Source/decision gaps listed with impact and owner. Block affected work only; unaffected accepted source remains undisturbed |

**Preflight disposition:** SOURCE_UNREVIEWED / BRANCH_ONLY / EXTRACTED_NOT_ADOPTED / ADOPTED_NOT_SPECIFIED / SPECIFIED_NOT_IMPLEMENTED / READY_FOR_AUTHORIZATION / BUILD_AUTHORIZED. The final two are separate; only explicit existing FPJIS owner/founder authorization transitions to BUILD_AUTHORIZED. Do not invent a readiness percentage.

**Closeout disposition:** IMPLEMENTED / TESTED_ON_EXACT_BUILD / FUNCTIONALLY_ACCEPTED_BOUNDED / OPERATIONALLY_VALIDATED / COMMERCIALLY_VALIDATED; never infer later statuses from earlier ones. Store observed tests, exact artifact, negative/reopen/offline checks where relevant and legitimate user/engineer acceptance. Reuse [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Functional Product Completion Gate]].

**Sync interface:** [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020 same-session GitHub knowledge return]]; [[04_Knowledge_Management/FDG-HIST-0001 - Historical Conversation and Reference Reconciliation Handover 2026-10-19|historical gaps]]; [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|delegation-first]]. Reconcile relevant parallel branches through reviewed, owner-authorized patches; no wholesale stale-branch merge. This is an acceptance/authorization check, **not** a claim that GitHub contains every prior chat.
