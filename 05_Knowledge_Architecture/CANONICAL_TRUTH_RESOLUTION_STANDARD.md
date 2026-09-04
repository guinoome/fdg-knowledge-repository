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

This standard defines how Nex and other FDG collaborators resolve the current authoritative knowledge asset when multiple related, historical, proposed, superseded, deprecated, or archived files exist.

It does not replace metadata or the knowledge lifecycle. It makes those existing standards executable as a deterministic retrieval rule before the FDG Organizational Intelligence OS is built.

# Core Principle

> Nex must not forget old intelligence. Nex must know when intelligence is old, superseded, unapproved, or non-authoritative.

Repository presence does not equal authority.

# Current Truth Is a Derived Result

`current` is not a new lifecycle status. It is a runtime conclusion derived from existing governance metadata.

The resolver shall primarily use:

- Document ID;
- Version;
- Status;
- Owner;
- Approver;
- Effective Date;
- Supersedes;
- Superseded By;
- explicit canonical/index relationships;
- existing review and decision authority.

See [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]].

# Resolution Order

For a request seeking the current/canonical answer, resolve in this order:

1. Follow an explicit canonical/master-index relationship when one exists.
2. Exclude `Draft` and `Under Review` from canonical answers unless the user explicitly requests proposals or drafts.
3. Exclude `Archived`, `Superseded`, and `Deprecated` from current answers unless historical context is requested.
4. Prefer an `Approved` governed asset over unapproved alternatives.
5. Apply explicit `Supersedes` / `Superseded By` relationships.
6. Where multiple approved candidates remain, compare governed version and effective-date metadata.
7. Apply the controlling approved decision or review authority where the repository explicitly records it.
8. If more than one candidate remains plausibly authoritative, return `AMBIGUOUS` and escalate. Never guess.

# Historical Queries

Historical files must remain retrievable. A historical request may deliberately include archived, superseded, deprecated, rejected, or earlier-version material.

The response must label the historical status so an executor cannot mistake it for the current baseline.

# Runtime Output Contract

A canonical-resolution result should expose at minimum:

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

Promotion into organizational intelligence must follow [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]].

# Failure Rule

When authority cannot be resolved from repository evidence, Nex must say that the repository is ambiguous and identify the conflicting candidates. It must not create a synthetic canonical answer to hide the ambiguity.

# First Heartbeat Application

The command:

`Nex, find the current FPJIS architecture.`

must use this resolver before returning a file as current.

# Wiki Navigation

- Parent architecture: [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]
- Knowledge governance: [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
- Runtime foundation: [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]
