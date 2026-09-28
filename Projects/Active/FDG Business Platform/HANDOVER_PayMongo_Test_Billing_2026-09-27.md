# FDG PayMongo test billing — 2026-09-27

Status superseded on 2026-09-28 by [[HANDOVER_PayMongo_Connected_2026-09-28]]: configured test deployment, enabled webhook, real provider test checkout and signed settlement are verified. The checkpoints below are historical; do not repeat OTP/configuration work from them.

## Result and release boundary

## Latest checkpoint — 2026-09-28, checkout configuration error

- Reproduced `/api/payments` returning `503 payments_not_configured` on both the dedicated test alias and Production. Production has no payment secrets by design; test only at `fdgbusinessplatforms-paymongo-test.vercel.app`.
- Vercel CLI authorization works. Confirmed linked target `prj_65NNNNBDcjbQDYAvM9TCUtb25QfT`, team `team_E26UjR8lCZTdGP8aaP4bhDvy`.
- Existing PayMongo TEST and FDG Supabase server keys are Preview-only, non-exportable Secrets. Added Preview Config values: `FDG_PAYMONGO_METHODS=qrph`, `FDG_PAYMONGO_MODE=test`, `FDG_PAYMENTS_ENABLED=true`, `FDG_APP_ORIGIN=https://fdgbusinessplatforms-paymongo-test.vercel.app`. No redeployment yet; missing signing secret still fails closed.
- PayMongo requires fresh email OTP to copy the existing TEST key. Retained tab `367775148` is at that dialog; user asked to enter code directly and click Verify and continue. No key rotation or raw credential output.
- NEXT after verification: register the separate FDG TEST webhook at `/api/paymongo-webhook` for `checkout_session.payment.paid`, save signing secret as Preview Secret, deploy Preview/reassign only the approved test alias, verify authenticated checkout, signed settlement, duplicates and account isolation. Provider proof remains pending.
- Landing deployed separately as `dpl_4Zq4RqDKVvJiJYaoYVxrhmzKrH97` to Production. Final responsive production QA deferred until billing blocker is resolved. No real charges, live payment secrets or ML Printing changes.

**Partially implemented; Preview deployed with one approved public test alias, not provider-validated, not live billing.**

## Latest continuation — 2026-09-27, merchant sign-in and hosted packaging

### Latest checkpoint — approved test-domain exception applied

- User explicitly approved making **only** `fdgbusinessplatforms-paymongo-test.vercel.app` publicly reachable for webhook testing. Applied that exact domain exception in FDG Vercel Deployment Protection. UI confirms one Unprotected Domains row with that name; Standard Protection remains enabled. No project-wide protection toggle, production setting, ML setting, key, webhook or deployment changed in this step.
- Anonymous network checks: test root **200**; test webhook GET **405 method_not_allowed**; test webhook POST `{}` **503 payments_not_configured**, without a Vercel redirect. These prove public application ingress and fail-closed configuration, not payment success or signature verification.
- Control check: immutable Preview `fdgbusinessplatforms-dykrwfvrp-guinoomes-projects.vercel.app/api/paymongo-webhook` remains **302 to Vercel sign-in**. Only the named alias is excepted. Exception persists for future deployments assigned to this alias; remove this exact domain exception to re-protect after testing.
- Evidence: `C:/Windows/Temp/fdg-test-domain-public-20260927.png`. Vercel tab `367774999` retained for continuation. Previous PayMongo tab `367774995` no longer exists; rediscover current browser tabs when needed. Supabase tab availability not rechecked.
- **Next exact action:** register the separate FDG test webhook at `https://fdgbusinessplatforms-paymongo-test.vercel.app/api/paymongo-webhook`, save its signing secret in Preview only, configure remaining test variables, redeploy/reassign the stable alias, and complete provider checkout/signed-event testing. The current deployment still predates the two saved server secrets. No live billing is enabled.

The checkpoint below records the previous pending-approval state; the applied exception above supersedes it.

### Superseding checkpoint — OTP complete; two Preview secrets saved

- PayMongo email OTP was completed by the user. Existing TEST key copied and saved as `FDG_PAYMONGO_SECRET_KEY`, Type **Secret**, environment **Preview only**. No key rotation and no live-key access.
- Supabase's modern secret Reveal/Copy controls did not produce a key across refreshed tabs. Existing **legacy service_role key** was successfully retrieved instead. Decoded scope verified `ref=nyrvzzuunnkdgsbbbjvo`, `role=service_role`, then saved as `FDG_SUPABASE_SECRET_KEY`, Type **Secret**, **Preview only**. No new key created or rotated. No raw key stored in repository, output, screenshot or handover. Existing-key copy is not evidence that configured server requests work; test after redeploy.
- Vercel UI confirmed both saved Preview rows and reported a new deployment is required. Current READY deployment below predates these variables. Do not use generic Redeploy if it targets Production.
- Added stable alias `https://fdgbusinessplatforms-paymongo-test.vercel.app` to existing protected Preview `dpl_FTnCd2Tjc9aM1GhNVndLrb2mE2DZ`. It did not previously resolve to a deployment in the team. Existing production aliases unchanged. Future Preview builds must be assigned to this test alias; set `FDG_APP_ORIGIN` to it, not production.
- Inspected merchant Payment Methods: **QRPh Active**, **GCash Inactive**, **Maya Inactive**. This is the merchant status page, not proof of any successful test transaction. Wallet onboarding was not started or modified. Use QRPh for the initial checkout attempt, then verify provider test behavior.
- Vercel supports a no-cost domain-specific Preview protection exception (official docs updated September 15, 2026). Prepared the confirmation dialog for **only** `fdgbusinessplatforms-paymongo-test.vercel.app`; **NOT submitted**. Needs explicit action-time user approval: the entire test domain would become publicly reachable, while application authentication/RLS and webhook signature checks remain in force. Other preview URLs retain protection. Do not share the project automation-bypass secret with PayMongo.
- Next exact action: obtain this domain-specific exception approval. Then apply it, verify anonymous webhook traffic reaches the application, register a new FDG **test** webhook, save signing secret in Preview only, set test-mode configuration and QRPh, redeploy/reassign the test alias, and run real hosted test checkout + signed-event + isolated-ledger verification. No real charges or production-secret transfer authorized by the earlier Preview-only credential approval.
- Pending configuration: `FDG_PAYMONGO_WEBHOOK_SECRET`, `FDG_PAYMONGO_METHODS=qrph`, `FDG_PAYMONGO_MODE=test`, `FDG_PAYMENTS_ENABLED=true` only for configured test environment, `FDG_APP_ORIGIN=https://fdgbusinessplatforms-paymongo-test.vercel.app`. Do not enable before required secrets and ingress are ready. SMTP/recovery gate and production payment-readiness work remain separate.
- Evidence screenshots (local, no secret values): `C:/Windows/Temp/fdg-preview-secrets-20260927.png`, `C:/Windows/Temp/fdg-test-domain-approval-20260927.png`.
- Browser handoff: Vercel `367774999` is at **Remove Protection confirmation**, fields empty, not applied; PayMongo `367774995` on payment methods; Supabase `367775002` returned to masked modern API-key page. Existing secret values are transient CUA session variables only; never print them. Do not repeatedly retrieve credentials already saved.
- No application code changed in this continuation. Updated this handover, README and CURRENT_HANDOVER. No production deployment, Git push, checkout, webhook registration, real charges or ML changes. Root `RTK.md` was absent and scoped `rg --files` found no RTK file; no substitute instructions invented.

The older checkpoint below is historical; the superseding checkpoint above governs credential and OTP status.

- User completed PayMongo sign-in. Merchant dashboard verified under the existing Francis Dale Guinoo account. Existing TEST and LIVE keys are present; neither was regenerated or displayed.
- User explicitly approved saving the existing PayMongo test secret, FDG-only Supabase server secret and new FDG webhook secret in **FDG Vercel Preview only**. No secrets have been saved yet. Production and ML Printing configuration remain outside that approval.
- Copying the existing test secret triggered PayMongo's email OTP dialog. User must enter the code directly in PayMongo. Still pending at handoff; do not retry credentials, retrieve unrelated email, or ask for the code in chat.
- Vercel's unsaved Add Environment Variable dialog is set to Preview, with Production and Development deselected. No variable was submitted. Close/reopen/recheck scope if stale before entering any secret.
- Added `scripts/build-site.mjs`, explicit `public` output directory, npm build command and ignored generated public output. Only explicit static assets and the bundled account client are published; server/API source, SQL, tests, package metadata and environment files are not copied to public output. Build refuses an existing output path instead of recursively deleting it.
- Local public build passed at `C:/Windows/Temp/fdg-public-preview-20260927`; existing 17 payment tests plus hub/Fuel/auth-contract regression suite reran successfully.
- Fresh deployment stage: `C:/Windows/Temp/fdg-paymongo-preview-20260927`. No source secrets, docs or unrelated repository files copied.
- **READY Preview:** `dpl_FTnCd2Tjc9aM1GhNVndLrb2mE2DZ` at `https://fdgbusinessplatforms-dykrwfvrp-guinoomes-projects.vercel.app`. No production deployment or Git push performed.
- Hosted authenticated CLI probes: `/api/payments` and POST `/api/paymongo-webhook` return JSON `503 payments_not_configured` with `Cache-Control: no-store`; `/server/paymongo.js` returns **404**. This confirms function packaging and fail-closed configuration, not a successful checkout.
- Anonymous Preview access returns **302** to Vercel protection. No protection was disabled. `vercel curl` automatically generated a project automation-bypass token for its authenticated probes; its value was not printed or shared. Review that CLI-created token in FDG deployment protection settings before later cleanup; do not use/distribute it to PayMongo without explicit approval.
- Remaining external gates: email OTP, FDG Preview secrets, confirmed test payment methods, a reviewed way for PayMongo to reach the protected webhook, and real checkout/signed-event proof. The webhook endpoint must not be registered while it redirects to Vercel login. Do not disable project-wide protection as a shortcut.
- Provider-return origin must match the actual Preview deployment. The current `FDG_APP_ORIGIN` example still points to production; do not copy that value blindly into Preview. Resolve a stable preview origin or validated server deployment URL before enabling test checkout.

Resume from the superseding checkpoint above, not the historical OTP/login instructions.

The user confirmed PHP 500 per module per branch per month after a seven-day trial, with monthly manual payment, using the existing merchant account through an isolated FDG integration. ML Printing remains untouched. Only Fuel is available in this test milestone; roadmap modules must not be sold as implemented.

Local server handlers, account billing UI and tests are implemented. Migration `202609270003_paymongo_test_billing.sql` was successfully applied to the separate Free **FDG Business Platform** Supabase project `nyrvzzuunnkdgsbbbjvo`. At the initial implementation checkpoint, no PayMongo key was read, merchant setting modified, webhook registered, checkout created, payment made, Vercel environment changed, deployment made or Git push performed. The continuation above supersedes deployment/login status.

At the initial checkpoint, the PayMongo dashboard remained on its login page; this was later resolved as recorded above. The authentication milestone still requires SMTP/domain configuration and an actual confirmation/recovery email roundtrip before public onboarding. Read [[HANDOVER_Real_Authentication_2026-09-27]].

## Decision and boundaries

- Use existing vanilla app, Supabase Auth/RLS and native Vercel Node Web Request handlers; no new payment framework or SDK dependency.
- Use PayMongo hosted checkout. No card/payment credentials enter FDG forms. Manual monthly payments, no automatic debit.
- Server-fixed PHP 50,000 centavos; do not accept client amount, currency, owner or entitlement claims.
- Every test subscription belongs to the authenticated user and a named Fuel branch. This is a billing test record, **not yet a provisioned cloud operational workspace**. The local demo remains separate.
- Trial starts once per normalized branch name. Limit 20 test branches per account. This is not a final anti-trial-abuse/production provisioning policy.
- Periods use the original trial-end anchor plus calendar months in UTC, avoiding month-end drift. No automatic invoice scheduler: the user explicitly checks for the next due invoice. One outstanding invoice per subscription.
- Stopping renewals records a timestamp and prevents future invoice generation; already-issued invoices remain. Refunds, cancellation of outstanding invoices, proration and restarting subscriptions are separate work.
- Test mode is enforced in code and database constraints, not only an environment switch. A live key or mode is rejected. Test receipts never grant real operational access.
- Financial records prevent automatic auth-user cascade deletion; a reviewed retention/deletion procedure is required before production.

## Five-layer implementation map

1. **Account interface** — `account/billing.js`, `billing.css`, `index.html`: existing transparent utility styling; explicit test labels; branch, invoice, checkout and refresh controls; private state cleared on logout/offline/recovery/account change.
2. **Authenticated API** — `api/payments.js`, `server/payment-handlers.js`: verify confirmed user and active FDG session, require same-origin POST, bounded JSON body, use verified owner only. No-store responses.
3. **Provider adapter** — `server/paymongo.js`: backend v2 checkout creation, stable idempotency key/reference, exact HTTPS checkout host allowlist, v1 retrieval, ten-second provider timeout and sanitized errors.
4. **Ledger boundary** — four FDG-only RLS tables and seven RPCs: clients can read only their own subscriptions/invoices and call bounded owner-scoped actions; checkout claims and settlement are service-role-only. Provider requests occur outside database locks.
5. **Evidence/recovery** — signed raw-body test webhook, five-minute timestamp window, provider retrieval, metadata/ref/mode/payment/amount/currency checks; atomic receipt + invoice update; duplicate receipts acknowledged; ambiguous create becomes review rather than blind retry.

## Files and test evidence

Added `api/payments.js`, `api/paymongo-webhook.js`, `server/paymongo.js`, `server/payment-handlers.js`, `account/billing.js`, `account/billing.css`, `.env.example`, `supabase/migrations/202609270003_paymongo_test_billing.sql`, `tests/payments.test.mjs`, `tests/billing-database.sql`. Extended account page/controller and package scripts. Rebuilt account bundle. Excluded `.env*` from deployment.

Executed:

- `npm run test:payments`: **17 passing** unit/HTTP-handler tests with synthetic provider dependencies. Covers disabled/live gates, redirect host, HMAC bytes/timestamps, malformed evidence, duplicate/ambiguous checkout, ownership-derived requests, shared merchant isolation, provider errors and bounded requests.
- `tests/billing-database.sql` executed against the real isolated FDG database in a rollback transaction: trial duration, fixed amount, normalized branch idempotency, early invoice rejection, client grant denial, account isolation, service-side owner checks, repeated checkout claims, amount/checkout mismatch rejection, atomic settlement/replay, January–February–March anchor, stop-renewal audit, expired sessions and anonymous denial all passed.
- Follow-up counts: **0 subscriptions, 0 invoices, 0 attempts, 0 receipts, 0 synthetic test users**. Fixtures rolled back; no material user data deleted.
- `npm test`: existing auth-contract, hub, Fuel data/reliability/operations/meters/sales/scene/attention/glass tests passed.
- `npm run check` and `npm run check:payments` passed. Local API entrypoint imports returned 503 without credentials, as intended. `npm audit --omit=dev`: zero findings.
- Account bundle build passed using the existing temp-output/PowerShell-copy workaround for protected Documents writes.
- Chromium 1.62.1 Playwright UI checks on `http://127.0.0.1:8137/account/?payment=return`, **390×844 and 1366×844**: page identity, meaningful rendering, no framework overlay, no page exceptions, no horizontal overflow, branch text escaped, invoice stays unpaid on return URL, needs-review handling, outstanding invoice retained after stopping renewals, stale billing removed on configuration error, and logout clears billing. **Auth and payment APIs were simulated in this browser test; this is not provider E2E proof.** Expected fixture HTTP 409/503 errors are part of the failure-state test, not unexplained console failures.
- Browser skill/plugin absent; used installed Playwright per frontend-testing skill. Temporary script: `C:/Windows/Temp/fdg-billing-ui-qa.cjs`. Screenshots: `C:/Windows/Temp/fdg-billing-390.png` and `C:/Windows/Temp/fdg-billing-1366.png` (synthetic account/branch/invoice only).

### Security advisor findings reviewed

Supabase reported two INFO findings for RLS tables without public policies: payment attempts/receipts intentionally have no client access. Four WARN findings concern authenticated SECURITY DEFINER execution: active-session predicate and start/issue/stop RPCs intentionally expose bounded owner-scoped operations with empty search paths. Permission/session/isolation tests passed. Server-only settlement/claim RPCs are not executable by authenticated clients. Do not silence these by adding broad policies.

References: [RLS no-policy guidance](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [SECURITY DEFINER review](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

## Required continuation

1. Sign-in and OTP are complete; merchant status inspected. Obtain the specific test-domain protection exception approval described above. Verify **test** QRPh behavior during provider checkout; leave existing ML webhooks/credentials/settings unchanged.
2. Configure FDG-specific **server-only** Vercel variables from `.env.example`: `FDG_PAYMENTS_ENABLED`, `FDG_PAYMONGO_MODE`, `FDG_PAYMONGO_SECRET_KEY`, `FDG_PAYMONGO_WEBHOOK_SECRET`, `FDG_PAYMONGO_METHODS`, `FDG_SUPABASE_SECRET_KEY`, `FDG_APP_ORIGIN`. Never paste secrets in chat, commit them, put them in browser bundles, or use ML Printing's database credentials. Never enable live mode.
3. Redeploy Preview after configuration and point the stable test alias to the new deployment. Basic hosted function packaging/fail-closed/source-exclusion probes have passed; configured provider execution has not. Keep unconfigured routes fail-closed. Reconfirm server sources/config files are not exposed as static assets.
4. Register a **new FDG test webhook** for `checkout_session.payment.paid` at the deployed `/api/paymongo-webhook`; do not repoint or delete ML's webhook. Configure its signing secret securely. Establish correct preview origin/redirects without weakening auth.
5. Seed disposable confirmed QA accounts/expired trial through an explicit test-only setup, then complete hosted **test-mode** checkout. Verify merchant event, signed delivery, provider retrieval, one receipt, matching invoice status, duplicate delivery, cancel/failure paths and two-account isolation. Do not bypass signatures to make the test pass. Clean up only exact QA records, in FK order.
6. Record webhook/provider evidence and deployment identity. Complete auth SMTP/recovery gate separately. Only then review production payment readiness and publish the approved release.

## Remaining limits and risks

- No real provider checkout/webhook proof yet. Basic hosted function/fail-closed runtime proof passed in protected Preview; configured payment execution remains unverified. Two server secrets now saved in Preview only; webhook ingress approval and signing-secret/configuration remain pending.
- No live billing, production workspace provisioning/authorization, payment-driven entitlement, automatic renewal, tax/BIR invoicing, refund/dispute processing, expiry/retry automation, payment reconciliation console or production billing observability.
- One attempt per invoice deliberately fails closed. An expired checkout or ambiguous create needs operator reconciliation. Never delete/reset it blindly: retrieve the known session and prove it cannot still collect payment before designing a replacement attempt.
- Locks/unique constraints protect duplicate claims/settlement; separate concurrent real-request stress testing remains pending.
- Provider events for other apps are ignored after verified signature/retrieval; lack of FDG metadata must never mutate ML records.
- Provider retries are not a substitute for reconciliation: stale signatures or unavailable provider/database can fail closed. Operators need an alert/retrieval/replay procedure before live billing.
- Billing page currently lists the latest 100 invoices, not a complete long-term statement. Production pagination/export remains roadmap work.
- Client recovery email and station-owner operating-day acceptance remain unresolved from earlier milestones.

## Rollback / repository discipline

Leave `FDG_PAYMENTS_ENABLED=false` to disable checkout endpoints. Preserve test ledger/migration evidence; do not drop tables to roll back UI. Restore a known deployment only after verifying its identity. The existing live site remains the pre-auth operational release. Preserve all pending auth work and the unrelated ML-DEP worktree.

## Primary vendor references checked

- [PayMongo hosted checkout quick start](https://docs.paymongo.com/docs/payment-channels-hosted-checkout-quick-start)
- [Checkout session resource](https://docs.paymongo.com/reference/checkout-session-resource)
- [Webhook setup/signature management](https://docs.paymongo.com/docs/developer-tools-webhook-setup-management)
- [Webhook delivery/retries](https://docs.paymongo.com/docs/developer-tools-webhooks-key-concepts)
- [Idempotency guidance](https://docs.paymongo.com/docs/developer-tools-best-practices-1)
- [Vercel Node.js Web Request handler](https://vercel.com/docs/functions/runtimes/node-js)

Durable lesson: provider integration code, database tests, browser fixtures, hosted deployment and a real provider test are distinct evidence gates. Never turn a browser success URL or a passing mocked test into proof of received funds.
