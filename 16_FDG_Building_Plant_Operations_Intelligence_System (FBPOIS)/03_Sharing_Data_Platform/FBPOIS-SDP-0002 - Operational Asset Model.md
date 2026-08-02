# FBPOIS-SDP-0002
# Facility & Building Plant Operations Intelligence System (FBPOIS)
## Operational Asset Model

**Document ID:** FBPOIS-SDP-0002

**System:** FBPOIS

**Component:** Shared Data Platform

**Version:** 1.0

**Status:** Draft

**Owner:** FDG Ecosystem

**Classification:** Architecture Specification

---

# Purpose

The Operational Asset Model defines the standardized representation of every asset managed within FBPOIS.

An Operational Asset is any physical space, equipment, utility, or facility component that Engineering operates, monitors, maintains, inspects, or reports on.

This model provides a common reference for FWIS, FMIS, Analytics, Reporting, APIs, and future FDG applications.

---

# Objectives

The Operational Asset Model shall:

- Standardize asset representation.
- Support all building types.
- Eliminate duplicate asset structures.
- Enable enterprise asset tracking.
- Support future Digital Twin initiatives.
- Provide a scalable foundation for operations and maintenance.

---

# Asset Hierarchy

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
```

Every operational record ultimately references an Operational Asset.

---

# Operational Asset Categories

The platform shall support configurable asset categories.

Examples include:

## Accommodation

- Guest Room
- Villa
- Suite
- Staff Room

---

## Public Areas

- Lobby
- Corridor
- Ballroom
- Meeting Room
- Function Hall
- Restaurant
- Bar
- Lounge
- Casino Area
- Mall Common Area
- Parking Area

---

## Building Services

- Elevator
- Escalator
- Automatic Door
- Fire Exit
- Lighting Zone

---

## Mechanical Systems

- Chiller
- Cooling Tower
- AHU
- FCU
- Exhaust Fan
- Supply Fan
- Pump
- Air Compressor

---

## Electrical Systems

- Generator
- Transformer
- Main Switchboard
- Distribution Panel
- UPS
- Solar PV Inverter
- Battery Energy Storage

---

## Plumbing Systems

- Water Tank
- Booster Pump
- STP
- Grease Trap
- Water Meter

---

## Fire Protection

- Fire Pump
- Jockey Pump
- Fire Alarm Panel
- Sprinkler Zone
- Hydrant Zone

---

## Utility Assets

- Electrical Meter
- Water Meter
- Diesel Tank
- LPG Tank
- Steam Meter

---

## Custom Categories

Organizations may define additional categories.

---

# Asset Attributes

Each Operational Asset shall include:

- Asset ID
- Asset Code
- Asset Name
- Asset Category
- Organization
- Property
- Building
- Floor
- Zone
- Plant Association
- Equipment Association
- Status
- Criticality
- Owner Department
- QR Code
- Barcode
- GPS Coordinates (Optional)
- BIM Identifier (Future)
- Digital Twin Identifier (Future)

---

# Asset Status

Examples:

- Operational
- Standby
- Under Maintenance
- Out of Service
- Out of Order
- Inspection Required
- Testing
- Decommissioned

Organizations may configure additional statuses.

---

# Asset Relationships

An Operational Asset may relate to:

- Parent Asset
- Child Assets
- Equipment
- Plant
- Utility System
- Building
- Work Orders
- Incidents
- Concerns
- Inspections
- Documents
- Engineering Notes

---

# Lifecycle

```text
Planning

↓

Procurement

↓

Installation

↓

Commissioning

↓

Operations

↓

Maintenance

↓

Upgrade

↓

Replacement

↓

Retirement

↓

Archive
```

---

# Asset Ownership

Each asset shall define:

- Operating Department
- Responsible Engineer
- Maintenance Team
- Asset Custodian
- Contractor (Optional)

---

# Operational Integration

Operational Assets shall be referenced by:

- Daily Operations
- Plant Operations
- Utilities Monitoring
- Incident Management
- Concerns Tracker
- OOO/OOS Management
- Room Engineering Status
- Workflow Management

---

# Maintenance Integration

Operational Assets shall also support:

- Preventive Maintenance
- Corrective Maintenance
- Predictive Maintenance
- Condition Monitoring
- Calibration
- Asset Inspections
- Spare Parts

---

# Analytics Integration

Each asset contributes to:

- Availability
- Utilization
- Downtime
- MTBF
- MTTR
- Energy Consumption
- Lifecycle Cost
- Reliability Index

---

# Security

Assets shall support role-based permissions.

Examples:

- View
- Edit
- Assign
- Retire
- Archive
- Delete (Restricted)

---

# Business Rules

- Every asset has a globally unique Asset ID.
- Every operational transaction references an Operational Asset.
- Assets cannot belong to multiple organizations.
- Asset history is immutable.
- Asset relationships remain traceable throughout the lifecycle.

---

# Future Enhancements

- BIM synchronization
- Digital Twin mapping
- QR code navigation
- RFID asset tracking
- Indoor positioning
- AI asset classification
- IoT sensor binding
- Autonomous asset health monitoring

---

# Related Documents

Parent:

- FBPOIS-SDP-0000 – Shared Data Platform Architecture
- FBPOIS-SDP-0001 – Master Data Architecture

Related:

- FBPOIS-SDP-0003 – Organization & Property Hierarchy
- FMIS Asset Registry
- FBPOIS Database Architecture

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Operational Asset Model |