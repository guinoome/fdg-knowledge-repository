# FBPOIS operational gap closure register — 2026-10-18

Status: PARTIAL IMPLEMENTATION. Not a production release. This is a source-backed reconciliation and execution register, not a claim of completed workflows.

## Inspected source
- `02_FMIS/implementation/fmis/services.py`: existing SQLite service and role-based `can_perform` model.
- `02_FMIS/implementation/tests/test_fmis_core.py`: existing FMIS unit tests and seeded development credentials.
- `02_FMIS/FMIS_IMPLEMENTATION_COMPLETION_CONTRACT_2026-10-18.md`: M01–M12 scope.
- `00_Architecture/FBPOIS_FMIS_FIRST_INTEGRATION_CONTRACT_2026-10-18.md`: domain ownership, delegated routine approval and acceptance gates.
- `04_User_Roles/04_User_Roles_Master_Index.md`: canonical RBAC links.
- Earlier FWIS source-backed authority reconciliation remains relevant; do not replace FWIS or duplicate its roles.

## Implementation now present
- `02_FMIS/implementation/fmis/operational_policy.py`: pure, fail-closed policy decision helper. Denies cross-property, unassigned, self-approval, missing evidence, invalid/expired/revoked delegation and administrative-role signoff; routine PM/minor concerns at Supervisor/Duty Engineer; exceptions escalate; return-to-service requires independent test; offline decisions remain pending server revalidation.
- `02_FMIS/implementation/tests/test_operational_policy.py`: 17 unittest scenarios authored. **Not executed in this GitHub-only change**.
- **Important limitation:** helper is not wired into FMISService, FWIS API, PostgreSQL RLS or sync. These checks are NOT YET ENFORCED. The current helper models only a subset of delegated authority and does not independently authenticate grantor scope or validate financial thresholds. Do not treat it as an authorization service.

## Remaining gap register
| ID | Behavior / rule | Accountable engineering owner | Source to extend / contract | Authority | Automated acceptance | Human acceptance |
|---|---|---|---|---|---|---|
| G01 | Exception-only management attention, deduplication, snooze, SLA | Chief Engineer | FWIS alerts; FBPOIS read model; event id/severity/dedup key | Supervisor/DE routine; management exception | routine no executive alert; critical alerts once with escalation | Chief Engineer validates inbox |
| G02 | PM approval at lowest competent level | Maintenance Supervisor | FMIS services PM transitions; shared policy; evidence IDs | assigned Supervisor; independent author | approve routine without CE; reject self/cross-property | Supervisor signs PM sample |
| G03 | Minor concern/turnover closure | Duty Engineer | FWIS concern and turnover state; shift ID | assigned Supervisor/DE within shift | minor closes; unaccepted turnover remains open | Duty Engineer shift drill |
| G04 | Return-to-service separate from repair | Duty Engineer + authorized verifier | FMIS WO, test evidence; FWIS OOO/OOS restriction; linked IDs | independent verifier and operational release | WO done cannot auto-clear OOO/OOS | Chief Engineer verifies critical case |
| G05 | Facility/asset responsibility ownership | Engineering Manager | shared asset registry, grants, property ID | explicit asset/facility grant | cross-facility deny, shared asset mapping | Mall/Hotel/Casino scope review |
| G06 | PM meter-based or calendar schedule | Maintenance Planner | FMIS PM plan, meter events, due logic | planner sets, supervisor verifies | calendar boundary, meter rollover, missing readings | Supervisor reviews due list |
| G07 | Repeat failure correlation / RCA | Reliability Engineer | FMIS history, concern links, fault signatures | supervisor flags, CE analyzes | repeated fault creates trend, not duplicate WO | Chief Engineer confirms trend |
| G08 | Emergency work break-glass | Duty Engineer / Safety | workflow emergency flag, reason, time, audit | temporary bounded emergency authority | immediate action logged, retrospective review required | Duty Engineer drill |
| G09 | Workforce loading | Maintenance Supervisor | shift roster, assignments, labor capacity | supervisor reassigns within scope | overbooking flagged, no cross-property reassignment | Supervisor reviews schedule |
| G10 | Contractor acceptance | Engineering Supervisor | contractor work evidence, warranty, signoff | contractor submits; internal verifier approves | contractor cannot self-accept | Engineer witnesses sample |
| G11 | Stale offline status visibility | Engineering Service Manager | sync cursor, observed_at, received_at, freshness | client marks stale, server authoritative | stale cannot render as live normal | Duty Engineer offline test |
| G12 | Verified automatic reporting | Chief Engineer | FMIS exports, FWIS records, provenance | scoped reports; immutable evidence | figures reconcile with records; no manual duplicate input | CE accepts monthly report |
| G13 | Multi-role grants/delegations | Engineering Manager / IT security | FWIS membership/RLS and shared identity; grant expiry | per action, per facility, no admin inheritance | revoke/expire/cross-tenant denial in live DB | authorized user matrix signoff |
| G14 | Shift accountability and open work | Duty Engineer | FWIS turnover, restrictions, commitment links | outgoing proposes, incoming acknowledges | restart/shift handover retains open items | two-shift pilot |
| G15 | Critical/regulated financial escalation | Chief Engineer / Finance / Safety | approved thresholds, legal rules, asset criticality | explicit financial and statutory signatories | unknown threshold denies rather than guesses | policy owner signs threshold table |

## Execution and verification gates
1. FMIS FIRST: run existing tests, add scoped grant/asset IDs, wire helper into existing service transitions, protect writes at DB/API boundary, migrate safely, rerun tests.
2. Add persisted decision/audit events; prevent unauthorized direct SQL writes; test offline replay and expired/revoked grants.
3. Complete PM/WO/evidence/independent acceptance and export workflow with actual operators. Remove default distributable passwords.
4. FWIS SECOND: reconcile existing PostgreSQL RLS/authority generator, implement facility/shift/concern policy and alerts without duplicating FMIS work orders.
5. FBPOIS THIRD: shared identity/asset registry, concern↔WO↔restriction linkage, management-by-exception dashboards, source-backed report read models.
6. Each PR records owner, affected files, schema migration, API/data contract, negative permission tests, command/output, rollback and qualified human signoff. Never merge to production based on unit tests alone.

**Current test evidence:** none executed in this change; 17 test cases committed as source. No migrations, live RLS validation, operational UAT, staging deployment or production changes performed.
