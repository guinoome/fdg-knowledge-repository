# FEIS-MDE-0001 — Architecture, Civil, MEPF & Auxiliary Capability Map

**Status:** Approved Direction — Capability Map  
**Effective:** 2026-10-05  
**Owner / Final Authority:** Francis

## Purpose

Define a scalable discipline map for FEIS so future research, role Workbenches and engineering modules can be expanded without duplicating universal Project Operations capabilities.

This is a capability taxonomy and review map, not a claim that every capability is already implemented.

---

# 1. Universal Workflows Reused Across Disciplines

These functions should be shared wherever possible:

- tender review
- drawing register
- specification register
- document/revision review
- design basis
- calculation note
- RFI / technical query
- submittal
- shop drawing
- material approval
- sample/mockup approval
- method statement
- inspection request
- inspection checklist
- test record
- NCR/corrective action
- site report
- progress record
- quantity/evidence record
- coordination issue
- interface record
- meeting minutes
- decision record
- client update
- change/variation support
- punch/snag
- Testing & Commissioning
- as-built
- O&M/turnover
- lessons learned

The workflow shell may be universal; the technical fields, standards, acceptance criteria and reviewer authority are discipline-specific.

---

# 2. Architectural / Fit-Out / Finishes

## Knowledge Areas

- architectural design intent
- room/space requirements
- plans/elevations/sections/details
- reflected ceiling plans
- finishes schedules
- material specifications
- doors/windows/ironmongery interfaces
- partitions/ceilings
- flooring/wall/ceiling finishes
- waterproofing interfaces
- architectural hardware
- millwork/casework
- furniture and built-in components
- accessibility interfaces
- façade/envelope interfaces
- wet-area coordination
- sample/mockup approval
- color/material control
- architectural punch/snag
- fit-out turnover

## Role Workbench Actions

- review specifications
- compare drawing revisions
- summarize finish requirements
- prepare RFI
- review material submittal
- review shop drawing
- prepare/verify sample/mockup record
- prepare site report
- prepare method-statement review
- generate inspection checklist from approved requirements
- capture defect/punch evidence
- prepare client update
- verify closeout completeness

## Existing FDG Relationship

Future architectural/furniture capabilities should link to FEIS rather than form a disconnected product architecture.

---

# 3. Civil Engineering

## Knowledge Areas

- surveying / control interfaces
- site development
- grading
- earthworks
- excavation/backfill
- compaction
- roads/pavements
- curbs
- drainage
- site utilities interfaces
- concrete
- reinforcement
- formwork
- masonry
- civil structures/interfaces
- retaining structures where applicable
- foundations interfaces
- testing/inspection
- quantity measurement
- construction sequencing
- temporary works interface where applicable

## Role Workbench Actions

- review civil drawings/specifications
- prepare site report
- prepare RFI
- prepare/review method statement
- prepare calculation note
- verify quantity/evidence
- inspect civil works
- check material/test documentation
- review survey/setting-out record
- track concrete/soil test evidence
- manage punch items
- summarize client status

Professional structural design/checking requires appropriate qualified authority and shall not be inferred from generic Civil Engineer role assignment.

---

# 4. Mechanical Engineering

Canonical deep branch:

[[08_FEIS_Engineering_Intelligence_Systems/00_Mechanical Engineering Intelligence/FEIS-MECH-0000|Mechanical Engineering Intelligence]]

## Knowledge Areas

- HVAC
- ventilation
- air distribution
- chilled water
- pumps
- refrigeration
- thermal systems
- equipment selection
- piping/hydraulics
- plant systems
- smoke-control interfaces
- energy/performance
- mechanical testing and commissioning
- maintainability/operability

## Workbench Actions

- review mechanical drawings/specifications
- engineering calculation notes
- equipment/submittal review
- shop drawing review
- method statements
- inspection/test readiness
- TAB/T&C readiness
- site reports
- technical RFIs
- equipment schedules
- performance verification
- turnover review

---

# 5. Electrical Engineering

## Knowledge Areas

- electrical load basis
- power distribution
- single-line diagrams
- switchgear/panelboards
- transformers
- generators
- UPS
- conductors/cables
- raceways/trays
- grounding/bonding
- lighting
- emergency/life-safety power
- protective devices
- metering
- power-quality interfaces
- electrical testing
- equipment power interfaces

## Workbench Actions

- load/calculation note
- drawing/spec review
- SLD review
- panel/load schedule review
- cable schedule review
- equipment power coordination
- material submittal
- installation inspection
- testing readiness
- RFI
- method statement
- T&C evidence
- closeout/as-built verification

Any short-circuit, protection coordination, arc-flash or other consequence-heavy study should use approved deterministic engineering methods/software and qualified review.

---

# 6. Plumbing / Sanitary Engineering

## Knowledge Areas

- domestic water
- hot/cold water
- water storage
- transfer/booster pumps
- fixtures
- sanitary drainage
- venting
- storm drainage
- grease/waste interfaces
- sewer connections
- STP/water-treatment interfaces
- pipe sizing
- pressure/flow
- testing/disinfection
- sanitary/regulatory interfaces

## Workbench Actions

- review plumbing drawings/specifications
- pipe/hydraulic calculation note
- fixture/equipment schedule review
- material submittal
- shop drawing
- method statement
- inspection/test checklist
- pressure/leak test record
- RFI
- coordination issue
- turnover review

---

# 7. Fire Protection Engineering

## Knowledge Areas

- fire-water source/storage interfaces
- fire pumps
- sprinkler systems
- standpipe/hose systems
- hydrants
- suppression systems
- valves/zoning
- hydraulic design/check interfaces
- fire/life-safety coordination
- testing/commissioning
- impairment/acceptance interfaces

## Workbench Actions

- drawing/spec review
- equipment/submittal review
- hydraulic calculation record where authorized
- inspection/testing
- fire pump test evidence
- T&C readiness
- deficiency/punch handling
- closeout/acceptance dossier

Regulatory/fire-code authority remains with the appropriate legal/regulatory source and qualified professionals.

---

# 8. Auxiliary / ELV / Specialty Systems

## Scope

Auxiliary is treated as a project-dependent capability family, not one fixed system.

Possible systems include:

- FDAS / fire detection and alarm interfaces
- CCTV
- access control
- intrusion/security alarm
- structured cabling
- ICT/data backbone
- telecom
- Wi-Fi infrastructure interfaces
- PA/BGM
- intercom
- nurse call
- master clock
- MATV/IPTV
- parking guidance/access
- room-management interfaces
- BMS field/control interfaces
- metering/monitoring
- AV interfaces
- specialty signaling/communication systems

## Common Technical Semantics

- device schedule
- point schedule
- network/topology
- cable type
- pathway
- power requirement
- rack/panel
- interface
- cause/effect
- sequence
- testing
- commissioning
- labeling
- addressing
- as-built topology

## Workbench Actions

- review drawing/specification
- compare device schedules
- review topology
- prepare RFI
- submittal review
- shop drawing review
- cable/pathway coordination
- power/interface coordination
- method statement
- inspection checklist
- point-to-point testing
- functional testing
- cause/effect verification where applicable
- labeling/as-built review
- turnover package review

---

# 9. Cross-Discipline Coordination Capability

The shared coordination engine should identify and track:

- spatial clashes
- access/maintenance clearances
- ceiling/service congestion
- openings/sleeves
- builder's works
- equipment loads
- electrical power dependencies
- controls/BMS interfaces
- fire/life-safety interlocks
- drainage/condensate needs
- equipment supports
- architectural access panels
- commissioning dependencies
- shutdown/interface sequences
- responsibility gaps

Coordination findings must become structured interface records, not remain trapped in meeting minutes.

---

# 10. Applicability Rule

A project capability must have an applicability state such as:

- Required
- Applicable
- Optional
- Not Applicable
- Unknown — Review Required

Do not show every possible system to every project.

---

# 11. Future Review Priority

Future top-tier agent reviews should first mature:

1. cross-discipline shared workflow schemas
2. Architectural/fit-out common practice pack
3. Civil common practice pack
4. Electrical baseline
5. Plumbing/Sanitary baseline
6. Fire Protection baseline
7. Auxiliary/ELV baseline
8. discipline coordination/interface schema
9. discipline calculation-note profiles
10. inspection/test/turnover profiles

Each review should seek verified common practice while keeping standards, code requirements and project requirements distinguishable.

## Connected Knowledge

- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0000 - Multidiscipline Engineering Capability and Role Workbench Architecture|MDE Architecture]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0002 - Common Engineering Practice Workflow and Task Pack Standard|Common Practice Workflow Standard]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0900 - Top Tier Cross Model Review Handover|Top-Tier Review Handover]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Construction Template Catalog]]
- [[13_FDG_Legal_Intelligence_System/15_Regulatory_Compliance_Intelligence_Module/FLIS-RCIM-1500 - FDG Regulatory Compliance Intelligence Module|FRCIM]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/00_Multidiscipline_Engineering_Intelligence_Master_Index|MDE Master Index]] → this document
