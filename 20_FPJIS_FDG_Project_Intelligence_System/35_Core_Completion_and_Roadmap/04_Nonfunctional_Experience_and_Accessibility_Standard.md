---
document_id: FPJIS-CORE-3504
title: FPJIS Nonfunctional Experience and Accessibility Standard
status: Approved Standard
owner: FPJIS
created: 2026-10-10
---

# FPJIS Nonfunctional, Experience & Accessibility Standard

## Purpose

Prevent implementation teams from receiving complete functional workflows but incomplete performance, resilience, device, experience, or accessibility requirements.

## Required NFR Categories

Every project must explicitly decide applicability for:

- performance;
- capacity/scale;
- availability;
- reliability;
- offline operation;
- synchronization;
- concurrency;
- backup/restore;
- recovery;
- security;
- privacy;
- accessibility;
- responsive behavior;
- supported devices/browsers;
- localization;
- units/currency/time zones;
- maintainability;
- observability;
- data retention;
- import/export;
- interoperability;
- provider replaceability;
- portability;
- deployment constraints;
- operational cost constraints.

Use:
[[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Nonfunctional_Requirements_Blueprint|Nonfunctional Requirements Blueprint]].

## Experience Contract

Every material screen/workflow should define:

- user goal;
- information hierarchy;
- primary action;
- secondary actions;
- role context;
- device context;
- desktop behavior;
- mobile behavior;
- tablet behavior where relevant;
- loading;
- empty;
- partial;
- error;
- restricted;
- read-only;
- unavailable;
- offline;
- syncing;
- conflict;
- success;
- attention/critical state;
- evidence drill-through;
- recoverability;
- accessibility;
- testable acceptance criteria.

## Responsive Rule

Responsive design is not desktop shrunk to mobile.

Mobile/field workflows should prioritize:
- immediate task;
- minimum required fields;
- large touch targets;
- camera/evidence;
- offline state;
- sync visibility;
- recoverable drafts.

## Accessibility Baseline

Address, as applicable:

- semantic structure;
- keyboard operability;
- focus states;
- labels;
- color-independent meaning;
- contrast;
- readable sizing;
- error identification;
- status announcements;
- touch target sizing;
- motion reduction;
- form validation;
- document accessibility.

Any waived item requires a reason.

## Performance Requirements

Avoid vague fast.

Specify:
- operation;
- environment;
- dataset size;
- target latency;
- acceptable degradation;
- timeout;
- failure behavior;
- measurement method.

Example:

~~~text
Operation: Save Site Event
Environment: Local device
Target: perceived immediate local save
Network: not required
Remote sync: asynchronous
Failure: visible queued state
~~~

## NFR Acceptance

A bounded module cannot reach 100% implementation readiness until all material NFR categories are defined, explicitly N/A with reason, or delegated to an approved shared standard.

## FPIS Relationship

FPIS supplies reusable experience design intelligence.

FPJIS records which FPIS patterns and acceptance requirements apply to a specific project/module.

## Screen Blueprint Hardening

The generic [[20_FPJIS_FDG_Project_Intelligence_System/05_Screen_Blueprints/Screen_Blueprint|Screen Blueprint]] is extended by this standard.
