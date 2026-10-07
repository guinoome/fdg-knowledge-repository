---
document_id: FPJIS-HOSP-0600
title: Housekeeping Guest Request and Engineering Blueprint
status: Blueprint
created: 2026-10-07
---

# Housekeeping, Guest Request and Engineering Blueprint

## Governing Boundary

Hospitality owns guest/room operational context.

FBPOIS/FEIS own engineering maintenance truth.

Do not build a second hospitality maintenance system.

Relevant authority:
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0007 - Concerns Tracker|FWIS Concerns]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0008 - OOO & OOS Management|OOO/OOS]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0009 - Room Engineering Status|Room Engineering Status]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-020_SERVICE_DELIVERY_AND_FIELD_OPERATIONS_STANDARD|Service Delivery and Field Operations]]

## Housekeeping Task

Minimum:
- task_id;
- property;
- room;
- stay/reservation context;
- task_type;
- priority;
- requested_by;
- assigned_to;
- started/completed;
- inspection_required;
- inspector;
- checklist;
- exception;
- evidence;
- status.

Task types:
- checkout clean;
- stayover;
- turndown;
- deep clean;
- inspection;
- special request;
- linen/amenity;
- minibar check;
- public area candidate;
- other configured.

## Housekeeping State

State transitions:
```text
Dirty
→ Assigned
→ Cleaning
→ Clean
→ Inspection Required
→ Inspected / Ready
```

Exceptions:
- DND;
- guest refused;
- access blocked;
- engineering hold;
- security hold;
- re-clean required.

## Priority Logic

Priority can consider:
- arriving guest;
- ETA;
- VIP/priority guest;
- room type shortage;
- group arrival;
- maintenance clearance;
- late departure;
- staffing/load.

Reason must be visible.

## Minibar / Amenities

Minibar observation may generate:
- consumption candidate;
- replenishment task;
- stock issue;
- folio charge candidate.

A room attendant observation is not automatically a final charge if policy requires verification.

## Laundry / Linen

Support:
- linen inventory/issue;
- soiled/clean counts;
- laundry batch/vendor;
- guest laundry order;
- room/guest link;
- charge posting.

Inventory/accounting semantics remain shared-core owned.

## Guest Request

Categories:
- housekeeping;
- engineering;
- F&B;
- concierge;
- transport;
- amenity;
- complaint;
- security;
- billing;
- IT/connectivity;
- other.

Record:
- guest/stay/room;
- channel;
- request time;
- priority;
- promised time;
- owner;
- status;
- evidence;
- resolution;
- guest confirmation if applicable.

## Guest Request State

```text
New
→ Acknowledged
→ Assigned
→ In Progress
→ Resolved
→ Guest Confirmed / Closed
```

Exceptions:
- Waiting Guest;
- Waiting Access;
- Waiting Parts;
- Escalated;
- Cancelled;
- Reopened.

## Service Level

Timer types:
- acknowledge;
- attend;
- resolve;
- guest-confirm.

Pause reasons must be explicit.

## Engineering Escalation

```text
Guest / Housekeeping Observation
→ Hospitality Concern
→ Engineering Classification
→ FBPOIS Work Order / Concern
→ Diagnosis / Work
→ Technical Verification
→ Engineering Clear
→ Housekeeping/Front Office Readiness Check
→ Room Returned to Sellable Service
```

## OOO vs OOS

Definitions must follow canonical FBPOIS implementation.

Hospitality may display and consume:
- reason;
- expected return;
- room impact;
- responsible owner;
- work order;
- clearance status.

It must not independently clear engineering restrictions.

## Return-to-Service Gate

Room cannot become sellable solely because repair is “done.”

Possible required evidence:
1. technical work complete;
2. testing/verification;
3. engineering clearance;
4. housekeeping cleanup;
5. housekeeping inspection;
6. front-office/sales readiness;
7. security/compliance clearance if applicable.

## Guest-Impacting Failure

Examples:
- HVAC;
- hot water;
- electrical;
- plumbing;
- lock/access;
- leak;
- odor;
- TV/internet;
- noise;
- life-safety concern.

Workflow may trigger:
- repair;
- guest communication;
- room move;
- amenity/compensation request;
- incident;
- RCA candidate.

Compensation remains commercial authority, not technician authority.

## Maintenance-to-Room-History

A guest room should accumulate:
- recurring defect pattern;
- downtime;
- complaints;
- repair history;
- replaced asset;
- lost room nights estimate;
- repeated service recovery.

This enables CAPEX/reliability intelligence without duplicating maintenance truth.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.

## Formal H-PMS ↔ FBPOIS Interface — 2026-10-07

This document's engineering handoff is formalized in:
[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/25_Hotel_PMS_to_FBPOIS_Interface_Blueprint|Hotel PMS ↔ FBPOIS Interface Blueprint]].

Use **H-PMS** internally where “PMS” could be confused with preventive-maintenance terminology.
