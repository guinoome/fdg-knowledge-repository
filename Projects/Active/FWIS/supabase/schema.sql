-- ============================================================================
-- FWIS — Stage 1a schema
-- ----------------------------------------------------------------------------
-- Multi-user, multi-device sync. Mirrors the client-side record envelope in
-- src/db.js so a record round-trips without translation.
--
-- Enforcement lives in the database, not the client: Row Level Security scopes
-- every row to the caller's property memberships (FBPOIS-ROLE-0005), and a
-- trigger makes accepted turnovers immutable (FWIS-SPEC-0003 Business Rules).
-- A client is not trusted to police either.
--
-- Apply with:  supabase db push      (or paste into the SQL editor)
-- ============================================================================

-- ---------------------------------------------------------------- extensions
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------- membership
-- Which properties a user may see. The multi-tenant boundary.
create table if not exists public.property_members (
  user_id     uuid not null references auth.users (id) on delete cascade,
  property_id text not null,
  role_id     text not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, property_id)
);

comment on table public.property_members is
  'Multi-tenant boundary per FBPOIS-ROLE-0005. A user sees only properties listed here.';

create index if not exists property_members_user_idx
  on public.property_members (user_id);

-- ------------------------------------------------------------------- records
-- Generic envelope: turnovers today, incidents and work orders later without
-- a migration. `data` holds the record body; the columns are what sync and
-- authorisation need to reason about.
create table if not exists public.records (
  id          uuid primary key,
  type        text not null,
  property_id text not null,
  status      text not null,
  data        jsonb not null,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid not null references auth.users (id),
  updated_by  uuid not null references auth.users (id),

  revision    integer not null default 1 check (revision > 0),
  deleted_at  timestamptz,

  -- Server-authoritative ordering. Clients pull `where server_seq > cursor`.
  -- A sequence rather than a timestamp: monotonic, tie-free, and immune to
  -- clock skew between the client and the database.
  server_seq  bigint not null
);

comment on column public.records.server_seq is
  'Monotonic server ordering for incremental pull. Never set by the client.';

create sequence if not exists public.records_server_seq_seq owned by public.records.server_seq;

create index if not exists records_seq_idx      on public.records (server_seq);
create index if not exists records_property_idx on public.records (property_id, type);
create index if not exists records_updated_idx  on public.records (updated_at desc);

-- ------------------------------------------------------- server-side stamping
-- server_seq and updated_at are assigned by the database on every write so a
-- misbehaving or clock-skewed client cannot corrupt pull ordering.
--
-- Authorship is assigned here too, rather than validated by an RLS check.
-- Two reasons, and the second is not optional:
--
--   1. Assignment is strictly stronger than validation. A client may send any
--      created_by/updated_by it likes; the database overwrites it with the
--      caller. There is no forgery to reject because there is no forgery.
--
--   2. An `INSERT ... ON CONFLICT DO UPDATE` evaluates the INSERT policy's
--      WITH CHECK against the *proposed* row even when the UPDATE path is
--      taken ("for all rows proposed for insertion, regardless of whether or
--      not they end up being inserted" — CREATE POLICY). client.js push() is
--      exactly such an upsert. So a policy demanding `created_by = auth.uid()`
--      rejects every edit to a record somebody else authored — which is the
--      entire shift-turnover handover: outgoing engineer writes, incoming
--      engineer acknowledges and accepts.
create or replace function public.stamp_record()
returns trigger
language plpgsql
as $$
begin
  new.server_seq := nextval('public.records_server_seq_seq');
  new.updated_at := now();
  -- coalesce so service_role and SQL-editor seeding (auth.uid() is null there)
  -- can still supply an author explicitly.
  new.updated_by := coalesce(auth.uid(), new.updated_by);
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, now());
    new.created_by := coalesce(auth.uid(), new.created_by);
  else
    new.created_at := old.created_at;   -- never rewritten
    new.created_by := old.created_by;
  end if;
  return new;
end;
$$;

drop trigger if exists records_stamp on public.records;
create trigger records_stamp
  before insert or update on public.records
  for each row execute function public.stamp_record();

-- ------------------------------------------------- optimistic concurrency
-- A push must carry a revision strictly greater than the stored one. Equal or
-- lower means the client wrote against a stale copy: reject so the client can
-- surface a conflict rather than silently clobbering another device.
create or replace function public.guard_revision()
returns trigger
language plpgsql
as $$
begin
  if new.revision <= old.revision then
    raise exception 'stale revision: incoming % is not newer than stored %',
      new.revision, old.revision
      using errcode = 'WF002';          -- see "Error codes" at the foot of this file
  end if;
  return new;
end;
$$;

drop trigger if exists records_guard_revision on public.records;
create trigger records_guard_revision
  before update on public.records
  for each row execute function public.guard_revision();

-- ------------------------------------------------------ acceptance immutability
-- FWIS-SPEC-0003 Business Rules: "Historical records shall never be modified
-- after acceptance. Corrections shall be recorded as amendments with audit
-- history." Once accepted, only a soft delete or a status move to Closed is
-- permitted; changing the body requires a new amendment record.
create or replace function public.guard_accepted_immutable()
returns trigger
language plpgsql
as $$
begin
  if old.status in ('Accepted', 'Closed') then
    if new.data is distinct from old.data then
      raise exception
        'record % is % and its content is immutable; file an amendment instead',
        old.id, old.status
        using errcode = 'WF001';        -- NOT 42501: see "Error codes" below
    end if;
    if new.status not in ('Accepted', 'Closed') and new.deleted_at is null then
      raise exception 'record % cannot leave % state', old.id, old.status
        using errcode = 'WF001';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists records_guard_accepted on public.records;
create trigger records_guard_accepted
  before update on public.records
  for each row execute function public.guard_accepted_immutable();

-- ==========================================================================
-- Row Level Security
-- ==========================================================================

alter table public.records          enable row level security;
alter table public.property_members enable row level security;

-- Membership is readable only by its owner.
drop policy if exists members_select_own on public.property_members;
create policy members_select_own
  on public.property_members for select
  using (user_id = auth.uid());

-- Helper: does the caller belong to this property?
create or replace function public.is_member(p_property text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.property_members m
    where m.user_id = auth.uid() and m.property_id = p_property
  );
$$;

drop policy if exists records_select_member on public.records;
create policy records_select_member
  on public.records for select
  using (public.is_member(property_id));

-- Membership is the whole test. Authorship is NOT checked here: stamp_record
-- assigns created_by/updated_by from auth.uid() on every write, so there is
-- nothing left to validate. Re-adding `created_by = auth.uid()` would also
-- break co-editing via the upsert path — see the note on stamp_record.
drop policy if exists records_insert_member on public.records;
create policy records_insert_member
  on public.records for insert
  with check (public.is_member(property_id));

-- A row cannot be moved to, or out of, a property the caller does not belong
-- to. USING tests the stored row, WITH CHECK the resulting one.
drop policy if exists records_update_member on public.records;
create policy records_update_member
  on public.records for update
  using (public.is_member(property_id))
  with check (public.is_member(property_id));

-- No hard deletes. Deletion is a tombstone (deleted_at) so it can sync.
drop policy if exists records_no_delete on public.records;
create policy records_no_delete
  on public.records for delete
  using (false);

-- ==========================================================================
-- Seed helper — development only.
-- Grants the signed-in user membership of the demo properties so a fresh
-- account can sync immediately. Remove or restrict before real deployment.
-- ==========================================================================
create or replace function public.dev_join_demo_properties()
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.property_members (user_id, property_id, role_id)
  values (auth.uid(), 'prop-riverside', 'duty-engineer'),
         (auth.uid(), 'prop-harbour',   'duty-engineer')
  on conflict (user_id, property_id) do nothing;
$$;

-- ==========================================================================
-- Error codes
-- --------------------------------------------------------------------------
-- The guards raise application-specific SQLSTATEs rather than borrowing
-- standard ones, because the standard ones are ambiguous at the client:
--
--   WF001  content is immutable after acceptance   (was 42501)
--   WF002  stale revision, optimistic-lock failure (was 40001)
--
-- 42501 insufficient_privilege is also what PostgreSQL raises for *any* Row
-- Level Security denial. Sharing it meant the client could not tell "this
-- turnover is accepted, file an amendment" from "you are not a member of this
-- property" — and it told the user the former in both cases. 40001 is
-- similarly what a genuine serialization failure raises under concurrency.
--
-- Class 'WF' is safe: the SQL standard reserves classes beginning 5-9 and I-Z
-- for implementation- and application-defined conditions.
--
-- PostgREST surfaces the SQLSTATE as `code` in its JSON error body, which is
-- what SupabaseError.isImmutable / isStaleRevision read in src/sync/client.js.
-- Change one and you must change the other.
-- ==========================================================================
