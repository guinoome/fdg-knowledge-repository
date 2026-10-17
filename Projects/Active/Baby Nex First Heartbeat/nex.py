"""BN-HB-001: bounded, offline, read-only knowledge retrieval. No model dependency."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import sys
import uuid
import portable

FPJIS = '20_FPJIS_FDG_Project_Intelligence_System'
INDEX = f'{FPJIS}/README.md'
ARCH = f'{FPJIS}/00_Architecture'
QUERY = 'Nex, find the current FPJIS architecture.'
FIELDS = ('Document ID', 'Version', 'Status', 'Owner', 'Approver', 'Effective Date',
          'Supersedes', 'Superseded By')


def safe_read(root, relative):
    """Open relative components without following symlinks, including at read time."""
    if os.name == 'nt':
        data = portable.read_bytes(root, relative)
        return data.decode('utf-8-sig'), hashlib.sha256(data).hexdigest()
    parts = Path(relative).parts
    if not parts or Path(relative).is_absolute() or any(p in ('.', '..') for p in parts):
        raise ValueError('Unsafe source path')
    directory = os.open(root, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
    try:
        for part in parts[:-1]:
            child = os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW,
                            dir_fd=directory)
            os.close(directory)
            directory = child
        descriptor = os.open(parts[-1], os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK,
                             dir_fd=directory)
        with os.fdopen(descriptor, 'rb') as source:
            if not stat.S_ISREG(os.fstat(source.fileno()).st_mode):
                raise ValueError('Source must be a regular file')
            data = source.read(2_000_001)
            if len(data) > 2_000_000:
                raise ValueError('Source exceeds bounded retrieval limit')
            return data.decode('utf-8'), hashlib.sha256(data).hexdigest()
    finally:
        os.close(directory)


def metadata(text):
    """Only explicit metadata in the opening preamble counts, never body claims."""
    result = {}
    for line in text.splitlines():
        if line.startswith('## '):
            break
        if line.strip() == '---' and result:
            break
        cleaned = line.replace('**', '').strip()
        for field in FIELDS:
            if cleaned.lower().startswith(field.lower() + ':'):
                if field in result:
                    raise ValueError(f'Duplicate metadata field: {field}')
                result[field] = cleaned.split(':', 1)[1].strip()
    return result


def resolve(root, files_read):
    index, digest = safe_read(root, INDEX)
    files_read.append({'path': INDEX, 'sha256': digest})
    # Only the indexed architecture area is supported; no repository-wide authority inference.
    directory = root / ARCH
    if directory.is_symlink() or directory.parent.is_symlink():
        raise ValueError('Architecture directory must not be a symlink')
    paths = sorted(directory.glob('*.md'))
    if not directory.is_dir() or not paths:
        raise ValueError('Architecture candidate area missing or empty')
    alternatives, eligible = [], []
    for path in paths:
        relative = path.relative_to(root).as_posix()
        text, digest = safe_read(root, relative)
        files_read.append({'path': relative, 'sha256': digest})
        info = metadata(text)
        links = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]', index)
        linked = any(link.strip().removesuffix('.md') == relative.removesuffix('.md')
                     for link in links)
        reason = 'Missing explicit Approved status'
        if info.get('Status', '').casefold() == 'approved':
            if not all(info.get(k) for k in ('Document ID', 'Version', 'Owner', 'Approver')):
                reason = 'Approved label has incomplete governed identity'
            elif info.get('Superseded By', '').casefold() not in ('', 'none'):
                reason = 'Explicitly superseded; replacement authority requires review'
            elif info.get('Supersedes', '').casefold() not in ('', 'none'):
                reason = 'Supersession relationship requires review in this bounded resolver'
            elif not linked:
                reason = 'No explicit relationship in FPJIS entry index'
            else:
                reason = 'Eligible approved indexed architecture'
                eligible.append((relative, info))
        alternatives.append({'path': relative, 'status': info.get('Status'),
                             'reason_not_selected': reason})
    # Conservative conflict handling: do not invent version/date authority.
    outcome = 'RESOLVED' if len(eligible) == 1 else 'AMBIGUOUS' if eligible else 'NOT_FOUND'
    chosen, info = eligible[0] if outcome == 'RESOLVED' else (None, {})
    for item in alternatives:
        if item['path'] == chosen:
            item['reason_not_selected'] = None
    return {'resolution': outcome, 'canonical_path': chosen,
            'document_id': info.get('Document ID'), 'version': info.get('Version'),
            'status': info.get('Status'),
            'resolution_reason': {
                'RESOLVED': 'One eligible approved indexed architecture found.',
                'NOT_FOUND': 'No eligible current authority. Unapproved or incomplete sources remain reference material.',
                'AMBIGUOUS': 'Multiple plausible approved authorities; human review required.'
            }[outcome], 'alternatives_considered': alternatives}


def audit(state, root, event):
    """Exclusive immutable-by-API receipts. Same-user OS tampering is outside this boundary."""
    state = Path(os.path.abspath(state))
    for path in (state, *state.parents):
        if path.is_symlink():
            raise ValueError('Audit path must not contain symlinks')
    if state == root or root in state.parents:
        raise ValueError('Audit directory must be outside the knowledge repository')
    state.mkdir(parents=True, exist_ok=True, mode=0o700)
    if os.name == 'nt':
        name = event['request_id'] + '.json'
        portable.exclusive_file(state / name, (json.dumps(event, indent=2) + '\n').encode())
        return str(state / name)
    directory = os.open(state, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
    name = event['request_id'] + '.json'
    try:
        descriptor = os.open(name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                             0o600, dir_fd=directory)
        with os.fdopen(descriptor, 'w') as output:
            json.dump(event, output, indent=2)
            output.write('\n')
            output.flush()
            os.fsync(output.fileno())
        os.fsync(directory)
    finally:
        os.close(directory)
    return str(state / name)


def execute(root, state, request):
    root = Path(root).resolve(strict=True)
    event = {'request_id': str(uuid.uuid4()),
             'timestamp': datetime.now(timezone.utc).isoformat(),
             'requester': 'local CLI operator (identity not authenticated)',
             'intent': 'find_current_fpjis_architecture' if request == QUERY else 'unsupported_request',
             'assignment_owner': 'BN-HB-001', 'executor': 'baby-nex-readonly',
             'runtime': sys.version.split()[0], 'skill_or_action': 'resolve_architecture',
             'context_package': 'BN-HB-001/BUILD_CARD.md', 'files_read': [],
             'files_created': [], 'files_modified': [], 'recovery_reference': None,
             'validation_reference': None, 'validation_state': 'NOT_REQUIRED',
             'permission_decision': 'DENY', 'permission_reason': 'Only the exact read proof is supported',
             'final_status': 'DENIED', 'error_summary': None}
    result = {'resolution': 'DENIED', 'canonical_path': None,
              'resolution_reason': 'Read-only prototype: unsupported requests and all repository writes are denied.'}
    code = 3
    if request == QUERY:
        event.update(permission_decision='ALLOW', permission_reason='Bounded FPJIS read capability')
        try:
            result = resolve(root, event['files_read'])
            event.update(final_status='SUCCESS', validation_state='PASSED')
            code = 0 if result['resolution'] == 'RESOLVED' else 2
        except (OSError, ValueError, UnicodeError) as error:
            # Do not disclose arbitrary exception payloads or user-supplied request text.
            event.update(final_status='FAILED', validation_state='FAILED',
                         error_summary=type(error).__name__)
            result = {'resolution': 'ERROR', 'canonical_path': None,
                      'resolution_reason': 'Source inaccessible, unsafe, or malformed; no authority selected.'}
            code = 4
    try:
        event['result'] = result
        receipt = audit(state, root, event)
    except (OSError, ValueError):
        return {'resolution': 'ERROR', 'canonical_path': None,
                'resolution_reason': 'Audit persistence failed; operation is not reported as complete.'}, 4
    return {**result, 'audit_receipt': receipt}, code


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository', type=Path, default=Path(__file__).resolve().parents[3])
    parser.add_argument('--state-dir', type=Path, required=True,
                        help='Local audit directory outside the repository; receipts may contain source excerpts/paths')
    parser.add_argument('request', help=f'Exact proof command: {QUERY}')
    args = parser.parse_args()
    try:
        result, code = execute(args.repository, args.state_dir, args.request)
    except (OSError, ValueError):
        result, code = {'resolution': 'ERROR', 'resolution_reason': 'Repository unavailable.'}, 4
    print(json.dumps(result, indent=2))
    return code


if __name__ == '__main__':
    raise SystemExit(main())
