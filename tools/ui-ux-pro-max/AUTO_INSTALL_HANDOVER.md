---
document_id: FDG-UX-AUTOBOOT-2026-10-22
title: Automatic, Controlled UI UX Pro Max Handover for Coding Collaborators
status: Ready to run locally - GitHub alone does not install the skill
created: 2026-10-22
owner_domain: FPIS / FMCIS
authorizes: Agent-initiated project-local missing-skill bootstrap for assigned UI work
forbids: Unattended global installation, unmanaged latest updates, production deployment, account/secret changes
---

# FDG UI UX Pro Max — Automatic Collaborator Handover

**Founder request:** When Claude Code, Codex, or another supported collaborator first opens a real FDG user-interface task, **the agent should proactively run the approved project-local skill bootstrap**, rather than just reminding the founder to install it. Agent startup is the execution trigger; this GitHub repository has **no remote ability to execute on a user's computer by itself**. No background daemon, GitHub Action, invisible autorun hook or privileged auto-installer was created.

**Source identification:** The supplied https://ui-ux-pro-max-skill.com/ site states it is an **unofficial translation**. Canonical source is https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (reviewed main SHA 623a9a9037d006ea727f8213f084d02a6b6f11b5). Source root declares MIT. The official npm distribution is **ui-ux-pro-max-cli**. For repeatability we deliberately pin installer version **2.15.0** (public npm registry listing reviewed on 2026-10-22), not npm latest or legacy uipro-cli. Script verifies registry version/license before running. The npm package's exact dependency graph and install script must still pass local platform/tool permission/security checks. This is not a signed binary attestation.

## Trigger decision

**YES — Auto-invoke:** the assigned bounded FPJIS work package entails building, changing, reviewing, visualizing or testing any FDG web/mobile/desktop UI, dashboard, design system, chart, public page, form, interactive visualization or related full-stack interface. First read current CLAUDE.md/AGENTS.md and existing FPIS approval; then run the P0 bootstrap.

**NO — Not applicable:** docs-only, unrelated pure backend/database API or infrastructure without UI effect. Report NO_UI_SCOPE; do not deliberately install unrelated software merely because the repository is open.

**Already installed:** script verifies actual SKILL.md, Python search, data catalog and design-system output. It does not overwrite. **Missing:** automatically request a project-local install using pinned package, first previewing intended files. **Invalid partial install:** stop with a precise blocker, never --force or delete an existing installation.

## One-command project-local bootstrap (agent executes on workstation when authorized)

Run from the repo root with Python 3 (Windows: py -3 if needed):

\`\`\`powershell
python tools/ui-ux-pro-max/bootstrap.py --agents claude,codex --apply
\`\`\`

- Installs missing Claude Code project skill under \`.claude/skills/ui-ux-pro-max/\`.
- Installs missing Codex project skill under \`.agents/skills/ui-ux-pro-max/\`.
- These are **upstream full native skill packages**, not the unrelated FDG review/checklist skills. The script verifies SKILL.md, scripts/search.py and data, runs a synthetic \`--design-system\` search, then returns a machine-readable JSON receipt.
- Agent-specific alternative: \`--agents claude --apply\` or \`--agents codex --apply\`.
- Other capable collaborators: \`--agents cursor,gemini,opencode --apply\` or \`--agents universal --apply\`. Codex and universal share .agents/skills: the bootstrap recognizes the duplicate target rather than reinstalling it.
- Inventory only (no writes): \`python tools/ui-ux-pro-max/bootstrap.py --agents claude,codex --check\`.
- \`--apply\` may download and execute the **pinned npm installer** in the host's user context; it requires Node/npm and network on the initial install. Host tool permission prompts MUST still be respected. An offline/locked-down workstation should return BLOCKED, not bypass policy. The user must install missing Node/npm/Python manually; do not auto-install system prerequisites.
- Project-local only: **No --global, --all, --force, privileged shell, account access, credentials, production deployment, extra coding agent packages, or silent auto-updates.** No unrelated files should be overwritten.
- The bootstrap emits status to stdout. It does not claim to install on remote machines, distribute itself globally, configure new model accounts or install premium paid services.

## Per-collaborator autonomous handover sequence

1. **Read** \`CLAUDE.md\` or \`AGENTS.md\`, the FPIS Premium Experience Mandate, project design references and the assigned work-card scope. Determine if UI is in scope.
2. **Auto-invoke** the one-command bootstrap for that agent from the actual local checkout. This is a *user-requested project-local installation instruction*, not approval for OS-level changes; respect any execution-approval prompt.
3. **Resolve** \`UX_P0_VERIFIED\` vs \`UX_P0_BLOCKED_WITH_EVIDENCE\`. The script checks functionality; Claude/Codex may need to restart to discover freshly installed skills. If not detectable, restart/rediscover and verify before UI coding.
4. **Apply** the upstream skill as guidance: run design-system query for new screen/product; for existing UI focus on one semantic UX concern, detected stack, and approved project tokens. Use it to improve quality and accessibility, not override FPIS-approved premium directions.
5. **Prove** interface behavior on supported phone/tablet/desktop (when applicable): role-specific flows, clicks/forms, loading/empty/error/offline/sync/conflict states, accessibility/reduced motion, security and privacy; report test commands and outcomes. Skill installation itself is not a UI regression pass or production acceptance.
6. **Delegate** bounded work according to FMCIS only if actual subagents available. Do not claim a worker installed a skill merely because a handover was committed.
7. **Return** the skill bootstrap JSON, actual installed paths and package version, approval/sandbox constraints, evidence of design-system query, UI test results, residual risks, project source SHA, reviewers and release status. No invented receipts.

## Failure and rollback

- If skill is missing but Node/npm/network is absent, return blocked with exact need. Don't fall back to a generic template UI silently.
- If an existing skill is partial or broken, return \`BLOCKED_EXISTING_BROKEN_SKILL\` for owner review. Do not overwrite customized versions.
- To undo a *newly installed* project-local skill, first verify the destination is owned by the bootstrap and no collaborator modifications exist, then use an approved targeted \`uipro uninstall --ai <agent>\` command from the pinned package or revert only the explicitly identified added folder. Never remove entire \`.claude\` or \`.agents\`, whose FDG subskills are separately governed.
- For third-party package upgrades: change the pin only through source/license/dependency review and a verified test. No automatic \`uipro update\` or global npm upgrade.
- Re-run read-only \`--check\` in the project and validate no unrelated changes. Retain screenshot/code test evidence and review owner.

## Authority

[[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FPIS-MANDATE-0001]] is governing experience policy; [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/07_UI_UX_Pro_Max_Mandatory_Skill_Adoption_and_Experience_Gate|FPIS-UX-0007]] is the mandatory tool gate. User's desire for automatic handover does not change FEIS/FBPOIS engineering semantics, security, provider neutrality, safe deployment authority or the pre-existing codex/Claude tool P0 gates.

**Record maturity:** Prepared executable handover, with positive and negative bootstrap decision branches locally tested using a synthetic fixture. Actual workstation installation and successful UI testing were not conducted in the authoring environment.

## Visual craft companion skills — 2026-10-23

After mandatory verified UI UX Pro Max installation on a substantive UI task, execute the **task-scoped** follow-on agent skill bootstrap documented in tools/visual-craft/INSTALL_HANDOVER.md and [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/08_Visual_Craft_Collaborator_Skills_and_Tooling_2026-10-23|FPIS-UX-0008 Visual Craft Skills]]. Taste is the approved default companion for art direction; GSAP and Transitions free skill are optional for real motion scope. Their project-local pinned Git copy does not install runtime dependencies or replace FPIS approved design. Heavy Playwright CLI/Impeccable/Design Extract integrations and React Bits code reuse require separate source, permission and license checks.
