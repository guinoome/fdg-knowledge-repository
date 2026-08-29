# FBPOIS-SDP-0001
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Master Data Architecture

**Document ID:** FBPOIS-SDP-0001

**System:** FBPOIS

**Component:** Shared Data Platform

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Master Data Architecture defines the core business entities shared by every module within FBPOIS.

Master Data represents relatively stable business information that serves as the foundation for operational, maintenance, analytical, and reporting functions.

All FBPOIS applications shall reference these entities rather than creating duplicate records.

---

# Objectives

The Master Data Architecture shall:

- Establish a single source of truth.
- Standardize business entities.
- Eliminate duplicate information.
- Enable enterprise-wide reporting.
- Support multi-property organizations.
- Support future FDG applications.

---

# Master Data Hierarchy

```text
Organization

↓

Property

↓

Building

↓

Floor

↓

Zone

↓

Operational Asset

↓

Equipment

↓

Plant

↓

Utility System

↓

Operational Records
```

---

# Master Data Domains

## Organization

Represents the highest business entity.

Examples:

- Hotel Owner
- Resort Group
- Mall Operator
- Hospital Operator
- Airport Authority
- Property Management Company

---

## Property

Represents an operational site.

Examples:

- Integrated Resort
- Hotel
- Casino
- Shopping Mall
- Office Building
- Hospital
- Airport

Each property belongs to one organization.

---

## Building

Represents an individual structure within a property.

Examples:

- Hotel Tower A
- Hotel Tower B
- Casino
- Mall
- Administration Building
- Utility Building

---

## Floor

Represents physical building levels.

Examples:

- Basement 2
- Basement 1
- Ground Floor
- Level 2
- Roof Deck

---

## Zone

Logical subdivision of a floor.

Examples:

- East Wing
- West Wing
- Public Area
- Back of House
- Service Corridor
- Mechanical Room

---

## Operational Asset

Represents anything Engineering is responsible for operating or maintaining.

Examples:

- Guest Room
- Ballroom
- Restaurant
- Meeting Room
- Swimming Pool
- Elevator
- Escalator
- Generator
- Pump
- Cooling Tower
- Chiller
- Kitchen
- Fire Pump
- STP

Every operational record ultimately references an Operational Asset.

---

## Equipment

Represents maintainable equipment.

Typical attributes include:

- Asset Number
- Equipment Name
- Equipment Category
- Manufacturer
- Model
- Serial Number
- Installation Date
- Warranty
- Criticality
- Current Status

---

## Plant

Represents engineering systems composed of multiple equipment assets.

Examples:

- Chilled Water Plant
- Fire Protection Plant
- Water Supply Plant
- Sewage Treatment Plant
- Electrical Distribution System

Plants organize equipment into operational systems.

---

## Utility System

Represents utility services monitored by FBPOIS.

Examples:

- Electricity
- Water
- Diesel
- LPG
- Steam
- Compressed Air
- Solar PV
- Battery Energy Storage

---

## Personnel

Represents internal users.

Examples:

- Technician
- Supervisor
- Duty Engineer
- Engineering Service Manager
- Engineering Manager
- Chief Engineer
- Director of Engineering

---

## Contractor

Represents external engineering service providers.

Examples:

- Elevator Contractor
- HVAC Contractor
- Fire Protection Contractor

---

## Vendor

Represents suppliers and manufacturers.

Examples:

- Equipment Manufacturer
- Spare Parts Supplier
- Utility Provider

---

# Shared Reference Data

Reference data standardizes values across the platform.

Examples include:

- Equipment Categories
- Plant Categories
- Utility Types
- Concern Categories
- Incident Categories
- Priority Levels
- Status Codes
- Risk Levels
- Building Types
- Room Types
- Asset Types
- Units of Measure
- Failure Codes

Reference Data is centrally managed.

---

# Master Data Relationships

```text
Organization
        │
        ▼
Property
        │
        ▼
Building
        │
        ▼
Floor
        │
        ▼
Zone
        │
        ▼
Operational Asset
        │
        ├── Equipment
        ├── Room
        ├── Facility
        ├── Public Area
        ├── Utility Asset
        └── Plant
```

---

# Ownership

Master Data shall be maintained only by authorized personnel.

Operational modules shall reference Master Data but shall not duplicate it.

---

# Version Control

Changes to Master Data shall be audited.

Records include:

- Created By
- Created Date
- Modified By
- Modified Date
- Revision Number
- Status

---

# Business Rules

- Every master record has a globally unique identifier.
- Duplicate master records are prohibited.
- Operational data shall reference Master Data.
- Historical records shall remain traceable.
- Deleted master records shall be archived rather than permanently removed.

---

# Integration

Master Data supports:

- FWIS
- FMIS
- Reports
- Analytics
- API Services
- NEX
- Future FDG Applications

---

# Future Enhancements

- GIS integration
- BIM object mapping
- Digital Twin identifiers
- QR Code registry
- RFID asset registry
- IoT device registration
- Enterprise asset taxonomy

---

# Related Documents

Parent:

- FBPOIS-SDP-0000 – Shared Data Platform Architecture *(confirmed not present this session)*

Related:

- FBPOIS-SDP-0002 – Operational Asset Model
- FBPOIS-SDP-0003 – Organization & Property Hierarchy *(confirmed not present this session)*
- FBPOIS-DB-0000 – Database Architecture *(not found in any folder listing taken this session — different folder or never created; unconfirmed)*

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Master Data Architecture |

---

## Contents — 16_FBPOIS/03_Sharing_Data_Platform

*Added 2026-08-05 as part of Work Package Phase 1, extended scope per direct instruction. This folder's own "0000" entry document (`FBPOIS-SDP-0000`) is confirmed not present — using SDP-0001 as the practical entry point since it's the lowest-numbered file present. Links below cover only files confirmed to exist in this pass.*

- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/FBPOIS-SDP-0002 - Operational Asset Model|FBPOIS-SDP-0002 – Operational Asset Model]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/FBPOIS-SDP-0004 - Data Governance Standards|FBPOIS-SDP-0004 – Data Governance Standards]]
- [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/FBPOIS-SDP-0006 - Integration Architecture|FBPOIS-SDP-0006 – Integration Architecture]]

**Missing, referenced by this document or expected by the numbering sequence, not linked:** SDP-0000 (Architecture, parent), SDP-0003 (Organization & Property Hierarchy), SDP-0005, SDP-0007.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/03_Sharing_Data_Platform/03_Sharing_Data_Platform_Master_Index|03 Sharing Data Platform Master Index]] → this document
