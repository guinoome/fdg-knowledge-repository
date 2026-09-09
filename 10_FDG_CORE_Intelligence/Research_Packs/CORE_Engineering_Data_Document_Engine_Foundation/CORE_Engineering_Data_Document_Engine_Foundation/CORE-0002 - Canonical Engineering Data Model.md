# CORE-0002 — Canonical Engineering Data Model

## Core entities

Minimum shared entities:

- Organization / Tenant
- Project / Facility / Site / Location / Space
- System / Subsystem
- Asset / Equipment / Component
- Actor / Person / Role / Team
- Requirement / Acceptance Criterion
- Methodology / Procedure / Test
- Observation
- Measurement
- Calculation
- Evidence / Attachment
- Drawing / Specification / Reference
- Finding / Deficiency / Nonconformance
- Risk
- Action / Corrective Action
- Verification / Retest
- Review / Approval / Witness
- Document / Deliverable
- Revision / Change
- Relationship
- Event
- Instrument / Calibration Record

## Persistent identity

IDs must survive tag renaming, document revisions, relocation, module adoption, import/export, and synchronization.

Human-readable tags may change; canonical identity does not.

## Semantic distinction

Do not collapse these into one text field:

```text
Fact / source record
Observation
Measurement
Calculation
Interpretation
Finding
Hypothesis
Recommendation
Decision
Approval
```

This separation is essential for CORE provenance and future machine reasoning.

## Units and quantities

Measurements should store:

- numeric value;
- original unit;
- canonical unit;
- physical quantity/dimension;
- significant digits / precision where relevant;
- measurement uncertainty / instrument accuracy where available;
- original representation;
- conversion methodology/version.

Invalid dimensional comparisons should be rejected or flagged.

## Unknown is a valid state

Unknown, not measured, not applicable, unavailable, assumed, and zero are semantically different.

## Relationship-first model

Example:

```text
Pump P-101
├── located_in → Plantroom A
├── member_of → CHW Loop A
├── powered_by → MCC-03
├── shown_on → Drawing M-204
├── governed_by → Requirement R-201
├── tested_by → Test TC-428
├── produced → Measurement M-9281
├── supported_by → Evidence E-551
├── has_finding → Finding F-018
└── corrected_by → Action CA-009
```

This relationship layer becomes the bridge to BIM, asset intelligence, RCA, diagnostics and future digital-twin functions.

## Schema evolution

Every persisted record must be interpretable against a schema version. Migrations require traceable change records and rollback/verification strategy.

## Related

[[CORE-0003 - Evidence Provenance and Engineering State]] · [[CORE-0010 - Engineering Knowledge Graph and Intelligence Evolution]] · [[FDG Engineering Intelligence System]]
