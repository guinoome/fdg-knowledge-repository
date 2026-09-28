# Real authentication — 2026-09-27 handover

2026-09-28 update: account UI is now deployed. See [[HANDOVER_Signup_Feedback_2026-09-28]] for verified email-rate-limit failures and published password visibility controls. Historical "not deployed" statements below are superseded; the dedicated SMTP/end-to-end email onboarding gate remains open.

## Status and scope

Implemented locally and tested with the live isolated Supabase project. **Not yet deployed, pushed, or ready for public client onboarding.** Confirmation email and end-to-end password recovery are unverified because no custom SMTP provider is configured. Do not infer completion from a password login test or recovery-form navigation.

The user authorized real login/logout/recovery/session expiry/account isolation, separate project under Lourd's Org, Free first and cost confirmation, with ML Printing and payments untouched. This milestone protects identity and a private client profile. It does **not** turn the local Fuel/demo ledger or demo role selector into a secure cloud workspace.

## Provider state

- Organization: Lourd's Org (`rcbigwknulkkxzklenqs`), Free.
- Project: FDG Business Platform (`nyrvzzuunnkdgsbbbjvo`), Singapore `ap-southeast-1`. Provider quoted and confirmed $0/month before creation. No paid plan/add-on enabled.
- `account/config.js` contains the public project URL and publishable browser key only. No service-role/admin secret is shipped.
- Two migrations applied: `fdg_client_accounts` and `profile_timestamp_ownership`; canonical SQL is in `supabase/migrations/`.
- User signed into the Supabase dashboard through GitHub. This is provider-admin login, **not** GitHub OAuth for FDG clients and **not** an outbound-email service.
- Site URL and the single exact allowed callback saved as `https://fdgbusinessplatforms.vercel.app/account/`. No wildcard or localhost callbacks added.
- Email confirmation remains enabled; anonymous sign-in/manual identity linking remain disabled. Minimum password length raised to 12; secure password change enabled. No existing client password changed.
- Custom SMTP is disabled. Need approved provider/sender and user-controlled credentials entry. Do not reuse ML Printing credentials or disable confirmation to bypass delivery.

## Architecture / five-layer decision tree

1. Identity: official pinned Supabase JS SDK, email/password, confirmed email, PKCE recovery callback; no hand-rolled password database in the application.
2. Authorization: RLS + deliberate column grants on `fdg_client_profiles`. Only the current verified user can read/insert/update their own display name. User ID and timestamps cannot be updated by clients; creation timestamps are server-owned. No client role/organization assignment.
3. Session lifecycle: JWT session ID must match a live `auth.sessions` row for the same confirmed user. Profile access expires after 12 hours, even if a provider JWT remains valid. Global logout revokes sessions; the session gate blocks stale JWT access. UI revalidates on visibility/pageshow/online and every 60 seconds while visible. This is a profile-access lifetime, not a claim that Supabase's separate paid session settings are enabled.
4. Browser privacy: session tokens in sessionStorage, only the PKCE verifier in localStorage so email can open another tab in the same browser profile. Private content clears on offline/pagehide/hidden/logout. Account/API/cross-origin requests bypass the hub service worker. Vercel account route has no-store and restrictive CSP configuration; deployed headers are not yet verified.
5. Release: SMTP and real email round-trip first, then controlled production deploy, live headers/auth QA, scoped Git commit/mirror push. Operational memberships and tenant/branch-ledger RLS are the next distinct milestone; owner real-day/OCR gates still apply.

## Changes

- `account/`: accessible mobile/desktop translucent utility auth screen, login/signup/recovery/password update/private profile/logout, source and generated bundle.
- `scripts/build-auth.mjs`: pinned esbuild produces an offline-hosted ESM SDK bundle (~228 KB, uncompressed). No runtime CDN dependency.
- `src/app.js`, `src/views.js`, Fuel top controls: route client login separately and label demo boundaries honestly.
- `sw.js` hub version 11 and Fuel `sw.js` version 20; `vercel.json` private route headers; `.vercelignore` excludes migrations/node_modules.
- `tests/auth-contract.mjs`: local configuration/RLS/cache/CSP contract test in `npm test`; opt-in `tests/auth-live.mjs` and `tests/auth-expiry-live.mjs` require private disposable fixtures and are not run automatically in normal CI.
- Existing ecosystem hero preserved. The auth utility surface uses dark transparent glass, visible background, readable labels, keyboard focus, empty/error states and mobile wrapping; no decorative animation added to authentication.

## Evidence / validation

- Existing hub + Fuel suites and syntax checks passed. New auth contract test passed. `npm audit --omit=dev`: zero vulnerabilities at this check.
- Actual Supabase password login with two disposable QA identities; wrong password denied.
- Provider rejected a password shorter than 12 characters. QA users were seeded explicitly as disposable confirmed identities in the isolated project (not a production onboarding path); both users, associated sessions/profiles and local credential fixtures were removed after testing. Verified zero remaining fixture users. Email confirmation itself was not tested by that provisioning method.
- Own profile create/read/update; anonymous access denied; cross-account read/update/insert denied; user-ID mutation/delete/oversized display name/timestamp mutation denied.
- Token refresh passed. Global logout invalidated refresh; an otherwise unexpired old JWT could no longer read profile rows or pass the server session gate.
- Aging only a disposable QA session to 13 hours denied profile reads and writes with a still-valid JWT. Never age a real client session for tests.
- Browser flow: `http://127.0.0.1:8137/account/` → login → profile save → reload → offline hide → reconnect/reverify → logout → reload stays signed out → recovery form/back navigation. Passed at 390×844 and 1366×844, no horizontal overflow or uncaught page exceptions; screenshots visually reviewed.
- Test skill fallback: Browser plugin/browser skill not listed, so regular bundled Playwright used in an isolated Chromium context. Provider dashboard changes used CUA. Screenshot evidence outside repo: `C:/Windows/Temp/fdg-auth-390.png`, `fdg-auth-1366.png`; temporary script `fdg-auth-ui-qa.cjs`.
- No email sent/received or password-recovery link round-trip claimed. Signup delivery, replay/expired recovery link, password update from received link, CSP in production, real owner account and operational workspace isolation remain unverified.

## Security review

Supabase security advisor reports one intentional warning: authenticated users can execute SECURITY DEFINER `fdg_session_is_active()`. It is required to check the calling user's provider-owned session without granting access to `auth.sessions`. It accepts no arguments, has empty search_path, fully qualified tables, and returns only a boolean about `auth.uid()`/JWT session ID. PUBLIC/anon execution revoked. Re-review on any function change; do not suppress blanket warnings. Reference: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable

Tokens in browser storage remain exposed to same-origin script compromise: preserve CSP, avoid third-party scripts and never log tokens. Account isolation proved here is private-profile isolation only. A future server/BFF and operational memberships need a separate design/review, not an implicit extension of this milestone.

## Build and environment

`npm ci`, `npm run build:auth`, `npm test`, `npm run check`. On this Windows host, Node/esbuild generated writes inside Documents fail ENOENT/EBADF. Do not disable endpoint protection. Verified workaround from project directory:

```powershell
node scripts/build-auth.mjs C:/Windows/Temp/fdg-account.bundle.js
if ($LASTEXITCODE -eq 0) { Copy-Item -LiteralPath C:/Windows/Temp/fdg-account.bundle.js -Destination account/account.bundle.js -Force }
```

Only generated build output is copied; source edits use apply_patch. `@supabase/supabase-js` 2.117.2 and esbuild 0.28.2 pinned in package-lock. Public assets include generated bundle; migration/QA credentials are never public deployment inputs.

## Exact continuation / external gate

1. Confirm which FDG-owned sender/domain is available and approve a free SMTP provider. Supabase built-in email only delivers to project-team addresses and is not production email. GitHub dashboard login does not remove this restriction.
2. Configure provider credentials directly in its dashboard/Supabase (user handles credential entry; never paste secrets in chat or repository). Verify domain and SPF/DKIM as required, without changing ML Printing configuration. Resend Free is an option if an owned domain is available; Brevo Free is another option. No email service account was created.
3. With an owner-approved test mailbox, test confirmation, login/logout, received recovery link, password update, old password rejection, expired/replayed link denial, and cross-device logout. Do not weaken email confirmation or use fixture provisioning for real users.
4. Deploy a fresh reviewed stage only after the gate; test actual production cache/CSP headers and auth flows, update this document with deployment/commit evidence, then scoped Git publication. Existing public release remains the previous meter/navigation release.

## Reversibility / preservation

No ML Printing, PayMongo, Fuel records, pricing, totalizer semantics or source issue decisions were changed. Unrelated ML-DEP worktree remains untouched. If pausing deployment, leave the isolated project intact and hide/remove new navigation in any partial release; no database destruction is needed. Keep this auth work local until the email gate is satisfied.

## Primary references checked

- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/auth/sessions
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://resend.com/pricing
- https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan

Recurring lesson: separate provider-admin login, application authentication, operational authorization and transactional email as four different gates. Record each gate's evidence rather than treating a successful login or deployment as completion.
