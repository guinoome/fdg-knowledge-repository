---
document_id: FDG-COS-0002
title: FDG Construction OS Build Roadmap
status: Build-Ready Roadmap
owner: FDG Ecosystem
created: 2026-10-10
---

# FDG-COS-0002 — FDG Construction OS Build Roadmap

## 1. Strategy

Build the OS through vertically complete slices rather than broad incomplete feature coverage.

Every work package should end with:
- working capability;
- tests;
- evidence;
- known limitations;
- implementation handover;
- maturity-state update.

## 2. Stage 0 — Architecture Lock

Goals:
- confirm canonical reading set;
- confirm no architecture conflicts;
- identify current implementation repository/path;
- create ADR framework;
- choose initial stack only when coding begins;
- define data dictionary.

Exit:
- all implementation decisions that affect code are documented;
- no unresolved source-of-truth conflict blocks WP1.

## 3. Stage 1 — Shared Company / Project Core

Build:
- organization;
- branch/company context where needed;
- named user;
- role;
- project;
- project membership;
- client/consultant/contractor party records;
- auth/session controls;
- audit shell;
- file/evidence shell.

Exit:
- user can authenticate;
- user sees only authorized projects;
- authorship is permanent;
- controlled events can be audited.

## 4. Stage 2 — PLAN Foundation

Build:
- WBS;
- activity;
- milestone;
- risk;
- constraint;
- action;
- decision;
- basic schedule/baseline;
- dashboard shell.

Exit:
- project structure and control objects exist before field reporting.

## 5. Stage 3 — EXECUTE Field Slice

Build:
- SiteEvent;
- reported quantity;
- manpower;
- equipment;
- photos;
- material event;
- issue/constraint;
- basic inspection;
- local-first field capture;
- sync queue.

Exit:
- one field workflow works without network and syncs later.

## 6. Stage 4 — TRACK / Capture Once

Build:
- validation;
- progress records;
- planned vs actual;
- S-curve;
- daily report;
- weekly report;
- dashboard dependency propagation;
- evidence drill-through.

Exit:
- one field event updates all required outputs without re-encoding.

This is the first critical product-proof gate.

## 7. Stage 5 — DOCUMENT + QA/QC

Build:
- document register;
- drawing revisions;
- RFI;
- submittal;
- WIR/IR;
- MIR;
- inspection;
- NCR;
- transmittal;
- punch.

Exit:
- current/superseded revisions work;
- workflow state history is auditable;
- overdue/attention logic works.

## 8. Stage 6 — ESTIMATE

Build:
- QTO;
- BOQ;
- BOM;
- material/labor/equipment rates;
- rate build-up;
- estimate;
- budget;
- supplier/subcontract comparison.

Exit:
- estimate basis and provenance are inspectable.

## 9. Stage 7 — Commercial / Change

Build:
- variation/change;
- notice state;
- cost evaluation;
- billing-support quantity;
- commercial-state separation;
- cost/forecast views.

Exit:
- Reported, Accepted, Billable, Billed, and Paid are never conflated.

## 10. Stage 8 — T&C / Turnover

Build:
- test records;
- readiness;
- punch closure;
- O&M/as-built/warranty registers;
- asset handover;
- turnover dossier;
- continuation brief.

Exit:
- successor can reconstruct project state without personal handover reconstruction.

## 11. Stage 9 — Toolkit Migration

Build:
- original FDG starter toolkit;
- import mapping;
- duplicate detection;
- validation;
- provenance;
- conflict handling;
- export.

Exit:
- toolkit user can migrate into canonical project records.

## 12. Stage 10 — Role Workbenches

Build role-aware surfaces for:
- Construction Manager;
- Project Manager;
- Site Engineer;
- Project Controls;
- QS / Commercial;
- QA/QC;
- Document Control;
- T&C / Turnover.

Exit:
- same source records support different role priorities without forking project truth.

## 13. Stage 11 — Automation

Add only after workflow evidence is reliable:
- reminders;
- routing;
- stale-item detection;
- report drafting;
- next-action proposals;
- Attention Center reasoning;
- handover-package assembly.

No automation may silently expand decision authority.

## 14. Stage 12 — Portfolio / Enterprise

Build:
- multi-project portfolio;
- organization templates;
- shared master data;
- enterprise permissions;
- branding/white-label;
- integrations;
- tenant controls;
- cross-project analytics.

## 15. Stage 13 — Predictive / Optimization

Only after deterministic records and outcomes are reliable.

Possible future:
- delay risk;
- productivity deterioration;
- procurement risk;
- RFI/submittal bottlenecks;
- cost-overrun risk;
- turnover-readiness risk.

Governed by:
[[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG Predictive Intelligence]].

## 16. Release Gates

### Pilot
Must prove:
- auth/project;
- WBS;
- offline SiteEvent;
- progress validation;
- dashboard;
- DPR/WPR;
- S-curve;
- evidence/audit;
- basic RFI;
- basic inspection.

### Operational Beta
Add:
- document control;
- QA/QC;
- workflow aging;
- reporting stability;
- permissions;
- sync recovery.

### Construction OS v1
Requires tested:
- PLAN;
- ESTIMATE;
- EXECUTE;
- TRACK;
- DOCUMENT;
- T&C/turnover;
- continuity;
- offline operation;
- toolkit migration;
- role authority;
- audit/evidence.

### Commercially Validated
Requires real customer use, paid entitlement or contracted deployment, measured value, repeat usage, and known support burden.

## 17. Repository Transition

Until sustained coding begins:

~~~text
fdg-knowledge-repository/
└── Projects/
    └── fdg-construction-os/
        └── project staging / status / handover only
~~~

Later:

~~~text
guinoome/fdg-construction-os
└── application implementation
~~~

Migration rules:
[[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_REPOSITORY_MIGRATION_PLAN|Repository Migration Plan]].
