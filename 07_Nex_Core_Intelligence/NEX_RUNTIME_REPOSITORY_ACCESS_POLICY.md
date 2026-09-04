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

This policy defines the minimum executable repository-access contract for Baby Nex before the full FDG Organizational Intelligence OS exists.

It does not replace existing authority or security standards. It translates them into simple runtime permission classes that can be enforced by code.

# Core Principle

> Nex receives narrowly scoped capabilities over specific resources. Nex does not receive unrestricted authority over the vault, computer, account, or shell.

# Permission Classes

The runtime shall support at minimum:

```text
DENY
READ
WRITE_CAPTURE
WRITE_CONTROLLED
WRITE_APPROVAL_REQUIRED
```

## DENY

The runtime must not read or write the protected resource through the current capability.

## READ

Read/retrieve only. No mutation.

## WRITE_CAPTURE

Write only to a designated capture/runtime-learning area. This does not promote the content to approved organizational knowledge.

## WRITE_CONTROLLED

A specific allowlisted skill may create or modify content within a specific resource scope after safety checks, recovery-point creation, and validation.

## WRITE_APPROVAL_REQUIRED

The runtime must have explicit approval before the controlled write is executed.

# Deny by Default

Any path, resource, action, or skill not explicitly granted shall be denied.

A broad parent-directory permission must not silently override a narrower protected-path rule.

# Deployment Mapping

This document defines permission semantics, not the final path map.

The actual local deployment shall maintain a machine-readable policy mapping such as:

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

The runtime must derive real paths from the actual repository. Do not invent missing canonical folders just to satisfy the policy.

# Skill Capability Scoping

Each executable skill must declare its resource and action scope.

Example:

```yaml
skill: create_artifact
allowed_actions:
  - create_file
allowed_roots:
  - <configured-project-area>
requires_recovery_point: true
requires_validation: true
```

A skill may never inherit unrelated filesystem or shell authority simply because the Nex runtime process possesses it at operating-system level.

# Write Gate

Every controlled write shall pass:

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

The runtime must defend against:

- `..` path traversal;
- absolute paths outside the configured repository root;
- symbolic/junction-link escape where applicable;
- unintended wildcard or recursive writes;
- mass rename/move/delete through a narrow skill;
- filename collisions and silent overwrite.

# Canonical Knowledge

Approved/canonical knowledge must not be writable merely because Nex is allowed to learn.

Captured or candidate intelligence follows [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]] before promotion.

# Destructive Operations

For NEX v0.1-alpha, destructive repository operations are outside the default capability set.

No delete, mass move, mass rename, history rewrite, force-push, or broad autonomous refactor should be exposed as a Baby Nex skill.

# Audit Requirement

Every allow, deny, approval-required result, and attempted controlled write must be traceable through [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]].

# First Heartbeat Requirement

Baby Nex must demonstrate that a permitted write succeeds and a protected-path write is denied without side effects.

# Wiki Navigation

- Authority: [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- Security: [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security, Access Control and Trust Architecture Standard]]
- Ledger: [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger Standard]]
- Runtime foundation: [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]
