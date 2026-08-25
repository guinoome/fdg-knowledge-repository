---
tags: [moc, second-brain, home]
---

# FDG Ecosystem — Center

This is the single entry point. Everything in the vault is reachable within a click or two from here.

**Structure note (2026-08-04):** this used to live inside a `Second_Brain/` wrapper folder. That wrapper is gone — everything below is now a direct subfolder of the repository root, same as `00_Nex`, `02_Identity`, and the rest. The Tier E separation is preserved through tagging and explicit labeling, not through folder nesting.

**Audit basis (2026-08-04):** every specific claim in this file — file counts, test-pass numbers, plugin identification, authorship — was checked by directly opening the source file or, where the claim is about something outside this repository, an external citable source. Where something could not be fully verified, it's stated as such below rather than presented with unearned confidence.

## Start here — this layer (Tier E, personal, unvalidated)

- [[Projects/CORE Engineering]] — active build, working notes (not yet in `Projects/Active/` — moves there once real implementation starts)
- [[People/Founder]] · [[People/Nex]] · [[People/Collaborators]]
- [[Journal/2026-08-04]] — today
- [[notes]] — inbox, unsorted
- [[Candidates/README|Candidates]] — promoting Tier E to D to C

## The governed repository

**[[00_Nex/00_Master Index|Nex Core Master Index]]** — the authoritative entry to every section (00 through 17), each of which also links directly here. Start there for anything governed rather than looking for a duplicate list here — per `NEX-STD-032 Linking Standard`, link to the authoritative source instead of copying it.

A few high-traffic destinations, each opened and read directly, not assumed from filename:

- [[01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK|Knowledge Governance Framework]]
- [[02_Identity/USER|USER — Founder identity]]
- [[02_Identity/IDENTITY|IDENTITY — Nex identity]]
- [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|FDG CORE Intelligence]]
- [[11_FDG_Business_Intelligence_System/00_FBIS_Home/FBIS-0000 - FBIS Master Index|FDG Business Intelligence System]] — added 2026-08-06, early-stage (3 of 18 planned sections built)
- [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FDG Security Intelligence System]] — added 2026-08-06, cross-cutting security domain
- [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FDG Platform Intelligence System (FPIS)]] — added 2026-08-11, monitors and improves all FDG platforms
- [[03_Agentic Framework/00_AGENTIC_MODEL|Agentic Framework]] — how work flows through the ecosystem
- [[04_Knowledge_Management/00_KNOWLEDGE_MODEL|Knowledge Management]] — how knowledge is captured and preserved
- [[05_Knowledge_Architecture/00_ARCHITECTURE_MODEL|Knowledge Architecture]] — how the repository is structured
- [[07_Nex_Core_Intelligence/NEX_OPERATING_CONSTITUTION|Nex Core Intelligence]] — Nex's own 76-standard operating intelligence layer

**Known issue, not fixed here:** `02_Identity/00_IDENTITY_MODEL.md` and `01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK.md` both carry `Document ID: NEX-STD-006` — two approved documents sharing one ID. A Document Control (NEX-STD-002) matter.

## Where specs become code

- **[[Projects/Active/FWIS/README|FWIS]]** (production). Recovered 2026-08-06 after accidental deletion; verified byte-exact via git history.
  - `src/` holds `intake/`, `modules/`, `screens/`, `sync/` plus 11 top-level JS files
  - `supabase/` holds schema and RLS policies
  - `verify/` holds 10 files: 4 `.html` test harnesses, 6 `.mjs` test scripts
  - **458 total assertions, 457 passing, 1 known failure** (Google Fonts CDN, non-blocking)
- **[[Projects/Active/FWIS-Shift-Turnover-Prototype/README|FWIS Shift Turnover Prototype]]** — `Raw Instructions/` folder holds the original ChatGPT and Gemini drafts from this project's origin.
- `07_Nex_Core_Intelligence`, `08_FEIS`, `09_FDG_Ecosystem_Integration_Hub`, `10_FDG_CORE_Intelligence`, `11_FDG_Business_Intelligence_System`, `12_FDG_Security_Intelligence_System`, `17_FDG_Platform_Intelligence_System` have no `Projects/Active/` entry yet — builds haven't started, not a defect.

## How this works

Capture here first, tags-first, whatever's on your mind. Nothing needs sorting before it's written. Tag something `#candidate` when it clears the capture bar in [[04_Knowledge_Management/KNOWLEDGE_CAPTURE_STANDARD|NEX-STD-020]] and walk it through [[Candidates/README|Candidates]]. Most of what lands here shouldn't make that trip — that's by design, not a gap.
