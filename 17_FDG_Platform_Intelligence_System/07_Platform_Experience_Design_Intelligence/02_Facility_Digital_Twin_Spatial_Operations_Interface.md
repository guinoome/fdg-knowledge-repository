# Facility Digital Twin / Spatial Operations Interface

**Status:** Architectural Decision — Approved by Founder 2026-08-12
**Owned by:** [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|Platform Experience & Design Intelligence]]
**First implementation:** [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0001 - Vision & Scope|FBPOIS]]
**Source:** Handover document filed 2026-08-12. Visual reference: FBPOIS Facility Overview concept (Nustar-style integrated resort property, Cebu).

---

## Core Architectural Decision

The facility/property itself is the primary visual interface for FBPOIS — not a conventional dashboard.

This capability is classified as **Platform Experience**, not a new Intelligence System.

Do NOT create:
- Dashboard Intelligence System
- 3D Dashboard Intelligence
- Facility Dashboard Intelligence

These are wrong. The correct classification is:

```
FDG Ecosystem
→ 17_FDG_Platform_Intelligence_System
→ Platform Experience & Design Intelligence       ← owned here
→ Facility Digital Twin / Spatial Operations Interface
→ implemented by FBPOIS (first use case)
```

---

## What this is

An interactive spatial operational interface where the property itself is the navigation system.

The user visually understands the facility before reading tables. Buildings, floors, areas, assets, and systems are selectable spatial objects — not just rows in a list.

**Separation of concerns:**

| Layer | Owner | Provides |
|---|---|---|
| Property representation | This spec | Building massing, spatial context |
| Operational data | FBPOIS | Real asset states, alarms, work orders |
| Engineering intelligence | FDG CORE | Analysis, decisions, recommendations |
| User interaction | Platform Experience | Navigation, overlays, drill-down |

---

## Navigation model

```
Property
→ Tower / Zone / Plant Area
→ Floor
→ Room / Area / Plant Space
→ Asset
→ Condition / Alarms / Work Orders / PM / History / Engineering data
```

Same model applies to systems:
```
Property
→ Chiller Plant → Chiller → Pump → AHU → Cooling system
→ Alarm / performance / maintenance
```

---

## Visual health states

| Color | Meaning |
|---|---|
| GREEN | Healthy / Normal |
| AMBER | Warning / Attention Required |
| RED | Critical / Immediate Action |
| GREY | Offline / No Data |

Configurable overlays: Asset health, Critical alarms, PM compliance, Work-order density, Energy intensity, Utility consumption, Equipment status, System availability, Temperature, Pressure, Electrical, Water, Fire protection, HVAC, Chiller plant, Central plant.

---

## Hero page structure

```
HEADER
↓ Global FBPOIS navigation
↓ Executive KPI layer
↓ 3D Facility Digital Twin  ← visual center of gravity
↓ Spatial asset/status overlays
↓ Critical Assets
↓ System Health
↓ Live Alarms
↓ Building Summary
↓ Work Orders / Reliability / Energy
```

The 3D property must not be visually dominated by surrounding dashboard cards.

---

## Design principle

Target: **Engineering Command Center + Facility Digital Twin**

Not: AI dashboard concept art, excessive glowing effects, meaningless neon gradients, decorative 3D objects, fake futuristic controls, excessive glassmorphism, decorative particles, generic smart-city imagery.

Every visual element must communicate operational information or support navigation.

---

## Data integrity rules

- Use actual FBPOIS data when available.
- Do not invent asset health, alarm conditions, equipment status, energy consumption, building dimensions, equipment quantities, or operating parameters.
- Prototype/demo data must be clearly identified as sample/mock data.
- The property visualization must never imply that generated visual geometry represents verified engineering geometry.
- Where BIM/CAD/GIS data is unavailable, treat as spatial representation, not exact BIM.

---

## Implementation sequence (Phase 1 — current milestone)

1. Use supplied property image/reference
2. Create Facility Overview hero experience
3. Establish building/location hotspots
4. Establish visual health states
5. Connect hotspots to FBPOIS data structures
6. Implement zoom / layer / selection concepts
7. Validate navigation
8. Then progressively replace visual approximations with actual spatial models when CAD/BIM/GIS data becomes available

**Do NOT begin by building a complicated BIM engine.**

---

## Evolution path

```
PROPERTY IMAGE
→ ENHANCED SPATIAL VIEW
→ INTERACTIVE 2.5D / 3D REPRESENTATION
→ FACILITY DIGITAL TWIN
→ ENGINEERING DIGITAL TWIN
```

Each stage can be built without throwing away the previous one.

---

## Reuse design — other FDG platforms

The spatial interface architecture must be designed for reuse, not hard-coded to one property.

| Platform | Future spatial use |
|---|---|
| FBPOIS | Building / Resort Digital Twin (first use case) |
| FEIS / FEIP | Engineering Project / Plant Visualization |
| Future FDG platforms | Their own spatial operational models |

---

## Out of scope for current milestone

Authentication, subscriptions, external integrations, and other platform concerns are outside Phase 1.

---

## Related

- [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/01_Platform_Experience_Design_Intelligence|Platform Experience & Design Intelligence]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0001 - Vision & Scope|FBPOIS Vision & Scope]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS Master Index]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/00_Index|00 Index]] → this document
