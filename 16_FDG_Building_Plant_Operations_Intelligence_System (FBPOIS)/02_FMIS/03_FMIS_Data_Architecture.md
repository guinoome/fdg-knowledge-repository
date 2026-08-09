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
