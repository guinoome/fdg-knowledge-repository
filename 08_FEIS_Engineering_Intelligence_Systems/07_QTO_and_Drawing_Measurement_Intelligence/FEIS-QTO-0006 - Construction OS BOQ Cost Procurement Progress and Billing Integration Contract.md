---
document_id: FEIS-QTO-0006
title: Construction OS BOQ Cost Procurement Progress and Billing Integration Contract
status: Approved Integration Contract
created: 2026-10-14
---

# FEIS-QTO-0006 — Construction OS Integration Contract

## Purpose

Make FDG Engineering QTO directly useful to the Construction OS without making QTO part of Construction OS.

## Authority Boundary

**FEIS QTO owns:**
- drawing/source identity;
- calibration;
- measured geometry/count;
- quantity item;
- measurement provenance;
- engineering review state;
- drawing revision impact.

**Construction OS owns:**
- project budget baseline;
- procurement demand;
- commitments;
- delivery/receiving;
- installed quantity/progress;
- billing support;
- construction change workflow;
- project commercial status.

## Living Quantity Baseline

A BOQ item must not die after estimating.

```text
Drawing
→ QTO Measurement
→ Quantity Item
→ BOQ Item
→ Budget Baseline
→ Material Requirement
→ RFQ / PO
→ Delivery
→ Issued / Installed Quantity
→ Progress
→ Billing Evidence
→ Forecast / Variance
```

## QTO-to-BOQ Contract

Minimum linkage:
```text
qto_quantity_item_id
measurement_ids[]
drawing_revision
discipline
system
item_code
description
quantity
unit
measurement_basis
waste / multiplier if used
WBS
cost_code
spec_reference
review_state
approved_by
approved_at
```

The BOQ stores the approved quantity snapshot and its source reference.

## Revision Impact

When drawing/QTO changes:

```text
New QTO Revision
→ Delta
→ Affected BOQ Item
→ Compare to Approved Baseline
→ Change Candidate
→ Review
```

Do not silently overwrite:
- approved budget;
- issued PO;
- received material;
- certified progress;
- approved billing.

## Procurement

QTO may generate demand quantities.

Procurement determines:
- vendor;
- RFQ;
- commercial comparison;
- PO;
- committed amount;
- delivery.

QTO does not become procurement authority.

## Progress

Installed quantity should reference the BOQ/QTO item but is a separate field event/evidence record.

```text
QTO Design Quantity
≠
Delivered Quantity
≠
Installed Quantity
≠
Billed Quantity
```

The system must preserve all four.

## Billing

Billing eligibility may use approved installed quantity and evidence.

QTO design quantity is not proof of accomplishment.

## Change / Variation

A revised drawing may create:
- Added quantity
- Reduced quantity
- Reclassified quantity
- Changed specification
- New item
- Deleted item

The Construction OS turns this into a governed change/variation workflow.

## Attention Center

Examples:
- QTO revision exceeds budget baseline;
- procurement already committed against superseded quantity;
- installed quantity exceeds approved design quantity;
- billing quantity exceeds verified installed quantity;
- drawing revision not reflected in BOQ;
- unresolved QTO ambiguity affects procurement deadline.

## Commercial Value

This contract allows management to trace:
```text
Why did this project's margin move?
→ BOQ item
→ QTO change
→ drawing revision
→ procurement / installed / billed impact
→ evidence
```

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|Construction OS]] → this contract.
