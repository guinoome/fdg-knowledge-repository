---
document_id: FPJIS-HOSP-0500
title: Folio Billing Payment and Night Audit Blueprint
status: Blueprint
created: 2026-10-07
---

# Folio, Billing, Payment and Night Audit Blueprint

## Core Separation

A guest folio is an operational hospitality account.

It is not automatically:
- a statutory invoice;
- an official receipt;
- an accounting journal;
- tax filing truth.

FBIS/Finance/FLIS determine the applicable commercial/accounting/tax interfaces.

## Folio Types

- guest folio;
- master/group folio;
- company/corporate folio;
- event/banquet folio;
- house account;
- deposit ledger reference.

## Folio Line

Minimum:
- folio_line_id;
- folio_id;
- service_date;
- posting_date/time;
- source;
- source_transaction_id;
- outlet/department;
- product/service;
- description;
- quantity;
- unit price;
- tax profile reference;
- discount/allowance;
- gross;
- net;
- currency;
- status;
- posted_by;
- evidence/provenance.

## Charge Sources

- room/night charge;
- restaurant/bar;
- minibar;
- laundry;
- spa;
- transport;
- activity;
- banquet;
- miscellaneous approved service;
- fee/penalty where authorized;
- adjustment.

Every external/outlet charge should retain its source transaction ID.

## Split Folio / Windows

Support:
- guest personal;
- company;
- travel agent;
- package inclusion;
- incidentals;
- roommate split;
- percentage/fixed allocation where authorized.

Billing instruction is explicit and versioned.

## Deposit

Deposit states:
- Required
- Requested
- Pending
- Received
- Verified
- Allocated
- Partially Used
- Refunded
- Forfeiture Review
- Reversed

Deposit financial treatment remains under finance/accounting authority.

## Payment

Support provider-neutral methods:
- cash;
- card;
- bank;
- QR/e-wallet;
- room/account transfer;
- other approved.

Payment record:
- amount;
- currency;
- method;
- reference;
- tendered;
- change where relevant;
- status;
- verifier;
- allocation;
- cashier;
- source/evidence.

## Void / Reversal / Refund

Never delete a financial transaction to “fix” it.

Use:
```text
Original Transaction
→ Void/Reversal/Refund Record
→ Reason
→ Authority
→ Evidence
→ Reconciliation
```

## Discount / Allowance

Fields:
- rule/authority;
- amount/%;
- reason;
- requester;
- approver;
- guest/service recovery link if applicable.

## Cashier Session

- opening;
- user;
- terminal/location;
- opening float;
- transactions;
- paid-outs if permitted;
- expected;
- actual count;
- variance;
- close;
- reviewer.

## Business Date

Hotel business date is explicit and may differ from wall-clock date around night audit.

Every operational transaction must record:
- timestamp with timezone;
- business_date.

Do not infer business date from date(timestamp) after close.

## Night Audit Purpose

Night audit closes one property business date into the next while preserving unresolved exceptions.

It is not merely a “generate report” button.

## Night Audit Prechecks

Potential blockers/warnings:
- unprocessed arrivals;
- unresolved no-show candidates;
- due-out guests still in house;
- folios with invalid/negative/unexplained balance;
- failed outlet postings;
- open cashier sessions;
- room occupancy discrepancy;
- room/guest mismatch;
- unapplied deposit;
- pending payment verification;
- incomplete room-charge posting;
- failed channel reservation import;
- system time/business-date inconsistency.

Blocking policy is configurable and auditable.

## Night Audit Flow

```text
Precheck
→ Resolve / Accept Authorized Exceptions
→ Post Scheduled Room Charges
→ Process No-Show / Package Rules
→ Recalculate Folios
→ Validate Cashier/Payment Summaries
→ Generate Daily Operational Snapshot
→ Create Financial Posting Interface Batch
→ Close Business Date
→ Open Next Business Date
→ Archive Audit Evidence
```

## Idempotency

Night audit must be safely retryable.

Each run has:
- run_id;
- property;
- business_date;
- status;
- started_by;
- steps;
- posting IDs;
- completion;
- errors.

Duplicate runs must not double-post room revenue.

## Financial Interface

Preferred:
```text
Hospitality Transactions
→ Daily Revenue / Payment / Liability Summary
→ Controlled Finance Interface
→ Accounting Review / Posting
```

Do not hard-code chart-of-account logic into room/front-office workflows.

## Tax / Invoice

India-specific GST/CGST/SGST references from Exceed are not adopted.

Use:
- property/entity tax profile;
- effective-dated tax rule;
- invoice/receipt authority;
- official document adapter;
- jurisdiction pack.

Philippine-specific implementation requires FBIS/FLIS validation at build time.

## Acceptance

Checkout/close must never silently lose:
- unposted charges;
- deposit;
- refund;
- payment;
- company billing;
- source transaction lineage.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
