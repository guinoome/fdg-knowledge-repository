# FDG Cross-Provider Engineering Review Loop

**Status:** Approved integration direction — 2026-10-15  
**Scope:** Agent-assisted planning, implementation, review, verification, and handover  
**External implementation currently adopted:** Claudex Loop  
**Upstream:** `chaseai-yt/claudex-loop`  
**Pinned upstream commit:** `53cddc42e39346fb8c6d5d612281a3b1add14e66`  
**License:** MIT

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework Master Index]] → this document

## Purpose

FDG adopts cross-provider review as a reusable engineering assurance pattern:

> **The agent that builds a work package should not be the sole agent that grades it.**

The current executable implementation is Claudex Loop, but the FDG rule is provider-neutral. Claudex may be replaced without changing the governing architecture.

## Architecture

```text
Founder Objective / Authorized Work Package
                  ↓
        Host / Coordinating Agent
                  ↓
             Recon + Context
                  ↓
      Requirements + Acceptance Criteria
                  ↓
             PLAN / Work Package
                  ↓
   Independent Provider Plan Review
                  ↓
       Arbitration / Plan Revision
                  ↓
        Authorized Builder Executes
                  ↓
          Proof Commands / Tests
                  ↓
  Fresh Independent Provider Inspection
                  ↓
       Findings / Fix / Reinspection
                  ↓
      Evidence + Handover + Learning
                  ↓
       FDG Knowledge Repository
```

The host may be Claude Code or Codex. The independent reviewer/inspector should use the other provider when available.

## When to use the full loop

Default to the full cross-provider loop when one or more of these conditions apply:

- architecture-affecting code or repository changes;
- security, authorization, privacy, data-loss, or migration risk;
- complex multi-file implementation;
- production-facing behavior;
- difficult debugging where one model may anchor on its own assumptions;
- a work package whose acceptance criteria require strong independent verification;
- expensive changes that are materially cheaper to review before implementation than to repair later.

Use lightweight routing or ordinary governed execution for trivial edits, formatting, typo correction, simple documentation maintenance, or other low-risk tasks where a second-provider loop adds little assurance.

## Required controls

1. **Independent grading.** The final inspector must not merely repeat the builder's self-assessment when another provider is available.
2. **Bounded loops.** Reviews and fix rounds must have explicit limits. Failure to converge is surfaced as `BLOCKED`, unresolved findings, or escalation—not disguised as approval.
3. **Evidence-backed findings.** Review findings should cite code, tests, repository evidence, or explicit requirements.
4. **Plan integrity.** Approval attaches to a specific plan state. Material plan changes invalidate prior approval.
5. **Fresh final inspection.** Final inspection should use a fresh independent context when practical.
6. **No silent fallback.** Requested provider/model substitutions must be visible.
7. **Authority preservation.** Review does not create authority beyond the user's approved scope or FDG governance.
8. **No cross-work-package overwrite.** Review findings may propose patches or dependencies; they do not authorize rewriting another collaborator's assigned package.
9. **Repository capture.** Durable decisions, acceptance evidence, unresolved risks, and reusable learning return to the canonical FDG Knowledge Repository.

## Current Claudex implementation

Upstream currently provides:

- `claudex-loop` — full requirements, plan-review, build, proof, inspection flow;
- `claudex-route` — model/task recommendation and scoped handoff;
- `codex-review` — explicit review compatibility skill;
- `codex-build` — explicit builder compatibility skill.

The full implementation requires both authenticated CLIs and Python 3.10+.

FDG bootstrap:

[[tools/claudex-loop/README|FDG Claudex Loop Bootstrap]]

The repository pins the reviewed upstream commit instead of following upstream `main` silently.

## Provider-neutral future direction

The FDG concept is broader than Claude + Codex:

```text
Planner A → Reviewer B
Builder A → Inspector B

or

Planner A → Reviewer B → Security C
Builder D → Inspector E → Audit Gate
```

Future models, local models, specialist agents, or additional providers may occupy these roles. Selection should be based on task capability, independence, cost, evidence quality, and availability—not brand permanence.

## Relationship to FMCIS and other FDG systems

- **Agentic Framework** governs the behavior pattern.
- **FMCIS** coordinates which collaborators/providers occupy the roles.
- **FPJIS** may consume the pattern for project implementation work packages.
- **FAIS** may use its evidence as an input to independent audit but is not replaced by it.
- **FDG Knowledge Repository** preserves the durable decisions and lessons.

Related:

- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]]
- [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]]
- [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Top-Tier Architecture Compiler Protocol]]

## Update and dependency policy

Claudex is an external dependency. Updating it is a controlled dependency change:

1. inspect upstream changes;
2. review new permissions/runtime behavior;
3. validate compatibility with current Codex and Claude Code CLIs;
4. run relevant upstream tests/validation where practical;
5. deliberately update the pinned commit;
6. record the decision and any changed FDG behavior.

No upstream update may silently redefine FDG authority, repository governance, work-package scope, or acceptance criteria.

## Acceptance criteria

This capability is operational when:

- `tools/claudex-loop/UPSTREAM.json` identifies the reviewed upstream commit;
- the Windows and POSIX bootstrap scripts install the same four skills into both hosts;
- root `AGENTS.md` and `CLAUDE.md` direct future coding sessions to restore/use the capability;
- Codex and Claude Code remain individually usable if the other provider is unavailable;
- work is never labeled cross-provider verified unless the independent provider actually completed the review;
- the external tool remains replaceable without loss of FDG knowledge or authority.
