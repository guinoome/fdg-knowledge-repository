# CORE-HANDOVER — Repository Integration Mandate

## Objective

Integrate this package into the user's local FDG Knowledge Repository without destroying or duplicating existing architecture.

Primary local repository previously identified by the user:

`C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository`

GitHub mirror previously identified:

`guinoome/fdg-knowledge-repository`

The local repository is the working source to audit before the next push. Verify the current repository state rather than assuming this package is newer than every existing note.

## Mandatory procedure

### 1. Audit before writing

Search repository-wide for:

- CORE / FDG CORE;
- Engineering Platform;
- FEIS;
- Testing & Commissioning;
- Energy Audit;
- Preventive Maintenance;
- RCA;
- BIM;
- Construction Inspection;
- CAPEX;
- MEPF;
- asset/equipment identity;
- evidence/provenance;
- subscription/tenant/white-label;
- document generation;
- hybrid engineering memory;
- agent/provider neutrality.

### 2. Build a conflict map

Classify each proposed concept as:

- already canonical — link only;
- compatible enhancement — merge;
- duplicate — do not create;
- conflicting — escalate/ADR;
- genuinely new — create;
- obsolete — preserve history but supersede.

### 3. Preserve existing approved architecture

Do not reset previously approved structures. Use additive/merge-oriented changes. Preserve decision history.

### 4. Resolve wikilinks

Replace placeholder semantic wikilinks with the repository's actual canonical note titles. Add reciprocal links where useful.

### 5. Establish canonical hierarchy

Determine whether the repository already has a canonical home for this foundation. Do not invent a new top-level folder without auditing the Master Index and existing architecture.

### 6. Produce ADRs

At minimum:

- Structured engineering record is authoritative; documents are views.
- CORE owns shared primitives, modules own domain logic.
- T&C is reference implementation, not CORE definition.
- Capture once/reuse everywhere.
- Tenant, entitlement, authorization and branding are separate.
- AI/models are replaceable intelligence resources, not the system of record.
- Local-first/offline-capable/provider-replaceable requirements.
- Historical records are superseded, not silently overwritten.

### 7. Validate repository navigation

Ensure the new canonical notes are reachable from the relevant master indexes and module indexes and are not orphan notes.

### 8. Implementation handover discipline

Before an implementation agent reaches platform/session/token limits, it must write a concise continuation handover containing:

- objective;
- completed work;
- files changed;
- decisions made;
- tests/results;
- unresolved conflicts;
- next actions;
- exact continuation point.

The handover must allow a different provider/agent to continue without reconstructing prior work.

## Deliverables expected from integration agent

1. Repository audit report.
2. Conflict/duplication map.
3. Final canonical file placement.
4. Merged/created Markdown notes.
5. ADRs.
6. Updated indexes/wikilinks.
7. Change log.
8. Validation report for broken/orphan links where tooling permits.
9. Git-ready change summary.
10. Agent-neutral continuation handover.

## Do not

- overwrite existing canonical notes blindly;
- create duplicate architecture because filenames differ;
- treat chat memory as repository evidence;
- hard-code OpenAI/Anthropic/other model vendors into CORE authority;
- make T&C the only workflow CORE can support.
