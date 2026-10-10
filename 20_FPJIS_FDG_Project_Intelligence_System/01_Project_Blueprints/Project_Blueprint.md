# Project Blueprint

## Required definition

Project ID:
Project name:
Project owner:
Problem:
Target outcome:
Users:
Business/engineering value:
Scope:
Out of scope:
Constraints:
Dependencies:
Risks:
Known unknowns:
Required Intelligence Systems:
Monetization required:
Online deployment required:
Shared infrastructure candidate:
Success criteria:

## Project structure

Users
Roles
Dashboards
Screens
Workflows
Modules
Data
Business Rules
Entitlements
Subscription
Payments
Communication
Automation
Security
Integrations
Deployment
Testing

## Blueprint reuse

Before creating a new capability:
1. Search the FDG Blueprint Library.
2. Search previous FDG projects.
3. Identify reusable, extendable, or project-specific capabilities.
4. Record the reuse decision.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Implementation-Grade Project Blueprint Extension — 2026-10-10

Every project blueprint should additionally identify:

### Roadmap structure
- capabilities;
- modules;
- module weights;
- dependencies;
- vertical slices;
- planned work packages;
- current gates.

### Requirement traceability
- requirement IDs;
- source;
- acceptance criteria;
- linked screens/workflows/rules/data/APIs;
- work-package mapping;
- test/evidence mapping.

Reference:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/03_Requirements_Traceability_and_Verification_Standard|Requirements Traceability Standard]].

### Nonfunctional requirements
Consume:
[[20_FPJIS_FDG_Project_Intelligence_System/01_Project_Blueprints/Nonfunctional_Requirements_Blueprint|Nonfunctional Requirements Blueprint]].

### Security / Privacy / Threat
Consume:
[[20_FPJIS_FDG_Project_Intelligence_System/12_Security_Blueprints/Security_Privacy_Threat_Model_Blueprint|Security / Privacy / Threat Model Blueprint]].

### Offline / resilience
Where applicable consume:
[[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Offline_Sync_Resilience_Blueprint|Offline / Sync / Resilience Blueprint]].

### Release / operations
Consume as applicable:
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Release_Blueprint|Release Blueprint]]
- [[20_FPJIS_FDG_Project_Intelligence_System/19_Deployment_Blueprints/Operations_Observability_and_Recovery_Blueprint|Operations / Observability / Recovery Blueprint]]

### Four project percentages

~~~text
Blueprint Implementation Readiness
Implementation Completion
Validation Completion
Operational Maturity
~~~

These are governed by:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/01_Implementation_Readiness_Rubric_and_Module_Scorecard|Implementation Readiness Rubric]].

### Module build rule

Overall project readiness may be below 100%.

A bounded module/work package may enter implementation only when its own applicable readiness scope reaches 100% and build authorization is recorded.
