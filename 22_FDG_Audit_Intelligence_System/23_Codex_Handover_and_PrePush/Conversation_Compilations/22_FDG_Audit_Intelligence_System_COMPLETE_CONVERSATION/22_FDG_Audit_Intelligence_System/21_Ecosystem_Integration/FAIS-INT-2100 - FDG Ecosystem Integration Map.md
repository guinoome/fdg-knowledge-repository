---
system: FAIS
system_name: FDG Audit Intelligence System
status: Initial Canonical Integration Baseline
owner: FDG Ecosystem
---

# FAIS-INT-2100 — FDG Ecosystem Integration Map

## Purpose

This document prevents the FDG Audit Intelligence System from becoming an isolated audit folder. FAIS is the independent assurance layer across the FDG Ecosystem. It verifies that systems, projects, repositories, workflows, agents, decisions, and controls conform to approved requirements and evidence.

## Canonical Boundary

**Domain system → owns domain intelligence and corrective work.**

**FAIS → audits conformance, evidence, traceability, control effectiveness, findings, corrective-action closure, and systemic learning.**

**Governance authority → approves policy, accepts material risk, resolves authority conflicts, and authorizes significant structural changes.**

## Foundation and Governance Wiki-Links

The following are semantic integration targets. Codex must resolve them against actual canonical local filenames before push. Missing or ambiguous targets must be reported, not invented.

- [[00_Nex/00_Master Index]]
- [[01_Governance/01_Governance_Master_Index]]
- [[01_Governance/NEX-STD-002_DOCUMENT_CONTROL]]
- [[01_Governance/NEX-STD-003_DECISION_EVOLUTION_STANDARD]]
- [[01_Governance/NEX-STD-004_OPERATING_PRINCIPLES]]
- [[01_Governance/NEX-STD-005_CONSTITUTION]]
- [[01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK]]
- [[04_Knowledge_Management]]
- [[05_Knowledge_Architecture]]
- [[06_Organizational_Architecture]]
- [[09_FDG_Ecosystem_Integration_Hub]]
- [[10_FDG_CORE_Intelligence]]

## Major System Relationships

### [[FDG CORE]] ↔ FAIS

FAIS audits whether shared CORE primitives, provenance, evidence, identity, revision, approval, and traceability controls operate as intended. CORE supplies shared primitives; FAIS supplies independent assurance.

### [[FEIS]] / [[08_FEIS_Engineering_Intelligence_Systems]] ↔ FAIS

FEIS owns engineering intelligence and domain logic. FAIS independently evaluates engineering evidence, calculations, requirement conformance, drawing/specification consistency, revision control, testing evidence, approval boundaries, and professional-authority controls.

### [[FPJIS]] / [[FDG Project Intelligence System]] ↔ FAIS

FPJIS owns project intelligence. FAIS evaluates project definition, requirements traceability, changes, assumptions, risk controls, milestone evidence, acceptance, handover, and postmortem learning.

### [[13_FDG_Legal_Intelligence_System]] / [[FLIS]] ↔ FAIS

FLIS owns legal intelligence. FAIS audits evidence of compliance against identified legal, regulatory, contractual, and governance requirements. FAIS must not fabricate legal obligations.

### [[FDG Security Intelligence System]] ↔ FAIS

Security intelligence owns security architecture and controls. FAIS independently tests access control, data governance, backup/recovery evidence, logs, change control, privileged operations, and confidential-information handling.

### [[FDG Collaboration Intelligence System]] / [[FDG Multi-Collaboration Intelligence System]] ↔ FAIS

FAIS audits human and machine collaborators for authority, task scope, evidence use, model/tool provenance where relevant, review, handover, error handling, escalation, and self-audit limitations.

### [[FDG Business Intelligence System]] / Commercial Architecture ↔ FAIS

FAIS may verify approval trails, commercial assumptions, procurement records, revenue-control evidence, segregation of duties, reconciliations, and decision traceability. It does not replace accounting, tax, finance, or statutory audit authority.

### [[FDG Workflow Automation Intelligence System]] / [[FWAIS]] ↔ FAIS

Automation systems own workflow execution. FAIS evaluates workflow definitions, control points, audit logs, exception handling, failure modes, evidence retention, and automation change control.

### [[FDG External Intelligence System]] / [[FEXIS]] ↔ FAIS

FEXIS gathers and interprets external intelligence. FAIS evaluates source traceability, evidence classification, freshness, authority, inference boundaries, and whether external intelligence has been converted into FDG knowledge without losing provenance.

### [[14_FDG_Service_Intelligence_System]] ↔ FAIS

Service Intelligence owns service-delivery knowledge. FAIS may audit service requirements, evidence of execution, service-quality controls, recurring failures, customer-facing commitments, and corrective-action effectiveness.

## Relationship Semantics

Use explicit semantic sections where beneficial:

- **Governed By**
- **Depends On**
- **Audited By**
- **Provides Evidence To**
- **Consumes Criteria From**
- **Related Systems**
- **Escalates To**
- **Corrective Action Owned By**

Do not create links merely to increase graph density.

## Ecosystem Audit Chain

**Requirement → Control → Evidence → Audit Test → Finding → Authorized Corrective Action → Verification → Closure → Organizational Learning**

## Anti-Isolation Rule

Every major FAIS module should connect, where semantically valid, to:

1. FAIS CORE
2. applicable governance
3. audited domain system
4. evidence/traceability
5. findings/CAPA
6. reporting
7. learning
8. repository-wide audit architecture

## Validation Rule

Before GitHub push, verify all wiki-links in this document against the full local repository. Any unresolved or ambiguous link must be reported rather than guessed.
