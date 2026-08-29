# FBPOIS-SDP-0000
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Shared Data Platform Architecture

**Document ID:** FBPOIS-SDP-0000

**System:** FBPOIS

**Component:** Shared Data Platform

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Shared Data Platform provides the common information backbone for all FBPOIS modules.

Rather than allowing FWIS, FMIS, Analytics, Reporting, and future applications to maintain separate datasets, all operational information shall be managed through a centralized enterprise data platform.

This architecture ensures data consistency, eliminates duplication, and enables cross-functional intelligence throughout the FDG Ecosystem.

---

# Vision

One Platform

↓

One Source of Truth

↓

Many Applications

↓

Shared Intelligence

---

# Objectives

The Shared Data Platform shall:

- Maintain enterprise master data.
- Support all FBPOIS modules.
- Eliminate duplicate information.
- Enable multi-property operations.
- Support enterprise reporting.
- Provide secure API access.
- Enable future AI-assisted engineering.
- Support private cloud and private data center deployments.

---

# Platform Architecture

```text
Windows App

Android App

Web Portal

        │
        ▼

REST API

        │
        ▼

Business Services

        │
        ▼

Shared Data Platform

        │
        ▼

PostgreSQL

        │
        ├── Reports
        ├── Analytics
        ├── Power BI
        ├── Google Sheets Sync
        ├── Excel Import
        ├── AI Services
        └── Future Applications
```

---

# Core Principles

The platform shall provide:

- Single Source of Truth
- Modular Architecture
- API First
- Offline Capability
- Role-Based Security
- Auditability
- Extensibility
- Vendor Independence

---

# Core Master Data

The Shared Data Platform manages enterprise master data.

## Organization

Examples:

- Hotel Group
- Property Owner
- Engineering Company

---

## Property

Examples:

- Resort
- Hotel
- Casino
- Mall
- Office
- Hospital
- Airport

---

## Buildings

Examples:

- Tower 1
- Tower 2
- Mall
- Casino
- Administration Building

---

## Floors

Examples:

- Basement
- Ground Floor
- Level 2

---

## Zones

Examples:

- East Wing
- West Wing
- Back of House
- Public Areas

---

## Operational Assets

Examples:

- Guest Room
- Elevator
- Escalator
- Generator
- Pump
- Chiller
- Kitchen
- Ballroom
- Public Toilet
- Plant Room

---

## Equipment

Stores equipment master records.

---

## Plants

Stores building plant definitions.

Examples:

- Chilled Water Plant
- Fire Protection
- Water Supply
- STP
- Electrical Distribution

---

## Utility Systems

Examples:

- Electrical
- Water
- LPG
- Diesel
- Steam
- Compressed Air

---

## Personnel

Enterprise user registry.

---

## Contractors

External service providers.

---

## Vendors

Equipment suppliers and manufacturers.

---

# Shared Services

The platform provides reusable services.

- Authentication
- Authorization
- Audit Logs
- Notifications
- Attachments
- Workflow Engine
- Reporting Engine
- Analytics Engine
- Search Engine
- File Storage

---

# Data Ownership

| Module | Owns | Reads |
|---------|------|--------|
| FWIS | Operational Data | Master Data |
| FMIS | Maintenance Data | Master Data |
| Reports | None | All Modules |
| Analytics | None | All Modules |
| NEX | None | All Modules |

---

# Synchronization

Supports:

- Online Mode
- Offline Mode
- Scheduled Sync
- Manual Sync
- Conflict Resolution

---

# External Integrations

Supports integration with:

- Google Sheets
- Excel
- Power BI
- SCADA
- BMS
- BACnet
- Modbus
- MQTT
- REST APIs

Future integrations may be added without changing the core architecture.

---

# Security

Supports:

- Multi-Tenant Organizations
- Role-Based Access Control
- Property Isolation
- Building-Level Permissions
- Audit Logging
- Encryption
- API Security

---

# Scalability

Supports deployment for:

- Single Building
- Hotel
- Integrated Resort
- Multi-Property Enterprise
- Multi-Country Organization

---

# Future Intelligence

The Shared Data Platform shall support:

- AI-assisted engineering
- Digital Twin
- Predictive Maintenance
- Energy Optimization
- Sustainability Analytics
- Enterprise Benchmarking
- Autonomous Engineering Agents

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000

Related:

- FWIS-ARCH-0000
- FMIS-ARCH-0000
- FBPOIS-API-0000
- FBPOIS-DB-0000

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Shared Data Platform Architecture |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/03_Sharing_Data_Platform_Master_Index|03 Sharing Data Platform Master Index]] → this document
