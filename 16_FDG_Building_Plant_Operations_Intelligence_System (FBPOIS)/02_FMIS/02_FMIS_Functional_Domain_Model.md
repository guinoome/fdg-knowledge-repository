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
