# FDG huashu-motion collaborator installation and film production handover

Trigger: **only** a founder-authorized cinematic product launch film, marketing video, animated MEP explainer or product demonstration. Not triggered for routine app coding. See FPIS-CREATIVE-0009 in the FPIS Experience Design folder.

Official pinned reference: https://github.com/alchaincyf/huashu-motion at SHA 52467f99c602b76ba86d511d37acdfe93fa1e16e, version 0.3.1. Requires Node >=22, installed Chrome/Chromium/Edge and FFmpeg. Upstream README reported macOS testing; Windows/Linux/permission compatibility require local proof.

### Agent should initiate setup when the task needs it

1. Read the existing CLAUDE.md or AGENTS.md and approved project/creative brief, inventory current host OS/tool permissions, asset rights and model costs. Verify no live/secret client data in media inputs.
2. Check read-only, from FDG root: python tools/creative-studio/huashu_motion_bootstrap.py --agents claude,codex --check
3. If missing, agent may initiate the founder-requested **project-local** approved installation: python tools/creative-studio/huashu_motion_bootstrap.py --agents claude,codex --apply. Use a single agent target for single runtime. Respect local tool permission/network prompts. Do not use sudo/global npm or unapproved updates. Windows symlink privileges may block; report exactly.
4. Script fetches the **entire pinned upstream checkout** into ignored .fdg-tools/huashu-motion and links the actual native skill to .claude/skills/huashu-motion or .agents/skills/huashu-motion; it does not execute external installers, system package managers, browsers, npm or scripts. It refuses existing source/skill conflicts and prints a JSON evidence receipt.
5. Execute tools ONLY when runtime permissions/compatibility checked. Use the adjacent pinned Node CLI explicitly: node .fdg-tools/huashu-motion/cli/om.js doctor. Avoid the skill's npx fallback. Separately run an authorized synthetic no-character pilot through new → studio → check → render → qa; record real logs and inspect actual exported film.
6. Confirm full source, license/THIRD_PARTY notices, Node >=22, browser launch, FFmpeg availability, editor loopback-only, material/sound rights, and any optional file/network download before approving output. If a tool cannot run, return HUASHU_MOTION_BLOCKED_WITH_EVIDENCE.
7. Founder/engineer/creative reviewer approves the actual finished film; FWAIS/FBIS controls marketing release and separate publication. Never assume a successful code generation, screenshot or creator demo equals a finished film.

### Explicit exclusions

No auto-install of browser, FFmpeg, audio sample packs (large optional download), optional neural speech models (separate large download), cloud APIs, premium subscriptions, unreviewed global npm packages, or third-party mascot character. Never point automatic website/material gathering at private FDG or customer accounts, facility operations interfaces or licensed materials without scoped permission.

The GitHub handover does not install on the founder's own PC until a capable local agent opens the checkout and executes approved commands. Source link proof ≠ runnable rendering proof.
