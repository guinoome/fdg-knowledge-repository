---
tags: [candidate, tier-d, status/draft]
---

# FDG Ecosystem 5-Layer Organizational Model

**Status:** Draft → Reviewed → Approved (update as it moves)
**Origin:** Proposed by Francis in conversation 2026-08-04/05, audited against the actual repository, refined through several rounds of Q&A in the same conversation. See `Journal/2026-08-04.md`.

## Purpose

Establish a second map of the FDG Ecosystem, alongside `NEX-STD-026 Repository Structure Standard`, answering a different question. NEX-STD-026 answers *"where does a document get filed."* This model [...]

## Context

Audited every layer of the proposed diagram against the ~200 documents actually opened this session, then resolved every open question directly with Francis rather than assumed. Layer 0 and most of La[...]

## Engineering Reasoning

Two maps of the same repository are not a conflict as long as each answers a question the other doesn't, and neither silently overrides the other. NEX-STD-026 stays authoritative for physical document[...]

## Supporting Evidence — the resolved model

**Layer 0 — Founder & Governance.** Fully built. Maps to NEX-STD-026 Layers 1–2.
- Founder → `02_Identity/USER.md`, `00_Nex/CONSTITUTIONAL_AUTHORITY.md`
- FDG Constitution → `01_Governance/NEX-STD-005_CONSTITUTION.md`
- Engineering Principles → `01_Governance/NEX-STD-004_OPERATING_PRINCIPLES.md`
- Standards & Governance → `01_Governance/` (5 standards)
- Organizational Architecture → `06_Organizational_Architecture/` (11 standards)

**Layer 1 — FDG Ecosystem.** Half built, half confirmed future.
- Identity → `02_Identity/` — built
- Knowledge Repository → this repository, governed by `04`/`05` — built
- Integration Framework → `09_FDG_Platform_Hub/FDG-PH-STD-008` — built, though `09`'s entry document is Draft status, not Approved
- Platform Registry — **confirmed future**, no repository equivalent exists
- Shared Services — **confirmed future**, no repository equivalent exists

**Layer 2 — FDG CORE Intelligence.** Core is real; most named sub-systems are future.
- CORE Intelligence → `FDG-CORE-STD-001` — built
- Decision Intelligence → `FDG-CORE-STD-006` — built
- Engineering Intelligence → `FDG-CORE-STD-005` — built
- Memory Intelligence → `FDG-CORE-STD-007` — built
- Learning Intelligence → `FDG-CORE-STD-011` — built
- `FDG-CORE-STD-004` (Review & Compliance) and `FDG-CORE-STD-008` (Evidence & Provenance) — **confirmed to fold under the CORE Intelligence umbrella**, no separate named category needed
- Agent Intelligence → **confirmed to already live inside `07_Nex_Core_Intelligence`** (75 documents, not individually inventoried this session)
- Knowledge, Automation, Business, Analytics, Search, Document Intelligence — **confirmed future**, none built yet at this layer
  - **Business Intelligence specifically:** `FDG-PH-STD-009` already exists, but in `09_FDG_Platform_Hub`, not here. Staying there — not moved. Currently low-content ("vacant or less data," per Fran[...]

**Layer 3 — Domain Platforms.** One platform real and running; the rest future.
- FBPOIS → `16_FDG_Building_Plant_Operations_Intelligence_System/` — **the main Intelligence system at this layer**, confirmed
  - FWIS → sub-system, `Projects/Active/FWIS/` — **the one currently being built** (dashboard, 457/458 assertions passing)
  - FMIS → sub-system, referenced in vision documents, **not started**
  - FAIS, FUIS — **confirmed future**
- FEIS → `08_FEIS_Engineering_Intelligence_Systems/` — built
  - Mechanical → `08_FEIS.../00_Mechanical Engineering Intelligence/` — built
  - Electrical, Civil, Plumbing, Fire Protection, Renewable Energy — not built, no subfolders exist
- FBIS, FWFIS — never found in this session's audit, not confirmed either way

**Layer 4 — Users.** Confirmed future, deliberately sequenced.
- No ecosystem-wide standard exists. Closest is `16_FBPOIS/04_User_Roles/`, scoped to FBPOIS only.
- **Confirmed:** this layer is intentionally built *after* Layer 3 finishes testing — not a gap to fix now, a sequencing decision already made.

## Key Assumptions

- Assumes NEX-STD-026 remains authoritative for document placement without exception — this model never overrides it.
- Assumes "Agent Intelligence lives in `07_Nex_Core_Intelligence`" without having inventoried which of its 75 documents specifically covers it — confirmed conceptually by Francis, not confirmed by d[...]
- Assumes the Business Intelligence cross-reference (Platform Hub ← Core) is a documentation link to be added once the Layer 2 version exists, not an immediate action item.

## Decision / Conclusion

Adopt this 5-layer model as a **complementary organizational map**, not a replacement for NEX-STD-026. Every item confirmed "future" in this document is a placeholder for planned work, not a document [...]

## Expected Future Value

Gives the ecosystem an operating/systems view — Founder → Ecosystem → Intelligence → Platforms → Users — for onboarding, roadmap planning, and explaining "how does this whole thing work" i[...]

---
**Review notes:** (Nex / collaborator fills in against the Capture Validation Checklist, NEX-STD-020)

**Approval:** (Francis — Approved / Revision Required / Rejected, with date)
