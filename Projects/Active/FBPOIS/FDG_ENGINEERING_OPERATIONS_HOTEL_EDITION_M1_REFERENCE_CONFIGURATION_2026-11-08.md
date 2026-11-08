---
document_id: FDGEO-HOTEL-M1-REF-001
title: FDG Engineering Operations — Hotel Edition: M1 Synthetic Reference Configuration
status: REFERENCE_CONFIGURATION_DRAFT — NOT A FUNCTIONAL OR CUSTOMER ACCEPTANCE
owner: FBPOIS / FPJIS (cross-system execution)
created: 2026-11-08
classification: Synthetic demonstration data; no real facility or personal data
---

# FDG Engineering Operations — Hotel Edition
## M1 Synthetic Hotel Reference Configuration

**Decision:** The first commercial product is **FDG Engineering Operations — Hotel Edition**. Multiple like hotels reuse the same edition and configuration blueprint. An integrated resort is a customer organization with multiple hotel properties, not a separate product edition.

**Disposition:** EXTEND existing FBPOIS capabilities. Compose the existing FBPOIS-L1A-0001 Concern-to-Clearance baseline, FMIS maintenance records and FWIS concern/restriction/turnover capabilities. Do not create a parallel work-order engine, a new SaaS platform, a provisioning engine or an automated content operation.

**Current result:** This document establishes M1's synthetic customer configuration, scenario, data contract, acceptance fixtures, service-delivery accounting and collaborator handover. It does not claim that the application has been configured, that the workflow has run, or that M1 has passed. No application code was changed in this work package.

## 1. Product promise and boundary

> Every maintenance concern is traceable from initial observation through corrective action, technical verification and management reporting.

The Hotel Edition is a ready-to-demonstrate engineering operations setup, not an empty application. The initial customer experience is one hotel organization/property with configured buildings, engineering departments, role assignments, sample plant/assets, inspection and work-order workflow, evidence requirements and management reporting.

### Included in this M1 reference

- One synthetic hotel customer organization and one hotel property.
- Hotel building/area hierarchy and a representative engineering asset register.
- Engineering roles and a proposed workflow mapped to the existing role/authority architecture.
- One end-to-end sample maintenance concern/work order with an incomplete submission, return, correction, resubmission, technical validation and management report approval.
- Evidence metadata and attachment acceptance requirements.
- Monthly engineering report structure and source reconciliation rules.
- FDG setup, QA, support and service-economics ledger.
- Exact acceptance tests and gates for the implementation worker.

### Explicitly not included

- Resort, mall, casino or mixed-use editions. They are not separate products in this decision.
- Full PM optimization, procurement, stores, contractor portal, predictive maintenance, BMS integration or utility analytics.
- Customer-specific production deployment, public commercial launch or a delivery-date commitment.
- Automated customer provisioning, mass content/video production or autonomous publishing.
- Any claim that role enforcement, multi-tenant isolation, offline evidence synchronization, cloud security or production recovery is already accepted.

Hotel Room Readiness remains a separate later capability; do not silently bundle it into the Concern-to-Clearance first slice.

## 2. Synthetic customer seed

All names, identifiers, assets, events, readings and records below are fictional test fixtures.

| Field | Seed value |
|---|---|
| Organization | FDG Demo Hospitality Group |
| Organization code | FDG-DEMO-HG |
| Property | Seabreeze Hotel |
| Property code | SBH-001 |
| Property type | Hotel |
| Time zone | Asia/Manila |
| Currency | PHP |
| Operating model | 24/7 hotel engineering |
| Reference release target | Compose with FBPOIS-L1A-0001; no release declared |
| Customer data | Synthetic only |

### Building and area hierarchy

| Building code | Building | Areas |
|---|---|---|
| SBH-MAIN | Main Hotel Tower | Basement Plant Room, Ground Floor BOH, Guest Floors 3–12, Roof Plant Deck |
| SBH-BOH | Engineering / Back-of-House Block | Engineering Office, Workshop, Electrical Room, Plumbing Room |

### Engineering departments

- HVAC and Refrigeration
- Electrical
- Plumbing and Sanitary
- Fire and Life Safety (reference-only records; statutory decisions require qualified authority)
- Civil and General Maintenance
- Engineering Administration / Planning

### Synthetic asset seed

| Asset ID | Description | Location | Criticality | Demonstration purpose |
|---|---|---|---|---|
| SBH-AHU-003 | Guest Tower AHU-03 | Roof Plant Deck | Medium | Primary work-order scenario |
| SBH-CHWP-001 | CHW Primary Pump 1 | Basement Plant Room | High | Asset hierarchy and criticality filter |
| SBH-GEN-001 | Emergency Generator 1 | Generator Room | Critical | Critical-asset escalation fixture only |
| SBH-DHW-001 | Domestic Hot Water Pump 1 | Basement Plant Room | Medium | PM / inspection template fixture |
| SBH-EXF-002 | Kitchen Exhaust Fan 2 | BOH Roof | Medium | Photo/checklist evidence fixture |

Do not invent manufacturer, model, serial number, design duty, alarm setpoint, statutory interval or acceptance tolerance. Those fields remain null until sourced from an approved asset document or verified field survey.

## 3. Roles and authority boundary

The workflow must use property-scoped, authenticated role grants and separation of duties. Job title alone is not authorization. No user may approve their own submission. System administration does not grant engineering approval.

| Role | M1 responsibility | Permitted in the reference workflow | Not implied |
|---|---|---|---|
| Technician | Inspect, record readings, photographs, findings and corrective work | Create/submit assigned inspection and work evidence; respond to returned work | Self-approval, technical acceptance or operational release |
| Supervisor | Completeness and work-evidence review | Review, return with reason, confirm resubmission completeness, route onward | Approve own work or override engineering/safety controls |
| Duty Engineer | Technical validation and shift-level operational review | Validate technical findings within an approved scope; identify failed test or residual risk | Statutory signoff or automatic OOO/OOS release |
| Engineering Manager | Management review of completed engineering report and exceptions | Review/approve the report as a management deliverable, subject to an approved authority grant | Retroactive alteration of source records or automatic work-order close |
| Chief Engineer | Engineering governance and exception oversight | Review escalated critical/technical exceptions and management trends | Mandatory approval of every routine item merely because of title |
| Organization Administrator | User/property administration | Configure non-engineering organization data if authorized | Engineering approval or signoff |

**Authority is not yet resolved for runtime implementation.** Current main's FBPOIS-ROLE-0004 is Draft and its generic Work Order row calls for Engineering Manager approval and Chief Engineer final approval. PR #16 proposes a more nuanced routine/exception model but is unmerged and still requires independent engineering review. PR #18 deliberately blocks actorless terminal WO/PM transitions but is unmerged and is not a complete authenticated closeout workflow. The October 18 FMIS-first integration contract is also branch-only. Do not treat any of these as active main-branch authority.

For M1, model the requested sequence as a **workflow acceptance target**, not a grant of production permission:

1. Technician submits.
2. Supervisor returns incomplete work with specific correction requirements.
3. Technician corrects and resubmits.
4. Supervisor confirms evidence completeness.
5. Duty Engineer records technical validation or rejection with test basis.
6. Engineering Manager reviews and approves the completed engineering report as a distinct report-approval event.
7. Work-order terminal closure and any operational restriction release occur only through separately approved, actor-bound authority. If unavailable, remain pending and visibly blocked.

Report approval, maintenance verification, work-order closure and FWIS OOO/OOS release are four distinct events. A report approval must never imply the other three.

## 4. Canonical record flow and domain ownership

Reuse the existing domain boundaries:

- **FWIS:** operational concern, shift/turnover context and OOO/OOS/restriction state.
- **FMIS:** plant/equipment master references, preventive maintenance and maintenance work orders/history.
- **Shared FBPOIS contract:** organization/property/location identity, user identity/authorization, evidence references, audit/correlation and unified read model.
- **FBPOIS management view:** source-backed aggregation only; no hardcoded demonstration KPIs presented as live facts.

The record chain for the sample is:

`Concern → linked Work Order → Inspection → Finding → Corrective Action → Evidence → Supervisor Review → Technical Validation → Report Approval → (separately authorized) Closeout / Restriction Release`

Retain stable record identifiers, organization/property scope, source system, actor, timestamps, revisions, correlation ID and evidence provenance. Do not duplicate FMIS work orders inside FWIS. Do not clear a restriction because a work order says Work Complete.

## 5. End-to-end synthetic scenario

**Scenario ID:** SBH-WO-2026-0001  
**Asset:** SBH-AHU-003 — Guest Tower AHU-03  
**Observation:** Water staining and condensate overflow observed at the AHU drain pan during a routine inspection.  
**Initial classification:** Medium priority, provisional pending engineering triage.  
**Operational restriction:** No restriction is assumed. If the actual inspection finds an unsafe condition or an affected guest area requiring restriction, create a linked FWIS restriction and keep it active until separately authorized release.

### Expected workflow events

| Step | Actor | Action and required evidence | Expected state |
|---|---|---|---|
| 1 | Technician | Opens inspection; identifies property/building/area/asset; records observation, timestamp, condition, initial reading where available and original photographs | Draft |
| 2 | Technician | Submits inspection and linked work request; no missing required fields | Submitted / Supervisor Review |
| 3 | Supervisor | Finds incomplete evidence: no drain-trap close-up and no recorded drain-flow test. Returns with both explicit corrections | Returned for Correction |
| 4 | Technician | Adds requested close-up photograph, records actual drain-flow test method/result, adds corrective-action notes and resubmits | Resubmitted |
| 5 | Supervisor | Confirms required fields, evidence references and correction responses are complete; does not make the technical acceptance decision | Evidence Complete / Duty Engineer Review |
| 6 | Duty Engineer | Reviews finding and test evidence; records acceptance basis, result, residual risk and any required follow-up. Failed/uncertain test returns or escalates; no guessed tolerance | Technical Validation Passed or Failed |
| 7 | Engineering Manager | Reviews the completed engineering report, verifies source links and exception visibility, records approve/return decision and timestamp | Report Approved or Returned |
| 8 | Authorized work-order approver | Performs terminal closeout only if an approved, authenticated, property-scoped authority and independent evidence workflow exists | Closed or Pending Authority |
| 9 | Authorized operational release role | Separately releases any FWIS OOO/OOS restriction after required verification | Restriction Released or Remains Active |

The demonstration must show the return-and-resubmit loop, not merely a happy path. It must show that the original submission and return reason remain in the audit timeline after resubmission.

### Evidence object requirements

Each photo/file evidence item must have:

- Evidence ID and parent record ID.
- Organization/property and record ownership scope.
- Capture time and submitting actor.
- Original filename and media type.
- File size and content hash once bytes are available.
- Caption / what the image proves.
- Before/after or inspection/verification classification.
- Upload/sync state: local-only, queued, uploaded, failed or conflict.
- Access authorization and retention classification.

A filename, screenshot of a form, or text saying “photo attached” is not proof that a retrievable file exists. If the current application cannot persist and reopen the actual attachment, record that as a failed acceptance test.

## 6. Inspection and report templates

### Inspection form — AHU condensate / drain observation

Required fields:
1. Property, building, floor/area and asset.
2. Inspection type, date/time and assigned technician.
3. Observed condition and exact location.
4. Drain pan condition.
5. Trap/drain condition and observed obstruction/leak evidence.
6. Actual test method and result (no fabricated numerical acceptance threshold).
7. Corrective action performed or recommended.
8. Residual condition / follow-up.
9. At least one original inspection photograph where the workflow requires photographic evidence.
10. Technician declaration and submission timestamp.

Supervisor review:
- Required fields complete?
- Photos relevant and retrievable?
- Test method/result recorded?
- Finding and corrective action distinguishable?
- Any missing or contradictory evidence?
- Return reason and exact correction list if incomplete?

Duty Engineer validation:
- Technical finding supported by evidence?
- Test basis and result recorded?
- Residual risk and follow-up visible?
- Need for specialist/statutory review?
- Restriction/OOO/OOS decision separately recorded where applicable?

### Monthly Engineering Report — Hotel Edition

The report must be generated from underlying records and show:
- Reporting period, property and generation timestamp.
- Total concerns received, open, overdue, resolved and reopened.
- Work orders by status, priority, department and asset.
- PM due/completed/overdue only if the source data supports those counts.
- Critical/high findings and active restrictions.
- Work complete awaiting verification.
- Failed/returned submissions and repeat findings.
- Asset availability / downtime only where duration and status evidence support calculation.
- Labor hours only where actual time entries exist.
- Evidence completeness and outstanding sync/upload exceptions.
- Report approval actor, authority reference, decision and timestamp.
- Source record IDs and drill-through references.

**No synthetic KPI may be presented as a measured operational result.** Demo data must be watermarked or labeled “SYNTHETIC DEMONSTRATION DATA”. Empty/unknown values remain explicit; do not replace them with zero.

## 7. Service delivery, time and commercial economics

Start the service-delivery ledger with the first setup action. Record actual effort, including discovery, configuration, data cleanup, implementation, QA, correction, training, customer support, reporting and admin. Separate elapsed time from hands-on labor and identify interrupted work blocks where material.

| Ledger field | Meaning |
|---|---|
| work_package_id | M1 or later bounded package |
| date / worker | Actual work date and executing person/agent |
| activity | Discovery, configuration, data, workflow, QA, correction, training, support, reporting or admin |
| start / stop | Actual timestamps when captured |
| active_minutes | Measured hands-on time; do not estimate retrospectively as fact |
| elapsed_minutes | Wall-clock elapsed time, including waits if useful |
| output_ref | Exact file, commit, test, configuration or evidence |
| rework_minutes | Time spent correcting earlier work |
| billable_status | Internal / customer-billable candidate / excluded; no invoice implied |
| notes | Blockers, context switches and assumptions |

If exact time was not captured, record `NOT_MEASURED`; do not invent hours. This first repository/documentation session begins at 2026-11-08 08:42 Asia/Manila. Exact active duration was not instrumented and must be entered as NOT_MEASURED rather than fabricated.

Commercial formulas:

- `C_deployment = H_setup × R_internal + C_direct`
- `C_monthly = H_support × R_internal + C_recurring`
- `GM = (Revenue − C_delivery) / Revenue × 100`

`R_internal` must be selected by FDG from a defensible internal labor-cost basis. Founder time is not free. No price, margin, customer acquisition cost, capacity target or delivery commitment is approved by this reference document.

### Commercial acceptance gate

M1 is not commercially accepted until FDG can demonstrate and measure:
- Initial setup and configuration effort.
- Workflow implementation and data-onboarding effort.
- QA, correction and regression effort.
- Training and customer acceptance effort.
- Monthly support and report-preparation effort.
- Repeat configuration effort for a second like hotel.
- Direct recurring costs and internal labor cost.
- A credible service capacity and positive/acceptable contribution margin at an explicitly approved price.

## 8. M1 acceptance matrix

Statuses below are **NOT RUN** until an implementation worker records actual command, environment, output and evidence.

| ID | Test | Pass condition | Current status |
|---|---|---|---|
| M1-01 | Synthetic organization/property seed | One organization and hotel property; all records linked to correct scope | NOT RUN |
| M1-02 | Hierarchy and asset seed | Buildings, areas, plants and assets persist and reopen | NOT RUN |
| M1-03 | Role-scoped access | Each role sees only permitted property records/actions; unauthorized action denied server-side | BLOCKED — authority/security implementation not verified |
| M1-04 | Technician submission | Inspection and work request persist with original evidence | NOT RUN |
| M1-05 | Supervisor return | Missing photo/test evidence causes return with reason and correction list | NOT RUN |
| M1-06 | Correction/resubmission | New evidence and revision persist; previous submission/return remain auditable | NOT RUN |
| M1-07 | Duty Engineer validation | Technical basis, result, residual risk and actor are persisted; failed path is exercised | NOT RUN |
| M1-08 | Engineering Manager report approval | Report approval is a distinct event and cannot alter source records | BLOCKED — authority implementation not verified |
| M1-09 | WO terminal closeout | Actor/evidence/property/independent approval enforced; actorless terminal transition denied | BLOCKED — PR #18 is unmerged; no approved completion workflow on main |
| M1-10 | Restriction separation | Work complete and report approved do not release OOO/OOS; separate authorized release required | NOT RUN |
| M1-11 | Monthly report reconciliation | Every count reconciles to source records; unknown remains unknown; synthetic label visible | NOT RUN |
| M1-12 | Restart/persistence | Close/reopen application; all records and evidence references recover | NOT RUN |
| M1-13 | Offline/reconnect | Local work queues safely; restart, retry, duplicate and conflict tests pass without silent loss | BLOCKED — runtime sync evidence absent |
| M1-14 | Tenant/property isolation | Cross-property and cross-organization reads/writes/attachments denied at backend/data layer | BLOCKED — production server-side enforcement not verified |
| M1-15 | Recovery | Backup/restore or local recovery drill reproduces accepted records and attachments | NOT RUN |
| M1-16 | Delivery economics | Actual activity ledger complete; no missing time silently treated as zero | IN PROGRESS — ledger defined; measurements not captured |
| M1-17 | Reproduction | Second synthetic hotel can be configured without changing first hotel's data or source blueprint | NOT RUN; later milestone after M1 |
| M1-18 | Independent user acceptance | Qualified hotel engineering users execute the scenario and sign bounded acceptance | NOT RUN |

**M1 completion rule:** the reference configuration is documented when the seed and workflow fixture are complete. M1 functional acceptance requires executed tests. Product acceptance requires engineering, security, recovery, report accuracy and user acceptance. Commercial acceptance additionally requires measured repeatability and viable service economics. These are separate gates.

## 9. Current source reconciliation and build boundaries

Reviewed current main sources:
- `FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline.md` (main blob `69de0830a281c0db1865d098e0a9634c06b7ec46`): authoritative first-slice definition; no restriction auto-clear; evidence, verification and reporting requirements.
- `FBPOIS-ROLE-0004 - Workflow Authorization Matrix.md` (main blob `11923e83a792bd16647a0d3d8296ab7dd4fb87b8`): Draft generic authority matrix; not final operating policy.
- `02_FMIS/implementation/fmis/services.py` (main blob `7d6d524c78a1645715580c27e2810c1148bfb3e2`): existing SQLite FMIS implementation; current main permits actorless terminal status calls, which is a known blocker.
- `02_FMIS/implementation/tests/test_fmis_core.py` (main blob `134c19fb42b5ddfe3c83dd83b6d23af5df657d0b`): existing tests include actorless close/completion happy path on main; those tests are not proof of valid authority.

Reviewed non-main implementation proposals:
- PR #14: scoped FPJIS source-to-build gate and tests; not merged or enforced on main.
- PR #16: one-document role matrix reconciliation; Draft / requires independent qualified engineering review; not merged.
- PR #18: FMIS fail-closed terminal transition correction; not merged and intentionally removes terminal completion until a proper approved workflow is implemented.
- Branch-only FMIS-first integration contract and operational gap register: useful implementation guidance, not canonical main approval.

### Builder do-not-cross boundaries

1. Do not merge PR #14, #16 or #18 as part of this task.
2. Do not change the main role matrix or assign numeric approval/financial/safety thresholds.
3. Do not enable terminal WO/PM closure by role name alone.
4. Do not let report approval imply work-order closure or restriction release.
5. Do not weaken offline, property or tenant security to make the demo appear complete.
6. Do not use real customer, employee, guest or facility data.
7. Do not claim application functionality from this reference document.
8. Before any software coding, follow the repository's mandatory project-start skills/security gate and P0 runtime prebuild requirements. If those capabilities are not verified, report P0 BLOCKED WITH EVIDENCE and do documentation/review only.
9. Keep the implementation order FMIS functional baseline first, FWIS operational integration second, FBPOIS unified experience third, consistent with the branch-only October 18 integration contract pending canonical reconciliation.
10. No customer deployment, external communication, payment activation or production release without separate approval.

## 10. Collaborator handover — next executable work

**Work package:** FDGEO-HOTEL-M1-IMPL-001  
**Target:** Build the synthetic Hotel seed and demonstrate one complete concern-to-report path by extending existing owned capabilities.  
**Status:** READY FOR OWNER-ASSIGNED IMPLEMENTATION AFTER P0 PREFLIGHT; not dispatched and not build-authorized by this document alone.

### Required sequence

1. Read current `main`, root `AGENTS.md` and `CLAUDE.md`, current FBPOIS Master Index, FMIS Master Index, FWIS Master Index, FBPOIS-L1A-0001, FMIS completion contract and current implementation/test handovers. Reconcile main vs PR #14/#16/#18; do not use branch-only policy as approved authority.
2. Complete mandatory project-start skills/security preflight. Record actual installed/verified capabilities. If unavailable, stop software coding and return the exact blocker.
3. Pin the exact source commit, inspect current FMIS and FWIS source/tests, and identify the smallest owned implementation seam. Do not build the whole unified platform.
4. Seed one synthetic organization/property/building/area/asset and role fixtures using existing schemas. Prefer test fixtures or local isolated database; do not seed production.
5. Implement the smallest end-to-end inspection/concern → work order → evidence → supervisor return → resubmission → Duty Engineer validation → Engineering Manager report-approval path. If current app lacks a required function, implement only after authority and source contract are resolved.
6. Add positive and negative tests for missing evidence, self-approval, wrong property, expired/revoked delegation, unauthorized terminal close, failed verification, report approval separation, restriction auto-clear denial, interrupted attachment upload, duplicate retry and restart recovery.
7. Run actual service, UI and relevant offline/sync tests on the exact changed build. Record commands, environment, pass/fail and logs. Do not cite historical test counts as fresh results.
8. Run the synthetic report and reconcile every total to source records.
9. Record measured delivery time and rework as work proceeds.
10. Request independent review and qualified hotel-engineering UAT. Do not declare acceptance without reviewer/user evidence.

### Files and ownership guidance

- Primary domain baseline: `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline.md`.
- FMIS owns maintenance WO and PM implementation; do not add a second WO engine in FWIS.
- FWIS owns operational concerns, turnover and restriction state; preserve the separate OOO/OOS release rule.
- Shared platform owns stable organization/property/asset identity, authentication/authorization contract, evidence/audit envelope and report read model.
- This document is a project-level configuration and handover. It does not replace the canonical domain specifications or role matrix.

### Required return capsule

Return:
- Builder identity/runtime and actual dispatch receipt (or DISPATCH BLOCKED).
- Exact base SHA, branch, PR and commit.
- Exact files changed and why each is owned by the worker.
- Synthetic seed fixture identifiers and database isolation method.
- Test commands, environment and complete actual results.
- Screenshots or recordings only as supplementary evidence; include source IDs and test assertions.
- Offline, persistence, recovery, authorization and negative-test results.
- Report reconciliation evidence.
- Actual time ledger with measured/unmeasured distinction.
- Independent review and qualified user acceptance status.
- Remaining blockers and one next permitted action.

## 11. Decision log

| Decision | State |
|---|---|
| First product is FDG Engineering Operations — Hotel Edition | FOUNDER-DIRECTED |
| Multiple like hotels use the same edition/blueprint | FOUNDER-DIRECTED |
| Integrated resorts are multi-property customer organizations, not separate edition | FOUNDER-DIRECTED |
| Extend FBPOIS/FMIS/FWIS; no new SaaS platform | EXISTING GOVERNED DIRECTION |
| Concern-to-Clearance is the first operational slice | EXISTING FBPOIS-L1A-0001 BASELINE |
| Engineering Manager approves the completed report as a distinct event | M1 WORKFLOW TARGET; authority grant/runtime not verified |
| Routine WO/PM approval authority and thresholds | UNRESOLVED; PR #16 pending review |
| Actor-bound terminal closeout implementation | UNRESOLVED; PR #18 pending review |
| Production tenant/security/offline acceptance | NOT VERIFIED |
| Price, delivery timeline, service capacity target | NOT APPROVED / NOT ESTABLISHED |

---

**Handover status:** M1 synthetic reference configuration documented on a review branch. Application configuration, runtime execution, test results, independent acceptance, second-hotel reuse and commercial viability remain outstanding. Do not promote this document's status without evidence.
