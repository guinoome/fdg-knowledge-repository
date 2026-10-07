---
document_id: FPJIS-HOSP-2200
title: Hospitality Implementation Onboarding Migration and Support Blueprint
status: Blueprint
created: 2026-10-07
---

# Implementation, Onboarding, Migration and Support Blueprint

## Principle

A hotel platform is not ready because the software runs.

A property is ready when configuration, data, users, procedures, training, cutover, support and recovery are all controlled.

## Implementation Lifecycle

```text
Commercial / Pilot Approval
→ Property Discovery
→ Current-State Process Map
→ Data / Integration Assessment
→ Configuration Workbook
→ Migration Mapping
→ Local Sandbox
→ User Validation
→ Training
→ Cutover Rehearsal
→ Go-Live Readiness
→ Controlled Pilot / Cutover
→ Hypercare
→ Operational Support
→ Post-Implementation Review
```

## Property Discovery

Capture:
- property type;
- room count/types;
- buildings/wings/floors;
- outlets;
- services/amenities;
- current PMS/POS/channel manager;
- OTA mix;
- booking engine;
- payment methods;
- accounting;
- housekeeping workflow;
- engineering/maintenance workflow;
- night audit;
- reports;
- user roles;
- shift model;
- network/internet;
- local hardware;
- backup;
- pain points;
- regulatory constraints;
- target scope.

## Current-State Mapping

Identify:
- duplicate entry;
- spreadsheets;
- paper logs;
- WhatsApp/chat workflows;
- manual OTA updates;
- manual room-state calls;
- charge-posting gaps;
- maintenance/room readiness gaps;
- report reconciliation;
- cash controls;
- data quality.

Do not automate a broken or undefined process without deciding whether to preserve or redesign it.

## Configuration Workbook

Before system configuration define:
- property structure;
- room types/rooms;
- rates;
- packages;
- seasons;
- restrictions;
- outlets;
- payment methods;
- departments;
- tax/service-charge profiles;
- users/roles;
- channels;
- reporting;
- night-audit policy;
- backup;
- offline sell-safety;
- integration scope.

Configuration is versioned.

## Data Migration Sources

Potential:
- current PMS export;
- Excel/CSV;
- reservation ledger;
- guest profiles;
- future reservations;
- corporate accounts;
- rate plans;
- room master;
- deposits;
- open folios;
- outstanding receivables reference;
- room status;
- groups/events.

Historical migration depth should be a deliberate decision.

## Migration Rules

Every migrated record has:
- source system/file;
- source ID;
- target ID;
- mapping version;
- import batch;
- validation status;
- exception.

Never lose source identifiers during migration.

## Migration Reconciliation

Validate:
- room counts;
- future reservations by date/room type;
- deposits;
- open folio balances;
- group blocks;
- corporate accounts;
- guest counts where relevant;
- channel mappings.

Financial totals require Finance review.

## Cutover

Define:
- freeze time;
- last source-system transaction;
- final export;
- import;
- reconciliation;
- user login;
- connector activation;
- backup;
- rollback trigger;
- manual contingency.

## Parallel Run

Use where risk justifies:
- compare selected reservations;
- room status;
- cashier/payment totals;
- night audit;
- reports.

Do not maintain indefinite double entry as normal operation.

## Training

Role-specific, scenario-based:
- Front Desk;
- Reservations;
- Housekeeping;
- Engineering;
- F&B;
- Cashier/Night Audit;
- Finance;
- Management;
- Admin.

Training evidence:
- attendee;
- role;
- module;
- scenario;
- result;
- gaps.

## Competency Gate

High-risk activities may require explicit competency/authorization:
- night audit;
- refund;
- bulk rate change;
- user administration;
- connector configuration;
- restore.

## Support Model

Support record:
- incident/request;
- property;
- severity;
- module;
- impact;
- evidence;
- workaround;
- owner;
- response;
- resolution;
- root cause category;
- release/fix;
- knowledge article.

## Severity

- P1 Critical: property cannot perform core operation, data/security/payment/reservation integrity at risk.
- P2 High: major function impaired with limited workaround.
- P3 Medium: important defect with workaround.
- P4 Low: minor/configuration/question.

Actual response commitments are contractual and must not be invented in code.

## Support Channels

Possible:
- in-app;
- email;
- messaging;
- phone;
- support portal.

Provider/channel choice remains replaceable.

## Knowledge Base

Sanitized recurring support solutions may become governed knowledge.

Do not store client confidential data in public support articles.

## Update Management

Release:
- version;
- change notes;
- affected modules;
- migration;
- downtime;
- rollback;
- required training;
- property acknowledgment where material.

## Property Update Rule

Do not force a major update during active peak operation without approved deployment plan.

## Hypercare

Initial go-live period may increase:
- monitoring;
- reconciliation;
- support coverage;
- daily review.

Duration is project-specific.

## Acceptance

Implementation closes only when:
- data reconciled;
- users trained;
- backup/restore proven;
- support path active;
- integrations reconciled;
- known issues accepted;
- operational owner accepts;
- handover stored.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this annex.
