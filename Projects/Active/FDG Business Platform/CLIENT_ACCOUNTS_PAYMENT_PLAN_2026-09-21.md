# Client accounts and payments — decision plan, not implementation

> Status update 2026-09-27: the owner authorized a separate Free FDG Business Platform Supabase project. Identity/profile implementation has started and passed live-provider isolation tests; see [[HANDOVER_Real_Authentication_2026-09-27]]. Billing terms are now confirmed: PHP500 per module per branch monthly after seven days, manual payments, existing merchant account with isolated FDG configuration. Test-only billing code/database are implemented; provider configuration, end-to-end checkout proof and deployment remain pending. See [[HANDOVER_PayMongo_Test_Billing_2026-09-27]]. Operational membership/ledger integration remains roadmap. The original recommendation/decision language below is historical.

## Recommendation

Start FDG Business Platform in a separate Supabase project under the same organization, retaining one FDG account across its modules and branch-scoped memberships/subscriptions. Do not merge the Fuel ledger into ML Printing's production schema as a shortcut. Sharing a project is possible, but increases the impact of auth configuration changes, migrations, quota pressure and recovery operations. Separate projects cost more operational effort but provide clearer isolation. This is a recommendation awaiting owner selection, not an infrastructure change.

If one identity across ML Printing and FDG is essential, evaluate a shared identity architecture explicitly; separate projects do not automatically provide a shared login session. An alternative shared project must pass a grants/RLS/storage/API audit, use independent application schemas and server credentials, and preserve ML-DEP migrations. Schema separation alone is not authorization.

## Verified local evidence

Read-only inspection of `C:/codex-work/ml-dep-starlight/prisma/schema.prisma`: PostgreSQL through Prisma; application Profile IDs match Supabase `auth.users`; credentials belong to Supabase, not application tables.

`docs/paymongo-checkout.md` describes Hosted Checkout v2, signed callbacks, timestamp validation, server retrieval and amount/currency/order/session matching, and idempotent settlement. `CURRENT_HANDOVER.md` still marks automatic payment methods provider/credential-gated. This is implementation evidence, not proof of active merchant methods or production credentials. No environment secrets, provider configuration, ML-DEP records or code were changed.

## Five-layer rollout

1. Identity: invite owner, verified sign-in, recovery, session expiry and sign-out; no public onboarding until abuse controls and policy decisions are reviewed.
2. Authorization: organization → module → branch membership. Owner, manager and attendant privileges enforced server-side. Never use the current demo role selector as authentication. Test cross-tenant and cross-branch denials.
3. Operations: immutable meter IDs per dispenser/product; dated commissioning; approved ledger transactions; database uniqueness and revision checks. Offline drafts partitioned by user/organization/module/branch, cleared or locked on logout, with explicit conflict handling. No last-write-wins for totalizers. Import browser history only after evidence review and backup.
4. Billing: one account, independent module/branch entitlements. Seven-day trial and PHP500 starting quote retained, with billing cadence, taxes, refund policy and exact billable unit confirmed before checkout. Do not assume recurring billing capability from one-time Checkout support. Start test-mode hosted checkout; use a distinct FDG endpoint and signing secret, immutable invoice ID, amount/currency checks, replay protection and idempotent event storage. Browser success URLs never grant paid entitlement. Reuse reviewed patterns from ML-DEP, not its order IDs or webhook route.
5. Release and recovery: staging isolation tests; owner acceptance of a complete operating day; signed payment success/failure/duplicate/out-of-order tests; expired sessions and refunds; database restore rehearsal; scoped pilot before live activation. Record provider-enabled methods and live authorization explicitly.

## Required decision before implementation

Choose separate Supabase project (recommended) or shared project subject to isolation audit. Confirm whether shared ML Printing sign-in is a requirement, merchant ownership for FDG, invoice/subscription billing unit and cadence. No Supabase project, account, migration, PayMongo endpoint or charge was created in this milestone.

## Current official references checked 2026-09-21

- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security): exposed tables need RLS plus deliberate grants; test both allowed and denied operations. Server service-role access requires separate authorization checks.
- [Custom schemas](https://supabase.com/docs/guides/api/using-custom-schemas): API exposure and grants are explicit configuration, not automatic isolation.
- [PayMongo webhook concepts](https://docs.paymongo.com/docs/developer-tools-webhooks-key-concepts): signed event delivery; design callback verification before enabling paid access.
