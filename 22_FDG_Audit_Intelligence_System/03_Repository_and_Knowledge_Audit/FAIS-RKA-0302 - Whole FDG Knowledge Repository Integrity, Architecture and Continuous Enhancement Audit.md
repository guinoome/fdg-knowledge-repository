---
document_id: FAIS-RKA-0302
title: Whole FDG Knowledge Repository Integrity, Architecture and Continuous Enhancement Audit — Collaborator Instruction
version: 1.0
status: Founder-directed audit instruction; execution not implied
owner: FAIS audit method; FPJIS project execution and acceptance; FMCIS collaborator coordination; relevant system/domain owners retain subject-matter authority
created: 2026-11-17
repository: guinoome/fdg-knowledge-repository
baseline_ref: Pin exact default-branch commit SHA at audit start
supersedes: none
companion:
  - FAIS-RKA-0301 — Full Repository Product Reality Audit and Agent Handover
  - FAIS-SSA-1001 v1.1 — Evidence-First Software Defect Diagnosis and Minimal Repair Protocol
---

# FAIS-RKA-0302 — Whole FDG Knowledge Repository Integrity, Architecture and Continuous Enhancement Audit

## 0. Mission and interpretation

This is an execution instruction for the assigned audit collaborators. It is **not evidence that an audit has already been performed**.

Conduct a complete, evidence-based audit of the accessible FDG Knowledge Repository. Examine its organizational knowledge, governance, system architecture, standards, indexes, cross-system relationships, project records, software source, tests, operational claims, collaborator instructions, tooling, and historical records. Identify what is missing, incomplete, contradictory, duplicated, stale, untraceable, inaccessible, incorrectly classified, or not implemented. Where a genuine improvement is justified and within authority, add it to the existing repository in a controlled, traceable manner.

The objective is to make the repository more coherent, reliable, navigable, executable, reusable, and useful to FDG—not to produce a large audit document, redesign the ecosystem, or increase document count.

**Founder preservation instruction:** Improve the repository without deleting, silently replacing, erasing, or discarding its existing references, decisions, history, evidence, or useful content. Preserve original material. Add corrections, clarifications, new evidence, cross-links, dated amendments, and explicit supersession records. If an old reference is no longer current, mark its status and point to the current authority; do not erase the historical reference.

**Core rule: inspect first, establish authority, prove the gap, then make the smallest additive improvement.** A document's existence is not proof that its content is approved, current, implemented, tested, or accepted.

This instruction applies to every collaborator, provider, model, tool and coding environment assigned to this work. It is provider-neutral.

## 1. Governing authority and related standards

Read these sources before material audit work:

1. Repository `README.md`, `AGENTS.md`, `FDG Ecosystem.md`, and `00_Nex/00_Master Index.md`.
2. The current system Master Index/Home and governing standards relevant to each audit area.
3. `Projects/Projects_Master_Index.md`, plus each relevant project's README, current handover, approved work package, source and tests.
4. FAIS-RKA-0301, the existing Full Repository Product Reality Audit and Agent Handover. This document complements it; it does not replace it. Use RKA-0301 for product/source/runtime reality, execution evidence, bounded repair, and lower-cost builder handovers.
5. FAIS-SSA-1001 v1.1 for any software defect diagnosis or repair. It is mandatory across FDG software projects. Do not diagnose by speculative editing.
6. Relevant FAIS repository/knowledge audit methods, FAIS evidence/provenance standards, FPJIS implementation and acceptance standards, FMCIS allocation/ownership rules, and the relevant domain authorities.

### 1.1 Authority boundaries

- **Founder-approved decisions and explicit authority** govern strategic direction and approval boundaries. Do not infer founder approval from an unreviewed draft or a model's recommendation.
- **FAIS** owns audit method, independent evidence assessment, findings, assurance and verification recommendations. An audit finding does not itself authorize implementation.
- **FPJIS** owns project requirements, implementation work packages, execution boundaries, project validation and acceptance records.
- **FMCIS** owns collaborator allocation, task ownership, handovers, coordination and conflict escalation.
- **System/domain owners** own substantive knowledge within their approved domains. Examples include engineering, security, legal, finance/business, platform experience, facilities operations and integration. Auditors must not silently transfer domain authority to FAIS or to themselves.
- **Project owners and authorized human decision-makers** approve consequential implementation, professional decisions, data changes, production release, external commitments and acceptance within their delegated authority.

If two sources conflict, do not choose whichever is newer, longer, or easier to implement without examining approval, authority, scope, effective date and evidence. Record the conflict and route it to the correct decision owner.

### 1.2 Non-downgrade rules

- Existing approved standards remain binding unless their authorized owner approves a controlled revision.
- A project may impose stricter controls, never silently weaker controls than mandatory FDG standards.
- Do not weaken engineering, safety, security, privacy, legal, financial, evidence, access-control, or release requirements to make a checklist pass.
- Preserve local-first, offline-capable where required, provider-neutral, replaceable-provider, source-backed and agent-neutral principles unless a documented founder-approved decision changes them.
- Do not treat a repository note, model response, external demo, marketing claim, or generated document as verified capability.

## 2. Audit principles

1. **Preserve before improving.** Pin the baseline, preserve source and evidence, and understand the existing structure before changing it.
2. **Evidence before judgment.** Every material finding must point to an exact path, line/section, commit, source, test, or reproducible observation.
3. **Authority before consolidation.** Do not merge documents or choose a canonical source until ownership and approval are established.
4. **Additive by default.** Prefer a dated addendum, correction note, explicit status field, link, index entry, or new version over rewriting existing material.
5. **One authority, many references.** Link to canonical sources; do not create competing standards or duplicate knowledge engines.
6. **Historical truth remains visible.** Preserve old decisions and explain what changed, when, why, who authorized it, and which version applies now.
7. **Separate facts, calculations, assumptions, proposals and unknowns.** Never present an inference as a verified fact.
8. **Distinguish documentation from execution.** Code present, test written, test executed, user accepted, operationally validated and commercially validated are different states.
9. **Respect ownership.** Do not overwrite another collaborator's active work, alter project-owned source, or expand scope without the required approval.
10. **Optimize for durable organizational capability.** Reusable standards, traceability, repeatable workflows, simple client outcomes and learning matter more than tool-specific optimization.
11. **Do not audit by filename alone.** Read the actual document, inspect its links and dependencies, and verify its claims against source where possible.
12. **Do not manufacture completeness.** If access, evidence, runtime, history or acceptance is missing, state exactly what remains unknown.

## 3. Scope: what “whole repository” means

Audit the complete accessible Git repository at the pinned commit, not merely selected folders or the most active projects.

Include, where present:

- Root-level instructions, policies, README files, indexes, configuration and repository metadata.
- Every numbered FDG intelligence system and its Master Index/Home, standards, methods, templates, decisions, evidence and subordinate domains.
- Nex, identity, governance, organizational architecture, agentic framework, knowledge management, knowledge architecture and CORE.
- Engineering intelligence and every engineering discipline or specialist knowledge area.
- Ecosystem integration, business intelligence, security intelligence, legal intelligence, service intelligence, facilities/building operations, platform intelligence, external intelligence and workflow automation.
- FPJIS, FMCIS, FAIS and their implementation packages, work allocation records, audit protocols and collaborator instructions.
- `Projects/Active/`, inactive/legacy project areas, prototypes, pilots, product source repositories, nested projects and relevant project-specific documentation.
- `Candidates/`, `People/`, `Journal/`, `docs/`, audit evidence, imported/reference libraries, lessons learned and historical records.
- Source code, tests, fixtures, build scripts, deployment configuration, CI workflows, security rules, database schemas/migrations, generated assets and operational tooling.
- Root and nested `AGENTS.md`, `CLAUDE.md`, contributor guides, agent prompts, task templates and other instructions that can change collaborator behavior.
- Archived/OLD folders, deprecated documents, duplicate-looking files and superseded references. These remain in scope for classification and traceability, not automatic cleanup.

Also identify relevant external dependencies and linked systems when they are necessary to assess a repository claim. Do not claim to have audited an external service, local Obsidian vault, production deployment, private repository, connected account or collaborator workstation unless it was actually accessible and inspected.

### 3.1 Inventory completeness

Use a complete tracked-file inventory from the pinned Git tree or a verified recursive traversal. Record the command/API method, commit SHA, pagination, truncation and exclusions. Search-index results alone are not a complete inventory.

For every tracked path, assign one disposition:

- `INSPECTED` — content/source was actually reviewed.
- `AUTOMATICALLY_CHECKED` — a reproducible automated check was run; state exactly what it checked.
- `SAMPLED` — only a defined sample was reviewed; never imply full inspection.
- `DEFERRED` — reason, risk, owner and next action recorded.
- `INACCESSIBLE` — explain access or tooling limitation.
- `NOT_APPLICABLE` — explain why.
- `UNKNOWN` — insufficient evidence to classify.

A complete audit requires a disposition for **100% of tracked paths**. It does not require manually reading every binary image or generated artifact; it does require identifying and classifying them, and inspecting them when they carry material evidence or functionality.

If GitHub API tree responses are truncated, paginate or use another verified method. If the audit is interrupted, report partial coverage and resume from the last verified checkpoint. Never describe partial inventory as exhaustive.

## 4. Required audit workflow

### Phase 0 — Assignment, authority and preservation

Before work begins, record:

- Audit lead, independent challenger/reviewer and any domain specialists.
- Actual provider, model and version where available; do not use model brand as proof of capability.
- Assigned scope, permissions, repository access and excluded systems.
- Current branch/ref and exact starting commit SHA.
- Working-tree status and any pre-existing uncommitted changes.
- Relevant active collaborator ownership and overlapping work.
- Whether the task permits read-only audit, additive documentation changes, code changes, or only recommendations.

Create a protected audit working branch or use the approved repository workflow. Do not overwrite active work. Preserve the original baseline and ensure every change can be reviewed and reverted.

**Default authority:** read-only inspection and reporting are allowed within the assignment. Additive documentation improvements may be made when the evidence and authority are clear and the change is non-conflicting. Changes to approved standards, system architecture, domain policy, active project code, data, production systems, external services, credentials, payments or legal/professional positions require the relevant owner approval. If authority is unclear, propose the patch and stop.

### Phase 1 — Repository map and document control

Build a repository inventory and system map. For each system or major area, record:

- Folder/path and purpose.
- Canonical Master Index/Home.
- Accountable system/domain owner, if defined.
- Governance/approval state: approved, founder-approved, draft, proposed, candidate, imported, historical, deprecated, superseded, disputed or unknown.
- Core standards and authoritative records.
- Inputs/dependencies and outputs/consumers.
- Active projects and handovers linked to it.
- Known unresolved decisions, audit findings and implementation gaps.
- Index/navigation paths and missing links.

Do not assume numbered folders are complete, correctly numbered, or all equally mature. Identify missing, reserved, duplicate, conflicting or incorrectly mapped system numbers and record the evidence. Do not create or renumber a system to make the map look tidy.

### Phase 2 — Governance and authority consistency

Check whether repository instructions agree about:

- Founder authority, delegation, approval and escalation.
- System ownership and separation of duties.
- Which document is canonical for each policy, standard, workflow and decision.
- Approval state, effective date, version, supersession and change history.
- FAIS/FPJIS/FMCIS boundaries.
- Project ownership, collaborator assignment, review and acceptance.
- Professional engineering, safety, legal, security, privacy, financial and production-release limits.
- AI/agent permissions, provider substitution and external data handling.
- Mandatory versus risk-triggered controls.
- Conflict resolution and what happens when required evidence is absent.

Search for old instructions that remain active in root prompts, templates or project handovers. A newer policy is not operationally effective merely because it exists: verify that collaborator entrypoints and templates point to it. Conversely, do not propagate every draft into active instructions.

For each conflict, capture the exact source passages, status and authority. Propose an additive resolution record; do not silently delete the losing or historical source.

### Phase 3 — Knowledge quality and completeness

Inspect each relevant knowledge domain for:

- Missing purpose, scope, owner, audience, definitions, inputs, outputs and boundaries.
- Unsupported assertions, unclear provenance or missing source links.
- Unstated assumptions, ambiguous terms, missing units, invalid formulas or incomplete methods.
- Missing decision rationale, acceptance criteria, failure modes or limitations.
- Stale technical versions, regulations, codes, standards, prices, provider capabilities or dates.
- Duplicate or near-duplicate documents with different authority claims.
- Inconsistent terminology, identifiers, versioning, status labels and naming conventions.
- Unclear distinction between canonical knowledge, candidates, imported references, working notes and historical records.
- Missing examples, test cases, operational instructions or practical application.
- Missing links to related domains, projects, evidence, decisions and lessons.
- Knowledge that exists only in a conversation, tool output or individual collaborator's context and has not been captured in the repository.
- Overly complex procedures that cannot be followed by their intended user or lower-cost collaborator.

For technical, legal, regulatory, engineering, financial or security content, verify against authoritative sources appropriate to the jurisdiction, date and subject. Record source identity, publication/version/date and the exact claim it supports. If external verification is unavailable, label the item `UNVERIFIED` and do not promote it to approved guidance.

Do not pad documents to satisfy a template. Add only information that materially improves correctness, usability, traceability, safety, implementation or future reuse.

### Phase 4 — Architecture and relationship integrity

Evaluate the architecture as a connected knowledge system, not a set of independent folders.

Check:

- Whether each subject has one clear canonical owner.
- Whether two systems claim the same responsibility or neither owns a critical responsibility.
- Whether system boundaries, interfaces, dependencies and escalation routes are explicit.
- Whether cross-system relationships are accurate and reciprocal where required.
- Whether project implementation references the correct domain standards.
- Whether reusable methods are duplicated instead of linked or shared.
- Whether an implementation has become an accidental authority over the knowledge standard.
- Whether old, imported or experimental material is incorrectly presented as approved.
- Whether new proposed capabilities create a parallel system, registry, workflow or database unnecessarily.
- Whether local-first, offline, provider-neutral and agent-neutral requirements are represented consistently.

Before proposing any new architecture or tool, perform the FDG disposition analysis:

**REUSE / EXTEND / MERGE / REPLACE / NEW**

Search the repository first, then credible upstream/open-source implementations and official documentation when an unfamiliar capability is involved. Assess maintenance, license, security, dependencies, compatibility, portability, cost, offline operation, data handling, operational burden and acceptance tests. “Open source” or “popular” is not proof of suitability. Record why the selected disposition is preferable.

### Phase 5 — Link, index and metadata integrity

Run automated and manual checks, as applicable, for:

- Broken Obsidian wikilinks, Markdown links, anchors and relative paths.
- Links that resolve to the wrong file because of duplicate names or ambiguous basenames.
- Missing Master Index entries for important canonical documents.
- Orphan documents with no meaningful parent or backlink.
- Stale links to renamed/moved documents.
- Duplicate identifiers, conflicting document IDs and version collisions.
- Missing or inconsistent frontmatter: title, ID, owner, status, version, dates, scope, source, related documents and supersession fields.
- Inconsistent use of tags, statuses, naming conventions and date formats.
- References to nonexistent systems, paths, tools, tests, issues, APIs or capabilities.
- Index entries that overstate approval, runtime readiness, product maturity or test results.
- Links that point to a historical copy when a current canonical source exists.

Do not auto-rewrite links in bulk without inspecting the target and understanding the intended authority. For each broken link, determine whether the target was renamed, removed, never created, moved to a different authority, or was intentionally historical. Preserve the old reference in an explanatory note when appropriate.

### Phase 6 — Decision, evidence and learning traceability

For material standards, architectural decisions and project outcomes, assess the evidence chain:

**Context → Origin → Reasoning → Calculation (where applicable) → Evidence → Engineering/Organizational Decision → Implementation → Verification → Report → Learning**

Check that the record distinguishes:

- Founder direction from collaborator suggestion.
- Approved decision from proposal.
- Primary source from secondary interpretation.
- Observed fact from assumption or inference.
- Calculation from measured value.
- Test definition from executed result.
- Historical result from current result.
- Technical completion from human acceptance.
- Human acceptance from production use or commercial success.

Where a decision lacks origin, rationale, evidence or approval, do not invent the missing material. Add a clearly marked gap and a proposed recovery action. Link to existing evidence rather than copying large bodies of content.

### Phase 7 — Project and product reality

Use FAIS-RKA-0301 as the detailed companion instruction for product reality, executable source, tests, release and customer outcome.

For every distinct accessible project/product, establish:

- Actual repository/path, branch and commit.
- Current handover and authorized work package.
- User, problem, intended workflow and visible outcome.
- Exact source files and runnable entrypoint.
- Data model, persistence, access controls and recovery.
- Tests and fixtures; distinguish historical from current execution.
- Offline/sync behavior where required.
- Build/deploy/release configuration and actual deployment evidence.
- Security, privacy, legal and engineering constraints.
- Real user/qualified-person acceptance, if any.
- Operational usage, payment, revenue or renewal evidence, if any.

Use these maturity labels precisely:

- `CONCEPT`
- `SPECIFIED`
- `CODE PRESENT`
- `TEST DEFINED`
- `TEST EXECUTED`
- `FUNCTIONAL CANDIDATE`
- `FUNCTIONALLY ACCEPTED`
- `OPERATIONALLY VALIDATED`
- `COMMERCIALLY VALIDATED`

A product may have different states for different scopes or workflows. Record the exact scope and evidence; do not assign a generic percentage. Never infer deployment, real customer use, professional acceptance, payment or revenue from source code, screenshots, a demo or a successful local test.

### Phase 8 — Software, data and security review

When reviewing software, inspect the source and tests—not only architecture documents or README descriptions.

Assess as relevant:

- Correctness, error handling, edge cases, input validation and numerical accuracy.
- Authentication, authorization, tenant/branch isolation and least privilege.
- Secrets, credentials, sensitive data, logging and data minimization.
- Database constraints, RLS/access policies, migrations, backup and restore.
- Persistence, autosave, interruption recovery and data integrity.
- Offline operation, synchronization, retry, conflict and duplicate-submission behavior.
- API contracts, integrations, dependency health and provider failure.
- Build reproducibility, CI checks, release artifacts, rollback and monitoring.
- Mobile/responsive usability, accessibility and client-facing error/empty states.
- Test coverage and quality, including negative/boundary/property-based tests where justified.
- Performance, concurrency, reliability and target-device constraints.

Do not expose real secrets or personal/client information in audit reports. Redact values while retaining enough evidence to identify the control failure. Never use production data for experiments unless specifically authorized and protected.

Any actual software defect diagnosis or repair must follow **FAIS-SSA-1001 v1.1**. Read-only diagnosis precedes code changes; establish the causal root cause; obtain authorized bounded repair scope; make a minimal correction; verify with Red–Green–Regression and risk-triggered controls. Do not bypass this requirement because the defect was found during a repository audit.

### Phase 9 — Findings, prioritization and decisions

Every material finding must have a stable ID and the following fields:

| Field | Required content |
|---|---|
| Finding ID | Unique, stable audit identifier |
| Area | System, project or repository layer |
| Finding type | Missing / incomplete / contradictory / duplicate / stale / broken link / unsupported claim / defect / security / usability / governance / implementation / verification |
| Exact evidence | Path, line/section, commit, test output, source URL or reproducible observation |
| Current state | What actually exists or happens |
| Expected state | Approved source, requirement or justified control |
| Gap and consequence | Specific effect on correctness, safety, usability, continuity, cost or delivery |
| Confidence | Confirmed / strongly supported / tentative / unknown |
| Risk | P0 / P1 / P2 / P3 / P4 |
| Proposed disposition | REUSE / EXTEND / MERGE / REPLACE / NEW / DEFER / NO CHANGE |
| Smallest useful action | Specific additive correction or bounded work |
| Owner | Authorized system/domain/project owner |
| Approval | Required approver or not required with rationale |
| Acceptance evidence | Exact test, review or observable result |
| Status | Open / proposed / approved / in progress / verified / deferred / rejected |

Use this risk guide, adapted to FDG context:

- **P0 — Critical:** credible safety/engineering harm, active security compromise, major data loss/corruption, unauthorized financial action or catastrophic operational impact. Contain safely and escalate immediately.
- **P1 — Major:** core workflow materially incorrect or unavailable, serious authority/security/privacy exposure, or false claim of production/acceptance.
- **P2 — Moderate:** material engineering, customer, integration, data-quality or adoption blocker with bounded scope.
- **P3 — Minor:** usability, navigation, documentation or low-impact quality gap.
- **P4 — Future:** optional capability, speculative improvement or low-priority refinement.

Do not rank by how easy a change is or how visually prominent it appears. Risk may be raised as evidence emerges. Record uncertainty and use a conservative provisional rating where necessary.

### Phase 10 — Additive enhancement and preservation protocol

When a deficiency is confirmed and a correction is within the collaborator's authority:

1. Record the original file path, baseline commit and relevant original content.
2. Identify the canonical owner and determine whether the proposed change conflicts with an approved decision.
3. Prefer a small dated addendum, new section, frontmatter clarification, status note, cross-link, index entry, or new versioned companion document.
4. Retain old wording and references where historically or contextually useful.
5. If old content is incorrect, add a visible correction explaining the exact error, corrected position, evidence, date and authority. Do not silently edit the old statement away.
6. If a document is superseded, mark it `SUPERSEDED` or equivalent, identify the replacement, effective date and reason, and retain the original file and link.
7. If duplicate content exists, nominate one canonical source and convert the other references into explanatory links only after owner approval. Do not delete either source.
8. Add backlinks and update the appropriate Master Index/navigation entry so the improvement can be found.
9. Preserve existing IDs, paths and anchors unless a necessary migration is approved and all references are mapped.
10. Keep changes small, reviewable and reversible. Do not perform repository-wide formatting or mass renaming as a side effect.
11. Include an audit note or commit description explaining what was added, why, evidence, and what was deliberately left unchanged.
12. Read the changed files back from the target branch and verify the final content and links.

**Never:**
- Delete an old reference, decision, audit finding, project handover or historical artifact to make the repository appear cleaner.
- Replace a long source document with a summary or generated rewrite.
- silently promote a draft or candidate to approved.
- invent founder approval, source evidence, test results, domain ownership or acceptance.
- merge contradictory standards without resolving authority.
- create a second canonical index, registry, policy engine or architecture when an existing one can be extended.
- make unrelated code, dependency, schema, deployment or production changes under the cover of a knowledge audit.

If a necessary correction cannot be made safely, write a proposed amendment with exact location and rationale, mark it `PROPOSED — OWNER DECISION REQUIRED`, and leave the source unchanged.

### Phase 11 — Validation of audit changes

For each changed document or source file:

- Inspect the complete diff against the pinned baseline.
- Confirm no old references or unrelated content were removed.
- Verify Markdown structure, frontmatter, code fences, tables and internal/external links as appropriate.
- Confirm wikilinks and relative paths resolve to the intended targets.
- Check identifiers, version, status, dates and ownership.
- Confirm no conflicting authority claim was introduced.
- Confirm all new claims are sourced or explicitly labeled as assumptions/proposals/unknowns.
- Read back the committed file from GitHub, not only the local working copy.
- Record commit SHA and exact changed paths.
- For code changes, run the relevant tests and record exact commands and actual outcomes. Follow FAIS-SSA-1001 v1.1 for defect repairs.
- For high-consequence changes, obtain independent review and the required domain-owner approval.

A documentation change can be verified for structural correctness and repository integration; it cannot by itself prove that a runtime capability, policy enforcement, collaborator behavior or product outcome works.

## 5. Required deliverables

Keep deliverables compact and link to source evidence. Do not copy the entire repository into the audit report.

### A. Audit execution and coverage register

Record:
- Audit title, lead, reviewers, start/end dates.
- Exact repository, branch, baseline SHA and tool/access limitations.
- Tracked path count and disposition counts.
- Coverage by top-level area/system.
- Deferred, inaccessible, sampled and unknown paths with reasons.
- Automated checks, commands, scripts and actual outputs.
- Changes made during the audit and their commits.

### B. Repository integrity and architecture findings register

One source-backed register covering:
- Governance and authority conflicts.
- Missing or weak system ownership.
- Architecture overlaps, gaps and duplication.
- Knowledge quality and provenance gaps.
- Broken links, index and metadata issues.
- Stale or contradictory instructions.
- Security, privacy and safety concerns.
- Documentation-to-source and source-to-test discrepancies.
- Historical records requiring reconciliation.

### C. Canonical authority and relationship map

For each system/domain, identify:
- Canonical Master Index/Home.
- Authoritative standards and records.
- Owner and approval state.
- Dependencies, interfaces and related systems.
- Active projects and handovers.
- Known disputes and missing decisions.

Use links to existing sources. Do not create duplicate copies of the source content.

### D. Project/product reality matrix

For every accessible project, record exact scope, source commit, runnable status, tests actually executed, known limitations, acceptance evidence, deployment status, operational use and commercial evidence. Use FAIS-RKA-0301 for the detailed method.

### E. Prioritized additive enhancement plan

For every approved or proposed improvement, state:
- Finding ID and exact source.
- REUSE / EXTEND / MERGE / REPLACE / NEW disposition.
- Exact file(s) and section(s) to add or amend.
- What existing material must remain untouched.
- Owner and approval requirement.
- Risk, effort/complexity and reusable value.
- Acceptance test or review evidence.
- Rollback/recovery approach where relevant.
- Status: approved, proposed, deferred or rejected.

### F. Collaborator-ready work packages

Create small work packages only for bounded, approved tasks. Use existing FPJIS implementation package standards and the one-page legacy agent build card where appropriate. Each work package must specify:

1. One visible outcome or bounded repository correction.
2. Exact files to inspect/change.
3. Existing code/knowledge to reuse.
4. Existing references that must not be deleted or altered.
5. Numbered implementation steps.
6. Acceptance criteria and exact tests.
7. Authority and stop conditions.
8. Required return evidence and handover location.

Do not send a lower-capability collaborator the entire audit as an unbounded instruction to “fix everything.”

### G. Final audit handover

A concise executive handover must state:
- What was actually inspected and at what commit.
- What was not inspected and why.
- Highest-risk confirmed findings.
- Improvements actually committed and verified.
- Proposed changes awaiting owner decisions.
- Project/product status without unsupported readiness percentages.
- Open conflicts, unknowns and risks.
- Exact next action, owner and required approval.
- Exact commit(s), changed paths and verification evidence.

## 6. Independent review and disagreement handling

Use a separate reviewer for material architecture, security, engineering, financial, legal, data-integrity or high-impact findings when available.

The independent reviewer must challenge:
- Whether the evidence supports the finding.
- Whether the cited source is truly authoritative.
- Whether the proposed fix preserves existing behavior and historical truth.
- Whether an existing standard or component already solves the problem.
- Whether risk and consequence are understated.
- Whether a new document or system is actually necessary.
- Whether tests prove the claimed result.
- Whether the recommendation exceeds the collaborator's authority.

Record reviewer identity/provider, exact scope reviewed, findings, unresolved disagreement and disposition. A second model agreeing with the first is not independent proof. If an independent reviewer is unavailable, say so and identify which findings remain unreviewed.

Where reviewers disagree, preserve both evidence-backed positions and route the decision to the proper owner. Do not resolve disagreements by averaging opinions or silently choosing the easiest implementation.

## 7. Stop and escalation conditions

Stop the affected scope and report **BLOCKED WITH EVIDENCE** when:

- Repository access or baseline identity is uncertain.
- The complete tracked inventory cannot be established.
- A source conflict requires founder or system-owner judgment.
- The proposed change would alter an approved standard, authority boundary or architecture without approval.
- Ownership of a file or active task is disputed.
- A finding could affect safety, professional engineering decisions, legal/regulatory compliance, security, privacy, finance or production data and the required specialist/authority is absent.
- A root cause is not established for a proposed software repair.
- Required test data, runtime, environment, permissions or independent verification is unavailable.
- A change risks deleting or invalidating historical references or accepted behavior.
- The proposed solution introduces a parallel system or materially expands scope.
- A collaborator is asked to claim tests, deployment, acceptance, revenue or enforcement that has not been evidenced.

Do not stop unrelated safe read-only work because one area is blocked. Isolate the blocked area, record its dependency and continue the remaining authorized audit.

## 8. Completion criteria

The audit may be called **WHOLE-REPOSITORY AUDIT COMPLETE** only when all of the following are true:

1. Exact baseline commit SHA and repository scope are recorded.
2. 100% of tracked paths have a documented audit disposition.
3. Every top-level system/project area is accounted for, including legacy, archived, imported, reference and tooling areas.
4. Governance, ownership, canonical authority, architecture relationships and material conflicts are assessed.
5. Knowledge provenance, metadata, navigation, links and index integrity are assessed with actual checks recorded.
6. Every accessible project/product is represented in the product reality matrix; inaccessible or untested areas are explicitly marked.
7. All material findings have evidence, risk, owner, proposed disposition and status.
8. Additive improvements actually made are diff-reviewed, read back and verified; unapproved proposals remain unchanged.
9. Historical references and useful original material are preserved.
10. Material high-risk findings receive appropriate independent/domain review or are explicitly marked pending.
11. Open risks, unknowns, conflicts, deferred paths and limitations are disclosed.
12. The final handover contains exact commits, changed paths, tests/checks and the next authorized action.

Even after completion, do not claim that all FDG knowledge is true, all external systems are audited, every collaborator has loaded the changes, all software works, or all products are accepted. State the exact repository and evidence boundary.

If any completion criterion is unmet, use **PARTIAL AUDIT — NOT COMPLETE**, with coverage and blockers.

## 9. Collaborator execution receipt

Every collaborator must return this receipt. Do not leave fields blank by inventing information; use `UNKNOWN`, `NOT RUN`, `NOT AVAILABLE` or `NOT APPLICABLE` with a reason.

```text
FAIS-RKA-0302 EXECUTION RECEIPT

Audit lead:
Provider / model / version:
Independent reviewer:
Start / end date:
Repository:
Branch / exact baseline SHA:
Working-tree state:
Access and scope limitations:

TRACKED PATH INVENTORY
Total tracked paths:
INSPECTED:
AUTOMATICALLY CHECKED:
SAMPLED:
DEFERRED:
INACCESSIBLE:
NOT APPLICABLE:
UNKNOWN:
Coverage = disposition assigned to every tracked path? YES / NO

SYSTEMS / PROJECTS
Areas inspected:
Areas partially inspected:
Areas not inspected:
Current canonical authority conflicts:

CHECKS
Inventory method:
Link checks and results:
Metadata/index checks and results:
Architecture/authority checks:
Source/test checks:
Security/privacy checks:
Other commands and actual outputs:

FINDINGS
Finding register location:
Highest-risk confirmed finding IDs:
Unresolved/contested finding IDs:
Owner decisions required:

CHANGES
Changed paths:
Original references preserved? YES / NO
Additive changes made:
Proposals not applied:
Commit SHA(s):
Read-back verification:
Tests/checks actually executed:
Failed / skipped / blocked / not-run checks:

REVIEW
Independent review scope:
Reviewer findings:
Unresolved disagreements:
Domain-owner approvals:

FINAL DISPOSITION
WHOLE-REPOSITORY AUDIT COMPLETE / PARTIAL AUDIT — NOT COMPLETE
Reason:
Known residual risks and unknowns:
Next action:
Next owner:
Required approval:
```

## 10. Required collaborator behavior

Work in controlled batches, maintain a durable progress register, and commit useful findings frequently through the approved workflow. Do not wait until the end to discover that a system or project was omitted.

Before each batch, state the paths and questions covered. After each batch, update coverage, findings and unresolved issues. Reuse prior verified audits; do not repeat unchanged work unless the baseline or evidence has materially changed. When rechecking prior findings, record whether they remain valid, were corrected, were superseded or cannot be verified.

Do not ask the founder to repeat decisions already recorded in the canonical repository. Search the relevant records first. If the decision cannot be found, state the search scope and record **NOT FOUND IN ACCESSIBLE CANONICAL RECORDS** rather than guessing.

Use plain language for the final handover while retaining precise engineering, governance and audit terminology. Explain why a finding matters, what is affected, what evidence proves it, what must be preserved, and what exact action is next.

**The final standard is not a cleaner-looking repository. It is a more trustworthy, traceable, connected and executable FDG knowledge system—improved without erasing the organizational memory that made it possible.**
