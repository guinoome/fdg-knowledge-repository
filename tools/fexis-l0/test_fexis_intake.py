import json
import tempfile
import unittest
from pathlib import Path
from fexis_intake import ingest, normalize_url, load_record

BASE = {'url':'https://youtu.be/abcdefghijk?t=2', 'title':'Example', 'source_name':'Example channel', 'source_text':'A tutorial claims X.', 'source_origin':'user_notes', 'relevance':'Relevant to local-first Nex.', 'proposed_application':'Benchmark before changes.'}

class TestFEXIS(unittest.TestCase):
    def test_youtube_dedupe(self):
        with tempfile.TemporaryDirectory() as t:
            x=ingest(BASE,Path(t))
            y=ingest({**BASE,'url':'https://www.youtube.com/watch?v=abcdefghijk&utm_source=test'},Path(t))
            self.assertEqual(x['status'],'CAPTURED_UNVERIFIED')
            self.assertEqual(y['status'],'DUPLICATE')
            r=json.loads(Path(x['path']).read_text())
            self.assertEqual(r['approval'],'NOT_APPROVED')
            self.assertEqual(r['verification'],'NOT_VERIFIED')

    def test_host_reject(self):
        for u in ('https://youtube.com.evil.com/watch?v=abcdefghijk','http://youtube.com/watch?v=abcdefghijk','file:///etc/passwd'):
            with self.assertRaises(ValueError): normalize_url(u)

    def test_bad_source(self):
        with tempfile.TemporaryDirectory() as t:
            p=Path(t)/'a.json'
            p.write_text(json.dumps({**BASE,'source_text':''}))
            with self.assertRaises(ValueError): load_record(p)

    def test_facebook(self):
        self.assertTrue(normalize_url('https://www.facebook.com/reel/123').startswith('https://www.facebook.com/'))

if __name__=='__main__':
    unittest.main()
