-- FDG-only test billing. No operational entitlement, automatic debit or live payments.
create table public.fdg_billing_subscriptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 module_id text not null default 'fuel' check (module_id = 'fuel'),
 branch_name text not null check (length(btrim(branch_name)) between 1 and 80),
 branch_key text generated always as (lower(btrim(branch_name))) stored,
 monthly_centavos integer not null default 50000 check (monthly_centavos = 50000),
 trial_started_at timestamptz not null default now(),
 trial_ends_at timestamptz not null default (now() + interval '7 days'),
 renewals_enabled boolean not null default true,
 renewals_stopped_at timestamptz,
 livemode boolean not null default false check (livemode = false),
 unique(user_id, module_id, branch_key)
);
create table public.fdg_billing_invoices (
 id uuid primary key default gen_random_uuid(),
 subscription_id uuid not null references public.fdg_billing_subscriptions(id),
 user_id uuid not null references auth.users(id),
 period_index integer not null check (period_index >= 0),
 period_start timestamptz not null,
 period_end timestamptz not null check (period_end > period_start),
 amount_centavos integer not null check (amount_centavos = 50000),
 currency text not null default 'PHP' check (currency = 'PHP'),
 status text not null default 'open' check (status in ('open','paid')),
 livemode boolean not null default false check (livemode = false),
 created_at timestamptz not null default now(),
 paid_at timestamptz,
 unique(subscription_id, period_index)
);
create index fdg_invoices_user on public.fdg_billing_invoices(user_id);
create unique index fdg_one_open_invoice on public.fdg_billing_invoices(subscription_id) where status='open';
create table public.fdg_payment_attempts (
 id uuid primary key default gen_random_uuid(),
 invoice_id uuid not null unique references public.fdg_billing_invoices(id),
 state text not null default 'creating' check (state in ('creating','ready','review','paid')),
 checkout_id text unique,
 checkout_url text,
 created_at timestamptz not null default now()
);
create table public.fdg_payment_receipts (
 payment_id text primary key,
 attempt_id uuid not null unique references public.fdg_payment_attempts(id),
 invoice_id uuid not null unique references public.fdg_billing_invoices(id),
 checkout_id text not null unique,
 amount_centavos integer not null check (amount_centavos = 50000),
 currency text not null check (currency = 'PHP'),
 livemode boolean not null check (livemode = false),
 payload_sha256 text not null check (payload_sha256 ~ '^[a-f0-9]{64}$'),
 recorded_at timestamptz not null default now()
);
alter table public.fdg_billing_subscriptions enable row level security;
alter table public.fdg_billing_subscriptions force row level security;
alter table public.fdg_billing_invoices enable row level security;
alter table public.fdg_billing_invoices force row level security;
alter table public.fdg_payment_attempts enable row level security;
alter table public.fdg_payment_attempts force row level security;
alter table public.fdg_payment_receipts enable row level security;
alter table public.fdg_payment_receipts force row level security;
revoke all on public.fdg_billing_subscriptions,public.fdg_billing_invoices,public.fdg_payment_attempts,public.fdg_payment_receipts from anon,authenticated;
grant select on public.fdg_billing_subscriptions,public.fdg_billing_invoices to authenticated;
grant all on public.fdg_billing_subscriptions,public.fdg_billing_invoices,public.fdg_payment_attempts,public.fdg_payment_receipts to service_role;
create policy billing_subscriptions_own on public.fdg_billing_subscriptions for select to authenticated using(user_id=(select auth.uid()) and (select public.fdg_session_is_active()));
create policy billing_invoices_own on public.fdg_billing_invoices for select to authenticated using(user_id=(select auth.uid()) and (select public.fdg_session_is_active()));

create function public.fdg_test_start_subscription(p_branch_name text) returns public.fdg_billing_subscriptions
language plpgsql security definer set search_path='' as $$
declare result public.fdg_billing_subscriptions;
begin
 if not public.fdg_session_is_active() then raise exception 'Sign in again'; end if;
 if p_branch_name is null or length(btrim(p_branch_name)) not between 1 and 80 then raise exception 'Invalid branch name'; end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
 select * into result from public.fdg_billing_subscriptions where user_id=auth.uid() and module_id='fuel' and branch_key=lower(btrim(p_branch_name));
 if found then return result; end if;
 if (select count(*) from public.fdg_billing_subscriptions where user_id=auth.uid()) >= 20 then raise exception 'Branch limit reached'; end if;
 insert into public.fdg_billing_subscriptions(user_id,branch_name) values(auth.uid(),btrim(p_branch_name)) returning * into result;
 return result;
end; $$;
create function public.fdg_test_issue_invoice(p_subscription_id uuid) returns public.fdg_billing_invoices
language plpgsql security definer set search_path='' set timezone='UTC' as $$
declare s public.fdg_billing_subscriptions; result public.fdg_billing_invoices; n integer; starts timestamptz;
begin
 if not public.fdg_session_is_active() then raise exception 'Sign in again'; end if;
 select * into s from public.fdg_billing_subscriptions where id=p_subscription_id and user_id=auth.uid() for update;
 if not found then raise exception 'Subscription unavailable'; end if;
 select * into result from public.fdg_billing_invoices where subscription_id=s.id and status='open';
 if found then return result; end if;
 if not s.renewals_enabled then raise exception 'Renewals stopped'; end if;
 select coalesce(max(period_index)+1,0) into n from public.fdg_billing_invoices where subscription_id=s.id;
 starts := s.trial_ends_at + make_interval(months=>n);
 if starts>now() then raise exception 'No invoice due yet'; end if;
 insert into public.fdg_billing_invoices(subscription_id,user_id,period_index,period_start,period_end,amount_centavos)
 values(s.id,s.user_id,n,starts,s.trial_ends_at+make_interval(months=>n+1),s.monthly_centavos) returning * into result;
 return result;
end; $$;
create function public.fdg_test_stop_renewals(p_subscription_id uuid) returns void
language plpgsql security definer set search_path='' as $$
begin
 if not public.fdg_session_is_active() then raise exception 'Sign in again'; end if;
 update public.fdg_billing_subscriptions set renewals_enabled=false,renewals_stopped_at=coalesce(renewals_stopped_at,now()) where id=p_subscription_id and user_id=auth.uid();
 if not found then raise exception 'Subscription unavailable'; end if;
end; $$;

-- Server-only short transactions. Provider HTTP calls happen outside database locks.
create function public.fdg_test_claim_checkout(p_invoice_id uuid,p_user_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare i public.fdg_billing_invoices; a public.fdg_payment_attempts; fresh boolean:=false;
begin
 select * into i from public.fdg_billing_invoices where id=p_invoice_id and user_id=p_user_id for update;
 if not found or i.status<>'open' or i.livemode then raise exception 'Invoice unavailable'; end if;
 select * into a from public.fdg_payment_attempts where invoice_id=i.id;
 if not found then insert into public.fdg_payment_attempts(invoice_id) values(i.id) returning * into a; fresh:=true; end if;
 return jsonb_build_object('invoice',to_jsonb(i),'attempt',to_jsonb(a),'fresh',fresh);
end; $$;
create function public.fdg_test_save_checkout(p_attempt_id uuid,p_checkout_id text,p_checkout_url text) returns void
language plpgsql security definer set search_path='' as $$
declare a public.fdg_payment_attempts;
begin
 select * into a from public.fdg_payment_attempts where id=p_attempt_id for update;
 if not found or (a.checkout_id is not null and a.checkout_id<>p_checkout_id) then raise exception 'Checkout conflict'; end if;
 if p_checkout_id is null or p_checkout_url is null or p_checkout_id !~ '^cs_[A-Za-z0-9]+$' or p_checkout_url !~ '^https://checkout[.]paymongo[.]com/' then raise exception 'Invalid checkout'; end if;
 update public.fdg_payment_attempts set checkout_id=p_checkout_id,checkout_url=p_checkout_url,state=case when state='paid' then 'paid' else 'ready' end where id=a.id;
end; $$;
create function public.fdg_test_review_checkout(p_attempt_id uuid) returns void
language sql security definer set search_path='' as $$
 update public.fdg_payment_attempts set state='review' where id=p_attempt_id and state='creating';
$$;
create function public.fdg_test_settle_invoice(p_attempt_id uuid,p_invoice_id uuid,p_checkout_id text,p_payment_id text,p_amount integer,p_currency text,p_payload_sha256 text) returns text
language plpgsql security definer set search_path='' as $$
declare i public.fdg_billing_invoices; a public.fdg_payment_attempts; r public.fdg_payment_receipts;
begin
 select * into i from public.fdg_billing_invoices where id=p_invoice_id for update;
 if not found then raise exception 'Invoice unavailable'; end if;
 select * into a from public.fdg_payment_attempts where id=p_attempt_id and invoice_id=i.id for update;
 if not found or (a.checkout_id is not null and a.checkout_id<>p_checkout_id) then raise exception 'Checkout mismatch'; end if;
 if i.livemode or p_amount is distinct from i.amount_centavos or p_currency is distinct from i.currency or p_checkout_id is null or p_payment_id is null or p_checkout_id !~ '^cs_[A-Za-z0-9]+$' or p_payment_id !~ '^pay_[A-Za-z0-9]+$' then raise exception 'Payment mismatch'; end if;
 select * into r from public.fdg_payment_receipts where invoice_id=i.id;
 if found then
  if r.payment_id=p_payment_id and r.checkout_id=p_checkout_id then return 'duplicate'; end if;
  raise exception 'Payment conflict';
 end if;
 insert into public.fdg_payment_receipts(payment_id,attempt_id,invoice_id,checkout_id,amount_centavos,currency,livemode,payload_sha256)
 values(p_payment_id,a.id,i.id,p_checkout_id,p_amount,p_currency,false,p_payload_sha256);
 update public.fdg_payment_attempts set state='paid',checkout_id=p_checkout_id where id=a.id;
 update public.fdg_billing_invoices set status='paid',paid_at=now() where id=i.id;
 return 'paid';
end; $$;
revoke all on function public.fdg_test_start_subscription(text),public.fdg_test_issue_invoice(uuid),public.fdg_test_stop_renewals(uuid) from public,anon;
grant execute on function public.fdg_test_start_subscription(text),public.fdg_test_issue_invoice(uuid),public.fdg_test_stop_renewals(uuid) to authenticated;
revoke all on function public.fdg_test_claim_checkout(uuid,uuid),public.fdg_test_save_checkout(uuid,text,text),public.fdg_test_review_checkout(uuid),public.fdg_test_settle_invoice(uuid,uuid,text,text,integer,text,text) from public,anon,authenticated;
grant execute on function public.fdg_test_claim_checkout(uuid,uuid),public.fdg_test_save_checkout(uuid,text,text),public.fdg_test_review_checkout(uuid),public.fdg_test_settle_invoice(uuid,uuid,text,text,integer,text,text) to service_role;
