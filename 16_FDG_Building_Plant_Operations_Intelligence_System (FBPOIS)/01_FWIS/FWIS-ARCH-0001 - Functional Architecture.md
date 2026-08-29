# FWIS-ARCH-0001
# Facility Workspace Intelligence System (FWIS)
## Functional Architecture

**Document ID:** FWIS-ARCH-0001

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Version:** 1.0

**Status:** Approved

**Owner:** FDG Ecosystem

**Classification:** Architecture

**Parent Document:**
FWIS-ARCH-0000 – Facility Workspace Intelligence System

---

# Purpose

This document defines the functional architecture of the Facility Workspace Intelligence System (FWIS).

It identifies the major operational modules, explains their responsibilities, and defines how information flows between them.

This architecture serves as the blueprint for all future FWIS functional specifications.

---

# Design Principles

FWIS is designed around engineering operations rather than software functions.

Each module shall have:

- A single responsibility
- Clear ownership
- Shared data
- Minimal duplication
- Configurable workflows
- Standardized interfaces

---

# Functional Overview

```text
Facility Workspace Intelligence System
│
├── Daily Operations
├── Engineering Dashboard
├── Shift Turnover
├── Operations Logbook
├── Group Communications
├── Engineering Notes
├── Concerns Tracker
├── OOO / OOS Management
├── Room Engineering Status
├── Workflow Management
├── Utilities Monitoring
├── Plant Operations
├── Incident Management
├── Reports
└── Analytics
```

---

# Functional Relationships

```text
Engineering Dashboard
        ▲
        │
 ┌──────┼─────────────┐
 │      │             │
 │      │             │
Daily Operations      Utilities Monitoring
 │                    │
 │                    │
 ▼                    ▼
Operations Logbook    Plant Operations
 │                    │
 └──────────┬─────────┘
            │
            ▼
     Incident Management
            │
            ▼
     Concerns Tracker
            │
            ▼
    Workflow Management
            │
            ▼
         Reports
            │
            ▼
         Analytics
```

All modules utilize the Shared Data Platform.

---

# Module Descriptions

## Daily Operations

Provides engineering teams with the daily operational workspace.

Responsibilities include:

- Daily activities
- Engineering priorities
- Shift assignments
- Operational summaries
- Daily engineering coordination

---

## Engineering Dashboard

Provides a real-time operational overview.

Displays:

- Plant status
- Utilities
- OOO/OOS
- Incidents
- KPIs
- Active concerns
- Pending approvals

The dashboard shall be role-based and configurable.

---

## Shift Turnover

Digitally records information exchanged between shifts.

Supports:

- Morning
- Afternoon
- Night

Information transferred includes:

- Outstanding work
- Plant status
- Utility abnormalities
- Safety concerns
- Engineering observations

---

## Operations Logbook

Maintains a chronological engineering record.

Typical entries:

- Equipment events
- Operational observations
- Shutdowns
- Startups
- Inspections
- Contractor activities

---

## Group Communications

Provides structured operational communication.

Supports:

- Engineering announcements
- Department notices
- Operational advisories
- Technical discussions

This module complements—not replaces—enterprise messaging platforms by preserving searchable engineering records.

---

## Engineering Notes

Stores engineering knowledge generated during operations.

Examples:

- Lessons learned
- Technical observations
- Best practices
- Temporary procedures

---

## Concerns Tracker

Tracks operational issues from identification through closure.

Each concern includes:

- Priority
- Category
- Responsible engineer
- Due date
- Status
- Resolution history

---

## OOO / OOS Management

Manages engineering-controlled room availability.

Supports:

- Out of Order (OOO)
- Out of Service (OOS)

Tracks:

- Engineering cause
- Progress
- Assigned personnel
- Estimated completion
- Photographs
- Approval history

---

## Room Engineering Status

Provides engineering visibility for guest rooms.

Examples:

- Available
- Inspection Required
- Repair in Progress
- Testing
- Ready for Release

Supports multiple:

- Buildings
- Towers
- Floors

---

## Workflow Management

Standardizes operational approvals.

Default workflow:

```text
Technician
      │
Supervisor
      │
Duty Engineer / Engineering Service Manager
      │
Engineering Manager / Chief Engineer
      │
Director of Engineering
```

Organizations may configure alternative approval chains.

---

## Utilities Monitoring

Monitors engineering utilities.

Supported utilities:

- Electricity
- Water
- Diesel
- LPG
- Steam
- Chilled Water
- Solar PV
- Other Utilities

Supports billing allocation to:

- Hotel
- Casino
- Mall
- Shared Facilities
- Administration
- Other Cost Centers

Outputs include:

- Consumption
- Cost allocation
- Trends
- KPIs

---

## Plant Operations

Supports operational monitoring of engineering plants.

Examples:

- Chiller Plant
- Cooling Towers
- Generator Sets
- Electrical Distribution
- Boiler Plant
- Fire Protection
- Water Treatment
- STP
- Solar PV

Plant configurations shall be fully administrator-configurable.

---

## Incident Management

Captures operational incidents.

Examples:

- Equipment failures
- Utility interruptions
- Safety events
- Environmental incidents

Supports:

- Classification
- Root cause
- Corrective actions
- Attachments

---

## Reports

Generates operational reports.

Examples:

- Daily Operations Report
- Shift Report
- Utility Report
- Plant Performance Report
- Executive Summary

Reports support:

- PDF
- Excel
- Dashboard

---

## Analytics

Transforms operational data into engineering insights.

Examples:

- Utility trends
- Plant performance
- Operational KPIs
- Incident statistics
- Productivity metrics

Future versions will integrate NEX-assisted engineering analysis.

---

# Shared Services

All modules utilize:

- Authentication
- Authorization
- Notifications
- Attachments
- Audit Logs
- Shared Data Platform
- Reporting Engine
- API Services

---

# Integration with FMIS

FWIS exchanges data with FMIS through the Shared Data Platform.

Examples:

- Plant runtime
- Equipment operating hours
- Operational incidents
- Inspection findings

FMIS uses this information to initiate maintenance planning and work orders.

---

# Child Documents

- FWIS-SPEC-0001 – Daily Operations
- FWIS-SPEC-0002 – Engineering Dashboard
- FWIS-SPEC-0003 – Shift Turnover
- FWIS-SPEC-0004 – Operations Logbook
- FWIS-SPEC-0005 – Group Communications
- FWIS-SPEC-0006 – Engineering Notes
- FWIS-SPEC-0007 – Concerns Tracker
- FWIS-SPEC-0008 – OOO & OOS Management
- FWIS-SPEC-0009 – Room Engineering Status
- FWIS-SPEC-0010 – Workflow Management
- FWIS-SPEC-0011 – Utilities Monitoring
- FWIS-SPEC-0012 – Plant Operations
- FWIS-SPEC-0013 – Incident Management
- FWIS-SPEC-0014 – Reports
- FWIS-SPEC-0015 – Analytics

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Release | Functional Architecture Established |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01 FWIS Master Index]] → this document
