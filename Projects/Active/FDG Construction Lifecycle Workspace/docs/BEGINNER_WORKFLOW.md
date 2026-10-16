# Beginner workflow decision —2026-10-16

## Problem and decision

The user found the first lifecycle workspace too complicated and requested less input with more output. Long register forms and a dense sidebar were the root usability problem. Add a beginner projection over the existing records; retain the full workflow behind Advanced tools.

This is a UI/workflow revision, not a competing construction system, new schema or platform integration. It implements FEIS-CM's Capture Once → Reuse Everywhere principle.

## Input / output contract

| Action | Visible core inputs | Reused / generated | Outputs |
|---|---|---|---|
| Start | Project name, prefilled report date | Internal stable project ID; day report interval | Shared project profile |
| Work plan | Item name, target quantity, unit | Work ID; project link; revision | Work list and reusable unit/identity |
| Daily update | Item, prefilled date, added quantity | Event ID; project/work links; unit; Draft status | Period total, cumulative total, remaining quantity and report |
| Reports | Period choice | Existing source records | Working daily/weekly/monthly report / PDF |

Location, preparer name, target finish date and site notes are optional and collapsed. More tools reveals estimates, costs, photos and handover. Expert-only registers/weights/approval fields remain available in Advanced tools.

## Integrity and calculation boundaries

- Quick plan targets are working user inputs, not approvals. No progress weights, approved plan percentages, reviewers, signatures or evidence references are invented.
- Daily entry always means incremental quantity. It creates a Draft source event with null accepted/verified quantities.
- Reported completion is an explicitly unreviewed equal-item average of reported/target ratios, only when every active work item has known valid data. Different units are never added together.
- Missing reports remain unknown. Explicit zero is accepted as reported data. Over-target quantities remain visible and flagged; remaining work clamps at zero for display.
- Archived/duplicate/future/foreign-unit events are excluded from the beginner projection.
- Formal accepted progress still uses the original physical-verification/review/baseline engine.
- Frozen baseline restrictions apply to quick work-item creation.
- Target finish dates create linked Draft milestone records; no approved schedule dates are inferred.
- All existing source/provenance, report snapshots and legacy imports are retained. JSON format remains version 1.

## Architecture and rollback

html/guided-engine.mjs contains pure beginner actions/projections; html/ui-guided.js owns the short forms and view rendering. Existing engines are unchanged. Builder now takes five ordered engines and six UI source files. See build/README.md.

No new package, service, cloud account, local data store or runtime network dependency. Roll back to parent GitHub commit d103c8ea3c4da2ad9b0d0cd33f53798f0453df40 to remove this UI layer, but first preserve current working data. Current JSON remains in the existing lifecycle format.

## Review and learning

87 engine checks passed plus browser workflow checks; see evidence/beginner-validation.json. Browser plugin/skill was unavailable, so existing Playwright with installed Chrome was used. Cross-provider Claudex skill was absent and was not installed under the user's GitHub-only/no-local-project-output constraint; independent-provider verification is not claimed.

Repeated lesson: expose a small number of user actions, write the shared source once, generate outputs from that source, and request consequential verification only when the user invokes it. Register completeness is not beginner usability.

Next validation is a real beginner completing the three-step workflow without coaching. Record confusing labels and unnecessary fields before adding more features.
