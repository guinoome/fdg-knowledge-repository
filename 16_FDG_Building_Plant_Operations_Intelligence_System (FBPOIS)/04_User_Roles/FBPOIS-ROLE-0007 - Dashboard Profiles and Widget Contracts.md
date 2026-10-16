# FBPOIS-ROLE-0007 — Dashboard Profiles and Widget Contracts
**Status:** Build blueprint; validation pending
**Depends:** [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/04_User_Roles/FBPOIS-ROLE-0006 - Responsibility Scoped Dashboard Architecture|ROLE-0006]]
## Runtime contract
Resolve session identity → roles → assignments/delegations → tenant/property/building/trade/team/shift/asset scope → domain grants → dashboard profile → scoped widgets → permitted actions. No widget or aggregate may expose unauthorized records. Persist personal layout preferences separately from permission grants. Dashboard shows timestamp, source and stale/offline indicators. Each widget has: id, domain owner, query, scope predicate, refresh policy, navigation target, empty/error state, required permission, test ID.

## Distinct role landing experiences
| Profile | First-screen widgets | Primary navigation | Action authority |
|---|---|---|---|
| Technician | My assigned WO, due PM, plant inspection rounds, readings, evidence awaiting upload, returned/rejected submissions | My Tasks, Equipment, PM, Evidence, History | Start/pause/record/submit; no self-approval |
| Supervisor | Team queue, overdue work, unassigned tasks, QA verification, blocked material/contractor, team workload | Team, Approvals, Assets, PM, Escalations | Assign/review/return/verify within delegation |
| Duty Engineer / ESM | Shift critical plant, active incidents, OOO/OOS, concerns, urgent WO coordination, turnover exceptions | Shift Command, Operations, Plant, Concerns, Escalations | Shift triage, dispatch, escalate; only scoped approval |
| Engineering Manager | FWIS operations + FMIS maintenance summary, cross-team backlog, PM compliance, plant availability, staffing, risks, procurement delays | Management, Operations, Maintenance, Resources, Reports | Management decisions and delegated approvals |
| Chief Engineer | FWIS+FMIS executive risk/availability, critical plant, major incidents, deferred works, capital/repair decisions, trend and evidence | Executive Command, Operations, Maintenance, Decisions, Reports | Executive engineering decisions within assigned property scope |
| Director (optional) | Multi-Chief-Engineer portfolio KPIs, property comparisons, enterprise risks, resource/cost strategy | Portfolio, Properties, Engineering Heads, Reports | Assigned portfolio oversight; not automatically tenant-global |
| Admin | User access, local backup health, config changes, audit exceptions, storage, import health | Administration, Permissions, Backup, Diagnostics | Technical admin only; separate grant for operational records |
| Auditor/read-only | Authorized evidence, report status, audit trail and export queue | Evidence, Reports, Audit | No edits |

## State contracts
Every widget must implement loading, empty, success, stale, unauthorized and error states. For fully local deployment, refresh from authoritative local DB, never a mock feed. Scope filters apply to count, chart, search, export and notification alike.

## Drill-down flows
- Technician: My PM → checklist → observations/readings/photos → submit → Supervisor review.
- Supervisor: Verification queue → evidence comparison → accept or return with reason → audit.
- Duty Engineer: Shift alarm/concern → incident/OOO reference (FWIS) → maintenance WO link (FMIS) → shift turnover.
- Engineering Manager: Exception tile → filtered list → equipment/concern detail → delegated decision.
- Chief Engineer: Executive risk → affected systems and operational impact → linked evidence → decision record.
- Director: Portfolio indicator → assigned property → Chief Engineer summary; no cross-tenant leakage.
- Admin: Permission anomaly → scoped grant → reason → auditable change.

## Acceptance tests
DASH-001 through DASH-008 map respectively to rows above. DASH-009 denies cross-property aggregate leakage. DASH-010 checks revoked permissions and cached records. DASH-011 validates disconnected operation. DASH-012 checks role combination without duplicate user account. DASH-013 confirms dashboard counts match queryable source rows. DASH-014 confirms each role's first screen differs materially in tasks/actions, not just appearance.
