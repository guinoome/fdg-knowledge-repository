# NEX PRE-OS RUNTIME FOUNDATION INDEX

Document ID: NEX-PREOS-005

Document Type: Implementation Navigation Index

Version: 0.1

Status: Proposed

Owner: Francis

Approver: Francis

Effective Date: Upon approval

Supersedes: None

---

# Purpose

This index gives Codex, Claude Code, local-model collaborators, and future implementation agents the minimum authoritative reading path required to build NEX v0.1-alpha without repeatedly analyzing the entire FDG Knowledge Repository.

It is a runtime bridge, not a new Intelligence System and not a replacement for existing FDG architecture.

# Immediate Goal

Build the smallest local Baby Nex vertical slice:

```text
User
  → Nex
  → FDG Knowledge Repository
  → canonical/context resolution
  → one controlled skill/action
  → validation
  → execution ledger / memory
  → Nex response
```

# First Heartbeat Proof Commands

1. `Nex, find the current FPJIS architecture.`
2. `Nex, create this project artifact in the correct permitted location.`
3. `Nex, record this approved decision.`

Do not declare NEX v0.1-alpha operational until these work repeatedly, denied writes are actually denied, and controlled writes are validated and recoverable.

# Minimum Reading Order for Implementation Agents

Do not read the entire vault by default. Read in this order and expand only when the current task requires it.

## 1 — Authority and Agent Boundaries

- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[03_Agentic Framework/AGENT_OPERATIONAL_GOVERNANCE|Agent Operational Governance]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security, Access Control and Trust Architecture Standard]]

## 2 — Knowledge Truth and Lifecycle

- [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
- [[05_Knowledge_Architecture/CANONICAL_TRUTH_RESOLUTION_STANDARD|Canonical Truth Resolution Standard]]

## 3 — Context and Handoff

- [[03_Agentic Framework/CONTEXT_REQUIREMENTS|Context Requirements]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Nex Collaborator Handoff and Team Intelligence Standard]]

## 4 — Runtime Safety and Auditability

- [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Nex Runtime Repository Access Policy]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]]
- [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|Nex Quality Assurance and Validation Standard]]
- [[07_Nex_Core_Intelligence/NEX_REVIEW_AND_APPROVAL_GATE_STANDARD|Nex Review and Approval Gate Standard]]

## 5 — Collaborator Abstraction

- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_CAPABILITY_REGISTRY_STANDARD|Nex Collaborator Capability Registry Standard]]
- [[03_Agentic Framework/TASK_ROUTING_LOGIC|Task Routing Logic]]

Full FMCIS/model routing is deferred. The registry exists to avoid vendor lock-in and make local/hosted collaborators replaceable.

# One Truth, One Owner, One Handoff, One Validation Path

FDG's operational extension of the multi-agent continuity principle is:

```text
One governed source of truth
        ↓
One assignment owner
        ↓
One clean context/handoff package
        ↓
One required validation path
```

Existing repository standards already govern ownership, handoff, context, and approval. The pre-OS additions close only the runtime gaps required to enforce them in code.

# What Was Intentionally Not Duplicated

Do not create new competing standards for:

- authority levels;
- generic context requirements;
- collaborator handoff/ownership;
- knowledge lifecycle;
- metadata status;
- security/trust architecture;
- general validation/approval.

Those already exist and are linked above.

# New Pre-OS Runtime Bridge Documents

Only four substantive bridge standards are introduced:

1. [[05_Knowledge_Architecture/CANONICAL_TRUTH_RESOLUTION_STANDARD|Canonical Truth Resolution Standard]]
2. [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Nex Runtime Repository Access Policy]]
3. [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]]
4. [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_CAPABILITY_REGISTRY_STANDARD|Nex Collaborator Capability Registry Standard]]

# NEX v0.1-alpha Scope

Required now:

- local text runtime;
- repository retrieval;
- canonical truth resolution;
- minimal context routing;
- scoped repository permissions;
- one safe write capability;
- explicit approved-decision recording;
- pre-write recovery reference;
- validation;
- execution ledger;
- persistent capture/learning without silent canonical promotion.

Deferred:

- voice;
- HUD;
- VPS;
- remote access;
- permanent mini-PC node;
- full FWAIS;
- full FMCIS;
- multi-agent councils;
- broad integrations;
- full Organizational Intelligence OS runtime.

# Agent Token Rule

Agents shall use this index as the starting router. Load only the minimum documents needed for the current work package. Do not repeatedly ingest the complete FDG repository.

# Repository Integration

Parent index: [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]]

Knowledge architecture: [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]

Knowledge lifecycle: [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
