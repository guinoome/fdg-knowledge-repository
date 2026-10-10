# FEIS-CM-0000 — FDG Engineering Construction Management Master Index

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Commercial Package:** FDG Engineering Construction Management  
**Status:** Approved Direction — Implementation Baseline  
**Owner / Final Authority:** Francis  
**Effective:** 2026-09-30

## Product Definition

FDG Engineering Construction Management is a company-owned construction execution and continuity system spanning bidding through turnover.

It is not primarily a collection of forms.

It converts field and commercial activity into structured operational records, then reuses those records for reports, progress, billing preparation, quality, document control, management visibility, handover, and organizational learning.

## Core Principles

1. **Capture Once → Validate Once → Reuse Everywhere.**
2. **Operational records are the source of truth; reports are projections.**
3. **People may change; project knowledge must remain.**
4. **A replacement qualified user must be able to continue pending work without reconstructing project history.**
5. **Commercial and contractual outputs require appropriate validation and approval.**
6. **Templates are governed schemas/views of operational data, not disconnected files.**
7. **Philippine-first implementation; international jurisdiction packs later.**

## Lifecycle

Opportunity → Bid / Tender → Award → Contract Setup → Mobilization → Planning → Procurement / Submittals → Site Execution → QA/QC → Progress Measurement → Billing → Testing & Commissioning → Punch List → Turnover / Closeout → Warranty / Lessons Learned

## Canonical Documents

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|FEIS-CM-0001 — Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|FEIS-CM-0002 — Capture Once Reporting and Progress Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|FEIS-CM-0003 — Project Continuity and Personnel Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0004 - Named User Session and Subscription Control Standard|FEIS-CM-0004 — Named User Session and Subscription Control]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|FEIS-CM-0100 — Bidding to Turnover Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0900 - Multi-Collaborator Build Handover|FEIS-CM-0900 — Multi-Collaborator Build Handover]]

## Related FEIS Capabilities

- [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-005_ENGINEERING_PROJECT_INTELLIGENCE_MODULE_STANDARD|Engineering Project Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|Report and Document Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-009_KNOWLEDGE_INTEGRATION_AND_ENGINEERING_MEMORY_MODULE_STANDARD|Engineering Memory]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-011_ENGINEERING_BUDGET_AND_COST_INTELLIGENCE_MODULE_STANDARD|Budget and Cost Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-012_ENGINEERING_WORKFLOW_AND_AUTOMATION_MODULE_STANDARD|Workflow and Automation]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|Digital Construction Knowledge Library]]

## Commercial Packaging Direction

Construction Management may be sold as a complete package or decomposed into compatible submodules such as:

- Preconstruction / Bidding
- Construction Execution
- Project Controls
- QA/QC and Inspection
- Document Control
- Materials / Procurement
- Safety
- Progress and Billing
- Testing & Commissioning
- Turnover and Closeout

Shared data and authority models must prevent module silos.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|FEIS]] → this document


---

## Construction Manager Workbench Architecture Extension — 2026-10-04

The Construction Management package now includes a provider-replaceable role-intelligence layer for Construction Managers. This extension is additive and does not replace the lifecycle, operational-record, reporting, commercial, QA/QC, closeout or collaboration architecture already defined above.

### New Canonical Documents

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|FEIS-CM-0005 — Construction Manager Role Intelligence and Guided Workflow]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|FEIS-CM-0006 — Construction Document Intelligence and Verification]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|FEIS-CM-0007 — Construction Manager Embedded Learning and Competency]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|FEIS-CM-0901 — Construction Manager Workbench Upgrade Blueprint]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-RSCH-0001 - Tixu Construction Manager Benchmark Extraction 2026-10-04|FEIS-CM-RSCH-0001 — Tixu Construction Manager Benchmark Extraction]]

### Direction

The target experience is the **FDG Construction Manager Workbench**:

Project operating system + governed construction knowledge + document intelligence + role-aware workflow assistance + embedded capability development.

The Workbench must remain:

- model/provider replaceable
- evidence linked
- permission aware
- revision aware
- human reviewed at consequential decision boundaries
- backed by canonical structured records
- compatible with Capture Once → Validate Once → Reuse Everywhere
- connected to the Digital Construction Knowledge Library

A blank chat interface is not the product architecture.

---

## Project Control Console Experience Projection — 2026-10-10

The Construction Management product now has a simplified customer/user-facing control map:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0008 - FDG Project Control Console Experience Map|FEIS-CM-0008 — FDG Project Control Console Experience Map]]

~~~text
PLAN
→ ESTIMATE
→ EXECUTE
→ TRACK
→ DOCUMENT
~~~

This is an experience/navigation projection over the existing canonical lifecycle. It does not create a second Construction Management system, alter lifecycle authority, or split project truth into separate modules.

The related low-friction commercialization path is:

[[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform Commercial Upgrade Path]].

---

## FDG Project Operations OS / Construction Project Management Future Build — 2026-10-10

The future implementation blueprint for this Construction Management architecture is:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FEIS-CM-0902 — FDG Project Operations OS Complete Detailed Blueprint]].

Canonical identity:

~~~text
FDG Project Operations OS
        ↓
Initial Reference Implementation:
FDG Engineering Construction Management
        ↓
Project Control Console
        ↓
Construction Manager Workbench
~~~

FEIS-CM remains the canonical construction-management knowledge authority.

The future build consumes and implements FEIS-CM, including Capture Once reporting, Project Control Console, role Workbenches, document intelligence, project continuity, toolkit migration, T&C and turnover.

This is an implementation profile over existing FDG capabilities, not a new system mother or separate source of truth.

Implementation findings may return to FEIS-CM only through governed evidence and controlled knowledge evolution.

## FDG Construction OS Project Workspace Link — 2026-10-10

The temporary future-product staging workspace is:

[[Projects/fdg-construction-os/README|FDG Construction OS — Staging Project Workspace]].

It is governed by this FEIS-CM architecture and [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0902 - FDG Project Operations OS Complete Detailed Blueprint|FEIS-CM-0902]].

The staging workspace does not become a new domain authority. When sustained application development begins, implementation should migrate to the dedicated repository planned as `guinoome/fdg-construction-os`, while FEIS-CM remains canonical construction-management knowledge.
