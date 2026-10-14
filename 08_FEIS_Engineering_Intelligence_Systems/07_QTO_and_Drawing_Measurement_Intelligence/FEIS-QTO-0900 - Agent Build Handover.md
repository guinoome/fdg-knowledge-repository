---
document_id: FEIS-QTO-0900
title: FDG Engineering QTO Agent Build Handover
status: Ready for Future Build Authorization
created: 2026-10-14
---

# FEIS-QTO-0900 — Agent Build Handover

## Mission

Implement FDG Engineering QTO without rediscovering architecture and without importing OpenTakeoff source code.

## Mandatory Instruction

> You are implementing an FDG-owned QTO architecture. External repositories are research benchmarks unless an explicit legal/technical integration decision says otherwise. Do not copy AGPL source into a proprietary FDG codebase.

## Read Order

1. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]]
2. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0000 - FDG Engineering QTO Architecture|Architecture]]
3. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0001 - Measurement Calibration Geometry and Quantity Data Contract|Data Contract]]
4. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0002 - Provenance Evidence Review and Human Authority Standard|Review/Authority]]
5. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0008 - L1 Exist First Implementation Blueprint|L1 Blueprint]]
6. [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/FEIS-QTO-0007 - Benchmark Corpus Accuracy and Acceptance Standard|Benchmark Standard]]
7. Task-specific affected contracts only.
8. Latest implementation handover/patch if one exists.

Do not reread the whole FEIS repository unless a conflict requires it.

## First Build Target

`FEIS-QTO-R0.1.0`

```text
Open PDF
→ Select Sheet
→ Confirm Scale
→ Area / Linear / Count
→ Assign Item
→ Review
→ Save / Reopen
→ Spreadsheet/BOQ Export
→ Marked Drawing Export
```

## Reuse Principles, Not Upstream Code

OpenTakeoff research should inform:
- scale gate;
- canonical document;
- provenance;
- proposal/review;
- benchmark;
- agent-neutral tool surface.

FDG implementation must be independently authored unless a later license-approved component boundary is explicitly authorized.

## Stop Conditions

Stop/escalate if:
- build authorization absent;
- implementation repo unknown and code creation requested;
- proposed dependency introduces mandatory cloud;
- source license is incompatible/unclear;
- dimensional calculation would proceed without calibration;
- agent can overwrite approved human work;
- unknown unit is silently assumed;
- output cannot trace to source measurement;
- benchmark is unavailable for a claimed automated feature.

## Current Non-Goals

No automatic room detection, full OCR/schedule intelligence, autonomous takeoff or Construction OS integration is required for R0.1.0.

## Handover at Every Session

Record:
- repository / branch / head;
- work package;
- files changed;
- tests;
- benchmark result;
- screenshots/overlays;
- schema change;
- known defects;
- next exact action;
- patches created;
- knowledge docs/Wikilinks updated.

## Future Promotion

After R0.1.0:
1. pilot/use;
2. inspect actual bottleneck;
3. create one patch;
4. test;
5. release;
6. repeat.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → this handover.
