# Current handover — first working procurement/materials tool

Canonical: GitHub `guinoome/fdg-knowledge-repository`, branch main, `Projects/Active/FDG Construction Procurement and Materials Control`. Primary artifact: [distribution/FDG-Procurement-Materials.html](distribution/FDG-Procurement-Materials.html). Read GitHub current state, not a local vault.

## Completed

Beginner-friendly standalone offline HTML with Overview, Materials, Orders, Site movements, Report; two-field project start; material name/unit captured once; order/receipt/issue/return records; shortage, delivery and stock projections; reasoned correction history; CSV/PDF; portable save/restore and lifecycle demand preview.

67 deterministic checks pass. Browser example:100 m requirement →80 m order →50 m receipt →20 m issue →5 m site return =35 m stock/30 m open order/20 m buy-list shortage. Negative-stock and dependent-void attempts blocked. Source IDs retained on lifecycle demand import with zero invented orders/receipts. Save/reopen and JSON restore retained35 m stock. Final fresh-page desktop1440/1080/768 and phone390px views had no page overflow/errors/warnings/HTTP requests. PDF 64834 bytes in RAM.

## Source / integrity

Parent baseline `33bf06a823b10b282313e2c40f91db21fcddcb5c`; this handover's containing commit is the module's release commit. Sources and receipt SHAs: evidence/source-review.json. Build source in html/ and build/build-html.mjs; pure checks tests/materials.test.mjs. No local git tree/checkouts/artifacts existed; all work was in memory through connected GitHub tools.

HTML 68492 UTF-8 bytes; SHA256 `f3f3bb0a1acdf81e4743e3d8e1236663d95719fd95b744407d94a3629760ee66`; Git blob `04a47a2c4ab3847aaefa8fb4123d494b062b2ccd`.

## Important semantics

Issued is not installed or accepted. Recorded stock is ledger-only and requires physical reconciliation. Orders are reported records, not issued/signed authority. Missing requirement/rate/input remains unknown. All quantities preserve explicit units. Corrections retain original events and cannot break dependent historical stock. Demand import is draft snapshot only; no live sync. Existing lifecycle app remains unchanged except an additive related-tool link.

## Remaining boundary

No supplier messages, PO transmission/approval, tax/payment/accounting, quality release, barcode/scanner, account/auth, server/cloud sync or deployment. No real storekeeper/planner or independent-provider acceptance. Native OS save dialogs intercepted; real filesystem save not exercised. No maximum-capacity/multi-browser test.

## Exact next action

Use a private blank copy with one real material: reconcile an opening count, one real order, partial receipt, site issue and return against actual source slips. Verify stock/open-order/buy-list quantities and a saved/reopened backup, and record reviewer/discrepancies under this project. Preserve source evidence; do not rebuild the engine.

Other construction candidates remain QA/QC/punch, then testing/commissioning/turnover. Optional area-choice answer, if later received, should steer the next work package.


## C24 continuation — 2026-10-24, pre-repair evidence

Canonical read-only baseline: `99db9f36cd4fee28553360db94a3161e2ccd228d`. This dated continuation governs the immediate next action; historical source, artifact hashes and acceptance evidence above are preserved, not freshly rerun unless stated below. Product source/build/distribution unchanged. No repairs, browser run or native OS save/open test occurred in C24.

Fresh execution by `/root/proc_verify_oct24`: **67/67 existing checks pass;17 focused assertions:13 pass /4 fail**, exposing three root defects: voided transaction history permits a unit change that breaks backup reload; import admits order-linked site issues/opening counts rejected by live entry; aggregate order overflow imports and subsequently breaks summary/render. All remain unresolved. Exact source rebuild matched the historical68,492-byte artifact and its recorded SHA256; no application edits were made.

[Exact repair cards](evidence/c24/repair-cards.json) · [Named results](evidence/c24/verification-pre-repair.json) · [Executable harness](evidence/c24/reproduction-harness.json). Historical browser/portable-save evidence above was not rerun. No real storekeeper/planner acceptance received.


**Gate:** CODEX-P0 BLOCKED; UX_P0_BLOCKED_WITH_EVIDENCE for new UI work. The installed UI UX Pro Max2.15.0 marketplace script is functionally verified, but project-local skill delivery, Taste and four Claudex skills are missing. The user's GitHub-canonical/no-local-project-files/checkouts/downloads/installs instruction remains binding; no installer or provider/config change was executed. The optional gateway is not required. Exact inherited model identity was not independently observable.

**Exact next action:** Obtain the founder's explicit bounded P0 alternative for only the named existing, RAM-only, reversible validation/data-integrity repairs using installed tools; then execute the exact project repair card and before/after regressions. No exception has been approved. No new feature, UI redesign, installation, provider/config change or deployment is included. Read-only verification/documentation may continue; do not begin repairs or mark the full construction suite done.

[Coordinator record](<../FDG Construction Lifecycle Workspace/docs/work-packages/C24_PRE_REPAIR_CONTINUATION.md>) · [P0 evidence](<../FDG Construction Lifecycle Workspace/evidence/c24-p0/README.md>). Qualified real-user/domain acceptance and independent-provider review remain pending.
