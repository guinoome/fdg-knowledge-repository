from contextlib import contextmanager
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
import threading
import zipfile
import unittest
from unittest.mock import patch

import install
import build_package
import local_nex as app
import portable


@contextmanager
def model_service(mode='normal'):
    received = []
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            self.reply({'models': [{'name': 'test-model'}]})

        def do_POST(self):
            received.append(json.loads(self.rfile.read(int(self.headers['Content-Length']))))
            if mode == 'redirect':
                self.send_response(302)
                self.send_header('Location', '/redirected')
                self.end_headers()
                return
            if mode == 'invalid':
                self.reply({'message': {'content': 'unfinished'}, 'done': False})
            else:
                self.reply({'message': {'content': 'TEST FIXTURE: FPJIS governs project readiness. [20_FPJIS_FDG_Project_Intelligence_System/README.md]'}, 'done': True})

        def reply(self, body):
            data = json.dumps(body).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f'http://127.0.0.1:{server.server_port}', received
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


class LocalNexTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.base = Path(self.temp.name)
        self.root = self.base / 'Vault with spaces'
        (self.root / '00_Nex').mkdir(parents=True)
        self.doc = '20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture.md'
        (self.root / self.doc).parent.mkdir(parents=True)
        (self.root / self.doc).write_text('# FPJIS Architecture\n\nDocument ID: FPJIS-001\nVersion: 1.0\nStatus: Approved\nOwner: Francis\nApprover: Francis\n\n---\n\n## Purpose\nFPJIS governs project readiness.\n')
        (self.root / '20_FPJIS_FDG_Project_Intelligence_System/README.md').write_text(
            '# FPJIS\n\nFPJIS governs project readiness.\n[[' + self.doc[:-3] + ']]\n')
        install.prepare_workspace(self.root)
        self.runtime = app.Runtime(self.root, self.base / 'state')
        self.addCleanup(self.runtime.close)

    def save(self, kind='artifact', name='first-artifact', text='A real test artifact.'):
        proposal = self.runtime.propose(kind, name, text,
                                        'TEST ONLY — human approval fixture' if kind == 'decision' else '')
        return proposal, self.runtime.approve(proposal['id'], proposal['confirmation'])

    def test_all_three_heartbeat_intents(self):
        result = self.runtime.resolve_fpjis()
        self.assertEqual(result['resolution'], 'RESOLVED')
        proposal, artifact = self.save()
        self.assertEqual(artifact['status'], 'SUCCESS')
        self.assertEqual(app.digest((self.root / artifact['path']).read_bytes()), proposal['sha256'])
        decision, saved = self.save('decision', 'test-decision')
        self.assertIn('Captured — not canonical', (self.root / saved['path']).read_text())
        self.assertIn('TEST ONLY', decision['content'])
        self.assertEqual(self.runtime.db.execute("SELECT count(*) FROM events WHERE action='write' AND status='SUCCESS'").fetchone()[0], 2)

    def test_write_paths_are_scoped_and_invalid_windows_names_are_denied(self):
        for name in ['../escape', '/absolute', r'C:\outside', 'con', 'nul', 'lpt1', 'with.dot', 'x/y', '']:
            with self.subTest(name=name), self.assertRaises(app.NexError):
                self.runtime.propose('artifact', name, 'content')
        with self.assertRaises(app.NexError):
            self.runtime.propose('canonical', 'valid-name', 'content')
        self.assertFalse((self.root.parent / 'escape.md').exists())

    def test_missing_approval_and_wrong_confirmation_do_not_write(self):
        with self.assertRaises(app.NexError):
            self.runtime.propose('decision', 'approval-missing', 'Some choice.')
        proposal = self.runtime.propose('capture', 'pending-note', 'Remember this.')
        with self.assertRaises(app.NexError):
            self.runtime.approve(proposal['id'], 'yes')
        self.assertFalse((self.root / proposal['target']).exists())

    def test_tampered_approval_content_does_not_write(self):
        proposal = self.runtime.propose('artifact', 'bound-content', 'Approved bytes.')
        with self.runtime.db:
            self.runtime.db.execute("UPDATE proposals SET content='changed' WHERE id=?", (proposal['id'],))
        with self.assertRaises(app.NexError):
            self.runtime.approve(proposal['id'], proposal['confirmation'])
        self.assertFalse((self.root / proposal['target']).exists())

    def test_late_collision_and_replayed_approval_never_overwrite(self):
        proposal = self.runtime.propose('artifact', 'collision', 'Proposed bytes.')
        target = self.root / proposal['target']
        target.write_text('Pre-existing human work.')
        with self.assertRaises(app.NexError):
            self.runtime.approve(proposal['id'], proposal['confirmation'])
        self.assertEqual(target.read_text(), 'Pre-existing human work.')
        other, saved = self.save(name='completed')
        with self.assertRaises(app.NexError):
            self.runtime.approve(other['id'], other['confirmation'])
        self.assertEqual(app.digest((self.root / saved['path']).read_bytes()), other['sha256'])

    def test_validation_failure_rolls_back_only_new_unchanged_file(self):
        proposal = self.runtime.propose('artifact', 'rollback', 'Rollback test.')
        with patch.object(self.runtime, 'validate_write', side_effect=app.NexError('Injected validation failure')):
            with self.assertRaisesRegex(app.NexError, 'ROLLED_BACK'):
                self.runtime.approve(proposal['id'], proposal['confirmation'])
        self.assertFalse((self.root / proposal['target']).exists())
        self.assertEqual(self.runtime.memory()[0]['state'], 'ROLLED_BACK')

    def test_external_change_during_validation_is_preserved_for_review(self):
        proposal = self.runtime.propose('artifact', 'external-change', 'Original approved content.')
        def changed(relative, expected):
            (self.root / relative).write_text('Human edit during validation.')
            raise app.NexError('Changed by another writer')
        with patch.object(self.runtime, 'validate_write', side_effect=changed):
            with self.assertRaisesRegex(app.NexError, 'NEEDS_REVIEW'):
                self.runtime.approve(proposal['id'], proposal['confirmation'])
        self.assertEqual((self.root / proposal['target']).read_text(), 'Human edit during validation.')

    def test_recovery_handles_complete_missing_and_partial_files(self):
        for name, content, expected in [('complete', 'full', 'RECOVERED_SUCCESS'),
                                         ('missing', None, 'ROLLED_BACK'),
                                         ('partial', 'partial bytes', 'NEEDS_REVIEW')]:
            proposal = self.runtime.propose('capture', name, 'Recoverable intended content.')
            with self.runtime.db:
                self.runtime.db.execute("UPDATE proposals SET state='WRITING' WHERE id=?", (proposal['id'],))
            target = self.root / proposal['target']
            if content:
                target.write_bytes(proposal['content'].encode() if content == 'full' else content.encode())
            report = self.runtime.recover()
            self.assertEqual(next(r for r in report if r['id'] == proposal['id'])['status'], expected)
            if content == 'partial bytes':
                self.assertEqual(target.read_text(), content)

    def test_restart_preserves_memory_and_recovery_reference(self):
        proposal, _ = self.save('capture', 'remember-me', 'Persistent user knowledge.')
        second = app.Runtime(self.root, self.base / 'state')
        try:
            self.assertIn('Persistent user knowledge.', second.recall(proposal['id'])['content'])
            event = second.db.execute("SELECT details FROM events WHERE action='write' AND status='SUCCESS'").fetchone()
            self.assertEqual(json.loads(event[0])['recovery_reference'], 'sqlite:proposals/' + proposal['id'])
        finally:
            second.close()

    def test_audit_is_append_only_through_database_api(self):
        self.runtime.event('test', 'SUCCESS', {'evidence': True})
        for statement in ['DELETE FROM events', "UPDATE events SET status='altered'"]:
            with self.assertRaises(sqlite3.IntegrityError):
                self.runtime.db.execute(statement)
            self.runtime.db.rollback()

    def test_knowledge_discovery_and_stale_index_protection(self):
        result = self.runtime.search('What does FPJIS do?')
        self.assertTrue(result)
        self.assertTrue(any(r['status'] == 'Approved' for r in result))
        for source in result:
            (self.root / source['path']).write_text('Changed outside Nex.')
        self.assertEqual(self.runtime.search('FPJIS'), [])
        with self.assertRaises(app.NexError):
            self.runtime.read('../secret.md')
        with self.assertRaises(app.NexError):
            self.runtime.read('.git/config.md')

    def test_symlink_write_directory_is_denied(self):
        directory = self.root / app.WORKSPACE / 'artifacts'
        directory.rmdir()
        outside = self.base / 'outside'
        outside.mkdir()
        directory.symlink_to(outside, target_is_directory=True)
        with self.assertRaises(app.NexError):
            self.runtime.propose('artifact', 'escape', 'Never outside.')
        self.assertEqual(list(outside.iterdir()), [])

    def test_model_local_only_no_redirect_and_complete_response_required(self):
        for endpoint in ['https://example.com', 'http://127.0.0.1.evil.test',
                         'http://user:pass@localhost', 'http://localhost/path']:
            with self.assertRaises(app.NexError):
                app.Ollama('test-model', endpoint)
        for mode in ['redirect', 'invalid']:
            with model_service(mode) as (endpoint, _):
                with self.assertRaises(app.NexError):
                    app.Ollama('test-model', endpoint).chat([{'role': 'user', 'content': 'hello'}])

    def test_model_http_contract_context_history_and_memory(self):
        proposal, _ = self.save('capture', 'owner-context', 'The owner wants a local Nex.')
        with model_service() as (endpoint, requests):
            self.runtime.model = app.Ollama('test-model', endpoint)
            answer = self.runtime.ask('What does FPJIS do?')
            self.assertIn('TEST FIXTURE', answer['answer'])
            self.assertTrue(answer['sources'])
            context = json.loads(requests[0]['messages'][-1]['content'])
            self.assertTrue(context['sources'])
            self.assertIn('The owner wants a local Nex.', context['local_memories'][0]['content'])
            self.runtime.ask('Explain FPJIS readiness')
            self.assertTrue(any(m['role'] == 'assistant' for m in requests[1]['messages']))
            self.assertNotIn('tools', requests[0])
            self.assertEqual(len(self.runtime.memory()), 1)
            self.assertTrue(app.doctor(self.runtime)['conversation_ready'])

    def test_state_is_bound_to_one_vault(self):
        other = self.base / 'other'
        other.mkdir()
        with self.assertRaises(app.NexError):
            app.Runtime(other, self.base / 'state')

    def test_installer_refuses_appdata_inside_vault_and_symlink_versions(self):
        with self.assertRaises(app.NexError):
            install.install(self.root, self.root / 'unsafe-app')
        self.assertFalse((self.root / 'unsafe-app').exists())
        home = self.base / 'appdata'
        home.mkdir()
        outside = self.base / 'outside-release'
        outside.mkdir()
        (home / 'versions').symlink_to(outside, target_is_directory=True)
        with self.assertRaises(ValueError):
            install.install(self.root, home)
        self.assertEqual(list(outside.iterdir()), [])

    def test_transfer_package_installs_from_extracted_source_and_verifies_checksums(self):
        output = self.base / 'Nex.zip'
        report = build_package.build(output)
        self.assertGreater(report['files'], 10)
        extraction = self.base / 'download'
        with zipfile.ZipFile(output) as archive:
            self.assertIsNone(archive.testzip())
            self.assertFalse(any('sqlite' in name or '/workspace/' in name for name in archive.namelist()))
            archive.extractall(extraction)
        with patch.object(app.Ollama, 'models', return_value=[]):
            installed = install.install(self.root, self.base / 'zip-install', source=extraction / 'Nex')
        self.assertTrue(installed['checks']['core_ready'])
        (extraction / 'Nex/local_nex.py').write_text('# changed package')
        with self.assertRaisesRegex(app.NexError, 'checksum mismatch'):
            install.install(self.root, self.base / 'second-install', source=extraction / 'Nex')

    def test_installer_repeatability_and_new_process_launch(self):
        home = self.base / 'Nex installation'
        with patch.object(app.Ollama, 'models', return_value=[]):
            first = install.install(self.root, home)
            second = install.install(self.root, home)
        self.assertEqual(first['launcher'], second['launcher'])
        self.assertTrue(first['checks']['core_ready'])
        self.assertFalse(first['checks']['conversation_ready'])
        self.assertEqual(len(list((home / 'versions').iterdir())), 1)
        process = subprocess.run([sys.executable, '-B', str(home / 'start_nex.py')],
                                 input='/find FPJIS\n/memory\n/quit\n', text=True,
                                 capture_output=True)
        self.assertEqual(process.returncode, 0, process.stderr)
        self.assertIn('FPJIS', process.stdout)
        self.assertIn('saved work', process.stdout.casefold())

    def test_portable_reader_rejects_traversal_and_junction_attribute(self):
        with self.assertRaises(ValueError):
            portable.read_bytes(self.root, r'..\private.md')
        with patch.object(portable, 'linked', return_value=True):
            with self.assertRaises(ValueError):
                portable.read_bytes(self.root, self.doc)


if __name__ == '__main__':
    unittest.main()
