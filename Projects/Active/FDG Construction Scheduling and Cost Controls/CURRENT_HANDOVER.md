# Scheduling / cost controls — current handover

## Mandatory defect-diagnosis and repair control — FAIS-SSA-1001 v1.1

**Required for every collaborator receiving this handover:** [[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1001 - Evidence-First Software Defect Diagnosis and Minimal Repair Protocol|FAIS-SSA-1001 v1.1 — Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol]] is the approved, mandatory FDG standard whenever the assigned work investigates or corrects a bug, regression, unexpected behavior, failed test/acceptance, calculation/data discrepancy, or runtime/integration defect. Read the canonical protocol before diagnosing or modifying code. This applies regardless of model, provider, IDE, coding agent or environment.

- Start with evidence and a pinned source/build baseline. Capture observed versus expected behavior, exact reproduction/input, relevant environment, logs and impact. Mark unavailable facts UNKNOWN.
- Keep defect diagnosis read-only. Do not patch, refactor, rename, reformat, upgrade dependencies, migrate data or experiment destructively in production before the causal diagnosis is supported and the authorized project/domain owner approves a bounded repair scope.
- Separate symptom, proximate cause, contributing condition and demonstrated root cause. Rank and test hypotheses; compare last-known-good/first-known-bad revisions when relevant; trace exact data to the first divergence.
- Classify P0–P3 and apply the protocol's risk-triggered safety, security, data-integrity, independent-review, numerical/engineering, release and rollback controls where triggered. Do not impose high-risk ceremony on low-risk cosmetic defects, and do not waive mandatory baseline controls.
- After approval, make the smallest scoped correction. Demonstrate RED on the defective baseline and GREEN on the corrected revision where feasible, then run relevant regression/impact checks. Search for the same defect pattern elsewhere without performing unauthorized bulk edits.
- Report actual commands and test results only. Distinguish executed, passed, failed, skipped, blocked and not run. Include exact commits, changed files/lines, evidence, remaining unknowns and protocol version in the handover.
- The diagnostician/implementer/verifier roles and production-release controls are separated according to consequence and risk. The implementer is not sole acceptance authority for high-consequence work.

**Trigger boundary:** This standard governs defect diagnosis and repair; it does not replace the approved feature work package or authorize new feature scope. If a defect is discovered during feature work, pause the affected change and enter this protocol for that defect. Resume only under the authorized scope. FPJIS governs project execution and acceptance; FMCIS governs collaborator allocation and coordination; FAIS governs audit evidence, defect assurance and verification. Project-specific controls may be stricter, never weaker.

**Receiving-collaborator acknowledgement:** Record FAIS-SSA-1001 v1.1 in the task-start/preflight record and identify any access, evidence or authority blocker before work. Do not claim compliance based only on reading this short summary; the canonical protocol governs.


Updated2026-10-16. **Working HTML delivered and scoped tests passed; real-project acceptance pending.** Supersedes implementation checkpoint. Repository guinoome/fdg-knowledge-repository main, owned folder Projects/Active/FDG Construction Scheduling and Cost Controls. No local project files, installs, browser downloads, deployment, sales or payments. Francis explicitly selected this project after the Construction Management/QTO HTML tools.

## Completed / reuse
Primary artifact: distribution/FDG-Scheduling-Cost-Controls.html (49997bytes; SHA25611760db3d09241fd1d6a0c9010d1310647bbbf8d8c5901c03d18cad4f49629a4). Uses five structured tables: activities, progress reviews, actual costs, remaining commitments, constraints. Baseline snapshots/history, setup, Gantt, lookahead, cost report, JSON/HTML/CSV, archive/restore and undo. Source in html/; schema/sample/tests and deterministic build/build-html.mjs. Reuse committed source. Do not redo repository discovery or rebuild from a chat.

## Verified
33 engine checks PASS. Installed Chrome headless1440×1000 and390×844. Blank setup/first activity work; missing actual cost remains unavailable. Synthetic sample150000budget,40000actual,125000ETC,50000open commitments included,165000EAC,−15000headroom;53.333% reviewed,66.667% uniform plan. Gantt/constraint lookahead and dependency flags render. BaselineBL1 budget100000 survives BL2 budget110000; baseline budget readonly until deliberate revision. Freeze/revision clears undo so snapshots survive normal record undos. Forecast update changed EAC and exposed successor overlap. Cost5000 increased EAC to170000; open commitment increase did not add twice. ETC below commitments makes EAC unavailable. HTML and JSON reopen retained170000 and both snapshots. Mobile no page overflow. Print action/navigation hiding and final35650byte PDF in RAM; review flags included. No page/console errors observed. Git blob matched exact in-memory artifact. See evidence/validation.json.

## Source / decisions
Full GitHub source baseline7d4de5c57c3031b2aaac21571848c61371e78f92: FEIS-CM-0002,0100,0901 and0900. Follow capture-once, unknowns, distinct reported/reviewed/billable states, preserved history, isolated scope and honest maturity. This implements a bounded manual toolkit, not all Workbench/Construction OS platform gates.

Calendar days; FS successor starts after predecessor finish; warnings/cycles only, no auto-reschedule/CPM/float/holiday calendar/resource leveling. Uniform inclusive baseline-day plan is explicitly an assumption. Progress uses budget weights and reviewed snapshots, not independent accepted quantities or earned value. Same-date competing reviews cause conflict; supersede the obsolete one.

Actual ledger requires explicit source/date; missing records are unknown and an explicit zero is supported. Cost/Credit entries are not payments. Latest commitment snapshot per contract/activity at/before cutoff is used; same-date conflicts invalidate forecast. ETC must include commitments, never add them again. Missing ETC/source or ETC below open commitments blocks EAC. Orphan actual/commitment records block project financial totals. Positive budget headroom is under budget; negative is overrun. Real criteria, rates, contract/tax rules and approval evidence remain external user responsibility.

## Exact next action
Have a qualified planner/QS run one real private schedule/cost scenario, check baseline revision authority and reconcile actual/remaining forecasts to source records; record acceptance/findings. Then patch only demonstrated defects. Independent opposite-provider review and other browsers unverified. Do not relabel DEPLOYED or COMMERCIALLY_VALIDATED. No additional construction project selected yet.

## Rebuild / rollback
build/build-html.mjs takes explicit {initial,sample,schema,core,app,css,shell}; no dependencies, file writes or network. html/tests.mjs exports test runner for engine/schema/sample. Builder output matches final HTML. Maintain GitHub-only project storage. Browser tests used installed Chrome through existing bundled Playwright; documents, JSON, screenshots and PDFs stayed in RAM. OS file-save dialogs were not exercised. Use expected-main lease, inspect scope and preserve unrelated work. Rollback only owned blobs with a normal follow-up commit, never reset/force the shared repository.

## Organizational learning
Cost-to-complete includes remaining commitments: explicitly test non-double-counting, snapshot precedence and unmapped-cost rejection. Baseline freezes/revisions should be protected from generic undo. Preserve these executable checks and source receipts for successor tools. The file remains editable/manual, not authenticated/tamper-proof.


## Premium theme — 2026-10-16

Founder-supplied navy/red/gold reference applied to CSS and working HTML. Existing JavaScript, schemas and records preserved. Chrome sample calculations unchanged;390px no document overflow. Theme uses no external assets/fonts and excludes quote client details. Lifecycle integration is a separate ongoing work package; do not confuse file toolkit coverage with the full platform’s permission/sync/deployment gates.


## C24 continuation — 2026-10-24, pre-repair evidence

Canonical read-only baseline: `99db9f36cd4fee28553360db94a3161e2ccd228d`. This dated continuation governs the immediate next action; historical source, artifact hashes and acceptance evidence above are preserved, not freshly rerun unless stated below. Product source/build/distribution unchanged. No repairs, browser run or native OS save/open test occurred in C24.

Fresh execution by `/root/controls_verify_oct24`: **33/33 existing checks pass;24 focused assertions:14 pass /10 fail**. Unresolved candidates: ledger/budget/EAC/commitment accumulation overflows to Infinity; missing activity IDs still permit totals; active/archived duplicate activity IDs survive import; whitespace/numeric source or whitespace reviewer passes required evidence gates; imported horizon1e308 throws Invalid time value. Existing latest-snapshot/cutoff/zero-release, commitments-once, conflicts, orphan/archive protection, invalid-date and unknown/zero checks passed.

Lifecycle `html/cost-engine.mjs` mirrors this tested engine (blob `18013615a7bbc417183787acbb4ba3940d91ad51`). Any authorized fix must cover both owners and generated distributions without changing scheduling/forecast semantics.

[Exact repair card](evidence/c24/REPAIR_CARD.md) · [Named results](evidence/c24/validation.json) · [Executable harness](evidence/c24/reproduce.mjs). Builder inspected, not executed in this worker's C24 run. Historical browser/native-save boundaries above remain; planner/QS and independent acceptance pending.


**Gate:** CODEX-P0 BLOCKED; UX_P0_BLOCKED_WITH_EVIDENCE for new UI work. The installed UI UX Pro Max2.15.0 marketplace script is functionally verified, but project-local skill delivery, Taste and four Claudex skills are missing. The user's GitHub-canonical/no-local-project-files/checkouts/downloads/installs instruction remains binding; no installer or provider/config change was executed. The optional gateway is not required. Exact inherited model identity was not independently observable.

**Exact next action:** Obtain the founder's explicit bounded P0 alternative for only the named existing, RAM-only, reversible validation/data-integrity repairs using installed tools; then execute the exact project repair card and before/after regressions. No exception has been approved. No new feature, UI redesign, installation, provider/config change or deployment is included. Read-only verification/documentation may continue; do not begin repairs or mark the full construction suite done.

[Coordinator record](<../FDG Construction Lifecycle Workspace/docs/work-packages/C24_PRE_REPAIR_CONTINUATION.md>) · [P0 evidence](<../FDG Construction Lifecycle Workspace/evidence/c24-p0/README.md>). Qualified real-user/domain acceptance and independent-provider review remain pending.
