# FDG Knowledge Repository — Pre-GitHub Repository-Wide Audit, Link Integrity & Synchronization Mandate

## Mission

Act as the **FDG Knowledge Repository Architect, Auditor, Knowledge Systems Engineer, and Pre-Push Integrity Reviewer**.

The primary source of truth for this task is the complete local FDG Knowledge Repository:

`C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository`

The corresponding GitHub repository is:

`https://github.com/guinoome/fdg-knowledge-repository`

For this audit, treat the **local repository as the working/master source** and GitHub `main` as the remote mirror that must be reconciled before any new push.

Your objective is to make the complete FDG Knowledge Repository substantially stronger, more coherent, maintainable, scalable, navigable, connected, auditable, and safe to synchronize to GitHub.

Do not optimize for producing more documents.

Optimize for:

- organizational capability
- structural integrity
- traceability
- reuse
- maintainability
- scalability
- discoverability
- knowledge lifecycle value
- technology independence
- long-term organizational durability
- link integrity
- relationship integrity
- synchronization integrity
- safe Git history
- preservation of existing knowledge

The repository is the **institutional memory and second brain of the FDG Ecosystem**.

Claude, Codex, Obsidian, Git, GitHub, databases, hosting platforms, APIs, AI models, and individual collaborators are replaceable.

The knowledge architecture must remain valuable if any of them are replaced.

---

# NON-NEGOTIABLE SOURCE-OF-TRUTH RULE

For this audit:

1. The local vault is the **primary working source**.
2. GitHub `main` is the **remote synchronization/reference source**.
3. Do not assume GitHub is newer.
4. Do not assume local is complete merely because it contains more files.
5. Compare both before any push.
6. Never overwrite or delete local knowledge merely to make it match GitHub.
7. Never force-push merely to eliminate divergence.
8. Never perform `git reset --hard`, destructive checkout, mass deletion, or history rewriting unless explicitly authorized by the Founder after a written impact assessment.
9. A GitHub mismatch is an audit condition to resolve, not permission to discard either side.
10. The final objective before push is a **verified, explainable, additive or intentionally reconciled local state**.

---

# CORE OPERATING MODEL

Use this sequence:

1. DISCOVER
2. INVENTORY
3. AUDIT
4. LINK & RELATIONSHIP AUDIT
5. LOCAL ↔ GITHUB RECONCILIATION
6. ARCHITECT
7. BOUNDED REMEDIATION
8. VALIDATE
9. PRE-PUSH GATE
10. STOP AND REPORT

Do not skip directly to restructuring, cleanup, commit, or push.

---

# STAGE 1 — DISCOVER

Inspect the complete local repository structure and relevant content recursively.

Include, as applicable:

- all numbered FDG Intelligence Systems
- governance
- identity
- Nex
- FDG CORE
- knowledge management
- knowledge architecture
- organizational architecture
- integration hubs
- project systems
- business systems
- engineering systems
- legal systems
- security systems
- collaboration systems
- service systems
- platform systems
- external intelligence
- workflow and automation intelligence
- multi-collaboration intelligence
- audit intelligence
- current and future system folders
- indexes
- manifests
- roadmaps
- READMEs
- MOCs / maps of content
- templates
- standards
- decisions
- operating models
- architecture references
- archive areas
- hidden repository control/configuration files relevant to synchronization

Determine what the repository actually contains before judging what it should contain.

Do not infer a folder merely from prior expectations. Verify it exists.

---

# STAGE 2 — INVENTORY

Create a machine-verifiable repository inventory before making changes.

Inventory at minimum:

- all directories
- all Markdown files
- all non-Markdown knowledge assets
- file counts by top-level system
- empty directories
- duplicate filenames
- near-duplicate titles
- duplicate document IDs
- naming anomalies
- numbering anomalies
- missing expected CORE documents
- missing README/index/manifest files
- archived/deprecated material
- untracked files
- ignored files relevant to organizational knowledge
- Git status
- current branch
- configured remotes
- local HEAD
- remote `origin/main` HEAD
- ahead/behind/diverged status

Preserve an inventory snapshot in the audit report so later changes are traceable.

---

# STAGE 3 — REPOSITORY-WIDE ARCHITECTURAL AUDIT

Audit the **entire FDG Knowledge Repository**, not only FBPOIS, FEIS, FAIS, or any individual system.

Evaluate:

- information architecture
- naming and numbering
- hierarchy
- governance
- authority
- cross-system relationships
- document control
- knowledge lifecycle
- dependency integrity
- navigation
- discoverability
- duplication
- contradictory definitions
- foundational architecture
- scalability
- maintainability
- local-first operation
- technology replacement resilience
- synchronization architecture
- Git/GitHub readiness
- future integration capability
- future payment interoperability

Classify significant structural decisions as:

- KEEP
- MODIFY
- MOVE
- MERGE
- SPLIT
- CREATE
- DEPRECATE
- REQUIRES HUMAN APPROVAL

Do not restructure for aesthetics.

Prefer the smallest architecture that creates strong organizational capability.

---

# AUTHORITY AUDIT

Determine, from repository evidence:

- authoritative documents
- derivative documents
- reference documents
- working notes
- temporary material
- historical/superseded material
- unresolved authority conflicts

Do not invent authority.

Where two documents appear authoritative but disagree, preserve both and report the conflict unless an existing governance rule resolves it.

---

# STAGE 4 — OBSIDIAN WIKI-LINK, MARKDOWN LINK, BACKLINK & RELATIONSHIP AUDIT

This stage is mandatory.

Audit the repository as a **connected knowledge graph**, not merely a collection of folders.

## 4.1 Wiki-Link Integrity

Inspect all Obsidian links, including:

- `[[Note]]`
- `[[Folder/Note]]`
- `[[Note|Alias]]`
- `[[Note#Heading]]`
- `[[Note#^block-id]]`
- embeds such as `![[Note]]`
- image/file embeds
- links with renamed targets
- links whose target is ambiguous because duplicate filenames exist

Identify:

- broken wiki-links
- unresolved targets
- ambiguous targets
- case/path inconsistencies
- invalid headings or block references
- links to archived/deprecated notes presented as current
- self-links
- circular relationships that indicate architecture problems
- duplicated aliases that reduce discoverability

Do not break valid Obsidian links during rename/move operations.

## 4.2 Markdown Link Integrity

Inspect standard Markdown links:

`[label](relative/path.md)`

and repository-relative file/image references.

Identify broken:

- relative paths
- anchors
- asset paths
- README navigation links
- manifest links
- index links

Do not treat external HTTP links as internally valid merely because the syntax is correct.

## 4.3 Related-Topic Connectivity

For every major Intelligence System and major foundational document, determine whether it is appropriately connected to:

- parent architecture
- governance
- system CORE
- roadmap
- relevant standards
- related Intelligence Systems
- dependencies
- upstream sources
- downstream consumers
- integration hub where applicable
- audit/assurance interfaces where applicable

Flag:

- orphaned important notes
- systems with no inward references
- systems with no outward references
- duplicate concepts that should reference each other
- related topics that exist but are not linked
- references that point to obsolete or incorrect locations

Do **not** create links merely to increase graph density.

Every new relationship must have a clear semantic reason.

## 4.4 Navigation Layers

Verify that navigation works at multiple levels:

**Repository → Intelligence System → Module → Document → Related Knowledge**

Where justified, strengthen:

- Master Index
- system index
- README
- manifest
- MOC / relationship map
- `Related`
- `See Also`
- `Depends On`
- `Governed By`
- `Audited By`
- `Provides To`
- `Consumes From`

Use existing FDG conventions when they exist.

Do not impose a new metadata scheme repository-wide unless supported by evidence and approved.

## 4.5 Link Repair Rule

Repair only links whose correct target can be established from repository evidence.

If multiple plausible targets exist:

- do not guess
- record the ambiguity
- classify it for human approval

---

# STAGE 5 — LOCAL ↔ GITHUB RECONCILIATION AUDIT

Before any push, compare the local repository to:

`origin/main`

and the current GitHub repository.

The GitHub repository currently exists at:

`guinoome/fdg-knowledge-repository`

with default branch:

`main`

Do not change the remote repository during this audit.

## Required Git Inspection

Perform, or the equivalent of:

- confirm current working directory
- `git status`
- `git branch --show-current`
- `git remote -v`
- `git fetch origin`
- determine local HEAD
- determine `origin/main` HEAD
- inspect ahead/behind/divergence
- inspect staged changes
- inspect unstaged changes
- inspect untracked files
- inspect deleted files
- compare local tree against `origin/main`
- identify remote-only files
- identify local-only files
- identify files modified on both sides

Do not automatically pull, merge, rebase, reset, checkout, or push simply because divergence exists.

## Reconciliation Classification

Classify every material difference as:

- LOCAL ONLY — candidate to add to GitHub
- REMOTE ONLY — investigate before restoring/merging locally
- IDENTICAL
- LOCAL MODIFIED
- REMOTE MODIFIED
- BOTH MODIFIED
- LOCAL DELETED
- REMOTE DELETED
- RENAMED / MOVED
- GENERATED / SHOULD BE IGNORED
- REQUIRES HUMAN APPROVAL

## Merge Principle

Where both local and remote contain useful content:

**merge knowledge; do not blindly replace either copy.**

Preserve:

- unique sections
- decisions
- references
- provenance
- history
- authoritative material
- relationship links

If an automatic semantic merge is unsafe, stop and report the conflict.

---

# GITHUB CONTENT PARITY GATE

Before authorizing a push, verify that every organizational-knowledge file intended for version control is present in the local Git working tree and will be included by Git.

Check specifically:

- new Intelligence System folders
- new CORE documents
- manifests
- READMEs
- indexes
- roadmaps
- templates
- diagrams/assets referenced by Markdown
- cross-system maps
- governance documents
- architecture baselines
- FAIS audit records intended to be version controlled

Verify ignored files intentionally.

Do not assume a file is pushable merely because it exists in Obsidian.

Report any important file excluded by `.gitignore`.

---

# EVIDENCE DISCIPLINE

Every material audit conclusion must be labeled internally or explicitly distinguish:

- VERIFIED FACT
- LOCAL REPOSITORY EVIDENCE
- GITHUB EVIDENCE
- INFERENCE
- ARCHITECTURAL ANALYSIS
- RECOMMENDATION
- REQUIRES HUMAN APPROVAL

Never convert a recommendation into an approved FDG decision.

Never fabricate:

- organizational facts
- standards
- dependencies
- decisions
- history
- missing links
- technical capability
- Git state

---

# STAGE 6 — TARGET ARCHITECTURE

After discovery and audit, determine whether the repository needs architectural improvement.

Preserve strong existing structures.

Prefer reuse over replacement.

Any significant move, rename, merge, or split must include:

- current path
- proposed path
- reason
- dependencies affected
- links affected
- expected benefit
- rollback path
- human approval requirement, if material

Do not allow one Intelligence System to distort repository-wide architecture.

---

# LOCAL-FIRST ARCHITECTURE

Preserve the repository as a local-first organizational capability.

The local vault must remain usable when:

- internet is unavailable
- GitHub is unavailable
- Obsidian is replaced
- a collaborator is unavailable
- an AI model is replaced

Use stable, portable knowledge formats.

Obsidian features may enhance usability but must not become the only way to interpret critical institutional knowledge.

---

# TECHNOLOGY & VENDOR INDEPENDENCE

Do not unnecessarily bind the repository to:

- Codex
- Claude
- ChatGPT
- Obsidian
- GitHub
- one database
- one cloud
- one AI model
- one provider
- one application framework

The repository architecture should explain itself through its files, relationships, standards, and governance.

---

# STAGE 7 — BOUNDED REMEDIATION

After sufficient understanding, Codex may implement only clearly justified knowledge-architecture improvements.

Permitted examples:

- repair verified broken links
- add missing reciprocal/cross-system references
- improve indexes
- improve manifests
- improve READMEs
- connect related Intelligence Systems
- add missing navigation
- correct obvious naming/numbering inconsistencies
- improve metadata only where an existing convention is established
- identify/archive clearly superseded material through governed methods
- create repository-level audit artifacts
- add missing relationship maps
- restore remote-only valuable material after evidence-based reconciliation

Do not perform broad destructive changes autonomously.

---

# PROHIBITED ACTIONS

Do NOT:

- force push
- run `git reset --hard`
- discard local changes
- delete untracked files merely because they are not on GitHub
- make local equal GitHub by destructive replacement
- make GitHub equal local without auditing divergence
- rewrite Git history
- mass rename or mass move without link-impact analysis
- delete potentially valuable knowledge
- overwrite authoritative material
- merge conflicting documents by guessing
- fabricate wiki-link targets
- create meaningless backlinks
- introduce unnecessary folders
- begin application/software development
- modify FBPOIS or FEIS implementation code
- implement external integrations
- implement payments
- optimize repository structure for a single AI/model/tool

If a destructive action appears necessary, stop and report it under **REQUIRES HUMAN APPROVAL**.

---

# STAGE 8 — VALIDATION

After remediation, rerun all relevant checks.

At minimum validate:

- repository inventory
- wiki-links
- Markdown links
- embeds/assets
- duplicate filenames
- duplicate IDs
- orphaned important documents
- Master Index
- system indexes
- manifests
- roadmap connections
- governance references
- cross-system references
- relation maps
- Git status
- staged/unstaged/untracked/deleted files
- local vs `origin/main` difference

Any remediation that creates new broken links or unexplained deletions is a failed validation.

---

# STAGE 9 — PRE-PUSH GATE

Codex must **NOT push automatically**.

The audit ends with a pre-push decision.

Classify status as one of:

## READY FOR REVIEW AND COMMIT

Use only when:

- audit completed
- critical link integrity issues resolved or explicitly accepted
- repository architecture is coherent enough for the current milestone
- no unexplained deletions
- no unresolved dangerous merge conflicts
- GitHub divergence is understood
- intended files are not accidentally ignored
- local changes are internally consistent

## BLOCKED — HUMAN DECISION REQUIRED

Use if:

- authority conflicts remain
- destructive reconciliation would be required
- both local and remote have conflicting valuable content
- important wiki-link targets are ambiguous
- large-scale structural changes remain unapproved
- sensitive data would be pushed
- unexplained deletions exist
- remote divergence cannot be safely resolved

## NOT READY

Use where audit quality, structural integrity, evidence, or repository state is insufficient.

Do not stage, commit, or push merely to reach READY status.

---

# STAGE 10 — STOP AND REPORT

Create a **Pre-GitHub Repository Architecture & Integrity Baseline**.

The report must contain:

1. Executive conclusion
2. Local repository current state
3. GitHub current state
4. Local ↔ GitHub reconciliation status
5. Top-level system inventory
6. Structural findings
7. Critical gaps
8. Authority map
9. Dependency map
10. Duplicate/conflicting knowledge
11. Wiki-link audit results
12. Markdown-link audit results
13. Broken links
14. Ambiguous links
15. Orphaned important notes
16. Cross-system relationship gaps
17. Index/README/manifest coverage
18. Naming/numbering issues
19. Governance connectivity
20. Changes implemented
21. Files moved/renamed and link impacts
22. Changes requiring human approval
23. Remote-only material
24. Local-only material
25. Files modified on both sides
26. Deleted-file analysis
27. `.gitignore` / excluded knowledge review
28. Untracked-file review
29. Security/privacy pre-push review
30. Repository architecture readiness
31. FEIS readiness
32. FBPOIS readiness
33. FPJIS readiness where applicable
34. FAIS integration/readiness
35. Local-first readiness
36. Local ↔ Web readiness
37. Integration readiness
38. Payment interoperability readiness
39. Repository-wide roadmap
40. PRE-PUSH GATE RESULT

---

# REQUIRED AUDIT ARTIFACTS

Where consistent with existing repository architecture, create or update audit artifacts such as:

- Repository Architecture Baseline
- Repository Integrity Audit
- Link Integrity Report
- Cross-System Relationship Map
- Local-GitHub Reconciliation Report
- Pre-Push Checklist
- Change Log / Remediation Log

Do not create duplicates if equivalent authoritative artifacts already exist.

Prefer updating/reusing the correct existing document.

---

# SECURITY / PRIVACY PRE-PUSH CHECK

Before declaring READY, check whether version-controlled changes contain material that should not be public, including:

- credentials
- API keys
- tokens
- passwords
- private certificates
- personal secrets
- private client information
- confidential contracts
- sensitive personal data
- local-machine secrets
- environment files
- temporary exports
- caches
- recoverable deleted secrets

Do not expose secret values in the audit report.

Report file/path and risk classification only.

If sensitive material is detected, PRE-PUSH status is **BLOCKED** until resolved.

---

# CHANGE CONTROL

For every implemented remediation, record:

- what changed
- why
- source evidence
- affected files
- affected links
- authority
- validation performed
- remaining uncertainty

No material architectural change should be invisible.

---

# QUALITY STANDARD

Operate as though this repository must survive:

- replacement of Codex
- replacement of Claude
- replacement of ChatGPT
- replacement of Obsidian
- replacement of GitHub
- replacement of hosting
- replacement of databases
- replacement of AI models
- replacement of payment providers
- replacement of communication platforms
- replacement of individual collaborators

Preserve:

**organizational knowledge > individual memory**

**principles > tools**

**architecture > implementation**

**traceability > convenience**

**evidence > assumption**

**reuse > reinvention**

**maintainability > novelty**

**lifecycle value > short-term optimization**

**platform independence > vendor lock-in**

**local capability > mandatory cloud dependency**

**safe reconciliation > destructive synchronization**

**connected knowledge > isolated documents**

---

# FINAL MANDATE TO CODEX

Audit the complete local FDG Knowledge Repository first.

Treat:

`C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository`

as the primary working source for this audit.

Reconcile it against:

`https://github.com/guinoome/fdg-knowledge-repository`

before any future GitHub push.

Audit not only folders and documents but also the **knowledge connections** between them.

Verify all Obsidian wiki-links, Markdown links, embeds, indexes, manifests, related-topic references, system relationships, dependencies, governance references, and cross-system connections.

Strengthen missing connections only where repository evidence establishes a valid relationship.

Do not create links merely for graph density.

Do not discard local knowledge to match GitHub.

Do not overwrite GitHub knowledge blindly with local content.

Merge useful knowledge when safe.

Escalate ambiguous conflicts.

Perform bounded remediation only after discovery and audit.

Validate again after remediation.

Then stop and produce the **Pre-GitHub Repository Architecture & Integrity Baseline** and explicit **PRE-PUSH GATE RESULT**.

Do **not** push to GitHub.

Do **not** force synchronization.

Do **not** start software construction.

The Founder will review the baseline and decide when the repository is authorized for commit/push.
