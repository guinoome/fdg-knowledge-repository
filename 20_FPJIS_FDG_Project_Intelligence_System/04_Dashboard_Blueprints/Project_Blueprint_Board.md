# Project Blueprint Board

This is a core FPJIS interface.

PROJECT
│
├── Users
│   ├── Admin
│   ├── Manager
│   └── Customer
│
├── Roles
│
├── Dashboards
│   ├── Admin Dashboard
│   ├── Manager Dashboard
│   └── Customer Dashboard
│
├── Screens
├── Workflows
├── Modules
├── Data
├── Business Rules
├── Entitlements
├── Subscription
├── Payments
├── Communication
├── Automations
├── Security
├── Integrations
└── Deployment

Each node should expose:
- status
- owner
- dependencies
- comments
- decisions
- revision
- linked references
- linked requirements
- acceptance criteria

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Roadmap and Evidence Board Extension — 2026-10-10

The Project Blueprint Board should expose four independent percentages:

~~~text
Blueprint Implementation Readiness
Implementation Completion
Validation Completion
Operational Maturity
~~~

It should also expose:

### Module Roadmap
- module ID/name;
- weight;
- readiness;
- implementation;
- validation;
- maturity;
- status;
- dependencies;
- blockers;
- owner;
- current work package.

### Traceability
- requirements total;
- requirements with acceptance criteria;
- implemented requirements;
- verified acceptance criteria;
- unresolved blockers;
- evidence coverage.

### Gates
- current project gate;
- module gate;
- build authorization;
- release authorization;
- deployment authorization.

### Update History
- last coding session;
- last accepted module;
- percentage changes;
- decision/revision;
- next work.

The board should be able to consume the future structured contract:

[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/10_Requirement_Implementation_Evidence_Manifest_Contract|Requirement / Implementation / Evidence Manifest]].

The live generic roadmap baseline is:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/13_FPJIS_Roadmap_Percentage_Register|FPJIS Roadmap Percentage Register]].
