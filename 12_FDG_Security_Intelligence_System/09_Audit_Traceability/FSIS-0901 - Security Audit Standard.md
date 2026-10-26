# FSIS-0901 — Security Audit Standard

Audits should evaluate:

- whether access matches current work;
- whether classification is correct;
- whether restricted information is exposed;
- whether temporary access expired;
- whether security decisions are documented;
- whether important events are traceable;
- whether controls operate as designed.

Audit frequency should be risk-based rather than arbitrary.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/09_Audit_Traceability/FSIS-0900 - Audit and Traceability Master Index|FSIS-0900 - Audit and Traceability Master Index]] → this document

## Vulnerability audit evidence and verdict separation — 2026-10-26

**Supplemental execution methodology:** [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0806 - Cloudflare Security Audit Skill Reference and Evidence-Gated Audit Workflow|FSIS-0806]]. Apply only to an authorized codebase audit, supplementing baseline FSIS-0803; retain **FAIS** as independent audit/evidence owner, **FMCIS** as actual hunter/verifier dispatcher and **FPJIS** as requirement/fix/acceptance tracker.

A qualified vulnerability audit shall record the audited SHA, permitted scope and environment, principal/resource/control, trust boundary, deterministic coverage ledger (including DEFERRED/UNKNOWN areas), candidate fingerprint, evidence at exact source lines, bounded observed effect where safely authorized, fresh verifier decision, remediation owner, actual retest evidence and residual risk. Use **CONFIRMED** only for an established security invariant failure; **NEEDS_VALIDATION** for source-grounded unresolved deployment/identity/sandbox facts; **REJECTED** for independently disproved candidates. Do not give unverified leads fabricated severity or market completed audits as guaranteed security.

All target-controlled code tests require OS-enforced no-network, sanitized and restricted filesystem sandboxing; no production probing, client record extraction, secret disclosure or destructive availability testing without explicit separate authorization. Audit reports, patches and CI checks do not confer project release authority or replace actual regression/UAT. This is an extension of the existing audit standard, not a new parallel tool.
