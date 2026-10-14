---
document_id: FEIS-QTO-0000
title: FDG Engineering QTO Architecture
status: Approved Direction
owner: FEIS
created: 2026-10-14
---

# FEIS-QTO-0000 — FDG Engineering QTO Architecture

## Purpose

Define one reusable quantity-takeoff and drawing-measurement architecture for Architectural, Civil, Structural interfaces, Mechanical, Electrical, Plumbing, Fire Protection, Auxiliary/ELV and other future FEIS disciplines.

## Boundary

FDG Engineering QTO is a **FEIS capability pack**.

It is not:
- the whole FEIS;
- Construction OS;
- an accounting system;
- a procurement system;
- a generic PDF viewer.

It provides governed engineering quantities and evidence to those systems.

## Architecture

```text
INPUT LAYER
PDF / CAD / Image / Drawing Set / Schedule / Specification
        ↓
DOCUMENT INTELLIGENCE
Sheets / Title Blocks / Revisions / Text / Vectors / Symbols / Schedules
        ↓
CALIBRATION
Sheet / View / Detail Scale + Confirmation
        ↓
MEASUREMENT KERNEL
Area / Linear / Count / Surface / Volume-derived inputs / Deductions
        ↓
DISCIPLINE SEMANTICS
Trade / System / Item / Unit / Basis / WBS / Cost Code / Spec Reference
        ↓
PROVENANCE + REVIEW
Actor / Method / Evidence / Confidence / Review / Human Approval
        ↓
CANONICAL QTO DATASET
        ↓
OUTPUT / INTEGRATION
BOQ / BOM / Estimate / Excel / PDF / Marked Drawing / DXF Adapter
Construction OS / Procurement / Progress / Billing / Knowledge
```

## One Kernel, Multiple Interfaces

```text
                 QTO KERNEL
                    │
       ┌────────────┼────────────┐
       ↓            ↓            ↓
 Human Workspace  Agent Adapter  API / Import Adapter
       │            │
       │       Nex / OpenAI / Claude / Local / Future
       │            │
       └──────same records────────┘
```

No provider owns the engineering truth.

## Capability Layers

### A. Drawing Intake
- multi-sheet PDF
- scanned plan
- CAD/vector-capable PDF
- image
- future DWG/DXF/IFC/BIM adapter
- addenda / revised drawings
- specifications and schedules

### B. Calibration
- scale note detected/read as evidence only
- user/engineer confirms or sets calibration
- multiple scales on one sheet supported through view/detail context
- dimensional measurement refuses unknown calibration
- recalibration triggers quantity recomputation, not geometry mutation

### C. Measurement
- polygon area
- linear run
- count
- surface area
- deductions/openings
- grouped/derived measurements
- condition/item mapping
- revision-aware quantity comparison

### D. Engineering Semantics
- discipline
- system
- item
- quantity type
- unit
- measurement basis
- waste/multiplier where applicable
- drawing/specification reference
- WBS/cost code
- BOQ/BOM linkage

### E. Review
- proposed
- review required
- corrected
- approved
- rejected/withheld
- superseded

### F. Outputs
Outputs are generated views, never the sole source of truth.

## Safety Doctrine

```text
Unknown Scale → Stop
Unknown Unit → Review Required
Conflicting Drawings → RFI / Conflict
Unresolved Schedule Match → Withhold
Agent Proposal → Pending Review
Human-Approved Measurement → Protected
```

## Universal vs Trade-Specific

Universal:
- geometry
- scale
- quantity types
- provenance
- review
- evidence
- revision
- output contracts

Trade-specific:
- what is measured;
- unit rules;
- item taxonomy;
- system relationships;
- schedules;
- technical acceptance;
- assumptions prohibited/allowed;
- qualified review authority.

## Architecture Completeness vs Build Scope

Full architecture is preserved now.

Current implementation must obey:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/15_Architecture_Complete_Build_Narrow_Standard|Architecture Complete, Build Narrow]]
and
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Exist First, Enhance by Traceable Patches]].

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → this architecture.
