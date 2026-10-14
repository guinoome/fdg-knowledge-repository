---
document_id: FEIS-QTO-0004
title: Drawing Intelligence Sheet Graph Symbol and Schedule Extraction
status: Approved Future Capability Standard
created: 2026-10-14
---

# FEIS-QTO-0004 — Drawing Intelligence, Sheet Graph, Symbol & Schedule Extraction

## Objective

Move beyond OCR into a traceable relationship graph across a drawing set.

## Drawing Relationship Graph

```text
Project
→ Document
→ Sheet
→ View / Detail
↔ Callout
↔ Section
↔ Schedule
↔ Symbol / Tag
↔ Equipment / Material Definition
↔ Specification
↔ Quantity Item
↔ BOQ Item
```

Every resolved relationship should be citeable back to its source sheet/text/geometry.

## Sheet Classification

Candidate roles:
- plan
- reflected ceiling plan
- section
- elevation
- detail
- schedule
- schematic
- single-line diagram
- riser
- legend
- general notes
- title / cover
- specification extract

Classification may be model-assisted but must expose evidence.

## Schedule Intelligence

Future supported schedule families:
- room finish
- door/window
- equipment
- mechanical equipment
- diffuser/grille
- valve
- plumbing fixture
- lighting fixture
- panel/load
- cable
- device / ELV
- fire alarm
- sprinkler / fire-protection
- material/finish
- other discipline-defined schedule

## Tag Resolution

Example:

```text
AHU-01 on Plan
→ AHU Schedule
→ Row AHU-01
→ Capacity / CFM / ESP / Power / Type
→ Quantity Item
→ BOQ / Equipment Schedule
```

Resolution states:
- Resolved
- Multiple Candidates
- Missing Schedule
- Missing Drawn Tag
- Conflicting Definition
- Review Required

## Symbol Sweep

```text
Human identifies representative symbol
→ engine/model derives signature
→ scan bounded sheet/set
→ proposed instances
→ confidence/evidence
→ human review
→ accepted count
```

Applicable examples:
- light fixtures
- receptacles
- switches
- sprinklers
- detectors
- diffusers
- grilles
- plumbing fixtures
- valves
- equipment symbols
- CCTV/access-control devices
- auxiliary devices

## Revision Intelligence

The graph should connect revision markers, clouds/tags where detectable, sheet revisions and affected quantities.

Absence of detectable revision markup must never be interpreted as proof that no revision exists.

## Raster vs Vector

Prefer available deterministic evidence:
- vector/text layers when present;
- raster/image analysis when needed;
- model inference as proposal, not hidden authority.

## Cross-Sheet / Multi-Document

A bid set may include:
- plans;
- schedules;
- specifications;
- addenda;
- revised sheets.

The relationship graph must span the set without destroying per-document revision/provenance.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0006 - Construction Document Intelligence and Verification Standard|Construction Document Intelligence]] → this standard.
