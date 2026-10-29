"""Synthetic Git fixture tests for the opt-in source-to-build PR guard."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from fpjis_pr_preflight import preflight

MANIFEST = "Projects/Active/FBPOIS/fdg-fpjis-gate.json"
CODE = "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/fmis/services.py"
SCOPE = "16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/"


class PRPreflightTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.repo = Path(self.temp.name)
        self.git("init", "-q", str(self.repo), in_repo=False)
        self.git("config", "user.name", "Fixture Worker")
        self.git("config", "user.email", "test@example.invalid")
        for p in ["source.md", "decision.md", "requirement.md", "approval.md", CODE, "README.md"]:
            self.write(p, "Original " + p + "\n")
        self.git("add", ".")
        self.git("commit", "-qm", "first base")
        source_rev = self.rev()
        self.manifest = {
            "state": "NEEDS_REVIEW",
            "work_package_id": "FMIS-AUTH-DECISION-01",
            "acceptance_ids": ["FMIS-WO-AUTH-01"],
            "source_revision": source_rev,
            "source_path": "source.md",
            "decision_path": "decision.md",
            "requirement_path": "requirement.md",
            "approval_path": "approval.md",
            "approval_status": "NEEDS_REVIEW",
            "affected_paths": [SCOPE],
        }
        self.write(MANIFEST, json.dumps(self.manifest))
        self.git("add", ".")
        self.git("commit", "-qm", "opt in pending authority")
        self.base = self.rev()

    def tearDown(self):
        self.temp.cleanup()

    def git(self, *args, in_repo=True):
        cmd = ["git"] + (["-C", str(self.repo)] if in_repo else []) + list(args)
        return subprocess.check_output(cmd, text=True).strip()

    def rev(self):
        return self.git("rev-parse", "HEAD")

    def write(self, p, content):
        path = self.repo / p
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

    def commit_change(self, p, content):
        self.write(p, content)
        self.git("add", "-A")
        self.git("commit", "-qm", "code change")

    def errors(self):
        return preflight(self.repo, self.base, self.rev())

    def test_unresolved_fmis_code_blocked(self):
        self.commit_change(CODE, "critical change")
        errors, checked = self.errors()
        self.assertIn("source_authority_unresolved_in_base", "|".join(errors))
        self.assertEqual(checked, [MANIFEST])

    def test_fmis_docs_only_not_blocked(self):
        self.commit_change("README.md", "new overview")
        self.assertEqual(self.errors(), ([], []))

    def test_unrelated_project_unchanged(self):
        self.commit_change("Projects/Active/Solar/solar.py", "unrelated")
        self.assertEqual(self.errors(), ([], []))

    def test_pr_cannot_self_authorize(self):
        self.manifest["state"] = "BUILD_AUTHORIZED"
        self.manifest["approval_status"] = "APPROVED"
        self.write(MANIFEST, json.dumps(self.manifest))
        self.commit_change(CODE, "attempted self-authorization")
        self.assertIn("source_authority_unresolved_in_base", "|".join(self.errors()[0]))

    def test_delete_baseline_guard_blocked(self):
        (self.repo / MANIFEST).unlink()
        self.commit_change(CODE, "unguarded")
        self.assertIn("guard_manifest_deleted", "|".join(self.errors()[0]))

    def test_renaming_code_out_of_scope_still_blocked(self):
        self.git("mv", CODE, "README_moved.py")
        self.git("commit", "-qm", "move code outside protected directory")
        self.assertIn("source_authority_unresolved_in_base", "|".join(self.errors()[0]))

    def test_approved_scope_passes_if_structurally_valid(self):
        self.manifest["state"] = "BUILD_AUTHORIZED"
        self.manifest["approval_status"] = "APPROVED"
        self.write(MANIFEST, json.dumps(self.manifest))
        self.git("add", ".")
        self.git("commit", "-qm", "preapprove in separate baseline")
        self.base = self.rev()
        self.commit_change(CODE, "scoped authorized change")
        self.assertEqual(self.errors(), ([], [MANIFEST]))

    def test_approved_scope_missing_proof_fails(self):
        self.manifest["state"] = "BUILD_AUTHORIZED"
        self.manifest["approval_status"] = "APPROVED"
        self.manifest["approval_path"] = "branch_only_approval.md"
        self.write(MANIFEST, json.dumps(self.manifest))
        self.git("add", ".")
        self.git("commit", "-qm", "preapproval has missing source")
        self.base = self.rev()
        self.commit_change(CODE, "attempted build")
        self.assertIn("approval_path_not_on_main", "|".join(self.errors()[0]))

    def test_approved_scope_cannot_change_policy_in_code_pr(self):
        self.manifest["state"] = "BUILD_AUTHORIZED"
        self.manifest["approval_status"] = "APPROVED"
        self.write(MANIFEST, json.dumps(self.manifest))
        self.git("add", ".")
        self.git("commit", "-qm", "authorized baseline")
        self.base = self.rev()
        self.manifest["affected_paths"] = ["Projects/Unrelated/"]
        self.write(MANIFEST, json.dumps(self.manifest))
        self.commit_change(CODE, "code and policy change")
        self.assertIn("policy_changed_with_protected_code_affected_paths", "|".join(self.errors()[0]))

    def test_no_opted_in_base_never_blocks_other_projects(self):
        # The initial opt-in PR itself is a bootstrap and must not be mistaken
        # for an already-authorized baseline. Earlier base has no manifest.
        first = self.git("rev-parse", self.base + "^")
        self.base = first
        self.commit_change(CODE, "initial opt-in in same PR")
        self.assertEqual(self.errors(), ([], []))

    def test_manifest_only_scope_removal_is_blocked(self):
        self.manifest["affected_paths"] = []
        self.commit_change(MANIFEST, json.dumps(self.manifest))
        self.assertIn("guard_scope_change_requires_review", "|".join(self.errors()[0]))

    def test_manifest_only_promotion_missing_authority_is_blocked(self):
        self.manifest["state"] = "BUILD_AUTHORIZED"
        self.manifest["approval_status"] = "APPROVED"
        self.manifest["approval_path"] = "not_on_main.md"
        self.commit_change(MANIFEST, json.dumps(self.manifest))
        self.assertIn("proposed_authorization_approval_path_not_on_main", "|".join(self.errors()[0]))

    def test_manifest_only_deletion_is_blocked(self):
        (self.repo / MANIFEST).unlink()
        self.git("add", "-A")
        self.git("commit", "-qm", "delete only policy")
        self.assertIn("guard_manifest_deleted", "|".join(self.errors()[0]))

    def test_invalid_sha_fails(self):
        self.commit_change("README.md", "new overview")
        errs, _ = preflight(self.repo, "unknown", self.rev())
        self.assertEqual(errs, ["invalid_pr_commit"])


if __name__ == "__main__":
    unittest.main()
