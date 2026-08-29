# FMIS-0002 — Functional Domain Model

```text
FMIS
├── Plant Status
├── Asset Management
├── Equipment Management
├── Maintenance Requests
├── Work Orders
├── Preventive Maintenance
├── Corrective Maintenance
├── Inspections
├── Testing
├── Failure History
├── Maintenance History
├── Materials
├── Spare Parts
├── Procurement Linkage
├── Workforce
├── Contractors
├── Maintenance Projects
├── Documents
├── Dashboards
├── KPIs
└── Reliability Intelligence
```

## Core Relationship

```text
Property → Building → Area/Room → Plant/System
→ Asset → Equipment → Maintenance Activity
```

Maintenance activity can reference personnel, contractors, materials, procurement, documents, and operational impact.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
