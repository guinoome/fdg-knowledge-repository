# FDG Maintenance Intelligence Systems (FMIS) — Master Index

**Parent:** `16_FDG_Building_Plant_Operations_Intelligence_System` (FBPOIS)  
**System:** FDG Maintenance Intelligence Systems (FMIS)

## Approved Position

```text
FBPOIS
├── FWIS — Facility Workspace Intelligence System
│   └── Operations
├── FMIS — FDG Maintenance Intelligence Systems
│   └── Maintenance / Plant Status
└── Shared Data Platform
```

FWIS and FMIS are separate peer intelligence systems. They are not modules of one another. Their common relationship is that both belong to FBPOIS, may use shared platform services, and may exchange selected information.

## FMIS Purpose

FMIS manages and provides intelligence for plant status, equipment, assets, preventive maintenance, corrective maintenance, work orders, maintenance history, failures, spare parts, materials, maintenance resources, contractors, maintenance performance, and reliability.

## Management Access

```text
Technician
    ↓
Supervisor
    ↓
Duty Engineer / Engineering Service Manager
    ↓
Engineering Manager
    ↓
Chief Engineer
```

Engineering Manager can access both FWIS and FMIS.

Chief Engineer can access both FWIS and FMIS and receives executive-level combined visibility.

Director of Engineering is optional. Where used, it may consolidate multiple Chief Engineers/properties according to permissions.

## Agent Reading Order

Read this index first, then FMIS-0001 through FMIS-0016, followed by the relevant FBPOIS/shared-platform documents.

## Core Rule

Do not convert FMIS into another AppSheet-like application and do not turn the current prototype directly into the production architecture. Reuse validated workflows and concepts while implementing the approved FBPOIS enterprise architecture.
