---
document_id: NEX-ROLE-ENGINEERING-001
title: Persistent Collaborator Role Engineering Standard
created: 2026-10-30
status: FOUNDER-DIRECTED_STANDARD / IMPLEMENTATION_AND_OPERATIONAL_VALIDATION_PENDING
owner_domain: Nex Core Intelligence, FMCIS, Agentic Framework, Knowledge Management
source: Founder-supplied video transcript, conversation file reference turn0file0
scope: Nex and all current and future FDG human, AI, model, tool, and workflow collaborators
---

# Persistent Collaborator Role Engineering Standard

> [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence]] → this standard.

## Founder direction and purpose

Apply the management discipline described in the supplied source: move beyond treating AI as a one-off prompt recipient and manage capable collaborators through durable roles, context, measurable outcomes, quality examples, feedback, reusable procedures, evaluation, and cost control.

The purpose is to make collaboration repeatable across Nex, Claude Code, Codex, other model providers, specialist agents, human experts, and workflow/engineering tools. A role is an FDG-owned responsibility and interface; it is not a model persona, a provider-specific prompt, or permission for unrestricted autonomy.

**Governing principle:** delegate an outcome through a defined role contract, not merely a clever prompt.

This standard extends the existing [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_ECOSYSTEM_STANDARD|Collaborator Ecosystem Standard]], [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator Handoff and Team Intelligence Standard]], and [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|Cross-Collaborator Controlled Learning and Skill Evolution Standard]]. It does not replace them or grant additional authority.

## 1. Role engineering versus prompt engineering

Prompt quality remains useful, but prompt wording alone is not the organizational control. A collaborator must receive enough context to understand:
- what outcome is required;
- why the outcome matters and how it originated;
- which FDG decisions, constraints, and dependencies govern the work;
- what good work looks like;
- how the result will be verified;
- what it may and may not do.

Treat a capable new collaborator as capable but unfamiliar with FDG's history, standards, quality bar, and authority boundaries. Do not assume model intelligence supplies missing organizational context.

## 2. Mandatory role contract

Every persistent or recurring collaborator role must have a written, versioned role contract. At minimum, define:

1. **Role identity and mission** — role name, purpose, owner, business/domain outcome, and reason the role exists.
2. **Responsibilities and boundaries** — assigned duties, interfaces, explicit non-goals, dependencies, and work-package ownership.
3. **Authority and permissions** — allowed decisions, read/write scope, tools, data access, spending limits, approval gates, and prohibited actions. Existing FDG human/domain approval authority remains controlling.
4. **Canonical context** — links to current approved knowledge, source decisions, project state, relevant history, assumptions, constraints, and unresolved issues. Retrieve from the FDG knowledge repository before asking the founder to repeat settled context.
5. **Origin and rationale** — explain why the work exists, who requested it, what decision or evidence led to it, and what downstream outcome it supports. Preserve source provenance; do not convert assumptions into facts.
6. **SMART objective** — Specific, Measurable, Attainable, Relevant, and Time-bound. State the acceptance threshold and how each measure will be observed.
7. **Deliverable contract** — required artifacts, format, location, naming/versioning, evidence, handoff contents, and completion definition.
8. **Quality examples** — one or more approved examples of high-quality work where available, plus anti-examples or known failure modes. Identify which features are normative and which are merely illustrative.
9. **Procedure and tools** — approved workflow/SOP, tool and model options, source requirements, dependencies, fallback path, and recovery behavior.
10. **Verification and review** — tests, calculations, source checks, independent review, acceptance criteria, reviewer, and approver. A task is not complete merely because an output was generated.
11. **Communication and escalation** — progress/checkpoint expectations, uncertainty reporting, blockers, change-control, stop conditions, and escalation owner.
12. **Performance and cost limits** — quality measures, operational measures, time/cost budget, usage caps, and the cost per accepted deliverable where measurable.

For one-off low-risk tasks, the work package may contain a compact role contract instead of a separately maintained role document. The same essentials still apply proportionately.

### Cross-collaborator capability compatibility

These role requirements apply to **all FDG collaborators**, not one model vendor or coding environment. When a workflow uses sessions, subagents, project threads, shared context, remote execution, artifacts, connectors, plugins, diagnostics, model escalation, or other provider features:

- assess the actual collaborator, host, version, available permissions and supported interfaces;
- map native equivalents to the same FDG role, work-package, evidence and approval contract;
- use a reviewed provider adapter only when its behavior and data/permission boundaries are verified;
- use a safe manual fallback when automation is unavailable; otherwise mark the capability UNSUPPORTED, UNVERIFIED or BLOCKED;
- never infer feature parity from similar product terminology, and never grant extra authority merely because a provider exposes an automation feature.

A collaborator does not need every capability to remain eligible for other work. FMCIS selects by verified task fit; FDG-owned contracts and organizational knowledge remain provider-neutral. See [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/Claude_Code_Desktop_Session_and_Artifact_Capability_Review_2026-10-30|the cross-collaborator session/workbench compatibility review]].

## 3. SMART and verifiable delegation

Each material assignment must be framed as an outcome with a way to prove completion.

| Element | Required question |
|---|---|
| Specific | What exact result must exist, and what is in/out of scope? |
| Measurable | What observable metric, artifact, test, or evidence proves it? |
| Attainable | Are the time, tools, skills, data, and authority available? |
| Relevant | Which FDG objective, customer need, risk, or decision does it support? |
| Time-bound | What is the deadline, checkpoint cadence, and escalation point? |

**Measurability is mandatory.** Avoid vague instructions such as "improve the system", "make it excellent", or "keep going until perfect" without a defined baseline, acceptance tests, limits, and completion condition.

When a result cannot be fully quantified, define observable qualitative acceptance criteria, a named reviewer, and the evidence required for judgment. Record the baseline and method; do not invent a target merely to make a task appear measurable.

## 4. Context package and examples of good work

The assignment package should include:
- the objective and why it matters;
- links to canonical FDG context and prior decisions;
- applicable requirements, constraints, assumptions, and source evidence;
- an accepted example, sample artifact, reference image, test fixture, or expected-output example where possible;
- an anti-example or known pitfall when useful;
- expected output and exact review criteria.

A verbal instruction to "do a great job" is not a quality specification. Where no approved example exists, create and review an initial reference artifact before scaling the task. Label it as a first reference, not as an approved standard, until accepted by the proper reviewer.

## 5. Iterative feedback and institutional SOPs

For recurring work, evaluate actual outputs across representative episodes. The reviewer should give specific, artifact-linked feedback:
- what met the acceptance criteria;
- what failed or was incomplete;
- the evidence for the finding;
- the correction required;
- whether the defect was caused by missing context, unclear role scope, weak procedure, tool/model limitation, or execution error.

Consolidate recurring findings into a proposed improvement to the role contract, checklist, prompt template, test, or SOP. Compare the proposal with existing FDG standards to avoid duplicated or conflicting instructions. Validate it on representative cases and negative cases, obtain the applicable approval, version it, and retain its provenance and rollback path.

**Learning means improving FDG's documented operating method and collaborator configuration.** It does not mean that feedback has trained or changed the underlying model weights. Do not claim model training, automatic skill updates, or autonomous SOP promotion unless the relevant mechanism exists and has passed its own acceptance tests.

Do not mandate an arbitrary number of repetitions. Use enough representative episodes to identify recurring patterns and establish repeatability for the task's risk and variability. High-impact or safety-critical work requires stronger evidence and review.

All proposed skill/SOP evolution remains governed by [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]]. Proposal is not approval; preserve data minimization, source traceability, validation, authorization, reversibility, and human review.

## 6. Model and collaborator benchmarking

Maintain a stable, representative task set for recurring material roles. When a new model, provider, tool, or materially changed version is considered:
- run the same approved tasks with equivalent inputs, context, tool permissions, and documented configuration;
- compare outputs against accepted references and the same acceptance rubric;
- record factual correctness, completeness, reliability, policy/security compliance, first-pass acceptance, rework, latency, and cost;
- test failure cases and regression risks, not only best-case demonstrations;
- record exact model/version, date, settings, tool access, sample size, and limitations;
- select based on measured role fitness and total operational risk, not release claims or model popularity.

A higher benchmark score does not automatically authorize a provider change, data transfer, installation, or production routing. Follow applicable FDG approval and security controls.

## 7. Cost and capacity management

Use the lowest-cost collaborator that reliably meets the acceptance standard, with escalation to a stronger or specialized capability for tasks that justify it. Apply:
- task-to-model matching rather than routing every task to the most expensive model;
- usage budgets, caps, alerts, and periodic cost review;
- batching for delay-tolerant work only where the provider actually supports it and the latency trade-off is acceptable;
- prompt/context reuse or caching only where the runtime documents and verifies the feature and billing effect;
- cost per accepted deliverable, including failed generations, rework, review time, and downstream processing;
- provider-neutral interfaces and an exit path for essential capabilities.

Do not copy pricing, caching percentages, throughput, or cost-saving claims from the source video as FDG facts. Verify current provider documentation, account terms, and actual usage records.

## 8. Persistent execution and autonomy boundaries

A persistent role provides continuity; it does not confer unlimited autonomy or imply that an agent is continuously running in the background.

Any long-running or recurring execution must have a bounded scope, owner, authorized tools/data, budget, checkpoint cadence, durable logs, completion criteria, failure handling, stop/cancel mechanism, and escalation route. External publication, spending, customer communication, production changes, security changes, legal commitments, and high-impact engineering actions remain subject to their existing approval gates.

Never use vague instructions such as "run for weeks" or "do not stop until perfect" as a substitute for an execution contract. If authority, data rights, tests, budget, or rollback cannot be verified, pause and report the blocker.

## 9. Role performance scorecard

Choose measures appropriate to the role. Candidate indicators include:
- acceptance rate / first-pass yield;
- correctness and completeness against reviewed evidence;
- rework rate and defect severity;
- cycle time and on-time completion;
- compliance with FDG SOPs and authority boundaries;
- successful handoff and context continuity;
- cost per accepted deliverable;
- repeatability across representative cases;
- measurable customer, operational, or engineering outcome where attribution is defensible.

Do not optimize for output volume, token count, generation count, or utilization at the expense of quality, safety, rights, or business value.

## 10. Adoption and governance controls

1. Apply this standard to Nex and all current and future FDG collaborators, including human specialists, models, agents, tools, and workflows.
2. Keep role definitions and approved SOPs in provider-neutral FDG-owned knowledge. Runtime-specific prompts and adapters may implement them but do not become the source of truth.
3. Preserve explicit separation of role, responsibility, decision authority, execution permission, review authority, and approval authority.
4. Update relevant indexes and wikilinks when a role contract or approved SOP changes.
5. Record status honestly: proposed, documented, prototyped, tested, approved, deployed, or blocked.
6. Do not state that a role has been onboarded, benchmarked, automated, or made persistent unless evidence demonstrates that state.
7. The Founder and assigned domain approvers retain existing authority; this standard grants no new access, spending, installation, publishing, or production permission.

## 11. Source interpretation and evidence boundary

The source is a founder-supplied video transcript (conversation file reference turn0file0, received 2026-10-30). Its themes include role engineering, SMART delegation, context and rationale, examples of good work, iterative feedback, reusable SOPs, model benchmarking, and cost management.

The speaker's specific claims about other organizations' internal practices, code-generation percentages, model capability changes, pricing, caching savings, or projected future performance have not been independently verified here and are **not adopted as FDG facts or performance targets**. FDG adopts the general management practices only where they are consistent with its existing governance, evidence, security, privacy, and approval standards.

## 12. Role activation and ongoing management cycle

Use this operational cycle to turn a written role into a dependable collaborator. It applies the source's management approach within FDG's existing controls.

1. **Define the role before selecting the model.** Describe the durable responsibility, required capabilities, interfaces, authority, expected outputs and performance measures. Select a provider/model only after role requirements are clear.
2. **Prepare an onboarding context pack.** Include the role contract, relevant canonical FDG knowledge links, decision history, project state, origin/rationale, active constraints, dependencies, approved examples, anti-examples, tool instructions and escalation route. Prefer links and retrieval from the canonical repository over copying large amounts of stale context into every task.
3. **Connect only required work surfaces.** Identify which communication channels, repositories, files, APIs and business systems the role needs. Grant least-privilege access, scope it to the work package, record data-handling restrictions, and test that the role can retrieve and write only what it is authorized to access. A shared channel or agent interface may make a role easier to reach; it does not expand its authority.
4. **Calibrate against real work.** Start with a bounded pilot using representative tasks. Where no approved exemplar exists, have a qualified human or domain owner produce or approve the first reference output. Review a useful sample of actual outputs, identify systematic failure modes, and revise the role contract, context, examples, procedure or tests. The source suggests repeating work several times (including five to ten examples); FDG treats this as a possible calibration sample, not a mandatory quota. Sample size must fit risk, variability and available evidence.
5. **Promote only after evidence-based review.** Record pilot tasks, exact model/provider/version, configuration, permissions, results, reviewer, defects, corrective actions and residual limitations. The responsible approver decides whether the role is ready for operational use. A role document alone does not establish runtime readiness.
6. **Manage by outcomes, not constant prompting.** For operational roles, use an agreed work queue or communication surface, periodic status/checkpoint reports, exception-based escalation and durable task records. The human manager should review completed work and exceptions rather than micromanage every intermediate action. Long-running work still requires explicit scope, time/budget limits, stop conditions and approval gates.
7. **Institutionalize validated learning.** Convert recurring, verified feedback into versioned changes to role contracts, context packs, checklists, SOPs, acceptance tests or benchmark tasks. Follow NEX-COLLAB-LEARN-001. Keep the prior version and a rollback path; do not let a collaborator silently rewrite its own governing role or canonical knowledge.
8. **Reassess role fit and retire safely.** Recheck capability, quality, cost, access, provider terms and operational need at defined intervals and after material model/tool changes. Suspend or revoke access when a role is no longer needed, fails its acceptance criteria, or presents unresolved security, privacy, cost or reliability risk. Preserve required records and hand off active work before retirement.

### Role lifecycle states

Use explicit lifecycle labels in role registries and handoffs:

- **DRAFTED** — role contract is being prepared; no operational authority implied.
- **APPROVED_FOR_PILOT** — scope and pilot permissions approved; limited test only.
- **PILOTING** — representative tasks are being evaluated; outputs require review.
- **OPERATIONAL** — acceptance evidence and applicable approvals exist; only documented permissions apply.
- **SUSPENDED** — execution paused pending investigation, reapproval or remediation.
- **RETIRED** — role no longer active; access revoked or reduced and records retained according to policy.

Do not use "persistent", "staff member", "onboarded", "autonomous" or "operational" as evidence of continuous background execution. These terms describe the intended management model unless a specific runtime has been separately implemented and verified.

### Manager's recurring review

At an interval proportionate to role risk and workload, the role owner reviews completed deliverables and exceptions; first-pass acceptance and rework; recurring defects and root causes; changes in project context; access and data scope; cost per accepted output; provider/model changes; and whether the role remains relevant. Record decisions and assign corrective work with an owner, due date and verification method.

## 13. Implementation status and next actions

**Status:** DOCUMENTED / FOUNDER-DIRECTED / RUNTIME_ROLE_INVENTORY_PENDING / BENCHMARK_SUITE_PENDING / ACCEPTANCE_TESTS_NOT_RUN

Next actions:
1. Inventory existing Nex, Agentic Framework, and FMCIS role/work-package standards and identify gaps without duplicating them.
2. Prepare a concise, provider-neutral role-contract template and a first set of high-value role profiles.
3. Select representative repeatable tasks and create reviewed reference outputs and acceptance rubrics.
4. Define a benchmark record and cost-per-accepted-output method.
5. Pilot one bounded role with explicit permissions, checkpoints, stop conditions, review, and evidence.
6. Update relevant collaborator handoffs and role packages from pilot findings only after review and approval.

## Related standards

- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_ECOSYSTEM_STANDARD|NEX Collaborator Ecosystem Standard]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|NEX Collaborator Handoff and Team Intelligence Standard]]
- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]]
- [[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|Project-Start Skills and Security Gate]]
- [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|FDG Global Open-Source-First, Reuse, and Capability Development Standard]]
