# FWAIS Capability-over-Tool Principle

## Principle

> FDG workflows should depend on capabilities, not vendors.

## Avoid

- FEIP → Specific AI Provider
- ML Platform → Specific Video Platform
- FWAIS → Specific Automation Platform

## Prefer

- FEIP → Engineering Reasoning Capability → Provider Adapter
- Media Workflow → Video Generation Capability → Provider Adapter
- FWAIS → Workflow Execution Capability → Execution Adapter

## Why

Technology changes rapidly.

Models, providers, pricing, APIs, platforms, and integration mechanisms can change or disappear.

FDG should preserve the workflow and organizational capability while allowing implementation technology to change.

## Generic architecture

Workflow
→ Required Capability
→ Capability Registry
→ Selected Provider
→ Adapter
→ Execution

The adapter is replaceable.
The workflow remains FDG-owned.
