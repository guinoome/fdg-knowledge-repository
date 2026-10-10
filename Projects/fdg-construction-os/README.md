---
project_id: FDG-CONSTRUCTION-OS
title: FDG Construction OS — Staging Project Workspace
status: Future Product / Pre-Implementation Workspace
owner: FDG Ecosystem
created: 2026-10-10
current_repository: guinoome/fdg-knowledge-repository
current_path: Projects/fdg-construction-os
future_repository: guinoome/fdg-construction-os
migration_state: NOT_YET_MIGRATED
canonical_domain_authority: FEIS Construction Management
---

# FDG Construction OS — Staging Project Workspace

## Purpose

This folder is the temporary project workspace for the future **FDG Construction OS**.

It exists inside fdg-knowledge-repository/Projects/ so future build work can be staged, governed, and handed over without turning the FDG Knowledge Repository itself into the permanent application repository.

The long-term target is a dedicated implementation repository:

~~~text
guinoome/fdg-construction-os
~~~

The move to that repository should occur when implementation begins to generate sustained source code, dependencies, migrations, tests, deployment configuration, build artifacts, release history, and operational issue tracking.

## Canonical Product Identity

~~~text
FDG Project Operations OS
        ↓
internal / reusable project-operations architecture

FDG Construction OS
        ↓
construction implementation and commercial product

FDG Engineering Construction Management
        ↓
canonical construction-domain capability under FEIS

FDG Project Control Console
        ↓
cross-role experience:
PLAN | ESTIMATE | EXECUTE | TRACK | DOCUMENT

Role Workbenches
        ↓
Construction Manager
Project Manager
Site Engineer
Project Controls
QS / Commercial
QA/QC
Document Control
T&C / Turnover
~~~

## Repository Responsibility Boundary

### FDG Knowledge Repository

Owns:
- architecture;
- standards;
- domain models;
- engineering rules;
- ADRs;
- governance;
- acceptance criteria;
- DCKL knowledge;
- evidence-backed lessons;
- build handovers.

### This staging project workspace

Owns:
- future-product project state;
- implementation roadmap;
- work-package sequence;
- maturity/status ledger;
- implementation handover;
- migration plan to the dedicated repository;
- future ADR references;
- links back to canonical knowledge.

### Future guinoome/fdg-construction-os

Will own:
- application source code;
- database migrations;
- application tests;
- deployment configuration;
- CI/CD;
- implementation ADRs;
- package/dependency manifests;
- release history;
- operational implementation issues.

## Canonical Knowledge — Must Read Before Build

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FEIS Construction Management Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Construction Management Lifecycle]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting & Progress]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FDG Project Control Console]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|Multi-Collaborator Build Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Construction Manager Workbench]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FDG Project Operations OS Complete Detailed Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]]

## Project Files

- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_PROJECT_CHARTER|Project Charter]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_BUILD_ROADMAP|Build Roadmap]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_IMPLEMENTATION_STATUS|Implementation Status Ledger]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_FUTURE_AGENT_HANDOVER|Future Agent Handover]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_REPOSITORY_MIGRATION_PLAN|Repository Migration Plan]]

## Current Product State

~~~text
Architecture        DESIGNED / BUILD_READY
Domain Knowledge    APPROVED / EVOLVING
Project Workspace   CREATED
Application Code    NOT STARTED
Automated Tests     NOT STARTED
Deployment          NOT STARTED
Commercial Pilot    NOT STARTED
Standalone Repo     NOT YET CREATED
~~~

These states must remain evidence-based.

## First Build Objective

Do not attempt the whole OS in the first implementation cycle.

The first vertical slice must prove:

~~~text
Project
→ WBS
→ Offline-capable Site Event
→ Quantity + Manpower + Photo
→ Validation
→ Progress
→ Dashboard
→ Daily Report
→ Weekly Report
→ S-Curve
→ Evidence / Audit
~~~

Add basic:
- Risk / Constraint / Action;
- RFI;
- Inspection;
- sync conflict handling.

This proves the FDG differentiator: **Capture Once → Validate Once → Reuse Everywhere.**

## Non-Duplication Rule

This workspace must not redefine construction-domain truth already defined in FEIS-CM.

If build work discovers a conflict:

~~~text
Implementation Finding
→ Evidence
→ Conflict Record
→ Canonical Review
→ Approved Knowledge Change
→ Implementation Update
~~~

Do not silently rewrite FEIS-CM from application code or conversation.

## Future Repository Trigger

Move the implementation to guinoome/fdg-construction-os when any of the following becomes true:

- sustained application source code is being committed;
- dependency/package manifests are required;
- database migrations begin;
- CI/CD begins;
- implementation issue/PR history becomes material;
- staging/production deployments exist;
- release/version management begins;
- the implementation workspace would clutter the Knowledge Repository.

The detailed migration procedure is in:
[[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_REPOSITORY_MIGRATION_PLAN|Repository Migration Plan]].

## Guiding Principle

> **Knowledge Repository governs the OS. The OS repository implements the knowledge.**

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this project workspace
