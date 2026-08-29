# FDG FMIS — Agent Engineering Instructions
## Fully Local Production-Ready Build Directive

**System:** FDG Maintenance Intelligence Systems (FMIS)  
**Parent:** `16_FDG_Building_Plant_Operations_Intelligence_System` (FBPOIS)  
**Current objective:** Replace the operational AppSheet dependency with a fully local FMIS application.  
**Future objective:** Integrate FMIS into the complete FBPOIS platform after the FBPOIS architecture is finalized.

---

# 1. Mission

Build FMIS as a real engineering maintenance application, not as an AppSheet clone.

The current AppSheet implementation is a **source of operational requirements and workflow evidence**, not the target architecture.

The new system must provide a dependable local application for engineering personnel to:

- register and manage plants
- register assets and equipment
- monitor plant/equipment status
- manage preventive maintenance
- manage corrective maintenance
- create and track work orders
- record inspections and findings
- maintain equipment history
- manage maintenance resources
- track materials and spare parts
- track maintenance procurement requirements
- monitor contractors
- produce engineering dashboards
- preserve auditable maintenance history
- operate without internet access

The application must be useful to a Chief Engineer immediately, while its architecture remains suitable for later integration into FBPOIS.

---

# 2. Non-Negotiable Architectural Position

FMIS is a peer system of FWIS under FBPOIS.

```text
FBPOIS
│
├── FWIS
│   └── Operations
│
├── FMIS
│   └── Maintenance / Plant Status
│
└── Shared Data Platform
```

Never implement:

```text
FWIS → FMIS
```

or:

```text
FMIS → FWIS
```

as a parent/child architecture.

They are separate domains.

A future management dashboard may combine them:

```text
FWIS ──┐
       ├── Management / Executive Visibility
FMIS ──┘
```

This is a reporting/integration relationship, not functional ownership.

---

# 3. Current Deployment Constraint

## Build fully local first.

Phase 1 must not depend on:

- internet access
- cloud APIs
- SaaS services
- online authentication
- AppSheet
- Google Sheets
- Google Drive
- external AI services
- external databases
- external message APIs

The application must remain functional when the computer is disconnected from the internet.

External integrations are future capabilities.

Do not delay core FMIS development waiting for them.

---

# 4. Recommended Local Architecture

Use a modular client/application/data architecture.

```text
┌───────────────────────────────────────────────┐
│                 FMIS Desktop                  │
│                                               │
│ Dashboard                                     │
│ Plants                                        │
│ Assets / Equipment                            │
│ PM                                             │
│ Work Orders                                   │
│ Inspections                                   │
│ Failures                                      │
│ Materials / Spares                            │
│ Procurement                                   │
│ Contractors                                   │
│ Workforce                                     │
│ Reports                                       │
│ Administration                                │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             FMIS Application Core             │
│                                               │
│ Domain Logic                                  │
│ Validation                                    │
│ Workflow Engine                               │
│ Permission Engine                             │
│ Reporting                                     │
│ Audit Trail                                   │
│ Import / Export                               │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             Local Relational DB               │
│                                               │
│ PostgreSQL preferred for target architecture  │
│ or SQLite only if explicitly justified for    │
│ the initial single-machine prototype.        │
└───────────────────────────────────────────────┘
```

Do not create a single-file application that contains all UI, business logic, and data structures in one uncontrolled file.

---

# 5. Database Principle

The database is the system of record.

For the target architecture, PostgreSQL is preferred.

A local SQLite implementation is acceptable only when it is deliberately treated as a development/prototype stage and the domain model remains migration-friendly.

Do not design the application around spreadsheets as its database.

Google Sheets may remain a transition mechanism later.

---

# 6. Core Domain Model

Implement the following conceptual hierarchy:

```text
Organization
    ↓
Property
    ↓
Building
    ↓
Floor
    ↓
Area / Room
    ↓
Plant / System
    ↓
Asset
    ↓
Equipment
    ↓
Component
```

Maintenance relationships:

```text
Asset / Equipment
       │
       ├── PM Plan
       ├── PM Occurrences
       ├── Work Orders
       ├── Inspections
       ├── Tests
       ├── Failure Events
       ├── Maintenance History
       ├── Materials
       ├── Spare Parts
       ├── Contractors
       └── Documents
```

---

# 7. Minimum Core Entities

The first implementation must support at least:

### Organization
- organization ID
- name
- status

### Property
- property ID
- name
- code
- address
- status

### Building
- building ID
- property
- name
- code
- status

### Area / Room
- area ID
- building
- floor
- room/area name
- code

### Plant
- plant ID
- property
- building
- plant category
- plant name
- code
- location
- operational status
- criticality

### Asset
- asset ID
- plant
- asset type
- name
- location
- criticality
- status

### Equipment
- equipment ID
- asset
- manufacturer
- model
- serial number
- installation date
- commissioning date
- status
- criticality

### Work Order
- work order ID
- source
- equipment
- plant
- location
- description
- priority
- status
- assigned personnel
- contractor
- timestamps
- findings
- corrective action
- testing
- verification
- closure

### PM Plan
- PM ID
- equipment
- task
- frequency
- trigger
- required skills
- estimated duration
- materials
- procedure/reference
- responsible role

### PM Occurrence
- occurrence ID
- PM
- scheduled date
- assigned person
- execution date
- status
- findings
- measurements
- recommendations
- evidence
- linked work order

### Failure Event
- failure ID
- equipment
- date/time
- symptom
- failure mode
- cause
- downtime
- corrective action
- recurrence indicator

### Material / Spare Part
- item ID
- item number
- description
- category
- unit
- on-hand
- reserved
- reorder point
- critical stock flag

### Procurement Record
- PR/SRF reference
- work order/PM/project reference
- requester
- item
- quantity
- estimated cost
- supplier
- status
- requested date
- required date
- delivery date

---

# 8. Plant Configuration Must Be Flexible

Do not hardcode a fixed list of plants.

The administrator must be able to add:

- plant categories
- plants
- systems
- equipment categories
- equipment
- parameters
- statuses
- criticality classes
- PM templates
- maintenance types
- trades
- priorities

Example:

```text
HVAC
├── Chiller Plant
├── Cooling Tower
├── AHU
├── FCU
├── Exhaust System
└── Ventilation System
```

The structure must remain configurable.

---

# 9. Plant Parameters

Support configurable plant/equipment parameters.

Each parameter should be able to define:

```text
Parameter
├── Name
├── Unit
├── Data Type
├── Normal Range
├── Warning Range
├── Critical Range
├── Frequency
├── Source
└── Responsible Role
```

Examples:

- temperature
- pressure
- current
- voltage
- vibration
- flow
- level
- differential pressure
- runtime hours

Do not assume that every parameter is numeric.

Support text, numeric, boolean, date/time, and categorical values where justified.

---

# 10. Plant and Equipment Status

At minimum support configurable states such as:

```text
Normal
Running
Standby
Reduced Capacity
Degraded
Under Maintenance
Out of Service
Failed
Unknown
```

Status changes must be timestamped.

Do not destroy historical status.

---

# 11. Preventive Maintenance

Implement:

```text
PM Plan
    ↓
Schedule
    ↓
Assign
    ↓
Execute
    ↓
Record Findings
    ↓
Evaluate
    ├── Normal → Close
    └── Defect → Work Order
```

The system must show:

- PM due
- PM completed
- PM overdue
- PM compliance
- critical overdue PM
- findings
- PM-generated work orders

Do not make PM completion the only maintenance KPI.

---

# 12. Corrective Maintenance

Implement:

```text
Maintenance Request
        ↓
Triage
        ↓
Priority
        ↓
Assignment
        ↓
Diagnosis
        ↓
Repair
        ↓
Testing
        ↓
Verification
        ↓
Closure
```

Support waiting states:

- Waiting Material
- Waiting Contractor
- Waiting Access
- Waiting Approval

This is important because maintenance delays must be distinguishable from actual repair duration.

---

# 13. Work Order Priority

Priority must consider:

- life safety
- safety
- critical equipment
- revenue impact
- operational dependency
- guest/customer impact
- regulatory impact
- plant availability
- downtime

Do not create arbitrary scoring formulas without documenting the engineering rationale.

---

# 14. Maintenance History

Every significant maintenance action must create durable history.

History should allow the engineer to answer:

> What happened to this equipment over its life?

The record should include:

- event
- date/time
- equipment
- personnel
- contractor
- finding
- failure
- action
- material
- downtime
- cost where available
- verification
- attachments
- related work order

Historical records must not be silently overwritten.

---

# 15. Failure and Reliability Intelligence

The system must accumulate failure history.

Minimum future-ready metrics:

- MTBF
- MTTR
- failure frequency
- repeat failure rate
- downtime
- equipment availability
- maintenance cost
- maintenance backlog

Reliability loop:

```text
Maintenance History
        ↓
Failure Events
        ↓
Pattern Detection
        ↓
Repeat Failure
        ↓
Engineering Analysis
        ↓
Corrective / Preventive Action
```

Do not implement predictive maintenance merely because the database contains historical data.

Predictive intelligence is a later capability.

---

# 16. Materials and Spare Parts

Support:

```text
Requirement
    ↓
Check Stock
    ├── Available → Issue
    └── Unavailable
             ↓
         PR / SRF
             ↓
             PO
             ↓
         Supplier
             ↓
         Receiving
             ↓
         Stock Update
```

Support configurable reorder points.

The existing engineering concept of an 80% trigger may be implemented as a configurable default, not a universal engineering rule.

---

# 17. Maintenance Workforce

Use the approved hierarchy:

```text
Technician
    ↓
Supervisor
    ↓
Duty Engineer / Engineering Service Manager
    ↓
Engineering Manager
    ↓
Chief Engineer
```

Director of Engineering is optional.

Technicians should see and update assigned maintenance.

Supervisors control team work.

Duty Engineer / Engineering Service Manager controls shift-level engineering activity.

Engineering Manager has management visibility.

Chief Engineer has executive-level FMIS visibility.

---

# 18. FWIS + FMIS Management View

Engineering Manager and Chief Engineer must be able to see both systems from one management dashboard.

```text
                 MANAGEMENT DASHBOARD
                         │
             ┌───────────┴───────────┐
             │                       │
            FWIS                    FMIS
        Operations          Maintenance / Plant Status
```

This dashboard may display:

- operational concerns
- plant status
- critical equipment
- OOS/OOS-related maintenance
- open critical work orders
- overdue PM
- major failures
- manpower issues
- material delays
- contractor delays
- major engineering actions

Do not merge the underlying databases/domains merely to achieve a combined dashboard.

---

# 19. Chief Engineer Dashboard

The Chief Engineer's first screen must answer:

> What requires my engineering decision today?

Recommended sections:

```text
CRITICAL PLANT STATUS
CRITICAL EQUIPMENT
MAJOR FAILURES
OPEN CRITICAL WORK ORDERS
OVERDUE PM
OOS / DEGRADED PLANTS
MATERIAL / PROCUREMENT RISKS
CONTRACTOR RISKS
MAINTENANCE BACKLOG
MANPOWER LOAD
TOP RECURRING FAILURES
TODAY'S REQUIRED ACTIONS
```

The dashboard must prioritize exceptions rather than simply display large quantities of records.

---

# 20. Property / Billing Classification

FMIS must support property/location classification useful for utilities and maintenance cost allocation.

Existing operational classification includes:

```text
Mall & Shared Facilities
Hotel
Casino
```

The system must allow these tags to be configurable.

Do not hardcode them as the only possible business classifications.

This will support future utility monitoring and cost allocation.

---

# 21. Offline-First Behavior

The application must continue operating without internet.

At minimum:

- open application
- authenticate locally
- view data
- create work orders
- update work orders
- perform PM
- record inspections
- record failures
- update equipment
- search
- generate reports
- export data
- maintain audit history

The user should not see an artificial "offline mode" limitation for functions that can safely operate locally.

---

# 22. Local Authentication

For the fully local phase, implement local user accounts.

Minimum:

- username
- password credential
- role
- active/inactive
- permission scope
- last login
- audit trail

Passwords must never be stored as plaintext.

Do not connect authentication to Google/Microsoft/etc. in this phase.

Future enterprise authentication can be added later.

---

# 23. Authorization

Implement role-based access control with scope.

Conceptually:

```text
Role
+
Permission
+
Property Scope
+
Building Scope
+
Functional Scope
```

Examples:

```text
Technician
→ assigned work orders

Supervisor
→ team work orders

Engineering Manager
→ property maintenance management

Chief Engineer
→ property executive maintenance visibility
```

Do not rely only on hiding buttons in the UI.

Authorization must be enforced in the application/service layer.

---

# 24. Auditability

Audit important actions:

- login
- logout
- create
- edit
- delete/void
- status change
- assignment
- approval
- closure
- export
- configuration change

Record:

```text
Who
What
When
Where
Before
After
```

Avoid physical deletion of operational history where a controlled void/archive mechanism is more appropriate.

---

# 25. Search

FMIS must provide fast local search across:

- equipment ID
- asset ID
- plant
- room
- work order
- PM
- technician
- contractor
- serial number
- material
- failure
- maintenance history

Search should be designed for engineering use, not generic document search.

---

# 26. Attachments and Evidence

Support local attachment storage for:

- photographs
- inspection evidence
- manuals
- reports
- quotations
- certificates
- test results
- drawings

Attachments must have stable references to their owning record.

Do not make the database unnecessarily dependent on binary blobs if an object/file-storage abstraction is more maintainable.

---

# 27. Reporting

Phase 1 must support:

- PDF export
- Excel export
- CSV export where useful
- maintenance history reports
- PM reports
- work-order reports
- plant-status reports
- equipment reports
- failure reports
- spare-part reports
- management dashboard snapshot

Reports must be generated from the FMIS system of record.

---

# 28. Import From AppSheet / Existing Data

Do not throw away the existing AppSheet data.

Treat it as migration source material.

Migration process:

```text
Existing AppSheet Data
        ↓
Export
        ↓
Profile / Clean
        ↓
Map Fields
        ↓
Validate
        ↓
Transform
        ↓
Import
        ↓
Reconcile Counts
        ↓
Verify Sample Records
```

Never import blindly.

Create a migration mapping document before production migration.

---

# 29. AppSheet Replacement Strategy

The target is:

```text
AppSheet
   ↓
Migration / Reference
   ↓
Local FMIS
   ↓
Operational Validation
   ↓
FBPOIS Integration
```

Do not attempt to reproduce every AppSheet screen.

Reproduce the **business capability**, then improve the workflow.

The new interface should be optimized for engineering decisions and maintenance execution.

---

# 30. UI Engineering Principles

The UI must prioritize:

1. speed
2. clarity
3. exception visibility
4. low cognitive load
5. engineering terminology
6. keyboard/mouse efficiency on Windows
7. touch-friendly workflows on future Android
8. consistent navigation
9. traceability

Avoid:

- decorative dashboards
- excessive animations
- unnecessary cards
- hidden actions
- deep navigation for routine work
- excessive modal dialogs
- AppSheet-style screen duplication

---

# 31. Build in Vertical Slices

Do not build every database table first and leave the application unusable.

Build functional vertical slices.

### Slice 1

```text
Login
→ Dashboard
→ Plant
→ Equipment
→ Status
```

### Slice 2

```text
Work Order
→ Assignment
→ Execution
→ Closure
```

### Slice 3

```text
PM
→ Schedule
→ Execution
→ Findings
```

### Slice 4

```text
Failure
→ History
→ Reliability
```

### Slice 5

```text
Materials
→ Spare Parts
→ Procurement
```

### Slice 6

```text
Chief Engineer Dashboard
```

Each slice must be testable before moving to the next.

---

# 32. Engineering Development Loop

Every feature follows:

```text
Understand
↓
Model
↓
Design
↓
Build
↓
Test
↓
Validate
↓
Document
↓
Integrate
```

Never:

```text
Prompt → Generate Everything → Hope It Works
```

Agents must maintain a short feedback loop.

---

# 33. Agent Roles

Use specialized AI collaborators where useful.

Suggested roles:

```text
Architecture Agent
Database Agent
Backend / Domain Agent
UI Agent
Testing Agent
Migration Agent
Documentation Agent
Security Agent
```

The agents must share the Obsidian knowledge repository as the authoritative design context.

No agent should independently redefine FMIS architecture.

---

# 34. Source-of-Truth Hierarchy

When making a decision, use:

```text
1. Approved FDG / FBPOIS / FMIS architecture
2. FMIS knowledge documents
3. Existing validated operational workflow
4. Existing AppSheet behavior
5. Engineering requirements
6. Agent proposal
```

If sources conflict:

> Stop, identify the conflict, and request/record a decision.

Do not silently rewrite approved architecture.

---

# 35. Documentation Requirement

Every major implementation must update the appropriate engineering documentation.

At minimum maintain:

```text
Architecture
Data Model
API / Service Contracts
UI Workflow
Permission Model
Migration Mapping
Test Cases
Decision Register
Known Limitations
```

The code is not the only product.

The organization must retain the engineering knowledge required to maintain and replace the software later.

---

# 36. Testing Requirements

Minimum test categories:

### Unit Tests
Domain rules and calculations.

### Integration Tests
Database/service interactions.

### Workflow Tests
PM and work-order lifecycle.

### Authorization Tests
Role and scope restrictions.

### Data Integrity Tests
Foreign keys, required fields, status transitions.

### Migration Tests
AppSheet-to-FMIS mapping.

### Offline Tests
Disconnect network and continue normal local operation.

### Recovery Tests
Application restart and database recovery.

### Backup Tests
Create backup and restore into a clean environment.

---

# 37. Acceptance Criteria

FMIS is not considered operational merely because the screens work.

The first local release must demonstrate:

- local login works
- plant can be created
- equipment can be created
- equipment can be assigned to plant/location
- plant/equipment status can be changed
- work order can be created
- work order can be assigned
- technician can execute/update it
- supervisor can verify it
- work order can be closed
- PM can be scheduled
- PM can be executed
- PM findings can create work orders
- maintenance history is retained
- failures are retained
- search works
- dashboard reflects database state
- permissions work
- audit trail works
- data can be exported
- database can be backed up
- application works without internet

---

# 38. Backup and Recovery

Because the current system is local, data protection is critical.

Implement:

```text
FMIS Database
      ↓
Local Backup
      ↓
Secondary Local Storage
      ↓
Optional External Backup
```

At minimum support:

- manual backup
- scheduled backup
- restore
- backup verification
- database health check

Do not claim disaster recovery until it has actually been tested.

---

# 39. Future FBPOIS Integration Boundary

The current FMIS must be built so it can later connect to:

```text
FBPOIS Shared Data Platform
        │
        ├── FWIS
        ├── FMIS
        ├── Shared Identity
        ├── Shared Property Data
        ├── Shared Building Data
        ├── Shared Asset Data
        └── Shared Reporting
```

Future infrastructure may become:

```text
Windows App
Android App
Web Portal
        ↓
FDG API Server
        ↓
Sync Engine
        ↓
PostgreSQL
```

Do not implement this distributed architecture prematurely if it increases current complexity without improving the local FMIS milestone.

Design for it; build it when the FBPOIS milestone requires it.

---

# 40. Future Capabilities — Do Not Pull Into Current Milestone

These remain roadmap items:

- online synchronization
- Google Drive synchronization
- Google Sheets synchronization
- Viber integration
- Messenger integration
- Email integration
- Teams integration
- SCM integration
- Power BI
- private data center
- multi-data-center
- subscription engine
- external identity providers
- AI maintenance collaborators
- predictive maintenance
- condition monitoring
- digital twin

The current milestone is:

> **Build a reliable, fully local FMIS that can replace the operational AppSheet workflow.**

---

# 41. Final Agent Directive

Before writing production code, the agent must:

1. Read the complete FMIS knowledge package.
2. Read the parent FBPOIS architecture available in the Obsidian repository.
3. Inspect the existing FMIS/AppSheet-derived data model.
4. Identify contradictions.
5. Identify missing decisions.
6. Produce an implementation plan.
7. Establish the local architecture.
8. Establish the database schema.
9. Build the first vertical slice.
10. Test it.
11. Validate it against engineering workflow.
12. Document the result.
13. Only then continue.

Do not rebuild the system from memory.

Do not invent requirements.

Do not silently change approved architecture.

Do not create new FBPOIS folders without authorization.

Do not introduce cloud dependencies into the local milestone.

Do not build a decorative prototype and call it FMIS.

Build the smallest complete engineering system that can actually replace the current AppSheet workflow, then expand it deliberately.

---

# 42. Definition of Done

The local FMIS milestone is complete when an Engineering Manager or Chief Engineer can perform the core maintenance-management workflow entirely inside FMIS without needing AppSheet for normal FMIS operations.

The test should be practical:

```text
Open FMIS
    ↓
See current plant/equipment condition
    ↓
Identify maintenance problem
    ↓
Create / review work order
    ↓
Assign personnel
    ↓
Execute maintenance
    ↓
Record findings
    ↓
Record materials / evidence
    ↓
Verify repair
    ↓
Close work order
    ↓
See updated equipment history
    ↓
See dashboard impact
    ↓
Generate report
```

If this workflow works reliably offline, the project has achieved the first meaningful FMIS replacement milestone.

---

# 43. Engineering Principle

> **Build FMIS as an engineering system, not a form collection.**

The purpose is not to digitize maintenance paperwork.

The purpose is to create a durable maintenance information system that converts:

```text
Plant
→ Equipment
→ Condition
→ Maintenance Activity
→ Findings
→ History
→ Reliability
→ Engineering Decision
```

into structured organizational knowledge.

The current local FMIS is the foundation.

The later FBPOIS integration is an expansion, not a reason to compromise the local system.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
