# FWIS-SPEC-0008
# Facility Workspace Intelligence System (FWIS)
## Out of Order (OOO) & Out of Service (OOS) Management

**Document ID:** FWIS-SPEC-0008

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** OOO & OOS Management

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Functional Specification

---

# Purpose

The OOO & OOS Management module manages the operational availability of rooms, facilities, public areas, equipment, and other operational assets.

It provides engineering, operations, and management with real-time visibility of unavailable assets and the reasons for their status.

---

# Objectives

The module shall:

- Standardize OOO and OOS processes.
- Improve operational visibility.
- Track asset availability.
- Support engineering coordination.
- Minimize downtime.
- Preserve availability history.
- Support management reporting.

---

# Definitions

## Out of Order (OOO)

An asset is unavailable due to maintenance, repair, renovation, inspection, or engineering work.

Generally requires engineering intervention.

---

## Out of Service (OOS)

An asset is temporarily unavailable due to operational, administrative, housekeeping, safety, or other non-maintenance reasons.

May or may not require engineering action.

Organizations may customize these definitions.

---

# Scope

The module supports availability management for:

- Guest Rooms
- Hotel Facilities
- Casino Areas
- Mall Common Areas
- Retail Spaces
- Restaurants
- Kitchens
- Ballrooms
- Meeting Rooms
- Offices
- Plant Rooms
- Utility Areas
- Public Toilets
- Parking Areas
- Elevators
- Escalators
- Other Operational Assets

---

# Availability Lifecycle

```text
Available

↓

OOO / OOS Requested

↓

Review

↓

Approved

↓

Work in Progress

↓

Inspection

↓

Released

↓

Available
```

---

# Functional Components

## 1. Asset Selection

The system shall allow users to select:

- Property
- Building
- Floor
- Zone
- Asset Type
- Asset Number

---

## 2. Status Assignment

Supported statuses include:

- Available
- Out of Order
- Out of Service
- Under Inspection
- Under Renovation
- Pending Verification
- Released

Organizations may configure additional statuses.

---

## 3. Reason Codes

Examples:

Engineering

- Mechanical Failure
- Electrical Failure
- Plumbing
- HVAC
- Civil Works

Operations

- Deep Cleaning
- VIP Reservation
- Safety Closure
- Event Preparation
- Security Restriction

Administrative

- Inventory
- Inspection
- Audit
- Renovation

Reason codes are administrator configurable.

---

## 4. Work Reference

An OOO/OOS record may reference:

- Work Order (FMIS)
- Concern
- Incident
- Plant Issue
- Operations Logbook
- Inspection Record

---

## 5. Scheduling

Supports:

- Start Date
- Start Time
- Estimated Completion
- Actual Completion
- Extension Requests

---

## 6. Inspection

Before release, inspections may be required.

Inspection records include:

- Inspector
- Date
- Findings
- Approval
- Comments

---

## 7. Release Process

Assets may only return to Available status after:

- Engineering completion
- Inspection
- Approval
- Workflow completion

---

# Workflow

```text
Create OOO/OOS Request

↓

Engineering Review

↓

Approval

↓

Assign Work

↓

Execution

↓

Inspection

↓

Release Approval

↓

Asset Available
```

---

# Dashboard

Displays:

- Active OOO
- Active OOS
- Assets Under Inspection
- Overdue Releases
- Downtime by Building
- Downtime by Asset Type
- Availability Percentage
- Trend Analysis

---

# Notifications

Supports notifications for:

- New OOO/OOS Request
- Approval Required
- Release Required
- Overdue Status
- Inspection Required
- Asset Returned to Service

---

# Reports

Supports:

- Daily OOO Report
- Daily OOS Report
- Downtime Report
- Availability Report
- Monthly Asset Availability
- Downtime Analysis
- Engineering Performance Report

Exports:

- PDF
- Excel
- CSV

---

# Integration

Receives information from:

- Concerns Tracker
- Incident Management
- Workflow Management
- FMIS Work Orders
- Asset Registry

Provides information to:

- Engineering Dashboard
- Operations Logbook
- Room Engineering Status
- Reports
- Analytics
- NEX

---

# Permissions

## Technician

- Create requests
- Update assigned records

---

## Supervisor

- Review requests
- Verify completion

---

## Duty Engineer / Engineering Service Manager

- Manage OOO/OOS records
- Coordinate inspections

---

## Engineering Manager / Chief Engineer

- Approve requests
- Monitor downtime
- Review KPIs

---

## Director of Engineering

- Portfolio-wide visibility
- Executive reporting
- Benchmark asset availability

---

## Super Administrator

Responsible for:

- Status configuration
- Reason code management
- Workflow configuration
- Notification policies
- Organization defaults

---

# Business Rules

- Every OOO/OOS record has a unique identifier.
- Status history is immutable.
- Every release requires authorization.
- Downtime is automatically calculated.
- Historical records cannot be deleted.

---

# KPIs

Examples:

- Asset Availability (%)
- Mean Downtime
- Average Repair Duration
- Average OOO Duration
- Average OOS Duration
- Repeat OOO Events
- Repeat OOS Events
- Downtime by Building
- Downtime by Asset Category

---

# Non-Functional Requirements

- Mobile-friendly
- Offline support (Future)
- Barcode / QR Code ready
- Fast search
- Complete audit trail
- API-ready architecture

---

# Future Enhancements

- QR code asset lookup
- RFID asset tracking
- IoT availability monitoring
- AI downtime prediction
- Automatic release recommendations
- Digital Twin integration
- Predictive asset availability
- Enterprise benchmarking

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000
- FWIS-ARCH-0000
- FWIS-ARCH-0001

Related:

- FWIS-SPEC-0007 – Concerns Tracker
- FWIS-SPEC-0013 – Incident Management
- FWIS-SPEC-0010 – Workflow Management
- FWIS-SPEC-0009 – Room Engineering Status
- FMIS Asset Registry
- FMIS Work Order Management

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | OOO & OOS Management Functional Specification |