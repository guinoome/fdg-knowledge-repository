# FMIS-0010 — Dashboard and KPI Model

## FMIS Dashboard

The FMIS dashboard answers:

> What maintenance and plant conditions require engineering attention now?

## Dashboard Areas

### Plant
Status, availability, degraded plants, plants under maintenance, failures.

### Equipment
Critical equipment, failed equipment, equipment under maintenance, repeat failures.

### Work Orders
Open, emergency, critical, overdue, aging, waiting material, waiting contractor, waiting approval.

### PM
Due, completed, overdue, compliance, critical overdue, findings.

### Resources
Manpower, workload, utilization, contractor workload.

### Materials
Critical shortages, out of stock, reorder required, procurement delays.

## Management Dashboard

Engineering Manager and Chief Engineer can view both:

```text
FWIS — Operations
        +
FMIS — Maintenance / Plant Status
```

This is a unified management view, not a functional merge.

## Chief Engineer

Chief Engineer receives executive-level FWIS + FMIS visibility and authorized consolidated views.

## Multi-Chief-Engineer

The architecture can consolidate multiple Chief Engineers/properties where authorized. Consolidation never overrides permission scope.

## Daily Snapshot

The established engineering workflow includes a daily snapshot around 07:45. FMIS contributes critical maintenance, plant/equipment status, PM condition, major work orders, OOO/OOS maintenance impact, material/procurement risks, contractor delays, and priority actions.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
