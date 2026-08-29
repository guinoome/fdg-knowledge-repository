# FMIS-0012 — FMIS Position Within FBPOIS

## Approved Architecture

```text
FDG ECOSYSTEM
└── 16_FDG_Building_Plant_Operations_Intelligence_System
    ├── FWIS — Operations
    ├── FMIS — Maintenance / Plant Status
    └── Shared Data Platform
```

FWIS and FMIS are peers.

Incorrect:

```text
FWIS → FMIS
FMIS → FWIS
```

Correct:

```text
FBPOIS
├── FWIS
└── FMIS
```

## Unified Dashboard

```text
FWIS ──┐
       ├── Management / Executive View
FMIS ──┘
```

The dashboard is a view/integration layer. It does not erase domain ownership.

## Example

FWIS may record an operational concern such as poor lobby cooling.

FMIS may create and manage the related AHU diagnosis and maintenance work.

FWIS remains owner of the operational concern/status.

FMIS remains owner of the maintenance record/history.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
