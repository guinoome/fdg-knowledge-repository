# Fuel reliability release handover — 2026-09-17

Status: deployed local-state prototype; owner acceptance pending.

Authoritative checkout: `C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository\Projects\Active\FDG Business Platform`. Vault branch `main`, starting commit `e3206e4`. Business mirror: `https://github.com/guinoome/FDG-Business-Platforms`.

Production: https://fdgbusinessplatforms.vercel.app/fuel-station/#closeout
Final deployment: `dpl_HnJt4KhXgurYYMVtuxfTmVWCBVP4`, READY. Static build using pinned Vercel CLI 59.13.1. Cache versions: hub v8, Fuel v5.

## Completed

See [[Projects/Active/FDG Business Platform/fuel-station/docs/FUEL_RELIABILITY_OWNER_GATE_2026-09-17|Reliability contract, checks and owner protocol]]. Date validation includes consecutive daily reporting, approval/correction lifecycle, failure-safe local writes, raw backup, OCR ambiguity/manual confirmation and cache namespaces. Existing local key remains unchanged. No server/schema migration. `npm test`, `npm run check`, scoped `git diff --check` passed. Synthetic browser submit/approve/reload/correction flow passed; 390px reports did not overflow. Final consecutive-day guard is covered by automated regression tests.

Deployment discovery: `.vercelignore` excluded runtime images referenced by the Fuel service-worker shell. Removed the design-directory exclusions; Markdown/internal docs remain excluded. All declared offline-shell files were checked in built output and on the published site. Do not remove those runtime images without also updating application references and the shell.

## Remaining and exact next actions

1. Obtain owner-selected complete day, immediately preceding accepted readings, genuine totalizer photographs, deliveries, calibration returns, prices/costs and payment records.
2. Reconcile the demo's April 29, 2025 baseline before a current-day trial. Daily gaps are now rejected; baseline-import/reconciliation needs reviewed source data, not arbitrary manual opening input.
3. Execute the linked owner protocol on the actual phone. Record OCR support/accuracy, manual corrections, stock/cash differences, offline recovery and the owner's actual decision. These are not verified yet.
4. Only after the owner gate, select the next milestone. Hourly timestamped reporting and authenticated transactional multi-device operations remain separate; Restaurant remains paused.

## Limits and recovery

This is browser-local data, not secure production storage. Local role choices are not identity. Writes restore last saved in-memory data on failure, but localStorage comparison is not an atomic cross-tab lock. Forms are not persisted until submission. JSON backup has no automatic restore UI. Corrupt storage is blocked from overwrite. Photos are not retained as evidence. Calibration is assumed returned; noncash split reconciliation is not implemented. Earlier legacy/approved-period correction requires a ledger-reconciliation design.

Never clear production browser storage to force an update. Refresh after the updated service worker installs. If rollback is needed, prefer a forward fix: rolling back to immediate-posting code would misinterpret pending/superseded rows in the retained local key. Preserve a JSON backup before any migration.

The older mirror worktree has unstaged deletions and was left untouched. Publish via a fresh business-mirror clone; never stage those deletions. Unrelated ML-DEP untracked work in the vault remains untouched.

Connected to [[Projects/Active/FDG Business Platform/CURRENT_HANDOVER|Business Current Handover]], [[Projects/Active/FDG Business Platform/fuel-station/CURRENT_HANDOVER|Fuel Current Handover]], and [[Projects/Active/FDG Business Platform/fuel-station/README|Fuel project index]].
