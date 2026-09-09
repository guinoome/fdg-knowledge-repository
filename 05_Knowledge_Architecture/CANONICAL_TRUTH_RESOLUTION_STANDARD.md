# CANONICAL TRUTH RESOLUTION STANDARD

Document ID: NEX-PREOS-001
Document Type: Knowledge Architecture Runtime Bridge Standard
Version: 0.1
Status: Proposed
Owner: Francis
Approver: Francis
Effective Date: Upon approval
Supersedes: None

Related Documents:

- [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[07_Nex_Core_Intelligence/NEX_ENGINEERING_DECISION_RECORD_STANDARD|Nex Engineering Decision Record Standard]]
- [[07_Nex_Core_Intelligence/NEX_REVIEW_AND_APPROVAL_GATE_STANDARD|Nex Review and Approval Gate Standard]]

---

# Purpose

Define how Nex and other FDG collaborators resolve the current authoritative knowledge asset when related historical, proposed, superseded, deprecated, archived, or conflicting files exist.

This does not replace metadata or the knowledge lifecycle. It turns those standards into an executable retrieval rule for Baby Nex.

# Core Principle

> Nex must not forget old intelligence. Nex must know when intelligence is old, superseded, unapproved, or non-authoritative.

Repository presence does not equal authority.

# Current Truth Is Derived

`current` is not a new lifecycle status. It is a runtime conclusion derived from governed metadata, including Document ID, Version, Status, Owner, Approver, Effective Date, Supersedes, Superseded By, canonical/index relationships, and approved decision authority.

See [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]].

# Resolution Order

For a current/canonical request:

1. Follow an explicit canonical/master-index relationship to identify candidates when present; navigation alone does not establish approval.
2. Only an explicitly `Approved` governed asset is eligible for a current authoritative answer. Exclude `Proposed`, `Draft`, `Review`, `Under Review`, and missing or unknown status unless the user asks for unapproved material. If only excluded candidates exist, return `NOT_FOUND` for current authority and explain the exclusion; do not present a proposal as the current baseline.
3. Exclude `Archived`, `Superseded`, and `Deprecated` from current answers unless historical context is requested.
4. Prefer an `Approved` governed asset over unapproved alternatives.
5. Apply explicit `Supersedes` / `Superseded By` relationships.
6. If multiple approved candidates remain, compare governed version and effective-date metadata.
7. Apply the controlling approved decision/review authority where explicitly recorded.
8. If more than one candidate remains plausibly authoritative, return `AMBIGUOUS` and escalate. Never guess.

# Historical Queries

Historical files remain retrievable. Responses must label their historical status so an executor cannot mistake them for the current baseline.

# Runtime Output Contract

```yaml
resolution: RESOLVED | AMBIGUOUS | NOT_FOUND
canonical_path: <path-or-null>
document_id: <id-or-null>
version: <version-or-null>
status: <governed-status-or-null>
resolution_reason: <concise reason>
alternatives_considered:
  - path: <path>
    status: <status>
    reason_not_selected: <reason>
```

# Learning and Candidate Intelligence

Captured observations and candidate intelligence do not become canonical merely because Nex generated or stored them.

Promotion follows [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]].

# Failure Rule

If authority cannot be resolved from repository evidence, Nex must expose the ambiguity and conflicting candidates. It must not synthesize a false canonical answer.

# First Heartbeat Application

`Nex, find the current FPJIS architecture.` must use this resolver before returning a file as current.

# Wiki Navigation

- [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]

# Local Integration Note — 2026-09-07

The eligibility rule explicitly requires Approved status, consistent with [[01_Governance/NEX-STD-002_DOCUMENT_CONTROL|Document Control]]. This closes the package's unspecified handling of Proposed, Review, and absent status. The standard itself remains Proposed; this clarification does not approve it or any retrieved document.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture Master Index]] → this document
