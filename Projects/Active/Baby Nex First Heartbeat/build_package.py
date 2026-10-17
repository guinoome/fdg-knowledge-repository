"""Build a small, source-only Windows transfer ZIP; never package vault/state contents."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

from install import APP_FILES
from local_nex import VERSION

FILES = (*APP_FILES, 'Install Nex.cmd', 'Set Up Local AI.cmd', 'build_package.py',
         'BUILD_CARD.md', 'LOCAL_BUILD_CARD.md', 'CURRENT_HANDOVER.md',
         'tests/test_nex.py', 'tests/test_local_nex.py')


def build(output, source=None):
    source = Path(source or Path(__file__).parent)
    payload = {}
    for name in FILES:
        path = source / name
        if path.is_symlink() or not path.is_file():
            raise ValueError('Package input missing or unsafe: ' + name)
        data = path.read_bytes()
        if name.endswith('.cmd'):
            data = data.replace(b'\r\n', b'\n').replace(b'\n', b'\r\n')
        payload[name] = data
    manifest = {'version': VERSION,
                'note': 'Content checksums detect accidental changes; this is not a cryptographic signature.',
                'sha256': {name: hashlib.sha256(data).hexdigest() for name, data in payload.items()}}
    payload['PACKAGE_MANIFEST.json'] = (json.dumps(manifest, indent=2) + '\n').encode()
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, 'x', compression=zipfile.ZIP_DEFLATED) as archive:
        for name, data in payload.items():
            archive.writestr('Nex/' + name, data)
    return {'path': str(output), 'bytes': output.stat().st_size,
            'sha256': hashlib.sha256(output.read_bytes()).hexdigest(),
            'files': len(payload)}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    arguments = parser.parse_args()
    print(json.dumps(build(arguments.output), indent=2))
