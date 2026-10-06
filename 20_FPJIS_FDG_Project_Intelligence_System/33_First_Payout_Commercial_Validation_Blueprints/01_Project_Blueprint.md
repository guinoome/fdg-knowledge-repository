---
document_id: FPJIS-FPCV-0100
title: FDG Commercial Validation Workspace - Project Blueprint
status: Blueprint - Not Build Authorized
created: 2026-10-07
---

# FPJIS-FPCV-0100 — Project Blueprint

## Project Identity

- **Project ID:** FPJIS-FPCV
- **Project name:** FDG Commercial Validation Workspace
- **Owner / Final Authority:** Francis
- **Architecture / Intelligence Authority:** Nex
- **Canonical knowledge source:** GitHub `guinoome/fdg-knowledge-repository`
- **Operational-data authority during pilot:** local encrypted/controlled workspace; not GitHub
- **Monetization required:** yes, but monetization is measured through actual commercial experiments
- **Online deployment required:** no
- **Current target:** local/offline-capable validation workspace and deterministic commercial process
- **Build authorization:** separate decision required

## Problem

FDG has extensive engineering, business, facility, project, workflow and platform intelligence but has historically risked advancing product builds or hosted deployments before commercial demand, local completeness, workflow stability and acceptance evidence were mature.

This creates:
- avoidable cloud/hosting cost;
- premature integration work;
- production debugging;
- fragmented fixes;
- architecture drift;
- security exposure;
- difficulty distinguishing product defects from deployment defects;
- higher dependence on expensive implementation agents.

## Target Outcome

Create a controlled system of work that converts existing FDG capability into paid experiments and captures the evidence needed to decide whether to:
- continue manually;
- standardize a service;
- package a digital product;
- automate a validated bottleneck;
- build software;
- deploy online;
- stop the opportunity.

## Primary Users

1. Francis — founder/final approval.
2. Nex — architecture/commercial synthesis.
3. Commercial operator — prospects, offers, campaign and payment evidence.
4. Service delivery engineer — pilot execution.
5. Reviewer/auditor — evidence and commercial validation.
6. Market-intelligence researcher — external signal capture.
7. Future coding agent — bounded implementation.
8. Future staff/collaborator — repeatable operation without founder reconstruction.

## Scope

### In Scope

- opportunity register;
- offer/service/product register;
- friction scoring;
- target customer/persona;
- pricing/version/promotion controls;
- prospect/outreach tracking;
- pilot/work-order tracking;
- payment evidence references;
- founder-hour and delivery-time measurement;
- market-intelligence signal register;
- competitor/product signal register;
- decision gates;
- evidence register;
- learning and productization recommendation;
- offline-first local operation;
- import/export/backup;
- repository-linked context;
- visual dashboard and Attention Center;
- later optional remote sync/deployment.

### Out of Scope for Initial Build

- CRM replacement;
- accounting ledger;
- statutory invoicing authority;
- full email marketing platform;
- full payment processor;
- CMMS;
- construction management SaaS;
- generic ERP;
- autonomous legal/regulatory determination;
- automatic production deployment;
- live customer portal;
- multi-tenant cloud database until authorized;
- any feature whose only rationale is “future scalability.”

## Success Criteria

The system/process succeeds when:
1. one active opportunity can be traced from signal → offer → prospect → paid pilot → delivery → acceptance → economics → decision;
2. the same records survive offline restart;
3. export/import reconstructs the state;
4. evidence is linked to source;
5. market signals cannot silently change price or scope;
6. no deployment action can occur without explicit release approval;
7. another qualified agent can implement or continue work using this package;
8. founder hours and revenue can be measured per offer;
9. second and third offers can reuse the same commercial-validation spine;
10. productization decisions cite actual evidence rather than intuition alone.

## Required Systems

[[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS]],
[[14_FDG_Service_Intelligence_System/00_FSvIS_CORE/FSvIS-0000 - FDG Service Intelligence System|FSvIS]],
[[20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture|FPJIS]],
[[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]],
[[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]],
[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS]],
[[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Wiki_Index|FWAIS]],
[[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]],
[[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]],
[[13_FDG_Legal_Intelligence_System/00_FLIS_CORE/FLIS-0000 - FDG Legal Intelligence System|FLIS]],
[[12_FDG_Security_Intelligence_System/README|FSIS]].

## Reuse Decision

**Reuse / Extend.** Do not create another intelligence system.

This project is an FPJIS-controlled implementation surface over existing authorities:
- FBIS owns commercial truth.
- FSvIS owns service definitions.
- FEIS/FBPOIS own engineering/operational semantics.
- FWAIS owns automation patterns.
- FPIS owns platform evolution.
- FAIS audits.
- FMCIS coordinates work.

## Release Philosophy

```text
Blueprint
→ Local Prototype
→ Offline/Local Persistence
→ Local Tests
→ Founder/User Acceptance
→ Release Candidate
→ Optional Staging
→ Staging Acceptance
→ Explicit Production Authorization
→ Production
```

Skipping a gate is a controlled exception requiring a founder decision record.

## Explicit Anti-Pattern

Do not recreate the ML Digital Printing / FDG Business Platform failure mode in which:
- incomplete functionality is deployed;
- deployment becomes the primary test loop;
- hosting costs accumulate while architecture is still moving;
- implementation agents patch production instead of completing local acceptance.

The deployment target is a destination for an accepted release, not the development environment.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
