#!/usr/bin/env python3
"""Opt-in source-to-build traceability preflight. Does not certify engineering approval."""
import argparse
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
import sys

ALLOWED = {"SOURCE_UNREVIEWED", "BRANCH_ONLY", "NEEDS_REVIEW", "BUILD_AUTHORIZED",
           "IMPLEMENTED", "TESTED_ON_EXACT_BUILD", "FUNCTIONALLY_ACCEPTED_BOUNDED"}
ENFORCED = {"BUILD_AUTHORIZED", "IMPLEMENTED", "TESTED_ON_EXACT_BUILD", "FUNCTIONALLY_ACCEPTED_BOUNDED"}
SHA = re.compile(r"^[a-f0-9]{40}$")


def git(root, *args):
    result = subprocess.run(["git", "-C", str(root), *args], capture_output=True, text=True, check=False)
    return result.stdout.strip() if result.returncode == 0 else None


def safe_path(value):
    if not isinstance(value, str) or not value or "\\" in value or "\x00" in value:
        return None
    path = PurePosixPath(value)
    if path.is_absolute() or any(part in {"..", ".", ""} for part in value.split("/")):
        return None
    return str(path)


def file_at(root, revision, path):
    return git(root, "rev-parse", "--verify", f"{revision}:{path}")


def validate(data, root, base_sha, head_sha):
    """Return issues; treat approval references as *structural* not authenticated sign-off."""
    errors = []
    if not isinstance(data, dict):
        return ["manifest_not_object"]
    state = data.get("state")
    if state not in ALLOWED:
        return ["invalid_state"]
    if state not in ENFORCED:
        return []  # an opt-in draft must not block unrelated or accepted work
    if not SHA.fullmatch(base_sha or "") or not git(root, "cat-file", "-t", base_sha) == "commit":
        return ["base_commit_unavailable"]
    if not SHA.fullmatch(head_sha or "") or not git(root, "cat-file", "-t", head_sha) == "commit":
        return ["head_commit_unavailable"]
    if not isinstance(data.get("work_package_id"), str) or not data["work_package_id"].strip():
        errors.append("missing_work_package_id")
    if not isinstance(data.get("acceptance_ids"), list) or not data["acceptance_ids"] or not all(isinstance(x, str) and x.strip() for x in data["acceptance_ids"]):
        errors.append("missing_acceptance_ids")
    original_sha = data.get("source_revision")
    if not isinstance(original_sha, str) or not SHA.fullmatch(original_sha) or git(root, "cat-file", "-t", original_sha) != "commit":
        errors.append("invalid_source_revision")
    for key in ["source_path", "decision_path", "requirement_path", "approval_path"]:
        path = safe_path(data.get(key))
        if path is None:
            errors.append(f"invalid_{key}")
            continue
        base_blob = file_at(root, base_sha, path)
        if base_blob is None:
            errors.append(f"{key}_not_on_main")
        if original_sha and SHA.fullmatch(original_sha) and base_blob is not None:
            if file_at(root, original_sha, path) != base_blob:
                errors.append(f"{key}_stale_revision")
    if data.get("approval_status") != "APPROVED":
        errors.append("approval_status_unconfirmed")
    if state in {"IMPLEMENTED", "TESTED_ON_EXACT_BUILD", "FUNCTIONALLY_ACCEPTED_BOUNDED"}:
        refs = data.get("implementation_refs")
        if not isinstance(refs, list) or not refs:
            errors.append("implementation_refs_missing")
        else:
            for ref in refs:
                path = safe_path(ref)
                if path is None or file_at(root, head_sha, path) is None:
                    errors.append("implementation_ref_missing_at_head")
    if state in {"TESTED_ON_EXACT_BUILD", "FUNCTIONALLY_ACCEPTED_BOUNDED"}:
        if data.get("tested_commit") != head_sha:
            errors.append("test_not_on_exact_head")
        if data.get("test_result") != "PASS":
            errors.append("no_passing_test_result")
        for key in ["test_ref", "test_evidence_ref"]:
            path = safe_path(data.get(key))
            if path is None or file_at(root, head_sha, path) is None:
                errors.append(f"{key}_unavailable")
    if state == "FUNCTIONALLY_ACCEPTED_BOUNDED":
        if not isinstance(data.get("acceptance_owner"), str) or not data["acceptance_owner"].strip():
            errors.append("acceptance_owner_missing")
        path = safe_path(data.get("acceptance_ref"))
        if path is None or file_at(root, head_sha, path) is None:
            errors.append("human_acceptance_ref_missing")
        if data.get("acceptance_commit") != head_sha:
            errors.append("acceptance_not_on_exact_head")
    return errors


def main(argv=None):
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("manifest", type=Path)
    p.add_argument("--repo", type=Path, default=Path("."))
    p.add_argument("--base", required=True, help="real GitHub PR base commit SHA")
    p.add_argument("--head", required=True, help="real GitHub PR head commit SHA")
    args = p.parse_args(argv)
    try:
        data = json.loads(args.manifest.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        print("FPJIS_GATE FAIL: unreadable_manifest", str(e), file=sys.stderr)
        return 2
    errors = validate(data, args.repo, args.base, args.head)
    if errors:
        for reason in errors:
            print("FPJIS_GATE FAIL:", reason)
        return 1
    print("FPJIS_GATE STRUCTURAL_PASS:", data.get("state"), "(not an authenticated approval or a functional test)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
