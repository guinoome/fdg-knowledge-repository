---
document_id: FSIS-0803
title: Agent-Generated Application Security Verification and Acceptance Pack
version: 0.1.0
created: 2026-10-22
status: Draft extension / execution candidate - not accepted production security evidence
owner_domain: FSIS cybersecurity and secure development
implementation_interface: FPJIS, FMCIS, Claude Code, Codex and other collaborators
source_media: user-supplied 1000011692.mp4 (34.62 seconds)
document_type: Cross-provider secure code review and negative-test contract
deployment_authorization: none
supersedes: none
---

# FSIS-0803 — Agent-Generated Application Security Verification and Acceptance Pack

> Knowledge path: [[FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|FSIS]] → [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0800 - Cybersecurity Master Index|Cybersecurity]] → this candidate security acceptance pack.

## 1. Why this exists (CORE: Context / Origin / Reasoning / Evidence)

A founder-supplied 34.62-second video, file \`1000011692.mp4\`, visually accumulates a checklist while a speaker says in effect that Claude should not produce insecure "vibe coded" websites. It displays controls including protect admin routes, server-side permissions, enable RLS, verify email addresses, keep tokens out of local storage, hash passwords securely, server-side API secrets, \`.env\` from Git, keep sensitive data out of logs, block cross-site scripting, validate inputs/uploads, verify webhook signatures, rate limit, parameterize SQL, tighten CORS, disable production debugging, update dependencies and a link labeled \`Anthropic/claude-code-security-review\`.

**Evidence assessment:** These are helpful security prompts, **not evidence that an application implements them**. Green checks are video decoration; a red X is not an independently tested FDG vulnerability. The video names an Anthropic reviewer; the verified canonical upstream is \`anthropics/claude-code-security-review\` (plural "anthropics"). FSIS owns canonical security meaning, FPJIS maps per-project threats and quality gates, FMCIS allocates worker/reviewer work. The security pack **extends** [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0802 - Secure Development Baseline|FSIS-0802]] and [[12_FDG_Security_Intelligence_System/12_Security_Standards/FSIS-1201 - Security Review Checklist|FSIS-1201]], not replacing either. Current FSIS standards remain superior where approved.

### Public standards and source references

- OWASP ASVS 5.0 (control taxonomy; apply scope/risk; no fabricated compliance certificate): https://github.com/OWASP/ASVS
- Supabase RLS guidance (database grants **and** policies; anon/authenticated and service roles): https://supabase.com/docs/guides/database/postgres/row-level-security
- Anthropic's on-demand security review (documented native command, where available): https://support.anthropic.com/en/articles/11932705-automated-security-reviews-in-claude-code/
- Canonical security-review GitHub Action and documented warning about untrusted PR prompt injection: https://github.com/anthropics/claude-code-security-review
- OWASP ASVS logging and file uploads references: https://github.com/OWASP/ASVS/tree/master/5.0/en

Source status: web/official guidance reviewed 2026-10-22; no local FDG source code or database was executed or inspected during this reference-only capture. Upstream guidance/version must be checked again at implementation.

## 2. Mandatory security review lifecycle for every materially affected application

**Read/plan → threat and authority mapping → security controls in code → tests of permitted and forbidden behavior → second-person/independent review → conditional release gate → monitored operation.**

1. **At project preflight** identify trust boundaries, public/tenant/branch roles, protected data, offline/sync paths, API/webhook/payment features, secret material, external providers and what a breach could expose. Use [[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Privacy_Threat_Model_Blueprint|FPJIS threat/privacy model]]. Security work **does not justify replacing** existing working modules.
2. **At implementation** require secure-by-default behaviors proportionate to the deployed feature, with evidence-backed exact files and test cases. Reject adding fake "security badges", UI-only permission logic, or design-only toggles in place of backend controls.
3. **Before merger/release** run scoped automated/static checks and tests, then independent human or qualified collaborator review as risk merits. If available, Claude Code \`/security-review\` may supplement the review. Codex/others use their own available review capabilities and the same FDG test contract; do **not** assume a Claude command exists in Codex.
4. **At acceptance** attach actual executable commands, observed logs without secrets, test fixture/scopes, allow/deny matrix, reviewer, residual risk and defects. A green checklist without observed results is \`NOT TESTED\`, not \`PASS\`.
5. **At production release** FPJIS gate + FSIS risk review + authorized engineering/business owner approval remain required. This document creates neither a CI/branch enforcement workflow nor deployment authorization.

Security review is **risk-based**: small docs/readme changes do not need pretend penetration tests; changes to auth/RLS/payment/upload/public endpoints/logging/deploy flows need targeted security tests. Use minimal sufficient agent capacity and independent review of high-risk changes.

## 3. Controls translated into testable requirements

| Control family | FDG acceptance criterion | Essential negative / adversarial test |
| --- | --- | --- |
| S01 — Server authorization | Backend verifies authenticated actor AND resource/action scope for every sensitive route, command, row and export; UI hiding is not protection | Anonymous, low-privilege and cross-tenant/branch actors receive denied access; no data in error response |
| S02 — RLS / DB grants | In exposed Supabase schemas, RLS enabled **and relevant GRANT privileges constrained**; per-operation policy and service-role usage scoped. No inference from a toggle or screenshot | \`anon\` / \`authenticated\` SELECT, INSERT, UPDATE, DELETE allowed and denied as designed; cross-branch leakage blocked; table/view/storage/RPC access considered |
| S03 — Admin privileged paths | Admin screens plus backend/API elevated actions and privileged job triggers require explicit role/authority | User manually calls admin API without permission → no state change; forged client role ignored |
| S04 — Sessions/tokens | Prefer server-managed HttpOnly/Secure/SameSite cookies for sensitive browser sessions where architecture supports it; evaluate CSRF and credential transport separately. Avoid exposing bearer tokens to injected JavaScript; if browser storage is unavoidable, document compensating risk and XSS controls | Token exposure, stale/revoked session, logout/replay, cross-site request and offline restart tested within architecture |
| S05 — Identity / email claims | Email verification enforced **when** the business flow depends on proven email ownership; rate-limited and expiry-bound; email verified ≠ user authorization | Unverified account cannot exercise verified-only privileges; token replay/expiry fails |
| S06 — Passwords and auth | Delegate to vetted identity provider where feasible; if storing passwords use approved memory-hard KDF such as Argon2id with salt and current work factor, never general-purpose hashes/plaintext | Raw password absent from database/logs; wrong/reused/recovery inputs do not leak account identity |
| S07 — Secrets/config | Service-role/API secrets server-side only; no \`.env\`, service keys, access tokens or private configuration in repository, client bundles, logs, prompts or test fixtures. Audit tracked files **and history** if exposure is suspected; rotate exposed credentials | Build/static asset scan exposes no privileged key; committed secret → incident response, not merely \`.gitignore\` edit |
| S08 — Input/injection/XSS | Validate structured inputs at server trust boundary (types/ranges/length/allowed operations); parameterized SQL; output encoding and safe HTML handling; CSRF protection where relevant | SQL injection payload cannot change query structure; HTML payload cannot execute; malicious import/form rejected safely |
| S09 — CORS/origins | Allow only known origins as needed; credentials handling and CSRF separate from CORS | Untrusted origin denied where relevant; request forging still fails even if CORS header is absent or manipulated |
| S10 — Upload security | Limit type, content, count, size and path; validate actual bytes/magic when applicable, protect object access, isolate/quarantine/untrusted files; remove unsafe metadata where needed | Invalid/oversized/polyglot file rejected; user cannot fetch another tenant's maintenance evidence |
| S11 — Webhooks | Verify authenticated signatures/HMAC over raw body according to provider specification, reject stale/replayed callbacks, process idempotently, never trust browser redirect as payment settlement | Forged/replayed payment webhook cannot mark invoice paid, enable entitlement or modify funds |
| S12 — Abuse controls | Per identity/IP/resource rate limits, quotas, lockout/abuse response proportionate to login, quotes, password reset, external integrations | Repeat unauthorized or high-rate requests are throttled without denying legitimate unrelated tenants |
| S13 — Logging/privacy | Retain actionable audit metadata with access restrictions, sanitized logs, appropriate retention; no passwords, tokens, payment instruments, site-sensitive data or personal records in ordinary logs | Crafted secret-bearing request cannot expose secret in errors, telemetry, exports or CI artifact |
| S14 — Production config | No public debug consoles, verbose exception traces, unsafe test accounts or permissive development flags in release; preserve operational audit logs needed for incidents | Production-mode request does not reveal internal traces; security event still generates auditable redacted signal |
| S15 — Supply chain | Pin/review dependencies, license, update strategy, build provenance, vulnerability notices and safe upgrade/rollback; avoid updating everything on sight | Unsafe upgrade cannot silently bypass tests; a dependency advisory triggers scoped remediation |
| S16 — Offline/sync | Local-first copies, exports, caches and sync queues maintain per-role access, at-rest safeguards as applicable, conflict visibility and revocation limits | Offline user cannot escalate role by editing a local flag; revoked/duplicate queued write cannot later replay unauthorized |
| S17 — Release/agents | AI agents cannot self-approve production/payment/auth changes; explicit approvals and actual verified tests | Unauthorized tool call/deploy is blocked; no "COMPLETE" with missing test, reviewer or permission evidence |

**Nuance corrections to the social-video list:** A \`.gitignore\` entry does not erase already committed secrets. CORS is not authentication/authorization. Email verification is not access control. A secure cookie alone does not resolve XSS or CSRF. RLS requires effective grants, policies and tests; server-side service-role access intentionally bypasses RLS and must not be exposed to browser clients. Disabling production debugging does not mean losing appropriate security event logging. Updating dependencies blindly is not safe patch management.

## 4. FDG prioritized application test suites / gap triage

**A. FDG Business Platform — priority P0 for any client-facing/paid branch use.** Past founder records flagged Supabase public tables with RLS disabled and disconnected demo operating-module data. This is a **historical risk report requiring current live verification**, not a fresh database test in this document.

- Inventory actual exposed schemas, granted roles, tables/views/RPCs/storage, paid entitlement model, tenant/business/branch IDs and profile/owner/admin roles.
- Verify RLS and GRANTs on *every* exposed business-owned table; test signed-out, unrelated account, same business/wrong branch, payroll/operator role (if relevant) and owner/admin actions, for read/write/export and client data.
- Reconcile real sign-in → branch subscription → authorized module read/write → billable action; reject demo placeholders showing as live. Validate webhook settlement and finance authority before any paid activation.
- Gate: no production client-data or payment launch until these controls **actually pass** in an authorized test environment. Database fixes need migration/downtime/recovery planning and separate approval.

**B. FBPOIS / FWIS / FMIS — offline plant operations.** Capture and sync of engineering records/photos, critical equipment state, technician vs engineer approval, facility boundary, conflict provenance, device loss and replay. Never trust offline client role alone; enforce server reconciliation and conflict review on reconnect; qualified engineering review of consequential conclusions.

**C. FSvIS Pilot 001 — private reporting service.** If using an assisted/manual service, avoid automatically claiming it needs production SaaS login. Secure source photos, maintenance evidence, client identities, local backups, acceptance records and engineering issue/revision trail. Real client files must not be committed to public GitHub or shared with unapproved LLM providers.

**D. FDG Solar Visayas / business verticals.** Validate quote calculations and tamper-resistant scope/version, customer uploads, form spam, owner price controls, sensitive utility bills, opt-in location and billing terms; no public API keys granting admin rights.

## 5. Portable work card for Claude Code, Codex and all collaborators

Use as a **bounded, project-specific task**, not a general request to replace the entire application:

\`\`\`text
FDG SECURITY REVIEW — FSIS-0803
OWNER / FPJIS WORK PACKAGE: <specific project and approved boundaries>
CANONICAL CODE BASE: <repo branch, head SHA and exact paths>
DATA CLASSIFICATION / TRUST BOUNDARY: <roles, tenant/branch, sensitive records>
SECURITY RISKS IN SCOPE: <S01..S17 applicable IDs>
PRE-EXISTING CONTROLS: <source-backed, not guessed>
THREATS / NEGATIVE TESTS: <exact unauthorized and bad-input cases>
ALLOWED CHANGES: <owned, reversible files/migrations only>
PROHIBITED CHANGES: <production secrets, global auth, payments, deployment unless authorized>
EVIDENCE: <actual test commands, result, migrations, logs redacted, failed/unrun>
SECOND REVIEW / AUTHORITY: <reviewer and final acceptance owner>
DISPOSITION: PASS / FAIL / NOT TESTED / BLOCKED
NEXT ACTION: <smallest authorized fix, or escalation>
\`\`\`

**Execution rule:** when the assigned scope authorizes safe low-risk repair and the contributor owns files, repair reproducible issues and run regression. For privileged RLS grants, schema migrations, destructive data changes, payment/auth systems, production secrets and releases: plan, test in isolated environment, review with FSIS/FPJIS and obtain necessary approval. Never alter someone else's branch to make an audit look complete. **Do not run massive unaudited vulnerability scanners or third-party upload services on private code by default**.

### Reference: Anthropic Claude Code security reviewer

- Local Claude Code (if feature available and user environment authorized): \`/security-review\`. Treat findings as **leads to reproduce**, not automatic fixes or evidence of a secure production app.
- Anthropic GitHub Action at https://github.com/anthropics/claude-code-security-review is **optional**; no workflow created/activated by this document.
- At 2026-10-22 read-back, its README specifically states the action is **not hardened against prompt injection** and recommends trusted pull requests or requiring maintainer approval for external PR workflows. It uses an Anthropic API secret and may incur charges. Never copy the README \`@main\` action sample straight into production; pin reviewed immutable SHA, constrain GitHub token permissions and egress, approve the expense, guard fork PRs and verify no secret access by untrusted contributors.
- **Review coverage caveat:** the Anthropic tool's default false-positive filter may exclude rate-limiting and resource-exhaustion issues, among others. This is another reason to keep the explicit S12 tests and independent review. A clean automated scan does not make the product secure.
- For Codex/other collaborators: use an available scoped security reviewer or manual threat-based test matrix; preserve provider-neutral test evidence. Do not invent a \`/security-review\` command where unsupported.

## 6. Required reproducible acceptance receipt

| Field | Required value |
| --- | --- |
| scope/commit | Specific application, branch SHA, changed file list; no global "all FDG secure" claims |
| controls tested | S01..S17 applicable IDs, not applicable rationale, and explicit not tested items |
| test identity | Anonymous, authenticated wrong tenant/branch, restricted staff, admin and bad-input fixtures as applicable |
| observed results | Pass/fail with command, timestamp, test environment and sanitized log references |
| review and remediation | Responsible worker, independent security reviewer, found defects and regression proofs |
| residual risk | Impact, likelihood, owner, mitigation/expiry and whether blocking |
| release gate | Separate authority, environment and rollback plan; no automatic promotion from doc |
| evidence class | Actual local integration/DB evidence (A), source-based plan (candidate), or unverified assertion |

**Release block conditions (material scope):** untested or failed tenant isolation, RLS/grants authorization bypass, real credential exposure, incorrect payment webhook/entitlement authorization, arbitrary file access, critical injection, unverified high-risk data export or missing accountable release approval. Isolate/triage S1 severity first; **stop affected release, not unrelated previously accepted work**.

The current document is a research-derived reference and portable task specification. Its existence is NOT an implementation, security audit, passing test, operating CLI integration, installed plugin, revised Supabase policies, production build or secured customer account.
