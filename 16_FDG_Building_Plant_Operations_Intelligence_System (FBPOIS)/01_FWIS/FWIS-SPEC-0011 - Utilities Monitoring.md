# FWIS-SPEC-0011
# Facility Workspace Intelligence System (FWIS)
## Utilities Monitoring

**Document ID:** FWIS-SPEC-0011

**System:** FBPOIS

**Subsystem:** Facility Workspace Intelligence System (FWIS)

**Module:** Utilities Monitoring

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

The Utilities Monitoring module provides centralized monitoring, recording, analysis, and allocation of utility consumption across one or more facilities.

It enables engineering teams to monitor utility performance, identify abnormal consumption, allocate costs to business units, and support operational and financial decision-making.

---

# Objectives

The Utilities Monitoring module shall:

- Centralize all utility readings.
- Standardize utility monitoring.
- Track utility consumption trends.
- Allocate utility costs.
- Detect abnormal usage.
- Support sustainability initiatives.
- Supply operational data for analytics.

---

# Scope

This module manages utility monitoring and reporting.

It does not replace accounting or utility billing systems but provides operational engineering data that can integrate with those systems.

---

# Supported Utilities

The platform shall support configurable utility types.

Typical examples include:

- Electricity
- Water
- Diesel
- LPG
- Natural Gas
- Steam
- Chilled Water
- Condensate Water
- Solar PV
- Battery Storage
- Fuel Oil
- Compressed Air

Additional utilities may be created by administrators.

---

# Utility Hierarchy

```text
Organization

↓

Property

↓

Building

↓

Utility Type

↓

Meter

↓

Reading

↓

Consumption

↓

Cost Allocation

↓

Analytics
```

---

# Functional Components

## 1. Utility Type Builder

Administrators define utility categories.

Each utility includes:

- Utility Name
- Symbol
- Unit of Measure
- Default Tariff
- Description
- Status

Examples:

Electricity

kWh

Water

m³

Diesel

Liters

Steam

kg/hr

---

## 2. Meter Registry

Each utility may contain one or more meters.

Examples:

Electricity

Main Meter

Tower 1

Tower 2

Casino

Mall

Kitchen

Solar Export Meter

Water

Domestic Water

Cooling Tower

Irrigation

STP

Each meter contains:

- Meter ID
- Serial Number
- Location
- Building
- Utility Type
- Installation Date
- Status

---

## 3. Reading Entry

Engineering personnel record readings.

Each reading contains:

- Date
- Time
- Meter
- Reading
- Unit
- Shift
- Remarks
- Recorded By

Supports:

- Manual Entry
- CSV Import
- Excel Import
- Future IoT Integration

---

## 4. Consumption Calculation

Automatically calculates:

- Daily Consumption
- Weekly Consumption
- Monthly Consumption
- Annual Consumption

Supports configurable calculation methods.

---

## 5. Billing Allocation

Supports allocation of utility costs to operational areas.

Examples:

Hotel

Casino

Mall

Shared Facilities

Administration

Parking

Convention Center

Other Cost Centers

Allocation methods shall be configurable.

---

## 6. Tariff Management

Supports:

- Multiple utility providers
- Variable tariffs
- Peak rates
- Off-Peak rates
- Seasonal rates
- Time-of-use pricing

Historical tariffs shall be preserved.

---

## 7. Abnormal Consumption Detection

Detects:

- Excessive Consumption
- Sudden Drops
- Meter Failure
- Missing Readings
- Unexpected Trends

Alert thresholds are configurable.

---

## 8. Dashboard

Displays:

- Daily Consumption
- Monthly Consumption
- Utility Cost
- Budget Utilization
- Consumption Trends
- Active Alerts
- Utility KPIs

---

## 9. Sustainability Indicators

Supports monitoring of:

- Energy Intensity
- Water Intensity
- Solar Generation
- Carbon Emissions (Future)
- Renewable Energy Contribution

Supports ESG reporting.

---

# Business Rules

- Every meter belongs to one utility.
- Every meter belongs to one property.
- Historical readings cannot be modified.
- Estimated readings shall be flagged.
- Missing readings generate notifications.
- Cost allocation rules are configurable.

---

# Workflow

```text
Administrator

↓

Create Utility Types

↓

Register Meters

↓

Configure Tariffs

↓

Assign Cost Centers

↓

Record Readings

↓

Calculate Consumption

↓

Allocate Costs

↓

Generate Reports

↓

Historical Archive

↓

Analytics
```

---

# Data Relationships

```text
Utility Type

↓

Meter

↓

Reading

↓

Consumption

↓

Tariff

↓

Cost Allocation

↓

Reports

↓

Analytics
```

---

# Reports

Supports:

- Daily Utility Report
- Weekly Utility Report
- Monthly Utility Report
- Annual Utility Report
- Consumption Trends
- Cost Allocation Report
- Utility KPI Report
- ESG Summary

Exports:

- PDF
- Excel
- CSV

---

# Integration

Receives:

- User Management
- Property Structure
- Meter Registry
- Tariff Data

Provides:

- Engineering Dashboard
- Operations Logbook
- Plant Operations
- Reports
- Analytics
- Power BI
- FMIS
- NEX

---

# Permissions

## Technician

- Enter readings
- View assigned meters

## Supervisor

- Review readings
- Validate consumption

## Duty Engineer / Engineering Service Manager

- Monitor utilities
- Review alerts
- Generate reports

## Engineering Manager / Chief Engineer

- Configure utility structures
- Manage tariffs
- Review cost allocations

## Director of Engineering

- Portfolio utility overview
- Multi-property benchmarking
- Executive dashboards

---

# Non-Functional Requirements

- Mobile data entry
- Desktop optimization
- Historical trend visualization
- Fast reporting
- API-ready
- Offline synchronization (Future)

---

# Future Enhancements

- Smart Meter Integration
- IoT Sensors
- Modbus Integration
- BACnet Integration
- MQTT Integration
- Automatic Meter Reading (AMR)
- Automatic Meter Infrastructure (AMI)
- AI Consumption Forecasting
- Demand Prediction
- Carbon Accounting
- Renewable Energy Optimization
- Utility Benchmarking
- Digital Twin Integration

---

# Related Documents

Parent:

- FBPOIS-ARCH-0000
- FWIS-ARCH-0000
- FWIS-ARCH-0001

Related:

- FWIS-SPEC-0012 – Plant Operations
- FWIS-SPEC-0002 – Engineering Dashboard
- FWIS-SPEC-0004 – Operations Logbook
- FWIS-SPEC-0015 – Analytics

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | Initial Draft | Utilities Monitoring Functional Specification |