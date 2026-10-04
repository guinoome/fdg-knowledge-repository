# FEIS-CM-0006 — Construction Document Intelligence and Verification Standard

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Domain:** Construction Management  
**Status:** Approved Direction — Architecture Extension  
**Owner / Final Authority:** Francis  
**Effective:** 2026-10-04

## Purpose

Define how FDG Engineering Construction Management may analyze construction documents with machine assistance while preserving revision control, provenance, professional verification and authoritative source boundaries.

## Scope

This standard applies to machine-assisted handling of construction information such as:

- tender packages
- addenda
- contracts
- BOQs
- drawings
- specifications
- schedules
- method statements
- material submittals
- RFIs
- inspection/test documents
- correspondence
- meeting minutes
- variation/claim documents
- Testing & Commissioning records
- punch/closeout files
- O&M manuals
- as-built records

## Core Principle

> Every extracted construction assertion must remain traceable to evidence.

The system must never present an untraceable model answer as though it were a contract, drawing, specification or field fact.

## Document Intake

Each ingested file should capture where available:

- project
- contract/package
- document type
- document number
- title
- discipline
- originator
- recipient
- issue date
- revision
- status / purpose of issue
- supersedes / superseded-by
- transmittal
- source
- file hash
- page/sheet count
- access classification
- upload identity
- ingestion timestamp

## Classification and Extraction

Machine assistance may identify:

- document type
- candidate metadata
- requirements
- quantities
- dates
- deliverables
- submittal requirements
- acceptance criteria
- hold/witness points
- responsibilities
- interfaces
- exclusions
- assumptions
- commercial conditions
- notice periods
- risks
- inconsistencies
- references to other documents

Extracted data remains provisional until validation rules are satisfied.

## Evidence Pointer

An extracted statement should carry a source pointer such as:

- document ID
- revision
- page
- sheet
- clause
- section
- table
- paragraph
- drawing note
- coordinate/region where technically feasible

The UI should let a reviewer navigate from assertion to source evidence.

## Revision Integrity

The system must detect and surface:

- multiple revisions of the same document
- superseded documents
- inconsistent issue status
- stale documents used in a current task
- addenda not reflected in an earlier extraction
- drawing/specification conflicts
- contract/tender scope changes

A newer revision does not silently erase conclusions made from an older revision. Preserve lineage and mark impact.

## Conflict State

Where documents disagree:

> **Conflict — Review Required**

The system must not choose a governing interpretation unless authority rules or an approved decision resolve the conflict.

Examples:

- drawing vs specification
- BOQ vs drawing
- tender clarification vs original tender text
- approved submittal vs specification
- field instruction vs earlier drawing
- consultant reply vs existing site record

## Verification Levels

### V0 — Unprocessed

File stored; no extraction relied upon.

### V1 — Machine Extracted

Machine-produced structured extraction; not verified.

### V2 — User Reviewed

Named user checked extraction against source.

### V3 — Discipline / Commercial Verified

Authorized reviewer verified the relevant technical/commercial interpretation.

### V4 — Approved Project Record

The result is incorporated into an official workflow/record with approval trace.

The required level depends on consequence.

## Consequence-Based Verification

Higher-consequence use requires stronger verification.

Examples requiring elevated review:

- contract obligation
- billing quantity
- change/claim entitlement
- safety-critical instruction
- code/regulatory compliance
- engineering acceptance criteria
- commissioning acceptance
- as-built turnover data

## Hallucination / Unsupported Assertion Control

The Workbench must flag when:

- no source supports an answer
- source coverage is incomplete
- confidence is low
- a file is unreadable
- referenced attachment is missing
- a required drawing/specification is unavailable
- an answer relies on inference rather than direct evidence

Preferred output:

- **Verified fact**
- **Derived calculation**
- **Inference**
- **Assumption**
- **Unknown / Missing Evidence**
- **Conflict — Review Required**

## Construction-Specific Comparison Services

The module should progressively support:

- revision-to-revision text comparison
- addendum impact extraction
- drawing revision delta extraction
- specification requirement matrix
- tender compliance matrix
- scope interface matrix
- submittal-vs-specification review
- method-statement completeness review
- inspection/test requirement extraction
- closeout requirement matrix
- O&M completeness review

## Deterministic Boundary

Numerical calculations that affect engineering/commercial outcomes should use approved deterministic calculation services where feasible.

A language model may:

- identify candidate inputs
- explain the calculation
- assemble evidence

but should not become the sole calculation engine for governed quantities when a deterministic method exists.

## Privacy / Confidentiality

Project files may contain commercially sensitive, personal, contractual or security information.

Use:

- least-privilege access
- project/tenant isolation
- role-based visibility
- governed model/provider routing
- retention rules
- audit trail
- redaction or restricted processing where required

## Acceptance Criteria

A document-intelligence implementation is not acceptable unless it can demonstrate:

1. current revision is identifiable
2. source provenance is retained
3. extracted assertions link back to evidence
4. conflicts are surfaced, not hidden
5. unknowns remain unknown
6. approval states are explicit
7. an update to a document can trigger impact review without deleting earlier history
8. project truth remains in canonical records, not model memory

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Construction Manager Role Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Template Catalog]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-007_ENGINEERING_REPORT_AND_DOCUMENT_INTELLIGENCE_MODULE_STANDARD|Report and Document Intelligence]]
- [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-019_ENGINEERING_DATA_INTEGRITY_AND_TRANSACTION_LINEAGE_STANDARD|Engineering Data Integrity and Transaction Lineage]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1505 - Cross-System Integration Contract|FRCIM Cross-System Integration Contract]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0901 - Construction Manager Workbench Upgrade Blueprint|Workbench Upgrade Blueprint]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document
