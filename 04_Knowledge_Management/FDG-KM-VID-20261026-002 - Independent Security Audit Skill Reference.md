# FDG video reference — independent security audit skill (2026-10-26)

**Status:** VIDEO_VISUALLY_REVIEWED / EXTERNAL_REPOS_AND_LICENSES_VERIFIED / SKILL_RUNTIME_UNVERIFIED / ADAPT_AUDIT_PATTERN / DOCUMENTATION_ONLY
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


## 2026-10-26 follow-up — independent upstream verification and the second security video

**Additional founder-provided source:** `1000012170.mp4`, 24.73 seconds, SHA-256 `ddb57bb810f708159beb602cb1d5ae39731b3453c85e4d4e2d66f92ffb40796a`; visual frames show the `claude-red` offensive-security SKILL.md collection on GitHub and sample vulnerability categories. The on-screen skill count and popularity are promotional/volatile, **not** an FDG inventory or effectiveness metric. No complete audio transcription, runtime audit or skills installation was performed.

**Upstream code and license independently checked via GitHub (2026-10-26):**
- [Cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill): repository exists, public, not archived; official README at inspected blob `c80305c88cd5087db37f76a0d230c1fc092c864c`; MIT LICENSE at blob `6dbc9ecb3a5b9080e95b962869e8c7ab16cfdc20` (Cloudflare, Inc. copyright). Its documented workflow has six phases: reconnaissance → coverage-led analysis → fresh validation → machine-readable findings with separate confirmed/needs-validation/rejected states → independent record check → target-neutral report. It supplies `report-schema.json`, `validate-findings.cjs` and `validate-coverage-ledger.cjs` (documented, **not executed** here). Its code, validators, tests, dependencies and actual tool privileges have **not been fully audited** for FDG adoption.
- [SnailSploit/claude-red](https://github.com/SnailSploit/claude-red): repository exists, public, not archived; README at blob `0858a54b75c0a29021e4ca7b7d69fbbee40c3bce`; MIT LICENSE at blob `53e4674a3e91df7b85c74e1bbf9f0fe37f8b2c8b` (SnailSploit / Kai Aizen copyright). The repo identifies itself as an **offensive** Claude skill library with categories spanning web/auth, cloud, mobile and infrastructure. This is **not an appropriate FDG default project-start auto-install**; specialized skills may expand credentials/network/attack permissions and should not run on hotel, customer or public systems without separate explicit scope and authorization.
- [OWASP ASVS 5.0.0](https://asvs.owasp.org/) is the verified stable application verification baseline for a future FDG security coverage ledger, not proof of compliance or certification.

**REUSE/EXTEND decision:** Existing FSIS/FAIS and FPJIS remain owners. **ADAPT** the Cloudflare *method* (declared scope, coverage ledger, constrained findings schema, fresh independent verifier, regression receipts) and selectively use the Claude-Red *attack-class headings* as a defensive threat-model checklist only. **Do not merge/install either upstream skill library** or transfer private repositories, credentials, access tokens, proprietary media or personal/guest records. Before any tool adoption, inspect actual skill instructions and code at a pinned commit, dependencies, rights, network/file privileges, prompt-injection exposure, action boundary and test harness.

**Specific proposed FDG defensive acceptance controls:** for a synthetic staging fixture, verify server-side authentication and role/tenant/branch access, RLS enforcement for each operation, session/token revocation, input/query parameterization, file/path restrictions, secret redaction, request limits, offline-sync conflict/replay and fail-closed approvals. Findings use `confirmed` only with independently reproducible safe evidence; `needs_validation` does not inherit a confirmed severity, and `rejected` preserves rationale. A finding is resolved only after approved remediation, negative/regression test execution and an independent read of the **patched** commit. Do not include weaponized payloads or live user data in public tickets.

**Readiness:** `EXTERNAL_REPO_IDENTITY_AND_LICENSE_VERIFIED / TECHNICAL_COMPATIBILITY_NOT_TESTED / REFERENCE_ONLY`. Earlier source-intake text above correctly described the **earlier** unverified state; this dated addendum supersedes that one verification limitation without rewriting the historical review. All actual security scans, bug fixes, skill installs, incident actions and production acceptance remain **NOT EXECUTED**.

**Related adjacent intake:** [[04_Knowledge_Management/FDG-KM-VID-20261026-003 - Agent Operations Workflow and Loop Engineering References|2026-10-26 multi-video agent/workflow extraction]].
