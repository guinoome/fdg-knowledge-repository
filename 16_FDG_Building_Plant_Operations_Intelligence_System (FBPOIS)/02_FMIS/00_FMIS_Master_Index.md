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

## Files

In reading order. Added 2026-08-10 so this folder is traversable from the knowledge graph — the reading order above names the documents but does not link them, which left FMIS the one FBPOIS subfolder unreachable by following links.

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/01_FMIS_System_Definition_and_Scope|FMIS-0001 – System Definition and Scope]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/02_FMIS_Functional_Domain_Model|FMIS-0002 – Functional Domain Model]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/03_FMIS_Data_Architecture|FMIS-0003 – Data Architecture]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/04_FMIS_Plant_and_Equipment_Model|FMIS-0004 – Plant and Equipment Model]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/05_FMIS_Preventive_Maintenance|FMIS-0005 – Preventive Maintenance]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|FMIS-0006 – Corrective Maintenance and Work Orders]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/07_FMIS_Maintenance_Resources_and_Workforce|FMIS-0007 – Maintenance Resources and Workforce]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/08_FMIS_Materials_Spares_and_Procurement|FMIS-0008 – Materials, Spares and Procurement]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/09_FMIS_Maintenance_Status_and_Reliability|FMIS-0009 – Maintenance Status and Reliability]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/10_FMIS_Dashboard_and_KPI_Model|FMIS-0010 – Dashboard and KPI Model]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/11_FMIS_User_Roles_and_Access|FMIS-0011 – User Roles and Access]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/12_FMIS_FBPOIS_Architecture_Position|FMIS-0012 – FBPOIS Architecture Position]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/13_FMIS_Platform_and_Integration_Architecture|FMIS-0013 – Platform and Integration Architecture]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/14_FMIS_Configuration_and_Extensibility|FMIS-0014 – Configuration and Extensibility]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/15_FMIS_Roadmap_and_Agent_Handover|FMIS-0015 – Roadmap and Agent Handover]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/16_FMIS_Evidence_and_Decision_Register|FMIS-0016 – Evidence and Decision Register]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/FMIS-AGENT-ENGINEERING-INSTRUCTIONS|FMIS Agent Engineering Instructions]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/README|README]]

The `implementation/` subfolder holds the canonical FMIS application — Python, Tkinter and SQLite, per decision D-2026-08-10-02. It is code rather than knowledge, so it is named here in plain text rather than linked.

## Core Rule

Do not convert FMIS into another AppSheet-like application and do not turn the current prototype directly into the production architecture. Reuse validated workflows and concepts while implementing the approved FBPOIS enterprise architecture.
