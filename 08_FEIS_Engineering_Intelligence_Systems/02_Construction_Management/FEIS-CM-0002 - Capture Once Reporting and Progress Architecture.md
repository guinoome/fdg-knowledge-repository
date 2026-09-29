# FEIS-CM-0002 — Capture Once Reporting and Progress Architecture

**Status:** Approved Direction — Implementation Baseline  
**Effective:** 2026-09-30

## Core Principle

> Capture Once → Validate Once → Reuse Everywhere.

Site engineers and administrators must not repeatedly rewrite the same accomplishment into separate reports, trackers and billing worksheets.

## Source-of-Truth Rule

A generated Daily Report, Weekly Report, Monthly Report, S-curve, billing worksheet or dashboard is not the primary source of truth.

The primary source is the structured operational record/event from which those outputs are derived.

## Minimum Site Progress Event

A site progress event should be able to carry:

- project
- date/time
- creator / named user
- area / location / grid / floor
- WBS / work package
- BOQ or measurable work item
- activity / description
- quantity and unit
- previous cumulative quantity
- current cumulative quantity
- planned quantity where applicable
- manpower by trade
- equipment used
- material used/delivered
- weather/site conditions where relevant
- evidence/photos
- QA/QC state
- safety/permit state
- issue/constraint/delay
- instruction/reference document
- next action
- responsible person
- verification / approval state

## Derived Outputs

One validated operational update may feed:

- Daily Site Report
- Weekly Progress Report
- Monthly Progress Report
- Project dashboard
- WBS progress
- BOQ accomplishment
- physical progress %
- schedule progress / variance
- productivity metrics
- manpower reporting
- equipment utilization
- material consumption
- QA/QC queue
- issue / delay registers
- look-ahead preparation
- management summary
- progress billing draft

## Validation Boundary

Field accomplishment must remain distinguishable from:

1. reported quantity
2. verified physical quantity
3. QA/QC-accepted quantity
4. commercially billable quantity
5. approved billed quantity
6. paid quantity

No automation may collapse these states into one value.

## Missing Update Control

Where a user or work package is expected to report progress, missing information should become visible.

The workflow should allow:

- progress reported
- no work performed — reason required
- blocked — reason/dependency required
- not applicable
- report overdue

## Report Generation Principle

Reports should be reproducible from governed records for a defined reporting period.

Manual report editing should not silently change underlying operational truth.

Corrections must be made through traceable record correction, adjustment, approval or authorized override workflows.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|Report and Document Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-012_ENGINEERING_WORKFLOW_AND_AUTOMATION_MODULE_STANDARD|Workflow and Automation]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document
