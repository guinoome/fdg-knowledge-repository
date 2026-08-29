# FMIS-0008 — Materials, Spare Parts and Procurement

## Flow

```text
Maintenance Requirement
↓
Material Check
├── Available → Issue
└── Unavailable → PR/SRF → PO → Supplier → Delivery → Receiving → Stock Update
```

## Procurement Linkage

Maintenance procurement may link to work order, PM, asset, equipment, project, or stock requirement.

Existing concepts include PR, SRF, PO, status, requester, buyer, supplier, item, quantity, estimated cost, required-for reference, business impact, requested date, estimated delivery, actual delivery, and timeline.

## Strategic Spares

Existing engineering work includes cost center, tower, shared facility, trade, sub-trade, area, asset/item, budget driver, frequency, annual multiplier, strategic spare %, calculated quantity, unit, unit cost, annual budget, vendor, and supporting document.

## Inventory

Support on-hand, reserved, issued, reorder point, critical stock, out-of-stock, and reorder-required states.

An 80% reorder trigger exists as an established configurable example.

## Delay Intelligence

Distinguish material, procurement, supplier, contractor, approval, access, and manpower delays.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
