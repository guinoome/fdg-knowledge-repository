"""Offline unit tests for the FDG pinned-source visual-craft bootstrap."""
import contextlib
import hashlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

MODULE = Path(__file__).with_name("bootstrap.py")
spec = importlib.util.spec_from_file_location("fdg_visual_bootstrap", MODULE)
bootstrap = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bootstrap)


class VisualBootstrapTests(unittest.TestCase):
    def test_all_pins_have_40_hex_characters(self):
        for _, sha, _ in bootstrap.PACKS.values():
            self.assertEqual(len(sha), 40)
            int(sha, 16)

    def test_skill_receipt_and_hash_verification(self):
        with tempfile.TemporaryDirectory() as tmp:
            folder = Path(tmp) / "design-taste-frontend"
            folder.mkdir()
            skill = folder / "SKILL.md"
            skill.write_text("---\nname: design-taste-frontend\n---\n\n# Test fixture\n", encoding="utf-8")
            sha = bootstrap.PACKS["taste"][1]
            self.assertTrue(bootstrap.verify(folder, "design-taste-frontend"))
            self.assertFalse(bootstrap.verify(folder, "design-taste-frontend", sha))
            receipt = {"sha": sha, "name": "design-taste-frontend",
                       "skill_sha256": hashlib.sha256(skill.read_bytes()).hexdigest()}
            (folder / "FDG_SOURCE.json").write_text(json.dumps(receipt), encoding="utf-8")
            self.assertTrue(bootstrap.verify(folder, "design-taste-frontend", sha))
            skill.write_text(skill.read_text() + "\nchanged", encoding="utf-8")
            self.assertFalse(bootstrap.verify(folder, "design-taste-frontend", sha))

    def test_check_only_does_not_write_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "CLAUDE.md").write_text("stub", encoding="utf-8")
            (root / "AGENTS.md").write_text("stub", encoding="utf-8")
            stream = io.StringIO()
            with patch("sys.argv", ["bootstrap.py", "--root", str(root),
                                     "--agents", "claude", "--packs", "taste", "--check"]):
                with contextlib.redirect_stdout(stream):
                    status = bootstrap.main()
            result = json.loads(stream.getvalue())
            self.assertEqual(status, 2)
            self.assertEqual(result["status"], "SOURCE_SETUP_BLOCKED")
            self.assertEqual(result["items"][0]["status"], "MISSING")
            self.assertFalse((root / ".claude").exists())

    def test_existing_unknown_skill_is_preserved(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "CLAUDE.md").write_text("stub", encoding="utf-8")
            (root / "AGENTS.md").write_text("stub", encoding="utf-8")
            skill_dir = root / ".agents/skills/design-taste-frontend"
            skill_dir.mkdir(parents=True)
            content = "---\nname: design-taste-frontend\n---\n\n# Custom local\n"
            (skill_dir / "SKILL.md").write_text(content, encoding="utf-8")
            stream = io.StringIO()
            with patch("sys.argv", ["bootstrap.py", "--root", str(root),
                                     "--agents", "codex", "--packs", "taste", "--apply"]):
                with contextlib.redirect_stdout(stream):
                    status = bootstrap.main()
            self.assertEqual(status, 2)
            self.assertEqual(json.loads(stream.getvalue())["items"][0]["status"],
                             "BLOCKED_EXISTING_UNVERIFIED")
            self.assertEqual((skill_dir / "SKILL.md").read_text(encoding="utf-8"), content)


if __name__ == "__main__":
    unittest.main()
