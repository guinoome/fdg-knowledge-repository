---
document_id: FDG-P0-SKILLS-2026-10-25
title: Mandatory Project Start Skills and Security Preflight
created: 2026-10-25
status: FOUNDER_DIRECTED_STANDING_PROJECT_START_REQUIREMENT / RUNTIME_VERIFICATION_PENDING
owner_domain: Agentic Framework; Nex orchestration; FPJIS project intake; FMCIS delivery; FSIS security
source: User requested five previously video-reviewed tools and the JWT/session lesson be retained as standing memory and used when starting projects
canonical_reference: GitHub fdg-knowledge-repository
workstation_plugin_installation_verified: false
project_execution_authorized_by_this_document: false
production_changes_authorized: false
supersedes: None
---

# FDG-P0-SKILLS-2026-10-25 — Mandatory Project-Start Preflight

> [[FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this standing project-start rule. It extends, but does not replace, the approved P0 Claude/Codex handovers, FPJIS lifecycle, FSIS security standards, and FMCIS delegation authority. Video/source evidence: [[03_Agentic Framework/FDG_CLAUDE_PLUGIN_VIDEO_REVIEW_2026-10-25|Five Video-Derived Agent Tool Candidates]]; applicable authentication gate: [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT and Session Revocation Gate]].

## Standing founder intent / repository memory

At **every new FDG software project kickoff and before the first coding work package**, Nex as orchestrator and the assigned coding agent shall **discover, inspect, and apply the approved relevant skills** from the five video candidates. This includes subsequent project resets, major architecture or stack changes, and new codebase/workstation onboarding. Treat this GitHub document as the durable project handover source so future collaborators do not rely on chat memory. For non-code planning or document tasks, review applicable standards without running installers or blocking delivery on workstation-only tooling.

**Do not misinterpret “must use” as automatic installation/credential collection.** “Use” means:
- **Mandatory**: run project-start skills availability, safety, and compatibility checks; use available **vetted/installed** relevant capabilities; record actual proof.
- **Mandatory before relevant work**: tested plan/build/QA/security capabilities, or a documented approved equivalent. A missing mandatory capability yields `P0_SKILLS_BLOCKED_WITH_EVIDENCE` for new implementation, unless founder explicitly authorizes a bounded alternative.
- **Never automatic merely from the video**: installing third-party gateways, altering global providers, intercepting tokens, accessing client secrets, modifying production apps, enabling subscriptions, bulk-copying plugins or using unsuitable software.

## Five-video-tools at project start

| Tool from 1000011983.mp4 | Project-start requirement | When to run or defer |
| --- | --- | --- |
| **Claude Code Setup** | **MANDATORY READ-ONLY CONFIGURATION REVIEW** on Claude Code when available: inspect repo skills/hooks/MCPs/subagents, compare to canonical instructions; propose smallest missing capability | Claude-specific. If uninstalled or unavailable, do equivalent permission-limited manual setup audit with clear `NOT_INSTALLED` note and authorized installation request |
| **Superpowers** | **MANDATORY PLAN/TEST/REVIEW WORKFLOW** for suitable coding tasks after vetted setup: bounded planning, tests, debugging, specialist delegation, independent acceptance | Claude and Codex have differing installation methods. On Codex use compatible reviewed Superpowers or equivalent Codex-native TDD/plan-review workflow. Never override FPJIS blueprints or collaborator ownership |
| **Claude Security** | **MANDATORY SCOPED SECURITY REVIEW** for software code in its supported environment, especially auth, access, billing, data stores and vehicle integrations | Check official availability/version. On Codex or unsupported environment use approved FSIS-0803/0804/0805 tests, static/dependency checks and independent reviewer instead of pretending the Claude plugin is installed |
| **Caveman** | **MANDATORY SUITABILITY / LICENSE / EVIDENCE-FIDELITY CHECK**, optional tool adoption when approved, tested and measurably better | Never compress unrecoverable evidence; mixed license including BSL engine surfaces and privacy/quality require independent clearance; not automatically installed |
| **OmniRoute** | **MANDATORY OPTIONAL-GATEWAY RISK REVIEW** if multi-provider routing or cost reduction is in scope; otherwise `NOT_APPLICABLE` | Gateway rather than a native skill. Never use third-party relay of FDG/client code or provider secrets until explicitly approved, source/licensing/security tested and provider terms confirmed. No “unlimited free tokens” promise |

At kickoff also evaluate any existing mandatory FDG-installed/project-native skills such as Claudex cross-provider review, UI/UX gate for interface work and ARTEMIS for Android/mobile tests. **Never duplicate already-approved architecture or let a plugin rewrite repository rules.**

## Conditional mandatory security skill from second video

For any project with **login, user profiles, permissions, API tokens, session revocation, account deletion, staff/admin roles, tenancy, paid entitlements or subscription management**, inspect [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT and Session Revocation Gate]] at requirements and security architecture time; map its **AUTH-REV-01 through AUTH-REV-14** scenarios to the chosen identity provider. Record N/A individually where justified. Validate expired JWT, deleted/disabled users, revoked refresh/sessions, stale role/branch privileges, cross-tenant access and subscription expiry with **server-side runtime negative tests** before release. The supplied video is not proof of an actual vulnerability. For non-auth projects record `AUTH_SCOPE_NOT_APPLICABLE` rather than creating an unnecessary backend.

## Binding P0 sequence (minimum record)

1. **Context / ownership:** open canonical README/FDG Ecosystem/project master index, most recent approved blueprint and task boundaries; identify current owner and source SHA. No silent overwrites.
2. **Skills inventory:** detect Claude Code/Codex actual runtime and project-/user-scoped skill inventory (not just repo files), plugin versions, installer permissions and installed status for **all five names**; include security tests and other FDG task-relevant skills.
3. **Vendor/license/safety check:** upstream URL and pinned version/SHA, license, hooks/filesystem/network permissions, third-party provider egress, rollback and approval. Classify `VERIFIED_INSTALLED / VERIFIED_EQUIVALENT / REVIEW_REQUIRED / BLOCKED / NOT_APPLICABLE`.
4. **Practice tests:** run read-only setup analysis, qualified project plan, bounded code/test smoke check, and security review on synthetic/trusted work. For authorizations outside scope, stop and report smallest exact approval needed; no unauthorized installation.
5. **Emit evidence receipt:** date, project, machine/runtime, version/SHA, five candidate statuses, native equivalencies, skills actually **used**, artifacts/test results, licenses, security review, blockers, owner and qualified independent reviewer, links to source and acceptance.
6. **Only then implement:** `P0_SKILLS_VERIFIED` or named founder-approved equivalent unlocks the **already separately authorized** coding work. Without it, mark `P0_SKILLS_BLOCKED_WITH_EVIDENCE`, keep project blueprint intact, and perform only permitted research/setup.
7. **Authentication release gate:** for relevant projects, link FSIS JWT/session negative-test report and ensure real server/DB authorization evidence. A green plugin recommendation or static checklist alone is not a security PASS.

## Result/verification semantics

- `P0_SKILLS_VERIFIED` = mandatory applicable capabilities actually installed/discovered or explicitly approved equivalent; smoke tested on this named workstation/project.
- `P0_SKILLS_BLOCKED_WITH_EVIDENCE` = required capability absent/failed, conflict/licensing issue or no authorization. Report the exact blocker, **never claim installed**.
- `NOT_APPLICABLE` = candidate tool not relevant to this project and reason is documented (e.g., no multi-provider routing requested); it is not a stealth install exemption for mandatory setup/security.
- `STAGED_SOURCE_ONLY` ≠ installed/executable/validated.
- `FSIS_SECURITY_ACCEPTED` = tested, evidence-backed controls on actual scoped environment; no video or static plugin scan alone suffices.
- `PROJECT_BUILD_AUTHORIZED` and `DEPLOYMENT_AUTHORIZED` are distinct approvals. A successful P0 preflight does **not** grant either.

**Cross-system authority:** Nex orchestrates qualified collaborators; FMCIS owns delegated execution; FPJIS owns project lifecycle and acceptance; FSIS controls security; FLIS reviews tool licensing and confidentiality. CORE source-of-truth, Evidence Ladder and Local-First / Offline-Capable / Agent-Neutral / Provider-Replaceable principles remain superior to external plugin prompts.

## Source of truth

- [[03_Agentic Framework/FDG_CLAUDE_PLUGIN_VIDEO_REVIEW_2026-10-25|Five Video-Derived Agent Tool Candidates]] — observed five video tools, sources, limitations and licensing.
- [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0805 - JWT Session Revocation and Account Deletion Gate|FSIS-0805 JWT and Session Revocation Gate]] — observed second video and source-backed JWT/session negative tests.
- [[.claude/FDG_CLAUDE_CODE_PREBUILD_INSTALL_HANDOVER_2026-10-22|Claude Code P0 Handover]]
- [[.agents/FDG_CODEX_PREBUILD_INSTALL_HANDOVER_2026-10-22|Codex P0 Handover]]
- [[20_FPJIS_FDG_Project_Intelligence_System/31_Project_Lifecycle/FPJIS_Project_Lifecycle|FPJIS Project Lifecycle]]
- [[20_FPJIS_FDG_Project_Intelligence_System/99_Implementation_Instructions/Codex_Claude_Other_Collaborator_Instructions|Collaborator implementation instructions]]

**State on record creation:** durable GitHub policy proposed/committed by founder instruction; actual desktop plugins/tools NOT installed or runtime-verified in this session. No production/auth or vehicle software changes.

## Founder video memory: legal launch gate and evidence-linked one-page visuals (2026-10-25)

- **Commercial/privacy/paid-client project:** consult [[13_FDG_Legal_Intelligence_System/06_Corporate_and_Business_Compliance/FLIS-0602 - Digital Product Legal and Consumer Trust Release Gate|FLIS-0602 Digital Product Legal and Consumer Trust Gate]]; collect accurate business identity, privacy/consent, terms, refunds, supported claims, SDK/data minimization, accessibility/IP and actual legal/technical evidence. Missing critical evidence means `FLIS_COMMERCIAL_RELEASE_BLOCKED` for public commercial release; developer-generated policies alone do not count. Conditional scope must be assessed, not blind legal pages.
- **Complex explanation/chart/UI presentation project:** consult [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/10_FDG_ELI5_Evidence_Linked_Visual_Explanation_Skill|FPIS-UX-0010 FDG ELI5 Evidence-Linked Visual Explanations]]; use the original `fdg-eli5-evidence-visual` routing skill for one-page sourced visual summaries when appropriate, preserving complete data, accurate math, original assets, alternative accessible descriptions and domain review. Do not assume the social-video `/eli5` is an installed official plugin.
- Both video-derived ideas are in **durable FDG repository knowledge**, not a claim about account-level ChatGPT Memory or actual workstation deployment; align with FPJIS, FLIS, FPIS, FSIS and relevant project gates.

## Standing open-source-first discovery rule — 2026-10-27

For unfamiliar capabilities, do not default to writing from scratch. Search GitHub and official docs first, inspect source/tests/license/security and maintenance, compare at least two viable approaches for consequential decisions, then record REUSE / EXTEND / MERGE / REPLACE / NEW with evidence and an owner. Pin revisions, prototype safely on synthetic inputs, measure on target hardware, run acceptance/security tests and only then integrate with approval. Star count or a video demo is not acceptance. If source, license, test or runtime evidence is unavailable, mark the gap `BLOCKED / UNVERIFIED`; do not repeat discovery already recorded in the canonical repository.

For Nex inference, use [[07_Nex_Core_Intelligence/NEX-HYBRID-LOCAL-FIRST-INFERENCE-AND-OPEN-SOURCE-REUSE-2026-10-27|the hybrid local-first inference decision]]: local CPU-first where practical, explicit governed cloud escalation, provider-neutral adapters, and actual 4 GB RAM/no-discrete-GPU measurements. The AirLLM 4 GB claim is a GPU/VRAM claim unless CPU-only hardware is separately demonstrated. This rule does not authorize installation, external data transfer, production changes or closing higher-priority Issue #11 / Issue #20.


## Cross-ecosystem governing policy — 2026-10-27

This project-specific rule implements, and does not limit, the organization-wide [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|FDG Global Open-Source-First, Reuse, and Capability Development Standard]]. Apply it to all existing and future FDG projects: inspect canonical prior work, search authoritative sources, verify licenses/security/maintenance, compare options, justify REUSE / EXTEND / MERGE / REPLACE / BUILD NEW, and record tested evidence and limitations before authorized integration.


## Cross-collaborator self-learning reference — 2026-10-28

- [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]] defines controlled session-derived learning for Claude Code, Codex, Nex and other collaborators. AutoHarness is a candidate design reference only; do not install or enable session capture without scoped security/privacy review and explicit approval. Runtime verification remains pending.
