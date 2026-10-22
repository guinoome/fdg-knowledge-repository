---
document_id: FPIS-UX-0007
title: UI UX Pro Max Mandatory Skill Adoption and FDG Premium Experience Gate
created: 2026-10-22
owner: FPIS Platform Experience and Design Intelligence
status: Founder-mandated skill prerequisite - workstation installation pending verification
scope: Claude Code, Codex, and capable FDG coding/design collaborators
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
reviewed_upstream_commit: 623a9a9037d006ea727f8213f084d02a6b6f11b5
license: MIT at inspected source commit; verify redistributed files and dependencies
installation_performed: false
design_acceptance_performed: false
production_build_authorized: false
supersedes: None
---

# FPIS-UX-0007 — UI UX Pro Max: mandatory skill, FDG-governed experience

> [[FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/00_Index|Platform Experience & Design]] → this rule.

## Founder directive (2026-10-22)

**UI UX Pro Max is a MUST-HAVE** for coding/design collaborators who build or revise FDG visual interfaces, frontends, dashboards, mobile/PWA interfaces, landing pages, interactive reports, business module screens or design systems. It is a **mandatory P0 prerequisite** on each relevant Claude Code/Codex workstation before starting a **new FDG UI or full-stack product implementation**. Confirm it is physically installed and callable; a GitHub note or similar skill name is not proof.

For non-visual API/database/infrastructure-only tasks, do not fabricate UI UX skill execution; identify `NO_UI_SCOPE` and retain all relevant FDG security, FPJIS and tooling gates. If installation required but unavailable/blocked for an interface task, return `UX_P0_BLOCKED_WITH_EVIDENCE` with the exact missing permission/compatibility issue. Only the founder or authorized FPIS owner can explicitly approve an exception or suitable vetted substitute. A blocked UI skill **does not justify quietly building a generic interface**.

This directive adds a tooling prerequisite to the already approved [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/03_FDG_Premium_Experience_Design_and_Implementation_Mandate|FPIS-MANDATE-0001 Premium Experience Mandate]] and does **not** supersede its architecture, design decisions, brand identity, role ownership, engineering data or approval requirements.

## External source review / scope

- Official source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill ; upstream reviewed main SHA: `623a9a9037d006ea727f8213f084d02a6b6f11b5` on 2026-10-22.
- Upstream has MIT license. `ui-ux-pro-max-cli` is the install package; its executable is `uipro`. Avoid the legacy `uipro-cli` name. Upstream advertises project initialization for Claude Code (`--ai claude`), Codex (`--ai codex`), and many additional named assistants, and a `--ai universal` format.
- Upstream `SKILL.md` (actual Claude skill) covers style/structure, typography, color, layout, mobile, forms, accessibility, interaction, charts and stack-specific implementations; Python 3.x required for its bundled local search tool, which declares no external dependencies.
- The **Basic/open-source version** is suitable for initial trials. Upstream advertises additional *Premium* commercial services; FDG does not assume a Premium subscription, purchasing approval or entitlement.
- Source catalog and CLI version indicators can differ. Before installation, independently check the exact CLI package version, integrity, reviewed files/scripts, Node/npm/Python prerequisites, actual destination paths and rollback. This review is **not** a full supply-chain or local execution audit.
- Treat style suggestions, automatically generated palettes, examples, rules and template data as **non-authoritative external advice**. Do not reproduce external designs without matching FDG requirements, accessibility and license/provenance.

## P0 installation and verification runbook — implementation on user's computer only

1. **Baseline:** Inspect existing `.claude/skills/ui-ux-pro-max/SKILL.md`, `.agents/skills/ui-ux-pro-max/SKILL.md`, and any existing global installation. Record local branch SHA, OS, Codex/Claude version, current skill directories, permissions, Node/npm/Python versions, and user-approved installer scope; do not overwrite an existing installed skill blindly.
2. **Read and authorize:** Fetch current official source/pinned revision, inspect installer behavior and dependency manifests, ensure no conflict with existing FDG Claudex skills or other collaborators. Record any intended writes beyond the project, and seek approval for actual third-party package execution, system-level requirements, credential/network access or unexpected side effects.
3. **Preview:** In the **intended project root**, run reviewed package's supported dry-run (for example `uipro init --dry-run` after a trusted CLI installation), inspect file operations. Do not execute unreviewed `curl | sh`, use `--ai all`, upgrade everything or silently alter global profile.
4. **Install to the relevant project** after actual authorization, selecting either:
   - **Claude Code native marketplace (within Claude Code):** `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill`, then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`. Verify destination and discovery; do not install twice through both methods.
   - **Audited CLI, Claude Code:** `npx ui-ux-pro-max-cli init --ai claude` (pin/audit the resolved package version before execution).
   - **Audited CLI, Codex:** `npx ui-ux-pro-max-cli init --ai codex` (pin/audit the resolved package version before execution).
   - **Other supported provider:** use only the upstream's exact supported platform flag after checking its local skill contract; provider-neutral `--ai universal` may be suitable but needs provider-specific discovery tests.
5. **Verify actual contents:** For Claude Code confirm correctly populated `.claude/skills/ui-ux-pro-max/` (or approved marketplace equivalent); for Codex confirm `.agents/skills/ui-ux-pro-max/` or correct version's supported path. Confirm `SKILL.md`, data catalog and Python scripts were installed, not just a loader stub; run `--help`/discovery if available.
6. **Exercise** a safe representative search and `--design-system` run against synthetic FDG-like examples, no private data, using the installed `scripts/search.py` in the correct skill root. Check actual output and top domain/stack result, errors, permission/IO behavior and product fit. For new UI project/page, develop or reuse a specific FDG design-system MASTER and page override; **do not overwrite an approved MASTER without owner review**. Skill's `--persist` and `--force` options are authoring writes, not automatic rights to replace governance.
7. **Prove interface quality:** Build or repair one authorized small user interaction; test real click/input/navigation, responsive phone/tablet/desktop, keyboard focus, contrast/reduced-motion and empty/loading/error/offline/access-denied states as relevant. Compare the running UI against the project's **approved FPIS references** and tested workflow, not generic screenshots.
8. **Return receipt:** Record installed skill version and source SHA, host/agent, paths, scripts audited, install commands *actually executed*, search/design-output evidence, functional UI tests, negative tests, approval, rollback and `UX_P0_VERIFIED` or `UX_P0_BLOCKED_WITH_EVIDENCE`. Document unverified items honestly.

**No workstation installer is run by recording this rule in GitHub.** The local user/coding agent with proper permissions must perform and verify it.

## FPIS controls that always outrank an external recommendation

- **Premium, non-generic visual identity**: purposeful hierarchy, typography, real domain data, authentic equipment/operations context, no generic purple gradient/artificial "AI-looking" dashboards, arbitrary dense cards or stock marketing clichés.
- **Adaptive Hybrid** for FBPOIS roles and realistic engineer/supervisor/technician hierarchy; role dashboard content and allowed actions differ. Preserve approved hero + transparent live overlay/glass direction where project references mandate it; don't force visual effects onto data-entry tools.
- **Responsive & field use:** mobile-first/PWA, one-hand task completion, sufficient touch targets, camera/QR, offline save and visible sync/conflict states; do not remove domain data merely to fit a narrow viewport.
- **Experience Composer and white-label constraints:** governed tenant identity and design tokens, FDG capability attribution, permissions and explicit provenance. External recommendation is not license to rewrite accepted brand kit or copy another company.
- **Truth/security first:** no invented engineering readings, paid subscriptions, live features, fake customer/testimonials, disabled validation/authorization, corrupted calculations or private customer record leaks in prototypes.
- **Interactions and evidence:** demonstrable real controls, error handling, loading, keyboard semantics, responsiveness, performance and regression proof. Avoid static screenshot pans as a substitute for a working demo.
- **Existing code before new styles:** REUSE/EXTEND/REPAIR existing tokens, CSS, components and accessible navigation before introducing a parallel UI library or changing stack. Document change rationale and protect other agents' files.

## Mandatory UI task handover

```text
FDG-UX GATE / FPJIS work package:
Design task / relevant existing code paths:
Role/device/data and operational critical actions:
Current approved FPIS design refs, visual hierarchy and identity:
UI UX Pro Max status + version + installed skill path:
Search/design-system invocation and inspected outputs:
Adopted suggestions vs rejected suggestions (and FDG reason):
Exact owned files authorized to change:
Working UI interaction and mobile/keyboard/offline/error tests actually run:
Screenshots/recording (evidence of working UI only):
No-regression findings; privacy/security and engineering truth:
Independent review / founder acceptance:
Outcome: UX_P0_VERIFIED / UX_P0_BLOCKED / NO_UI_SCOPE:
GitHub commit and rollback:
```

## Acceptance limits

1. No new FDG UI work by an agent lacking a verified required skill or an explicitly documented, approved exception.
2. One coherent design system and existing project code reused; no duplication or blind replacement.
3. External skill advice never overrides FPIS/FEIS/FBPOIS/FSIS/FBIS/FPJIS approvals and data contracts.
4. "Skills installed" ≠ "interface complete". Only tested source, screen states, actual running interactions and appropriate owner acceptance can close the task.
5. Performance, security and accessibility tests remain governed by FPIS-PERF-0001, FSIS-0803 and existing FPJIS nonfunctional/release gates.
6. No automatic publishing, new subscription spend, CI privilege expansion or production deployments from this documentation.

**Status at creation:** Source and installation paths inspected and recorded; GitHub directive prepared. Neither workstation installation nor UI test execution was performed in this authoring session.
