# NEX COLLABORATOR HANDOFF AND TEAM INTELLIGENCE STANDARD

Document ID: NEX-STD-082

Document Type: Collaboration Governance Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-076 Engineering Context Management Standard
- NEX-STD-070 Work Package Management Standard
- NEX-STD-074 System Architecture and Integration Standard

---

# Purpose

This standard defines how FDG transfers work, knowledge, and responsibility between human collaborators, AI collaborators, and systems.

---

# Core Principle

A successful handoff transfers understanding, not only information.

---

# Collaboration Model

FDG collaboration follows:

```
Objective

↓

Context

↓

Responsibility

↓

Execution

↓

Review

↓

Learning

```

---

# Collaborator Types

---

# Human Collaborator

Provides:

- professional judgment
- domain expertise
- accountability

---

# AI Collaborator

Provides:

- analysis support
- information processing
- pattern recognition
- workflow assistance

---

# System Collaborator

Provides:

- data processing
- automation
- operational capability

---

# Collaboration Boundary

Every collaborator must have:

## Purpose

Why does this collaborator exist?

---

## Capability

What can it do?

---

## Limitation

What can it not do?

---

## Authority

What decisions can it make?

---

# Handoff Requirements

Every handoff should include:

```
Work Package

Objective

Current Status

Completed Work

Relevant Context

Decisions Made

Open Issues

Required Action

Expected Output

Review Criteria

```

---

# Context Preservation

A handoff is incomplete if it lacks:

- objective
- history
- assumptions
- constraints
- previous decisions

---

# Ownership Transfer

A handoff must clearly define:

## Current Owner

Responsible before transfer.

---

## New Owner

Responsible after acceptance.

---

## Review Authority

Who approves completion.

---

# AI Collaborator Handoff

When assigning work to an AI collaborator:

Provide:

```
Role

Objective

Available Context

Expected Output

Constraints

Validation Requirements

```

---

# Human Review Requirement

AI-generated outputs should be reviewed based on:

- impact
- risk
- complexity
- reversibility

---

# Collaboration Communication Standard

Communication should prioritize:

## Objective First

What needs to be achieved?

---

## Context Second

Why does it matter?

---

## Action Third

What must happen?

---

# Conflict Resolution

When collaborators disagree:

Evaluate:

1. Evidence

2. Requirements

3. Constraints

4. Lifecycle impact

5. Risk

---

# Knowledge Return Requirement

Completed collaboration should produce:

- final output
- decision records where required
- lessons learned
- reusable knowledge

---

# Collaboration Quality Indicators

Good collaboration produces:

## Continuity

Work can continue without restarting.

---

## Traceability

Reasoning is preserved.

---

## Accountability

Responsibilities are clear.

---

## Learning

Knowledge improves after completion.

---

# Anti-Pattern Prevention

## File Transfer Without Context

Sending outputs without explanation.

---

## Responsibility Ambiguity

No clear owner.

---

## AI Blind Trust

Accepting outputs without validation.

---

## Knowledge Loss After Completion

Finished work disappears from organizational memory.

---

# Responsibilities

## Francis

Defines collaboration model.

Maintains accountability.

---

## Nex

Coordinates intelligence transfer.

Maintains context continuity.

---

## Collaborators

Provide accurate information.

Maintain handoff discipline.

---

# Governing Principle

FDG does not build a group of separate tools and individuals.

FDG builds one connected engineering capability.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document

## Open-source reuse before unfamiliar implementation

Every FDG collaborator receiving a task that involves an unfamiliar capability must first consult the canonical knowledge repository for existing decisions and prior reviews. If unresolved, search GitHub and official documentation; compare credible projects, licenses, source/test evidence, maintenance, dependencies, hardware fit, data egress, security, interoperability and acceptance burden. Recommend REUSE / EXTEND / MERGE / REPLACE / NEW before implementation.

A handoff must state: requirement and owner; existing FDG source consulted; candidate repository URLs and pinned revisions; license/security/maintenance findings; approach comparison; proposed decision; exact tests/evidence; unresolved approvals; next action. Preserve a single authoritative source and cross-link it rather than creating duplicate standards. Collaborators must not claim a search, tool execution, dispatch, benchmark, installation or test unless a receipt/evidence exists. Do not ask Francis to repeat context already accessible in the repository.

For Nex local/cloud inference, follow [[07_Nex_Core_Intelligence/NEX-HYBRID-LOCAL-FIRST-INFERENCE-AND-OPEN-SOURCE-REUSE-2026-10-27|the hybrid inference decision and acceptance plan]]. Issue #11 remains higher priority than this future runtime work; Issue #20 remains a separate continuity issue. This standard alone authorizes neither external data transfer nor production changes.


## Cross-ecosystem governing policy — 2026-10-27

This project-specific rule implements, and does not limit, the organization-wide [[00_Nex/FDG_GLOBAL_OPEN_SOURCE_FIRST_AND_REUSE_STANDARD|FDG Global Open-Source-First, Reuse, and Capability Development Standard]]. Apply it to all existing and future FDG projects: inspect canonical prior work, search authoritative sources, verify licenses/security/maintenance, compare options, justify REUSE / EXTEND / MERGE / REPLACE / BUILD NEW, and record tested evidence and limitations before authorized integration.


## Cross-collaborator controlled learning (2026-10-28)

All collaborators must follow [[07_Nex_Core_Intelligence/NEX-COLLAB-LEARN-001 - Cross-Collaborator Controlled Learning and Skill Evolution Standard|NEX-COLLAB-LEARN-001]]. Treat AutoHarness as a design reference, not an approved install. Lessons may be proposed from authorized work, but only validated, reviewed, versioned and reversible changes may be promoted. Preserve data minimization, provenance, scope, human approval and cross-provider portability. Do not imply autonomous learning is operational until tested.


## Role-engineered handoff requirements — founder-directed extension (2026-10-30)

For material or recurring assignments, extend the existing AI Collaborator Handoff package with the applicable fields from [[07_Nex_Core_Intelligence/NEX-ROLE-ENGINEERING-001 - Persistent Collaborator Role Engineering Standard|NEX-ROLE-ENGINEERING-001]]: mission and responsibility; authority/tool/data boundaries; context, origin and rationale; SMART and verifiable outcome; approved examples and anti-examples; deliverable contract; acceptance tests/reviewer; checkpoint, stop and escalation conditions; and time/cost limits.

Use a proportionate compact form for low-risk one-off work. Preserve the existing handoff requirements and human approval boundaries. A persistent assignment is not permission for unbounded background activity.
