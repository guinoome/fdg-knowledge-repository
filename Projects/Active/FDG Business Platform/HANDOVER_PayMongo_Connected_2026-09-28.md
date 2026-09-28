# FDG PayMongo TEST connection — 2026-09-28

## Result

The reported `payments_not_configured` error is resolved on the approved test alias. A real PayMongo TEST hosted QRPh checkout was created and simulated successfully; its signed provider event settled exactly one PHP500 invoice. This is **test integration evidence, not live billing**.

Test entry: https://fdgbusinessplatforms-paymongo-test.vercel.app/account/

Production remains payment-disabled. Do not transfer payment secrets or enable live money as part of this milestone. ML Printing and its configuration remain untouched.

## Configuration and deployment

- Vercel project `prj_65NNNNBDcjbQDYAvM9TCUtb25QfT`, team `team_E26UjR8lCZTdGP8aaP4bhDvy`.
- Preview `dpl_FhcvvtVP7EaL2K97nA6hDQ6FCWKK`, immutable URL `fdgbusinessplatforms-d1den5xg9-guinoomes-projects.vercel.app`, READY; assigned only the existing public test alias.
- All seven settings present in Preview: PayMongo TEST key, FDG Supabase server key, webhook signing secret (all Secret), test mode, payments enabled, QRPh methods, and exact test origin (Config).
- FDG test webhook `hook_PjTHnq64CXW9yT5A7iN5vst7`, enabled for only `checkout_session.payment.paid`, endpoint `/api/paymongo-webhook` on the test alias. No existing merchant endpoints changed. PayMongo API returns signing material in `attributes.secret_key`; no raw secrets were stored in source or output.
- Anonymous test billing GET: **401 sign_in_required**. Unsigned webhook POST: **401 invalid_signature**. Production billing remains **503 payments_not_configured**. Immutable Preview still **302 to Vercel sign-in**.

## Provider and data evidence

Disposable confirmed QA accounts were used; no client records were changed. Only the QA trial was backdated to issue a due invoice without waiting seven days.

- Invoice `4a2ffc1d-d760-4c57-841b-58126a48077b`.
- Checkout `cs_0923f34081ffbc976007ad74`.
- Payment `pay_2HzQFufV85U2fQnF2gth67kS`, `amount_centavos=50000`, `livemode=false`.
- Provider event `evt_9wmixXcf5KXKqbZjybAZ8Gjj`; delivery `wp_PjVnfb1dPQ8dKqHhSa9sLLE4` showed success, zero retries.
- Invoice/attempt reached paid at `2026-09-27 23:02:23.715614+00`. Initial checks occurred before asynchronous provider completion and correctly still showed open; subsequent API and DB checks proved settlement.
- Operator-signed replay of this actual checkout returned **200 / duplicate**. This was a deliberate replay test, not a second provider payment.
- Real login, authenticated billing GET, trial amount, pre-trial invoice denial, cross-account subscription/invoice isolation, cross-account checkout denial, repeated checkout URL reuse, and post-payment account isolation passed.
- Existing 17 payment tests and payment syntax checks passed. Added opt-in `tests/payments-hosted.mjs`; credentials must stay outside the repository, and preparation SQL must be captured privately. This script tests hosted payment boundaries, not email delivery/signup.

## UI verification

- Test account page displays **Paid in TEST MODE**, not the old configuration error. Refresh preserves the server-confirmed state; global logout clears billing and returns to sign-in.
- Mobile 390×844: readable glass billing, no horizontal overflow (document width 375); no console warnings/errors. Screenshot `C:/codex-work/fdg-billing-paid-mobile-20260928.png`.
- Production landing release `dpl_4Zq4RqDKVvJiJYaoYVxrhmzKrH97` was resumed and checked at 1440×900 and 390×844: correct hero, navigation, nine modules, mobile menu, no horizontal overflow and no console warnings/errors. Screenshots `C:/codex-work/fdg-production-landing-desktop-20260928.png` and `C:/codex-work/fdg-production-landing-mobile-20260928.png`.
- Build fix preserves non-empty-output protection while permitting Vercel's pre-created empty output directory.

## Repository validation and cleanup

- Full `npm test` and `npm run check` passed, along with `node --check tests/payments-hosted.mjs` and `git diff --check`.
- The two disposable QA identities and their FDG trial/invoice/attempt/receipt records were removed after proof capture; zero QA users remain. No client data was removed. These disposable database fixtures are not recoverable through the application; the PayMongo TEST payment/event audit and screenshots are retained.
- Temporary fixture credentials and operator helper were deleted from their exact external paths. Cleanup of `C:/Windows/Temp/fdg-preview-billing.env` was denied by Windows/policy; it remains a local cleanup item (contains environment export metadata and sensitive-variable placeholders; do not publish). No production secrets or merchant records were removed.
- Current handover, README, and prior landing/payment handovers were reconciled so historical blockers are not mistaken for current status.

## Limits and next action

Use the test account URL above and existing confirmed FDG login for user acceptance. A fresh branch receives its genuine seven-day trial; do not backdate client trials for testing. QRPh is the configured method; direct GCash/Maya remain inactive. No real payment or operational entitlement is enabled.

SMTP/recovery delivery, live-money approval/configuration, Fuel OCR and one owner-validated operating day remain separate gates. Restaurant remains behind the Fuel owner gate. Do not infer that a paid test invoice authorizes production operation.

Rollback: reassign the test alias to its prior deployment or disable the exact FDG test webhook; preserve Production and other merchant endpoints. Remove only the exact approved domain exception if ending public tests.

References: [PayMongo webhook management](https://docs.paymongo.com/docs/developer-tools-webhook-setup-management), [hosted test channels](https://docs.paymongo.com/docs/payment-channels-testing).
