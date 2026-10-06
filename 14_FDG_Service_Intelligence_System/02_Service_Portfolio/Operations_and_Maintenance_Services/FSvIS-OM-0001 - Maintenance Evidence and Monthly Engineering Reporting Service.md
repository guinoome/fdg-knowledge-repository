---
document_id: FSvIS-OM-0001
title: Maintenance Evidence and Monthly Engineering Reporting Service
system: FDG Service Intelligence System
status: Pilot Definition
maturity: S1 Defined - entering controlled pilot
owner: Francis
version: 0.1.0
created: 2026-10-06
---

# FSvIS-OM-0001 — Maintenance Evidence and Monthly Engineering Reporting Service

## Control

- Service ID: FSvIS-OM-0001
- Service Name: FDG Engineering Maintenance Evidence & Monthly Engineering Reporting Service
- Owner: Francis
- Version: 0.1.0
- Status: Pilot Definition
- Maturity: S1 Defined
- Last Review: 2026-10-06

## Context

### Problem / Need

Many small and mid-sized facilities hold maintenance information across spreadsheets, chat threads, photos, paper forms, technician notes and disconnected files. Management visibility, evidence continuity and pending-action tracking can therefore depend heavily on individual personnel.

### Intended Client

Initial hypothesis:
- hotels/resorts
- commercial buildings
- property/facility operators
- small industrial facilities
- schools/institutions
- multi-branch businesses with maintainable equipment
- contractors providing recurring maintenance services

### Target Outcome

Convert existing maintenance records and evidence into one management-ready periodic engineering package that identifies what was completed, what is due/overdue, what was found, what requires action, the evidence supporting it, and the next required activity.

### Value Proposition

The customer buys engineering visibility, evidence organization and continuity — not a software application.

## Scope — pilot

A tightly bounded pilot may include:
- intake of agreed maintenance records for one defined facility/asset scope and reporting period;
- PM status consolidation;
- finding/defect register;
- selected readings/observations normalization;
- evidence/photo register;
- overdue/open-action list;
- priority/action summary;
- management-ready monthly engineering report;
- next-period action list;
- traceable source references.

## Exclusions

Unless separately contracted:
- statutory certification;
- legal/regulatory opinion;
- professional sign/seal;
- site inspection not included in the agreed package;
- repair work;
- parts/material supply;
- remote control of equipment;
- 24/7 monitoring;
- CMMS migration;
- software deployment;
- financial audit;
- safety-critical decision made solely from incomplete customer records.

## Preconditions / Inputs

Client provides agreed source records and identifies an authorized contact. Missing, conflicting or unreliable data shall remain visible rather than guessed.

## Governing knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-004_MAINTENANCE_INTELLIGENCE_MODULE_STANDARD|FEIP Maintenance Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-020_SERVICE_DELIVERY_AND_FIELD_OPERATIONS_STANDARD|Service Delivery and Field Operations]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/05_FMIS_Preventive_Maintenance|FBPOIS Preventive Maintenance]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0014 - Reports|FWIS Reports]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD|Evidence and Provenance]]

## Delivery workflow

```text
Qualify facility/scope
→ Confirm input list
→ Receive records
→ Inventory and provenance check
→ Normalize PM / finding / evidence records
→ Identify missing/conflicting information
→ Build status and action view
→ Engineering review
→ Generate management report
→ Client review / clarification
→ Final controlled issue
→ Capture feedback, effort and next opportunity
```

## Deliverables

| Deliverable | Minimum content | Acceptance basis |
|---|---|---|
| Maintenance Status Register | asset/task/status/due/completed/source | Traceable to supplied evidence |
| Findings & Actions Register | finding/severity/action/owner/due/status | No unsupported conclusion |
| Evidence Index | file/photo/source/date/reference | Source can be located |
| Monthly Engineering Report | executive status, completed, overdue, findings, actions, next period | Agreed scope represented accurately |
| Pilot Metrics | delivery hours, founder hours, rework, missing data | Recorded for FBIS/FAIS review |

## Pricing experiment

Initial pilot list price: **PHP 4,999** for the explicitly defined pilot scope.

Founding Five campaign:
- first five verified paid pilot customers;
- **50% promotional price = PHP 2,499.50**;
- no fake scarcity;
- payment order determines qualification;
- material scope expansion requires repricing.

Recurring monthly pricing begins from PHP 4,999/month only after scope and delivery burden are validated. This is a pilot hypothesis, not a permanent tariff.

## Quality / acceptance criteria

- no invented maintenance completion;
- no guessed readings;
- missing evidence identified;
- conflicting records flagged;
- recommendations separated from approved corrective scope;
- report traceable to source records;
- unresolved actions remain visible;
- client-requested corrections preserve revision history;
- professional/regulatory claims pass applicable authority review.

## Economics to measure

- revenue
- founder hours
- total delivery hours
- direct cost
- effective revenue/founder hour
- revisions
- support burden
- acquisition effort
- recurring conversion
- next-service opportunities

## Productization rule

Do not build a new application for this service merely because a digital workflow is desirable.

Only after repeated paid delivery should [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]] identify repetitive bottlenecks and [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] evaluate productization.

## Knowledge capture

Each pilot should produce:
- sanitized reusable workflow improvements;
- recurring missing-data patterns;
- common asset/problem taxonomy;
- report sections customers actually use;
- frequent corrective opportunities;
- time/cost benchmarks;
- objections and buying reasons;
- candidate automation steps.

## Change history

- 2026-10-06 — v0.1.0: Initial founder-directed pilot definition created under the first-payout commercial validation program.

## FPJIS pilot implementation relationship — 2026-10-07

Project-level validation, local-first implementation requirements, data/evidence handling, release gates and future agent execution are governed by:

[[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FDG First-Payout Commercial Validation Blueprint Package]].

FSvIS continues to own the service definition and maturity. The FPJIS package must not silently alter this service's scope, exclusions, acceptance criteria or professional boundaries.
