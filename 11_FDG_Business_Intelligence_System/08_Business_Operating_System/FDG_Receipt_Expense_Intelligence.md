---
title: FDG Receipt & Expense Intelligence
aliases:
  - Receipt Expense Intelligence
  - Shared Receipt Intelligence
status: Active
date: 2026-09-29
scope:
  - FBIS
  - FBPOIS
  - FDG Business Platform
  - All Business Modules
---

# FDG Receipt & Expense Intelligence

[[08_Business_Operating_System/08_Business_Operating_System_Master_Index|08 Business Operating System Master Index]]
[[07_Business_Core_Intelligence/FBPOIS_Finance_Intelligence|FBPOIS Finance Intelligence]]

## Purpose

Create one reusable receipt-to-bookkeeping capability for the entire FDG Business Platform.

Do not rebuild receipt scanning separately for every vertical.

## Standard Workflow

Capture / Upload Receipt
→ Image Quality Check
→ OCR / Document Understanding
→ Extract Proposed Fields
→ Business Context
→ Expense Classification
→ Duplicate Detection
→ Confidence / Validation
→ Human Review when required
→ Approved Expense Record
→ Original Receipt retained as evidence
→ Bookkeeping / Finance Integration

## Proposed Extracted Fields

- supplier / merchant
- transaction date / time
- receipt / invoice number
- gross amount
- tax/VAT status where configured
- tax amount
- line items where practical
- payment method
- currency
- branch / site
- business module
- project / cost center when applicable

## Business Context

Every approved record should be scoped to:

- organization
- business module
- branch / site
- user
- source document
- timestamp
- approval state

## Mobile UX

Primary interaction:

> Snap Receipt → Review Extracted Data → Confirm → Recorded

Do not force a long accounting form when extraction confidence is high and required fields are complete.

If confidence is low or key fields conflict, route to review.

## Future Extensions

- invoice / official receipt capture
- recurring expense recognition
- supplier matching
- duplicate receipt detection
- petty cash reconciliation
- reimbursement
- purchasing / AP matching
- expense-policy warnings
- line-item classification
- automated branch / project allocation
- bookkeeping automation
- cross-module profitability analysis

## Marketing Integrity

Do not claim a specific extraction accuracy or capture speed until measured by FDG.

Internal performance targets may exist, but public claims require evidence.

## Related Notes

- [[08_Business_Operating_System/Receipt_OCR_and_Verification_Workflow|Receipt OCR and Verification Workflow]]
- [[08_Business_Operating_System/Expense_Evidence_and_Audit_Trail_Standard|Expense Evidence and Audit Trail Standard]]
- [[08_Business_Operating_System/Receipt_Storage_and_Synchronization_Architecture|Receipt Storage and Synchronization Architecture]]
- [[07_Business_Core_Intelligence/FBPOIS_Finance_Intelligence|FBPOIS Finance Intelligence]]


---

## 2026-09-30 wikilink navigation update

The original references above remain as historical text. The following observed current paths resolve the listed system-relative or archived/current basename ambiguities at review commit `392c1e29a78f91f9824096ce3552e3ad990e72e2`. These are navigation corrections, not new approval claims.

- `08_Business_Operating_System/08_Business_Operating_System_Master_Index` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/08_Business_Operating_System_Master_Index|08_Business_Operating_System_Master_Index]]
- `07_Business_Core_Intelligence/FBPOIS_Finance_Intelligence` → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/FBPOIS_Finance_Intelligence|FBPOIS_Finance_Intelligence]]
- `08_Business_Operating_System/Receipt_OCR_and_Verification_Workflow` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/Receipt_OCR_and_Verification_Workflow|Receipt_OCR_and_Verification_Workflow]]
- `08_Business_Operating_System/Expense_Evidence_and_Audit_Trail_Standard` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/Expense_Evidence_and_Audit_Trail_Standard|Expense_Evidence_and_Audit_Trail_Standard]]
- `08_Business_Operating_System/Receipt_Storage_and_Synchronization_Architecture` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/Receipt_Storage_and_Synchronization_Architecture|Receipt_Storage_and_Synchronization_Architecture]]

Evidence and remaining candidates: [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|architecture-critical review]].
