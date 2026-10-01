# FDG enterprise architecture reconciliation — 2026-09-30

Document ID: FDG-ARCH-RECON-2026-09-30
Version: 0.1
Status: Proposed reconciliation — not a replacement canonical standard
Owner: Francis
Approver: Pending explicit architecture review
Effective Date: Upon approval
Supersedes: None

## Baseline and outcome

Reuse [[06_Organizational_Architecture/NEX-STD-124_ENTERPRISE_OPERATING_MODEL|Enterprise Operating Model]], [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|Ownership Matrix]] and [[05_Knowledge_Architecture/FDG_CROSS_SYSTEM_RELATIONSHIP_MAP|Cross-System Relationship Map]]. The first two record Approved status; the relationship map is a working map with a later scoped approved FEIS extension. This proposal consolidates their relationship without approving every linked document.

The enterprise consists of accountable functions supported by knowledge systems, shared mechanisms, domain modules and project implementations. An intelligence-system folder is not a department, legal entity, deployed service or mandatory microservice.

## Responsibility map

| Existing owner | Governing responsibility | Boundary / integration output |
| --- | --- | --- |
| Founder / Governance / Organizational Architecture | Enterprise authority, decision rights and function ownership | Approval and delegation records; no inferred legal incorporation |
| Knowledge Management / Knowledge Architecture | Asset lifecycle, preservation, metadata, navigation and current-authority resolution | Immutable identities, explicit status and succession relationships |
| Nex / 07 | Context, reasoning practice, work-package coordination and learning discipline | Uses approved knowledge; does not confer engineering authority on a model |
| [[10_FDG_CORE_Intelligence/FDG-CORE-STD-001_CORE_INTELLIGENCE_ARCHITECTURE_STANDARD\|FDG CORE]] | Shared computation, reasoning mechanisms, evidence/provenance and decision support | Executes domain-owned methods; does not own all operational records |
| Integration Hub / 09 | Cross-system contracts, identity exchange and interoperability | Versioned interfaces; no mandatory global database |
| FEIS / 08 | Engineering meaning, domain methods and acceptance requirements | Owns engineering rules; Company Core supplies reusable module foundations |
| [[11_FDG_Business_Intelligence_System/11_FDG_Business_Intelligence_System_Master_Index\|FBIS]] | Business semantics and commercial/financial information | Finance owns accounting judgments; HR owns employment; Procurement owns sourcing |
| FBPOIS / 16 | Facility operations, asset condition, work orders and maintenance execution | Links enterprise parties/projects; retains facility-specific facts and topology |
| [[17_FDG_Platform_Intelligence_System/00_FPI_Home\|FPIS]] | Platform lifecycle, performance, experience and evolution | Platform evidence and recommendations; domain records remain with owners |
| [[20_FPJIS_FDG_Project_Intelligence_System/00_Architecture/FPJIS_Master_Architecture\|FPJIS]] | Project definition, blueprints, readiness and release coordination | Delivery gates and packages; no takeover of domain design authority |
| [[19_FWAIS — FDG Workflow Automation Intelligence System/00_Architecture/FWAIS_Master_Architecture\|FWAIS]] | Workflow automation capability and exception recovery | Executes authorized steps; may not enlarge business/engineering permissions |
| FMCIS / 21 | Collaborator allocation, ownership boundaries and handovers | One responsible builder per package; independent review where risk warrants |
| FSIS / 12 | Security, trust and access controls | Constraints and controls implemented at the enforcement boundary |
| [[13_FDG_Legal_Intelligence_System/00_FLIS_CORE/FLIS-0002 - Legal Intelligence Architecture\|FLIS]] | Legal sources, obligations, jurisdiction and applicability | Verified constraints routed to operational owners; no automated legal authority |
| Service Intelligence / 14 | Service definition, packaging, delivery and acceptance | Uses business economics and domain methods without absorbing them |
| FEXIS / 18 | Authorized external representation, discovery and external learning | External material enters candidate review; publication requires release authority |
| [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System\|FAIS]] | Independent assurance, evidence, findings and verification | Process owner corrects; independent review verifies significant closure |

This is a knowledge and responsibility map. The enterprise function owner, record steward, implementation custodian, approver and auditor are separate fields.

## Conflicts and scoped reconciliation

| Evidence | Resolution or proposal | Status |
| --- | --- | --- |
| CORE-STD-001's old connection table says FBIS/FLIS/Service are absent | Follow current repository paths; preserve the historical observation as dated context | File-existence fact, not retroactive approval |
| CORE is described as a source of truth while root README gives repository/domain authority | Treat CORE as an intelligence mechanism over governed sources; domain records retain their own authority | Clarification consistent with CORE's explicit non-replacement boundary |
| [[11_FDG_Business_Intelligence_System/06_Business_Architecture/FBIS-ARCH-CBC-001 - FDG Common Business Core Architecture\|Common Business Core]] and [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core\|Engineering Company Core]] both cover organization, party, identity and project | Reuse common semantic identifiers and exchange contracts; retain engineering-specific extensions; no competing employee or legal-entity master | Proposed integration seam; CBC is still candidate architecture |
| [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/FBPOIS-SDP-0001 - Master Data Architecture\|FBPOIS Master Data]] depicts one containment chain through equipment, plant and utility | Separate located-in, member-of-system, supplies, depends-on and owned-by relations; a pump may serve several zones | Proposed typed relationship clarification; no database migration |
| FBPOIS shared database versus independently deployable engineering modules | Shared within a bounded deployment does not imply one database for the entire ecosystem; exchange stable IDs and versioned events | Proposed cross-system contract |
| FPIS legacy FWFIS and missing-system wording | FWAIS exists at folder 19; exact equivalence of every old acronym is unproven | Navigation fact plus unresolved terminology |
| FEXIS header says system 17 but current path is 18 | Use the actual 18 path for navigation; leave numbering/charter approval unresolved | No renumbering |
| FLIS self-labels approved baseline while root map says admission review | Preserve both, record competing claims and request a dated approval record | AMBIGUOUS authority; do not silently choose latest prose |
| Proposed resolver allows version/date comparison | Version/date orders versions of the same governed identity and scope; it cannot resolve unrelated competing authorities | Proposed resolver clarification |
| Enterprise functions rated Very Strong | That rating is organizational knowledge maturity, as explicitly scoped by NEX-STD-127 | No deployment/staffing inference |

## Minimal shared contract proposal

For each exchanged record define:

```yaml
record_id: stable opaque identifier
record_type: domain-qualified type
tenant_id: owning tenant scope
legal_entity_id: verified entity reference or null
system_of_record: explicit domain owner
schema_version: versioned contract
record_revision: optimistic concurrency token
valid_time: when the fact applies
recorded_at: when captured
actor: human, sensor, importer, deterministic engine, or model
source_refs: evidence and upstream record identifiers
approval_state: separate from workflow and engineering result
data_classification: access and retention policy reference
```

A tenant is an access boundary, an organization is an operating concept, and a legal entity is a verified legal identity. They are not interchangeable. Single-company payroll may have branches and projects without becoming multi-company.

Writes go to the record owner. Consumers hold projections with provenance, revision and freshness, not competing masters. Offline conflicts retain both versions and produce **Conflict — Review Required** when authority or engineering meaning differs. No last-write-wins for posted payroll, approved test evidence or financial postings.

Events carry event ID, producer, tenant, record revision, schema version, occurred/recorded times, correlation/causation IDs and evidence references. Consumers are idempotent; replay must not duplicate approvals, money movement or work orders. These are proposed contracts, not implemented infrastructure.

## Architecture decision procedure

Reuse → extend → link → propose consolidation → replace only after documented incompatibility and approval. Preserve superseded text and evidence.

Before an architecture candidate becomes canonical:

1. Define the exact decision, scope and current controlling assets.
2. Record facts, assumptions, constraints, unknowns and rejected options separately.
3. Trace affected records, contracts, rules, tests, outputs and owners.
4. Verify field applicability, independent tests and rollback/continuity.
5. Record the actual approver, date, effective scope and successor relationship.
6. Add backward and forward links; historical retrieval remains available.

For conflicting sources return RESOLVED, AMBIGUOUS or NOT_FOUND under the proposed [[05_Knowledge_Architecture/CANONICAL_TRUTH_RESOLUTION_STANDARD|canonical resolver]]. A recent filename, merged commit, successful model response or navigation link does not grant approval.

## Commercial boundary

This note does not establish a new commercial or legal-entity hierarchy. [[22_FDG_Audit_Intelligence_System/07_Financial_and_Commercial_Audit/FAIS-FCA-0701 - FDG Enterprise Commercial and Revenue Architecture Audit Mandate|FAIS-FCA-0701]] remains evidence-gated. CORE Integrated Engineering is not equated with FDG CORE; brands/products are not legal sellers. Current registrations, IP and accounting evidence remain unknown in this review.

## Acceptance and migration

Accept only when every responsibility has one accountable owner, contracts name record ownership and scoped identifiers, duplicate master-data authority is resolved, and a small offline-capable vertical slice proves portability and recovery. Begin with one consumer/provider pair and export/replay evidence. Distributed services and multiple agents are optional implementation choices.

No current schema, service, legal entity, folder numbering, master ID or collaborator allocation is changed by this proposal.

Related: [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|Reasoning execution contract]] · [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS_ARCHITECTURE_REGRESSION_PROTOCOL_2026-09-30|Regression protocol]] · [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|Review evidence]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|Knowledge Architecture]] → this proposal


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.


---

## 2026-10-01 remediation and architecture review update

### Ownership seam — proposed revision 0.2 addendum

The original proposal and its metadata remain above. This addendum makes the proposed seam explicit; no new canonical standard or approval is declared.

| Existing core | Accountable record scope | Excluded ownership |
| --- | --- | --- |
| CBC / FBIS | Reusable business modules under HR, Finance, Procurement and Commercial ownership | Does not own engineering acceptance, operational asset condition or all enterprise identity |
| ECC / FEIS | Engineering workspaces, domain methods, evidence and technical decisions; reusable company context | Does not create a competing employee/payroll/vendor ledger or override business owners |
| FBPOIS shared data | Property context, installed assets, operational condition, work orders and maintenance | Does not make financial book value, employment or design evidence its own master |
| Integration Hub | Contract stewardship, identifier mapping and controlled exchange | Does not become a global writer or mandatory universal database |

Approve the integration seam separately from adoption of the whole CBC product candidate. Preserve ECC's declared approved direction. For each exchanged record, name a functional owner, record steward, single authoritative writer per tenant/scope, implementation custodian, business/technical approver and independent reviewer where required.

The FLIS conflict is narrower than the original summary: its README explicitly declares folder-structure approval and excludes blanket legal-content verification. Structure approval evidence, ecosystem admission and content validation therefore have separate unresolved dispositions.

Full ownership, event, offline-conflict and handover rules: [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Shared Record Contract]]. Claim-by-claim reconciliation: [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01|authority reconciliation register]]. Decisions D1–D6: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|architecture review packet]].
