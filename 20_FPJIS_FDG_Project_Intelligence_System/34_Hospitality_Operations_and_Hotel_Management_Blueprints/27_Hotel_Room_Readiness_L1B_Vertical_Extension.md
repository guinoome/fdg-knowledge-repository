---
document_id: FPJIS-HOSP-2700
title: Hotel Room Readiness - L1B Vertical Extension
status: Approved L1B Blueprint - Start Only After L1A Acceptance or Explicit Override
owner: Francis
created: 2026-10-12
classification: L1B First Vertical Extension
depends_on: FBPOIS-L1A-R0.1.0
---

# Hotel Room Readiness — L1B Vertical Extension

## Sequence

The full Hospitality architecture stays preserved in GitHub.

Implementation order is:

```text
L1A — FBPOIS Engineering Operations: Concern-to-Clearance
→ Build / close gaps
→ Local acceptance
→ Pilot / Sell / Use
→ Measure bottleneck
→ Freeze working baseline

THEN

L1B — Hotel Room Readiness
→ Add only hospitality-specific room coordination
→ Local acceptance
→ Pilot / Sell / Use
→ Measure bottleneck
→ Promote next capability only when justified
```

## Dependency

L1B reuses:
[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline|FBPOIS L1A Concern-to-Clearance]].

L1B does **not** rebuild:
- concern;
- engineering assignment/work;
- restriction/OOO/OOS;
- technical evidence;
- verification;
- engineering clearance.

Those are inherited from the accepted FBPOIS core.

## L1B Adds

Only the hospitality-specific capability required to turn engineering clearance into trustworthy room readiness:

### Room Context
- property;
- building/tower;
- floor;
- room;
- room type;
- active/sellable base state.

### Hospitality Timing Context
Where available:
- occupied/vacant;
- due-out;
- next arrival;
- arrival priority;
- room-type pressure;
- DND/access constraint.

### Housekeeping
- Dirty
- Assigned
- Cleaning
- Clean
- Inspection Required
- Inspected / Ready
- Deferred / DND / Blocked

### Guest / Front Office Concern Source
A hospitality concern can hand off into the accepted L1A FBPOIS engine.

### Readiness Engine

```text
READY =
Hospitality Sellability Allows
AND Housekeeping Inspected / Ready
AND FBPOIS Engineering Clearance
AND No Blocking Security / Compliance Hold
```

### Room Readiness Board
Minimum:
- Ready
- Housekeeping Pending
- Engineering Concern
- OOO/OOS / Restricted
- Verification Pending
- Arrival at Risk
- Expected Return
- Stale Integration Context

### Attention
Minimum:
- arrival approaching and engineering not clear;
- engineering clear but Housekeeping pending;
- Housekeeping ready but engineering restriction active;
- expected return overdue;
- repeated room defect;
- stale context from external PMS.

## Existing PMS Is Optional

L1B must be usable without replacing the customer's PMS.

Supported progression:
1. standalone local room/readiness records;
2. manual/CSV bounded PMS context;
3. provider-neutral PMS adapter;
4. native FDG H-PMS later if justified.

## L1B Non-Scope

Do not build merely because the full Hospitality architecture exists:
- reservation engine;
- guest CRM;
- folio;
- billing;
- night audit;
- POS;
- OTA/channel manager;
- booking engine;
- loyalty;
- full multi-property CRS.

## Acceptance Scenario

```text
Room 1815
→ Hospitality concern raised
→ Existing L1A creates/owns engineering concern
→ Engineering restriction
→ Work
→ Verification
→ Engineering Clearance
→ Housekeeping Clean
→ Housekeeping Inspect
→ Readiness Engine
→ READY
```

## L1B Exit Gate

L1B is accepted when:
- engineering state is consumed from L1A rather than duplicated;
- Housekeeping state is independent;
- Ready is derived;
- active FBPOIS restriction always blocks Ready;
- engineering clearance alone cannot bypass Housekeeping;
- full room timeline is auditable;
- defined local/offline use works;
- existing PMS integration is optional;
- local test evidence and handover exist.

## Enhancement After L1B

After L1B exists:
- freeze its baseline;
- pilot/sell/use;
- improvements become traceable patches;
- broader Hospitality modules require evidence or explicit authorization.

Generic patch governance:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Exist First, Enhance by Traceable Patches]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this L1B extension.
