# Signup feedback and password visibility — 2026-09-28

## Result and remaining blocker

Show/Hide password is implemented for sign-in/signup, new password and confirmation. The generic signup failure message is replaced by safe, provider-code-specific feedback. **Email onboarding is not yet fixed end to end.** Do not mistake clearer errors for working email delivery.

Auth logs on 2026-09-28 at 05:15–05:49 UTC show signup HTTP 429, `over_email_send_rate_limit`. Recent mail events used Supabase's default sender. The old frontend displayed an SMTP-setup guess for every failure, including rate limits. No additional signup emails were sent during this fix; no user account was edited or deleted.

Supabase default SMTP is team-address-only and currently limited to two messages/hour. Dedicated SMTP remains required for general client onboarding. Provider/sender choice was requested from the user; no credentials, domain or new service subscription were assumed. Keep confirmation enabled, existing password policy, RLS and session controls unchanged. See [official SMTP documentation](https://supabase.com/docs/guides/auth/auth-smtp) and [error codes](https://supabase.com/docs/guides/auth/debugging/error-codes).

## Smallest change and preserved behavior

- `account/auth-feedback.js`: safe error mapping without raw error/account data; independent password visibility controls with `aria-controls` and pressed state.
- `account/index.html`, `account.css`, `account.js`: readable Show/Hide buttons; signup 12-character hint and browser validation; correct submit-button selector after adding toggle buttons.
- Passwords mask by default and re-mask on submit/reset, mode changes, recovery navigation and private-view hiding. Values are not persisted by the toggle.
- SDK bundle regenerated. No authentication bypass, SMTP secret, payment configuration or ML Printing changes.
- `tests/auth-feedback.mjs` joins the existing auth contract suite.

## Validation

- `npm run build:auth`, `npm test`, `npm run check`: pass.
- Unit tests cover rate/setup distinction, weak password/network fallback, no raw-message leakage, all three toggles, independent state and reset/submit masking.
- Browser validation through CUA: local signup → show → hide → mode switch masks again. Production signup at 390×844 and 1440×900: correct page/content, no framework overlay, no horizontal overflow, no warning/error console entries. Published toggle switches the input type between password/text without submitting.
- Mobile screenshot: `C:/codex-work/fdg-password-toggle-mobile-20260928.png`.
- Source diff whitespace check passes. Generated bundle has one esbuild/Supabase template-string whitespace warning; left unchanged to preserve string semantics.
- Recovery password controls are unit-tested; received-email recovery round-trip is not newly tested here.

## Deployment

- Production READY: `dpl_F3nGHUnb9rLjMc6yNjNyx9GdvxH5`, `https://fdgbusinessplatforms.vercel.app/account/?mode=signup`.
- Preview READY: `dpl_CM2Y97zL3YLLxiHogjA33Fy4scRL`, `fdgbusinessplatforms-ff4dgmcon-guinoomes-projects.vercel.app`; assigned to the existing approved TEST alias only.
- Billing handlers/configuration unchanged. Production remains payment-disabled; TEST billing still requires sign-in.

## Exact next action

Obtain the FDG-owned sender/domain and approved email provider (or assess a free provider if none), then configure SMTP using user-controlled credential entry. Test an actual confirmation email and recovery round-trip before declaring client signup complete. This gate can be coordinated from the user's phone, but credentials must not be pasted in chat.
