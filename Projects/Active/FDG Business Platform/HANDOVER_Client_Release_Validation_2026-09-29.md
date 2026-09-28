# Client release validation — 2026-09-29

## Result

**Not yet client-production ready.** The user requested verified signup through subscriptions. Continued the pending SMTP milestone, tested available boundaries, and corrected one reproducible recovery UX defect. Do not equate test billing with operational access or production subscriptions.

## Correction and preserved workflow

Expired confirmation/recovery links previously displayed only a generic sign-in prompt. `account/auth-feedback.js` now maps failed callback metadata to safe actionable text and removes provider error details from the URL. `account/account.js` retains that feedback until an explicit form submission. Successful PKCE/session callbacks are untouched. Raw provider descriptions are never rendered. Auth bundle rebuilt; tests cover expired/unknown errors, URL cleanup, no private-description leakage and successful-callback preservation.

No credentials, email-confirmation bypass, customer records, schema, payment modes, provider configuration, or ML Printing settings changed.

## Fresh evidence

| Check | Result / evidence |
| --- | --- |
| FDG Supabase project | `nyrvzzuunnkdgsbbbjvo` ACTIVE_HEALTHY; five FDG public tables all have RLS enabled and forced |
| Signup mail | Unresolved; current 24-hour logs still include `over_email_send_rate_limit`. No extra signup/recovery mail sent during this test |
| Billing database | Existing `tests/billing-database.sql` passed against the isolated FDG database, then expanded and passed again. All synthetic identities, sessions and records rolled back |
| Trial and pricing | Seven days, PHP500, case-insensitive branch idempotency, early invoice denial |
| Invoice security | Own-account visibility, cross-account denial, server-only checkout/settlement, amount and checkout matching, replay handling, month-end anchoring |
| Renewal cancellation | Existing invoice preserved/payable; no trial restart; separate branch unaffected; new invoice rejected after cancellation |
| Session boundaries | Real database expiry denies reads/writes; anonymous operations denied. This is not a newly completed email/password login round-trip |
| Local regression | `npm test`, `npm run check`, `npm run build:auth` passed; both Vercel builds passed |
| Rendered UI | Production and local account pages checked at 390x844 and 1440x900. Expired-link feedback, recovery/back navigation, Show password and mode-change remasking pass. Meaningful page content, no error overlay, no overflow, no app console warnings/errors |
| Payment exposure | Production GET `/api/payments` remains 503 disabled; test alias returns 401 without authentication. No real-money change |

Browser plugin/CUA was unavailable in this turn; its previous session and temporary SMTP key are unavailable. Used installed Playwright with installed Chrome in a fresh headless context for application QA only. No personal browser profile or admin secrets were accessed. Default Playwright browser binary was missing; installed Chrome was used without dependency/browser installation.

## Deployment and evidence files

- Production READY: `dpl_Aa9d4TwcGUR1VkngHVvSSBGSxjXK`, `https://fdgbusinessplatforms.vercel.app/account/`.
- Preview READY: `dpl_BX9oy7wdA7edr8s7P5NE4xbgqXzt`, immutable `fdgbusinessplatforms-iyb71zrko-guinoomes-projects.vercel.app`; use only the previously approved public alias `fdgbusinessplatforms-paymongo-test.vercel.app`.
- Screenshot: `C:/codex-work/fdg-expired-email-link-production-mobile-20260929.png`.
- Prior real PayMongo TEST simulation remains in [[HANDOVER_PayMongo_Connected_2026-09-28]]; no new provider payment simulation was made here.
- Rollback: reassign only the relevant alias to the preceding known-good deployment; do not change SMTP, merchant, or other application settings as part of a UI rollback.

## Remaining release gates in order

1. **SMTP / real email**: complete FDG Supabase admin sign-in and direct replacement SMTP-key entry. Previous temporary key cannot be recovered from this session. Brevo sender was verified at the earlier checkpoint, but SMTP IP blocking allowed zero addresses. Keep the restriction unchanged until documented egress evidence and approval support an exact change. Never assume database IP equals Auth SMTP egress. Test actual inbox delivery, confirmation, subsequent login, recovery, old-password rejection, logout and expired/reused links. Do not request passwords, keys or codes in chat.
2. **Abuse / sender readiness**: verify sending limits and anti-abuse configuration; an owned authenticated sender domain is still needed for durable branded email. Do not purchase or upgrade without authorization. Supabase warns that its default sender is not for production.
3. **Secure Fuel entitlement and data**: current five tables cover profile/test billing, not organizations, branch membership, paid entitlement or Fuel ledger. Design/implement server-enforced branch membership and subscription access, then tenant-isolated operational storage and offline reconciliation. Preserve current local records; never promote the demo role selector into authorization. Test two separate client accounts/branches.
4. **Live-money release**: existing authorization and configuration cover TEST credentials in Preview only. Obtain explicit live-key/storage/webhook approval before real billing. Current schema and handlers deliberately reject live mode. A TEST paid invoice does not grant operational access. Confirm release policies and perform an approved bounded live transaction only after earlier gates pass.
5. **Fuel owner acceptance**: OCR with an actual meter image and one complete operating day remain required before general operational rollout. Restaurant stays behind Fuel acceptance.

## Exact next action

Complete the user-controlled FDG SMTP setup at `https://supabase.com/dashboard/project/nyrvzzuunnkdgsbbbjvo/auth/smtp`; then verify delivery rather than repeatedly retrying signup against the default sender. The user has been asked whether they can enter the replacement directly or need guidance. While this remains missing, do not claim signup-to-subscription acceptance.

References: [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Brevo authorized IPs](https://help.brevo.com/hc/en-us/articles/5740111683858-Authorize-and-block-IP-addresses-for-API-and-SMTP-security).
