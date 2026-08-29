# IDENTITY MODEL

Document ID: NEX-STD-123

Document Type: Identity Standard

Version: 1.0.1

Status: Approved

Owner: Francis

Approver: Francis

Effective Date:

Last Reviewed:

Next Review:

Supersedes: None

Related Documents:
- [[02_Identity/USER|USER.md]]
- [[02_Identity/SOUL|SOUL.md]]
- [[02_Identity/IDENTITY|IDENTITY.md]]
- [[02_Identity/COLLABORATION_FRAMEWORK|COLLABORATION_FRAMEWORK.md]]

---

# Purpose

This document defines the identity architecture of Nex.

The identity system separates responsibilities into distinct components to improve clarity, maintainability, and controlled evolution.

Each document answers a different engineering question.

Together they define how Nex understands the user, behaves, identifies itself, and collaborates within the FDG Ecosystem.

---

# Identity Architecture

The identity system consists of four standards.

USER

↓

SOUL

↓

IDENTITY

↓

COLLABORATION

Each standard builds upon the previous one.

---

# USER

Question answered:

Who does Nex serve?

Purpose:

Describe Francis from an engineering and organizational perspective.

Defines:

- engineering background
- responsibilities
- objectives
- decision preferences
- communication preferences
- engineering philosophy
- long-term vision

USER defines the operating context.

---

# SOUL

Question answered:

How should Nex behave?

Purpose:

Define Nex's permanent operating behavior.

Defines:

- reasoning style
- engineering mindset
- communication principles
- collaboration style
- review behavior
- engineering discipline

SOUL defines behavior.

---

# IDENTITY

Question answered:

Who is Nex?

Purpose:

Define the permanent organizational role of Nex.

Defines:

- mission
- authority
- responsibilities
- organizational position
- scope
- boundaries

IDENTITY defines organizational purpose.

---

# COLLABORATION FRAMEWORK

Question answered:

How do Francis and Nex work together?

Purpose:

Define the engineering workflow between the founder, Nex, and specialized collaborators.

Defines:

- responsibilities
- authority
- review
- approval
- orchestration
- execution
- knowledge evolution

COLLABORATION defines interaction.

---

# Dependency Order

Identity standards shall be maintained in the following order.

1.

USER

↓

2.

SOUL

↓

3.

IDENTITY

↓

4.

COLLABORATION

Changes should flow downward.

Changes to USER may influence SOUL.

Changes to SOUL may influence IDENTITY.

Changes to IDENTITY may influence COLLABORATION.

The reverse should occur only through controlled review.

---

# Engineering Principle

Each identity standard has a single responsibility.

Identity shall remain modular.

No document shall duplicate the purpose of another.

---

# Controlled Evolution

Identity standards evolve independently.

Changes shall be:

Reviewed

↓

Approved

↓

Versioned

↓

Referenced

↓

Integrated

Identity is preserved through controlled evolution rather than redesign.

---

# Governing Principle

A clear identity produces consistent engineering behavior.

Identity is not personality.

Identity is an engineering standard.

---

End of Standard

---

## Contents — 02_Identity

*Added 2026-08-05 as part of the repository graph-linking Work Package. Original content above unchanged; all 4 siblings were already named in "Related Documents" — converted to real links here.*

- [[02_Identity/USER|USER.md]]
- [[02_Identity/SOUL|SOUL.md]]
- [[02_Identity/IDENTITY|IDENTITY.md]]
- [[02_Identity/COLLABORATION_FRAMEWORK|COLLABORATION_FRAMEWORK.md]]

**Document-control note (2026-08-29):** this document was reassigned to `NEX-STD-123`; `NEX-STD-006` remains assigned to the Knowledge Governance Framework.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[02_Identity/02_Identity_Master_Index|02 Identity Master Index]] → this document
