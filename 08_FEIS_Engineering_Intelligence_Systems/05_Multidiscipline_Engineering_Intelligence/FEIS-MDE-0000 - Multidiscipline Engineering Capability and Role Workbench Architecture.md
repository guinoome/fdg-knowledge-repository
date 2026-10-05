# FEIS-MDE-0000 — Multidiscipline Engineering Capability and Role Workbench Architecture

**System:** FDG Engineering Intelligence Systems (FEIS)  
**Branch:** Multidiscipline Engineering Intelligence  
**Status:** Approved Direction — Architecture Baseline  
**Owner / Final Authority:** Francis  
**Effective:** 2026-10-05

## Purpose

Define how FDG supports multiple engineering and architectural disciplines without multiplying operating systems, duplicating project truth, or creating one disconnected module for every professional role.

## Core Architecture Decision

> Universal project capabilities belong to the shared Project Operations / Project Intelligence layer.  
> Discipline-specific technical meaning belongs to FEIS.  
> A role-specific Workbench combines both for the user.

### Architecture

```text
Shared Project Operations / Project Intelligence
Project • Task • Action • Meeting • Risk • Issue • Constraint
Decision • Dependency • Resource • Change • Document • Evidence
Approval • Status • Report • Portfolio / Program
                         │
                         ▼
          FEIS Discipline Capability Layer
                         │
     ┌───────────┬───────┼────────┬────────────┐
     │           │       │        │            │
Architectural   Civil  Mechanical Electrical  Plumbing
     │           │       │        │            │
     └───────────┴───────┼────────┴────────────┘
                         │
                 Fire Protection
                         │
                  Auxiliary / ELV
                         │
                         ▼
                 Role Workbenches
```

## What Must Not Be Duplicated

The following should not be recreated independently for each discipline:

- project identity
- tasks
- actions
- meetings
- decisions
- generic risks/issues/constraints
- dependencies
- document registry
- revision lineage
- evidence attachments
- approvals
- generic change records
- communication records
- reporting periods
- user identity
- role/authority
- audit history
- handover
- knowledge-return mechanism

A Civil Engineer, Architect, Mechanical Engineer, Electrical Engineer, Plumbing Engineer, Fire Protection Engineer and Auxiliary/ELV Engineer may see different views of the same underlying project objects.

## Discipline Technical Layer

FEIS owns technical meaning such as:

- discipline terminology
- design inputs
- calculation methods
- standards/references
- design checks
- inspection requirements
- test requirements
- equipment/material semantics
- technical acceptance criteria
- drawing/specification semantics
- engineering limitations
- cross-discipline interfaces

## Role Workbench Principle

A role Workbench is not a separate database or independent product core.

It is:

> Shared Project Context + Discipline Knowledge + Governed Task Packs + Authority + Evidence + Role-Specific UX

Examples:

### Architectural Workbench

May prioritize:

- architectural drawings
- specifications
- finishes
- material/sample approvals
- shop drawings
- mockups
- room/space requirements
- RCP coordination
- doors/windows
- millwork/casework/furniture
- site inspections
- punch/snag items
- client presentation/updates

### Civil Engineer Workbench

May prioritize:

- civil drawings
- grading
- survey
- earthworks
- drainage
- roads/pavements
- concrete/masonry
- structural interfaces
- site progress
- RFIs
- method statements
- inspection/test records
- calculation notes
- quantities

### Mechanical Engineer Workbench

Reuses the existing [[08_FEIS_Engineering_Intelligence_Systems/00_Mechanical Engineering Intelligence/FEIS-MECH-0000|Mechanical Engineering Intelligence]] branch and may prioritize:

- HVAC
- ventilation
- pumps
- chilled water
- refrigeration
- plant systems
- equipment selection
- mechanical calculations
- testing and commissioning
- TAB/readiness
- equipment schedules
- maintenance/operability interfaces

### Electrical Engineer Workbench

May prioritize:

- power distribution
- load schedules
- single-line diagrams
- panelboards
- transformers
- generators
- UPS
- grounding/bonding
- lighting
- protective devices
- cable/conductor schedules
- electrical testing
- coordination with auxiliary systems

### Plumbing / Sanitary Workbench

May prioritize:

- domestic water
- hot/cold water
- sanitary drainage
- venting
- storm drainage
- water storage
- pumps
- fixtures
- sewer/STP interfaces
- plumbing calculations
- inspections/testing
- local sanitary/regulatory interfaces

### Fire Protection Workbench

May prioritize:

- water-based fire protection
- sprinklers
- standpipe/hose systems
- hydrants
- fire pumps
- suppression systems
- hydraulic design/checks where authorized
- inspection/testing
- fire/life-safety interfaces
- testing and commissioning

### Auxiliary / ELV Workbench

Project-dependent systems may include:

- fire detection and alarm system (FDAS) interfaces
- CCTV
- access control
- structured cabling
- ICT/data
- telecom
- public address/background music
- intercom
- nurse call where applicable
- master clock where applicable
- MATV/IPTV where applicable
- parking/access systems where applicable
- BMS/controls integration
- metering/monitoring interfaces
- other low-voltage specialty systems

Not every project requires every Auxiliary/ELV system. Applicability must be explicit.

## MEPF + Auxiliary Coordination

MEPF and Auxiliary systems must not become isolated discipline silos.

The system should expose interface relationships such as:

- architectural ceiling vs MEPF services
- equipment electrical power requirements
- mechanical controls/BMS interfaces
- fire alarm shutdown/interlock interfaces
- fire pump electrical supply
- plumbing/fire-protection shared water/storage interfaces
- drainage requirements for mechanical equipment
- electrical rooms and clearance requirements
- generator/UPS supply to life-safety/auxiliary systems
- structured cabling pathways and architectural containment
- CCTV/access-control device locations vs architectural doors/walls
- penetrations, sleeves and builder's works
- testing/commissioning dependencies

## Cross-Discipline Interface Object

A reusable interface record should support:

- interface ID
- participating disciplines
- project / area / system
- governing drawing/specification references
- responsibility
- required input
- required output
- dependency
- due date
- risk if unresolved
- evidence
- current decision
- status
- verification / approval

## Common Practice vs Engineering Authority

The system must distinguish:

### Common Practice

Typical industry workflow, coordination sequence, document type or operating convention.

### Project Requirement

A contractual or project-specific requirement.

### Standard / Code Requirement

A requirement from an applicable code, standard or authority.

### Engineering Judgment

A professional technical interpretation or design decision.

### Approved Project Decision

A formally accepted project decision.

"Common practice" must never be presented as code or contractual authority unless supported by the governing source.

## Calculation Notes

All disciplines may use one common calculation-note framework governed by [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD|FEIP-STD-006]].

Recommended record:

- purpose
- discipline
- project/system
- inputs
- units
- source of inputs
- assumptions
- method/equations
- governing references
- deterministic calculation
- result
- engineering interpretation
- limitations
- acceptance criteria
- reviewer
- revision
- evidence

Discipline-specific calculation methods remain separate.

## Provider Independence

No role Workbench shall depend architecturally on Claude, OpenAI, or another specific provider.

Preferred pattern:

```text
Role Workbench
    ↓
FDG Capability / Task Pack
    ↓
Nex / Capability Router
    ↓
Deterministic Services + Model Adapter Layer
    ├── OpenAI
    ├── Anthropic
    ├── Local Model
    └── Future Provider
```

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0001 - Architecture Civil MEPF Auxiliary Capability Map|Architecture, Civil, MEPF & Auxiliary Capability Map]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0002 - Common Engineering Practice Workflow and Task Pack Standard|Common Engineering Practice Workflow Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0005 - Construction Manager Role Intelligence and Guided Workflow Standard|Construction Manager Role Intelligence]]
- [[06_Organizational_Architecture/ENGINEERING_ROLE_STANDARD|Engineering Role Standard]]
- [[19_FWAIS — FDG Workflow Automation Intelligence System/Conversation_Compilations/19_FWAIS_Conversation_Compilation_Complete/19_FWAIS_Conversation_Compilation/02_Canonical_Architecture/FWAIS_Capability_over_Tool_Principle|Capability-over-Tool Principle]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/00_Multidiscipline_Engineering_Intelligence_Master_Index|MDE Master Index]] → this document
