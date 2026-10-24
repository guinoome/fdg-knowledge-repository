# FSIS-0802 — Secure Development Baseline

Security requirements for FDG software should include:

- authentication where required;
- authorization at the service boundary;
- input validation;
- safe error handling;
- dependency control;
- secret separation;
- audit logging;
- backup/recovery;
- least privilege;
- security testing.

Security controls should be implemented according to the actual threat model and system scope.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0800 - Cybersecurity Master Index|FSIS-0800 - Cybersecurity Master Index]] → this document

## Agent-generated app security verification — 2026-10-22

Extend this baseline through [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803 — Agent-Generated Application Security Verification and Acceptance]]: video-derived checklist reconciled with OWASP, Supabase and Anthropic security-review documentation; cross-provider test matrix S01–S17 and concrete FDG Business Platform, FBPOIS and FSvIS risk examples. Treat the new document as a **draft implementation/acceptance reference**, not a superseding approved standard or a claim of tested security. Enforce actual server trust boundaries, negative tests, qualified review and separate release approval.

## JWT/session deletion video addendum — 2026-10-25

- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT Revocation and Account Deletion Gate]] extends this security baseline with Supabase-documented access-JWT validity after Auth user deletion/sign-out and negative testing of current user/session/tenant access. No production FDG security scan or RLS modification has occurred.
