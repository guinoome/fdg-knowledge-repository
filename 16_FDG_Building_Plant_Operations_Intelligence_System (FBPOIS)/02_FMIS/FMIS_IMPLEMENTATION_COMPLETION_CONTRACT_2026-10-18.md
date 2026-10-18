# FMIS — Implementation Completion Contract (FMIS FIRST)
Status: CODING-AGENT EXECUTION CONTRACT; not a validated production release
Date: 2026-10-18
Authority: [[00_FMIS_Master_Index]]; [[15_FMIS_Roadmap_and_Agent_Handover]]; [[FMIS-AGENT-ENGINEERING-INSTRUCTIONS]]; FBPOIS approved master architecture.
**Execution order: FMIS functional baseline FIRST → FWIS operational integration SECOND → FBPOIS unified experience THIRD.** Existing folder numbers are knowledge taxonomy, NOT build priority. Do not overwrite existing FWIS progress.
## Verified source baseline
- `implementation/fmis/services.py`: SQLite FMISService; tables include users, organizations, properties, buildings, areas, plants, assets, equipment; operations include authentication, plant/equipment history, work orders and PM.
- `implementation/app.py`: Tkinter desktop UI, dashboard, management, hierarchy, user management; demo login text includes `superadmin / password`, `chief / password`, `tech / password`. **Development-only credentials must be removed before any deployment.**
- `implementation/tests/test_fmis_core.py` and `test_fmis_ui.py`: tests exist; not executed in this review.
- `implementation/README.md`: Python stdlib plus optional reportlab/openpyxl for exports; offline-local prototype. Per canonical index, **do not turn prototype directly into production architecture**.
- FMIS-0015 phase plan and 2026-10-09 readiness overlay: preserve planning backlog, ready backlog, constraints, JobPlan/WorkPackage versions, material kitting, labor capacity, commitment/change history, break-in work, post-maintenance test and return-to-service; stage after minimum useful core unless necessary for safety.
## Requirements-to-source-to-evidence matrix
| ID | Required product behavior | Source to inspect/extend | Data contract | Authority | Acceptance test / DoD |
|---|---|---|---|---|---|
| M01 | One property→building→plant→equipment hierarchy | `implementation/fmis/services.py`, `app.py`; FMIS-0003/0004 | organization,property,building,area,plant,asset,equipment stable IDs | scoped read/write; admin not automatically engineer | hierarchy create/search/reopen; property leakage denied |
| M02 | Asset status and history | services.py; FMIS-0004/0009 | asset/equipment, status event, actor/time/source | technician update; supervisor review where required | every change retained; history survives restart |
| M03 | PM plan/schedule | services.py; FMIS-0005 | pm_plan, frequency, due, owner, checklist, evidence | planner/supervisor schedule; technician executes | due→assigned→completed with recorded readings/evidence |
| M04 | Corrective work order | services.py; FMIS-0006 | work_order, asset, priority, status, assignee, findings, actions | scoped assignment/transition | open→assign→execute→verify→close; negative permission tests |
| M05 | Readiness and safety constraints | FMIS-0015 overlay; services.py | constraint, waiting reason, jobplan version, ready flag | planner proposes, authorized approver releases | blocked work never appears Ready without cleared constraints |
| M06 | Evidence and independent verification | services.py, app.py; FMIS-0016 | attachments/metadata, checklist result, verifier, acceptance rule | author cannot self-approve protected closeout | missing evidence blocks closeout; independent acceptance succeeds |
| M07 | Local-first durability and reports | services.py; implementation README | SQLite transactional records, audit events, export manifest | scoped report/export | restart recovery; CSV/XLSX/PDF match source, no invented figures |
| M08 | Security and multi-facility identity | services.py, app.py; FMIS-0011; FBPOIS-ROLE-0000..0005 | shared identity ID + property role grants + delegations | central policy, default deny | ordinary operator cannot access another property; admin no engineering self-approval |
| M09 | Integration readiness | FMIS-0012/0013; FBPOIS SDP/API | immutable asset IDs; work order events; provenance; sync envelope | property RLS and event authorization | cross-module contract fixture roundtrips, no duplicate assets |
| M10 | Online upload/sync path | FMIS-0013; shared platform contracts | attachment id, hash, MIME, size, property, record id, local/remote state | private object policies, server validation | offline queue/retry/conflict, unauthorized downloads denied |
| M11 | Role-adaptive engineering dashboard | app.py; FMIS-0010 | live query projections of asset/PM/WO status | facility role scoped | Chief Engineer sees true counts and drilldown; unknown ≠ healthy |
| M12 | Operational pilot acceptance | FMIS-0015/0016 | release record, test logs, pilot evidence, signatures | independent qualified engineering reviewers | actual asset PM + corrective case accepted and recorded |
## Build sequence (one verified increment per coding session)
0. Snapshot and execute existing core/UI tests; inventory SQL schema, fixtures, demo credentials and export functions. Record PASS/FAIL and source commit.
1. Fix blocking auth/data-integrity defects; remove default credentials from distributable builds; keep local development fixtures isolated.
2. Finish end-to-end asset→PM→WO→evidence→verification→report on existing local service, including real operator role permissions and restart persistence.
3. Complete readiness, safe return-to-service and approval controls; do not require full procurement or predictive analytics.
4. Introduce a shared identity adapter and stable property/asset IDs for future FBPOIS integration, WITHOUT building another identity service or destructively migrating existing SQLite data.
5. Prove offline multi-user conflict behavior and controlled Supabase/PostgreSQL/Storage adapter in staging when applicable. No silent data overwrite.
6. Pilot with Technician, Supervisor and Chief Engineer using actual engineering scenarios; retain signoff and corrections.
## Test evidence minimum
- Core/UI unit tests, permission allow/deny, cross-property access, PM scheduling boundary dates, stale revision conflict, missing evidence, self-approval denial, restore from backup, file export reconciliation, unauthorized attachment read, offline restart, migration rollback.
- Each test: case ID, expected, actual, commit, command, environment, PASS/FAIL, artifacts.
- No claim of passed tests from reading test source. No production approval inferred.
## Agent handover instructions
READ canonical FMIS index and all FMIS-0001..0016 first; preserve peer boundary with FWIS. Extend `implementation/` only where safe. Keep accepted source and tests, avoid speculative framework rewrite. For each change state REUSE/EXTEND/MERGE/REPLACE rationale, affected files, migration, tests, risk, rollback and next working increment.
## Definition of done
FMIS functional baseline is DONE when asset/PM/WO/evidence/verification/report workflow is demonstrated after restart, security negative tests pass, exports reconcile and qualified engineering users sign off. Online staging integration is a separate gate; full FBPOIS is not declared complete when FMIS alone passes.
