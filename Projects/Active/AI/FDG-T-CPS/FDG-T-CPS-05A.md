# FDG-T-CPS-05A.md

# FDGuinoo Trans-CPS Calculator

## Part 05A

### Equipment Schedule, Material Takeoff (MTO), Bill of Materials (BOM), and Cost Estimation Module

---

# OBJECTIVE

The Equipment Schedule and Material Takeoff (MTO) Module shall automatically generate a complete engineering schedule of all equipment and materials required for the Transfer Pump and Constant Pressure System.

The module shall extract quantities directly from previous engineering calculations and generate:

* Equipment Schedule
* Pipe Schedule
* Valve Schedule
* Instrument Schedule
* Tank Schedule
* Motor Schedule
* Cable Summary (Optional)
* Material Takeoff (MTO)
* Bill of Materials (BOM)
* Cost Estimate
* Procurement Summary
* Installation Summary

The module shall update automatically whenever engineering calculations change.

---

# ENGINEERING DATA SOURCES

Automatically import data from:

* Project Information
* Building Information
* Water Source Analysis
* Domestic Water Demand
* Transfer Pump System
* Constant Pressure System
* Hydraulic Network
* Pump Selection

The user shall not manually duplicate engineering information already available in previous modules.

---

# EQUIPMENT SCHEDULE

Automatically generate a master equipment schedule.

Columns:

Equipment Tag

Equipment Type

Equipment Description

Manufacturer

Model

Capacity

Flow

Head

Power

Voltage

Phase

Frequency

Efficiency

Dimensions

Weight

Location

Duty

Standby

Remarks

Status

Each equipment item shall receive a unique equipment tag.

---

# EQUIPMENT TAG FORMAT

Default format:

```text
P-001
P-002
TK-001
VLV-001
FM-001
PS-001
```

Allow users to customize tag prefixes.

---

# PUMP SCHEDULE

Automatically include:

Pump Tag

Service

Pump Type

Manufacturer

Model

Flow

Head

Efficiency

Motor Power

Voltage

Frequency

RPM

NPSHr

Connection Size

Impeller Diameter

Control Method

Remarks

---

# MOTOR SCHEDULE

Generate:

Motor Tag

Associated Pump

Power

Voltage

Phase

Frequency

Efficiency

Power Factor

Current

Protection Class

Enclosure

Frame Size

Starting Method

VFD Compatible

Remarks

---

# PRESSURE VESSEL SCHEDULE

Generate:

Tank Tag

Tank Type

Total Volume

Acceptance Volume

Maximum Pressure

Precharge Pressure

Material

Manufacturer

Model

Diameter

Height

Weight

Connection Size

Remarks

---

# STORAGE TANK SCHEDULE

Generate:

Tank ID

Tank Name

Tank Type

Material

Capacity

Effective Volume

Elevation

Dimensions

Overflow Level

Drain Level

Remarks

---

# PIPE SCHEDULE

Automatically summarize all pipes.

Columns:

Pipe ID

Service

Material

Nominal Diameter

Internal Diameter

Schedule

Pressure Rating

Length

Equivalent Length

Insulation

Quantity

Remarks

Automatically calculate:

Total Length per Diameter

Total Length per Material

---

# FITTING SCHEDULE

Generate quantities for:

Elbows

Tees

Reducers

Expanders

Couplings

Unions

Flanges

Flexible Connectors

Expansion Joints

Caps

Plugs

Adapters

Custom Fittings

The fitting database shall remain editable.

---

# VALVE SCHEDULE

Support:

Gate Valve

Butterfly Valve

Ball Valve

Globe Valve

Check Valve

Swing Check Valve

Foot Valve

Pressure Reducing Valve

Pressure Relief Valve

Air Release Valve

Drain Valve

Solenoid Valve

Control Valve

Columns:

Valve Tag

Valve Type

Size

Pressure Rating

Connection

Material

Quantity

Location

Remarks

---

# INSTRUMENTATION SCHEDULE

Generate:

Pressure Gauge

Pressure Transmitter

Pressure Switch

Flow Meter

Level Sensor

Temperature Sensor

Float Switch

Control Panel

PLC

VFD

Columns:

Instrument Tag

Description

Range

Signal Type

Location

Quantity

Remarks

---

# CONTROL PANEL SCHEDULE

Generate:

Panel Name

Panel Type

Voltage

Incoming Breaker

Outgoing Feeders

Pump Connections

Control Method

PLC

HMI

VFD

Protection

Remarks

---

# MATERIAL TAKEOFF (MTO)

Automatically summarize all materials.

Categories:

Equipment

Pipe

Fittings

Valves

Supports

Instrumentation

Electrical

Accessories

Consumables

Miscellaneous

Future Expansion

Each category shall be collapsible.

---

# BILL OF MATERIALS (BOM)

Columns:

Item Number

Description

Category

Specification

Unit

Quantity

Unit Cost

Labor Cost

Installation Cost

Total Cost

Vendor

Lead Time

Remarks

Users shall be able to edit pricing.

---

# UNIT COST DATABASE

Provide editable local pricing.

Each record:

Material

Manufacturer

Unit

Currency

Unit Cost

Date Updated

Supplier

Remarks

The software shall never overwrite user pricing without confirmation.

---

# COST ESTIMATION

Calculate:

Equipment Cost

Pipe Cost

Valve Cost

Instrumentation Cost

Electrical Cost

Accessories

Installation Labor

Testing

Commissioning

Contingency

Engineering Cost (Optional)

Tax (Optional)

Grand Total

Support multiple currencies.

---

# PROCUREMENT SUMMARY

Generate:

Long Lead Items

Imported Equipment

Locally Available Items

Critical Components

Supplier Summary

Estimated Delivery

Recommended Procurement Sequence

---

# INSTALLATION SUMMARY

Automatically determine:

Total Pipe Length

Total Equipment Count

Total Valves

Total Instruments

Estimated Installation Hours

Estimated Commissioning Hours

Estimated Testing Hours

---

# MAINTENANCE SUMMARY

Generate:

Equipment Requiring Preventive Maintenance

Lubrication Schedule

Seal Replacement

Bearing Replacement

Inspection Frequency

Calibration Schedule

Suggested Spare Parts

---

# SPARE PARTS LIST

Automatically generate:

Pump Seal Kit

Bearings

Couplings

Impellers

Pressure Gauges

Pressure Switches

Pressure Sensors

Control Fuses

Motor Cooling Fan

Custom Spare Parts

---

# ENGINEERING VALIDATION

Verify:

Missing Equipment Tags

Duplicate Tags

Missing Quantities

Negative Quantities

Invalid Costs

Unassigned Equipment

Missing Pump

Missing Valves

Missing Sensors

Generate validation warnings.

---

# ENGINEERING WARNINGS

Examples:

Pressure vessel missing.

Pump has no associated motor.

Valve size inconsistent with connected pipe.

Pipe length not assigned.

Missing instrumentation.

Equipment tag duplicated.

Supplier information incomplete.

---

# VISUALIZATION

Generate charts:

Equipment Distribution

Pipe Material Distribution

Valve Distribution

Material Cost Breakdown

Equipment Cost Breakdown

Procurement Timeline

Maintenance Schedule

---

# DASHBOARD SUMMARY

Display:

Total Equipment

Total Pipe Length

Total Valves

Total Instruments

Estimated Cost

Estimated Labor

Grand Total

Validation Status

---

# REPORT CONTENT

Automatically include:

Equipment Schedule

Pump Schedule

Tank Schedule

Valve Schedule

Pipe Schedule

Instrumentation Schedule

Bill of Materials

Material Takeoff

Cost Estimate

Procurement Summary

Maintenance Summary

Engineering Remarks

Warnings

Charts

---

# EXPORT

Support:

PDF

Excel (XLSX)

CSV

JSON

Printable Equipment Schedule

Printable BOM

Printable Cost Estimate

---

# ENGINEERING TRACEABILITY

Each equipment item shall include:

Equipment Source Module

Calculation Reference

Project UUID

Revision Number

Timestamp

Engineer

Software Version

Equipment Revision History

---

# MODULE COMPLETION REQUIREMENT

The Equipment Schedule and Material Takeoff module is complete only when:

* All equipment has unique tags.
* Pipe, valve, and instrumentation schedules have been generated.
* Material quantities have been calculated.
* Bill of Materials has been completed.
* Cost estimates have been generated.
* Validation passes without critical errors.

The resulting schedules shall become the primary source for procurement, construction documentation, and the final engineering report.

---

# END OF PART 05A

The next specification, **FDG-T-CPS-06A.md**, will define the **Engineering Report Generator and PDF Module**, including automatic A4 report creation, professional layouts, company branding, calculation traceability, charts, SVG schematics, appendices, digital signatures, and complete offline PDF generation using JavaScript libraries such as jsPDF and html2canvas.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
