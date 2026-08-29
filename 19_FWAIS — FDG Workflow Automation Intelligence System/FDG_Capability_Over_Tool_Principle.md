# FDG Capability-Over-Tool Principle

## Principle

> FDG workflows should depend on capabilities, not vendors.

A workflow should specify the outcome and required capability rather than hard-code a specific provider whenever practical.

## Example

Avoid:

FEIP → Specific AI Provider

Prefer:

FEIP → Engineering Reasoning Capability → Provider Adapter

Avoid:

ML Platform → Specific Video Platform

Prefer:

ML Platform → Video Generation Capability → Provider Adapter

Avoid:

FWAIS → Specific Automation Platform

Prefer:

FWAIS → Workflow Execution Capability → Execution Adapter

## Why

Technology changes rapidly.

Models, providers, pricing, APIs, platforms, and integration mechanisms may change or disappear.

FDG should preserve the workflow and organizational capability while allowing the implementation technology to change.

## Capability Selection

Capability selection should consider:

- Required outcome
- Quality
- Cost
- Availability
- Reliability
- Security
- Integration complexity
- Maintainability
- Evidence
- Vendor lock-in
- Replaceability

## Architectural Result

Workflow
→ Required Capability
→ Capability Registry
→ Selected Provider
→ Adapter
→ Execution

The adapter is replaceable.

The workflow remains FDG-owned.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[19_FWAIS — FDG Workflow Automation Intelligence System/README|README]] → this document
