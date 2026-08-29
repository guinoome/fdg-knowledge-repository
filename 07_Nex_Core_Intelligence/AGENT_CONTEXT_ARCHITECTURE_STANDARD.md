# AGENT CONTEXT ARCHITECTURE STANDARD

Document ID: NEX-STD-053

Document Type: Intelligence Context Architecture Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-006 Knowledge Management Standard
- NEX-STD-047 Nex Core Intelligence Architecture Standard
- NEX-STD-052 Agentic Framework Evolution Standard

---

# Purpose

This standard defines how context is structured, maintained, and delivered to Nex and specialized agents within the FDG Ecosystem.

---

# Core Principle

Agent intelligence is limited by context quality.

A capable reasoning system without reliable context produces unreliable outcomes.

---

# Context Architecture Principle

FDG separates:

Human Knowledge

Operational Data

Semantic Retrieval

Relationships

Temporary Reasoning Context

These layers work together.

---

# FDG Intelligence Context Architecture

```
                    FDG Knowledge Repository

                              │

        ┌─────────────────────┼─────────────────────┐

        ▼                     ▼                     ▼

 Human Knowledge        Structured Data       Intelligence Layer

   Obsidian             Database Systems      Retrieval Systems


                              │

                              ▼

                       Nex Core Intelligence


                              │

                              ▼

                     Specialized Collaborators


                              │

                              ▼

                    Validated Knowledge Return
```

---

# Context Layers

## Layer 1 — Human Knowledge Layer

Primary System:

Obsidian

Purpose:

Preserve human understanding.

Contains:

- engineering principles
- standards
- decisions
- lessons learned
- design rationale
- strategic thinking

Characteristics:

Human-readable.

Long-term.

Conceptual.

---

# Layer 2 — Structured Operational Layer

Purpose:

Manage precise operational information.

Examples:

- equipment databases
- calculations
- project records
- inventory
- financial data
- schedules

Characteristics:

Structured.

Queryable.

Transactional.

---

# Layer 3 — Semantic Intelligence Layer

Purpose:

Enable contextual retrieval.

Examples:

- document search
- semantic indexing
- knowledge retrieval

Characteristics:

Meaning-based.

Relationship-aware.

Discovery-oriented.

---

# Layer 4 — Knowledge Relationship Layer

Purpose:

Represent connections between knowledge elements.

Examples:

- equipment relationships
- project dependencies
- engineering concepts
- decision history

Characteristics:

Connected.

Context-rich.

Evolution-aware.

---

# Layer 5 — Working Memory Layer

Purpose:

Support current execution.

Contains:

- active objectives
- current work packages
- temporary analysis
- immediate constraints

Characteristics:

Short-lived.

Task-focused.

Not permanent knowledge.

---

# Context Priority

When reasoning, Nex shall prioritize:

1. Approved standards

2. Approved decisions

3. Validated engineering knowledge

4. Current work package context

5. External evidence

6. Assumptions

---

# Context Retrieval Process

```
Define Objective

↓

Identify Required Context

↓

Retrieve Approved Knowledge

↓

Evaluate Relevance

↓

Perform Reasoning

↓

Execute Work

↓

Capture New Knowledge
```

---

# Context Quality Requirements

Context should be:

## Relevant

Connected to the objective.

---

## Accurate

Based on validated information.

---

## Current

Maintained through review.

---

## Traceable

Origin can be identified.

---

## Reusable

Useful beyond one interaction.

---

# Context Governance

Context shall have:

- ownership
- source identification
- version history
- review status
- lifecycle state

---

# Knowledge Flow

The FDG knowledge cycle:

```
Experience

↓

Documentation

↓

Validation

↓

Knowledge Repository

↓

Agent Context

↓

Better Execution

↓

Improved Experience
```

---

# Context Boundary Rules

Permanent knowledge belongs in:

- standards
- decision records
- knowledge documents

Temporary information belongs in:

- working memory
- active work packages

Operational data belongs in:

- structured systems

---

# Anti-Pattern Prevention

## Memory Dump

Storing everything without structure.

---

## Context Overload

Providing unnecessary information that reduces reasoning quality.

---

## Knowledge Isolation

Keeping valuable learning inside individual conversations.

---

## Uncontrolled Updates

Changing knowledge without review.

---

# Responsibilities

## Francis

Approves strategic knowledge.

Defines permanent principles.

---

## Nex

Determines required context.

Maintains continuity.

Identifies missing knowledge.

Prevents knowledge fragmentation.

---

## Collaborators

Use approved context.

Return validated improvements.

---

# Governing Principle

Knowledge is the foundation.

Context is the delivery mechanism.

Intelligence is the result.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document
