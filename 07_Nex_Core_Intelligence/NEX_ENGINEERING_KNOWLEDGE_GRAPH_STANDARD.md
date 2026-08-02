# NEX ENGINEERING KNOWLEDGE GRAPH STANDARD

Document ID: NEX-STD-071

Document Type: Knowledge Relationship Architecture Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-058 Nex Knowledge Repository Integration Standard
- NEX-STD-067 Nex Information Architecture and Taxonomy Standard
- NEX-STD-069 Engineering Decision Record Standard
- NEX-STD-070 Work Package Management Standard

---

# Purpose

This standard defines how FDG knowledge objects are connected, related, and evolved into an engineering knowledge network.

---

# Core Principle

Information explains.

Relationships create intelligence.

---

# Knowledge Graph Concept

A knowledge graph represents:

Entities

+

Relationships

+

Context

+

History

---

# FDG Knowledge Graph Model

```
Entity

   +

Relationship

   +

Evidence

   +

Decision History

   +

Operational Context

```

---

# Primary Knowledge Entities

## Principle

Defines why.

Examples:

- engineering philosophy
- design principles
- organizational rules

---

## Standard

Defines what should be followed.

Examples:

- maintenance standards
- governance standards

---

## Decision

Defines why a choice was made.

Examples:

- technology selection
- architecture choice

---

## Project

Defines where knowledge is applied.

Examples:

- FEIP
- Solar projects
- Hotel engineering initiatives

---

## System

Defines operational capabilities.

Examples:

- ERP
- engineering platforms
- automation systems

---

## Equipment

Defines physical assets.

Examples:

- pumps
- chillers
- PV systems
- generators

---

## Calculation

Defines engineering reasoning.

Examples:

- load calculations
- sizing
- analysis

---

## Lesson Learned

Defines experience-derived knowledge.

---

## Agent

Defines intelligent capabilities.

---

# Relationship Types

Knowledge relationships should use clear meanings.

---

## Supports

Example:

Standard supports Decision.

---

## Derived From

Example:

Lesson Learned derived from Project.

---

## Implements

Example:

System implements Standard.

---

## Depends On

Example:

Project depends on System.

---

## Improves

Example:

Evolution Record improves Standard.

---

## Validates

Example:

Calculation validates Design.

---

## Replaces

Example:

New Standard replaces Previous Standard.

---

# Knowledge Relationship Example

```
HVAC Standard

      │

      ▼

FCU Maintenance Procedure

      │

      ▼

Hotel Tower Project

      │

      ▼

Failure Event

      │

      ▼

Lesson Learned

      │

      ▼

Updated Standard

```

---

# Knowledge Graph Principles

## Meaning Over Location

A note is valuable because of relationships, not only where it is stored.

---

## Preserve History

Relationships should maintain evolution.

---

## Maintain Traceability

Important conclusions should connect back to evidence.

---

# Obsidian Implementation Principle

Current implementation:

Use:

- folders
- links
- metadata
- tags

Future implementation:

May include:

- graph databases
- semantic retrieval
- automated relationship extraction

---

# Metadata Requirements

Important entities should include:

```
Entity Type

Owner

Status

Created Date

Updated Date

Related Entities

Evidence Source

Version

```

---

# Knowledge Discovery

A connected knowledge system should answer:

"What decisions affect this system?"

"What standards apply here?"

"What lessons were learned before?"

"What projects used this approach?"

"What agents support this capability?"

---

# Knowledge Integrity

Relationships must be:

- meaningful
- maintained
- evidence-based

Avoid artificial connections.

---

# Anti-Pattern Prevention

## Document Island

Information existing without relationships.

---

## Link Spam

Creating links without intelligence value.

---

## Relationship Guessing

Creating unsupported connections.

---

## Graph Before Knowledge

Building complex graph systems before useful knowledge exists.

---

# Implementation Roadmap

## Phase 1 — Human Knowledge Graph

Current:

- Obsidian links
- metadata
- structured notes

---

## Phase 2 — Assisted Intelligence

Future:

- semantic search
- automatic suggestions
- relationship discovery

---

## Phase 3 — Engineering Knowledge Graph

Future:

- graph database
- automated reasoning
- advanced analytics

---

# Responsibilities

## Francis

Defines strategic knowledge relationships.

---

## Nex

Maintains relationship logic.

Identifies hidden connections.

---

## Contributors

Create meaningful links.

Maintain knowledge quality.

---

# Governing Principle

The goal is not to build a graph.

The goal is to build connected engineering intelligence.

---

End of Standard