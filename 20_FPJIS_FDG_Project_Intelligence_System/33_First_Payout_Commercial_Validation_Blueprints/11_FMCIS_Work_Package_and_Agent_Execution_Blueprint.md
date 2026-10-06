---
document_id: FPJIS-FPCV-1100
title: FMCIS Work Package and Agent Execution Blueprint
status: Blueprint
created: 2026-10-07
---

# FMCIS Work Package and Agent Execution Blueprint

## Governing Pattern

Use:
> **One primary builder per work package + independent reviewers where justified.**

Do not maximize agents. Maximize useful validated output per unit of time, token and cost.

Governing authorities:
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Top-Tier Architecture Compiler Protocol]]

## Work-Package Map

### WP-00 Repository Preflight
Objective:
- confirm current branch/checkpoint;
- read this package;
- identify newer conflicting decisions;
- inspect active work ownership.

Deliverable:
- preflight report with exact commit SHA.

No code.

### WP-01 Local Application Shell
Depends on: WP-00 + Build Authorization.

Owns:
- application shell;
- routing;
- local environment config;
- PWA/static assets;
- visual tokens.

Must not own domain rules.

### WP-02 Domain Types and Local Store
Depends on: WP-01.

Owns:
- typed entities;
- repositories;
- local persistence;
- migrations;
- backup/import/export.

Read-only:
- pricing/business rules.

### WP-03 Portfolio and Opportunity
Owns:
- opportunity register;
- scoring view;
- gate state;
- next test.

Must reference FBIS portfolio rather than duplicate authority.

### WP-04 Offers / Pricing / Promotions
Owns:
- offer revisions;
- pricing calculation;
- campaign;
- Founding Five;
- proposal snapshot.

Independent review:
- FBIS/commercial.

### WP-05 Prospect / Interaction
Owns:
- prospect;
- outreach;
- interaction;
- next action;
- reason bought/lost.

No generic CRM expansion.

### WP-06 Pilot Delivery / Evidence / Time
Owns:
- pilot tracking;
- input checklist;
- evidence;
- delivery hours;
- founder hours;
- acceptance.

Review:
- FEIS/FBPOIS + FSvIS depending on offer.

### WP-07 Market Intelligence
Owns:
- market signal capture;
- evidence class;
- source date;
- interpretation;
- affected opportunities;
- stale review.

Does not own canonical product requirements.

### WP-08 Attention / Dashboard
Depends on WP-03 to WP-07 interfaces.

Owns:
- decision views;
- KPI projections;
- Attention Center;
- responsive experience.

No duplicate data.

### WP-09 Release Gate / Local QA
Owns:
- gate evidence;
- local acceptance;
- release metadata;
- deployment lock.

Independent review:
- FAIS/QA.

### WP-10 Optional Remote Adapter
**Blocked until G9 authorization.**

Owns only approved:
- remote storage/sync;
- auth;
- hosting integration.

Cannot change domain semantics.

### WP-11 Optional Payment Adapter
Blocked until payment integration specifically authorized.

### WP-12 Knowledge Return
Owns:
- sanitized lessons;
- blueprint gaps;
- handover;
- index/Wikilink updates.

## File Ownership Rule

Each execution package must state:
- Create paths;
- Modify paths;
- Read-only dependencies;
- Prohibited paths.

No collaborator may “clean up” another package.

## Capability Tier

Use top-tier reasoning for:
- architecture change;
- conflicting authority;
- data migration;
- security/privacy;
- payment;
- release/deployment;
- productization decision.

Use lower-cost/local/coding agents for:
- approved CRUD;
- known UI;
- tests;
- deterministic transformations;
- bounded refactors.

## Review Matrix

| WP | Primary | Reviewer |
|---|---|---|
| 01 | Builder | UX/architecture if material |
| 02 | Builder | Architecture + data |
| 03 | Builder | FBIS/FPJIS |
| 04 | Builder | FBIS |
| 05 | Builder | Commercial operator |
| 06 | Builder | FSvIS + FEIS/FBPOIS |
| 07 | Builder | FBIS + evidence reviewer |
| 08 | Builder | FPIS/UX + user acceptance |
| 09 | Builder/QA | FAIS + Francis |
| 10 | Builder | Security + architecture |
| 11 | Builder | FBIS + security |
| 12 | Documentation owner | Nex |

## Stop/Escalate Conditions

Stop when:
- blueprint conflicts;
- required authority missing;
- proposed feature expands scope;
- live client data would enter public repo;
- remote deployment becomes necessary to continue basic coding;
- payment/legal/professional rule unclear;
- migration can lose data;
- collaborator needs out-of-scope modification;
- test failure indicates architectural defect.

## Completion Contract

Every WP returns:
- objective;
- files changed;
- exact commit/PR;
- tests run;
- tests not run;
- AC results;
- screenshots/logs where relevant;
- known issues;
- new assumptions;
- handover;
- knowledge-return candidate.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
