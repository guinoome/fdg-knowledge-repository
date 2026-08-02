# FBPOIS-ARCH-0000
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Master Architecture

**Document ID:** FBPOIS-ARCH-0000

**System:** FBPOIS

**Version:** 1.0

**Status:** Approved

**Owner:** FDG Ecosystem

**Classification:** Architecture

---

# Purpose

This document establishes the master architecture for the Facility & Building Plant Operations Intelligence System (FBPOIS).

It defines the overall vision, architectural boundaries, system decomposition, and engineering principles governing all future FBPOIS development.

This document serves as the parent architecture for every FBPOIS specification.

---

# Vision

To build a configurable, scalable, enterprise-grade engineering platform that enables engineers to operate, monitor, maintain, and continuously improve buildings and facilities through a unified operational workspace.

FBPOIS is designed to support facilities ranging from single commercial buildings to integrated resorts, hospitals, airports, industrial facilities, universities, and smart cities.

---

# Mission

Provide a unified engineering platform that integrates:

- Daily Operations
- Building Plant Operations
- Maintenance Management
- Utilities Monitoring
- Engineering Collaboration
- Organizational Intelligence

through a shared engineering data platform.

---

# Position within the FDG Ecosystem

```text
Founder
    │
NEX
    │
FDG Ecosystem
    │
FDG Workspace Platform
    │
FBPOIS
```

FBPOIS is one application within the FDG Workspace Platform and operates under the governance of the FDG Ecosystem.

---

# Architectural Principles

FBPOIS is built upon the following principles:

1. Engineering First
2. Configuration over Customization
3. Single Source of Truth
4. Modular Architecture
5. Evidence-Based Engineering
6. Security by Design
7. Offline-Capable
8. API-First
9. Multi-Tenant
10. AI-Ready
11. Vendor Neutral
12. Future-Proof

---

# High-Level Architecture

```text
FBPOIS
│
├── FWIS
│     Facility Workspace Intelligence System
│
├── FMIS
│     Facility Maintenance Intelligence System
│
└── Shared Data Platform
```

---

# Core Systems

## FWIS

Responsible for engineering operations.

Examples include:

- Daily Engineering Operations
- Engineering Dashboard
- Shift Turnover
- Operations Logbook
- Utilities Monitoring
- Plant Operations
- Engineering Communications
- Incident Management
- Engineering Analytics

---

## FMIS

Responsible for maintenance management.

Examples include:

- Asset Registry
- Preventive Maintenance
- Corrective Maintenance
- Predictive Maintenance
- Work Orders
- Spare Parts
- Reliability
- Asset Lifecycle

---

## Shared Data Platform

FWIS and FMIS utilize one shared engineering database.

Core entities include:

- Organization
- Property
- Building
- Plant
- Equipment
- Assets
- Rooms
- Utilities
- Users
- Roles
- Attachments
- Audit Logs

---

# Supported Industries

FBPOIS is designed to support:

- Hotels
- Integrated Resorts
- Casinos
- Shopping Malls
- Commercial Buildings
- Hospitals
- Universities
- Airports
- Industrial Facilities
- Mixed-Use Developments
- Government Facilities

---

# Deployment Targets

Supported platforms:

- Windows Desktop
- Android
- Web Portal

Future platform:

- iOS

Deployment options:

- On-Premise
- Private Cloud
- Private Data Center
- Multi-Data Center

---

# Technology Direction

Database evolution:

Google Sheets

↓

PostgreSQL

↓

PostgreSQL Cluster

↓

Enterprise Private Infrastructure

FBPOIS shall remain database-independent whenever practical to simplify future migrations.

---

# Design Philosophy

FBPOIS is not intended to replicate low-code platforms.

It is engineered as a dedicated enterprise platform that reflects engineering workflows rather than forcing engineering teams to adapt to software limitations.

The platform emphasizes modularity, configurability, operational reliability, and long-term maintainability.

---

# Relationship to Other FDG Systems

FBPOIS integrates with:

- FDG Workspace Platform
- FEIP
- FBIS
- FLIS
- FCIS
- FKIS
- FSIS

through shared platform services and common architectural standards.

---

# Future Expansion

Planned future capabilities include:

- AI-Assisted Engineering
- Digital Twin
- Building Information Modeling (BIM)
- Energy Analytics
- Sustainability Reporting
- ESG Metrics
- Predictive Analytics
- Enterprise Reporting
- Portfolio Management
- Smart Building Integration

---

# Parent Documents

None

---

# Child Documents

- FBPOIS-ARCH-0001 – Vision & Scope
- FBPOIS-ARCH-0002 – Enterprise Architecture
- FBPOIS-ARCH-0003 – Business Architecture
- FBPOIS-ARCH-0004 – Data Architecture
- FBPOIS-ARCH-0005 – Integration Architecture
- FBPOIS-ARCH-0006 – Security Architecture
- FBPOIS-ARCH-0007 – Deployment Architecture
- FBPOIS-ARCH-0008 – Technology Stack

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Release | Master Architecture Established |