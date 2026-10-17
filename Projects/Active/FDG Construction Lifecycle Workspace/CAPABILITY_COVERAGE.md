# Capability coverage and completion boundary

## Current milestone

One offline HTML project workspace covers the following17 stages through real register entry, edit, archive/restore, search, CSV and printable record views. Coverage means usable template workflows, not automatic engineering approval.

1. **Opportunity / bid decision** — Tender opportunities; Bid / no-bid review.
2. **Tender review** — Tender compliance matrix; Controlled drawings / document revisions; Tender addendum impacts; Scope / responsibility interfaces.
3. **QTO / estimate** — Estimate basis / assumptions; Controlled BOQ quantity snapshots; QTO measurements & rate build-up; Material / procurement demand; Supplier / subcontractor comparison.
4. **Bid submission** — Bid submission checklist.
5. **Award / contract setup** — Project startup and kickoff; Contract obligations / notices.
6. **Mobilization** — Mobilization / logistics readiness.
7. **Planning / controls** — Work breakdown and progress basis; Milestones / key dates; Procurement / delivery tracking; Risk register; Actions / recovery commitments; Decision register; Activities & baseline; Constraints & actions.
8. **Site execution** — Daily site progress; Issues, constraints and delays; Daily manpower; Equipment utilization; Material receipts / use.
9. **QA/QC / inspection** — QA/QC status register; Nonconformance / corrective action.
10. **Safety / permits** — Safety / permit interface.
11. **Document coordination** — Request for information register; Submittal register; Evidence index; Site instructions; Document transmittals; Meetings / minutes; Incoming / outgoing correspondence.
12. **Progress / reporting** — Approved time-phased progress plan.
13. **Variations / billing** — Variation and change register; Progress billing evidence index; Contractual notice / claim support; Actual cost ledger; Remaining commitments.
14. **Testing / commissioning** — Testing & commissioning readiness; Test / retest evidence.
15. **Punch / completion** — Punch list.
16. **Turnover / closeout** — Turnover and closeout tracker; As-built drawing closeout; O&M manuals; Training / responsibility acceptance; Asset / equipment handover.
17. **Warranty / learning** — Revision and decision log; Warranty / defects liability; Personnel / responsibility transfer; Lessons / performance review.

## Connected calculations / controls

- Source Daily events → physically verified / QA accepted evidence → WBS cumulative progress → schedule completion / DPR-WPR-MPR / actual S-curve.
- Approved WBS weights must total100%; missing basis remains unknown. Physical verification and QA review must exist at the cutoff. Explicit WBS/unit matches and unique source events are required.
- Time-phased approved plan points render a calendar-day S-curve. Missing actual points remain gaps. Curve rendering is limited to80 dates; timeline100 activities.
- QTO net design quantity and allowances → explicit draft BOQ / procurement demand. Drawing/QTO revisions flag impact; approved records are not silently overwritten.
- Schedule/cost budget, actual costs, latest contract commitment snapshot and ETC → forecast/headroom. Actual + ETC is the forecast; remaining commitments are included within ETC once.
- Baseline snapshots freeze WBS/Schedule/BOQ/CurvePlan. Forecast changes remain separate. Explicit new baseline revision retains history.
- Document identity/revision is retained. Explicit supersession is required for a new current controlled revision.
- Issued reports retain source data and frozen metric projections; later live edits do not rewrite issued metrics. Older source-only reports are labeled regenerated.
- Reported, verified, accepted, billable, billed and paid states stay separate. Billing/settlement references are required where quantities are declared.
- Evidence photos remain Unverified; closing NCR and punch items requires evidence. There is no image-based automatic quantity verification.
- Full JSON replacement and same-project legacy merge require preview/commit. Collisions are refused; legacy source is retained.

## Operational limits

One project per file;500 rows per register;50 issued snapshots;100 baseline snapshots;10 retained legacy source imports (5 MB each);25 MB JSON file selection;20 images at 2 MB each and10 MB combined encoded data. Long text is bounded. Split controlled packages before exceeding limits. Save explicitly; closing without saving loses session changes. No browser storage is used.

Calendar days, FS dependency checks/overlap/cycle warnings only. No critical-path/float engine, holiday calendar or resource leveling. Rates/units, contractual deadlines and acceptance criteria are user-controlled references. Totals are estimates, not certified valuations. Native save dialogs, diverse browser versions, real-project quantity review, large-capacity performance and multi-user operation were not validated.

## Broader blueprint gates not completed

Authentication, RBAC/authority checks, database/RLS, multi-tenant isolation, cloud/offline conflict synchronization, server audit/signatures, attachment delivery controls, calibrated graphical takeoff, provider deployment and commercial acceptance remain separate milestones. A selectable work focus changes navigation only. No external release or subscription/payment system is implied.

The read canonical FEIS-CM-0902 blueprint, Console, QTO integration and continuity contracts govern this distinction. This milestone is a reviewable field tool, not a declaration that every software/platform gate in the full blueprint has passed.

## Beginner workflow revision —2026-10-16

Simple view now exposes only five everyday views. Two-field setup, three-field work items and quantity-focused daily updates reuse the same registers. Automatic working reports, totals and remaining quantities are available before formal baseline approval. Reported completion is an explicitly unreviewed equal-item average; unknown source data remains unknown. Formal acceptance, billing and authority boundaries above still apply. All 56 registers remain available through Advanced tools. See docs/BEGINNER_WORKFLOW.md and evidence/beginner-validation.json.

## TC01 testing/test-dossier revision —2026-10-17

TESTED offline guided workflow over original TestPacks/Tests/Punch/Turnover: two-input package, actual prerequisite/hold-point review, failed/passed retest chain, native punch closure, Pending dossier and actual named receipt. Original source links/history remain intact; changed current basis flags retained receipt rather than rewriting it. Advanced receipt guard/link protection and invalid-import attention included. Native Punch closure now uses existing verifier/date/evidence fields.

305 executable checks +41 browser assertions +8 post-recovery smoke checks pass. Seven engines/eight UI sources; source rebuild byte-identical after runtime recovery. [TC01 evidence](evidence/tc01/validation.json) · [Source contract](docs/TEST_DOSSIER_CONTRACT.md).

One test/retest chain per pack. Unallocated unresolved Punch/NCR conservatively blocks dossier readiness. Names remain manual declarations. No commissioning certificate, operating clearance, whole-project acceptance, complete asset/O&M/training/maintenance-ready gate or authenticated authority. Existing Daily/commercial quantity states unchanged. Native OS dialogs/real novice/qualified/independent acceptance remain pending; broader blueprint gates above not promoted.
