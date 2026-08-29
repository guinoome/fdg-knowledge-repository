# NEX CORE OBSIDIAN KNOWLEDGE REPOSITORY IMPLEMENTATION STANDARD

Document ID: NEX-STD-112

Document Type: Knowledge Repository Implementation Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-111 Implementation Blueprint and First 90-Day Execution Plan
- NEX-STD-095 Knowledge Graph and Relationship Intelligence Standard
- NEX-STD-101 Context Package Operational Standard

---

# Purpose

This standard defines the structure, organization, and operating method of the FDG Knowledge Repository using Obsidian as the primary human knowledge interface for Nex Core Intelligence.

---

# Core Principle

Obsidian stores organizational memory.

Nex transforms memory into intelligence.

---

# Repository Architecture

The FDG Knowledge Repository shall be organized by function.

Recommended structure:

```
FDG_Knowledge_Repository

│
├── 00_Inbox
│
├── 01_FDG_Core
│
├── 02_Engineering_Knowledge
│
├── 03_Projects
│
├── 04_Assets_and_Systems
│
├── 05_Standards_and_References
│
├── 06_Workflows_and_Procedures
│
├── 07_Nex_Core_Intelligence
│
├── 08_Decisions
│
├── 09_Lessons_Learned
│
├── 10_Templates
│
├── 11_Archive
│
└── Attachments

```

---

# Folder Purpose

---

# 00_Inbox

Purpose:

Temporary capture location.

Contains:

- quick notes
- ideas
- unprocessed information

Rule:

Nothing stays permanently.

---

# 01_FDG_Core

Purpose:

Store organizational foundation.

Contains:

- mission
- principles
- architecture
- strategy

---

# 02_Engineering_Knowledge

Purpose:

Technical knowledge library.

Contains:

- HVAC
- electrical
- plumbing
- mechanical systems
- calculations
- engineering methods

---

# 03_Projects

Purpose:

Project intelligence.

Structure:

```
Project Name

├── Context

├── Decisions

├── Documents

├── Calculations

├── Lessons

└── Reports

```

---

# 04_Assets_and_Systems

Purpose:

Asset lifecycle intelligence.

Examples:

- pumps
- AHU
- FCU
- generators
- electrical systems

Each asset should contain:

```
Asset Identity

Specifications

History

Maintenance

Issues

Improvements

```

---

# 05_Standards_and_References

Purpose:

External and internal references.

Examples:

- engineering standards
- manufacturer manuals
- technical references

---

# 06_Workflows_and_Procedures

Purpose:

Operational execution knowledge.

Contains:

- SOPs
- workflows
- checklists
- procedures

---

# 07_Nex_Core_Intelligence

Purpose:

Nex governance and intelligence architecture.

Contains:

```
Identity

Standards

Operating Context

Agents

Templates

Roadmap

Architecture

```

---

# 08_Decisions

Purpose:

Decision intelligence repository.

Contains:

- Decision Records
- evaluations
- recommendations

---

# 09_Lessons_Learned

Purpose:

Organizational learning.

Contains:

- failures
- improvements
- successful practices

---

# 10_Templates

Purpose:

Reusable structures.

Contains:

- Context Package
- Decision Record
- Work Package
- Review Record

---

# 11_Archive

Purpose:

Historical preservation.

Contains:

- obsolete documents
- previous versions
- retired practices

---

# Note Naming Convention

Format:

```
TYPE - Title - Date

```

Examples:

```
DECISION - Replace Pump Motor - 2026-07-23

PROJECT - Tower 1 Water System Upgrade

ASSET - AHU-03

LESSON - Rust Contamination Root Cause

```

---

# Metadata Standard

Important notes should include:

```
---
type:
status:
owner:
created:
updated:
tags:
related:
---

```

---

# Linking Rules

Knowledge should connect through meaningful relationships.

Example:

```
Failure

↓

Asset

↓

Root Cause

↓

Solution

↓

Standard

```

---

# Tagging Philosophy

Use tags for:

- category
- status
- classification

Avoid excessive tags.

---

# Daily Usage Workflow

```
Capture

↓

Process

↓

Connect

↓

Apply

↓

Improve

```

---

# Weekly Maintenance

Review:

- inbox
- unfinished notes
- missing links
- outdated information

---

# Monthly Knowledge Review

Evaluate:

- valuable knowledge created
- reusable lessons
- improvement opportunities

---

# Repository Quality Rules

Good knowledge should be:

## Clear

Easy to understand.

---

## Structured

Consistent format.

---

## Connected

Related information linked.

---

## Reusable

Useful in future work.

---

# Anti-Pattern Prevention

## Digital Dump

Storing files without organization.

---

## Excessive Structure

Creating complexity before usage.

---

## Broken Links

Information without relationships.

---

## Capture Without Processing

Accumulating unfinished notes.

---

# Responsibilities

## Francis

Owns knowledge strategy.

Defines important knowledge.

---

## Nex

Maintains intelligence structure.

Supports retrieval and connection.

---

## Contributors

Capture and organize knowledge.

---

# Governing Principle

The FDG Knowledge Repository is not a document storage system.

It is the memory foundation of the engineering organization.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[07_Nex_Core_Intelligence/07_Nex_Core_Intelligence_Master_Index|07 Nex Core Intelligence Master Index]] → this document
