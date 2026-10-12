---
document_id: FBPOIS-L1A-0001
title: FDG Engineering Operations Concern-to-Clearance First Working Baseline
status: Baseline Definition - Build Authorization Separate
owner: FBPOIS
created: 2026-10-12
target_release: FBPOIS-L1A-R0.1.0
---

# FBPOIS-L1A-0001 — Engineering Operations: Concern-to-Clearance

## Objective

Make one reusable FBPOIS engineering-operations capability **exist and work first**.

Do not finish all FBPOIS before releasing this slice.

## Productized Capability

**FDG Engineering Operations — Concern-to-Clearance**

## Canonical Workflow

```text
LOCATION / ASSET
→ CONCERN
→ SEVERITY / PRIORITY
→ ASSIGNMENT
→ WORK
→ OOO / OOS / RESTRICTION when applicable
→ FINDING
→ CORRECTIVE ACTION
→ PHOTO / READING / CHECKLIST EVIDENCE
→ VERIFICATION
→ CLEARANCE / CLOSEOUT
→ MANAGEMENT ATTENTION + REPORT
```

## Reuse Existing FBPOIS Knowledge

Primary:
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0007 - Concerns Tracker|Concerns Tracker]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0008 - OOO & OOS Management|OOO/OOS Management]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0010 - Workflow Management|Workflow Management]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/FWIS-SPEC-0014 - Reports|Reports]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/06_FMIS_Corrective_Maintenance_and_Work_Orders|Corrective Maintenance & Work Orders]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/04_FMIS_Plant_and_Equipment_Model|Plant & Equipment Model]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04A_Workflow_Engine/FBPOIS-WF-0000 - Workflow Engine Architecture|Workflow Engine]]

The L1A release composes approved knowledge. It does not replace or rewrite these authorities.

## R0.1.0 Must Exist

Minimum working records:
- Property / Location
- optional Asset reference
- Concern
- Severity / Priority
- Assignee / Owner
- Work status
- Restriction / OOO / OOS when applicable
- Finding
- Corrective Action
- Evidence
- Verification
- Clearance / Closeout
- Attention item
- Management summary/report

## Minimum Concern Record

- concern_id
- property/location
- asset_id optional
- category
- observation/description
- severity
- priority
- reported_by
- reported_at
- owner/assignee
- status
- evidence_refs
- restriction_ref optional
- work_order_ref optional

## Minimum Work State

```text
New
→ Acknowledged
→ Assigned
→ In Progress
→ Work Complete
→ Verification Pending
→ Verified
→ Closed / Cleared
```

Exceptions may include:
- Waiting Access
- Waiting Parts
- Waiting Contractor
- Deferred
- Escalated
- Cancelled with reason
- Reopened

## Restriction Rule

Where the concern makes an asset/location unsuitable for normal operation:

```text
Concern
→ Restriction / OOO / OOS
→ Work
→ Verification
→ Clearance
→ Restriction Released
```

No restriction is cleared merely because the work status says `Work Complete`.

## Evidence

R0.1.0 supports:
- photo metadata/file reference;
- observation;
- reading;
- checklist result;
- note;
- before/after evidence;
- work completion evidence;
- verification evidence.

Missing evidence remains missing; do not fabricate completeness.

## Verification

Verification must identify:
- what was checked;
- acceptance criterion or reviewer basis;
- result;
- verifier;
- timestamp;
- evidence.

## Closeout

Closeout requires:
- work completed;
- applicable verification;
- applicable restriction cleared;
- unresolved residual issue exposed;
- owner/approver according to configured authority.

## Attention Center — Minimum

Surface:
- critical/high open concern;
- overdue concern;
- unassigned concern;
- restricted/OOO/OOS item;
- work complete but verification pending;
- verification failed;
- expected return overdue;
- reopened concern;
- repeated concern candidate.

## Minimum Management Output

One management report/summary should answer:
- what is open;
- what is critical;
- what is restricted;
- what is being worked;
- what awaits verification;
- what closed;
- recurring/reopened concerns;
- responsible owner;
- evidence status.

## Explicit Non-Scope R0.1.0

Do not require:
- full PM program;
- full reliability analytics;
- predictive maintenance;
- full spares/procurement;
- contractor portal;
- BIM/digital twin;
- utility analytics;
- advanced plant dashboards;
- complete multi-property enterprise reporting;
- Hotel Room Readiness;
- every FWIS/FM​IS specification.

These stay in architecture for later patches/releases.

## Local-First

First working baseline must function locally for its bounded scope.

Remote sync/integration must not be required to prove the workflow.

## Acceptance

R0.1.0 passes when a synthetic concern can execute:

```text
Create Concern
→ Classify
→ Assign
→ Apply Restriction if required
→ Execute Work
→ Add Evidence
→ Record Finding / Corrective Action
→ Verify
→ Clear Restriction
→ Close
→ Appear correctly in Attention / Report
```

with restart/persistence and an auditable timeline.

## Release Freeze

After acceptance:
- record exact commit;
- declare `FBPOIS-L1A-R0.1.0`;
- record known limitations;
- stop expanding the work package;
- pilot/use the baseline;
- enhancements become numbered patches.

## Next Capability

Hotel Room Readiness is not bundled into R0.1.0.

It becomes a later vertical extension after the Concern-to-Clearance baseline exists and is accepted.

Reference:
[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/26_Engineering_Operations_and_Hotel_Room_Readiness_First_Commercial_Slice|Engineering Operations + Hotel Room Readiness]].

## Patch Governance

All post-baseline enhancements follow:
[[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/06_Incremental_Release_and_Patch_Governance/FBPOIS-PATCH-0000 - Patch Register|FBPOIS Patch Register]]
and
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/16_Exist_First_Enhance_by_Traceable_Patches_Standard|Exist First, Enhance by Traceable Patches Standard]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)_Master_Index|FBPOIS]] → this baseline definition.
