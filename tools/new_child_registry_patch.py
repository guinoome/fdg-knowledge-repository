"""Emit an apply_patch patch adding missing mother-to-child wiki-link registries.

Uses the same deterministic parent rules as new_parent_link_patch.py. This tool
prints a patch and never writes repository files directly.
"""

from __future__ import annotations

import pathlib
import re

from new_parent_link_patch import MOTHERS, local_parent


def main() -> None:
    root = pathlib.Path.cwd().resolve()
    grouped: dict[str, list[str]] = {}

    for file in sorted(root.rglob("*.md")):
        if ".git" in file.parts or "node_modules" in file.parts:
            continue
        rel = file.relative_to(root).as_posix()
        if rel == "FDG Ecosystem.md":
            continue
        top = rel.split("/", 1)[0]
        mother = MOTHERS.get(top, "FDG Ecosystem")
        parent = local_parent(root, file, mother)
        if parent == "FDG Ecosystem":
            parent_rel = "FDG Ecosystem.md"
        else:
            parent_rel = parent if pathlib.PurePosixPath(parent).suffix else f"{parent}.md"
        if parent_rel == rel:
            continue
        grouped.setdefault(parent_rel, []).append(rel)

    patches = []
    for parent_rel, children in sorted(grouped.items()):
        parent_file = root / parent_rel
        if not parent_file.exists():
            continue
        text = parent_file.read_text(encoding="utf-8-sig", errors="replace")
        existing_targets = {
            match.split("|", 1)[0].split("#", 1)[0].strip()
            for match in re.findall(r"\[\[([^\]]+)\]\]", text)
        }
        missing = []
        for child in children:
            target = child[:-3] if child.lower().endswith(".md") else child
            if target not in existing_targets:
                missing.append(target)
        if not missing:
            continue
        lines = ["+", "+## Direct Child Documents", "+"]
        lines.extend(
            f"+- [[{target}|{pathlib.PurePosixPath(target).name.replace('_', ' ')}]]"
            for target in missing
        )
        patches.append(
            f"*** Update File: {parent_file.resolve()}\n@@\n" + "\n".join(lines) + "\n"
        )

    print("*** Begin Patch")
    print("".join(patches), end="")
    print("*** End Patch")


if __name__ == "__main__":
    main()
