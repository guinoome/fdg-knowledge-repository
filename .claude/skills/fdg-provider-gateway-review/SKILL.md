---
name: fdg-provider-gateway-review
description: Review optional third-party Free Claude Code provider gateway compatibility, risks and an install plan for the FDG repository, without enabling it.
disable-model-invocation: true
---

# FDG provider gateway review (manual invocation only)

Only run when the user invokes `/fdg-provider-gateway-review`. This is an **assessment skill**, not an installed proxy or permission to run arbitrary installers.

1. Read `CLAUDE.md`, `03_Agentic Framework/FDG_CLAUDE_CODE_PROVIDER_ROUTER_CANDIDATE_2026-10-22.md`, the current FDG agent authority, and the relevant project work package. Identify any newer governing direction.
2. Inventory the installed Claude Code version, current authorized provider, existing Claudex/FDG skills and optional routing adapters **read-only**. If workstation access is unavailable, mark `WORKSTATION_NOT_ACCESSED`.
3. Review the actual current upstream `Alishahryar1/free-claude-code` repository at a **new pinned SHA**: license (AGPL-3.0-only at reviewed 2026-10-22 commit), installer tree including child scripts, dependency/runtime versions, local admin/auth, logs/secrets storage, endpoint binding, background updaters, provider terms/quotas and source disclosure. Flag unknowns.
4. State plainly that FCC is a **gateway/proxy**, NOT an Anthropic skill or a promise of free Claude models; free providers and local models may have different quality, privacy, tool use and limits.
5. Recommend REUSE EXISTING / REJECT / RESEARCH FURTHER / TEST IN ISOLATION; provide a short exact-platform implementation proposal and named negative tests. Do not default to bulk installation.
6. **Stop before installation or changing settings/credentials/PATH/network/provider** until the founder explicitly approves the exact version, computer, provider, network/data transfer and commands. Never run `curl | sh`, `irm | iex`, auto-install multiple harnesses, disable safety approvals, or use `--dangerously-skip-permissions`.
7. If the separate scoped install is authorized and supported by actual tools, delegate bounded implementation under FMCIS when subagents are really available; preserve the existing CLI/provider baseline, require synthetic tests, confirm no client data leaves without approval, test rollback. Report true executed state; no fabricated tests, costs or installed status.
8. Return a compact receipt: `source_sha`, `license`, `claude_version`, `provider`, `scope`, `risk/findings`, `approval`, `commands_proposed/executed`, `tests_passed/not_run`, `rollback`, `status`.

This skill is a manual review gate. Do not copy vendor code into FDG or make it an always-on dependency.
