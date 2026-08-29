---
acronym: FLIS
date: 2026-08-29
repository_folder: 13_FDG_INTELLIGENCE_SYSTEMS
status: Initial Authoritative Baseline
system: FDG Legal Intelligence System
version: 1.0
---

# FLIS-0002 - Legal Intelligence Architecture

## Architectural Pattern

FLIS uses a layered intelligence architecture:

1.  **Authority Layer** --- laws, regulations, official issuances,
    contracts, precedents, permits, licenses.
2.  **Interpretation Layer** --- verified summaries, applicability
    analysis, requirement extraction, legal research.
3.  **Obligation Layer** --- duties, prohibitions, permissions, rights,
    deadlines, approvals, retention obligations.
4.  **Risk Layer** --- exposure, consequence, uncertainty, evidence
    strength, escalation.
5.  **Operational Interface Layer** --- requirements routed to
    responsible FDG systems and roles.
6.  **Evidence Layer** --- proof of implementation, approvals, records,
    decisions, correspondence.
7.  **Learning Layer** --- precedents, lessons, improved clauses,
    updated controls, regulatory-change history.

## Canonical Record Pattern

Every mature legal-intelligence record should support: - Record ID -
Title - Domain - Jurisdiction - Authority/source - Issuer - Effective
date - Verification date - Applicability - Requirement/obligation -
Affected entity/project/system - Responsible role - Evidence - Risk -
Status - Assumptions - Analysis - Decision - Reviewer/approver - Review
trigger - Related records

## Evidence Hierarchy

Prefer primary authority over secondary interpretation. Store summaries
as derivative intelligence linked to the source.

## Cross-System Contract

FLIS provides requirements and legal constraints; consuming FDG systems
implement operational controls and return evidence/status. FLIS does not
absorb their full operational workflows.

## Change Propagation

Regulatory Change → Verified Difference → Applicability → Affected
Requirement → Affected System/Contract/Process → Impact Assessment →
Action → Evidence → Closure → Learning.

## Technology Principle

Markdown/Obsidian is the current human-readable knowledge layer. The
information architecture must remain portable to future databases,
knowledge graphs, search systems, or agents without losing provenance or
governance.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[13_FDG_Legal_Intelligence_System/README|README]] → this document
