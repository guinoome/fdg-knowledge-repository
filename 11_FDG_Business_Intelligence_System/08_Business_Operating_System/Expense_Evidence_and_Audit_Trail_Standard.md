---
title: Expense Evidence and Audit Trail Standard
status: Active
date: 2026-09-29
---

# Expense Evidence and Audit Trail Standard

[[08_Business_Operating_System/08_Business_Operating_System_Master_Index|08 Business Operating System Master Index]]
[[08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG Receipt & Expense Intelligence]]

## Principle

Every expense/bookkeeping record created from a receipt or invoice must remain traceable to its source evidence and review history.

## Minimum Audit Fields

- record ID
- organization
- module
- branch / site
- source document ID
- source file hash or stable reference where supported
- captured by
- captured at
- extracted values
- confidence values
- corrections made
- corrected by
- approved by
- approved at
- category / account mapping
- payment method
- supplier / merchant
- amount
- tax classification where configured
- sync state
- revision / supersession link

## Evidence Rule

Do not discard the original receipt image after OCR.

The approved structured record and source evidence must remain linked.

## Correction Rule

Corrections should create traceable revisions or audit events rather than silently overwriting the history.

## Duplicate Rule

Potential duplicates should be flagged using combinations such as:

- supplier
- receipt / invoice number
- date
- amount
- branch
- image hash / similarity

Duplicate detection may warn; authorized users decide according to workflow.

## Trust States

- Verified
- Pending Review
- Untrusted
- Rejected
- Superseded

Financial reports should respect the configured trust state.
