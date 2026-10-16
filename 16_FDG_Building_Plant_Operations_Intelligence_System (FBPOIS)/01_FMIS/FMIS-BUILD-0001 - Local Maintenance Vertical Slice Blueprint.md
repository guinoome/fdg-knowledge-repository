# FMIS-BUILD-0001 — Local Maintenance Vertical Slice Blueprint
**Status:** Bounded build specification; inspect existing prototype before coding
**Legacy source:** [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|FMIS Master Index (legacy location)]]
## Slice FMM-1: Equipment → Condition → WO → Verification
**Outcome:** Local technician executes and Supervisor verifies maintenance without AppSheet.
**Entities:** plant, equipment, status_event, work_order, wo_event, technician_assignment, observation, reading, evidence, approval, audit_event. Stable IDs and property scopes. Status event append-only.
**Work order:** New → Triaged → Assigned → In Progress → Waiting Material/Contractor/Access/Approval → Testing → Pending Verification → Closed. Reopen requires reason. Closure requires mandatory fields, authorized verifier and evidence policy.
**Screens:** Technician My Work/PM; Supervisor assignment/verification; Duty Engineer urgent equipment; Engineering Manager FMIS and FWIS management; Chief Engineer executive equipment risk. Profile details in ROLE-0007.
**Tests:** FMM-001 equipment CRUD/status history, 002 lifecycle transition rules, 003 no self-approval, 004 evidence validation, 005 local restart, 006 scoped authorization, 007 accurate dashboard counts, 008 PDF/Excel export, 009 backup/restore, 010 no internet dependency.
## Slice FMM-2: PM → Findings → WO
PM definition, frequency/trigger, due occurrence, technician checklist, before/after observations/readings/photos, defect finding, severity/action/due date, linked corrective WO, Supervisor review, preserved history. Use deterministic acceptance rules and source attribution, not fabricated AI findings.
## Slice FMM-3: Spares and contractors
Stock issue/reservation, reorder thresholds, PR/SRF/PO external references, vendor ETA, delay reasons, contractor evidence and closeout. External SCM connector deferred.
## Migration
AppSheet export inventory → mapping → dry run → reconciliation → parallel run → authorized cutover. Missing real source exports are blockers to parity certification.
