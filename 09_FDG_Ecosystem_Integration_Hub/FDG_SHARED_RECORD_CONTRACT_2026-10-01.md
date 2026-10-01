# FDG shared record and ownership contract — 2026-10-01

Document ID: FDG-IH-CONTRACT-2026-10-01
Version: 0.1
Status: Proposed integration contract; no deployed infrastructure claimed
Owner: Domain functions; Integration Hub contract steward
Approver: Francis, pending D1 review
Effective Date: Upon scoped approval
Supersedes: None

Extends [[09_FDG_Ecosystem_Integration_Hub/FDG-PH-STD-004_DATA_EXCHANGE_ARCHITECTURE_STANDARD|Data Exchange Architecture]] (Draft) and [[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|the reconciliation proposal]]. References do not promote these drafts.

## Meaning, reusable code and authoritative writes

The approved [[06_Organizational_Architecture/NEX-STD-126_CROSS_FUNCTIONAL_OWNERSHIP_AND_INTERFACE_MATRIX|functional matrix]] assigns accountability. This contract assigns record scope and exchange behavior.

- **CBC:** reusable business records/workflows under the relevant function; no takeover of HR, Finance or Procurement.
- **ECC:** engineering company context, workspaces, evidence and continuity; employee/project references are not second authoritative employment/financial records.
- **FBPOIS shared data:** facility operations and operational assets within a deployment; no universal facility containment hierarchy.
- **Integration Hub:** identifiers and contracts; no mandatory universal database or ownership of domain facts.

## Record ownership matrix

“Writer” is a logical responsibility. Bind it before deployment to exactly one named module/service/store per tenant, record type and scope. A folder is not a deployment binding.

| Record / attribute scope | Accountable function | Authoritative writer binding | Consumers / boundary |
| --- | --- | --- | --- |
| Verified legal entity, registration, legal name | Legal/Compliance with corporate authority | Controlled verified entity register; named custodian | Finance/HR/CBC/ECC/FBPOIS reference it; an organization label is not incorporation evidence |
| Operating organization, branches, departments | Executive/Organizational governance | Approved organizational register | HR maps assignments; tenant security boundary remains separate |
| Identity, authentication, access grants | Technology/Security; business role owner authorizes grants | Identity/access service with audited grant/revocation | Modules enforce scoped claims; login alone grants no technical approval |
| Employment, assignments, salary/benefit inputs | HR | Employee/employment record | Finance receives approved payroll inputs; ECC/FBPOIS receive minimum work context |
| Payroll, AP/AR, COA, journals, payments, close | Finance/Accounting | Finance ledgers and payment controls | CBC can implement them; other modules cannot edit posted transactions |
| Supplier qualification, sourcing, PO | Procurement | Procurement records/approved supplier profile | Engineering owns technical acceptance; Finance owns payee/payment controls |
| Customer relationship, opportunity | Commercial/Sales | Customer/opportunity record | Finance owns billing/receivables; delivery references customer ID |
| Project identity, WBS/baseline, controls | Project/Portfolio Management | Named project registry/control module for the scope | ECC engineering project and FPJIS platform package link it; these are not automatically one object |
| Design equipment, specification, method, technical acceptance | Engineering/Technical | FEIS/ECC engineering records | FBPOIS links installed asset to accepted design revision |
| Installed asset, location, condition, maintenance | Operations/Service Delivery | FBPOIS asset/work-order records per property | Engineering evidence and Finance capitalization reference it; no overwrite of operating history |
| Book value, depreciation, disposal accounting | Finance | Fixed-asset ledger | Link the operational asset ID without sharing location/condition write authority |
| Evidence and engineering results | Capturing/technical domain owner | Immutable evidence store and result revisions | CORE computes; FAIS reviews; storage custodian is not content approver |
| Audit finding and independent closure verification | Internal Audit / FAIS | Finding/verification record | Process owner corrects; implementer cannot silently self-certify independent closure |
| Workflow execution and platform release | Business approver; FPJIS coordinates release | Domain decision, FWAIS execution record and release package | FWAIS cannot enlarge permissions; FPIS cannot override domain acceptance |

A shared party ID joins customer/supplier/employment roles; it grants no right to change all attributes. Bank details, employment data and legal evidence require separate access scopes.

## Deployment binding

```yaml
binding_id: tenant-a.operations.asset.v1
tenant_id: tenant-a
record_type: operations.asset
scope: property-123
accountable_function: Operations and Service Delivery
record_steward: named role awaiting assignment
writer: exact module/service and store awaiting assignment
implementation_custodian: named package owner awaiting assignment
approval_authority: approved delegation reference required
schema_version: "1.0"
consumers:
  - contract: engineering.asset-handover.v1
    access: read-projection
    freshness_requirement: explicit duration or condition required
    unavailable_behavior: retain last verified projection; disclose staleness
conflict_owner: accountable function with technical review where needed
```

Example values are not FDG assignments. Unbound placeholders block deployment. One database can implement several bindings; separate modules can use separate stores. Topology does not transfer ownership.

## Exchange envelope

```yaml
record_id: opaque stable ID
record_type: domain-qualified type
tenant_id: access boundary
organization_id: operating organization reference
legal_entity_id: verified reference or null with reason
owner_binding_id: registered writer
schema_version: explicit version
revision: monotonic owner-issued revision
valid_from: when the fact applies
recorded_at: when captured
source_refs: record IDs, revisions and evidence hashes
actor: authenticated person/service and delegated scope
workflow_state: domain lifecycle state
requirement_outcomes: independent requirement findings
release_state: draft, review-required or approved-for-defined-use
approval_refs: decisions bound to exact input/method/output revisions
classification: access, retention and export policy reference
```

Null, zero, unknown, invalid and not-applicable are distinct. Do not copy a brand/tenant name into a verified legal identity. Quantities carry units and reference conditions; monetary values carry currency and accounting context.

## Commands, events and offline conflicts

Commands name expected revision, scoped actor, intent, idempotency key and owner binding. The owner checks authorization at the API/database boundary and validates the transition. Consumers do not write through projections.

Events carry event ID, tenant, producer, record ID/revision, contract version, occurred/recorded times, correlation/causation IDs and evidence refs. Delivery may duplicate or delay. Consumers deduplicate durably and apply owner revisions; they do not assume exactly-once transport.

1. Offline capture retains a pending command and the last verified owner revision.
2. Reconnection validates current authority, expected revision and evidence.
3. Expired authority, accepted/posted records or competing material edits produce Conflict — Review Required; retain both versions.
4. The domain owner resolves through an amendment/reversal where required. No last-write-wins over an issued report, posted ledger or accepted evidence.
5. Stale cached permission cannot authorize approval/payment. Capture may continue without implying release.

Changes to methods, requirements, inputs or source evidence invalidate approval applicability to the changed output. Preserve the previous decision/report, create a new result revision and queue affected downstream references for review.

## Facility relationships

Preserve the historical FBPOIS hierarchy as its original model. Proposed shared relations:

| Relation | Example | Boundary |
| --- | --- | --- |
| located_in | pump → plant room | Physical location, Operations |
| member_of_system | pump → chilled-water system | Membership differs from location |
| supplies | pump → several zones | Many-to-many, directional, operating conditions |
| depends_on | pump → electrical supply | Dependency differs from containment; evaluate cycles by relation type |
| owned_by / operated_by | asset → verified party / operating organization | Ownership evidence differs from operation responsibility |

A plant here is a physical system. Never join it to a software environment by a shared label. Preserve relationship provenance and effective dates.

## Pilot acceptance and migration

| Scenario | Required evidence |
| --- | --- |
| HR correction consumed in ECC/FBPOIS | Owner revision retained; consumer cannot change the HR source |
| Equipment handover | Design equipment, test evidence, installed asset and financial asset retain distinct linked IDs |
| Wrong tenant / unauthorized transition | Enforcing boundary denies; authorized positive case succeeds |
| Duplicate/reordered event | No duplicate work order, approval or financial effect |
| Offline edit after acceptance | Both versions retained; amendment/review, no silent overwrite |
| Method revision after report issue | Original reproducible; impacted references reviewed; no automatic reissue |
| Connector rollback | Previous binding restored; queued records and history retained |

Start with one engineering-to-operations handover. Inventory IDs/stores; create provenance-backed crosswalks; prove export, replay and rollback before cutover. Never merge employees, parties, equipment or projects on name match alone.

Related: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|D1 review]] · [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01|Authority register]] · [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|Reasoning contract]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[09_FDG_Ecosystem_Integration_Hub/09_FDG_Ecosystem_Integration_Hub_Master_Index|Integration Hub]] → this contract
