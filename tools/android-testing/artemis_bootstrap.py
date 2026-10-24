#!/usr/bin/env python3
"""Stage pinned ARTEMIS official source for FDG Android QA. No execution of ARTEMIS or device actions."""
import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
UPSTREAM = "https://github.com/google/artemis.git"
PIN = "351ca8422f7b5b54e80a9c1ce03a222e02415b6b"
REQUIRED = ("README.md", "LICENSE", "pyproject.toml", "uv.lock", "mcp_server/server.py")


def cmd(args, cwd):
    return subprocess.run(args, cwd=str(cwd), text=True, capture_output=True,
                          check=False, timeout=180)


def verified(root):
    if not root.is_dir() or any(not (root / f).is_file() for f in REQUIRED):
        return False
    try:
        r = cmd(["git", "rev-parse", "HEAD"], root)
    except (OSError, subprocess.TimeoutExpired):
        return False
    return r.returncode == 0 and r.stdout.strip() == PIN


def main(argv=None):
    p = argparse.ArgumentParser(description="FDG ARTEMIS pinned Android test source staging")
    mode = p.add_mutually_exclusive_group(required=True)
    mode.add_argument("--check", action="store_true", help="Read only")
    mode.add_argument("--apply", action="store_true", help="Fetch into ignored project-local folder")
    p.add_argument("--root", type=Path, default=ROOT)
    a = p.parse_args(argv)
    root = a.root.expanduser().resolve()
    if not (root / "CLAUDE.md").is_file() or not (root / "AGENTS.md").is_file():
        p.error("--root must be FDG knowledge repository checkout")
    dest = root / ".fdg-tools" / "artemis"
    status = "SOURCE_STAGED_RUNTIME_PENDING" if verified(dest) else "SOURCE_MISSING"
    note = "No dependencies installed, no MCP config, ADB connection or phone action"
    if status == "SOURCE_MISSING" and a.apply:
        if dest.exists() or dest.is_symlink():
            status, note = "ARTEMIS_QA_BLOCKED_WITH_EVIDENCE", "Preexisting unverified directory; refuse overwrite"
        elif not shutil.which("git"):
            status, note = "ARTEMIS_QA_BLOCKED_WITH_EVIDENCE", "Git is required"
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            stage = Path(tempfile.mkdtemp(prefix="artemis-stage-", dir=str(dest.parent)))
            try:
                for args in (["git", "init", "-q"],
                             ["git", "remote", "add", "origin", UPSTREAM],
                             ["git", "fetch", "--depth=1", "origin", PIN],
                             ["git", "checkout", "-q", "--detach", "FETCH_HEAD"]):
                    result = cmd(args, stage)
                    if result.returncode:
                        raise RuntimeError("Git source staging failed: " + result.stderr[-500:])
                if not verified(stage):
                    raise RuntimeError("Pinned source checkout or required files mismatch")
                stage.rename(dest)
                status = "SOURCE_STAGED_RUNTIME_PENDING"
                note = "Pinned upstream staged. Runtime, MCP and device still NOT_TESTED."
            except (OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
                status = "ARTEMIS_QA_BLOCKED_WITH_EVIDENCE"
                note = str(exc)[-500:]
            finally:
                if stage.exists():
                    shutil.rmtree(stage, ignore_errors=True)
    data = {"state": status, "mode": "apply" if a.apply else "check",
            "source": UPSTREAM, "verified_commit": PIN if verified(dest) else None,
            "local_directory": str(dest.relative_to(root)),
            "mcp": "NOT_CONFIGURED", "device": "NOT_CONNECTED",
            "runtime": "NOT_TESTED", "note": note}
    print(json.dumps(data, indent=2))
    return 0 if status == "SOURCE_STAGED_RUNTIME_PENDING" else 2


if __name__ == "__main__":
    raise SystemExit(main())
