# FMIS Local Prototype — SUPERSEDED

> **Status: superseded 2026-08-10.** The canonical FMIS implementation is
> `16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/`.
> Recorded as decision D-2026-08-10-02 in `02_FMIS/16_FMIS_Evidence_and_Decision_Register.md`.
>
> **Do not build on this folder.** It is retained as a validation artifact, the
> same way `Projects/Active/FWIS-Shift-Turnover-Prototype/` was retained after
> `Projects/Active/FWIS/` superseded it.

## What this folder is

`index.html` — a single-file browser dashboard for FMIS, roughly 24 KB, with all
markup, styling and logic inline. It validated the FMIS dashboard layout and KPI
framing before the canonical implementation existed.

## Why it was superseded

Two reasons from `02_FMIS/FMIS-AGENT-ENGINEERING-INSTRUCTIONS.md`:

- **§4** — *"Do not create a single-file application that contains all UI,
  business logic, and data structures in one uncontrolled file."* This prototype
  is that shape.
- **§36** — unit and integration tests are required. This prototype has none.
  The canonical implementation has 10 passing tests.

## Correction to the previous version of this file

The earlier README claimed this folder contained an `implementation/` subfolder
holding "local Python/Tkinter prototype and tests". **No such subfolder exists
here.** The Python implementation lives at
`16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/implementation/`.
The claim was a stale reference, corrected 2026-08-10.

## If you want to look at it

Open `index.html` directly in a browser. It needs no server and no build step.
Nothing in it is wired to the canonical SQLite core.
