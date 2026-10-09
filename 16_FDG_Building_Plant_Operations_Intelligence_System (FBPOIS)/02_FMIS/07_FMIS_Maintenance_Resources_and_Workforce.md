# FMIS-0007 — Maintenance Resources and Workforce

## Hierarchy

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

Director of Engineering is optional.

## Workforce Data

Employee ID, name, position, trade, supervisor, status, skill level, certification/expiry, workload, utilization, assignment history.

## Assignment Factors

Trade, skill, certification, availability, workload, equipment familiarity, location, priority.

## KPIs

Available manpower, workload, utilization, open assignments, overtime, certification risk, response time, completion time.

## Contractors

Track company, trade, scope, work order/project, schedule, progress, safety issues, cost, performance, documents, and completion.

Contractor delays must remain distinguishable from internal delays.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document

---

## Human Resources and Engineering Boundary — 2026-09-27

This document governs engineering maintenance workforce planning and operational assignment. It is not the enterprise HR operating model.

Engineering owns trade requirements, technical competence criteria, operational assignment, workload, equipment familiarity and technical performance.

Human Resources and People Operations owns recruitment and hiring process, employee master data, benefits, leave/attendance governance, compensation-administration workflow, performance-process governance, learning and development administration, employee relations and separation.

Engineering and HR reconcile through workforce planning, hiring requisitions, technical interviews/assessments, competency records, training needs and performance inputs.

See [[06_Organizational_Architecture/NEX-STD-125_ENTERPRISE_FUNCTION_AND_DEPARTMENT_STANDARD|Enterprise Function and Department Standard]].

---

## Planner, Scheduler and Capacity Extension — 2026-10-09

FMIS should distinguish the functions of planning and scheduling even when one person performs both roles.

Planning determines scope, method, labor/trade, duration, materials, tools, safety, access prerequisites and acceptance criteria.

Scheduling determines when ready work will be performed, by which crew, within which maintenance/operations window and available capacity.

Schedulable capacity should account for leave, training, meetings, planned administrative time and any reserved emergency capacity.

Required metrics include schedule load, Ready Backlog coverage by trade/crew, schedule compliance and break-in work.

Detailed rules:
[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|FEIS-MNT-0001]].
