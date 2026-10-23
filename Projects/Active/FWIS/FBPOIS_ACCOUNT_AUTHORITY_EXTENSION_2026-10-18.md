# FBPOIS / FWIS — Account, Authority and Shift Accountability Extension
Status: Founder-directed requirements; implementation pending verification
Date: 2026-10-18
Change policy: EXTEND existing architecture; preserve accepted specs, working behavior, tests and source-of-truth authority.
Canonical implementation reference: [[Projects/Active/FWIS/README]]
Related: FBPOIS 04_User_Roles, role matrix FBPOIS-ROLE-0004, FWIS Daily Operations, Shift Turnover, Dashboard, FSIS and FPJIS. Resolve exact canonical paths before editing them.

## Evidence baseline (read before building)
The existing `Projects/Active/FWIS/README.md` reports a working offline PWA, IndexedDB, optional Supabase sync, a config-driven role matrix, client explanations in `src/authz.js`, SQL authorization in `supabase/schema.sql`, generated `supabase/authority.sql`, and role/sync/smoke tests. Do not rebuild these.
Its documented gap is crucial: role-enforcement SQL had not been retested against live PostgreSQL after the change; local test simulations are not server-side proof. The README also explicitly says workflow delegation is not implemented. Its last recorded smoke suite had one web-font network-related failure. Reverify rather than assume production readiness.
The existing model distinguishes property membership from organization/platform administrators and preserves separation of duties for administrators. Preserve that distinction; do not collapse administrative reach into engineering seniority.

## Founder-approved scope
1. Multi-role, multi-facility authorization: one person, one identity, scoped memberships and active assignment context; enforce on backend, never only UI.
2. Acting OIC and time-limited delegation: explicit grantor, grantee, facility, role/permissions, reason, start/end, approval, revocation, audit; expiration checked server-side; no implicit self-delegation.
3. Shift-based responsibility and turnover: assigned duty coverage, overlap/handover, unresolved items carried forward, acceptance by a different authorized person, and exception escalation.
4. Explicit approval and escalation boundaries: per action, record state, severity, facility and authority; no universal 'manager can do everything'; fail closed.
5. Contractor/service-provider access: scoped to assigned jobs and attachments, time-bound; no browsing of unrelated plant, workforce or incident data; cannot approve own work.
6. Immutable, audit-ready activity history: record actor, active role/facility, delegation basis, event timestamp, origin/device, before/after or diff, evidence references; authorized export and retention controls.
7. Separate responsibility from authority: job title, shift assignment, dashboard visibility and approval rights are independent dimensions. Enforce separation of duties including administrators; an author cannot independently approve the same record where independent approval is required.

## Role profiles (not separate authentication systems)
- Engineering Technician — own assigned work and field evidence.
- Engineering Supervisor — team assignment, verification and escalation.
- Duty Engineer / Engineering Service Manager — shift command, incidents and turnover.
- Chief Engineer / Engineering Manager — facility command, risk and delegated approvals.
- Director of Engineering — optional portfolio visibility; existing implementation marks this role unenforced: do not silently enable.
- Engineering Administrator / Coordinator — schedules, records, reports; no automatic engineering approval.
- Contractor / Service Provider — external restricted work portal.
- Facility Management / Executive Viewer — scoped KPIs, normally read-only.
- Auditor / Compliance Reviewer — scoped read-only evidence, approvals and audit export.
- System Administrator — account, configuration and access administration, NOT automatic operational approval.
Preserve existing Organization Administrator and FDG Super Administrator as distinct administrative reach tiers; map proposed System Administrator profile to existing tier(s) only after reviewing current security policy. Never create a conflicting parallel ladder.

## Required permission model
Evaluate access using subject identity + active role grant + facility/property scope + object ownership/assignment + action + workflow state + risk/severity + delegation validity + separation-of-duties + offline policy. Default deny. A UI-hidden action is not a security boundary. Every denied operation must give a safe, actionable reason without leaking protected data.
Use a single policy definition or generated policy artifacts consistent with existing `src/config.js` → `supabase/authority.sql` flow; avoid divergent duplicated permission tables.

## Release 1 scope and exclusions
Foundation: account provisioning; scoped role grants; time-limited acting OIC; role-adaptive dashboards; duty roster/shift assignment; incident/concern capture; assignment; escalation; peer turnover acceptance; carried-forward open items; engineering head overview; traceable daily report; offline persistence and synchronization.
Do NOT expand into predictive analytics, broad enterprise integrations, generalized orchestration, or complex automations until a qualified operational pilot accepts the first workflow.
Maintain local-first/offline-capable, agent-neutral and provider-replaceable design.

## Acceptance tests (must be executed, not merely described)
A. User assigned Hotel + Mall can switch context, cannot read Casino without grant; cross-property API and sync requests denied.
B. Acting OIC grant works only in approved interval and scope; expired/revoked grant denied both online and after reconnect; overlapping or conflicting delegations handled explicitly.
C. Creator cannot approve own protected record, even with Chief Engineer/admin role; distinct qualified approver succeeds.
D. Contractor can submit evidence on assigned work but cannot enumerate unrelated records or self-approve.
E. Normal peer turnover accepted by separate authorized Duty Engineer; critical escalation requires designated higher authority; unfinished concerns persist to next shift.
F. Offline capture survives restart, reconnect reconciles conflicts without silent loss, and expired offline authority cannot finalize protected approval.
G. Audit history captures creation, update, assignment, delegation, denial, approval, revocation and export with actor/time/scope.
H. Role tests cover BOTH allow and deny; SQL/RLS live PostgreSQL tests run with normal browser-level credentials, not privileged service-role bypass.
I. Existing FWIS smoke, role, module, intake and sync suites remain green; known font-fetch failure addressed or explicitly isolated.
J. Qualified pilot users perform an end-to-end shift and approve actual report output; acceptance documented. No claim of production completion without evidence.

## Delivery sequence and decision gates
1. Reconcile this amendment with existing FBPOIS 04_User_Roles, current FWIS code/config, SQL, governance and dashboard specs. Record reuse/extension and any conflict; do not overwrite other collaborators.
2. Implement smallest account/permission/delegation slice; tests and server-side validation.
3. Add role-adaptive dashboards and 24/7 shift accountability, reusing existing FWIS screens/modules.
4. Complete end-to-end Daily Operations → Turnover → Engineering Head Review → Daily Report.
5. Run offline, security, multi-facility and real-user acceptance; document observed results and remaining gaps.
6. Only then consider broader integrations or advanced analytics.

## Status / handover
This file records approved requirements, not a released feature. Existing FWIS implementation has substantial functionality documented in its README, but no fresh tests were executed during this update. This amendment is on a review branch pending reconciliation with canonical specifications and governance. No production deployment or migration authorized.
