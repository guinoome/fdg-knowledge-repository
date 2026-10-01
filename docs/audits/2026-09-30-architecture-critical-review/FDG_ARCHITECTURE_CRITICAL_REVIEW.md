# FDG architecture-critical repository review — 2026-09-30

Document ID: FAIS-RKA-2026-09-30-REVIEW
Version: 1.0
Status: Recorded findings — remediation open
Owner: Francis
Reviewer: Nex / Codex, one review session
Approver: Not claimed
Effective Date: Not a replacement standard
Supersedes: None
Classification: Repository-safe technical findings; no credentials or client records

## Executive conclusion

FDG already has the enterprise functions and intelligence-system boundaries needed for a coherent architecture. Reuse [[06_Organizational_Architecture/NEX-STD-124_ENTERPRISE_OPERATING_MODEL|NEX-STD-124]] and [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|NEX-STD-126]]; creating another top-level intelligence system would duplicate existing responsibility.

The most urgent weakness is the gap between engineering claims and executable evidence. The fire-protection calculator contains reproducible power/pressure and recommendation defects. FWIS documentation describes authorization code absent from the reviewed commit. Navigation and approval metadata also leave competing interpretations of current knowledge.

This is a completed repository review with open remediation, not certification of engineering applications or a fully approved replacement architecture.

## Authorization, baseline and method

The current Founder request authorizes reviewing the GitHub repository, adding useful intelligence and wikilinks, and preserving old knowledge. It supplies authorization for these additive knowledge updates. It does not constitute approval of unreviewed engineering methods, unknown legal facts, or production releases.

- Repository: `guinoome/fdg-knowledge-repository`, branch `main`.
- Reviewed commit: `392c1e29a78f91f9824096ce3552e3ad990e72e2`.
- Review date: 2026-09-30, UTC.
- Complete recursive Git tree: 2,654 entries, 1,968 tracked files; tree response was not truncated.
- All 1,225 Markdown files retrieved and structurally scanned.
- 570 selected source/configuration files retrieved and scanned for architecture and safety-related patterns. This includes one empty Python initializer.
- Focused semantic review of selected passages in 50 governance, architecture, engineering, project and audit notes; targeted source inspection of HydroCal, FWIS schema, business-platform access/billing migrations, and workflow configuration.
- Open PR #1 and #2 file inventories inspected. Neither was merged or changed.
- Three extracted calculator helper paths and the actual Hydraulic.calculate method were exercised in isolated JavaScript. Form validation and browser rendering were not end-to-end tested.

The repository-wide scan is structural. It is not a claim that every application branch, every engineering formula, every attachment, or every historical commit was semantically validated. Binary media/archives were inventoried only. Live databases, deployed apps, external repositories and statutory records were not audited.

## Structural observations

| Check | Snapshot result | Interpretation |
| --- | ---: | --- |
| Wiki references outside fenced/inline code and HTML comments | 5,407 | File-target scan; headings, block IDs and YAML aliases not resolved |
| Unresolved target candidates | 544 | Includes current, imported, historical and project material |
| Ambiguous target candidates | 173 | Basename ambiguity; not all are independently confirmed defects |
| Current-path candidates | 246 unresolved; 99 ambiguous | Path classification, not an approval classification |
| Imported/reference candidates | 245 unresolved | Preserve provenance; do not auto-promote imported notes |
| Historical candidates | 19 unresolved; 74 ambiguous | Retained intentionally; repairs need historical context |
| Project candidates | 34 unresolved | Review against the relevant project's own scope |
| Markdown notes without a resolved wiki inlink | 179 | Markdown navigation may still exist; not proof of orphaning |
| Recognized header document IDs | 246; no duplicates in that recognized set | Mixed metadata formats limit this check |
| Exact Approved headers without a populated effective date | 156 | Review queue; dates/approvals must not be invented |

These counts use the accompanying snapshot scanner. They are not directly comparable with the September scan: scope, repository state, parser handling and example exclusions differ. No numerical growth is asserted to be a new regression without a same-parser, two-commit comparison.

## Findings and disposition

Priority here is this review's triage, not a replacement FDG severity taxonomy. P0 blocks reliance on affected engineering output; P1 requires resolution before governed release; P2 improves consistency.

| ID | Priority | Verified condition / implication | Action / owner | Current disposition |
| --- | --- | --- | --- | --- |
| ACR-01 | P0 | HydroCal accepts psi but uses the 3960 feet-head pump-power formula; 500 GPM, 100 psi, 80% gives 15.78 BHP instead of about 36.46 for the stated water reference | MODIFY existing calculator in a separate assigned package; FEIS engineering owner + builder | Reproduced; code correction and independent engineering validation open |
| ACR-02 | P0 | Hydraulic output can declare all parameters acceptable with -49.9 psi residual; zero source pressure becomes 80; catalogue exhaustion still yields a recommended pipe | MODIFY validation/result aggregation; same owners | Reproduced with stated scope; release reliance blocked |
| ACR-03 | P1 | NPSH PASS is based on a fixed 10 ft comparison without manufacturer NPSHR/margin; illustrative pump curve is not manufacturer performance evidence | MODIFY methodology and evidence checks; FEIS + CORE | Source-verified; real project criteria not established |
| ACR-04 | P1 | FWIS README names absent role-authorization files and guards; tracked schema enforces property membership, not the described role matrix | MODIFY provenance/status and recover the exact implementation; FPJIS/FWIS owner + FSIS | Documentation addendum supplied; source recovery and database tests open |
| ACR-05 | P1 | CORE/FPIS/FBPOIS historical absence claims no longer match tracked files; governance summary and FLIS baseline labels disagree | LINK current evidence, retain old wording; Knowledge Architecture | Factual crosswalk added; approval conflict remains explicit |
| ACR-06 | P1 | Engineering Company Core, Common Business Core and FBPOIS shared data all cover identity/organization/project primitives | LINK existing owners; propose a bounded integration contract | Reconciliation candidate provided; no new platform or data migration |
| ACR-07 | P1 | Approved specifications depend on Draft NEX-STD-006; resolver is Proposed; some approvals have no dated evidence | MODIFY approval-evidence register after owner review | No approval fabricated or silently upgraded |
| ACR-08 | P2 | Current FBIS wiki targets are system-relative or ambiguous with OLD notes | LINK exact current paths | Dated correction blocks cover 274 original reference occurrences across 86 notes; original references remain |
| ACR-09 | P1 | FPIS link map points to PR #1 paths absent on main; six related concepts exist under different main paths | LINK observed main counterparts; preserve the unresolved PR | Main navigation update added; equivalence/merge decision not presumed |
| ACR-10 | P1 | Commercial mandate requires real seller, registration, accounting, offering-population and IP evidence not provided here | KEEP mandate and evidence gate; Founder + Finance + Legal | Architecture Withheld — Evidence Gate Not Passed for legal/commercial architecture |
| ACR-11 | P2 | Safety-case structure, typed evidence dependencies and measurable capability proofs lack an integrated executable contract | CREATE bounded addenda inside CORE/FAIS/Nex | Proposed contracts and acceptance cases supplied |

Detailed technical evidence: [[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|Engineering critical findings]]. Ownership reconciliation: [[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|Enterprise architecture reconciliation]]. Improvement sequence: [[07_Nex_Core_Intelligence/NEX_INTELLIGENCE_EXPANSION_BACKLOG_2026-09-30|Intelligence expansion backlog]].

## Existing capability disposition

| Capability | Decision | Reason |
| --- | --- | --- |
| Enterprise functions and department boundaries | KEEP | NEX-STD-124–128 already define them; knowledge maturity is distinct from deployment |
| CORE computation, provenance, review and learning | KEEP + bounded proposals recorded as separate CREATE actions | Reusable intelligence is already owned; implementation evidence is incomplete |
| Shared entity/identity seams | LINK existing owners | Reconcile contracts before considering a shared implementation |
| Historical notes / OLD FBIS / imported research | KEEP | History is evidence; age alone is not deletion authority |
| New overarching enterprise system | Do not CREATE | Existing organizational and knowledge layers are sufficient for the reviewed responsibility map |
| Formal canonical promotion | Deferred | Proposed additions remain Proposed; effective approvals require the existing review process |

Each row with a later implementation has a separate work package and acceptance gate; the audit does not grant operational authority.

## Commercial evidence gate

[[22_FDG_Audit_Intelligence_System/07_Financial_and_Commercial_Audit/FAIS-FCA-0701 - FDG Enterprise Commercial and Revenue Architecture Audit Mandate|FAIS-FCA-0701]] remains the controlling detailed commercial-audit mandate. This broader architecture review is not completion of its full legal/commercial scope.

FDG, FDG Ecosystem, FDG CORE, CORE Integrated Engineering, products, brands and legal sellers must remain distinct identities. No incorporation, tax treatment, registered activity, invoice entitlement, IP ownership, seller assignment or group hierarchy is inferred from a name.

Required before that mandate can close: confirmed offering population; current entity/registration records; authorized contracting/selling role; invoice and ledger evidence; IP ownership/licensing evidence; professional responsibility; jurisdiction and compliance review. Store sensitive evidence outside the public repository and link controlled evidence IDs. Record owners are Founder, Finance and Legal; engineering sign-off belongs to the relevant qualified reviewer.

## Changes and preservation

- Additive architecture/reasoning/assurance records, linked to existing parents.
- Dated navigation corrections; no original knowledge text removed.
- Original _OLD and imported packages retained.
- No stable ID renumbering, file moves, deletions, or history rewrite.
- No application source edits, database migration, deployment, payment activation or PR merge.
- Current project safety/capability claims receive explicit review addenda; they are not silently marked fixed.
- Every modified existing file must contain its complete original content as an exact prefix; verification records that check.

Publication verification is in [[docs/audits/2026-09-30-architecture-critical-review/VERIFICATION|Verification record]]; machine-readable evidence is in `repository-evidence.json`, `navigation-corrections.json` and `engineering-reproductions.json` beside this report.

## Next executable work

1. Assign HydroCal remediation to its builder and an independent qualified engineering reviewer; use the reproduction cases before enabling reliance on reports.
2. Recover/reconcile the FWIS role implementation from its actual source workspace or branch; exercise both allowed and denied server-side transitions against an isolated database.
3. Review the proposed CORE execution contract and ownership reconciliation; approve bounded decisions with traceable evidence.
4. Resolve FPIS PR/path divergence, then remaining current-path link candidates, without duplicating archived content.
5. Measure capability with observed test and operating evidence using [[06_Organizational_Architecture/NEX-STD-127_ENTERPRISE_FUNCTION_MATURITY_STANDARD|NEX-STD-127]]; document completeness alone does not establish deployment maturity.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] → this review


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.


---

## 2026-10-01 remediation and architecture review update

The preceding review remains the immutable historical account of the September snapshot. Under the user's follow-up instruction, the identified HydroCal source defects have been corrected and targeted tests added. FWIS capability claims are explicitly reconciled with tracked source; its missing role implementation and database verification remain open. Ownership and approval proposals now have scoped decisions for Francis.

Current disposition, exact test scope and remaining release blockers: [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|remediation and verification]]. Architecture contents and decisions: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|architecture review packet]]. This is not independent engineering/security closure of every finding.
