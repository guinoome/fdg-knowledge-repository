# FDG-T-CPS-04B.md

# FDGuinoo Trans-CPS Calculator

## Part 04B

### Pump Selection and Performance Analysis Module

### Pump Curves, NPSH Analysis, Affinity Laws and Automatic Pump Recommendation

---

# OBJECTIVE

The Pump Selection and Performance Analysis Module shall select, evaluate, and validate centrifugal pumps based on the hydraulic requirements established by previous modules.

The module shall:

* Evaluate pump operating points
* Compare multiple pump options
* Plot system and pump curves
* Verify operation near the Best Efficiency Point (BEP)
* Perform NPSH analysis
* Evaluate cavitation risk
* Calculate motor loading
* Estimate energy consumption
* Recommend the most suitable pump configuration

The module shall support both transfer pumps and constant pressure booster pumps.

---

# DESIGN INPUTS

Automatically import:

* Design Flow
* Peak Flow
* Future Flow
* Total Dynamic Head (TDH)
* Static Head
* Friction Loss
* Operating Schedule
* Water Temperature
* Water Density
* System Type

These values shall remain editable only with engineering justification.

---

# PUMP DATABASE

The software shall include an editable local pump database.

Each pump record shall contain:

Manufacturer

Series

Model

Impeller Diameter

Speed

Rated Flow

Rated Head

Minimum Flow

Maximum Flow

Best Efficiency Point

Efficiency Curve

NPSHr Curve

Power Curve

Motor Rating

Connection Size

Weight

Dimensions

Pump Type

Seal Type

Bearing Type

Pump Material

Maximum Temperature

Maximum Pressure

Notes

Users shall be able to create custom pump records.

---

# SUPPORTED PUMP TYPES

Horizontal End Suction

Vertical Multistage

Vertical Inline

Split Case

Vertical Turbine

Submersible

Booster Pump

Transfer Pump

Self-Priming Pump

Custom Pump

---

# PUMP CONFIGURATION

Support:

Single Pump

Duty Only

Duty + Standby

Two Pumps Parallel

Three Pumps Parallel

Variable Speed Pumps

Cascade System

Custom Configuration

---

# OPERATING POINT

Automatically determine:

Operating Flow

Operating Head

Operating Efficiency

Operating Power

Operating Speed

Operating Region

Pump Utilization

Display graphically.

---

# BEST EFFICIENCY POINT (BEP)

Calculate:

Distance from BEP

Operating Percentage

Efficiency Margin

Recommended Operating Zone

Display:

Excellent

Acceptable

Marginal

Not Recommended

Generate engineering recommendations if operating away from BEP.

---

# PUMP CURVE GENERATION

Generate interactive pump curves.

Display:

Flow vs Head

Flow vs Efficiency

Flow vs Power

Flow vs NPSHr

Flow vs Speed

Support multiple pump overlays.

---

# SYSTEM CURVE

Automatically generate the system curve.

Components:

Static Head

Pipe Friction

Minor Losses

Pressure Requirement

Future Demand

Overlay the system curve on the selected pump curve.

Automatically determine the operating intersection.

---

# PUMP AFFINITY LAWS

Implement calculations for speed and impeller changes.

Determine:

Adjusted Flow

Adjusted Head

Adjusted Power

Adjusted Efficiency (engineering estimate)

Display formulas and results.

---

# NPSH ANALYSIS

Calculate:

NPSHa

NPSHr

NPSH Margin

Suction Pressure

Vapor Pressure

Velocity Head

Static Suction Head

Friction Loss in Suction Line

Required Margin

Generate pass/fail status.

---

# CAVITATION ANALYSIS

Evaluate:

Low Risk

Moderate Risk

High Risk

Critical Risk

Provide engineering recommendations.

Examples:

Increase suction diameter.

Reduce suction losses.

Lower pump elevation.

Increase source water level.

Select alternate pump.

---

# MOTOR ANALYSIS

Calculate:

Hydraulic Power

Brake Horsepower

Motor Output Power

Motor Input Power

Motor Loading

Service Factor

Power Factor

Current Estimate

Voltage

Efficiency

Recommend standard motor sizes.

---

# ENERGY ANALYSIS

Calculate:

Daily Energy

Monthly Energy

Annual Energy

Peak Demand

Average Load

Operating Cost

Cost per Cubic Meter Pumped

Lifetime Energy Cost

Support user-defined electricity tariffs.

---

# PUMP EFFICIENCY ANALYSIS

Display:

Pump Efficiency

Motor Efficiency

Combined Efficiency

Wire-to-Water Efficiency

Energy Loss Breakdown

Recommendations for efficiency improvements.

---

# REDUNDANCY ANALYSIS

Evaluate:

No Redundancy

Duty + Standby

N+1

2N

Custom

Display operational availability and expected reliability.

---

# LIFE CYCLE ANALYSIS

Estimate:

Annual Operating Hours

Annual Maintenance Hours

Expected Pump Life

Replacement Year

Maintenance Interval

Bearing Replacement

Seal Replacement

Lifecycle Operating Cost

Lifecycle Maintenance Cost

---

# AUTOMATIC PUMP RECOMMENDATION

Rank available pumps using weighted criteria.

Suggested weighting:

30% Hydraulic Match

20% Efficiency

15% NPSH Margin

10% Motor Loading

10% Reliability

10% Future Expansion

5% Lifecycle Cost

The weighting shall be user configurable.

Display the top recommended pumps.

---

# ENGINEERING VALIDATION

Automatically verify:

Flow within operating range.

Head within pump capability.

Operation near BEP.

Adequate NPSH margin.

Motor correctly sized.

Power within rating.

Speed within allowable limits.

Efficiency acceptable.

Future demand supported.

---

# ENGINEERING WARNINGS

Examples:

Pump operating below minimum flow.

Pump operating beyond maximum flow.

Operating point outside preferred efficiency region.

NPSH margin insufficient.

Motor overload predicted.

Pump curve does not intersect system curve.

Future demand exceeds pump capacity.

Impeller trimming recommended.

---

# VISUALIZATION

Generate interactive charts:

Pump Curve

System Curve

Operating Point

Efficiency Curve

Power Curve

NPSH Curve

Energy Consumption

Lifecycle Cost

Redundancy Comparison

All charts shall support zoom, pan, and image export.

---

# SVG EQUIPMENT LAYOUT

Automatically generate a schematic including:

Source

Pump

Motor

Isolation Valve

Check Valve

Pressure Gauge

Flow Meter

Suction Line

Discharge Line

Pressure Sensor

Direction of Flow

Equipment Tags

Support scalable vector export.

---

# DASHBOARD SUMMARY

Display:

Selected Pump

Operating Flow

Operating Head

BEP Percentage

Pump Efficiency

Motor Rating

Annual Energy

Annual Cost

NPSH Margin

Validation Status

---

# REPORT CONTENT

Include:

Pump Selection Summary

Alternative Pump Comparison

Pump Curve

System Curve

Operating Point

NPSH Analysis

Motor Analysis

Energy Analysis

Lifecycle Cost

Engineering Remarks

Warnings

Recommendations

Charts

SVG Schematic

Calculation Traceability

---

# EXPORT

Support:

PDF

JSON

CSV

Pump Schedule

Equipment Schedule

SVG

PNG Charts

---

# ENGINEERING TRACEABILITY

Each selected pump shall retain:

Pump Database Version

Selection Criteria

Calculation Method

Input Values

Calculated Operating Point

Timestamp

Engineer

Software Version

Revision Number

---

# MODULE COMPLETION REQUIREMENT

The Pump Selection and Performance Analysis module is complete only when:

* A pump has been selected or approved.
* The operating point has been validated.
* NPSH analysis passes.
* Motor sizing has been completed.
* Energy analysis has been generated.
* Engineering validation passes without critical errors.
* The selected pump satisfies current and future design requirements.

The approved pump data shall become the governing equipment record for the Equipment Schedule, Cost Estimation, Control System, and Final Engineering Report modules.

---

# END OF PART 04B

The next specification, **FDG-T-CPS-05A.md**, will define the **Equipment Schedule and Material Takeoff Module**, including automatic generation of pump schedules, valve schedules, pipe schedules, instrumentation lists, bill of materials (BOM), quantity takeoffs, editable unit costs, procurement summaries, and integration with the final engineering report.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
