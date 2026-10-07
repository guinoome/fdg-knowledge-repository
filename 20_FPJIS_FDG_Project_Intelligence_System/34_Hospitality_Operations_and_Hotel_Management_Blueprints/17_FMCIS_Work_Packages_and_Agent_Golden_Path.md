---
document_id: FPJIS-HOSP-1700
title: Hospitality FMCIS Work Packages and Agent Golden Path
status: Blueprint - No Work Package Authorized by This File
created: 2026-10-07
---

# FMCIS Work Packages and Agent Golden Path

## Governing Pattern

One primary builder per bounded work package.

Independent review where risk justifies it.

No agent may rewrite another collaborator's assigned area without explicit authorization.

## Build Phases

### Phase 0 — Preflight
**WP-H00 Repository Preflight**

Read:
- this package;
- current authoritative links;
- active implementation handover;
- changed files since blueprint verification.

Output:
- exact branch/head;
- conflicts;
- authorization;
- implementation repo/location proposal.

No code.

### Phase 1 — Local Hospitality Kernel

**WP-H01 Application Shell + Design System**
- local shell;
- navigation;
- responsive layout;
- offline static assets;
- no cloud.

**WP-H02 Domain Model + Local/Edge Store**
- core types;
- repositories;
- event envelope;
- migrations;
- audit;
- backup.

**WP-H03 Property / Room / Rate Kernel**
- property;
- room types;
- rooms;
- rate plans;
- room-state dimensions.

Dependencies: H01/H02.

### Phase 2 — Core Stay Operations

**WP-H04 Reservation / Availability**
- reservations;
- availability;
- modifications;
- cancellation;
- group primitives.

**WP-H05 Front Office / Stay**
- room assignment;
- check-in;
- in-house;
- room move;
- checkout.

**WP-H06 Folio / Cashiering**
- folio;
- posting;
- deposit;
- payment stub;
- split billing;
- audit.

**WP-H07 Night Audit**
- business date;
- precheck;
- idempotent close;
- daily snapshot.

### Phase 3 — Rooms / Service Delivery

**WP-H08 Housekeeping**
- task/assignment;
- clean/inspect;
- priority;
- room readiness.

**WP-H09 Guest Requests**
- request;
- SLA;
- escalation;
- complaint.

**WP-H10 Engineering Interface**
- FBPOIS concern/work-order adapter contract;
- OOO/OOS;
- return-to-service.

No duplicate maintenance engine.

### Phase 4 — F&B / Shared Business

**WP-H11 F&B/POS Core**
- outlet;
- table/order/KOT;
- settlement;
- room-charge posting.

**WP-H12 Inventory / Procurement Interface**
- common-core adapters;
- stock movement;
- requisition/PO/receiving projections.

### Phase 5 — Distribution / Guest Digital

**WP-H13 Distribution Simulator + Adapter**
Start with simulator, not live OTA.

**WP-H14 Booking Engine Local/API Contract**
Public UI can be later.

**WP-H15 Guest Communication Adapter**
Local queue/provider stub first.

### Phase 6 — Intelligence / Management

**WP-H16 Attention Center / Dashboard**
- operational pulse;
- exception cards;
- evidence.

**WP-H17 Reporting / Revenue Analytics**
- occupancy;
- ADR;
- RevPAR;
- operational reports.

### Phase 7 — Security / Resilience

**WP-H18 RBAC / Audit Hardening**

**WP-H19 Property Edge / Multi-Terminal**
- local service;
- LAN clients;
- concurrency;
- time authority.

**WP-H20 Backup / Restore / Failure Recovery**

### Phase 8 — Release

**WP-H21 Local Acceptance**
Execute [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/15_Testing_Resilience_and_Acceptance_Blueprint|Testing Blueprint]].

**WP-H22 Release Candidate**
No deployment.

### Phase 9 — Optional External Integration

Only after authorization:

**WP-H23 Channel Provider Integration**
**WP-H24 Payment Provider Integration**
**WP-H25 Messaging Provider**
**WP-H26 Accounting Interface**
**WP-H27 Central Multi-Property Sync**

## Dependency Principle

Parallelize only when contracts are stable.

Example:
- Housekeeping UI can proceed after RoomState contract stabilizes.
- F&B UI can proceed after FolioPosting contract stabilizes.
- Distribution cannot safely implement before Reservation/Availability contract stabilizes.

## Agent First Instruction

> Implement the assigned FDG Hospitality execution package. Do not redesign architecture, create production hosting, connect live OTAs/payments, duplicate shared FDG systems, or modify another package's files unless explicitly authorized.

## Mandatory Preflight Response

Before coding return:
- repository;
- branch;
- head SHA;
- package/work ID;
- owner;
- build authorization;
- deployment authorization;
- files owned;
- read-only dependencies;
- prohibited files;
- tests to run;
- unresolved blockers.

## Context Efficiency

Do not reread the full FDG repository.

Read:
1. [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]]
2. assigned blueprint;
3. governing system files cited by that blueprint;
4. current handover;
5. changed dependencies since checkpoint.

## Completion Evidence

Return:
- files changed;
- commit/PR;
- test results;
- tests not run;
- screenshots where relevant;
- AC mapping;
- data migration result;
- limitations;
- no-deployment confirmation unless deployment was explicitly authorized;
- handover;
- knowledge-return candidates.

## Stop Conditions

Stop/escalate if:
- missing authority;
- hotel-specific rule conflicts with shared core;
- required cloud service appears before local gate;
- live credential required;
- direct OTA implementation proposed without business justification;
- financial/tax meaning unclear;
- guest privacy/sensitive data scope unclear;
- engineering status needs duplicate ownership;
- data migration can lose/duplicate reservation/payment;
- work exceeds file ownership.

## Top-Tier Review Triggers

Use top-tier architecture/review for:
- core schema change;
- sync/conflict algorithm;
- night audit;
- payment;
- distribution;
- security/privacy;
- multi-property central architecture;
- production migration;
- major integration.

Routine approved UI/CRUD/tests may use lower-cost agents.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/00_Master_Index|Hospitality Master Index]] → this document.
