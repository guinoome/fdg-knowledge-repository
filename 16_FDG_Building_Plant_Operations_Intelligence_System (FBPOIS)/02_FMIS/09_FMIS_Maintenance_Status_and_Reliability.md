# FMIS-0009 — Maintenance Status and Reliability

## Status Visibility

FMIS should show active maintenance, overdue work, equipment down, plants under maintenance, critical equipment risk, repeated failures, PM compliance, and maintenance backlog.

## Reliability Metrics

- MTBF — Mean Time Between Failures
- MTTR — Mean Time To Repair
- Failure frequency
- Repeat failure rate
- Maintenance cost by property/building/plant/asset/equipment/trade/type
- Plant availability

## Reliability Loop

```text
Maintenance History
↓
Failure Events
↓
Pattern Detection
↓
Repeat Failure Identification
↓
Reliability Analysis
↓
Engineering Decision
↓
Corrective / Preventive Action
```

FMIS must not optimize only for work-order closure or PM completion. The objective is equipment reliability, plant availability, maintenance effectiveness, operational continuity, and engineering decision quality.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document

---

## Work Management Reliability Extension — 2026-10-09

Maintenance reliability analysis should include not only asset failures but also work-management defects that repeatedly reduce execution quality.

Additional signals:
- emergency/break-in work;
- recurring planning defects;
- missing material/tool events;
- failed post-maintenance tests;
- reopened work orders;
- repeated work on the same failure mode;
- large estimate-vs-actual variance;
- access/operations denial;
- contractor delay;
- repeated kit shortages.

These should feed reliability and continuous-improvement reviews.

Related engineering model:
[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0000 - Maintenance and Reliability Intelligence Architecture|FEIS Maintenance & Reliability Intelligence]].
