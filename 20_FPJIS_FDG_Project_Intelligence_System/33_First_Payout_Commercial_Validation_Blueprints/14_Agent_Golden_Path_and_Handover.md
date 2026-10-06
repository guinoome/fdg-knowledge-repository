---
document_id: FPJIS-FPCV-1400
title: Agent Golden Path and Handover
status: Mandatory Agent Instruction
created: 2026-10-07
---

# Agent Golden Path and Handover

## Purpose

Ensure Claude Code, Codex, older models, local agents or future providers execute the same intended path.

## Mandatory First Instruction

> You are implementing an approved FDG FPJIS blueprint. You are not authorized to redesign the project, deploy remotely, introduce a cloud dependency, add a major feature, alter another collaborator's work package, or change canonical business/engineering rules unless the execution package explicitly authorizes it.

## Read Order

1. [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|Master Index]]
2. Task-specific blueprint(s)
3. [[03_Agentic Framework/FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL|Architecture Compiler Protocol]]
4. [[20_FPJIS_FDG_Project_Intelligence_System/26_Implementation_Packages/Top_Tier_Execution_Package_Template|Execution Package Template]]
5. [[06_Organizational_Architecture/WORK_PACKAGE_STANDARD|Work Package Standard]]
6. Current handover
7. Exact authoritative system files cited by the task.

Do not reread the full repository.

## Preflight

Return before coding:
- repository;
- branch;
- head SHA;
- relevant changes since blueprint checkpoint;
- task-owned files;
- read-only files;
- prohibited files;
- unresolved conflict;
- build authorization evidence;
- deployment authorization state.

If build authorization is absent:
**STOP — BLUEPRINT ONLY / NOT BUILD AUTHORIZED.**

## Golden Path After Build Authorization

### Phase 1 — Shell
Implement local app shell and static navigation.

### Phase 2 — Local Data
Implement typed entities, storage interface, migrations and backup.

### Phase 3 — Commercial Spine
Opportunity → Offer → Prospect → Proposal → Payment → Pilot → Economics.

### Phase 4 — Market Intelligence
Signal capture → classification → review → opportunity mapping.

### Phase 5 — Attention / Dashboard
Project source records into decision views.

### Phase 6 — Offline/Recovery
Offline operation, backup, restore, conflict and errors.

### Phase 7 — Local Acceptance
Run [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/10_Test_and_Acceptance_Blueprint|Test Blueprint]].

### Phase 8 — Release Candidate
Only after G7.

### Phase 9 — Optional Remote Integration
Only after G9 explicit authorization.

## Prohibited Shortcuts

- creating Supabase first;
- creating Vercel project first;
- using production OAuth to unblock local testing;
- deploying UI just to see whether it works;
- using hosted DB as local persistence;
- hard-coding payment provider;
- inventing missing business rule;
- storing client data in public repo;
- changing price because competitor is cheaper;
- adding “AI” features without a validated task.

## Required Implementation Artifacts

When coding begins, create task-specific:
- completed Top-Tier Execution Package;
- current handover;
- local setup README;
- schema/migration record;
- test report;
- acceptance report;
- release manifest;
- known limitations;
- deployment approval record only when authorized.

## Handover Format

```text
Project:
Work Package:
Status:
Repository / branch / commit:
Objective:
Completed:
Not completed:
Files changed:
Owned files:
Read-only dependencies:
Decisions preserved:
Tests run:
Tests not run:
Acceptance results:
Known defects:
Risks:
Deployment state:
Next action:
Required reviewer:
Knowledge-return candidates:
```

## Token-Efficiency Rule

Future agents must retrieve by reference. This package exists specifically to prevent costly re-analysis.

Read:
- task blueprint;
- changed dependencies;
- current handover;
- required authorities.

Do not re-audit stable files unless:
- checkpoint changed materially;
- contradiction exists;
- assigned audit requires it.

## Architecture Escalation

Escalate when:
- business rule conflict;
- data model conflict;
- hosted requirement appears;
- payment/security/professional issue;
- blueprint insufficient;
- acceptance test cannot be satisfied without scope change.

## Definition of Done

A task is done only when:
- required output exists;
- tests pass;
- evidence returned;
- handover exists;
- links/indexes updated where applicable;
- no unauthorized deployment occurred.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
