# FEIS-CM-0900 — Multi-Collaborator Build Handover

**Status:** Active Build Handover  
**Purpose:** Allow qualified collaborators or coding agents to start work without reconstructing architectural intent.

## Read First

1. [[00_Nex/CONSTITUTIONAL_AUTHORITY|Constitutional Authority]]
2. [[01_Governance/NEX-STD-003_DECISION_EVOLUTION_STANDARD|Decision Evolution Standard]]
3. [[04_Knowledge_Management/KNOWLEDGE_PRESERVATION_STANDARD|Knowledge Preservation Standard]]
4. [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
5. [[06_Organizational_Architecture/COLLABORATION_STANDARD|Collaboration Standard]]
6. [[21_FDG_Multi_Collaborator_Intelligence_System/00_FMCIS_Home/FMCIS-0000 - FMCIS Master Index|FMCIS]]
7. [[08_FEIS_Engineering_Intelligence_Systems/01_Engineering_Company_Core/FEIS-ECC-0000 - Engineering Company Core|Engineering Company Core]]
8. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management Master Index]]
9. [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0100 - Bidding to Turnover Template Catalog|Bidding to Turnover Template Catalog]]

## Mandatory Non-Rewrite Rule

> An agent or collaborator must not rewrite, refactor, replace, clean up, or take over another collaborator's assigned work unless the governing work package or authorized coordinator explicitly requests it.

If another collaborator's output appears incorrect, incomplete, duplicative or improvable:

1. preserve the existing work
2. record the issue/evidence
3. identify the affected work package
4. propose a patch, extension, successor artifact or review item
5. escalate cross-package conflicts
6. wait for explicit authority before rewriting another owner's work

Do not silently overwrite another collaborator's implementation.

## Additive Evolution Rule

Approved or superseded knowledge must not be deleted merely because a newer approach exists.

Prefer:

- additive improvement
- explicit version/evolution note
- successor link
- archive/preservation
- migration guidance

over destructive replacement.

## Work Package Isolation

Each build work package should declare:

- accountable owner / agent
- owned files / modules / directories
- allowed shared interfaces
- read-only dependencies
- deliverables
- acceptance criteria
- test requirements
- handover artifact
- prohibited modification areas

A collaborator may read neighboring work for context but may not modify it without authority.

## Recommended Build Sequence

1. Company Core data model and tenant/project/user foundations
2. Construction Management project/WBS/BOQ/work-package foundation
3. Operational event model
4. Site Engineer mobile-first update workflow
5. Daily/weekly/monthly report projections
6. Progress and quantity validation
7. QA/QC integration
8. Billing-draft projection with approval boundaries
9. Document control / RFI / submittal linkage
10. Testing & Commissioning integration
11. Punch list and turnover
12. Personnel continuity / successor handover
13. Named-user subscription/session enforcement
14. Knowledge-return loop into DCKL

## Non-Negotiable Architecture

- structured records are authoritative
- reports are projections
- historical authorship is immutable
- approval authority is explicit
- billing states are not collapsed
- offline-capable architecture is preserved where field use requires it
- jurisdiction-specific rules remain separable
- no per-client code fork as the default customization method
- knowledge and data export/portability must be possible
- no collaborator becomes a single point of organizational knowledge

## Definition of a Good Handover

The next qualified collaborator can determine:

- objective
- current state
- completed work
- open work
- owned files
- dependencies
- known defects
- tests
- decisions
- next action

without asking the departing collaborator to reconstruct history.

## Connected Knowledge

- [[21_FDG_Multi_Collaborator_Intelligence_System/01_Architecture/FMCIS-003_Work_Package_Allocation|FMCIS Work Package Allocation]]
- [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0003 - Project Continuity and Personnel Handover Standard|Project Continuity and Handover]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/02_Construction_Management/FEIS-CM-0000 - Construction Management Master Index|Construction Management]] → this document
