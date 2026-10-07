---
document_id: FPJIS-HOSP-0700
title: Food Beverage Ancillary and Inventory Blueprint
status: Blueprint
created: 2026-10-07
---

# Food, Beverage, Ancillary and Inventory Blueprint

## Boundary

Hospitality F&B reuses shared sales/product/inventory/payment primitives and existing restaurant capability patterns. The hotel layer adds guest/stay/room-charge context and cross-outlet consolidation.

## Outlet

- outlet_id;
- property;
- outlet type;
- department/cost center;
- operating hours;
- service modes;
- default tax/service-charge profile;
- cashiering rules;
- menu/catalog;
- kitchen routing;
- active/inactive state.

Examples:
- restaurant;
- bar;
- café;
- pool bar;
- room service;
- minibar;
- banquet;
- staff dining where applicable.

## Table / Seating

- table;
- section;
- capacity;
- state;
- reservation;
- assigned server;
- guest count;
- combined/split table support.

## Menu

Reuse Product/Service master with hospitality extensions:
- menu group;
- availability;
- recipe/ingredient link candidate;
- modifier/options;
- outlet;
- service period;
- price version;
- allergy/dietary metadata when authorized;
- kitchen station.

## Order Lifecycle

```text
Draft
→ Submitted
→ KOT Routed
→ Preparing
→ Ready
→ Served
→ Bill Requested
→ Settled / Posted to Room
→ Closed
```

Exceptions:
- Cancelled;
- Void Requested;
- Void Approved;
- Re-fire;
- Returned;
- Complimentary/Service Recovery;
- Payment Exception.

## Kitchen Order Ticket

KOT:
- order;
- outlet;
- station;
- item;
- modifier;
- quantity;
- course;
- fired_at;
- priority;
- state;
- server/table/room context where permitted.

No guest-sensitive profile data should be displayed in kitchen view unless operationally necessary.

## Room Charge

Room charge must validate:
- active in-house stay;
- property;
- room/guest;
- room-charge privilege/restriction;
- posting limit where configured;
- source outlet transaction;
- folio/window/billing instruction;
- amount;
- authorizing user/guest reference as required.

Flow:
```text
F&B Order
→ Check Stay / Room Charge Authority
→ Create Posting Request
→ PMS/Folio Accept
→ Posting Confirmation
→ Order Settlement
```

If PMS/folio service is unavailable:
- order can remain operationally completed;
- room-charge posting enters **Pending Posting**;
- outlet must not claim the charge is posted;
- reconciliation queue remains visible;
- payment alternative may be requested according to property policy.

## Split Settlement

Order may split by:
- seat;
- item;
- percentage;
- fixed amount;
- payment method;
- room + direct payment.

Reconciliation must preserve original order total.

## Discount / Void / Complimentary

Require:
- reason;
- authority;
- value;
- approval when threshold applies;
- linked complaint/service recovery when relevant.

## QR Ordering

Future optional capability:
```text
Guest QR
→ Outlet / Table / Room Context
→ Menu
→ Order
→ Confirmation
→ Kitchen
→ Payment / Room Charge
```

QR token must be scoped and expire. Room identity cannot be exposed through guessable public IDs.

## Captain / Mobile App

May be PWA/mobile workspace rather than separate native app initially.

Capabilities:
- table state;
- order entry;
- modifier;
- KOT status;
- guest/room lookup with permission;
- settle/request bill;
- offline queue where safe.

## Ancillary Services

Common booking object may support:
- spa;
- treatment;
- massage;
- recreation;
- court;
- cabana;
- tour;
- airport transfer;
- shuttle;
- equipment rental;
- meeting room;
- activity.

Fields:
- resource;
- capacity;
- timeslot;
- guest/stay;
- price;
- package inclusion;
- staff/resource assignment;
- cancellation;
- folio posting.

## Banquet / Events

Future profile:
- event;
- venue;
- date/time;
- setup;
- package;
- guaranteed pax;
- menu;
- equipment;
- room block;
- deposits;
- master folio;
- event order / function sheet;
- service departments.

Do not create a full event-management platform in v1 unless validated.

## Inventory

Reuse Common Business Core.

Operational views may include:
- central store;
- outlet stock;
- kitchen stock;
- minibar stock;
- housekeeping supplies;
- engineering spares reference.

Movement:
- receiving;
- issue;
- transfer;
- consumption;
- wastage;
- return;
- count adjustment.

## Procurement

```text
Reorder / Requisition
→ Approval
→ Purchase Request
→ Supplier / Quote
→ Purchase Order
→ Receiving
→ Invoice / Finance Interface
→ Stock
```

Hospitality does not duplicate supplier/procurement authority.

## Recipe / Consumption

Future:
- recipe;
- portion;
- theoretical consumption;
- actual consumption;
- variance.

Do not make food-cost reporting authoritative before recipe/yield/stock data quality is verified.

## Acceptance

F&B must demonstrate:
- order/KOT traceability;
- no duplicate folio posting on retry;
- room-charge reconciliation;
- void/discount audit;
- offline order capture rules;
- inventory linkage without silent negative-stock assumptions.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
