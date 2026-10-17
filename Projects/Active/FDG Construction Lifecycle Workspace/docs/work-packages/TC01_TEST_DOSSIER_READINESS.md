# TC01 — Testing and test-dossier readiness

2026-10-17 · **TESTED, scoped offline workflow** · Canonical GitHub main · baseline `dda8be1bedb0cd5265d56ef7989326b2eef4eebc`.

## Result

**More tools → Testing and test dossiers** now completes the existing-record workflow: two-field package → actual prerequisite/hold-point readiness declaration → actual failed test → linked passing retest → punch closure by separate declared verifier → Pending dossier → named actual receipt. Method/criterion/work references are reused, original attempts are retained and the same records generate blockers and a light A4 source summary.

[Working synthetic HTML](../../evidence/tc01/working-demo.html) · [Primary blank application](../../distribution/FDG-Construction-Lifecycle.html) · [Desktop](../../evidence/tc01/after-desktop.png) · [Phone](../../evidence/tc01/after-mobile.png) · [Blocked state](../../evidence/tc01/blocked-readiness.png) · [Actual dossier PDF](../../evidence/tc01/test-dossier.pdf).

## Problem and smallest change

The registers already existed; everyday users had to assemble testing, retesting, outstanding items and receipt manually. TC01 adds a focused beginner view and pure source projection/actions over those original records. It does not duplicate the application or create a new data store.

A reproduced native Punch defect also prevented genuine Closed saves: generic final-state validation demanded reviewer fields absent from the Punch schema. Closure now validates its actual verified_by, verification_date and closure_evidence_ref with the repair owner and a separate declared verifier. The browser exercised the original Advanced form, including rejection of future verification.

New source: html/commissioning-engine.mjs, html/ui-commissioning.js, tests/commissioning.test.mjs. Targeted changes: existing core validation/attention, simple navigation, shared source/return navigation, print styling and builder. Existing56 registers, version1 JSON, original field/cost/estimate engines and prior QA/report flows are retained.

## Validation and artifact continuity

305 executable checks passed:46 lifecycle +41 beginner +34 Overview +57 report +53 inspection +74 commissioning.41 browser assertions covered actual forms, fail/retest history, pending/accepted receipt, source blockers, native Punch saves, all56 Advanced forms, HTML save/fresh-page reopen, JSON preview/commit, source returns, empty/error/escaped/long text, keyboard,390/768/1080/1440 layouts and actual A4 print. Final pre-restart app contexts observed0 relevant errors/warnings/network requests. [Named results](../../evidence/tc01/validation.json) · [CSV matrix](../../evidence/tc01/TEST_MATRIX.csv).

The runtime restarted before publication. Exact completed primary/demo/screens/PDF were already uploaded as Git blobs. Source was recovered from that exact primary and the builder proved byte-identical reconstruction. The74-check source test harness was reconstituted and all305 checks rerun. Eight further recovery smoke checks passed, including real localhost preview, original-pack navigation/return, phone overflow and actual PDF generation. These recovery checks supplement the recorded41 browser assertions; they are not a claim of repeating all41 after restart.

Primary290815 bytes; SHA256 `ed207c02cbe20c1c4a6a5ef05d1312a0ffb42893d260b4803a15c35895cfddfc`. Synthetic demo296705 bytes; SHA256 `1de4defed464fd89423a172410d360f5aa734145d9017ba337fb181016e222be`. Archived A4 PDF65158 bytes. [Integrity](../../evidence/tc01/artifact-integrity.json). No local project checkout/output, downloads or installs.

## Review and remaining gates

Source review: duplicate/archived/cyclic chains, source revision drift, whitespace/nontext imported declarations, invalid closure, current cutoff, protected dossier links, source immutability and unrelated regression preservation were checked. No unresolved executable failure. Names remain unauthenticated manual declarations. Independent provider/Claudex review NOT RUN: skill unavailable and no installation under task constraints. Real novice/qualified acceptance PENDING under [issue#5](https://github.com/guinoome/fdg-knowledge-repository/issues/5).

One chain per pack; no full commissioning/operating certificate, complete project acceptance or maintenance-ready assessment. Native OS Save As/print-preview dialogs, maximum capacity, diverse browsers and multi-editor use not run. No auth/RBAC, cloud sync, server audit, deployment, payment or commercial maturity change.

## Durable decision and next action

Reuse original registers and reserved source references instead of a competing schema; keep recorded receipt separate from current source validity. This preserves history and version1 portability with no migration. If later scope needs multiple independent test cases, structured calibration or authenticated approval, define that data/authority contract separately rather than weakening current checks.

Run actual private novice/qualified acceptance of the existing capture → fail/retest → punch → dossier receipt → save/reopen task. Record evidence under issue#5/current project; do not fabricate a user test or reopen completed WP01–03/TC01. [Contract](../TEST_DOSSIER_CONTRACT.md) · [Handover](../../CURRENT_HANDOVER.md).
