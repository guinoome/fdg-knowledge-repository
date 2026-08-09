# FMIS-0015 — Roadmap and Agent Handover

## Phase 0 — Knowledge Foundation

Finalize terminology, domain boundary, data model, roles, workflows, dashboards, and configuration model.

## Phase 1 — Core FMIS

Build plant registry, asset/equipment registry, work orders, PM, maintenance history, dashboard, users/roles, attachments, search, and audit trail.

## Phase 2 — Resources

Add inventory, spare parts, procurement linkage, contractor management, manpower, and maintenance cost.

## Phase 3 — FBPOIS Integration

Integrate with FWIS, Shared Data Platform, shared identity, property/building data, selected operational status, and OOO/OOS impact.

## Phase 4 — Synchronization

Implement and verify required external synchronization.

## Phase 5 — Reliability Intelligence

Add MTBF, MTTR, failure trends, repeat-failure detection, criticality analysis, maintenance cost analysis, and plant availability.

## Phase 6 — Advanced Intelligence

Future capabilities may include condition monitoring, anomaly detection, predictive maintenance, engineering recommendations, AI-assisted maintenance analysis, and digital twin integration.

## Agent Handover Rules

1. Read the FMIS Master Index first.
2. Preserve FMIS/FWIS separation.
3. Treat both as peer systems under FBPOIS.
4. Reuse existing models before creating new ones.
5. Do not add unapproved folders.
6. Keep data models configurable.
7. Preserve historical records.
8. Distinguish verified from planned functionality.
9. Never fabricate integrations.
10. Document architectural decisions.
11. Preserve Engineering Manager and Chief Engineer access to both systems.
12. Treat Director of Engineering as optional.
13. Do not turn the prototype directly into production.
14. Do not turn FMIS into another AppSheet.
15. Do not silently change approved terminology.

## Core Principle

> FMIS transforms maintenance activity and plant condition into structured, traceable engineering intelligence that improves reliability, operational continuity, and management decisions.
