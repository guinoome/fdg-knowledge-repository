# FMIS-0011 — User Roles and Access

## Mandatory Hierarchy

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

## Technician

Assigned maintenance work, PM execution, findings, materials used, evidence, completion updates.

## Supervisor

Team assignment, work review, PM control, work-order monitoring, escalation, verification.

## Duty Engineer / Engineering Service Manager

Shift-level maintenance control, plant/equipment status, priority decisions, escalation, coordination, operational impact.

## Engineering Manager

Access to both FWIS and FMIS. Management-level oversight of operations, maintenance, resources, backlog, PM, critical equipment, and engineering actions.

## Chief Engineer

Access to both FWIS and FMIS. Executive-level operational and maintenance oversight, critical risks, major work, plant condition, engineering decisions, and authorized consolidation.

## Director of Engineering

Optional. May consolidate multiple Chief Engineers/properties when explicitly authorized.

## Access Principle

Use role plus permission scope. Scope may define property, building, plant, data domain, create/read/update/approve/close/export/admin rights.

Do not assume that a title automatically grants unrestricted data access.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
