---
document_id: FEIS-QTO-0003
title: Agent Neutral QTO Adapter and Local First Runtime
status: Approved Architecture
created: 2026-10-14
---

# FEIS-QTO-0003 — Agent-Neutral QTO Adapter & Local-First Runtime

## Objective

The QTO engine must work without a paid external model or hosted service.

## Required Architecture

```text
Local Drawing Files
        ↓
Local Document / Geometry Engine
        ↓
Local Canonical QTO Store
        ↓
Human Workspace
        ↓
Optional Agent Adapter
    ├── Nex
    ├── OpenAI
    ├── Anthropic
    ├── Local Model
    └── Future Provider
```

## Deterministic Core

The following must not depend on a language model:
- project/document identity;
- calibration;
- geometry math;
- area/linear/count computation;
- unit conversion rules;
- quantity aggregation;
- revision identifiers;
- provenance storage;
- approval state;
- export math;
- backup/restore.

Models may assist with:
- reading drawing text;
- classifying sheets;
- suggesting scale source;
- symbol/schedule interpretation;
- proposing geometry;
- assigning item/condition;
- identifying ambiguity;
- drafting RFI;
- explaining quantity lineage.

## Agent Tool Contract

Provider-neutral verbs should eventually cover:
- load/open document
- inspect sheet metadata
- view sheet/crop
- read text
- read vectors when available
- set/propose calibration
- measure area
- measure linear
- count/place count
- list measurements
- edit own proposal
- propose item assignment
- inspect schedule
- sweep symbols
- create review question/RFI
- export canonical dataset
- export report/marked drawing

Exact protocol may be MCP, local API or future adapter. Domain contracts must not depend on protocol branding.

## Local Storage

Preferred behavior:
- no upload required for core QTO;
- local project workspace;
- local metadata/database;
- attachments remain local unless explicitly synchronized;
- backup/export restores the canonical QTO state;
- offline use continues after authentication grace rules where allowed.

## Sync Later

If remote collaboration is added:
- revision IDs;
- idempotent operations;
- outbox;
- conflict states;
- protected approved records;
- attachment queue;
- local backup before remote adoption.

No last-write-wins for material engineering quantities.

## Security

External agents receive only the bounded context required for the task.

Sensitive client drawings should not be uploaded without explicit configured authority.

## Provider Replacement Test

A conforming QTO implementation should be able to disable one model/provider and still:
- open drawings;
- calibrate;
- measure manually;
- calculate quantities;
- review;
- export;
- restore previous projects.

> **Knowledge path:** [[08_FEIS_Engineering_Intelligence_Systems/FEIP-STD-014_INTEGRATION_AND_API_ARCHITECTURE_MODULE_STANDARD|Integration Standard]] → this architecture.
