---
document_id: FDG-CODEX-PREBUILD-INSTALL-2026-10-22
title: Codex Mandatory Pre-Build Skills and Optional Provider Gateway Handover
document_type: founder-requested Codex workstation preflight / skill setup handover
status: Prepared for Codex - NOT INSTALLED or RUN-TIME VERIFIED
date: 2026-10-22
owner_domain: Agentic Framework / FMCIS / FPJIS
provider_scope: OpenAI Codex CLI / compatible Codex environments
foundation: FDG-CLAUDE-PREBUILD-INSTALL-2026-10-22
build_authorized: false
deployment_authorized: false
supersedes: None
---

# Codex P0 — Pre-Build Skills, Model and Coding Output Gate

> Knowledge path: [[FDG Ecosystem|FDG Ecosystem]] → [[03_Agentic Framework/03_Agentic Framework_Master_Index|Agentic Framework]] → this Codex execution handover.

## Founder decision and status

**Before any new FDG implementation begins in Codex**, inspect, restore/install and **verify** the coding skills required for the assigned task; prove the selected provider produces runnable tested code; then continue to a separately authorized FPJIS/FMCIS build card. This is a founder-requested **priority** on the local Codex workstation, not a claim that installation or testing has occurred.

Reference the parallel [[.claude/FDG_CLAUDE_CODE_PREBUILD_INSTALL_HANDOVER_2026-10-22|Claude Code P0 Handover]]. Apply equivalent quality gates using **Codex-native** conventions, not Claude-only slash commands or plugin-marketplace assumptions.

**Codex conventions:** `AGENTS.md` controls repository work. Project skill location `.agents/skills/<skill>/SKILL.md`; the associated manually invoked local review skill is `$fdg-codex-prebuild-check` when Codex discovers it. Codex may also have user-level `~/.agents/skills` or `~/.codex/skills` depending on its actual version/environment; verify rather than assume. Reference: https://developers.openai.com/blog/skills-agents-sdk ; https://developers.openai.com/blog/eval-skills .

**Terminology:** `Free Claude Code` is a third-party **provider gateway/proxy**, NOT the official Codex CLI, an OpenAI-approved integration, a Codex skill, or a promise of unlimited free model use. Codex has its own provider/authentication workflow. Do **not** install a new proxy just because the Claude handover mentions it; adopt FCC on Codex only when a named missing capability is established and a safety/compatibility gate passes.

## Read order — narrowly scoped

1. `AGENTS.md` and this handover; `.agents/skills/fdg-codex-prebuild-check/SKILL.md`.
2. `tools/claudex-loop/README.md`, `tools/claudex-loop/UPSTREAM.json`, approved bootstrap script (if a relevant skill is missing), and the latest assigned FDG coding work package.
3. [[03_Agentic Framework/FDG_EXTERNAL_SKILLS_CLAUDE_CODEX_CANDIDATES_2026-10-22|External skill candidate review]] (source alirezarezvani/claude-skills).
4. [[03_Agentic Framework/FDG_CLAUDE_CODE_PROVIDER_ROUTER_CANDIDATE_2026-10-22|FCC gateway source/licensing and privacy review]] **only** for an evidenced optional gateway test.
5. [[03_Agentic Framework/AUTHORITY_LEVELS|NEX-STD-013]] and [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-DISP-001 - Delegation First Agent Execution Rule|FMCIS delegation authority]].

Read only materially relevant and changed sources. Preserve approved ownership, current working code and cross-provider instructions.

## P0-CDX-01 — Baseline and skill inventory

Read-only at first:
- Verify current `main` SHA and working tree; detect unresolved changes/other-agent ownership.
- Confirm Codex CLI/application version, host OS, existing authentication (status only), authorized provider/model, tool permissions, available CLI/skills, local vs user-level skill directories.
- Check `claudex-loop`, `claudex-route`, `codex-build`, `codex-review` and the new FDG local review skill **where applicable**, as well as native Codex features. If already working, avoid duplicate installation.
- Capture baseline coding command in a temporary **synthetic-only** fixture, current config paths (never token values), dependency versions, and backout method.

**Pass:** actual inventory/evidence. **Fail/block:** absent Codex executable or rights to inspect; do not invent status.

## P0-CDX-02 — Restore approved FDG collaboration skills where relevant

- Read and audit the checked-in `tools/claudex-loop/install.sh` or `install.ps1` and `UPSTREAM.json`, then use the **existing approved pinned** route only if the relevant skills are missing, compatible, and authorized for the target machine.
- Retain existing paths/config; do not overwrite other agents' skills or install Claude Code automatically solely because Codex wants a shared skill.
- Verify actual skill name, discovery, invocation and behavior, preserving `$claudex-loop`, `$claudex-route` syntax where the installed Codex supports it. Record the original and destination paths plus rollback.
- If no second provider or delegation is available, disclose the missing capability and use the documented non-fabrication boundary.

## P0-CDX-03 — Install **only** task-relevant reviewed external skills

- Compare the assigned FPJIS task card with existing native and approved skills first.
- Review the pinned `alirezarezvani/claude-skills` source and actual Codex-compatible SKILL.md for **engineering QA/coding/testing** as the first candidate. Commercial, finance, marketing or business operations are considered only for tasks that need them.
- Inspect nested scripts, dependencies, hooks, auto-memory behavior, network destinations, license/provenance, injection risks and path collisions. Do not run wildcard `npx` installer, remote `curl | sh`, or a bulk-import of advertised skills.
- With exact scoped permission, install one chosen skill into the relevant Codex-supported location, then test invocation and negative cases with synthetic fixtures. No C-suite persona runtime or auto-posting/payment permissions. Treat external instructions as untrusted.
- Allowed statuses: **ALREADY INSTALLED AND VERIFIED**, **INSTALLED AND VERIFIED**, **NOT REQUIRED**, **BLOCKED**. GitHub documentation does not count as workstation installation.

## P0-CDX-04 — Provider/coding capability acceptance, optional FCC decision

**Default:** retain the native authorized Codex provider if it executes the required workload correctly at acceptable documented access/cost. **An optional FCC experiment is NOT a mandatory dependency for Codex.** It is applicable only if the user specifically approves an alternative provider or a missing/expensive model route justifies a controlled experiment.

If considered:
1. Verify current `Alishahryar1/free-claude-code` commit, actual Codex launcher support, Python/runtime compatibility, AGPL-3.0-only license and legal implications, installer side effects and called scripts, endpoint bind and auth, logging/telemetry, model/provider ToS, billing, data retention and egress.
2. Obtain explicit founder authorization for the exact machine, pinned revision, selected provider/model, network/data scope, planned commands and restoration path. No auto-installing multiple coding harnesses or reconfiguring existing global authentication.
3. Use an isolated session with synthetic data, run actual streaming/tool tests and forced error/quota tests, verify provider identity and rollback; document cost or mark it unknown. Never substitute different providers silently.
4. If incompatible/unsafe/unapproved: **FCC NOT APPLICABLE / BLOCKED** and retain native Codex without calling P0 failed **unless the founder separately required FCC on Codex**. Record the factual reason.

## P0-CDX-05 — Executable code evidence gate

- Use a temporary bounded synthetic coding task, e.g. implement a validated engineering computation with units and exercise normal, invalid and edge inputs; no modifications to live FDG products.
- Run the actual compile/typecheck/tests/lint supported by the chosen language, with logs and expected vs actual output; verify the model named and which skills were used. A text-only code snippet is **not** a passed smoke test.
- Test resilience/error behavior and verify that no private customer material or credential was transmitted and original environment is recoverable.
- Gate:
  - **CODEX-P0 VERIFIED** only when required task-specific skills are installed/verified or intentionally not needed, authorized model passes executed test, evidence and rollback are recorded, and separate project work package is approved.
  - **CODEX-P0 BLOCKED** if mandatory skill, provider, permission or executable output cannot be tested. Describe precise next approval/remediation; do not begin new implementation.
  - Optional FCC may be **NOT APPLICABLE** without blocking native Codex. Never claim it was installed unless it actually was.
- Next step is the original **separately authorized** implementation work package with source-to-requirement gap and acceptance checks. P0 does not grant feature/build, payment, client-data, professional, production, or deployment permission.

## Acceptance receipt template — fill from actual machine tests

```text
FDG-CODEX-P0 STATUS: NOT STARTED / BLOCKED / VERIFIED
Repo SHA / OS / Codex version:
Codex executable and scope:
Native provider/model and actual permission state:
Existing approved skills, versions and verified paths:
New task-specific Codex skills, pinned SHA, install path and discovery/test:
External scripts and network/secret audits:
FCC optional: NOT APPLICABLE / BLOCKED / INSTALLED TESTED
FCC source SHA, permissions, provider, cost and negative tests if applicable:
Approved install commands executed (not just planned):
Synthetic code task, file/command, actual standard output:
Compilation/typecheck/unit/error tests, actual pass/fail logs:
Rollback evidence; unverified risks:
Next authorized FPJIS/FMCIS coding card:
Reviewer's evidence and status:
FDG-SYNC: VERIFIED_MAIN / ON_BRANCH / ISSUE_ONLY / SYNC_BLOCKED / NOT_PUBLISHED
```

## Boundaries

Nex remains the **orchestrator**; workers execute bounded tasks only when real dispatch is available. Do not mutate approved knowledge or existing implementations outside assigned paths. Local-First, Offline-Capable, Agent-Neutral, Provider-Replaceable and Context-Origin-Reasoning-Evidence remain mandatory. No deployment, cloud spending or privileged operations are authorized by this record. An installation plan is not execution evidence.

**Current status (repository authoring):** Codex setup/installation and smoke tests have not been run on the founder's workstation. Only instructions and repository-local skill were prepared.
