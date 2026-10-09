# FMIS-0005 — Preventive Maintenance

## PM Definition

A PM definition should contain PM ID, asset/equipment, task, frequency, trigger, criticality, skill/trade, estimated duration, required materials, spare parts, safety requirements, procedure/reference, and responsible role.

## PM Occurrence

Record scheduled date, personnel, start/end, status, findings, measurements, defects, recommendations, evidence, and linked work order.

## Workflow

```text
PM Plan → Schedule → Assign → Execute → Findings → Evaluate
                                      ├── Normal → Close
                                      └── Defect → Work Order
```

## Performance

Track PM due, completed, overdue, compliance, critical overdue, findings, and PM-generated work orders.

PM compliance must not be treated as the sole measure of maintenance quality.

## Existing Concept

Earlier engineering work includes PM examples for cooling tower fans, fire pump sets, chillers, elevators, emergency gensets, and STP blowers, with frequency, status, scheduling, completion, assignment, criticality, difficulty, and timeline concepts.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document

## Hotel PMS Coordination Extension — 2026-10-07

For guestrooms and hospitality areas, FMIS preventive-maintenance scheduling may consume bounded Hotel Property Management System (**H-PMS**) occupancy/availability context to identify practical maintenance windows.

Example:
```text
PM Due
+ Vacant / Departure / Arrival Window from H-PMS
→ Maintenance Window Recommendation
→ Operational Approval where required
→ FBPOIS/FMIS PM Execution
→ Technical Verification
→ H-PMS Room Readiness Update
```

H-PMS does not own PM completion, maintenance evidence or technical acceptance.

Detailed contract:
[[20_FPJIS_FDG_Project_Intelligence_System/34_Hospitality_Operations_and_Hotel_Management_Blueprints/25_Hotel_PMS_to_FBPOIS_Interface_Blueprint|Hotel PMS ↔ FBPOIS Interface Blueprint]].

---

## PM Readiness and Job Plan Extension — 2026-10-09

PM occurrence scheduling should consume an approved PM Definition / JobPlan and evaluate readiness before schedule commitment.

Applicable checks include:
- asset/access availability;
- required trade/competency;
- expected duration;
- required parts/consumables;
- tools/test instruments;
- permit/isolation;
- contractor/vendor service where applicable;
- post-maintenance test and evidence requirements.

PM compliance shall not be improved by scheduling PM work that is materially unready or by closing incomplete execution.

Execution feedback should propose updates to the reusable JobPlan while preserving approval/version history.

See:
[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|Maintenance Work Readiness Standard]].
