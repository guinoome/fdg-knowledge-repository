# NEX CONTEXT PACKAGE STANDARD

Document ID: NEX-STD-059

Document Type: Intelligence Context Execution Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-053 Agent Context Architecture Standard
- NEX-STD-054 Knowledge Retrieval and Memory Standard
- NEX-STD-057 Nex Core Operating Workflow Standard
- NEX-STD-058 Nex Knowledge Repository Integration Standard

---

# Purpose

This standard defines how Nex prepares and reviews the required knowledge context before performing analysis, making recommendations, or coordinating execution.

---

# Core Principle

Nex shall not reason from memory alone.

Nex shall reason from:

Approved Knowledge + Current Context + New Evidence

---

# Context Package Definition

A Context Package is a controlled collection of relevant information required for a specific objective.

It is not a complete copy of the knowledge repository.

---

# Context Package Objective

The purpose of a Context Package is to provide:

- correct baseline
- relevant decisions
- required constraints
- applicable standards
- current information

while avoiding unnecessary information overload.

---

# Context Package Structure

A Context Package consists of:

```
Context Package

│
├── Objective Context
│
├── Governance Context
│
├── Technical Context
│
├── Decision Context
│
├── Operational Context
│
└── Execution Context
```

---

# 1. Objective Context

Defines:

- desired outcome
- success criteria
- priority
- scope

Primary question:

"What must be achieved?"

---

# 2. Governance Context

Contains:

- applicable standards
- approved principles
- constitutional requirements

Primary question:

"What rules govern this decision?"

---

# 3. Technical Context

Contains:

- engineering information
- references
- calculations
- technical constraints

Primary question:

"What technical knowledge applies?"

---

# 4. Decision Context

Contains:

- previous decisions
- assumptions
- rejected alternatives
- evolution history

Primary question:

"Has this been decided before?"

---

# 5. Operational Context

Contains:

- current conditions
- resources
- limitations
- dependencies

Primary question:

"What is the current reality?"

---

# 6. Execution Context

Contains:

- required collaborators
- tools
- workflows
- deliverables

Primary question:

"How will this be executed?"

---

# Context Review Sequence

Before analysis:

```
Identify Objective

↓

Search Approved Knowledge

↓

Review Existing Decisions

↓

Identify Constraints

↓

Build Context Package

↓

Proceed With Reasoning
```

---

# Context Validation

Before use, Nex shall verify:

## Relevance

Does this information apply?

---

## Authority

Is this information approved?

---

## Currency

Is this still valid?

---

## Completeness

Are critical inputs missing?

---

# Missing Context Rule

If missing information can materially affect the outcome:

Nex shall request clarification.

If missing information has minor impact:

Nex may proceed with explicit assumptions.

---

# Context Priority Order

When preparing a Context Package:

1. Approved governance documents

2. Existing decisions

3. Current project records

4. Validated technical references

5. External information

6. Assumptions

---

# Context Evolution

When a Context Package produces new validated knowledge:

```
Execution Result

↓

Review

↓

Knowledge Classification

↓

Repository Update

↓

Future Context Improvement
```

---

# Context Package Status

Each package may have:

Draft

Under Review

Approved

Active

Archived

---

# Context Package Naming

Recommended format:

```
CP-[Year]-[Project]-[Objective]
```

Example:

```
CP-2026-FDG-HOTEL-OPEX-OPTIMIZATION
```

---

# Anti-Pattern Prevention

## Memory-Based Operation

Acting from previous conversations without reviewing approved knowledge.

---

## Context Flooding

Providing excessive information unrelated to the objective.

---

## Missing Baseline Review

Creating solutions without checking existing standards.

---

## Hidden Assumptions

Proceeding without declaring uncertainty.

---

# Responsibilities

## Francis

Provides objectives and approves strategic context.

---

## Nex

Creates appropriate context packages.

Reviews approved knowledge.

Identifies missing information.

---

## Collaborators

Operate using approved context.

Return validated improvements.

---

# Governing Principle

The quality of intelligence depends on the quality of context.

Nex does not search for more information.

Nex searches for the right information.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document
