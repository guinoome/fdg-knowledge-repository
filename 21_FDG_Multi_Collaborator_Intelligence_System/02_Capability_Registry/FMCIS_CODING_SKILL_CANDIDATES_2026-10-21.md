---
document_id: FMCIS-REF-SKILLS-20261021
status: Founder-requested capabilities; preliminary candidate assessment; not installed or integration-tested
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
