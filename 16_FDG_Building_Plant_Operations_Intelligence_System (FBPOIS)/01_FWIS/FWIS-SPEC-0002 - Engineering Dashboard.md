# FWIS-SPEC-0002
# Facility Workspace Intelligence System (FWIS)
## Engineering Dashboard

**Document ID:** FWIS-SPEC-0002

**System:** FBPOIS

**Subsystem:** FWIS

**Module:** Engineering Dashboard

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

The Engineering Dashboard serves as the centralized operational command center for engineering personnel. It provides real-time visibility into facility operations, engineering activities, plant conditions, utilities, incidents, and key performance indicators.

The dashboard shall consolidate information from all FWIS modules without duplicating data.

---

# Objectives

The Engineering Dashboard shall:

- Provide a single operational view.
- Display real-time engineering information.
- Highlight critical operational conditions.
- Support engineering decision-making.
- Enable role-based visibility.
- Improve situational awareness.

---

# Scope

The dashboard is a presentation layer only.

It retrieves information from other FWIS modules but does not own operational data.

---

# Primary Users

- Director of Engineering
- Engineering Manager / Chief Engineer
- Duty Engineer / Engineering Service Manager
- Supervisor
- Technician
- Executive (Read-Only)

---

# Dashboard Layout

```text
+--------------------------------------------------------------+
| Property Selector | Date | Shift | User                      |
+--------------------------------------------------------------+

 KPI Cards

 Active Tasks
 Open Concerns
 Critical Incidents
 OOO Rooms
 OOS Rooms
 Plant Availability
 Utility Status

---------------------------------------------------------------

 Plant Operations

---------------------------------------------------------------

 Utilities Monitoring

---------------------------------------------------------------

 Engineering Assignments

---------------------------------------------------------------

 Recent Incidents

---------------------------------------------------------------

 Shift Turnover Summary

---------------------------------------------------------------

 Announcements

---------------------------------------------------------------

 Weather (Optional)

---------------------------------------------------------------

 Quick Actions
```

---

# Functional Components

## 1. Property Selector

Allows users to select:

- Organization
- Property
- Building
- Tower
- Department

Users shall only see authorized properties.

---

## 2. KPI Cards

Displays configurable operational metrics.

Examples:

- Active Tasks
- Completed Tasks
- Open Concerns
- Active Incidents
- Plant Availability
- Utility Consumption
- Energy Cost
- OOO Rooms
- OOS Rooms

Each KPI shall support drill-down.

---

## 3. Plant Status

Displays operational condition of all configured plants.

Examples:

- Chiller Plant
- Generator Sets
- Cooling Towers
- Boilers
- STP
- Fire Pumps
- Water Distribution
- Solar PV

Status indicators:

- Normal
- Warning
- Critical
- Offline
- Maintenance

---

## 4. Utilities Summary

Displays:

- Electricity
- Water
- Diesel
- LPG
- Steam
- Solar
- Chilled Water

Information includes:

- Current Reading
- Daily Consumption
- Monthly Consumption
- Cost
- Budget Utilization

---

## 5. Engineering Assignments

Displays:

- Assigned Tasks
- Priority
- Due Time
- Assigned Personnel
- Current Status

Supports filtering by:

- User
- Department
- Shift
- Priority

---

## 6. Concerns Summary

Displays:

- Open Concerns
- High Priority
- Overdue
- Pending Approval

Supports drill-down into the Concerns Tracker.

---

## 7. Incident Summary

Displays:

- Active Incidents
- Resolved Today
- Critical Events
- Equipment Failures
- Utility Interruptions

Supports direct access to Incident Management.

---

## 8. Room Engineering Status

Displays:

- OOO Rooms
- OOS Rooms
- Under Repair
- Inspection Required
- Released Today

Supports filtering by:

- Property
- Tower
- Floor
- Room

---

## 9. Shift Turnover

Displays:

- Previous Shift Summary
- Outstanding Items
- Pending Handover
- Shift Notes

---

## 10. Engineering Announcements

Displays:

- Operational Advisories
- Safety Notices
- Management Instructions
- Planned Shutdowns

Announcements may be pinned based on priority.

---

## 11. Weather (Optional)

Displays:

- Current Weather
- Temperature
- Humidity
- Rainfall
- Weather Alerts

Future integration with weather APIs.

---

## 12. Quick Actions

Examples:

- Create Concern
- Create Incident
- Add Logbook Entry
- Start Shift Turnover
- Open Plant Operations
- Open Utilities Monitoring
- Generate Report

Quick Actions are configurable by role.

---

# Dashboard Personalization

Users may configure:

- Favorite Widgets
- Widget Order
- Dashboard Layout
- Default Property
- Default Building
- Default Shift

Administrators may define organization-wide default dashboards.

---

# Data Sources

The dashboard retrieves information from:

- Daily Operations
- Plant Operations
- Utilities Monitoring
- Concerns Tracker
- Incident Management
- OOO / OOS Management
- Workflow Management
- Shift Turnover
- Reports
- Analytics

---

# Permissions

## Technician

- View assigned dashboard
- Update personal tasks

## Supervisor

- View team dashboard
- Monitor assignments
- Review concerns

## Duty Engineer / Engineering Service Manager

- Full operational dashboard
- Manage shift
- Monitor utilities

## Engineering Manager / Chief Engineer

- Complete property dashboard
- Configure KPIs
- Review operations

## Director of Engineering

- Multi-property dashboard
- Executive analytics
- Portfolio comparison

---

# Reports

The dashboard supports:

- Daily Operations Summary
- Plant Performance
- Utilities Summary
- Incident Summary
- Executive Dashboard
- Shift Dashboard

Reports may be exported as:

- PDF
- Excel

---

# Non-Functional Requirements

- Responsive design
- Role-based widgets
- Fast loading
- Offline cache (future)
- Configurable dashboards
- Mobile-friendly
- Desktop optimized

---

# Future Enhancements

- NEX operational recommendations
- AI-generated executive summaries
- Predictive KPI alerts
- Interactive digital twin widgets
- Voice dashboard
- Large-screen command center mode

---

# Related Documents

Parent:

- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture

Related:

- FWIS-SPEC-0001 – Daily Operations
- FWIS-SPEC-0003 – Shift Turnover
- FWIS-SPEC-0011 – Utilities Monitoring
- FWIS-SPEC-0012 – Plant Operations

---

# Revision History

| Version | Date | Description |
|---------|------|-------------|
| 1.0 | Initial Draft | Engineering Dashboard Specification |