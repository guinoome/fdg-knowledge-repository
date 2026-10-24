---
document_id: FSIS-0805
title: JWT Session Revocation and Deleted-Account Authorization Gate
created: 2026-10-25
status: DRAFT_SECURITY_ACCEPTANCE_REFERENCE / NOT_IMPLEMENTED / NOT_AUDITED
owner_domain: FSIS Security / Access Control
source_video: 1000011984.mp4 (85.310708 seconds; 720x1280)
source_sha256: d005ef611f45c37297d4ef5c7e3e61fe42e3d2e3d3ccfc54690edb50c4ce894c
production_change_approved: false
supersedes: none
---

# FSIS-0805 — JWT Revocation and Deleted-Account Authorization

> [[FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|FSIS]] → [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0800 - Cybersecurity Master Index|Cybersecurity]] → this candidate security acceptance pack. Extends [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0802 - Secure Development Baseline|FSIS-0802]], [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803]] and [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804]].

## What the second video demonstrates

The 85-second clip titled “SESSIONS VS JWT” depicts a **fictional account “scam_99”** being deleted while an access JWT previously issued on a laptop still bears a future expiration (graphic example: **30 days**). It contrasts immediately revocable server-side sessions with signed JWT self-validation and depicts a refresh-token style solution. Video diagrams are illustrative, **not evidence of a live FDG account attack or that FDG currently issues 30-day tokens**.

**Verified via authoritative Supabase docs:**
- [Supabase Managing User Data / Deleting users](https://supabase.com/docs/guides/auth/managing-user-data): hard Auth user deletion removes Auth sessions and prevents refresh, but an already-issued access JWT may remain cryptographically valid until exp; additional live session checks are required for sensitive routes during that window.
- [Supabase User sessions](https://supabase.com/docs/guides/auth/sessions): access JWTs + refresh tokens; signed JWT may carry session_id; selected sensitive operations may check a trusted active auth.sessions record.
- [Supabase Signing out](https://supabase.com/docs/guides/auth/signout): sign-out revokes refresh paths, not every outstanding access JWT instantly. Global versus local session scope matters.

**Security invariant:** “Signature valid” does NOT equal “this user, device, session, tenant, role, branch and subscription still have current permission to perform this action.”

## FDG implementation candidate: provider-neutral rules

1. **Authentication is separate from authorization.** Validate signature, issuer, audience, exp/time claims, then enforce current server-side user/account state, session/revocation state for protected operations, tenant/branch membership, privilege level and resource ownership. Never rely solely on the client UI or stale role claims.
2. **Short-lived access plus refresh revocation:** Select access JWT duration by provider/risk (Supabase documents about one-hour default and cautions against very low TTL due to clock skew/refresh load). A refresh-token revocation stops further tokens but cannot alone erase a JWT already handed to a device. Sensitive authorization requires a separate current-state check.
3. **Current session check (when immediate revocation required):** On server/trusted DB boundary, validate the verified principal and JWT session_id against active session records (Supabase auth.sessions when appropriate). Check hard-delete, disable/suspend, and current tenant membership/permission using authoritative data. A browser must not be given service-role secrets or direct privileged auth.sessions access.
4. **Distinguish account states:** Auth hard delete, app-profile soft delete, temporary ban, session sign-out, role/branch removal and subscription expiry are different operations. Each must have a mapped authorization denial effect. Marking an application table row deleted does not erase the real Auth user.
5. **Tenant isolation / Supabase RLS:** Enable and independently verify Row Level Security on exposed tables and ownership-appropriate Storage policies; service/API checks must deny cross-client reads/writes, even when a JWT's signature is valid. Do not assume session checks are automatically part of every default RLS policy.
6. **Caching must not defeat revocation:** Bound authorization cache lifetime and explicitly invalidate sessions, roles and tenant grants when changed. For high-risk actions (admin/user deletion, branch billing, payroll approval, customer-data export), fail closed on expired/unavailable authoritative status.
7. **Offline-first reality:** Instant central revocation of a disconnected device cannot be guaranteed. Provide short signed offline grants/least privilege, protect cached local client data, and deny sensitive mutation until validated online; an offline copy already downloaded requires separate device/security and privacy policy.
8. **Audit:** Log decision reason, principal/session reference, tenant/role and relevant policy version; do NOT log raw JWT, refresh tokens, signing secrets or passwords.
9. **Commercial plans are independent:** Revoking paid entitlement must not unexpectedly remove customer's rightful base access or approved restoration, but must prohibit premium-only operations. Subscription claims are not a substitute for current account/tenant authorization.

## Negative-test matrix for an actual assigned FDG application

| Test ID | Action (isolated test users / no real client data) | Expected evidence |
| --- | --- | --- |
| AUTH-REV-01 | Active user with valid unexpired JWT/session and allowed branch role | Requested authorized action only succeeds |
| AUTH-REV-02 | Hard-delete Auth user, replay still-unexpired previously issued JWT on a sensitive endpoint | **DENIED despite valid old signature** by live user/session check |
| AUTH-REV-03 | Sign out/revoke session, replay prior JWT before expiry | Sensitive action rejected through active session check |
| AUTH-REV-04 | Reuse refresh token after session revocation/deletion | Cannot mint new access JWT |
| AUTH-REV-05 | Mark app profile deleted/disabled while Auth user remains | Sensitive action denied based on current app status |
| AUTH-REV-06 | Remove branch membership or downgrade role after issuing JWT | Old claims cannot authorize now-revoked branch/resource/action |
| AUTH-REV-07 | Cancel quarterly/premium membership while base account remains | Only paid features restricted; base/restoration stay available |
| AUTH-REV-08 | Expired, invalid signature, wrong audience/token issuer | Reject before sensitive business logic |
| AUTH-REV-09 | Cross-tenant request (valid JWT for tenant A reads/updates B) | Service/RLS/storage denies; no exposed other-client data |
| AUTH-REV-10 | Spoof user ID/tenant/role/session on request | Trust only server-verified principal and current grants |
| AUTH-REV-11 | Cache stale after account revocation | Next protected request rejects within documented bound |
| AUTH-REV-12 | Offline revoked user requests privileged mutation | Deny/hold until actual current-state revalidation; no false instant-revoke claim |
| AUTH-REV-13 | Background jobs/websocket/in-flight requests after user disable | Server-side final action check or disconnect prevents continued unauthorized access |
| AUTH-REV-14 | Inspect test logs and traces | No raw signed token, refresh secret or sensitive private data |

**Evidence obligation:** Record actual system/SDK/version, JWT TTL and session handling, precise real routes and RLS policies, test response, independent reviewer, branch/profile context and source commit. Security pass needs actual runtime negative tests. This video provides neither an FDG vulnerability diagnosis nor deployment evidence.

## Release / integration boundaries

FSIS governs identity and security; FBPOIS/FWIS/FMIS, FDG Business Platform, payroll and FDG automotive paid-account modules consume current-state authorization independently. Implement provider-specific adapter if Supabase is deployed; do not impose Supabase schemas on a different backend. Never create SECURITY DEFINER functions, expose service-role credentials or edit production RLS without an approved architecture/security plan. No user deletion, session revocation, secrets access, webhook changes, or production patch is authorized by this document.

**Disposition:** Draft verified research and future test contract; no existing FDG project asserted vulnerable, corrected or accepted.
