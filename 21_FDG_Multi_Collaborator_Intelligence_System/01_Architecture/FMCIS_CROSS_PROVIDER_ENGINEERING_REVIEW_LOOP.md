---
system: FMCIS
document_type: Cross-provider execution capability standard
status: Founder-endorsed architecture direction; execution validation pending
owner: FDG Multi-Collaborator Intelligence System
date: 2026-10-15
canonical: true
implementation: Claudex Loop (replaceable)
---

# FMCIS — Cross-Provider Engineering Review Loop

**Canonical owner:** FMCIS, under `21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/`  
**Authority:** Founder final approval; Nex is the FDG agent orchestrator; FMCIS governs collaborator coordination.  
**Implementation status:** Repository bootstrap, installer scripts, and entry instructions exist; no claim of local CLI installation or live two-provider verification is made.  
**External adapter:** [chaseai-yt/claudex-loop](https://github.com/chaseai-yt/claudex-loop) (MIT); pinned integration reference `53cddc42e39346fb8c6d5d612281a3b1add14e66`.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] → this document

## 1. Ownership boundary and purpose

**FMCIS owns collaboration intelligence. Claudex provides one execution mechanism. Nex orchestrates the agents. FDG retains the knowledge.**

The Agentic Framework establishes general agent behavior, readiness, scope and authority. FMCIS owns multi-provider selection, scoped delegation, independent critique, evidence exchange, disagreement arbitration, loop termination and engagement memory. FPJIS consumes the capability in project work packages; FAIS performs audit assurance independently and is not replaced by a passing cross-review.

The fundamental rule is: **the builder must not be the sole grader of its own work** when an appropriately independent reviewer is available and proportionate to the risk. Agreement between models is not proof. Evidence, acceptance tests, controlled remediation and human authority remain required.

This capability is not a new intelligence system and does not grant any agent permission to redesign other domains, act outside its work package or deploy unapproved software.

## 2. Governed workflow

```text
Founder objective / approved work package
             ↓
Nex orchestrator / FMCIS capability selection
             ↓
Recon: current repository, relevant master indexes, code and evidence
             ↓
Requirements, constraints, ownership boundaries, acceptance/proof commands
             ↓
Versioned plan + plan fingerprint
             ↓
Independent provider challenges plan
             ↓
Evidence-backed findings → host arbitration → revise / approve / block
             ↓
Authorized builder implements only assigned scope
             ↓
Unit/integration/security checks and proof commands
             ↓
Fresh independent provider inspects resulting change set
             ↓
Remediation by authorized owner → re-test → re-inspection
             ↓
Explicit outcome + evidence + handover
             ↓
FMCIS engagement record → governed FDG Knowledge Repository
```

Cross-provider pairing is directional, not fixed: Claude Code can build while Codex reviews, or Codex can build while Claude Code reviews. Planner and builder may be different from reviewer and inspector where the work requires it. A provider change requires an explicit, recorded handoff—not silent fallback.

## 3. Canonical responsibilities

| Role | Accountability |
| --- | --- |
| Founder | Approves consequential decisions, scope changes and publication where required |
| Nex | Orchestrates capability allocation, arbitration and organizational learning within delegated authority |
| FMCIS | Coordinates engagement, provider selection, cross-review and state/evidence exchange |
| Planner | Reconstructs requirements, boundaries, assumptions and proof plan |
| Independent reviewer | Adversarially critiques plan with evidence; cannot authorize implementation |
| Authorized builder | Modifies only owned work package; runs specified checks |
| Independent inspector | Reviews actual code/diff, proof and acceptance evidence independently |
| FPJIS | Receives project-level completion and roadmap evidence |
| FAIS | Separately assesses auditability, control adherence and assurance claims |

Never silently rewrite or take over another collaborator's files. Reviewer recommendations are findings or proposed patches until the authorized owner applies them.

## 4. Review and termination protocols are owned by existing FMCIS work packages

Do **not** create competing standards or new numbered `FMCIS-004`/`FMCIS-005` variants:

- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-004_Debate_Protocol|FMCIS-004 Debate Protocol]] governs finding evidence, disagreement, arbitration and dispositions.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005 Loop Termination Criteria]] governs budgets, convergence, exhausted rounds, blocked status, invalidated approval and stopping decisions.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS-003 Work Package Allocation]] owns editing boundaries and collaborator scope.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-007_Founder_Approval_Gate|FMCIS-007 Founder Approval Gate]] remains the eventual owner of detailed approval workflows.

These four work packages retain their existing sequential design status. The current Claudex implementation contributes **bounded interim requirements**, not a claim that those work packages are fully designed.

## 5. Selection: full loop, one-off challenge, or normal execution

Use a **full plan/build/inspection loop** for material architecture changes, multi-file features, security/privacy/authorization changes, data migrations, production-sensitive changes, costly rework risks and complex uncertain defects. Use **one-off independent review** for bounded high-value decisions. Use standard, proportionate verification for documentation and trivial low-risk changes.

FMCIS should select providers using evidence for: task fit, capability, material independence, context coverage, model/CLI availability, price and latency, repository/privacy constraints, verifiable track record and need for tools. Cost optimization is downstream of mandatory risk/quality gates. Choosing the same provider in separate sessions is not equivalent to a cross-provider check; label the evidence accurately.

Do not force cross-provider loops for every edit or spin up more agents merely to increase agent count.

## 6. Minimum engagement and evidence contract

Every substantive loop should record:

```yaml
engagement_id: <assigned engagement reference>
work_package: <governing FDG work package>
source_ref: <repository branch and baseline commit>
scope_owner: <authorized owner>
plan_path: <path>
plan_sha256: <actual calculated hash>
requirements: <references and acceptance criteria>
provider_roles: <planner/reviewer/builder/inspector; requested and observed models>
review_rounds: <count and configured limit>
review_findings: <file or structured finding records>
dispositions: <accepted/rejected/deferred; evidence and deciding authority>
proof_commands: <commands actually run, exit status and artifacts>
change_manifest: <changed/staged/untracked files or patch fingerprint>
inspection_ref: <reviewer identity and inspected artifact/commit>
open_risks: <unresolved limitations or blockers>
outcome: <APPROVED | REVISE | BLOCKED | FAILED | SKIPPED>
handover: <next owner and executable action>
```

The schema above is a required **information checklist**, not an assertion that an automated ledger or schema validator already exists. Exact storage paths and field types remain governed by the eventual FMCIS engagement/memory design.

Plan approvals bind to a specific plan fingerprint. A material plan change invalidates the previous approval. An inspection binds to the inspected diff/change set; modifications after inspection require new verification and, where material, independent reinspection. A clean reviewer response does not establish functional correctness by itself.

## 7. Supported Claudex Loop implementation

External implementation: `chaseai-yt/claudex-loop`. Upstream publishes four skills: `claudex-loop`, `claudex-route`, `codex-review`, `codex-build`.

Current FDG package:

- [[tools/claudex-loop/README|Install and runtime guide]]
- [Pinned upstream manifest](../../tools/claudex-loop/UPSTREAM.json) (JSON; repository-root relative path from this file)
- `tools/claudex-loop/install.ps1` (Windows PowerShell)
- `tools/claudex-loop/install.sh` (macOS/Linux)
- `AGENTS.md` — Codex repository startup instructions
- `CLAUDE.md` — Claude Code repository startup instructions

Upstream currently specifies **both authenticated CLIs, Git and Python 3.10+** for its full two-provider loop. The FDG installers pin the approved upstream commit and copy the shared skills to both host directories. They do **not** install/authenticate the CLIs, and GitHub commits alone do not put skills on a user's computer.

The installer requires network access to retrieve the reviewed commit on first installation. Previously installed skills can be used offline where the CLIs/models and required local context are available; do **not** claim the cloud-provider two-way loop itself is offline capable.

Runtime safety: reviewers should be read-only and isolated where supported; inspect any requested permissions, network access, repository secret handling and external model data exposure before running the tool. Never grant unrestricted repository writes or change credentials simply to complete a review.

See [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/Claudex_Loop_Adapter_Assessment_2026-10-15|Claudex Loop Adapter Assessment]] for the adoption matrix (ADOPT / ADAPT / REJECT / ROADMAP), provider-dependency limits, risk assessment and proposed benchmark.

## 8. Current execution states and proofs

- **AVAILABLE / READY:** both required CLIs authenticated; skills discovered; Python/Git supported; smoke-tested invocation.
- **STAGED:** files committed or skills copied, but CLI readiness/live execution not verified.
- **UNAVAILABLE:** a CLI or network dependency missing; continue through alternate, explicitly labeled review if authorized.
- **APPROVED:** a bounded review completed against specified plan and evidence, but only for the covered scope.
- **REVISE:** evidence-backed deficiencies require new plan/build/inspection pass.
- **BLOCKED:** required decision, dependency, security approval, or test evidence prevents completion.
- **FAILED:** CLI/runner/tool error, invalid response or unsuccessful proof.
- **SKIPPED:** review intentionally omitted with reason and risk acceptance.

Formal termination and round budgeting are defined in [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-005_Loop_Termination_Criteria|FMCIS-005]]. Do not label `STAGED` as `READY` and do not claim an independent inspection occurred when it did not.

## 9. Future adapters and benchmark

FMCIS must remain **agent-neutral, provider-replaceable, local-first for owned records and offline-capable for local evidence capture**. Future independent reviewer pairs can include OpenAI, Anthropic, locally hosted and additional providers behind an adapter interface.

Minimum replaceable adapter capabilities: enumerate available role/model and permissions; accept bounded, evidence-linked task and context; return structured findings and uncertainty; preserve run identity, version, price/latency metrics and artifact hashes; declare network/privacy needs; enforce review-only mode; record failure without silent provider substitution.

Benchmark before changing defaults. Compare a single-provider baseline against multiple independent-provider pairs on identical seeded tasks, context, acceptance tests and fixed review budgets. Track defects caught, false positives, implementation correctness, time, token/cost, unresolved findings, review coverage and correction effort. Avoid promoting anecdotal finding counts into performance claims. Retain all experimental evidence in governed records.

## 10. Boundary and related standards

- [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] — generic agent operating rules; backlink only, not another authority for the loop.
- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] — canonical ownership and orchestration.
- [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] — consumes acceptance/proof for project work packages.
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] — independently audits claims/evidence.
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler]] — cost-aware work-package handover.
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]] — scope and acceptance.
- [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]] — collaborator ownership.

## 11. Acceptance tests and current verification limits

Documentation-level acceptance: canonical FMCIS document exists; old Agentic Framework document becomes a redirect only; all known inbound references are updated; FMCIS-004 and FMCIS-005 point here; root agent instructions and tools point here; upstream ref remains pinned.

Runtime acceptance **pending local execution**: run installers on supported systems, inspect actual installed skill versions and directory structure, verify CLI auth statuses, run controlled Claude-builder/Codex-inspector and Codex-builder/Claude-inspector smoke tests in a disposable repository, execute unit/proof tests, validate review fingerprints, missing-dependency handling and reinspection after changes. Record observed success/failure; do not invent test results.

**Canonical rule:** FMCIS owns collaboration intelligence. Claudex provides one execution mechanism. Nex orchestrates the agents. FDG retains the knowledge.
