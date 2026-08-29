# Pre-GitHub Repository Architecture & Integrity Baseline

Audit date: 2026-08-29  
Repository: `guinoome/fdg-knowledge-repository`  
Local branch: `main`  
Scope: complete local repository, working tree, and refreshed `origin/main`  
Authority: audit findings are evidence and recommendations, not new Founder-approved policy.

## 1. Executive conclusion

**BLOCKED — HUMAN DECISION REQUIRED.** The committed local and GitHub histories are identical, but the working tree contains a large, unstaged architecture migration: 181 modified entries, 52 deletions, and 314 untracked entries at the final check. The repository contains valuable new systems and a documented FBIS move/merge, but it is not safe to commit as one undifferentiated change set.

## 2. Local repository current state

Verified inventory: 918 files excluding `.git`, vendored Obsidian plugins, and `node_modules`; 827 are Markdown and 91 are other assets. There are 395 directories and two empty directories. No changes are staged. The vault contains numbered systems 00–22; system 15 is an empty placeholder.

## 3. GitHub current state

`git fetch --prune origin` completed. Local `HEAD` and `origin/main` both resolve to `4d1ccca62074f520fd61881b82ef0aae273f35a7`; ahead/behind is `0/0`. Four obsolete remote branches were pruned locally. No remote content was changed.

## 4. Local ↔ GitHub reconciliation status

There is no committed divergence. Every material difference is in the local working tree and is therefore **LOCAL MODIFIED**, **LOCAL DELETED**, or **LOCAL ONLY**. There are no verified remote-only or both-modified files at the refreshed commit boundary.

## 5. Top-level system inventory

| Range | Verified condition |
|---|---|
| 00–10 | Foundational Nex, governance, identity, knowledge, organization, FEIS, integration, and CORE structures present |
| 11 | FBIS: 85 Markdown files in the canonical tree plus a 74-file `_OLD` preservation copy |
| 12 | FSIS: 43 Markdown files and manifest/README coverage |
| 13 | FLIS: 48 Markdown files, currently untracked |
| 14 | Service Intelligence: 91 Markdown files, currently untracked |
| 15 | Collaboration Intelligence: empty directory |
| 16 | FBPOIS: 64 Markdown and 5 non-Markdown assets |
| 17 | FPIS: 37 Markdown files |
| 18 | FEXIS: 21 Markdown files |
| 19 | FWAIS: 52 Markdown files plus package manifest; imported package is present and linked through its own wiki index |
| 20 | FPJIS: 37 Markdown and 8 other assets |
| 21 | FMCIS: 20 Markdown files |
| 22 | FAIS: 34 Markdown files, currently untracked |

The reusable audit command is `tools/Invoke-FDGRepositoryAudit.ps1`; it emits inventory, ID, metadata, link, orphan, duplicate-name, and Git-state datasets when run in a normal writable PowerShell environment, and supports `-PassThruOnly` for read-only execution.

## 6. Structural findings

- **KEEP:** numbered system architecture, portable Markdown, local-first Git vault, system-level indexes, manifests where present.
- **MODIFY:** root navigation, lifecycle metadata coverage, archive classification, and machine-checkable review controls.
- **REQUIRES HUMAN APPROVAL:** accepting the FBIS replacement migration, deciding whether `_OLD` remains versioned, and admitting new systems 13, 14, 19, and 22 into the governed baseline.

## 7. Critical gaps

The working set is too large for a single safe approval; FBIS deletion/addition parity needs semantic review; FEXIS lacks governance metadata and links; system 15 is empty; multiple new systems are untracked; software-security evidence remains incomplete for FMIS/FWIS.

## 8. Authority map

Repository evidence places Founder/Francis approval authority in Nex governance and document-control records. `00_Nex`, `01_Governance`, and approved standards are authoritative; system indexes and manifests are structural authorities; drafts, candidates, journals, package notes, `_OLD`, and inboxes are derivative, working, or historical unless explicitly approved. Conflicting authority must remain unresolved pending Founder review.

## 9. Dependency map

`FDG Ecosystem.md` → `00_Nex/00_Master Index.md` → system master indexes → domain indexes → documents. Governance and knowledge architecture govern all systems. FDG CORE and the Integration Hub coordinate cross-system concerns. FSIS supplies security governance; FAIS supplies assurance; FWAIS supplies workflow automation; FPIS evaluates platforms; FPJIS governs project intelligence.

## 10. Duplicate/conflicting knowledge

The exact approved-ID collision between the Identity Model and Knowledge Governance Framework was resolved: governance retains `NEX-STD-006`; identity now uses unused `NEX-STD-123`. Duplicate filenames remain numerous, chiefly 97 `README.md` files and deliberate FBIS current/`_OLD` copies. Filename duplicates are not defects by themselves but make basename-only wiki-links ambiguous.

## 11. Wiki-link audit results

The scanner observed 1,534 wiki-link tokens. Its conservative first pass flagged 298 unresolved and 194 ambiguous tokens, but these figures include escaped-table-pipe and source-relative-path false positives. Verified live FBIS root-navigation failures were repaired. A parser-hardening follow-up is required before treating aggregate counts as release metrics.

## 12. Markdown-link audit results

Only one internal Markdown-link token was detected and it was unresolved. Most repository navigation uses Obsidian wiki-links. External URLs were excluded from internal existence claims; no live HTTP availability test was performed.

## 13. Broken links

Verified active broken links to the nonexistent `FBIS-0000 - FBIS Master Index` were replaced with the canonical `11_FDG_Business_Intelligence_System_Master_Index`. The heading-only `[[FDG Ecosystem — Center]]` target in the live FBIS master index was replaced with `[[FDG Ecosystem|FDG Ecosystem — Center]]`. Preserved `_OLD` links were not rewritten.

## 14. Ambiguous links

Basename-only links to common names such as `README`, `00_Index`, and duplicated FBIS documents may resolve ambiguously. These require contextual review; the audit did not guess targets.

## 15. Orphaned important notes

The conservative graph pass found 486 Markdown files without an inbound wiki-link. This includes templates, archive/working material, and false negatives from relative-link conventions, so it is a review queue rather than a defect count. FEXIS is a verified high-priority disconnected cluster: all 21 documents have no wiki-links.

## 16. Cross-system relationship gaps

New FLIS, Service Intelligence, FEXIS, FWAIS, and FAIS structures are not consistently represented in older root and FPIS navigation. Add reciprocal links only after their governance status and canonical entry documents are approved.

## 17. Index/README/manifest coverage

Coverage is strong but inconsistent. FBIS, FSIS, Service Intelligence, FWAIS, and FAIS have manifests or package records. FLIS relies on README navigation. System 15 has none. FEXIS has README and master index but lacks document control. Not every system uses one consistent root index naming convention.

## 18. Naming/numbering issues

The FEXIS folder is system 18 while its documents describe system 17. FPIS already occupies 17. FWAIS uses a Unicode em dash in its folder name, which is readable but raises scripting/encoding portability risk. System 15 is empty. No mass rename was performed.

## 19. Governance connectivity

The metadata standard requires Document ID, Version, Status, Owner, Approver, and Related Documents for governed assets. Of 827 Markdown files, 171 currently expose a parseable Document ID and 124 contain all six required labels. This is a coverage gap, not authorization to mass-fill unknown values.

## 20. Changes implemented

1. Reassigned Identity Model from duplicate `NEX-STD-006` to unused `NEX-STD-123`, updated version and known direct references.
2. Repaired canonical FBIS links from ecosystem, Nex, FPIS, and FMCIS entry points.
3. Corrected live FBIS parent navigation to target the `FDG Ecosystem.md` file.
4. Added a reusable read-only repository audit utility and this governed baseline.

## 21. Files moved/renamed and link impacts

This audit moved or renamed no files. The pre-existing FBIS migration deletes 52 tracked legacy paths and introduces replacement documents under canonical domains; `MIGRATION_AUDIT.md` and `LOCAL_FOLDER_CLASSIFICATION.csv` document intended destinations. Semantic content parity remains a gate.

## 22. Changes requiring human approval

- Approve or reject the FBIS canonical replacement and disposition of `_OLD`.
- Approve governance admission and numbering for systems 13, 14, 19, and 22.
- Resolve FEXIS system-number identity and Draft Phase 0 controls.
- Decide whether empty system 15 is intentional roadmap space or should receive a placeholder governance record.
- Approve splitting the working tree into reviewable commits.

## 23. Remote-only material

None verified at the refreshed `origin/main` commit boundary.

## 24. Local-only material

314 untracked entries include major bodies of organizational knowledge: FLIS, Service Intelligence, FWAIS, FAIS, the preserved FBIS `_OLD` tree, canonical migrated FBIS documents, manifests, and this audit capability. None are ignored by the checked rules; they will not reach GitHub unless deliberately added in a future authorized commit.

## 25. Files modified on both sides

None verified because local and remote commit heads are identical. Working files are locally modified relative to the shared base.

## 26. Deleted-file analysis

All 52 tracked deletions are under FBIS. Repository evidence classifies them as move/merge inputs into canonical domains and preserves a separate `_OLD` copy. This explains intent but does not prove byte- or meaning-level parity; approval remains blocked until a source-to-destination checklist is reviewed.

## 27. `.gitignore` / excluded knowledge review

The ignore policy excludes tool state, secrets, dependencies, test output, and builds. The only ignored JSON found in the knowledge-oriented review was Obsidian per-machine workspace state. No important Markdown, CSV, manifest, PDF, DOCX, or XLSX knowledge file was identified as unintentionally ignored.

## 28. Untracked-file review

Untracked files are substantive, not disposable build noise. They must be classified into separate logical changes: FBIS migration; each new Intelligence System; FWAIS import; FAIS governance; and audit tooling/artifacts.

## 29. Security/privacy pre-push review

A high-confidence credential-value path scan returned no matches and no tracked secret-named files were found. Secret values were not printed. This is not a full history scan or a substitute for a dedicated secret scanner. FMIS password storage/authorization/audit-transaction concerns and FWIS live PostgreSQL/RLS validation remain unresolved; implementation code was not modified because the mandate prohibits application construction.

## 30. Repository architecture readiness

Conceptually strong, operationally **not ready** for one repository-wide commit. The architecture is local-first and well segmented, but change control, metadata coverage, migration parity, and admission governance lag behind content growth.

## 31. FEIS readiness

FEIS has coherent standards and index coverage. Its many local modifications need isolated review. No FEIS implementation code was changed or validated in this audit.

## 32. FBPOIS readiness

FBPOIS knowledge architecture is present, but FMIS security findings prevent production-readiness claims. Dependency pinning and complete test execution are still required. No implementation code was changed.

## 33. FPJIS readiness where applicable

FPJIS has 37 Markdown and eight supporting assets with a README. It requires relationship and governance review before integration claims; no application readiness claim is supported.

## 34. FAIS integration/readiness

FAIS has a coherent 34-document structure, manifest, governance, methodology, evidence, CAPA, and templates. It is entirely local/untracked and therefore Draft/Review until admitted by the Founder. It should become the owner of future repository integrity evidence after approval.

## 35. Local-first readiness

Strong: Markdown-first knowledge, local files, Git, and explicit indexes remain usable without cloud services. Risks are Obsidian-specific wiki-link semantics, Unicode path handling, and ungenerated audit datasets in restricted write environments.

## 36. Local ↔ Web readiness

Git transport is configured and fetch works. Content parity is blocked by the unreviewed working set, not remote divergence. No push was attempted.

## 37. Integration readiness

Architecture documents exist, but admission status and cross-system contracts are inconsistent. Integrate governed interfaces only after system identity, authority, provenance, rollback, and success criteria are approved.

## 38. Payment interoperability readiness

FBIS contains payment/provider-abstraction knowledge and PayMongo Phase 1 material. These are architectural records, not validated payment capability. Provider independence, security, live validation, and rollback evidence remain required.

## 39. Repository-wide roadmap

1. Founder approves the FBIS source-to-destination migration map and `_OLD` disposition.
2. Split and review local changes by system; never commit all 547 entries as one opaque unit.
3. Admit new systems through a common Phase 0 gate: identity/number, authority, classification, provenance, publication approval, rollback, and measurable success.
4. Harden the link scanner for relative wiki-links, escaped pipes, headings, blocks, and assets; then establish a checked baseline.
5. Close required metadata incrementally when each governed document receives owner review.
6. Validate FMIS security and FWIS PostgreSQL/RLS/browser reproducibility before any production claim.
7. Grow validated operating cases and evidence, not empty domain volume.

## 40. PRE-PUSH GATE RESULT

**BLOCKED — HUMAN DECISION REQUIRED**

Blocking evidence:

- 52 tracked deletions are explained but not semantically approved.
- 314 untracked entries contain major new organizational systems and migration outputs.
- 181 modified entries span multiple architectural boundaries.
- No changes are staged, which is safe, but no reviewable commit boundary exists.
- FEXIS numbering/governance and multiple new-system admission decisions remain open.
- Link scan aggregate requires parser hardening and human triage before it can be a release gate.

No pull, merge, rebase, reset, checkout, stage, commit, or push was performed.

## Remediation record

| Change | Evidence | Files/links affected | Validation | Remaining uncertainty |
|---|---|---|---|---|
| Identity ID → NEX-STD-123 | NEX-STD registry maximum was 122; exact duplicate existed | Identity model, four identity references, root indexes | Exact duplicate-ID scan returns none | Founder acceptance of reassigned ID |
| FBIS canonical target repair | Actual master index exists; `FBIS-0000` does not | Ecosystem, Nex, FPIS, FMCIS | Active-tree stale-target scan returns none | Archived `_OLD` links intentionally retained |
| FBIS ecosystem parent repair | Heading is not a file; `FDG Ecosystem.md` exists | Live FBIS master index | Active-tree heading-only scan returns none | Other aliases require parser triage |
| Audit utility | Mandate requires machine-verifiable inventory and repeatable linting | `tools/Invoke-FDGRepositoryAudit.ps1` | Read-only execution exercised; empty-file defect fixed | CSV/JSON emission could not be exercised in the managed shell, which denies process writes; use normal PowerShell or `-PassThruOnly` |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → this document
