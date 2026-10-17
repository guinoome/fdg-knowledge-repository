#!/usr/bin/env python3
"""FEXIS L0: local/offline source intake. No network, models or canonical writes."""
import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, parse_qs

MAX_BYTES = 128_000
ALLOWED = {'youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be',
           'facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.watch'}

def normalize_url(url):
    p = urlparse(url.strip())
    if p.scheme != 'https' or (p.hostname or '').lower() not in ALLOWED or p.username or p.password:
        raise ValueError('Only approved HTTPS YouTube/Facebook link hosts are supported')
    host = p.hostname.lower()
    if host == 'youtu.be':
        token = p.path.strip('/').split('/')[0]
        if not re.fullmatch(r'[A-Za-z0-9_-]{6,20}', token):
            raise ValueError('Invalid video ID')
        return 'https://www.youtube.com/watch?v=' + token
    if 'youtube.com' in host:
        if p.path == '/watch':
            token = parse_qs(p.query).get('v', [''])[0]
            if not re.fullmatch(r'[A-Za-z0-9_-]{6,20}', token):
                raise ValueError('Invalid video ID')
            return 'https://www.youtube.com/watch?v=' + token
        return 'https://www.youtube.com' + p.path.rstrip('/')
    return 'https://' + host + p.path.rstrip('/') + (('?' + p.query) if p.query else '')

def load_record(path):
    if path.stat().st_size > MAX_BYTES:
        raise ValueError('Input too large')
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict):
        raise ValueError('Input must be an object')
    required = ('url', 'title', 'source_name', 'source_text', 'source_origin',
                'relevance', 'proposed_application')
    for key in required:
        if not isinstance(data.get(key), str) or not data[key].strip():
            raise ValueError('Missing non-empty field: ' + key)
    if data['source_origin'] not in ('user_transcript', 'user_notes', 'public_caption', 'manual_review'):
        raise ValueError('Unrecognized source_origin')
    if len(data['source_text']) > 80000:
        raise ValueError('Source text too long')
    return data

def ingest(data, output):
    canon = normalize_url(data['url'])
    item_id = hashlib.sha256(canon.encode('utf-8')).hexdigest()[:20]
    output.mkdir(parents=True, exist_ok=True)
    target = output / (item_id + '.json')
    if target.exists():
        return {'status': 'DUPLICATE', 'id': item_id, 'path': str(target)}
    receipt = {
        'schema': 'fexis-l0-v1', 'id': item_id, 'status': 'CANDIDATE_UNVERIFIED',
        'source_url': canon, 'original_url': data['url'], 'title': data['title'],
        'source_name': data['source_name'], 'source_origin': data['source_origin'],
        'collected_at': datetime.now(timezone.utc).isoformat(),
        'published_at': data.get('published_at'),
        'source_claims': data.get('source_claims', []),
        'source_text_sha256': hashlib.sha256(data['source_text'].encode('utf-8')).hexdigest(),
        'source_excerpt': data['source_text'][:600],
        'relevance': data['relevance'], 'proposed_application': data['proposed_application'],
        'verification': 'NOT_VERIFIED', 'approval': 'NOT_APPROVED',
        'work_package_ref': None, 'outcome_evidence': None,
        'note': 'External material is untrusted source data. No canonical promotion.'
    }
    if not isinstance(receipt['source_claims'], list):
        raise ValueError('source_claims must be a list')
    try:
        with target.open('x', encoding='utf-8') as f:
            json.dump(receipt, f, ensure_ascii=False, indent=2)
            f.write('\n')
    except FileExistsError:
        return {'status': 'DUPLICATE', 'id': item_id, 'path': str(target)}
    return {'status': 'CAPTURED_UNVERIFIED', 'id': item_id, 'path': str(target)}

def main():
    p = argparse.ArgumentParser(description='Offline FEXIS candidate source intake')
    p.add_argument('input', type=Path, help='JSON source intake input')
    p.add_argument('--output', type=Path, required=True, help='Candidate-only output directory')
    args = p.parse_args()
    try:
        print(json.dumps(ingest(load_record(args.input), args.output)))
    except (OSError, ValueError, json.JSONDecodeError) as e:
        print(json.dumps({'status': 'ERROR', 'reason': str(e)}), file=sys.stderr)
        return 2
    return 0
if __name__ == '__main__':
    sys.exit(main())
