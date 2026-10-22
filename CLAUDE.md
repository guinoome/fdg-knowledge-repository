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

## Evidence-led FDG selling and claim approval — 2026-10-19

For FDG selling, marketing or pricing output, follow [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-003_FDG_First_Payout_Commercial_Validation_Portfolio|FBIS scoped buyer/offer and profit strategy]], [[11_FDG_Business_Intelligence_System/11_Business_Frameworks/FBIS-BP-002_FDG_Social_Platform_Launch_Content_Engine_Blueprint|claim and publication gate]], [[03_Agentic Framework/FDG_BUSINESS_SPECIALIST_AGENT_CAPABILITY_PROFILES_2026-10-09|CMO and Sales skill profiles]], and [[13_FDG_Legal_Intelligence_System/09_Procurement_and_Commercial_Law/FLIS-0900 - Procurement and Commercial Law|legal/advertising applicability]]. **Draft or propose; do not send/publish/spend without explicit authority.** Never advertise prototype/sample as production, fabricate ROI/customer evidence, assert professional authority or use private/unconsented contacts. Use dated source-linked product evidence and real financial contribution. Commercial plans are not proof of demand, paid clients, completed software, or commissioned agent runtime.

## Claude Code desktop tool installation memory — 2026-10-22

**Founder-directed persistent reminder:** On the next relevant local Claude Code desktop setup, read [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/FMCIS_CODING_SKILL_CANDIDATES_2026-10-21|FMCIS Five Coding Collaborator Capabilities and Desktop Install Queue]], particularly its 2026-10-22 addendum. Check the actual desktop environment, current plugins and skills, permissions, provider settings, hooks and compatibility before touching settings. This root CLAUDE.md is a durable project instruction; it is not a direct update to the user's separate Claude account memory or private home-directory memory.

**Five items in the founder's new video:** OmniRoute (model gateway); Claude-Mem (session memory); Headroom (context compression); Claude Code Setup / claude-automation-recommender (read-only setup advice); Task Observer / task-observer (skill improvement). Only the final two were previously saved as portable Skills in ChatGPT Work; local Claude Code installation is unverified. Do not duplicate pre-existing claudex-loop skills or introduce overlapping global hooks, memory stores or model routing.

**Desktop workflow:** audit installed state; review the pinned upstream source and version, host support, license, dependencies, privacy, telemetry, network and model billing; take settings backups; select one bounded installation; obtain user consent for any new hooks, external capture, account authentication, proxy or routing; install in the actual host only with appropriate permission; verify discovery/activation, isolation, negative cases and rollback in a new session; write tested status/evidence back to FMCIS. Prioritize the read-only Claude setup advisor and manually invoked Task Observer, then one evaluated memory plugin. Headroom and OmniRoute require demonstrated need and separate review. No blanket auto-install, cloud sync, silent paid fallback, secret capture or uncontrolled learned edits to approved FDG instructions.

**Status:** installation reminder captured; no installation or device changes verified. Report INSTALL_PENDING, INSTALL_BLOCKED, INSTALLED_UNVERIFIED or VERIFIED_LOCAL accurately. FDG GitHub remains canonical for approved architecture/knowledge; third-party automatic memory and proposed skill changes remain candidate evidence subject to review, never overriding authority, local-first, offline-capable, agent-neutral and provider-replaceable requirements.


## External skills installation candidates — 2026-10-22

User-requested future skill intake: [[03_Agentic Framework/FDG_EXTERNAL_SKILLS_CLAUDE_CODEX_CANDIDATES_2026-10-22|FDG external Claude/Codex skills review]], source https://github.com/alirezarezvani/claude-skills (upstream reviewed SHA 27cfcd0fb0a41f60adffcbd5271fdf8839f86ed2). The uploaded video suggests hundreds of engineering, commercial, finance, marketing and C-level skills. **Candidate only; not installed.** At next workstation session, surface this pending intake; inventory already installed FDG/Claudex skills, check a real assigned task, audit the exact pinned SKILL.md/scripts/license/hooks/permissions, and propose installing the *smallest suitable* plugin/skill. Only install after the required exact-machine authorization, in isolated scope first, with discovery/tests, evidence and uninstall receipt. No mass install, no remote installer execution without review, no uncontrolled C-suite autonomous agents, no auto-memory/self-improvement hooks or CLAUDE.md rewrites. Founder/FDG standards retain precedence; document unable-to-install rather than claiming Claude memory changed.
