# LexitePH → FBPOIS Architecture Mapping

Parent system: [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)]]

Reference entity:
[[LexitePH — Master Index]]

## Capability mapping

| LexitePH capability | FBPOIS destination | FDG interpretation |
|---|---|---|
| CMMS | 02_FMIS | Maintenance operations |
| Asset management | 00_Architecture + 02_FMIS | Asset lifecycle |
| Preventive maintenance | 02_FMIS | Planned maintenance |
| Work orders | 02_FMIS | Work execution |
| Parts/inventory | 02_FMIS + FBIS interface | Maintenance materials |
| Procurement | FBIS ↔ FBPOIS | Business/operations boundary |
| MES | 01_FWIS | Industrial operations |
| SCADA | 01_FWIS | Physical data acquisition |
| IoT | 01_FWIS | Telemetry |
| Smart building | 01_FWIS | Facility operations |
| Smart factory | 01_FWIS | Industrial operations |
| Audit | 00_Architecture / governance | Traceability |
| AI assistant | FBPOIS → FDG CORE | Operational assistance vs engineering intelligence |

## Boundary decision

Event Management is deliberately excluded from FBPOIS.

Reference destination:
[[ML Digital Event Platform]]

The current canonical repository path for that project was not verified during this audit, so a reservation note is provided separately.

## Architecture lesson

FBPOIS should be capability-oriented rather than vendor-product-oriented.
