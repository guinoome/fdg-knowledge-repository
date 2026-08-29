# Knowledge Graph Parent Trace Report

Date: 2026-08-29  
Status: Completed structural trace; semantic enrichment remains review-driven

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0300 - Repository and Knowledge Audit|Repository and Knowledge Audit]] → this document

## Result

Every Markdown file in the audited repository now contains at least one wiki-link. Every file other than the ecosystem root has exactly one standardized `Knowledge path` line. Every generated target exists, and every parent chain terminates at [[FDG Ecosystem]].

Every child is also linked explicitly from its assigned mother/index. Validation checks the actual child-parent pairs in both directions; a filename merely appearing in code formatting or manifest text does not count as a backlink.

## Before and after

| Measure | Before | After |
|---|---:|---:|
| Markdown files | 828 | 830 including the relationship map and this report |
| Files containing zero wiki-links | 631 | 0 |
| Files missing a standardized parent path | 827 | 0, excluding the ecosystem root by design |
| Broken generated parent targets | Not applicable | 0 |
| Parent chains not reaching the ecosystem | Not applicable | 0 |
| Missing mother-to-child reciprocal links | Not measured | 0 |

## Parent rule

1. A document uses a Master Index in its own folder when one exists.
2. Otherwise it uses a local README when that README is the established domain entry.
3. Otherwise it uses the system mother file.
4. A system mother file points to `FDG Ecosystem.md`.
5. Historical FBIS `_OLD` content stays attached to its own historical master rather than being presented as current.

The process preserves existing links and content. It adds navigation; it does not assert that every neighboring document is semantically related.

## System-mother visibility

`FDG Ecosystem.md` now includes a complete 00–22 mother map. System 15 is explicitly shown as an unresolved empty node rather than receiving a fabricated target.

## Cross-system visibility

[[05_Knowledge_Architecture/FDG_CROSS_SYSTEM_RELATIONSHIP_MAP|FDG Cross-System Relationship Map]] records the verified governance, coordination, assurance, operating, platform, external-intelligence, project, and automation relationships. It distinguishes navigation from authorization to integrate software or data.

## Remaining review work

- Existing legacy wiki-links still require semantic and anchor-level linting; this pass guarantees the new parent spine, not correctness of every pre-existing link.
- Duplicate basenames such as `README.md` remain safe in generated paths because all new links are fully qualified.
- System 15 requires a Founder decision.
- FEXIS numbering and publication governance remain unresolved.
- FBIS `_OLD` retention/disposition remains a human approval item.
- Parent assignment expresses containment. Add `Depends On`, `Governed By`, `Provides To`, or `Consumes From` only after document-level evidence review.

## Reproducibility

`tools/new_parent_link_patch.py` deterministically emits reviewable `apply_patch` text and never writes files directly. `tools/Invoke-FDGRepositoryAudit.ps1` provides the broader inventory/link/metadata checks.
