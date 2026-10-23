# QTO text recovery repair — FPJIS-LITE-001 filled card

Status: IMPLEMENTED, DATA-LAYER AND BROWSER TESTED as of 2026-10-19; independent review/qualified acceptance pending. Classification: REPAIR. Finding: FAIS-QTO-20261018-01. Owner scope: standalone QTO toolkit; FPJIS implementation, FAIS finding. Authorized by founder audit-to-repair mandate, FAIS-RKA-0301 §10. This card records the executed bounded task and supports repeatable review; it does not authorize wider work.

When an estimator saves and reopens notes or restores a prior edit, the complete entered text must return. Existing calculations, source fields and offline use remain available.

| Builder needs | Exact task |
| --- | --- |
| TASK | QTO-TEXT-RECOVERY-01: prevent silent truncation of project/item text during normalization. |
| GOAL | Preserve entered project notes, item descriptions, source references and notes through JSON/HTML recovery and undo normalization. |
| CURRENT SOURCE | guinoome/fdg-knowledge-repository, main baseline `ecd0d3cdfef73cd430fe878f86e8b7767eaa09b4`. Paths below are relative to `Projects/Active/FDG QTO BOQ Estimate Toolkit/`. |
| FILES | EDIT `html/engine.mjs`, embedded engine in `distribution/FDG-QTO-BOQ-Working-Template.html`; ADD `tests/text-recovery.test.mjs`, `tests/text-recovery.browser.mjs`, `evidence/text-recovery-2026-10-18.json`, `evidence/text-recovery-browser-2026-10-19.json`, this card; APPEND `CURRENT_HANDOVER.md` and existing FAIS-PRJ-0501 finding record. READ ONLY `html/app.js`, `html/tests.mjs`, `html/sample.json`, `build/build-html.mjs`, README. |
| REQUIRED BEHAVIOR | Preserve accepted string values exactly. Keep existing format/version, scalar type and 1000-item validation. Preserve JSON/HTML escaping and existing history retention. No schema conversion or formula change. |
| BUILD STEPS | 1. Run recovery test on baseline; confirm failure above 6000 characters. 2. Remove only the two `v.slice(0,6000)` truncation expressions from project/item normalization; preserve scalar validation. 3. Replace the exact embedded engine in the existing distributed HTML. 4. Run tests below. 5. Review diff, record hashes and append evidence links. |
| PASS TESTS | From repo root: `node "Projects/Active/FDG QTO BOQ Estimate Toolkit/tests/text-recovery.test.mjs"`. Expected 26 named checks: 18 existing plus 8 recovery/guard checks; embedded distribution separately executes all 18 original assertions. 5999/6000/6001/12000-character notes preserve equality; item text, Unicode and literal closing-script text recover; bad format/type and 1001 items still fail. |
| DO NOT DO | Do not modify pricing/formulas, authentication, payments, schemas, history limits, other products, styling or deployments. Do not remove the 15 MB import-file guard in app.js. Do not infer real-user or engineering acceptance from automated tests. |
| STOP AND REPORT IF | Source/embedded engine differs unexpectedly, another owner changes these files, formulas regress, invalid backup guards fail, or repair requires changes outside these paths. |
| RETURN | Actual diff/commit, commands and pass/fail, file hashes, remaining risks and one next action. |

## Evidence and review disposition

Baseline source `html/engine.mjs`, function `normalize`, silently sliced every project/item string to 6000 characters. `html/app.js` accepts text without that limit and calls normalize on startup, import and undo. Reproduction: 6000 `A` characters plus ` KEEP THIS` (6010 total) recovered as 6000 characters. The new regression failed on baseline at the 6001 boundary (exit 1).

Correction removes those two truncations, retaining input validation. Distribution changes only its identical embedded engine. Existing backups remain format/version 1; text already lost in an earlier saved copy cannot be reconstructed. Recover it from an untouched original if available. Long texts now use their actual memory size; the existing 15 MB import limit and 1000-item guard remain. No automatic storage has been added.

Executed Node v24.19.0: 26 checks passed, exit 0. The original 18 tests also pass inside the distributed engine. Evidence: [test results and hashes](evidence/text-recovery-2026-10-18.json). A new test initially used strict equality to a rounded decimal constant; it was corrected to compare the recovered total to the unchanged baseline calculation, avoiding a floating-point test artifact. No production formula was altered.

Self-review: patch is two scalar-copy expressions plus the same embedded source, no UI or formula edits. Independent reviewer unavailable in this session; no independent review claimed. At the first checkpoint, browser/mobile/save-dialog checks were not rerun; the dated continuation below supplies subsequent browser evidence. Technical status: FIXED—VERIFIED for normalization/data recovery only; not functionally accepted, deployed or commercially validated.

## Scope and continuation

Reviewed: root README and AGENTS, ecosystem map, Nex master index, FAIS-RKA-0301 including §10, FAIS-PRJ-0501, FPJIS-LITE-001 template, FMCIS allocation guardrail, Projects master index, canonical review README; QTO README, handover, engine, app, original tests, sample, builder and embedded distribution engine. This is a bounded repair, not a full portfolio audit. The earlier canonical review remains in progress; no other product's current functionality is asserted here.

Phases: A — current QTO evidence established; B — this recovery repair tested; C — reuse existing estimator and defer optional enhancement; D — qualified estimator/browser acceptance pending; E — approved offer and genuine payment/cost evidence pending. Business Platform permission, real operational storage, blocked email and paid branch access remain separate unresolved workstreams. FWIS remains intentionally inactive. Nex remains the orchestrator of specialist agents.

**Single next action (updated 2026-10-19):** A qualified estimator reviews PR #8 and uses the tested offline file for one consented measurement/rate scenario, recording expected versus actual quantities, print output, source text and save/reopen results. No engineering acceptance or commercial claim is established by this automated session.

Knowledge path: [[Projects/Active/FDG QTO BOQ Estimate Toolkit/README|QTO toolkit]] → [[Projects/Active/FDG QTO BOQ Estimate Toolkit/CURRENT_HANDOVER|handover]] → this card. Governance: [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|FPJIS-LITE-001]]. Finding: [[22_FDG_Audit_Intelligence_System/05_Project_Audit/FAIS-PRJ-0501 - Functional Product Evidence Audit 2026-10-17|FAIS product audit]].

## Browser continuation — 2026-10-19 (Asia/Manila)

PR: [#8](https://github.com/guinoome/fdg-knowledge-repository/pull/8). Tested repair commit `7003625339775200236db8e18881de695ecc4757`; current main `377216c5e1a0f9d4af738bf40fdce4207708eb79` changes no file in this patch. No new application correction was needed. This continuation adds reproducible verification and preserves the earlier evidence.

**Before:** identical browser test on baseline `ecd0d3c` fails at undo of the 9819-code-unit project note (exit 1). **After:** headless Chromium 140.0.7339.16, Playwright 1.55.0, Node v24.19.0: all 11 browser scenarios pass (exit 0). Tests enter text through real forms, undo it, capture actual JSON/HTML downloads, reopen the downloaded HTML in a fresh page, import JSON into a blank estimate, reject an invalid backup without losing work, recalculate the existing sample and check Setup/Takeoff at 390×844. No page errors or external requests. The source/distribution artifact hash is recorded in [browser evidence](evidence/text-recovery-browser-2026-10-19.json). Existing 26 data-layer checks reran successfully.

Reproduce from the repository root with a separately installed Playwright 1.55.0 and its Chromium headless shell (test dependency only; do not add runtime dependencies to the offline app):

```sh
QTO_PLAYWRIGHT_MODULE=<installed-playwright>/index.mjs node "Projects/Active/FDG QTO BOQ Estimate Toolkit/tests/text-recovery.browser.mjs"
```

`QTO_PLAYWRIGHT_MODULE` is optional when `playwright` resolves normally. Set `QTO_TEST_HTML` to the extracted baseline file to reproduce the failure. The test creates temporary downloads and removes them on completion. Browser automation captures download events; native operating-system save dialogs and other browsers remain untested. Qualified estimator review, independent acceptance, deployment and revenue remain pending.
