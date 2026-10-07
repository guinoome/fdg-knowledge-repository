---
document_id: FPJIS-HOSP-0200
title: Hospitality Capability and Module Architecture
status: Blueprint
created: 2026-10-07
---

# Hospitality Capability and Module Architecture

## Layer Model

```text
FDG Platform Foundation
        ↓
FDG Common Business Core
        ↓
Hospitality Capability Pack
        ↓
Operational Workspaces
        ↓
Workflow / Intelligence / Automation
        ↓
Role-Specific Experiences
```

## Capability Map

### 1. Property / Organization
- property;
- building/wing/floor;
- room inventory;
- operating calendar;
- outlets;
- departments;
- business date;
- timezone;
- currency;
- property status;
- multi-property hierarchy.

### 2. Reservations & Front Office
- availability search;
- reservations;
- walk-ins;
- room allotment;
- group bookings;
- rooming list;
- corporate/travel-agent bookings;
- arrival/departure;
- check-in/out;
- room move;
- extension;
- early/late arrival/departure;
- no-show/cancellation;
- waitlist;
- stay history.

### 3. Rate / Revenue Operations
- room type;
- rate plan;
- package;
- inclusions;
- restrictions;
- occupancy-based rates;
- date-based rates;
- corporate rates;
- promo codes;
- stop-sell;
- minimum/maximum stay;
- close-to-arrival/departure;
- inventory controls;
- future revenue-management adapter.

### 4. Guest / Profile / CRM
- individual guest;
- family/companion;
- company/corporate account;
- travel agent/source;
- preferences;
- communication consent;
- service recovery;
- repeat history;
- VIP/attention flags with controlled visibility.

### 5. Folio / Cashiering / Payments
- guest folio;
- sub-folio/windows;
- room charge;
- outlet charge;
- deposit;
- advance payment;
- payment;
- transfer;
- allowance/discount;
- void/reversal;
- refund;
- split billing;
- company billing;
- AR handoff;
- tax/commercial interface.

### 6. Housekeeping
- clean/dirty/inspected;
- occupied/vacant context;
- stayover/departure;
- cleaning task;
- room assignment;
- inspection;
- linen;
- minibar/amenity;
- lost & found;
- out-of-order/out-of-service coordination.

### 7. Guest Requests / Concierge
- service request;
- amenity request;
- wake-up;
- transport;
- luggage;
- room service link;
- complaint;
- service recovery;
- escalation;
- guest communication.

### 8. Engineering / Maintenance
Do not duplicate FBPOIS.

Hospitality layer references:
- room/equipment concern;
- guest impact;
- OOO/OOS;
- work order;
- maintenance status;
- verification;
- room return-to-service.

Authority:
[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|FBPOIS/FWIS]].

### 9. F&B / Restaurant / Bar
Reuse Restaurant/common business capabilities:
- table;
- reservation;
- order;
- KOT;
- menu;
- modifier;
- outlet;
- POS;
- room-charge posting;
- discount;
- settlement;
- kitchen state;
- QR ordering;
- captain/mobile workflow.

### 10. Ancillary Revenue
Configurable:
- spa;
- recreation;
- pool/cabana;
- tours;
- transport;
- banquet/events;
- meeting rooms;
- activity scheduling;
- rental;
- packages.

### 11. Inventory / Procurement
Reuse Common Business Core:
- item;
- outlet stock;
- central store;
- requisition;
- purchase request;
- PO;
- receiving;
- transfer;
- issue/consumption;
- wastage;
- vendor;
- stock count.

### 12. Sales / Groups / Events
- lead/account;
- corporate rate agreement;
- group block;
- allotment;
- rooming list;
- event/banquet inquiry;
- proposal;
- deposit milestone;
- master folio;
- billing instruction.

### 13. Distribution
- channel;
- channel account;
- room/rate mapping;
- availability/rate/restriction sync;
- reservation ingest;
- modification;
- cancellation;
- sync health;
- provider adapter.

### 14. Direct Booking Engine
- availability;
- rate comparison;
- promo/package;
- guest details;
- deposit/payment;
- confirmation;
- source attribution;
- mobile-first web flow.

### 15. Communication
- email;
- SMS candidate;
- WhatsApp candidate;
- internal notification;
- templates;
- trigger;
- opt-in/consent;
- delivery status;
- provider adapter.

### 16. Security / Incidents
- access/role;
- audit;
- incident;
- safety/security event;
- guest-impact restriction;
- lost & found;
- emergency/evacuation references where appropriate.

### 17. Reporting / Analytics
- occupancy;
- ADR;
- RevPAR;
- revenue;
- source/channel;
- pickup/pace;
- cancellation/no-show;
- housekeeping productivity;
- room downtime;
- maintenance impact;
- F&B/ancillary;
- payments;
- audit exceptions;
- owner/group rollup.

## Module Composition Rule

Workspaces may combine capabilities for a role, but underlying records retain canonical ownership.

Example:
Front Office screen may display:
- reservation;
- guest;
- room status;
- folio;
- housekeeping;
- maintenance flag.

That does not make Front Office the owner of maintenance truth.

## No Duplicate Module Rule

Do not create separate hospitality versions of:
- payroll;
- procurement;
- inventory core;
- accounting core;
- engineering maintenance;
- authentication;
- audit;
- workflow engine.

Create hospitality profiles/adapters over those shared capabilities.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
