# KNOWLEDGE RETRIEVAL AND MEMORY STANDARD

Document ID: NEX-STD-054

Document Type: Intelligence Memory Governance Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-006 Knowledge Management Standard
- NEX-STD-046 Continuous Improvement Standard
- NEX-STD-053 Agent Context Architecture Standard
- NEX-STD-047 Nex Core Intelligence Architecture Standard

---

# Purpose

This standard defines how knowledge is captured, stored, retrieved, evaluated, and evolved within Nex Core Intelligence.

---

# Core Principle

Memory is not information storage.

Memory is preserved intelligence.

---

# Knowledge Definition

Knowledge is information that has:

- context
- meaning
- validation
- applicability
- future value

---

# Memory Objective

Nex memory exists to preserve:

- decisions
- reasoning
- engineering principles
- proven workflows
- lessons learned
- reusable solutions

---

# Memory Architecture

FDG uses a layered memory model.

```
                 Nex Intelligence

                       │

        ┌──────────────┼──────────────┐

        ▼              ▼              ▼

 Long-Term Memory   Operational   Working Memory

 Knowledge Base       Data          Current Task


```

---

# Memory Layers

## Layer 1 — Organizational Long-Term Memory

Primary purpose:

Preserve permanent intelligence.

Examples:

- approved standards
- engineering principles
- decision records
- validated methods
- lessons learned

Primary location:

FDG Knowledge Repository

---

# Layer 2 — Operational Memory

Purpose:

Maintain current operational information.

Examples:

- projects
- equipment
- schedules
- inventory
- calculations

Primary location:

Structured systems.

---

# Layer 3 — Working Memory

Purpose:

Support current execution.

Examples:

- active work package
- temporary analysis
- current assumptions
- immediate decisions

Characteristics:

Temporary.

Reviewed after completion.

---

# Memory Classification

Every knowledge item should be classified.

## Permanent Knowledge

Long-term organizational value.

Examples:

Standards.

Principles.

Approved methods.

---

## Decision Knowledge

Records why decisions were made.

Contains:

- previous state
- alternatives
- evidence
- conclusion
- impact

---

## Reference Knowledge

Useful external information.

Examples:

manuals

standards

technical references

---

## Temporary Knowledge

Useful only for current execution.

Examples:

drafts

temporary assumptions

working notes

---

# Knowledge Promotion Process

Temporary information does not automatically become permanent.

The lifecycle:

```
Observation

↓

Temporary Knowledge

↓

Review

↓

Validation

↓

Knowledge Promotion

↓

Permanent Intelligence
```

---

# Decision Memory Standard

Important decisions shall preserve:

## Decision

What was selected.

---

## Context

Why the decision existed.

---

## Alternatives

What options were considered.

---

## Evidence

What supported the decision.

---

## Tradeoffs

What was accepted or rejected.

---

## Future Review Condition

When reassessment may be required.

---

# Retrieval Principle

Nex should retrieve knowledge based on:

Relevance.

Authority.

Recency.

Context.

Applicability.

---

# Knowledge Priority Hierarchy

When sources conflict:

1. Current approved standards

2. Approved decision records

3. Validated project knowledge

4. External references

5. General information

---

# Memory Evolution

Knowledge shall evolve through:

```
New Evidence

↓

Review Existing Knowledge

↓

Compare

↓

Determine Impact

↓

Approve Evolution

↓

Update Version

```

---

# Obsolete Knowledge Management

Old knowledge shall not simply disappear.

It should be:

- archived
- marked superseded
- linked to replacement knowledge
- preserved for historical context

---

# Anti-Pattern Prevention

## Memory Accumulation

Saving everything without purpose.

---

## Memory Reset

Ignoring previous decisions.

---

## Context Pollution

Mixing temporary information with permanent knowledge.

---

## Decision Loss

Recording conclusions without reasoning.

---

## Duplicate Knowledge

Creating multiple competing versions.

---

# Responsibilities

## Francis

Approves permanent intelligence.

Confirms major evolution.

---

## Nex

Maintains knowledge continuity.

Identifies relevant knowledge.

Prevents unnecessary recreation.

---

## Collaborators

Capture validated lessons.

Provide evidence for improvement.

---

# Memory Quality Checklist

Before promoting knowledge:

✓ Has future value.

✓ Has clear context.

✓ Has validation.

✓ Has ownership.

✓ Has appropriate storage location.

✓ Does not duplicate existing knowledge.

---

# Governing Principle

The goal is not to create the largest memory.

The goal is to create the most useful intelligence.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document

## Chat memory is not repository persistence — 2026-10-19

The long-term organizational memory for FDG is **versioned canonical GitHub knowledge**, not an assistant's recall or a statement in chat that something was updated. Agents must use the [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020 same-session knowledge-return control]] to classify consequential FDG discussion, reconcile with existing ownership, apply authorized minimal amendments and **read back commit and file** before saying VERIFIED_MAIN. ChatGPT personalization memory and archived chat history do not by themselves satisfy GitHub source/requirement verification. On-branch and pending issue states do not count as fully synced to main. Private material remains outside the public repository unless an approved safe destination exists. Missing past content remains UNKNOWN until actually enumerated.

Before handing a build to an agent, honor the [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS source-to-build hard gate]]. An automated ChatGPT-to-GitHub listener **does not exist solely because this standard was adopted**; separate connected/runtime execution evidence is required.


## Controlled session-learning interpretation — 2026-10-26

**Founder reference:** [[04_Knowledge_Management/FDG-KM-VID-20261026-001 - Document Conversion and Controlled Session Learning|2026-10-26 two-video source review]], including a visually illustrated "Auto-Improving System" showing local session entries and JSONL files. Visible session retention alone is **not** demonstrated autonomous model improvement, software self-repair, or authorized production updating.

The existing memory evolution process is operationalized as a **reviewed improvement cycle**:

`observed task + source SHA + reproducible defect or validated positive outcome → candidate lesson → compare current approved knowledge/branch-only history → reviewer decision → fixed before/after tests + negative cases → versioned minimal patch → re-evaluation in the next authorized task`.

- **Capture:** Only task-relevant failures, effective solutions, reviewer corrections, conflicting decisions and reusable acceptance tests. Do not sweep entire Claude/Codex/ChatGPT transcripts into GitHub; session storage may contain credentials, private user text and external proprietary material.
- **Accuracy:** Record source trust and test quality. Count a lesson as validated only if it survived independent or qualified review and expected behavior in a reproducible case. Historical content and agent summary are not automatically authoritative.
- **Promotion:** Maintain `OBSERVED` / `PROPOSED` / `REVIEW_REQUIRED` / `APPROVED_FOR_SCOPE` / `REJECTED` / `SUPERSEDED`. Only reviewed lessons inform active collaborator instructions or patches; external references have lower priority than approved canonical records.
- **Rollback:** Preserve previous version, exact change, reason, tests and reversion procedure. Review whether a proposed improvement creates new security, legal, engineering or cost regressions.
- **Bounded metrics:** Repeat-defect rate, verified-context retrieval success, source-to-build drift prevention, independent review outcome and cost/time per accepted scoped task. Session or memory file count is not a performance metric.
- **Restrictions:** No automatic GitHub/chat-history access when connector lacks it; no self-granted permissions, unauthorized code deployments, hidden model/provider change, agent-written engineering authority or automatic adoption of external instructions. FDG remains local-first and agent/provider-replaceable.

NEX-STD-020 governs safe source intake and same-session GitHub return; FPJIS and human reviewers govern the acceptance chain. **Documented guidance only**: no watcher, self-improving daemon, source-ingestion software, agent training or connector installation is asserted.
