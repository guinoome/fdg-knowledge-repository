---
system: FAIS
system_name: FDG Audit Intelligence System
folder: 22_FDG_Audit_Intelligence_System
status: Initial Baseline
authority: Draft for FDG governance adoption
owner: FDG Ecosystem
principles:
  - Evidence over assumption
  - Traceability over convenience
  - Audit independence
  - Controlled remediation
  - Organizational learning
  - Technology independence
---

# 22 — FDG Audit Intelligence System (FAIS)

FAIS is the independent assurance, verification, and continuous audit intelligence layer of the FDG Ecosystem.

## Canonical Position

**Top-level folder:** `22_FDG_Audit_Intelligence_System`

## Core Boundary

FAIS audits; domain systems own their domains. FAIS does not silently remediate audited material.

## Audit Chain

**Requirement → Control → Evidence → Audit Test → Finding → Authorized Corrective Action → Verification → Closure → Learning**

## Start Here

1. `00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System.md`
2. `00_FAIS_CORE/FAIS-0001 - Charter and Scope.md`
3. `00_FAIS_CORE/FAIS-0002 - Audit Intelligence Architecture.md`
4. `00_FAIS_CORE/FAIS-0003 - Audit Principles and Evidence Model.md`
5. `00_FAIS_CORE/FAIS-ROADMAP.md`

This package is an initial organizational baseline and is intentionally technology-independent.


## Ecosystem Integration and Pre-Push Audit

FAIS is a cross-ecosystem assurance system, not an isolated archive.

- [[00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System]]
- [[21_Ecosystem_Integration/FAIS-INT-2100 - FDG Ecosystem Integration Map]]
- [[22_Repository_Audit_Mandates/FDG Knowledge Repository — Repository-Wide Architecture Audit & Enhancement Mandate]]
- [[23_Codex_Handover_and_PrePush/FDG_Knowledge_Repository_Pre_GitHub_Audit_Mandate]]
- [[23_Codex_Handover_and_PrePush/FAIS-HANDOVER - Conversation Compilation and Next Agent]]

Before any GitHub push, run the repository-wide Codex audit against the complete local vault and validate all internal links and cross-system relationships.
