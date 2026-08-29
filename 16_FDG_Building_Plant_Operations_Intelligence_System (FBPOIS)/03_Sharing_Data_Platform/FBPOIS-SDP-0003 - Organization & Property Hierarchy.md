# FBPOIS-SDP-0003
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Organization & Property Hierarchy

**Document ID:** FBPOIS-SDP-0003

**System:** FBPOIS

**Component:** Shared Data Platform

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Organization & Property Hierarchy defines the enterprise structure used throughout FBPOIS.

Every operational record, maintenance activity, utility reading, engineering report, and analytical metric shall inherit this hierarchy to ensure consistent data organization, security, reporting, and scalability.

---

# Objectives

The hierarchy shall:

- Support single-building deployments.
- Support multi-building properties.
- Support enterprise organizations.
- Enable role-based access.
- Enable consolidated reporting.
- Support future multi-country deployments.

---

# Enterprise Hierarchy

```text
Organization

↓

Business Unit (Optional)

↓

Property

↓

Campus (Optional)

↓

Building

↓

Tower (Optional)

↓

Floor

↓

Zone

↓

Operational Asset
```

---

# Level Definitions

## Organization

Represents the highest business entity responsible for one or more properties.

Examples:

- Resort Operator
- Hotel Group
- Property Developer
- Hospital Group
- Airport Authority

Responsibilities:

- Corporate Governance
- Corporate Standards
- Enterprise Reporting
- Global User Management

---

## Business Unit (Optional)

Allows organizations to divide operations.

Examples:

- Hospitality
- Gaming
- Retail
- Commercial Leasing
- Healthcare

Not required for every deployment.

---

## Property

Represents a physical operating location.

Examples:

- Integrated Resort Cebu
- Business Hotel Manila
- Airport Terminal 3
- Central Shopping Mall

A property is the primary operational boundary.

---

## Campus (Optional)

Represents a collection of buildings operating together.

Examples:

- Resort Campus
- Hospital Campus
- University Campus

---

## Building

Represents a standalone structure.

Examples:

- Hotel Tower A
- Hotel Tower B
- Casino
- Convention Center
- Mall
- Administration Building
- Utility Building

Buildings are independently reportable.

---

## Tower (Optional)

Allows subdivision of large buildings.

Examples:

- North Tower
- South Tower
- East Wing
- West Wing

---

## Floor

Represents building levels.

Examples:

- Basement 2
- Basement 1
- Ground Floor
- Level 2
- Roof Deck

---

## Zone

Logical engineering areas.

Examples:

- Public Area
- Back of House
- Mechanical Room
- Service Corridor
- East Wing
- West Wing
- VIP Area

Zones simplify engineering operations.

---

## Operational Asset

The smallest managed object.

Examples:

- Guest Room
- Chiller
- Elevator
- Pump
- Generator
- Ballroom
- Kitchen
- Escalator
- Restaurant
- AHU
- Fire Pump

Every operational and maintenance transaction references an Operational Asset.

---

# Hierarchical Relationships

```text
Organization
        │
        ▼
Business Unit (Optional)
        │
        ▼
Property
        │
        ▼
Campus (Optional)
        │
        ▼
Building
        │
        ▼
Tower (Optional)
        │
        ▼
Floor
        │
        ▼
Zone
        │
        ▼
Operational Asset
```

---

# User Scope

User permissions inherit the hierarchy.

Examples:

Super Administrator

- All Organizations

Director of Engineering

- Assigned Organization

Chief Engineer

- Assigned Property

Engineering Manager

- Assigned Building

Duty Engineer

- Assigned Shift / Building

Supervisor

- Assigned Zone

Technician

- Assigned Operational Assets

---

# Reporting Scope

Reports may be generated at any hierarchy level.

Examples:

Enterprise Report

↓

Organization

↓

Property Comparison

↓

Building Performance

↓

Floor Summary

↓

Zone Analysis

↓

Operational Asset Detail

---

# Analytics Scope

Analytics support:

- Enterprise Benchmarking
- Property Comparison
- Building Comparison
- Utility Analysis
- Engineering Performance
- Asset Performance
- Operational KPIs

---

# Multi-Tenant Support

The hierarchy supports:

- Independent organizations
- Shared infrastructure
- Separate databases (optional)
- Shared cloud deployments
- Private data centers
- Hybrid deployments

No organization can access another organization's data without explicit authorization.

---

# Integration

The hierarchy is shared by:

- FWIS
- FMIS
- Reports
- Analytics
- APIs
- NEX
- Future FDG Applications

---

# Business Rules

- Every Property belongs to one Organization.
- Every Building belongs to one Property.
- Every Floor belongs to one Building.
- Every Zone belongs to one Floor.
- Every Operational Asset belongs to one Zone.
- Hierarchical relationships are version-controlled and audited.

---

# Future Enhancements

- Geographic Information System (GIS) integration
- BIM hierarchy synchronization
- Digital Twin mapping
- Organizational mergers and acquisitions support
- Multi-country localization
- Enterprise portfolio management

---

# Related Documents

Parent:

- FBPOIS-SDP-0000 – Shared Data Platform Architecture

Related:

- FBPOIS-SDP-0001 – Master Data Architecture
- FBPOIS-SDP-0002 – Operational Asset Model
- FBPOIS-SDP-0004 – Data Governance Standards

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Organization & Property Hierarchy |

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/03_Sharing_Data_Platform_Master_Index|03 Sharing Data Platform Master Index]] → this document
