---
document_id: FPJIS-HOSP-1100
title: Offline Property Edge and Synchronization Blueprint
status: Blueprint
created: 2026-10-07
---

# Offline, Property-Edge and Synchronization Blueprint

## Goal

A hotel must continue core on-property operations during internet loss.

Cloud connectivity improves distribution, remote access and centralization; it must not be the single point of failure for front desk, housekeeping, local F&B posting, engineering coordination and basic cashiering.

## Runtime Modes

### Mode A — Standalone Local

For small properties / validation:
- one local application runtime;
- local database;
- local attachments;
- export/backup;
- optional internet integrations.

Suitable for single/front-desk dominant operation.

### Mode B — Property Edge

Preferred for multi-terminal properties:
```text
Front Desk PWA
Housekeeping PWA
F&B PWA
Engineering PWA
        ↓ LAN
Property Edge Service
        ↓
Local Operational Database
        ↓
Local Backup
        ↓ optional internet
Cloud / Central / Providers
```

The property edge is the authoritative operational node while the property is offline.

### Mode C — Connected Multi-Property

```text
Property Edge A ─┐
Property Edge B ─┼→ Central Synchronization / Group Services
Property Edge C ─┘
                     ├→ Distribution Provider
                     ├→ Messaging
                     ├→ Central Analytics
                     └→ Remote Management
```

Property operation must degrade gracefully if central services fail.

## Local-First Capability Matrix

Must work locally where configured:
- reservation lookup;
- local reservation creation;
- room assignment;
- check-in/out;
- room state;
- housekeeping;
- guest request;
- local engineering concern;
- folio;
- local F&B;
- cashier;
- night audit, subject to unresolved external dependencies;
- local reports;
- audit;
- backup.

Internet-dependent:
- OTA/channel synchronization;
- hosted direct booking;
- external email/WhatsApp/SMS;
- online payment authorization;
- cloud accounting push;
- remote group dashboard;
- external ID/credit services;
- provider-hosted integrations.

Internet-dependent actions use explicit pending/failed states.

## Local Database Architecture

Implementation choice is deferred to execution package.

Requirements:
- ACID transactions for reservation/folio/payment critical paths;
- local concurrency for Mode B;
- indexed queries;
- migration support;
- backup/restore;
- immutable/auditable event support;
- attachment references;
- crash recovery.

Candidate technologies may include SQLite/PostgreSQL-compatible edge storage, but provider choice is not canonical.

## Client Storage

Client devices may cache:
- UI shell;
- bounded lookup/reference data;
- assigned tasks;
- offline drafts.

For multi-terminal Mode B, a browser's IndexedDB must not become the independent source of truth for shared reservations/folios.

## Property Edge Time

Property edge should provide trusted operational time for local transactions.

Controls:
- timezone;
- time drift warning;
- business date;
- NTP when available;
- manual time change audit.

## Sync Event

Fields:
- event_id;
- property;
- local_sequence;
- aggregate/revision;
- event_type;
- created_at;
- business_date;
- idempotency_key;
- payload/schema version;
- sync_status;
- retry_count;
- remote_ack;
- conflict reference.

## Outbox

Local external actions:
```text
Local Commit
→ Outbox Event
→ Connectivity Available
→ Authenticate
→ Send
→ Remote Ack
→ Mark Synced
```

Never mark synced before acknowledgement.

## Inbox

```text
External Event
→ Authenticate / Verify
→ Deduplicate
→ Validate Mapping
→ Check Local Revision
→ Apply or Conflict
→ Ack
```

## Conflict Classes

- Reservation date/room conflict
- Rate/restriction conflict
- Guest profile difference
- Duplicate guest candidate
- Folio posting conflict
- Payment reconciliation
- Room-state conflict
- Group allotment conflict

Resolution options depend on domain.

Material conflicts:
**Conflict — Review Required**

## Offline OTA Exposure

Local availability while disconnected cannot prove external channels have no new bookings.

Property policy may define:
- safety buffer;
- reduced walk-in/local sale;
- manager override;
- channel allotment segregation;
- forced stop-sell before known outage where possible.

UI displays:
- last distribution sync;
- estimated exposure;
- queued changes;
- risk flag.

## External Payment Outage

Where provider authorization is unavailable:
- do not fake approval;
- support configured fallback/tender policy;
- mark payment pending/unverified where allowed;
- reconcile after connectivity.

Do not store raw sensitive card credentials as a fallback.

## Communication Outage

Message becomes:
- Queued;
- Pending Internet;
- Failed;
- Sent;
- Delivered where provider supports.

No duplicate sends on retry.

## Backup

Minimum:
- scheduled local database backup;
- backup after/around business-date close when practical;
- manual export;
- checksum;
- retention policy;
- restore test;
- off-device copy option.

Frequency and retention depend on property risk/capacity and are selected during deployment design.

## Restore

Restore process verifies:
- app/schema compatibility;
- checksum;
- property identity;
- latest business date;
- event sequence;
- attachment consistency;
- queued integrations.

Restore into an active property requires authority and downtime/reconciliation procedure.

## Edge Failure

Recovery priorities:
1. protect current database/files;
2. avoid duplicate transactions;
3. activate approved recovery node/restore;
4. reconcile unacknowledged external events;
5. record outage/incident;
6. verify critical balances/reservations.

## Future Cloud Sync

Cloud is an adapter/replica/coordinator depending on approved architecture.

Do not redesign core entity IDs when cloud is introduced.

## Acceptance

- internet can be disabled without losing core local hotel operation;
- reconnection does not duplicate bookings/charges;
- backup restores;
- stale external state visible;
- time/business-date consistent;
- multi-terminal critical records have one local authority.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
