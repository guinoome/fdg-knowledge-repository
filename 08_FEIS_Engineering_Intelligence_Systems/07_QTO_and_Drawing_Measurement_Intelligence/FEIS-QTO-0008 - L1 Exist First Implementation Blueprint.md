---
document_id: FEIS-QTO-0008
title: L1 Exist First Implementation Blueprint
status: Approved L1 Blueprint - Build Authorization Separate
created: 2026-10-14
target_release: FEIS-QTO-R0.1.0
---

# FEIS-QTO-0008 — L1 Exist-First Implementation Blueprint

## Governing Rule

> **Make FDG QTO exist and work first. Enhance it later through traceable patches.**

Do not attempt full automated takeoff in the first release.

## L1 User Outcome

A professional can:
1. open a construction drawing locally;
2. identify a sheet;
3. calibrate/confirm scale;
4. measure area, linear and count;
5. assign an item;
6. inspect/edit the measurement;
7. approve/review it;
8. see quantity totals;
9. save/reopen the project;
10. export a spreadsheet/BOQ view and marked-up PDF with provenance.

## Required L1

### Project / Document
- local project;
- drawing import;
- multi-page PDF minimum;
- sheet identity;
- revision field.

### Calibration
- set from known distance/scale;
- confirmation;
- visible scale state;
- block dimensional measurement if unset.

### Tools
- Area
- Linear
- Count
- Select/Edit/Delete
- Deduction optional only if required to make area credible; otherwise first patch.

### Item / Condition
- code;
- description;
- discipline;
- system;
- unit;
- waste/multiplier optional;
- BOQ grouping.

### Provenance
- method;
- actor;
- sheet/revision;
- calibration;
- timestamps;
- review state.

### Review
- proposed/pending;
- human approved;
- corrected;
- rejected/withheld.

### Outputs
- canonical local project file/database;
- quantity table;
- spreadsheet/CSV or XLSX view;
- marked-up PDF/image evidence.

### Recovery
- local save;
- reopen;
- backup/export;
- restore.

## L1 Explicit Non-Scope

Do not block release for:
- automatic room detection;
- symbol sweep;
- schedule graph;
- OCR intelligence;
- multi-user sync;
- cloud database;
- DWG/IFC;
- BIM;
- revision auto-diff;
- autonomous takeoff;
- agent MCP adapter;
- cost database;
- procurement;
- full Construction OS;
- advanced material optimization;
- voice.

These remain architecture/patch candidates.

## Acceptance Test

Known drawing:
```text
Open
→ Calibrate
→ Measure known area
→ Measure known line
→ Place known counts
→ Assign items
→ Save
→ Close
→ Reopen
→ Values unchanged
→ Marked output matches geometry
→ Spreadsheet totals match canonical dataset
```

Tolerance must be explicitly defined per benchmark, not improvised after the run.

## First Patch Candidates

After R0.1.0:
- deductions/openings;
- symbol sweep;
- schedule extraction;
- Scope Requirement Register;
- Coverage Matrix;
- RFI;
- revision comparison;
- agent proposal adapter;
- BOQ live integration;
- trade-specific MEPF helpers.

Prioritize from real use and benchmark failures.

## Release Freeze

When accepted:
- record exact implementation repo commit;
- record schema version;
- record benchmark result;
- record known limitations;
- declare `FEIS-QTO-R0.1.0`;
- move all enhancements into Patch Register.

## Deployment

Local acceptance precedes any hosted deployment.

The knowledge repository remains architecture/source of truth; executable code belongs in the appropriate implementation repository.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Exist First Standard]] → this L1 blueprint.
