# METADATA STANDARD

Document ID: NEX-STD-031

Document Type: Knowledge Architecture Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-001 Document Control
- NEX-STD-025 Knowledge Architecture Model
- NEX-STD-026 Repository Structure Standard
- NEX-STD-029 Knowledge Asset Standard
- NEX-STD-030 Naming Standard

---

# Purpose

This standard defines the metadata required to identify, classify, govern, and discover knowledge assets within the FDG Knowledge Repository.

Metadata enables consistent management by both humans and intelligent systems.

---

# Core Principle

Content communicates knowledge.

Metadata communicates context.

Both are required for organizational intelligence.

---

# Metadata Objectives

Metadata shall:

- uniquely identify knowledge assets
- support governance
- improve discoverability
- enable automation
- strengthen traceability
- remain technology-independent

---

# Metadata Categories

## Governance Metadata

Defines organizational authority.

Typical fields include:

- Document ID
- Version
- Status
- Owner
- Approver
- Effective Date
- Last Reviewed
- Next Review

---

## Classification Metadata

Defines what the asset represents.

Examples:

- Standard
- ADR
- Template
- Procedure
- Checklist
- Guide
- Reference
- Lesson Learned

---

## Relationship Metadata

Defines engineering relationships.

Examples:

- Related Standards
- Parent Asset
- Child Assets
- Related Domains
- Supersedes
- Superseded By

Relationships should complement links, not replace them.

---

## Lifecycle Metadata

Defines the current maturity of the asset.

Examples:

Draft

Under Review

Approved

Archived

Superseded

Deprecated

---

## Responsibility Metadata

Defines accountability.

Examples:

Owner

Reviewer

Approver

Primary Domain

---

# Required Metadata

Every governed knowledge asset shall include, at minimum:

- Document ID
- Version
- Status
- Owner
- Approver
- Related Documents

Additional metadata may be added where organizationally justified.

---

# Metadata Rules

Metadata shall:

remain accurate

remain current

avoid duplication

support automation

remain understandable without proprietary software

---

# Technology Independence

Metadata shall describe engineering meaning rather than implementation details.

Examples of implementation-specific information (such as plugin settings or editor preferences) shall not be treated as organizational metadata.

---

# Discoverability

Metadata should improve:

repository search

cross-referencing

future automation

AI retrieval

organizational reporting

Metadata exists to increase organizational intelligence.

---

# Responsibilities

Francis

Approves repository metadata standards.

---

Nex

Maintains metadata consistency.

Detects missing metadata.

Recommends metadata improvements.

Supports future automation through metadata quality.

---

# Metadata Quality Checklist

Before approval, verify:

✓ Metadata is complete.

✓ Document identity is unique.

✓ Relationships are accurate.

✓ Ownership is defined.

✓ Version is correct.

✓ Related standards are identified.

---

# Organizational Principle

Metadata is the engineering interface between knowledge and intelligent systems.

Well-structured metadata enables knowledge to be governed, discovered, reused, and automated.

---

# Continuous Improvement

Metadata standards shall evolve to support future engineering capabilities while preserving backward compatibility whenever practical.

---

# Governing Principle

Knowledge should remain understandable to both engineers and intelligent systems without depending on a specific software platform.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|05 Knowledge Architecture Master Index]] → this document
