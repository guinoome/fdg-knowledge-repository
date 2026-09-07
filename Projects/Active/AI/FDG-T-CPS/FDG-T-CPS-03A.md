# FDG-T-CPS-03A.md

# FDGuinoo Trans-CPS Calculator

## Part 03A

### Transfer Pump System Module

### Engineering Analysis, Pump Sizing and System Configuration

---

# OBJECTIVE

The Transfer Pump System Module shall perform complete engineering analysis and design of water transfer systems used to convey water between storage facilities.

Typical applications include:

* Underground Tank → Roof Tank
* Underground Tank → Break Tank
* Ground Tank → Elevated Tank
* Ground Tank → Intermediate Tank
* Well → Storage Tank
* Reservoir → Storage Tank
* Municipal Supply → Break Tank
* Multi-Tank Transfer Systems

This module determines the required pump capacity, Total Dynamic Head (TDH), motor power, operating philosophy, and recommended pump configuration.

---

# ENGINEERING DESIGN PHILOSOPHY

The software shall guide the engineer through the following workflow:

```text
Water Source

↓

Destination Tank

↓

Design Flow

↓

Operating Schedule

↓

Static Head

↓

Pipe Layout

↓

Pipe Friction

↓

Minor Losses

↓

TDH

↓

Pump Selection

↓

Motor Selection

↓

Performance Check

↓

Engineering Report
```

Each step shall be completed before proceeding to the next.

---

# TRANSFER PUMP DASHBOARD

Display summary cards:

* Design Flow
* Static Head
* Friction Head
* Minor Losses
* Total Dynamic Head
* Pump Efficiency
* Motor Power
* Pump Speed
* Operating Hours
* Daily Transfer Volume
* Validation Status

Cards update in real time.

---

# SYSTEM CONFIGURATION

Support:

Single Pump

Duty / Standby

Duty / Assist

Two Pumps in Parallel

Three Pumps in Parallel

Variable Speed Pumps

Future Expansion

Custom Configuration

---

# SYSTEM PURPOSE

Select:

Tank Filling

Break Tank Supply

Roof Tank Supply

Pressure Zone Transfer

Well Transfer

Water Treatment Supply

Cooling Tower Makeup

Industrial Process

Custom

Purpose shall be included in reports.

---

# SOURCE TANK

Select from previously defined tanks.

Display:

Tank Name

Water Level

Minimum Level

Maximum Level

Elevation

Effective Volume

Current Volume

Available Water

Overflow Level

Low-Level Alarm

High-Level Alarm

---

# DESTINATION TANK

Select destination.

Display:

Tank Elevation

Operating Level

Overflow Elevation

Maximum Capacity

Effective Capacity

Required Daily Volume

---

# TRANSFER FLOW

The default design flow shall be imported from the Domestic Water Demand module.

Allow override with engineering justification.

Inputs:

Design Flow

Future Flow

Peak Flow

Minimum Flow

Maximum Flow

Flow Unit

Support:

L/s

L/min

m³/hr

GPM

---

# OPERATING SCHEDULE

Allow:

Continuous

Intermittent

Time Schedule

Level Controlled

Manual

Demand Controlled

User Defined

---

# DAILY OPERATION

Inputs:

Operating Hours Per Day

Starts Per Hour

Maximum Starts Per Day

Pump Rotation Interval

Maintenance Interval

Expected Life

Automatically determine:

Daily Pump Runtime

Transfer Duration

Average Operating Load

---

# SOURCE WATER LEVEL

Collect:

Lowest Water Level

Normal Water Level

Maximum Water Level

Emergency Water Level

Reference Elevation

---

# DESTINATION WATER LEVEL

Collect:

Minimum Operating Level

Normal Operating Level

Maximum Operating Level

Overflow Level

Reference Elevation

---

# STATIC HEAD

Automatically calculate:

Static Suction Head

Static Discharge Head

Net Static Head

Vertical Lift

Elevation Difference

Display:

Formula

Variables

Substitution

Intermediate Steps

Final Result

Engineering Remarks

---

# PIPE ROUTING

Collect:

Horizontal Length

Vertical Length

Equivalent Length

Number of Bends

Valves

Reducers

Tees

Flexible Connectors

Expansion Joints

Future modules will use these values for detailed hydraulic calculations.

---

# PIPE MATERIAL

Selectable:

Carbon Steel

GI

HDPE

PVC

CPVC

Copper

Stainless Steel

Ductile Iron

Custom

Material properties shall automatically populate default roughness values.

---

# PIPE DIAMETER

Support:

Nominal Diameter

Inside Diameter

Outside Diameter

Schedule

Pressure Rating

The detailed pipe sizing engine will be implemented later.

---

# FRICTION LOSS

This module shall calculate preliminary friction losses.

Inputs:

Pipe Length

Flow Rate

Pipe Diameter

Roughness

Method

Selectable methods:

Hazen-Williams

Darcy-Weisbach

User Defined

Results:

Friction Loss

Head Loss per 100 m

Total Pipe Head Loss

---

# MINOR LOSSES

Support:

Gate Valve

Globe Valve

Butterfly Valve

Check Valve

Foot Valve

Y-Strainer

Basket Strainer

Elbows

Reducers

Tees

Expansion Joint

Custom K Factor

Calculate:

Total Minor Loss

Equivalent Pipe Length

Minor Head Loss

---

# TOTAL DYNAMIC HEAD

Automatically calculate:

TDH

=

Static Head

*

Pipe Friction

*

Minor Losses

*

Safety Margin

Allow user-defined safety margin.

Default:

10%

Display complete derivation.

---

# PUMP OPERATING POINT

Determine:

Required Flow

Required Head

Operating Point

Pump Utilization

Safety Margin

Operating Region

Display graphically on the future pump curve.

---

# PUMP SPEED

Support:

1450 RPM

1750 RPM

2900 RPM

3500 RPM

Variable Speed

Custom

---

# PUMP EFFICIENCY

Inputs:

Manufacturer Efficiency

Estimated Efficiency

User Override

Automatically calculate:

Hydraulic Power

Brake Power

Motor Power

Input Power

Overall Efficiency

---

# MOTOR SELECTION

Support:

Single Phase

Three Phase

Diesel Engine

Custom Driver

Inputs:

Voltage

Frequency

Power Factor

Motor Efficiency

Service Factor

Automatically recommend:

Motor Rating

Minimum HP

Minimum kW

Next Standard Motor Size

---

# DUTY/STANDBY CONFIGURATION

Support:

1 Duty

1 Duty + 1 Standby

2 Duty + 1 Standby

Duty Rotation

Automatic Alternation

Failure Transfer

Runtime Balancing

Generate operating sequence diagrams.

---

# CONTROL STRATEGY

Selectable:

Float Switch

Level Transmitter

Pressure Switch

PLC

SCADA

Manual

Timer

Hybrid

Display logic summary in reports.

---

# ENGINEERING CHECKS

Automatically verify:

Pump Flow > Design Flow

Pump Head > TDH

Motor Size Adequate

Runtime Acceptable

Tank Filling Time Acceptable

Maximum Starts Per Hour

Safety Margin

Generate pass/fail indicators.

---

# ENGINEERING WARNINGS

Examples:

Pump oversized by more than 25%.

Pump undersized.

Motor overload.

Excessive friction loss.

Static head unusually high.

Operating time exceeds schedule.

Pump efficiency below target.

Duty cycle exceeds recommended value.

---

# VISUALIZATION

Generate:

Flow Diagram

Pump System Schematic

Head Distribution Chart

TDH Breakdown Chart

Daily Runtime Chart

Energy Distribution Chart

Pump Operating Summary

---

# SVG SYSTEM DIAGRAM

Automatically draw:

Source Tank

Transfer Pump

Isolation Valves

Check Valve

Flow Meter

Discharge Pipe

Destination Tank

Flow Direction

Elevation References

Equipment Labels

The drawing shall scale automatically.

---

# REPORT CONTENT

Include:

Design Basis

Pump Configuration

Design Flow

Static Head

Pipe Summary

Minor Loss Summary

TDH Calculation

Pump Duty

Motor Selection

Control Strategy

Engineering Remarks

Warnings

Recommendations

SVG Diagram

Charts

Calculation Traceability

---

# EXPORT

Support:

JSON

CSV

PDF

PNG Charts

SVG Drawing

---

# TRACEABILITY

Every result shall store:

Calculation Timestamp

Formula Version

Input Values

Selected Method

Engineer

Revision

Software Version

---

# MODULE COMPLETION REQUIREMENT

The Transfer Pump System module is complete only when:

* A valid source and destination have been selected.
* Design flow has been confirmed.
* Static head has been calculated.
* Preliminary friction and minor losses have been determined.
* TDH has been calculated.
* Pump and motor sizing have been completed.
* All engineering validation checks pass without critical errors.

The resulting **Design Flow** and **Total Dynamic Head (TDH)** shall become the governing inputs for the subsequent **Pump Selection**, **Pipe Sizing**, and **Constant Pressure System** modules.

---

# END OF PART 03A

The next document, **FDG-T-CPS-03B.md**, will define the **Constant Pressure System (CPS) Module**, including pressure zone design, VFD control logic, pressure vessel sizing, pressure sensor placement, multi-pump sequencing, PID control concepts, minimum and maximum operating pressures, and complete engineering calculations for constant pressure booster systems.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
