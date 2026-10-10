---
document_id: MELANIE-0900
title: Future Melanie Project — Build and Agent Handover
status: Future Build Handover
owner: FDG Ecosystem
created: 2026-10-10
---

# MELANIE-0900 — Future Build & Agent Handover

## Mission

Implement the future Melanie project without redesigning or duplicating the canonical FDG architecture.

The implementation agent must treat the FDG Knowledge Repository as the source of truth and use Melanie as the project execution layer.

## Required Reading Order

1. [[Projects/Future/Melanie/MELANIE-0001 - Complete Detailed Blueprint|Melanie Complete Detailed Blueprint]]
2. [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]
3. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management Master Index]]
4. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Construction Management Lifecycle]]
5. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Architecture]]
6. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]]
7. [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Toolkit → Full Platform]]
8. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0004 - Named User Session and Subscription Control Standard|Named User Session Control]]
9. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Project Continuity]]
10. current implementation source code and tests, once a Melanie implementation repository/project exists.

## First Rule

Do not start by recreating the whole specification in code.

Implement the smallest vertically complete slice that proves:

~~~text
Field Capture
→ Validation
→ Canonical Project Record
→ Dashboard
→ Daily Report
→ Weekly Report
→ Progress / S-Curve
~~~

from one source event.

## First Build Slice

Recommended:

- Organization
- Named User
- Role
- Project
- Project Membership
- WBS
- Daily Site Event
- Progress Quantity
- Manpower
- Photo Evidence
- Risk/Constraint/Action
- basic RFI
- basic Inspection
- Daily Report
- Weekly Report
- Project Dashboard
- S-Curve

## Minimum Technical Boundaries

### Domain layer
No UI-owned calculation truth.

### Data layer
Stable IDs, revisions where needed, explicit timestamps and actors.

### Projection layer
Reports/dashboards generated from canonical records.

### Experience layer
Plan / Estimate / Execute / Track / Document.

### Model adapter
Provider-neutral assistance; no workflow stored only inside one model/provider.

## Build Governance

Before modifying a governed behavior:
1. find the canonical standard;
2. compare current implementation;
3. identify extension vs conflict;
4. extend rather than redesign where possible;
5. preserve superseded decisions;
6. add tests;
7. update repository knowledge if validated learning changes capability.

## Multi-Collaborator Rule

Do not overwrite another collaborator's active work package.

If files overlap:
- inspect current state;
- identify owner;
- surface conflict;
- create a scoped patch or handover;
- preserve existing working code;
- avoid large refactors without necessity.

## Mandatory Tests

At first milestone:

- named user/session;
- project membership;
- offline/local draft;
- site event create/edit;
- downstream recalculation;
- report reconciliation;
- progress-state separation;
- document revision current/superseded;
- conflict handling;
- audit attribution;
- successor continuity sample.

## No False Capability Claims

Use these states:

~~~text
DESIGNED
BUILD_READY
IMPLEMENTED
TESTED
DEPLOYED
COMMERCIALLY_VALIDATED
~~~

Do not mark a capability beyond the available evidence.

## UX Acceptance

The app must be demonstrably interactive.

Do not submit:
- static screenshot pans;
- fake dashboards;
- hardcoded metrics presented as live;
- non-functional buttons;
- fake cause/effect.

A demo should show:
1. user enters/updates a site event;
2. project state changes;
3. report/dashboard values change;
4. evidence can be opened;
5. revision/history remains visible.

## Offline Acceptance

At least one field workflow should demonstrate:
- capture with network unavailable;
- local persistence;
- later sync;
- conflict handling;
- retained user/device attribution.

## Commercial Boundary

Do not hard-code pricing, promotional discounts, subscription amounts, or toolkit upgrade credit.

These belong to FBIS/commercial configuration.

## Philippine-First Boundary

Initial workflow language can fit Philippine construction practice.

Do not embed jurisdiction-specific law/code as universal domain logic.

Regulatory truth must route through FRCIM/FLIS.

## Completion Handover

Every major Melanie build milestone must leave:
- implemented scope;
- files changed;
- schema changes;
- migrations;
- tests;
- known limitations;
- unresolved conflicts;
- decisions;
- screenshots/evidence where relevant;
- deployment state;
- next work package;
- knowledge-repository updates.

## Definition of Done for First Commercially Meaningful Slice

The first slice is done only when:
- a real project can be created;
- named users can be assigned;
- site events can be captured;
- at least one offline capture path works;
- progress derives from source records;
- DPR/WPR derive from same records;
- dashboard derives from same records;
- evidence is linked;
- audit history is visible;
- role permissions are enforced;
- successor context can be reconstructed;
- no duplicate manual encoding is required for those outputs.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → [[Projects/Future/Melanie/Melanie_Project_Master_Index|Melanie]] → this document
