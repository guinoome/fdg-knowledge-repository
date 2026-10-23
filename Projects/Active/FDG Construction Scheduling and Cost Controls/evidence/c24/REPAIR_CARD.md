# C24 scheduling and cost validation and repair card

Status: REPRODUCED; no application repair authorized or performed in this worker. Source99db9f36cd4fee28553360db94a3161e2ccd228d,2026-10-24 Asia/Taipei. Existing33 tests PASS. Additional24 focused assertions:14 PASS,10 FAIL. This is not qualified planner/QS acceptance.

## Demonstrated defects

- C04-C07: finite source values overflow ledger sum, project budget sum, actual+ETC, or remaining-commitment sum. Engine exposes Infinity instead of unavailable financial outputs.
- C18: a missing activity ID still permits project budget150000 despite the stable-record contract and missing-ID warning. Dependent totals must not imply a complete identified project.
- C19: active+archived duplicate task IDs import successfully, leave budget150000 and are ambiguous for the existing first-match editor/archive handlers. Retained records must preserve unique identity.
- C20/C21: imported cost source of whitespace or numeric17 still authorizes actual40000. C22: whitespace reviewer still admits53.333% reviewed progress. Source/reviewer are required text declarations, not mere truthy values; typed names remain unauthenticated.
- C23: imported horizon1e308 passes normalize, then calculate throws Invalid time value. Existing setup UI already defines integer horizon1-90; import bypasses that same boundary.

## Smallest repair

1. Check finite derived values after every monetary aggregation and weighted-progress intermediate; affected totals return null and explicit review flags on overflow. Do not cap costs or introduce new financial semantics.
2. Require nonempty trimmed string IDs and uniqueness across retained active+archived records at import/validation; reject invalid replacement rather than repairing identity silently. Include missing task identity in aggregate blockers.
3. Share a nonempty-text predicate for the existing actual-cost source, commitment source/contract, forecast source and reviewed source/reviewer gates. Recheck normalized imports and direct calculate calls. Do not fabricate professional identity or authenticated approval.
4. Enforce existing integer1-90 horizon boundary during import/setup validation and calculate defensively without throwing. Preserve original invalid source and explain it or reject before replacement; do not silently replace it with14.
5. If lead clears the mandatory verification gate, apply scoped standalone and identical Lifecycle cost-engine fix, rebuild deterministic HTML and rerun all33 regressions plus focused negatives. No CPM/resources/tax/payment scope.

## Preserved behavior verified

Latest commitment snapshot only; cutoff exclusion; zero release; ETC includes commitments once; conflicts block EAC; invalid calendar dates and future reviews stay unavailable; orphan commitments and costs after task archive block financial totals. All independently rerun. No new baseline freeze/revision browser claim.

## Source boundaries

html/engine.mjs22-45 and validation/date helpers; html/app.js25,33-35. Lifecycle cost-engine.mjs is exact blob18013615a7bbc417183787acbb4ba3940d91ad51. No source/distribution/handover/ref changed. Builder inspected, not executed. Browser intentionally not run pending lead's gate clarification.
