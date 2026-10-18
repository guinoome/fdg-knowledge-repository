# FDG Codex Repository Entry Protocol

This repository is governed organizational knowledge. Before substantial work, read `README.md`, `FDG Ecosystem.md`, `00_Nex/00_Master Index.md`, and the relevant system/project Master Index. Reuse or extend approved architecture before creating competing structures.

## Claudex cross-provider review

Founder-approved repository bootstrap: for substantial implementation, migrations, security-sensitive changes, or architecture-affecting work, use the FDG cross-provider review loop when both Codex and Claude Code are available.

If `~/.agents/skills/claudex-loop/SKILL.md` or the companion skills are missing, restore the pinned FDG-approved version using:

- Windows: `powershell -ExecutionPolicy Bypass -File tools/claudex-loop/install.ps1`
- macOS/Linux: `bash tools/claudex-loop/install.sh`

The bootstrap may restore these four approved skills: `claudex-loop`, `claudex-route`, `codex-build`, `codex-review`. Do not install or upgrade unrelated software and do not authenticate accounts without the user's action.

After discovery, use `$claudex-loop` for the full workflow or `$claudex-route` for lightweight routing.

Key rules:
- Builder and final inspector should be different providers when possible.
- Plan review does not authorize implementation unless the user's request already authorized implementation.
- No silent provider/model fallback.
- Evidence, tests, unresolved findings, and review disposition must remain inspectable.
- Do not force the loop for trivial edits where the overhead adds no material assurance.
- Claudex is replaceable tooling; FDG governance and repository knowledge remain authoritative.

See `21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP.md` (FMCIS canonical owner).

## Delivery-first / client-simple execution — founder direction 2026-10-16

**Purpose:** Advanced analysis has no practical FDG value unless it can be transmitted accurately to the builder and yields a usable, tested outcome. Do not confuse a large blueprint, attractive dashboard, code generated or an open issue with a completed/sold product. This direction extends—not replaces—the existing FPJIS Finished-Session Standard, governed work-package/authority boundaries and independent review rules.

For every implementation engagement, before new coding:
1. **Retrieve current project handover + latest bounded work package + exact source-of-truth paths.** Do not require the founder to recite decisions from previous conversations. If a conversation-derived decision is missing, identify it explicitly; do not invent it.
2. **Show the client's smallest complete task** in ordinary words: who does what, required inputs, what the system reuses/produces, how to save/recover, and visible errors. Prefer **less input, more verified output**; never eliminate essential safety/engineering/financial approval by fabricating defaults.
3. **Reuse finished code and prior accepted tests.** Change only assigned files after verifying current status and authorization. No duplicate app, new CRM/knowledge silo, unnecessary large refactor or repeat of unchanged audits.
4. **One finished slice per approved work package:** visible outcome, source persistence, error/empty/phone states, permissions, tests, evidence, data recovery, review and precise handover. If blocked, return **BLOCKED WITH EVIDENCE**, not a misleading percentage or placeholder “done.”
5. **Distinguish client adoption and revenue:** technical pass ≠ actual beginner acceptance ≠ verified paid order ≠ repeat/renewal. Never claim a launch, customer payment or production release without evidence and explicit authority.
6. **Return execution proof to GitHub:** issue/PR, changed files, test commands/results, exact commit, unresolved constraints, one next permitted action. Preserve existing source ownership and approved master indexes/Wikilinks.

**Active example / agent-ready transfer:** [Construction Lifecycle Client-First issue #5](https://github.com/guinoome/fdg-knowledge-repository/issues/5), backed by `Projects/Active/FDG Construction Lifecycle Workspace/docs/CLIENT_FIRST_ACTIVATION_AND_AGENT_HANDOVER_2026-10-16.md`. This is queued for evidence/acceptance; the issue does not authorize unapproved new features, cloud deployment, payment activation or impersonated buyer tests.

## Top-tier audit and simple builder tasks — 2026-10-17

If assigned to audit the full FDG repository, follow [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|Full Repository Product Reality Audit Handover]]; do not call a partial inventory a full audit or treat documentation as a finished product. If assigned an approved small coding task, follow the completed [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|Legacy Agent One-Page Build Card]] **and only its cited code/tests**, not the entire audit or architecture. Never inherit unresolved design questions as guesses. Preserve existing working code, disclose unexecuted tests, honor independent review and stop/escalate blocked scope. No deployment or high-risk external actions without separate approval.

## Founder audit-to-repair mandate — 2026-10-18

For assigned FDG audits and improvement tasks, read [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|FAIS-RKA-0301 Audit-to-Repair Directive]] **including §10**. The founder authorizes **bounded, low-risk, owner-scoped, reversible repairs** with before/after evidence and regression tests; do not stop at writing a finding when the safe fix is within scope. Preserve accepted code, protect other collaborators' work, prefer REUSE / EXTEND / MERGE / REPAIR before REPLACE / NEW, and update canonical GitHub knowledge and verified Obsidian wikilinks. This is **not** blanket permission for production, security/financial/safety-sensitive changes, customer contact or deployments. FAIS owns audit findings, FPJIS owns authorized work and acceptance, FMCIS owns collaborator boundaries. Supply older agents only a filled FPJIS-LITE-001 with exact files and tests. Do not claim a full audit, fresh test pass or customer/revenue validation without evidence.

## Delegation-first task execution — 2026-10-19

**All FDG lead agents: delegate execution; do not spend orchestrator/top-tier model capacity doing routine tasks personally.** Follow [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001 Delegation-First Execution Rule]]. Prefer **Sol or Upos** as builders when the actual connected model, cost, capability and permissions fit. Reserve Astra, Fable, Methos and other top-tier models for hard architecture, ambiguity, high-risk or independent review. A designated worker/leaf subagent actually performs its assigned task; it does not endlessly delegate again. Record who executed, exact commit, tests and acceptance. **If no real subagent dispatch tool is available, report DISPATCH BLOCKED**, preserve a ready-to-send work card and do not pretend work was delegated. Keep existing FPJIS authority, data/security, source ownership and release gates.

## Historical reference source reconciliation — 2026-10-19

For FDG tasks relying on earlier conversations, videos, shared repositories or external references, check [[04_Knowledge_Management/FDG-HIST-0001 - Historical Conversation and Reference Reconciliation Handover 2026-10-19|Historical Conversation & Reference Coverage Handover]] and its status BEFORE guessing whether a decision was saved to GitHub. Main, branch-only, private Library source and unverified recall are separate evidence states. Historical recovery is NOT complete; do not promise the founder perfect memory. Route remaining work using [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|Delegation-First Rule]]; this chat did not execute a subagent.
