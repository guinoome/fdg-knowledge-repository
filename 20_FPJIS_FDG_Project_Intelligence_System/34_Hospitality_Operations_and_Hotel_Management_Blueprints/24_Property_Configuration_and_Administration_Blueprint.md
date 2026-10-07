---
document_id: FPJIS-HOSP-2400
title: Hospitality Property Configuration and Administration Blueprint
status: Blueprint
created: 2026-10-07
---

# Property Configuration and Administration Blueprint

## Principle

Hotel rules must be configurable, effective-dated and auditable where operationally material.

Do not scatter property policy across UI code.

## Property Master

- organization/legal entity reference;
- property code/name;
- address/location;
- timezone;
- currency;
- business-date policy;
- default language;
- room inventory;
- contact;
- branding;
- active state.

## Spatial Master

- building;
- wing;
- floor;
- zone;
- room;
- outlet;
- public area;
- back-of-house area.

## Room Type Master

- code/name;
- capacity;
- bed setup;
- attributes;
- sellable;
- default occupancy;
- extra-person rules reference;
- linked rooms where applicable.

## Rate Configuration

- rate plan;
- market segment;
- source;
- meal/inclusion;
- currency;
- price schedule;
- occupancy;
- child/extra-person;
- cancellation rule;
- guarantee/deposit;
- restrictions;
- effective period.

## Package

Package may combine:
- room;
- breakfast;
- meal;
- spa;
- activity;
- transport;
- credit/inclusion.

Allocation to revenue categories must be explicit for financial reporting.

## Meal Plan / Inclusion

Examples:
- room only;
- breakfast;
- half/full board;
- package-specific.

Do not hardcode terminology if target property uses another structure.

## Front Office Policy

Configurable:
- check-in/out times;
- early/late rules;
- walk-in;
- deposit;
- room move;
- key process;
- no-show;
- cancellation;
- overbooking;
- DND/privacy handling.

## Housekeeping Policy

- cleaning types;
- inspection requirement;
- room readiness rule;
- linen cycles;
- minibar verification;
- task priority;
- DND escalation.

## Engineering / OOO Policy

Reference FBPOIS:
- severity;
- OOO/OOS classification;
- return-to-service;
- escalation;
- expected downtime.

## Cashiering Policy

- cashier session;
- tender;
- float;
- variance threshold;
- discount/void/refund authority;
- payment verification.

Thresholds are property configuration, not code constants.

## Night Audit Policy

- cut-off;
- scheduled charges;
- blocker/warning classification;
- no-show rule;
- business-date progression;
- report set;
- posting interface.

## F&B Configuration

- outlets;
- tables;
- menus;
- kitchen stations;
- service charge/tax reference;
- room charge;
- KOT;
- discount authority.

## Inventory / Procurement Configuration

Consume shared:
- warehouses;
- stores;
- reorder;
- approval;
- vendor;
- UOM.

## Distribution Configuration

- channel;
- room mapping;
- rate mapping;
- sync mode;
- allotment;
- offline safety;
- stop-sell.

## Direct Booking

- public property description;
- room/rate presentation;
- packages;
- terms;
- deposit/payment;
- confirmation;
- privacy/consent.

## Communication Templates

- purpose;
- channel;
- language;
- version;
- approval;
- variables;
- consent rule;
- active dates.

## User / Role Administration

- user;
- role;
- property;
- department;
- permission;
- delegation;
- shift/scope;
- status.

## Configuration Change

Material configuration change records:
- previous;
- new;
- effective_at;
- changed_by;
- reason;
- approved_by where needed.

## Configuration Promotion

For multiple properties:
- draft template;
- review;
- target properties;
- preview;
- effective date;
- property exceptions;
- acknowledgement.

## Environment Configuration

Separate:
- local;
- test;
- staging;
- production.

Never point local test to production connectors by default.

## Backup

Property configuration included in backup and release manifest.

## Acceptance

A fresh synthetic property can be configured without source-code edits for normal differences in:
- rooms;
- rates;
- outlets;
- roles;
- policies;
- channels;
- payment methods;
- report parameters.

Code change is reserved for new capability, not ordinary property setup.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this annex.
