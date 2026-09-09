# CORE-0001 — Architectural Principles and Boundaries

## Non-monolith rule

CORE owns **shared primitives**, not engineering disciplines.

CORE may own `Asset`, `Location`, `Requirement`, `Observation`, `Measurement`, `Evidence`, `Document`, `Finding`, `Action`, `Actor`, `Approval`, `Revision`, `Relationship`, and shared services around them.

CORE must not absorb HVAC commissioning procedures, energy baseline algorithms, PM frequencies, RCA causal methodology, construction inspection rules, or CAPEX decision models merely because a module needs them.

## Architecture change test

A proposed CORE change must demonstrate all of the following:

1. It is genuinely cross-domain.
2. At least two independent engineering workflows can reuse it, or there is compelling platform-level justification.
3. It belongs to the shared engineering ontology/service layer rather than one module.
4. It can be introduced with controlled schema/version migration.
5. It does not weaken provenance, tenant isolation, offline operation, or historical reproducibility.

If these tests fail, implement the capability in the requesting module.

## Separation of concerns

```text
CORE          = shared facts, identity, provenance, state, relationships
MODULE        = discipline-specific engineering behavior
METHODOLOGY   = calculation/evaluation procedure
WORKFLOW      = responsibilities, sequence, review and approval
DOCUMENT      = human-readable controlled representation
INTELLIGENCE  = inference, prediction, optimization, recommendation
ENTITLEMENT   = purchased capability
AUTHORIZATION = what this actor may see/do in this context
BRANDING      = presentation
```

## Capture-once principle

Shared engineering entities must have canonical identities. Modules reference them rather than cloning them.

## Historical integrity

Engineering history is append/supersede oriented. Material records are not silently overwritten.

## Replaceability

Models, agents, databases, document renderers and workflow engines should be replaceable behind stable contracts where practical.

## Related

[[CORE-0002 - Canonical Engineering Data Model]] · [[CORE-0007 - Module Contracts Events and Interoperability]] · [[FDG Project Intelligence System]]
