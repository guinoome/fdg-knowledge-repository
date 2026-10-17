# FDG Agent Workforce W1 — Nex-Controlled Specialist Implementation Specification

Document type: Proposed implementation extension
Status: Proposed — not an activated runtime or an approved replacement for existing standards
Date: 2026-10-17
Owner / final authority: Founder
Orchestrator: Nex
Canonical repository: guinoome/fdg-knowledge-repository

## Purpose and build boundary

Enable persistent, scoped, measurable specialist workers **after** Nex v0.1-alpha First Heartbeat is operational. This is an implementation package, not a new numbered FDG intelligence system, autonomous organization, or redesign of Nex. The existing Nex runtime plan stays: local text interface → repository retrieval → one controlled skill → validation → execution ledger and persistent memory → verified response.

Do not activate multi-agent orchestration, scheduled external execution, remote control, broad credentials, full FMCIS/FWAIS, or production releases during First Heartbeat. Do not count documents, worker identities or running processes as delivered products.

## Governing authorities (read in this order for relevant task)

- [[00_Nex/00_Master Index|Nex Core Master Index]]
- [[07_Nex_Core_Intelligence/NEX_PRE_OS_RUNTIME_FOUNDATION_INDEX|First Heartbeat runtime reading route]]
- [[03_Agentic Framework/AUTHORITY_LEVELS|Authority Levels]]
- [[07_Nex_Core_Intelligence/NEX_CORE_SECURITY_ACCESS_CONTROL_AND_TRUST_ARCHITECTURE_STANDARD|Security/trust]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_REPOSITORY_ACCESS_POLICY|Repository access]]
- [[07_Nex_Core_Intelligence/NEX_RUNTIME_EXECUTION_LEDGER_STANDARD|Execution ledger]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_CAPABILITY_REGISTRY_STANDARD|Capability registry]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator handoff]]
- [[07_Nex_Core_Intelligence/NEX_QUALITY_ASSURANCE_AND_VALIDATION_STANDARD|QA]]
- [[07_Nex_Core_Intelligence/NEX_REVIEW_AND_APPROVAL_GATE_STANDARD|Review and approval]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FMCIS independent review]]
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Top-tier architecture compiler]]
- [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|Simple bounded build card]]

These remain authoritative; this proposal must be reconciled against each before adoption. Do not silently supersede them. FDG Knowledge Repository is the memory authority; model providers are replaceable workers.

## Agent identity contract

Every proposed worker must declare: stable `agent_id`; human-readable name; role and mission; job owner (Nex); sponsor/approval owner; task scope; allowed knowledge sources; named capabilities and boundaries; allowed tools/executors; memory namespaces; evidence requirements; escalation triggers; completion criteria; release/approval prohibition; revision and lifecycle state. An agent identity is not itself an API key, model, system account or authority grant.

Starter roles, activated only as needed: Inspector (first); Builder; Librarian; Planner; then Engineer, Facility, Operations, Commercial, Growth, Research, Finance and Guardian. Never establish one agent per role in advance.

## Memory and learning contract

Use FDG-governed logical zones, implemented by existing access and knowledge-lifecycle standards:
- Capture: append task observations, sources, run outputs and errors within approved paths.
- Candidate: propose lessons, recurrent faults and updates with explicit evidence and uncertainty.
- Approved knowledge: read and use; only update via existing approval/review gates.
- Protected core: deny writes and other restricted operations unless separately authorized.

Do not treat inferred learning, web content, a worker's opinion or conversation history as canonical truth. Persist structured work receipts, not raw prompts or secrets by default; minimize sensitive content. Retain provenance and controlled supersession.

## Capability and authority contract

Default DENY. Grant exact actions against exact resources only. A worker cannot grant permissions to itself or to another worker. Tool availability is not authorization. Explicitly deny destructive Git operations, bulk rename/delete, protected document replacement, unattended deployment, external publication, payment, messaging, irreversible client changes and privileged account access without separately approved capability.

A write transaction must pass: request → identity/intent → authority gate → path/tool allowlist → recovery point → bounded change → validation → ledger + receipt → report or rollback/escalation. An independent reviewer does not automatically hold release authority.

## Delegation and handoff protocol

User → Nex objective and approval constraints → Nex derives one bounded work order → selects one eligible worker by capability, cost and risk → worker accepts or returns BLOCKED → retrieves minimal indexed project context → executes only assigned scope → returns receipt, artifacts and test evidence → Nex verifies evidence and escalates exceptions → authorization owner accepts/rejects → governed candidate learning.

Work order required fields:
`work_order_id, requested_by, assigned_by, assignee_agent_id, objective, business_or_engineering_outcome, scope_paths, forbidden_actions, allowed_capabilities, context_refs, input_refs, expected_artifacts, acceptance_tests, independent_review_rule, budget_limit, approval_gate, deadline_or_none`.
No implicit permission inheritance. If the scope is ambiguous, pause and escalate; do not invent business requirements.

## Work receipt and reproducibility

Each completion, failure or block produces an immutable/auditable receipt referencing the existing runtime execution ledger:
`receipt_id, work_order_id, agent_id, executor_id, model_provider_and_version_if_used, started_at, ended_at, sources, commands_or_tools, changed_paths, artifact_refs, test_commands, test_results, evidence_refs, approval_state, outcome, defects, risks, recovery_ref, token_or_cost_measure_if_available, next_action`.

Outcomes: `PASSED`, `FAILED`, `BLOCKED_WITH_EVIDENCE`, `NEEDS_APPROVAL`; never invent passing tests, user acceptance, customer payment or verified production deployment. A receipt should be legible by older coding agents without specialized agent platforms.

## Model/provider replacement

FDG owns worker identity, permissions, memory records, task contracts and validation history. The model is an adapter, not the identity. Replace a model/provider only when the candidate demonstrates task-envelope equivalence on held-out acceptance cases, preserves receipt schema and authority boundaries, passes security/negative tests, and reports material differences in cost/latency/accuracy. Record provider/version per run and approval for material changes. No silent fallback. Human-owned secrets must remain out of prompts and durable workforce memory.

## Independent validation

Before accepting output: compare changed files with allowed paths, run relevant tests and negative/denied-action tests, check persistence/recovery, validate provenance, independently inspect engineering/business claims, and verify owner sign-off where required. One worker's self-declared success is not evidence of acceptance. Failed or unavailable tests remain explicitly unresolved. An inspector can recommend release but cannot approve it.

## Performance and commercial gates

Track task completion with evidence, correctness, first-pass acceptance, escaped defects, regressions, reproducibility, scope violations, time-to-accepted-output, token/compute cost, recovery success and operator effort. For products: real working workflow and client acceptance; for engineering: checked calculations, source/evidence and engineering approval; for business: qualified leads, approved quotations, verified payments, margins or renewal evidence. Separate demonstration from external acceptance and verified revenue.

Do not optimize for agent count, dashboard aesthetics, number of reports or tokens alone. A second worker is justified only if the first specialist measurably reduces work or improves validated outcomes without disproportionate operational risk.

## First specialist: Nex Inspector (after First Heartbeat only)

Select one already-working bounded FDG product and an approved test envelope. Inspector reads source/evidence, runs approved non-destructive checks, records reproducible defects, verifies regression tests and reports PASS/FAIL/BLOCKED with a work receipt. No deployments, canonical changes or release approvals. Run three repetitions, including one deliberate defect/negative-authority case. Independent human/reviewer verifies findings. Promote lessons only through governance.

Acceptance for W1 pilot:
1. Nex First Heartbeat's read/create/approved-decision tests pass repeatedly and recovery/permission checks are evidenced.
2. One Inspector work order uses a stable identity, least-privilege scope and sourced context.
3. Receipt includes tested artifact, reproducible command/result, evidence links and unresolved findings.
4. Denied write and fabricated-success cases are rejected.
5. An independent reviewer confirms findings; valid findings lead to a fixed, retested working slice, or documented blocked state.
6. Evidence of saved engineering effort, avoided defects or commercially relevant accepted functionality is captured.

## Build order and stop rules

1. Finish Nex v0.1-alpha. No workforce implementation until the acceptance gate passes.
2. Reconcile W1 with existing capability, access, ledger and handoff standards; record any conflict.
3. Implement **only** minimal worker identity/work order/receipt adapters necessary for Inspector's single pilot.
4. Execute pilot; independently review; measure; preserve accepted baseline.
5. Consider additional specialists only if pilot results justify them.

Stop if canonical conflict, uncertain authority, unsupported integration, changed scope, unavailable recovery, security breach, missing runtime evidence, excessive resource use or unapproved deployment is encountered.

## Video reference and source boundary

The user-provided 2026-10-17 video `1000011097.mp4` illustrates a progression from an initial assistant/task to a deliberately designed, foundation-backed, project-built enduring worker. That is conceptual inspiration only; its slide sequence does not establish running software, secure autonomy, a validated commercial result, or new FDG governance. FDG implementation rules above are derived from the existing repository and user-approved workforce design.

## Decision status

This record is a **Proposed controlled build extension**, not evidence of a completed product, activated specialist, merged standard or deployed agent. Founder review and existing approval requirements remain in force.
