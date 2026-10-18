# FWIS Release 1 — Coding-Agent Implementation Contract
Date: 2026-10-18
Status: SPECIFICATION READY FOR BOUNDED IMPLEMENTATION; NOT VALIDATED RELEASE
Owner: FBPOIS / FWIS; canonical application `Projects/Active/FWIS/`.
Read first: `README.md`, `../FWIS-Shift-Turnover-Prototype/CLAUDE.md`, `src/config.js`, `src/identity.js`, `src/sync/client.js`, `src/sync/engine.js`, `src/db.js`, `supabase/schema.sql`, `verify/*`, and two 2026-10-18 handovers.
Rule: REUSE/EXTEND. Do not start a new application or rewrite working FWIS modules. One independently working increment per PR.

## Source reconciliation: material findings
- `src/config.js`: six engineering role IDs; engineering-manager level 4, chief-engineer 5. Do not collapse them; Director level 6 is not a blanket operational approval.
- `src/identity.js`: one `roleId` per active property and membership switching. Existing Stage 0 config identity is for **local demo**, not proof of production identity.
- `supabase/schema.sql`: one `role_id` per `property_members (user_id,property_id)`; records RLS checks membership only; `stamp_record`, `guard_revision`, `guard_accepted_immutable` exist.
- **Critical documentation drift**: `README.md` refers to `supabase/authority.sql`, `supabase/generate-authority.mjs`, `src/authz.js` and database workflow-authority functions. The inspected main branch lacks at least `authority.sql` and `src/authz.js` at those exact paths, while the inspected schema has no role-workflow trigger. Treat documented role enforcement as unverified/absent until files and live DB are reconciled.
- **Critical security defect to close**: `dev_join_demo_properties()` is a SECURITY DEFINER development membership function in the schema. Remove/revoke from production API before any online launch. Inventory EXECUTE grants and RLS for all exposed functions.
- Historical README test counts are not current test evidence.

## Scope / exact implementation map
| ID | User requirement | Existing source to extend | Data contract | Enforcement | Test | Done when |
|---|---|---|---|---|---|---|
| R01 | One identity, multiple property roles | src/identity.js; src/sync/client.js; src/config.js | property_members compatibility + role_grants | DB RLS + server action checks | T01,T02 | Two roles in Hotel, separate Mall role, Casino denied |
| R02 | Time-bound Acting OIC | src/identity.js; src/config.js; supabase/schema.sql | authority_delegations, role_grants | DB clock and revocation; independent grant approval | T03,T04 | Grant active only within time window, revoke immediate online |
| R03 | Responsibility distinct from authority | src/config.js; workflow transitions; supabase/schema.sql | shift_assignments and action-specific policy | explicit permission/action; default deny | T05,T06 | Shift duty does not confer engineering approval |
| R04 | No self-approval | turnover/workflow source; schema.sql | actor, author, approver, event | DB trigger/function on protected transitions | T07 | Creator and admin cannot approve own protected record |
| R05 | Scoped contractor, viewer, auditor, coordinator | config role vocabulary, identity, module list | role_grants with profile and scope | row + action + assigned record | T08,T09 | Contractor sees only assigned work; viewer read-only |
| R06 | Shift handover, carry-forward | src/turnover.js; src/screens/; src/db.js | shift_assignments; existing record envelope | authorized peer accept; critical escalates | T10,T11 | Open concerns survive shift and show next shift |
| R07 | Immutable audit and reports | src/modules/model.js; src/logbook.js; src/screens/ | append-only authority_events and record transitions | DB-owned actor/time; restricted export | T12 | audit includes grant, revoke, approval and denied privileged action |
| R08 | Offline-safe operation | src/db.js; src/sync/engine.js; sw.js | queued operations with source and revision | approvals online revalidated; expired grants never finalized offline | T13,T14 | restart+reconnect no loss; stale grant refused |
| R09 | Role dashboard foundation | existing dashboard, src/identity.js | query projections, not duplicate operational tables | filtered API + RLS | T15 | each role sees authorized operational cards only |
| R10 | Daily operations report | src/screens/briefings and reports; src/logbook.js | dated facility/shift snapshot + provenance | report permissions + read restrictions | T16 | signed-off engineering report matches source records |
| R11 | Secure online deployment | sw.js, config, supabase/ and deployment config | env/public URL, storage bucket metadata | TLS, Auth, RLS, Storage policies, secrets separation | T17,T18 | preview verified, rollback available, production gated |

## Authorization contract
Principal = authenticated `auth.uid()`; role assignment = property-scoped grant; effective authority = union of active grants constrained by action, object, state, facility, shift and separation-of-duties. Delegation is NEVER blanket admin access. For every grant store who authorized it, why, when effective, when expires, and revocation. Use server time. A role profile is not itself a credential. Multiple property roles must not silently combine into a higher role. System admin has no automatic engineering approval.
Default deny on missing policy. Use narrow `SECURITY DEFINER` helpers only when necessary, in a non-exposed schema with fixed search_path, explicit grants and caller checks; never trust user-editable metadata. For online reads and writes use RLS on every exposed table; SELECT and UPDATE policies must be consistent. Every storage object must carry tenant/property ownership, with RLS for upload/read/delete.

## Compatibility and migration
1. Inventory actual deployed schema before altering anything. Record database project and environment, current migration history, policy/function grants, indexes, and `property_members` row count (no private row data in report).
2. Add new grants/delegations/shift/audit tables; do not destructively replace `property_members`. Provide backfill from existing membership and reversible transition plan.
3. Update read APIs to return `roles[]`, `activeRole`, `propertyId`, `delegationId`; retain old `roleId` adapter until all consumers migrated. No privilege fallback when membership load fails.
4. Enforce effective grant on the database, not only screens; reconcile any generated policy artifact with the source of truth.
5. Remove production exposure of demo membership function. Verify denial for unauthenticated and non-admin callers.
6. Provide explicit migration up/down, rollback trigger, backup/restore evidence, and performance indexes.

## Tests: expected outcomes
T01 allow assigned Hotel/Mall, deny Casino; T02 multiple roles and independent active role context; T03 allow valid delegated action, deny before/after expiry; T04 deny revoked and self-granted delegation; T05 shift responsibility without approval denied; T06 authorized independent manager approval allowed; T07 author/self-approval denied even as administrator; T08 contractor assigned work allowed, unrelated work denied; T09 executive/auditor read only, export audited; T10 normal peer turnover accepted by distinct engineer; T11 critical turnover requires elevated independent approval; T12 immutable audit chain and report provenance; T13 offline creation survives app restart; T14 reconnect conflict and revoked authority do not silently finalize; T15 dashboard never leaks other-property data; T16 daily report consistent with source records and qualified user signoff; T17 Supabase RLS/Storage/secret checks; T18 preview deployment, health check and rollback.
For T01–T18, record test filename, command, environment, expected, actual, PASS/FAIL, timestamp and commit. Test both allowed and denied paths. Run existing smoke/role/module/intake/sync suites as regression. Live Postgres RLS tests with non-privileged authenticated clients mandatory; fake-backend tests alone insufficient.

## Online upload/deployment architecture
Offline PWA (IndexedDB, service worker) → sync adapter → Supabase Auth/Postgres RLS/Storage, with optional replaceable backend later. Deploy static frontend to Vercel **or equivalent**; Vercel is hosting, not authority. Never upload confidential engineering records to public buckets. Storage objects must be keyed by tenant/property/record/attachment UUID; verify MIME, size, content, ownership and scan/quarantine policy before making accessible. Queue upload while offline; use idempotent retry, resumability policy, metadata sync and orphan cleanup. Signed URLs must be short-lived and authorized; no service_role in browser. Use separate dev/staging/production projects and credentials; protect previews. Database backups, retention, disaster recovery, and operational monitoring required before production.
Deploy gates: preview → test staging RLS and uploads → qualified user acceptance → founder approval for production → controlled release → observe/rollback. No automatic production push.

## Acceptance evidence template
- Release commit / deployment URL / environment:
- Test matrix T01–T18 (links to raw logs):
- Migration up/down and restore result:
- Security/RLS/Storage findings:
- Offline multi-device test evidence:
- Pilot site, qualified engineering reviewers, date and written signoff:
- Generated daily report and reconciled source record IDs:
- Known defects and severity:
- Founder production approval (explicit):
A coding agent MUST leave these fields unverified until evidence exists.

## Definition of done
An implementation slice is DONE only when code + migration + tests + docs + offline handling + negative authorization cases are verified in CI and staging. FWIS Release 1 is ACCEPTED only after T01–T18 pass, qualified operational reviewers sign off, and no critical/high security defect remains. Production LIVE requires separate explicit approval and observed rollout. 'Blueprint complete' does not mean 'product validated'.
