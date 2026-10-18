# FDG Claude Code Repository Entry Protocol

This repository is governed organizational knowledge. Before substantial work, read `README.md`, `FDG Ecosystem.md`, `00_Nex/00_Master Index.md`, and the relevant system/project Master Index. Reuse or extend approved architecture before creating competing structures.

## Claudex cross-provider review

Founder-approved repository bootstrap: for substantial implementation, migrations, security-sensitive changes, or architecture-affecting work, use the FDG cross-provider review loop when both Claude Code and Codex are available.

If `~/.claude/skills/claudex-loop/SKILL.md` or the companion skills are missing, restore the pinned FDG-approved version using:

- Windows: `powershell -ExecutionPolicy Bypass -File tools/claudex-loop/install.ps1`
- macOS/Linux: `bash tools/claudex-loop/install.sh`

The bootstrap may restore these four approved skills: `claudex-loop`, `claudex-route`, `codex-build`, `codex-review`. Do not install or upgrade unrelated software and do not authenticate accounts without the user's action.

After manual skill discovery, use `/claudex-loop` for the full workflow or `/claudex-route` for lightweight routing. The upstream Claude plugin marketplace is optional; FDG uses the shared skill bootstrap as the provider-neutral baseline.

Key rules:
- Builder and final inspector should be different providers when possible.
- Plan review does not authorize implementation unless the user's request already authorized implementation.
- No silent provider/model fallback.
- Evidence, tests, unresolved findings, and review disposition must remain inspectable.
- Do not force the loop for trivial edits where the overhead adds no material assurance.
- Claudex is replaceable tooling; FDG governance and repository knowledge remain authoritative.

See `21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP.md` (FMCIS canonical owner).

## Top-tier audit and simple builder tasks — 2026-10-17

Full-repository top-tier assessment: [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|Full Repository Product Reality Audit Handover]]. This is a **future audit instruction, not a completed audit**. For a normal older/lower-cost coding collaborator, issue only the filled [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/FPJIS-LITE-001 - One Page Legacy Agent Build Card|Legacy Agent One-Page Build Card]] plus exact affected files and tests: one user outcome, no architecture invention, do-not-touch boundaries, real test evidence and BLOCKED WITH EVIDENCE when information is missing. Never equate documentation with accepted working software. Preserve another agent's work and explicit release authorization.

## Founder audit-to-repair mandate — 2026-10-18

For assigned FDG audits and improvements, follow [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0301 - Full Repository Product Reality Audit and Agent Handover|FAIS-RKA-0301 Audit-to-Repair Directive]] **§10**. Find and reproduce missing/broken behavior, safely repair **only low-risk, owned, reversible, authorized scope** with actual regression evidence, and improve existing functional products rather than multiply blueprints or rebuild accepted code. Preserve project/domain ownership, keep FAIS findings and FPJIS remediation distinct, use FMCIS independent review for material edits, and verify GitHub/Obsidian link updates. Give older models just the completed FPJIS-LITE-001 task card. Escalate production, secrets, money, security, destructive changes, professional engineering acceptance and other consequential actions. Never report execution/acceptance/income without evidence.

## Delegation-first task execution — 2026-10-19

Applies to every FDG lead/orchestrating agent: **delegate assigned bounded work to actual subagents before doing routine implementation directly.** See [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS-DISP-001 Delegation-First Execution Rule]]. Prefer a qualified available **Sol or Upos** worker when cost/capability/access make sense; escalate only consequential ambiguity or architecture to **Astra, Fable, Methos** or another top-tier reviewer. Terminal worker agents execute the bounded package rather than recursively spawning workers. Real dispatch and returned execution evidence are distinct from writing a handover. Missing dispatch tool → **DISPATCH BLOCKED**, not fabricated multi-agent work or silent top-tier coding. Preserve human approvals, file ownership and tested software.

## Historical reference source reconciliation — 2026-10-19

Read [[04_Knowledge_Management/FDG-HIST-0001 - Historical Conversation and Reference Reconciliation Handover 2026-10-19|Historical Conversation & Reference Coverage Handover]] when historical requirements or user-supplied links could affect the build. It identifies verified main paths, branch-only FMIS/FBPOIS references, private media still needing extraction and unrecovered history. **No whole-history recovery claim.** A lead dispatches source reconciliation through [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|Delegation-First Rule]] if a real subagent runtime is available; worker reviews sources within authorized privacy/license boundaries.

## Chat-to-GitHub source continuity — 2026-10-19

**STRICT FDG TOPIC FILTER:** Only synchronize material decisions and vetted references with a definite connection to a named current/approved FDG domain, project, product, service or the founder's explicit FDG reuse request. Do not harvest unrelated chats or random media, jobs, hobbies, shopping, personal issues, generic questions or incidental mentions. In mixed conversations retain only the relevant FDG item; otherwise OUT_OF_SCOPE or NEEDS_RELEVANCE_REVIEW. **In-scope FDG material decisions and reference findings must be returned to current GitHub in the same authorized work session, not kept in provider conversation memory.** Use [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|Knowledge Capture + session receipt]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/17_Requirements_View_Compilation_and_Agent_Acceptance_Standard|FPJIS pre-build hard gate]]. Read main and relevant branches, preserve previously approved owner files and route changes through real subagents where available. Record source approval status, exact commit, read-back and verified wikilinks; send `SYNC_BLOCKED` if unavailable. **No build for a slice with material unresolved source-to-requirement conflict. No COMPLETE without executed tests and the proper human/engineering acceptance.** Check [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) for compact PR review evidence; this template is **not** an automated CI/merge blocker. No native continuous ChatGPT event feed is claimed.
