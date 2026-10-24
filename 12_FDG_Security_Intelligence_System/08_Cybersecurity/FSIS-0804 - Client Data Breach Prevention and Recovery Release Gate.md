---
document_id: FSIS-0804
created: 2026-10-23
status: Draft release-gate extension; no live system audited or changed
owner: FSIS cybersecurity
source_media: User-provided 1000011718.mp4 (101.35 seconds)
scope: all FDG coding collaborators and customer-facing applications
---

# FSIS-0804 — Client Data Breach Prevention and Recovery Gate

Knowledge path: [[FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|FSIS]] → [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0800 - Cybersecurity Master Index|FSIS Cybersecurity]] → this document.

## Origin / CORE and evidence

The founder-shared security awareness video depicts a speaker commenting on a social-media story: someone using vibe coding reportedly lost client data after a hack. **The claimed incident is not independently verified and was not an incident involving FDG.** The video emphasizes protected admin routes, server-side authorization, API/token secrecy, environment files, secrets in logs, safe file uploads, security headers and dependencies. These are useful controls but not proof that any particular site is secure.

**This extends, rather than duplicates, [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803]] (S01–S17).** It adds a precise, evidence-backed **NO CUSTOMER-DATA LAUNCH** gate and actionable recovery path. There is no such thing as absolutely unhackable software; our standard is measurable risk reduction, tenant isolation, restricted blast radius, detection, incident response and recovery.

Sources confirmed 2026-10-23:
- OWASP ASVS 5.0 application security verification: https://asvs.owasp.org/
- Supabase RLS + object grants, views and service-role caveats: https://supabase.com/docs/guides/database/postgres/row-level-security
- OWASP Secrets Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- OWASP Logging: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html
- OWASP HTTP Headers: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

## Client-data release stop conditions (CDB-01 to CDB-10)

A customer-data / paid-branch / private engineering data release **is not ready** unless all applicable items have recent, actual, reproducible evidence, or an appropriately documented not-applicable rationale. An AI claim, green checklist or scanner output alone does not establish secure behavior.

| ID | Acceptance proof required | Fail / negative test |
| --- | --- | --- |
| CDB-01 | Admin and sensitive API actions have real server-side authorization per user/resource/action | Client-forged role, manual admin URL/API call or hidden-button bypass must fail |
| CDB-02 | Synthetic User A/Business A/Branch A vs User B/Business B/Branch B allow/deny tests for read, create, update, delete, export and media access | Known other-tenant ID, storage path, API filter, queued offline write or changed tenant parameter must not expose data |
| CDB-03 | For each Supabase-exposed schema, enumerate privileges (GRANTs), enabled RLS, operation policies, views, RPCs/functions, storage and server-side bypass roles; execute actual role-based tests | RLS toggle alone, blanket authenticated access, insecure SECURITY DEFINER, public view/bucket or leaked service secret → BLOCK |
| CDB-04 | Trusted server-side account identity, role/membership claims, session expiration/revocation, MFA where risk justifies it, recovery abuse controls | Forged/stale JWT, removed membership, user-editable metadata, unverified or revoked session does not retain privilege |
| CDB-05 | Service/admin/payment signing secrets never in browser, git/history, chat prompts, public bundles, logs or screenshots; verified rotation/revocation procedure | Secret key, service role, private token or production credential exposure → incident triage and release block |
| CDB-06 | Parameterized SQL, typed server validation, safe HTML output, scoped upload paths/file validation, signed and idempotent payment webhooks, response headers and rate limits as applicable | Injection, script payload, upload traversal, fabricated webhook or repeated abusive request cannot alter private or paid state |
| CDB-07 | Sensitive data minimized; encrypted/protected backups as needed; retention, RPO/RTO and isolated **test restoration with access-denial checks** recorded | Backup configured but never restored, publicly reachable backup, restored tenant leak or unapproved data export → BLOCK |
| CDB-08 | Redacted security logs, anomaly detection/escalation owner, ability to preserve forensic evidence and rapidly restrict abusive sessions/keys | Sensitive data in logs or no viable incident response path |
| CDB-09 | Lockfile/dependency and build integrity review, signed/scoped integrations, controlled agent/skill execution and approval boundaries | Third-party agent/package alters RLS, credentials, production or exports customer data without authorization |
| CDB-10 | Exact code SHA, actual command/log and test outputs, independent security review for high-risk scopes, FPJIS owner release decision and rollback | Only written plans, auto-review summary, screenshots or green badges; no accountable release approver |

**If missing:** label the *affected* product or release SECURITY_RELEASE_BLOCKED; preserve other unrelated accepted work. If no testing was run, use NOT_TESTED, not PASS. Never replace tests with model assurance.

### Supabase implementation traps (verify current application first)

- Access depends on **both SQL GRANT privileges and RLS policies**. A bare authenticated role is authentication, not ownership. Test anon and authenticated roles for SELECT/INSERT/UPDATE/DELETE in exposed schemas, plus tenant membership/branch boundaries.
- Never expose service_role/new secret keys in a frontend, environment variable published to browser or public bundle. Properly configured server-side administrative access bypasses ordinary RLS; the backend must enforce authorization.
- User-editable user metadata is not a trustworthy admin claim. Membership changes and removed user sessions may not invalidate all issued tokens immediately. Design checks appropriate to the sensitive action.
- Views may bypass RLS depending on their owner/security mode; SECURITY DEFINER RPCs, function EXECUTE grants and Storage bucket policies can create indirect exposure paths.
- No blanket RLS migration, broad grants, silent data writes or production fixes without exact schema review, backup, test fixture, scoped approval and recovery plan. Use current Supabase CLI/docs and execute actual policy tests when authorized.

## FDG risk-priority routing

**P0: FDG Business Platform before real customers, subscriptions and paid branches.** Previous FDG records reported potentially public Supabase tables with RLS disabled and unfinished tenant module/entitlement integration. Treat as a **historic report requiring live read-only verification**, not a proven fresh vulnerability. Inventory auth, tables, schemas, GRANTs, policies, views/RPC, storage, paid entitlement and webhook surfaces, then construct synthetic cross-business/branch negative tests before approving commercial release.

**P0: FBPOIS/FWIS/FMIS before new private site evidence onboarding.** Technician vs engineer roles, facility boundaries, asset images/operating vulnerabilities, offline cache on lost/shared phones, revoked user sync retries, audit evidence retention, report exports and local/server backups.

**P1: FDG Payroll, solar quotations, client maintenance reporting, trucking and other paid verticals.** Protect payroll/ID data, quotes/payment states, utility bills, client report PDFs, service photos and operating permissions; no unreviewed transfer of files to external AI models.

## Cross-agent handover (Claude Code, Codex and other collaborators)

1. Read existing canonical FSIS-0803 and the actual project's FPJIS threat/data/architecture and source SHA. Identify customer identities, business/branch roles, API/file/DB/offline trust boundaries; classify sensitive data.
2. Collect a **read-only factual baseline** for relevant source, settings and database where access is authorized. No production data is copied to external models or public GitHub.
3. Define two synthetic tenants and accounts, allowed vs forbidden operations for every relevant surface and identity, plus expired/revoked sessions, invalid webhook/upload and wrong-branch cases.
4. Under separately authorized scope, execute and document negative plus positive tests. Fix the smallest confirmed gaps, with migration/data safety and rollback controls. Do not disable RLS to make a test pass.
5. Audit secrets, dependencies, safe headers and redacted logs; test backup **restore into isolated approved environment** and verify both integrity and privacy. No client-data backup export without explicit permission.
6. Have an independent qualified reviewer examine important auth/tenant/billing/storage fixes; record remaining risks and operational owner.
7. Return exact commands, observed results, test dataset, commit, test failures, owner decision and affected module status; require authorized FPJIS release/deployment gate. Security review text alone is not evidence.

### Required receipt

- FDG-CLIENT-SECURITY: NOT_TESTED / SECURITY_RELEASE_BLOCKED / TESTED_CANDIDATE / OWNER_APPROVED_WITH_EVIDENCE
- Product/branch/tenant/scope, code SHA, environment and authorized data fixture
- Applicable CDB-01–10 and FSIS-0803 S01–17, actual test commands/results and unrun cases
- Role-by-role API/DB/storage/RPC allow-deny matrix, RLS+GRANT tests and cross-tenant outcomes
- Protected secrets, sessions, headers, uploads, payments/webhooks, dependency findings
- Verified backup/restore outcome (when applicable), RPO/RTO, file and log privacy controls
- Independent reviewer, residual risk and exact separate release approval/rollback
- FDG-SYNC and source-to-requirement traceability evidence

## When a real incident is suspected

Follow [[12_FDG_Security_Intelligence_System/11_Incident_Response/FSIS-1102 - Client Data Exposure Containment and Restoration Playbook|FSIS-1102]], not an uncontrolled AI coding/refactor loop. Immediately protect evidence, scope the affected client systems, contain harmful access via authorized responders and assess notification obligations through FLIS.

**Authored knowledge only:** No live database, website, project source, deployment, credential or client's data was accessed, tested or changed to create this document.

## Critical runtime patch and emergency isolation — 2026-10-24

At the discovery of a critical remote-execution dependency advisory, apply [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/19_Critical_Runtime_Patching_and_Graceful_Continuity_Handover_2026-10-24|FPJIS-CONT-3519 — Critical Patch & Continuity Gate]]: first determine whether the vulnerable component is **actually deployed** (direct, transitive, image, vendor service); triage source/vendor patch, test safe upgrade, and isolate affected public endpoints when safe patching is unavailable. Do not let availability pressure disable RLS or defer a proven urgent fix. Store actual security decisions and customer-data safeguards under this FSIS gate, operational rollout and RTO/RPO under FPJIS.

## Real-device Android test privilege and data capture — 2026-10-24

ARTEMIS mobile UI automation is security-sensitive: see [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/20_ARTEMIS_Real_Android_Device_Testing_and_Agent_Handover_2026-10-24|FPJIS-MOBILE-3520 ARTEMIS Android Testing]]. Only explicitly approved test device/app/account; restrict USB debugging, Accessibility Helper, credential entry, screenshots/logcat, external vision/model API and MCP actions. Require owner consent and no banking/OTP/production customer export. Never grant global MCP or phone access from GitHub handover alone; device test content may be prompt-injection data.
