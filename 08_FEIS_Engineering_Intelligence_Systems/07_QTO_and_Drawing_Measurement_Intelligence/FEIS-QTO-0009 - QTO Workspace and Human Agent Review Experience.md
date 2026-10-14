---
document_id: FEIS-QTO-0009
title: QTO Workspace and Human Agent Review Experience
status: Approved UX Blueprint
created: 2026-10-14
---

# FEIS-QTO-0009 — QTO Workspace & Human/Agent Review Experience

## UX Goal

A professional estimator/engineer should understand:
- what sheet is open;
- what scale applies;
- what is already measured;
- what is proposed;
- what needs review;
- where each quantity came from.

Avoid generic dashboard-first UX. The drawing workspace is the primary work surface.

## Desktop Composition

```text
┌────────────────────────────────────────────────────────────┐
│ Project / Drawing / Revision / Scale / Search / Export    │
├──────────────┬───────────────────────────────┬─────────────┤
│ Sheets       │                               │ Takeoffs    │
│              │       DRAWING CANVAS          │ Items       │
│ Filters      │                               │ Totals      │
│ Revisions    │       Geometry / Overlay      │ Review      │
│              │                               │ Evidence    │
├──────────────┴───────────────────────────────┴─────────────┤
│ Status: Scale Confirmed | 12 Proposed | 48 Approved       │
└────────────────────────────────────────────────────────────┘
```

## Visual States

- Approved human work: solid/authoritative
- Agent proposal: visually distinct proposal/pencil
- Review required: clear warning
- Superseded revision: muted/locked
- Unresolved: explicit, not hidden
- Selected item: high visibility without obscuring source drawing

Do not rely on color alone.

## Scale UX

Scale status is always visible.

```text
UNSET
DETECTED — CONFIRM
CONFIRMED
CONFLICT — REVIEW
```

Measurement tools requiring dimensions are disabled/refuse when scale is invalid.

## Review Queue

A side panel or Attention Center may group:
- agent proposals;
- scale conflicts;
- overlapping measurements;
- unresolved symbols;
- drawing/schedule mismatch;
- superseded drawing work;
- quantity delta needing approval.

## Human Correction

Selecting a proposal should expose:
- source sheet/revision;
- original geometry;
- proposed item;
- confidence/evidence;
- edit controls;
- Accept;
- Correct;
- Reject / Withhold;
- Ask / RFI.

After correction, original proposal remains traceable.

## Agent Workbench

The agent is not a floating generic chatbot.

Context-aware actions:
- Explain this measurement
- Find similar symbols
- Resolve this tag
- Check schedule
- Compare revisions
- Draft RFI
- Find unmeasured scope
- Review duplicates
- Summarize quantity delta

Every answer should cite drawing/schedule/QTO records where available.

## Mobile

Mobile is review/capture oriented rather than the primary large-format takeoff surface:
- inspect measurement;
- approve/reject where authorized;
- view marked crop;
- add note/photo;
- answer RFI;
- review totals.

Large geometry editing remains optimized for desktop/tablet unless usability tests prove otherwise.

## Premium FDG Design

Use the established FDG visual standard:
- premium, non-generic;
- clear technical hierarchy;
- near-full-bleed project/drawing context when appropriate;
- transparent live-data overlays;
- Attention Center;
- responsive;
- real interactions, not static screenshot pans.

The design must not obscure measurement precision for decorative effects.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-002_ENGINEERING_DASHBOARD_AND_OPERATIONAL_VISIBILITY_STANDARD|FEIS Dashboard Standard]] → this UX blueprint.
