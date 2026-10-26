---
document_id: FSIS-0806
title: Cloudflare Security Audit Skill — Evidence-Gated Security Review Reference
status: EXTERNAL_SOURCE_VERIFIED / ADAPT_AUDIT_METHOD / NOT_INSTALLED / NOT_RUN
reference_review_date: 2026-10-26
owner: FSIS — cybersecurity and secure development
independent_assurance: FAIS
work_packages_and_acceptance: FPJIS
collaborator_dispatch: FMCIS
source_video_private: 1000012171.mp4
source_video_sha256: d98cc914572ace2cfa8b1ef5108096e518c46530f4f7e97f87dc6135c83c2a79
source_video_duration_seconds: 49.79
external_repository: https://github.com/cloudflare/security-audit-skill
external_repo_pin: c1c8a8c1471069fb0e188eeaff69b8e8db6564a8
external_license: MIT
runtime_installation: none
fdg_repository_code_import: none
fdg_security_scan_performed: false
---

# FSIS-0806 — Cloudflare Security Audit Skill: FDG applicability and controlled verification

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0800 - Cybersecurity Master Index|FSIS Cybersecurity]] → this external security-method reference.

## 1. Evidence provenance and source limitations

**Founder-supplied video:** Private `1000012171.mp4` (49.79 seconds, 720×1280 H.264/AAC), visually reviewed 2026-10-26. The visible material shows a security incident illustration, a GitHub page titled `cloudflare/security-audit-skill`, an agent skills installation terminal, an architecture with front end/API/database/auth, separated hunter/verifier roles, and a sample report showing **“2 confirmed findings.”** The video’s example credentials and leak references must not be treated as real FDG client records or evidence of a FDG incident. Audio was not comprehensively transcribed. Neither a video testimonial nor a visually displayed report establishes validated findings in FDG.

**Verified original source:** Cloudflare's [README](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md), [skill](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/SKILL.md), [reconnaissance](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/RECONNAISSANCE.md), [hunting](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/HUNTING.md), [validation](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/VALIDATION-AND-REPORTING.md) and [MIT license](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/LICENSE). Inspected repository main at **`c1c8a8c1471069fb0e188eeaff69b8e8db6564a8`** (last listed commit September 14, 2026); its untruncated recursive tree contains **24 entries**, including JSON schema and Node validators. MIT means reuse is possible **subject to the copyright and license notice requirements**; do not assume every dependency, third-party tool or target software shares that license. **No upstream skill code installed, copied or executed** here.

## 2. Distinct capability, no new FDG security engine

The original Cloudflare method provides six auditable steps: **(1) source reconnaissance; (2) coverage-led hunting with isolated specialist tasks; (3) fresh candidate verifier attempts to disprove each finding; (4) structured findings `confirmed` / `needs_validation` / `rejected`; (5) independent final record verification; (6) evidence-derived reports.** See [README](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/README.md). Their full-audit mode distinguishes security questions/guidance from an explicitly requested complete codebase audit. Repeat runs compare coverage and revisit changed code; a prior green run is not perpetual proof.

**Fit to FDG governance:**
- **FSIS-0802** retains secure-development control authority; **FSIS-0803** owns S01–S17 testable agent-generated application security controls; **FSIS-0804/0805** retain release, tenant-data and session-revocation requirements. This document adds a **discovery/verification methodology**, not a rival checklist.
- **FMCIS** dispatches real bounded hunters and an *independent verifier* on source-pinned work packages; availability must be confirmed. A reviewer cannot validate their own proposed finding by rephrasing the same claim. No fictitious agent dispatch.
- **FAIS** owns the independently assessed audit evidence, coverage gaps, findings and corrective-action verification. **FPJIS** binds accepted defects and negative regression tests to the affected implementation and owner approval. **FSIS/FLIS** control privacy, external tools, incident policy and license.
- Existing [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803]] and [[12_FDG_Security_Intelligence_System/09_Audit_Traceability/FSIS-0901 - Security Audit Standard|FSIS-0901]] remain authoritative where already approved.

## 3. FDG evidence-gated application-security audit — enhanced reusable playbook

**0. Authorization and scope** — Confirm the exact FDG-owned repo or explicitly authorized client target; current commit/diff, permitted branches, data classification, authorized user, scope directories and prohibited targets. **Default source review only.** Never probe third-party sites or real client systems, cloud accounts, infrastructure, production APIs, availability, real credentials or secret stores merely because the repo is visible. Obtain separate permission for runtime security tests, deployment actions, external calls or aggressive fuzzing.

**1. Reconnaissance** — Record source SHA, stack/dependencies, system entry points (UI, API, RPC, webhook, CLI, PWA, desktop/mobile, offline sync), principals (anonymous, authenticated, tenant/branch, technician, supervisor, manager, finance/admin), assets/data, trust boundaries and each critical write/read/approval path. Explicitly map **code authority vs server vs DB/RLS vs external provider** and deployment assumptions that source alone cannot prove.

**2. Deterministic coverage ledger** — Create *per-run, private, redacted* review rows with stable `coverage_id`, subsystem, path/ref, trust boundary, failure hypothesis, reviewer, evidence source, state (`planned`, `in_progress`, `candidate`, `verified`, `deferred` or `out_of_scope`), reason and test environment. Coverage of one public endpoint does not certify entire application. Revisit changed branches and prior unresolved items; prioritize lowest-trust entry points and sensitive client/financial/engineering records. No invented audit completeness percentage.

**3. Bounded hunting** — Dispatch low-cost suitable, qualified source reviewers for their *assigned scope* through FMCIS, preserving file ownership. Source exploration is read-only. If safe runtime fixtures are explicitly authorized and available, exercise narrowly scoped dummy-tenant/anonymous/service-account negative tests, not destructive exploitation. Focus on:
- **FDG Business Platform/Supabase:** table GRANT and RLS behavior, service-role bypass, signup/recovery, tenant+branch subscription entitlement, PayMongo webhook signature and replay, customer data exports, client-side-only role controls, PWA caches, backup/restore.
- **FBPOIS/FMIS/FWIS:** actorless WO/PM closure, qualified engineering approvals, property/asset isolation, technician evidence and e-signature, cross-facility tagging, OOO/OOS controls independent of PM closure, queued-offline stale permissions/revocations, conflict and replay handling.
- **FDG Payroll:** single HR Head approval and preparer independence, authorized adjustments/reversals, salary/ID protection, backup keys, workstation and LAN/IPC rights, offline endpoint trust.
- **FEIS calculators/QTO/solar:** trusted source/calculation and signed output versus uploaded spreadsheets/files, unsafe formula or file parsers, tampered quotation approvals and provenance.
- **FMCIS/Nex and external adapters:** prompt injection across retrieved documents, memory/tenant leakage, tool permission escalation, forged agent messages, user confirmation not bound to real arguments, source-file poisoning and supply-chain dependencies.
- **Deployment/release:** secrets, dependencies/SBOM, CI action permissions, provenance/signing, unverified branch-only specifications, release rollback and local-first availability; resource exhaustion and unexpected paid API spend.
These are **review surfaces**, not claims that FDG currently has every listed vulnerability. Use only applicable checks for each product.

**4. Candidate evidence and verdict** — Each suspected issue includes a unique fingerprint, exact code path and line at SHA, actual trust boundary, expected security invariant, attacker/principal/resources, local reproduction (if safely authorized), observed result, effective protection/compensating controls, remediation proposal and **explicit verification status**:
- `CONFIRMED` only when a complete realistic source trace plus safely observed bounded result establishes unauthorized data/action/availability impact. Record impact-based severity.
- `NEEDS_VALIDATION` when evidence lacks the decisive runtime, RLS, provider, identity, environment or sandbox fact. Record exact missing fact and safe validation procedure; **do not assign unearned severity**.
- `REJECTED` when independent source/test analysis disproves the boundary failure. A missing secondary check with an effective primary boundary may be a hardening observation rather than an exploitable issue.
Never classify an alarming screenshot, assistant speculation or stale scanner output as `CONFIRMED`.

**5. Independent verifier and report integrity** — Distinct agent/engineer reopens the exact source at the audited SHA, challenges assumptions, confirms negative fixtures and local observations, and can demote/reject a candidate. Then an independently owned FAIS evidence record or private `findings.json`/coverage ledger and `REPORT.md` may be created. Cloudflare upstream ships [finding schema](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/report-schema.json) and zero-dependency Node validators for this, but **they were NOT installed or executed by this reference intake**. Do not copy upstream code into FDG without change review and MIT notice handling. Reports must omit secrets, private client rows, raw token dumps and exploit details that could endanger shared deployments.

**6. Minimal fix, retest, accept and re-audit** — For a supported confirmed issue, make one owner-approved bounded fix, run tests of previous exploit **and allowed behavior**, repeat cross-tenant/role deny checks, test offline/restart/revocation where relevant, verify no new regression and record rollback plan. Independent reviewer validates exact post-fix SHA. FSIS may declare **security issue addressed in scoped build**; FPJIS + actual qualified project owner still control full product/release acceptance. A completed audit report does not equal a vulnerability fix or a secure product.

## 4. Mandatory execution isolation (Cloudflare source requirement; FDG enhancement)

Cloudflare's [SKILL.md](https://github.com/cloudflare/security-audit-skill/blob/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8/skills/security-audit/SKILL.md) requires **OS-enforced isolation before running target-controlled code**, including *network disabled*, clean allowlisted environment, read-only target and toolchain, per-agent scratch-only writes, CPU/memory/process/disk/file-size/time quotas and separate retained artifacts. One agent cannot modify another's artifacts. Unsigned or malicious target scripts can compromise host environments; a prompt telling an agent to “be safe” is insufficient. If these cannot be enforced, **stay source-only / mark relevant run `NEEDS_VALIDATION`**. Do not execute `npx skills add`, install unpinned external dependencies or run downloaded scripts during this documentation-only intake.

For sensitive projects, use **ephemeral local clone with synthetic data**, explicit permitted scope, sanitized build environment, filtered logs and security-owner approval; disable external network even if a tool suggests scanning “your deployed URL.” Target code and generated artifacts are untrusted until independently reviewed; persistent files are transferred only with path/symlink/size checks to controlled retained evidence stores.

## 5. Candidate acceptance checklist (not automatically achieved)

| Acceptance ID | Required evidence | Review status at intake |
| --- | --- | --- |
| FSIS-SA-01 | Authorized project, exact SHA/branch, review scope and data-sensitivity permission | NOT_PERFORMED |
| FSIS-SA-02 | Complete scoped trust-boundary map and dated coverage ledger | NOT_PERFORMED |
| FSIS-SA-03 | Specialist work allocation/independent verifier with separate source inspection | NOT_PERFORMED |
| FSIS-SA-04 | Confirmed / needs-validation / rejected records conforming to versioned schema and evidence trace | NOT_PERFORMED |
| FSIS-SA-05 | Sandboxed negative test or explicit `NEEDS_VALIDATION` with missing sandbox control | NOT_PERFORMED |
| FSIS-SA-06 | One candidate independently challenged and dispositioned; impact severity supported | NOT_PERFORMED |
| FSIS-SA-07 | Smallest authorized fix has re-executed before/after denied+allowed case, actual test log and regression | NOT_PERFORMED |
| FSIS-SA-08 | FAIS audit receipt, residual-risk decision, FPJIS project signoff and release authorization | NOT_PERFORMED |

**Recommended first bounded FDG pilot:** Target the **existing synthetic/test FDG Business Platform tenant-and-branch isolation work** or **FMIS Issue #11 actorless WO closure** using source-only reconnaissance first. Pin the exact active source and authorized fixture. Test an actual lower-privilege/cross-property rejection only in an isolated environment when authorized. Do not claim this review can independently install security tooling, read live Supabase configuration, confirm production RLS or approve a branch merge. Existing PR #14/#16/#18 findings and project acceptance gates remain separately owned and open.

## 6. Explicit disposition and handover

`ADAPT_COVERAGE_LEDGER_AND_INDEPENDENT_VERIFICATION / EXTERNAL_MIT_REFERENCE_ONLY / NO_CODE_IMPORT / NO_TOOL_INSTALL / NO_SECURITY_TEST_EXECUTED / NO_VULNERABILITY_CONFIRMED`.

Capture Once, Reuse Everywhere: **FSIS** owns security invariant and test method; **FAIS** holds independent verification; **FPJIS** holds source→accepted requirement→fix→executed regression→qualified user acceptance; **FMCIS** orchestrates available leaf agents. Keep Codex/Claude vendor-independent through contracts, not copied vendor-specific commands.

An external project is a methodology benchmark only until a qualified authorized specialist actually executes and reviews a bounded FDG audit. Do **not** publish private audit artifacts or raw uploaded video in the public FDG knowledge repository.
