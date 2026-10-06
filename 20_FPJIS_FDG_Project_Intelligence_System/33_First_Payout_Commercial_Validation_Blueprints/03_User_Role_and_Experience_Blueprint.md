---
document_id: FPJIS-FPCV-0300
title: User Role and Experience Blueprint
status: Blueprint
created: 2026-10-07
---

# User, Role and Experience Blueprint

## Experience Principle

This workspace is an internal decision and evidence system first. It must not imitate a generic CRM or SaaS dashboard.

Primary experience:
> One screen should answer: **What can generate the next credible payment, what evidence supports it, what blocks it, and what should happen next?**

## Roles

### Founder / Final Authority
Can:
- approve offer activation;
- approve campaign pricing;
- approve build authorization;
- approve staging/production deployment;
- override recommendation with recorded reason;
- close/pause experiments.

Cannot silently change historical evidence.

### Nex / Architecture Intelligence
Can:
- synthesize repository context;
- score/re-score opportunities;
- propose work packages;
- surface conflicts;
- recommend gates.

Cannot self-authorize founder-only release/deployment.

### Commercial Operator
Can:
- manage prospects;
- issue approved offer revisions;
- record outreach;
- attach payment proof reference;
- capture reason bought/lost.

Cannot alter canonical technical scope or pricing rules outside authority.

### Service Delivery Engineer
Can:
- execute pilot workflow;
- attach technical evidence;
- log delivery hours;
- create findings/recommendations within scope.

Cannot turn recommendations into approved commercial scope without proper gate.

### Market Intelligence Researcher
Can:
- capture external signal;
- classify source;
- propose implication;
- link evidence.

Cannot automatically change offers, prices, or product roadmap.

### Auditor / Reviewer
Can:
- challenge claims;
- inspect evidence;
- mark unsupported conclusions;
- verify acceptance/economics.

Cannot rewrite another owner's work package.

## Primary Navigation

1. **Attention**
2. **Portfolio**
3. **Offers**
4. **Prospects**
5. **Pilots**
6. **Market Signals**
7. **Evidence**
8. **Economics**
9. **Release Gates**
10. **Learning**
11. **Settings / Export / Restore**

## Attention Center

Cards should prioritize:
- offer with no next action;
- prospect awaiting reply;
- payment verification pending;
- pilot input missing;
- delivery overdue;
- evidence conflict;
- negative margin / excessive founder time;
- Founding Five slots used/remaining;
- market signal requiring review;
- release gate failure;
- stale source;
- automation/productization recommendation awaiting decision.

Each card shows:
- severity;
- why it matters;
- source/evidence;
- impact;
- recommended action;
- responsible owner;
- due date;
- resolution state.

## Dashboard Hero

Use FDG premium dashboard standard:
- near-full-bleed hero;
- transparent live data overlay;
- animated but purposeful status;
- mobile-first;
- no decorative charts without decision value.

Hero metrics:
- active offers;
- qualified prospects;
- paid pilots;
- verified revenue;
- founder hours;
- revenue/founder hour;
- time to first payment;
- current best opportunity;
- Founding Five utilization;
- release readiness.

## Portfolio Screen

Must support:
- sortable friction score;
- recurring potential;
- readiness;
- evidence level;
- target segment;
- current gate;
- next test;
- last review;
- trend indicator.

## Offer Screen

Show:
- exact buyer;
- problem;
- outcome;
- scope/exclusions;
- deliverables;
- evidence;
- price and current campaign;
- sample output;
- payment path;
- objections;
- conversion;
- revisions;
- gate history.

## Prospect Screen

Do not overbuild CRM.
Minimum:
- organization/person;
- segment;
- contact method;
- source;
- offer;
- current state;
- last touch;
- next action;
- reason bought/lost;
- consent/communication notes where applicable.

## Pilot Screen

Show:
- accepted offer revision;
- scope;
- input checklist;
- progress;
- missing data;
- evidence;
- delivery hours;
- founder hours;
- issues;
- acceptance;
- next opportunity;
- economics.

## Market Intelligence Screen

Show:
- category;
- geography;
- source;
- published/observed date;
- source quality;
- signal type;
- observed price;
- buyer;
- demand evidence;
- competitive density;
- implication;
- affected opportunities;
- review decision.

## Mobile Experience

Mobile is optimized for:
- quick opportunity update;
- prospect next action;
- field evidence capture;
- market signal capture;
- timer/hour logging;
- founder approval card;
- offline status.

Do not compress the full desktop analytics layout into a phone.

## Empty/Error/Offline States

Every screen must define:
- no data;
- stale data;
- offline;
- sync pending;
- restricted;
- corrupted import;
- missing source;
- conflicting record.

Never display a fabricated “live” status.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
