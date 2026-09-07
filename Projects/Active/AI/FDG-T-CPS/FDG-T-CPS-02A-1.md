# FDG-T-CPS-02A-1.md

# FDGuinoo Trans-CPS Calculator

## Part 02A-1

### Project Information Module and Building Information Module

---

# OBJECTIVE

This module establishes the engineering basis of every project.

Every downstream calculation shall reference data defined here.

No engineering calculation shall begin unless the mandatory project information has been completed and validated.

---

# MODULE NAME

Project Information

---

# PURPOSE

Store all project metadata required for engineering documentation, calculations, reports, equipment schedules, revision tracking, and future project updates.

This module serves as the master data source for report headers, PDF generation, exported files, and project identification.

---

# MODULE LAYOUT

The module shall consist of the following sections:

```text
Project Information

├── General Information
├── Client Information
├── Building Information
├── Engineering Team
├── Design Standards
├── Design Conditions
├── Design Summary
└── Validation Summary
```

---

# GENERAL INFORMATION

Provide the following input fields.

## Identification

Project Name

Project Number

Contract Number

Drawing Number

Revision Number

Project Status

Project Phase

Internal Reference Number

Document Number

---

## Dates

Project Creation Date

Engineering Design Date

Revision Date

Target Completion Date

Construction Start Date

Construction Completion Date

Commissioning Date

All dates shall use the browser locale but be stored in ISO format internally.

---

## Description

Project Description

Project Scope

Engineering Notes

Special Instructions

Design Assumptions

Maximum Remarks Length:

5000 characters

---

# CLIENT INFORMATION

Required fields:

Client Name

Owner

Architect

Structural Consultant

Electrical Consultant

Mechanical Consultant

Plumbing Consultant

Fire Protection Consultant

Main Contractor

Subcontractor

Developer

Operator

Facility Manager

---

# CONTACT INFORMATION

Support:

Company

Address

Telephone

Mobile

Email

Website

Contact Person

Position

---

# ENGINEERING TEAM

Prepared By

Position

License Number

Discipline

Checked By

Reviewed By

Approved By

Professional Registration

Company

Department

Office

Email

Phone

---

# COMPANY BRANDING

Allow users to upload:

Company Logo

Professional Seal

Professional Signature

Project Image

Building Photograph

Accepted formats:

PNG

JPEG

SVG

Images shall automatically appear in generated reports.

---

# BUILDING INFORMATION

Module Name:

Building Information

---

# PURPOSE

Define the physical characteristics of the building that influence engineering calculations.

---

# BUILDING IDENTIFICATION

Building Name

Building Code

Building Address

City

Province

Country

ZIP Code

Latitude

Longitude

Elevation Above Sea Level

---

# BUILDING CLASSIFICATION

Dropdown selections:

Residential

Commercial

Industrial

Institutional

Hospital

Hotel

Mixed Use

Warehouse

Office

School

Airport

Mall

Factory

Special Occupancy

Custom

---

# BUILDING OCCUPANCY

Allow selection of:

Single Occupancy

Mixed Occupancy

Multi-Tenant

Special Occupancy

Future Expansion

---

# BUILDING DIMENSIONS

Building Length

Building Width

Overall Height

Roof Height

Lowest Floor Elevation

Highest Occupied Floor

Roof Tank Elevation

Basement Depth

Podium Height

Mechanical Floor Elevation

All values shall support both Metric and Imperial units.

---

# FLOOR INFORMATION

Number of Floors Above Grade

Number of Basement Floors

Number of Mechanical Floors

Number of Roof Levels

Number of Occupied Floors

Number of Service Floors

---

# BUILDING AREAS

Gross Floor Area

Net Floor Area

Mechanical Area

Service Area

Roof Area

Basement Area

Site Area

Open Space

Automatically calculate:

Total Constructed Area

---

# BUILDING POPULATION

Provide:

Estimated Occupants

Peak Occupancy

Average Occupancy

Visitors Per Day

Staff

Residents

Customers

Patients

Students

Workers

Support custom occupancy descriptions.

---

# WATER SYSTEM DESCRIPTION

Water Supply Type

Municipal

Deep Well

Surface Water

Storage Tank

Combination

Rainwater Harvesting

Reclaimed Water

Other

---

# WATER STORAGE

Ground Tank

Roof Tank

Intermediate Tank

Pressure Tank

Break Tank

Multiple Tanks

Allow multiple tanks per project.

---

# BUILDING SERVICES

Checkboxes:

Domestic Water

Hot Water

Transfer Pumps

Constant Pressure System

Booster Pump

Fire Protection

Irrigation

Cooling Tower Makeup

Water Treatment

Rainwater Collection

Greywater

Blackwater

Future Expansion

---

# DESIGN CODES

Allow multiple selections.

Examples:

National Plumbing Code

International Plumbing Code

Uniform Plumbing Code

Philippine Plumbing Code

Local Water Utility Standards

Company Standards

Custom Standards

Each selected code shall be recorded in reports.

---

# DESIGN CRITERIA

Design Life

Safety Factor

Peak Demand Method

Minimum Pressure

Maximum Pressure

Maximum Velocity

Preferred Pipe Material

Preferred Pump Manufacturer

Preferred Efficiency Target

Preferred Motor Efficiency

Preferred Redundancy

Duty Only

Duty/Standby

Duty/Assist

N+1

---

# CLIMATE INFORMATION

Average Temperature

Maximum Temperature

Minimum Temperature

Relative Humidity

Atmospheric Pressure

Design Wet Bulb

Design Dry Bulb

These values are stored for future modules.

---

# UTILITY INFORMATION

Water Utility Name

Normal Supply Pressure

Minimum Supply Pressure

Maximum Supply Pressure

Supply Reliability

Daily Interruption

Seasonal Variation

Water Quality Notes

---

# ENGINEERING REMARKS

Provide unlimited engineering notes.

Support Markdown formatting.

Allow bullet lists.

Allow numbered lists.

Allow hyperlinks.

These notes shall appear in engineering reports.

---

# VALIDATION

Mandatory fields:

Project Name

Building Name

Occupancy

Water Supply Type

Design Standard

Prepared By

Building Height

Number of Floors

Gross Floor Area

Building Address

The calculation engine shall not proceed until all mandatory fields are complete.

---

# AUTOMATIC CALCULATIONS

Calculate automatically:

Building Aspect Ratio

Building Footprint

Average Floor Area

Average Occupancy Density

Total Constructed Area

Average Floor Height

Building Volume

Estimated Service Area Percentage

These values shall update instantly when inputs change.

---

# ENGINEERING SUMMARY CARD

Display:

Project Status

Building Type

Building Height

Gross Floor Area

Floors

Occupancy

Primary Water Source

Design Standard

Validation Status

Completion Percentage

---

# REPORT CONTENT

The generated PDF shall include:

Project Cover Page

Project Metadata

Client Information

Engineering Team

Building Summary

Design Standards

Design Criteria

Building Statistics

Site Information

Project Notes

Revision History

---

# EXPORT

Include all project and building information in:

JSON

PDF

CSV (tabular fields)

---

# IMPORT

Imported project data shall automatically populate every field in this module.

Validation shall run immediately after import.

---

# ENGINEERING TRACEABILITY

Every report generated by the software shall reference:

Project UUID

Application Version

Specification Version

Calculation Timestamp

Engineer Name

Revision Number

These values shall be embedded in every report footer.

---

# MODULE COMPLETION REQUIREMENT

The Project Information and Building Information modules are considered complete only when:

* All mandatory fields pass validation.
* Automatic calculations are successfully generated.
* Design standards have been selected.
* Engineering team information has been entered.
* No critical validation errors remain.

The dashboard shall display the completion status for this module as a percentage.

---

# END OF PART 02A-1

The next document, **FDG-T-CPS-02A-2.md**, will define the **Water Source Analysis Module**, including municipal supply analysis, storage tanks, wells, multiple-source configurations, source reliability, available pressure analysis, static water level calculations, and engineering validation required before pump selection.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
