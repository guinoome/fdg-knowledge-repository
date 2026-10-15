# FDG Claudex Loop Bootstrap

This folder makes the **Claudex Loop** cross-provider workflow reproducible for FDG Codex and Claude Code sessions without making Claudex the architecture of FDG.

## What is adopted

External project: `chaseai-yt/claudex-loop`  
License: MIT  
Pinned upstream commit: `53cddc42e39346fb8c6d5d612281a3b1add14e66`  
FDG review date: 2026-10-15

The upstream project provides four related skills:

- `claudex-loop` — full requirements → plan review → build → independent inspection workflow
- `claudex-route` — lightweight model/task routing or one bounded handoff
- `codex-review` — explicit Codex review compatibility skill
- `codex-build` — explicit Codex builder compatibility skill

The full loop requires both **Claude Code CLI** and **Codex CLI** to be installed and authenticated, plus Python 3.10+.

## FDG operating rule

For substantial coding, architecture-sensitive implementation, security-sensitive changes, migrations, or work packages where independent verification materially reduces risk:

> **The builder must not be the sole grader of its own work.**

Use the opposite provider for plan challenge and final inspection when both providers are available.

Do not force the loop for trivial documentation edits, formatting-only changes, or other work where the review overhead is disproportionate.

## Install / restore

Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File tools/claudex-loop/install.ps1
```

macOS / Linux:

```bash
bash tools/claudex-loop/install.sh
```

The installers copy the pinned upstream skill set into both:

```text
~/.agents/skills/
~/.claude/skills/
```

Open a new Codex or Claude Code session after installation.

## Invocation

Codex:

```text
$claudex-route
$claudex-loop
```

Claude Code after manual skill installation:

```text
/claudex-route
/claudex-loop
```

Claude Code may alternatively use the upstream plugin marketplace, but FDG does not require that distribution path because the shared manual installation keeps the two hosts aligned.

## Update policy

Do **not** silently update to upstream `main`.

1. Review the upstream diff and release/validation notes.
2. Check for changed permissions, runtime behavior, provider/model assumptions, and installation paths.
3. Run the upstream validation/tests where practical.
4. Update `UPSTREAM.json` and the installer default ref deliberately.
5. Record the change in the FDG Knowledge Repository.

This keeps the external tool replaceable and prevents upstream changes from silently redefining FDG execution behavior.

## Boundary

Claudex Loop is an **execution capability**, not an FDG source of authority.

FDG governance, work-package authority, acceptance criteria, repository evidence, and final human authority remain controlling. If Claudex is unavailable, the work may continue using another governed review mechanism, but it must not be represented as cross-provider verified unless an independent provider actually performed the review.

Canonical FDG rule:

[[03_Agentic Framework/FDG_CROSS_PROVIDER_ENGINEERING_REVIEW_LOOP|FDG Cross-Provider Engineering Review Loop]]
