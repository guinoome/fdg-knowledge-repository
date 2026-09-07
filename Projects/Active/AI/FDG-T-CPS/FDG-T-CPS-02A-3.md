# FDG-T-CPS-02A-3.md

# FDGuinoo Trans-CPS Calculator

## Part 02A-3

### Domestic Water Demand Analysis Module

---

# OBJECTIVE

The Domestic Water Demand Analysis Module shall determine the required design flow rate for the building.

This module establishes the hydraulic demand that will be used throughout the Transfer Pump System, Constant Pressure System, Booster Pump System, Storage Tank, and Pipe Network calculations.

No pump sizing shall proceed unless the building design demand has been calculated and validated.

---

# DESIGN PHILOSOPHY

The software shall support multiple demand calculation methods because different projects and jurisdictions use different design approaches.

The engineer shall be able to select the preferred methodology.

The software shall retain every calculation for engineering traceability.

---

# SUPPORTED DEMAND METHODS

Support the following methods.

### Fixture Unit Method

Based on plumbing fixture units.

---

### Occupancy Method

Based on building population.

---

### Consumption Method

Based on average daily consumption.

---

### Hourly Demand Method

Based on operating schedule.

---

### Peak Demand Method

Using diversity and peak factors.

---

### User Defined Method

Engineer manually defines design flow.

---

### Combined Method

Allow combining multiple methods.

Example:

Domestic Demand

*

Irrigation

*

Cooling Tower

*

Commercial Kitchen

*

Future Expansion

=

Total Design Flow

---

# BUILDING OCCUPANCY

Collect:

Residential Occupants

Employees

Visitors

Customers

Students

Patients

Guests

Workers

Maintenance Personnel

Security Personnel

Future Occupancy

---

# OCCUPANCY PARAMETERS

For each category:

Population

Average Daily Presence

Peak Population

Operating Hours

Daily Usage

Water Consumption Rate

Peak Factor

Growth Factor

Future Expansion Percentage

---

# BUILDING OPERATING SCHEDULE

Support:

24 Hours

Office Hours

Hotel

Hospital

Mall

School

Factory

Custom Schedule

Display operating hours graphically.

---

# FIXTURE UNIT MODULE

Provide a dedicated fixture table.

Columns:

Fixture Type

Description

Quantity

Cold Water FU

Hot Water FU

Total FU

Peak Use Factor

Remarks

---

# SUPPORTED FIXTURES

Include an editable engineering database.

Examples:

Water Closet

Urinal

Lavatory

Kitchen Sink

Service Sink

Shower

Bathtub

Bidet

Drinking Fountain

Hose Bibb

Pantry Sink

Mop Sink

Janitor Sink

Washing Machine

Dishwasher

Water Heater

Commercial Kitchen Equipment

Medical Fixtures

Laboratory Fixtures

Custom Fixture

The engineer shall be able to add custom fixture types.

---

# FIXTURE DATABASE

Each fixture record shall contain:

Fixture Name

Fixture Category

Fixture Unit Value

Cold Water Requirement

Hot Water Requirement

Minimum Pressure

Typical Flow

Reference Code

Notes

---

# AUTOMATIC FIXTURE CALCULATIONS

Automatically calculate:

Cold Water Fixture Units

Hot Water Fixture Units

Total Fixture Units

Total Fixture Count

Average Flow

Estimated Peak Flow

Estimated Simultaneous Flow

---

# DIVERSITY FACTORS

Allow configuration of:

Demand Factor

Usage Factor

Coincidence Factor

Simultaneous Use Factor

Safety Factor

Future Demand Factor

These factors shall be editable and recorded in reports.

---

# WATER CONSUMPTION METHOD

Collect:

Consumption Per Person

Consumption Per Room

Consumption Per Bed

Consumption Per Employee

Consumption Per Student

Consumption Per Seat

Consumption Per Area

Consumption Per Process

Support user-defined units.

---

# DAILY DEMAND

Automatically calculate:

Average Daily Demand

Maximum Daily Demand

Peak Day Demand

Future Daily Demand

Reserve Demand

Emergency Demand

---

# HOURLY PROFILE

Generate an editable 24-hour demand profile.

Columns:

Hour

Demand Percentage

Flow

Accumulated Volume

Provide templates:

Residential

Office

Hotel

Hospital

School

Industrial

Shopping Mall

Custom

---

# PEAK DEMAND

Calculate:

Peak Hour Demand

Peak Minute Demand

Peak Instantaneous Flow

Maximum Simultaneous Flow

Peak Factor

Demand Ratio

The calculation method shall be documented in the report.

---

# HOT WATER DEMAND

Support separate calculations for:

Domestic Hot Water

Kitchen

Laundry

Hotel

Hospital

Commercial

Calculate:

Hot Water Flow

Cold Water Makeup

Total Mixed Water

Hot Water Percentage

---

# SPECIAL WATER DEMANDS

Allow optional demand categories.

Cooling Tower Makeup

Irrigation

Swimming Pool

Fountain

Process Water

RO Plant

Water Treatment

Car Wash

Commercial Kitchen

Laundry

Fire Pump Test Line

Future Expansion

Each category shall be independently enabled or disabled.

---

# FUTURE EXPANSION

Support future growth.

Inputs:

Expansion Percentage

Additional Occupants

Additional Floor Area

Additional Fixtures

Additional Buildings

Automatically determine:

Future Design Demand

---

# STORAGE REQUIREMENT

Based on demand calculations determine:

Required Storage

24-Hour Storage

12-Hour Storage

6-Hour Storage

Emergency Storage

Reserve Storage

Usable Storage

Recommended Tank Size

These values will later feed directly into the Storage Tank module.

---

# DESIGN FLOW DETERMINATION

Display the following:

Average Flow

Maximum Daily Flow

Peak Hour Flow

Peak Minute Flow

Design Flow

Recommended Pump Flow

Recommended Booster Flow

Future Flow

Each value shall include units and engineering remarks.

---

# DEMAND COMPARISON

If multiple calculation methods are enabled:

Display comparison table.

Columns:

Method

Calculated Flow

Safety Factor

Adjusted Flow

Recommended

Difference

The engineer may choose the governing design flow.

---

# VALIDATION

Check:

Missing occupancy data

Missing fixture quantities

Invalid fixture values

Negative demand

Excessive peak factors

Conflicting demand methods

Unit consistency

Incomplete operating schedule

Generate engineering warnings where applicable.

---

# ENGINEERING WARNINGS

Examples:

Peak factor exceeds recommended range.

Future expansion exceeds available storage.

Fixture count appears unusually high.

Demand exceeds available source capacity.

Operating schedule is incomplete.

Hot water demand exceeds total domestic demand.

---

# VISUALIZATION

Generate interactive charts.

Required charts:

24-Hour Demand Profile

Average vs Peak Demand

Fixture Distribution

Occupancy Distribution

Demand Breakdown by Category

Water Consumption Summary

All charts shall update instantly after any input change.

---

# SVG VISUALIZATION

Display a simplified building water demand schematic showing:

Water Source

Storage Tank

Transfer Pump

Constant Pressure System

Demand Branches

Domestic Hot Water Branch

Special Demand Branches

Future Expansion Branch

This schematic will integrate with later hydraulic modules.

---

# DASHBOARD SUMMARY

Display:

Total Fixture Units

Total Occupants

Average Daily Demand

Peak Hour Demand

Design Flow

Future Demand

Required Storage

Validation Status

---

# REPORT CONTENT

The generated engineering report shall include:

Demand Method Used

Occupancy Summary

Fixture Unit Tables

Consumption Tables

Hourly Demand Profile

Peak Demand Calculations

Future Expansion Analysis

Design Flow Summary

Engineering Remarks

Warnings

Recommendations

Charts

Calculation Traceability

---

# EXPORT

Include all demand data in:

JSON

CSV

PDF

Engineering Audit Trail

---

# ENGINEERING TRACEABILITY

Every calculated demand value shall record:

Input Values

Formula Used

Intermediate Calculations

Selected Method

Adjustment Factors

Timestamp

Engineer

Software Version

---

# MODULE COMPLETION REQUIREMENT

The Domestic Water Demand Analysis module is complete only when:

* At least one demand calculation method has been completed.
* Design flow has been established.
* Validation passes without critical errors.
* A governing design flow has been selected.
* Storage requirements have been generated.

The calculated Design Flow becomes the master input for all subsequent Transfer Pump, Constant Pressure System, Booster Pump, Pipe Sizing, and Tank Design modules.

---

# END OF PART 02A-3

The next specification, **FDG-T-CPS-03A.md**, begins the core hydraulic design process by defining the **Transfer Pump System Module**. It will include complete engineering workflows for transfer pump sizing, operating philosophy, duty and standby configuration, Total Dynamic Head (TDH), friction losses, static head, pump power, motor sizing, efficiency analysis, and preliminary pump selection criteria.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
