---
document_id: FPJIS-HOSP-0800
title: Distribution Channel Manager and Booking Engine Blueprint
status: Blueprint
created: 2026-10-07
---

# Distribution, Channel Manager and Booking Engine Blueprint

## Principle

FDG should own hotel distribution semantics and adapter contracts, not attempt to build and certify hundreds of OTA integrations as the initial product.

## Architecture

```text
Hospitality Availability / Rates / Restrictions
        ↓
Distribution Service
        ↓
Provider-Neutral Adapter
        ├─ Channel Manager Provider
        ├─ Direct OTA Adapter where justified
        ├─ Central Reservation System
        └─ Direct Booking Engine
```

## Benchmark Context

Exceed currently advertises 200+ OTA/channel integrations. This is a competitive benchmark, not an FDG requirement.

FDG v1 should prove:
- one distribution contract;
- reliable mapping;
- reservation ingest;
- rate/availability/restriction publish;
- reconciliation;
- provider replacement.

## Channel Entity

- channel_id;
- name;
- provider;
- property mapping;
- credential reference;
- connection status;
- last_success_at;
- last_error_at;
- health;
- active/inactive.

## Mapping

Explicit mapping required:
- FDG property ↔ external property;
- room type ↔ external room type;
- rate plan ↔ external rate plan;
- occupancy;
- currency;
- taxes/fees handling;
- restriction semantics.

Unmapped incoming inventory must not be guessed.

## Outbound Distribution

Possible outbound state:
- availability;
- rate;
- stop-sell;
- min/max stay;
- close to arrival/departure;
- allotment;
- restriction.

Every outbound change records:
- source;
- revision;
- property/business date context;
- effective dates;
- target;
- idempotency key;
- response;
- status.

## Incoming Reservation

```text
Provider Event
→ Authenticate / Verify Source
→ Deduplicate
→ Map Property / Room / Rate
→ Validate Dates / Guest / Price
→ Create / Modify / Cancel Reservation
→ Recalculate Availability
→ Acknowledge
→ Reconcile
```

## Idempotency

External reservation IDs plus provider/event revision must prevent duplicate reservations.

Retries cannot create duplicate bookings.

## Modification

Store:
- prior reservation revision;
- provider modification reference;
- changed fields;
- pricing delta;
- guest notification requirement;
- acknowledgement.

## Cancellation

Do not delete reservation.

Record:
- cancellation source;
- time;
- reason/code;
- fee policy;
- deposit/refund state;
- channel acknowledgement.

## Sync Health

Health indicators:
- last inventory push;
- last rate push;
- last reservation pull/webhook;
- mapping errors;
- failed acknowledgements;
- stale time;
- queued events.

## Offline Property Operation

If property loses internet:
- local PMS continues;
- current external sync status becomes **Offline / Stale**;
- outbound events queue locally;
- incoming OTA reservations cannot be assumed absent;
- local sell policy must account for channel exposure.

## Offline Sell-Safety Policy

Configurable risk controls:
- conservative offline room buffer;
- stop local sale at threshold;
- require manager override;
- property-defined channel inventory isolation;
- display last external sync time prominently.

The system must never label external inventory “live” while disconnected.

## Reconnection

```text
Connectivity Restored
→ Authenticate
→ Fetch/receive missed external events
→ Replay outbound queue
→ Deduplicate
→ Detect conflicts
→ Reconcile Availability
→ Conflict — Review Required where needed
→ Resume Healthy State
```

## Direct Booking Engine

Separate public-facing surface.

Capabilities:
- date/occupancy search;
- room/rate/package;
- promo;
- add-ons;
- guest details;
- consent;
- deposit/payment candidate;
- confirmation;
- modification/cancellation according to policy;
- source attribution.

Booking engine should consume hospitality APIs/contracts. It should not directly mutate local storage internals.

## Booking Engine Availability

A hosted direct booking engine depends on connectivity.

If authoritative property inventory is stale beyond threshold:
- booking engine can close sales;
- show unavailable;
- or use an explicitly designed safe-allotment mode.

Never sell from stale inventory without a defined risk policy.

## Central Reservation / Multi-Property

Future:
- search across properties;
- group-level guest/account context;
- cross-property availability;
- property-level rate ownership;
- centralized reservation;
- transfer/rebook;
- centralized reporting.

## Channel Economics

Track:
- gross booking revenue;
- commissions/fees where available;
- cancellation;
- net booking value;
- direct vs OTA;
- acquisition source;
- conversion only where data supports it.

## Acceptance

Before a production channel integration:
- mapping tests;
- create/modify/cancel;
- duplicate event;
- delayed event;
- out-of-order event;
- provider outage;
- credential failure;
- local internet outage;
- reconnect conflict;
- rate/availability reconciliation;
- rollback/disconnect.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
