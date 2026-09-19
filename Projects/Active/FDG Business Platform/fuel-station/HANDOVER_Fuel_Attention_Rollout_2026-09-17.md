# Fuel Attention Center and rollout handover — 2026-09-17

Read [[FUEL_REMASTER_ATTENTION_ROLLOUT_2026-09-17]]. Extends [[HANDOVER_Fuel_Hero_Environment_2026-09-17]], preserving prior operational gates.

## Completed

- `src/attention.js`: compact source issues, expandable evidence, role-checked append-only review history; no effect on trusted totals.
- `src/utility-rates.js`: effective-dated proposals, approval/rejection, nonoverlap and supersession; original records retained. No automatic bill/expense application.
- `src/store.js`: additive issueReviews/utilityRates, same storage key and rollback behavior.
- Calibration: event type, pump/tank/time/source; new positive deductions without register evidence rejected. Legacy unchanged correction deductions compatible.
- All listed operational pages/navigation share glass styling. Attention uses a mobile 90svh sheet, forms retain utility hierarchy.
- Hub entry plans ₱500/month/module or branch; seven-day trial timestamps; legacy price snapshots retained. No actual payments or automatic trial lockout.
- Fuel cache v13, hub v10. Reload after update; do not clear operational storage.

## Validation

Root npm test and npm run check pass: dates, FIFO 100+500, 100−30=70, duplicates, corrections, approval boundaries, corrupt/failed storage, period charts, source isolation, scene routes, issue audit/roles, rate date/overlap/supersession, quote protection.

Browser: issue review saved and survived refresh; rate pending submission/approval tested with explicit QA fixtures only on localhost. All eight utility routes checked at 360×800 without horizontal overflow. Attention/Settings visually reviewed at 390×844. Final desktop/release evidence to be appended.

## Release state

Released 2026-09-19: Vercel `dpl_EU6AZ3WKN3vKFyQ1mgY7KGZ7H8n9`, READY, production alias https://fdgbusinessplatforms.vercel.app. Immutable build: https://fdgbusinessplatforms-fj0lhs4pr-guinoomes-projects.vercel.app.

Build/source hashes and both PWA shell asset lists verified. Live HTTP 200 and served Attention Center, utility-rate module, Fuel v13 service worker and catalog source matched local source. Tests and syntax checks rerun successfully on September 19. Initial deployment authorization failed; retry with explicit `--scope guinoomes-projects` succeeded without changing credentials or access.

Previous production `dpl_7kf1EkPhpijURYE4vHqj8bngbaHp`, previous mirror `73f37cc`. Desktop closeout at 1366×768 reviewed without overflow or browser errors before release. Browser tooling was unavailable during the final resumed production check, so final live verification was HTTP/source parity, not a fresh live screenshot. Local screenshot: `C:/Windows/Temp/fdg-glass-closeout-desktop.png`.

## Exact continuation

1. Verify business mirror publication from the release commit; healthy clone: `C:/Windows/Temp/fdg-business-mirror-20260917-reliability`. Preserve unrelated ML worktree.
2. On the owner's phone, reload after the PWA update without clearing saved data, open Needs Attention and confirm the new sheet and utility records. No production QA records were written by the agent.
3. Obtain original workbook; identify July cells and reconcile April 30 with owner. UI review alone must not lift exclusions.
4. Validate a complete real day, actual-phone OCR/manual fallback and backup recovery. Then Restaurant, then Sari-Sari, with distinct domain heroes.

## Boundaries / rollback

No secure identity, cloud ledger, live telemetry, BIR claim, payment provider, production trial enforcement or hourly data. Utility records do not compute usage/bills. Concept imagery is not a photograph of NJ Station. PNG payload optimization remains a measured follow-up.

Rollback presentation via prior deployment without clearing records. Older builds ignore additive fields; export backup before any recovery. Never reset demo as a deployment step.
