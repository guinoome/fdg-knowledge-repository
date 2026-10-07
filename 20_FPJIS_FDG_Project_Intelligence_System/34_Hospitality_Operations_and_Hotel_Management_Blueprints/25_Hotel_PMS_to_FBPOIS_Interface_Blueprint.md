---
document_id: FPJIS-HOSP-2500
title: Hotel PMS to FBPOIS Interface Blueprint
status: Blueprint
created: 2026-10-07
---

# Hotel PMS ↔ FBPOIS Interface Blueprint

## Canonical Terminology

Within FDG architecture:

- **H-PMS** = Hotel Property Management System / hospitality property-management capability.
- **PM** = Preventive Maintenance.
- **FBPOIS** = FDG Building Plant Operations Intelligence System.

Use **H-PMS** in internal architecture documents when acronym ambiguity exists.

## Core Decision

H-PMS and FBPOIS are separate but tightly coupled operational domains.

```text
H-PMS
Guest • Reservation • Stay • Room Assignment • Housekeeping • Folio
        ↕ governed interface
FBPOIS
Engineering Concern • Work Order • OOO/OOS • Room Engineering Status
PM • Asset Condition • Plant Operations • Utilities • Technical Evidence
```

H-PMS must not absorb FBPOIS engineering authority.

FBPOIS must not become the owner of reservation, guest, stay, folio or room-sales truth.

## Why the Relationship Is Strong

A hotel room is simultaneously:

1. a **sellable hospitality inventory unit**;
2. an **occupied guest space**;
3. a **housekeeping workspace**;
4. a **physical engineering location**;
5. a container for maintainable assets and systems;
6. a contributor to revenue and lost-room-night economics.

Therefore the H-PMS and FBPOIS relationship is operationally critical.

## Ownership Matrix

| Record / Decision | H-PMS | FBPOIS |
|---|---|---|
| Reservation | Authoritative | Read minimal context only if justified |
| Guest profile | Authoritative hospitality domain | No ownership |
| Stay / occupancy | Authoritative | Consume minimal access/occupancy context |
| Room assignment | Authoritative | Consume room/location context |
| Housekeeping state | Authoritative hospitality domain | Read where required for access/readiness |
| Room sellability | Hospitality authority, derived with engineering restrictions | Supplies engineering blocking state |
| Guest engineering complaint | Captures guest-facing request/context | Owns technical concern/work execution after handoff |
| Engineering concern | Reference/display | Authoritative |
| Work order | Reference/display | Authoritative |
| PM schedule | No ownership | Authoritative |
| Asset/equipment state | No ownership | Authoritative |
| OOO/OOS engineering record | Consume/display and enforce | Authoritative according to FBPOIS workflow |
| Engineering clearance | Consume | Authoritative |
| Return-to-sellable decision | Final hospitality readiness after all gates | Supplies engineering clearance prerequisite |
| Plant/utilities outage | Consume guest/room impact | Authoritative technical operations |
| Lost sellable room nights | Supplies room/revenue context | Supplies downtime/technical cause |
| CAPEX/reliability recommendation | Business/management consumer | Technical evidence/source |

## Room Readiness Contract

Final room readiness is not an FBPOIS-only or H-PMS-only status.

```text
Room Sellable =
Hospitality Inventory Allows Sale
AND Housekeeping Ready
AND FBPOIS Engineering Clearance
AND No Blocking Security / Compliance Hold
```

If FBPOIS has an active blocking engineering restriction:
- H-PMS must not mark the room Ready for Assignment;
- local override, if allowed at all, requires explicit authority and audit;
- the FBPOIS restriction itself is not deleted or overwritten.

## H-PMS → FBPOIS Inputs

### 1. Engineering Concern Handoff

H-PMS sends:
- property_id;
- room/location_id;
- concern category candidate;
- guest-impact level;
- description;
- observed_at;
- source department;
- access constraint;
- evidence references;
- reservation/stay reference only when operationally required;
- urgency context.

Do not send unnecessary guest personal information.

Result:
- FBPOIS concern_id/work_order_id;
- H-PMS stores reference.

### 2. Room Access / Occupancy Context

For maintenance planning:
- vacant/occupied;
- due-out;
- expected accessible window;
- DND/privacy restriction;
- housekeeping coordination;
- arrival deadline;
- room priority.

FBPOIS may use these to schedule work without owning guest identity.

### 3. Room Sales / Arrival Priority Context

Examples:
- incoming VIP/priority arrival;
- room type shortage;
- group arrival;
- sold-out date pressure.

This may influence engineering priority recommendation but does not alter technical severity.

### 4. Hospitality Return-to-Service Request

After technical work appears complete, H-PMS may request:
- engineering verification;
- clearance status;
- expected release time.

It cannot self-clear the technical restriction.

## FBPOIS → H-PMS Outputs

### 1. Engineering Restriction

- restriction_id;
- room/location;
- type;
- severity;
- reason;
- created_at;
- expected_return;
- work reference;
- blocking boolean;
- status.

### 2. OOO/OOS State

H-PMS consumes canonical FBPOIS status and maps it into room sellability/readiness.

### 3. Work Status Summary

Expose only what hospitality needs:
- assigned;
- in progress;
- waiting;
- repair complete;
- verification pending;
- cleared;
- estimated completion.

Detailed technical evidence remains in FBPOIS.

### 4. Engineering Clearance

- clearance_id;
- room;
- cleared_at;
- cleared_by;
- verification reference;
- residual restriction if any.

Clearance is an input to hospitality readiness, not automatic room sale.

### 5. Plant / Utility Impact

FBPOIS may publish:
- affected zones/rooms;
- system;
- outage/degradation;
- expected restoration;
- guest impact;
- workaround.

H-PMS uses this for:
- guest communication;
- room move decisions;
- service recovery;
- room availability/risk.

## Event Contract

### H-PMS Events to FBPOIS

- `HospitalityEngineeringConcernRaised`
- `RoomAccessWindowChanged`
- `RoomOccupancyContextChanged`
- `RoomArrivalPriorityChanged`
- `HousekeepingEngineeringExceptionRaised`
- `HospitalityClearanceRequested`

### FBPOIS Events to H-PMS

- `EngineeringRestrictionRaised`
- `EngineeringRestrictionChanged`
- `OOOStatusChanged`
- `OOSStatusChanged`
- `EngineeringWorkStatusChanged`
- `ExpectedReturnToServiceChanged`
- `EngineeringClearanceGranted`
- `PlantOrUtilityGuestImpactRaised`

Events are conceptual contracts; exact API/event-bus technology is not canonical.

## Concern-to-Work Flow

```text
Guest / Front Desk / Housekeeping
→ H-PMS Guest Request or Room Concern
→ Engineering Handoff
→ FBPOIS Concern
→ Work Order / Technical Action
→ Evidence / Testing
→ FBPOIS Engineering Clearance
→ H-PMS Housekeeping / Front Office Readiness
→ Room Sellable
```

## Preventive Maintenance Coordination

FBPOIS/FMIS owns PM.

H-PMS can improve PM execution by exposing:
- occupancy forecast;
- vacant-room windows;
- room block opportunities;
- low-demand periods;
- departure/arrival windows;
- guest-access restrictions.

Flow:

```text
FBPOIS PM Due
+ H-PMS Room Occupancy / Availability Window
→ Maintenance Window Recommendation
→ Operations Approval if required
→ FBPOIS PM Execution
→ Technical Verification
→ H-PMS Readiness Update
```

The H-PMS does not own PM completion or technical acceptance.

## Room Asset Relationship

Hospitality room links to FBPOIS location/assets:

```text
Property
→ Building/Tower
→ Floor
→ Room
→ Maintainable Assets
   ├─ FCU/AHU terminal
   ├─ electrical devices
   ├─ plumbing fixtures
   ├─ controls/sensors
   ├─ door/lock interface
   └─ other room equipment
```

One room can have many assets. One plant/system can affect many rooms.

This relationship supports root-cause and impact intelligence.

## Guest Privacy Boundary

FBPOIS normally needs:
- room;
- occupancy/access status;
- operational urgency;
- guest-impact category.

It normally does **not** need:
- guest name;
- contact;
- payment data;
- detailed stay history.

Any additional guest data requires a defined operational purpose and authorization.

## Lost Room Night / Revenue Impact Intelligence

A valuable cross-system metric is:

```text
Engineering Downtime
+ H-PMS Room Availability / Demand / Rate Context
→ Estimated Lost Sellable Room Nights
→ Estimated Revenue Exposure
```

Important:
- downtime comes from FBPOIS;
- occupancy/rate/demand assumptions come from H-PMS/FBIS;
- resulting financial impact is an estimate unless reconciled with actual finance/revenue data;
- assumptions remain visible.

This supports:
- reliability prioritization;
- CAPEX;
- recurring-defect analysis;
- replacement decisions.

## Recurring Room Defect Intelligence

Cross-system pattern:

```text
Guest Complaints
+ H-PMS Room Moves
+ FBPOIS Concerns
+ Work Orders
+ Repeated OOO/OOS
+ Asset History
→ Recurring Defect Pattern
→ RCA Candidate
→ CAPEX / Replacement / Design Review
```

This is a major FDG differentiator over a standalone PMS.

## Plant / Utility Impact Intelligence

Examples:
- chilled water disruption;
- domestic hot water;
- electrical feeder;
- water pressure;
- BMS/control issue;
- elevator outage;
- network/IT where integrated.

FBPOIS maps technical scope.

H-PMS maps:
- affected occupied rooms;
- arrivals;
- available alternate rooms;
- guest requests;
- room moves;
- service-recovery exposure.

## Interface Failure

If H-PMS cannot reach FBPOIS:
- last known engineering state is shown with timestamp;
- state is marked stale;
- H-PMS must not assume a restriction is cleared;
- new concerns queue locally;
- reconciliation occurs after restoration.

If FBPOIS cannot reach H-PMS:
- technical work continues;
- occupancy/access context may be stale;
- engineers must see last-known context and access-risk warning;
- no assumption that room is vacant.

## Conflict Rule

If systems disagree about engineering restriction:

**FBPOIS technical restriction remains authoritative until resolved.**

If systems disagree about guest occupancy/reservation:

**H-PMS remains authoritative for hospitality occupancy truth.**

Record:
`Conflict — Review Required`

Do not silently overwrite either source.

## Dashboard Integration

### Front Office / H-PMS sees
- engineering restriction icon;
- OOO/OOS;
- work status summary;
- expected return;
- clearance;
- stale FBPOIS warning.

### Engineering / FBPOIS sees
- occupied/vacant;
- due-out / arrival deadline;
- access constraints;
- hospitality priority;
- room sellability pressure;
- no unnecessary guest PII.

### Management sees
- room downtime;
- rooms unavailable by cause;
- arrival risk;
- repeated defect rooms;
- lost sellable room nights estimate;
- engineering response/restore;
- guest complaints linked to technical cause.

## Integration With Construction / Turnover

For new or renovated hotels:

```text
FEIS Construction / T&C
→ Room / Asset Turnover
→ FBPOIS Asset + Maintenance Baseline
→ H-PMS Room Operational Activation
→ Guest Operation
→ Defect / Reliability Feedback
→ Future CAPEX / Project
```

This enables lifecycle continuity from construction to hotel operations.

## Acceptance Tests

1. Guest engineering request creates one FBPOIS concern reference.
2. Duplicate retry does not create duplicate concern.
3. Active FBPOIS restriction blocks H-PMS Ready-for-Assignment.
4. Engineering completion without clearance does not unblock room.
5. Engineering clearance plus housekeeping readiness can permit sellability.
6. H-PMS room move does not alter FBPOIS work history.
7. FBPOIS PM window uses occupancy context without copying guest PII.
8. Offline/stale integration is visibly identified.
9. Reconnection reconciles queued concern/status events idempotently.
10. Lost-room-night analysis keeps source/assumption provenance.
11. Property A cannot consume Property B room engineering state.
12. Technical and hospitality histories remain independently auditable.

## Governing Documents

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0007 - Concerns Tracker|Concerns Tracker]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0008 - OOO & OOS Management|OOO/OOS Management]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0009 - Room Engineering Status|Room Engineering Status]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/05_FMIS_Preventive_Maintenance|FMIS Preventive Maintenance]]
- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/04_Reservation_Stay_and_Room_State_Blueprint|Hospitality Room State]]
- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/06_Housekeeping_Guest_Request_and_Engineering_Blueprint|Housekeeping / Guest Request / Engineering]]
- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/10_Data_Model_and_Event_Contracts|Hospitality Data Model]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this interface blueprint.
