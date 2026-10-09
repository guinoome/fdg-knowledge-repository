# FEIP MAINTENANCE INTELLIGENCE MODULE STANDARD

Document ID:
FEIP-STD-004

Document Type:
Engineering Maintenance Management Module Standard

Version:
1.0

Status:
Approved

Owner:
Francis

Approver:
Francis

---

# Purpose

This standard defines the structure and operating principles of the FEIP Maintenance Intelligence Module.

---

# Core Principle

The objective of maintenance is not completing work orders.

The objective is maximizing asset reliability and operational continuity.

---

# Objective

The FEIP Maintenance Intelligence Module shall support:

- preventive maintenance
- corrective maintenance
- work order management
- maintenance history
- reliability improvement
- performance monitoring

---

# Maintenance Intelligence Architecture

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[08_FEIS_Engineering_Intelligence_Systems/08_FEIS_Engineering_Intelligence_Systems_Master_Index|08 FEIS Engineering Intelligence Systems Master Index]] → this document

---

# Maintenance Work Management & Readiness Extension — 2026-10-09

This approved standard is additively deepened by:

[[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/00_Maintenance_and_Reliability_Intelligence_Master_Index|FEIS Maintenance & Reliability Intelligence]].

Key additions:

- distinguish workflow status from work-readiness state;
- use a planning backlog and a Ready-to-Schedule backlog rather than treating all open work as schedulable;
- define structured readiness dimensions for scope, labor, materials, tools, safety, permits, access, contractor, engineering, testing and return-to-service;
- create reusable JobPlans and execution-specific WorkPackages;
- preserve planning/scheduling as distinct functions;
- version weekly/daily schedule commitments and record break-in work;
- capture execution feedback so job plans and maintenance strategies improve;
- require post-maintenance testing and return-to-service controls where consequence warrants;
- define Asset Maintenance Readiness separately from work-order readiness.

Detailed standards:
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0001 - Maintenance Work Readiness Planning and Scheduling Standard|Work Readiness, Planning & Scheduling]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0002 - Asset Maintenance Readiness and Project Handover Standard|Asset Maintenance Readiness]]
- [[08_FEIS_Engineering_Intelligence_Systems/06_Maintenance_and_Reliability_Intelligence/FEIS-MNT-0003 - Maintenance Readiness Data Model KPI and Acceptance Tests|Data Model, KPI & Acceptance Tests]]

The objective remains reliability and operational continuity, not administrative work-order closure.
