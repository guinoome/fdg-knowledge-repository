# FDG-T-CPS-03B.md

# FDGuinoo Trans-CPS Calculator

## Part 03B

### Constant Pressure System (CPS) Module

### Booster Pump, Variable Frequency Drive (VFD), Pressure Vessel and Control System Design

---

# OBJECTIVE

The Constant Pressure System (CPS) Module shall perform the complete engineering design of domestic water booster systems that maintain a constant discharge pressure regardless of varying building demand.

The module shall determine:

* Required Booster Pump Capacity
* Required System Pressure
* Pressure Zones
* Pressure Vessel Sizing
* VFD Control Parameters
* Pump Sequencing
* Duty/Standby Logic
* System Efficiency
* Operating Curves
* Energy Consumption
* System Validation

The CPS module shall utilize outputs from:

* Project Information
* Building Information
* Water Source Analysis
* Domestic Water Demand Analysis
* Transfer Pump System

---

# ENGINEERING DESIGN PHILOSOPHY

Follow this workflow:

```text
Building Data

↓

Demand Analysis

↓

Pressure Zone Design

↓

Required Residual Pressure

↓

Static Head

↓

Pipe Losses

↓

Required Booster Head

↓

Pump Selection

↓

Pressure Vessel

↓

VFD Design

↓

Control Logic

↓

Energy Analysis

↓

Engineering Validation

↓

Final Report
```

Every stage shall be visible to the engineer.

---

# MODULE DASHBOARD

Display engineering summary cards.

Required cards:

Design Flow

Required Pressure

Residual Pressure

Static Head

Dynamic Head

Total Booster Head

Selected Pump

Pressure Vessel Size

VFD Status

Estimated Energy Use

Validation Status

---

# SYSTEM CONFIGURATION

Support:

Single Pump

1 Duty + 1 Standby

2 Duty

2 Duty + 1 Standby

3 Duty

3 Duty + 1 Standby

Parallel Pumps

Variable Speed Pumps

Future Expansion

Custom Configuration

---

# BOOSTER SYSTEM PURPOSE

Selectable:

Domestic Water

Domestic + Hot Water

High Rise

Pressure Zone

Hotel

Hospital

Industrial

Commercial

Mixed Use

Custom

Purpose shall appear in engineering reports.

---

# PRESSURE ZONE DESIGN

Support multiple pressure zones.

Each zone shall contain:

Zone Name

Lowest Fixture Elevation

Highest Fixture Elevation

Static Head

Required Pressure

Maximum Pressure

Pressure Reducing Valve Required

Zone Pump

Zone Tank

Remarks

Unlimited pressure zones shall be supported.

---

# BUILDING HEIGHT ANALYSIS

Automatically determine:

Lowest Fixture Elevation

Highest Fixture Elevation

Highest Demand Point

Highest Mechanical Equipment

Roof Equipment

Pressure Zone Boundaries

---

# REQUIRED PRESSURE

Collect:

Minimum Fixture Pressure

Preferred Fixture Pressure

Maximum System Pressure

Pressure Unit

Residual Pressure

Pressure Margin

Support:

kPa

bar

psi

mH₂O

ftH₂O

---

# STATIC HEAD

Automatically calculate:

Pump Centerline Elevation

Highest Fixture Elevation

Vertical Lift

Static Discharge Head

Static Suction Head

Net Static Head

Display complete engineering calculation.

---

# PIPE LOSSES

Import from Pipe Network module when available.

Until then, calculate preliminary values using:

Pipe Length

Pipe Material

Pipe Diameter

Flow Rate

Equivalent Length

Minor Losses

Safety Margin

---

# BOOSTER HEAD

Automatically determine:

Booster Head

=

Static Head

*

Pipe Friction

*

Residual Pressure

*

Minor Losses

*

Safety Margin

Display every calculation step.

---

# PRESSURE VESSEL

Support:

Diaphragm Tank

Bladder Tank

Hydropneumatic Tank

Composite Tank

Steel Tank

Custom Tank

---

# PRESSURE VESSEL INPUTS

Collect:

Pre-Charge Pressure

Cut-In Pressure

Cut-Out Pressure

Maximum Pressure

Minimum Pressure

Acceptance Volume

Tank Volume

Tank Material

Safety Valve Pressure

Design Temperature

---

# PRESSURE VESSEL CALCULATIONS

Automatically calculate:

Acceptance Volume

Drawdown Volume

Minimum Tank Size

Recommended Tank Size

Operating Pressure Range

Air Volume

Water Volume

Expansion Margin

Pressure Cycling Rate

Generate engineering recommendations.

---

# VFD SYSTEM

Support:

Single VFD

Multiple VFD

Master-Follower

Cascade Control

Custom

---

# VFD INPUTS

Manufacturer

Model

Rated Power

Rated Voltage

Frequency

Minimum Speed

Maximum Speed

Acceleration Time

Deceleration Time

Motor Efficiency

Power Factor

---

# VFD CALCULATIONS

Calculate:

Operating Speed

Motor Frequency

Estimated Power

Energy Savings

Pump Speed Ratio

Affinity Law Adjustment

Flow Ratio

Head Ratio

Power Ratio

Support visualization using pump affinity laws.

---

# PID CONTROL

Configure:

Proportional Gain

Integral Gain

Derivative Gain

Pressure Setpoint

Pressure Deadband

Sampling Interval

Maximum Speed

Minimum Speed

Alarm Delay

Display recommended initial settings with the ability to modify them.

---

# PRESSURE SENSOR

Collect:

Sensor Location

Pressure Range

Accuracy

Calibration Date

Output Type

4-20 mA

0-10 V

Digital

Wireless

Provide recommendations for sensor placement.

---

# CONTROL LOGIC

Support:

Pressure Control

Flow Control

Tank Level Control

Time Schedule

Manual Override

Automatic Rotation

Lead-Lag Control

Emergency Mode

Maintenance Mode

Generate a sequence of operation summary for reports.

---

# PUMP SEQUENCING

Automatically generate logic for:

Lead Pump

Lag Pump

Standby Pump

Alternating Operation

Failure Detection

Automatic Restart

Low Pressure Alarm

High Pressure Alarm

Emergency Shutdown

---

# ENERGY ANALYSIS

Collect:

Operating Hours

Electricity Cost

Motor Efficiency

Pump Efficiency

Demand Profile

Calculate:

Daily Energy

Monthly Energy

Annual Energy

Annual Operating Cost

Specific Energy Consumption

Cost Per Cubic Meter

Projected Lifetime Cost

---

# ENGINEERING CHECKS

Verify:

Pressure exceeds minimum requirement.

Pressure below maximum allowable.

Pump operates within preferred efficiency region.

Pressure vessel size is adequate.

VFD operating speed remains within limits.

Motor loading is acceptable.

Pressure fluctuations remain within allowable limits.

---

# ENGINEERING WARNINGS

Examples:

Residual pressure below requirement.

Maximum pressure exceeds system rating.

Pressure vessel undersized.

Excessive pump cycling expected.

Pump efficiency below target.

VFD minimum speed too low.

Motor overload predicted.

Pressure sensor range insufficient.

---

# VISUALIZATION

Generate:

Pressure Profile

Pressure Zone Diagram

Pump Speed Curve

System Head Curve

Energy Consumption Chart

Daily Pressure Variation

VFD Speed Profile

Pressure Vessel Operating Range

All charts shall update immediately after input changes.

---

# SVG SYSTEM DIAGRAM

Automatically generate:

Water Source

Transfer Pump

Ground Tank

Booster Pump

Pressure Vessel

Isolation Valves

Check Valve

Pressure Sensor

Flow Meter

Pressure Zones

Highest Fixture

Direction of Flow

Equipment Labels

The drawing shall support zoom and pan.

---

# REPORT CONTENT

Include:

System Description

Pressure Zone Summary

Pressure Calculations

Booster Head Calculation

Pressure Vessel Calculation

VFD Design Summary

Control Strategy

Pump Sequencing

Energy Analysis

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

PNG Charts

SVG Diagram

---

# ENGINEERING TRACEABILITY

Each calculation shall include:

Formula

Variables

Units

Input Values

Intermediate Results

Final Result

Timestamp

Engineer

Calculation Version

---

# MODULE COMPLETION REQUIREMENT

The Constant Pressure System module is complete only when:

* Pressure zones have been defined.
* Required booster pressure has been established.
* Booster head has been calculated.
* Pressure vessel sizing has been completed.
* VFD parameters have been configured.
* Pump sequencing has been generated.
* Engineering validation passes without critical errors.

The calculated **Booster Flow** and **Booster Head** shall become the governing inputs for the detailed **Pump Selection**, **Hydraulic Network**, and **Pipe Sizing** modules.

---

# END OF PART 03B

The next document, **FDG-T-CPS-04A.md**, will define the **Hydraulic Calculation and Pipe Network Module**, including Hazen-Williams and Darcy-Weisbach calculations, equivalent lengths, minor losses, velocity checks, pressure loss analysis, looped and branched networks, and complete hydraulic calculation traceability suitable for engineering reports.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
