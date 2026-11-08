---
document_id: FBPOIS-E2C-0001
title: Engineering Evidence-to-Clearance — Product Definition and UX Contract
status: FOUNDER_DIRECTED_PRODUCT_BASELINE / AUTHORITY_AND_RUNTIME_ACCEPTANCE_OPEN
owner: FBPOIS
contributors: FMIS, FWIS, FPIS, FWAIS, FPJIS
created: 2026-11-08
source_reference: FWAIS-IND-KANNA-2026-11-08
related_issue: 11
---

# FBPOIS-E2C-0001 — Engineering Evidence-to-Clearance

## 1. Product decision

The next FDG engineering-operations product is **FDG Engineering Evidence-to-Clearance (E2C)**.

E2C is not another maintenance reporting interface, a generic form builder, a spreadsheet clone or a second work-order system. It is the guided field-to-management workflow that turns an engineering concern and the work performed into a traceable, reviewed, technically verified and properly authorized engineering outcome.

The existing FBPOIS **Concern-to-Clearance** baseline remains the first bounded operational workflow within E2C. Reuse and extend it; do not replace it with a parallel product or duplicate FMIS/FWIS records.

**Core promise**

> Technicians capture once. Supervisors review easily. Engineers verify technically. Management decides confidently. Nex produces the intelligence automatically.

This product direction and promise are founder-directed on 2026-11-08. The UX and domain requirements below are the product contract for review. They do not approve facility-specific authority thresholds, production permissions, deployment or a claim that the product is implemented.

## 2. Product outcome

A real engineering work package must be able to move from first observation to an accountable outcome without asking staff to re-enter information in separate reports.

The product shall:

- prefill all known context from existing organization, property, location, asset, user, assignment and work-order records;
- capture observations, measurements, actions and evidence at the point of work;
- preserve original submissions and all subsequent revisions;
- give each role only the next actions appropriate to its responsibility and authority;
- enforce required evidence and workflow rules in the service/API layer, not only in the visual form;
- distinguish maintenance completion, technical verification, management approval and operational restriction release;
- produce an immutable closeout package and management-ready monthly intelligence from the same source records;
- remain usable during connectivity interruption and reconcile changes without silent data loss;
- allow Nex to retrieve authorized records and create evidence-linked analysis drafts without assuming approval or closure authority.

## 3. Product boundary and ownership

E2C composes existing FBPOIS capabilities. It does not create new system ownership.

- **FMIS owns maintenance truth:** work orders, PM occurrences, assignments, findings, corrective actions, materials, maintenance history, testing and maintenance closeout.
- **FWIS owns operational truth:** concerns, plant/room operational state, incidents, operational communications and OOO/OOS or other availability restrictions and their release.
- **Shared Data Platform owns shared references:** organization, property, building, area, room, plant, asset/equipment identifiers and tenant/property relationships.
- **FBPOIS Workflow Engine owns workflow execution:** workflow instance, state transitions, routing, stage ownership, delegation validation, SLA, escalation and workflow-event audit.
- **FPIS owns presentation governance:** accessible, premium, mobile-first, role-specific experience patterns.
- **FWAIS owns reusable workflow research and automation patterns.**
- **Nex consumes authorized data:** retrieval, analysis, narrative drafting and recommendations with evidence provenance. Nex does not become a parallel maintenance database or an approval authority.

The system-of-record relationship stays:

FBPOIS → FMIS (maintenance) + FWIS (operations) + Shared Data Platform

The E2C workflow coordinates these domains; it does not collapse them into one status field or one undifferentiated module.

## 4. Experience design — do not make it look like Excel

The primary experience is a visual engineering work journey, not a dense grid.

Use role-specific cards, a clear progress path, contextual evidence, readable timelines, focused review panels and a restrained management command centre. Data tables may exist for administrative exports or specialist analysis, but they are not the default field or approval interface.

### 4.1 Technician — My Work

The technician lands on a personal **My Work** queue. Each assignment is a compact job card with the work-order reference, location, asset, priority, due time, operating restriction, a short task description and the next action.

Opening a job starts a guided sequence. Known data is already present.

**Confirm → Observe → Capture → Perform → Test → Submit**

- Confirm the correct asset, work scope, hazards and operating notes.
- Record what was actually observed. Keep observed facts separate from a suspected cause.
- Capture evidence with camera-first controls and task-specific evidence prompts.
- Record corrective work, materials, crew/time and any blocker.
- Enter the test method, acceptance criterion, actual reading/result, unit and pass/fail/not-applicable disposition.
- Review a plain-language completeness summary before submission.

The UI should progressively reveal only the fields relevant to the task type, asset, risk and inspection template. The user can save and resume a draft. Do not expose template administration, workflow configuration or management-only fields to technicians.

A new report must not be created merely to summarize information already stored in the work order. Submission freezes the selected revision for review; further changes create a revision with an attributable history.

### 4.2 Supervisor — Review Inbox

The Supervisor receives an actionable **Review Inbox**, not a raw list of form fields.

A review card identifies the assigned team member, equipment/location, priority, age, submitted revision and any missing or flagged evidence. Opening it presents an evidence story: findings, checklist, measurements, corrective action and before/during/after/test media in context.

The Supervisor can:

- accept the completeness/workmanship review and route the package forward;
- return it with a specific reason attached to the relevant field, photo or test;
- escalate a technical or operational exception.

A return is not deletion. Preserve the submitted revision, the decision, the reason and the correction/resubmission chain. The technician receives a concise correction task list and returns a new revision.

Supervisor review is not a substitute for technical verification or statutory sign-off.

### 4.3 Duty Engineer — Technical Review

The Duty Engineer receives a **Technical Review** workspace containing the maintenance record and the operational context needed to make a defensible engineering assessment.

Show:

- asset/plant identity, criticality and relevant maintenance history;
- the original concern and operational impact;
- observed findings versus diagnostic hypotheses;
- measured values, units, test method and applicable acceptance criterion;
- corrective work and materials;
- evidence provenance and missing/uncertain items;
- residual defects, constraints and the current FWIS restriction/OOO/OOS state.

The Duty Engineer records what was technically checked, the applicable criterion or reviewer basis, actual result, conclusion, residual risk, supporting evidence and recommendation. A failed, missing or inconclusive required test cannot be converted into a pass by changing a status label.

Technical verification is its own attributable event. It is not identical to approving expenditure, accepting a policy exception or releasing an operational restriction.

### 4.4 Engineering Manager / Chief Engineer — Decision Center

Management receives a decision-ready brief, not another data-entry form.

The decision view should present the issue, operational impact, evidence-backed technical finding, unresolved risks, proposed disposition, resource/cost implications where source data exists, and the exact decision required. Each recommendation must link to its source records.

Use **management by exception**: routine work may follow a shorter route only when an approved facility/organization policy explicitly delegates the relevant work class to a competent, independent Supervisor or Duty Engineer within property/asset scope. Critical, regulated, safety-related, unclassified, disputed or otherwise exceptional work escalates to the authorized Engineering Manager / Chief Engineer or separately required statutory/qualified signatory.

No numeric cost, downtime, risk or asset-criticality thresholds are invented by this product document. The authorized facility policy must supply them. If classification, evidence, delegation, property scope or threshold is absent, stale or conflicting, the workflow must fail closed and route for the higher authorized decision.

### 4.5 Management — Engineering Command Center

The executive experience is a concise command centre built around operational exceptions and engineering decisions.

Lead with a short narrative and a small set of verified status cards. Show critical open concerns, restricted/OOO/OOS assets, work awaiting verification, overdue approvals, aging backlog and decisions required. Use clear trends and visual summaries, not dozens of spreadsheet columns.

Every card and chart must drill through to the source records. Display the reporting period, data-as-of time, latest successful synchronization and known coverage gaps. Missing data is **Unknown / Not Reported**, never zero, normal or green.

## 5. Workflow semantics and state separation

The product shall not overload one field called status. These dimensions remain distinct:

**Work lifecycle** describes maintenance execution: Draft, Assigned, Acknowledged, In Progress, Work Complete, Verification Pending, Verified, Closed, Reopened or Cancelled.

**Review lifecycle** describes governance: Not Submitted, Supervisor Review, Returned, Duty Engineer Review, Awaiting Management Decision, Approved, Rejected or Escalated.

**Readiness/constraint** describes executability: Ready, Waiting Access, Waiting Material, Waiting Contractor, Waiting Permit/Safety, Waiting Engineering or Waiting Approval.

**Operational state/restriction** describes whether the affected plant, asset, room or location may operate normally. FWIS owns OOO/OOS and the corresponding clearance/release record.

Priority describes importance; readiness describes whether work can proceed; work lifecycle describes execution; review lifecycle describes approval; operational restriction describes permitted use. They are not interchangeable.

### Mandatory distinctions

- **Work Complete** means the assigned work activity has been reported complete. It does not mean verified, closed, safe to return to service or operationally cleared.
- **Verified** means the required technical verification has been recorded against its criterion by an authorized verifier with supporting evidence.
- **Closed** means the maintenance record has been closed through the approved actor-bound FMIS transition.
- **Restriction Released** means the separate FWIS operational release process has been completed by its authorized actor. FMIS closure must not perform this action implicitly.

Where an asset/location remains restricted, management views and generated reports must keep that restriction prominent even if the maintenance activity is complete.

## 6. Approval authority contract

The product must preserve the intended engineering responsibility chain:

Technician → Supervisor → Duty Engineer / Engineering Service Manager → Engineering Manager / Chief Engineer

The stages have different meanings; they are not cosmetic sequential signatures.

- Technician: submits execution facts and evidence; cannot approve their own submission.
- Supervisor: reviews assignment, completeness, workmanship and team execution; returns deficiencies or routes the package onward.
- Duty Engineer / Engineering Service Manager: validates technical evidence, test results, plant context, residual risk and operational recommendation within the assigned authority.
- Engineering Manager / Chief Engineer: decides policy exceptions, material operational/financial/risk matters and work classes reserved to management under the approved matrix.

Routine delegation is permitted only where explicitly described in an approved authority policy. The product shall resolve the actual authenticated person, role, property/asset scope, competency/qualification requirement, active delegation, policy version and separation-of-duties conditions at decision time. A title or generic administrator permission is not sufficient.

The current main-branch FBPOIS-ROLE-0004 is Draft. PR #16 contains a proposed routine-versus-exception matrix but is also unmerged. The founder's earlier management-by-exception direction is captured as a product requirement here; this document does not grant live facility privileges or approve missing site thresholds.

## 7. Evidence model and trust

Evidence is a first-class record attached to a work package and its exact revision. It is not a loose file in a shared folder.

For each evidence item preserve, where available:

- stable evidence ID and parent work-order/concern/revision reference;
- original file bytes, media type, size and content hash;
- creator/actor and capture method (in-app camera, device import, document upload, generated output);
- device capture time and server receipt time as separate values;
- caption, evidence category and context;
- optional location/provenance metadata, subject to privacy and site policy;
- upload/sync state and any verification/reviewer reference.

Use guided evidence categories such as **Before**, **Condition Found**, **Work in Progress**, **Corrective Action**, **After**, **Test / Verification** and **Supporting Document**. Templates decide which categories are required for a particular work type and risk class.

A hash supports byte-integrity checking after the hash is computed; it does not prove that a photo depicts the claimed scene, that GPS is accurate, or that the engineering conclusion is correct. GPS and location stamps are optional policy-controlled metadata, not proof of condition. Imported images must be identified as imported; offline captures remain usable but have a distinct provenance/sync state until the server receives them. Never silently label metadata as verified evidence.

Preserve original files and superseded revisions. A replacement creates a new evidence version/reference and audit event, not destructive overwrite.

## 8. Snapshot, audit and synchronization rules

Every consequential event must record an authenticated actor, role/scope at action time, action, previous/new state, timestamp, reason/comment, affected record revision, relevant evidence references and applicable authority-policy version.

Offline capture must preserve local event order, device timestamps and pending upload state. Synchronization uses stable client IDs/idempotency keys so retries do not create duplicate work orders, media or approvals. Conflicts are visible and require explicit resolution; no silent last-write-wins on safety, authority, test results or record revision.

An offline approval request may be queued with its provenance. It is not a final approval until the authoritative service revalidates current actor access, property scope, delegation, record revision and policy. Revoked or stale authority cannot become valid merely because the device was offline.

The submitted package is a frozen snapshot of record revisions and evidence references. A return creates a new revision. The final approved closeout snapshot is immutable; a later correction or newly received source fact creates a new revision and, where material, a new review/approval cycle.

## 9. Generated outputs — not a separate reporting product

Reports are generated views of the same operational records. Staff should not re-enter the work to create a PDF or monthly summary.

### 9.1 Work-order closeout package

Generate a polished, readable engineering document containing:

- work-order identity, site/property, location and asset;
- original concern, priority and operational impact;
- condition found, readings and inspection results;
- corrective work, parts/materials and crew/time where recorded;
- test method, criterion, measured result, verifier and timestamp;
- numbered evidence photos with meaningful captions and provenance state;
- residual defects, deferred actions and continuing restrictions;
- Supervisor review, Duty Engineer verification and any required management decision, with actor, role, scope, time, reason and policy version.

Design this as a professional engineering dossier: clear hierarchy, short narrative, evidence panels, before/after comparison and a decision timeline. Do not present it as a spreadsheet export with a logo.

### 9.2 Monthly engineering intelligence brief

Generate a management brief from the FMIS and FWIS record sets. It should lead with the executive position, show the work portfolio and aging constraints, identify significant defects/repeat failures, expose critical equipment and operating restrictions, summarize verification/approval backlog, and end with accountable actions and decisions required.

Use only metrics with valid source records and documented definitions. PM compliance requires actual due/execution records; downtime requires valid downtime events; MTTR/MTBF/availability require defensible denominators and time bases; cost summaries require recorded and reconciled costs. Every metric displays period, scope, definition, data freshness and coverage. Unavailable or partial metrics are labelled as such.

The main presentation should use editorial summaries, visual trends, exception cards and source drill-through. CSV/Excel may remain an export for users who need analysis, but it is not the product interface or the default monthly report.

## 10. Nex intelligence contract

Initial Nex operational access is read-only and limited to records the current user is authorized to retrieve.

Each generated finding or recommendation must identify:

- the claim or observation;
- source work orders, evidence, inspection, logbook and approval records;
- calculation/comparison method where applicable;
- reporting period and data-as-of time;
- missing data and material limitations;
- suggested next action and responsible decision owner.

Nex distinguishes observed fact, verified technical result, calculated metric, hypothesis and recommendation. It may draft a report or management brief. It does not autonomously approve a work order, close maintenance, release an OOO/OOS restriction, commit expenditure or change equipment settings.

Any future write capability requires a separately approved least-privilege action contract, server-side authority enforcement, idempotency, audit and negative tests. MCP is an optional transport, not the FDG domain model or authority engine.

## 11. KANNA benchmark — use as a reference, not a dependency

The canonical external benchmark is [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA Competitive Workflow and Field UX Study]].

Collaborators should cross-check KANNA's published patterns when evolving E2C, particularly reusable report templates, camera-first evidence capture, photo organization, send-back/resubmission, mobile approvals, offline preparation, voice/OCR draft assistance and project-level management visibility.

Adopt the useful interaction patterns; do not copy the vendor's database, workflow authority, UI layout, price dependencies or SaaS assumptions. KANNA is not an FDG dependency and its MCP connection is not required for E2C.

Known design cautions from the study: KANNA's required-field warning is advisory rather than a hard engineering gate; offline use has preparation limits; photo-verification metadata has online dependencies; local-language AI capability is not established in the reviewed public material; and public MCP documentation is not a complete security/integration contract.

## 12. Pilot acceptance — one real, anonymized work order

No live facility work order is supplied by this document. Initial tests must use synthetic records clearly labelled TEST DATA. Operational user acceptance requires a real, anonymized and authorized work order from the participating facility.

The bounded acceptance path is:

1. Technician opens an assigned work order, records findings and readings, captures required media, saves offline and resumes without loss.
2. Supervisor returns a specific deficiency linked to a field/evidence item; the previous submitted revision stays inspectable.
3. Technician corrects and resubmits; the new revision retains the prior history.
4. Duty Engineer rejects missing/failed/out-of-range required verification and records the acceptance criterion, result and basis when successful.
5. The server rejects self-approval, wrong-property approval, expired/revoked delegation, unassigned reviewer, stale policy and unknown role/action.
6. A management exception routes to the authorized approver; unknown classifications fail closed.
7. FMIS work completion does not release FWIS OOO/OOS. The separate operational clearance requires its own authority and evidence.
8. Offline synchronization is idempotent, retains original evidence references, shows conflicts and rejects stale queued authority.
9. The closeout PDF and monthly brief reconcile independently to source records; every reported figure and decision drills through; freshness and gaps are visible.
10. The immutable approved snapshot reopens with identical evidence, decision and audit references.

Acceptance measures include field completion time and manual input count, return/rework rate, stage delay, evidence completeness, synchronization loss/duplication, report preparation time and reconciliation error. Claim improvements only after a baseline and actual user test.

## 13. Scope and release sequencing

**Reuse:** current FBPOIS Concern-to-Clearance baseline, FMIS work-order domain, FWIS concern/OOO/OOS records, Shared Data Platform identifiers, shared workflow engine, existing report archive and audit capabilities.

**Extend:** role-specific field/review/decision experiences; evidence metadata and immutable revision handling; actor-bound approval/closure; offline synchronization; report snapshots and source-linked Nex read model.

**Do not build now:** a new reporting-only interface, parallel work-order database, second asset registry, generic low-code workflow product, predictive-maintenance model, BIM/digital-twin engine, external voice/OCR dependency or live KANNA integration.

Recommended order:

1. Reconcile Issue #11 and the existing main/branch authority conflict. Record the approved management-by-exception scope and facility-controlled thresholds.
2. Review PR #14 source-to-build gate and PR #18 fail-closed safety correction with their proper maintainers/security reviewer.
3. Define and test the actor-bound, property-scoped FMIS terminal transition using the approved FBPOIS-ROLE-0004 authority policy; preserve a legitimate closeout path.
4. Compose the existing Concern-to-Clearance baseline using existing FMIS/FWIS records and the shared workflow engine.
5. Deliver one technician-to-supervisor-to-duty-engineer slice with offline evidence, revision/send-back, audit and real report output.
6. Add exception-based management decision and monthly intelligence output after the first slice is accepted.

No new front-end implementation should begin until the affected source-to-build and authority requirements have an approved baseline and an FPJIS-scoped work package. This does not block unrelated accepted FBPOIS/FWIS work.

## 14. Resolution register

**RESOLVED IN CANONICAL MAIN — 2026-11-08**
- Product direction and name: FDG Engineering Evidence-to-Clearance.
- Concern-to-Clearance remains the first bounded FBPOIS workflow within that product.
- KANNA is a reusable competitive UX reference, not a platform dependency.
- The product must be evidence-first, card/timeline-led and mobile-friendly, not an Excel-like reporting interface.
- FMIS maintenance truth and FWIS operational restriction truth remain separately owned.
- Work Complete, Verified, Closed and Restriction Released are separate outcomes.

**OPEN — AUTHORIZED HUMAN / IMPLEMENTATION EVIDENCE REQUIRED**
- Facility/site adoption and approval of the routine-versus-exception authority matrix and numerical thresholds.
- Independent review/promotion of the authority matrix and the workflow/security changes.
- Actor-bound and property-scoped FMIS work-order/PM completion implementation on canonical main.
- Database/service/UI/offline/synchronization negative and positive tests on the exact accepted build.
- Real facility pilot, qualified engineering review and user acceptance.
- Evidence that closeout/monthly outputs reconcile to source records.
- Any KANNA trial, account integration or MCP write access; none is authorized or required by this document.

Do not change these open items to resolved because a design is documented, a branch passes synthetic tests or a dashboard looks complete.

## 15. Canonical references and handovers

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|FBPOIS-L1A Concern-to-Clearance Baseline]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|FMIS Corrective Maintenance and Work Orders]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/11_FMIS_User_Roles_and_Access|FMIS User Roles and Access]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0007 - Concerns Tracker|FWIS Concerns]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0008 - OOO & OOS Management|FWIS OOO/OOS]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0010 - Workflow Management|FWIS Workflow Management]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0014 - Reports|FWIS Reports]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04A_Workflow_Engine/FBPOIS-WF-0000 - Workflow Engine Architecture|FBPOIS Workflow Engine]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/FBPOIS-ROLE-0004 - Workflow Authorization Matrix|FBPOIS Workflow Authorization Matrix]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA Competitive Workflow and Field UX Study]]
- [Issue #11 — source-to-build reconciliation](https://github.com/guinoome/fdg-knowledge-repository/issues/11)
- [PR #14 — FPJIS source-to-build preflight](https://github.com/guinoome/fdg-knowledge-repository/pull/14)
- [PR #16 — FMIS authority matrix proposal](https://github.com/guinoome/fdg-knowledge-repository/pull/16)
- [PR #18 — actorless terminal-transition safety correction](https://github.com/guinoome/fdg-knowledge-repository/pull/18)

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS Master Index]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/00_Architecture_Master_Index|FBPOIS Architecture]] → this product contract.


## 16. Source-to-build acceptance identifiers

These identifiers make the founder-directed product requirements addressable by FPJIS work packages. They are **acceptance requirements, not claims that executable tests or features already exist**. Each implementation must map the IDs to exact code paths, executed tests, evidence and qualified human acceptance.

| Requirement ID | Required behavior | Acceptance ID | Acceptance condition |
|---|---|---|---|
| E2C-UX-01 | Technician My Work pre-fills known assignment, property/location/asset, priority and next action; no duplicate data entry | E2C-AC-01 | Technician completes a bounded synthetic work order using only task-specific new inputs; saved draft resumes after restart |
| E2C-EVD-02 | Evidence is attached to the correct work-order revision and contextual Before/Findings/Work/After/Test categories | E2C-AC-02 | Original bytes/reference, category, caption, capture method and timestamps survive save, return, revision and reload |
| E2C-REV-03 | Supervisor reviews a frozen submission, returns a field/evidence-specific deficiency and preserves all revisions | E2C-AC-03 | Return creates a correction task; original snapshot and return reason remain inspectable; resubmission creates a new revision |
| E2C-TECH-04 | Duty Engineer verifies actual test result against a criterion/reference and records the verification basis | E2C-AC-04 | Missing, failed or out-of-range mandatory test cannot be marked verified; valid result records criterion, units, actor, time and evidence |
| E2C-AUTH-05 | Approval routes through authenticated, competent, independent authority under current property/asset scope and policy version | E2C-AC-05 | Self-approval, wrong-property/asset, unassigned reviewer, invalid/expired/revoked delegation and unknown classification are denied server-side |
| E2C-OPS-06 | FMIS maintenance closure and FWIS operational restriction release are separate decisions | E2C-AC-06 | Work order may be verified/closed without clearing OOO/OOS; restriction remains until separate authorized FWIS release |
| E2C-SYNC-07 | Offline capture and queued actions synchronize idempotently with explicit conflict handling and authority revalidation | E2C-AC-07 | Reconnect/retry produces no duplicate work or evidence; conflicting revision is visible; stale/offline approval cannot finalize after authority revocation |
| E2C-OUT-08 | Work-order closeout dossier is generated from an immutable source snapshot with linked evidence and approval history | E2C-AC-08 | Each key fact, photo and decision drills through to its exact source record/revision; reopened approved snapshot remains stable |
| E2C-MGT-09 | Monthly engineering brief derives verified metrics and exceptions from FMIS/FWIS records | E2C-AC-09 | Independently recalculated counts/percentages reconcile to source records; period, denominator, freshness and coverage gaps are visible |
| E2C-NEX-10 | Nex produces read-only, evidence-linked engineering and management drafts for authorized records | E2C-AC-10 | Each claim identifies source records, calculation/method, limitations and action owner; unauthorized data is denied; no approval/closure/release write is performed |
| E2C-GOV-11 | Workflow decisions and report snapshots preserve actor, role/scope, policy/delegation version, reason, time, revision and evidence links | E2C-AC-11 | Audit history is complete, immutable for accepted decisions, and independently reconstructs who did what under which authority |

### Traceability state

- Product intent and acceptance identifiers: **RESOLVED_IN_MAIN** in this document.
- Facility-approved authority limits and named approver grants: **OPEN / APPROVAL_PENDING**.
- Implementation source references: **NOT YET MAPPED TO AN AUTHORIZED E2C BUILD PACKAGE**.
- Executable test references and exact-build evidence: **NOT YET RUN / NOT CLAIMED**.
- Qualified facility-user acceptance: **PENDING**.

An FPJIS work package must bind each selected requirement to an approved source/decision, exact current-main specification revision, owned implementation files, test identifier and actual execution output. Missing or unresolved items block only the affected E2C implementation slice. Documentation completeness must never be reported as functional acceptance.
