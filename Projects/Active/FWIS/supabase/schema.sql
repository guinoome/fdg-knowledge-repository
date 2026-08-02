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
create or replace function public.stamp_record()
returns trigger
language plpgsql
as $$
begin
  new.server_seq := nextval('public.records_server_seq_seq');
  new.updated_at := now();
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, now());
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
      using errcode = '40001';          -- serialization_failure
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
        using errcode = '42501';        -- insufficient_privilege
    end if;
    if new.status not in ('Accepted', 'Closed') and new.deleted_at is null then
      raise exception 'record % cannot leave % state', old.id, old.status
        using errcode = '42501';
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

drop policy if exists records_insert_member on public.records;
create policy records_insert_member
  on public.records for insert
  with check (
    public.is_member(property_id)
    and created_by = auth.uid()
    and updated_by = auth.uid()
  );

-- A row cannot be moved to a property the caller does not belong to, and the
-- caller must stamp themselves as the last writer.
drop policy if exists records_update_member on public.records;
create policy records_update_member
  on public.records for update
  using (public.is_member(property_id))
  with check (public.is_member(property_id) and updated_by = auth.uid());

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
