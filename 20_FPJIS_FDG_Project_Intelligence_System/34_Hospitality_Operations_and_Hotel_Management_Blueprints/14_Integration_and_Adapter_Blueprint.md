---
document_id: FPJIS-HOSP-1400
title: Hospitality Integration and Adapter Blueprint
status: Blueprint
created: 2026-10-07
---

# Integration and Adapter Blueprint

## Principle

FDG owns capability contracts; providers are replaceable adapters.

```text
Hospitality Domain
→ FDG Integration Contract
→ Adapter
→ External Provider
```

No provider SDK should become the domain model.

## Integration Categories

### Distribution
- channel manager;
- OTA;
- CRS;
- GDS candidate.

### Direct Sales
- booking engine;
- website/CMS;
- promo/campaign.

### Payment
- gateway;
- QR;
- terminal;
- bank/e-wallet.

### Communication
- email;
- WhatsApp;
- SMS;
- push.

### Finance / Accounting
- accounting system;
- ERP;
- export/XML/API;
- Philippine finance/tax systems where applicable.

### F&B / POS
If a separate POS exists:
- outlet order;
- room charge;
- payment;
- item/revenue summary.

### Door Lock / Access
Future:
- issue/revoke room credential;
- keycard/mobile key;
- lock audit.

### ID / Registration
Future document/identity reader.

### Revenue Management
- demand forecast;
- recommendation;
- rate publish after approval.

### Payroll / People
- employee;
- department;
- schedule/attendance reference;
- cost allocation.

### Engineering / BMS / IoT
- room/environment signal;
- asset alarm;
- energy/utilities.

Engineering truth remains FBPOIS/FEIS.

### Regulatory / Government
Only through approved jurisdiction-specific interfaces.

## Adapter Contract

Every adapter defines:
- provider;
- capability;
- auth;
- endpoint/version;
- inbound/outbound schemas;
- mapping;
- idempotency;
- retry;
- timeout;
- error classes;
- rate limits;
- webhook verification;
- reconciliation;
- health;
- fallback;
- data classification;
- test/sandbox.

## Integration State

- Not Configured
- Configuring
- Healthy
- Degraded
- Stale
- Failed
- Disabled
- Credential Expired
- Reconciliation Required

## Credential Rule

Store secret references, not plaintext secrets in repository, blueprint or logs.

## Webhook

Inbound webhook:
```text
Receive
→ Verify Signature/Auth
→ Timestamp/Replay Check
→ Deduplicate
→ Validate Schema
→ Persist Raw Evidence Reference
→ Map
→ Apply Domain Command
→ Ack
```

## Retry

Retry only idempotent/safely designed actions.

Payment/refund, reservation and folio-posting retries require idempotency keys.

## Reconciliation

Every external system with financial/reservation effect requires reconciliation.

Examples:
- OTA reservations vs internal;
- payment settlement vs recorded payment;
- outlet orders vs folio postings;
- accounting export vs accepted batch;
- message send vs provider result.

## Provider Failure

The UI must show:
- last successful interaction;
- backlog;
- impacted workflows;
- fallback;
- risk.

## Capability Selection

Before integration ask:
1. Can existing provider solve it?
2. Can a standard file/export solve it?
3. Is API needed?
4. Is direct integration worth support burden?
5. Is provider replaceable?
6. What happens offline?
7. What is failure/reconciliation process?

## Exceed/Tally Lesson

The benchmark's Tally/XML interface illustrates a valid pattern: operational PMS exports/feeds financial systems without forcing the PMS to become the entire accounting authority.

FDG should implement generic finance integration contracts; provider-specific Tally/XML is optional and market-driven.

## API Boundary

Future external API should expose governed resources/commands rather than direct DB tables.

Examples:
- GET availability;
- POST reservation;
- POST guest request;
- POST folio charge;
- GET room readiness;
- POST payment reference;
- GET reports.

Authorization and idempotency required.

## Acceptance

No integration is “done” until:
- happy path;
- duplicate;
- delay;
- provider error;
- credential expiry;
- timeout;
- reconciliation;
- offline/degraded behavior;
- audit

are tested.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
