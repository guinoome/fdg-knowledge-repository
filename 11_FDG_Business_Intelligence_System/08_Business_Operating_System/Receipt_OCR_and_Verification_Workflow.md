---
title: Receipt OCR and Verification Workflow
status: Active
date: 2026-09-29
---

# Receipt OCR and Verification Workflow

[[08_Business_Operating_System/08_Business_Operating_System_Master_Index|08 Business Operating System Master Index]]
[[08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG Receipt & Expense Intelligence]]

## Workflow

1. Capture photo or upload receipt/invoice.
2. Validate image quality.
3. Run OCR / document understanding.
4. Extract proposed structured fields.
5. Match supplier / merchant when possible.
6. Classify expense using rules and approved mappings.
7. Detect likely duplicate documents.
8. Calculate confidence per important field.
9. Present only uncertain / missing items for user correction.
10. User or authorized role confirms.
11. Create approved expense record according to permission rules.
12. Link original source document permanently.
13. Pass approved record to finance / bookkeeping integrations.

## Verification States

- Captured
- Extracted
- Review Required
- Verified
- Approved
- Rejected
- Superseded

## Confidence Rule

Low-confidence or conflicting fields must not silently become authoritative finance data.

Examples requiring review:

- unreadable total
- conflicting dates
- uncertain supplier
- duplicate invoice number
- ambiguous tax classification
- line-item total does not reconcile to receipt total

## AI Rule

AI assistance may:

- improve OCR interpretation
- propose category
- summarize receipt
- suggest supplier match
- explain confidence issues

AI must not silently approve the record.


---

## 2026-09-30 wikilink navigation update

The original references above remain as historical text. The following observed current paths resolve the listed system-relative or archived/current basename ambiguities at review commit `392c1e29a78f91f9824096ce3552e3ad990e72e2`. These are navigation corrections, not new approval claims.

- `08_Business_Operating_System/08_Business_Operating_System_Master_Index` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/08_Business_Operating_System_Master_Index|08_Business_Operating_System_Master_Index]]
- `08_Business_Operating_System/FDG_Receipt_Expense_Intelligence` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG_Receipt_Expense_Intelligence]]

Evidence and remaining candidates: [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|architecture-critical review]].
