---
document_id: FPJIS-HOSP-1600
title: Hospitality Local First Release and Deployment Gates
status: Mandatory Project Gate Blueprint
created: 2026-10-07
---

# Local-First Release and Deployment Gates

## Governing Lesson

Do not repeat the premature-deployment pattern experienced in other FDG projects.

For Hospitality:
> **The hotel must be proven locally before cloud hosting, OTA production credentials or live payments are connected.**

## Gate Sequence

### H0 — Opportunity / Product Intent
Blueprint only.

### H1 — Architecture Qualified
Boundaries/reuse decided.

### H2 — Blueprint Ready
This package reviewed.

### H3 — Build Authorized
Explicit founder/authority record required.

### H4 — Local Domain Kernel
Property/room/reservation/folio states working locally.

### H5 — Local Operational Vertical Slice
Synthetic booking→stay→checkout works.

### H6 — Property Edge Validated
Multi-terminal/local-LAN behavior and backup pass.

### H7 — Local Resilience Accepted
Offline, restart, reconciliation stubs, night audit pass.

### H8 — Release Candidate
Exact commit/build/schema/known limitations packaged.

### H9 — Optional Staging
Only integrations needing remote environment.

### H10 — Production Authorization
Separate decision.

### H11 — Controlled Pilot Property
Limited real operating scope with rollback/parallel control.

### H12 — Production Expansion
Only after pilot evidence.

## No Cloud Before Local Vertical Slice

Do not create:
- production Supabase;
- production Vercel deployment;
- live OTA credentials;
- live payment credentials;
- guest messaging production integration

to unblock local implementation.

Use:
- local services;
- simulators;
- mocks/stubs;
- sandbox where remote testing is uniquely required later.

## Release Candidate Manifest

Must include:
- release ID;
- exact commit SHA;
- application version;
- schema version;
- knowledge/rule bundle version;
- property configuration version;
- tests;
- known defects;
- security review;
- backup/restore result;
- rollback;
- deployment target.

## Deployment Lock

Recommended default:
```text
ALLOW_REMOTE_DEPLOY=false
ALLOW_PRODUCTION_CONNECTORS=false
ENVIRONMENT=local
```

Production workflow verifies signed/approved release metadata.

Push to main is not production authorization.

## Staging Justification

Use staging only for:
- webhook;
- OTA/channel sandbox;
- payment sandbox;
- remote auth;
- hosted booking engine;
- email/WhatsApp deliverability;
- TLS/domain;
- remote sync;
- cloud tenancy/security.

Do not use staging for ordinary CRUD/UI debugging.

## Pilot Property Gate

Before live-property pilot:
- agreed scope;
- data classification;
- named users;
- local backup;
- rollback/manual continuity;
- support contact;
- training;
- outage procedure;
- finance/payment boundary;
- reservation migration/cutover plan;
- integration scope;
- parallel/manual verification plan;
- acceptance owner.

## Migration Gate

If importing existing reservations/guests:
- source mapped;
- dry run;
- duplicate strategy;
- validation counts/totals;
- cutover freeze;
- rollback;
- archived source;
- privacy authority.

## Live OTA Gate

Before live distribution:
- mapping signed off;
- test reservations;
- modifications;
- cancellations;
- duplicate events;
- availability/rate roundtrip;
- stale/outage behavior;
- overbooking policy;
- reconciliation;
- emergency disconnect/stop-sell.

## Live Payment Gate

Before live payment:
- provider approval;
- tokenization;
- idempotency;
- settlement reconciliation;
- refunds;
- disputes/chargebacks where applicable;
- secret management;
- audit;
- accounting interface.

## Cost Gate

Document:
- hardware/edge cost;
- cloud cost;
- database/storage;
- channel-manager fees;
- payment fees;
- messaging;
- backup;
- support/monitoring;
- domain/certificates;
- subscription risks.

Cost assumptions must not silently become permanent architecture.

## Production Monitoring

Minimum:
- edge/service health;
- backup;
- sync lag;
- channel health;
- payment failures;
- night-audit completion;
- storage;
- auth failures;
- error rate;
- business-date status.

## Rollback

Production release must define:
- previous known-good version;
- schema rollback/forward-fix;
- data backup;
- connector shutdown;
- local/manual operating procedure;
- communication;
- reconciliation.

## Emergency Offline Mode

A remote outage should not force checkout/front desk to stop.

Emergency mode remains governed by [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/11_Offline_Property_Edge_and_Synchronization_Blueprint|Offline Property Edge Blueprint]].

## Production Status Vocabulary

- Local Development
- Local Validated
- Release Candidate
- Staging
- Pilot Property
- Production Limited
- Production
- Degraded
- Rolled Back
- Suspended

Do not label prototype/demo as production.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
