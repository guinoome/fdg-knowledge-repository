# FBPOIS-ROAD-0001 — Requirement Traceability and Dashboard Acceptance
**FPJIS project:** [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/FBPOIS_Local_First_Project_Registration|FPJIS-FBPOIS-LOCAL-001]]
**Status:** Requirement baseline; runtime evidence not yet supplied.
| Requirement | Owner | Blueprint | Acceptance tests | Evidence state |
|---|---|---|---|---|
| FBPOIS-REQ-001 offline WO | FMIS | FMIS-BUILD-0001 | FMM-001..010 | Pending |
| FBPOIS-REQ-002 PM | FMIS | FMIS-BUILD-0001 | FMM-2 checklist/findings | Pending |
| FBPOIS-REQ-003 scoped dual-system managers | Roles | ROLE-0007 | DASH-004,005,009 | Pending |
| FBPOIS-REQ-004 AppSheet migration | DB | DB-0000 | import counts, rollback | Pending |
| FBPOIS-REQ-005 backup restore | Deployment | DEP-0000 | SEC-007 | Pending |
| FBPOIS-REQ-006 separate FWIS/FMIs ownership | API | API-0001 | API-004 | Pending |
| FBPOIS-REQ-007 fully local | Deployment | DEP-0000 | DASH-011, FMM-010 | Pending |
| FBPOIS-REQ-008 each role distinct dashboard | Roles | ROLE-0006/0007 | DASH-001..014 | Pending |
| FBPOIS-REQ-009 concern to turnover | FWIS | FWIS-BUILD-0001 | FWO-001..009 | Pending |
| FBPOIS-REQ-010 local security/privacy | Architecture | ARCH-0011 | SEC-001..010 | Pending |

## FPJIS readiness rules
G5 for a **bounded slice** only after every applicable requirement has user story, state machine, schema, authority, UI/error/empty state, migration impact, security review and acceptance tests. G6 requires explicit authorized build decision. G7 requires executable tests and operator evidence. Never infer readiness percentage from file count. Capture per-module blueprint readiness, implementation completion, validation completion and operational maturity separately.

## Agent handover
Read existing source files before editing; use prior agent audit/evidence ledger to avoid repeat scans. Preserve collaborators' code, maintain change log, list assumptions and open decisions. Implement a complete vertical slice, test offline, log evidence, and only then proceed. Repository is source of truth; Obsidian full-path wikilinks must resolve after physical folder migration.
