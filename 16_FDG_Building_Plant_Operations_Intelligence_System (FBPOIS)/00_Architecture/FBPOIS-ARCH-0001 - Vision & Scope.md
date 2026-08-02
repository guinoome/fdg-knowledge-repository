# FBPOIS-ARCH-0001
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Vision & Scope

**Document ID:** FBPOIS-ARCH-0001

**System:** FBPOIS

**Version:** 1.0

**Status:** Approved

**Owner:** FDG Ecosystem

**Classification:** Architecture

**Parent Document:** FBPOIS-ARCH-0000 – FBPOIS Master Architecture

---

# Purpose

This document defines the long-term vision, objectives, scope, and architectural boundaries of the Facility & Building Plant Operations Intelligence System (FBPOIS).

It establishes what FBPOIS is intended to achieve and clearly defines what is included and excluded from its responsibilities.

---

# Vision

To become the engineering operating system for facility and building management by providing a unified platform that integrates operations, maintenance, engineering collaboration, and organizational intelligence.

FBPOIS shall enable engineering organizations to operate facilities using standardized, configurable, and evidence-based engineering processes while preserving organizational knowledge.

---

# Mission

FBPOIS exists to provide a centralized engineering workspace where facility operations, maintenance activities, utilities monitoring, engineering collaboration, and operational intelligence are managed through a single integrated platform.

The platform shall improve engineering productivity, operational visibility, decision quality, and organizational learning.

---

# Objectives

FBPOIS aims to:

- Standardize engineering operations across facilities.
- Centralize engineering information.
- Eliminate fragmented spreadsheets and manual logbooks.
- Improve operational visibility.
- Improve maintenance planning.
- Support engineering decision making.
- Preserve engineering knowledge.
- Reduce operational risk.
- Enable enterprise-wide engineering reporting.
- Provide a scalable foundation for future engineering intelligence.

---

# Scope

FBPOIS consists of two primary engineering domains:

```text
FBPOIS
│
├── FWIS
│     Facility Workspace Intelligence System
│
└── FMIS
      Facility Maintenance Intelligence System
```

Both domains share a common engineering data platform.

---

# FWIS Scope

FWIS manages engineering operations.

Primary responsibilities include:

- Daily Engineering Operations
- Engineering Dashboard
- Plant Operations
- Utilities Monitoring
- Shift Turnover
- Engineering Communications
- Operations Logbook
- Incident Management
- Engineering Notes
- Concerns Tracking
- Room Engineering Status
- OOO / OOS Management
- Operational Reports
- Engineering Analytics

FWIS answers:

> "What is happening today?"

---

# FMIS Scope

FMIS manages maintenance activities.

Primary responsibilities include:

- Asset Registry
- Preventive Maintenance
- Corrective Maintenance
- Predictive Maintenance
- Work Orders
- Spare Parts
- Vendor Management
- Equipment History
- Reliability Analysis
- Maintenance Planning

FMIS answers:

> "What maintenance work should be performed?"

---

# Shared Data Platform

FWIS and FMIS shall utilize one centralized engineering database.

Shared information includes:

- Organizations
- Properties
- Buildings
- Departments
- Plants
- Equipment
- Assets
- Rooms
- Utility Systems
- Users
- Roles
- Attachments
- Audit Logs

No duplicate operational or maintenance records shall exist.

---

# Supported Facility Types

FBPOIS is designed for:

- Hotels
- Integrated Resorts
- Casinos
- Shopping Malls
- Office Buildings
- Hospitals
- Universities
- Airports
- Industrial Plants
- Mixed-Use Developments
- Government Facilities

---

# Organizational Scope

FBPOIS supports organizations of different sizes.

Examples:

- Single Building
- Hotel Chain
- Resort Complex
- Campus
- Commercial Portfolio
- Enterprise Property Group

---

# Supported Departments

Examples include:

- Engineering
- Facilities Management
- Building Operations
- Utilities
- Energy Management
- Maintenance
- Technical Services

Future versions may support cross-department collaboration while maintaining engineering as the primary domain.

---

# Supported Platforms

Current:

- Windows Desktop
- Android
- Web Portal

Future:

- iOS

---

# Multi-Tenant Design

FBPOIS supports multiple independent organizations on a shared platform while maintaining complete logical separation of organizational data.

Hierarchy:

Organization

↓

Property

↓

Building

↓

Department

↓

Plant

↓

Equipment

---

# Out of Scope

The following functions are not part of FBPOIS Version 1:

- Accounting
- Payroll
- Human Resources
- Procurement ERP
- Customer Relationship Management
- Point of Sale
- Financial Management

These may integrate with FBPOIS through shared platform services or external APIs.

---

# Future Expansion

Future releases may include:

- AI-Assisted Engineering
- Predictive Analytics
- Digital Twin
- BIM Integration
- Sustainability & ESG
- Enterprise Portfolio Management
- SCADA Integration
- BMS Integration
- IoT Integration
- Mobile Offline Synchronization
- Advanced Energy Analytics

---

# Success Criteria

FBPOIS is considered successful when it:

- Centralizes engineering operations.
- Standardizes engineering workflows.
- Improves operational visibility.
- Supports evidence-based decisions.
- Preserves engineering knowledge.
- Scales across multiple facilities.
- Integrates with future FDG Ecosystem platforms.

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000 – FBPOIS Master Architecture

Child:

- FBPOIS-ARCH-0002 – Enterprise Architecture
- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FMIS-ARCH-0000 – Facility Maintenance Intelligence System

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Release | Vision & Scope Established |