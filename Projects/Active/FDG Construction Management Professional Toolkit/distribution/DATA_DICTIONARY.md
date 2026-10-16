# Data dictionary and migration mapping

FDG-CMT-PH 1.0.0-rc.1. One project per workbook. IDs are stable text; dates are ISO yyyy-mm-dd; quantities carry the WBS unit. No mixed-unit aggregation. Currency fields are PHP. Blank means unknown/not entered; zero is a numeric observation.

Input CSV columns match the workbook field order with computed columns removed. Blank CSVs contain only headers. Sample CSVs contain synthetic inputs. No automatic CSV import, sync or conflict merge exists. Do not paste untrusted formula-prefixed text into Excel; import identifiers as text. Maintain record IDs and source references through future migrations.

Common states: Draft, Submitted, In Review, Accepted, Rejected, Superseded, Conflict - Review Required. Issues/Punch: Open, In Progress, Ready for Verification, Closed, Conflict - Review Required. Turnover: Pending, Submitted, In Review, Accepted, Conflict - Review Required. Evidence verification is a manual declaration, not authenticated evidence. Required real-world review cannot be enforced in an editable spreadsheet.

## WBS — Work breakdown and progress basis

| Field | Type | Entry / calculation |
|---|---|---|
| wbs_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| activity | text | User input; preserve source and review basis |
| unit | text | User input; preserve source and review basis |
| baseline_qty | number; blank if unknown | User input; preserve source and review basis |
| weight | number; blank if unknown | User input; preserve source and review basis |
| planned_fraction | number; blank if unknown | User input; preserve source and review basis |
| accepted_events | text | Calculated; preserve formula |
| accepted_qty | number; blank if unknown | Calculated; preserve formula |
| accepted_fraction | number; blank if unknown | Calculated; preserve formula |
| weighted_actual | number; blank if unknown | Calculated; preserve formula |
| weighted_plan | number; blank if unknown | Calculated; preserve formula |
| owner | text | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |
| basis_check | text | Calculated; preserve formula |

## Daily — Daily site progress

| Field | Type | Entry / calculation |
|---|---|---|
| event_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| event_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| unit | text | User input; preserve source and review basis |
| reported_qty | number; blank if unknown | User input; preserve source and review basis |
| accepted_qty | number; blank if unknown | User input; preserve source and review basis |
| review_state | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| prepared_by | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |
| evidence_check | text | Calculated; preserve formula |
| unit_check | text | Calculated; preserve formula |
| quantity_check | text | Calculated; preserve formula |

## Kickoff — Project startup and kickoff

| Field | Type | Entry / calculation |
|---|---|---|
| item_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| item | text | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## RFI — Request for information register

| Field | Type | Entry / calculation |
|---|---|---|
| rfi_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| subject | text | User input; preserve source and review basis |
| raised_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| response_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |
| next_action | text | User input; preserve source and review basis |

## Submittals — Submittal register

| Field | Type | Entry / calculation |
|---|---|---|
| submittal_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| document_title | text | User input; preserve source and review basis |
| document_revision | number; blank if unknown | User input; preserve source and review basis |
| submitted_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| response_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Issues — Issues, constraints and delays

| Field | Type | Entry / calculation |
|---|---|---|
| issue_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| category | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| observed_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| impact_basis | text | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| next_action | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## QAQC — QA/QC status register

| Field | Type | Entry / calculation |
|---|---|---|
| inspection_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| record_type | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| method_standard_ref | text | User input; preserve source and review basis |
| acceptance_criterion | text | User input; preserve source and review basis |
| observed_result | text | User input; preserve source and review basis |
| inspection_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Changes — Variation and change register

| Field | Type | Entry / calculation |
|---|---|---|
| change_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| cause | text | User input; preserve source and review basis |
| notice_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| cost_impact_php | number; blank if unknown | User input; preserve source and review basis |
| time_impact_days | number; blank if unknown | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| authorization_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Billing — Progress billing evidence index

| Field | Type | Entry / calculation |
|---|---|---|
| billing_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| unit | text | User input; preserve source and review basis |
| reported_qty | number; blank if unknown | User input; preserve source and review basis |
| accepted_qty | number; blank if unknown | User input; preserve source and review basis |
| billable_qty | number; blank if unknown | User input; preserve source and review basis |
| billed_qty | number; blank if unknown | User input; preserve source and review basis |
| paid_qty | number; blank if unknown | User input; preserve source and review basis |
| unit_rate_php | number; blank if unknown | User input; preserve source and review basis |
| billable_authority_ref | text | User input; preserve source and review basis |
| billing_ref | text | User input; preserve source and review basis |
| payment_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Punch — Punch list

| Field | Type | Entry / calculation |
|---|---|---|
| punch_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| location | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| responsible_trade | text | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| closure_evidence_ref | text | User input; preserve source and review basis |
| verified_by | text | User input; preserve source and review basis |
| verification_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Turnover — Turnover and closeout tracker

| Field | Type | Entry / calculation |
|---|---|---|
| turnover_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| wbs_id | text | User input; preserve source and review basis |
| deliverable_type | text | User input; preserve source and review basis |
| description | text | User input; preserve source and review basis |
| responsibility_receiver | text | User input; preserve source and review basis |
| owner | text | User input; preserve source and review basis |
| due_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| status | text | User input; preserve source and review basis |
| blocking_issue_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |
| reviewer | text | User input; preserve source and review basis |
| review_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## Evidence — Evidence index

| Field | Type | Entry / calculation |
|---|---|---|
| evidence_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| record_type | text | User input; preserve source and review basis |
| origin | text | User input; preserve source and review basis |
| locator | text | User input; preserve source and review basis |
| captured_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| captured_by | text | User input; preserve source and review basis |
| checksum | text | User input; preserve source and review basis |
| access_class | text | User input; preserve source and review basis |
| verification_status | text | User input; preserve source and review basis |
| revision | number; blank if unknown | User input; preserve source and review basis |
| source_ref | text | User input; preserve source and review basis |

## History — Revision and decision log

| Field | Type | Entry / calculation |
|---|---|---|
| history_id | text | User input; preserve source and review basis |
| project_id | text | User input; preserve source and review basis |
| target_record_id | text | User input; preserve source and review basis |
| prior_revision | number; blank if unknown | User input; preserve source and review basis |
| new_revision | number; blank if unknown | User input; preserve source and review basis |
| change_reason | text | User input; preserve source and review basis |
| actor | text | User input; preserve source and review basis |
| occurred_date | date (ISO yyyy-mm-dd) | User input; preserve source and review basis |
| decision_ref | text | User input; preserve source and review basis |
| evidence_ref | text | User input; preserve source and review basis |

## Relationship and review rules

project_id must equal Setup project ID. wbs_id references WBS within the same project. Daily event_id must be unique within project; duplicates are excluded from accepted calculations. Other register IDs must be unique by the document-control process; the workbook does not automatically validate their uniqueness. Evidence references point to Evidence IDs or a private approved source; semicolon-separated references are descriptive and are not an enforced relational link. History target_record_id references an unchanged stable record ID. Records are never silently merged by the toolkit.

Weights and planned_fraction use fractions 0–1. accepted_fraction and weighted values are computed; accepted quantities are not capped at baseline. Review state, reviewer, review date and evidence are separate fields. Billing reported/accepted/billable/billed/paid quantities remain distinct manual facts. QA/QC method and acceptance criteria must be established for the actual project. No technical limits are inferred from a sample.
