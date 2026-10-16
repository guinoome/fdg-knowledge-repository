# WP03 — Inspection to corrective action

2026-10-16 · Existing offline Lifecycle Workspace · Baseline a6955916ab33220298a1eadd25c78f39c99d63de.

## Actual gap and result

QAQC/NCR/Evidence registers existed. They required manual links and gave no guided finding → repair → reinspection sequence. Added one flow via More tools → Quality checks and fixes, retaining all56 registers and existing simple navigation. No duplicate app or CMMS.

A user records work item/date/observation/inspector/evidence, then assigns owner/action/due date. Optional classification and severity rationale become a linked original Issues record. Repair performer/date/description/evidence create a separate QAQC submission. Reinspection requires actual method, criterion, observed outcome, evidence, verifier/date, authority reference and explicit declaration. Failure leaves work open; a later passed declaration may close the linked correction. The same declared name cannot be both repair owner/performer and verifier. This is not authenticated independence or professional approval.

## Data / integrity

No schema/JSON-version change. [FDG-QA-1 source contract](../INSPECTION_WORKFLOW_CONTRACT.md) uses existing source_ref/verification_ref fields. Initial finding and each repair/reinspection are retained. Managed closure checks are reused by guided and Advanced saves; invalid imported closeouts are visible review items. No Daily quantities or QA-accepted progress is changed. Existing untagged records are not relabeled/migrated automatically.

## Changed files and rollback

Added html/inspection-engine.mjs, html/ui-quality.js, tests/inspection.test.mjs. Extended builder to six engines/seven UI parts; targeted core guard/view flags, guided entry/source return, record return link, shell route and quality/print CSS. Rebuilt one distribution HTML. No new dependency, store, service or cloud integration. Roll back code to a6955916ab33220298a1eadd25c78f39c99d63de only after preserving current project JSON/HTML; older UI will not provide these guided guardrails although original standard register fields remain compatible.

## Evidence / review

[231 named checks and36 browser assertions](../../evidence/wp03/validation.json) · [Before/after actual desktop/390px screens](../../evidence/wp03/) · [A4 quality summary](../../evidence/wp03/quality-summary.pdf) · [Actual app with synthetic full-loop records](../../evidence/wp03/working-demo.html).

Browser loop: finding → assignment/classification → repair → same-name pass refused → failed reinspection retained → second repair → separate passed declaration → source history → HTML save/reopen → JSON preview/commit. Verified Advanced link bypass, all56 forms, keyboard history, empty state, escaped/long input, widths390/768/1080/1440 and print auto-expansion/restoration. Daily30m/70m and QA Unknown retained. Installed Chrome/Playwright fallback: Browser plugin absent. Self-review only; independent provider NOT RUN. Actual native save/print dialogs, novice/qualified site review and production/cloud/commercial gates remain pending.

Five visual checks: existing navy/red/gold shell retained; short contextual forms; light printable quality paper; retained source IDs/evidence/criteria readable; phone layout wraps with44px actions. No concept assets/vendor logos copied and no static mock substituted for the app.

## Next

Actual beginner/qualified acceptance under issue#5. WP04 integration/platform remains deferred; do not rebuild these completed offline packages.
