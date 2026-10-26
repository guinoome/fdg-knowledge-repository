# FDG video reference — independent security audit skill (2026-10-26)

**Status:** VIDEO_VISUALLY_REVIEWED / EXTERNAL_TOOL_UNVERIFIED / ADAPT_AUDIT_PATTERN / DOCUMENTATION_ONLY
**Private source:** user-provided `1000012171.mp4`, ~49.8 seconds. Video frames examined; no complete verified audio transcript. Do not publish original video, any illustrated tokens, user identities, or sample secrets.
**Visible lead:** GitHub screenshot of `cloudflare/security-audit-skill` described as a coding-agent skill for multi-phase security audits with independently verified, machine-readable findings. **Repository identity, code, license, actual effectiveness and compatibility are NOT independently verified in this intake.** No source code copied, package installed, external scanner executed, or FDG app scanned.

## What the video actually illustrates

A demonstration of a coding agent using a security-audit skill to inspect an example web app. It shows a sample API key in UI, user records, a Supabase-like authentication/database integration, SQL query interpolation flagged as injection, and a later parameterized query example. A task display illustrates parallel/specialist checks of data leakage, injection, file handling, access control, API, database, auth and frontend. A purported audit report and subsequent code edit appear, but there is no independent proof of real exploitation, completeness, zero residual vulnerabilities, or production acceptance.

## FDG enhancement — security audit as a governed verification loop

**Owner:** FDG security governance/FSIS and FAIS audit; FPJIS records defects and acceptance; FMCIS dispatches bounded reviewers. This is a reference to enrich existing controls, not a new security product or permission to scan third-party systems.

1. **Authorize and scope:** Record exact FDG-owned repository, branch/commit, deployment environment, tenant/branch, interfaces, data classification, owner permission and allowed test techniques. No probing external customer or production systems without explicit approval.
2. **Map attack surface and trust boundaries:** Account/authentication, role-to-tenant/branch mapping, Supabase RLS and exposed tables, REST endpoints, query builders, server functions, file uploads, local/offline sync, secrets, payments and privileged maintenance/engineering approvals. Verify whether authorization is enforced server-side rather than inferred from UI hiding.
3. **Independent specialized review:** Separate injection/query parameterization; broken object-level authorization/IDOR and RBAC; RLS and database grants; exposed secrets and logging; file upload/path traversal/decompression; dependency/lockfile/SBOM and licenses; CSRF/CORS/session/token management; XSS and prompt injection; sync replay/conflicts; operational logs, rate limits and data leakage. Use appropriate OWASP ASVS/API Security Top 10 and CWE classifications as reference, not a claim of certification.
4. **Evidence-based findings:** Record unique ID, affected component and exact commit, precondition, observed code/test evidence, reproducible **safe** proof in an authorized fixture, exploitability, affected tenant/data, severity and confidence, remediation owner and deadline. Redact secrets, personal records and exploit payloads from public reports. Distinguish confirmed, suspected, false positive, accepted risk and not tested.
5. **Correct the actual boundary:** Use parameterized queries rather than concatenated SQL, validate input, enforce authenticated per-object/per-tenant authorization and RLS, protect secrets server-side, and restrict upload handling. A code-looking patch in a video is not sufficient evidence; avoid auto-fixing unrelated files.
6. **Verify independently:** Run targeted positive/negative tests (cross-tenant and unauthorized user), regression suite, static/dependency scans, and safe isolated dynamic checks where authorized. Recheck exact patch commit and verify no legitimate workflows broke. Require independent review for material vulnerabilities.
7. **Release gate:** FPJIS ties source→finding→approved fix→code→actual tests→review→deployment/UAT. Critical exposure may require containment and credential rotation by authorized operators, not public disclosure of tokens. Do not mark issue closed until independently verified.

## Suggested first FDG acceptance scenario

**FDG Business Platform account/branch isolation and Supabase RLS** is a high-value bounded candidate, because user-facing authentication and operational demo roles can diverge. In a local/staging test database, create two synthetic tenants/branches and at least three roles (owner, staff, unauthorized). Assert that unauthenticated and cross-tenant SELECT/INSERT/UPDATE/DELETE and object-ID changes are denied, that legitimate authorized operations succeed, and that logs never expose credentials. Record table-by-table RLS state, grants, service-role usage and migration status. **These are proposed acceptance tests, not executed checks or a confirmed current vulnerability.**

**Related candidate:** FMIS work-order terminal-state authority and offline sync conflicts; existing Issue #11 and PR #18 evidence must be rechecked at exact revisions rather than treated as accepted production controls.

## Source and legal caution

- Candidate upstream: https://github.com/cloudflare/security-audit-skill (screenshot lead; repository and license not independently verified in this review).
- Consult primary OWASP guidance: https://owasp.org/www-project-application-security-verification-standard/ and https://owasp.org/API-Security/editions/2023/en/0x11-t10/.
- Any agent skill must be inspected as untrusted instructions/code, checked for tool privileges, outbound network requests, dependency supply-chain risks, data exfiltration and license before installation. A third-party skill cannot independently certify its own audit or authorize remediation.
- Keep local-first/offline-capable, agent-neutral, provider-replaceable operation and FDG ownership of evidence.

**Acceptance:** REFERENCE_CAPTURED only. No security audit run, no verified findings, no code remediation, no real user data touched, no application acceptance. A verified security assessment requires separate authorized execution and review.
