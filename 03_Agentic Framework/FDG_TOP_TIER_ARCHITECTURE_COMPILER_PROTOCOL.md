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
