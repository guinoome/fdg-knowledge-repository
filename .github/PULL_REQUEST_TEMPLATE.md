# FDG change review — source, implementation, acceptance

> Keep this short. This checklist is **a reviewer aid, not an automatic branch-protection gate**. Use `N/A (reason)` for irrelevant items. Do not rewrite previous approved project deliverables to complete a form.

## Outcome and ownership
- **Task / FPJIS work-package ID:** 
- **User-visible outcome / defect:** 
- **Existing code reused; changed file scope and collaborator owner:** 
- **Current source base SHA / resulting commit:** 

## Source-to-build check (mandatory for materially changed behavior)
- [ ] I checked the current canonical requirements and any **material earlier founder decisions, user-supplied references, or relevant unmerged branch changes**.
- **Approved requirement/decision link(s) and originating reference/source locator:** 
- **GitHub state:** `VERIFIED_MAIN / ON_BRANCH / EXTRACTED_NOT_ADOPTED / SOURCE_UNREVIEWED / N/A`. Exact path and commit:
- **Unresolved material conflict:** `NONE / BLOCKED (issue/link and owner)`.
- [ ] The changed scope has defined inputs, outputs, permissions, offline/recovery/error behavior as applicable; no invented engineering, legal, financial or operational rule.

## Proof of implementation
- **Artifact, exact build or changed source:** 
- **Tests actually executed (command, environment, observed result, evidence):**
- **Tests not run / known limitations:** 
- **Independent or qualified user acceptance:** `PENDING / ACCEPTED (identity, scope, evidence) / N/A (reason)`.
- [ ] I have not called this feature `COMPLETE` based solely on code, screenshots, architecture, historical tests, or self-review.

## Knowledge return
- **Existing canonical domain file / FPJIS manifest updated, or reason N/A:**
- **Commit read-back / verified Obsidian wikilinks:** 
- **Remaining blocked work and next permitted action:**

**Reviewer gate:** If a materially relevant source-to-requirement edge is unresolved, do **not** approve the *affected* build. Preserve unaffected accepted code. If functional acceptance is pending, report its true stage—not COMPLETE.

Canonical sources: [Knowledge Capture](../blob/main/04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD.md) · [Requirements Views](../blob/main/20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard.md) · [Historic Coverage](../blob/main/04_Knowledge_Management/FDG-HIST-0001%20-%20Historical%20Conversation%20and%20Reference%20Reconciliation%20Handover%202026-10-19.md).

## Security impact and reproducible negative tests

- **Security scope:** `NONE (reason) / FSIS-0803 controls S01–S17 applicable: <IDs>`.
- **Trust boundaries/roles affected (anon, customer, branch, admin, offline, service role):**
- **Before/after allow-deny tests executed (command, environment, result); not-run and negative cases:**
- **Secrets, logs, attachments, webhook/payment handling and dependency changes reviewed (or N/A):**
- **Independent reviewer, residual/blocking risk and exact release decision:**
- **Source reference:** [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803]]. This is a **review aid only**; not automated GitHub CI/branch enforcement. A no-findings automated scan is not proof of security.

## Client data prevention and recovery verification — 2026-10-23

- **FSIS-0804 CDB-01–10 applicable / N/A / blocked with evidence:**
- **Anonymous, wrong tenant, branch, role, revoked-session and API/storage tests actually run:**
- **If Supabase: GRANTs, RLS, views/RPC/storage access tests, environment and results:**
- **Secrets/redacted logs, signed payments, backup and isolated restore evidence:**
- **Independent reviewer, residual risk, human release decision and rollback:**
- **Gate:** SECURITY_RELEASE_BLOCKED / TESTED_CANDIDATE / OWNER_APPROVED_WITH_EVIDENCE.

See [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0804 - Client Data Breach Prevention and Recovery Release Gate|FSIS-0804 Client Data Security Gate]]. PR template is not automated branch protection or a running test.
