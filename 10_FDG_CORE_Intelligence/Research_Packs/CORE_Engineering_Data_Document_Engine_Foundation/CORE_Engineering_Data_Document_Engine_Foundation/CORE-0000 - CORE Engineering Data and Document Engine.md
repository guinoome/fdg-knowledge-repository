---
id: CORE-0000
status: Proposed Canonical
---

# CORE Engineering Data & Document Engine

## Purpose

CORE is the shared engineering information foundation beneath FDG engineering modules. It owns cross-domain primitives and common platform services while domain modules retain discipline-specific logic.

CORE answers:

> What is known? Where did it come from? What does it relate to? What state is it in? Who may use it?

A module answers:

> What discipline-specific engineering process should be performed?

## Architectural stack

```text
FDG Ecosystem
└── CORE Engineering Data & Document Engine
    ├── Identity & classification
    ├── Engineering records and relationships
    ├── Requirements and criteria
    ├── Measurements and observations
    ├── Evidence and provenance
    ├── Findings, actions, verification
    ├── Review, approval, revision
    ├── Methodology / validation services
    ├── Document generation
    ├── Authorization and tenant isolation
    ├── Subscription entitlements
    ├── Branding / white-label presentation
    ├── Audit trail
    ├── Events / integration contracts
    └── Local-first synchronization
         ↓
Engineering modules
    ├── Testing & Commissioning
    ├── Energy Audit
    ├── Preventive Maintenance
    ├── Engineering Investigation
    ├── Equipment Condition Assessment
    ├── Root Cause Analysis
    ├── Construction Inspection
    ├── CAPEX Engineering
    ├── MEPF Coordination
    └── Future modules
         ↓
Outputs / consumers
    ├── Word / PDF
    ├── Dashboards
    ├── Excel / CSV
    ├── BIM
    ├── Asset / PM systems
    ├── APIs
    ├── FEIS
    └── FDG Knowledge Repository
```

## Foundation principle

CORE shall remain **local-first, offline-capable, evidence-driven, explainable, agent-neutral, provider-replaceable, modular, interoperable, versioned, and multi-tenant-capable**.

No current AI vendor, document format, database product, or user interface is the architecture.

## Source of truth

A report is not the source of truth. A structured engineering record is.

Example: a pump discharge pressure measurement must be capable of carrying asset identity, quantity type, original value/unit, normalized value/unit, date/time, instrument, calibration, procedure, acceptance criterion, evidence, actor, review state, revision, and linked findings. Word/PDF merely renders the approved state.

## Related

[[FDG CORE]] · [[FDG Engineering Intelligence System]] · [[FDG Engineering Platform]] · [[FDG Knowledge Repository]]
