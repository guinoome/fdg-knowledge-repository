# FDG Visual Craft — Collaborator Auto-Handover

**Trigger:** when a coding agent begins an authorized FDG frontend, dashboard, PWA, landing page or significant full-stack UI task. Read FPIS-UX-0008, the current FPIS Premium Experience Mandate and exact FPJIS work card. This is an **automatic agent work instruction**, not a remote workstation daemon or hidden installer.

**Order:** First run and verify the existing mandatory UI UX Pro Max local bootstrap. Then automatically initiate the applicable approved visual-craft skill pack installation under the host's normal command/permission controls; do not stop at writing suggested commands. If prohibited by sandbox/network permission, report BLOCKED_WITH_EVIDENCE and request only the necessary approval.

### Project-local Python 3 installer (Git required)

From the actual FDG Git checkout:

~~~bash
python tools/visual-craft/bootstrap.py --agents claude,codex --packs taste --check
python tools/visual-craft/bootstrap.py --agents claude,codex --packs taste --apply
~~~

Only on a motion task:

~~~bash
python tools/visual-craft/bootstrap.py --agents claude,codex --packs gsap --apply
python tools/visual-craft/bootstrap.py --agents claude,codex --packs transitions --apply
~~~

For a collaborator explicitly supporting shared Agent Skills:

~~~bash
python tools/visual-craft/bootstrap.py --agents universal --packs taste --apply
~~~

The installer checks out the **exact reviewed Git SHA** from an official upstream repository to a temporary folder. It inspects SKILL.md identity, blocks symlinks, copies only the named skill directories into **project-local** .claude/skills or .agents/skills and stores source pin/license provenance with them. It refuses to overwrite customized pre-existing skill directories and never runs third-party installers or scripts. Each imported upstream license is retained. The copy does not install Node, browsers, GSAP runtime, paid Pro offerings or anything globally.

### Other video resources

**Playwright CLI** (Microsoft, Apache-2.0) is preferred for real browser QA if already available. Its official documented separate setup uses the @playwright/cli package and then playwright-cli install --skills; inspect/pin package and get permission before any local npm/browser setup. Do not run global @latest automatically. If existing browser automation already satisfies QA, reuse it.

**Impeccable** offers critique, polish, audit and harden commands but the upstream installer can register native hooks and download a binary into a user directory. Separate opt-in audit required; never auto-install it.

**Design Extract** can inspect public/authorized website design tokens; only use with explicit site ownership/right to access, with browser networking approved, and without protected design cloning.

**React Bits** is a component registry, not an Agent Skill. Use selected components after dependency, attribution and MIT-plus-Commons-Clause review. No wholesale code vendoring.

**Transitions.dev** free skill is supported; no automatic Pro content purchase, account or mass redistribution.

### Evidence and stop conditions

The installer returns structured SOURCE_SETUP_VERIFIED / SOURCE_SETUP_BLOCKED evidence, **not** a runtime pass. Restart agent if skill discovery requires it. Check actual Node/Chrome dependencies for Taste, GSAP library when needed, local browser QA, keyboard and reduced-motion behavior, mobile + desktop layout, offline/error/loading states and FPIS acceptance. Report unrun tests accurately. If a required skill or browser capability fails, return VISUAL_TOOL_BLOCKED_WITH_EVIDENCE and do not fabricate success or begin unapproved new UI work.

**No tool has access to the founder's workstation in this documentation session. Local installation is pending.**
