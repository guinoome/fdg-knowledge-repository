---
document_id: FEIS-QTO-0001
title: Measurement Calibration Geometry and Quantity Data Contract
status: Approved Standard
created: 2026-10-14
---

# FEIS-QTO-0001 — Measurement, Calibration, Geometry & Quantity Data Contract

## Core Invariant

A quantity must be reproducible from its drawing context, calibration, geometry/count record and calculation rule.

## Canonical Objects

### DrawingDocument
```text
document_id
project_id
file_hash
filename
document_type
revision
received_at
source
supersedes
status
```

### DrawingSheet
```text
sheet_id
document_id
sheet_number
sheet_title
discipline
revision
width
height
rotation
scale_state
scale_source
calibration_id
```

### Calibration
```text
calibration_id
sheet_id
region_or_view_id optional
scale_type
drawing_units
real_units
units_per_coordinate
source_text / dimension_reference
confirmed_by
confirmed_at
status
```

States:
- Unset
- Detected — Unconfirmed
- Confirmed
- Conflicting — Review Required
- Superseded

### Measurement
```text
measurement_id
sheet_id
view/detail context
geometry_type
geometry
quantity_type
raw_value
unit
condition/item_id
origin
review_state
created_at
updated_at
```

Geometry types:
- polygon
- polyline
- point/count
- arc/curve representation
- surface proxy
- derived relationship

Quantity types:
- area
- linear
- count
- surface
- volume-derived
- custom governed quantity

### QuantityItem
```text
quantity_item_id
discipline
system
item_code
description
measurement_basis
unit
waste_pct optional
multiplier optional
height/depth/thickness optional
spec_reference
drawing_reference
WBS
cost_code
BOQ_item_id
BOM_item_id
```

## Scale Gate

Dimensional tools shall refuse authoritative output when the applicable calibration is not confirmed.

A printed scale note may be detected, but detection is evidence, not authority.

## Recalibration

Geometry remains attached to the drawing coordinate frame.

If calibration changes:
- dimensional quantities recompute;
- count quantities remain unchanged;
- the previous calibration is preserved;
- affected quantities are flagged as recalculated;
- reviewed/approved work follows configured human-authority rules;
- material/BOQ projections refresh from the new canonical quantity.

## Mixed Scale Sheet

Support:
- overall plan scale;
- enlarged detail scale;
- section/elevation scale;
- view-specific calibration.

A measurement must know which calibration applies.

## Unit Safety

Unknown or contradictory units must not be silently normalized.

```text
unit_status:
Confirmed
Converted with explicit rule
Unknown — Review Required
Conflicting — Review Required
```

## Quantity Lineage

```text
Drawing Revision
→ Sheet
→ Calibration
→ Measurement
→ Quantity Item
→ BOQ/BOM
→ Estimate/Budget
→ Downstream Transactions
```

Changing an upstream source must never silently rewrite downstream approved commercial facts.

## Duplicate / Collision Control

The engine should detect:
- duplicate counts;
- overlapping polygons;
- double-measured areas;
- conflicting item assignments;
- same source geometry mapped twice;
- stale measurement against superseded drawing.

Resolution is recorded rather than silently deduplicated.

## Revision Comparison

Required future capability:

```text
Rev A measurement
vs
Rev B measurement
→ Added
→ Removed
→ Changed Geometry
→ Changed Item
→ Changed Quantity
→ Review Impact
```

## Canonical Record vs Output

Excel/PDF/BOQ are generated from this dataset. They do not replace it.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|Transaction Lineage]] → this contract.
