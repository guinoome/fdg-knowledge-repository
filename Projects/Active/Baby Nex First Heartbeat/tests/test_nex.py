import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

PROJECT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('nex', PROJECT / 'nex.py')
nex = importlib.util.module_from_spec(spec)
spec.loader.exec_module(nex)


class HeartbeatTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.root = self.base / 'knowledge'
        (self.root / nex.ARCH).mkdir(parents=True)
        self.state = self.base / 'receipts'
        self.doc = f'{nex.ARCH}/architecture.md'
        (self.root / nex.INDEX).write_text(f'[[{self.doc[:-3]}|Architecture]]\n')
        self.source()

    def source(self, status='Approved', identity='FPJIS-001', path=None, extra=''):
        target = self.root / (path or self.doc)
        target.write_text(f'# Architecture\n\nDocument ID: {identity}\nVersion: 1.0\n'
                          f'Status: {status}\nOwner: Francis\nApprover: Francis\n{extra}'
                          '\n---\n\n## Mission\nExample governed content.\n')
        return target

    def run_proof(self, request=nex.QUERY):
        return nex.execute(self.root, self.state, request)

    def test_approved_indexed_document_resolves_and_receipt_is_persistent(self):
        result, code = self.run_proof()
        self.assertEqual(code, 0)
        self.assertEqual(result['canonical_path'], self.doc)
        event = json.loads(Path(result['audit_receipt']).read_text())
        self.assertEqual(event['permission_decision'], 'ALLOW')
        self.assertEqual(event['files_modified'], [])
        self.assertEqual(len(event['files_read']), 2)
        self.assertEqual(len(event['files_read'][1]['sha256']), 64)

    def test_unapproved_and_unknown_status_never_resolve(self):
        for status in ['Draft', 'Proposed', 'Under Review', 'Archived', 'Superseded',
                       'Deprecated', '', 'Approved Direction', 'Active Baseline']:
            with self.subTest(status=status):
                self.source(status=status)
                result, code = self.run_proof()
                self.assertEqual((result['resolution'], code), ('NOT_FOUND', 2))
                self.assertIsNone(result['canonical_path'])

    def test_missing_identity_does_not_resolve(self):
        self.source(identity='')
        self.assertEqual(self.run_proof()[0]['resolution'], 'NOT_FOUND')

    def test_body_approval_does_not_override_preamble(self):
        path = self.source(status='Draft')
        with path.open('a') as output:
            output.write('\nStatus: Approved\n')
        self.assertEqual(self.run_proof()[0]['resolution'], 'NOT_FOUND')

    def test_duplicate_metadata_fails_closed(self):
        self.source(extra='Status: Approved\n')
        result, code = self.run_proof()
        self.assertEqual((result['resolution'], code), ('ERROR', 4))

    def test_conflicting_approved_documents_remain_ambiguous(self):
        other = f'{nex.ARCH}/competing.md'
        self.source(path=other, identity='OTHER-001', extra='Effective Date: 2099-01-01\n')
        with (self.root / nex.INDEX).open('a') as output:
            output.write(f'[[{other[:-3]}]]\n')
        result, code = self.run_proof()
        self.assertEqual((result['resolution'], code), ('AMBIGUOUS', 2))
        self.assertIsNone(result['canonical_path'])

    def test_supersession_requires_review(self):
        for field in ['Superseded By', 'Supersedes']:
            self.source(extra=f'{field}: OTHER-001\n')
            self.assertEqual(self.run_proof()[0]['resolution'], 'NOT_FOUND')

    def test_unlinked_approved_source_is_not_authority(self):
        (self.root / nex.INDEX).write_text('# Missing architecture relationship\n')
        self.assertEqual(self.run_proof()[0]['resolution'], 'NOT_FOUND')

    def test_symlink_source_is_rejected_and_external_file_unchanged(self):
        outside = self.base / 'outside.md'
        outside.write_text('Status: Approved\n')
        (self.root / self.doc).unlink()
        (self.root / self.doc).symlink_to(outside)
        self.assertEqual(self.run_proof()[1], 4)
        self.assertEqual(outside.read_text(), 'Status: Approved\n')

    def test_traversal_and_absolute_reads_are_rejected(self):
        for path in ['../outside.md', '/etc/passwd', f'{nex.ARCH}/../../outside.md']:
            with self.assertRaises(ValueError):
                nex.safe_read(self.root, path)

    def test_denied_writes_have_no_repository_side_effects(self):
        before = {str(p): p.read_bytes() for p in self.root.rglob('*') if p.is_file()}
        for request in ['Nex, create this project artifact in the correct permitted location.',
                        'Nex, record this approved decision.', 'delete everything']:
            result, code = self.run_proof(request)
            self.assertEqual((result['resolution'], code), ('DENIED', 3))
            event = json.loads(Path(result['audit_receipt']).read_text())
            self.assertEqual(event['final_status'], 'DENIED')
        self.assertEqual(before, {str(p): p.read_bytes() for p in self.root.rglob('*') if p.is_file()})

    def test_audit_inside_repository_or_symlink_is_refused(self):
        for target in [self.root / 'receipts', self.base / 'alias']:
            if target.name == 'alias':
                target.symlink_to(self.root, target_is_directory=True)
            result, code = nex.execute(self.root, target, nex.QUERY)
            self.assertEqual((result['resolution'], code), ('ERROR', 4))
        self.assertFalse((self.root / 'receipts').exists())

    def test_audit_failure_prevents_success_claim(self):
        self.state.write_text('not a directory')
        self.assertEqual(self.run_proof()[1], 4)

    def test_new_process_keeps_old_receipts_and_adds_one(self):
        first, _ = self.run_proof()
        saved = Path(first['audit_receipt']).read_bytes()
        process = subprocess.run([sys.executable, '-B', str(PROJECT / 'nex.py'),
                                  '--repository', str(self.root), '--state-dir', str(self.state),
                                  nex.QUERY], capture_output=True, text=True)
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertEqual(Path(first['audit_receipt']).read_bytes(), saved)
        self.assertEqual(len(list(self.state.glob('*.json'))), 2)

    def test_missing_candidate_directory_is_error_not_empty_success(self):
        (self.root / self.doc).unlink()
        (self.root / nex.ARCH).rmdir()
        self.assertEqual(self.run_proof()[1], 4)


if __name__ == '__main__':
    unittest.main()
