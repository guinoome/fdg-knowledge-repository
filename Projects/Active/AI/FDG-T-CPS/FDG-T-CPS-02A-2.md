# FDG-T-CPS-02A-2.md

# FDGuinoo Trans-CPS Calculator

## Part 02A-2

### Water Source Analysis Module

---

# OBJECTIVE

The Water Source Analysis module establishes the hydraulic characteristics of the available water supply.

Every Transfer Pump and Constant Pressure System calculation shall reference this module.

No pump selection or hydraulic calculation shall proceed unless the selected water source passes validation.

---

# MODULE PURPOSE

This module shall:

* Identify available water sources
* Evaluate source capacity
* Evaluate available pressure
* Evaluate storage
* Determine source reliability
* Calculate available suction conditions
* Identify design limitations
* Generate engineering recommendations

---

# SUPPORTED WATER SOURCES

Support one or multiple water sources.

Examples:

* Municipal Water
* Deep Well
* Shallow Well
* Elevated Tank
* Underground Reservoir
* Ground Storage Tank
* Roof Tank
* Break Tank
* Rainwater Harvesting Tank
* Reclaimed Water Tank
* Surface Water
* River
* Lake
* Custom Source

Multiple sources shall be assignable to one project.

---

# WATER SOURCE MANAGER

Display a table.

Columns:

Source ID

Source Name

Source Type

Primary

Secondary

Capacity

Pressure

Elevation

Status

Reliability

Actions

Users may:

Add

Duplicate

Delete

Disable

Reorder

---

# SOURCE IDENTIFICATION

Each source shall contain:

Source Name

Source Code

Description

Location

Latitude

Longitude

Elevation

Photograph (optional)

Reference Drawing

Remarks

---

# SOURCE CLASSIFICATION

Dropdown:

Municipal

Well

Tank

Reservoir

River

Lake

Treatment Plant

Private Supply

Emergency Supply

Combination

Other

---

# SOURCE STATUS

Available

Temporary

Offline

Maintenance

Future

Emergency

The status shall affect engineering recommendations.

---

# WATER QUALITY

Record:

Potable

Non-Potable

Raw Water

Treated Water

Softened Water

RO Water

Desalinated Water

Greywater

Reclaimed Water

Unknown

Quality notes shall be included in reports.

---

# MUNICIPAL WATER INPUTS

When Municipal Water is selected, collect:

Utility Name

Connection Size

Water Meter Size

Available Pressure

Minimum Pressure

Maximum Pressure

Static Pressure

Residual Pressure

Normal Operating Pressure

Night Pressure

Peak Hour Pressure

Pressure Unit

Pressure Measurement Date

Pressure Test Duration

Pressure Test Method

Reliability Rating

Interruptions Per Month

Average Outage Duration

Pressure Variation Notes

---

# MUNICIPAL WATER ANALYSIS

Automatically determine:

Average Supply Pressure

Pressure Variation

Pressure Stability

Pressure Margin

Suitability for Direct Supply

Need for Booster Pump

Need for Storage Tank

Pressure Classification

Recommendations

---

# WELL INPUTS

Collect:

Well Type

Static Water Level

Dynamic Water Level

Pump Setting Depth

Well Diameter

Yield

Recovery Rate

Maximum Pumping Rate

Drawdown

Water Temperature

Pump Test Date

Well Age

Well Status

---

# WELL ANALYSIS

Automatically calculate:

Available Drawdown

Safe Pumping Capacity

Recovery Ratio

Recommended Pump Intake Elevation

Source Sustainability

---

# STORAGE TANK INPUTS

Support multiple tanks.

Each tank shall contain:

Tank Name

Tank Type

Tank Material

Tank Shape

Tank Diameter

Tank Width

Tank Length

Tank Height

Operating Water Level

Minimum Water Level

Maximum Water Level

Overflow Elevation

Drain Elevation

Freeboard

Foundation Elevation

Roof Elevation

Tank Capacity

Effective Capacity

Dead Storage

Usable Storage

Tank Weight (optional)

---

# STORAGE TANK TYPES

Ground Tank

Roof Tank

Elevated Tank

Underground Tank

Pressure Tank

Break Tank

Sectional Tank

Concrete Tank

Steel Tank

Fiberglass Tank

HDPE Tank

Custom

---

# TANK ANALYSIS

Automatically calculate:

Gross Volume

Effective Volume

Usable Volume

Dead Volume

Water Depth

Available Suction Head

Water Surface Elevation

Hydraulic Grade Line

Reserve Percentage

Storage Utilization

---

# MULTIPLE TANK MANAGEMENT

Support:

Duty Tank

Standby Tank

Parallel Tanks

Series Tanks

Equalization Tanks

Automatic balancing logic shall be configurable in later modules.

---

# SOURCE ELEVATION

For every source:

Elevation Above Sea Level

Water Surface Elevation

Pump Centerline Elevation

Suction Pipe Invert

Discharge Pipe Invert

Overflow Elevation

Drain Elevation

Reference Datum

---

# SUCTION CONDITIONS

Collect:

Flooded Suction

Suction Lift

Variable Water Level

Constant Water Level

Automatically determine the suction condition.

---

# SOURCE RELIABILITY

Assign a rating.

Very High

High

Medium

Low

Very Low

Support optional numerical reliability score:

0 to 100

---

# DAILY AVAILABILITY

Collect:

Hours Available Per Day

Days Available Per Week

Seasonal Restrictions

Maintenance Schedule

Emergency Availability

---

# SOURCE FLOW CAPACITY

Inputs:

Maximum Continuous Flow

Peak Flow

Short-Term Flow

Emergency Flow

Minimum Guaranteed Flow

Average Flow

Units:

L/s

m³/hr

GPM

L/min

---

# SOURCE PRESSURE

Support:

Static Pressure

Residual Pressure

Operating Pressure

Maximum Pressure

Minimum Pressure

Pressure Variation

Pressure Unit

---

# SOURCE TEMPERATURE

Collect:

Average Temperature

Maximum Temperature

Minimum Temperature

Water Density (optional override)

Viscosity (optional)

These values may be referenced in future hydraulic calculations.

---

# SOURCE VALIDATION

Check:

Flow Available

Pressure Available

Storage Capacity

Elevation Data

Mandatory Inputs

Source Status

Quality Classification

Generate engineering warnings.

---

# ENGINEERING WARNINGS

Examples:

Available flow is lower than estimated building demand.

Municipal pressure is insufficient for upper floors.

Tank effective volume is below required reserve.

Well recovery rate is inadequate.

Seasonal availability may affect reliability.

Overflow elevation is below design requirement.

---

# SOURCE COMPARISON

If multiple sources exist:

Display comparison table.

Columns:

Capacity

Pressure

Elevation

Reliability

Storage

Availability

Recommended Usage

Suitability Score

Automatically rank the sources.

---

# SOURCE SELECTION

Allow designation of:

Primary Source

Secondary Source

Emergency Source

Future Source

The selected source shall propagate to downstream calculations.

---

# HYDRAULIC GRADE LINE PREVIEW

Generate a preliminary hydraulic grade line based on:

Source elevation

Water level

Static pressure

This preview will be expanded in later hydraulic modules.

---

# VISUALIZATION

Generate SVG diagrams showing:

Municipal Connection

Storage Tank

Well

Pump Suction

Water Level

Elevation References

Flow Direction

Connection Lines

Users shall be able to zoom and pan.

---

# DASHBOARD SUMMARY

Display:

Selected Source

Available Pressure

Available Flow

Storage Volume

Reliability

Source Elevation

Validation Status

Engineering Recommendation

---

# REPORT CONTENT

Include:

Water Source Summary

Source Properties

Pressure Analysis

Storage Analysis

Reliability Assessment

Source Comparison

Engineering Remarks

Warnings

Recommended Design Basis

---

# EXPORT

Include all source data in:

JSON

PDF

CSV

Engineering Audit Trail

---

# ENGINEERING TRACEABILITY

Every calculated value shall identify:

Input Values

Units

Calculation Method

Timestamp

Module Version

Engineer

---

# MODULE COMPLETION REQUIREMENT

The Water Source Analysis module is complete only when:

* At least one valid water source has been configured.
* Mandatory hydraulic properties have been entered.
* Source validation passes without critical errors.
* A primary water source has been selected.
* Engineering recommendations have been generated.

The dashboard shall update the project completion percentage accordingly.

---

# END OF PART 02A-2

The next document, **FDG-T-CPS-02A-3.md**, will define the **Domestic Water Demand Analysis Module**, including fixture unit calculations, occupancy-based demand estimation, diversity factors, peak demand calculations, storage requirements, hourly demand profiles, and design flow determination. This module will provide the design flow rate used throughout the Transfer Pump and Constant Pressure System calculations.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
