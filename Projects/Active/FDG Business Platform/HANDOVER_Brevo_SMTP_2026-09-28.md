# Brevo SMTP continuation — 2026-09-28

Update 2026-09-29: the previous browser-control session and its temporary key are unavailable. Key presence was checked only by variable availability, not by searching credential stores. User was asked to generate a replacement directly in Brevo and enter it only in FDG Supabase. No replacement/configuration is confirmed. See [[HANDOVER_Client_Release_Validation_2026-09-29]]. The observations below are the earlier checkpoint, not proof of current delivery.

## Current milestone

Fix confirmation and recovery email delivery for the separate FDG Supabase project `nyrvzzuunnkdgsbbbjvo`. Preserve email confirmation, password policy, RLS, session controls, and all payment/ML Printing boundaries. The shipped password visibility/error-feedback correction remains unchanged.

## Verified state

- User completed Brevo registration, email verification and sign-in. Dashboard showed Free allowance of 300 emails/day.
- The user-selected Yahoo sender is marked Verified. Its display name is currently `None`; no authenticated owned domain is configured in the inspected sender. Brevo warns about free-email domain deliverability. Registration verification is not proof of successful FDG auth delivery.
- At action time, user approved generating an SMTP key named `FDG Business Platform` and storing it only in FDG Supabase SMTP settings. Generated Standard key is Active, expires September 28, 2027, and has not been used. Brevo also expires keys after 90 days of inactivity.
- Key value is held only in the active browser-control session memory, not in chat, source, handovers, environment files, or screenshots. It has NOT yet been saved to Supabase. If the browser-control session is lost, arrange approved replacement/secure user entry; do not search unrelated credential stores.
- SMTP endpoint is `smtp-relay.brevo.com`, port 587. Use the SMTP login displayed by Brevo, not the account registration email. Use an SMTP key, not an API key.
- Brevo Security > Authorized IPs shows SMTP blocking Activated, zero authorized addresses and zero unauthorized addresses. The restriction was observed, not modified during this continuation. Do not deactivate it or authorize guessed IPs.
- Supabase dashboard session expired. Existing GitHub sign-in flow is open in the handoff tab; user was asked to complete it. No Supabase SMTP setting has been changed.

## Exact next action

After user completes GitHub sign-in, inspect the FDG Supabase SMTP form and configure the approved credential there only. Before testing, resolve SMTP network access using observed provider evidence and least privilege. Seek action-time approval for any new allowlist grant or weakening of IP protection. Never infer Supabase Auth SMTP egress from a database IP.

Then verify a real confirmation email and recovery round-trip with the user-controlled inbox. Separate provider acceptance, delivery, user verification and successful login/password recovery evidence. Password creation/change remains user-controlled. Keep email confirmation enabled; do not bypass delivery to make signup pass.

## Validation and limitations

Dashboard inspection confirmed key creation, sender verification and network restriction. No test email was sent and no signup/recovery test completed in this checkpoint. No application code, database, production deployment, payment configuration or ML Printing configuration changed. Supabase sign-in is the immediate blocker; network access and free-sender deliverability remain separate gates.

## Vendor references

- [Brevo SMTP setup](https://help.brevo.com/hc/en-us/articles/7924908994450-Send-transactional-emails-using-Brevo-SMTP)
- [Brevo sender verification](https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email)
- [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)

Use a verified owned domain for durable branded sending when available; do not purchase a domain or upgrade the plan without authorization. Treat the Free/Yahoo setup as a test bridge, not production deliverability acceptance.
