---
document_id: FPJIS-HOSP-0300
title: Hospitality User Role and Experience Blueprint
status: Blueprint
created: 2026-10-07
---

# User, Role and Experience Blueprint

## Experience Principle

One governed data model, multiple role-optimized workspaces.

A front-desk agent, housekeeper, engineer, cashier, restaurant captain and general manager should not use the same overloaded screen.

## Primary Roles

### Owner / Group Executive
Needs:
- portfolio occupancy/revenue;
- cash/revenue exceptions;
- property comparisons;
- guest satisfaction;
- room downtime;
- channel mix;
- unresolved high-severity issues;
- audit exceptions;
- CAPEX/maintenance implications.

### General Manager / Hotel Manager
Needs:
- today/tonight operating picture;
- arrivals/departures;
- occupancy;
- VIP/guest recovery;
- OOO/OOS rooms;
- unresolved service requests;
- staffing/operational bottlenecks;
- revenue/channel performance;
- daily close status.

### Front Office Manager
Needs:
- room rack;
- arrivals;
- departures;
- in-house;
- no-shows;
- group blocks;
- folio exceptions;
- room readiness;
- pending housekeeping/engineering;
- guest requests;
- cashier state.

### Reservations
Needs:
- availability;
- rate plans;
- booking sources;
- groups;
- corporate accounts;
- deposits;
- modifications;
- waitlist;
- restrictions;
- channel source.

### Front Desk Agent
Needs:
- search guest/reservation;
- walk-in;
- room assignment;
- check-in;
- key/access handoff reference;
- deposits;
- folio;
- guest requests;
- room move;
- checkout;
- payment.

### Night Auditor
Needs:
- unresolved departures;
- open cashiers;
- posting exceptions;
- room/guest discrepancy;
- unbalanced folios;
- integration failures;
- no-show candidates;
- pending room charges;
- business-date close;
- audit report.

### Concierge / Guest Services
Needs:
- guest requests;
- transport;
- luggage;
- activity/amenity;
- complaints;
- service recovery;
- communication history.

### Executive Housekeeper / Supervisor
Needs:
- dirty/clean/inspected queue;
- room priority;
- arrivals;
- stayovers;
- departures;
- assignment;
- inspection;
- linen/minibar exception;
- OOO/OOS coordination.

### Room Attendant
Mobile-first:
- assigned rooms;
- guest privacy/do-not-disturb;
- task state;
- linen/amenity exception;
- minibar observation;
- maintenance issue;
- photo/evidence where authorized;
- completion.

### Chief Engineer / Engineering Manager
Needs:
- room engineering defects;
- OOO/OOS;
- work-order priority;
- asset/location history;
- return-to-service;
- guest-impacting outages;
- plant/utility context.

Authority remains under FBPOIS/FEIS.

### Technician
Mobile-first:
- assigned concern/work order;
- room/location;
- guest impact;
- access constraint;
- observation;
- reading;
- work/evidence;
- verification;
- return-to-service recommendation.

### F&B Manager
Needs:
- outlets;
- sales;
- open tables;
- room charge failures;
- menu/item status;
- inventory/consumption;
- void/discount exceptions;
- KOT status.

### Captain / Waiter
Mobile-first:
- table;
- guest/room validation when room charge used;
- order;
- modifier;
- KOT;
- settlement/room posting status.

### Kitchen
Needs:
- KOT queue;
- course/status;
- prep delay;
- cancellation/void reason;
- outlet routing.

### Cashier
Needs:
- cashier session;
- tender;
- folio/payment;
- refund/void authority;
- cash count;
- discrepancy.

### Purchasing / Storekeeper
Needs:
- requisitions;
- stock;
- reorder;
- vendor;
- PO;
- receiving;
- issue/transfer;
- count/variance.

### Finance / Accounting
Needs:
- revenue posting interface;
- receivables;
- deposits/liabilities;
- payment reconciliation;
- taxes;
- chargeback/refund;
- outlet/property totals;
- audit trail.

Accounting remains the financial authority.

### Sales / Corporate / Events
Needs:
- accounts;
- negotiated rates;
- room blocks;
- rooming list;
- event/banquet;
- deposits;
- billing instructions;
- production/performance.

### Revenue / Distribution Manager
Needs:
- occupancy;
- pickup/pace;
- ADR/RevPAR;
- source/channel;
- restrictions;
- channel mapping;
- rate parity signal;
- sync health;
- booking-window/LOS.

### Security
Needs:
- incident;
- lost/found;
- access-sensitive guest event;
- emergency reference;
- restricted guest/room note by authority.

### System Administrator
Needs:
- organization/property config;
- roles;
- integrations;
- local/edge health;
- backup;
- sync;
- audit;
- release/version.

System admin must not automatically gain unrestricted access to sensitive guest/finance content.

## Guest Surfaces

Possible future guest experiences:
- booking engine;
- pre-arrival form;
- digital registration;
- guest request;
- QR menu;
- folio review;
- checkout request;
- feedback.

Guest self-service remains separately authorized and may depend on online services.

## Main Internal Navigation

Role-filtered:
1. Attention
2. Today / Property Pulse
3. Reservations
4. Front Office
5. Rooms
6. Housekeeping
7. Guest Requests
8. Engineering
9. F&B
10. Inventory / Procurement
11. Sales / Groups
12. Distribution
13. Cashiering / Folios
14. Reports
15. Audit
16. Settings / Integrations / Backup

## Property Pulse Hero

Near-full-bleed premium hero with transparent live-data overlay.

Show only decision-relevant truth:
- occupancy;
- available tonight;
- arrivals/departures;
- rooms dirty;
- rooms awaiting inspection;
- rooms OOO/OOS;
- unresolved guest-impact concerns;
- revenue today/business date;
- open cashier exception;
- distribution sync health;
- offline/sync state.

## Attention Center

Examples:
- guest arriving in 45 min; assigned room not inspected;
- OTA reservation received but mapping incomplete;
- room marked clean but engineering OOS active;
- checkout blocked by unposted outlet charge;
- duplicate payment reference;
- night audit blocked;
- rate sync stale;
- open security incident;
- cash discrepancy;
- high-value group deposit overdue.

Each item includes:
- severity;
- context;
- origin;
- reasoning;
- evidence;
- accountable owner;
- next action;
- deadline;
- resolution.

## UX Rule

Do not hide material exceptions behind a “green” overall dashboard.

A beautiful dashboard with stale or unresolved state must show the limitation.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
