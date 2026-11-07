---
document_id: FWAIS-IND-KANNA-2026-11-08
title: KANNA Competitive Workflow and Field UX Study for FDG Engineering Operations
status: RESEARCH_COMPLETE / PROPOSED_PATTERNS_NEED_OWNER_REVIEW
owner: FWAIS
target_systems: FBPOIS, FMIS, FWIS, FPIS
research_date: 2026-11-08
source_baseline: "fdg-knowledge-repository main @ 2145d43e4d382c54bc64cfa0c473d9903a855bea"
---

# KANNA Competitive Workflow and Field UX Study for FDG Engineering Operations

## 1. Executive conclusion

**Disposition: REUSE interaction patterns; EXTEND existing FDG workflow, evidence and report contracts; do not create a second operational platform or copy KANNA's data model.**

KANNA is a useful benchmark for making field reporting, media capture, templates, approval routing and project communication easier. Its strongest product idea is that field information is captured progressively during the work, then assembled into a formal report without a second round of manual document preparation.

FDG's opportunity is to add stronger engineering semantics and enforcement: work readiness, asset context, measured findings, acceptance criteria, verification, operational restrictions, authority-aware closure and an evidence-linked management report.

This is a public-documentation study, not a completed product trial. No KANNA account was created, no customer data was uploaded, no MCP session was connected, and no vendor representation was independently tested. Product features below are attributed to KANNA's published documentation. Proposed FDG patterns are recommendations, not approved policy or build authorization.

## 2. KANNA capabilities worth benchmarking

### 2.1 Reusable report templates

KANNA allows report templates to be configured by authorized company administrators. Its documented input patterns include text, number, date/time, radio buttons, checkboxes and dropdowns. Template setup is performed on the web/desktop side; the field user consumes the resulting form. Availability depends on plan.

**FDG reuse:** provide centrally governed task/inspection templates with mobile-first field entry. Administrators configure the template once; technicians should not design forms or select from a large generic field catalogue for each job.

**FDG extension:** make fields conditional on task type, asset criticality, risk and the applicable test procedure. Define requiredness in the workflow's validation contract, not only as a visual asterisk. Preserve the exact template and rule versions used by each submitted record.

### 2.2 Evidence-first photo workflow and photo reports

KANNA organizes project photos and documents in shared project folders. Its Photo Report capability builds reports from photos already stored in the project, with image comments and reusable layouts. Its feature pages describe downloadable PDF and Excel outputs.

**FDG reuse:** pre-create evidence categories/folders from the work-order type and automatically associate captured media with the work order. Generate the photo appendix from existing evidence records rather than asking technicians or administrators to assemble files manually later.

**FDG extension:** use structured evidence slots such as Before, Condition Found, Work in Progress, Corrective Action, After, Test/Verification and Supporting Document. Not every task requires every slot; the work type and risk policy determine the required evidence. An image must have a caption or structured purpose when context is not self-evident.

### 2.3 Photo provenance and verification

KANNA's Photo Verification feature says in-app captures can be stamped with date, time, GPS location and address; it distinguishes eligible in-app camera captures from imported camera-roll images. Its documentation says the server provides the timestamp, and that the feature requires an online connection and location permission. Imported photos and some capture modes do not receive the verification mark.

**FDG reuse:** distinguish an in-app site capture from an imported attachment; record capture method, capture time, upload/sync time and optional location provenance.

**FDG extension:** do not label a file simply "verified" because it has metadata or a hash. Separate (a) file integrity, (b) capture provenance, (c) location confidence, (d) content/technical relevance and (e) reviewer acceptance. Server attestation is unavailable offline; an offline image should remain usable but carry an explicit unverified-provenance state until reconciliation. GPS can be optional or restricted for privacy and site-security reasons. Never claim that a photograph proves the physical condition by itself.

### 2.4 Multistage approval and send-back

KANNA Approval Flow supports sequential approval steps, selected approvers, an "All Approvers" or "One-person Approver" condition, due dates, comments, send-back to the applicant or an earlier stage, notifications and resubmission. It restricts editing/deleting the report/document while approval is underway. Its help page states that the approval certificate applies to finally approved PDF documents, not Custom Reports. Availability depends on plan.

**FDG reuse:** one visible approval queue, explicit current owner, due date, decision buttons, return reason, and resubmission to the correct stage. Freeze the submitted snapshot while under review; corrections create a new revision and preserve the returned version.

**FDG extension:** approval is not a generic project permission. Resolve the approver from the configured authority policy using record type, property, asset criticality, safety/operational impact, exception status and delegation validity. The server must enforce this policy. Users cannot approve their own work unless a specifically approved policy allows it. Display who has authority and why the workflow routed to them.

### 2.5 Mobile and offline field capture

KANNA's offline help page says project data must be downloaded in advance, with a documented 10 GB download ceiling. In offline mode its listed actions include viewing the project overview, capturing/uploading photos locally and editing forms that have already been created/launched; the page says users cannot create new forms while offline.

**FDG reuse:** visibly show what is cached, last successful sync, pending uploads and unresolved conflicts. Keep field capture usable without a connection.

**FDG extension:** target offline creation of a new local draft/work item where the approved product architecture permits, using a temporary client-generated identifier and idempotent synchronization. Never silently overwrite a concurrent supervisor change. Preserve original evidence bytes and show upload/reconciliation status. An offline approval must not bypass a server-side authority or freshness check; queue it as a pending decision or require online revalidation, according to the approved policy.

### 2.6 AI voice reporting and OCR

KANNA's AI Voice Report page describes speech being transcribed into report fields. Its public page directs users to support for current language and device compatibility; the reviewed material does not establish Tagalog, Cebuano or mixed-language support.

KANNA's AI OCR page describes cloud-based extraction from handwritten or printed forms. Extracted values are shown for user review before saving; the feature is described as beta and requires an internet connection.

**FDG reuse:** use voice and OCR as optional ways to reduce typing, never as a separate source of truth.

**FDG extension:** show the original audio/image, extracted draft value, confidence/uncertainty and human confirmation. Protect engineering units, decimal separators, equipment identifiers and safety-critical values from silent auto-correction. AI may propose structured text; it must not diagnose, mark a test passed, submit approval or close work autonomously. Cloud processing requires a separate privacy, data-residency and client-consent review.

### 2.7 Company dashboard and data freshness

KANNA's Company Dashboard aggregates project progress and financial information. Its help documentation states that aggregation is nightly and a manual recalculate action is available; the page displays an update date/time and explains a UTC reference-date caveat.

**FDG reuse:** consolidate operational information for management.

**FDG extension:** every FDG dashboard and report must disclose the data "as of" time, latest successful synchronization, selected reporting period, included properties and known data gaps. A nightly snapshot must never be presented as live plant status. Missing data is "Unknown / Not Reported", not zero or green.

### 2.8 MCP / AI agent interaction

KANNA's public MCP page says its integration allows AI clients such as Claude to access KANNA project data and advertises report generation, settings review, Gantt/project creation and calculations on customized project items. Its FAQ names an active KANNA account and a paid Claude subscription as prerequisites and describes account-scoped authenticated connections and existing account security controls.

**FDG reuse:** provide a structured agent interface to operational records so Nex can retrieve, summarize and generate report drafts from governed data.

**FDG extension:** build against FDG-owned, provider-neutral read/query and report-draft contracts. Start read-only. Any write action must be separately enumerated, least-privilege, tenant/property-scoped, server-authorized, idempotent and audit logged. Approval, closure, restriction release, financial commitment and safety decisions remain human-authorized. MCP is an optional transport; it is not the domain model, policy engine or source of engineering authority.

## 3. KANNA limitations that should shape FDG design

1. **Required fields are advisory in KANNA Report.** Its help article says a user receives a warning, but can still save the report and submit an approval request with required fields incomplete. FDG must enforce critical acceptance conditions server-side.
2. **Feature availability depends on subscription.** KANNA's approval flow, custom reporting and company dashboard have plan-dependent availability; export is documented as a paid option. Confirm full lifecycle cost and contract scope before any adoption.
3. **Offline mode has prerequisites and restrictions.** Advance download and pre-created forms are required under the documented workflow. Do not equate offline access with a fully offline-first architecture.
4. **Photo provenance has an online dependency.** KANNA's server timestamp/photo verification does not operate offline; its own documentation describes imported photos as unmarked.
5. **AI language coverage is unclear from the reviewed public page.** Do not assume local-language voice capture works for the target workforce.
6. **MCP public documentation is not a complete integration contract.** The reviewed pages do not expose a sufficient tool schema, granular scopes, event/webhook contract, retention details, data-residency commitments or independently verified audit semantics. Obtain these from the vendor and test before relying on them.
7. **A generated report is not automatically an engineering acceptance record.** Workflow correctness, evidence quality, authority and technical verification must be separately modelled and enforced.

## 4. FDG current-state fit — reuse before creating

The canonical repository already contains the major architectural components:

- **FBPOIS** owns building/plant operations.
- **FMIS** owns maintenance and plant-status information, including work orders, maintenance history, inspections, testing and reliability.
- **FWIS** owns operational workspace and communication, including operational restrictions and OOO/OOS context.
- **FBPOIS Workflow Engine** is specified as a shared service for state transitions, authorization, notification, escalation, SLA, audit and analytics.
- **Shared Data Platform** owns reusable organization, property, location and asset-reference structures.
- **FPIS** owns platform experience and spatial interface patterns.
- **FWAIS** owns workflow pattern research and cross-industry pattern promotion.

The existing FBPOIS-L1A first working baseline is already defined as **Concern-to-Clearance**:

Location/Asset → Concern → Severity/Priority → Assignment → Work → Restriction/OOO/OOS if applicable → Finding → Corrective Action → Evidence → Verification → Clearance/Closeout → Management Attention + Report

It explicitly says that work marked "Work Complete" does not automatically clear an operational restriction. It also requires verification criteria, result, verifier, timestamp and evidence. This baseline is the correct first scope to extend with KANNA-style field UX; do not create a parallel reporting application.

### Current implementation reality and blockers

- The FMIS prototype on main is a local Python/Tkinter application with SQLite services. It is not a production multi-user/mobile maintenance platform.
- The current main FMIS service exposes work-order status changes without an actor argument in update_work_order_status(work_order_id, status) and PM completion without an actor in complete_pm(pm_id). The current main core test contains a happy-path test that closes a work order and completes a PM without an approval context.
- Draft PR #18 adds fail-closed behavior to terminal work-order/PM transitions and reports 13/13 core plus 6/6 Tk UI regression tests passing on its exact review branch. It is **not merged** and it does not provide an approved actor-bound closure workflow.
- Draft PR #16 proposes a revised routine-work approval matrix but remains unapproved. The main FBPOIS-ROLE-0004 matrix is also a draft. The routine-versus-exception authority policy, thresholds, property scope and final approver are therefore **not resolved on main**.
- FWIS already has a PWA, offline/local persistence and a sync-oriented design; its own README states that some database-side role enforcement and external intake remain incomplete.
- The Concern-to-Clearance baseline is a definition; the patch register says implementation/release evidence is still required.

**Consequently:** do not begin another reporting interface or enable terminal FMIS closure by role guesswork. Issue #11 remains open and higher priority for the source-to-build and FMIS authority reconciliation. These findings are bounded to the inspected main files and open PR state at the cited repository baseline; they are not a fresh full repository audit.

## 5. Proposed FDG field experience

### 5.1 Technician: one assigned job, one guided completion

The technician should see a **My Work** queue, not the full administrative system. Each card shows the work-order number, location, equipment, priority, current restriction, target time and next required action. Known data is prefilled from FMIS and the shared property/asset model.

Recommended guided sequence:

1. **Confirm job:** show the assigned task, location, asset, hazard/operating notes and work scope. Confirm start or record a blocker.
2. **Record condition:** select structured symptom/finding, add short notes, readings with units, and optional voice input. Keep observed fact separate from suspected cause.
3. **Capture evidence:** camera-first capture with predefined Before / Finding / Work / After / Test slots. Attachments inherit the work-order and asset references; the technician does not navigate a generic folder tree.
4. **Record action:** corrective action performed, parts/materials used, time/crew and any contractor or access constraint.
5. **Test and self-check:** record the test method, acceptance criterion/reference, measured result, pass/fail/not applicable and supporting evidence. A "not applicable" selection requires a reason when the template says so.
6. **Submit:** show a plain-language completion checklist and exactly what is missing. Save a draft at any time; submission becomes available only when the applicable policy gate is satisfied.

Use progressive disclosure: show the minimum input needed at each step, reveal specialist fields only when relevant, and let a technician resume a saved draft. Do not require a technician to understand the underlying workflow engine or configure a report.

### 5.2 Supervisor: completeness and execution review

The review screen should show the report as a single work package, not a raw database form. The supervisor can:

- check assigned scope, workmanship and completeness;
- compare before/during/after evidence;
- inspect required checklist fields and missing items;
- return the submission with a comment attached to the exact field, photo or test;
- accept the supervisor review and route it forward, or escalate a concern.

A return must preserve the original submission. The technician receives a short correction list, not an unstructured message. Re-submission creates a new revision and retains the prior decision history.

### 5.3 Duty Engineer: technical and operational validation

The Duty Engineer should receive a technical review view containing:

- equipment and plant context;
- operational impact and current restriction/OOO/OOS state;
- reported finding versus confirmed finding;
- readings, test method and acceptance criterion;
- corrective action and remaining residual risk;
- evidence provenance and missing/uncertain items;
- unresolved dependencies and return-to-service recommendation.

The Duty Engineer validates technical completeness and the proposed operational disposition within their actual delegated authority. A maintenance work-order status change must not silently release an independent FWIS restriction/OOO/OOS record.

### 5.4 Engineering Manager / Chief Engineer: exception-aware approval

Do not require every work order to pass through every senior role. That creates approval theatre and slows low-risk work. Route by an approved, versioned authority matrix.

A future policy may distinguish routine low-risk, independently evidenced work from critical, regulated, high-impact, repeat-failure, cost-threshold or operational-exception work. However, numerical thresholds and the actual role allowed to close each class must come from an authorized facility/organization decision; none are invented here.

Where escalation is required, the screen should make the decision easy: concise engineering summary, supporting evidence, exceptions, residual risk, operational impact, cost/resource impact where available, recommendation, and named decision owner. Final approval must be attributable to a specific authenticated user acting under a valid role, property scope, policy version and (where used) unexpired delegation.

### 5.5 States are separate dimensions

Do not collapse everything into one status field.

- **Work lifecycle:** Draft, Assigned, Acknowledged, In Progress, Work Complete, Verification Pending, Verified, Closed, Cancelled, Reopened.
- **Workflow review:** Not Submitted, Supervisor Review, Returned, Duty Engineer Review, Management Approval, Approved, Rejected, Escalated.
- **Readiness/constraint:** Ready, Waiting Access, Waiting Material, Waiting Contractor, Waiting Permit/Safety, Waiting Engineering, Waiting Approval.
- **Operational restriction:** Normal, Restricted, OOO/OOS, Clearance Pending, Released (owned by the appropriate FWIS operational record).

Priority expresses importance; readiness expresses executability; work status expresses progress; approval state expresses governance; operational restriction expresses permitted use. Keep these distinct in storage and in the UI.

## 6. Evidence and accountability contract

The user interface can be pleasant; the record model must be rigorous.

Each consequential event should preserve, at minimum:

- record/work-order ID and revision;
- authenticated actor ID and role/scope at the time of action;
- action, previous state and new state;
- server timestamp plus device/offline capture timestamp where applicable;
- reason/comment and linked evidence references;
- authority-policy version and approval/delegation basis;
- idempotency/correlation key for sync and retry;
- result of server-side validation.

Evidence objects should preserve the original file and a stable reference, with a content hash, MIME type, size, creator, capture method, capture/upload times, optional location provenance, caption/category and associated record/revision. A hash establishes byte-level integrity after hashing; it does not prove the scene was genuine, the device was trustworthy, or the technical conclusion is correct. Preserve replaced/superseded evidence rather than silently overwriting it.

The report submitted for approval is a frozen snapshot of specific record revisions and evidence references. Any correction after return creates a new revision. The final approved report is immutable; regeneration with new source data produces a new report revision and approval cycle.

## 7. The output: make every field record management-ready

### 7.1 Work-order closeout package

Generate this from the captured FMIS/FWIS records:

1. **Cover and status:** work-order ID, site/property, building/area, asset, priority, reporting period, assigned personnel, record revision, status and data-as-of time.
2. **Work request:** original concern, reported symptom, impact and scope.
3. **Condition found:** observed facts, readings and units, inspection checklist, and any diagnostic hypothesis clearly labelled as such.
4. **Corrective action:** work performed, parts/materials, labor/time, contractor or access issues.
5. **Verification:** test method, governing criterion/reference, measured result, pass/fail, verifier and date/time.
6. **Evidence appendix:** numbered before/during/after/test photographs, captions, capture provenance state and linked supporting documents.
7. **Residual issues:** deferred work, remaining restrictions, exceptions, further actions, owner and target date.
8. **Approval history:** each reviewer, role/scope, decision, timestamp, comments, policy version and report revision.

The PDF should be clean enough for management or a client to understand without opening the application, while each figure/photo and decision remains traceable to the record behind it.

### 7.2 Monthly engineering management report

Build the monthly report from the same underlying records; never ask technicians to re-enter monthly summaries.

**Page 1 — Executive position**
- reporting property/site and exact period;
- open work, critical/high-risk items, restricted/OOO/OOS assets, overdue approvals and verification backlog;
- completed/closed work and significant operational interruptions;
- top management decisions required.

**Page 2 — Work-order portfolio**
- new, completed, closed, carried-over and cancelled orders;
- backlog aging by priority and readiness reason;
- work awaiting supervisor, technical verification or management decision;
- stage duration and SLA performance.

**Page 3 — Maintenance effectiveness**
- PM due/completed/overdue only where PM schedules and executions exist;
- repeat defects and reopened work;
- downtime, MTTR, MTBF and availability only after valid event/runtime denominators exist;
- critical asset or system risks with drill-down to source work orders.

**Page 4 — Resources and cost**
- labor hours, material use, contractor work and maintenance cost only where recorded and reconciled;
- planned versus actual where a valid plan/baseline exists;
- top constraints and resourcing decisions.

**Page 5 — Evidence and action register**
- unresolved concerns and operational restrictions;
- failed/pending tests and outstanding clearances;
- repeat-failure candidates;
- actions, accountable owners, due dates and management decisions.

Every KPI must display its definition, period, numerator/denominator, source coverage and "as of" timestamp. If source coverage is incomplete, label the metric partial or unavailable. Do not show an attractive chart with invented data or turn missing records into zero.

### 7.3 Nex's role in reporting

Nex should retrieve authorized records and produce a draft analysis with explicit links to work orders, evidence, logbook, inspection and approval events. A management insight should include:

- finding/claim;
- evidence records that support it;
- calculation or comparison method;
- limitations and missing data;
- suggested action and accountable owner.

Nex must distinguish source facts, calculated results, hypotheses and recommendations. Initially, its operational access should be read-only. It may prepare drafts; it must not sign, approve, close work, release restrictions or change engineering settings without a separately authorized human action and a server-enforced contract.

## 8. Recommended pilot test

No real facility work order was supplied in this study's accessible sources. Do not label a fabricated example as an actual maintenance record. Use one real, anonymized and approved work order for later UAT; until then, use a synthetic fixture clearly labelled TEST DATA.

Acceptance sequence:

1. Technician opens an assigned order, saves offline, records findings/readings and captures Before/Work/After/Test evidence.
2. Supervisor returns it with a field-specific deficiency. Technician sees the exact correction, revises and resubmits. The original submission remains inspectable.
3. Duty Engineer challenges a missing or out-of-range test result. The workflow prevents verification/closure while the required test is absent or failed.
4. Attempt a self-approval and an unauthorized role/property approval. Both are rejected by the server, not merely hidden in the UI.
5. Attempt management approval for a policy-controlled exception. The system resolves only an approved policy version; unresolved authority fails closed.
6. Mark maintenance work complete while the operational restriction remains active. The system must not release the restriction automatically.
7. Reconnect after offline capture. All evidence syncs once, references remain intact, conflicts are visible, and no duplicate work order is created.
8. Generate the monthly report from the resulting records. Independently recalculate its counts and percentages; every reported figure drills down to source records; freshness and gaps are visible.
9. Reopen/export the final approved snapshot. Confirm report revision, linked evidence, approval identities, timestamps and audit events remain stable.

Measure technician completion time and number of manual inputs; supervisor return reasons and review time; technical rejection/rework; stage aging; evidence completeness; sync loss/duplicates; report preparation time; and discrepancy between report metrics and source records. Do not claim productivity improvement until measured against a baseline.

## 9. Integration and adoption strategy

- Keep FMIS as the maintenance system of record and FWIS as the operational/restriction system of record.
- Reuse the existing shared Workflow Engine specification; it owns workflow state and decisions, not the underlying work-order facts.
- Reuse Shared Data Platform identifiers for organization, property, location and asset references.
- Generate reports as immutable snapshots from authoritative records; do not create duplicate report-only operational data.
- Keep Nex integration behind an FDG-owned, provider-neutral tool/API contract. KANNA MCP is a benchmark, not a dependency.
- Use local-first capture and synchronization that tolerates interruption. External AI OCR/voice processing must be optional and consent-controlled.
- Keep desktop administration separate from the simple technician experience: template, authority and report-builder controls belong to authorized administrators; field users see assigned work and relevant actions only.

## 10. Next decision and stop conditions

**Do not start another reporting interface yet.** First resolve the existing source-to-build and authority gap under Issue #11:

1. Reconcile the main FBPOIS-ROLE-0004 work-order approval matrix with the routine-versus-exception proposal in draft PR #16.
2. Confirm, with an authorized engineering owner, who may verify, approve and close each work-order class, including property scope, risk/criticality, separation of duties, thresholds and delegation.
3. Review the fail-closed implementation in draft PR #18 and specify a legitimate actor/evidence-bound completion route before merging or enabling terminal transitions.
4. Reconcile the first Concern-to-Clearance baseline with the actual FMIS and FWIS implementation paths and exact acceptance tests.
5. Only then issue one bounded implementation package: technician capture and evidence → supervisor return/review → duty engineer technical verification → authority-resolved management decision → evidence-backed closeout and monthly report.

This study does not approve an authority policy, resolve Issue #11, merge any PR, start a KANNA trial, change production systems or authorize a new interface. The next permitted work is source/authority reconciliation, followed by a small accepted workflow slice—not a wholesale rebuild.

## 11. Sources

Official KANNA pages and help articles, reviewed 2026-11-08:

- [KANNA product features](https://lp.kanna4u.com/en)
- [Customizing the Reporting Feature](https://kanna4u.zendesk.com/hc/en-us/articles/5535170860695-Customizing-the-Reporting-Feature)
- [Required Field Settings](https://kanna4u.zendesk.com/hc/en-us/articles/37697380416023-Required-Field-Settings-KANNA-Report)
- [Approval Flow Feature](https://kanna4u.zendesk.com/hc/en-us/articles/30815800071831-Approval-Flow-Feature)
- [Photo Report](https://lp.kanna4u.com/en/features/photo-report)
- [Photo Verification](https://lp.kanna4u.com/en/features/photo-verification)
- [Offline functionality for KANNA Report](https://kanna4u.zendesk.com/hc/en-us/articles/22832325006615-Offline-functionality-for-the-KANNA-app-KANNA-Report)
- [AI Voice Report](https://lp.kanna4u.com/en/features/ai-voice-report)
- [AI OCR](https://lp.kanna4u.com/en/features/ai-ocr)
- [Company Dashboard](https://kanna4u.zendesk.com/hc/en-us/articles/37820189822999-Company-Dashboard)
- [AI MCP](https://lp.kanna4u.com/en/features/ai-mcp)
- [Export Function](https://kanna4u.zendesk.com/hc/en-us/articles/14460169828375-Export-Function)

Existing FDG source-of-truth references consulted:

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS Master Index]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FMIS Master Index]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|FMIS Work Orders]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/11_FMIS_User_Roles_and_Access|FMIS Roles and Access]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/16_FMIS_Evidence_and_Decision_Register|FMIS Evidence and Decision Register]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0010 - Workflow Management|FWIS Workflow Management]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0014 - Reports|FWIS Reports]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04A_Workflow_Engine/FBPOIS-WF-0000 - Workflow Engine Architecture|FBPOIS Workflow Engine]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/FBPOIS-ROLE-0004 - Workflow Authorization Matrix|Workflow Authorization Matrix]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|Concern-to-Clearance First Baseline]]
- [Issue #11 — source-to-build drift and authority reconciliation](https://github.com/guinoome/fdg-knowledge-repository/issues/11)
- [Draft PR #16 — proposed FMIS approval matrix revision](https://github.com/guinoome/fdg-knowledge-repository/pull/16)
- [Draft PR #18 — fail-closed actorless terminal transitions](https://github.com/guinoome/fdg-knowledge-repository/pull/18)
