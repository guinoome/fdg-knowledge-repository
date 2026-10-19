import json
from pathlib import Path
import tempfile
import unittest

import diagnose


class StartupDiagnosisTests(unittest.TestCase):
    def test_missing_installation_is_distinguished_from_missing_package_without_writes(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            package = root / 'extracted'
            package.mkdir()
            report = diagnose.collect(package, root / 'not-installed')
            self.assertFalse(report['install_directory_exists'])
            self.assertEqual(report['configuration_status'], 'missing')
            self.assertIn('install.py', report['missing_package_files'])
            self.assertEqual(list(root.iterdir()), [package])

    def test_report_does_not_dump_configuration_secrets_or_note_content(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            home = root / 'home'
            home.mkdir()
            config = {'repository': str(root), 'application': str(root), 'state': str(home),
                      'private_value': 'sensitive-test-fixture-do-not-display'}
            (home / 'config.json').write_text(json.dumps(config), encoding='utf-8')
            report = diagnose.collect(root, home)
            self.assertEqual(report['configuration_status'], 'readable')
            self.assertTrue(all(report['configured_paths_exist'].values()))
            self.assertNotIn(config['private_value'], json.dumps(report))

    def test_malformed_config_and_manifest_leave_actionable_results(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / 'config.json').write_text('not JSON', encoding='utf-8')
            (root / 'PACKAGE_MANIFEST.json').write_text('{"sha256": []}', encoding='utf-8')
            report = diagnose.collect(root, root)
            self.assertEqual(report['configuration_status'], 'unreadable or invalid')
            self.assertEqual(report['package_manifest_status'], 'unreadable or invalid')


if __name__ == '__main__':
    unittest.main()
