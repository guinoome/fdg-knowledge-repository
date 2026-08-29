---
system: FAIS
system_name: FDG Audit Intelligence System
folder: 22_FDG_Audit_Intelligence_System
status: Initial Baseline
authority: Draft for FDG governance adoption
owner: FDG Ecosystem
principles:
  - Evidence over assumption
  - Traceability over convenience
  - Audit independence
  - Controlled remediation
  - Organizational learning
  - Technology independence
---

# FAIS-0002 — Audit Intelligence Architecture

## Purpose

Define the logical architecture through which FAIS converts requirements and evidence into assurance.

## Architecture Layers

1. **Criteria Layer** — approved requirements, policies, standards, contracts, baselines, definitions of done.
2. **Evidence Layer** — records, files, calculations, logs, observations, approvals, test results.
3. **Audit Engine** — scope, sampling, tests, comparisons, traceability, completeness and conformance checks.
4. **Finding Layer** — observations, nonconformities, risks, severity and evidence linkage.
5. **Action Layer** — corrective/preventive actions assigned to authorized owners.
6. **Verification Layer** — independent confirmation of effective closure.
7. **Learning Layer** — recurring patterns, root causes, control improvements, reusable audit knowledge.

## Audit Object Model

Minimum audit object: Audit ID, subject, owner, scope, criteria, evidence set, auditor, method, findings, severity, actions, due state, verification, closure, residual risk, lessons, timestamps, and references.

## Cross-System Rule

FAIS references authoritative domain sources rather than duplicating their full contents. Where authority is ambiguous, FAIS records the ambiguity as a finding or governance issue.

## Local-First Data Principle

Audit records should remain portable in stable formats. Future databases or dashboards may index the knowledge but must not become the only place where audit meaning exists.

## Automation Boundary

Automation may assist discovery, comparison, evidence checks, anomaly detection, traceability, report generation, and recurring control tests. Material conclusions remain attributable and reviewable.

## Control Note

This document is part of the initial FAIS baseline. It may be expanded through controlled future milestones. Recommendations do not become FDG policy until approved through the applicable governance authority.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[22_FDG_Audit_Intelligence_System/00_FAIS_CORE/FAIS-0000 - FDG Audit Intelligence System|FAIS-0000 - FDG Audit Intelligence System]] → this document
