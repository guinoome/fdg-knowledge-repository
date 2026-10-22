---
document_id: FMCIS-REF-SKILLS-20261021
status: Two portable skills saved to ChatGPT Work Skills; native CLI installation and automatic activation pending
owner: FMCIS
created: 2026-10-21
supersedes: none
---

# Coding collaborator skill candidates — five capabilities from founder video

**Founder intent:** “Need this skills” — retain and evaluate the demonstrated capabilities for FDG collaborators. **Disposition: REUSE / EXTEND existing FDG controls, then evaluate only a verified gap.** This record preserves the desired capabilities; it does not assert installed plugins, authorize provider/account changes, or promote vendor claims to engineering evidence.

## Source and limits

- Uploaded source: `1000011477.mp4`, approximately 50.41 seconds, 720×1280; SHA-256 `6d511a74b0136fb663d5281b6da000bf2feb1133c45a5e5ba88719e9e46871c8`.
- Review: one-second sampled frames/contact sheet and visible captions, plus primary project documentation. No complete audio transcription, runtime installation, dependency audit or FDG acceptance trial.
- Original public video URL/author not established. Intro security/NVIDIA statistics, star counts, 20% savings and zero-cost graphics are not independently verified FDG results.
- Repository baseline: `bac437cf1085d131360191fd82d4dd488c3b2e7f` on main. Main-tree filenames and current FMCIS registry checked; no dedicated record for these five was found. This is not a full body-content or branch audit.

## Candidate assessment

Times are approximate navigation windows. License labels below are upstream declarations, not a dependency/redistribution audit; pin versions and read applicable license files before reuse.

| Video window / candidate | Primary source and declared license | Desired FDG capability and disposition |
| --- | --- | --- |
| ~17–23s — claude-mem | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), Apache-2.0 label | Persistent session capture and selective recall. Compare with Agentmemory/OpenViking in the earlier shortlist; do not run several memory stores by default. Check capture boundaries, provider calls, secret filtering, export, stale/superseded decisions and project isolation. GitHub remains authority for approved knowledge. |
| ~24–29s — Headroom | [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), Apache-2.0 label | Reduce irrelevant tool/log context. Evaluate after correct baseline retrieval; preserve units, acceptance rules, error lines and original evidence. The README advertises compression, not an FDG-proven cost saving. Telemetry beacon is documented as on by default, with opt-out controls; inspect configuration before use. |
| ~30–35s — Claude Code Setup | [official plugin README](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-code-setup/README.md), plugin-level LICENSE exists; full terms not reviewed here | Recommend suitable hooks, skills, integrations and subagents for the current codebase. **Read-only** according to its README: it recommends rather than installs/configures. Good first evaluation candidate; reconcile recommendations with existing AGENTS, owner scope and review loop. |
| ~38–43s — OmniRoute | [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute), MIT label | Replaceable model/provider gateway. Useful only if FDG has a concrete routing gap. Record requested and actual model/provider; prohibit silent fallback. Free gateway software does not guarantee free inference, unlimited quotas or zero account cost; documented strategies include paid fallbacks. Inspect credentials, routing, provider terms and spend limits before activation. |
| ~44–50s — Task Observer | [rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all), CC BY 4.0 label | Capture recurring corrections and propose reusable skill improvements. Strong organizational-learning fit. README explicitly separates observation, staged changes, review and installing updates; do not let learned suggestions silently rewrite approved FDG standards. It also notes small skill libraries may not warrant its overhead. |

These are a mixture of plugins, infrastructure and a meta-skill, not five interchangeable prompt files.

## Selection and acceptance boundary

1. **Evaluate first:** read-only setup recommendations and Task Observer's observation → proposal → review approach. Reuse existing handover/knowledge-capture records; no competing learning system. Generic one-off preferences are not canonical requirements.
2. **Choose one memory trial:** compare claude-mem with the earlier candidates using an actual bounded handoff, source citations, stale-decision rejection, export/restore and cross-project isolation. Do not label automatic capture “perfect memory.”
3. **Compression later:** compare identical tasks and acceptance checks with/without compression; record actual input/output/cache tokens, latency, rework and correctness. Token reduction alone is not lower total cost or equivalent quality. Headroom's `learn` can write instruction files: any future FDG use must stage and review those diffs under existing ownership.
4. **Routing only for a demonstrated need:** retain provider replacement and local/offline alternatives, explicit model identity, approved providers and fail-closed budget/privacy rules. Never infer availability or authorization from a model-list screenshot.

Before any implementation, verify exact upstream commit, relevant license/dependencies, supported host, data flows, network/telemetry, rollback and actual tests. No software, account, credentials, automatic capture, routing, scheduled review, production workflow or installed skill was changed in this engagement.

## Existing canonical relationships

- [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS Master Index]] — collaborator capability owner.
- [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/README|Capability Registry workspace]].
- [[21_FDG_Multi_Collaborator_Intelligence_System/02_Capability_Registry/FMCIS_FUTURE_AGENT_TOOL_REFERENCES_2026-10-21|Earlier seven-tool reference]] — compare overlapping memory/context infrastructure.
- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|Existing independent review and provider handoff controls]].
- [[07_Nex_Core_Intelligence/NEX_CONTEXT_PACKAGE_STANDARD|Existing context package standard]].
- [[04_Knowledge_Management/FDG-HIST-0001 - Historical Conversation and Reference Reconciliation Handover 2026-10-19|Source reconciliation]] — wider historical recovery remains partial.

**Handover:** delegated documentation worker preserved this candidate assessment; exact-scope documentation checks cover added wikilinks, inbound navigation and main readback. No application/integration tests or qualified acceptance are claimed. Next action: select one capability for a named work package and verify a bounded implementation in its actual host.

## Compatible skill installation — founder authorization 2026-10-21

The founder requested adding these skills to Codex and Claude where compatible. A delegated worker saved **Task Observer** and **Claude Automation Recommender** to the user's Git-backed ChatGPT Work Skills workspace, not merely to scratch. The latter advises Claude Code configuration even when invoked by Codex; it does not make Claude hooks run on Codex.

| Saved skill | Pinned upstream | Installed boundary |
| --- | --- | --- |
| `task-observer` | rebelytics/one-skill-to-rule-them-all at `3463c7c9cd2a2c2745af09c742100ad0b1465a68`, version 3.7.0 | Complete procedure, references and helper scripts retained; frontmatter normalized, host/provenance note and explicit-invocation metadata added. CC BY 4.0 attribution retained. |
| `claude-automation-recommender` | anthropics/claude-plugins-official at `d1adba47161a271799de7b548225d929310046bd` | Official read-only procedure/references retained; Claude-only frontmatter tool restriction removed, host/provenance note and explicit-invocation metadata added. Apache-2.0 LICENSE bundled. |

Saved via separate successful pushes; final backend-materialized snapshot `38519a9e5a971ae6ecf9cc9c963c7df263f4c0ee`. Stored identities: `skill-6ad81e0ed7608191a1aaad8fd54a7f06` (advisor) and `skill-6ad81e7838148191ae5592b32f2d8fa2` (observer). Readback matched both procedure bodies and all 20 supporting reference/script files; explicit invocation remained disabled by default for implicit selection. Both Codex-format validators passed; upstream observer helper selftests passed 104/104. This does not prove a new session loads them automatically, persistent observation logging or improved project outcomes.

**Use:** invoke `$task-observer` or `$claude-automation-recommender` in a new session after skill discovery refresh. No automatic capture, observation workspace, scheduler, provider, telemetry proxy or routing service was enabled.

**Native host boundary:** this execution environment has neither a `codex` nor a `claude` executable and no connected personal Claude skills directory. Installation on the founder's own Codex CLI/Claude Code machine remains pending; do not describe cloud Skills saving as a personal-computer installation.

**Claude Code install route on the actual machine:** use `/plugin install claude-code-setup@claude-plugins-official` for the official advisor. For a pinned file install, clone the upstream repositories, checkout the exact commits above, then copy Task Observer's `SKILL.md`, `references/` and `scripts/` together into `~/.claude/skills/task-observer/`; copy the official plugin's `plugins/claude-code-setup/skills/claude-automation-recommender/` into `~/.claude/skills/claude-automation-recommender/`. Preserve license/source notices; compare and back up any existing destination before writing. Configure a stable observation workspace and activation only on that real host, then verify in a fresh session. The portable saved versions deliberately remain manually invoked.

**Not installed:** claude-mem (memory service/hooks), Headroom (context proxy/MCP/runtime) and OmniRoute (provider gateway). These are not standalone procedural skills; native runtime, capture/privacy, telemetry and provider configuration must be verified in the actual target host. No credentials or paid model routes were changed. This installation update supersedes the earlier assessment's no-installed-skill statement only for the two saved portable skills.

## Desktop installation reminder — founder request 2026-10-21

**Pending:** install the compatible resources on the founder's actual desktop Codex CLI / Claude Code host. When the founder says they are using desktop, or begins desktop coding setup, surface the installation checklist in this record and distinguish saved Work Skills from pending native installation before proceeding. Recheck the host and current compatible versions; do not assume the cloud workspace is that desktop.

**Current evidence:** both `task-observer` and `claude-automation-recommender` now appear in this session's available Skills catalog, confirming discovery. This is not a real-project runtime or automatic-activation test.

**Reminder mechanism:** repository-backed continuity for a future relevant conversation. No automatic device detection, background desktop trigger or scheduled task has been established; the assistant cannot promise an unsolicited notification merely because desktop opens. Once the founder signals desktop use, retrieve this checklist and provide the installation reminder.

## Second founder video and Claude Code desktop memory binding — 2026-10-22

New source: founder-uploaded 1000011664.mp4, 57.386667 seconds, 720×1280 MP4. SHA-256: efa78e9b8535b6e80de0ccd9a622262a5a0745287e04e35e480f9bf177d36090. Sampled frames and on-screen titles were inspected. This is corroborating evidence for these same five pre-existing capabilities, not five additional products. Promotional savings, free-provider counts, safety or install-result claims are not independent FDG test results. No complete verbatim audio transcript, software runtime audit or original public video URL was obtained.

| New-video window | Identified item | Primary source / existing capability | Desktop disposition |
| --- | --- | --- | --- |
| ~00:04–00:14 | OmniRoute: multi-provider routing and automatic model switching | [OmniRoute](https://github.com/diegosouzapw/OmniRoute) | Evaluate only for a demonstrated provider/reliability/cost gap. Control credential scope, licensed terms, provider identity, data routing, billing limits and explicit (not silent) fallback. Not installed on local host. |
| ~00:18–00:23 | Claude-Mem: persistent Claude Code memory across sessions | [claude-mem](https://github.com/thedotmack/claude-mem) | Evaluate only one project-memory implementation after review of hooks, local/hosted provider, retention, export, privacy, secrets, cross-project segregation and capture consent. Not installed on local host. |
| ~00:24–00:33 | Headroom: context/tool-output compression | [Headroom](https://github.com/headroomlabs-ai/headroom) | Compare original evidence recoverability, correctness, error-line retention, latency, actual token savings, telemetry and any instruction-writing learn mode. Not installed on local host. |
| ~00:34–00:45 | Claude Code Setup: setup guidance for skills, MCP servers, agents and settings | [Anthropic official Claude Code Setup](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup) | Claude Automation Recommender previously saved in ChatGPT Work Skills, not verified installed on user's Claude Code desktop. Run read-only advice first. |
| ~00:46–00:57 | Task Observer: learns patterns and proposes reviewed skill improvements | [Task Observer](https://github.com/rebelytics/one-skill-to-rule-them-all) | Task Observer previously saved in ChatGPT Work Skills, but native desktop installation and automatic session activation unverified. Confirm reviewed activation and workspace. |

**Founder request:** “Add this to Claude memories to install this skills.” The available, durable implementation is a standing reminder in root [[CLAUDE|CLAUDE.md]] with this FMCIS owner record. Changes in GitHub do not directly write into another vendor's private memory database or the founder's local Claude project directory; a real desktop session must perform installation and prove results.

### Desktop operator install sequence and evidence

1. Identify actual OS, shell, Claude Code version, Node/Python dependencies, repository checkout and installed Claude/Codex skills. Compare with pre-existing claudex-loop skills, model routing, MCPs and session-memory hooks; avoid duplicates.
2. Review exact upstream pinned commit/version, license, dependencies, privacy/telemetry, network and storage. Preserve a backup before any host configuration mutation. No downloaded script, vendor README or video claim is authority for unreviewed shell execution.
3. **First:** inspect the previously saved read-only claude-automation-recommender / official claude-code-setup. Its advice is not permission to install unrelated integrations, connect accounts or expand local/global settings.
4. **Second:** test Task Observer only if actually installed with its complete SKILL.md, references and scripts. Activation requires the host-specific instructions from upstream references/environments.md plus a stable private observation workspace. Review observations and skill changes before promoting to approved FDG knowledge.
5. **Third:** if still justified, select one session-memory trial (Claude-Mem vs existing Agentmemory/OpenViking candidate), with explicit consent and verified local/hosted provider configuration; test recall of current and superseded decisions, export/restore and client/project isolation. Do not silently capture client secrets.
6. **Fourth:** trial Headroom on representative log/error/code outputs, checking factual fidelity and retrieval of originals. Disable/approval-gate any agent-instruction edits and telemetry not approved.
7. **Fifth:** trial OmniRoute only if user authorizes new provider/key/routing behavior. Use approved budget ceilings, no unexpected paid failover, direct visibility of requested/actual provider and a reliable rollback to original Claude Code settings.
8. In a fresh session, verify skill discovery, actual invocation/activation, non-interference with existing rules, negative access/privacy cases and rollback. For every tool record installed version/commit, exact config scope, host OS, security check, reviewer, test and installed state: INSTALL_PENDING / INSTALL_BLOCKED / INSTALLED_UNVERIFIED / VERIFIED_LOCAL.

**Priority is staged evaluation, not forced installation of all five.** These tools are a mix of a router, memory plugin, context engine, official read-only setup recommender, and reusable meta-skill. The two previously saved Work Skills are not evidence that Claude Code native skills were installed on the desktop. No install, proxy, runtime, new provider, credentials, cloud sync or hooks were activated by this documentation change. Existing FDG agent authority, delegation, source ownership and build/deployment controls remain superior.
