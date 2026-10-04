# FEIS-CM-0001 — Construction Management Lifecycle Architecture

**Status:** Approved Direction — Implementation Baseline  
**Effective:** 2026-09-30

## Purpose

Define the end-to-end construction-management lifecycle that FDG Engineering Construction Management must support.

## Lifecycle Stages

### 01 — Opportunity and Bid Qualification

Capture opportunity, client, location, scope, due dates, qualification requirements, bid/no-bid decision, commercial risk, assigned estimator/team, and tender source.

### 02 — Tender Review and Bidding

Control tender documents, addenda, site visits, queries, estimating, quantity takeoff, supplier/subcontractor quotations, methodology, schedule, bid risks, clarifications, exclusions, and submission.

### 03 — Award and Contract Setup

Convert accepted bid data into contract baseline: scope, BOQ, budget, schedule, obligations, deliverables, milestones, retention, securities, payment terms, change rules, authority and project team.

### 04 — Mobilization

Control permits, bonds/insurance, project organization, temporary facilities, logistics, safety/quality plans, document-control setup, site access, equipment, manpower, subcontractors, kickoff and baseline readiness.

### 05 — Project Planning and Controls

Establish WBS, baseline schedule, look-aheads, cost codes, procurement schedule, submittal schedule, RFI schedule, manpower/equipment plans, risks, cash-flow expectations and measurement rules.

### 06 — Procurement and Materials

Control material requests, RFQs, technical/commercial comparison, approvals, purchase orders, delivery, inspection, storage, issuance, traceability, consumption and reconciliation.

### 07 — Site Execution

Capture actual work as structured operational events: area, WBS, BOQ/work item, quantity, manpower, equipment, materials, photos, conditions, issues, delay, instruction, inspection need and next action.

### 08 — QA/QC and Construction Inspection

Manage ITPs, MIRs, inspection/work requests, checklists, test records, NCRs, corrective actions, punch items, calibration, material approvals and closeout evidence.

### 09 — Safety and Permit Controls

Manage permits, toolbox meetings, hazards, inspections, incidents, corrective actions and compliance evidence.

### 10 — Document and Decision Control

Manage drawings, revisions, RFIs, submittals, transmittals, correspondence, meeting minutes, instructions, change notices and decision records.

### 11 — Progress Measurement and Reporting

Translate validated site events into daily, weekly and monthly views; progress percentages; productivity; schedule comparison; S-curves; risk/issue summaries; management dashboards and evidence-backed accomplishment.

### 12 — Commercial, Variations and Billing

Prepare quantity verification, billable accomplishment, progress-billing drafts, variation/change records, claims/notice records, subcontractor billing, retention, forecast and cost-to-complete. Field reports do not become approved billing without required validation.

### 13 — Testing and Commissioning

Track readiness, prerequisites, test procedures, inspections, witness points, results, deficiencies, retests, acceptance, system status and evidence.

### 14 — Punch List and Completion

Control incomplete works, defects, closeout assignments, retesting, snagging, completion evidence and readiness for handover.

### 15 — Turnover and Closeout

Control as-builts, O&M manuals, warranties, asset registers, training, spare parts, keys/access, certificates, final account status, turnover dossiers, acceptance and responsibility transfer.

### 16 — Warranty / Defects Liability / Lessons Learned

Preserve warranty obligations, defect records, resolution, project performance, lessons learned and validated improvements for the FDG Knowledge Repository.

## Lifecycle State Rule

A project may have multiple work packages at different lifecycle states simultaneously.

The system must therefore track state at project, contract package, system, area, WBS and work-package level where applicable.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding to Turnover Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0002 - Capture Once Reporting and Progress Architecture|Capture Once Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Continuity and Handover]]
- [[10_FDG_CORE_Intelligence/Research_Packs/CORE_Engineering_Data_Document_Engine_Foundation/CORE_Engineering_Data_Document_Engine_Foundation/CORE-0005 - Testing and Commissioning Reference Implementation|Testing and Commissioning Reference Implementation]]
- [[14_FDG_Service_Intelligence_System/05_Service_Delivery/FSvIS-DEL-0003 - Handover and Closeout Standard|Service Handover and Closeout]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document


---

## Role-Intelligence Overlay — 2026-10-04

Every lifecycle stage may be supported by the [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Construction Manager Workbench]], but the Workbench is an overlay rather than a new lifecycle.

It may help the user:

- understand current project state
- review documents
- identify missing evidence
- compare revisions
- prepare drafts
- prioritize work
- surface risks and constraints
- launch governed workflow actions
- learn the relevant FDG workflow

Document-derived answers and recommendations shall comply with [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Construction Document Intelligence and Verification]].

Role onboarding and workflow learning shall comply with [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0007 - Construction Manager Embedded Learning and Competency Standard|Construction Manager Embedded Learning and Competency]].
