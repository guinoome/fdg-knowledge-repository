# NAMING STANDARD

Document ID: NEX-STD-030

Document Type: Knowledge Architecture Standard

Version: 1.0

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:

- NEX-STD-001 Document Control
- NEX-STD-025 Knowledge Architecture Model
- NEX-STD-026 Repository Structure Standard
- NEX-STD-029 Knowledge Asset Standard

---

# Purpose

This standard defines naming conventions for all knowledge assets within the FDG Knowledge Repository.

Consistent naming improves discoverability, readability, governance, and long-term maintainability.

---

# Core Principle

Names communicate engineering purpose.

Every name should immediately indicate what the asset is responsible for.

---

# Naming Objectives

Naming shall:

- improve discoverability
- communicate purpose
- reduce ambiguity
- remain stable over time
- support repository scalability

---

# General Rules

Names shall be:

clear

concise

descriptive

technology-independent

stable

Avoid unnecessary abbreviations unless they are established engineering terminology.

---

# Preferred Format

Knowledge assets should use:

```
PRIMARY_SUBJECT_QUALIFIER
```

Examples:

```
DOCUMENT_CONTROL_STANDARD

DECISION_EVOLUTION_STANDARD

KNOWLEDGE_CAPTURE_STANDARD

MECHANICAL_ENGINEERING_MOC

HVAC_DESIGN_GUIDE

PROJECT_EXECUTION_TEMPLATE
```

---

# Avoid

Do not use:

```
New Standard

Updated Final

Document v3

Copy of...

Misc Notes

Meeting Stuff

Random Ideas
```

Names shall never depend on version numbers or temporary status.

Version information belongs in document metadata.

---

# Section Naming

Repository sections shall describe organizational responsibility.

Examples:

```
Governance

Identity

Knowledge Management

Knowledge Architecture

Templates

Domain Knowledge
```

---

# Folder Naming

Top-level organizational units should use singular, responsibility-based names whenever practical.

Example:

```
Governance

Template

Architecture Decision Record

Domain

Project
```

Repository implementation may pluralize names when required by tooling.

---

# Template Naming

Templates shall end with:

```
_TEMPLATE
```

Examples:

```
PROJECT_TEMPLATE

STANDARD_TEMPLATE

ADR_TEMPLATE
```

---

# Standard Naming

Standards shall end with:

```
_STANDARD
```

Examples:

```
LINKING_STANDARD

TAGGING_STANDARD

METADATA_STANDARD
```

---

# Map of Content Naming

Maps of Content shall end with:

```
_MOC
```

Examples:

```
ENGINEERING_MOC

SOLAR_MOC

MECHANICAL_ENGINEERING_MOC
```

---

# ADR Naming

Architecture Decision Records should follow:

```
ADR-###_SHORT_TITLE
```

Examples:

```
ADR-001_FDG_KNOWLEDGE_REPOSITORY

ADR-002_AGENTIC_COLLABORATION_MODEL
```

---

# Domain Naming

Domains should reflect enduring engineering disciplines or organizational functions.

Avoid naming domains after software, vendors, or temporary initiatives.

---

# Responsibilities

Francis

Approves repository naming conventions.

---

Nex

Maintains naming consistency.

Detects ambiguity.

Recommends naming improvements.

---

# Naming Quality Checklist

Every name should answer:

✓ What is it?

✓ What is its responsibility?

✓ Can another engineer understand it without explanation?

✓ Will the name remain appropriate in ten years?

---

# Organizational Principle

Good names reduce engineering friction.

Repository navigation begins with clear naming.

---

# Continuous Improvement

Naming conventions may evolve through controlled evolution while preserving backward compatibility whenever practical.

Renaming should improve clarity, not personal preference.

---

# Governing Principle

A well-named knowledge asset communicates its engineering purpose before it is opened.

---

End of Standard

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[05_Knowledge_Architecture/05_Knowledge_Architecture_Master_Index|05 Knowledge Architecture Master Index]] → this document
