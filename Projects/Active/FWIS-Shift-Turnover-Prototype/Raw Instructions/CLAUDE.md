# CLAUDE.md — FWIS (Facility Workspace Intelligence System)

Read `@FWIS_VISION.md` for product philosophy, the full communication-source list, dashboard detail, and long-term roadmap. Load it when you need the "why." This file is what you need every session — keep it that way when editing.

## What this is

FWIS is the Chief Engineer's operational workspace: one place to see plant status, incidents, and open engineering work instead of five communication tools. Part of FBPOIS, under the FDG Ecosystem. Not a chat app, not project management software, not another AppSheet.

## Domain vocabulary

- MEPF = Mechanical, Electrical, Plumbing, Fire Protection
- OOO / OOS = Out of Order / Out of Service
- PM / CM = Preventive / Corrective Maintenance
- "Plant" = a physical utility system (chillers, boilers, generators), not a software environment

## Architecture — resolve before writing code

**FWIS is not sized like the rest of the FDG toolset.** The existing pattern (FDG Practical Calculator, EIP, T-CPS, PIS, Hotel Budget Portal) is a single offline HTML file, no backend, no build step. That pattern cannot carry FWIS — this scope includes native Android, background sync services, and OAuth against Outlook/Gmail/Teams. Treating FWIS like the others fails partway through, not at the start, which makes it more expensive to catch.

**OPEN — resolve with the Founder before implementation starts, do not infer:**
- Target stack for Windows Desktop + Android + Web (three real platforms, not three views of one file)
- Where OAuth tokens and background sync run — a client app can't safely hold Outlook/Gmail credentials or poll continuously on its own
- Whether Phase 1 needs all three platforms at once, or one first

## Current milestone — flagged, not resolved

The source spec's "Phase 1" includes: 3 platforms, offline-first sync with automatic conflict resolution, and live intake from 5+ communication platforms. That's the full product, not a first milestone.

Recommended cut, pending confirmation: one platform (web or desktop, not both), manual record entry + dashboard + search, no automatic communication-source sync yet. Automatic multi-source sync depends on infrastructure that doesn't exist yet — per the FDG Handoff Protocol, that's Stage 1 work, not Stage 0. Confirm the real Phase 1 boundary before starting; don't let it get inferred from the vision doc's ambition.

## No hardcoding

Properties, buildings, departments, plants, utilities, approval chains, and workflows are config-driven, not hardcoded. Decide this in the schema from the first commit — retrofitting it later is a data migration, not a refactor.

## Priority order (use when constraints conflict)

1. Operational usability
2. Engineering workflow accuracy
3. Data integrity & auditability
4. Offline reliability
5. Simplicity
6. Maintainability
7. Scalability
8. Enterprise readiness

## Workflow rules

- Explore, then plan, then implement, then verify, then commit. Don't jump straight to code on anything touching more than one file or one unresolved decision above.
- Before calling any work package done: state what you verified (tests run, build passed, what was checked manually) and name anything you couldn't verify. Don't assert correctness without showing it.
- Definition of done = target state + verification method, stated together. "Renders correctly" is not done. "Renders correctly, verified by running the module smoke test" is done.
- One work package per session. If a task doesn't fit in a focused session, say so — don't quietly expand to fill the time.
- Out-of-scope items get logged, not built. If something looks missing but wasn't asked for, flag it and stop, don't add it.

## Build / test commands

Not yet established — this is a pre-code project. Run `/init` once initial scaffolding exists to detect these automatically, then replace this section with the real commands.

## Repository etiquette

Not yet established. The first implementation session should propose branch naming and commit conventions and this section should be updated with the answer, not left generic.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
