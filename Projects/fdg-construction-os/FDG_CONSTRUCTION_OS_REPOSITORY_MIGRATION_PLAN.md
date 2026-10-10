---
document_id: FDG-COS-0901
title: FDG Construction OS Repository Migration Plan
status: Approved Future Migration Plan
owner: FDG Ecosystem
created: 2026-10-10
source_workspace: Projects/fdg-construction-os
target_repository: guinoome/fdg-construction-os
---

# FDG-COS-0901 — FDG Construction OS Repository Migration Plan

## 1. Purpose

Define how the temporary FDG Construction OS staging workspace inside the Knowledge Repository will later become its own dedicated implementation repository without losing governance, history, provenance, or canonical links.

## 2. Current State

Current staging location:

~~~text
guinoome/fdg-knowledge-repository
└── Projects
    └── fdg-construction-os
~~~

Purpose:
- project staging;
- roadmap;
- status;
- handover;
- build preparation.

This location is not intended to host a mature production application's full source tree.

## 3. Target State

Future dedicated repository:

~~~text
guinoome/fdg-construction-os
~~~

Responsibility:

~~~text
APPLICATION IMPLEMENTATION
~~~

while:

~~~text
guinoome/fdg-knowledge-repository
~~~

continues to own:

~~~text
CANONICAL KNOWLEDGE / GOVERNANCE
~~~

## 4. Migration Trigger

Create/migrate to the standalone repository when any of these become material:

- sustained application source code;
- dependency manifests;
- database migrations;
- CI/CD;
- staging/production deployment;
- pull-request/issue volume;
- release/version management;
- implementation-specific ADR volume;
- code ownership;
- automated test suites;
- build artifacts;
- infrastructure/deployment files.

Do not wait until the Knowledge Repository becomes difficult to maintain.

## 5. What Moves

Move/copy into the standalone repo:
- implementation source;
- tests;
- database migrations;
- app-local ADRs;
- deployment;
- CI/CD;
- package manifests;
- developer setup;
- local fixtures;
- implementation-specific docs;
- release notes;
- issue/PR process.

## 6. What Stays in FDG Knowledge Repository

Keep canonical:
- FEIS-CM standards;
- DCKL;
- Project Control Console architecture;
- role/workflow standards;
- shared schemas when canonical across implementations;
- cross-system ownership;
- engineering acceptance criteria;
- governance;
- evidence-backed learned standards;
- product-level build blueprint;
- this migration history.

## 7. Link Contract After Migration

The Knowledge Repository should link to:

~~~text
Implementation Repository:
guinoome/fdg-construction-os
~~~

The standalone repository should link back to:
- FEIS-CM Master Index;
- FEIS-CM-0902;
- Project Control Console;
- DCKL;
- Construction OS Project Charter;
- current canonical acceptance criteria.

## 8. Recommended Future Repository Shape

Illustrative only; implementation ADRs may refine it:

~~~text
fdg-construction-os/
├── README.md
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── developer/
│   └── release/
├── apps/
│   └── web-pwa/
├── packages/
│   ├── domain/
│   ├── ui/
│   ├── sync/
│   ├── evidence/
│   ├── reporting/
│   ├── import-export/
│   └── adapters/
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── policies/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── infra/
└── .github/
~~~

This is not a mandatory technology stack.

## 9. Migration Procedure

### Step 1 — Freeze the staging implementation boundary
Record:
- current commit;
- current status ledger;
- work package;
- implementation files;
- outstanding issues.

### Step 2 — Create standalone repository
Create:

~~~text
guinoome/fdg-construction-os
~~~

### Step 3 — Establish governance links
README must identify:
- FDG Knowledge Repository as canonical architecture source;
- FEIS-CM master;
- FEIS-CM-0902 blueprint;
- current project status/handover.

### Step 4 — Transfer implementation files
Transfer only implementation-owned material.

Do not duplicate the entire Knowledge Repository.

### Step 5 — Preserve provenance
Record:
- source repo;
- source commit;
- migration date;
- responsible agent/user;
- first target commit.

### Step 6 — Update Knowledge Repository
Change staging status to:

~~~text
MIGRATED_TO_STANDALONE_REPOSITORY
~~~

Add target repository link and preserve this project workspace as the governance/project-history anchor.

### Step 7 — Validate
Confirm:
- code builds;
- tests pass;
- migrations work;
- canonical links resolve;
- no critical implementation artifact was lost;
- no canonical knowledge was accidentally moved out.

## 10. Post-Migration Rule

After migration:

### Knowledge change
Update:

~~~text
fdg-knowledge-repository
~~~

### Application/code change
Update:

~~~text
fdg-construction-os
~~~

### Implementation lesson affecting architecture
Process:

~~~text
Implementation Evidence
→ Learning Candidate
→ Knowledge Review
→ Canonical Knowledge Change
→ Application Alignment
~~~

## 11. No Permanent Forking of Truth

The standalone repository may contain implementation-local schemas/types, but when they represent canonical domain semantics they must remain traceable to FEIS-CM.

If implementation intentionally diverges, create an ADR and a knowledge-review item.

## 12. Migration Done Criteria

Migration is complete when:
- standalone repository exists;
- implementation builds there;
- tests run there;
- active development happens there;
- Knowledge Repository contains only governance/project-status pointers for the implementation;
- source/provenance is recorded;
- future-agent handover points to the correct repository.

## 13. Related Knowledge

- [[Projects/fdg-construction-os/README|FDG Construction OS Project Workspace]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_PROJECT_CHARTER|Project Charter]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_IMPLEMENTATION_STATUS|Implementation Status]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_FUTURE_AGENT_HANDOVER|Future Agent Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|Complete Detailed Blueprint]]
