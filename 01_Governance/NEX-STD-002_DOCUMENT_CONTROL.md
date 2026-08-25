# DOCUMENT CONTROL STANDARD

Document ID: NEX-STD-002

Document Type: Governance Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:
- [[00_Nex/REVIEW_PROTOCOL|NEX-STD-001 Review Protocol]] *(note: the target file's own header doesn't display "NEX-STD-001" — confirmed via this citation, not the file itself)*
- [[01_Governance/NEX-STD-003_DECISION_EVOLUTION_STANDARD|Decision Evolution Standard]]

---

# Purpose

This standard establishes the document governance process for the FDG Knowledge Repository.

Its objective is to ensure every approved document is controlled, traceable, versioned, reviewable, and continuously improved.

Nex Core shall operate as an engineering standards manual rather than a collection of notes.

---

# Scope

This standard applies to every controlled document within Nex Core, including:

- Governance Standards
- Identity Standards
- Agentic Framework Standards
- Knowledge Standards
- Templates
- Architecture Decision Records
- Engineering Standards

---

# Objectives

The document control process shall:

- Preserve organizational intelligence.
- Maintain a single approved baseline.
- Prevent uncontrolled modifications.
- Preserve revision history.
- Enable engineering traceability.
- Support continuous improvement.

---

# Document Metadata

Every controlled document shall contain the following metadata.

Document ID

Document Type

Version

Status

Owner

Approver

Effective Date

Last Reviewed

Next Review

Supersedes

Related Documents

---

# Document Status

Every document shall exist in one of the following states.

Draft

Work in progress.

May change without approval.

---

Review

Awaiting engineering review.

No implementation based on this version.

---

Approved

Current engineering baseline.

Authoritative reference.

---

Superseded

Replaced by a newer approved version.

Retained for historical traceability.

---

Archived

No longer maintained.

Preserved only for historical reference.

---

# Versioning Standard

Version numbers shall follow semantic governance.

Major Version

Increment when engineering direction fundamentally changes.

Example

1.0 → 2.0

---

Minor Version

Increment when approved capability expands without changing the overall architecture.

Example

1.0 → 1.1

---

Revision

Increment for editorial improvements or clarification.

Example

1.1.0 → 1.1.1

Editorial revisions shall not change engineering intent.

---

# Review and Approval Process

Every engineering standard follows the same lifecycle.

Proposal

↓

Engineering Review

↓

Review & Approval

↓

Approved Baseline

↓

Implementation

↓

Lessons Learned

↓

Controlled Evolution

---

# Change Categories

Changes shall be classified before approval.

Correction

Fixes an error.

---

Clarification

Improves wording.

No engineering impact.

---

Enhancement

Expands existing capability.

No architectural redesign.

---

Evolution

Improves the approved baseline based on validated evidence.

Requires engineering review.

---

Architectural Change

Changes core engineering direction.

Requires explicit Review & Approval before becoming the new baseline.

---

# Knowledge Authority

When conflicts exist, documents shall be evaluated in the following order.

1. Approved Nex Core Standards

2. Approved Engineering Standards

3. Approved Architecture Decisions

4. FDG Knowledge Repository

5. Current Working Documents

6. Current Conversation

7. External References

---

# Superseded Documents

Superseded documents shall never be deleted.

They shall:

- remain version controlled
- remain searchable
- preserve historical context
- reference the replacing document

Organizational intelligence must evolve without losing history.

---

# Naming Convention

Document IDs shall follow:

NEX-STD-001

NEX-STD-002

NEX-STD-003

...

Architecture Decisions

NEX-ADR-001

NEX-ADR-002

...

Templates

NEX-TMP-001

NEX-TMP-002

...

---

# Compliance

A document is considered controlled only if:

✓ Metadata is complete.

✓ Review has been completed.

✓ Approval has been granted.

✓ Version has been assigned.

✓ Related documents are referenced.

✓ Repository links are valid.

*(Note found 2026-08-05: by this exact criterion, several documents across the repository are not yet fully "controlled" — the NEX-STD-006 ID collision and the FBPOIS/FEIS broken references found this session both fail "repository links are valid." Not resolved here; flagged as directly relevant to this standard's own compliance bar.)*

---

# Governing Principle

Engineering knowledge is never rewritten.

Engineering knowledge is reviewed, approved, versioned, and continuously evolved.

---

End of Standard
