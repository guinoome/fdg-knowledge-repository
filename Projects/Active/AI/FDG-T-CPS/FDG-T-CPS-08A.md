# FDG-T-CPS-08A.md

# FDGuinoo Trans-CPS Calculator

## Part 08A

### Complete Engineering Formula Library

### Hydraulic Equations, Unit Conversions, Engineering Constants, Validation Limits and Calculation References

---

# OBJECTIVE

This document defines every engineering equation used by the FDGuinoo Trans-CPS Calculator.

The Formula Library shall serve as the authoritative source for all engineering calculations performed by the application.

Every calculated result displayed in the software shall reference one formula from this library.

Each formula shall include:

* Formula
* Variable Definitions
* SI Units
* Imperial Units
* Assumptions
* Limitations
* Engineering Interpretation
* Validation Rules
* Typical Design Range
* Applicable Standards
* Report Presentation Format

No calculation module shall contain hard-coded equations outside this library.

---

# FORMULA IDENTIFICATION

Every equation shall receive a unique identifier.

Example:

```text
FDG-HYD-001
FDG-HYD-002
FDG-PMP-001
FDG-TNK-001
FDG-CPS-001
```

This identifier shall appear in:

* Engineering Reports
* Calculation Trace
* Audit Trail
* PDF Appendix

---

# ENGINEERING CONSTANTS

Unless overridden by the engineer.

Acceleration due to gravity

g = 9.80665 m/s²

---

Density of Water

ρ = 1000 kg/m³

(Default at approximately 20°C)

---

Specific Weight of Water

γ = 9.81 kN/m³

---

Atmospheric Pressure

101.325 kPa

---

Atmospheric Head

10.33 mH₂O

---

Dynamic Viscosity

1.002 × 10⁻³ Pa·s

(Default)

---

Kinematic Viscosity

1.004 × 10⁻⁶ m²/s

---

# UNIT CONVERSION LIBRARY

The software shall support automatic unit conversion.

Length

1 m = 1000 mm

1 ft = 0.3048 m

1 in = 25.4 mm

---

Flow

1 L/s = 3.6 m³/hr

1 L/s = 15.85 GPM

1 m³/hr = 0.27778 L/s

1 GPM = 0.06309 L/s

---

Pressure

1 bar = 100 kPa

1 psi = 6.89476 kPa

1 mH₂O = 9.80665 kPa

1 ftH₂O = 2.989 kPa

---

Power

1 HP = 0.746 kW

1 kW = 1.341 HP

---

Volume

1 m³ = 1000 L

1 US Gallon = 3.785 L

---

# FDG-HYD-001

## Flow Velocity

Purpose

Determine water velocity inside a pipe.

Formula

V = Q / A

Variables

V

Velocity

(m/s)

---

Q

Flow Rate

(m³/s)

---

A

Pipe Cross-sectional Area

(m²)

---

Engineering Interpretation

Velocity determines:

Pressure loss

Pipe erosion

Noise

Water hammer potential

---

Validation

Recommended:

Transfer System

0.6 to 2.5 m/s

Booster System

0.9 to 3.0 m/s

Above 3.5 m/s

Warning

Above 5.0 m/s

Critical

---

# FDG-HYD-002

## Pipe Area

Formula

A = πD² / 4

Variables

A

Area

D

Internal Diameter

---

Automatically calculate after every pipe size change.

---

# FDG-HYD-003

## Static Head

Formula

Hs = Zd − Zs

Where:

Zd = Discharge Elevation

Zs = Suction Elevation

Result

Static Head

(m)

---

Interpretation

Positive

Pump lifts water upward.

Negative

Pump receives gravity assistance.

---

# FDG-HYD-004

## Hazen-Williams Head Loss

Formula

Use the SI form of the Hazen-Williams equation with consistent units.

Variables:

Flow Rate

Pipe Diameter

Pipe Length

Hazen-Williams C Factor

Result

Head Loss

(m)

The software shall document the exact unit convention used to avoid ambiguity.

---

Validation

Typical C Values

PVC

150

HDPE

140 to 150

Copper

140

GI

100 to 120

Steel

100 to 120

Old Steel

80 to 100

---

# FDG-HYD-005

## Darcy-Weisbach Equation

Formula

hf = f(L/D)(V² / 2g)

Variables

hf

Head Loss

f

Friction Factor

L

Pipe Length

D

Pipe Diameter

V

Velocity

g

Gravity

---

Automatically determine:

Laminar

Transitional

Turbulent

---

# FDG-HYD-006

## Reynolds Number

Formula

Re = VD / ν

Automatically classify:

Re < 2000

Laminar

2000–4000

Transition

> 4000

Turbulent

---

# FDG-HYD-007

## Minor Loss

Formula

hm = K(V² / 2g)

Automatically sum all fittings.

---

# FDG-HYD-008

## Total Dynamic Head

Formula

TDH

=

Static Head

*

Pipe Friction

*

Minor Loss

*

Pressure Requirement

*

Safety Margin

Every component shall be itemized in reports.

---

# FDG-PMP-001

## Hydraulic Power

Formula

P = ρgQH

Result

Hydraulic Power

(W)

---

# FDG-PMP-002

## Brake Power

Formula

Brake Power

=

Hydraulic Power

/

Pump Efficiency

---

# FDG-PMP-003

## Motor Input Power

Formula

Motor Input

=

Brake Power

/

Motor Efficiency

---

# FDG-PMP-004

## Pump Affinity Laws

Support:

Flow ∝ Speed

Head ∝ Speed²

Power ∝ Speed³

The software shall automatically update pump performance for VFD operation using these relationships.

---

# FDG-PMP-005

## Wire-to-Water Efficiency

Formula

Hydraulic Power

/

Electrical Input Power

Display overall system efficiency.

---

# FDG-CPS-001

## Required Booster Head

Formula

Booster Head

=

Static Head

*

Pressure Requirement

*

Pipe Loss

*

Minor Loss

*

Safety Margin

---

# FDG-CPS-002

## Pressure Tank Drawdown

The application shall implement accepted hydropneumatic tank drawdown relationships based on:

* Cut-in pressure
* Cut-out pressure
* Precharge pressure
* Tank acceptance volume

The implemented equation shall clearly document assumptions and manufacturer conventions used.

---

# FDG-TNK-001

## Cylindrical Tank Volume

Formula

V = πD²H / 4

Automatically calculate:

Gross Volume

Usable Volume

Dead Storage

Effective Volume

---

# VALIDATION FRAMEWORK

Every formula shall define:

Minimum Input

Maximum Input

Typical Engineering Range

Invalid Conditions

Warning Conditions

Critical Conditions

---

# FORMULA PRESENTATION

Every calculation displayed in the application shall show:

Formula ID

Equation Name

Variables

Substitution

Intermediate Results

Final Result

Units

Engineering Interpretation

Reference

---

# ENGINEERING REFERENCES

Each formula entry shall include a field for references used by the engineer, for example:

* Manufacturer technical documentation
* Hydraulic engineering references
* Applicable plumbing or water supply standards
* Company engineering standards

The application shall present these references as documentation rather than reproducing copyrighted source material.

---

# END OF PART 08A

The next document, **FDG-T-CPS-08B.md**, will define the **Engineering Standards & Validation Library**, including configurable design criteria, engineering limits, recommended velocity ranges, pressure limits, storage requirements, and standards-based validation rules that govern every calculation in the application.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
