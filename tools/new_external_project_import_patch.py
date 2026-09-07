"""Emit an apply_patch patch for a reviewed external text-project import.

The source is read-only. Live environment files, private-key formats, generated
dependencies, and build outputs are excluded. The tool never writes files.
"""

from __future__ import annotations

import argparse
import pathlib
import sys


EXCLUDED_DIRS = {"node_modules", ".next", "dist", "build", ".cache", ".git", ".claude"}
EXCLUDED_FILES = {
    ".env", ".env.local", ".env.development", ".env.production",
    "feip_setup.ps1",
}
EXCLUDED_SUFFIXES = {
    ".pem", ".key", ".p12", ".pfx", ".zip", ".pdf", ".png",
    ".pack", ".idx", ".lock", ".rev",
}


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=pathlib.Path)
    parser.add_argument("destination", type=pathlib.Path)
    parser.add_argument("--entry", action="append", required=True)
    args = parser.parse_args()
    source = args.source.resolve()
    destination = args.destination.resolve()
    patches = []

    for entry_name in args.entry:
        entry = source / entry_name
        paths = [entry] if entry.is_file() else sorted(entry.rglob("*"))
        for file in paths:
            if not file.is_file():
                continue
            rel = file.relative_to(source)
            if any(part in EXCLUDED_DIRS for part in rel.parts):
                continue
            if file.name in EXCLUDED_FILES or file.suffix.lower() in EXCLUDED_SUFFIXES:
                continue
            raw = file.read_bytes()
            if b"\0" in raw:
                raise ValueError(f"Binary file requires a different transfer method: {rel}")
            text = raw.decode("utf-8-sig")
            target = destination / rel
            body = "".join(f"+{line}\n" for line in text.splitlines())
            patches.append(f"*** Add File: {target}\n{body}")

    print("*** Begin Patch")
    print("".join(patches), end="")
    print("*** End Patch")


if __name__ == "__main__":
    main()
