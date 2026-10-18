# FBPOIS — FMIS-first / FWIS-second Integration Contract
Status: CONTROLLED IMPLEMENTATION HANDOVER — not implemented, tested or production authorized
Date: 2026-10-18
Sources: [[00_Architecture/FBPOIS-ARCH-0000 - FBPOIS Master Architecture]], [[02_FMIS/00_FMIS_Master_Index]], [[02_FMIS/12_FMIS_FBPOIS_Architecture_Position]], [[02_FMIS/13_FMIS_Platform_and_Integration_Architecture]], [[03_Sharing_Data_Platform/03_Sharing_Data_Platform_Master_Index]], [[04_User_Roles/04_User_Roles_Master_Index]], [[04A_Workflow_Engine/04A_Workflow_Engine_Master_Index]], [[05_API/05_API_Master_Index]], [[06_Incremental_Release_and_Patch_Governance/FBPOIS-L1A-0001 - Concern-to-Clearance First Working Baseline]].
## Canonical priority (corrects prior FWIS-first handover)
1. FMIS FIRST: finish and validate maintenance asset/PM/work-order workflow using existing SQLite/Tkinter implementation and FMIS specs.
2. FWIS SECOND: retain existing working offline PWA and extend operations/turnover, authority and shared integration.
3. FBPOIS THIRD: combine both peer systems through shared identity, data and executive dashboard. Folder order 01_FWIS / 02_FMIS is NOT execution order.
Existing FWIS draft PR #9 is NOT authorization to reverse FMIS-first priority; its source-backed security findings remain valid for FWIS phase.
## Domain ownership and anti-duplication
| Domain | Owner | Shared contract | Never duplicate |
|---|---|---|---|
| Organization/property/building/location | Shared Data Platform | stable UUID, external legacy ID, version, source | independent FMIS/FWIS property masters |
| Plant/asset/equipment identity | Shared Data Platform canonical registry; FMIS steward | asset UUID, property ID, plant ID, equipment metadata, lifecycle | two asset registries |
| PM/work orders, maintenance history | FMIS | WO UUID, asset ID, linked concern IDs, status, evidence, timestamps | FWIS work-order engine |
| Shift, incident, concern, turnover, room operations | FWIS | concern UUID, location, asset/WO link, restriction state | FMIS concern ownership |
| Users, memberships, delegated authority | FBPOIS shared identity/authorization | user UUID, property-scoped role grants, validity, approval policy | two unrelated logins or authorization ladders |
| Evidence/audit/attachments | Shared platform service, domain-owned record references | attachment UUID, hash, classification, record owner, actor, timestamp | untracked file copies or duplicated audit log truth |
| Unified Chief Engineer dashboard | FBPOIS read model | sourced aggregates, freshness, drillthrough, permission scope | hardcoded demo KPIs or independent fake status |
## Data contracts
- Shared envelope: `id` UUID; `organization_id`; `property_id`; `entity_type`; `entity_id`; `revision`; `created_at`; `updated_at`; `created_by`; `source_system`; `correlation_id`; `deleted_at` nullable; immutable audit events. Local SQLite integer keys map to stable global UUIDs via migration mapping, never assume local IDs globally unique.
- Concern→WO linkage: FWIS concern owns operational status and restriction; FMIS WO owns maintenance status and verification. A completed WO cannot automatically clear FWIS OOO/OOS; an authorized independent verification/release is required.
- Event types: `concern.created`, `work_order.linked`, `work_order.status_changed`, `maintenance.verified`, `restriction.released`, `turnover.accepted`; idempotency key, source record ID, version and provenance required.
- Policy decision: authenticated principal + property grant + module action + object scope + workflow state + delegation expiry + independent approval checks. Default deny; backend and RLS enforce. Local offline actions queued and revalidated on sync. Admin does not inherit engineering signoff.
- Sync contract: outbox/inbox with durable queue, server sequence or cursor, optimistic revision, tombstone, conflict resolution with review required, retry/backoff and audit. Do not claim synchronous consistency while offline.
## Cross-module first usable scenario
1. Technician reports defective AHU or pump in FWIS concern or FMIS maintenance intake.
2. FMIS uses canonical asset ID, creates and assigns work order; technician captures checklist/readings/photos offline.
3. Supervisor reviews work evidence; authorized engineer verifies maintenance and return-to-service.
4. FWIS concern and OOO/OOS remain open until separate authorized operational clearance.
5. Chief Engineer sees consistent concern and work-order states in combined view and can drill into source evidence.
6. Report links original record IDs, approvers and timestamps; app survives restart, offline use and reconnection.
## Online deployment and future uploads
Local-first clients (Windows/Android/Web PWA or approved desktop adapters) → replaceable FDG API/sync adapter → PostgreSQL system of record + Supabase Auth/RLS/private Storage where selected. Vercel or equivalent may host the web frontend; it is not an authority or database. Support on-prem/private hosting later without changing domain contracts. Store attachment metadata and hash locally first, queue upload, use private per-property object paths and short-lived authorized download URLs, prevent cross-property access, handle retries and orphan cleanup. Never put service-role secrets in client code. Separate dev/staging/production, migrations, backups, restore drills, security review and explicit founder production approval.
## Acceptance matrix
| Gate | Evidence | Definition of done |
|---|---|---|
| I01 FMIS core | existing+new unit/UI tests, operational demo, qualified signoff | asset→PM/WO→evidence→verify→report works after restart |
| I02 identity | cross-property and delegated permission allow/deny, backend tests | one account and authority across both domains |
| I03 master data | legacy mapping, duplicate detection, two-way lookup | same plant/asset UUID in both modules |
| I04 event links | concern→WO→verification→restriction tests | no unauthorized auto-clear or conflicting statuses |
| I05 offline sync | two devices, conflict/restart, audit replay | no silent data loss, reviewable conflicts |
| I06 security | Postgres RLS with ordinary credentials, private Storage access denial, revoked delegation | no cross-tenant or unauthorized approvals |
| I07 combined dashboard | source IDs and freshness for every displayed metric | verified live data only; unknown stays unknown |
| I08 deployment | staging URL, backup/restore, rollback, CI logs | staging accepted; production separately authorized |
| I09 operational UAT | technician, supervisor, duty engineer, chief engineer signoff | realistic facility case passes end-to-end |
## Agent sequencing and evidence
Read canonical master index, FMIS contract, existing FMIS code and tests first. Do not implement FWIS extension as Release 1 ahead of FMIS. Then inspect FWIS source and its 2026-10-18 handovers; reconcile documented-vs-actual database authority, including unsafe dev membership helpers, before online launch. Make small PRs, record changed files, migrations, test logs and unresolved defects. Avoid redundant blueprints and new parallel services.
## Current status
Documentation committed only. No FMIS tests, cross-module runtime integration, live database tests, staging uploads or qualified-user acceptance performed in this review. These are mandatory future gates, not claimed successes.


## Delegated routine approval and management-by-exception (2026-10-18)
**Operational rule:** authorize and close routine PMs, minor concerns and low-risk corrective work at the lowest competent, assigned and permitted level. Do not escalate solely because a Chief Engineer, Engineering Manager or Director exists. Higher-level dashboards prioritize reliability analysis, systemic risk, expenditure, capacity and exception trends rather than routine manual approvals.

- Technician: perform assigned work, capture readings/checklists/photos and submit; no self-approval.
- Supervisor: verify evidence and approve ordinary PM completion, minor corrective work and minor concerns within assigned facility, asset scope and explicit authority.
- Duty Engineer / Engineering Service Manager: approve shift-level operational decisions, routine exceptions, concern resolution and operational clearance within authorized facility/shift scope; no automatic escalation of ordinary turnover.
- Chief Engineer / Engineering Manager: receive only threshold breaches, significant plant availability/safety/compliance issues, major repairs/costs, unresolved disputes and required statutory/technical sign-offs; monitor aggregate PM compliance and recurring failures.
- Director: strategic, portfolio and exceptional matters, not operational approval queues.
- Finance/procurement/safety statutory approvals remain separate where applicable. Approval must obey explicit permission, facility scope, delegation validity, separation of duties, and applicable regulatory or manufacturer requirements; job titles alone never grant authority.

**Escalation triggers:** safety-critical or life-safety findings; statutory or permit requirement; expense above delegated limit; prolonged OOO/OOS affecting operations; repeat failures; missing/failed evidence; unauthorized or conflicted approver; disputed disposition; missed SLA or unaccepted shift handover. Thresholds must be configurable and approved per facility; do not invent numerical limits.

**Shared workflow contract:** PM submitted → supervisor evidence review → approved/returned for correction; minor concern → supervisor or Duty Engineer disposition → verified closure; only triggered exceptions route upward. FMIS owns maintenance approval and evidence; FWIS owns operational concern/availability clearance. FMIS completion does not automatically close FWIS OOO/OOS.

**Acceptance tests / DoD:** (1) Supervisor approves compliant routine PM without Chief Engineer notification or approval; (2) Duty Engineer resolves an authorized minor concern without management approval; (3) out-of-scope facility, expired delegation and author-self-approval are rejected server-side; (4) safety-critical finding, statutory sign-off or over-limit cost escalates to the correct authority; (5) Chief Engineer sees aggregate compliance, exceptions and trends, not routine approval backlog; (6) offline decisions remain pending until authoritative sync/revalidation, and revoked permissions cannot silently finalize them; (7) qualified engineering users verify the scenarios, recorded evidence and usability. These tests are requirements, **not yet executed**.
