---
document_id: FEIS-QTO-0005
title: Multidiscipline QTO Semantics and Trade Capability Profiles
status: Approved Direction
created: 2026-10-14
---

# FEIS-QTO-0005 — Multidiscipline QTO Semantics & Trade Capability Profiles

## Rule

One QTO kernel serves all construction trades. Trade-specific engineering meaning is added through capability profiles.

Do not create a separate measurement engine for each profession.

## Common Measurement Types

- Area
- Linear
- Count
- Surface
- Volume-derived
- Length with fittings/accessories
- Weight-derived where governed
- Assembly/system quantity

## Architectural / Fit-Out

Examples:
- flooring area
- wall finish area
- ceiling area
- partitions
- doors/windows count
- casework
- paint
- waterproofing
- finish transitions/base

Special semantics:
- openings/deductions
- room finish schedules
- waste
- pattern/roll/tile setup
- finish code mapping

## Civil

Examples:
- excavation volume
- backfill
- pavement area/volume
- curb/gutter linear
- drainage
- concrete
- reinforcement evidence interface
- masonry
- site utilities

Professional calculation methods remain separately governed.

## Mechanical / HVAC

Examples:
- duct lengths/sizes
- fittings/accessories
- insulation area/length
- chilled-water/refrigerant/drain piping
- valves
- supports
- diffusers/grilles
- dampers
- equipment counts
- equipment schedules

## Electrical

Examples:
- cable/conductor length
- conduit/raceway
- tray
- outlets/switches
- light fixtures
- panels/equipment
- grounding
- device counts

## Plumbing / Sanitary

Examples:
- pipe length by system/size
- fittings/valves
- fixtures
- drains
- pumps/equipment
- accessories

## Fire Protection

Examples:
- sprinkler count/type
- pipe length/size
- valves
- hose/standpipe
- fire pumps/equipment
- detectors/interfaces where applicable

## Auxiliary / ELV

Examples:
- CCTV cameras
- access-control devices
- data outlets
- APs
- speakers
- intercom/nurse call
- FDAS devices
- cable/pathway
- racks/panels
- interface points

## Quantity Condition / Item Profile

A trade profile may define:

```text
discipline
system
item taxonomy
allowed quantity types
default units
schedule types
symbol families
deduction rules
waste rules
multiplier rules
accessory derivation rules
required evidence
required review role
BOQ mapping
```

## Assumptions

Profile defaults must distinguish:
- engineering rule;
- project-specific rule;
- user assumption;
- estimate allowance;
- unknown.

Unknowns that materially affect quantity become review questions/RFI candidates.

## Construction-Trade Universality

The same Construction OS can consume quantities from all profiles without becoming trade-specific.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0001 - Architecture Civil MEPF Auxiliary Capability Map|Multidiscipline Capability Map]] → this profile standard.
