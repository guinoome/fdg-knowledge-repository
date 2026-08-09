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
