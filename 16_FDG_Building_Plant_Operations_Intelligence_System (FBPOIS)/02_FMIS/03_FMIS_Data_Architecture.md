# FMIS-0003 — Data Architecture

FMIS data shall be structured, relational, traceable, auditable, historically preserved, configurable, and searchable.

## Core Entities

Organization, Property, Building, Floor, Area, Room, Plant, System, Asset, Equipment, Component, Maintenance Request, Work Order, PM Definition, PM Occurrence, Inspection, Test, Failure Event, Maintenance History, Material, Spare Part, Inventory Transaction, Procurement Record, Supplier, Employee, Contractor, Maintenance Project, Document, Attachment, Audit Event.

## Stable IDs

Use stable internal identifiers such as:

```text
ASSET-...
EQP-...
WO-...
PM-...
REQ-...
FAIL-...
SP-...
PR-...
PO-...
```

External identifiers must be stored separately.

## History

Do not overwrite information required to reconstruct previous equipment condition, assignment, status, readings, failures, repairs, or costs.

## Shared Data

FMIS may use shared FBPOIS identities for organization, property, building, location, users, assets, and documents. Shared data does not mean shared functional ownership.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document

---

## Maintenance Readiness Data Extension — 2026-10-09

FMIS should add, without replacing current entities:

~~~text
WorkReadinessAssessment
ReadinessDimension
MaintenanceConstraint
JobPlan
JobPlanRevision
WorkPackage
MaterialReservation
MaterialKit
SchedulePeriod
ScheduleCommitment
ScheduleChange
BreakInWork
ExecutionFeedback
PostMaintenanceTest
ReturnToServiceRecord
AssetMaintenanceReadinessAssessment
~~~

A Work Order shall preserve both workflow status and readiness state.

The detailed contract is defined in:
[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|FEIS-MNT-0003]].
