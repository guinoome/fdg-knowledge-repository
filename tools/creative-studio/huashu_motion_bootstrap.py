#!/usr/bin/env python3
"""Pinned source and native Agent Skill links for huashu-motion; no upstream code executed."""
import argparse
import json
import os
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SHA = "52467f99c602b76ba86d511d37acdfe93fa1e16e"
URL = "https://github.com/alchaincyf/huashu-motion.git"
DEST = {"claude": ".claude/skills/huashu-motion",
        "codex": ".agents/skills/huashu-motion",
        "universal": ".agents/skills/huashu-motion"}


def run_git(args, cwd):
    return subprocess.run(["git"] + args, cwd=str(cwd), capture_output=True,
                          text=True, check=False, timeout=180)


def valid_source(src):
    try:
        if not all((src / p).is_file() for p in
                   ("skills/huashu-motion/SKILL.md", "cli/om.js", "THIRD_PARTY.md", "LICENSE")):
            return False
        skill = (src / "skills/huashu-motion/SKILL.md").read_text(encoding="utf-8")
        result = run_git(["rev-parse", "HEAD"], src)
        return (skill.startswith("---\nname: huashu-motion")
                and result.returncode == 0 and result.stdout.strip() == SHA)
    except (OSError, subprocess.TimeoutExpired):
        return False


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--root", type=Path, default=ROOT)
    p.add_argument("--agents", default="claude,codex")
    mode = p.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    a = p.parse_args()
    root = a.root.resolve()
    if not (root / "AGENTS.md").is_file() or not (root / "CLAUDE.md").is_file():
        p.error("Not an FDG knowledge checkout")
    agents = list(dict.fromkeys(s.strip() for s in a.agents.split(",") if s.strip()))
    if not agents or any(s not in DEST for s in agents):
        p.error("Unsupported agent: allowed claude,codex,universal")
    src = root / ".fdg-tools/huashu-motion"
    out = []
    ready = valid_source(src)

    if a.apply and not ready:
        if src.exists() or src.is_symlink() or shutil.which("git") is None:
            out.append({"source": "BLOCKED_EXISTING_UNVERIFIED_OR_GIT_MISSING"})
        else:
            src.parent.mkdir(parents=True, exist_ok=True)
            stage = Path(tempfile.mkdtemp(prefix="huashu-stage-", dir=str(src.parent)))
            try:
                for cmd in (["init", "-q"], ["remote", "add", "origin", URL],
                            ["fetch", "--depth=1", "origin", SHA],
                            ["checkout", "--detach", "-q", "FETCH_HEAD"]):
                    result = run_git(cmd, stage)
                    if result.returncode:
                        raise RuntimeError(result.stderr[-350:])
                if not valid_source(stage):
                    raise RuntimeError("Source SHA or layout mismatch")
                stage.rename(src)
                ready = True
            except (OSError, RuntimeError, subprocess.TimeoutExpired) as e:
                out.append({"source": "BLOCKED_FETCH_OR_VERIFY", "detail": str(e)[-400:]})
            finally:
                if stage.exists():
                    shutil.rmtree(stage, ignore_errors=True)
    if not ready:
        out.append({"source": "SOURCE_MISSING_OR_UNVERIFIED"})
    failed = not ready
    for agent in agents:
        location = root / DEST[agent]
        expected = src / "skills/huashu-motion"
        if location.is_symlink() and ready and location.resolve() == expected.resolve():
            state = "SOURCE_LINK_VERIFIED"
        elif location.exists() or location.is_symlink():
            state = "BLOCKED_EXISTING_SKILL"
            failed = True
        elif not a.apply or not ready:
            state = "MISSING"
            failed = True
        else:
            try:
                location.parent.mkdir(parents=True, exist_ok=True)
                location.symlink_to(Path(os.path.relpath(expected, location.parent)),
                                    target_is_directory=True)
                if location.resolve() != expected.resolve():
                    raise OSError("Link points to unexpected target")
                state = "SOURCE_LINK_CREATED"
            except OSError as e:
                if location.is_symlink():
                    location.unlink()
                state = "BLOCKED_SYMLINK: " + str(e)[-180:]
                failed = True
        out.append({"agent": agent, "status": state, "path": DEST[agent]})
    print(json.dumps({"result": "HUASHU_MOTION_BLOCKED_WITH_EVIDENCE" if failed
                      else "HUASHU_MOTION_SOURCE_READY",
                      "source_sha": SHA, "mode": "apply" if a.apply else "check",
                      "runtime": "NOT_TESTED", "items": out}, indent=2))
    return 2 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
