# FWIS-SPEC-0009
# Facility Workspace Intelligence System (FWIS)
## Room Engineering Status

**Document ID:** FWIS-SPEC-0009

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** Room Engineering Status

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Functional Specification

---

# Purpose

The Room Engineering Status module provides Engineering with a real-time operational view of every guest room under its responsibility.

The module enables Engineering to monitor room availability, engineering defects, inspections, repairs, maintenance coordination, and room release activities while synchronizing with hotel operational departments.

---

# Objectives

The module shall:

- Provide live engineering room status.
- Coordinate room restoration activities.
- Improve communication with hotel operations.
- Reduce room downtime.
- Track engineering response performance.
- Maintain complete room history.

---

# Scope

This module manages the engineering operational status of guestrooms.

Commercial spaces and other operational assets are managed through the Operational Asset framework and OOO/OOS Management.

---

# Room Hierarchy

```text
Organization

↓

Property

↓

Hotel

↓

Tower

↓

Floor

↓

Room
```

---

# Engineering Room Status

Supported statuses include:

- Normal
- Inspection Required
- Engineering Assigned
- Repair In Progress
- Waiting for Parts
- Waiting for Contractor
- Testing
- Ready for Inspection
- Released
- OOO
- OOS

Administrators may define additional statuses.

---

# Room Profile

Each room includes:

- Room Number
- Tower
- Floor
- Room Type
- Zone
- Current Status
- Priority
- Assigned Engineer
- Last Inspection
- Last Repair
- Current Concern
- Current Work Order

---

# Functional Components

## 1. Live Room Board

Displays:

- Available Rooms
- Rooms Under Repair
- OOO Rooms
- OOS Rooms
- Inspection Queue
- Released Today
- Critical Rooms

Supports list and floor-map views.

---

## 2. Engineering Assignment

Engineering personnel may assign:

- Technician
- Supervisor
- Duty Engineer

Assignment history shall be retained.

---

## 3. Inspection

Inspection records include:

- Date
- Inspector
- Inspection Type
- Findings
- Defects
- Photos
- Recommendation

---

## 4. Defect Tracking

Tracks room-specific defects.

Examples:

- HVAC
- Plumbing
- Electrical
- Civil
- Furniture
- Fixtures
- Doors
- Windows
- Bathroom
- Fire Protection

Each defect may generate:

- Concern
- Incident
- Work Order

---

## 5. Release Process

Room release requires:

- Repair Completion
- Engineering Inspection
- Approval
- Workflow Completion

Room status updates automatically after release approval.

---

## 6. Timeline

Maintains complete room history.

Example:

```text
08:10
Room Reported

↓

08:25
Engineer Assigned

↓

09:10
Repair Started

↓

10:05
Repair Completed

↓

10:20
Inspection

↓

10:35
Released
```

---

# Dashboard

Displays:

- Total Rooms
- Rooms Available
- OOO Rooms
- OOS Rooms
- Rooms Under Repair
- Rooms Awaiting Inspection
- Average Repair Time
- Average Release Time

---

# Workflow

```text
Room Reported

↓

Engineering Review

↓

Assign Technician

↓

Repair

↓

Inspection

↓

Approval

↓

Room Released

↓

Historical Archive
```

---

# Integration

Receives information from:

- OOO & OOS Management
- Concerns Tracker
- Incident Management
- FMIS Work Orders
- Workflow Management

Provides information to:

- Engineering Dashboard
- Operations Logbook
- Reports
- Analytics
- NEX

---

# Notifications

Supports:

- Room Assigned
- Repair Completed
- Inspection Required
- Room Released
- Overdue Repairs
- Critical VIP Rooms

---

# Reports

Supports:

- Daily Room Status
- OOO Report
- OOS Report
- Repair History
- Engineering Performance
- Room Downtime
- Inspection Summary

Exports:

- PDF
- Excel
- CSV

---

# Permissions

## Technician

- View assigned rooms
- Update repair status
- Upload photos

---

## Supervisor

- Review repairs
- Assign technicians
- Verify completion

---

## Duty Engineer / Engineering Service Manager

- Coordinate engineering activities
- Manage room priorities
- Approve releases

---

## Engineering Manager / Chief Engineer

- Monitor engineering KPIs
- Approve major room closures
- Review room availability

---

## Director of Engineering

- Executive dashboard
- Cross-property room performance
- Portfolio reporting

---

## Super Administrator

Responsible for:

- Status configuration
- Workflow configuration
- Room templates
- Notification settings

---

# Business Rules

- Every room has one active engineering status.
- Status changes are fully audited.
- Historical records cannot be deleted.
- Room release requires workflow completion.
- OOO/OOS history is permanently retained.

---

# Non-Functional Requirements

- Real-time synchronization
- Mobile-friendly
- Offline synchronization (Future)
- QR Code support
- Fast filtering
- API-ready architecture

---

# Future Enhancements

- Interactive floor plans
- BIM integration
- Digital Twin room visualization
- QR room inspections
- NFC room identification
- AI room prioritization
- Predictive defect analysis

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000
- FWIS-ARCH-0000
- FWIS-ARCH-0001

Related:

- FWIS-SPEC-0008 – OOO & OOS Management
- FWIS-SPEC-0007 – Concerns Tracker
- FWIS-SPEC-0013 – Incident Management
- FMIS Work Order Management

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Room Engineering Status Functional Specification |