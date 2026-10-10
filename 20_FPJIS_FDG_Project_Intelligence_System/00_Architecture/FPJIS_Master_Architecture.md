# FPJIS Master Architecture

## Mission

Create a repeatable FDG capability for starting projects correctly, reducing disappointment, preventing unnecessary rebuilding, and improving implementation speed through complete blueprints and controlled validation.

## Operating model

Human intent
→ Project Blueprint
→ Reference/Requirement analysis
→ Blueprint construction
→ Visual Project Blueprint Board
→ Review/comment
→ Decision/revision
→ Blueprint readiness gate
→ Implementation Package
→ Dependency-based parallel work packages
→ Local implementation
→ Local validation
→ Release
→ Optional online deployment
→ Operational learning
→ Reusable Blueprint Library

## Architectural boundaries

FPJIS:
- governs project definition and readiness
- creates and maintains project blueprints
- provides project review and decision control
- identifies reusable FDG capability
- requests domain intelligence from other FDG Intelligence Systems
- generates implementation packages
- decomposes implementation into dependency-aware work packages
- controls revision and release readiness

Other Intelligence Systems:
- provide domain-specific intelligence
- remain responsible for their own domain
- do not become absorbed into FPJIS

Shared Infrastructure:
- is reusable technical infrastructure
- is not the project intelligence itself
- may include shared Supabase, authentication, storage, deployment, payment adapters, notifications, etc.

## Core gates

G0 Idea
G1 Qualified
G2 Blueprint in progress
G3 Review
G4 Blueprint revision
G5 Blueprint Ready
G6 Build Authorized
G7 Local Validated
G8 Release Approved
G9 Optional Online Deployment
G10 Operational Review / Learning

No project should be treated as implementation-ready merely because someone wants to start coding.

## Design Quality Gate

FPJIS must challenge:
- vague requirements
- duplicated capabilities
- unnecessary features
- weak navigation
- decorative UI without functional purpose
- unvalidated assumptions
- unnecessary dependencies
- vendor lock-in
- fake integrations
- placeholder architecture
- security shortcuts
- missing error/empty states
- unclear permissions
- undefined acceptance criteria
- unmaintainable structures

FPJIS must be able to return:
NOT READY — REVISION REQUIRED

This is an engineering control, not an aesthetic preference.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Modular Implementation-Readiness Extension — 2026-10-10

Project-wide completeness and bounded-module implementation readiness are separate.

The project-level gates G0–G10 remain valid.

For implementation execution, G5/G6 may be scoped explicitly to a bounded module/work package without implying that every future module in the project is fully defined.

Required rule:

~~~text
Overall Project Blueprint Readiness may be <100%

BUT

Authorized Module / Work Package
must be 100% implementation-ready
for its bounded applicable scope
before coding begins.
~~~

Track four independent measures:

~~~text
Blueprint Implementation Readiness
Implementation Completion
Validation Completion
Operational Maturity
~~~

See:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|Implementation Readiness Rubric]].

### Finished-session principle

If a module is too large to finish as a coherent accepted capability, reduce it into a smaller vertical slice before authorization.

A coding session should target:

~~~text
User Outcome
→ Complete Workflow
→ Canonical Data
→ Permission Boundary
→ Edge / Error States
→ Tests
→ Evidence
→ Acceptance
→ Closure
~~~

rather than broad partial scaffolding.

### Requirement proof chain

FPJIS now requires traceability through:

~~~text
Need
→ Requirement
→ Acceptance Criterion
→ Blueprint
→ Work Package
→ Implementation
→ Test
→ Evidence
→ Outcome
~~~

governed by:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/03_Requirements_Traceability_and_Verification_Standard|Requirements Traceability & Verification Standard]].
