# FDG-T-CPS-04A.md

# FDGuinoo Trans-CPS Calculator

## Part 04A

### Hydraulic Calculation and Pipe Network Module

### Complete Hydraulic Analysis, Pipe Sizing and Pressure Loss Calculations

---

# OBJECTIVE

The Hydraulic Calculation and Pipe Network Module shall perform comprehensive hydraulic analysis for domestic water transfer and constant pressure systems.

This module shall calculate:

* Pipe Flow Distribution
* Water Velocity
* Friction Loss
* Minor Losses
* Static Head
* Dynamic Head
* Total Head Loss
* Pressure Distribution
* Hydraulic Grade Line (HGL)
* Energy Grade Line (EGL)
* Node Pressures
* Pipe Sizing Verification

This module forms the core hydraulic engine used throughout the application.

---

# ENGINEERING DESIGN PHILOSOPHY

The hydraulic workflow shall follow:

```text
Project Data
        ↓
Design Flow
        ↓
Pipe Network Layout
        ↓
Pipe Material
        ↓
Pipe Diameter
        ↓
Velocity Analysis
        ↓
Friction Loss
        ↓
Minor Losses
        ↓
Node Pressure
        ↓
Hydraulic Grade Line
        ↓
Engineering Validation
        ↓
Report Generation
```

Every intermediate calculation shall remain visible.

---

# SUPPORTED NETWORK TYPES

The software shall support:

Single Pipe

Branched Network

Looped Network

Grid Network

Parallel Pipes

Series Pipes

Pressure Zones

Multiple Pump Systems

Multiple Storage Tanks

Hybrid Networks

---

# PIPE NETWORK MANAGER

Display an editable network table.

Columns:

Pipe ID

From Node

To Node

Pipe Length

Equivalent Length

Diameter

Material

Schedule

Flow

Velocity

Head Loss

Pressure Drop

Status

Remarks

Support:

Add

Delete

Duplicate

Sort

Search

Filter

---

# NODE MANAGER

Each node shall contain:

Node ID

Description

Elevation

Demand

Pressure

Residual Pressure

Flow

Temperature (optional)

Remarks

Automatically assign node numbers.

---

# PIPE INFORMATION

Each pipe segment shall contain:

Pipe ID

Description

Pipe Material

Nominal Diameter

Internal Diameter

Outside Diameter

Pipe Schedule

Pressure Rating

Pipe Class

Pipe Length

Equivalent Length

Insulation (optional)

Buried / Exposed

Installation Method

Pipe Age (optional)

---

# PIPE MATERIAL DATABASE

Include default engineering properties.

Examples:

Carbon Steel

Black Steel

Galvanized Iron

Copper

PVC

CPVC

HDPE

PPR

Stainless Steel

Ductile Iron

Concrete

Custom

Each material shall include:

Default Hazen-Williams C

Absolute Roughness

Maximum Velocity Recommendation

Pressure Rating

Temperature Limit

---

# PIPE DIAMETER DATABASE

Provide standard nominal sizes.

Metric:

15 mm

20 mm

25 mm

32 mm

40 mm

50 mm

65 mm

80 mm

100 mm

125 mm

150 mm

200 mm

250 mm

300 mm

Imperial sizes shall also be supported.

---

# FLOW INPUT

Support:

Automatic Flow Assignment

Manual Flow Assignment

Demand-Based Distribution

Balanced Distribution

Custom Distribution

Flow units:

L/s

L/min

m³/hr

GPM

---

# HYDRAULIC METHODS

Provide selectable calculation methods.

Primary:

Hazen-Williams

Secondary:

Darcy-Weisbach

Future-ready:

Manning Equation

User Defined

The selected method shall apply globally or per pipe.

---

# HAZEN-WILLIAMS CALCULATION

Implement complete engineering calculations.

Display:

Equation

Variable Definitions

Substitution

Intermediate Values

Final Head Loss

Allow editing of C-factor.

---

# DARCY-WEISBACH CALCULATION

Implement:

Reynolds Number

Relative Roughness

Friction Factor

Head Loss

Support:

Laminar Flow

Transitional Flow

Turbulent Flow

Automatically determine flow regime.

---

# VELOCITY ANALYSIS

Automatically calculate:

Water Velocity

Recommended Velocity

Maximum Velocity

Minimum Velocity

Velocity Ratio

Display engineering recommendations.

---

# RECOMMENDED VELOCITY LIMITS

Allow user customization.

Suggested defaults:

Transfer Systems

0.6 to 2.5 m/s

Booster Systems

0.9 to 3.0 m/s

Branch Pipes

0.6 to 2.0 m/s

Service Connections

0.6 to 1.8 m/s

Highlight values outside the selected limits.

---

# MINOR LOSSES

Support K-factor calculations for:

90° Elbow

45° Elbow

Long Radius Elbow

Gate Valve

Globe Valve

Butterfly Valve

Check Valve

Swing Check Valve

Foot Valve

Ball Valve

Y-Strainer

Basket Strainer

Reducer

Expander

Tee (Run)

Tee (Branch)

Cross

Flexible Connector

Expansion Joint

Custom Component

Automatically compute:

Total K

Equivalent Length

Minor Head Loss

---

# EQUIVALENT LENGTH DATABASE

Provide editable default values for fittings.

Allow engineers to override manufacturer data.

Store custom fitting libraries within project settings.

---

# PRESSURE CALCULATIONS

Determine:

Static Pressure

Dynamic Pressure

Residual Pressure

Available Pressure

Pressure Drop

Pressure at Every Node

Pressure Margin

---

# HYDRAULIC GRADE LINE (HGL)

Automatically generate:

Elevation Profile

Hydraulic Grade Line

Pressure Head

Static Head

Dynamic Head

Residual Head

Display graphically.

---

# ENERGY GRADE LINE (EGL)

Generate:

Velocity Head

Pressure Head

Elevation Head

Total Energy Line

Display together with HGL.

---

# PIPE SIZING ASSISTANT

Provide automatic sizing suggestions.

Evaluation criteria:

Velocity

Pressure Drop

Available Pressure

Future Expansion

Economic Diameter

User Preference

Display:

Current Size

Recommended Size

Reason for Recommendation

---

# PIPE VALIDATION

Automatically check:

Negative Flow

Reverse Flow

Zero Diameter

Invalid Material

Excessive Velocity

Excessive Pressure Loss

Pipe Pressure Rating

Missing Connections

Disconnected Network

Duplicate Pipe IDs

Orphan Nodes

---

# NETWORK CONTINUITY

Verify:

Every node connected

No isolated sections

Source connected

Demand nodes supplied

Pressure path exists

Generate warnings for topology errors.

---

# ENGINEERING WARNINGS

Examples:

Velocity exceeds recommended limit.

Pressure loss exceeds allowable value.

Pipe diameter appears undersized.

Pipe diameter appears oversized.

Disconnected node detected.

Pressure below required residual pressure.

Flow direction inconsistency.

Potential water hammer risk due to high velocity.

---

# HYDRAULIC VISUALIZATION

Generate interactive charts.

Required charts:

Velocity Distribution

Pressure Distribution

Head Loss Breakdown

Pipe Diameter Distribution

Flow Distribution

Material Distribution

Energy Loss Distribution

---

# SVG PIPE NETWORK

Automatically draw:

Source

Pumps

Nodes

Pipe Segments

Valves

Flow Direction

Pressure Labels

Elevation Labels

Pipe Sizes

Node Numbers

Support:

Zoom

Pan

Auto Layout

Manual Dragging

Print-friendly export

---

# DASHBOARD SUMMARY

Display:

Total Pipe Length

Average Velocity

Maximum Velocity

Total Head Loss

Highest Pressure

Lowest Pressure

Largest Pipe

Smallest Pipe

Validation Status

---

# REPORT CONTENT

Include:

Pipe Schedule

Node Schedule

Hydraulic Method

Velocity Analysis

Pressure Analysis

Head Loss Tables

Minor Loss Tables

Pipe Material Summary

Engineering Remarks

Warnings

Recommendations

Charts

SVG Network Diagram

Calculation Traceability

---

# EXPORT

Support:

PDF

JSON

CSV

Pipe Schedule

Node Schedule

SVG

PNG Charts

---

# ENGINEERING TRACEABILITY

For every pipe segment record:

Calculation Method

Formula Used

Input Values

Intermediate Values

Final Result

Timestamp

Engineer

Software Version

---

# MODULE COMPLETION REQUIREMENT

The Hydraulic Calculation and Pipe Network module is complete only when:

* All pipe segments are connected.
* Flow distribution has been established.
* Head losses have been calculated.
* Node pressures have been determined.
* Hydraulic Grade Line has been generated.
* Pipe sizing validation passes without critical errors.
* All hydraulic calculations are fully traceable.

The validated hydraulic network shall provide the governing pressure losses and flow characteristics for the Pump Selection, Energy Analysis, Equipment Schedule, and Final Engineering Report modules.

---

# END OF PART 04A

The next specification, **FDG-T-CPS-04B.md**, will define the **Pump Selection and Performance Analysis Module**, including manufacturer pump databases, pump affinity laws, Best Efficiency Point (BEP), NPSH calculations, cavitation assessment, pump curve generation, system curve plotting, operating point determination, and automatic pump recommendation based on the calculated system requirements.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
