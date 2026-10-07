---
document_id: FPJIS-HOSP-0400
title: Reservation Stay and Room State Blueprint
status: Blueprint
created: 2026-10-07
---

# Reservation, Stay and Room State Blueprint

## Core Principle

Reservation, physical room condition, housekeeping status, engineering status and sellability are related but separate truths.

Never reduce them to one editable "room status" field.

## Room Identity

Room:
- property;
- building/wing;
- floor;
- room number/code;
- room type;
- capacity;
- attributes;
- accessibility attributes;
- bed configuration;
- connecting-room relationships;
- active/inactive lifecycle;
- linked maintainable assets where relevant.

## Independent Room State Dimensions

### Occupancy
- Vacant
- Assigned / Due In
- Occupied
- Due Out
- Departed Pending Reconciliation

### Housekeeping
- Dirty
- Cleaning
- Clean
- Inspection Required
- Inspected / Ready
- Do Not Disturb / Deferred
- Housekeeping Hold

### Engineering
- Normal
- Concern Open
- Restricted
- Out of Service
- Out of Order
- Verification Pending
- Engineering Cleared

### Sales / Inventory
- Sellable
- Held
- Blocked
- Group Block
- Owner/House Use
- Maintenance Block
- Inventory Closed

### Guest Privacy / Access
- Normal
- DND
- Privacy Restriction
- Security Restriction
- Management Hold

## Derived Room Readiness

A room is Ready for Assignment only when defined prerequisites pass.

Example:
```text
Sellable
AND Housekeeping = Inspected/Ready
AND Engineering not OOS/OOO/Restricted
AND no blocking Security Hold
```

The derived state is calculated, not manually forced without an authorized override.

Override requires:
- actor;
- reason;
- duration;
- affected rule;
- evidence;
- approval where required.

## Reservation Entity

Minimum:
- reservation_id;
- property;
- source/channel;
- booking_reference;
- guest/profile;
- arrival_date;
- departure_date;
- adults/children;
- room_type;
- assigned_room optional;
- rate_plan;
- nightly_rate_breakdown;
- inclusions;
- tax/profile reference;
- guarantee/deposit terms;
- status;
- special requests;
- company/travel-agent/group links;
- source mapping;
- created/modified provenance.

## Reservation Lifecycle

```text
Inquiry
→ Tentative / Hold
→ Confirmed
→ Guaranteed where applicable
→ Pre-Arrival
→ Checked In
→ In House
→ Checked Out
→ Closed
```

Alternate:
- Waitlisted
- Cancelled
- No Show
- Rejected
- Unfulfilled / Exception

## Modification Rule

Reservation modification creates revision/event history.

Material changes:
- dates;
- room type;
- rate plan;
- occupancy;
- price;
- guarantee;
- source;
- room allocation.

Do not erase the original channel/customer commitment.

## Availability

Availability is derived from:
- physical room inventory;
- active blocks;
- reservations;
- group allotments;
- OOO/OOS;
- sell restrictions;
- channel allocation if used;
- overbooking policy.

Do not calculate availability from room-clean status alone.

## Overbooking

Overbooking may be supported only as an explicit property policy.

Record:
- threshold;
- room type/property;
- date;
- authority;
- rationale;
- displacement/upgrade policy;
- monitoring.

No opaque model may increase overbooking level autonomously.

## Walk-In

Walk-in flow:
```text
Search Availability
→ Select Room/Type + Rate
→ Create Guest
→ Validate Registration Inputs
→ Deposit/Guarantee
→ Assign Room
→ Check-In
→ Folio Open
```

## Check-In Gate

Minimum checks:
- reservation valid;
- room assignment valid;
- room readiness passed or authorized override;
- guest identity/registration data required by configured policy;
- payment/deposit requirement handled;
- consent/privacy notices as applicable;
- occupancy limits respected;
- access/key process completed or referenced.

## Check-Out Gate

- folio review;
- pending outlet charges;
- unresolved deposits;
- payments;
- billing instruction;
- room key/access return reference;
- guest request/incident exception surfaced;
- room moved to post-departure housekeeping state;
- stay closed only when defined downstream checks pass.

## Room Move

Room move preserves:
- prior room;
- new room;
- effective time;
- reason;
- actor;
- rate impact;
- folio continuity;
- housekeeping tasks;
- engineering/guest concern link.

## Group Booking

Entities:
- group;
- block/allotment;
- cutoff date;
- room type allocation;
- rooming list;
- master account;
- individual folios;
- billing instruction;
- deposits;
- group contacts;
- event link;
- pickup.

## Corporate / Travel Agent

Use shared party/account master.

Hospitality extension:
- negotiated rate plan;
- market/source;
- billing instruction;
- credit status reference;
- production history;
- commission rule if applicable.

## Reservation Conflict

If local/offline and external channel events conflict:
**Conflict — Review Required**

No silent reassignment or cancellation.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
