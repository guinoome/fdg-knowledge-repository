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

This creates `records` and `property_members`, the server-side stamping and guard triggers, and the RLS policies.

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

`dev_join_demo_properties` is a development convenience. Drop it before any real deployment.

---

## What the database enforces

The client is not trusted to police any of this.

| Rule | Mechanism | Source |
|---|---|---|
| A user sees only their properties' records | RLS via `is_member()` | FBPOIS-ROLE-0005 |
| `server_seq` and `updated_at` are server-assigned | `stamp_record` trigger | sync correctness |
| `created_at` / `created_by` are never rewritten | `stamp_record` trigger | auditability |
| An update must carry a strictly greater revision | `guard_revision` trigger | optimistic concurrency |
| Accepted/Closed records are content-immutable | `guard_accepted_immutable` trigger | FWIS-SPEC-0003 Business Rules |
| No hard deletes — deletion is a tombstone | `records_no_delete` policy | deletions must sync |

## Sync model

Pull-then-push on start, on reconnect, and every 60s. Deliberately polling rather than realtime: a shift turnover is not a collaborative document, and websockets are where hand-rolling a client stops paying for itself.

Incremental pull uses `server_seq`, a monotonic sequence rather than a timestamp — tie-free and immune to clock skew between device and database.

### Conflict policy

Derived from FWIS-SPEC-0003's Business Rules, not invented:

- **Remote is Accepted or Closed** → the server always wins. The local edit cannot be applied; it is preserved on the record as `conflict.localData`, and the user is told to file an amendment.
- **Both sides advanced** → the server copy becomes the record and the local copy is kept alongside it. Nothing is silently discarded, because data integrity (priority 3) outranks simplicity (priority 5).
- **Only one side advanced** → applied without ceremony.

Conflicts surface as a banner on the turnover detail screen and a count in the sync chip.
