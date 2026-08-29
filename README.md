# FBIS — FDG Ecosystem Integrated Obsidian Package

This package implements the corrected FBIS Master Index architecture inside the existing FDG Knowledge Repository.

## Ecosystem Position

The existing `FDG Ecosystem — Center` identifies:

`11_FDG_Business_Intelligence_System`

as the FBIS domain and connects it through the ecosystem's Master Index architecture.

## Graph

```text
FDG Ecosystem — Center
        ↓
11_FDG_Business_Intelligence_System
        ↓
FBIS Root Master Index
        ↓
Folder Master Index
        ↓
Domain Documents
```

## Master Index Rule

Every FBIS folder has:

`[Folder Number]_[Folder Name]_Master_Index.md`

Every document within that folder links back to its folder Master Index.

The FBIS Root Master Index links every folder Master Index.

The FBIS Root Master Index also links back to the existing `FDG Ecosystem — Center`.

FBIS therefore becomes a connected business-intelligence domain of the existing FDG organizational brain, not a separate repository.

## Source-of-Truth Rule

The FDG Ecosystem Center governs ecosystem-level navigation.

The FBIS Root Master Index governs FBIS structure.

Each folder Master Index governs its folder structure.

Individual FBIS documents contain the substantive business intelligence.

Do not duplicate authoritative FDG knowledge merely to create links; reference the authoritative source.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → this document

## Direct Child Documents

- [[claude-handoff-protocol|claude-handoff-protocol]]
- [[notes|notes]]
- [[Untitled|Untitled]]
