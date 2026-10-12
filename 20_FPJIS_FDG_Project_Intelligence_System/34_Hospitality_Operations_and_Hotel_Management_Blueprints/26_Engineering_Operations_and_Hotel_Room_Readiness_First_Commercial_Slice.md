---
document_id: FPJIS-HOSP-2600
title: Engineering Operations and Hotel Room Readiness - First Commercial Slice
status: Superseded - Do Not Implement as Combined L1
owner: Francis
created: 2026-10-11
classification: Superseded Decision Record
---

# Engineering Operations + Hotel Room Readiness

## Supersession Notice — 2026-10-12

This combined L1 decision is preserved as historical architecture but is **no longer the active implementation sequence**.

Current sequence:

```text
L1A — FBPOIS Engineering Operations: Concern-to-Clearance
→ build/close gaps
→ local test
→ pilot/sell/use
→ freeze baseline

THEN

L1B — Hotel Room Readiness
→ reuse accepted L1A
→ add room + Housekeeping + readiness
→ local test
→ pilot/sell/use
```

Active references:
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|L1A Concern-to-Clearance]]
- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/27_Hotel_Room_Readiness_L1B_Vertical_Extension|L1B Hotel Room Readiness]]

Do not use this document to authorize a combined implementation.

## Founder Direction

This is the preferred first narrow Hospitality software/operations slice.

The complete Hospitality architecture remains preserved in GitHub, but the first implementation does **not** attempt to build the full H-PMS.

Founder shorthand:

```text
Room
→ FBPOIS Engineering
→ Housekeeping
→ Guest Concern
→ OOO/OOS
→ Repair
→ Verification
→ Ready
```

Operationally, concerns may originate from Guest Services, Front Office, Housekeeping or Engineering, so the canonical lifecycle is:

```text
Room
→ Guest / Front Office / Housekeeping Observation
→ FBPOIS Engineering Concern
→ OOO/OOS or Engineering Restriction if required
→ Repair / Corrective Work
→ Technical Verification
→ Engineering Clearance
→ Housekeeping Clean / Inspect
→ Final Hospitality Readiness
→ READY / SELLABLE
```

## Why This Is L1

It solves a complete and expensive hotel problem without replacing the hotel's existing PMS:

- rooms delayed because Engineering/Housekeeping status is fragmented;
- front office cannot see trustworthy repair/clearance state;
- engineering lacks arrival/occupancy priority context;
- OOO/OOS is disconnected from room readiness;
- repaired rooms wait unnecessarily before release;
- recurring room defects and downtime are hard to quantify;
- management cannot see lost sellable-room exposure.

## Product Position

This slice may operate:

### Mode A — Standalone Room Readiness Layer
Hotel continues using its existing PMS. FDG tracks room readiness/engineering operations independently with controlled room/import mapping.

### Mode B — Manual/CSV Assisted Interface
Room/occupancy/arrival context is imported or entered manually.

### Mode C — API Adapter
Existing hotel PMS supplies bounded room/occupancy context through a provider-neutral adapter.

### Mode D — Native H-PMS
Later, the same capability becomes part of the FDG Hospitality Operations Platform.

The first launch must not require Mode D.

## L1 Scope

### 1. Room Master
Minimum:
- property;
- building/tower;
- floor;
- room number;
- room type;
- active state;
- linked FBPOIS location/assets.

### 2. Hospitality Context
Minimum:
- occupied/vacant;
- due out;
- arrival deadline;
- room priority;
- DND/access restriction;
- housekeeping state.

Guest identity is not required for the engineering core.

### 3. Guest / Operations Concern
Capture:
- room;
- source;
- category;
- observation;
- priority;
- guest impact;
- time;
- evidence;
- access limitation.

### 4. FBPOIS Engineering Handoff
Generate/reference:
- concern;
- work order;
- technician;
- status;
- technical evidence.

Authority:
[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/25_Hotel_PMS_to_FBPOIS_Interface_Blueprint|H-PMS ↔ FBPOIS Interface]].

### 5. OOO / OOS / Restriction
Consume canonical FBPOIS:
- restriction;
- reason;
- blocking status;
- expected return;
- work reference.

### 6. Repair / Work Status
Display:
- assigned;
- in progress;
- waiting;
- complete;
- verification pending;
- cleared.

### 7. Verification
Engineering verification remains FBPOIS-owned.

No “Repair Complete” state alone can release the room.

### 8. Housekeeping Readiness
States:
- Dirty;
- Assigned;
- Cleaning;
- Clean;
- Inspection Required;
- Inspected / Ready.

### 9. Final Readiness Engine

```text
READY =
Room Active / Sellable
AND Housekeeping Inspected/Ready
AND Engineering Clearance
AND No Blocking Security/Compliance Hold
```

### 10. Room Readiness Board
Show:
- Ready;
- Dirty;
- Cleaning;
- Inspection;
- Engineering Concern;
- OOO/OOS;
- Verification Pending;
- arrival-at-risk;
- expected return;
- stale/offline state.

### 11. Attention Center
Minimum high-value cards:
- arrival soon, engineering not cleared;
- repair complete but verification pending;
- engineering clear but housekeeping incomplete;
- repeat-defect room;
- overdue OOO/OOS;
- stale PMS/FBPOIS context;
- room unavailable beyond expected return.

### 12. Management Metrics
Initial:
- ready rooms;
- rooms blocked by engineering;
- rooms blocked by housekeeping;
- OOO/OOS count;
- average engineering downtime;
- repair-to-clear time;
- clear-to-ready time;
- repeat defect count;
- estimated lost sellable room nights.

Revenue exposure may be added only when reliable rate/demand data exists.

## Explicit Non-Scope — L1

Do **not** require:
- full reservation engine;
- full guest CRM;
- folio;
- billing/payment;
- night audit;
- POS/F&B;
- OTA/channel manager;
- booking engine;
- full inventory/procurement;
- loyalty;
- multi-property CRS;
- production messaging;
- accounting integration.

These remain preserved in the full architecture.

## Commercial Offer Candidate

Working name:

> **FDG Engineering Operations + Hotel Room Readiness**

Possible delivery forms:
- professional operations toolkit;
- managed reporting/room-readiness service;
- local/offline application;
- department pilot;
- later H-PMS module.

Pricing must be validated through FBIS; this blueprint does not set a permanent price.

## Buyer / Users

Primary buyers:
- Chief Engineer / Director of Engineering;
- Hotel Manager / General Manager;
- Rooms Division / Front Office leadership;
- property owner/operator.

Primary users:
- Duty Engineer;
- engineering supervisor/technician;
- Housekeeping supervisor/room attendant;
- Front Office;
- Guest Services;
- management.

## Value Proposition

> Turn fragmented guest-room engineering and housekeeping coordination into one traceable room-readiness workflow so Front Office can see which rooms are truly ready, Engineering can prioritize around occupancy and arrivals, and management can measure downtime and recurring defects.

## Data Boundary

The slice should work with minimal hospitality data.

Required:
- room;
- occupancy/access context;
- arrival/departure deadline if available;
- housekeeping state;
- engineering state;
- concern/work/clearance.

Not required:
- guest financial data;
- full reservation history;
- payment;
- detailed guest identity.

## Offline / Local Requirement

L1 must be local-first.

Without internet, users must still be able to:
- view room board;
- update housekeeping state;
- create engineering concern;
- update local work/FBPOIS reference where local FBPOIS is available;
- record evidence;
- verify/clear under authority;
- calculate readiness;
- export/backup.

External PMS/API sync may show **Stale / Pending Sync**.

## Acceptance Flow

Synthetic end-to-end test:

```text
Room 1815 = Occupied / Engineering Normal
→ Guest reports no cooling
→ Guest/Front Office concern created
→ FBPOIS concern created
→ Engineering restriction raised
→ Room becomes Not Ready / Blocked
→ Work assigned
→ Repair completed
→ Engineering verification
→ Engineering clearance
→ Housekeeping cleaning
→ Housekeeping inspection
→ Readiness engine passes
→ Room = READY
→ Full timeline/evidence retained
```

## Acceptance Criteria

1. One room has separate hospitality, housekeeping and engineering states.
2. Guest/front-office concern creates one traceable FBPOIS concern.
3. Duplicate retry does not duplicate concern.
4. Active engineering restriction blocks Ready.
5. Repair completion without verification still blocks Ready.
6. Engineering clearance alone does not bypass Housekeeping.
7. Housekeeping Ready alone does not bypass Engineering.
8. Final Ready is derived, not arbitrary.
9. Every override is auditable.
10. Room history preserves concern → work → verification → release.
11. Offline/local operation works for defined L1 actions.
12. Backup/restore reproduces state.
13. Existing PMS integration is optional, not required for initial pilot.
14. No full-H-PMS modules are needed to close L1.

## L1 → L2 Promotion Triggers

Do not automatically expand.

Candidate next capability is chosen only after evidence such as:
- hotels demand reservation context beyond bounded import;
- repeated manual room/arrival entry is the main bottleneck;
- room-readiness pilot converts to broader operations;
- PMS integration creates measurable value;
- buyers explicitly require front-office workflow.

## Related

- [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|Architecture Complete, Build Narrow Standard]]
- [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/25_Hotel_PMS_to_FBPOIS_Interface_Blueprint|H-PMS ↔ FBPOIS Interface]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0007 - Concerns Tracker|FBPOIS Concerns]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0008 - OOO & OOS Management|OOO/OOS]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0009 - Room Engineering Status|Room Engineering Status]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this L1 slice.
