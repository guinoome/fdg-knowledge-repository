# NEX CORE TEMPLATE AND ARTIFACT LIBRARY STANDARD

Document ID: NEX-STD-089

Document Type: Template Governance Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-088 Nex Core Implementation Package Standard
- NEX-STD-081 Knowledge Repository Operating Procedure Standard
- NEX-STD-077 Engineering Reasoning and Analysis Standard

---

# Purpose

This standard defines the approved reusable templates and artifacts used throughout Nex Core Intelligence.

---

# Core Principle

Capture information consistently so intelligence can be reused reliably.

---

# Artifact Categories

Nex Core artifacts are organized into:

```
Knowledge Artifacts

Decision Artifacts

Execution Artifacts

Review Artifacts

Intelligence Artifacts

Improvement Artifacts

```

---

# 1. Knowledge Note Template

Purpose:

Capture reusable engineering knowledge.

---

Structure:

```
# Title

Document ID:

Category:

Owner:

Status:

Date:


## Purpose


## Context


## Knowledge


## Analysis


## Application


## References


## Related Knowledge

```

---

# 2. Engineering Decision Record (EDR)

Purpose:

Preserve important decisions and reasoning.

---

Structure:

```
# Decision Title

Decision ID:

Date:

Owner:

Status:


## Decision Context


## Problem


## Options Considered


## Evaluation Criteria


## Selected Decision


## Reasoning


## Risks


## Consequences


## Review Date

```

---

# 3. Context Package Template

Purpose:

Prepare information before analysis.

---

Structure:

```
# Context Package

Objective:


## Background


## Current Situation


## Required Knowledge


## Constraints


## Assumptions


## Previous Decisions


## Expected Output


## Validation Criteria

```

---

# 4. Work Package Template

Purpose:

Control focused execution.

---

Structure:

```
# Work Package

WP ID:


## Objective


## Scope


## Deliverables


## Inputs


## Owner


## Dependencies


## Risks


## Completion Criteria


## Lessons Learned

```

---

# 5. Engineering Review Template

Purpose:

Support technical verification.

---

Structure:

```
# Engineering Review

Review ID:


## Subject


## Review Objective


## Evidence Reviewed


## Findings


## Risks Identified


## Required Actions


## Approval Status

```

---

# 6. Risk Register Template

Purpose:

Track uncertainty.

---

Structure:

```
# Risk Register

Risk ID:


Description:


Category:


Cause:


Impact:


Probability:


Risk Level:


Mitigation:


Owner:


Status:

```

---

# 7. Agent Specification Template

Purpose:

Define controlled AI capabilities.

---

Structure:

```
# Agent Specification

Agent Name:


Purpose:


Objective:


Responsibilities:


Knowledge Sources:


Tools:


Authority Level:


Limitations:


Validation Method:


Owner:

```

---

# 8. Automation Specification Template

Purpose:

Document automated workflows.

---

Structure:

```
# Automation Specification

Automation Name:


Purpose:


Process Supported:


Inputs:


Outputs:


Dependencies:


Failure Handling:


Owner:


Review Date:

```

---

# 9. Lesson Learned Template

Purpose:

Convert experience into knowledge.

---

Structure:

```
# Lesson Learned

Event:


Date:


Situation:


Expected Condition:


Actual Condition:


Root Cause:


Action Taken:


Result:


Learning:


Improvement:

```

---

# 10. Improvement Proposal Template

Purpose:

Manage evolution.

---

Structure:

```
# Improvement Proposal

Proposal ID:


Current Condition:


Problem:


Proposed Improvement:


Expected Benefit:


Impact:


Risk:


Validation Method:


Decision:

```

---

# Artifact Naming Convention

Format:

```
TYPE-ID-TITLE

```

Examples:

```
STD-089-Template-Library

EDR-001-Pipe-Replacement-Decision

WP-024-HVAC-Optimization

RISK-012-Data-Quality

```

---

# Artifact Status

Approved statuses:

```
Draft

Review

Approved

Active

Superseded

Archived

```

---

# Artifact Quality Requirements

Every reusable artifact should be:

## Clear

Easy to understand.

---

## Complete

Contains required information.

---

## Traceable

Linked to sources and decisions.

---

## Maintainable

Able to evolve.

---

# Template Governance

Templates should be reviewed when:

- requirements change
- workflow changes
- users identify problems
- new capability is introduced

---

# Anti-Pattern Prevention

## Free-Form Documentation

Every person creating different formats.

---

## Template Explosion

Creating templates without value.

---

## Missing Ownership

Artifacts without maintenance responsibility.

---

## Stale Templates

Old structures continuing after change.

---

# Responsibilities

## Francis

Approves strategic templates.

---

## Nex

Maintains artifact consistency.

---

## Contributors

Use templates correctly.

Provide improvement feedback.

---

# Governing Principle

Templates are not bureaucracy.

They are the memory structure that allows FDG capability to scale.

---

End of Standard