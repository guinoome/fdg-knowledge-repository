# FMIS-0006 — Corrective Maintenance and Work Orders

## Work Order Minimum Data

Work Order ID, external reference, source, category, priority, status, property, building, area, room, plant, asset, equipment, trade, description, report date, supervisor, technician, contractor, estimated/actual hours, materials, business impact, safety impact, findings, root cause, corrective action, testing, verification, completion, closure, attachments, timeline.

## Lifecycle

```text
Request → Triage → Priority → Assignment → Diagnosis
→ Repair → Testing → Verification → Closure
```

Possible statuses: New, Acknowledged, Assigned, In Progress, Waiting Material, Waiting Contractor, Waiting Access, Waiting Approval, Testing, Completed, Closed, Cancelled.

## Priority

Consider safety, life safety, critical equipment, revenue, guest/customer impact, operational dependency, regulatory impact, and downtime.

## Repeat Defects

Identify repeated work involving the same equipment, component, failure mode, location, or symptom. Repetition becomes reliability intelligence.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document

---

## Planning Backlog and Ready-to-Schedule Extension — 2026-10-09

The existing work-order lifecycle is extended with a separate planning/readiness axis.

Recommended readiness states include:

~~~text
Needs Triage
Awaiting Planning
In Planning
Waiting Material
Waiting Contractor
Waiting Engineering
Waiting Permit / Safety
Waiting Access / Operations
Waiting Approval
Ready to Schedule
Scheduled
Constraint Reopened
Execution Ready
Testing / Verification
Ready for Return to Service
~~~

Important:

**Priority answers how important the work is. Readiness answers whether it can be executed.**

A Critical work order may legitimately show:

~~~text
Priority: Critical
Readiness: Waiting Material
~~~

and must be escalated rather than falsely marked Ready.

Ready-to-Schedule requirements and work-package rules:
[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|FEIS-MNT-0001]].
