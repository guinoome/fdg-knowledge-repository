# FWIS-SPEC-0007
# Facility Workspace Intelligence System (FWIS)
## Concerns Tracker

**Document ID:** FWIS-SPEC-0007

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** Concerns Tracker

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Functional Specification

**Parent Documents:**

- FBPOIS-ARCH-0000 – FBPOIS Master Architecture
- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture

---

# Purpose

The Concerns Tracker provides a centralized system for recording, tracking, assigning, monitoring, and closing engineering concerns.

A concern represents any issue requiring engineering attention but not necessarily an emergency incident.

The module provides complete lifecycle management from identification through verification and closure.

---

# Objectives

The module shall:

- Centralize engineering concerns.
- Standardize issue tracking.
- Improve accountability.
- Monitor response times.
- Prevent forgotten issues.
- Support engineering management.
- Supply operational analytics.

---

# Scope

The module manages operational concerns raised by engineering personnel.

It may reference maintenance work orders, incidents, room defects, utilities, plant issues, or external contractor activities.

---

# Concern Lifecycle

```text
New

↓

Assigned

↓

In Progress

↓

Waiting

↓

Completed

↓

Verified

↓

Closed
```

Organizations may configure additional workflow states.

---

# Concern Sources

Concerns may originate from:

- Daily Operations
- Shift Turnover
- Operations Logbook
- Plant Operations
- Utilities Monitoring
- Room Engineering Status
- Incident Management
- Manual Entry
- Future Mobile Application
- Future IoT Alerts

---

# Functional Components

## 1. Concern Registration

Each concern includes:

- Concern Number
- Date
- Time
- Property
- Building
- Department
- Location
- Equipment
- Category
- Description
- Priority
- Status
- Reporter
- Assigned To

---

## 2. Categories

Examples:

- Mechanical
- Electrical
- Plumbing
- HVAC
- Civil
- Architectural
- Fire Protection
- Utilities
- Safety
- Environmental
- Housekeeping Support
- Vendor Coordination

Categories shall be administrator configurable.

---

## 3. Priority Levels

Default priorities:

- Critical
- High
- Medium
- Low

Priority definitions may be customized.

---

## 4. Assignment

Concerns may be assigned to:

- Technician
- Supervisor
- Duty Engineer
- Engineering Manager
- External Contractor
- Vendor

Supports reassignment while maintaining complete history.

---

## 5. Status Tracking

Every status change records:

- User
- Date
- Time
- Previous Status
- New Status
- Comments

Complete audit history shall be maintained.

---

## 6. Attachments

Supports:

- Photographs
- Videos
- Documents
- Inspection Reports
- Drawings

Attachments become permanent engineering records.

---

## 7. Resolution

Resolution records include:

- Corrective Action
- Completion Date
- Completed By
- Verification
- Remarks

Verification may require approval by supervisors or engineering management.

---

## 8. Escalation

Automatic escalation based on:

- Priority
- Response Time
- Completion Time
- SLA

Escalation recipients are configurable.

---

## 9. Dashboard

Displays:

- Open Concerns
- Overdue Concerns
- Critical Concerns
- Recently Closed
- Average Resolution Time
- Team Workload
- Concerns by Category
- Concerns by Property

---

# Workflow

```text
Concern Identified

↓

Create Concern

↓

Assign Responsible Person

↓

Review

↓

Execute Corrective Action

↓

Update Status

↓

Supervisor Verification

↓

Close Concern

↓

Archive

↓

Analytics
```

---

# Business Rules

- Every concern receives a unique identifier.
- Every concern requires an owner.
- Critical concerns require acknowledgement.
- Closed concerns cannot be deleted.
- Historical records remain immutable.
- Amendments are tracked through audit history.

---

# Notifications

Examples:

- New Concern
- Assignment
- Reassignment
- Status Change
- Overdue Concern
- Escalation
- Verification Required
- Concern Closed

Notification channels are configurable.

---

# Reports

Supports:

- Daily Concern Report
- Weekly Summary
- Monthly Summary
- Outstanding Concerns
- Overdue Concerns
- Category Analysis
- Response Time Analysis
- Resolution Time Analysis

Exports:

- PDF
- Excel
- CSV

---

# Integration

Receives data from:

- Daily Operations
- Operations Logbook
- Plant Operations
- Utilities Monitoring
- Shift Turnover
- Room Engineering Status

Provides data to:

- Engineering Dashboard
- Analytics
- Reports
- Operations Logbook
- FMIS (for maintenance work generation)

---

# Permissions

## Technician

- View assigned concerns
- Update progress
- Upload attachments

## Supervisor

- Assign work
- Verify completion
- Review priorities

## Duty Engineer / Engineering Service Manager

- Manage all shift concerns
- Escalate issues
- Generate reports

## Engineering Manager / Chief Engineer

- Full property visibility
- Configure workflows
- Monitor KPIs

## Director of Engineering

- Portfolio-wide concern monitoring
- Executive reporting
- Cross-property benchmarking

---

# KPIs

Examples:

- Open Concerns
- Closed Concerns
- Overdue Concerns
- Average Response Time
- Average Resolution Time
- First-Time Resolution Rate
- Concerns by Department
- Concerns by Building
- Concerns by Category

---

# Non-Functional Requirements

- Mobile-first data entry
- Fast search
- Advanced filtering
- Offline synchronization (Future)
- Complete audit logging
- Role-based security
- API-ready architecture

---

# Future Enhancements

- QR code concern creation
- AI-assisted categorization
- AI priority recommendation
- Voice-to-concern entry
- Automatic concern creation from IoT alarms
- GIS/location mapping
- Digital Twin integration
- Predictive concern analytics

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000
- FWIS-ARCH-0000
- FWIS-ARCH-0001

Related:

- FWIS-SPEC-0001 – Daily Operations
- FWIS-SPEC-0003 – Shift Turnover
- FWIS-SPEC-0004 – Operations Logbook
- FWIS-SPEC-0012 – Plant Operations
- FMIS-SPEC-0002 – Work Order Management

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Concerns Tracker Functional Specification |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/01_FWIS/01_FWIS_Master_Index|01 FWIS Master Index]] → this document
