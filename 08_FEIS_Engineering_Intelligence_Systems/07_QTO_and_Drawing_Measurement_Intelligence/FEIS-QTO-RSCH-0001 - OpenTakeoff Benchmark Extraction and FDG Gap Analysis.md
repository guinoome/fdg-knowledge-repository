---
document_id: FEIS-QTO-RSCH-0001
title: OpenTakeoff Benchmark Extraction and FDG Gap Analysis
status: Research Benchmark - Source Code Not Imported
created: 2026-10-14
source_repository: Kentucky-ai/opentakeoff
source_default_branch: main
source_tree_sha: 9624be84c60dc1f7f2ac403e0f05a873ba26b486
source_license: AGPL-3.0
---

# FEIS-QTO-RSCH-0001 — OpenTakeoff Benchmark Extraction & FDG Gap Analysis

## Research Boundary

This record extracts **architecture, data contracts, safety patterns, measurement principles, agent/human review, benchmark methodology and feature ideas**.

It does **not** copy OpenTakeoff source code into FDG.

Source reviewed:
- repository metadata / license;
- README;
- FEATURES;
- geometry workflow;
- MCP/agent documentation;
- measurement correctness design;
- package boundaries;
- Takeoff Protocol draft/schema;
- provenance schema;
- condition schema;
- sheet-graph evaluation;
- benchmark/evaluation structure.

Snapshot reviewed: `Kentucky-ai/opentakeoff@9624be84c60dc1f7f2ac403e0f05a873ba26b486`.

## What OpenTakeoff Demonstrates

At the reviewed snapshot, OpenTakeoff describes:
- browser/local-first takeoff;
- one measurement engine serving human canvas and agent/MCP;
- explicit calibration/scale gate;
- area/linear/count/surface measurement;
- symbol sweep;
- schedule/sheet graph;
- provenance and agent review state;
- marked-up PDF and report/export surfaces;
- human correction of agent proposals;
- benchmark corpora and blind-run evidence.

Its automatic One-Click room detection is explicitly gated in the reviewed README while revalidation proceeds. FDG therefore treats automatic room/flood detection as research, not a guaranteed baseline capability.

## Relevance → FDG Target

| Area | Source relevance | FDG integration target | How FDG reaches 10/10 |
|---|---:|---:|---|
| QTO measurement architecture | 10/10 | 10/10 | Generalize beyond flooring into multidiscipline FEIS profiles |
| Agent-neutral QTO | 10/10 | 10/10 | Provider-neutral adapter over one deterministic kernel |
| Provenance/evidence | 10/10 | 10/10 | Map to CORE and FDG Evidence Ladder |
| Local-first/offline | 10/10 | 10/10 | Core QTO works with no cloud/model dependency |
| Human review | 10/10 | 10/10 | Pencil-to-ink, protected approved work, auditable corrections |
| Drawing intelligence | 9/10 | 10/10 | Extend sheet graph to multidiscipline drawings/specs/revisions |
| MEPF symbol/schedule extraction | 9/10 | 10/10 | Add FEIS trade profiles and benchmark each schedule family |
| Construction OS direct use | 7/10 | 10/10 | Formal QTO→BOQ→budget→procurement→progress→billing contract |
| Full FEIS usefulness | 6/10 | 10/10 | Reuse measurement/provenance/review contracts across FEIS modules |
| Direct code reuse | 3/10 | 3/10 by design | Keep independent FDG implementation or legally reviewed adapter; do not force source reuse |

**Interpretation:** “10/10” means the extracted capability is made fully useful to FDG through adaptation and integration. It does not mean AGPL code reuse becomes desirable.

## Adopt

### 1. Scale as Gate
Detected scale is evidence, not authority. Dimensional quantity refuses absent/invalid calibration.

### 2. Geometry + Quantity + Provenance Together
A number without source geometry and calibration is insufficient.

### 3. Human/Agent Shared Truth
Both interfaces operate on one canonical dataset.

### 4. Method ≠ Actor
Preserve how something was produced separately from who produced it.

### 5. Agent Proposal / Human Approval
Agent work remains reviewable and distinguishable.

### 6. Preserve Corrections
Keep original proposal alongside corrected geometry/assignment.

### 7. Withhold Instead of Guess
Unresolved is a valid result.

### 8. Recalibration Recomputes
Geometry stays in drawing frame; dimensional quantity updates from calibration.

### 9. Known-Answer Benchmarks
Use real/synthetic public/licensed plans, blind runs and overlays.

### 10. Protocol/Data Contract
Treat Calibration, Measurement, Provenance, Evidence and Review as versioned contracts.

## Adapt

### Conditions → FDG Quantity Item Profile
OpenTakeoff's finish/material condition concept becomes a multidiscipline FDG item profile.

### Sheet Graph → FDG Drawing Relationship Graph
Extend beyond finish schedules to MEPF/equipment/panel/device/cable/fixture and specification relations.

### MCP → Agent-Neutral Adapter
MCP can be one adapter, but FDG domain contracts remain protocol/provider neutral.

### Browser-only → FDG Local Workspace
Retain local-first but allow future desktop/PWA/controlled sync according to FPJIS/FEIS standards.

### Reports → Construction OS Lineage
QTO output links to living BOQ and downstream operations, not only takeoff reports.

## Enhance

FDG-specific enhancement areas:
- Architecture/Civil/MEPF/Auxiliary profiles;
- Scope Requirement Register;
- Coverage Matrix;
- drawing/spec conflict register;
- RFI Intelligence;
- revision-to-commercial impact;
- BOQ/BOM mapping;
- estimate/rate linkage;
- procurement demand;
- installed/progress quantities;
- billing evidence;
- FEIS/Construction OS Attention Center;
- Philippine-first units/practice where applicable;
- professional engineering authority;
- CORE/FAIS evidence governance.

## Reject / Do Not Inherit Blindly

- flooring-specific semantics as universal QTO rules;
- any accuracy claim not reproduced by FDG;
- automatic measurement as authoritative without review;
- model-provider coupling;
- cloud dependency for core measurement;
- source-code copying into proprietary FDG without license review;
- feature breadth before L1 works.

## License Boundary

The upstream repository declares **AGPL-3.0**.

Therefore:
- architecture concepts and independently implemented patterns may be studied;
- source incorporation/modification/hosting may create AGPL obligations;
- commercial integration boundary requires FLIS/legal review;
- no upstream source is copied into this knowledge package;
- if a future adapter invokes a separately deployed OpenTakeoff component, legal/technical boundaries must be documented before production.

This is not legal advice; FLIS/legal authority owns final interpretation.

## Prior FDG Knowledge Consolidated

Earlier FDG QTO decisions strengthen this benchmark:
- PlanSwift-inspired PDF/CAD import, calibration, recognition, markup, BOQ and revision comparison;
- HVAC/MEP local deterministic takeoff before optional intelligence;
- human engineer final authority;
- no assumption on missing/ambiguous inputs;
- RFI for unresolved scope;
- Coverage Matrix / Scope Requirement Register;
- Excel and marked-up PDF deliverables;
- quantity lineage into budget/cost/procurement/progress;
- Local-First, Offline-Capable, Agent-Neutral, Provider-Replaceable.

## Result

OpenTakeoff is a **high-value architecture benchmark** for FDG QTO, but FDG should build its own governed multidiscipline kernel and use the source repository as an evidence/reference benchmark rather than as the FDG product codebase.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → this research record.
