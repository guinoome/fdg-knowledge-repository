# Scheduling / cost controls — current handover

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
