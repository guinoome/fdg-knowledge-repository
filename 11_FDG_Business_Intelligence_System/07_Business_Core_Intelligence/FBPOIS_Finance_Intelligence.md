---
title: FBPOIS Finance Intelligence
aliases:
  - FDG Business Finance Intelligence
  - Shared Finance Intelligence
status: Active
date: 2026-09-29
scope:
  - FBIS
  - FBPOIS
  - FDG Business Platform
  - Shared Business Services
---

# FBPOIS Finance Intelligence

[[07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07 Business Core Intelligence Master Index]]
[[08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG Receipt & Expense Intelligence]]

## Purpose

Define the reusable finance-intelligence layer shared by all FDG Business Platform modules and branches.

This is not a vertical-specific feature. It is a cross-platform capability that can be used by:

- Fuel Operations
- Restaurant
- Sari-Sari Store
- Tire Shop
- Bakery
- Pickleball Court
- Trucking & Logistics
- Bus / Taxi / Car Rental
- future FBPOIS business modules

## Core Principle

> Capture once, verify once, reuse across finance and operations.

Finance records should remain traceable to source evidence.

## Shared Finance Flow

Receipt / Invoice / Expense Evidence
→ Receipt & Expense Intelligence
→ Verified Expense Record
→ Supplier / Merchant
→ Purchasing / Accounts Payable
→ Payment
→ Chart of Accounts / General Ledger
→ Cost Center / Branch / Project
→ Business Profitability

## Shared Capabilities

- expense capture
- receipt/invoice evidence
- supplier matching
- tax/VAT classification where configured
- expense classification
- duplicate detection
- payment-method capture
- branch/project/cost-center allocation
- approval state
- audit trail
- bookkeeping integration
- reporting/profitability integration

## Related Intelligence

- [[07_Business_Core_Intelligence/Payment_Intelligence|Payment Intelligence]]
- [[07_Business_Core_Intelligence/Payment_Data_Model|Payment Data Model]]
- [[08_Business_Operating_System/Payment_Operations|Payment Operations]]
- [[08_Business_Operating_System/Order_Transaction_Intelligence|Order Transaction Intelligence]]
- [[08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG Receipt & Expense Intelligence]]

## Authority Rule

OCR, rules, and AI may assist extraction and classification, but financial records become authoritative only through configured validation / approval rules.

> OCR extracts. Rules classify. Authorized workflow verifies. Evidence remains linked.


---

## 2026-09-30 wikilink navigation update

The original references above remain as historical text. The following observed current paths resolve the listed system-relative or archived/current basename ambiguities at review commit `392c1e29a78f91f9824096ce3552e3ad990e72e2`. These are navigation corrections, not new approval claims.

- `07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index` → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07_Business_Core_Intelligence_Master_Index]]
- `08_Business_Operating_System/FDG_Receipt_Expense_Intelligence` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG_Receipt_Expense_Intelligence]]
- `07_Business_Core_Intelligence/Payment_Intelligence` → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Payment_Intelligence|Payment_Intelligence]]
- `07_Business_Core_Intelligence/Payment_Data_Model` → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/Payment_Data_Model|Payment_Data_Model]]
- `08_Business_Operating_System/Payment_Operations` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/Payment_Operations|Payment_Operations]]
- `08_Business_Operating_System/Order_Transaction_Intelligence` → [[11_FDG_Business_Intelligence_System/08_Business_Operating_System/Order_Transaction_Intelligence|Order_Transaction_Intelligence]]

Evidence and remaining candidates: [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|architecture-critical review]].
