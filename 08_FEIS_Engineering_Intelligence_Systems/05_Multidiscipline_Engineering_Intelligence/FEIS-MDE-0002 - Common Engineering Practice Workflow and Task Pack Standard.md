# FEIS-MDE-0002 — Common Engineering Practice Workflow and Task Pack Standard

**Status:** Approved Direction — Workflow Standard  
**Effective:** 2026-10-05  
**Owner / Final Authority:** Francis

## Purpose

Convert recurring engineering and architectural work into governed, reusable FDG capabilities without reducing the organization to a library of prompts or duplicating the same workflow for every profession.

## Core Rule

> Separate the universal workflow shell from the discipline-specific technical profile.

Example:

```text
Review Specification
       │
       ├── Universal workflow
       │   select source → resolve revision → extract requirements
       │   → classify findings → cite evidence → review → action
       │
       └── Discipline profile
           Architectural / Civil / Mechanical / Electrical /
           Plumbing / Fire / Auxiliary
```

## Common Practice Task-Pack Families

### 1. Review Specifications

Universal outputs:

- requirements
- acceptance criteria
- responsibilities
- referenced standards
- submittal requirements
- inspection/test requirements
- missing information
- conflicts
- actions

Discipline profile supplies technical vocabulary and checks.

### 2. Review Drawings / Revision

Universal outputs:

- changed items
- affected areas/systems
- interfaces
- obsolete references
- downstream impact
- required actions

### 3. Site Report

Use structured site events rather than free-form rewriting.

Potential inputs:

- area
- activity
- quantity
- manpower
- equipment
- materials
- weather/conditions
- photos
- issues
- inspections
- safety/quality state
- next actions

### 4. RFI / Technical Query

Required structure:

- project context
- exact question
- governing references
- conflicting/missing information
- evidence
- impact
- required response date
- proposed interpretation only when appropriate
- authority boundary

### 5. Submittal Review

Universal review shell:

- identity/revision
- specification requirement
- drawing requirement
- manufacturer data
- deviations
- interfaces
- missing documents
- reviewer findings
- disposition workflow

Technical acceptance remains discipline-specific.

### 6. Method Statement

Universal structure:

- scope
- references
- prerequisites
- materials
- tools/equipment
- manpower/competency
- sequence
- inspection/test points
- safety interfaces
- quality controls
- hold/witness points
- records/evidence
- contingency/exception handling

### 7. Calculation Note

Use [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD|Engineering Calculation Engine]].

Never rely on a language model as the sole numerical authority where a deterministic method exists.

### 8. Inspection Checklist / ITP Support

Generated checklist items must trace to:

- approved drawing
- specification
- approved material/submittal
- method statement
- ITP
- code/standard where applicable
- approved project decision

### 9. Meeting Minutes

Meeting intelligence may identify:

- decisions
- actions
- risks
- issues
- changes
- dependencies
- unresolved questions

After user confirmation, these should update canonical project records instead of remaining only in prose minutes.

### 10. Client / Management Update

Generate from governed records:

- status
- progress
- decisions
- constraints
- risks
- required client actions
- upcoming milestones

### 11. Tender / Bid Review

Reuse Construction Management preconstruction capabilities rather than creating discipline-specific tender systems.

Discipline profiles may contribute:

- scope review
- technical compliance
- exclusions
- design assumptions
- quantity inputs
- specialist risks

### 12. Testing & Commissioning

Universal shell:

Prerequisite → Readiness → Procedure → Witness/Hold → Result → Deficiency → Retest → Acceptance → Evidence

Technical procedures remain discipline/system-specific.

### 13. Punch / Snag

Universal fields:

- location
- discipline
- description
- evidence
- severity/priority
- responsible party
- due date
- closure evidence
- verification
- status

### 14. Turnover

Universal readiness shell:

- as-builts
- O&M
- warranties
- asset/equipment records
- test dossiers
- training
- spares/tools
- certifications
- outstanding items
- acceptance

Required items vary by discipline and project.

## Task Pack Definition

A governed Task Pack should define:

- capability ID
- workflow family
- discipline profile
- role(s)
- lifecycle stage
- objective
- required context
- authoritative sources
- required evidence
- deterministic services
- review steps
- technical checks
- prohibited assumptions
- output schema
- status transitions
- approval authority
- exception states
- model/provider compatibility
- version
- acceptance tests
- provenance

## Prompt Governance

Do not treat "saved prompts" as the long-term organizational capability.

Prompts are implementation components.

Preferred hierarchy:

```text
FDG Capability
    ↓
Task Pack
    ↓
Workflow + Context + Sources + Rules + Evidence + Tests
    ↓
Provider Adapter
    ↓
Prompt / Tool Call / Deterministic Service
```

## Verification Language

Machine-assisted output should classify claims as:

- Verified Fact
- Derived Calculation
- Inference
- Assumption
- Common-Practice Recommendation
- Project Requirement
- Code/Standard Requirement
- Unknown / Missing Evidence
- Conflict — Review Required

This prevents "common practice" from being mistaken for mandatory authority.

## Role Workbench Composition

A role Workbench is assembled dynamically:

```text
Role
+ Project lifecycle stage
+ Discipline
+ Assigned systems/work packages
+ User authority
+ Project documents
+ Open actions
+ Applicable Task Packs
= Workbench experience
```

## Acceptance Tests

A Task Pack is not acceptable unless:

1. it links to canonical project objects rather than duplicating them
2. it identifies its technical discipline profile
3. it preserves source/revision provenance
4. it distinguishes common practice from mandatory authority
5. it exposes unknowns
6. consequential calculations use verified methods
7. approval authority is explicit
8. model/provider replacement does not destroy the capability
9. evidence can be traced
10. the workflow can return approved learning to the DCKL

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0000 - Multidiscipline Engineering Capability and Role Workbench Architecture|MDE Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0001 - Architecture Civil MEPF Auxiliary Capability Map|Discipline Capability Map]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Role Intelligence Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Document Intelligence and Verification]]
- [[08_FEIS_Engineering_Intelligence_Systems/03_Digital_Construction_Knowledge_Library/FEIS-DCKL-0000 - Digital Construction Knowledge Library Architecture|DCKL]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/00_Multidiscipline_Engineering_Intelligence_Master_Index|MDE Master Index]] → this document
