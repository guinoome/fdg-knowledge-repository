# Procurement/materials work package —2026-10-16

## Objective and scope

User requested other construction projects after asking for beginner-friendly, low-input/high-output tools. A bounded procurement/materials tool was selected from FEIS-CM-0100 and FEIS-QTO-0006 while an optional next-area question remained unanswered. This is an offline focused toolkit milestone; no broader cloud platform, messaging, payment, deployment or commercial launch.

GitHub `guinoome/fdg-knowledge-repository` is canonical. Baseline `33bf06a823b10b282313e2c40f91db21fcddcb5c`. Owned changes: this new project plus additive links in Projects_Master_Index and the lifecycle README. No local project checkout or deliverables.

## Design decision

Reuse existing premium construction CSS and native HTML/JS patterns. New pure materials engine is necessary because the lifecycle registers contain snapshots, not a validated receipt/issue/return inventory ledger. Keep it separate and testable; no new package or runtime dependency.

Model:
- material: stable ID/name/unit, optional required quantity/need-by date, revision and immutable imported source snapshot;
- order: stable item reference, quantity/unit, supplier/date/due, optional rate/reference;
- movement: immutable source event/type/quantity/unit/date/order link;
- correction: reasoned void; original record retained;
- report: projection at fixed project cutoff.

Recorded stock = opening + received − issued + site returns − supplier returns.
Net issued = issues − site returns.
Open order = max(0, ordered − linked receipts + linked supplier returns).
Still to order = max(0, project requirement − opening − net supplier receipts − open orders).

Full-project requirement is not replenished merely because material was issued. Different materials/units are never combined. Unlinked deliveries do not close an order. Overdelivery is retained and visible. Unknown requirements/prices/stock remain unknown; an explicit zero opening count is known.

## Integrity / import

Backdated changes must not create a negative historical balance; site returns cannot exceed prior issues; linked supplier returns cannot precede/exceed their receipts. Unit changes are blocked after transactions. Corrections cannot orphan dependent records. Aggregate number overflow is rejected.

Own backup import replaces data only after preview/confirmation. Lifecycle procurement import maps draft demand only and retains source IDs/revisions/WBS/full row, with no automatic orders, receipts, progress or approvals. Original demand snapshot is not overwritten when the working target changes. No live two-way synchronization is claimed.

## Validation and limitations

67 engine checks and browser evidence in evidence/validation.json. Fresh browser pages are required when loading a new generated script; reusing setContent on the same JavaScript global caused a QA-harness redeclaration error and was corrected by using a fresh page. Final application runs had zero observed page/console/network errors.

Independent provider, real user, native filesystem save and capacity acceptance remain pending. Browser plugin/skill absent; existing Playwright and installed Chrome used without installations. No local artifact output. No authenticated review/authority claim.

## Next candidates

QA/QC inspection and punch-list workflow; testing/commissioning and turnover evidence pack. These remain candidate work packages, not completed deliverables. The next action for this module is a storekeeper/planner acceptance run and reconciliation to source receipts/issue slips.
