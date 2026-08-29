# FDG Security Intelligence System (FSIS)
## FDG Ecosystem Security, Knowledge Security, and Collaborator Governance

**Document Status:** Approved Architecture Baseline  
**System:** FDG Security Intelligence System (FSIS)  
**Parent Organization:** FDG Ecosystem  
**Security Objective:** Protect the integrity, confidentiality, governance, and evolution of the FDG Ecosystem.

---

## 1. Purpose

FSIS is a separate FDG intelligence domain responsible for protecting the FDG Ecosystem itself.

Its primary concern is not conventional physical security. Its primary concern is:

- Cybersecurity
- Knowledge security
- Intellectual-property protection
- Identity and access governance
- Collaborator authorization
- AI/agent access control
- Knowledge compartmentalization
- Auditability
- Controlled disclosure
- Protection of FDG CORE intelligence
- Prevention of unauthorized reconstruction of the FDG Ecosystem

FSIS ensures that humans, AI collaborators, software agents, and external systems can contribute effectively without receiving unrestricted knowledge of how the entire FDG Ecosystem is constructed.

---

## 2. Approved Name

**FDG Security Intelligence System (FSIS)**

The previously considered **FDG Intelligence Security System (FISS)** is retained as an architectural concept/name option, but the approved system name for the FDG Ecosystem is:

> **FDG Security Intelligence System (FSIS)**

The name remains broad enough to cover cybersecurity, knowledge security, identity, access, governance, and protection of organizational intelligence.

---

## 3. Core Mission

> **FSIS safeguards the confidentiality, integrity, governance, and long-term evolution of the FDG Ecosystem by ensuring every human, AI collaborator, and software component operates under explicit authorization, least-privilege access, and compartmentalized knowledge boundaries.**

---

## 4. Fundamental Security Objective

The objective is not to prevent collaborators from being useful.

The objective is:

> **Maximum authorized capability with minimum necessary exposure.**

A collaborator should be able to perform its assigned work at the highest practical level without obtaining unnecessary knowledge about the broader FDG Ecosystem.

This creates the following relationship:

```text
                 FDG ECOSYSTEM
                       │
                       ▼
              ┌─────────────────┐
              │      FSIS       │
              │ Security /      │
              │ Trust Boundary  │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Humans          AI        Software
   Collaborators   Agents      Components
          │            │            │
          └────────────┼────────────┘
                       ▼
              Authorized Context
                       │
                       ▼
                 Work Package
```

---

# 5. FDG Security Principle

## 5.1 Minimum Necessary Knowledge

Every collaborator receives only the knowledge, context, credentials, tools, and authority required for the assigned work package.

> **The FDG Ecosystem is never shared as a whole.**

A collaborator does not need to understand the entire ecosystem to perform a specialized task.

---

## 5.2 Minimum Necessary Authority

Knowledge access and operational authority are separate controls.

A collaborator may be allowed to:

- read a specification;
- modify a defined implementation;
- execute a defined workflow;

without being allowed to:

- access unrelated repositories;
- modify FDG governance;
- view confidential strategy;
- access FDG CORE;
- authorize another collaborator;
- change security policies.

---

## 5.3 Explicit Authorization

Access shall be granted intentionally.

Default state:

> **No access unless authorized.**

Authorization should be based on:

- identity;
- role;
- task;
- knowledge classification;
- system;
- time;
- required action;
- security level.

---

## 5.4 Compartmentalization

FDG knowledge must be divided into controlled compartments.

Recommended baseline:

```text
FDG Knowledge Repository
│
├── Public
├── Internal
├── Confidential
├── Restricted
└── FDG CORE
```

### Public

Information that may safely be shared outside FDG.

### Internal

Normal organizational information intended for approved FDG collaborators.

### Confidential

Information whose disclosure could materially affect FDG operations, strategy, finances, projects, or intellectual property.

### Restricted

Highly sensitive information requiring explicit authorization.

### FDG CORE

Highest-security organizational intelligence.

This includes, where applicable:

- FDG constitutional/governance knowledge;
- master architecture;
- proprietary organizational design;
- security architecture;
- strategic roadmap;
- master intelligence architecture;
- sensitive intellectual property;
- owner-level decisions;
- security credentials and secrets;
- information that could enable reconstruction of the complete FDG Ecosystem.

---

# 6. Collaborator Security Model

FSIS must support controlled collaboration with:

- Human collaborators
- Contractors
- Engineers
- Developers
- Consultants
- AI assistants
- AI coding agents
- Research agents
- Automation agents
- External software
- Future autonomous agents

The collaborator is not automatically trusted because it is useful.

Trust is scoped.

---

## 6.1 Collaborator Trust Levels

Baseline model:

```text
Level 0 — Public
    No internal FDG knowledge

Level 1 — Approved Research Collaborator
    Limited approved reference material

Level 2 — Domain Specialist
    Access to a defined domain

Level 3 — Engineering Collaborator
    Engineering implementation context

Level 4 — FDG Core Collaborator
    Expanded organizational context

Level 5 — Owner Authorization
    Highest authority
```

The levels are governance classifications, not an assumption that every platform supports these controls technically.

---

# 7. AI Collaborator Security

AI collaborators shall be treated as external execution/intelligence resources unless explicitly integrated into the FDG trust boundary.

Examples include:

- ChatGPT
- Claude
- Gemini
- coding agents
- research agents
- document-analysis systems
- future AI platforms

The security model must assume that an AI collaborator does not require unrestricted knowledge of FDG.

---

## 7.1 AI Context Boundary

Each AI task should have a defined:

```text
Task
↓
Required Context
↓
Authorized Knowledge
↓
Allowed Tools
↓
Allowed Actions
↓
Expected Output
```

The AI receives the smallest useful context that permits competent execution.

---

## 7.2 Standard Collaborator Instruction

> **You are authorized to access only the knowledge explicitly provided in this session. Do not infer or request information outside the assigned scope.**

This should become a reusable FSIS security instruction.

A stronger operational version is:

> **Operate only within the assigned work package and explicitly provided context. Do not request, retrieve, infer, reconstruct, or expose information outside the authorized scope. Do not assume access to FDG CORE, unrelated repositories, proprietary architecture, credentials, strategic information, or other restricted knowledge.**

---

# 8. Capability Without Full Exposure

The central FSIS design goal is:

> **Collaborators can perform their work at their best without receiving the complete FDG blueprint.**

Example:

```text
Claude Code
    │
    ├── Receives: application specification
    ├── Receives: relevant code
    ├── Receives: coding standards
    ├── Receives: test criteria
    │
    └── Does NOT automatically receive:
          ├── FDG master architecture
          ├── complete business strategy
          ├── unrelated intelligence systems
          ├── owner-level decisions
          └── FDG CORE
```

The same principle applies to every other collaborator.

---

# 9. Protecting the FDG Ecosystem From Reconstruction

FSIS should not be framed as guaranteeing that nobody can ever build something similar.

That cannot be technically guaranteed.

The defensible objective is:

> **Prevent unauthorized collaborators from obtaining sufficient proprietary knowledge to reconstruct the FDG Ecosystem from FDG-controlled information.**

Protection therefore focuses on:

- proprietary documentation;
- architecture;
- standards;
- workflows;
- implementation;
- accumulated organizational knowledge;
- historical decisions;
- integration patterns;
- strategic plans;
- security controls;
- source code;
- internal datasets.

The uniqueness of FDG is therefore protected by controlling the combination of these assets.

---

# 10. FDG Ecosystem Security Boundary

FSIS should sit across the FDG intelligence domains.

```text
                         FDG ECOSYSTEM
                               │
                   ┌───────────┴───────────┐
                   │          FSIS          │
                   │ Security Boundary     │
                   └───────────┬───────────┘
                               │
       ┌───────────────┬───────┼───────────────┬───────────────┐
       ▼               ▼       ▼               ▼               ▼
      FDG CORE       FEIS     FBIS           FBPOIS          Future IS
       │               │       │               │               │
       └───────────────┴───────┼───────────────┴───────────────┘
                               │
                         Controlled Access
```

FSIS does not own the other intelligence systems.

It governs their security boundary and access relationships.

---

# 11. Integration With FDG CORE

FDG CORE remains the central organizational intelligence foundation.

FSIS provides the security governance around it.

```text
FDG CORE
│
├── Governance
├── Identity
├── Organizational Architecture
├── Knowledge Architecture
├── Agentic Framework
├── Engineering Intelligence
├── Business Intelligence
└── Security Intelligence
                         │
                         ▼
                       FSIS
```

FSIS should therefore integrate with:

- FDG governance;
- identity management;
- knowledge management;
- repository architecture;
- agentic framework;
- intelligence-system permissions;
- audit mechanisms;
- deployment architecture;
- future FDG platform services.

---

# 12. Security Domains

FSIS should initially contain the following intelligence domains.

## 12.1 Identity Intelligence

Controls:

- human identity;
- collaborator identity;
- AI identity;
- service identity;
- device identity;
- ownership;
- authorization state.

---

## 12.2 Access Intelligence

Controls:

- role-based access;
- attribute-based access;
- least privilege;
- temporary permissions;
- task-based permissions;
- repository permissions;
- application permissions;
- tool permissions.

---

## 12.3 Knowledge Security

Controls:

- classification;
- compartmentalization;
- controlled disclosure;
- document permissions;
- repository boundaries;
- sensitive knowledge handling;
- knowledge lineage.

---

## 12.4 AI Governance

Controls:

- AI collaborator registration;
- approved use cases;
- context boundaries;
- tool permissions;
- data exposure;
- prompt/context governance;
- output handling;
- auditability;
- revocation.

---

## 12.5 Intellectual Property Security

Protect:

- proprietary architecture;
- source code;
- engineering methods;
- business methods;
- organizational models;
- internal standards;
- proprietary workflows;
- strategic plans;
- accumulated knowledge.

---

## 12.6 Cybersecurity

Traditional cybersecurity remains part of FSIS:

- authentication;
- authorization;
- credential protection;
- secrets management;
- endpoint security;
- network security;
- application security;
- vulnerability management;
- backup protection;
- incident response.

---

## 12.7 Audit and Traceability

FSIS should record, where technically and legally appropriate:

- who accessed information;
- what was accessed;
- when it was accessed;
- why it was accessed;
- what was changed;
- what was exported;
- what authorization permitted the action.

---

## 12.8 Security Intelligence

FSIS should eventually analyze:

- abnormal access;
- unusual data movement;
- repeated unauthorized requests;
- privilege escalation;
- suspicious collaborator behavior;
- repository anomalies;
- security incidents;
- emerging threats.

---

# 13. Security Architecture

The target architecture should be layered.

```text
Layer 0 — Owner Authority
        │
Layer 1 — FDG Ecosystem Governance
        │
Layer 2 — Identity & Trust
        │
Layer 3 — Authorization
        │
Layer 4 — Knowledge Classification
        │
Layer 5 — Context / Work Package Boundary
        │
Layer 6 — Tool & System Permissions
        │
Layer 7 — Audit / Monitoring
        │
Layer 8 — Security Intelligence
```

No single control should be treated as sufficient.

---

# 14. Knowledge Access Matrix

A future implementation should maintain a machine-readable access matrix.

Example:

| Asset | Public | Internal | Confidential | Restricted | CORE |
|---|---:|---:|---:|---:|---:|
| Public documentation | R | R | R | R | R |
| General standards | R | R | R | R | R |
| Engineering implementation | - | R | R | Controlled | Controlled |
| Business strategy | - | - | R | Controlled | Controlled |
| Security architecture | - | - | - | R | R |
| Master FDG architecture | - | - | - | Controlled | R |
| Owner-level strategy | - | - | - | - | R |
| Credentials/secrets | - | - | - | - | Controlled |

`R = Read`

`Controlled = Explicit authorization required`

---

# 15. Security Workflow

Every external collaboration should follow:

```text
1. Define Work Package
        ↓
2. Identify Required Knowledge
        ↓
3. Classify Knowledge
        ↓
4. Identify Collaborator
        ↓
5. Assign Trust Level
        ↓
6. Grant Minimum Required Access
        ↓
7. Execute Work
        ↓
8. Review Output
        ↓
9. Record Decision / Artifact
        ↓
10. Revoke Temporary Access
        ↓
11. Store Approved Result in FDG Repository
```

This creates a controlled learning loop.

---

# 16. Knowledge Flow Rule

The preferred direction is:

```text
FDG Knowledge
      ↓
Security Classification
      ↓
Authorized Context
      ↓
Collaborator
      ↓
Validated Output
      ↓
FDG Review
      ↓
FDG Knowledge Repository
```

Not:

```text
Entire FDG Repository
        ↓
External Collaborator
```

---

# 17. Security and Organizational Learning

FSIS must not prevent useful collaboration.

Instead, it creates a controlled learning mechanism.

A collaborator may produce:

- code;
- analysis;
- engineering calculations;
- documentation;
- research;
- design;
- recommendations.

But the resulting knowledge becomes FDG organizational knowledge only after review and approval.

This prevents external collaborators from becoming the permanent owners of organizational memory.

The authoritative knowledge should remain inside the FDG Knowledge Repository.

---

# 18. FDG Knowledge Repository Integration

Recommended structure:

```text
FDG Knowledge Repository
│
├── 00_NEX
├── 01_Governance
├── 02_Identity
├── 03_Agentic_Framework
├── 04_Knowledge_Management
├── 05_Knowledge_Architecture
├── 06_Organizational_Architecture
├── 07_NEX_Core_Intelligence
├── 08_FEIS_Engineering_Intelligence
├── 09_FDG_Platform_Hub
├── 10_FDG_CORE_Intelligence
├── 11_FBIS_Business_Intelligence
├── 12_FSIS_Security_Intelligence
└── Future Intelligence Systems
```

FSIS should not duplicate the whole repository.

It should maintain security metadata, policies, classifications, authorization rules, and security intelligence associated with these repositories.

---

# 19. FSIS Folder Architecture

Recommended initial Obsidian structure:

```text
12_FDG_Security_Intelligence_System
│
├── 00_FSIS_Home
│
├── 01_Governance
│
├── 02_Identity_Intelligence
│
├── 03_Access_Control
│
├── 04_Knowledge_Security
│
├── 05_Collaborator_Security
│
├── 06_AI_Security
│
├── 07_Intellectual_Property
│
├── 08_Cybersecurity
│
├── 09_Audit_Traceability
│
├── 10_Security_Intelligence
│
├── 11_Incident_Response
│
├── 12_Security_Standards
│
├── 13_Security_Architecture
│
├── 14_Integration
│
└── 15_Roadmap
```

---

# 20. FSIS Core Documents

Recommended initial document set:

```text
FSIS-0000 - Security Intelligence Master
FSIS-0001 - FSIS Development Guidelines
FSIS-0002 - FDG Security Constitution
FSIS-0003 - Knowledge Classification Standard
FSIS-0004 - Collaborator Trust Model
FSIS-0005 - Access Control Standard
FSIS-0006 - AI Collaborator Security Standard
FSIS-0007 - Knowledge Compartmentalization Standard
FSIS-0008 - Intellectual Property Protection Standard
FSIS-0009 - Audit and Traceability Standard
FSIS-0010 - Security Incident Response Standard
FSIS-0011 - FDG Security Architecture
FSIS-0012 - FDG Security Integration Standard
FSIS-0013 - Security Review Checklist
FSIS-0014 - External Collaborator Security Protocol
FSIS-0015 - FSIS Operating Procedures
FSIS-ROADMAP - Security Intelligence Development Roadmap
```

These should be developed sequentially and governed by the FDG document-control standards.

---

# 21. Security Classification Rules

Every new knowledge artifact should eventually have:

```text
Classification:
Owner:
Domain:
Authorized Roles:
Authorized Systems:
Authorized Collaborators:
Retention:
Export Permission:
Modification Permission:
Audit Requirement:
```

The exact implementation can evolve.

The governance principle should remain stable.

---

# 22. External Collaborator Rule

The following should become a foundational FDG rule:

> **An external collaborator may be given sufficient information to perform an assigned task but shall not automatically receive sufficient information to understand, reproduce, or reconstruct the complete FDG Ecosystem.**

This is not intended to obstruct legitimate work.

It is a knowledge-boundary rule.

---

# 23. No Full-Ecosystem Context

Avoid sending an AI collaborator:

- the entire Obsidian vault;
- the entire FDG architecture;
- all intelligence-system roadmaps;
- all organizational decisions;
- all source code;
- all strategic documents;
- unrestricted internal history.

Instead:

```text
Work Package
    +
Required Context
    +
Relevant Standards
    +
Required Inputs
    +
Acceptance Criteria
```

This should normally be enough.

---

# 24. Security by Work Package

FSIS should integrate directly with the FDG work-package methodology.

Each work package should define:

```text
WP-ID
Objective
Owner
Collaborator
Required Knowledge
Knowledge Classification
Allowed Tools
Allowed Systems
Allowed Actions
Expected Output
Security Restrictions
Review Requirement
```

This makes security operational rather than theoretical.

---

# 25. FISS/FSIS Design Principle: Capability Without Disclosure

The key distinction is:

```text
CAPABILITY
   ≠
KNOWLEDGE OF THE WHOLE SYSTEM
```

A specialist does not need the entire organization to produce excellent work.

For example:

```text
UI Specialist
    → needs UI requirements

Backend Engineer
    → needs API/database requirements

Mechanical Engineer
    → needs engineering requirements

Business Analyst
    → needs business requirements

Security Engineer
    → needs security requirements
```

They do not automatically need:

```text
FDG CORE
Complete Ecosystem Architecture
Owner Strategy
All Roadmaps
All Intelligence Systems
All Historical Decisions
```

---

# 26. Security Review Questions

Before exposing information to a collaborator:

1. What exactly are they being asked to do?
2. What information is actually required?
3. What is the classification of that information?
4. What additional information could expose unrelated FDG intelligence?
5. Can the work be completed with a smaller context?
6. What tools are required?
7. What actions are permitted?
8. Is access temporary?
9. What happens to the resulting artifact?
10. Does the result need security review before entering the repository?

---

# 27. Security Success Criteria

FSIS should be considered successful when:

- collaborators can perform their assigned work effectively;
- unnecessary knowledge is not exposed;
- FDG CORE remains protected;
- access is explicitly governed;
- sensitive information is classified;
- external collaboration is auditable;
- unauthorized access can be detected;
- permissions can be revoked;
- approved knowledge returns to FDG-controlled repositories;
- the FDG Ecosystem remains understandable and governable by its authorized owner without depending on any single external collaborator.

---

# 28. Important Boundary

FSIS should not become a generic cybersecurity product detached from FDG.

Its purpose is specifically:

> **Security of FDG organizational intelligence.**

Traditional cybersecurity is one component.

The broader mission is protection of:

```text
People
+
Identity
+
Knowledge
+
Architecture
+
Code
+
Processes
+
Standards
+
Strategy
+
Organizational Memory
+
AI Collaboration
```

---

# 29. Relationship to Other FDG Intelligence Systems

```text
FDG CORE
   │
   ├── FEIS
   │     Engineering Intelligence
   │
   ├── FBIS
   │     Business Intelligence
   │
   ├── FBPOIS
   │     Building Plant Operations Intelligence
   │
   ├── FWFIS
   │     Workflow Intelligence
   │
   ├── Future Intelligence Systems
   │
   └── FSIS
         Security Intelligence
```

FSIS is different because it protects the ecosystem containing the other intelligence systems.

It therefore has cross-domain responsibilities but does not absorb those domains.

---

# 30. FDG Security Operating Model

The long-term model is:

```text
                    FDG OWNER
                       │
                       ▼
                FDG GOVERNANCE
                       │
                       ▼
                      FSIS
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     Identity       Knowledge       Access
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                 Collaborators
                       │
                       ▼
                 Work Packages
                       │
                       ▼
                 Validated Output
                       │
                       ▼
                FDG Repository
```

---

# 31. Long-Term Evolution

FSIS should evolve through controlled maturity:

```text
Phase 0
Security Principles
        ↓
Phase 1
Knowledge Classification
        ↓
Phase 2
Collaborator Governance
        ↓
Phase 3
Identity & Access Control
        ↓
Phase 4
Repository Security
        ↓
Phase 5
AI/Agent Security
        ↓
Phase 6
Audit & Security Intelligence
        ↓
Phase 7
Automated Policy Enforcement
        ↓
Phase 8
FDG Security Intelligence System
```

Automation should follow validated governance.

Do not automate unclear security rules.

---

# 32. FDG Engineering Principle: Avoid AI Slop

FSIS documentation should follow the FDG engineering principle derived from the Focused Execution Day material:

> **Every document should reduce ambiguity, not increase word count. Every sentence should help someone make a better engineering decision or execute the work more effectively.**

Avoid:

- generic security language;
- repeated principles;
- unsupported claims;
- unnecessary architecture;
- buzzwords;
- features added without a security requirement;
- documents that exist only to increase document count.

Prefer:

- explicit security boundaries;
- concrete authorization rules;
- defined classifications;
- testable controls;
- clear responsibilities;
- measurable acceptance criteria;
- evidence-based decisions.

For collaborators:

> **Write only what is necessary to complete the assigned work package. Eliminate generic filler, repetition, and unsupported claims. Prefer concrete engineering decisions, constraints, and implementation guidance over aspirational language.**

This principle applies to FSIS itself and to the agents that help build it.

---

# 33. Approved FSIS Doctrine

The following statements form the initial doctrine:

### Doctrine 1 — FDG Is the Protected Asset

FSIS exists to protect the FDG Ecosystem and its accumulated organizational intelligence.

### Doctrine 2 — Collaboration Is Allowed

Security must not unnecessarily prevent useful collaboration.

### Doctrine 3 — Access Is Not Trust

A collaborator may be trusted for one task without being trusted with the entire ecosystem.

### Doctrine 4 — Least Privilege

Provide the minimum knowledge and authority necessary to perform the task.

### Doctrine 5 — Compartmentalization

Separate knowledge so compromise of one context does not expose the whole ecosystem.

### Doctrine 6 — FDG CORE Is Highest Security

FDG CORE remains protected from ordinary external collaboration.

### Doctrine 7 — The Repository Is the Organizational Memory

Approved knowledge returns to the FDG-controlled repository rather than remaining dependent on an external collaborator.

### Doctrine 8 — Security Must Be Auditable

Important access and security decisions should be traceable.

### Doctrine 9 — Security Rules Must Be Explicit

Do not rely on an AI or human collaborator to infer security boundaries.

### Doctrine 10 — Capability Without Disclosure

A collaborator should be capable of excellent work without possessing the complete FDG blueprint.

---

# 34. Final Architecture Statement

**FDG Security Intelligence System (FSIS)** is the dedicated security intelligence domain of the FDG Ecosystem.

It protects the ecosystem's:

- integrity;
- confidentiality;
- governance;
- intellectual property;
- organizational memory;
- knowledge architecture;
- collaborator boundaries;
- AI collaboration;
- identity;
- access;
- cyber infrastructure;
- long-term evolution.

FSIS does not exist to isolate FDG from collaboration.

It exists to make collaboration **controlled, purposeful, and survivable**.

The target state is:

> **Collaborators can use FDG knowledge to perform their authorized work at their best, while the FDG Ecosystem retains control of its architecture, organizational memory, proprietary knowledge, governance, and accumulated intelligence.**

---

# 35. Integration Rule

FSIS should be integrated into the FDG Ecosystem at the governance and platform level, not embedded inside individual intelligence systems.

```text
                    FDG ECOSYSTEM
                         │
        ┌────────────────┴────────────────┐
        │                                 │
    FDG CORE                              FSIS
    Governance                    Security / Trust
        │                                 │
        ├──────────────┬──────────────────┤
        ▼              ▼                  ▼
      FEIS           FBIS             FBPOIS
        │              │                  │
        └──────────────┴──────────────────┘
                       │
                Future Intelligence
                       Systems
```

FSIS therefore becomes a **cross-cutting protection domain**, while FEIS, FBIS, FBPOIS, FWFIS, and future systems remain independently governed intelligence domains.

---

## 36. Immediate Next Step

The recommended implementation sequence is:

1. Create `12_FDG_Security_Intelligence_System`.
2. Create `00_FSIS_Home`.
3. Create `FSIS-0000 - Security Intelligence Master`.
4. Create `FSIS-0001 - FSIS Development Guidelines`.
5. Create the security classification model.
6. Define the collaborator trust model.
7. Define access-control rules.
8. Define AI collaborator security.
9. Define knowledge compartmentalization.
10. Define FDG CORE protection.
11. Define FSIS integration with the existing FDG Knowledge Repository.
12. Build the FSIS roadmap.

**Milestone boundary:** establish the governance and knowledge-security architecture first. Technical authentication, encryption, identity providers, automated policy engines, and external integrations should follow only after the security model is validated.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[12_FDG_Security_Intelligence_System/README|README]] → this document
