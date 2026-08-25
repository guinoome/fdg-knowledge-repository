# NEX ENGINEERING CONTEXT MANAGEMENT STANDARD

Document ID: NEX-STD-076

Document Type: Context Intelligence Governance Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-059 Nex Context Package Standard
- NEX-STD-075 Data Governance and Intelligence Memory Standard
- NEX-STD-071 Engineering Knowledge Graph Standard

---

# Purpose

This standard defines how Nex identifies, prepares, manages, and transfers context required for reliable engineering intelligence.

---

# Core Principle

Correct reasoning requires correct context.

More information does not always create better decisions.

Relevant information creates better decisions.

---

# Context Definition

Context is the collection of information required to understand and solve an objective.

Context includes:

- objective
- constraints
- history
- requirements
- decisions
- evidence
- environment
- stakeholders

---

# Context Management Objective

Nex shall provide:

## Relevant Context

Only information useful for the objective.

---

## Sufficient Context

Enough information to make a reliable decision.

---

## Controlled Context

Information with known reliability.

---

# Context Architecture

```
Long-Term Memory

       │

       ▼

Knowledge Selection

       │

       ▼

Context Assembly

       │

       ▼

Working Context

       │

       ▼

Decision / Execution

       │

       ▼

Updated Memory

```

---

# Context Sources

Context may come from:

## Knowledge Repository

Examples:

- standards
- decisions
- lessons learned

---

## Structured Data

Examples:

- equipment records
- project data
- calculations

---

## Active Work

Examples:

- current objectives
- constraints
- status

---

## External Evidence

Examples:

- standards
- references
- technical documents

---

# Context Selection Process

```
Understand Objective

↓

Identify Required Knowledge

↓

Evaluate Relevance

↓

Check Reliability

↓

Assemble Context Package

↓

Execute Reasoning

```

---

# Context Priority

Context should be prioritized by:

## Direct Relevance

Does it affect the current objective?

---

## Authority

Is the source trustworthy?

---

## Recency

Is it current?

---

## Impact

Could it change the decision?

---

# Context Compression

Large information sets should be compressed into:

- essential facts
- decisions
- constraints
- assumptions
- risks

The goal:

Preserve meaning.

Remove unnecessary volume.

---

# Context Package Standard

Every significant activity should provide:

```
Objective

Background

Current Situation

Relevant Knowledge

Constraints

Requirements

Previous Decisions

Expected Output

Validation Criteria

```

---

# Context Boundaries

Nex should identify:

## Included Context

Information required.

---

## Excluded Context

Information not relevant.

---

## Missing Context

Information required but unavailable.

---

# Context Confidence

Context quality should be assessed.

## High Confidence

Complete and reliable.

---

## Medium Confidence

Some assumptions remain.

---

## Low Confidence

Insufficient information.

---

# Context Handoff

When transferring work between collaborators:

Provide:

- objective
- current state
- completed work
- decisions
- unresolved issues
- required output

---

# Context Continuity

Important context should not exist only in conversations.

It should be transferred into:

- knowledge records
- decision records
- project records

---

# Context Refresh

Context should be updated when:

- objectives change
- new evidence appears
- decisions change
- assumptions become invalid

---

# Anti-Pattern Prevention

## Context Overload

Providing everything instead of what matters.

---

## Context Loss

Starting work without important history.

---

## Conversation Dependency

Important knowledge trapped in chat history.

---

## Wrong Context

Using information from unrelated situations.

---

# Responsibilities

## Francis

Defines strategic context requirements.

---

## Nex

Manages context selection and preparation.

Ensures relevance.

---

## Collaborators

Provide accurate information.

Maintain context continuity.

---

# Governing Principle

The intelligence of a system is limited by the context it can understand.

Nex does not seek maximum information.

Nex seeks maximum decision clarity.

---

End of Standard