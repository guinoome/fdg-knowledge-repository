Document ID:
FBIS-PLB-001

Document Type:
Business Playbook

Version:
1.0

Status:
Draft

Owner:
Francis

Approver:
Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes:
None

Source Authority (per NEX-STD-006):
Tier E — Exploratory Knowledge (AI-drafted; not yet validated or approved as organizational standard)

Related Documents:
- [[11_FDG_Business_Intelligence_System_Master_Index]]
- [[11_FDG_Business_Intelligence_System/12_Business_Playbooks/12_Business_Playbooks_Master_Index|12_Business_Playbooks_Master_Index]]
- [[01_Governance/NEX-STD-002_DOCUMENT_CONTROL|NEX-STD-002 Document Control Standard]]
- [[01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK|NEX-STD-006 Knowledge Governance Framework]]

---

# FBIS Domain Connectivity

- FBIS System: [[11_FDG_Business_Intelligence_System_Master_Index]]
- Domain: [[11_FDG_Business_Intelligence_System/12_Business_Playbooks/12_Business_Playbooks_Master_Index|12_Business_Playbooks_Master_Index]]

This document belongs to the 12_Business_Playbooks domain of FBIS per the domain's Connectivity Rule.

---

# FDG Workflow Automation — Engineering Loop Instructions

**Scope:** Inquiry-to-Proposal Automation (sellable module, applicable to FDG internal ops or client business)

---

## 0. Purpose

This document is the operating procedure for building, deploying, and maintaining any inquiry-to-proposal workflow automation, whether for FDG's own pipeline or as a delivered service to a client company. It follows the standard FDG engineering loop:

**DISCOVER → UNDERSTAND → PLAN → BUILD → TEST → VERIFY → IMPROVE KNOWLEDGE**

Every automation built under this SOP must produce evidence at each stage. No stage is skipped. No claim of "done" is made without verification.

---

## 1. Scope Boundary (read first)

- This loop applies only to the current work package (e.g., "Lead Intake Automation" or "Proposal Draft Generator"). Do not expand into adjacent modules (CRM stage automation, invoicing, etc.) unless the boundary is explicitly widened.
- Free/low-cost tools are the default (Google Sheets, Apps Script, Forms, n8n self-hosted, Zapier free tier). Paid APIs or recurring-cost services are flagged and confirmed before use.
- No black-box automation: every trigger, transformation, and output must be traceable to a rule a non-technical business owner can read and understand.

---

## 2. The Loop

### Stage 1 — DISCOVER
**Goal:** Understand the client's (or FDG's) actual current process before proposing anything.

Checklist:
- [ ] Map the existing inquiry-to-proposal flow as-is (channels used: FB, email, WhatsApp, walk-in, phone)
- [ ] Identify who touches the inquiry at each step and how long each step takes
- [ ] Identify the tools already in use (CRM, spreadsheets, messaging apps, accounting software)
- [ ] Identify volume (inquiries/week) and conversion rate if known
- [ ] Identify hard constraints (data privacy, existing contracts with software vendors, staff tech literacy)

Output: **As-Is Process Map** (one page, plain language, no automation yet)

---

### Stage 2 — UNDERSTAND
**Goal:** Identify the real bottleneck, not the assumed one.

Checklist:
- [ ] Where do leads actually go cold? (response time, missing follow-up, manual quote delay)
- [ ] What is the cost of the delay (lost deals/month, staff hours/week)?
- [ ] What does the client define as "success" for this automation? (faster response, fewer errors, less admin hours)
- [ ] Confirm which of the 10 FDG workflow automation modules applies (Lead Intake, Auto-Proposal, Site Visit Report, CRM Stage Automation, Follow-up Sequencing, Contract Trigger, Pricing Sync, Invoice-on-Milestone, FAQ Bot, Pipeline Dashboard)

Output: **Root-Cause Statement** — one sentence naming the actual bottleneck and the metric it affects. No solutioning yet.

---

### Stage 3 — PLAN
**Goal:** Design the automation against the confirmed root cause, using the simplest sufficient tool.

Checklist:
- [ ] Define trigger (form submission, new row, keyword in inbox, status change)
- [ ] Define transformation logic (what data moves, what gets calculated, what gets formatted)
- [ ] Define output (email draft, PDF proposal, CRM update, Slack/WhatsApp notification)
- [ ] Define failure handling (what happens if a field is missing, if the API fails, if a human needs to intervene)
- [ ] Confirm cost: free-tier feasible, or paid API required? Flag and get confirmation before proceeding.
- [ ] Confirm data ownership and where records live (client's own Drive/Sheet, not a third-party silo)

Output: **Automation Spec** — inputs, logic, outputs, failure modes, cost, owner of the data. This is the artifact the client signs off on before build.

---

### Stage 4 — BUILD
**Goal:** Implement exactly what was specced. No scope creep.

Checklist:
- [ ] Build in a sandbox/copy first — never directly in the client's live sheet or inbox
- [ ] Every automation rule documented inline (comments in Apps Script, named ranges in Sheets, labeled steps in n8n/Zapier)
- [ ] Version-controlled if code is involved (even a simple changelog in a text file counts)
- [ ] No hardcoded secrets/API keys in shared files

Output: **Working build in sandbox**, undeployed.

---

### Stage 5 — TEST
**Goal:** Break it before the client does.

Checklist:
- [ ] Test with real historical inquiry data (3–5 past examples minimum)
- [ ] Test edge cases: missing fields, duplicate submissions, non-English input, weekend/after-hours timing
- [ ] Test failure path: does it degrade gracefully or silently fail?
- [ ] Time the automation end-to-end and compare against the as-is baseline from Stage 1

Output: **Test log** — what was tested, what passed, what failed, what was fixed.

---

### Stage 6 — VERIFY
**Goal:** Confirm the automation actually solves the root cause named in Stage 2, in the client's live environment, with the client watching.

Checklist:
- [ ] Run one full live cycle with the client present or reviewing
- [ ] Confirm the metric from Stage 2 improved (response time, error rate, hours saved) — measure it, don't assume it
- [ ] Client explicitly confirms acceptance
- [ ] Document what was VERIFIED vs. what could NOT be verified (e.g., "email deliverability confirmed; long-term volume behavior not yet observed")

Output: **Verification Report** — evidence-based, no success claims without data.

---

### Stage 7 — IMPROVE KNOWLEDGE
**Goal:** This module becomes reusable FDG capability, not a one-off.

Checklist:
- [ ] Log the build pattern in the FDG Knowledge Repository (what worked, what tools, what constraints applied)
- [ ] If a better approach was found mid-build, mark the old pattern as superseded — do not delete it
- [ ] Note any client-specific customization separately from the reusable core pattern
- [ ] Record deferred improvements (things noticed but out of current scope) for future work packages

Output: **Repository update** — reusable pattern + client-specific notes, provenance preserved.

---

## 3. Delivery Package (what the client receives)

1. As-Is Process Map (Stage 1)
2. Root-Cause Statement (Stage 2)
3. Automation Spec, signed off (Stage 3)
4. Working automation, deployed in their environment (Stage 4)
5. Test log (Stage 5)
6. Verification Report with before/after metric (Stage 6)
7. One-page "How it works" plain-language doc + handoff/training note (so the client isn't locked into FDG)

## 4. Non-Negotiables

- No claim of "automated" without a passing Verification Report.
- No paid tool/API introduced without explicit client confirmation of the recurring cost.
- No client data leaves their own storage (Drive, Sheets, CRM) into a third-party silo without written consent.
- No silent scope expansion — if Stage 2 reveals a bigger problem than the work package covers, name it and propose it as a separate module, don't absorb it.

---

## 5. Governance Note (per NEX-STD-006)

This document is AI-drafted (Tier E — Exploratory Knowledge) and is **Draft** status. It has not undergone Engineering Review or Approval per NEX-STD-002. It shall not be treated as an approved organizational standard until reviewed and explicitly approved by Francis, with Status updated to Approved and Effective Date set accordingly.

---

*FDG Ecosystem — Engineering-first, evidence-based. Reusable for internal FDG operations or as a delivered client engagement SOP.*

End of Playbook
