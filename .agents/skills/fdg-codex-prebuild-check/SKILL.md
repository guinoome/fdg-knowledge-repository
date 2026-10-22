---
name: fdg-codex-prebuild-check
description: Run FDG Codex P0 pre-build environment, skill-installation, model/provider compatibility and executable coding proof review. Use before a new FDG implementation starts or when asked to install coding skills.
---

# FDG Codex P0 pre-build skill

This is a **project-scoped instruction-only skill**. Read `AGENTS.md` and `.agents/FDG_CODEX_PREBUILD_INSTALL_HANDOVER_2026-10-22.md` before proposing or executing a coding work package. Do **not** install software solely because this skill was discovered.

1. Inventory installed Codex/version/working tree, available relevant FDG/Claudex skills, model/provider, current config and approval boundaries. Do not read/display raw credentials.
2. Restore missing previously approved FDG skills through audited, pinned `tools/claudex-loop/` scripts where permitted. Avoid reinstalling working skills.
3. Check only *task-required* externally sourced skill candidates; audit exact source SHA, SKILL.md, scripts, dependencies, hooks, permissions, license and collisions. Install only under the required scoped authorization.
4. Evaluate the Free Claude Code third-party gateway as **optional for Codex**; use native authorized provider by default. Do not automatically install the proxy or multiple agent harnesses; never pipe remote shell code to execution or silently change providers.
5. Perform an executable **synthetic-only** coding smoke test and actual positive/negative tests. Prove rollback and no unauthorized network or data exposure.
6. Return `CODEX-P0 VERIFIED` with actual evidence or `CODEX-P0 BLOCKED` with the precise missing permission/capability. Distinguish `FCC NOT APPLICABLE` from `FCC INSTALLED TESTED`.
7. Begin only a separately authorized, scoped FDG work package after the gate is satisfied. No production changes, customer data, payments, releases, model-auth bypass or safety approval changes.

If there is no local workstation access, return `WORKSTATION_NOT_ACCESSED`, not a fabricated pass.
