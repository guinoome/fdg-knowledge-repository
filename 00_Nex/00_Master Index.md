# Nex Core v1.0

> The Engineering Standard Manual of the FDG Ecosystem

---

## Purpose

Nex Core is the authoritative engineering governance manual for the FDG Ecosystem.

Its purpose is to preserve organizational intelligence, maintain engineering consistency, and guide the evolution of the FDG Ecosystem.

Nex Core is the primary knowledge authority used by Nex before analyzing, recommending, or evolving any engineering, architectural, organizational, or strategic decision.

---

# Core Principles

- Nex never redesigns an approved system from memory.
- Nex reviews the current approved knowledge before thinking.
- Previous approved decisions establish the current baseline.
- New evidence may evolve the baseline but never erase its history.
- Every major evolution requires Review & Approval before becoming the new standard.
- Execution systems manage the present.
- Knowledge systems preserve the future.
- Nex converts experience into reusable intelligence.
- Organizational capability is more valuable than tool-specific optimization.

---

# Document Structure

## 01 Governance

Defines how Nex operates.

Contents:

- Mission
- Constitution
- Operating Principles
- Review Protocol
- Decision Evolution Standard
- Document Control

---

## 02 Identity

Defines who Nex and the user are.

Contents:

- USER
- SOUL
- IDENTITY
- Collaboration Framework

---

## 03 Agentic Framework

Defines how work flows through the FDG Ecosystem.

Contents:

- Agentic Stack
- Directive Layer
- Orchestration Layer
- Execution Layer
- Knowledge Layer

---

## 04 Knowledge Standards

Defines how knowledge is captured, reviewed, connected, and preserved.

Contents:

- Knowledge Preservation
- Decision Standards
- Lessons Learned Standard
- Maps of Content Standard
- Naming Convention

---

## 05 Templates

Standard document templates.

---

## 06 Approved Decisions

Approved Architecture Decision Records (ADRs).

---

## 99 Archive

Superseded standards retained for traceability.

---

# Document Structure — Verified Extension (2026-08-04)

The section above is preserved unchanged, per `NEX-BOOTSTRAP.md`'s Repository Protection Rules: *"Never overwrite existing standards... Extend architecture. Do not redesign architecture."* It is not deleted or corrected in place — it's extended here instead.

**What's true about it:** it describes an earlier, smaller intended structure. Three of its named sections — 05 Templates, 06 Approved Decisions, 99 Archive — have no corresponding folder anywhere in the current repository. Whether that's abandoned scope or still-intended future work isn't something I can determine from the repository alone — worth a decision from the Founder rather than an assumption here. If still wanted: Templates has a natural home already under `05_Knowledge_Architecture` (which owns `KNOWLEDGE_ASSET_TEMPLATE_STANDARD.md`); Approved Decisions and Archive would need folders created.

**What's also true:** the repository grew to include nine additional sections (06, 07, 08, 09, 10, 11, 12, 16, 17) plus Projects and a personal capture layer (originally a `Second_Brain/` folder, later flattened — see that section below), none of which appeared above. This extension adds them. Every entry link below was opened and verified directly — not inferred from filename pattern alone.

**Graph-linking Work Package status (2026-08-06):** each section entry document below now has a "Contents" block wikilinking every verified sibling in its own folder — sections 01–10 (all included) plus the stable parts of 16_FBPOIS. This closes the disconnected-document problem visually confirmed via an Obsidian graph screenshot earlier this session. Sections 11 and 12 (added 2026-08-06) were found to already be internally self-linked by their own authors — no Phase 1 work needed there, only connecting them to this top-level index. Section 17 (FPIS, added 2026-08-11) had the same relative-path link bug as FSIS; fixed during integration. Still explicitly deferred: deep in-body cross-reference linking beyond each section's own entry document (the originally-scoped "Phase 2" — only `01_Governance` is fully done as of this pass).

## 00 Nex

This document's own home — Nex's operating authority.

- [[00_Nex/CONSTITUTIONAL_AUTHORITY|Constitutional Authority]] — defines the Founder as Constitutional Authority and Nex as Engineering Intelligence Authority; verified.
- [[00_Nex/NEX-BOOTSTRAP|Bootstrap]] — the repository initialization procedure every collaborator should follow; verified, and the source of the extend-don't-overwrite rule this extension follows.
- [[00_Nex/REVIEW_PROTOCOL|Review Protocol]] — verified.

## 01 Governance

*Added 2026-08-05 — the section above named this folder but never linked into it. 5 standards.*

Entry, verified, now with a full Contents block linking all siblings: [[01_Governance/NEX-STD-005_CONSTITUTION|Constitution]] (NEX-STD-005)

## 02 Identity

*Added 2026-08-05, same reason as above. 5 documents.*

Entry, verified, Contents block already complete (all 4 siblings were already named in the source document): [[02_Identity/00_IDENTITY_MODEL|Identity Model]] (NEX-STD-123; reassigned 2026-08-29 to resolve the duplicate NEX-STD-006 identifier)

## 03 Agentic Framework

*Added 2026-08-05, same reason. 7 documents.*

Entry, verified, Contents block already complete: [[03_Agentic Framework/00_AGENTIC_MODEL|Agentic Model]] (NEX-STD-011)

## 04 Knowledge Management

*Added 2026-08-05, same reason. 7 documents — this section actually gained a file since the original extension: `00_KNOWLEDGE_MODEL.md` (NEX-STD-018) didn't exist yet when this page was first corrected.*

Entry, verified, now the correct entry point (supersedes the earlier use of `KNOWLEDGE_LIFECYCLE.md`, which was a reasonable stand-in before this file existed): [[04_Knowledge_Management/00_KNOWLEDGE_MODEL|Knowledge Model]] (NEX-STD-018)

## 05 Knowledge Architecture

*Added 2026-08-05, same reason. 11 standards — including the Linking Standard (NEX-STD-032) and Map of Content Standard (NEX-STD-027) governing this whole linking effort.*

Entry, verified, Contents block built fresh (original cited only 3 of 10 siblings): [[05_Knowledge_Architecture/00_ARCHITECTURE_MODEL|Knowledge Architecture Model]] (NEX-STD-025)

## 06 Organizational Architecture

Defines roles, responsibility, delegation, decision authority, and the Work Package as the unit of engineering execution. 11 standards. Includes `NEX-STD-044 Work Package Standard`.

Entry, verified: [[06_Organizational_Architecture/00_ORGANIZATIONAL_ARCHITECTURE_MODEL|Organizational Architecture Model]] (NEX-STD-036)

## 07 Nex Core Intelligence

The largest section — 76 standards defining Nex's own operating capability: context and memory architecture, decision intelligence, knowledge graph, quality assurance, engineering analytics, and FEIP integration.

Entry, verified: [[07_Nex_Core_Intelligence/NEX_OPERATING_CONSTITUTION|Nex Operating Constitution]] (NEX-STD-048)

## 08 FEIS — Facility Engineering Intelligence Systems

18 platform-module standards (FEIP-STD-001 through 018) plus a Mechanical Engineering Intelligence subsection.

Entry, verified: [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-001_PLATFORM_ARCHITECTURE_AND_MODULE_DESIGN_STANDARD|Platform Architecture and Module Design Standard]]

**Found 2026-08-05:** the Mechanical Engineering Intelligence subsection previously had 3 files; a re-check this session found only 2 — `FEIS-MECH-0000.md` is no longer present. Per Francis: planned for a future pass, not an error.

## 09 FDG Ecosystem Integration Hub

12 standards for the platform layer connecting FDG's applications.

Entry, verified: [[09_FDG_Ecosystem_Integration_Hub/FDG-PH-STD-001_PLATFORM_HUB_ARCHITECTURE_STANDARD|Ecosystem Integration Hub Architecture Standard]] — **Status: Draft**, unlike every other section's entry checked, which were all Approved.

## 10 FDG CORE Intelligence

12 standards — calculation, optimization, review/compliance, decision, memory/context, evidence/provenance, orchestration, and continuous learning engines. This is the active "CORE Engineering" build.

Entry, verified: [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD|Core Intelligence Architecture Standard]]

## Domain roadmap, 11-17, confirmed by Francis 2026-08-06/08-11

| # | Code | System |
|---|---|---|
| 11 | FBIS | Business Intelligence |
| 12 | FSIS | Security Intelligence |
| 13 | FLIS | Legal Intelligence — not built yet |
| 14 | FISS | FDG Intelligence Services System — not built yet |
| 15 | FCIS | FDG Collaboration Intelligence System — not built yet |
| 16 | FBPOIS | Building Plant Operations Intelligence |
| 17 | FPIS | Platform Intelligence — added 2026-08-11 |

## 11 FDG Business Intelligence System (FBIS)

*Added 2026-08-06.*

Own domain platform for business-side organizational intelligence (governance, identity, strategy, decision support). Already well-built internally.

Entry, verified: [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index|FBIS Master Index]]

**Current build state, per the entry document's own roadmap:** only 3 of 18 planned subfolders exist yet — `00_FBIS_Home` (17 files), `01_Business_Governance` (16 files), `02_Business_Identity` (12 files). The other 15 sections are explicitly marked "To be developed" in the source document itself.

## 13-15 — Roadmap, confirmed 2026-08-06

Not built yet, not a random gap — planned numbering per Francis:

- **13 FLIS** — FDG Legal Intelligence System
- **14 FISS** — FDG Intelligence Services System
- **15 FCIS** — FDG Collaboration Intelligence System

## 12 FDG Security Intelligence System (FSIS)

*Added 2026-08-06.*

A cross-cutting security domain — not a peer domain platform. Core doctrine: *"Maximum authorized capability with minimum necessary exposure."*

Entry, verified: [[12_FDG_Security_Intelligence_System/00_FSIS_Home/FSIS-0001 - FSIS Home|FSIS Home]]

**Linking fixed 2026-08-06:** the original `../` relative-path syntax in all 15 subfolder indexes and the hub file was converted to full vault-relative paths.

## 16 FBPOIS — Facility & Building Plant Operations Intelligence System

Architecture, FWIS specification set, shared data platform, workflow engine, user roles, and API.

Entry: [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/00_Architecture/FBPOIS-ARCH-0001 - Vision & Scope|FBPOIS Vision & Scope]]

**`FBPOIS-ARCH-0000` — confirmed future, not broken.** Per Francis: planned, not yet built.

## 17 FDG Platform Intelligence System (FPIS)

*Added 2026-08-11. Integrated from uploaded `17_FDG_Platform_Intelligence_System/` folder.*

A **parallel Intelligence System** focused on understanding and improving FDG platforms themselves — not a domain system and not FDG CORE. FPIS answers: what platforms exist, what is their state, who uses them, how are they performing, what value do they generate, and what should each become next?

FPIS monitors all existing platforms (FBPOIS, FBIS, FSIS, FEIS, Platform Hub) and future ones as they are built, without duplicating their source-of-truth responsibilities.

Entry, verified: [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS Home]]

**12 sections, all with Master Index files:** Platform Registry, Architecture Intelligence, Lifecycle Intelligence, Performance & Value Intelligence, User/Usage/Subscription Intelligence, Innovation & Evolution Intelligence, Experience & Design Intelligence, Decision Intelligence, Knowledge & History, Roadmap, Standards & Ecosystem Links.

**Internal linking fixed 2026-08-11:** all 12 `00_Index.md` files used `[[../00_FPI_Home]]` relative-path syntax, and internal links used `[[subfolder/file]]` without the full vault prefix — both patterns do not resolve in Obsidian wikilinks, which require full vault-relative paths. Converted to `[[17_FDG_Platform_Intelligence_System/...]]` paths throughout during integration.

## Projects/Active

Where specs become running code.

- [[Projects/Active/FWIS/README|FWIS]] — the production build, 458 total assertions (457 passing, 1 known non-blocking failure). Recovered 2026-08-06 after accidental deletion; verified byte-exact via codeload.github.com archive at the pre-deletion commit.
- [[Projects/Active/FWIS-Shift-Turnover-Prototype/README|FWIS Shift Turnover Prototype]] — verified.

## Second Brain (flattened 2026-08-04)

Tier E personal capture layer — `People/`, `Journal/`, `Candidates/`, `Projects/CORE Engineering.md`, `notes.md`, and `FDG Ecosystem.md` sit directly at repository root.

Entry: [[FDG Ecosystem]]

## Also found during this verification pass, not fixed here

- `02_Identity/00_IDENTITY_MODEL.md` is labeled `Document ID: NEX-STD-006` — the same ID already used by `01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK.md`. Two approved documents sharing one ID. A Document Control (NEX-STD-002) matter, flagged not resolved.

---

# Three Organizational Layer Models (segregated, not merged, 2026-08-05)

Three different documents in this repository each describe "layers" of the FDG Ecosystem. They answer different questions and should stay separate rather than be forced into one unified model.

**"Where does a document belong?"** → [[05_Knowledge_Architecture/REPOSITORY_STRUCTURE_STANDARD|Repository Structure Standard]] (NEX-STD-026). A filing taxonomy.

**"How does organizational capability improve over time?"** → [[06_Organizational_Architecture/00_ORGANIZATIONAL_ARCHITECTURE_MODEL|Organizational Architecture Model]] (NEX-STD-036), "Organizational Layers" section. A cycle: Engineering Vision → Governance → Organizational Architecture → Knowledge Repository → Engineering Operations → Projects → Execution → Learning → Organizational Intelligence.

**"What exists, and who's involved?"** → `Candidates/fdg-ecosystem-5-layer-model.md` (Tier D, not yet promoted). A stakeholder/system map: Founder & Governance → FDG Ecosystem → FDG CORE Intelligence → Domain Platforms → Users.

**Why three, not one:** `NEX-STD-036` states its own governing principle directly — *"Each building block has one primary responsibility."* A filing system, a capability-improvement cycle, and a stakeholder map are three different responsibilities.

---

# Operating Lifecycle

Engineering Objective

↓

Review Current Approved Knowledge

↓

Determine Current Baseline

↓

Analyze New Evidence

↓

Proposal

↓

Engineering Review

↓

Approval

↓

Baseline Updated

↓

Future Work Begins Here

---

**Current Version:** v1.0

**Status:** Approved

**Knowledge Authority:** FDG Knowledge Repository

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → this document

## Direct Child Documents

- [[00_Nex/00_Nex_Master_Index|00 Nex Master Index]]
