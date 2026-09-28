-- Creation timestamps are server-owned evidence, not client-supplied fields.
revoke insert on public.fdg_client_profiles from authenticated;
grant insert(user_id, display_name) on public.fdg_client_profiles to authenticated;
