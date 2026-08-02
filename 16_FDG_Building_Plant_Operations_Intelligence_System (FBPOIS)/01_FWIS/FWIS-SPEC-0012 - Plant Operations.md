# FWIS-SPEC-0012
# Facility Workspace Intelligence System (FWIS)
## Plant Operations

**Document ID:** FWIS-SPEC-0012

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** Plant Operations

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

The Plant Operations module is the operational monitoring system for all engineering plants within a property.

It allows engineering personnel to define plants, configure operational parameters, record readings, monitor equipment conditions, identify abnormal trends, and provide a centralized operational dashboard.

The module shall support manual data entry initially while remaining ready for future integration with SCADA, BMS, PLCs, and IoT devices.

---

# Objectives

The Plant Operations module shall:

- Standardize plant monitoring.
- Support unlimited plant types.
- Support configurable operating parameters.
- Eliminate spreadsheet-based monitoring.
- Improve operational visibility.
- Support engineering analysis.
- Preserve historical operational data.

---

# Design Philosophy

Plant Operations shall be configuration-driven.

No software modification shall be required when adding:

- New plants
- New equipment
- New parameters
- New buildings
- New organizations

Administrators configure the system through master data.

---

# Scope

The module manages operational monitoring only.

Maintenance planning, preventive maintenance scheduling, and work order execution belong to FMIS.

---

# Operational Hierarchy

```text
Organization

↓

Property

↓

Building

↓

Plant

↓

Equipment

↓

Operational Parameter

↓

Reading
```

---

# Functional Components

## 1. Plant Builder

Allows administrators to create plant categories.

Examples:

- Chiller Plant
- Cooling Tower
- Generator Plant
- Boiler Plant
- STP
- Fire Protection
- Water Distribution
- Electrical Distribution
- LPG System
- Solar PV
- Fuel System

Organizations may define additional plant types.

---

## 2. Equipment Registry

Each plant contains one or more equipment items.

Examples:

Generator Plant

- Generator #1
- Generator #2
- Generator #3

Chiller Plant

- Chiller #1
- Chiller #2
- Chiller #3

Each equipment record includes:

- Equipment Code
- Equipment Name
- Manufacturer
- Model
- Capacity
- Location
- Commission Date
- Status

---

## 3. Parameter Builder

Administrators define operational parameters for each equipment type.

Examples:

Generator

- Voltage
- Current
- Frequency
- Oil Pressure
- Water Temperature
- Fuel Level
- Running Hours

Chiller

- Suction Pressure
- Discharge Pressure
- Chilled Water Supply
- Chilled Water Return
- Condenser Water Supply
- Condenser Water Return
- Compressor Current

No programming shall be required to create parameters.

---

## 4. Data Entry

Engineering personnel record operational readings.

Each reading includes:

- Date
- Time
- Shift
- Equipment
- Parameter
- Reading Value
- Unit
- Remarks
- Recorded By

---

## 5. Status Monitoring

Each equipment may display:

- Running
- Standby
- Offline
- Shutdown
- Maintenance
- Alarm

Status colors shall be configurable.

---

## 6. Alarm Management

Operational thresholds may be configured.

Examples:

Normal

Warning

Critical

Alarm generation may occur:

- Manual
- Rule-based
- Future IoT integration

---

## 7. Trend Analysis

Displays:

- Hourly Trends
- Daily Trends
- Weekly Trends
- Monthly Trends
- Yearly Trends

Supports line charts and comparison charts.

---

## 8. Plant Dashboard

Displays:

- Plant Status
- Equipment Availability
- Active Alarms
- Parameter Trends
- Equipment Runtime
- Outstanding Issues

---

## 9. Plant Summary

Displays:

- Number of Plants
- Running Equipment
- Equipment Offline
- Active Alarms
- Critical Conditions
- Average Availability

---

# Supported Plant Types

Examples include:

- Chiller Plant
- Cooling Towers
- Generator Sets
- Electrical Distribution
- Boilers
- Fire Pumps
- Domestic Water
- STP
- WTP
- LPG System
- Fuel System
- Solar PV
- Compressed Air
- Elevators
- Escalators
- HVAC

The system shall not impose limits on plant categories.

---

# Business Rules

- Every plant belongs to one property.
- Every equipment belongs to one plant.
- Every parameter belongs to one equipment type.
- Historical readings shall never be overwritten.
- Parameter templates may be reused across organizations.
- Plants may be enabled or disabled without deleting historical data.

---

# Workflow

```text
Administrator

↓

Create Plant

↓

Register Equipment

↓

Configure Parameters

↓

Assign Users

↓

Daily Data Entry

↓

Review Readings

↓

Detect Abnormalities

↓

Engineering Analysis

↓

Dashboard & Reports

↓

Historical Archive
```

---

# Data Relationships

```text
Property

↓

Plant

↓

Equipment

↓

Parameter

↓

Reading

↓

Alarm

↓

Analytics
```

---

# Integration

Receives:

- User Management
- Organization Structure
- Equipment Registry

Provides:

- Engineering Dashboard
- Utilities Monitoring
- Operations Logbook
- Reports
- Analytics
- Incident Management
- FMIS

---

# Permissions

## Technician

- Enter readings
- View assigned plants

## Supervisor

- Review readings
- Validate data
- Add remarks

## Duty Engineer / Engineering Service Manager

- Monitor plant status
- Review alarms
- Generate reports

## Engineering Manager / Chief Engineer

- Configure plants
- Approve parameter templates
- Review operational performance

## Director of Engineering

- Multi-property operational visibility
- Executive performance dashboards

---

# Non-Functional Requirements

- Mobile-friendly data entry
- Tablet support
- Desktop optimized
- Fast filtering
- Historical trend visualization
- Offline data capture (future)
- API-ready architecture

---

# Future Enhancements

- SCADA Integration
- Building Management System (BMS) Integration
- BACnet Integration
- Modbus Integration
- MQTT Integration
- PLC Connectivity
- IoT Sensors
- Automatic Data Acquisition
- Predictive Operational Analytics
- Digital Twin Integration
- NEX Operational Recommendations

---

# Related Documents

Parent:

- FWIS-ARCH-0000 – Facility Workspace Intelligence System
- FWIS-ARCH-0001 – Functional Architecture

Related:

- FWIS-SPEC-0011 – Utilities Monitoring
- FWIS-SPEC-0002 – Engineering Dashboard
- FWIS-SPEC-0004 – Operations Logbook
- FMIS-SPEC-0001 – Asset Registry

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Plant Operations Functional Specification |