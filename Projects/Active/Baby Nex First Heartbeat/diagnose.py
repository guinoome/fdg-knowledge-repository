"""Read-only startup checks: no model calls, vault reads or credential/environment dumps."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys
import tempfile
import uuid

REQUIRED = ('install.py', 'local_nex.py', 'nex.py', 'portable.py',
            'Install Nex.cmd', 'Start Nex.cmd', 'diagnose.py', 'Diagnose Nex.cmd')


def collect(package, home):
    package, home = Path(package), Path(home)
    report = {'python_version': sys.version.split()[0], 'python_executable': sys.executable,
              'python_supported': sys.version_info >= (3, 10),
              'package_directory': str(package),
              'missing_package_files': [name for name in REQUIRED if not (package / name).is_file()],
              'expected_install_directory': str(home), 'install_directory_exists': home.is_dir(),
              'installed_files': {name: (home / name).is_file()
                                  for name in ('config.json', 'start_nex.py', 'Start Nex.cmd')},
              'configuration_status': 'missing'}
    manifest = package / 'PACKAGE_MANIFEST.json'
    if manifest.is_file():
        try:
            expected = json.loads(manifest.read_text(encoding='utf-8'))['sha256']
            if not isinstance(expected, dict):
                raise ValueError('invalid checksum map')
            mismatches = []
            for name in REQUIRED:
                path = package / name
                if path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() != expected.get(name):
                    mismatches.append(name)
            report['package_checksum_mismatches'] = mismatches
        except (OSError, ValueError, KeyError, TypeError):
            report['package_manifest_status'] = 'unreadable or invalid'
    config = home / 'config.json'
    if config.is_file():
        try:
            if config.stat().st_size > 1_000_000:
                raise ValueError('oversize configuration')
            settings = json.loads(config.read_text(encoding='utf-8'))
            paths = {name: settings.get(name) for name in ('repository', 'application', 'state')}
            if not all(isinstance(value, str) and value for value in paths.values()):
                raise ValueError('missing path binding')
            report['configuration_status'] = 'readable'
            report['configured_paths_exist'] = {name: Path(value).is_dir() for name, value in paths.items()}
        except (OSError, ValueError, AttributeError, TypeError):
            report['configuration_status'] = 'unreadable or invalid'
    report['note'] = 'Startup diagnosis only; this does not establish successful installation or model readiness.'
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--home', type=Path, default=Path(
        os.environ.get('LOCALAPPDATA', str(Path.home() / '.local' / 'share'))) / 'FDG' / 'Nex')
    args = parser.parse_args()
    report = collect(Path(__file__).resolve().parent, args.home)
    print(json.dumps(report, ensure_ascii=True, indent=2))
    output = Path(tempfile.gettempdir()) / ('Nex-diagnostic-' + str(uuid.uuid4()) + '.json')
    try:
        with output.open('x', encoding='utf-8') as file:
            json.dump(report, file, ensure_ascii=True, indent=2)
        print('\nDiagnostic report saved to: ' + str(output))
    except OSError:
        print('\nCould not save the report. The checks above are still available in this window.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
