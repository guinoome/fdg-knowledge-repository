---
document_id: FEIS-QTO-0010
title: Scope Requirement Coverage RFI and Revision Control Standard
status: Approved Standard
created: 2026-10-14
---

# FEIS-QTO-0010 — Scope Requirement, Coverage, RFI & Revision Control

## Purpose

Prevent a technically accurate measurement from being mistaken for a complete project takeoff.

A QTO can be geometrically correct and still miss scope.

## Scope Requirement Register

Before/while measuring, maintain a structured register of required scope.

Minimum:
```text
requirement_id
discipline
system
scope_description
source
drawing/spec reference
required_quantity_type
expected evidence
status
responsible reviewer
notes
```

Statuses:
- Identified
- Located
- Measured
- Partially Measured
- Not Found
- Not Applicable
- Ambiguous — Review Required
- RFI Required
- Superseded

## Coverage Matrix

The QTO should be able to answer:

```text
What scope was expected?
Where was it found?
Was it measured?
What evidence supports it?
What remains unresolved?
```

Example dimensions:
- discipline
- system
- floor/zone
- drawing sheet
- specification section
- equipment schedule
- BOQ section

## Completeness Rule

```text
Quantity Accuracy
+
Scope Coverage
=
Credible Takeoff
```

A total should not be labeled "complete" when known scope requirements remain unresolved.

## RFI Intelligence

Create an RFI/technical query candidate when:
- drawing and specification conflict;
- dimensions are missing;
- scale is inconsistent;
- symbol is undefined;
- schedule mark is missing/duplicated;
- equipment appears on plan but not schedule;
- schedule item has no corresponding drawn instance;
- revision intent is ambiguous;
- scope responsibility is unclear.

The RFI record should link affected QTO items.

## Revision Control

Every drawing revision must preserve:
- prior measurement state;
- new measurement state;
- delta;
- reviewer;
- downstream impact.

```text
Rev A
→ Approved QTO
→ BOQ/Budget

Rev B arrives
→ affected sheets/items identified
→ measurements updated/proposed
→ delta report
→ human review
→ downstream change candidate
```

Never erase Rev A history.

## Addenda

Addenda/specification changes must be capable of affecting:
- item definition;
- quantity basis;
- schedule mapping;
- scope inclusion/exclusion;
- material/specification;
- downstream commercial impact.

## Unknown Data

No hidden assumptions.

If a controlled estimating allowance is intentionally used, record:
- assumption;
- origin;
- rationale;
- affected quantity;
- reviewer;
- replacement condition when actual information arrives.

## Closeout Gate

A takeoff package may be declared:
- Measurement Complete
- Scope Review Complete
- Commercial Mapping Complete
- Approved for Estimate

These are separate gates.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → this standard.
