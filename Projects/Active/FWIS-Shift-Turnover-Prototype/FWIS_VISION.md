# FWIS Vision & Product Philosophy

Reference document. Loaded on demand from `CLAUDE.md`, not every session — this is the "why," not working memory. Merged from the ChatGPT and Gemini drafts of the original high-level instructions (kept in `Raw Instructions/`); nothing here is binding on implementation the way `CLAUDE.md` is.

---

## Purpose

FWIS is the Engineering Operations Hub for complex facilities — hotels, integrated resorts, hospitals, malls, airports, commercial buildings. It transforms scattered operational communications and data into structured engineering intelligence.

The objective is simple: **the Chief Engineer only opens FWIS.** It becomes the single source of operational truth, without replacing the communication tools engineers already use — it consolidates what happens in those tools into structured, searchable records.

## Engineering philosophy

Technology is replaceable. Engineering capability is permanent. FWIS exists to preserve institutional knowledge, standardize workflows, and support data-backed operational decisions across MEPF disciplines. Every feature should improve engineering response time, reduce operational friction, preserve knowledge, and scale toward the enterprise architecture without requiring a rebuild to get there.

## Communication sources (target intake list — not all required for the first milestone)

Email (Outlook / Gmail), Microsoft Teams, Viber, Messenger, shared network folders, Google Drive, Excel, Google Sheets, PDF, Word, images, video.

Future: WhatsApp, SMS, Building Management Systems, SCADA, IoT devices, other enterprise systems.

## Data philosophy — the structured record

Every operational event becomes a structured, queryable record instead of raw text.

| Raw communication | Structured FWIS record |
|---|---|
| "Pump 3 stopped." | Equipment: CHW Pump 03 · System: MEPF–Mechanical · Plant/Area: Central Utility Plant · Timestamp · Priority · Reported By · Assigned To · Status · Temporary Action · Permanent Corrective Action · Closure Info |

Intake pipeline shape (target, once sync exists):

```
Communication Sources → Sync → Intake Engine → Classification
    → Structured Record → Workflow Assignment → Dashboard → Knowledge Repository
```

## Chief Engineer dashboard

Should answer, without opening another application: What happened? What is happening? What needs attention? What's overdue? What needs escalation?

Target modules: operational summary, critical incidents, plant/utility status, outstanding concerns, shift turnovers, open workflows, pending approvals, announcements, KPI summary.

## Search

Enterprise-wide search across equipment, building, property, room, plant, utility, incident, technician, department, date, status, keyword, and attachments. Core function, not an add-on.

## UI

Professional, fast, information-dense, minimal. Light and dark mode. Avoid decorative animation.

## AI philosophy

Engineering data comes first, AI comes later. This milestone builds clean, structured data — it does not depend on AI for core operation. Future candidates: operational summaries, incident classification, predictive analytics, knowledge retrieval, workflow assistance.

## Success criteria

- The Chief Engineer only needs FWIS for daily operations.
- Engineering staff stop searching multiple platforms for the same information.
- Operational information organizes itself with minimal manual entry.
- Engineering knowledge is preserved permanently and is searchable.
- Success is measured by operational effectiveness, not feature count.

## Long-term vision — FBPOIS

FWIS is the operational foundation of the Facility & Building Plant Operations Intelligence System, within the FDG Ecosystem. Future integration targets: FMIS (Facility Maintenance Intelligence System), Asset Management, Preventive/Corrective Maintenance, OPEX/CAPEX, Spare Parts Management, Utilities Monitoring, Energy Analytics, Sustainability & ESG, AI collaborators, Digital Twin, enterprise synchronization, private data center deployment.

Every Phase 1 decision should protect this direction without building toward it prematurely — see `CLAUDE.md`'s Stage 0 / Stage 1 distinction.
