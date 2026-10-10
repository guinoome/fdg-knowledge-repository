---
document_id: FEIS-CM-0008
title: FDG Project Control Console Experience Map
status: Approved Direction — Experience Projection
owner: FDG Ecosystem
created: 2026-10-10
change_policy: Additive only; does not replace the canonical construction lifecycle
---

# FEIS-CM-0008 — FDG Project Control Console Experience Map

## 1. Purpose

Define a simplified, commercially understandable navigation and experience layer for [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|FDG Engineering Construction Management]].

The Project Control Console presents the platform through five memorable operating surfaces:

~~~text
PLAN
→ ESTIMATE
→ EXECUTE
→ TRACK
→ DOCUMENT
~~~

This is an **experience projection**, not a replacement lifecycle.

The canonical construction lifecycle remains:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|FEIS-CM-0001 — Construction Management Lifecycle Architecture]].

## 2. Architectural Rule

The five Console areas must not become five separate databases, five disconnected applications, or five independent sources of truth.

All five consume the same governed project model.

~~~text
                    SHARED PROJECT TRUTH
                           │
          ┌────────────────┼────────────────┐
          │                │                │
        PLAN           ESTIMATE          EXECUTE
          │                │                │
          └────────────┬───┴───────┬────────┘
                       │           │
                     TRACK      DOCUMENT
                       │           │
                       └─────┬─────┘
                             │
                     GOVERNED OUTPUTS
~~~

The core data principle remains:

> Capture Once → Validate Once → Reuse Everywhere.

## 3. Relationship to the Construction Manager Workbench

The Console and Workbench are complementary.

### Project Control Console

Answers:

> Where do I go to plan, estimate, execute, track, or document project work?

It is:
- a navigation model;
- a dashboard grouping model;
- a commercial/product explanation;
- a cross-role project-control surface.

### Construction Manager Workbench

Answers:

> What should this role do next, why, using which evidence and authority?

It is governed by:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|FDG Construction Manager Workbench Upgrade Blueprint]].

The Console can launch role-aware Workbench tasks.

## 4. Console Home

Recommended project header:

- project identity;
- client;
- location;
- project phase;
- contract package;
- reporting period;
- approved baseline revision;
- current physical progress;
- planned progress;
- schedule variance;
- cost/budget state where authorized;
- next key milestone;
- open critical risks;
- unresolved decisions;
- overall project-health state;
- last validated data timestamp.

The Console must distinguish:
- current fact;
- approved baseline;
- forecast;
- calculated metric;
- user-entered estimate;
- machine-assisted recommendation.

## 5. PLAN

### Objective

Convert project obligations and scope into a controlled execution plan.

### Core capabilities

- Project Dashboard
- WBS / Work Package Structure
- Baseline Schedule
- Detailed Schedule
- Milestone Register
- Look-Ahead Planning
- Procurement Schedule
- Submittal Schedule
- RFI / Decision Schedule
- Manpower Plan
- Equipment Plan
- Logistics / Mobilization Plan
- Cash Flow / Billing Forecast
- Risk Register
- Constraint Register
- Action Register
- Interface Matrix
- Drawing / Deliverable Schedule

### Primary records

- WBS
- WorkPackage
- Activity
- Milestone
- Constraint
- Risk
- Action
- ResourcePlan
- ProcurementRequirement
- DeliverableRequirement

### Derived views

- Gantt
- Milestone Timeline
- Look-Ahead
- Resource Histogram
- Constraint Board
- Critical Decision Board
- Schedule Risk Summary

### Connected standards

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-005_ENGINEERING_PROJECT_INTELLIGENCE_MODULE_STANDARD|Engineering Project Intelligence]]

## 6. ESTIMATE

### Objective

Convert scope and quantities into a controlled technical/commercial cost basis.

### Core capabilities

- Quantity Takeoff
- BOQ
- BOM
- Material Rate Build-Up
- Labor Rate Build-Up
- Equipment Rate Build-Up
- Productivity Assumptions
- Direct Cost
- Indirect / Preliminaries Cost
- Temporary Works Cost
- Subcontractor / Supplier Comparison
- Contingency / Risk Allowance
- Estimate Basis
- Cost Summary
- Budget Baseline
- Procurement Forecast
- Variation Costing
- Claim Cost Support

### State separation

The system must distinguish:

~~~text
Estimated Cost
Budget
Committed Cost
Actual Cost
Forecast Cost
Variation Proposed
Variation Approved
Billable
Billed
Paid
~~~

These values must not collapse into one "cost" field.

### Connected standards

- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-011_ENGINEERING_BUDGET_AND_COST_INTELLIGENCE_MODULE_STANDARD|Engineering Budget & Cost Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding-to-Turnover Template Catalog]]

## 7. EXECUTE

### Objective

Capture what is physically happening on site as structured, evidence-backed operational events.

### Core capabilities

- Mobilization Readiness
- Daily Work Execution
- Site Activity Capture
- Manpower Deployment
- Equipment Deployment
- Material Delivery
- Material Issuance / Consumption
- Procurement Status
- Inspection Requests
- QA/QC
- Safety / Permit Status
- Work Instructions
- Site Instructions
- Method Statement Status
- NCR / Corrective Action
- Photo Evidence
- Weather / Site Conditions
- Delay / Constraint Capture
- Immediate Actions
- Handover / Punch Execution

### Minimum event model

Execution events should reuse:

[[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting & Progress Architecture]].

One validated field event may feed:
- progress;
- manpower;
- equipment;
- material;
- QA/QC;
- HSE;
- delay;
- report;
- billing-support records.

## 8. TRACK

### Objective

Turn validated project records into live project controls and management intelligence.

### Core capabilities

- Overall Progress
- Planned vs Actual
- Physical Progress
- S-Curve
- Schedule Variance
- Milestone Status
- Productivity
- Manpower Performance
- Equipment Utilization
- Material Status
- Procurement Status
- RFI / Submittal Aging
- Inspection Aging
- NCR Aging
- Constraint Aging
- Delay Analysis
- Recovery Plan Status
- Variation / Claim Status
- Cost Performance
- Forecast
- Dashboard
- Executive Summary

### Reporting outputs

- Daily Progress Report
- Weekly Progress Report
- Monthly Progress Report
- Project Status Report
- Management / Executive Summary
- Photo Report
- Manpower Report
- Equipment Report
- Procurement / Material Report
- Quality / HSE Summary

### Core rule

Reports are projections of governed records.

Manual report edits shall not silently redefine project truth.

## 9. DOCUMENT

### Objective

Control the documents, correspondence, approvals, evidence, and closeout records that govern construction decisions.

### Core capabilities

- Drawing Register
- Revision Control
- RFI
- Site Instruction
- Inspection Request / WIR
- Material Inspection Request
- Method Statement
- Material Submittal
- Technical Submittal
- NCR
- Transmittal
- Meeting Minutes
- Correspondence
- Change / Variation Notice
- Claim / Notice
- Punch List
- Testing & Commissioning Records
- As-Built Drawings
- O&M Manuals
- Warranties
- Training Records
- Asset Register
- Turnover Dossier
- Closeout

### Document principle

A document is a controlled view/artifact of project knowledge where possible, not an isolated file.

See:

[[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|Engineering Report & Document Intelligence]].

## 10. Five-Area Navigation Does Not Restrict the Lifecycle

A lifecycle stage may use more than one Console area.

Example:

### Mobilization

PLAN:
- mobilization schedule
- logistics
- manpower

ESTIMATE:
- temporary facilities
- mobilization costs

EXECUTE:
- actual mobilization

TRACK:
- readiness / delay

DOCUMENT:
- permits
- insurance
- plans
- approvals

Therefore the Console is a user-facing lens over the lifecycle, not the lifecycle itself.

## 11. Role Projection

The same Console may expose different defaults by role.

### Project Manager
PLAN + TRACK dominant.

### Construction Manager
PLAN + EXECUTE + TRACK.

### Site Engineer
EXECUTE + DOCUMENT.

### Project Controls
PLAN + TRACK.

### Quantity Surveyor / Commercial
ESTIMATE + TRACK + DOCUMENT.

### QA/QC
EXECUTE + DOCUMENT + TRACK.

### Document Controller
DOCUMENT + TRACK.

### T&C / Turnover
EXECUTE + DOCUMENT + TRACK.

Role projections share data; they do not fork the project.

## 12. Console Attention Model

The Console should not only show metrics.

It should expose what requires action.

Recommended Attention Center categories:

- Critical Delay
- Decision Required
- RFI Aging
- Submittal Aging
- Inspection Due
- Material Risk
- Procurement Risk
- Quality Blocker
- Safety Blocker
- Commercial Notice Deadline
- Milestone Risk
- Punch / Turnover Gap

Each attention item should show:
- why it matters;
- evidence;
- consequence;
- owner;
- due date;
- next permitted action.

## 13. Project Health

Do not reduce project health to a decorative percentage.

A Project Health result should be decomposable into dimensions such as:

- schedule;
- cost;
- progress;
- procurement;
- quality;
- safety;
- document/decision flow;
- commercial;
- turnover readiness.

Any composite score must reveal:
- input metrics;
- weights/rules;
- missing data;
- critical blockers.

## 14. Dashboard Composition

Recommended home composition:

~~~text
Project Hero + Live Data Overlay

Top Row
- Physical Progress
- Planned Progress
- Schedule Variance
- Days to Key Milestone
- Critical Open Items

Main
- Progress / S-Curve
- Schedule / Milestones
- Cost / Commitments
- Procurement / Materials
- RFI / Submittals / Inspections
- Risks / Constraints
- Variations / Claims
- Action / Attention Center

Bottom
- Recent Site Evidence
- Decisions
- Upcoming Work
- Handover / Closeout Readiness
~~~

## 15. Mobile / PWA

Field execution must remain mobile-first.

Priority field functions:
- today’s work;
- assigned inspections;
- site event capture;
- photo evidence;
- manpower/equipment capture;
- material receipt/use;
- issue/constraint;
- RFI/inspection initiation;
- checklist;
- offline capture;
- sync state.

## 16. Export Compatibility

Where useful, the Console may export:

- XLSX
- DOCX
- PDF
- CSV
- governed JSON/API outputs

But exported files are artifacts.

Once the full platform is the source of truth, exported spreadsheets must not silently become parallel uncontrolled databases.

## 17. Success Criteria

The Console is successful when:

- a new user understands the product rapidly;
- project roles know where to work;
- lifecycle rigor remains intact;
- duplicate encoding decreases;
- reports become reproducible;
- status is explainable;
- outputs remain evidence-linked;
- switching roles does not create different project truth.

## 18. Non-Goals

Do not use the five-area framing to:

- create a second Construction Management module;
- rebuild FEIS-CM lifecycle documents;
- duplicate FPJIS;
- merge FBIS/FLIS/HR into Construction Management;
- replace structured records with spreadsheets;
- create separate databases for each area;
- turn dashboard appearance into project truth.

## 19. Related Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management Master Index]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0001 - Construction Management Lifecycle Architecture|Lifecycle Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Reporting]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Construction Manager Workbench]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0001 - Construction Toolkit to Full Platform Commercial Upgrade Path|Construction Toolkit → Full Platform]]
- [[20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture|FPJIS Master Architecture]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document

---

## Future Melanie Implementation Relationship — 2026-10-10

The future [[Projects/Future/Melanie/MELANIE-0001 - Complete Detailed Blueprint|Melanie Project]] is the planned implementation context for the Project Control Console.

Melanie should present:

~~~text
PLAN | ESTIMATE | EXECUTE | TRACK | DOCUMENT
~~~

as the simple operating surface while preserving the full FEIS-CM lifecycle, Capture Once architecture, role authority, evidence, revision control, and project continuity underneath.

The Console must remain a projection over canonical records rather than becoming five disconnected feature databases.

---

## Melanie Future Implementation Target — 2026-10-10

The future implementation project for this Project Control Console experience is:

[[Projects/Future/Melanie/MELANIE-0100 - Construction Project Control Platform Detailed Build Specification|MELANIE-0100 — Construction Project Control Platform Detailed Build Specification]].

The Console remains FEIS-CM governed. Melanie implements it; Melanie does not become a competing source of construction-management truth.
