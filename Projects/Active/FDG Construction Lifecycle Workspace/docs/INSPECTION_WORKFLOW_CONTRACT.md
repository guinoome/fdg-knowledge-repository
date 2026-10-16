# Inspection workflow source contract — FDG-QA-1

Scope: optional guided offline workflow over existing version1 QAQC/NCR/Issues. Names/authority references are unverified declarations; this is not identity, permissions or engineering acceptance.

| Record | Stored source / role |
|---|---|
| QAQC Field inspection finding | Original observation/date/work/inspector/evidence; no acceptance assigned |
| NCR | source_ref = FDG-QA-1 \| Inspection record: {inspection_id}; planned corrective action/owner/due; evidence_ref retains finding evidence |
| Issues, optional | Same source_ref; user classification/impact_basis priority rationale; next_action = Follow corrective record {NCR id} |
| QAQC Corrective work submission | source_ref = FDG-QA-1 \| Repair submission for NCR: {id}; observed repair/person/date/evidence; Requested state |
| QAQC Corrective reinspection | source_ref has3 lines: FDG-QA-1 \| Reinspection of NCR: {id}; Repair record: {submission id}; Authority reference: {user reference}. Actual method/criterion/result/evidence/reviewer/date; Passed or Failed |
| NCR verification_ref | Exact reinspection ID; never a photo-based inferred acceptance |

Managed references are exact, reserved and versioned. Untagged generic records are not automatically owned or migrated. Duplicate/missing/archived sources invalidate managed closeout; the latest repair and decision must support closure. The source string must fit6000 characters before save; oversized authority trace is rejected rather than silently truncated on recovery.

On pass, guarded NCR closure and its matching linked Issue share the recorded decision. On fail, correction remains open. Original finding/repair/reinspection observations remain separate records. A later invalid imported closeout is flagged in quality summary and attention; it is not silently rewritten. Advanced source editing remains available, subject to managed closure/link guards. Entire files remain editable outside the app.

No state from this workflow promotes reported/physical/QA accepted/billable/billed/paid Daily quantities. Evidence originals stay in the user's controlled store; optional context/detail/identification photo guidance confers no verification. Engine changes and this contract require compatible tests; no new backend or dependency is implied.
