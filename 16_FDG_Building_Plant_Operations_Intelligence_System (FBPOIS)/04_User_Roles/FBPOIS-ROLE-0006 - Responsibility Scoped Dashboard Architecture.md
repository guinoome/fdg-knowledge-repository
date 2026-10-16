# FBPOIS-ROLE-0006 — Responsibility-Scoped Dashboard Architecture
**Status:** Founder-approved principle; implementation contract pending UI and role acceptance tests
**Path:** `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/FBPOIS-ROLE-0006 - Responsibility Scoped Dashboard Architecture.md`
**FPJIS:** [[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/FBPOIS_Local_First_Project_Registration|FBPOIS local-first registration]]

## Rule
Every authenticated user receives a dashboard determined by **role + assigned scope + authorized responsibilities**, not a generic dashboard with buttons merely hidden. Scope includes tenant/organization, property, building, department, trade, plant, asset, team, shift, and assigned work as applicable. Roles are capabilities; organizational titles may be combined without duplicate identities.

## Dashboard profiles
| Role | Primary experience | Primary actions |
|---|---|---|
| Technician | My work, inspections, PM, equipment readings and evidence | Start, update, submit assigned tasks |
| Supervisor | Team queue, work distribution, overdue and pending verification | Assign within authority, review, escalate |
| Duty Engineer / Engineering Service Manager | Shift plant status, operational exceptions, concerns, handover and urgent maintenance coordination | Triage, dispatch, escalate, hand over |
| Engineering Manager | **Both FWIS and FMIS**, assigned department/property management | Review operations + maintenance, prioritize, allocate resources, approve as delegated |
| Chief Engineer | **Both FWIS and FMIS**, executive-level engineering command view | Risk/availability oversight, critical approvals, cross-team decisions |
| Director of Engineering (optional) | Multi-Chief-Engineer and multi-property aggregate | Portfolio oversight, policy/strategic decisions |
| Organization/System Administrator | Account, access, configuration, backups and diagnostics | Administer, audit; operational access only if separately granted |
| Auditor/Read-only (optional) | Authorized records and reports | View/export only within explicit scope |

## Dashboard composition contract
On login resolve: identity → active roles → current assignments/delegations → property/building/team/shift scope → permitted FWIS/FMIS domain → widgets/queues/actions → row-level data filters.
Default landing view = highest-priority actionable items within that user's scope. Provide task counts, exceptions, overdue items, and drill-downs, with accurate timestamps and data provenance. Show meaningful empty/error/offline states. User-customized layout cannot expand permissions.

## Cross-domain rule
FMIS and FWIS remain independent peer systems. Engineering Manager and Chief Engineer may access both through one management shell. Chief Engineer receives executive aggregation, Director optional. Technician, Supervisor and Duty Engineer access to each domain is determined by explicit functional assignment; do not automatically grant both systems simply from hierarchy.

## Security and isolation
Enforce scope at service/query layer for every read/write/export/report, not only frontend navigation. Test cross-property and cross-team denial, role change mid-session, delegated expiry, shared device logout, offline credential lockout, and data cached for prior users. Never leak other users' metrics via aggregate widgets, search, notification or exports. Audit access changes and approvals.

## Acceptance scenarios
1. Chiller technician sees only assigned chiller work/evidence; unrelated assets absent from search/export.
2. Supervisor sees own team's backlog and verification queue, not unrelated teams.
3. Duty Engineer sees assigned shift's critical operations and maintenance escalation.
4. Engineering Manager opens FWIS and FMIS management views in same session; both scoped.
5. Chief Engineer sees authorized consolidated FWIS+FMIS executive KPIs, with drill-down to evidence.
6. Optional Director sees explicitly assigned properties/Chief Engineers; no automatic global scope.
7. Administrator without operational role cannot silently view private operational records.
8. Role/scope revocation takes effect for new requests and cached data is protected.
9. Every dashboard operates locally without internet.
10. Different roles have different useful landing screens and actions, not cosmetic variations.

## FPJIS traceability
**Requirement:** FBPOIS-REQ-008
**Acceptance:** role-based landing/dashboard, authorization and scoped aggregate tests above.
**Status:** Blueprint specified; runtime validation pending.
