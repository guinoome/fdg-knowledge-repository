#!/usr/bin/env python3
"""Install reviewed visual Agent Skills from pinned Git commits, project-local only."""
import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEST = {"claude": ".claude/skills", "codex": ".agents/skills", "universal": ".agents/skills"}
PACKS = {
    "taste": ("Leonxlnx/taste-skill", "6010f91a9935f1c167dfc500fb1a475681892e6b", [("skills/taste-skill", "design-taste-frontend")]),
    "gsap": ("greensock/gsap-skills", "aed9cfd3277740755f6bfc1155c7aa645403b760", [("skills/" + n, n) for n in ("gsap-core", "gsap-timeline", "gsap-scrolltrigger", "gsap-plugins", "gsap-utils", "gsap-react", "gsap-performance", "gsap-frameworks")]),
    "transitions": ("Jakubantalik/transitions.dev", "b0bad881753eceb656478d66ceb0ba2b643772ce", [("skills/transitions-dev", "transitions-dev")]),
}


def run_git(repo, sha, cwd):
    commands = [
        ["git", "init", "-q"],
        ["git", "remote", "add", "origin", "https://github.com/" + repo + ".git"],
        ["git", "fetch", "--depth=1", "origin", sha],
        ["git", "checkout", "--detach", "-q", "FETCH_HEAD"],
        ["git", "rev-parse", "HEAD"],
    ]
    for cmd in commands:
        r = subprocess.run(cmd, cwd=str(cwd), capture_output=True, text=True, timeout=180)
        if r.returncode:
            raise RuntimeError("Git fetch failed: " + r.stderr[-500:])
    if r.stdout.strip() != sha:
        raise RuntimeError("Upstream checkout SHA mismatch")


def verify(path, name, sha=None):
    skill = path / "SKILL.md"
    if not skill.is_file():
        return False
    data = skill.read_text("utf-8", errors="replace")
    if not data.startswith("---") or "name: " + name not in data.split("---", 2)[1]:
        return False
    if sha is not None:
        receipt = path / "FDG_SOURCE.json"
        try:
            j = json.loads(receipt.read_text("utf-8"))
            return j.get("sha") == sha and j.get("name") == name and j.get("skill_sha256") == hashlib.sha256(skill.read_bytes()).hexdigest()
        except (OSError, ValueError):
            return False
    return True


def safe_tree(path):
    for item in path.rglob("*"):
        if item.is_symlink() or not (item.is_dir() or item.is_file()):
            raise RuntimeError("Unsupported symlink or special file: " + str(item))


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", type=Path, default=ROOT)
    ap.add_argument("--agents", default="claude,codex")
    ap.add_argument("--packs", default="taste")
    mode = ap.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--apply", action="store_true")
    a = ap.parse_args(argv)
    root = a.root.resolve()
    if not (root / "CLAUDE.md").is_file() or not (root / "AGENTS.md").is_file():
        ap.error("Must be an FDG repository checkout")
    agents = list(dict.fromkeys(x.strip() for x in a.agents.split(",") if x.strip()))
    packs = list(dict.fromkeys(x.strip() for x in a.packs.split(",") if x.strip()))
    if not agents or any(x not in DEST for x in agents):
        ap.error("Supported agents: " + ", ".join(DEST))
    if not packs or any(x not in PACKS for x in packs):
        ap.error("Supported packs: " + ", ".join(PACKS))
    results = []
    ok_all = True
    with tempfile.TemporaryDirectory(prefix="fdg-visual-") as tmp:
        fetched = {}
        for pack in packs:
            repo, sha, entries = PACKS[pack]
            for agent in agents:
                for rel, name in entries:
                    dst = root / DEST[agent] / name
                    if dst.exists() or dst.is_symlink():
                        good = verify(dst, name, sha)
                        status = "VERIFIED_EXISTING" if good else "BLOCKED_EXISTING_UNVERIFIED"
                    elif a.check:
                        good, status = False, "MISSING"
                    elif not shutil.which("git"):
                        good, status = False, "BLOCKED_GIT_MISSING"
                    else:
                        created = False
                        try:
                            if pack not in fetched:
                                stage = Path(tmp) / pack
                                stage.mkdir()
                                run_git(repo, sha, stage)
                                fetched[pack] = stage
                            src = fetched[pack] / rel
                            if not verify(src, name):
                                raise RuntimeError("Source SKILL.md identity missing")
                            safe_tree(src)
                            dst.parent.mkdir(parents=True, exist_ok=True)
                            shutil.copytree(src, dst)
                            created = True
                            upstream_license = fetched[pack] / "LICENSE"
                            if upstream_license.is_file():
                                shutil.copy2(upstream_license, dst / "FDG_UPSTREAM_LICENSE.txt")
                            receipt = {"repo": repo, "sha": sha, "name": name, "skill_sha256": hashlib.sha256((dst / "SKILL.md").read_bytes()).hexdigest()}
                            (dst / "FDG_SOURCE.json").write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
                            good = verify(dst, name, sha)
                            status = "INSTALLED_SOURCE_VERIFIED" if good else "BLOCKED_VERIFY_FAILED"
                        except (OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
                            good, status = False, "BLOCKED_INSTALL: " + str(exc)[-250:]
                            if created:
                                shutil.rmtree(dst, ignore_errors=True)
                    if not good:
                        ok_all = False
                    results.append({"pack": pack, "agent": agent, "skill": name, "status": status, "path": str(dst.relative_to(root))})
    print(json.dumps({"status": "SOURCE_SETUP_VERIFIED" if ok_all else "SOURCE_SETUP_BLOCKED", "mode": "check" if a.check else "apply", "items": results, "runtime": "NOT_TESTED"}, indent=2))
    return 0 if ok_all else 2


if __name__ == "__main__":
    sys.exit(main())
