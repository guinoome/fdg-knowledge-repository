# FDG architecture — review packet, 2026-10-01

Document ID: FDG-ARCH-REVIEW-2026-10-01
Version: 0.1
Status: Proposed decisions for Francis; factual remediation recorded separately
Owner: Francis
Approver: Pending explicit review
Effective Date: Upon recorded approval of each decision
Supersedes: None

## What is ready for your review

Retain the existing FDG systems and the approved functional ownership in [[06_Organizational_Architecture/NEX-STD-124_ENTERPRISE_OPERATING_MODEL|NEX-STD-124]] and [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|NEX-STD-126]]. Reconcile duplicated core concepts at the record and approval level.

The proposal is a federation of domain-owned records with shared contracts and reusable mechanisms. It does not create another enterprise core, force every application into one database, rename the systems, or confer approval through a Git commit.

The 2026-09-30 material remains intact. This packet adds concrete decisions and implementation boundaries. Existing claims are preserved with dated corrections; supersession requires an explicit scoped decision.

## The ownership decision

| Subject | Accountable function / authoritative record | What the overlapping systems do |
| --- | --- | --- |
| Employees and employment terms | HR owns employment inputs; Finance owns payroll calculation, accounting and payment controls | CBC supplies reusable business modules; ECC and FBPOIS consume necessary employee references and approved assignments |
| Accounts and permissions | Technology/Security owns identity enforcement; the relevant role owner authorizes the business permission | A shared login never implies shared approval authority; HR supplies joiner/leaver facts |
| Vendors, purchasing and invoices | Procurement owns sourcing, qualification and PO; Finance owns AP, payee controls and posting; Engineering owns technical acceptance | CBC connects those records; ECC and FBPOIS submit demands/acceptance evidence |
| Projects | Project/Portfolio function owns project controls; Engineering owns design and test decisions | ECC hosts engineering workspaces; FPJIS governs work packages, delivery readiness and platform releases |
| Installed assets | Operations owns physical asset identity, location, condition and maintenance history; Engineering owns design/acceptance evidence; Finance owns book value | FBPOIS is the operations domain; shared IDs link the design equipment and financial asset records |
| Shared reasoning | Domain owner governs methods and acceptance; CORE executes deterministic methods and assembles evidence | Nex plans/reasons; FAIS independently reviews; FWAIS executes only authorized actions |
| Common data exchange | Domain function owns facts; Integration Hub stewards exchange contracts | Consumers receive scoped projections; an actual deployment binding names the single writer |

These assignments reuse the functional baseline. The **new decision** is the precise CBC/ECC/FBPOIS integration seam and record contract, detailed in [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Shared Record Contract]]. Functional ownership does not mean FDG has already appointed/staffed every role or deployed every system.

### How a real workflow crosses the boundaries

An operations team requests a replacement pump in FBPOIS. Engineering records the duty, specification and technical acceptance in FEIS/ECC. Procurement owns the requisition-to-PO process; Finance controls invoice matching and payment. FBPOIS receives the installed equipment reference and maintenance handover. CORE can calculate or check the duty, but cannot approve the PO, payment or engineering release.

Each step references the upstream record revision. Receiving goods, accepting technical performance and authorizing payment are distinct decisions. A successful installation update cannot silently mark all three approved.

## What is inside the architecture documents

| Document | Concrete contents | Present state |
| --- | --- | --- |
| [[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30\|Enterprise Architecture Reconciliation]] | System responsibilities, preserved conflicts, authority boundaries, integration/migration rules; October addendum makes ownership seams explicit | Proposed |
| [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01\|Shared Record Contract]] | Record ownership, single-writer deployment binding, tenant/legal identity separation, events, offline conflicts, approval invalidation and acceptance scenarios | Proposed |
| [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01\|Authority Reconciliation Register]] | ECC/CBC, FLIS scope conflict, Draft NEX-STD-006 dependencies, missing dates, resolver precedence and FPIS branch divergence; disposition and decision owner | Recorded evidence; proposed decisions |
| [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30\|Engineering Reasoning Execution Contract]] | Typed inputs/evidence, pinned methods, deterministic calculation, separate execution/outcome/release states, safety assurance and report revisions | Proposed; bounded HydroCal corrections only are implemented |
| [[10_FDG_CORE_Intelligence/FDG_CORE_REASONING_ACCEPTANCE_CASES_2026-09-30\|Reasoning Acceptance Cases]] | R01–R28: units, missing values, adverse findings, authority, stale approvals, offline conflicts, tenant isolation and provenance | Test specification; partial execution mapped in October addendum |
| [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS_ARCHITECTURE_REGRESSION_PROTOCOL_2026-09-30\|Architecture Regression Protocol]] | Pinned comparisons, document/link/authority checks, change impact and release evidence | Proposed protocol; concrete validation recorded in remediation report |
| [[07_Nex_Core_Intelligence/NEX_INTELLIGENCE_EXPANSION_BACKLOG_2026-09-30\|Intelligence Expansion Backlog]] | Safety cases, provenance, executable capability proofs, uncertainty and outcome learning | Candidate backlog; no automatic deployment approval |

## What was fixed without another decision from you

- Corrected HydroCal pressure-to-head conversion in the main pump calculation, curve power and jockey calculation.
- Removed invented pressure from missing/zero data, false overall favorable hydraulic wording, no-feasible-pipe recommendations and invalid storage fallback.
- Removed unsupported NPSH pass and unqualified pump-selection claims; reports remain drafts.
- Preserved the exact original calculator source. Reopening/importing a saved result requires explicit recalculation; recalculation preserves its predecessor.
- Added 20 calculator regression tests and four FWIS capability-check tests. Calculator tests execute formulas and app methods with explicit DOM/storage/PDF sinks.
- Added a source-backed FWIS capability manifest and a command refusing a production release claim. Historical role-enforcement completion claims have an explicit current correction.
- Added ownership/authority reconciliation, exact-path wikilinks and review routes without deleting old knowledge.

Scope and limits: [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|Remediation and verification]]. Browser execution, actual PDF layout, independent engineering validation and live database validation remain unverified.

## Decisions needing Francis's attention

The [[00_Nex/REVIEW_PROTOCOL|Nex Review Protocol]] requires explicit review before a major evolution becomes a baseline. Your instruction authorizes fixes and these proposals; it does not provide a decision on previously unseen content.

| Decision | Exact proposal to review | Recommended disposition / consequence |
| --- | --- | --- |
| D1 — ownership seam | Adopt the October ownership addendum and Shared Record Contract as the design contract for new integrations; preserve ECC's approved direction and CBC's candidate product status | Approve the seam after review. Each implementation still needs a named owner, writer binding and release evidence; no database migration follows automatically |
| D2 — FLIS | Resolve **structure**, **ecosystem admission**, and **legal-content validation** separately | Link the original 2026-08-29 approval if available. Otherwise make a prospective structure/admission decision; do not backdate it or approve legal content by implication |
| D3 — governance framework | Review NEX-STD-006 v1.0 with its October clarification: source tiers do not decide applicability, legal force or correctness; proposal publication is distinct from approval | Ratify prospectively if acceptable, or request amendments. Keep Draft until then; preserve downstream approval claims with a dependency qualification |
| D4 — engineering release | Assign a competent reviewer independent of these changes; provide applicable project/code edition, manufacturer evidence and intended-use test scope | Keep HydroCal preliminary until review and validation pass; regression tests alone do not approve engineering use |
| D5 — FWIS source recovery | Identify the original workspace/commit containing the claimed role implementation, if available | Share its location, not credentials. Otherwise a replacement authorization package must implement the documented matrix and pass real PostgreSQL tests before online release |
| D6 — commercial architecture | Provide verified seller/entity, IP ownership, accounting and offering evidence through the controlled evidence process | Continue the commercial mandate's gate; confidential evidence need not be copied into this repository |

D1–D3 are approval decisions. D4–D6 need an accountable human or evidence outside the available repository.

You can approve individual IDs, for example: “Approve D1 for design integration; keep D2 pending evidence; amend D3 as follows …”. Record the actual date, target file/version/hash, scope, exclusions and conditions. This packet records no approval itself.

## Adoption and rollback

1. Freeze selected files and scope in a dated approval record; preserve their current versions.
2. Pilot one engineering-to-operations handover. Export/import versioned records, retain provenance, test duplicate delivery and conflicting offline edits.
3. Verify employee, vendor, asset and project projections cannot bypass their owners.
4. Deploy after the package's security and engineering gates pass; name the custodian and independent reviewer.
5. If the pilot fails, disable the connector, retain both evidence histories and restore the previous binding. Do not erase records or rewrite the approved predecessor.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture]] → this review packet
