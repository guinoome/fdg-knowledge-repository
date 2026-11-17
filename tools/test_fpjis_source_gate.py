"""Executable synthetic positive/negative fixtures for opt-in gate, no outside data."""
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parent))
from fpjis_source_gate import validate


class GateTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        subprocess.run(["git", "init", "-q", str(self.root)], check=True)
        for key, val in [("user.name", "Synthetic Test"), ("user.email", "synthetic@example.invalid")]:
            subprocess.run(["git", "-C", str(self.root), "config", key, val], check=True)
        for file in ("source.md", "decision.md", "requirement.md", "approval.md", "app.py", "tests.py", "test_log.txt", "acceptance.md"):
            (self.root / file).write_text("Synthetic reference for " + file)
        subprocess.run(["git", "-C", str(self.root), "add", "."], check=True)
        subprocess.run(["git", "-C", str(self.root), "commit", "-qm", "approved synthetic baseline"], check=True)
        self.base = subprocess.check_output(["git", "-C", str(self.root), "rev-parse", "HEAD"], text=True).strip()
        self.data = dict(state="BUILD_AUTHORIZED", work_package_id="SYN-01", acceptance_ids=["AC-01"],
                         source_revision=self.base, source_path="source.md", decision_path="decision.md",
                         requirement_path="requirement.md", approval_path="approval.md", approval_status="APPROVED")

    def tearDown(self):
        self.temp.cleanup()

    def err(self, data=None, base=None, head=None):
        return validate(data or self.data, self.root, base or self.base, head or self.base)

    def test_good_approved_source(self):
        self.assertEqual(self.err(), [])

    def test_branch_only_source_blocked(self):
        x = dict(self.data, source_path="pending_branch_only.md")
        (self.root / "pending_branch_only.md").write_text("not committed on main")
        self.assertIn("source_path_not_on_main", self.err(x))

    def test_stale_sha_detected(self):
        (self.root / "source.md").write_text("new decision")
        subprocess.run(["git", "-C", str(self.root), "add", "."], check=True)
        subprocess.run(["git", "-C", str(self.root), "commit", "-qm", "update source"], check=True)
        new_base = subprocess.check_output(["git", "-C", str(self.root), "rev-parse", "HEAD"], text=True).strip()
        self.assertIn("source_path_stale_revision", self.err(base=new_base, head=new_base))

    def test_missing_approval(self):
        self.assertIn("approval_status_unconfirmed", self.err(dict(self.data, approval_status="NEEDS_REVIEW")))
        self.assertIn("approval_path_not_on_main", self.err(dict(self.data, approval_path="fake_approval.md")))

    def test_branch_only_state_no_claim(self):
        self.assertEqual(self.err(dict(state="BRANCH_ONLY")), [])

    def test_untested_complete_state_denied(self):
        x = dict(self.data, state="FUNCTIONALLY_ACCEPTED_BOUNDED", implementation_refs=["app.py"])
        self.assertIn("test_not_on_exact_head", self.err(x))
        self.assertIn("human_acceptance_ref_missing", self.err(x))

    def test_tested_on_exact_build(self):
        x = dict(self.data, state="TESTED_ON_EXACT_BUILD", implementation_refs=["app.py"], tested_commit=self.base,
                 test_result="PASS", test_ref="tests.py", test_evidence_ref="test_log.txt")
        self.assertEqual(self.err(x), [])
        self.assertIn("test_not_on_exact_head", self.err(dict(x, tested_commit="0" * 40)))

    def test_no_traversal_or_absolute_path(self):
        self.assertIn("invalid_source_path", self.err(dict(self.data, source_path="../secrets.txt")))
        self.assertIn("invalid_source_path", self.err(dict(self.data, source_path="/etc/passwd")))

    def test_draft_and_docs_only_untouched(self):
        self.assertEqual(self.err(dict(state="NEEDS_REVIEW", source_path="missing.md")), [])
        self.assertEqual(self.err(dict(state="SOURCE_UNREVIEWED")), [])

    def test_missing_source_revision(self):
        self.assertIn("invalid_source_revision", self.err(dict(self.data, source_revision="unknown")))

    def test_missing_changed_code(self):
        x = dict(self.data, state="IMPLEMENTED", implementation_refs=["missing.py"])
        self.assertIn("implementation_ref_missing_at_head", self.err(x))

    def test_no_fake_acceptance_via_boolean(self):
        x = dict(self.data, state="FUNCTIONALLY_ACCEPTED_BOUNDED", implementation_refs=["app.py"],
                 tested_commit=self.base, test_result="PASS", test_ref="tests.py", test_evidence_ref="test_log.txt",
                 acceptance_ref="acceptance.md", acceptance_owner="Engineer Reviewer", acceptance_commit=self.base)
        self.assertEqual(self.err(x), [])  # structural only, human identity NOT authenticated
        self.assertIn("acceptance_not_on_exact_head", self.err(dict(x, acceptance_commit="0"*40)))


if __name__ == "__main__":
    unittest.main()
