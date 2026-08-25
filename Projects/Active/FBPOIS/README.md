# FBPOIS — Facility Digital Twin / Spatial Operations Interface

First implementation of the **Facility Digital Twin / Spatial Operations Interface**, an approved architectural decision owned by Platform Experience & Design Intelligence.

**Status:** reference concept filed. No implementation started.

**Governing decision:** `17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/02_Facility_Digital_Twin_Spatial_Operations_Interface.md` — Approved by Founder, 2026-08-12.

---

## What this folder is for

The decision classifies this capability as **Platform Experience**, not a new Intelligence System, and names FBPOIS as its first use case. It is deliberately *not* part of `Projects/Active/FWIS`: FWIS is the shift-turnover and engineering workspace, and this is the facility-wide spatial interface above it.

The decision is explicit about what must **not** be created: a Dashboard Intelligence System, 3D Dashboard Intelligence, or Facility Dashboard Intelligence. The correct placement is:

```
FDG Ecosystem
→ 17_FDG_Platform_Intelligence_System
→ Platform Experience & Design Intelligence       ← owned here
→ Facility Digital Twin / Spatial Operations Interface
→ implemented by FBPOIS (first use case)          ← this folder
```

---

## `reference/`

| File | What it is |
|---|---|
| `facility-overview-concept.html` | The Facility Overview concept, as supplied 2026-08-12 |
| `facility-reference.png` | The supplied property reference image (Nustar-style integrated resort, Cebu) |

Open the HTML directly in a browser; it needs no server. The image is referenced relatively, so keep the two together.

### Every figure in it is invented

This matters more than it sounds, because the concept is persuasive and the numbers look real. **None of them have a source.** There is no asset registry, no health scoring, no alarm table, no work-order table and no energy metering in the FBPOIS or FWIS schema. `96% Health`, `5 Live Alarms`, `126 Systems Monitored`, `26.4 MWh`, `215,850 m²` — all sample.

The governing decision requires that this be visible, not merely known:

> Prototype/demo data must be clearly identified as sample/mock data.
> Do not invent asset health, alarm conditions, equipment status, energy consumption, building dimensions, equipment quantities, or operating parameters.
> The property visualization must never imply that generated visual geometry represents verified engineering geometry.

So a fixed banner was added to the bottom of the concept file saying exactly that. It is a compliance artifact, not styling — remove it only when the figures are read from real data.

---

## What FBPOIS can actually supply today

Worth stating plainly before anyone builds the hero page, because the gap between the concept and the data is the whole of the work:

**Available now** (verified against PostgreSQL — see `FWIS-IMPL-0004`):

- Plant status per property, with severity, from shift turnovers and `plant-log` records
- Utility readings (`utility-reading`)
- Incidents, concerns, room status, announcements, notes, logbook entries — each with a real lifecycle and audit trail
- Buildings, departments, plants, utilities and roster per property, from `CONFIG.properties`
- Workflow authority: who may move what, enforced in the database

**Not available, and invented in the concept:**

- Asset registry — no asset table, so no `AHU-3C-01`, no per-asset health
- Health scoring — no model computes a percentage for anything
- Live alarms — no alarm ingestion; the nearest real thing is an escalated turnover or a Critical plant status
- Work orders — declared in FBPOIS-ROLE-0004 and **not implemented**
- Preventive maintenance, inspections, inventory — no modules
- Energy metering / downtime trend — utility readings exist, but no time-series or downtime model
- Floor areas and equipment counts — not held anywhere

The honest first version of this screen shows plant status, open incidents and concerns, room status and turnover state, spatially arranged — and says nothing about asset health, because nothing knows it.

---

## Phase 1 sequence, from the decision

1. Use supplied property image/reference ← **done, this folder**
2. Create Facility Overview hero experience
3. Establish building/location hotspots
4. Establish visual health states
5. Connect hotspots to FBPOIS data structures
6. Implement zoom / layer / selection concepts
7. Validate navigation
8. Progressively replace visual approximations with real spatial models when CAD/BIM/GIS data exists

> **Do NOT begin by building a complicated BIM engine.**

Evolution path: property image → enhanced spatial view → interactive 2.5D/3D → facility digital twin → engineering digital twin. Each stage builds on the last rather than replacing it.

### Health state colours

| Colour | Meaning |
|---|---|
| GREEN | Healthy / Normal |
| AMBER | Warning / Attention Required |
| RED | Critical / Immediate Action |
| GREY | Offline / No Data |

GREY is the one to get right. A property with no data must read as *unknown*, never as healthy — the same rule FWIS's dashboard already follows by listing unreported plants as "Not reported" rather than omitting them.

---

## Reuse

The decision requires the spatial interface be built for reuse, not hard-coded to one property: FBPOIS first, then FEIS/FEIP for project and plant visualization, then other platforms. Property geometry, hotspot positions and overlay definitions belong in configuration, on the same principle that keeps every organizational value in `src/config.js` in FWIS.

---

## Out of scope for Phase 1

Authentication, subscriptions and external integrations, per the decision.
