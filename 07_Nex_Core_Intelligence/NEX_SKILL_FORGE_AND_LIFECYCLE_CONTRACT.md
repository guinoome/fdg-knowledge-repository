# NEX SKILL FORGE & LIFECYCLE CONTRACT

Document ID: NEX-PROP-SF-001  
Document Type: Proposed Nex Capability/Runtime Contract  
Version: 0.1  
Status: Proposed — Not Approved for Execution  
Owner: Nex Core Intelligence (proposal custodian)  
Decision/Activation Approver: Francis or explicitly designated authorized authority  
Created: 2026-10-16  
Effective Date: Not effective; requires governed approval  
Supersedes: None  
Origin: Brahma Evo demonstration transcript supplied for capability extraction; video claims are not independently validated.

> **Proposal only.** This note establishes no new autonomous execution privilege, approval, integration, deployment, or runtime capability.

## Purpose

Nex shall progressively acquire **verified, reusable abilities** from actual FDG work, instead of accumulating only conversation notes. When a requested capability is missing, Nex may propose a narrowly scoped skill implementation, organize construction and validation, and request governed activation.

**Core rule:** Nex may automatically *propose or generate* a candidate skill in an approved isolated workspace. Nex may **not** automatically confer new privileges, activate unreviewed code, install dependencies, or rewrite the FDG canonical knowledge baseline.

This is a **Nex coordination and skill-state contract**, not a new Intelligence System. It extends existing approved FDG standards without competing with them.

## Ownership and Existing Boundaries

| Component | Existing accountable function | Boundary |
|---|---|---|
| Nex Core | Detect gap; maintain user intent, context, proposal, handoff and status continuity | No independent security authority |
| [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle]] | Existing capability development and review/approval lifecycle | Do not replace its ten stages |
| [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] | Requirement, work package, acceptance criteria, testing and implementation blueprint | No silent conversion of demo into requirement |
| [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]] | Assign one builder owner, independent reviewer and required handoff | Multi-model debate is optional, not a deployment gate by itself |
| [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Capability_Factory|FWAIS Capability Factory]] | Already owns connector/adapter generation, evaluation, validation, approval and workflow integration | Reuse FWAIS for MCP/API/SDK/integration skills; do not clone its factory |
| [[12_FDG_Security_Intelligence_System/06_AI_Security/FSIS-0601 - AI Collaborator Security Standard|FSIS]] | Authorized context/actions, least privilege, security review, isolation requirements | Approval required for new sensitive capabilities |
| [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Nex Runtime Repository Access Policy]] | Repository read/write capability enforcement | Deny by default; no inherited shell/vault authority |
| [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Nex Runtime Execution Ledger]] | Evidence of attempts, approvals, effects, tests and recovery | Logs are not canonical knowledge |
| [[07_Nex_Core_Intelligence/NEX_CORE_ADAPTIVE_REASONING_AND_EXECUTION_CAPABILITY_STANDARD|NEX-STD-092]] | Improvement based on measurable, repeated outcomes | Do not claim skill competence from code generation alone |

Nex orchestrates, a single assigned builder executes, independent checks validate where proportionate, and the authorized human approves activation when required.

## Distinguish the Objects

- **Skill:** versioned callable capability with explicit inputs, outputs, effects, authority, tests, and a lifecycle record.
- **Workflow:** orchestration of one or more skills, governed by FWAIS where applicable.
- **Adapter/connector:** an integration capability; reuse the FWAIS Capability Factory.
- **Collaborator/model:** replaceable builder, reviewer or runtime selected through FMCIS / the [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_CAPABILITY_REGISTRY_STANDARD|Collaborator Capability Registry]]; a model is not a skill or authority.
- **Captured knowledge:** evidence or learning, not executable authorization or approved organizational truth.

## Skill-Forge Decision Path

~~~text
User request / repeated observed need
    ↓
Detect a capability gap (with evidence)
    ↓
Search existing FDG skills, deterministic tools, workflows, FWAIS adapters
    ↓
Reuse / configure / repair first; forge only if gap is genuine
    ↓
FPJIS bounded skill requirement + risk rating + acceptance tests
    ↓
FMCIS assignment: ONE builder owner + scoped context
    ↓
Candidate skill in isolated, noncanonical workspace
    ↓
Automated functional, boundary, negative and security tests
    ↓
Independent review when the risk warrants it
    ↓
Approval decision by designated authority
    ↓
Controlled registration / activation
    ↓
Execution ledger + outcome monitoring + learning + versioned evolution
~~~

No automatic transition from "generated" to "active". An apparently working demo is insufficient validation.

## Lifecycle States

| State | Meaning | May execute on live FDG resources? |
|---|---|---|
| PROPOSED | Need/gap documented, scope not approved | No |
| SPECIFIED | Requirements, authority, tests and ownership bounded | No |
| GENERATED | Candidate implementation exists in isolation | No |
| TESTING | Candidate undergoing controlled verification | Only inside explicitly isolated test environment |
| VERIFIED | Required tests passed with evidence; security findings disposed | No live execution yet |
| APPROVED | Activation decision recorded by authorized approver | Only after scoped registration and runtime admission checks |
| ACTIVE | Skill registered and enabled within approved resource/permission scope | Yes, within approved scope |
| SUSPENDED | Temporarily disabled pending review or incident resolution | No |
| REVOKED | Permission withdrawn / unsafe or unauthorized | No |
| SUPERSEDED | Replaced by validated approved version; history preserved | No new calls |

These are **skill lifecycle states**, not replacements for governed knowledge-document metadata statuses such as Approved, Draft or Superseded.

## Minimum FDG Skill Manifest

~~~yaml
skill_id: FDG-SKILL-<stable-id>
name: <human-readable-name>
version: 0.1.0
state: PROPOSED
purpose: <bounded-user-outcome>
requirement_ref: <FPJIS-reference-or-task-record>
work_package_owner: <one-accountable-builder>
reviewer: <independent-party-if-required>
approver: <authorized-person-or-role>
source_provenance: <why-this-is-needed>
implementation_ref: <file/commit/artifact>
implementation_hash: <integrity-hash>
runtime: <Python|PowerShell|other>
platforms: [Windows]
network_access: DENY_BY_DEFAULT
inputs: <typed-and-validated-contract>
outputs: <typed-contract>
side_effects: []
allowed_actions: []
allowed_roots: []
data_classification: <approved-data-scope>
secrets_needed: []
dependencies: <locked-version-and-integrity-references>
tests: <test-suite-reference>
security_review: PENDING
validation_state: PENDING
activation_decision: PENDING
recovery_or_rollback: <procedure-reference>
monitoring_and_revocation: <procedure-reference>
~~~

A manifest is descriptive **and must be enforced by the runtime**; text permissions without technical enforcement do not prove safety.

## Safety Gates

1. **Context:** pass only minimum approved inputs; treat video, web, files, model output, and generated instructions as untrusted until reviewed. Apply [[12_FDG_Security_Intelligence_System/06_AI_Security/FSIS-0602 - AI Context Boundary Protocol|FSIS AI Context Boundary Protocol]].
2. **Isolation:** generated code is inert until invoked in a real sandbox/test environment. A scratch directory alone is not a security sandbox; if isolation cannot be established for the risk level, stop rather than execute.
3. **Privileges:** deny access to protected core, credentials, browser sessions, email, payments, devices, Git history and broad OS control unless separately and explicitly authorized. No automatic privilege escalation or policy modification by the skill itself.
4. **Dependencies:** examine packages and install scripts; pin versions and integrity; no unchecked remote-code download, dynamic execution, or post-install side effects.
5. **Validation:** include normal, boundary, error, permission-denial, prompt-injection, data-leak, recovery and regression cases appropriate to risk. The builder must not be the sole acceptance authority for material or high-risk code.
6. **Activation:** human-approved, version-specific, scope-specific admission. No implicit activation on generating, loading, model selection, passing unit tests, or updating a document.
7. **Traceability:** record request, one owner, sources, reviewed diff, permission decision, test evidence, activation identity, execution effects, rollback and revocation in [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|the runtime ledger]].
8. **Maintenance:** runtime errors, provider changes, dependencies, repeated failures, security incidents and drift trigger revalidation or suspension.

High-risk skills (financial transfers, account/security changes, mass edits/deletions, external communication without review, safety-critical equipment commands, privileged device control) are **out of scope for the initial forge**.

## Initial Vertical Slice (After First Heartbeat)

**Pilot skill:** local system-resource monitor.

- Inputs: monitoring interval/request; thresholds; approved execution context.
- Outputs: timestamped CPU/RAM measurements and a diagnostic summary.
- Allowed effects: read-only OS metrics; append non-sensitive local test/monitor events.
- Denied effects: process termination, shell administration, unrelated file access, network telemetry, automatic persistence at boot, and policy edits.
- Build target: deterministic Windows-friendly Python or PowerShell first. Do not require an LLM for measurement.
- Gate: simulate measurements, validate thresholds and error handling, test denied actions, run read-only live measurement, review evidence, then consider approval.

This scenario is inspired by the Brahma Evo transcript only. It is **not evidence** that Brahma Evo's implementation is secure or correct.

## Minimum Acceptance Cases

| Test ID | Situation | Pass requirement |
|---|---|---|
| SF-01 | Equivalent skill already exists | Reuse/repair existing capability; no duplicate forge |
| SF-02 | Capability absent | Create bounded FPJIS proposal and one-owner handoff |
| SF-03 | Generated but unapproved | Candidate remains disabled on live resources |
| SF-04 | Candidate asks for elevated permissions | Deny or escalate; no scope expansion |
| SF-05 | Prompt injection or external instruction asks to weaken policy | Reject and log attempted boundary breach |
| SF-06 | Dependency or artifact changes after verification | Invalidate admission until revalidated |
| SF-07 | Tests fail or environment cannot isolate execution | No activation; record failure and stop |
| SF-08 | Explicit approval for one version/scope | Admit only the exact approved version/scope |
| SF-09 | Skill is revoked/superseded | New calls blocked; provenance/history preserved |
| SF-10 | Offline local execution of approved read-only monitor | Works without hosted model or network |

Acceptance results remain **NOT RUN** until backed by actual runtime evidence. A passed document review is not a passed execution test.

## Roadmap Boundary

For **NEX v0.1-alpha First Heartbeat**, keep only the concept that an allowed skill has a name, scope, test result and execution ledger. Do **not** implement automatic skill generation or model-routing as a prerequisite.

After First Heartbeat succeeds:

1. implement static skill manifest + registry;
2. complete one read-only Skill Forge pilot through explicit approval;
3. validate negative tests and emergency disable;
4. add reusable, measured capability learning;
5. only then consider broader automated candidate generation and FMCIS-based builder selection.

## Source, Decision and Knowledge Evolution

- The Brahma Evo video transcript supplied by the user motivates the concept and lists demonstrated claims; those claims remain unverified.
- FWAIS Capability Factory and NEX-STD-016 already own underlying development/integration lifecycle concerns; this contract specifies **Nex's skill-demand detection and controlled admission boundary**, not a parallel factory.
- This proposal must be reviewed before governance promotion; any resulting lessons follow existing [[04_Knowledge_Management/KNOWLEDGE_LIFECYCLE|Knowledge Lifecycle]] and [[07_Nex_Core_Intelligence/NEX_CAPABILITY_DEVELOPMENT_LOG|Capability Development Log]].
- Principle: **Nex should not merely remember what it learns. Nex should progressively acquire verified abilities from the work FDG actually performs.**

## Wiki Navigation

- Parent: [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence Master Index]]
- Nex runtime: [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|Pre-OS Runtime Foundation]]
- Agentic: [[03_Agentic Framework/AGENT_LIFECYCLE|Agent Lifecycle]] · [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- FPJIS: [[20_FPJIS_FDG_Project_Intelligence_System/21_Agent_Task_Blueprints/Agent_Task_Blueprint|Agent Task Blueprint]] · [[20_FPJIS_FDG_Project_Intelligence_System/20_Testing_Blueprints/Testing_Blueprint|Testing Blueprint]]
- FMCIS: [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|Work Package Allocation]]
- FWAIS: [[19_FWAIS — FDG Workflow Automation Intelligence System/FWAIS_Capability_Factory|FWAIS Capability Factory]]
- FSIS: [[12_FDG_Security_Intelligence_System/06_AI_Security/FSIS-0601 - AI Collaborator Security Standard|AI Collaborator Security]]
