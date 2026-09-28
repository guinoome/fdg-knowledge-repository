create table public.fdg_client_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default '' check (char_length(display_name) <= 120),
 created_at timestamptz not null default now()
);
alter table public.fdg_client_profiles enable row level security;
alter table public.fdg_client_profiles force row level security;
revoke all on public.fdg_client_profiles from anon, authenticated;
grant select, insert on public.fdg_client_profiles to authenticated;
grant update(display_name) on public.fdg_client_profiles to authenticated;
create function public.fdg_session_is_active() returns boolean
language sql stable security definer set search_path = ''
as $$
 select exists (
  select 1 from auth.sessions s join auth.users u on u.id=s.user_id
  where s.id = nullif(auth.jwt()->>'session_id','')::uuid
    and s.user_id = auth.uid() and u.email_confirmed_at is not null
    and s.created_at > now() - interval '12 hours'
    and (s.not_after is null or s.not_after > now())
 );
$$;
revoke all on function public.fdg_session_is_active() from public, anon;
grant execute on function public.fdg_session_is_active() to authenticated;
create policy client_read_own on public.fdg_client_profiles for select to authenticated
using (user_id=(select auth.uid()) and (select public.fdg_session_is_active()));
create policy client_insert_own on public.fdg_client_profiles for insert to authenticated
with check (user_id=(select auth.uid()) and (select public.fdg_session_is_active()));
create policy client_update_own on public.fdg_client_profiles for update to authenticated
using (user_id=(select auth.uid()) and (select public.fdg_session_is_active()))
with check (user_id=(select auth.uid()) and (select public.fdg_session_is_active()));

