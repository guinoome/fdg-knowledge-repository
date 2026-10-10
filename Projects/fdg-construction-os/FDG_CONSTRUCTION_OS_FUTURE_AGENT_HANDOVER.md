---
document_id: FDG-COS-0900
title: FDG Construction OS Future Agent Handover
status: Mandatory Future Build Handover
owner: FDG Ecosystem
created: 2026-10-10
---

# FDG-COS-0900 — FDG Construction OS Future Agent Handover

## Mission

Continue the existing FDG Construction OS project. Do not restart the architecture from scratch.

The project is currently staged at:

~~~text
guinoome/fdg-knowledge-repository
Projects/fdg-construction-os/
~~~

The intended future standalone implementation repository is:

~~~text
guinoome/fdg-construction-os
~~~

## First Rule

**The FDG Knowledge Repository is the source of architectural truth. The future Construction OS repository is the source of implementation truth.**

Do not merge these responsibilities.

## Mandatory Reading Order

1. [[Projects/fdg-construction-os/README|FDG Construction OS Project Workspace]]
2. [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_PROJECT_CHARTER|Project Charter]]
3. [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_IMPLEMENTATION_STATUS|Implementation Status]]
4. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FEIS-CM Master Index]]
5. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|Complete Detailed Blueprint]]
6. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|Multi-Collaborator Build Handover]]
7. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Construction Manager Workbench]]
8. [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_BUILD_ROADMAP|Build Roadmap]]
9. [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_REPOSITORY_MIGRATION_PLAN|Repository Migration Plan]]

If another agent/model has already audited a document at the same canonical revision and the status ledger says no material change occurred, do not reread it unnecessarily. Follow the repository's audit/compiler governance.

## Canonical Naming

Use:

~~~text
FDG Construction OS
~~~

for the future product.

Use:

~~~text
FDG Project Operations OS
~~~

for the broader/reusable internal architecture where that distinction is useful.

Do not invent another project codename.

## Start-of-Build Protocol

Before coding:

1. inspect current status ledger;
2. inspect existing implementation code, if any;
3. verify current canonical FEIS-CM revisions;
4. identify changed standards since last build;
5. create/update ADRs for implementation choices;
6. select the smallest incomplete work package;
7. define acceptance tests;
8. then code.

## Default First Build

If application code still does not exist, begin with:

~~~text
WP0 Architecture Lock
→ WP1 Company / Project Core
→ WP2 PLAN Foundation
→ WP3 Field EXECUTE
→ WP4 TRACK / Capture Once
~~~

Do not start with predictive intelligence, 3D dashboards, or broad enterprise features.

## First Vertical Slice

Must prove:

~~~text
Project
→ WBS
→ Site Event
→ Offline Save
→ Sync
→ Validation
→ Progress
→ Dashboard
→ DPR
→ WPR
→ S-Curve
→ Evidence / Audit
~~~

Plus basic:
- Risk;
- Constraint;
- Action;
- RFI;
- Inspection.

## Change Control

When code conflicts with canonical architecture:

Do not silently change the canonical rule.

Record:
- conflict;
- implementation evidence;
- consequence;
- alternatives;
- recommendation.

Then route the knowledge change through governed approval.

## Multi-Collaborator Rule

Do not rewrite another collaborator's work merely to normalize style.

If two branches/agents conflict:
- preserve both;
- identify semantic conflict;
- select/merge through evidence and authority;
- retain provenance.

## Test Requirements

At minimum:
- unit;
- integration;
- end-to-end;
- regression;
- offline/sync conflict;
- permission;
- audit/provenance;
- report projection.

## Handover Required at End of Every Build Session

Update:
[[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_IMPLEMENTATION_STATUS|Implementation Status Ledger]]

Include:
- work package;
- repository/branch;
- implemented scope;
- files changed;
- migrations;
- tests;
- deployment;
- defects/limitations;
- unresolved decisions;
- maturity changes;
- next work;
- commit/PR references.

## Repository Migration Rule

Do not keep substantial application code inside the Knowledge Repository merely because this staging folder exists.

When the migration trigger is met, follow:
[[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_REPOSITORY_MIGRATION_PLAN|Repository Migration Plan]].

## Definition of Success

The next agent should improve the implementation without weakening:

- Capture Once;
- evidence/provenance;
- role authority;
- project continuity;
- offline capability;
- provider replaceability;
- engineering/commercial state separation;
- revision history;
- canonical FEIS-CM authority.
