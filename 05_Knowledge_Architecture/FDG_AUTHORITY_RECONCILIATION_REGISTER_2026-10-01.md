# FDG authority reconciliation register — 2026-10-01

Document ID: FDG-AUTH-RECON-2026-10-01
Version: 0.1
Status: Evidence register; proposed decisions remain pending
Owner: Francis
Approver: No new approval claimed
Effective Date: Evidence recorded 2026-10-01; decisions effective only when approved
Supersedes: None

## How to read authority

Separate the **claim**, **supporting evidence**, **scope**, **authorized decision maker**, and **current disposition**. A header records a claim. A named prospective approver is not an approval event. A merged file, navigation link, test pass or recent timestamp is not approval.

Use [[00_Nex/CONSTITUTIONAL_AUTHORITY|Constitutional Authority]], [[00_Nex/REVIEW_PROTOCOL|Review Protocol]] and [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|functional decision rights]]. This register does not replace those baselines.

## Claim-by-claim reconciliation

| ID | Competing or incomplete evidence | Reconciliation and immediate working rule | Remaining decision |
| --- | --- | --- | --- |
| AUTH-01 | [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core\|ECC]] declares **Approved Direction — Implementation Baseline**, effective 2026-09-30; [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture\|CBC]] is **Proposed candidate architecture** | Preserve ECC's engineering-module direction. CBC does not overrule it. Reconcile shared concepts through record ownership, not a globally owning core. Neither label certifies every implementation | D1 approves the integration seam; incompatible ECC changes need a separate decision |
| AUTH-02 | [[13_FDG_Legal_Intelligence_System/README\|FLIS README]] explicitly says its **folder structure** was approved 2026-08-29; [[FDG Ecosystem\|root map]] says **Draft/admission review**. FLIS excludes a claim that all legal content is verified | Refine the earlier broad conflict: structure, admission and legal-content validity are separate scopes. Structure approval is declared; separate evidence and reconciliation with admission were not located. Preserve both statements. Content-level legal validity remains unverified | D2: attach the scoped record or decide prospectively. No approval inferred from file existence |
| AUTH-03 | [[01_Governance/NEX-STD-006_FDG_KNOWLEDGE_GOVERNANCE_FRAMEWORK\|NEX-STD-006]] is Draft; constitutional/approved documents reference it | A reference does not promote a dependency. Keep downstream declared statuses, but flag decisions depending solely on this Draft. Use independently approved controlling clauses where available | D3: ratify a pinned version with clarification or request amendments; no invented prior date |
| AUTH-04 | [[05_Knowledge_Architecture/CANONICAL_TRUTH_RESOLUTION_STANDARD\|NEX-PREOS-001]] is Proposed, names Francis as Approver and compares version/date | Approver is the intended decision maker. Version/date orders the same governed identity and scope, not competing owners. Do not silently normalize “Approved Direction” into full implementation approval | Review the scoped resolver clarification; expose its Proposed status |
| AUTH-05 | Pinned full scan recognizes 156 exact Approved headers without an effective date | Classify **approval declared / date evidence incomplete**. Do not invent dates, demote every document or use modified dates as approval dates. Prioritize high-impact dependencies; absence of a date is not proof approval never occurred | Owners progressively attach evidence; unresolved timing cannot authorize a date-sensitive use |
| AUTH-06 | Old CORE map says systems are absent; current files exist; CORE uses source-of-truth language | Paths settle existence; domain-governed assets settle substantive authority. CORE derives over those sources. Preserve historical absence wording as dated context | Factual navigation correction needs no new decision; ownership transfer does |
| AUTH-07 | FPIS draft PR #1 paths differ from main and include another offline lifecycle proposal | Main counterparts support navigation, not presumed semantic equivalence. Keep branch/main definitions distinct; inspect per-document differences before adoption | Domain owner reviews PR changes; this package does not merge or adopt them |
| AUTH-08 | FEXIS old header says 17; actual folder is 18; FPIS occupies 17 | Navigate to actual folder 18; no inferred charter renumbering | Numbering owner decides if a substantive change is needed |
| AUTH-09 | FWIS completion/setup claims name absent role guards/tests | [[Projects/Active/FWIS/CURRENT_CAPABILITIES_2026-10-01\|Current source evidence]] qualifies historical totals. Membership guards are not transition authority | Recover/rebuild implementation and perform database review; paperwork alone cannot close this |
| AUTH-10 | [[22_FDG_Audit_Intelligence_System/07_Financial_and_Commercial_Audit/FAIS-FCA-0701 - FDG Enterprise Commercial and Revenue Architecture Audit Mandate\|Commercial mandate]] requires unavailable evidence | Architecture Withheld — Evidence Gate Not Passed. Brand, tenant, intelligence system and registered seller remain distinct | Founder/Finance/Legal provide verified evidence; no inferred incorporation, seller or IP transfer |

## Proposed approval record

```yaml
decision_id: stable identifier
decision: approved | rejected | amendments-required | deferred
authority_basis: approved delegation or Founder reference
approver: actual person and role
decided_at: actual timestamp
effective_from: explicit effective date
targets:
  - path: exact path
    document_id: governed identity
    version: reviewed version
    content_hash: reviewed blob or digest
approved_scope: exact clauses, direction or implementation
excluded_scope: matters not approved
conditions: release and evidence requirements
supersedes_scope: explicit predecessor decision/clauses or none
evidence_refs: references with access classification
reviewer: technical reviewer and independence where needed
```

One document may contain approved direction, candidate implementation, historical evidence and an unapproved addendum. Retrieval must return the relevant scope and evidence.

## Proposed resolver decision order

1. Identify domain, entity, jurisdiction/edition, intended use and effective time.
2. Find governed identities and explicit decisions; navigation only supplies candidates.
3. Check the decision maker's authority for that scope; retain original status text.
4. Exclude unapproved scope from approved-authority requests. Return NOT_FOUND with candidate material if none qualifies.
5. Apply explicit scoped succession and effective periods within the same identity.
6. Compare version/time only after identity, scope and approval are established.
7. Return AMBIGUOUS for competing controlling scopes or unresolved approval evidence needed for the use; include both claims and decision owner.
8. Pin evidence in calculations and reports. Changed output needs fresh approval; history remains intact.

These are proposed steps, not a deployed resolver. Evidence incompleteness and proven contradiction are different findings.

## Metadata remediation queue

Derive the queue from the current scan, preserving paths, statuses and missing fields. Order: safety methods/releases; security/roles; constitutional dependencies; financial/commercial commitments; routine notes.

Close with recovered evidence, a prospective decision, an explicit limitation or “unresolved”. Bulk date filling and label-only promotion are not closure.

Related: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|Founder review packet]] · [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Shared Record Contract]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture]] → this register
