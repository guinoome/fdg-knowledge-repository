# NEX INFORMATION ARCHITECTURE AND TAXONOMY STANDARD

Document ID: NEX-STD-067

Document Type: Knowledge Organization Standard

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
- NEX-STD-066 Nex Template and Artifact Standard
- NEX-STD-059 Nex Context Package Standard

---

# Purpose

This standard defines the information architecture, classification system, naming conventions, and relationships used within the FDG Knowledge Repository.

---

# Core Principle

Knowledge shall be organized according to intelligence value, not storage convenience.

---

# Information Architecture Model

The FDG Knowledge Repository follows a layered structure:

```
Foundation

↓

Governance

↓

Knowledge

↓

Projects

↓

Systems

↓

Operations

↓

Archive
```

---

# Recommended Repository Structure

```
FDG Knowledge Repository

│
├── 00_NEX_CORE
│
├── 01_FDG_CONSTITUTION
│
├── 02_ENGINEERING_PRINCIPLES
│
├── 03_STANDARDS
│
├── 04_DECISION_RECORDS
│
├── 05_ENGINEERING_KNOWLEDGE
│
├── 06_PROJECTS
│
├── 07_SYSTEMS
│
├── 08_OPERATIONS
│
├── 09_TEMPLATES
│
└── 99_ARCHIVE
```

---

# Layer Definitions

---

# 00_NEX_CORE

Purpose:

Contains Nex governance and intelligence architecture.

Includes:

- Nex Constitution
- Nex Standards
- Agent Framework
- Operating Rules
- Evolution Records

---

# 01_FDG_CONSTITUTION

Purpose:

Defines organizational identity and direction.

Includes:

- mission
- principles
- strategy
- organizational philosophy

---

# 02_ENGINEERING_PRINCIPLES

Purpose:

Preserve engineering reasoning.

Includes:

- design philosophy
- reliability principles
- lifecycle thinking
- optimization principles

---

# 03_STANDARDS

Purpose:

Approved methods and requirements.

Includes:

- engineering standards
- workflows
- procedures
- governance documents

---

# 04_DECISION_RECORDS

Purpose:

Preserve why decisions were made.

Includes:

- architecture decisions
- technology choices
- engineering selections
- business decisions

---

# 05_ENGINEERING_KNOWLEDGE

Purpose:

Reusable technical intelligence.

Includes:

- calculations
- lessons learned
- references
- methods
- troubleshooting knowledge

---

# 06_PROJECTS

Purpose:

Project-specific knowledge.

Structure:

```
Project Name

├── Context

├── Requirements

├── Decisions

├── Execution

├── Results

└── Lessons Learned

```

---

# 07_SYSTEMS

Purpose:

Document operational systems.

Includes:

- FEIP
- FDG Business Tracker
- ML Digital Platform
- Infrastructure systems

---

# 08_OPERATIONS

Purpose:

Current operating knowledge.

Includes:

- workflows
- maintenance practices
- operational procedures

---

# 09_TEMPLATES

Purpose:

Reusable structures.

Includes:

- reports
- decision templates
- work packages
- checklists

---

# 99_ARCHIVE

Purpose:

Preserve historical information.

Contains:

- retired standards
- obsolete decisions
- previous versions

---

# Knowledge Classification

Every important item should belong to one primary category:

## Principle

Why something should be done.

---

## Standard

What should be followed.

---

## Procedure

How something is performed.

---

## Decision

Why a choice was made.

---

## Knowledge

What has been learned.

---

## Record

Evidence of what happened.

---

# Naming Convention

Files should use:

```
CATEGORY-ID-TITLE

```

Examples:

```
STD-NEX-060-REVIEW-APPROVAL-GATE

DEC-2026-001-PV-ARCHITECTURE

KNW-HVAC-FCU-TROUBLESHOOTING

```

---

# Metadata Standard

Important notes should include:

```
Title:

Type:

Status:

Owner:

Created:

Updated:

Version:

Related:

Tags:

```

---

# Tagging Principle

Tags should represent relationships.

Avoid excessive tagging.

Recommended categories:

## Domain

Examples:

HVAC

Electrical

AI

Solar

ERP

---

## Status

Examples:

Draft

Approved

Archived

---

## Type

Examples:

Standard

Decision

Project

Knowledge

---

# Linking Principle

Knowledge value increases through relationships.

Important notes should link:

- related standards
- decisions
- projects
- lessons learned

---

# Knowledge Hierarchy

Information maturity:

```
Data

↓

Information

↓

Knowledge

↓

Intelligence

↓

Organizational Capability
```

---

# Anti-Pattern Prevention

## Folder Explosion

Creating too many categories.

---

## Orphan Knowledge

Information without relationships.

---

## Duplicate Truth

Multiple conflicting versions.

---

## Storage Thinking

Saving files without considering retrieval.

---

# Responsibilities

## Francis

Approves architecture changes.

Defines strategic knowledge structure.

---

## Nex

Maintains information consistency.

Identifies knowledge gaps.

---

## Contributors

Follow classification standards.

Maintain quality.

---

# Governing Principle

The purpose of organization is not storage.

The purpose is future intelligence.

---

End of Standard