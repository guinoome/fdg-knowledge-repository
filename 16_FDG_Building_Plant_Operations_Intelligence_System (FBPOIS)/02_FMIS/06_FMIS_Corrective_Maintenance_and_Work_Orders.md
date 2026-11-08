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


---

## Engineering Evidence-to-Clearance Work-Order Contract — 2026-11-08

FMIS work orders participate in [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-E2C-0001 - Engineering Evidence-to-Clearance Product Definition and UX Contract|FDG Engineering Evidence-to-Clearance]]. FMIS remains the maintenance system of record; this extension does not create a parallel work-order or report database.

A work package shall retain the original concern/request, property and asset references, assignment, observed findings, diagnostic hypotheses (labelled as hypotheses), corrective actions, materials/resources where recorded, evidence references, test method, acceptance criterion, result, verifier, residual defect and approval/closure history.

The user-facing journey is guided and evidence-led. A technician records facts and submits; the Supervisor reviews completeness/workmanship and may return the exact deficiency; the Duty Engineer verifies technical findings and test results; the Engineering Manager / Chief Engineer decides exceptions or reserved matters under the approved authority matrix. Routine delegation is valid only when an approved facility policy explicitly grants it.

**Do not collapse these outcomes:**
- 'Work Complete' — assigned repair/work activity is reported finished;
- 'Verified' — required technical verification is recorded against its criterion;
- 'Closed' — the FMIS work-order record is closed by an authenticated actor through the approved workflow;
- 'Restriction Released' — a separate FWIS operational restriction/OOO/OOS action is released by its authorized actor.

FMIS completion or closure must not release FWIS OOO/OOS automatically. A failed or missing required test, unknown classification, disputed evidence, invalid delegation or stale offline approval prevents finalization and routes for review.

Terminal status changes must be actor-bound, property/asset-scoped, separation-of-duties checked and audited at the service/API boundary. Direct actorless status mutation is not an acceptable implementation. Current-main services.py still has actorless terminal-transition paths; see [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-E2C-0001 - Engineering Evidence-to-Clearance Product Definition and UX Contract|E2C-0001]] and [Issue #11](https://github.com/guinoome/fdg-knowledge-repository/issues/11). Draft PR #18 is a fail-closed safety correction, not a complete authorized closeout workflow.

KANNA is a UX benchmark only. For camera-first evidence, contextual photo grouping, send-back/resubmission and offline field patterns, cross-check [[19_FWAIS — FDG Workflow Automation Intelligence System/03_Industry_Intelligence/03_Global/KANNA_COMPETITIVE_WORKFLOW_UX_STUDY_2026-11-08|KANNA Competitive Workflow and Field UX Study]].
