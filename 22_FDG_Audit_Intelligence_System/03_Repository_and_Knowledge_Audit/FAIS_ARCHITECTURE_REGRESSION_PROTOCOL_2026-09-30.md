# Architecture and knowledge regression protocol — 2026-09-30

Document ID: FAIS-RKA-PROTOCOL-2026-09-30
Version: 0.1
Status: Proposed — execution evidence required per change
Owner: FAIS with Knowledge Architecture and the affected package owner
Approver: Pending review
Effective Date: Upon approval
Supersedes: None

## Purpose and baseline

Extend [[04_Knowledge_Management/KNOWLEDGE_PRESERVATION_STANDARD|Knowledge Preservation]] and [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0300 - Repository and Knowledge Audit|Repository and Knowledge Audit]]. A repository regression is a demonstrated loss between identified snapshots using a comparable check. A missing feature in today's tree is a present gap; history is needed to call it a removal.

The [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|2026-09-30 review]] found both navigation defects and documented capabilities without tracked implementation. This protocol connects those observations to repeatable checks without deleting historical knowledge or turning every old link into a release failure.

## Evidence chain and impact

Record the changed requirement or source, its owned domain, implementation, tests, outputs, approval and deployed version. Where practical represent typed relationships: implements, depends-on, validates, supersedes, approved-by and contradicts. Ordinary wikilinks supply navigation; they do not by themselves prove any of these relationships.

For a changed method, traverse dependent calculations, reports and operating decisions. For a changed schema or role matrix, include direct API callers and offline/replay behavior. For a changed knowledge asset, include approval scope and current-versus-historical retrieval.

Store two times where they matter: when a fact applied and when FDG learned it. A corrected observation must not rewrite the evidence available to an earlier decision.

## Same-parser comparison

1. Pin baseline and candidate commit IDs, scanner version, scope and exclusions.
2. Inventory all tracked paths. Compare additions, removals, renames and exact content changes.
3. Scan the same scope at both commits. Keep historical, imported/reference, project and current paths distinguishable; path location is not approval.
4. Test changed/additional links separately from retained legacy links. Use explicit vault paths when basenames collide.
5. Check IDs, lifecycle fields, authority evidence and successor links. Missing dates create review items; they do not authorize invented dates.
6. Trace source/documentation claims to actual files, symbols, test evidence and deployment manifests.
7. Use history to identify the first bad transition only when the failing behavior is reproducible in two relevant snapshots.
8. Record expected intentional differences and residual uncertainty. Preserve earlier counts with their original methodology.

The companion `scan-snapshot.mjs` checks file-target wikilinks and selected metadata. It does not resolve YAML aliases, heading anchors, block IDs, Markdown links, every Obsidian plugin convention or binary attachments. Its candidates require review; it is not a full Obsidian implementation.

## Capability proof record

```yaml
capability_id: stable domain-qualified identity
claim: precise user-visible behavior
knowledge_refs: governed requirements and method versions
source_commit: exact implementation snapshot
implementation_paths: existing tracked paths
test_evidence: case IDs, outcomes, runtime and fixture hashes
database_version: migration/schema identity where applicable
deployment_evidence: environment, build identity and observation time
operating_limits: untested and unsupported conditions
owner: accountable package owner
verification_state: documented / implemented / tested / deployed / observed
```

These states describe evidence, not a universal maturity scoring system. Use [[06_Organizational_Architecture/NEX-STD-127_ENTERPRISE_FUNCTION_MATURITY_STANDARD|NEX-STD-127]] for enterprise-function maturity. A claim of production readiness needs corresponding deployment and operating evidence; a README assertion count is historical until rerun against an identified snapshot.

## Risk-based checks

| Change | Necessary check before closure |
| --- | --- |
| Append-only navigation | Every new target resolves; original content remains an exact prefix; no unintended status change |
| Method, unit or acceptance rule | Independent reference answer, domain limits, boundary/adverse cases and affected report analysis |
| Permission or workflow authority | Both permitted and denied server-side transitions; tenant isolation and separation of duties |
| Shared entity/schema | Owner, identity mapping, version compatibility, migration/replay and conflict behavior |
| Offline synchronization | Lost/duplicate/out-of-order events, interrupted recovery and approval conflicts |
| Evidence/import/OCR | Provenance, original preservation, verified extraction and untrusted instruction isolation |
| Model/provider update | Deterministic behavior unchanged; evidence-grounded explanation and refusal/unknown cases |
| Issued report | Pinned snapshot, approval binding, revision notification and retrievable original |

A green build that omits the affected behavior does not close a finding. A large test count does not compensate for missing independent reference answers.

## Applying this to the FWIS drift

[[22_FDG_Audit_Intelligence_System/04_Engineering_Audit/FAIS_ENGINEERING_CRITICAL_FINDINGS_2026-09-30|ACR-04]] establishes that role-enforcement files named in the README are absent from the pinned tree. Path history and the older README place the inconsistency before this audit. Recovery must locate the original implementation or explicitly amend the claim; it must not attribute the problem to an unproven recent deletion.

After recovery, compare generated authority data to declarations, then exercise real database roles with authorized and unauthorized transitions. UI-only tests cannot establish database enforcement. Keep recovered source provenance and any former report of success available.

## Closure, recurrence and publication

Each finding records criterion, condition, immutable evidence, consequence, owner, corrective action, independent verification and remaining limits. Only the authorized reviewer closes the applicable finding. A later contradiction reopens it without erasing prior closure evidence.

Publish a compact review record and evidence manifest. Keep sensitive operational evidence in controlled storage. Repository checks must not print credentials, customer data or confidential financial records.

[NIST SP 800-218, SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) supplies a general software-development assurance reference; this proposed FDG protocol does not claim SSDF certification. Accessed 2026-09-30.

Related: [[05_Knowledge_Architecture/FDG_ENTERPRISE_ARCHITECTURE_RECONCILIATION_2026-09-30|Architecture reconciliation]] · [[10_FDG_CORE_Intelligence/FDG_CORE_ENGINEERING_REASONING_EXECUTION_CONTRACT_2026-09-30|Reasoning execution contract]] · [[10_FDG_CORE_Intelligence/FDG_CORE_REASONING_ACCEPTANCE_CASES_2026-09-30|Acceptance cases]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS]] → [[22_FDG_Audit_Intelligence_System/03_Repository_and_Knowledge_Audit/FAIS-RKA-0300 - Repository and Knowledge Audit|Repository and Knowledge Audit]] → this proposal


**Change history:** 2026-09-30 — initial additive review record; no predecessor removed or superseded by this publication.


---

## 2026-10-01 remediation and architecture review update

The October remediation applies the existing snapshot scanner to the working tree and checks original Markdown as exact preserved prefixes. New file-target wikilinks are verified separately from unresolved historical links. HydroCal's original source is preserved byte-for-byte; new regression tests exercise corrected behavior. FWIS's inventory distinguishes absent controls from historical claims.

Commands, evidence and exclusions: [[docs/audits/2026-10-01-remediation/REMEDIATION_AND_VERIFICATION|remediation and verification]]. Approval-claim queue: [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01|authority reconciliation register]].
