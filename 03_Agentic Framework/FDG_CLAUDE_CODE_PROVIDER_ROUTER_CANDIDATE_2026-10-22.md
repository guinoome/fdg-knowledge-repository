---
document_id: FDG-AGT-GW-2026-10-22
title: FDG Claude Code Provider Router Candidate - Free Claude Code
document_type: External gateway evaluation and Claude Code installation handover
status: Candidate - No external gateway installed or commissioned
created: 2026-10-22
owner_domain: Agentic Framework / FMCIS / Security
source: https://github.com/Alishahryar1/free-claude-code
upstream_reviewed_sha: 3d2ae2306752dbdf504714a5489bcfcf69b2d04a
upstream_license_observed: AGPL-3.0-only
disposition: Reuse as optional external candidate only, no wholesale adoption
implementation_authorized: false
production_authorized: false
supersedes: None
---

# FDG Claude Code Multi-Provider Routing Candidate — Free Claude Code

> [[FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this research candidate. The video supplied 2026-10-22 shows the project Free Claude Code, but does not establish operational, cost or security claims.

## 1. What this is, and what it is not

**Free Claude Code** by Alishahryar1 is a separately maintained, third-party **provider gateway/proxy and model-routing interface**, not a Claude Code skill or part of Anthropic's official Claude Code release. It can route compatible Claude Code traffic to hosted provider APIs or local models and exposes client launchers such as `fcc-claude` and `fcc-codex`. The repository's stated supported providers, 2026-10-22 promotional free-token amount, and functions may change. Marketing descriptions like "free forever" are **not a contractual promise of unlimited free usage**.

Source: https://github.com/Alishahryar1/free-claude-code ; reviewed upstream head 3d2ae2306752dbdf504714a5489bcfcf69b2d04a. Official vendor-neutral context: https://code.claude.com/docs/en/llm-gateway (Anthropic documents gateway concepts, not endorsement or proof of this particular project). Check the current upstream README, `pyproject.toml`, license and installer script at a **new, explicitly reviewed SHA** before installation.

This project's top-level LICENSE and `pyproject.toml` identify **AGPL-3.0-only**, which must be reviewed with FLIS/legal before any modification, redistribution, bundling, hosted service or reuse of its source inside FDG. No upstream code is copied or vendored by this document.

## 2. FDG purpose and boundary

Prospective value: lower-cost, local-model and alternative-provider experiments without replacing an existing Claude Code/Codex workflow, letting Nex route suitable low-risk bounded tasks to capable lower-cost providers while retaining stronger reviewers when evidence warrants. This is a **candidate adapter**, not Nex, FMCIS, an intelligence system, an authentication bypass, an API account, a working "free Claude" subscription or a commissioned agent.

Required FDG properties:
- Local-first and offline-capable **when a truly local provider is selected**. A loopback proxy alone is not offline if it calls a remote API.
- Agent-neutral and provider-replaceable: preserve existing CLI, CLAUDE.md, AGENTS.md, Claudex skills and agent authority. User must be able to revert to existing provider without a repository migration.
- NEX-STD-013 Level 0/1 discovery/recommendation first; Level 2 specific authorized installation/configuration only after separate approval. No implied Level 3, unattended runtime, payment, secrets retrieval, auto-send, code deployment or permission bypass.
- No duplicate router if the native Claude Code gateway capabilities, existing Claudex workflow, Codex setup or another approved adapter already satisfy the task.

## 3. Upstream evidence reviewed — 2026-10-22

| Evidence | Observation | Decision impact |
| --- | --- | --- |
| User-provided video `1000011683.mp4` (~39 sec) | Shows Free Claude Code marketing, Claude Code-like UI, alternative providers | Discovery only, neither test proof nor safe installer approval |
| `README.md` at SHA above | Mentions launcher, provider configuration, Admin UI, model routing, free tiers, and `curl | sh` / PowerShell remote installer | Real external proxy; do not execute remote installer unseen |
| `LICENSE`, `pyproject.toml` | AGPL-3.0-only; Python 3.14.7 pinned in package metadata; numerous dependencies | Runtime and legal due diligence necessary |
| `scripts/install.sh`, `scripts/install.ps1` | Installer may install/verify Claude, Codex, Pi, OpenCode, Hermes and other harnesses by default; supports optional extras | A bulk one-line install is **not** an acceptable FDG first step |
| Existing FDG `CLAUDE.md` / `AGENTS.md` | Claudex approved skills, delegation-first, safe release, task authority and source governance already exist | Add only a bounded optional gateway, not a replacement or automatic config |

No security audit, actual independent performance test, operating-cost confirmation, provider-TOS approval or workstation installation was performed. The upstream repository's own security and compatibility statements are **not independent verification**.

## 4. Workstation-level adoption sequence (prepared, NOT executed)

**P0 — Source, compatibility and data-safety preflight.**
1. Retrieve this file, current [[03_Agentic Framework/AUTHORITY_LEVELS|agent authority]] and [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS delegation rule]] and inspect current `claude --version` (if present), Codex/runtime inventory, user OS, existing provider routing and exact permissions. Don't touch private settings or secrets during discovery.
2. Resolve expected behavior: provider/mode (local, paid API or free tier), precise price/quotas/terms, workload fit, expected quality/context/tool fidelity, project data sensitivity and network/retention region. Confirm provider terms independently; never claim "risk-free", universal free usage or native Claude quality.
3. Pin a **new** upstream commit and review all selected executable scripts, nested installers, update tasks, auto-start, background listener, Admin UI/network bind, proxy-auth handling, credentials and storage, logs/telemetry, dependency/SBOM/license and malicious-package risk.
4. Prefer a **sandboxed, local-only and project-specific evaluation** against synthetic data, with host firewall/network egress understood. For the first test, use only an approved compatible provider; document exactly where prompts and source code would be sent. Do not provide real FDG client or proprietary engineering records to unapproved providers.

**P1 — Authorize and install only if justified.**
- Obtain founder authorization for the exact pinned version, provider, computer, configuration, credential handling and commands. Install only intended components; **do not** pipe unaudited remote installer script to a shell or PowerShell; do not inherit upstream installer defaults that install additional agents. Avoid replacing existing `claude`, `codex`, global PATH, global environment variables or project settings without before/after backup and restoration plan.
- Do not commit `.env`, bearer tokens, Nvidia/OpenRouter keys, logs with prompt content, personal contact details or secrets. The Admin UI must stay loopback-only, protected by authentication if appropriate; do not expose the gateway on a public interface.
- Keep approved launch explicit (an optional separate shell/session/launcher). Normal Claude Code/Codex authentication remains available as fallback.

**P2 — Prove behavior; otherwise revert.**
- Smoke test CLI discovery/launch, one synthetic read-only local code question, streamed output, tool-call correctness, max-context behavior, timeout, quota failure, model switch/fallback behavior and accurate provider identity disclosure.
- Negative tests: no private records sent to unapproved providers, no external network when offline is claimed, no unauthorized permission bypass, no leaked key in logs, no hidden cost/spend, no unaudited message transmission.
- Record source SHA, version, dependencies, runtime config paths (but never secret values), approval, network destinations, actual provider/model name, test transcript with synthetic fixture only, failures, rollback and reinstated baseline.
- Acceptance may qualify the router as **approved experiment only**. Separate FPJIS/FSIS gates govern use on actual FDG client data, integration into builds, background agents and any production infrastructure.

## 5. Status/ownership matrix

| Function | Authority | Candidate allowed activity |
| --- | --- | --- |
| Nex | Orchestrate candidate assessment, compare architectures, issue task card | No self-install/global credential change |
| FMCIS | Allocate bounded testing and independent review | No blanket permission for subordinate agents |
| FSIS/FLIS | Audit security/data transfers, provider policy and AGPL duties | Can block adoption |
| FPJIS | Govern approved work package, acceptance/release | Must separately authorize any code/build |
| Human founder | Approve exact scoped installation/provider before execution | Final authority |
| Engineering or service reviewer | Independently accept technical outputs | No automatically accepted engineering judgment by model |

## 6. Exact Claude Code integration — documentation skill only

The project-scoped skill [[.claude/skills/fdg-provider-gateway-review/SKILL|fdg-provider-gateway-review]] is committed with this reference and should be accessible as `/fdg-provider-gateway-review` when Claude Code opens a local checkout of this repository (per official Claude Code project skill rules: `.claude/skills/<name>/SKILL.md`).

This **skill is a controlled research and installation-approval checklist**, not Free Claude Code itself. It is explicitly user-invoked and does not run an installer, start a local proxy, switch model/provider, set environment variables or activate tools by itself. The instructions appear in GitHub's `CLAUDE.md` and `AGENTS.md`, but this does not modify Claude.ai memory or the user's personal `~/.claude` folder.

Upstream quickstart commands (do **not** run from this document):
- macOS/Linux vendor install uses a remote shell download/pipe.
- Windows vendor install evaluates a remote PowerShell script.
- `fcc-claude` and `fcc-codex` are upstream launchers **only after** a vetted actual install; they are not commands available in an untouched FDG environment.

## 7. Go/no-go

**Review accepted:** primary source located, AGPL license verified, and FDG docs/skill recorded.
**Workstation install:** NOT DONE.
**Compatibility test:** NOT DONE.
**Client/confidential workload authorized:** NO.
**Automatic routing, model fallback, local server, tokens, new subscriptions:** NONE.
**Next actionable handover:** Human opens updated repo on desktop Claude Code and explicitly invokes `/fdg-provider-gateway-review` for a read-only inventory and a narrow proposed setup; no install until explicit approval and checks.

See also [[03_Agentic Framework/FDG_EXTERNAL_SKILLS_CLAUDE_CODEX_CANDIDATES_2026-10-22|External skill source intake]] for a *different* collection of skills. This reference is a provider gateway and must not be conflated with a skills marketplace.

---

## 8. Additional candidate: FreeLLMAPI — video review 2026-10-25 (additive, not a replacement)

**Source:** Founder-supplied `1000012029.mp4` (30.02 seconds, 720x1280); original retained privately, not uploaded to public GitHub. SHA-256 of original: `3686803e1d9f1788d27e3ee65a3c18589537dec649ef9890f9a5787dcbf8b228`. Visual review: the clip promotes `FreeLLMAPI`, aggregating alternative models, auto-switching after quotas/errors, and a short continuity note across models; “zero bill/zero downtime” are *promotional claims*, not verified results.

**Verified upstream:** [tashfeenahmed/freellmapi](https://github.com/tashfeenahmed/freellmapi/tree/5646971602a89436ce4921b0f04b99ac7bcc3728) at inspected upstream `main@5646971602a89436ce4921b0f04b99ac7bcc3728`; [README](https://github.com/tashfeenahmed/freellmapi/blob/5646971602a89436ce4921b0f04b99ac7bcc3728/README.md); [client/agent documentation](https://github.com/tashfeenahmed/freellmapi/blob/5646971602a89436ce4921b0f04b99ac7bcc3728/docs/en/clients/01-agent-clients.md); [security policy](https://github.com/tashfeenahmed/freellmapi/blob/5646971602a89436ce4921b0f04b99ac7bcc3728/SECURITY.md); upstream top-level `LICENSE` declares MIT (third-party dependency and provider terms not yet reviewed). This is a **distinct candidate** from AGPL-licensed Free Claude Code, Caveman and OmniRoute; compare capabilities before choosing any gateway and do not layer multiple proxies without evidence.

**Potential FDG benefit:** optional, reversible local gateway for approved *synthetic/non-confidential* Claude Code/Codex research and low-cost specialist jobs. Upstream documents Claude Code Anthropic-format at server root and Codex Responses at `/v1`; rate-limit fallback is provider-dependent and not guaranteed. Cloud models receive requests across network boundaries; localhost router does not imply offline inference. A true local-model backend is required for fully offline execution.

**Context handoff truth boundary:** upstream `FREELLMAPI_CONTEXT_HANDOFF=on_model_switch` is optional; a short `system` note is inserted on model change. The documented per-session in-memory context has a 3-hour TTL. It cannot recover untransmitted messages, hidden provider state, canonical FDG source records, test runs, engineering approval or authenticated agent dispatch. **Retain the existing pinned FPJIS-LITE capsule, exact source/commit, accepted decisions, permission scope, tests, progress and next authorized action as the authoritative handover**; never make provider-router continuity note the system of record. Verify tool-call and result replay semantics before mid-task fallback.

**Security/operations:** FreeLLMAPI holds encrypted provider keys, unified bearer-token credentials and dashboard configuration. Maintain loopback binding, inspect installers, dependencies, egress, logs, updates, possible premium catalog costs and provider data-use/quotas/TOS. The upstream `SECURITY.md` supported-version table says `0.13.x` while other current project surfaces advertise newer releases; verify actual supported security version before any installation. No unsupported assumption of automatic Claude subscription exhaustion detection or unlimited tokens. No client/property/engineering data, production secrets, private chats or automatic global `claude`/`codex` configuration changes.

**Reuse/extend decision:** `ADAPT_FOR_CONTROLLED_EVALUATION`; source reviewed, principles useful for FMCIS routing and existing context-capsule discipline, **not** `VERIFIED_INSTALLED`, `TESTED`, `BUILD_AUTHORIZED` or `PRODUCTION_AUTHORIZED`. Preserve the existing Free Claude Code candidate record; this is a comparison entry, not a substitute architecture, skill or new intelligence engine.

**Smallest future authorized pilot:** read-only workstation/provider inventory → license/security and current config review → exact-version sandbox installation only on separate approval → synthetic task completed under fixed model A versus optional FreeLLMAPI failover (provider/model identity logged) → explicit rate-limit/error injection and context-switch test → comparison of *actual* cost, input/output tokens, latency, tool-call correctness, source citation accuracy, completed tests, and total correction effort → restore original provider and settings → independent FMCIS/FSIS/FPJIS review before promotion. If tools or provider terms are unavailable, mark `BLOCKED` and stop. This evaluation does **not** authorize installing, enabling hooks, proxying real client data, spending money or changing production.

**Source-to-build / Issue #11:** the router does not repair branch-only specifications, historical source gaps, CI enforcement, or acceptance traceability. It may consume an already approved, compact `FPJIS-LITE-001` worker capsule after source reconciliation; do not confuse a handoff note with traceable memory or build completion.

**Evidence actually gathered:** local video frames; exact upstream GitHub README/client docs/security/LICENSE inspected; repository candidate comparison. **Not performed:** independent upstream test, complete dependency/license audit, workstation installation, model routing, switching/handoff experiment, token benchmark, security scan, functional acceptance, or worker dispatch.
