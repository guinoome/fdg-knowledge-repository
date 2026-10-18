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
