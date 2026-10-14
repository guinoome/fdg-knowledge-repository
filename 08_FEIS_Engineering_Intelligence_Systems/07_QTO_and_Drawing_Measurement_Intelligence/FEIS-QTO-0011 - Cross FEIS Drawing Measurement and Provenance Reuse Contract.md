---
document_id: FEIS-QTO-0011
title: Cross-FEIS Drawing Measurement and Provenance Reuse Contract
status: Approved Integration Contract
created: 2026-10-14
---

# FEIS-QTO-0011 — Cross-FEIS Drawing, Measurement & Provenance Reuse Contract

## Purpose

Make the useful OpenTakeoff-derived architecture reusable across FEIS without incorrectly turning every FEIS module into QTO.

## Reusable Services

The following may be consumed by other FEIS capabilities:

- DrawingDocument / DrawingSheet identity
- revision identity
- calibration
- drawing coordinate frame
- geometry/markup
- tag/symbol/schedule relationship
- provenance
- evidence
- review state
- human correction history
- source citation
- local/offline drawing workspace patterns

## BIM

Reuse:
- sheet/revision identity;
- geometry/quantity comparisons;
- drawing relationship graph;
- source/provenance.

BIM retains authority for spatial/model semantics, clash relationships and model objects.

## Testing & Commissioning

Reuse:
- equipment tags/schedules;
- drawing-to-equipment relationships;
- evidence links;
- human review;
- marked drawing references.

T&C retains authority for readiness, procedure, test result and acceptance.

## Energy Audit

Reuse:
- floor/space areas;
- equipment counts;
- equipment schedule extraction;
- building-zone drawing context;
- evidence/provenance.

Energy Audit retains authority for baselines, energy calculations, savings and opportunity economics.

## Maintenance / Reliability

Reuse:
- asset/equipment tags;
- location extraction;
- drawings/schedules;
- marked spatial evidence;
- source revision.

Maintenance retains authority for PM/readiness/failure/reliability semantics; FBPOIS owns execution records.

## RCA

Reuse:
- drawing context;
- location/asset relationships;
- evidence annotation;
- provenance.

RCA retains authority for evidence graph, fault chain, causal reasoning and corrective action.

## Construction Inspection

Reuse:
- drawing sheet/revision;
- markup;
- location;
- evidence;
- review state;
- issue-to-drawing citation.

Construction Inspection retains authority for deficiency, inspection result, disposition and closeout.

## CAPEX / Cost

Reuse:
- approved quantity basis;
- drawing revision;
- BOQ linkage;
- evidence.

CAPEX retains authority for proposal, estimate/economics, approval and investment decision.

## Rule

```text
Shared Drawing / Measurement Contract
≠
Shared Domain Authority
```

A reusable drawing fact may feed multiple FEIS modules, but each module retains its own technical semantics and acceptance authority.

## Provider / Protocol Neutrality

These contracts must remain usable whether the interface is:
- human UI;
- MCP;
- local API;
- future agent protocol;
- file import/export.

Do not define FEIS domain truth in terms of a single agent provider or protocol.

## 10/10 Integration Goal

The OpenTakeoff benchmark is made maximally useful to FEIS by extracting its generalizable contracts and attaching them to FDG domain authorities, rather than copying a flooring-oriented product wholesale.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/07_QTO_and_Drawing_Measurement_Intelligence/00_QTO_and_Drawing_Measurement_Intelligence_Master_Index|QTO Master Index]] → this integration contract.
