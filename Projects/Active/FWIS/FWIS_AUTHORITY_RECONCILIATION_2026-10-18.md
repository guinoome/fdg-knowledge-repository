# FWIS authority reconciliation — source-backed implementation gate
Date: 2026-10-18
Status: SOURCE REVIEWED / IMPLEMENTATION NOT YET VERIFIED
Companion: [[FBPOIS_ACCOUNT_AUTHORITY_EXTENSION_2026-10-18]]

## Inspected exact files on main
- `Projects/Active/FWIS/README.md`: claims config-driven role/SQL workflow authority, and explicitly notes unexecuted live PostgreSQL role tests.
- `Projects/Active/FWIS/src/config.js`: engineering roles technician (1), supervisor (2), duty-engineer (3), engineering-manager (4), chief-engineer (5), director (6). Roles and property data configuration-driven.
- `Projects/Active/FWIS/src/identity.js`: signed-in property membership switch; `current()` exposes exactly one `roleId` for active property. When unconfigured, falls back to local CONFIG.session.
- `Projects/Active/FWIS/supabase/schema.sql`: `property_members` primary key (user_id, property_id), one role_id per membership; records RLS membership-scoped and server-stamped author. Existing RLS and revision/immutability triggers must be preserved.

## Verified mismatch / risk
The inspected `schema.sql` file begins with membership-only authorization, whereas README documents later generated workflow-authority tables/triggers. Do not assume deployed DB state from README. Before migration, read the ENTIRE schema, `authority.sql`, generation script, `src/config.js` workflow matrices, tests, migrations, and target database catalog. Prove where workflow enforcement actually lives. Avoid running a destructive replacement or changing primary keys without a tested migration.

## REUSE / EXTEND decision
REUSE: existing property memberships, identity switch, config-driven engineering ladder, record envelope, RLS, immutable accepted turnovers, revision guards, generated workflow policy concept, test harnesses.
EXTEND: effective grants with multiple roles per property, time-bound delegated authorities, independent approval checks, contractor/reader scopes, active shift assignment.
MERGE only where duplicated definitions are found. No parallel auth system or competing policy source.

## Proposed additive contracts for coding agent review (NOT applied SQL)
- `role_grants`: grant_id UUID PK; user_id UUID; property_id TEXT; role_id TEXT; valid_from TIMESTAMPTZ; valid_until TIMESTAMPTZ nullable; granted_by UUID; revoked_at TIMESTAMPTZ nullable; grant_kind ENUM-like direct/delegated; delegation_id UUID nullable; unique/overlap policy explicit.
- `authority_delegations`: id UUID PK; property_id; grantor_id; grantee_id; role_id; approved_by; reason; start_at; end_at; revoked_at; created_at; approval evidence; constraints end_at > start_at, no self-grant, no unauthorized grantor, expiry evaluated against database time.
- `shift_assignments`: id; property_id; shift_start; shift_end; assigned_user; responsibility; status; accepted_by; acceptance_time; link to turnover and audit events.
- `authority_events`: append-only event id, actor, subject, property, event type, role/grant/delegation, timestamp, reason and correlation id. Secure read and export policy.
- Preserve existing `property_members` as compatibility boundary until data migration and rollback tested; do not assume it can simply be dropped. Existing UI expects one `roleId`; introduce explicit effective roles and active-role selection with backward-compatible fallback.
- Define per-action authorization, not blanket numeric seniority for contractor, auditor, executive viewer and administrator profiles. Keep engineering approval independence and author != approver.
- Signed-in membership load errors must never silently become privileged local-config authority. Verify state transitions, offline session revocation and stale cached grant handling.

## Mandatory acceptance / evidence
1. Inventory actual SQL authority and migration order; capture baseline hashes and catalog queries.
2. Design reversible additive migration, no data loss, with RLS and triggers enforcing grants and delegation. Test using ordinary authenticated users.
3. Validate multi-property and cross-tenant denial, multi-role effective grants, time windows, revocation, privilege escalation, independent approval, and contractor read limits.
4. Preserve local-only Stage 0 mode without falsely treating configured demo identities as production authentication.
5. Run existing smoke/role/module/intake/sync suites and new live PostgreSQL authorization tests; log commands, results and failures.
6. Complete actual FWIS Daily Operations workflow acceptance with qualified users and a generated daily report.

## Agent handover decision
NOT READY to claim 'complete working platform' from blueprints alone. Existing application has demonstrable source and historical test evidence, but role/delegation implementation, database policy reconciliation, live verification and pilot acceptance remain open. No production rollout authorized.
