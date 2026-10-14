---
document_id: FEIS-QTO-0000-INDEX
title: FDG Engineering QTO and Drawing Measurement Intelligence Master Index
status: Approved Architecture Package
owner: FEIS
created: 2026-10-14
---

# FDG Engineering QTO & Drawing Measurement Intelligence

## Position

This is a canonical FEIS capability branch.

It is **not** the Construction OS.

Construction OS may consume its quantities, BOQ mappings, evidence and revision state, but QTO remains an engineering/drawing-measurement capability that can also be used independently.

## Product Name

**FDG Engineering QTO**

## Governing Thesis

```text
Drawing / PDF / CAD
→ Calibration
→ Geometry / Count
→ Quantity Object
→ Evidence + Provenance
→ Human Review
→ Canonical QTO Dataset
→ BOQ / Estimate / Procurement / Progress / Billing / Reports
```

The canonical QTO dataset is the source of truth. Excel, PDF, marked-up drawings and BOQ files are projections.

## Mandatory Principles

- Local-First
- Offline-Capable
- Agent-Neutral
- Provider-Replaceable
- CORE: Context, Origin, Reasoning, Evidence
- No dimensional computation without a valid calibration basis
- Unknown / ambiguous inputs are not guessed
- Human engineering authority remains explicit
- Agent proposals remain distinguishable from human-approved work
- Capture Once → Validate Once → Reuse Everywhere
- Full architecture in GitHub; build only the smallest authorized slice
- Enhancements after the first accepted release use traceable patches

## Canonical Documents

1. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0000 - FDG Engineering QTO Architecture|QTO Architecture]]
2. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0001 - Measurement Calibration Geometry and Quantity Data Contract|Measurement & Quantity Data Contract]]
3. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0002 - Provenance Evidence Review and Human Authority Standard|Provenance, Review & Human Authority]]
4. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0003 - Agent Neutral QTO Adapter and Local First Runtime|Agent-Neutral / Local-First Runtime]]
5. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0004 - Drawing Intelligence Sheet Graph Symbol and Schedule Extraction|Drawing Intelligence]]
6. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0005 - Multidiscipline QTO Semantics and Trade Capability Profiles|Multidiscipline QTO Profiles]]
7. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0006 - Construction OS BOQ Cost Procurement Progress and Billing Integration Contract|Construction OS Integration]]
8. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0007 - Benchmark Corpus Accuracy and Acceptance Standard|Benchmark & Acceptance]]
9. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-RSCH-0001 - OpenTakeoff Benchmark Extraction and FDG Gap Analysis|OpenTakeoff Benchmark Extraction]]
10. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0008 - L1 Exist First Implementation Blueprint|L1 Exist-First Blueprint]]
11. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0009 - QTO Workspace and Human Agent Review Experience|QTO UX / Review Experience]]
12. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0010 - Scope Requirement Coverage RFI and Revision Control Standard|Scope / Coverage / RFI / Revision Control]]
13. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-PATCH-0000 - Patch Register|Patch Register]]
14. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-PATCH-TEMPLATE|Patch Template]]
15. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0900 - Agent Build Handover|Agent Build Handover]]

## Prior FDG Decisions Consolidated

This package carries forward prior FDG decisions from PlanSwift/HVAC-QTO/Construction OS work:

- PDF/CAD import and calibrated measurement
- duct/pipe/insulation quantities, equipment/accessory counts and material summaries
- BOQ/BOM and estimating interfaces
- revision comparison and drawing review
- deterministic local measurement before optional model assistance
- Scope Requirement Register and Coverage Matrix
- RFI creation when data is missing, contradictory or ambiguous
- no assumptions for unknown units or dimensions
- evidence/provenance on every material quantity
- marked-up PDF and spreadsheet/BOQ deliverables
- human engineer as final technical authority
- benchmark corpus and multi-pass review
- model/provider cost and latency are secondary to correctness
- QTO quantity lineage must survive into budget, procurement, progress and billing

## First Working Slice

The first target is intentionally narrow:

```text
Open Drawing
→ Confirm Scale
→ Area / Linear / Count
→ Quantity Record
→ Review
→ Export BOQ / Spreadsheet + Marked PDF
```

Everything else remains in architecture for patches after this works.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] → this index.
