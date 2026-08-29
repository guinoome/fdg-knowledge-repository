# NEX CORE KNOWLEDGE NOTE CREATION AND MANAGEMENT STANDARD

Document ID: NEX-STD-113

Document Type: Knowledge Asset Management Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-112 Obsidian Knowledge Repository Implementation Standard
- NEX-STD-103 Engineering Knowledge Acquisition and Learning Standard
- NEX-STD-095 Knowledge Graph and Relationship Intelligence Standard

---

# Purpose

This standard defines how knowledge notes are created, structured, reviewed, connected, and maintained within the FDG Knowledge Repository.

---

# Core Principle

A note is not documentation.

A note is a reusable intelligence asset.

---

# Knowledge Note Objective

Every knowledge note should answer:

```
What is this?

Why does it matter?

How can it be used?

What is it connected to?

```

---

# Knowledge Note Lifecycle

```
Capture

↓

Structure

↓

Validate

↓

Connect

↓

Reuse

↓

Improve

↓

Archive

```

---

# Knowledge Note Categories

---

# 1. Concept Note

Purpose:

Explain engineering principles.

Examples:

- pump cavitation
- heat transfer principles
- control concepts

---

# 2. Technical Reference Note

Purpose:

Capture technical information.

Examples:

- equipment specifications
- standard requirements
- manufacturer data

---

# 3. Problem-Solution Note

Purpose:

Capture troubleshooting intelligence.

Structure:

```
Problem

Observed Condition

Investigation

Root Cause

Solution

Prevention

```

---

# 4. Decision Note

Purpose:

Preserve engineering decisions.

Structure:

```
Context

Options

Evaluation

Decision

Reason

Outcome

```

---

# 5. Procedure Note

Purpose:

Document repeatable execution.

Structure:

```
Purpose

Scope

Steps

Requirements

Verification

```

---

# 6. Lesson Learned Note

Purpose:

Convert experience into future capability.

Structure:

```
Situation

Impact

Cause

Action

Learning

Future Application

```

---

# Standard Knowledge Note Structure

Recommended format:

```
# Title


## Summary

Short explanation.


## Context

Why this exists.


## Main Knowledge

Detailed information.


## Evidence / References

Supporting basis.


## Application

Where this is useful.


## Related Knowledge

Connected items.


## Review Information

Date and owner.

```

---

# Frontmatter Standard

Recommended metadata:

```yaml
---
type:
status:
domain:
owner:
created:
updated:
review_date:
confidence:
source:
related:
tags:
---
```

---

# Knowledge Quality Requirements

Every important note should have:

---

## Accuracy

Information is technically correct.

---

## Context

The reason and application are clear.

---

## Traceability

Sources or evidence identified.

---

## Reusability

Future users can apply it.

---

## Maintainability

Can be updated.

---

# Confidence Classification

Knowledge confidence:

---

# Verified

Confirmed through evidence or validation.

---

# Supported

Based on reliable references.

---

# Working Knowledge

Useful but requires further validation.

---

# Unknown

Insufficient information.

---

# Linking Method

Connect notes using meaningful relationships.

Examples:

```
Equipment

→

Failure Mode

→

Root Cause

→

Corrective Action

→

Standard

```

---

# Knowledge Review Process

Periodic review should identify:

- outdated information
- missing context
- broken relationships
- improvement opportunities

---

# Knowledge Promotion

A note may evolve:

```
Observation

↓

Knowledge Note

↓

Validated Practice

↓

Procedure

↓

Standard

```

---

# Knowledge Retirement

Archive knowledge when:

- obsolete
- replaced
- no longer applicable

Preserve history.

---

# Anti-Pattern Prevention

## Raw Information Storage

Saving information without meaning.

---

## Copy-Paste Knowledge

Duplicating content without understanding.

---

## Unlinked Notes

Creating isolated information.

---

## Permanent Drafts

Accumulating unfinished knowledge.

---

# Responsibilities

## Francis

Defines important knowledge priorities.

Approves critical standards.

---

## Nex

Maintains knowledge discipline.

Supports connection and reuse.

---

## Contributors

Create accurate knowledge assets.

---

# Governing Principle

The quality of FDG intelligence depends on the quality of knowledge captured every day.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document
