---
document_id: FPJIS-HOSP-0100
title: FDG Hospitality Operations Platform - Project and Product Blueprint
status: Blueprint - Not Build Authorized
created: 2026-10-07
---

# Project and Product Blueprint

## Problem

Hotels and resorts commonly operate across multiple operational surfaces:
- reservation/OTA systems;
- front desk;
- guest folios;
- restaurant POS;
- housekeeping;
- engineering/maintenance;
- inventory/procurement;
- finance/accounting;
- guest messaging;
- direct booking;
- sales/corporate accounts;
- analytics.

When those systems do not share trustworthy state, staff duplicate data, room status diverges, guest charges are missed, overbooking risk rises, maintenance becomes disconnected from room readiness, and management reports require reconciliation.

## Target Outcome

Create one governed hospitality operating platform where the same guest, reservation, room, stay, charge, housekeeping state, maintenance condition, inventory event and payment can be traced across departments without forcing every domain into one monolithic module.

## Target Property Types

Initial:
- hotels;
- resorts;
- boutique hotels;
- serviced accommodation;
- small multi-property groups.

Future configurable profiles:
- hostels;
- villas;
- apart-hotels;
- mixed-use hospitality;
- property-management/operator groups.

## Product Modes

### Mode A — Small Property Local
Single local property, one or few terminals, local-first operation.

### Mode B — Property Edge
Multiple front-desk/operations devices on a property LAN connected to a local edge service; cloud optional.

### Mode C — Connected Cloud / Multi-Property
Property edge or online clients synchronize to central services for group reporting, distribution, remote management and selected integrations.

A future customer should not have to redesign operational semantics when moving from A → B → C.

## Product Surfaces

- Front Office Workspace
- Reservations Workspace
- Housekeeping Workspace
- Guest Services Workspace
- Engineering / Maintenance Workspace
- F&B / Restaurant Workspace
- Procurement / Stores Workspace
- Finance / Cashier Workspace
- Sales / Corporate / Group Workspace
- Revenue / Distribution Workspace
- Security / Incident Workspace
- Management Attention Center
- Owner / Group Dashboard
- Guest Self-Service / Booking Engine
- Mobile Staff Workspaces

## Scope

In scope:
- reservations;
- availability;
- room/rate plans;
- guest profiles;
- check-in/out;
- group/corporate bookings;
- folios;
- deposits;
- payments;
- housekeeping;
- guest requests;
- maintenance linkage;
- restaurant/ancillary charge posting;
- inventory/procurement interfaces;
- direct booking;
- distribution adapter;
- communication;
- audit;
- management reporting;
- offline/local continuity;
- multi-property model.

Out of initial scope unless separately authorized:
- full accounting replacement;
- payroll reimplementation;
- building-plant engineering duplication;
- direct integration to hundreds of OTAs;
- biometric/door-lock/hardware integration;
- statutory tax logic without approved Philippine capability pack;
- autonomous dynamic pricing;
- production guest mobile app;
- production cloud multi-tenancy before local validation.

## Strategic Differentiation

FDG should differentiate on:
- hospitality + engineering integration;
- room readiness tied to actual maintenance evidence;
- local outage continuity;
- Capture Once / Reuse Everywhere;
- real auditability of guest charges and operational decisions;
- multi-property owner visibility;
- Philippines-first capability packs;
- provider replacement;
- premium role-specific UX rather than one overloaded screen.

## Success Criteria

A validated implementation must demonstrate one complete synthetic guest journey:

```text
Reservation
→ Room Allocation
→ Pre-arrival
→ Check-in
→ In-house Stay
→ Housekeeping / Guest Request
→ F&B Charge
→ Maintenance Exception
→ Resolution
→ Checkout
→ Payment
→ Night Audit
→ Management Report
```

with traceable source records and no remote dependency for core property operation.

## Architectural Boundary

Hospitality-specific truth owns:
- room;
- room type;
- rate plan;
- reservation;
- stay;
- guest folio;
- housekeeping state;
- group/rooming list;
- property-specific hospitality workflow.

Shared core owns/reuses:
- organization;
- party/contact;
- employee;
- supplier;
- product/service;
- inventory;
- purchasing;
- payment method;
- invoice/payment;
- financial posting interface;
- tax profile;
- audit.

FBPOIS/FEIS own:
- engineering work;
- maintenance;
- equipment condition;
- plant operations;
- technical evidence.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
