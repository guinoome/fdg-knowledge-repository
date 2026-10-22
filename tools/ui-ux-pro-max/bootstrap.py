#!/usr/bin/env python3
"""Project-local, idempotent UI UX Pro Max skill bootstrap for FDG collaborators.

Usage (from FDG repository):
  python tools/ui-ux-pro-max/bootstrap.py --agents claude,codex --apply
  python tools/ui-ux-pro-max/bootstrap.py --agents claude,codex --check

No changes to global settings or deployment, no self-upgrades or --force.
Only the pinned npm CLI package is invoked to generate assistant-native files.
"""

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

PACKAGE = "ui-ux-pro-max-cli@2.15.0"  # change only after explicit review
UPSTREAM = "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
ROOT = Path(__file__).resolve().parents[2]
# Mirrors the reviewed official CLI platform template target roots.
SKILL_ROOTS = {
    "claude": ".claude/skills",
    "codex": ".agents/skills",
    "universal": ".agents/skills",
    "antigravity": ".agents/skills",
    "openclaw": ".agents/skills",
    "cursor": ".cursor/skills",
    "windsurf": ".windsurf/skills",
    "copilot": ".github/skills",
    "gemini": ".gemini/skills",
    "opencode": ".opencode/skills",
    "continue": ".continue/skills",
    "kiro": ".kiro/skills",
    "roocode": ".roo/skills",
    "qoder": ".qoder/skills",
    "trae": ".trae/skills",
    "codebuddy": ".codebuddy/skills",
    "droid": ".factory/skills",
    "kilocode": ".kilocode/skills",
    "warp": ".warp/skills",
    "augment": ".augment/skills",
    "codewhale": ".codewhale/skills",
    "zcode": ".zcode/skills",
    "amazonq": ".amazonq/skills",
}


def execute(args, *, cwd):
    try:
        completed = subprocess.run(args, cwd=str(cwd), text=True, capture_output=True,
                                   check=False, timeout=240)
    except (OSError, subprocess.TimeoutExpired) as error:
        return False, str(error)
    combined = "\n".join(x for x in [completed.stdout, completed.stderr] if x)
    return completed.returncode == 0, combined[-5000:]


def find_skill(root, platform):
    skill_dir = root / SKILL_ROOTS[platform] / "ui-ux-pro-max"
    return skill_dir, skill_dir / "SKILL.md", skill_dir / "scripts" / "search.py"


def verify_skill(root, platform):
    skill_dir, skill, script = find_skill(root, platform)
    if not skill.is_file() or not script.is_file() or not (skill_dir / "data").is_dir():
        return False, "Required SKILL.md/scripts/search.py/data files missing"
    try:
        header = skill.read_text(encoding="utf-8")[:700]
    except (OSError, UnicodeError) as err:
        return False, str(err)
    if "ui-ux-pro-max" not in header:
        return False, "Installed skill identity does not match ui-ux-pro-max"
    ok, output = execute(
        [sys.executable, str(script), "engineering operations maintenance dashboard", "--design-system", "-p", "FDG Verification"],
        cwd=root,
    )
    if not ok or len(output.strip()) < 60 or "Error:" in output[:160]:
        return False, "Design-system smoke test failed: " + output[-800:]
    return True, "Design-system query succeeded; skill, scripts, and data present"


def main(argv=None):
    parser = argparse.ArgumentParser(description="FDG UI UX Pro Max pre-build installation and verification")
    parser.add_argument("--agents", default="claude,codex", help="Comma-separated agent IDs; no 'all'/global installs")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--apply", action="store_true", help="Install missing skills into project scope only")
    mode.add_argument("--check", action="store_true", help="Read-only verify existing installed skills")
    parser.add_argument("--root", type=Path, default=ROOT, help="FDG git checkout root")
    args = parser.parse_args(argv)
    root = args.root.expanduser().resolve()
    if not (root / "AGENTS.md").is_file() or not (root / "CLAUDE.md").is_file():
        parser.error("--root must point to an FDG checkout with AGENTS.md and CLAUDE.md")
    requested = [x.strip().lower() for x in args.agents.split(",") if x.strip()]
    if not requested or any(x not in SKILL_ROOTS for x in requested):
        parser.error("Only supported named agent platforms allowed: " + ", ".join(SKILL_ROOTS))

    results = []
    seen_dirs = {}
    npm = shutil.which("npm.cmd" if sys.platform == "win32" else "npm")
    for platform in requested:
        location = SKILL_ROOTS[platform]
        skill_dir, skill, script = find_skill(root, platform)
        if location in seen_dirs:
            results.append({"agent": platform, "status": "SHARED_SKILL_LOCATION",
                            "path": str(skill_dir.relative_to(root)), "with": seen_dirs[location]})
            continue
        seen_dirs[location] = platform
        pass_now, note = verify_skill(root, platform)
        if pass_now:
            results.append({"agent": platform, "status": "VERIFIED_ALREADY_INSTALLED",
                            "path": str(skill_dir.relative_to(root)), "details": note})
            continue
        # Fail closed on partial preexisting installations: never auto-overwrite.
        if skill_dir.exists():
            results.append({"agent": platform, "status": "BLOCKED_EXISTING_BROKEN_SKILL",
                            "path": str(skill_dir.relative_to(root)), "details": note})
            continue
        if args.check:
            results.append({"agent": platform, "status": "MISSING", "path": str(skill_dir.relative_to(root))})
            continue
        if not npm:
            results.append({"agent": platform, "status": "BLOCKED_NPM_UNAVAILABLE",
                            "details": "Install Node/npm manually; no automated system dependency installation"})
            continue
        # Verify package registry identity before allowing installer execution.
        meta_ok, meta_text = execute([npm, "view", PACKAGE, "version", "license", "--json"], cwd=root)
        if not meta_ok:
            results.append({"agent": platform, "status": "BLOCKED_PACKAGE_METADATA",
                            "details": meta_text[-900:]})
            continue
        try:
            meta = json.loads(meta_text)
        except (TypeError, ValueError):
            meta = {}
        if not isinstance(meta, dict) or meta.get("version") != "2.15.0" or meta.get("license") != "MIT":
            results.append({"agent": platform, "status": "BLOCKED_PACKAGE_IDENTITY_MISMATCH",
                            "details": str(meta)[:600]})
            continue
        # npm-exec downloads only the pinned project installer to npm cache.
        base = [npm, "exec", "--yes", f"--package={PACKAGE}", "--", "uipro", "init", "--ai", platform]
        preview_ok, preview_log = execute(base + ["--dry-run"], cwd=root)
        if not preview_ok:
            results.append({"agent": platform, "status": "BLOCKED_PREVIEW_FAILED",
                            "details": preview_log[-900:]})
            continue
        # Reviewed upstream CLI omits --force by default and preserves existing skill data.
        installed, install_log = execute(base, cwd=root)
        if not installed:
            results.append({"agent": platform, "status": "BLOCKED_INSTALL_FAILED",
                            "details": install_log[-900:]})
            continue
        valid, evidence = verify_skill(root, platform)
        results.append({"agent": platform,
                        "status": "INSTALLED_AND_VERIFIED" if valid else "BLOCKED_POSTINSTALL_VERIFICATION",
                        "path": str(skill_dir.relative_to(root)), "details": evidence})

    passed = {"VERIFIED_ALREADY_INSTALLED", "INSTALLED_AND_VERIFIED", "SHARED_SKILL_LOCATION"}
    good = all(x["status"] in passed for x in results)
    output = {"result": "UX_P0_VERIFIED" if good else "UX_P0_BLOCKED_WITH_EVIDENCE",
              "mode": "apply" if args.apply else "check",
              "source": UPSTREAM, "pinned_installer": PACKAGE,
              "repo": str(root), "agents": results,
              "note": "Agent discovery may require restarting each coding assistant. Never treat this as UI acceptance."}
    print(json.dumps(output, indent=2, ensure_ascii=False))
    return 0 if good else 2


if __name__ == "__main__":
    raise SystemExit(main())
