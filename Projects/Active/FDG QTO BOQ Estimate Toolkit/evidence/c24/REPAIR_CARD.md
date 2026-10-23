# C24 estimate validation and repair card

Status: REPRODUCED; no application repair authorized or performed in this worker. Source99db9f36cd4fee28553360db94a3161e2ccd228d,2026-10-24 Asia/Taipei. Existing18 tests PASS. Additional12 focused assertions:6 PASS,6 FAIL. These are scoped checks, not qualified estimator acceptance.

## Demonstrated defects

- Q04/Q05/Q06: finite inputs can overflow during geometry, line aggregation or pricing. Engine returns Infinity rather than an unavailable result. Example: sample concrete length1e308 makes direct Infinity. Two independently finite1e308 line costs make sum Infinity; indirect1e308 with contingency1000 overflows pricing. UI formatter conceals non-finite numbers as n.a., but the engine result is still invalid and CSV can expose Infinity.
- Q07/Q08: missing or whitespace-only imported stable item ID leaves direct47770. The required-ID validation does not protect imported calculation state.
- Q10: active and archived records with the same stable ID survive import, leave direct47770, and both action buttons share the same ID. app.js18/25 selects the first matching record, making archive/restore/edit ambiguous. Normal create validation already disallows reuse of archived IDs; import should preserve that contract.

## Smallest repair

1. Add explicit finite-result checks after geometry/rate/cost operations, BOQ/known/direct sums and pricing operations. Return null plus review notes for affected incomplete results. Do not invent upper market rates or silently cap/coerce prices.
2. Validate nonempty trimmed string stable IDs and uniqueness across retained active+archived records at import. Reject an ambiguous import before replacement; never delete/renumber a record automatically. Protect direct calculations defensively when invoked on malformed state.
3. Keep all actual quantity, allowance-once, net/gross cost basis, markup/margin and archive semantics. Preserve all18 existing regressions and add the6 failing reproductions, including CSV/report handling of unavailable outputs.
4. If lead clears the mandatory construction verification gate, patch the standalone engine and identical Lifecycle mirror in one scoped reviewable change. Rebuild deterministic artifacts and run full affected regressions. No pricing assumptions or new functionality.

## Source boundaries

html/engine.mjs5-21; html/app.js18 and25. Mirrored Lifecycle estimate-engine.mjs has exact Git blob a3731446a120e5a1adb2a91ac0ba114a9a0e773e. No app source, distribution, handover, branch or ref changed by this worker. Baseline builder inspected, not executed. Browser deliberately not run while gate is unresolved.
