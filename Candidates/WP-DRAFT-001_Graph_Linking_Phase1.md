---
tags: [work-package, tier-d, status/draft]
---

# Work Package: Repository Graph Linking — Phase 1 (Section-Level)

Document Type: Work Package (per NEX-STD-044 Work Package Standard)
Version: 0.1 — Draft, unassigned ID
Status: Draft — not yet reviewed, not yet approved, not yet assigned into execution
Owner: Francis
Prepared by: Claude, 2026-08-04/05

**Filing note, flagged not decided:** NEX-STD-044 doesn't specify where an active or completed Work Package document itself gets filed once approved — no dedicated "Work Packages" folder was found anywhere in the repository this session. Sitting in `Candidates/` for now, consistent with everything else awaiting review this session. Worth a decision, not an assumption.

---

## 1. Objective

Make the repository's knowledge graph reflect its actual structure. Currently, every section's entry document links out to nothing inside its own folder — visually confirmed by an Obsidian graph screenshot showing one small connected cluster (this session's additions) surrounded by roughly 200 disconnected documents. The documents aren't unrelated; they're just not linked as such.

## 2. Background

Root cause, confirmed by direct inspection: standard documents across `01`–`16` reference each other in plain prose — *"Related Documents: NEX-STD-017, NEX-STD-040..."* — rather than as Obsidian wikilinks. Obsidian's graph can only render a relationship it can parse as a link; prose mentions are invisible to it regardless of how clearly the document states the relationship. `NEX-STD-032 Linking Standard` already requires this connectivity in principle (*"Every significant knowledge asset should link to its governing standards, its related knowledge, its parent Map of Content"*) — this work package is compliance with an existing rule, not new policy.

## 3. Scope

**Included (this Work Package):**
- Add a "Contents" block to each section's entry document, wikilinking every file verified to exist directly inside that section, using the file listings already gathered this session.
- Sections covered: `00_Nex`, `01_Governance`, `02_Identity`, `03_Agentic Framework`, `04_Knowledge_Management`, `05_Knowledge_Architecture`, `06_Organizational_Architecture`, `08_FEIS_Engineering_Intelligence_Systems` (incl. its Mechanical subfolder), `09_FDG_Platform_Hub`, `10_FDG_CORE_Intelligence`, `16_FBPOIS` (all 6 subfolders).

**Explicitly excluded (deferred to Phase 2, a separate Work Package):**
- `07_Nex_Core_Intelligence` — 75 files, none individually inventoried this session beyond the entry document. Needs its own scoping pass before linking, not folded into this one.
- Converting in-body prose cross-references (*"Related Documents: NEX-STD-017"*) into wikilinks — requires full-content reads of every document, not just entry points.
- Any content changes, corrections, or ID-collision fixes discovered along the way — logged as findings, not resolved inside this Work Package.

## 4. Inputs

- Required standard: `NEX-STD-032 Linking Standard` (verified 2026-08-04, ID confirmed directly)
- Required standard: `NEX-STD-027 Map of Content Standard` (verified, ID cross-confirmed via NEX-STD-032's own citation)
- Required reference: file listings for all 11 sections in scope, already gathered this session via direct repository reads — not re-verification, reuse of already-confirmed data
- Required reference: `00_Nex/00_Master Index.md`, already extended 2026-08-04 with verified entry-point links per section

## 5. Constraints

- Per `NEX-BOOTSTRAP.md`: extend existing documents, never overwrite. Every entry document's existing content stays intact; the Contents block is additive.
- Per `NEX-STD-032`'s Authoritative Source Rule: links point to files, never duplicate their content.
- Per this session's standing priority order (Correctness > Reliability > Security > Maintainability > Cost, `NEX-STD-048`): a wrong or broken link is worse than a missing one — every link gets checked against an actual verified filename before being written, not typed from memory of the folder listing.
- GitHub MCP write access is still unresolved as of this session — output will need the same manual zip/extract path used for everything else this session, unless that gets fixed first.

## 6. Deliverables

- One updated entry document per section (11 files), each gaining a "Contents" section listing every file in that folder as a wikilink.
- A short summary noting any file found during this pass that didn't match what was recorded in the Master Index (a second-order verification, since building real links forces re-touching each folder).

## 7. Acceptance Criteria

**Definition of Done:** every file in the 11 in-scope sections is reachable via a real wikilink from its section's entry document.

**Quality expectations:** links use verified filenames, not reconstructed from memory; no section's original content is deleted or reordered, only extended.

**Verification requirements:** for each of the 11 sections, re-list the folder contents directly and diff it against the links written, confirming 1:1 coverage with nothing missing and nothing fabricated. This check is a required part of calling the package done — not optional post-hoc review.

## 8. Dependencies

- Depends on the file listings already gathered this session remaining accurate — if Francis or Nex has added/removed files in any of the 11 sections since this session's exploration, those listings need a quick re-check before linking, not an assumption they're still current.
- Does not depend on the GitHub write-access issue being resolved — can be delivered via manual zip regardless.

## 9. Risks

- **Scale risk:** even scoped to 11 sections (not all 16), this still touches ~125 files' worth of listing data across 11 documents in one pass — real risk of a transcription error (wrong filename, wrong folder) if rushed. Mitigated by the verification requirement in §7, not by care alone.
- **Staleness risk:** file listings were gathered at various points across a long session — if the repository changed mid-session (unlikely, given GitHub writes were blocked throughout, but not impossible if changes happened outside this conversation), the listings could be stale. Mitigated by re-listing at execution time per §7, not reusing session memory uncritically.
- **Scope-creep risk:** the temptation to "just quickly fix" the NEX-STD-006 ID collision or the FBPOIS dangling references while already inside these files. Explicitly out of scope per §3 — findings get logged, not fixed inline, consistent with how every other finding this session was handled.

## 10. Knowledge Capture

**Lessons learned:** to be filled at completion.
**Repository updates:** the 11 entry documents listed in §6.
**Standards affected:** none — this executes NEX-STD-032, doesn't amend it.
**Future improvements:** Phase 2 (in-body cross-reference linking) and the 07_Nex_Core_Intelligence scoping pass both get logged as follow-on Work Packages here once this one completes — see [[Candidates/README]] for the promotion path if either surfaces something worth carrying forward as a standard rather than just an update.

---

**Review notes:** (Nex / collaborator fills in against the Work Package Quality Checklist, NEX-STD-044)

**Approval:** (Francis — Approved / Revision Required / Rejected, with date)
