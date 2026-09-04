# NEX RUNTIME EXECUTION LEDGER STANDARD

Document ID: NEX-PREOS-002

Document Type: Nex Runtime Bridge Standard

Version: 0.1

Status: Proposed

Owner: Francis

Approver: Francis

Effective Date: Upon approval

Supersedes: None

Related Documents:

- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Nex Core Security, Access Control and Trust Architecture Standard]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Nex Collaborator Handoff and Team Intelligence Standard]]
- [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|Nex Quality Assurance and Validation Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]]

---

# Purpose

This standard defines the minimum machine-readable execution trail required whenever Nex reads, decides, writes, validates, or attempts a controlled action against FDG resources.

It converts existing governance and security principles into a runtime record suitable for NEX v0.1-alpha and later FDG Organizational Intelligence OS execution.

# Core Principle

> If Nex acts, FDG must be able to reconstruct what Nex attempted, what authority it used, what changed, how the result was validated, and how recovery can occur.

# Ledger Semantics

The execution ledger shall be:

- append-oriented;
- attributable;
- timestamped;
- machine-readable;
- human-auditable;
- separate from canonical knowledge content;
- protected from silent rewriting by the executing skill.

Correction of a prior ledger entry should create a new corrective entry rather than silently erasing the original event.

# Minimum Event Schema

```yaml
request_id: <unique-id>
timestamp: <ISO-8601>
requester: <known-user-or-authority-context>
intent: <normalized-intent>
assignment_owner: <executor-or-owner>
executor: <agent-model-tool-or-human>
runtime: <local-runtime-if-applicable>
skill_or_action: <selected-capability>
context_package: <reference-if-created>
files_read:
  - <path>
permission_decision: ALLOW | DENY | APPROVAL_REQUIRED
permission_reason: <concise-reason>
recovery_reference: <snapshot-backup-or-null>
files_created:
  - <path>
files_modified:
  - <path>
validation_state: NOT_REQUIRED | PENDING | PASSED | FAILED
validation_reference: <reference-or-null>
final_status: SUCCESS | DENIED | FAILED | ROLLED_BACK
error_summary: <null-or-concise-error>
```

Additional fields may be added when required by an existing FDG standard.

# Read Events

A purely read-only retrieval may use a lighter event record, but must still retain:

- request ID;
- timestamp;
- intent;
- executor;
- files/sources read;
- final status.

# Write Events

Every controlled write must record:

1. permission decision;
2. destination path;
3. pre-write recovery reference;
4. exact files created or modified;
5. post-write validation;
6. final result;
7. rollback status if failure occurred.

# Recovery Coupling

A write event is incomplete if the runtime claims recoverability but the ledger does not contain a usable recovery reference.

The recovery mechanism may vary by implementation, but the ledger contract does not.

# Secrets and Sensitive Data

Do not place passwords, API keys, access tokens, private credentials, or unnecessary sensitive payloads in the ledger.

Record the identity/reference of the credential mechanism when needed, not the secret itself.

# Knowledge Promotion

Execution logs are operational evidence, not automatically approved organizational knowledge.

Lessons or intelligence derived from execution must enter the governed lifecycle through [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]].

# Validation

Validation requirements are governed by existing Nex quality and approval standards. The ledger records the validation outcome; it does not replace the validator.

See [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|Nex Quality Assurance and Validation Standard]].

# First Heartbeat Requirement

NEX v0.1-alpha must produce ledger entries for all three proof commands, including denied and failed write tests.

# Wiki Navigation

- Runtime access: [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Nex Runtime Repository Access Policy]]
- Context: [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- Handoffs: [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator Handoff Standard]]
- Runtime foundation: [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Nex Pre-OS Runtime Foundation Index]]
