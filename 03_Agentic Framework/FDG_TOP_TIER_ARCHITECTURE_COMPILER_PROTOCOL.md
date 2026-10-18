# FDG Top-Tier Architecture Compiler & Token-Efficiency Protocol

**Status:** Active Operating Instruction  
**Owner / Final Authority:** Francis  
**Orchestrator:** Nex  
**Applies To:** Astra, Fable, Opus, future top-tier models, and any successor capability selected for high-value architecture/review work  
**Canonical Source of Truth:** GitHub `guinoome/fdg-knowledge-repository`  
**Effective:** 2026-10-06

---

# 1. Mission

Use top-tier reasoning capability only where it creates disproportionate value.

The top-tier agent is not the default day-to-day coder.

Its primary role is to act as an **Architecture Compiler**:

```text
Human Intent
   ↓
Repository Audit
   ↓
FPJIS Blueprint / Architecture
   ↓
Top-Tier Reasoning
   ↓
Compressed Execution Package
   ↓
FMCIS Work Packages
   ↓
Older / cheaper / local / specialist agents
   ↓
Tests + evidence
   ↓
Escalation only when required
   ↓
Repository knowledge return
```

The goal is to reduce repeated expensive reasoning while preserving consistent FDG-quality execution.

A lower-tier or older agent cannot be guaranteed to have identical raw capability to a top-tier model. The target is therefore:

> **Behavioral equivalence inside a precisely defined task envelope.**

The top-tier agent must make the task sufficiently explicit, bounded, testable, and repository-grounded that implementation quality depends primarily on following the package rather than rediscovering architecture.

---

# 2. Governing Principle

> Spend expensive intelligence on architecture, ambiguity removal, critical review, and acceptance design — not on repeatedly rediscovering the same project context during implementation.

The durable output of top-tier reasoning must be stored in the FDG Knowledge Repository.

Conversation-only reasoning is temporary.

---

# 3. Source-of-Truth Rule

The GitHub FDG Knowledge Repository is the canonical source of truth for:

- governance
- architecture
- decisions
- standards
- project blueprints
- work-package definitions
- implementation instructions
- acceptance criteria
- handovers
- validated lessons
- reusable capability

Do not rely on conversational memory when repository knowledge exists.

Do not paste the entire repository into context.

Retrieve only the minimum authoritative files required for the objective.

---

# 4. Required Systems During Project Work

## FPJIS — Project Intelligence

FPJIS governs:

- project definition
- project blueprint
- user/role blueprint
- workflow blueprint
- module blueprint
- data/database/API blueprints
- security/entitlement
- integrations
- deployment
- testing
- decisions/revisions
- implementation package
- design quality gate

Before major implementation:

```text
Intent
→ FPJIS Blueprint
→ Quality Gate
→ Build Authorization
```

If the blueprint is incomplete:

> **NOT READY — REVISION REQUIRED**

Do not compensate for missing architecture by improvising code.

## FMCIS — Multi-Collaborator Intelligence

FMCIS governs:

- capability selection
- collaborator allocation
- work-package boundaries
- independent review
- debate/conflict handling
- loop engineering
- handover
- engagement memory
- founder approval/escalation

FMCIS should maximize:

> **useful intelligence per unit of time, token, and cost**

—not the number of agents.

Default implementation pattern:

> **one primary builder + independent reviewers when justified**

rather than forced multi-agent development.

---

# 5. When a Top-Tier Agent Is Required

Use Astra/Fable/Opus-class or future top-tier capability when one or more of the following applies:

1. a new system or major architecture is being created
2. existing canonical knowledge may conflict
3. the correct system boundary is unclear
4. multiple FDG systems must integrate
5. a project blueprint is incomplete or disputed
6. requirements are ambiguous with high rework risk
7. security/privacy/legal/commercial/engineering consequence is high
8. a major schema/data migration is proposed
9. a large codebase requires architectural refactoring
10. independent audit/review of material repository changes is required
11. multiple agents disagree and evidence must be reconciled
12. the implementation repeatedly fails acceptance tests
13. a reusable capability is being promoted into canonical FDG knowledge

Do **not** use a top-tier model merely because it is available.

---

# 6. When a Lower-Cost Agent Is Preferred

Use older, cheaper, local, or task-specialist agents when:

- the blueprint is already approved
- scope is explicit
- file ownership is explicit
- interfaces are defined
- expected outputs are defined
- acceptance tests exist
- required knowledge is referenced
- no unresolved high-risk ambiguity exists

Examples:

- implementing one screen from an approved screen blueprint
- writing CRUD against an approved schema
- adding a known validation rule
- executing defined refactors
- writing tests from defined acceptance criteria
- updating documentation from known changes
- fixing bounded defects
- converting approved designs into code

---

# 7. Top-Tier Agent Workflow

## Step 0 — Parse the Objective

State:

- desired outcome
- why it matters
- in-scope
- out-of-scope
- success criteria
- known constraints
- unknowns

Do not begin implementation reasoning until the objective is clear.

## Step 1 — Repository Retrieval

Search the GitHub FDG Knowledge Repository.

Retrieve only:

1. governing authority
2. relevant master index
3. current project blueprint
4. applicable standards
5. existing decisions
6. affected schemas/interfaces
7. active handover
8. changed files or implementation evidence

Use **read-by-reference**, not repository dumping.

## Step 2 — Reuse / Extend / Merge / Challenge Decision

For every proposed capability determine:

- **Reuse** — already exists
- **Extend** — existing authority is correct but incomplete
- **Merge** — duplicate concepts should converge under one authority
- **Controlled Successor** — prior architecture needs explicit evolution
- **Challenge** — evidence suggests canonical knowledge may be wrong
- **New** — capability genuinely does not exist

Do not create duplicate systems for convenience.

## Step 3 — FPJIS Blueprint Check

Before coding, verify the relevant FPJIS blueprint(s):

- project
- user/role
- workflow
- module
- screen
- data
- database
- API
- business rules
- security
- entitlement
- automation
- integration
- deployment
- testing
- decision/revision

Identify missing blueprints.

## Step 4 — Architecture Compression

Convert the problem into a **Top-Tier Execution Package**.

The package must remove as much rediscovery as reasonably possible for the implementation agent.

## Step 5 — FMCIS Work-Package Decomposition

Split only along real dependency boundaries.

Each work package must have:

- objective
- owner/capability requirement
- dependencies
- files/components in scope
- files/components read-only
- inputs
- outputs
- acceptance criteria
- validation evidence
- escalation triggers

Do not split work merely to create more agents.

## Step 6 — Repository Update Before Expensive Implementation

Write the validated architecture, blueprint, decision, execution package, or handover back to the repository.

The next agent should be able to start by reading repository paths rather than repeating top-tier discovery.

## Step 7 — Delegate Implementation

Use the lowest-cost agent that satisfies the capability requirement.

The implementation agent must follow the approved package rather than redesign the system.

## Step 8 — Validate

Run:

- automated tests
- static checks
- integration checks
- UI/UX verification where applicable
- security checks where applicable
- engineering validation where applicable
- acceptance criteria

## Step 9 — Escalate Only on Defined Triggers

Return to a top-tier agent only if:

- architecture is invalidated
- a required blueprint is missing
- an interface conflicts
- acceptance tests expose a systemic defect
- new evidence changes the decision
- risk exceeds assigned authority
- the lower-tier agent cannot proceed without inventing architecture

## Step 10 — Knowledge Return

After validation:

```text
Execution Result
→ Evidence
→ Lesson
→ Review
→ Repository Update
→ Future task becomes cheaper
```

---

# 8. Top-Tier Execution Package — Mandatory Format

Every material top-tier architecture task should produce a package containing the following.

## A. Task Identity

- Task / Work Package ID
- title
- owner
- project
- status
- repository checkpoint / commit
- date

## B. Objective

One precise statement of what must be achieved.

## C. Non-Goals

Explicitly state what must not be changed.

## D. Source-of-Truth References

List exact repository paths.

Do not copy full documents unless necessary.

## E. Existing Decisions to Preserve

List canonical decisions that constrain implementation.

## F. Assumptions and Unknowns

Each assumption should have:

- assumption
- reason
- impact
- confidence
- validation required

## G. Architecture Decision

Describe:

- selected approach
- alternatives considered
- why selected
- trade-offs
- future implications

## H. Exact Change Map

### Create
- exact files/components

### Modify
- exact files/components

### Read Only
- dependencies that must not be changed

### Explicitly Out of Scope
- neighboring systems/files

## I. Contracts

Define applicable:

- data schema
- API
- events
- state transitions
- interfaces
- component contracts
- storage rules
- permissions
- error behavior
- offline/sync behavior

## J. Step-by-Step Golden Path

Provide an ordered implementation sequence detailed enough that a lower-cost agent does not need to rediscover architecture.

Each step should state:

- action
- file/component
- expected result
- dependency
- validation

## K. Edge Cases and Failure Modes

State known:

- empty states
- loading states
- error states
- restricted states
- offline states
- conflict states
- invalid input
- partial data
- race/concurrency risks
- migration risks

## L. Security / Privacy / Authority

State:

- user authority
- sensitive data
- tenant boundary
- credential handling
- approval boundary
- audit requirements

## M. Test Matrix

Include:

- unit
- integration
- regression
- UI/E2E where applicable
- security
- performance where relevant
- engineering validation where relevant

## N. Acceptance Criteria

Every criterion must be objectively verifiable.

Avoid vague requirements such as:

- "looks good"
- "works well"
- "best practice"

Prefer measurable outcomes.

## O. Rollback / Recovery

Define how to recover if the implementation fails.

## P. Completion Evidence

Specify what the builder must return:

- files changed
- tests run
- screenshots/logs where relevant
- known limitations
- unresolved issues
- commit/PR
- acceptance evidence

## Q. Escalation Triggers

Specify exactly when the implementation agent must stop and ask for higher reasoning.

---

# 9. Context Compression Standard

The top-tier agent must produce an **Agent Context Capsule** for implementation.

The capsule should contain only:

- objective
- relevant architecture
- exact source paths
- exact decisions
- exact constraints
- work-package instructions
- acceptance criteria
- escalation rules

Do not include:

- unrelated repository history
- full conversation transcripts
- entire standards when a path reference is sufficient
- speculative alternatives already rejected
- repeated explanations

Principle:

> **Reference durable knowledge; do not repeatedly re-transmit it.**

---

# 10. Token-Efficiency Rules

1. Search before reading.
2. Read indexes before deep files.
3. Read changed/affected files before unrelated context.
4. Use exact repository paths in handovers.
5. Prefer diffs/deltas over complete historical copies.
6. Do not restate canonical standards in every work package.
7. Link to authority instead of reproducing it.
8. Preserve decisions so future agents do not revisit settled questions.
9. Create acceptance tests early to reduce reasoning loops.
10. Escalate only after a defined failure/ambiguity trigger.
11. Do not ask a top-tier model to perform deterministic work a cheaper agent can execute.
12. Do not ask several top-tier models to solve the same low-risk task.
13. For high-consequence decisions, use independent review rather than repeated self-review.
14. Return reusable learning to the repository so the next project costs fewer tokens.

---

# 11. Model / Agent Tiering

Use capability tiers rather than permanent provider names.

## Tier A — Top-Tier Architecture / Audit

Examples:

- Astra
- Fable
- Opus
- future strongest reasoning models

Use for:

- architecture
- ambiguity resolution
- major reviews
- high-risk decisions
- repository audits
- execution package compilation

## Tier B — Strong Implementation / Specialist

Use for:

- complex coding inside approved architecture
- difficult debugging
- domain-specific implementation
- integration work

## Tier C — Standard / Older / Lower-Cost Agent

Use for:

- deterministic implementation packages
- routine coding
- tests
- documentation
- migrations with explicit instructions
- bounded bug fixes

## Tier D — Deterministic Automation

Use for:

- formatting
- validation scripts
- lint
- schema checks
- file generation
- repeatable transforms
- mechanical repository maintenance

Always select the lowest tier that can satisfy the acceptance criteria reliably.

---

# 12. Top-Tier Review Rule

Top-tier reviewers **enhance, verify, and evolve** FDG knowledge.

They do not silently contradict canonical knowledge.

If new evidence conflicts with the repository:

```text
Existing Canonical Decision
        +
New Evidence
        ↓
Conflict / Challenge Record
        ↓
Independent Review
        ↓
Controlled Evolution Decision
        ↓
Successor / Amendment / Correction
        ↓
Wikilinks + History Preserved
```

Never preserve a known error merely to avoid contradiction.

The rule is:

> **No silent contradiction. No silent overwrite. Evidence-driven controlled evolution.**

---

# 13. Independent Review

For material architecture, security, engineering, legal, commercial, or repository-wide changes:

- use an independent reviewer where practical
- reviewer should inspect original sources
- reviewer should not merely paraphrase the builder
- record agreement and disagreement
- evidence quality decides, not model prestige

See:

- [[03_Agentic Framework/TOP_TIER_REPOSITORY_REVIEW_WATCH|Top-Tier Repository Review Watch]]
- [[08_FEIS_Engineering_Intelligence_Systems/05_Multidiscipline_Engineering_Intelligence/FEIS-MDE-0900 - Top Tier Cross Model Review Handover|Top-Tier Cross-Model Review Handover]]

---

# 14. Repository Mutation Rules

When updating the GitHub FDG Knowledge Repository:

1. search before creating
2. preserve existing approved content
3. use additive evolution by default
4. do not delete simply because a newer idea exists
5. preserve superseded knowledge when historically useful
6. add successor/evolution notes
7. update parent indexes
8. update meaningful Wikilinks
9. preserve provenance
10. record decisions
11. do not rewrite another collaborator's assigned work without authorization
12. do not turn research directly into canonical authority without review

---

# 15. Project Build Sequence

Preferred sequence:

```text
Intent
  ↓
Repository Audit
  ↓
FPJIS Project Blueprint
  ↓
FPJIS Design Quality Gate
  ↓
Top-Tier Architecture Compilation
  ↓
Repository Execution Package
  ↓
FMCIS Capability / Work-Package Allocation
  ↓
Primary Builder
  ↓
Automated Tests
  ↓
Independent Review if required
  ↓
Loop Engineering
  ↓
Acceptance
  ↓
Repository Knowledge Return
```

---

# 16. Lower-Tier Agent Instruction Contract

Every delegated implementation agent should be told:

> You are implementing an approved FDG Execution Package. Do not redesign architecture unless an escalation trigger occurs. Read only the cited repository authorities and files relevant to your work package. Do not modify out-of-scope files. Implement the Golden Path, run the required tests, return completion evidence, and stop/escalate if the package is internally inconsistent or new evidence invalidates a governing assumption.

This contract is intended to make implementation behavior consistent across model generations.

---

# 17. Quality Goal

The goal is not to make every model intellectually identical.

The goal is to make the **system of work** strong enough that model variance has minimal effect on bounded implementation quality.

FDG quality should increasingly come from:

- repository knowledge
- explicit architecture
- validated blueprints
- work-package boundaries
- schemas/contracts
- deterministic tests
- evidence
- review
- organizational learning

—not from repeatedly purchasing the most expensive model for every coding step.

---

# 18. Required Output from Astra / Top-Tier Agent

When invoked for a major FDG task, return:

1. **Repository Audit Summary**
2. **Reuse / Extend / Merge / Challenge / New Decision**
3. **FPJIS Blueprint Gaps**
4. **Architecture Decision**
5. **Top-Tier Execution Package**
6. **Agent Context Capsule**
7. **FMCIS Work-Package Plan**
8. **Model/Capability Tier Recommendation per Work Package**
9. **Acceptance-Test Matrix**
10. **Escalation Triggers**
11. **Repository Files to Create/Update**
12. **Wikilink Update Plan**
13. **Independent Review Requirement**
14. **Knowledge Return Plan**

Then update the repository with validated durable artifacts.

---

# 19. Anti-Patterns

Do not:

- use Astra/Opus/Fable as the default coder for routine tasks
- dump the full repository into every prompt
- repeat architecture discovery already stored in GitHub
- create a new module because a vendor/course uses a new label
- let implementation agents silently redesign FPJIS blueprints
- force multi-agent execution without dependency justification
- treat consensus as evidence
- let knowledge remain only in chat
- hard-code FDG around one model/provider
- silently contradict canonical knowledge
- delete older decisions without trace
- create vague handovers without acceptance tests
- use top-tier tokens for formatting, linting, or deterministic transforms

---

# 20. Definition of Success

This protocol succeeds when:

- top-tier usage decreases
- implementation rework decreases
- lower-cost agents complete more tasks without escalation
- architecture remains coherent
- FPJIS blueprints improve
- FMCIS work packages become more deterministic
- acceptance tests catch deviations early
- repository context becomes easier to retrieve
- future model/provider changes have low disruption
- validated project learning compounds in the FDG Knowledge Repository

---

# 21. Connected Knowledge

- [[03_Agentic Framework/TOP_TIER_REPOSITORY_REVIEW_WATCH|Top-Tier Repository Review Watch]]
- [[07_Nex_Core_Intelligence/AGENT_CONTEXT_ARCHITECTURE_STANDARD|Agent Context Architecture Standard]]
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Nex Context Package Standard]]
- [[07_Nex_Core_Intelligence/NEX_CORE_CONTEXT_PACKAGE_OPERATIONAL_STANDARD|Context Package Operational Standard]]
- [[20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture|FPJIS Master Architecture]]
- [[20_FPJIS_FDG_Project_Intelligence_System/21_Agent_Task_Blueprints/Agent_Task_Blueprint|FPJIS Agent Task Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/28_Quality_Gates/Design_Quality_Gate|FPJIS Design Quality Gate]]
- [[20_FPJIS_FDG_Project_Intelligence_System/99_Implementation_Instructions/Codex_Claude_Other_Collaborator_Instructions|Implementation Collaborator Instructions]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]]
- [[21_FDG_Multi_Collaborator_Intelligence_System/FMCIS-CURRENT-DESIGN-RECAP|FMCIS Current Design Recap]]
- [[22_FDG_Audit_Intelligence_System/11_AI_Agent_and_Collaborator_Audit/FAIS-AIA-1100 - AI Agent and Collaborator Audit|AI Agent and Collaborator Audit]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this protocol

---

## Execution Template Integration — 2026-10-06

The founder-supplied `FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL.md` (effective 2026-10-06) was reviewed against this fuller canonical protocol at repository checkpoint `886e96744b899e05ae55178c924413411d960ef5`. Its operating direction is already represented here; the existing protocol is retained rather than replaced by the shorter supplied copy.

Francis explicitly reconfirmed on 2026-10-06: GitHub is the new source of truth and is no longer read-only. The repository entry points and affected FMCIS guidance now state that authorized durable knowledge updates return to GitHub; local copies remain working mirrors. Earlier local-only instructions are marked historical where encountered, with their original content preserved.

Use the [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Top-Tier Execution Package Template]] to instantiate sections A–Q and the compact Agent Context Capsule. The template implements this protocol under the existing FPJIS readiness and build-authorization controls; it is not a separate authority or an approved project package.

The [[21_FDG_Multi_Collaborator_Intelligence_System/FMCIS-CURRENT-DESIGN-RECAP|FMCIS Current Design Recap]] now explicitly points to the existing source-of-truth evolution so its historical read-only GitHub statement cannot be mistaken for current direction.


---

## FREIS and Astra-Level Markdown Extension — 2026-10-11

Francis directed that deep reverse engineering of other projects become durable reference knowledge and that coding starts from Astra-level Markdown even when other, older or lower-cost agents implement. This is an artifact-quality requirement, not a provider dependency or guarantee of identical intelligence.

Use [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FREIS/FREIS_Research_to_Coding_Contract|the FREIS research-to-coding contract]] with the existing A–Q template. Resolve task-specific architecture, exact build steps, contracts, fixtures, expected outcomes and evidence mapping before coding. Reuse unchanged approved packages; record material deltas. Existing FPJIS readiness, authorization and finished-session controls apply. Research is governed by [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FREIS/FREIS_Mandate_and_Method|the FREIS mandate]].


---

## Project-Wide Astra Compilation Before Coding — Founder Clarification, 2026-10-11

**Applicability:** All FPJIS-governed project coding, including projects without FREIS research. This clarification extends the earlier FREIS-specific addition.

Francis's direction: Astra prepares full, detailed, complete Markdown describing how to build the project, so Haiku, Sonnet, Sol or other implementation agents can achieve the same accepted functional outcome. Astra is the requested architecture compiler; the durable standard remains agent-neutral. If Astra is unavailable, record that fact and the compiler actually used; do not label another model's work Astra-authored. Existing capability selection governs any substitute.

“Same results” means conformance to the same requirements, interfaces, behavior, visual specifications where applicable, engineering tolerances and acceptance tests. It does not require byte-identical source code or claim identical model intelligence. Equivalence remains unproven until implementation evidence passes the defined checks.

### Compiler deliverables

Before the relevant coding starts, the compiler must review existing decisions and produce or extend:
1. A project Markdown entry point: objective, architecture, module roadmap, dependencies, source checkpoint, document status and exact blueprint links.
2. Complete applicable FPJIS blueprints for each executable module: users/roles, screens, workflows, data/database, API/events, business and engineering rules, security/privacy/threat model, entitlements, applicable payment/communication/automation/integration, offline/sync, testing, release/operations, decisions and revisions.
3. A–Q execution packages with exact change maps, ordered build steps, contracts, fixtures, expected results, rollback and escalation boundaries.
4. A requirement → blueprint → implementation → test → evidence manifest, plus a compact context capsule and completion handover.

Complete means sufficient for the assigned builder to implement without inventing consequential architecture. Mark nonapplicable dimensions with reasons. Identify future unresolved scope explicitly; a 100%-ready authorized bounded module can proceed even when the entire project is incomplete.

### Implementation precision

Specify actual repository paths and component responsibilities, compatible runtime/dependency requirements, setup commands, configuration names without secrets, schema fields/types/constraints/units, formulas and rounding, state transitions, API payload examples, validation/error behavior, permissions and audit requirements. Define offline operation, persistence, sync/conflicts, provider boundaries and failure recovery.

For screens, give layout/component hierarchy, design tokens or existing design-system references, responsive behavior, accessibility and every relevant state. Supply suitable visual references when they resolve ambiguity. A generic instruction such as “make a premium dashboard” is not an executable design.

For every implementation step specify prerequisites, action, file/symbol, expected result, verification and failure handling. Supply pseudocode or worked examples for nontrivial logic and test inputs with expected outputs/tolerances. Commands must match the project; record unverified setup assumptions.

### Ready-to-code and builder contract

Check that source references resolve; requirements map to applicable blueprints and tests; contracts agree; no blocking TBD remains; applicable package readiness is 100%; existing authorization covers the work. Reuse prior approved packages and verified unchanged context, updating only relevant deltas.

The builder reads the package/capsule, implements the steps, verifies expected results and returns acceptance evidence. It does not silently redesign architecture or fill missing rules by guessing. Escalate the affected gap with evidence while continuing independent authorized work.

Finish a usable vertical slice, update the implementation/status/manifest records, and return CLOSED or BLOCKED WITH EVIDENCE. Record actual tests and checks not run. Refinements learned during execution return to the blueprints.

**Measure effectiveness:** clarification requests, rework, acceptance success, deviations and measured effort/cost. Detailed Markdown is a means to reproducibility, not proof of quality by itself.

**Canonical form:** [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Top-Tier Execution Package Template]].


---

## Current Compiler–Builder–Auditor Contract — 2026-10-11

**Authority:** Francis's clarification on 2026-10-11. Applies to all FPJIS-governed coding. This section supersedes earlier Astra-specific selection wording; historical text above remains for traceability.

### Roles and accountability

- **Architecture compiler:** a top-tier OpenAI or Anthropic agent prepares complete, detailed Markdown FPJIS blueprints and executable packages. Select on demonstrated suitability for the task, record actual provider/model and version when available, and keep all outputs portable.
- **Builder:** Haiku, Sonnet, Sol or another capable agent implements within the package's contracts and common acceptance criteria.
- **Auditor:** a top-tier OpenAI or Anthropic agent audits the actual implementation and evidence before the work is marked accepted. Prefer an agent/session independent of the builder. The compiler may audit the implementation, but must challenge its own blueprint assumptions as well. Record overlap; builder self-review is not independent audit.
- **Accountable owner:** retains project acceptance and existing authorization authority. Audit results do not grant deployment authority.

The role is a capability requirement, not a permanent model ranking. Never claim a named model authored or audited work unless it actually did so. If the required auditor is unavailable, record AUDIT PENDING rather than claim acceptance. Other authorized work may continue.

### Complete blueprint and package contract

Reuse the existing A–Q format and authoritative FPJIS blueprints. Before coding a bounded package, provide:
1. Context, outcome, scope, requirements with IDs, source versions/checkpoint, preserved decisions, assumptions and explicit blocking unknowns.
2. Selected architecture, component boundaries, dependency sequence, rejected alternatives and decision rationale.
3. Exact files/components and ownership; interfaces, schemas, types, constraints, API/event examples, permissions, error handling and state transitions.
4. Engineering rules, units, formulas, rounding, invariants and worked examples; applicable UX layouts, design-system references, responsiveness and interaction states.
5. Ordered build steps with prerequisites, action, path/symbol, expected result, verification and failure response.
6. Repository-grounded setup and test commands, runtime/dependency requirements, fixtures and expected outputs/tolerances. Identify commands or assumptions not yet verified.
7. Security/privacy/threat controls, local-first/offline behavior, persistence/sync/conflicts, provider boundaries, migrations and recovery where applicable.
8. Acceptance matrix, audit scope, evidence destinations, rollback procedure and next-agent context capsule.

Every applicable requirement must map to a blueprint, implementation location, acceptance check and eventual evidence. N/A requires a reason. No consequential design decision is silently delegated through “use best practices.” Scope completeness applies to the executable package; future modules may remain explicitly unresolved.

### Verification and audit

Audit the exact submitted commit or artifact version. Inspect requirements and governing decisions, changed code, relevant dependencies, test implementation and actual results. Do not approve solely from a builder summary or passing test count.

Check:
- requirement coverage and omissions;
- contract and architectural conformance;
- correctness of expected test values against independent rules/examples;
- normal, boundary, invalid, failure and recovery behavior;
- access boundaries, data handling, offline/sync behavior and migrations where relevant;
- usable end-to-end behavior and visual requirements where applicable;
- regressions, scope drift, unresolved limitations and evidence authenticity.

Run risk-relevant checks where possible. Record commands, environment, actual result and evidence location; mark unavailable checks NOT RUN with their effect on the verdict. Audit detail scales with consequence and change scope, but every submitted coding package receives a recorded audit.

Findings contain ID, severity, affected requirement/file, reproduction/evidence, impact, required correction, owner and retest condition. Use existing FAIS severity definitions rather than inventing a competing taxonomy.

Audit verdict: PASS, CHANGES REQUIRED, or BLOCKED. Blocking defects and unmet mandatory acceptance criteria prevent acceptance. The builder corrects findings; the auditor rechecks affected behavior and relevant regressions. Never weaken an acceptance criterion solely to make failing code pass. Genuine requirement changes use a versioned decision and updated blueprint.

### Checkpoints and efficient reuse

Bind each package, audit and evidence set to its source and implementation revisions. Reuse unchanged validated evidence only when scope, dependencies, environment and assumptions remain applicable. Review deltas and their impact rather than repeating a whole repository audit. Re-audit invalidated evidence; agent identity alone is not a reuse criterion.

A later code change cannot inherit PASS without an impact review. Record which evidence remains valid and which checks must rerun. Use bounded correction loops and escalate systemic failure or missing architecture to the compiler.

### Completion and organizational learning

Track implementation submitted, audit pending, changes required, blocked and accepted explicitly; map these into the project's existing lifecycle. CLOSED requires the applicable criteria passed, audit PASS, required owner acceptance, and repository evidence/status updates. A blocked session leaves a reproducible handover.

Return actual compiler/builder/auditor identities, blueprint and implementation revisions, changed files, requirement coverage, test results and checks not run, audit findings/dispositions, remaining limitations, recovery status, decisions, lessons, updated manifests/indexes/wikilinks and next action.

Keep proposed lessons distinct from reviewed standards. Preserve superseded decisions. Store portable Markdown and open evidence formats in the canonical GitHub repository; do not make a vendor session the only record.

### Effectiveness measures

Measure acceptance on first submission, escaped defects, correction cycles, clarification count, requirement coverage, effort/cost where observable and evidence reuse. “Same results” means the same validated behavior and acceptance thresholds, not identical code or guaranteed model capability. Improve blueprints when audits expose recurring ambiguity.

**Implementation form:** [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|A–Q execution package]].

## 2026-10-17 — Exhaustive Functional Audit + Simple Legacy Build Card

The future repository-wide audit run is governed by [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|Full Repository Product Reality Audit Handover]] under **FAIS**, while the existing FPJIS/FMCIS architecture, audit and authority rules continue unchanged. It explicitly requires complete tracked-path coverage disposition and actual product/source/test/user-outcome evidence. New architecture/documentation alone does not count as functioning FDG products.

For older/limited-context/cheaper builders, **render the authorized A–Q package into [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|Legacy Agent One-Page Build Card]]**: simple objective, existing code, exact files, three-to-seven ordered steps, fixture/test expected answers, limits/STOP conditions and proof return. The full A–Q remains top-tier backing evidence, not a large prompt that must be fed to every builder. Actual model identity must be recorded; labels Astra/Upos/Fable/Methos/future are not proofs of tool capability or identical provider identity.

## 2026-10-19 — Founder Delegation-First Execution Precedence

**Operating clarification:** the lead/top-tier architect/reviewer is an **orchestrator**, not a routine implementer. Follow the canonical [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001 Delegation-First Execution Rule]]: dispatch approved deterministic coding, testing, source extraction and documentation to an actual lower-cost capable worker; prefer verified available **Sol or Upos**. Reserve **Astra, Fable, Methos** or future top-tier agents for substantive architecture, risk review, ambiguity resolution and independent critique. Only leaf/worker agents execute the assigned change; no infinite re-delegation. Lack of a subagent runtime is **DISPATCH BLOCKED**, not a license to fake delegation. This strengthens the prior "use the lowest capable tier" language, while preserving existing task-specific permission, source ownership and professional acceptance. Names reflect founder preferences, not assumed product/model capabilities or cost.
