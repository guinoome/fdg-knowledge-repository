---
document_id: FMCIS-DISP-001
title: Delegation-First Agent Execution Rule
status: Founder-directed operating instruction
date: 2026-10-19
owner: FMCIS / Nex orchestration
scope: All FDG lead agents, orchestrators, project agents, and delegating collaborators
approval: Founder direction
supersedes: none
---

# FMCIS-DISP-001 — Delegate First; Use the Lowest-Cost Capable Agent

## Founder instruction

> **Never do the work yourself; dispatch the work to subagents. Do not keep using top-tier models for routine jobs. Prefer suitable Sol or Upos execution agents when available; reserve Astra, Fable, Methos and future top-tier agents for problems that actually require their capability.**

This is an **orchestrator-versus-worker** rule, not an infinite loop of subdelegation. It applies whenever an FDG agent acts as **lead/orchestrator**: do not directly consume lead/top-tier capacity to perform a delegated specialist's routine research, coding, tests, formatting, documentation or standard implementation. A **designated leaf/worker subagent must actually execute its authorized assigned work** and return evidence. A worker does not need to create further subagents unless the bounded task itself requires a specialist and dispatch is permitted.

Nex remains the **orchestrator of specialist agents**, not a coordinator merely passing messages. Founder retains ultimate authority. FMCIS selects capabilities, maintains owner boundaries, receives results and manages disagreements. FPJIS governs acceptance and build permission, FAIS independent audit and domain authorities govern technical correctness.

## Mandatory workflow for every lead/orchestrating agent

1. **Identify the outcome** and find the exact existing approved FDG requirements, current source, code ownership and acceptance criteria. Do not rediscover the whole repository.
2. **Split only if necessary** into independent, bounded work packages. Default: one capable primary worker, optional independent verifier for material risks.
3. **Dispatch first:** choose the lowest-cost available worker that can meet the outcome and tool/access requirements; **Sol or Upos are founder-preferred execution choices where availability and real capability are confirmed.** A named model is not automatically cheaper or stronger; log actual provider/model ID and capability. The previous term **Opus** is not silently assumed identical to the founder's **Upos** label.
4. Give worker the concise [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|one-page build card]]: pinned commit, exact editable/read-only files, step-by-step instructions, tests, expected outcomes, stop criteria and implementation authority.
5. **Receive and independently challenge evidence**, not just a verbal assurance. Verify actual files, changed commit, executed tests, negative/recovery cases and required qualified-human acceptance. Escalate gaps only when appropriate.
6. **Return durable knowledge:** commit accepted scoped updates, link canonical wikilinks and preserve ownership/recovery, avoiding repeat costs.

### Work allocation guide

| Work type | Default execution role | Lead responsibility |
| --- | --- | --- |
| Simple research and reference extraction | Available lower-cost specialist / Sol / Upos when suitable | Source/claim boundary and relevance check |
| Approved bounded coding, test fixtures, bug fixes | Builder subagent; prefer Sol/Upos when capable | Specify contract, authorize scope and verify tests |
| Template, index and documentation updates | Documentation/verification subagent | Check canonical authority, privacy and wikilinks |
| Complex cross-domain architecture or unresolved conflicts | Escalated **top-tier reviewer** such as Astra/Fable/Methos, when justified | Set question and budget; approve resolution; hand simpler steps back to workers |
| High-risk engineering, security, legal, financial or production changes | Appropriate specialist plus competent human authority; independent review | Enforce fail-closed permissions and no unauthorized external actions |

**Top-tier models may perform genuine architectural review, independent critique and unavoidable expert reasoning.** They should not burn capacity implementing ordinary changes once a scoped execution card exists. No unnecessary parallel expensive models, repeated unmodified audit or redundant specialization.

## Dispatch evidence requirement

Each engagement returns **one compact record**, usually inside the existing FPJIS/FMCIS work package or project handover:

```text
FDG task ID / intended user outcome:
Lead/orchestrator:
Assigned worker(s) + actual model/provider, available tools:
Why this tier (and fallback if unavailable):
Source commit / scope / files owned:
Dispatch channel, task link, submission time:
Actual worker result + artifact/commit:
Tests run; NOT RUN:
Review and acceptance owner / status:
Cost or execution overhead if measurable:
Blockers / next permitted task:
```

**A draft instruction or issue is NOT a dispatched subagent.** Claim **DISPATCHED** only after an actual external/agent runtime accepts the task, and **EXECUTED** only when its result is received. Never fabricate worker calls, model identities, tool access, test outcomes or human approvals.

## No subagent tool is available?

If the present chat, host or agent environment **cannot actually call another agent**, the lead **must not claim delegation succeeded**. Preserve the exact task and recommended route; report **DISPATCH BLOCKED — NO AVAILABLE SUBAGENT TOOL** (or request an authorized external handoff) and state what remains unexecuted. Do not silently replace dispatch with expensive direct builder work. Non-build administrative steps necessary to maintain a handover or route a task may be performed only within existing explicit authorization and must be disclosed as direct administrative action.

If the user explicitly authorizes a direct single-agent task in an environment without subagents, clarify that exception in the work record; never imply the task was delegated. This directive does **not** imply that this ChatGPT conversation can invoke agents it cannot access.

## Safety, scope and non-regression

- **No recursion trap:** Only orchestrators delegate; terminal workers execute their assigned bounded package.
- **No unauthorized action:** Delegation does not grant new authority for secrets, customer data, emails, money, production, destructive migrations, engineering sign-and-seal, code ownership or external publishing.
- **No silent takeover:** A worker may modify only authorized paths and must stop/escalate on missing requirements, conflict or high-risk changes.
- **No dependency on named models:** Use provider-neutral capability registry and replaceable connectors; exact model selection is conditional on availability, capability, security and cost.
- **No documents-as-products:** Passing a work package is not accepted working software. The outcome remains a tested, usable and human-accepted scope, per [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/02_Module_Roadmap_and_Finished_Session_Standard|Functional Product Completion Gate]].
- **No duplication:** This is FMCIS allocation policy; the Agentic Framework and FPJIS point here rather than creating competing authorities.

**Sources:** [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS authority]] · [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS file ownership]] · [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Top-Tier Compiler]] · [[06_Organizational_Architecture/DELEGATION_STANDARD|Delegation Standard]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]] → this binding orchestration rule.
