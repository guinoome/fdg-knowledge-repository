# Supabase setup — Stage 1a

Until these steps are done, FWIS runs local-only. That is a supported mode, not a broken one: records are stored on the device and every screen works. Sync is additive.

---

## 1. Create the project

Create a Supabase project, then note two values from **Project Settings → API**:

- **Project URL** — `https://<ref>.supabase.co`
- **anon / publishable key**

The anon key is a client key and is meant to ship in the front end. It is not a secret. Row Level Security in `schema.sql` is what actually protects the data.

**Never put the `service_role` key in `config.js`.** It bypasses RLS entirely and would hand every tenant's records to anyone who opened dev tools.

## 2. Apply the schema

Paste `schema.sql` into the Supabase SQL editor and run it, or:

```bash
npx supabase link --project-ref <ref>
npx supabase db push
```

This creates `records` and `property_members`, the three workflow-authorization tables, the server-side stamping and guard triggers, and the RLS policies.

Then apply the generated authority seed, which fills those three tables:

```bash
node supabase/generate-authority.mjs      # only if config.js changed
# then paste supabase/authority.sql into the SQL editor, or:
npx supabase db push
```

`authority.sql` is **generated from `src/config.js`** and must not be hand-edited. It is the FBPOIS-ROLE-0004 matrix projected into rows the database can enforce; `verify/role-test.mjs` regenerates it and fails if the committed file and the configuration disagree. That check is what stops the interface and the database holding different opinions about who may accept a turnover — which is the failure this whole layer exists to prevent, so a hand-edit that made them agree by accident would still be a defect.

Applying `schema.sql` **without** `authority.sql` fails closed, not open: `record_workflows` is empty, so `guard_role_authority` refuses every write with `WF003`. A blank authority table is a system that permits nothing, never a system that permits everything.

## 3. Point the app at it

In `src/config.js`:

```js
supabase: {
  url: "https://<ref>.supabase.co",
  anonKey: "<anon key>"
}
```

An "Account" link and a sync chip appear in the top bar once this is set.

## 4. Create a user and grant membership

Create a user (Supabase **Authentication → Users**, or the sign-up flow). A new user belongs to no properties, so RLS will correctly show them nothing.

For development, grant the demo properties by running this while signed in as that user:

```sql
select public.dev_join_demo_properties();
```

For real use, insert membership rows directly — this is the multi-tenant boundary from FBPOIS-ROLE-0005:

```sql
insert into public.property_members (user_id, property_id, role_id)
values ('<auth.users.id>', 'prop-riverside', 'duty-engineer');
```

`role_id` is no longer decorative. It decides what the user may **do**, not only what they may see — see the authorization table below. Use a role id from `public.role_levels`: `technician`, `supervisor`, `duty-engineer`, `engineering-service-manager`, `engineering-manager`, `chief-engineer`, or `director`.

To put yourself at a specific tier while testing:

```sql
select public.dev_join_property('prop-riverside', 'chief-engineer');
```

`dev_join_demo_properties` and `dev_join_property` are development conveniences. Drop both before any real deployment — `dev_join_property` in particular lets a signed-in user choose their own seniority, and role assignment is an Administration workflow in FBPOIS-ROLE-0004, not something a user does to themselves.

---

## What the database enforces

The client is not trusted to police any of this.

| Rule | Mechanism | Source |
|---|---|---|
| A user sees only their properties' records | RLS via `is_member()` | FBPOIS-ROLE-0005 |
| `server_seq` and `updated_at` are server-assigned | `stamp_record` trigger | sync correctness |
| `created_by` / `updated_by` are server-assigned from `auth.uid()` | `stamp_record` trigger | authorship cannot be forged |
| `created_at` / `created_by` are never rewritten | `stamp_record` trigger | auditability |
| An update must carry a strictly greater revision | `guard_revision` trigger | optimistic concurrency |
| Accepted/Closed records are content-immutable | `guard_accepted_immutable` trigger | FWIS-SPEC-0003 Business Rules |
| No hard deletes — deletion is a tombstone | `records_no_delete` policy | deletions must sync |
| Raising a record needs the workflow's create level | `guard_role_authority` trigger | FBPOIS-ROLE-0004 |
| A status move needs the role the Approval Matrix assigns | `guard_role_authority` trigger | FBPOIS-ROLE-0004 §Approval Matrix |
| An author cannot approve their own submission | `guard_role_authority` trigger | FBPOIS-ROLE-0004 §Separation of Duties |
| An unmapped record type is refused outright | `guard_role_authority` trigger | FBPOIS-ROLE-0003 §Default Deny |
| One organisation-configuration record per property | `records_one_org_config_per_property` index | two would fight over the overlay |

Authorship is **assigned**, not validated. The RLS policies deliberately do not
test `created_by = auth.uid()`, because `push()` is an upsert and an
`INSERT ... ON CONFLICT DO UPDATE` applies the INSERT policy's `WITH CHECK` to
the proposed row even when the UPDATE path is taken. A policy demanding
`created_by = auth.uid()` therefore rejects every edit to a record somebody
else authored — which is precisely the handover the product exists to support.

### Error codes

The guards raise `WF001` (immutable after acceptance) and `WF002` (stale
revision) rather than the standard `42501` and `40001`. `42501` is also what
PostgreSQL raises for any RLS denial, so sharing it made the client report
"you are not a member of this property" as "this turnover is accepted, file an
amendment". `src/sync/client.js` reads these codes — change one, change both.

Measured against a live project by `verify/live-test.mjs`, the codes survive
PostgREST's error mapping intact:

| Condition | HTTP | `code` |
|---|---|---|
| Stale revision | 400 | `WF002` |
| Accepted/Closed content edit | 400 | `WF001` |
| RLS denial (not a member) | 403 | `42501` |
| Role below what the transition requires | 400 | `WF003` |
| Author barred by separation of duties | 400 | `WF004` |

`WF003` and `WF004` are separated for the same reason `WF001` was separated from `42501`. "You are not senior enough" and "you are senior enough but you wrote this one" have different remedies — the first needs a Chief Engineer, the second needs a *different* Chief Engineer — and a client that cannot tell them apart will offer the wrong one.

### Authorization, in one paragraph

Membership answers *which property*; `role_levels` and `workflow_authority` answer *which action*. FBPOIS-ROLE-0004 draws exactly this line: approval authority is not access permission. Seniority is inclusive — the guard tests `level >= min_level` — because ROLE-0004's hierarchy is an escalation ladder. A Chief Engineer who could not accept a turnover a Duty Engineer can accept would make FWIS-SPEC-0003's escalation branch unreachable, and that branch exists precisely so a Chief Engineer accepts what a peer should not.

Tiers above Chief Engineer are **not** enforced by this build. `director` carries `enforced = false` in `role_levels`; Organization Administrator and FDG Super Administrator have no row at all. That is scope, recorded, not an oversight.

## Sync model

Pull-then-push on start, on reconnect, and every 60s. Deliberately polling rather than realtime: a shift turnover is not a collaborative document, and websockets are where hand-rolling a client stops paying for itself.

Incremental pull uses `server_seq`, a monotonic sequence rather than a timestamp — tie-free and immune to clock skew between device and database.

### Conflict policy

Derived from FWIS-SPEC-0003's Business Rules, not invented:

- **Remote is Accepted or Closed** → the server always wins. The local edit cannot be applied; it is preserved on the record as `conflict.localData`, and the user is told to file an amendment.
- **Both sides advanced** → the server copy becomes the record and the local copy is kept alongside it. Nothing is silently discarded, because data integrity (priority 3) outranks simplicity (priority 5).
- **Only one side advanced** → applied without ceremony.

Conflicts surface as a banner on the turnover detail screen and a count in the sync chip.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
