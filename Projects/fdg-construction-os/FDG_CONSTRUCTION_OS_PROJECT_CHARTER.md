---
document_id: FDG-COS-0001
title: FDG Construction OS Project Charter
status: Approved Future Product Direction
owner: FDG Ecosystem
created: 2026-10-10
---

# FDG-COS-0001 — FDG Construction OS Project Charter

## 1. Mission

Build FDG's own construction operating system that turns project activity into structured, evidence-backed, reusable project intelligence from planning through turnover.

The OS must reduce duplicate encoding, preserve project continuity, expose decision context, remain usable in field conditions, and convert operational records into reports, dashboards, commercial support, QA/QC evidence, and handover outputs.

## 2. Product Position

**FDG Construction OS** is the construction implementation/product.

It is governed by [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FDG Engineering Construction Management]] and the internal reusable architecture described in [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FDG Project Operations OS Complete Detailed Blueprint]].

It is not:
- a spreadsheet bundle;
- a dashboard-only product;
- a generic ERP;
- a replacement for FPJIS;
- a new engineering authority;
- a provider-specific assistant.

## 3. Core Product Promise

~~~text
CAPTURE ONCE
→ VALIDATE ONCE
→ REUSE EVERYWHERE
~~~

A field/project fact should be encoded once and reused in every legitimate dependent output.

## 4. Primary Experience

~~~text
HOME

PLAN
├── WBS
├── Schedule
├── Milestones
├── Look-Ahead
├── Risk
├── Constraints
├── Resources
└── Procurement / Deliverables

ESTIMATE
├── QTO
├── BOQ
├── BOM
├── Rate Build-Up
├── Estimate
├── Budget
└── Variation Costing

EXECUTE
├── Site Events
├── Manpower
├── Equipment
├── Materials
├── QA/QC
├── Inspections
├── Issues
└── Evidence

TRACK
├── Progress
├── S-Curve
├── Milestones
├── Productivity
├── Workflow Aging
├── Delay / Recovery
├── Cost / Forecast
└── Reports

DOCUMENT
├── Drawings
├── RFI
├── Submittals
├── WIR / IR
├── MIR
├── Method Statements
├── NCR
├── Transmittals
├── Correspondence
├── T&C
└── Turnover
~~~

## 5. Initial Target Users

- project owner/company administrator;
- project manager;
- construction manager;
- project controls engineer;
- site engineer;
- QS/commercial engineer;
- QA/QC engineer;
- document controller;
- T&C/turnover engineer;
- client/consultant reviewer;
- executive/read-only user.

## 6. Product Principles

1. Local-first and offline-capable for field work.
2. Mobile-first field capture.
3. One canonical project truth.
4. Explicit revision/history.
5. Evidence and provenance attached to consequential records.
6. Human authority at consequential decision boundaries.
7. Provider/model replaceability.
8. Role-aware experience without data silos.
9. Exports are projections, not parallel databases.
10. Project continuity survives staff changes.
11. Build small, validate, then expand.
12. No fake implementation claims.

## 7. Domain Boundaries

Construction OS owns/implements construction workflows and user experiences but consumes authority from existing FDG systems.

- FEIS-CM: lifecycle, engineering/project-control semantics.
- DCKL: governed construction knowledge/templates.
- FPIS: shared experience patterns.
- FBIS: commercial/customer/subscription semantics.
- FWAIS: approved automation.
- FSIS: security.
- FRCIM/FLIS: regulatory authority.
- FAIS: assurance/audit.
- FDG CORE: evidence, decision, predictive and learning mechanisms.
- FPJIS: governs FDG project blueprint/build discipline; it is not the Construction OS.

## 8. First Release Objective

The first release should prove one real end-to-end loop:

~~~text
Project Setup
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
→ Evidence
→ Audit
~~~

Do not market the first release as the complete Construction OS.

Suggested first release name:

**FDG Construction OS — Project Controls Pilot**

## 9. Product Maturity States

~~~text
DESIGNED
BUILD_READY
IMPLEMENTED
TESTED
DEPLOYED
COMMERCIALLY_VALIDATED
~~~

Every major capability must carry one of these states.

## 10. Long-Term Product Scope

Future Construction OS may integrate:

- project controls;
- estimating;
- field execution;
- QA/QC;
- document control;
- procurement/material visibility;
- commercial/change control;
- T&C;
- handover/closeout;
- project memory;
- role Workbenches;
- portfolio views;
- analytics/predictive intelligence;
- enterprise/white-label experience.

## 11. Success Criteria

The OS succeeds when it measurably:

- reduces duplicate encoding;
- reduces report-preparation effort;
- increases traceability;
- reduces status inconsistency;
- preserves project continuity;
- improves workflow response visibility;
- improves turnover completeness;
- produces trusted project-control outputs from source records.

## 12. Canonical References

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|Complete Detailed Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|Project Control Console]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_BUILD_ROADMAP|Build Roadmap]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_IMPLEMENTATION_STATUS|Implementation Status]]
- [[Projects/fdg-construction-os/FDG_CONSTRUCTION_OS_FUTURE_AGENT_HANDOVER|Future Agent Handover]]
