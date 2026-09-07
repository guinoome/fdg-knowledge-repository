# FDG-T-CPS-08B.md

# FDGuinoo Trans-CPS Calculator

## Part 08B

### Engineering Standards, Validation Library, Design Criteria, and Code Compliance Framework

---

# OBJECTIVE

This document establishes the engineering rules, validation logic, and standards framework used throughout the FDGuinoo Trans-CPS Calculator.

Unlike the Formula Library, which defines **how calculations are performed**, this document defines **whether the calculated design is acceptable** according to the selected engineering standard and project criteria.

The application shall separate:

* Engineering calculations
* Engineering validation
* Engineering recommendations

This separation allows future updates to standards without modifying the calculation engine.

---

# STANDARDS FRAMEWORK

The software shall support configurable design standards.

Examples include:

* Philippine National Plumbing Code (NPCP)
* International Plumbing Code (IPC)
* Uniform Plumbing Code (UPC)
* ASPE Design Guidance
* Local Water Utility Requirements
* Owner Engineering Standards
* User Defined Standard

The application shall allow the engineer to select one or more standards as the project basis.

The software shall **not** hard-code proprietary or copyrighted standard text. Instead, it shall store configurable engineering criteria and references.

---

# VALIDATION ENGINE ARCHITECTURE

Every validation rule shall contain:

Validation ID

Validation Name

Module

Engineering Category

Severity

Input Variable

Comparison Rule

Reference Value

Engineering Recommendation

Applicable Standard

Status

Timestamp

---

# VALIDATION LEVELS

Support five validation levels.

PASS

Information

Warning

Major Warning

Critical Failure

Each level shall have a unique icon and color.

---

# VALIDATION CATEGORIES

Organize validation rules into:

General Project

Water Source

Domestic Water Demand

Transfer Pump

Constant Pressure System

Hydraulic Network

Pump Selection

Pressure Vessel

Storage Tank

Equipment Schedule

Material Takeoff

Report Generation

---

# UNIT VALIDATION

The application shall verify that all calculations use consistent units.

Checks include:

Length

Flow

Pressure

Head

Velocity

Power

Volume

Mass

Temperature

Mixed unit calculations shall be automatically converted before execution.

---

# FLOW VALIDATION

Recommended configurable ranges:

Transfer Pumps

Minimum:

0.30 L/s

Maximum:

User Defined

Booster Systems

Minimum:

0.20 L/s

Maximum:

User Defined

The application shall warn when flow values are outside expected engineering ranges.

---

# VELOCITY VALIDATION

Provide configurable recommended limits.

Suggested defaults:

Transfer Main

0.60 to 2.50 m/s

Booster Main

0.90 to 3.00 m/s

Branch Lines

0.60 to 2.00 m/s

Service Connections

0.60 to 1.80 m/s

Above the configured limit:

Generate warning.

Above a critical threshold:

Generate critical validation failure.

The user may override with engineering justification.

---

# PRESSURE VALIDATION

Check:

Negative pressure

Residual pressure

Maximum allowable pressure

Minimum fixture pressure

Pressure zone differential

Pressure vessel limits

Static pressure

Dynamic pressure

All limits shall be editable within project settings.

---

# STATIC HEAD VALIDATION

Verify:

Static head is physically reasonable.

Elevation references are consistent.

Source elevation exists.

Destination elevation exists.

Overflow elevation is logical.

Water surface elevation is valid.

---

# PIPE VALIDATION

Verify:

Pipe diameter selected.

Material assigned.

Length greater than zero.

Pressure rating assigned.

Velocity acceptable.

Pressure loss acceptable.

No duplicate pipe IDs.

No disconnected segments.

---

# FRICTION LOSS VALIDATION

Evaluate:

Excessive friction loss

Unexpectedly low friction loss

Invalid roughness coefficient

Invalid Hazen-Williams coefficient

Invalid Darcy friction factor

Engineering comments shall explain probable causes.

---

# NPSH VALIDATION

Verify:

NPSHa greater than NPSHr

Required safety margin maintained

Suction losses acceptable

Suction lift reasonable

Water temperature considered

If insufficient NPSH margin exists, classify as Critical Failure.

---

# PUMP VALIDATION

Verify:

Pump operating within allowable flow range.

Pump operating near BEP.

Motor correctly sized.

Pump efficiency acceptable.

Impeller diameter valid.

Pump speed within manufacturer limits.

Duty point intersects system curve.

---

# PRESSURE VESSEL VALIDATION

Verify:

Pre-charge pressure

Acceptance volume

Drawdown volume

Maximum pressure

Minimum pressure

Pressure cycling frequency

Tank sizing

Recommend corrective actions if limits are exceeded.

---

# STORAGE TANK VALIDATION

Check:

Effective volume

Dead storage

Overflow capacity

Emergency storage

Minimum operating volume

Future expansion allowance

Generate recommendations where deficiencies are identified.

---

# CONTROL SYSTEM VALIDATION

Verify:

Pressure setpoint

Deadband

Pump sequencing

Lead/Lag configuration

Maximum starts per hour

Alarm thresholds

Sensor ranges

---

# ENERGY VALIDATION

Check:

Pump efficiency

Motor efficiency

Wire-to-water efficiency

Specific energy consumption

Operating cost

Annual energy usage

Highlight unusually inefficient designs.

---

# REDUNDANCY VALIDATION

Evaluate selected redundancy strategy.

Possible outcomes:

No Redundancy

Duty Only

Duty + Standby

N+1

2N

Provide qualitative engineering comments regarding operational resilience.

---

# COST VALIDATION

Verify:

Negative quantities

Negative pricing

Missing unit costs

Missing equipment

Duplicate items

Cost anomalies

Large pricing deviations

---

# PROJECT COMPLETENESS VALIDATION

Determine completion percentage.

Suggested checkpoints:

Project Information

Building Information

Water Source

Demand Analysis

Transfer Pumps

Constant Pressure System

Hydraulic Network

Pump Selection

Equipment Schedule

Material Takeoff

Cost Estimate

Report Generation

Display overall completion status on the dashboard.

---

# ENGINEERING RECOMMENDATION ENGINE

Validation results shall trigger recommendations.

Examples:

Increase pipe diameter.

Reduce velocity.

Increase tank volume.

Select higher efficiency pump.

Increase NPSH margin.

Reduce operating pressure.

Increase pressure vessel size.

Provide standby pump.

Recommendations shall explain **why** the change is suggested.

---

# USER OVERRIDES

The engineer may override selected validation warnings.

Requirements:

Engineering Justification

Engineer Name

Date

Reason

Affected Module

Overrides shall be logged in the audit trail and included in the report.

Critical failures may also be overridden, but they shall remain clearly identified.

---

# VALIDATION DASHBOARD

Display:

Total Checks

Passed

Warnings

Critical Failures

Overrides

Pending Inputs

Overall Engineering Status

Allow filtering by module and severity.

---

# COMPLIANCE SUMMARY

Generate a project compliance summary.

Include:

Selected Design Standard(s)

Validation Results

Engineering Assumptions

Overrides

Limitations

Outstanding Issues

Recommendations

This summary shall appear in the final engineering report.

---

# AUDIT TRAIL

Record:

Validation ID

Calculation Module

Input Values

Result

Status

Engineer

Timestamp

Override Information (if applicable)

The audit trail shall be exportable.

---

# FUTURE EXPANSION

Design the validation framework so that new standards, company criteria, and owner-specific requirements can be added without changing existing calculation modules.

Validation rules shall be data-driven wherever practical.

---

# END OF PART 08B

## Phase 2 Status

With **FDG-T-CPS-08A.md** and **FDG-T-CPS-08B.md**, the application now has:

* Complete engineering workflow specification
* Modular software architecture
* Hydraulic calculation framework
* Formula library
* Validation and standards framework
* Reporting specification
* Offline implementation requirements

The next logical phase is **FDG-T-CPS-09A.md: Intelligent Engineering Recommendation Engine**, which will define a rule-based engineering advisor that analyzes completed calculations, identifies optimization opportunities (such as energy savings, improved pump selection, reduced friction losses, and lifecycle cost reductions), and generates transparent engineering recommendations without replacing the engineer's judgment.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
