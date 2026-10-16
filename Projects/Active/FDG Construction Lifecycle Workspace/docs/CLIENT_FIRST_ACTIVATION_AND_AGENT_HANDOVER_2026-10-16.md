---
document_id: FDG-CLW-CLIENT-001
title: Client-First Activation and Coding Agent Handover
document_type: Task-specific context capsule and implementation-readiness work package
status: READY FOR EVIDENCE COLLECTION — Real-client acceptance and commercialization NOT approved or proven
created: 2026-10-16
scope: Existing working FDG Construction Lifecycle Workspace offline HTML
owner: FDG Construction Lifecycle Workspace / Founder approval
commercial_authority: FBIS-BP-003
technical_authority: FPJIS plus existing FEIS construction lifecycle sources
build_authorization: No new feature build authorized by this handover
deployment_authorization: None
---

# Client-First Activation & Agent Handover — FDG Construction Lifecycle Workspace

> Work from the existing **working application**, not from a new chat, empty scaffolding, or a new generic architecture. `[[Projects/Active/FDG Construction Lifecycle Workspace/README|Project README]]` → this handover → `[[Projects/Active/FDG Construction Lifecycle Workspace/CURRENT_HANDOVER|Current project handover]]` → acceptance evidence. The reusable framework already exists at `[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|FPJIS Finished-Session Standard]]`.

## 1. Founder intent — preserved literally in implementation terms

Founder direction on 2026-10-16: Advanced model intelligence and long discussions create **no commercial value** unless decisions reach coding agents, become *usable products*, are accepted by clients, and ultimately contribute to verified earnings. Clients must not face complicated workflows; **less input → more output**, convenience, trust and repeatable usefulness should govern design.

**Decision to implement as product criteria, not architecture sprawl:**
- Keep the existing FDG Construction Lifecycle Workspace as product baseline; **do not duplicate it**.
- Simplify what a new client sees, **not** engineering truth, calculations, evidence, consent or approval rules.
- Make each customer input reusable across views/reports; no repeated entry of the same data.
- Do not force customers to choose models, coding tools, prompts, databases, subscriptions or complex system architecture to complete an ordinary task.
- Technical acceptance, independent client usability and **verified customer payment** are three separate outcomes.

## 2. Verified repository state at handover

**GitHub:** `guinoome/fdg-knowledge-repository`, `main`, current branch head to be recorded by receiving agent at task start. Live canonical paths:
- Working product: `Projects/Active/FDG Construction Lifecycle Workspace/distribution/FDG-Construction-Lifecycle.html` (single offline HTML file).
- Primary project status: `Projects/Active/FDG Construction Lifecycle Workspace/CURRENT_HANDOVER.md`.
- Beginner UX contract: `Projects/Active/FDG Construction Lifecycle Workspace/docs/BEGINNER_WORKFLOW.md`.
- Product overview and download instructions: `Projects/Active/FDG Construction Lifecycle Workspace/README.md`.
- Code to **reuse**: `html/guided-engine.mjs`, `html/ui-guided.js`, `html/ui-shell.js`, `html/shell.html`, `html/styles.css`, core engine and other existing `html/` modules.
- Deterministic tests: `tests/guided.test.mjs` and `tests/lifecycle.test.mjs`.
- Existing runtime builder: `build/build-html.mjs`; follow `build/README.md`.
- Prior evidence: `evidence/beginner-validation.json`.
- Packaging/license/commercial authorization is **not** established by current technical tests.

**As documented on 2026-10-16 (not independently rerun during authoring of this file):** simple default navigation Overview / Work plan / Daily update / Reports / More tools; two initial visible fields; three work-entry fields; incremental daily quantity; source reuse for report/remaining work; all 56 advanced registers preserved; 87 previously passing deterministic checks, browser workflow and 390px responsive evidence. No native file-save dialog, diverse browsers, real-user acceptance, independently verified buyer, accepted payment, cloud release or commercial launch established. Do not say “100% implemented” or “ready for production.”

**Known client risk:** save is manual: “Save project” creates a portable working HTML, with no browser autosave/cloud persistence. Closing without a successful save can lose unsaved work. This is disclosed in existing documentation. **Do not silently introduce browser storage/remote sync, or claim it already exists.** Treat clearer save confirmation, explicit unsaved-state behavior and recovery feasibility as customer tests; privacy/storage design changes require separate approval.

## 3. Client job-to-be-done and minimum experience

**Buyer hypothesis:** Philippine site engineer, small contractor, project supervisor or project manager doing day-to-day progress and report preparation. A buyer/payer and switching case remain **unverified** until field testing.

**Client-language value proposition to test (DRAFT):**
> “Enter site progress once. See what remains and prepare your daily, weekly or monthly working report—without maintaining separate spreadsheets.”

Do **not** call it a certified billing, QA acceptance, statutory compliance or paid subscription product. No false time-saving percentage. Full construction OS is out of scope.

### Golden-path scenario for a first-time user

1. Obtain one clearly identified **offline working HTML** and an extremely short start instruction; no account signup or AI chat prompt.
2. Open **Overview** on a mobile browser or desktop. Create project by naming it. Date may be prefilled; location/preparer optional.
3. In **Work plan**, add `Install 100 m of water pipe` by entering item `Water pipe installation`, target `100`, unit `m`.
4. In **Daily update**, use the already linked work item and suggested date; type only `20` (new quantity installed).
5. Without entering totals again, confirm `20 m reported`, `80 m remaining`, and that the information appears on **Reports** for the selected date.
6. Log a further `10 m` on a later date; verify `30 m cumulative`, `70 m remaining` and the correct weekly sum.
7. Save a working copy and verify it **reopens with the data intact**. A beginner must understand what to keep and how to reopen it. Explain clearly that working quantities are reported/unverified, not approved/billable.
8. Make the **working report** printable/downloadable without forcing the beginner to configure 56 advanced registers.

A real customer's exact terminology and pain must be collected rather than imagined.

### One input → multiple outputs acceptance

| Client action | Minimum typing | Expected automatic reuse |
| --- | --- | --- |
| Start project | Project name; optional details excluded from required flow | Project identity, working report period |
| Add planned work | Work name, target, unit | Work identity and unit across Daily update/Reports |
| Daily update | One quantity if item/date already selected | New event, cumulative quantity, remaining quantity, review pending and period reports |
| Choose report period | One choice | Daily/weekly/monthly working report using existing source events |
| Save | One explicit save | Persisted and recoverable portable working HTML; no silent remote upload |

Design constraint: defaults **must never invent reviewed progress, signed acceptance, billed/paid records, units, quantities, readings, source evidence or engineering approvals**. Unknown remains unknown. Preserve all existing test invariants.

## 4. Independent acceptance contract: customer convenience is part of “done”

**Proposed field-test thresholds, not results:** run five consented first-time, relevant users where feasible; target at least four of five completing steps 2–7 **without coaching**, and for successful runs measure time-to-first-report with **proposed target ≤5 minutes** on familiar devices after file is opened. These are planning criteria only, not statistically validated benchmarks. Record actual count/time, selection bias, device/browser, confusion, errors, support questions and honest failure reasons. A user who cannot access/save HTML is a failure for onboarding, not an omitted test.

| ID | Evidence required | Pass definition |
| --- | --- | --- |
| CLW-CLIENT-AC-01 | Working HTML and current source/build baseline opened from GitHub; version, hash and setup recorded | Existing tested product reused; no separate duplicate |
| CLW-CLIENT-AC-02 | Fresh blank start, project name, 100m work, first 20m update | User can complete from default Simple view; no advanced forms required |
| CLW-CLIENT-AC-03 | Second 10m report; period and remaining calculation | 20→30 cumulative; 80→70 remaining; weekly aggregation correct; no double count |
| CLW-CLIENT-AC-04 | Report screen + print/download tested in target browser | Working report accessible with unverified/working labels; no false billing/acceptance |
| CLW-CLIENT-AC-05 | Save HTML, close/reopen and inspect records | Restored exact work and quantities; explicit failure warning if save unsuccessful; no claimed autosave |
| CLW-CLIENT-AC-06 | Error and unknown states | Negative/blank input rejected; untouched item does not invent overall completion; no client confusion about missing data |
| CLW-CLIENT-AC-07 | Mobile usability at 390px and common desktop width | Primary actions visible; no horizontal body overflow; navigation legible, field labels comprehensible |
| CLW-CLIENT-AC-08 | Five real user tasks **when obtainable** | Actual completion/time and friction ledger, including all non-completions; no fabricated user test |
| CLW-CLIENT-AC-09 | Data/privacy/evidence | No real client data in public repo or AI prompts; report clearly states synthetic/demo when applicable |
| CLW-CLIENT-AC-10 | Independent reviewer | Review by second qualified reviewer/agent if available, with conflicts and unexecuted checks labeled honestly |
| CLW-CLIENT-AC-11 | Completed bounded task | Exact changed paths, tests/results, issue/PR, demo, short release notes, known limits and next user action |
| CLW-CLIENT-AC-12 | Commercial truth | Usability success not presented as verified sales, approved licensing, deployed SaaS or customer retention |

**Actual state now:** AC-02/03/06/07/part of 04/05 have prior repository test evidence; do not count them as freshly rerun. Real-user AC-08 remains pending.

## 5. Coding-agent execution order: No unnecessary rebuild

**Step 0: Work ownership/preflight.** Read `AGENTS.md`, this capsule, current handover, readme/guide and the *affected* test/build files. Record current `main` head and git status, any other collaborator edits, build/release authorization. Reuse the existing verified build; do not run repository-wide architecture audit.

**Step 1: Reproduce existing normal workflow locally or in an approved isolated in-memory browser environment.** Use `tests/guided.test.mjs`, `tests/lifecycle.test.mjs`, existing `build/build-html.mjs` and existing browser methodology. Do not invent pass claims; report which commands and environments ran, blocked and not run. Compare distribution byte/hash to generated output if practical.

**Step 2: Real-client usability trial.** If actual authorized test participants are not available, **do not simulate human responses or call synthetic browser tests “client acceptance.”** Prepare a clear 1-page usability script and record `PENDING FIELD VALIDATION`. Do not delay honest deliverables by asking to rebuild entire workspace.

**Step 3: Turn one observed friction into one separate named patch** only with applicable founder/project authorization. Examples for *proposed* investigation: unclear first-opening/download process; save/reopen confusion; phone report access; redundant typing; lack of obvious unsaved-state indication. No new browser storage, cloud sync, authentication, subscription or bulk UI remaster without explicit decision and threat model. Fix the **highest evidenced friction** while keeping existing engine schemas and tests.

**Step 4: Retest and close.** Record clear before/after evidence, all relevant regression tests, real browser/mobile/print where available, exact commit and rollback. Preserve existing completed modules. A small accepted improvement is better than 20 unverified features.

**Step 5: Commercial handoff.** Prepare a truthful **draft** one-page client offer showing what the offline file does, who it serves, supported limitations, data custody and a demonstration. Price experiments remain with FBIS-BP-003: ₱499–999 is the *single practical tool* hypothesis, ₱4,999 the *coherent professional system pack* hypothesis; neither is automatically approved, and the latter cannot be applied to a single generic spreadsheet. Use the FPCV buyer interview/paid-promise operator card before offering it publicly. Do not activate checkout, process payments, publish sales claims or message prospects without separate authorization.

## 6. Ownership, non-scope, security and quality

**Task-owned outputs (subject to authorized work package):** This project’s `docs/` client script and acceptance record; targeted `html/ui-guided.js`, `html/guided-engine.mjs`, `html/ui-shell.js`, `html/styles.css`, `tests/` and `distribution/` only after a scoped, approved defect/patch. Other project directories and canonical FEIS/FBPOIS/FBIS/FPJIS source rules remain read-only unless separately assigned.

**Hard no-go:** no new database, no external AI dependency, no migration without backup/test, no web hosting, no production customer data, no unapproved billing or ad campaign, no silent rewriting of the QTO/Scheduling/Procurement modules, no automatic “approved” or “paid” status, no deleting existing test cases to make a check pass.

**Risk:** preserving data and client confidence is more important than minimizing clicks blindly. If reducing an input removes an essential verification or audit basis, move that input to the competent review phase, **not** fabricate a value.

## 7. Acceptance records (private client info must remain outside public GitHub)

Use a consented/anonymous **test record** for each participant:
```yaml
test_id: ""
session_date: ""
participant_role_and_relevance: ""
device_browser: ""
consent_private_ref: ""
scenario_version: "CLW-CLIENT-001"
started_at: ""
first_work_entered_at: ""
first_report_opened_at: ""
save_reopen_completed_at: ""
completed_without_coaching: null
time_to_first_report_seconds: null
unnecessary_inputs_identified: []
confusing_labels: []
save_or_download_issues: []
other_errors: []
participant_quotes_private_refs: []
observed_issue_refs: []
reviewer: ""
approved_release_decision: "PENDING"
```

**Do not place names, email, phone, actual projects, photos, user recordings or site/client financials into this public repository.** Public record should contain anonymized aggregate evidence only.

## 8. Commercial acceptance, continuation and status

A **sellable-file candidate** is reached after verified targeted browser/reopen, honest client instructions, known limits, resolved blocking UX/data-loss defects, actual buyer demand testing and approved commercial/legal packaging. An **accepted commercial product** further requires appropriate human commercial release authorization. A **proven revenue-generating product** requires actual independently verified customer payment and delivery/acceptance. An **ongoing/retained product** requires observed repeat use/renewal, not a subscription button.

Follow [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS-BP-003]] and [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/22_Demand_Validation_Operator_Card|Demand Validation Operator Card]]; this file introduces no new central funnel or parallel pricing authority.

**Handover end state:** `PENDING REAL-USER ACCEPTANCE` until the customer trial actually occurs. Code remains at previously validated status. When a genuine defect is found, log **one approved patch** with source, exact files, tests, acceptance, commit and next action. Do not report “shipped,” “launched,” “customer loved it,” or “sold” without respective evidence.

## 9. Agent context capsule — copy only this if a short handoff is required

```text
JOB: Make the existing FDG Construction Lifecycle Workspace genuinely easy to adopt and commercially testable; do NOT rebuild it.
REPO: guinoome/fdg-knowledge-repository (main).
WORK PRODUCT: Projects/Active/FDG Construction Lifecycle Workspace/distribution/FDG-Construction-Lifecycle.html
READ: AGENTS.md → Projects/Active/FDG Construction Lifecycle Workspace/CURRENT_HANDOVER.md → docs/BEGINNER_WORKFLOW.md → this document → directly affected code/tests.
CURRENT: Simple view, 3-step capture, daily/weekly/monthly working reports, 87 previously recorded deterministic passes. Field acceptance, save dialogs in real OS, and commercial sales unverified.
USER RESULT: Name project → 100m work item → enter 20m → see 80m remaining and working report → enter 10m → see 30m cumulative/70m remaining → save/reopen successfully.
CLIENT PRINCIPLE: Fewer inputs, multiple dependable outputs, plain words, phone-friendly, convenient. No false approval/paid claim; unknown stays unknown.
WORK: Reproduce existing tests, identify demonstrable UX friction; when authorized, implement exactly one proven fix and its regression coverage. Prepare client-simple guide and truthful offer draft.
DO NOT: Replace engines, schema or working code, build full Construction OS, deploy online, add paid integration, upload private data or invent client interviews.
QUALITY: AC-01..12 in this file, all previous tests, mobile/print/save/reopen, explicit errors, actual evidence and independent review when possible.
HANDOVER: exact commit/branch, changed files, tests run/not run, screenshots/measurements, field trial status, defects, limitations, pricing authority and next permitted action.
```

**Source audit decision:** REUSE existing working project and standards. No competing “discussion-to-app” platform or general-purpose prompt library introduced. Knowledge transfer is accomplished by a traceable owner-specific work package that coding agents can read and test.
