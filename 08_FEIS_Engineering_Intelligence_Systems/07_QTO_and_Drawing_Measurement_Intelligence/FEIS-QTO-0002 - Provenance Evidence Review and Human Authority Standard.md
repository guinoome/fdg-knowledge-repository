---
document_id: FEIS-QTO-0002
title: Provenance Evidence Review and Human Authority Standard
status: Approved Standard
created: 2026-10-14
---

# FEIS-QTO-0002 — Provenance, Evidence, Review & Human Authority

## Principle

**How a measurement was created and who created it are different facts.**

Examples:

```text
method = manual
actor = agent

method = vector_sweep
actor = agent

method = manual
actor = human

method = derived
actor = rule
```

Do not reduce provenance to `AI=true/false`.

## CORE Mapping

Every material QTO result should preserve:

- **Context** — project, drawing, sheet, revision, view, trade, item.
- **Origin** — actor, method, source geometry/text/schedule.
- **Reasoning** — rule, assignment basis, conversion, deduction, waste/multiplier.
- **Evidence** — overlay, source citation, schedule row, image, dimension, review record.

## Provenance Minimum

```text
method
actor_type
actor_id / provider optional
source_document
sheet
revision
calibration
source_region / geometry
confidence optional
confidence_factors optional
derived_from
created_at
updated_at
```

## Review States

- Proposed
- Pending Human Review
- Corrected
- Approved
- Withheld / Unresolved
- Rejected
- Superseded

## Pencil-to-Ink Doctrine

```text
Agent work = proposal / pencil
Human review = correction / acceptance
Approved work = ink
```

A model may revise its own unapproved work.

It must not silently alter human-approved measurement.

Any reopening of approved work requires a new revision/change event with authority and reason.

## Preserve Original Proposal

When a human corrects agent geometry or assignment:
- preserve the original proposal;
- preserve the corrected result;
- record who corrected it;
- record edit type;
- do not overwrite the training/audit signal.

This supports both audit and future model evaluation.

## Withhold Instead of Guess

The following must be capable of producing `Review Required` or `Unresolved`:

- missing scale;
- unreadable dimension;
- ambiguous symbol;
- duplicated schedule mark;
- room/tag with no schedule row;
- schedule row with no drawn item;
- conflicting drawing/specification;
- uncertain revision;
- unknown unit;
- unproven transition/deduction;
- insufficient evidence.

## RFI / Technical Query

When ambiguity affects scope or quantity, the QTO system may prepare a governed RFI/technical query.

It shall include:
- exact drawing/spec references;
- ambiguity;
- affected quantities/items;
- evidence;
- impact if unresolved;
- proposed question.

Sending/issuing remains human-controlled.

## Approval Semantics

Human approval means the named reviewer accepted the measurement for the workflow's defined purpose.

It does not automatically mean:
- design approval;
- contractual acceptance;
- statutory certification;
- final commercial approval.

Authority is role/workflow specific.

## Evidence Ladder

Use FDG Evidence Ladder A–E.

High-impact commercial quantities should not rely solely on low-confidence inferred evidence without explicit review.

> **Knowledge path:** [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|CORE Engineering Reasoning]] → this standard.
