---
document_id: FEIS-QTO-0007
title: Benchmark Corpus Accuracy and Acceptance Standard
status: Approved Validation Standard
created: 2026-10-14
---

# FEIS-QTO-0007 — Benchmark Corpus, Accuracy & Acceptance Standard

## Principle

A QTO system is not validated because a demo looks correct.

Accuracy claims require known-answer drawings, frozen runs, measurable geometry/quantity errors and review evidence.

## Benchmark Corpus

Maintain controlled test sets for:

- Architectural / Fit-Out
- Civil
- Mechanical / HVAC
- Electrical
- Plumbing / Sanitary
- Fire Protection
- Auxiliary / ELV
- mixed-discipline coordination

Each set should contain where legally permitted:
- source drawing(s);
- source provenance/license;
- expected scale/calibration;
- known dimensions/areas/linears/counts;
- known schedules/tags;
- known BOQ result;
- ambiguity cases;
- revision pair where available.

Use synthetic or properly licensed/public drawings when source rights are unclear.

## Benchmark Levels

### B0 — Unit Math
Geometry and unit conversion.

### B1 — Controlled Synthetic Drawing
Known exact answers.

### B2 — Public/Licensed Real Drawing
Real drafting complexity.

### B3 — Blind Agent/Human Workflow
Run frozen before answer comparison.

### B4 — Production Pilot
Engineer-reviewed real project evidence with client confidentiality protected.

## Score Separately

Do not collapse all correctness into one number.

Metrics may include:
- calibration correctness;
- geometry intersection/IoU;
- dimension error;
- area error;
- linear error;
- count precision/recall;
- schedule/tag resolution precision/recall;
- false positive rate;
- withheld/unresolved correctness;
- BOQ mapping correctness;
- review correction rate;
- time;
- agent/tool calls;
- cost.

## Geometry vs Quantity

A correct total with wrong geometry is not sufficient.

A correct geometry assigned to the wrong item is not sufficient.

Required checks:
```text
Geometry
+
Quantity
+
Item Assignment
+
Source/Revision
+
Provenance
+
Review
```

## Blind Evaluation

For agent evaluation:
1. freeze task and input;
2. run without answer key;
3. freeze output;
4. score;
5. record corrections;
6. preserve evidence.

Do not tune on the test answer and report it as blind.

## Refusal / Withhold Score

A safe engine should be rewarded for refusing unsupported claims.

Track:
- correct unresolved;
- incorrect unresolved;
- unsupported confident answer.

Unsupported confident answers are higher severity than honest review-required states.

## Human Review Metric

Track:
- number of agent proposals;
- accepted unchanged;
- corrected;
- rejected;
- average correction magnitude;
- repeat failure mode.

This becomes a model/tooling improvement signal.

## Regression Gate

Every defect discovered in a real plan should produce, where possible:
- a minimized fixture or reproducible test;
- expected behavior;
- regression test;
- link to patch.

## Release Acceptance

L1 cannot claim validated QTO until it passes:
- unit/math tests;
- calibration tests;
- area/linear/count known-answer tests;
- save/reopen round trip;
- export equality;
- provenance/review persistence;
- offline/local workflow;
- marked-drawing evidence check.

Advanced agent features have separate gates.

## External Benchmark Principle

Open/public benchmarks may be used to compare tooling, but FDG should reproduce scores independently and disclose:
- source benchmark;
- version;
- scoring method;
- dataset license;
- modifications/adapters;
- limitations.

> **Knowledge path:** [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|FAIS Engineering Audit]] → this standard.
