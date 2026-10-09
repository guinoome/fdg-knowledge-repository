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

---

## Cross-Department Procurement Boundary — 2026-09-27

This FMIS flow represents the engineering-originating view of a purchase need. It does not make Engineering the owner of enterprise procurement.

Canonical interface:

Engineering/Maintenance Need and Technical Specification → PR/SRF → Approval/Budget Check → Procurement Sourcing and PO → Supplier/Delivery → Receiving → Engineering Technical Acceptance → Supplier Invoice → Finance AP/Payment → Supplier Performance Feedback.

Procurement owns sourcing, supplier qualification, approved vendors, commercial comparison, PO execution and expediting. Finance owns payable, payment and accounting controls. Engineering owns the originating technical requirement and technical acceptance. Legal supplies applicable commercial/legal requirements.

See [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Cross-Functional Ownership and Interface Matrix]].

---

## Maintenance Kitting and Reservation Extension — 2026-10-09

Material availability for planned work is extended to:

~~~text
Identified
→ On Hand
→ Reserved
→ Picked
→ Kitted
→ Staged
→ Issued
→ Consumed / Returned
~~~

Ready-to-Schedule criteria may require Reserved, Kitted or Staged status according to criticality/site policy.

FMIS should surface:
- work orders blocked by material;
- shortage age;
- expected delivery;
- reservation expiry;
- incomplete kit;
- material substitution requiring review.

Procurement ownership boundaries remain unchanged.
