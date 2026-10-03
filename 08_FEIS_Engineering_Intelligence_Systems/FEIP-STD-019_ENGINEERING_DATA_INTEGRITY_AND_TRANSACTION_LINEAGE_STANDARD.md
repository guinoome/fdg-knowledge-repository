---
title: FEIP-STD-019 Engineering Data Integrity and Transaction Lineage Standard
status: proposed-canonical
owner: FDG Engineering Intelligence Platform
created: 2026-10-03
source_review: BuildTrack PH benchmark synthesis
related:
  - "[[FEIP-STD-001_PLATFORM_ARCHITECTURE_AND_MODULE_DESIGN_STANDARD]]"
  - "[[FEIP-STD-003_ASSET_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-005_ENGINEERING_PROJECT_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-006_ENGINEERING_CALCULATION_ENGINE_MODULE_STANDARD]]"
  - "[[FEIP-STD-010_ENGINEERING_INVENTORY_AND_SPARE_PARTS_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-011_ENGINEERING_BUDGET_AND_COST_INTELLIGENCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-012_ENGINEERING_WORKFLOW_AND_AUTOMATION_MODULE_STANDARD]]"
  - "[[FEIP-STD-013_SECURITY_ACCESS_AND_GOVERNANCE_MODULE_STANDARD]]"
  - "[[FEIP-STD-015_DATA_ARCHITECTURE_AND_DATABASE_MODEL_STANDARD]]"
  - "[[FDG-CORE-STD-008_EVIDENCE_AND_PROVENANCE_ENGINE_STANDARD]]"
  - "[[FDG-CORE-STD-011_CONTINUOUS_LEARNING_STANDARD]]"
---

# FEIP-STD-019 — Engineering Data Integrity and Transaction Lineage Standard

## 1. Purpose

This standard strengthens FEIP by connecting existing engineering, project, inventory, budget, workflow, calculation, asset, security, and knowledge capabilities into auditable transaction lineages.

It does **not** create replacement modules for QTO, BIM, procurement, inventory, payroll, project controls, finance, maintenance, or asset management. It defines the interfaces and integrity rules between them.

The governing principle is:

> Capture once, validate strongly, preserve provenance, and reuse everywhere.

Every authoritative step must preserve FDG CORE:

- **Context** — project, tenant, site, asset, user, time, workflow state, contract/work package, and relevant operating conditions.
- **Origin** — where the input or event came from.
- **Reasoning** — calculation, rule, transformation, classification, conversion, or decision path.
- **Evidence** — source measurement, drawing, transaction, photo, document, approval, observation, or event.

No derived result may be represented as source fact.

---

## 2. Engineering Unit and Quantity Contract

Engineering systems shall not guess unknown or ambiguous units.

When a value cannot be safely parsed or converted, the system shall:

1. preserve the raw value;
2. identify the field requiring correction;
3. notify the user what could not be understood;
4. show the expected quantity type and accepted units where practical;
5. require correction or explicit authorized resolution before the value becomes authoritative.

Example:

```text
Entered: 350 xyz
Expected: length
Accepted examples: mm, cm, m, in, ft
Status: Correction required — unit "xyz" is not recognized.
```

The system shall **not silently assume** that an unknown unit means the most common local unit.

Every authoritative quantitative record should be able to preserve, where applicable:

```text
raw_value
raw_unit
canonical_value
canonical_unit
quantity_dimension
conversion_rule
conversion_source
precision
rounding_rule
entered_by
captured_at
validation_status
```

The unit contract applies across calculations, BOQ/QTO, energy, T&C, maintenance readings, asset data, solar, CAPEX, computational validation, reporting, and future engineering modules.

---

## 3. Quantity Lineage Standard

A quantity should remain traceable from design intent through construction, procurement, installation, verification, billing, turnover, and as-built condition.

Target lineage:

```text
Design Object / Drawing / Model
        ↓
Geometry / Source Measurement
        ↓
Measured Quantity
        ↓
QTO
        ↓
BOQ Item
        ↓
Budget / Cost Code
        ↓
Procurement Demand
        ↓
PO / Commitment
        ↓
Delivery
        ↓
Inventory / Site Receipt
        ↓
Issued / Installed Quantity
        ↓
Inspection / Test Evidence
        ↓
Progress Measurement
        ↓
Progress Billing
        ↓
As-Built Quantity
```

Each transition must retain identifiers sufficient to reconstruct how the downstream quantity was obtained.

Manual overrides must record who changed the value, why, the previous value, the replacement value, and supporting evidence.

---

## 4. BOQ Demand Reconciliation

BOQ shall not remain only a static estimate artifact. Where applicable it shall become a live demand-control object.

Minimum reconciliation states:

```text
Required Quantity
Approved Scope Adjustment
Committed Quantity
Ordered Quantity
Delivered Quantity
Available Stock
Issued Quantity
Installed Quantity
Rejected / Wasted Quantity
Remaining Requirement
Current Replacement / Procurement Rate
Forecast Remaining Cost
```

The system must distinguish physical quantity states from commercial states. "Ordered" is not "delivered"; "delivered" is not "installed"; "installed" is not "accepted".

Forecasting may compute estimate-at-completion, but forecast values must remain distinguishable from actuals.

---

## 5. Operational Event Posting Matrix

One validated operational event may create multiple linked consequences, but those consequences must be explicit and auditable.

Example — material delivery:

```text
Material Delivery Accepted
        ↓
Inventory Receipt
PO Fulfilment Update
Project Material Availability
Project Cost Commitment / Actual
Supplier Payable Reference
Schedule Availability Signal
Evidence Record
```

Example — material issued/installed:

```text
Material Issue / Installation
        ↓
Inventory Reduction
BOQ Consumption
Installed Quantity
Daily Progress
Cost Consumption
Inspection Requirement
Progress Claim Evidence
Asset / As-Built Record where applicable
```

Posting rules must be versioned and testable. A failed downstream posting shall be visible and recoverable rather than silently ignored.

---

## 6. Project Job-Costing and Productivity Standard

Labor time shall be capable of allocation to the work actually performed, without creating a second payroll source of truth.

Target linkage:

```text
Attendance / Time Record
        ↓
Project / Site
        ↓
WBS / Phase / Cost Code
        ↓
Trade / Work Package
        ↓
Approved Labor Hours
        ↓
Payroll Cost Allocation
        ↓
Actual Labor Cost
        ↓
Installed / Completed Quantity
        ↓
Productivity Intelligence
```

Examples of reusable metrics:

- installed quantity per man-hour;
- labor cost per installed unit;
- planned vs actual productivity;
- rework labor percentage;
- overtime contribution;
- productivity by crew, method, asset class, project type, or location.

Actual productivity shall feed continuous learning and future estimating only after validation and contextual normalization.

---

## 7. Schedule Dependency and Completion Forecast Standard

Project schedules shall distinguish baseline, actual, forecast, and approved change.

Minimum fields should support:

```text
baseline_start
baseline_finish
actual_start
actual_finish
remaining_duration
dependency_type
lag
constraint
float / criticality where supported
forecast_start
forecast_finish
change_reference
```

Late work shall be evaluated through dependency relationships rather than by isolated red status alone.

The system should be able to explain:

- which successor activities are affected;
- why the forecast moved;
- whether the critical path or contractual milestone is affected;
- which material, labor, approval, access, or contractor constraints contribute;
- the confidence and assumptions behind any forecast.

---

## 8. Database-Enforced Demo and Entitlement Controls

A disabled button is not an authorization boundary.

Demo, read-only, subscription, and privileged-operation restrictions must be enforced below the presentation layer where authoritative data or paid/controlled capability is at risk.

Target layered control:

```text
UI indication
↓
Application authorization
↓
API / service authorization
↓
Tenant / entitlement validation
↓
Database policy / transaction control where practical
```

Demo data must remain visibly and logically separated from production data.

---

## 9. Just-in-Time Support Access

Support access to customer or tenant data shall be explicit, scoped, time-bounded, and auditable.

A support grant should define:

```text
requesting_customer_or_authorized_user
support_actor
scope: tenant / project / module / record set
permissions: read / limited write / diagnostic
purpose
start_time
expiry_time
approval_reference
audit_event_stream
revocation_status
```

Persistent unrestricted support access should not be the default.

Emergency break-glass access, if implemented, must require enhanced audit, reason capture, rapid review, and notification consistent with security policy.

---

## 10. Non-Destructive Data Migration Standard

For live authoritative data, prefer:

```text
Add
→ Backfill
→ Validate
→ Switch
→ Deprecate
→ Observe
→ Remove later
```

Do not destructively rewrite historical data merely because the application model changed.

Every significant migration shall define:

- source schema;
- target schema;
- transformation rules;
- backfill logic;
- validation criteria;
- rollback/recovery method;
- compatibility window;
- deprecation date or condition;
- responsible owner;
- migration evidence.

---

## 11. Construction Transaction Spine

FEIP shall preserve a cross-module construction transaction lineage without forcing all functions into one monolithic module.

```text
Opportunity
↓
Estimate
↓
Quantity
↓
BOQ
↓
Baseline
↓
Procurement Demand
↓
Commitment
↓
Delivery
↓
Inventory
↓
Installation
↓
Inspection / Test
↓
Progress
↓
Labor / Payroll Allocation
↓
Actual Cost
↓
Forecast
↓
Billing
↓
Cash / Commercial Closure
↓
Testing & Commissioning
↓
Turnover
↓
Warranty / Operations
↓
Organizational Learning
```

The transaction spine is an integration architecture, not a replacement for existing domain authorities.

---

## 12. Acceptance Criteria

An implementation conforms to this standard when it can demonstrate that:

- unknown units are surfaced for correction instead of silently guessed;
- canonical units and conversion provenance are preserved;
- quantity lineage can be reconstructed across relevant lifecycle stages;
- BOQ requirement states are not collapsed into a single quantity;
- one operational event can post to required downstream domains without duplicate entry;
- failed postings are detectable and recoverable;
- labor cost can be tied to project/work context without duplicating payroll authority;
- schedule forecasts retain baseline/actual/change distinctions;
- demo/entitlement restrictions are enforced below the UI;
- support access is scoped, time-bounded, and audited;
- live schema changes use non-destructive migration discipline;
- every important derived record preserves Context, Origin, Reasoning, and Evidence.

---

## 13. Continuous Learning

Validated execution data should improve future engineering decisions, but operational history must never be silently rewritten.

Examples:

```text
Estimate → Execute → Measure → Learn → Improve Rate Library
Plan → Execute → Measure Delay Drivers → Improve Scheduling Rules
Specify → Install → Fail / Perform → Improve Design and Asset Standards
```

Learning artifacts must reference their source evidence and applicable context so local experience is not generalized beyond what the evidence supports.