# SMTP, callback and billing continuation — 2026-09-29

## Current result

Client production launch is **not complete**. A replacement Brevo SMTP key was transferred directly to the separate FDG Supabase SMTP form and Save submitted. The user subsequently confirmed custom SMTP is enabled and saved. One controlled recovery request returned HTTP 500 / `unexpected_failure`; narrowly scoped Supabase Auth logs identify an unauthorized-IP failure. Do not repeatedly resend emails or claim delivery works.

## Security and access observations

- FDG Supabase: `nyrvzzuunnkdgsbbbjvo`; SMTP host `smtp-relay.brevo.com`, port 587, sender display name FDG Business Platform. Minimum per-user interval preserved at 60 seconds. No password or key is included in this document, source, screenshots or chat.
- Replacement key name: `FDG Business Platform replacement 2026-09-29`. Created in the existing Brevo account after user-controlled device and action verification. The old unused key was not revoked; review/revoke only the exact superseded FDG key after replacement acceptance.
- Brevo SMTP IP blocking was freshly observed Activated with zero authorized IPs; API blocking Deactivated. **User explicitly instructed leaving IP protection unchanged. No IP changes were made.**
- Admin browser session timed out during post-save reload. User confirmed persisted configuration. A dedicated-browser reconnect attempt was policy-blocked and not retried by another mechanism. Application QA used separate ordinary Playwright contexts; no personal browser profile/credential store was accessed.
- Real recovery test initiated at `2026-09-28T23:20:48.976Z`; `/auth/v1/recover` returned 500. Fixed-window Auth log classification contained unauthorized/IP, not timeout/authentication. No confirmation, password change or inbox delivery acceptance was achieved.

## Callback and UI corrections

- Reproduced a PKCE bug: requests from the payment-test origin previously returned to Production, where the browser-local verifier is absent.
- `account/config.js` now allows exact Production and `fdgbusinessplatforms-paymongo-test.vercel.app` origins only. `account/account.js` uses the corresponding same-origin callback; unsupported previews/local hosts cannot initiate signup/recovery. Existing password sign-in stays unchanged.
- User confirmed adding exactly `https://fdgbusinessplatforms-paymongo-test.vercel.app/account/` to FDG Supabase Redirect URLs while preserving Production/Site URL. No wildcard callback was introduced.
- `account/billing.js` now keeps trial/form controls disabled when the server cannot verify billing availability; Refresh remains available. It reports disabled subscriptions accurately instead of implying that an enabled trial button will work. This is fail-closed UX, **not live billing activation**.
- No billing server, database mode constraint, payment credential or operational access change is part of this checkpoint.

## Validation

- `npm run build:auth`, `npm test`, `npm run check` pass. Payment/UI tests: 19 passing.
- `tests/auth-email-origin.mjs` uses synthetic SDK/storage/HTTP to reproduce the original failure and validate same-origin recovery exchange, `PASSWORD_RECOVERY`, consumed-verifier removal, tab-private tokens and unsupported-origin no-send behavior. Not real email proof.
- Rendered form tests: local source at simulated Production/test/unapproved origins, 390 and 1440 widths; both email actions produce exact approved callbacks or no request; no overflow/console errors. Browser plugin absent; installed Playwright/Chrome fallback used. Screenshot outside source: `C:/codex-work/fdg-email-origin-test-mobile-20260929.png`.
- Production endpoint freshly returns 503 `payments_not_configured`; approved TEST endpoint returns 401 `sign_in_required` anonymously. This explains the supplied screenshot: Production was never authorized/configured for live billing at that checkpoint.

## New user authorization — live milestone

User explicitly approved **FDG LIVE setup** on 2026-09-29: existing PayMongo merchant, isolated FDG live integration, live credentials only in FDG Vercel Production, separate live webhook, ML Printing untouched. Client launch remains gated until payment and branch-access tests pass. This supersedes the former test-only permission for this new milestone, not its validation requirements. No real-money test charge or upgrade has been performed/approved here.

Execution sequence:

1. Inspect approved merchant live payment methods and isolated credentials/webhook; keep all other merchant endpoints unchanged.
2. Preserve existing TEST data and behavior. Add explicit live/test mode separation, signature/environment enforcement and server-owned pricing/settlement; never simply remove mode guards.
3. Implement and test server-enforced branch ownership and subscription access. Existing Fuel demo storage is not a client ledger; do not grant paid access to shared/local demonstration data.
4. Verify actual email confirmation/recovery after resolving SMTP routing with the user's protection constraint. Vendor support or an explicitly approved alternative may be required.
5. Two-client isolation, trial/expiry, failed/duplicate/out-of-order payment handling, owner operating-day acceptance and a separately approved bounded live-payment check precede client launch.

Confirmed commercial choice: on 2026-09-29 the user chose one calendar month starting from confirmed payment, without charging the inactive gap. Preserve existing test invoice behavior/data as historical; live renewal implementation must use this approved rule.

Safe-correction deployments: Production `dpl_BsHzYsjWU5cxL2e55F7iD8bdnRi9` (`fdgbusinessplatforms-8ec9a9jjq-guinoomes-projects.vercel.app`) READY; Preview `dpl_5cHYwXWyBUV3dxebi1YXBe5pSY3V` (`fdgbusinessplatforms-dc63a53jv-guinoomes-projects.vercel.app`) READY. These contain callbacks and unavailable-billing UI guards, not live-payment enablement. Only the existing approved test alias may be reassigned; do not broaden preview exposure.

## References and next action

[Brevo IP security](https://help.brevo.com/hc/en-us/articles/5740111683858-Authorize-and-block-IP-addresses-for-API-and-SMTP-security) confirms SMTP has no learning phase and blocked unknown IPs cannot send. [Supabase's team reply](https://github.com/orgs/supabase/discussions/29370) dated 2024-10-11 says SMTP allowlist IPs are not exposed; treat this as dated evidence, not a guaranteed current support commitment. [Current IPv4 add-on docs](https://supabase.com/docs/guides/platform/ipv4-address) guarantee database ingress only, not static outbound IPs. Do not buy that add-on as an SMTP fix or authorize guessed IPs.

Resume the authorized live milestone from the current PayMongo Developers email-code dialog. The existing LIVE secret's Show control was opened; PayMongo requires user-controlled verification. The user was asked to enter the six-digit code directly and click Verify and continue. No LIVE key has been read/saved, no live webhook has been registered, and no live checkout or charge has been created. Do not regenerate shared merchant keys. Do not recreate the SMTP key merely because the browser session was lost: it has been saved, and the remaining observed delivery failure is unauthorized IP. Preserve [[HANDOVER_Client_Release_Validation_2026-09-29]] release gates.

## Verified publication and rendered guard acceptance

- Safe implementation checkpoint pushed and remote refs verified: vault main `818ecedf5102ce021565b2382b19386ea42d152e`; application main `2f190c8aa5b73f730ca3eb52d547330bfd18b873`. Vault application subtree and release repository root both hash to `3772c440fc8d43de06aaef7b8b8d9c8d9d72df4d`. This handover addendum follows that code checkpoint.
- Read-only GET verification confirmed Production and the approved public test alias serve byte-identical account bundle, HTML and billing CSS to that checkpoint. Production anonymous billing remains 503; test alias anonymous billing is 401. This is intentional gating, not live activation.
- Browser plugin unavailable; regular installed Playwright/Chrome fallback used. The isolated synthetic billing harness rendered actual account HTML/CSS and billing code at 390×900 and 1440×900. Page identity, nonblank render, absence of framework overlay, console health, no horizontal overflow, and screenshots passed.
- Interaction loop: unavailable response disables branch input/trial; Refresh remains enabled and sends GET only; a synthetic available response restores controls; clearing the account hides and disables billing. No real sign-in, email, trial or payment was created by this harness.
- Evidence outside the repository: `C:/codex-work/fdg-billing-guard-qa-20260929.cjs`, `C:/codex-work/fdg-billing-unavailable-390-20260929.png`, and `C:/codex-work/fdg-billing-unavailable-1440-20260929.png`. Screenshots visually reviewed: readable glass presentation; no clipping or overlapping controls.

## Live renewal acceptance contract — approved, implementation pending

- An expired branch's PHP500 renewal buys one calendar month beginning at confirmed payment; never invoice the inactive gap.
- Pending, failed, cancelled or browser-return-only payment must not grant access. Confirmation must come from authenticated provider evidence plus atomic server settlement.
- Settlement replay must preserve the original access dates, not extend a second month. Price, module, branch ownership and payment mode remain server-owned.
- Cover late payment after a long gap, month-end/leap-year dates, duplicate/out-of-order callbacks, wrong branch/account, wrong amount/currency, and TEST events attempting LIVE access in the live milestone tests.
- Existing TEST invoice history and its earlier anchored-period fixtures are unchanged. This approved live rule has not yet been wired into settlement; do not describe it as released.
