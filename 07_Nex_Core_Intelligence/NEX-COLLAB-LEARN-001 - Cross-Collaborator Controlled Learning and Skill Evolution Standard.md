---
document_id: NEX-COLLAB-LEARN-001
title: Cross-Collaborator Controlled Learning and Skill Evolution Standard
created: 2026-10-28
status: FOUNDER_DIRECTED_STANDARD / IMPLEMENTATION_AND_RUNTIME_VALIDATION_PENDING
owner_domain: Nex Core Intelligence, Agentic Framework, FMCIS, Knowledge Management, FSIS
source: Founder supplied AutoHarness README screenshot and directed "For all our collaborators"
canonical_reference: fdg-knowledge-repository
installation_approved: false
autonomous_canonical_repo_writes_approved: false
global_session_capture_approved: false
---

# Cross-Collaborator Controlled Learning and Skill Evolution Standard

> [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|Nex Core Intelligence]] → this standard.

## Founder direction

Apply the **capability and lessons** of self-learning skill systems across all FDG collaborators—not only Claude Code and not by installing a Claude-only plugin everywhere. Applicable collaborators include Nex, Claude Code, Codex, other AI/model providers, specialist agents, and workflow/engineering tools where a compatible learning interface exists.

The reference project is [tigerless-labs/autoharness](https://github.com/tigerless-labs/autoharness), whose README describes session-derived skills, same-scenario consolidation, controlled updates, usage-based lifecycle management, and an evidence ledger. The screenshot and README are design references, **not proof that the project is secure, production-ready, cross-provider compatible, or approved for installation**.

## Intended FDG capability

Create a provider-neutral **controlled learning loop**:

```text
Real Work Episode
→ Capture only authorized, task-relevant evidence
→ Redact secrets / personal / customer / confidential data
→ Distill a proposed reusable lesson or skill
→ Compare with existing FDG knowledge and skills
→ Merge / amend / reject duplicate or conflicting proposals
→ Validate against explicit tests and authority constraints
→ Human/authorized reviewer approves promotion
→ Versioned skill or standard + evidence ledger
→ Observe later use and measure outcomes
→ Periodic review, reversible archive, or approved retirement
```

This is a target operating pattern, not a claim that automatic learning currently runs across collaborators.

## Mandatory controls

1. **Cross-provider by design:** store approved skill definitions and rationale in portable, documented formats; provide adapters for individual runtimes. Never make organizational knowledge dependent on one model or plugin.
2. **Proposal is not approval:** an agent may draft a lesson. It may not silently change approved global instructions, security policy, engineering requirements, project baselines, or the canonical repository.
3. **Evidence and provenance:** each proposed change records scenario, source/evidence pointer, rationale, affected skill, reviewer, test, result, version, and rollback path. Preserve history; do not silently overwrite.
4. **Data minimization:** do not collect entire sessions by default. Capture the smallest authorized window needed. Redact credentials, tokens, personal data, customer data, private business information, and unrelated content before persistence or egress.
5. **Scoped authority:** learning may modify only its own generated proposal area. It must not edit human-authored skills, third-party installed skills, unrelated work packages, or other teams' assets unless explicitly authorized.
6. **Conflict and duplication control:** search canonical FDG knowledge first; compare existing lessons, detect contradiction and near-duplicates, and merge only with evidence. Preserve source links and a recoverable history.
7. **Validation before promotion:** lint structure, test behavior, test policy adherence and negative cases, review security/privacy impact, and evaluate whether the lesson improves real task outcomes without regressions.
8. **Measured lifecycle:** distinguish offered/viewed/loaded/used/adhered-to and outcome-improved signals. Usage alone does not prove correctness. Low usage alone does not prove a skill is useless.
9. **Reversible lifecycle:** snapshot before merges; archive rather than irreversibly delete; retain an auditable reason and restore path.
10. **Fail safely:** if redaction, validation, permissions, evidence, or rollback cannot be verified, reject or quarantine the proposal. No autonomous production, vehicle, financial, security, or other high-impact changes through a learned skill.
11. **Human authority remains intact:** the founder and assigned domain approvers retain existing approval boundaries. A self-learning layer cannot grant itself new capabilities or authority.
12. **Repository workflow:** update relevant master indexes and Obsidian wikilinks when this standard or a promoted capability changes. Record whether a capability is documented, prototyped, tested, approved, deployed, or blocked.

## AutoHarness reference disposition

- **Reuse as a design reference:** session-to-skill distillation, consolidation instead of unbounded duplication, proposal/validation separation, provenance ledger, and reversible archive.
- **Evaluate before adoption:** hook/session capture boundaries, subagent behavior, plugin/MCP permissions, redaction correctness, filesystem writes, skill promotion and deletion/archive logic, dependency/runtime assumptions, global vs project scope, cross-provider portability, and real test coverage.
- **Do not assume:** that a MIT badge guarantees safety; that benchmark claims generalize to FDG workloads; that Claude Code compatibility implies Codex or other collaborator compatibility; or that self-editing means reliable learning.
- **No install authorized by this record.** Do not add marketplace/plugin entries, alter global collaborator configuration, or enable background session capture without separate scoped review and approval.

## Acceptance gates

- **CLL-001 — Scope:** demonstrate project-only and global scopes separately; no cross-project data leakage.
- **CLL-002 — Redaction:** synthetic secrets and private/customer data do not appear in persisted lessons, logs, or outbound model payloads.
- **CLL-003 — Ownership:** pre-existing human and third-party skills remain byte-identical through learning, merge, pruning, uninstall, and failure tests.
- **CLL-004 — Provenance:** every promoted skill has a source pointer, reason, reviewer/approval, test result, version, and rollback route.
- **CLL-005 — Conflict:** contradictory and duplicate episodes produce a reviewable merge/reject proposal, not silent competing rules.
- **CLL-006 — Regression:** tests prove a learned skill improves target task performance without violating policy, security, privacy, or project constraints.
- **CLL-007 — Reversibility:** injected failure during promotion/merge restores the last valid state.
- **CLL-008 — Portability:** one approved skill is rendered and validated in at least two different collaborator runtimes without losing meaning or authority metadata.
- **CLL-009 — No unauthorized action:** the learning process cannot promote to canonical policy, production, or high-impact execution without the normal approval gate.
- **CLL-010 — Evidence-based lifecycle:** archive/retire decisions use opportunity-adjusted evidence and reviewer policy; do not treat mere absence of use as proof of failure.

## Implementation status

`DOCUMENTED / DESIGN_REFERENCE_IDENTIFIED / NOT_INSTALLED / NO_AUTONOMOUS_LEARNING_VERIFIED / ACCEPTANCE_TESTS_PROPOSED`

Next step: review the upstream repository's code, license file, release, permissions, tests, and known issues; compare with provider-neutral alternatives and FDG's existing knowledge/skill standards. Build or adapt a minimal controlled prototype only after a separate approved work package. Do not claim all collaborators have the runtime capability until cross-provider tests prove it.

## Related standards

- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_HANDOFF_AND_TEAM_INTELLIGENCE_STANDARD|Collaborator Handoff and Team Intelligence Standard]]
- [[07_Nex_Core_Intelligence/NEX_COLLABORATOR_ECOSYSTEM_STANDARD|Collaborator Ecosystem Standard]]
- [[07_Nex_Core_Intelligence/NEX_CAPABILITY_DEVELOPMENT_LOG|Nex Capability Development Log]]
- [[03_Agentic Framework/FDG_PROJECT_START_SKILLS_SECURITY_GATE_2026-10-25|Project-Start Skills and Security Gate]]
- [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|Knowledge Capture Standard]]
- [[04_Knowledge_Management/KNOWLEDGE_REVIEW_STANDARD|Knowledge Review Standard]]
- [[12_FDG_Security_Intelligence_System/README|FDG Security Intelligence System]]


## Relationship to persistent role engineering — 2026-10-30

Role definitions, SMART acceptance criteria, approved work examples, iterative feedback, SOP evolution, model benchmarks and cost controls are governed by [[07_Nex_Core_Intelligence/NEX-ROLE-ENGINEERING-001 - Persistent Collaborator Role Engineering Standard|NEX-ROLE-ENGINEERING-001]]. This learning standard controls how proposed lessons or skill changes are captured, validated, approved, versioned and reversed. Feedback may improve FDG-owned procedures and role packages; it must not be described as base-model training or used for uncontrolled autonomous canonical writes.
