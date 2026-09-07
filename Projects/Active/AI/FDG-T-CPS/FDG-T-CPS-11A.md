# FDG-T-CPS-11A.md

# FDGuinoo Trans-CPS Calculator

## Part 11A

### Manufacturer Database Framework

### Pumps, Motors, Pressure Vessels, Pipes, Valves, Instruments, Tanks and Equipment Libraries

---

# OBJECTIVE

The Manufacturer Database Framework shall provide an extensible equipment library for engineering design.

Instead of relying on fixed example data, the application shall maintain structured databases that engineers can update, expand, and customize without modifying the calculation engine.

The framework shall support:

* Manufacturer databases
* Product libraries
* Equipment specifications
* Performance curves
* Material properties
* Version control
* Local storage
* Project-specific equipment

---

# DATABASE DESIGN PRINCIPLES

The database shall be:

Offline

Version Controlled

Searchable

Filterable

Editable

Importable

Exportable

Expandable

The engineering calculation engine shall retrieve data only through the database interface.

---

# SUPPORTED EQUIPMENT

Pump

Motor

Pressure Vessel

Storage Tank

Valve

Pipe

Pipe Fitting

Flow Meter

Pressure Gauge

Pressure Transmitter

Pressure Switch

Level Sensor

Float Valve

Control Valve

Check Valve

Expansion Joint

Flexible Connector

Strainer

Control Panel

Variable Frequency Drive

Custom Equipment

---

# MANUFACTURER LIBRARY

Each manufacturer shall contain:

Manufacturer Name

Country

Website

Support Contact

Product Categories

Revision

Date Added

Status

Notes

The framework shall allow multiple manufacturers for the same equipment category.

---

# PUMP DATABASE

Each pump record shall include:

Manufacturer

Series

Model

Pump Type

Rated Flow

Rated Head

Best Efficiency Point

Efficiency Curve

Power Curve

NPSHr Curve

Speed

Impeller Diameter

Connection Size

Material

Seal Type

Bearing Type

Maximum Temperature

Maximum Pressure

Motor Compatibility

Dimensions

Weight

Technical Notes

Performance Curve Data

Revision

---

# PERFORMANCE CURVE STORAGE

Store pump curves as numerical datasets.

Required datasets:

Flow vs Head

Flow vs Efficiency

Flow vs Power

Flow vs NPSHr

Flow vs Speed (optional)

Support multiple impeller diameters.

The application shall interpolate values between data points.

---

# MOTOR DATABASE

Each motor shall include:

Manufacturer

Model

Power

Voltage

Frequency

Phase

RPM

Efficiency

Power Factor

Frame

Enclosure

Protection Class

Starting Method

VFD Compatibility

Weight

Dimensions

Revision

---

# PRESSURE VESSEL DATABASE

Store:

Manufacturer

Model

Acceptance Volume

Total Volume

Maximum Pressure

Precharge Pressure

Material

Diameter

Height

Weight

Connection Size

Certification

Revision

---

# PIPE DATABASE

Each pipe record shall include:

Material

Manufacturer

Nominal Diameter

Internal Diameter

Outside Diameter

Schedule

Pressure Rating

Temperature Rating

Hazen-Williams C

Absolute Roughness

Weight

Standard Length

Revision

---

# VALVE DATABASE

Store:

Valve Type

Manufacturer

Model

Pressure Rating

Connection

Body Material

Trim Material

Face-to-Face Dimension

Weight

Flow Coefficient (Cv or Kv)

Revision

---

# FITTING DATABASE

Each fitting shall include:

Type

Material

Nominal Diameter

Equivalent Length

Minor Loss Coefficient (K)

Pressure Rating

Revision

---

# INSTRUMENT DATABASE

Support:

Pressure Gauge

Pressure Transmitter

Pressure Switch

Flow Meter

Temperature Sensor

Level Sensor

Each record shall include:

Range

Accuracy

Signal Type

Power Supply

Connection Size

Ingress Protection

Revision

---

# STORAGE FORMAT

The master equipment library shall use structured JSON.

Example:

```text id="l6s3ur"
manufacturers/

pump/

motor/

pipe/

valve/

tank/

instrument/
```

Each category shall be independently versioned.

---

# SEARCH ENGINE

Provide instant search by:

Manufacturer

Model

Capacity

Flow

Pressure

Power

Diameter

Material

Tag

Keyword

Support fuzzy matching.

---

# FILTERING

Allow filtering by:

Manufacturer

Capacity

Flow Range

Head Range

Power Range

Pressure Rating

Pipe Diameter

Material

Certification

Country

---

# FAVORITES

Allow engineers to:

Favorite equipment

Pin frequently used products

Create preferred manufacturer lists

Create office standard equipment lists

---

# CUSTOM EQUIPMENT

Users shall be able to create project-specific equipment records.

Custom records shall:

Not overwrite master libraries

Remain editable

Be exportable with the project

Be identifiable as custom entries

---

# VERSION CONTROL

Every equipment record shall include:

Record Version

Created By

Date Created

Last Modified

Revision Notes

Source

Deprecated Status

---

# IMPORT

Support importing:

Manufacturer JSON

CSV

Spreadsheet-converted JSON

Project Equipment

Merged Libraries

Schema validation shall occur before import.

---

# EXPORT

Support exporting:

Entire Library

Selected Categories

Manufacturer Data

Project Equipment

JSON

CSV

---

# DUPLICATE DETECTION

Automatically detect:

Duplicate Models

Duplicate Manufacturers

Conflicting Revisions

Missing Required Fields

Invalid Capacities

Display merge recommendations.

---

# EQUIPMENT COMPARISON

Allow side-by-side comparison.

Compare:

Capacity

Efficiency

Power

Weight

Dimensions

Pressure Rating

Lifecycle Cost

Availability

Notes

---

# PROJECT SNAPSHOT

When a project is saved:

Store a snapshot of the equipment used.

Future library updates shall not change historical project calculations unless the engineer explicitly updates the selected equipment.

---

# ENGINEERING TRACEABILITY

Every selected equipment item shall record:

Database Version

Manufacturer

Model

Revision

Selection Date

Engineer

Project UUID

---

# MODULE COMPLETION REQUIREMENT

The Manufacturer Database Framework is complete only when:

* Equipment can be searched and filtered.
* Custom equipment can be created.
* Product revisions are tracked.
* Historical projects preserve selected equipment versions.
* Performance curve datasets are available for supported pump models.
* All equipment records integrate with the calculation, validation, and reporting engines.

---

# END OF PART 11A

## Phase 3 Recommendation

The next document should be **FDG-T-CPS-11B.md: Advanced Interactive SVG Engineering Workspace**, which would define a drag-and-drop schematic editor where engineers can place tanks, pumps, valves, pipes, sensors, and instruments on a canvas. The schematic would remain synchronized with the calculation engine, allowing changes in the drawing to update calculations and changes in calculations to update the drawing. This would transform the application from a calculator into an integrated engineering design environment.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
