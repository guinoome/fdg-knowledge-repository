"""Install this Nex release into the current user's application-data directory."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import sys

from local_nex import (KINDS, WORKSPACE, VERSION, NexError, Ollama, Runtime,
                       default_home, doctor, save_report)
from portable import exclusive_file, linked, mkdirs

APP_FILES = ('nex.py', 'local_nex.py', 'portable.py', 'install.py', 'README.md',
             'WINDOWS_QUICKSTART.md', 'Start Nex.cmd', 'Check Nex.cmd')


def prepare_workspace(root):
    root = Path(root).resolve(strict=True)
    if not (root / '00_Nex').is_dir() or not (root / '20_FPJIS_FDG_Project_Intelligence_System').is_dir():
        raise NexError('Choose the FDG vault root containing 00_Nex and 20_FPJIS_FDG_Project_Intelligence_System')
    for directory in KINDS.values():
        current = root
        for part in (WORKSPACE + '/' + directory).split('/'):
            current = current / part
            if current.exists() or current.is_symlink():
                if linked(current) or not current.is_dir():
                    raise NexError('Workspace path is occupied by a file, symlink or junction')
            else:
                current.mkdir()
    return root


def install(repository, home, source=None, model=''):
    if sys.version_info < (3, 10):
        raise NexError('Python 3.10 or later is required')
    home = Path(os.path.abspath(home))
    repository = Path(repository).resolve(strict=True)
    if home == repository or repository in home.parents:
        raise NexError('Application files and state must be outside the knowledge vault')
    for path in (home, *home.parents):
        if path.exists() and linked(path):
            raise NexError('Application data may not use symlinks or junctions')
    mkdirs(home)
    config_path = home / 'config.json'
    previous = {}
    if config_path.exists():
        if linked(config_path):
            raise NexError('Configuration may not be a symlink')
        previous = json.loads(config_path.read_text(encoding='utf-8'))
        if Path(previous['repository']).resolve() != repository:
            raise NexError('An installation already uses another vault; use --home with a different directory')
    prepare_workspace(repository)
    source = Path(source or __file__).resolve().parent if source is None else Path(source).resolve()
    manifest = source / 'PACKAGE_MANIFEST.json'
    if manifest.exists():
        expected = json.loads(manifest.read_text(encoding='utf-8'))['sha256']
        for name in APP_FILES:
            if hashlib.sha256((source / name).read_bytes()).hexdigest() != expected.get(name):
                raise NexError('Package checksum mismatch: ' + name + '. Re-extract the original package.')
    fingerprint = hashlib.sha256()
    for name in APP_FILES:
        fingerprint.update(name.encode())
        fingerprint.update((source / name).read_bytes())
    release = home / 'versions' / (VERSION + '-' + fingerprint.hexdigest()[:12])
    mkdirs(release)
    for name in APP_FILES:
        target = release / name
        content = (source / name).read_bytes()
        if target.exists():
            if linked(target) or target.read_bytes() != content:
                raise NexError('Installed version was changed; refusing to overwrite it')
        else:
            exclusive_file(target, content)
    config = {**previous, 'repository': str(repository), 'state': str(home / 'state'),
              'model': model or previous.get('model', ''), 'endpoint': previous.get('endpoint', 'http://127.0.0.1:11434'),
              'version': VERSION, 'application': str(release)}
    if not config['model']:
        try:
            models = Ollama().models()
            if len(models) == 1:
                config['model'] = models[0]
        except NexError:
            pass
    # Preserve the former configuration before an atomic replacement.
    if config_path.exists():
        backups = home / 'config-backups'
        mkdirs(backups)
        import uuid
        exclusive_file(backups / (str(uuid.uuid4()) + '.json'), config_path.read_bytes())
    import uuid
    temporary = home / ('config-' + str(uuid.uuid4()) + '.new.json')
    exclusive_file(temporary, (json.dumps(config, indent=2) + '\n').encode())
    os.replace(temporary, config_path)
    # A fixed launcher reads the application path from JSON using Python, not shell interpolation.
    bootstrap = home / 'start_nex.py'
    bootstrap_content = '''import json, os, runpy, sys
from pathlib import Path
config = Path(__file__).parent / 'config.json'
settings = json.loads(config.read_text(encoding='utf-8'))
app = Path(settings['application'])
sys.path.insert(0, str(app))
sys.argv = [str(app / 'local_nex.py'), '--config', str(config)] + sys.argv[1:]
runpy.run_path(str(app / 'local_nex.py'), run_name='__main__')
'''.encode()
    if bootstrap.exists():
        if bootstrap.read_bytes() != bootstrap_content or linked(bootstrap):
            raise NexError('Existing launcher differs; refusing to overwrite it')
    else:
        exclusive_file(bootstrap, bootstrap_content)
    launcher = home / 'Start Nex.cmd'
    launcher_content = b'@echo off\r\nsetlocal DisableDelayedExpansion\r\nset PYTHONUTF8=1\r\npy -3 -B "%~dp0start_nex.py" %*\r\nif errorlevel 1 pause\r\n'
    legacy_launcher = b'@echo off\r\npy -3 -B "%~dp0start_nex.py" %*\r\nif errorlevel 1 pause\r\n'
    if launcher.exists():
        if launcher.read_bytes() not in (launcher_content, legacy_launcher) or linked(launcher):
            raise NexError('Existing Windows launcher differs; refusing to overwrite it')
    else:
        exclusive_file(launcher, launcher_content)
    runtime = Runtime(repository, home / 'state', config['model'], config['endpoint'])
    try:
        index = runtime.refresh()
        report = doctor(runtime)
        report['knowledge_index'] = index
    finally:
        runtime.close()
    report_path = home / 'readiness.json'
    save_report(config_path, report)
    return {'config': str(config_path), 'launcher': str(launcher),
            'readiness_report': str(report_path), 'checks': report}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repository', type=Path)
    parser.add_argument('--home', type=Path, default=default_home())
    parser.add_argument('--model', default='')
    args = parser.parse_args()
    if args.repository:
        repository = args.repository
    else:
        default = Path.home() / 'Documents' / 'Obsidian' / 'FDG Knowledge Repository'
        print('Nex uses your existing vault. No Git reset, clone or replacement will occur.')
        print('Choose the folder containing 00_Nex (not the Obsidian application folder).')
        entered = input(f'FDG vault folder [{default}]: ').strip().strip('"')
        repository = Path(entered) if entered else default
    try:
        report = install(repository, args.home, model=args.model)
        print(json.dumps(report, ensure_ascii=False, indent=2))
        print('\nNex core installed. Start it with Start Nex.cmd in this folder or the installed launcher above.')
        if not report['checks']['conversation_ready']:
            print('Conversation still needs a running local model. Use Set Up Local AI.cmd, then /models and /model inside Nex.')
        return 0 if report['checks']['core_ready'] else 2
    except (OSError, ValueError, KeyError, NexError) as error:
        print('Installation could not complete: ' + str(error)); return 1


if __name__ == '__main__':
    raise SystemExit(main())
