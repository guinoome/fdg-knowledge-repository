---
document_id: FAIS-PRJ-0501
title: Initial FDG Functional Product Evidence Audit — 2026-10-17
status: Scoped Source-and-Evidence Audit; runtime revalidation pending
owner: FAIS
created: 2026-10-17
review_reference_commit: 4597cf80bfa854da32ecddd6c400cb1dfb253f10
scope: Four selected active-project packages; NOT repository-wide audit
audit_evidence: Selected GitHub code, tests, handovers, historic validation and prior decisions
tests_executed_in_this_audit: 0
---

# Initial Functional Product Evidence Audit — Four Selected FDG Projects

## Governing outcome

**A product is not complete simply because its architecture, blueprints, mockups, code skeletons, or test descriptions exist.** Completion must be bounded to an actual user workflow that operates from input through persistence, computation/control and useful output; it requires version-bound executed tests and authorized functional acceptance. Operational and commercial acceptance are separately evidenced when in scope.

This is a **scoped initial source-and-evidence audit**, not a full repository audit or a new runtime test. Verified in this pass: selected source files, test definitions, documented historical results and handovers exist and state the boundaries described below. No project was launched, downloaded, deployed, or retested in this session. GitHub/source evidence is not equal to application acceptance.

### Truthful lifecycle labels

- CONCEPT_ONLY: reference, design or mockup; no source-linked functional workflow proven.
- CODE_PRESENT: meaningful executable source, but actual run not confirmed.
- HISTORICAL_TEST_EVIDENCE: earlier version-bound executed test evidence is available; not necessarily rerun today.
- FUNCTIONAL_PRODUCT_CANDIDATE: bounded useful workflow and historical evidence; independent/qualified acceptance incomplete.
- FUNCTIONALLY_ACCEPTED: an authorized user/domain reviewer has executed/observed the exact bounded workflow and approved outputs and exceptions.
- OPERATIONALLY_VALIDATED: real-use, support, security and recovery conditions proven for intended environment.
- COMMERCIALLY_VALIDATED: verified customer payment/retention/economic result when commercial validation is the objective.

No sampled project receives a fresh FUNCTIONALLY_ACCEPTED verdict in this audit.

## A — FDG QTO / BOQ Estimate Toolkit

**Source and evidence:** [[Projects/Active/FDG QTO BOQ Estimate Toolkit/README|QTO README]]; [[Projects/Active/FDG QTO BOQ Estimate Toolkit/CURRENT_HANDOVER|QTO handover]]; source files at Projects/Active/FDG QTO BOQ Estimate Toolkit/html/engine.mjs and html/app.js; tests html/tests.mjs; prior results evidence/validation.json; runnable offline distribution/FDG-QTO-BOQ-Working-Template.html.

**Actual implementation observed in source:** calculations for length/area/volume/count/manual quantity, repeated items, allowance, net versus allowance cost basis, material/labor/equipment/subcontract rates, markup versus margin, mixed-unit and duplicate-ID guards, backup/normalize. This is concrete code, not a specification. Distribution HTML exists.

**Executable test definitions inspected:** 18 deterministic assertions cover dimensions, rates, allowance, direct cost, zero/unknown, invalid units, margin, duplicate IDs, archive and JSON round-trip. **Historical evidence inspected:** 2026-10-16 validation.json reports 18 passing checks and browser interactions, mobile display and in-memory PDF. The current audit did **not** rerun these tests.

**Past decisions versus delivered scope:** The narrow manual takeoff/estimating calculator is a meaningful standalone offline candidate. The larger FDG QTO vision also includes calibrated drawing measurements, MEPF schedule/symbol extraction, human review and defensible drawing provenance. None of these larger drawing-intelligence functions is established by this standalone engine; do not represent it as complete graphical QTO.

**Verdict:** FUNCTIONAL_PRODUCT_CANDIDATE, **standalone offline estimating only**; qualified project measurement, source/rate review, accepted print and independent test still pending. Not certified billability or full FEIS QTO.

**Next executable acceptance:** Named qualified estimator works from one consented real-world source quantity/rate scenario: capture dimensions → inspect BOQ grouping → verify known formula outputs → deliberate invalid/mixed input rejection → create PDF/print → save/reopen working HTML and JSON → assess traceable quantity/rate basis. Record exact artifact hash, screenshots/outputs, expected versus actual, reviewer identity and defects. Patch demonstrated failures only.

## B — FDG Construction Lifecycle Workspace

**Source and evidence:** [[Projects/Active/FDG Construction Lifecycle Workspace/README|Lifecycle README]]; [[Projects/Active/FDG Construction Lifecycle Workspace/CURRENT_HANDOVER|Lifecycle handover]]; [[Projects/Active/FDG Construction Lifecycle Workspace/CAPABILITY_COVERAGE|Coverage boundary]]; html/core.mjs; html/commissioning-engine.mjs; html/ui-commissioning.js; tests/lifecycle.test.mjs and tests/commissioning.test.mjs plus four other test files; evidence/tc01/validation.json and artifact-integrity.json; distribution/FDG-Construction-Lifecycle.html.

**Actual source observed:** core.mjs provides versioned project-state normalization, project-scope data checks, quantity verification, report snapshots and guarded imports. commissioning-engine.mjs contains connected TestPacks, Tests, Punch and Turnover functions and separate punch verification; commissioning.test.mjs defines a synthetic test/retest and failure-guard harness. Source is not just empty architecture.

**Historical test evidence:** 2026-10-17 handover and TC01 evidence report 305 executable checks, 41 browser assertions and 8 recovery smoke checks, plus bounded HTML/PDF outputs and hashes, against a pinned previous commit. This audit inspected evidence files but did **not** reproduce any runtime passes.

**Past decisions versus delivered scope:** One site entry driving reported quantities, remaining work and daily/weekly/monthly reports has bounded implementation/evidence. Test dossier and corrective-action flows are stronger than mere registers. But the full construction OS requirements—authenticated multi-user authority, single-active-session entitlement, secure sync, source-accepted billability, full turnover/operations authority—are not proven by the offline file. Fifty-six registers are not fifty-six independently accepted automatic workflows.

**Verdict:** FUNCTIONAL_PRODUCT_CANDIDATE for **single-user offline project capture/report/testing**, not a completed authenticated Construction OS, certified commissioning or payment workflow.

**Next executable acceptance:** Real novice/qualified construction user opens the existing HTML (do not rescope/rebuild): creates project and work item; logs two dated site updates; checks daily/weekly output and quantities; records failed test/retest and Punch evidence; generates scoped dossier; saves and reopens the project. Measure elapsed effort, incorrect outputs and confusion, with actual reviewer sign-off. Maintain distinct Reported/Verified/Accepted/Billable/Billed/Paid states. Native OS behavior, private live data and independent acceptance still unverified.

## C — FDG Business Platform / Fuel Operations

**Source and evidence:** [[Projects/Active/FDG Business Platform/README|Business Platform README]]; [[Projects/Active/FDG Business Platform/CURRENT_HANDOVER|Business Platform handover]]; [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel Operations]]; src/store.js; account/billing.js; server/payment-handlers.js; server/paymongo.js; tests/platform-smoke.mjs, tests/payments.test.mjs and tests/billing-ui.test.mjs; package.json.

**Actual code observed:** src/store.js explicitly creates a demo browser-local account, branch/module subscriptions and activation state. account/billing.js is separate and includes authenticated billing control and unavailable-provider states. Test definitions cover local catalogue/trial invariants and payment handlers using synthetic PayMongo fixture data/keys. Unit tests with fixtures do **not** prove live settlement or secure live operations.

**Handovers and decision boundary:** Prior TEST PayMongo provider test evidence is distinguished from production. CURRENT_HANDOVER states production signup/recovery delivery, secure Fuel operational entitlement, and live billing remained gated. Earlier decisions require one account, independent business/branch subscriptions, 7-day trials, entry pricing from PHP 500, and real secure role/branch separation. The local browser demo workflow does not satisfy production account/data authorization.

**Verdict:** WORKING DEMO AND TEST BILLING COMPONENTS with meaningful code, **NOT production operational/commercial product acceptance**. Roadmap catalog cards do not establish working Restaurant, Trucking, Retail etc. modules.

**Next executable acceptance:** Reuse current code; first resolve signup/recovery security and provider delivery evidence. In an explicitly approved test environment, demonstrate fresh signup → confirmed login → activate module/branch → isolated branch data and bill/payment-unavailable states → cancel one branch without affecting other subscriptions → logout/relogin with preserved authorized state. Run cross-account and cross-branch negative tests. No live money enablement without separate approval.

## D — FBPOIS Facility Spatial Interface

**Source and evidence:** [[Projects/Active/FBPOIS/README|FBPOIS spatial project]]; [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS architecture]]; [[Projects/Active/FWIS/README|FWIS current software]]; [[Projects/FMIS_Local_Prototype/README|FMIS prototype]]; spatial reference/facility-overview-concept.html.

**Source/handovers observed:** The FBPOIS spatial README explicitly says concept filed and spatial implementation not started. Its apparent asset-health/live-alarm/energy totals are sample and do not have authoritative data feeds. Other FWIS/FMIS implementations remain distinct and may already have useful operational behavior: do not erase or rebuild them by declaring this spatial folder unimplemented.

**Past decisions versus delivered scope:** The intended FBPOIS functional concern → work/assignment → evidence → verification → clearance outcome and source-backed spatial plant/concern view cannot be replaced by a visually convincing but unconnected mockup. Missing data must display Unknown or Not reported, never simulated healthy status.

**Verdict:** CONCEPT_ONLY for **this spatial interface**; no conclusion about the entire FBPOIS/FWIS/FMIS portfolio.

**Next executable acceptance:** Audit present FWIS and FMIS code/authority before touching them; then one bounded spatial view linking a real property/plant/concern record to a selectable hotspot, source-state visibility, Unknown handling and existing permission/evidence controls. No invented health scores or reimplemented operations ledger.

## Six cross-project audit findings

| Finding | Failure mode | Required next control |
| --- | --- | --- |
| FP-AUD-001 | Generic documentation score mistaken for product-readiness percentage | No readiness/completion without user-visible functional proof and bounded scope |
| FP-AUD-002 | Earlier test evidence assumed equivalent to fresh reproducibility | Pin actual source/build; rerun test harness on exact revision; store version/environment/results |
| FP-AUD-003 | Offline proof of concept narrated as complete enterprise platform | Claim only tested slice; explicitly show unavailable operations, authorization and billing |
| FP-AUD-004 | Previously discussed decisions not always linked to executable acceptance IDs | Compare current source/handovers to approved earlier decisions; missing evidence is open, not implicitly done |
| FP-AUD-005 | Synthetic unit/browser tests treated as substitute for real qualified-user validation | Observe actual user workflow and technically authorize applicable outputs |
| FP-AUD-006 | Working source at risk of being rebuilt as fresh scaffold | Preserve committed artifacts; patch only measured defects with regression, rollback and handover |

## Functional product acceptance dossier — reuse existing contracts, avoid paper growth

For an actual named release/slice the record must *point to*, not duplicate:
- original approved user need and bounded scope; explicitly deferred architecture;
- current, runnable deliverable/path/hash and versioned source commit;
- exact input → persistence → processing/control → output → save/reopen flow, normal and negative cases;
- actual executed test commands/results/time/environment, previous and fresh evidence distinguished;
- professional/functional acceptance owner, date, test review and proof of approval;
- observed client usefulness, defects and exceptions; scoped support/recovery limits;
- next smallest shippable patch with measurable acceptance IDs.

Reuse [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Finished Session Standard]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|corrected Readiness Rubric]], [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Evidence Manifest]], and [[22_FDG_Audit_Intelligence_System/05_Project_Audit/FAIS-PRJ-0500 - Project Audit|FAIS Project Audit]].

## Audit limitation and next completion condition

**Inspected here:** selected sources, defined test suites, prior evidence, handovers and earlier recorded user requirements from **four project areas**. **Not comprehensively inspected:** all files across those projects, all other active projects, actual production APIs, user accounts, test execution on current HEAD, current deployment, independent client acceptance, pricing/compliance or domain technical acceptance.

**Test runs performed during this audit: 0.** Source-level observations and prior evidence are meaningful, but this audit cannot grant FUNCTIONALLY_ACCEPTED, OPERATIONALLY_VALIDATED, COMMERCIALLY_VALIDATED or a new numerical project readiness score.

**Next actions:** prioritize the already runnable QTO and Construction Lifecycle products for qualified-user acceptance; Business Platform production-boundary verification; and source-backed FBPOIS functionality with FWIS/FMIS reuse. Update this audit with actual run evidence before closing any finding. Do not generate new broad architecture to substitute for the missing acceptance.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] → [[22_FDG_Audit_Intelligence_System/05_Project_Audit/FAIS-PRJ-0500 - Project Audit|Project Audit]] → this scoped audit.
