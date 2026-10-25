#!/usr/bin/env python3
"""Opt-in PR guard: block changes to a scoped code area if its BASE-approved sources are unresolved.

This guard does not authenticate approvals; repository reviewers/branch rules own that boundary.
An opted-in manifest becomes authoritative only AFTER it is merged into the PR base.
"""
import argparse
import json
from pathlib import PurePosixPath
import re
import subprocess
import sys

from fpjis_source_gate import ENFORCED, SHA, safe_path, validate


def git_bytes(repo, *args):
    proc = subprocess.run(["git", "-C", str(repo), *args], capture_output=True, check=False)
    if proc.returncode:
        raise RuntimeError(proc.stderr.decode("utf-8", "replace").strip() or "git command failed")
    return proc.stdout


def rev_check(repo, sha):
    if not SHA.fullmatch(sha or ""):
        return False
    try:
        return git_bytes(repo, "cat-file", "-t", sha).strip() == b"commit"
    except RuntimeError:
        return False


def object_at(repo, sha, path):
    try:
        return git_bytes(repo, "show", f"{sha}:{path}")
    except RuntimeError:
        return None


def repo_paths(repo, sha):
    return [x.decode("utf-8", "surrogateescape") for x in
            git_bytes(repo, "ls-tree", "-r", "--name-only", "-z", sha).split(b"\\0") if x]


def diff_paths(repo, base, head):
    # --no-renames includes both the old and new path for moves out of a guarded directory.
    return [x.decode("utf-8", "surrogateescape") for x in
            git_bytes(repo, "diff", "--name-only", "--no-renames", "-z", base, head).split(b"\\0") if x]


def is_in_scope(path, prefixes):
    return any(path == scope or path.startswith(scope + "/") for scope in prefixes)


def preflight(repo, base, head):
    """Result: (errors, checked manifest paths). No baseline manifest => no new blanket gate."""
    if not rev_check(repo, base) or not rev_check(repo, head):
        return ["invalid_pr_commit"], []
    changed = diff_paths(repo, base, head)
    baseline_manifests = [p for p in repo_paths(repo, base)
                          if p.startswith("Projects/Active/") and p.endswith("/fdg-fpjis-gate.json")]
    checked = []
    errors = []
    for manifest_path in baseline_manifests:
        raw = object_at(repo, base, manifest_path)
        try:
            data = json.loads(raw)
            if not isinstance(data, dict):
                raise ValueError("not an object")
        except (TypeError, ValueError):
            errors.append(f"{manifest_path}: invalid_base_manifest")
            continue
        prefixes = data.get("affected_paths", [])
        if not isinstance(prefixes, list) or not prefixes or any(
            not isinstance(p, str) or not safe_path(p.rstrip("/")) or not p.strip("/")
            for p in prefixes
        ):
            # No affected path configured = a report-only marker; never claim protected.
            # Fail if an explicitly populated but malformed scope could silently disable a gate.
            if prefixes:
                errors.append(f"{manifest_path}: invalid_scope")
            continue
        normalized = [p.rstrip("/") for p in prefixes]
        relevant = [p for p in changed if is_in_scope(p, normalized)]
        if not relevant:
            continue
        checked.append(manifest_path)
        head_raw = object_at(repo, head, manifest_path)
        if head_raw is None:
            errors.append(f"{manifest_path}: guard_manifest_deleted")
            continue
        if data.get("state") not in ENFORCED:
            errors.append(f"{manifest_path}: source_authority_unresolved_in_base")
            continue
        # Use BASE manifest only. A PR cannot self-approve its own changes by editing status.
        for err in validate(data, repo, base, head):
            errors.append(f"{manifest_path}: {err}")
        try:
            head_data = json.loads(head_raw)
            if not isinstance(head_data, dict):
                raise ValueError("not an object")
        except (TypeError, ValueError):
            errors.append(f"{manifest_path}: invalid_head_manifest")
            continue
        for key in ("work_package_id", "source_revision", "source_path", "decision_path",
                    "requirement_path", "approval_path", "approval_status", "acceptance_ids",
                    "affected_paths", "state"):
            if head_data.get(key) != data.get(key):
                errors.append(f"{manifest_path}: policy_changed_with_protected_code_{key}")
    return errors, checked


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".")
    parser.add_argument("--base", required=True)
    parser.add_argument("--head", required=True)
    args = parser.parse_args(argv)
    try:
        errors, checked = preflight(args.repo, args.base, args.head)
    except (RuntimeError, OSError) as exc:
        print("FPJIS_PR_GATE FAIL: execution_error:", exc)
        return 2
    for manifest in checked:
        print("FPJIS_PR_GATE scoped:", manifest)
    if errors:
        for err in errors:
            print("FPJIS_PR_GATE BLOCK:", err)
        return 1
    print("FPJIS_PR_GATE PASS: no unresolved approved-baseline conflicts in affected opted-in paths.")
    print("Structural only: does not authenticate humans or establish FMIS engineering acceptance.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
