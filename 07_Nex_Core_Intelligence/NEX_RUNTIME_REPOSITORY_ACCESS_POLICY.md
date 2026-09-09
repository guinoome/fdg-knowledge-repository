# NEX RUNTIME REPOSITORY ACCESS POLICY

Document ID: NEX-PREOS-003
Document Type: Nex Runtime Access Bridge Policy
Version: 0.1
Status: Proposed
Owner: Francis
Approver: Francis
Effective Date: Upon approval
Supersedes: None

Related Documents:

- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security, Access Control and Trust Architecture Standard]]
- [[05_Knowledge_Architecture/METADATA_STANDARD|Metadata Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]]

---

# Purpose

Define the minimum executable repository-access contract for Baby Nex before the full FDG Organizational Intelligence OS exists.

This translates existing authority/security standards into permission classes enforceable by code.

# Core Principle

> Nex receives narrowly scoped capabilities over specific resources. Nex does not receive unrestricted authority over the vault, computer, account, or shell.

# Permission Classes

```text
DENY
READ
WRITE_CAPTURE
WRITE_CONTROLLED
WRITE_APPROVAL_REQUIRED
```

- `DENY`: no read/write through the current capability.
- `READ`: retrieval only; no mutation.
- `WRITE_CAPTURE`: write only to a designated capture/runtime-learning area; not canonical promotion.
- `WRITE_CONTROLLED`: allowlisted skill may write inside a bounded scope after safety checks, recovery point, and validation.
- `WRITE_APPROVAL_REQUIRED`: explicit approval required before write.

# Deny by Default

Any path, resource, action, or skill not explicitly granted is denied. A broad parent permission must not override a narrower protected-path rule.

# Deployment Mapping

The runtime maintains a machine-readable policy:

```yaml
repository_root: <configured-local-root>
rules:
  - path: <relative-path>
    permission: READ
  - path: <capture-area>
    permission: WRITE_CAPTURE
  - path: <approved-operational-area>
    permission: WRITE_CONTROLLED
  - path: <canonical-or-sensitive-area>
    permission: WRITE_APPROVAL_REQUIRED
  - path: <protected-area>
    permission: DENY
```

Real paths must come from the actual repository. Do not invent folders to satisfy the policy.

# Skill Capability Scoping

```yaml
skill: create_artifact
allowed_actions:
  - create_file
allowed_roots:
  - <configured-project-area>
requires_recovery_point: true
requires_validation: true
```

A skill never inherits unrelated shell/filesystem authority simply because the process possesses it.

# Write Gate

```text
request
  → intent classification
  → authority check
  → capability check
  → path normalization
  → allowlist check
  → protected-path check
  → recovery point
  → write
  → validation
  → execution ledger
  → success OR rollback
```

# Path Safety

Defend against `..` traversal, absolute paths outside root, symlink/junction escape, unintended recursive/wildcard writes, mass rename/move/delete, collisions, and silent overwrite.

# Canonical Knowledge

Learning permission does not equal canonical-write authority. Captured/candidate intelligence follows [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]].

# Destructive Operations

Baby Nex exposes no delete, mass move, mass rename, Git-history rewrite, force-push, or broad autonomous refactor capability.

# Audit Requirement

Every allow, deny, approval-required outcome, and controlled write is traceable through [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]].

# First Heartbeat Requirement

Demonstrate one permitted write and one protected-path denial with no side effects.

# Wiki Navigation

- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security Standard]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence Master Index]] → this document
