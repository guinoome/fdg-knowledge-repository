"""Filesystem checks shared by Windows and POSIX launch paths.

This is a single-user desktop application, not a sandbox against the OS user.
"""
import os
from pathlib import Path
import stat


def linked(path):
    info = path.lstat()
    return stat.S_ISLNK(info.st_mode) or bool(
        getattr(info, 'st_file_attributes', 0) & 0x400)  # Windows reparse point


def mkdirs(path):
    """Create an application-owned directory without following existing reparse points."""
    path = Path(os.path.abspath(path))
    for current in (*reversed(path.parents), path):
        if current.exists() or current.is_symlink():
            if linked(current) or not current.is_dir():
                raise ValueError('Directory path contains a file, symlink or junction')
        else:
            current.mkdir()
    return path


def checked(root, relative, must_exist=True):
    root = Path(root).resolve(strict=True)
    raw = str(relative)
    parts = raw.replace('\\', '/').split('/')
    if not raw or any(p in ('', '.', '..') for p in parts) or ':' in raw:
        raise ValueError('Use a relative path without traversal or drive prefixes')
    current = root
    for i, part in enumerate(parts):
        if part.startswith('.') or any(c in part for c in '*?<>|\x00'):
            raise ValueError('Hidden, wildcard or invalid paths are not allowed')
        current = current / part
        if current.exists() or current.is_symlink():
            if linked(current):
                raise ValueError('Symlinks and Windows junctions are not allowed')
        elif must_exist or i != len(parts) - 1:
            raise FileNotFoundError('Path does not exist')
    if not current.resolve(strict=must_exist).is_relative_to(root):
        raise ValueError('Path leaves the configured root')
    return current


def read_bytes(root, relative, limit=2_000_000):
    path = checked(root, relative)
    descriptor = os.open(path, os.O_RDONLY | getattr(os, 'O_NOFOLLOW', 0)
                         | getattr(os, 'O_NONBLOCK', 0) | getattr(os, 'O_BINARY', 0))
    with os.fdopen(descriptor, 'rb') as source:
        if not stat.S_ISREG(os.fstat(source.fileno()).st_mode):
            raise ValueError('Only regular files are readable')
        data = source.read(limit + 1)
    if len(data) > limit:
        raise ValueError('File exceeds the bounded read limit')
    return data


def exclusive_file(path, data):
    """Create only. Return the created file's identity for guarded rollback."""
    descriptor = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL
                         | getattr(os, 'O_NOFOLLOW', 0) | getattr(os, 'O_BINARY', 0), 0o600)
    with os.fdopen(descriptor, 'wb') as output:
        identity = (os.fstat(output.fileno()).st_dev, os.fstat(output.fileno()).st_ino)
        output.write(data)
        output.flush()
        os.fsync(output.fileno())
    return identity
