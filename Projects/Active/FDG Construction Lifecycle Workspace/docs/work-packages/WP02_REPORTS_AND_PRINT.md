# WP02 — Reports and print

2026-10-16 · Baseline 0a764d8e69c1c573da6b545c8e778cffe5497523 · Existing single-project offline Lifecycle Workspace.

## Client task / result

Enter quantities once → choose Today/This week/This month → read quantities and source trail → print A4 or Save project/reopen. No added required input.100m,+20/+10 yields30m reported/70m remaining. Selected period and cumulative cutoff are explicit.

## Demonstrated gaps / fixes

- Simple report lacked event IDs/review/reference trace. Added shared read-only source trail and original-record navigation.
- No-event period appeared0. Pure G.report projection distinguishes Not reported from entered0; units stay separate.
- Detailed/issued projection used0 for absent physical/QA sources and allowed verification before source date. New projections retain null; original issues preserved.
- New issue could have future end. Added issue date guard.
- Long unbroken project name overflowed390px header. Wrapping corrected/retested.

## Changes

html/guided-engine.mjs: pure report projection; core.mjs: report-only snapshot/date guard; ui-projections.js: shared source/quality/safety output; ui-guided.js: working report; ui-actions.js: original source navigation; styles.css: report/mobile/print. Added tests/report.test.mjs, rebuilt distribution using same pure builder. No schema/format/dependency/storage change. Field/cost/estimate engines unchanged.

## Proof / review

[Before/after screens](../../evidence/wp02/) · [178 named checks +33 browser assertions](../../evidence/wp02/validation.json) · [A4 PDF](../../evidence/wp02/sample-report.pdf) · [Same actual app with synthetic source records](../../evidence/wp02/working-demo.html).

Presentation comparison: original navy/red/gold shell retained; light report paper; quantities retain per-item units; dates/cutoff/source IDs visible;390px cards wrap without body overflow. Intentional report readability change, not a concept-art remaster. Existing Playwright/Chrome,1440×1100/390×844, plus768/1080 checks. Browser plugin absent. Self review only; independent provider NOT RUN. Native OS save/print dialogs, real novice/qualified acceptance and capacity/diverse-browser tests pending. No deployment or commercial acceptance.

## Next

Inspect WP03 inspection → corrective action using existing QAQC/NCR/Evidence records. Reproduce one linked finding/repair/verification workflow; implement only the demonstrated gap. No cloud identity or automatic acceptance.
