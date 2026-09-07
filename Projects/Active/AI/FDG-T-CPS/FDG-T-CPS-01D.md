# FDG-T-CPS-01D.md

# FDGuinoo Trans-CPS Calculator

## Part 01D

### Project Management, Settings, Autosave, Validation Engine, Notification System and Global Application Behavior

---

# OBJECTIVE

This document defines the core application services that every engineering module depends on.

These services include:

* Project Management
* Project Metadata
* Global Settings
* Autosave
* Recovery
* Validation Engine
* Notification System
* Logging
* Session Management
* Preferences

Every engineering module defined later shall inherit these behaviors.

---

# PROJECT MANAGEMENT

The software shall support multiple independent engineering projects.

Each project shall contain all engineering data required to completely recreate the design.

A project shall never depend on another project.

---

# PROJECT IDENTIFICATION

Each project shall contain the following information.

## General

Project Name

Project Number

Revision Number

Revision Date

Status

Project Description

Remarks

---

## Client

Client Name

Owner

Consultant

Contractor

Architect

MEP Consultant

---

## Building

Building Name

Building Address

City

Province

Country

Postal Code

Latitude

Longitude

Elevation Above Sea Level

---

## Engineering Team

Prepared By

Checked By

Reviewed By

Approved By

Professional License Number

Company

Department

Email

Contact Number

---

## Design Information

Design Standard

Unit System

Calculation Basis

Water Source Type

Building Occupancy

Building Category

Fire Protection Required (Yes/No)

Domestic Water Only (Yes/No)

Mixed System (Yes/No)

---

# PROJECT STATUS

Each project shall maintain a workflow status.

Examples:

Draft

Under Design

Under Review

Approved

Issued for Construction

As Built

Archived

The status shall appear in the project dashboard and reports.

---

# PROJECT VERSION CONTROL

Maintain the following information automatically.

Project Created

Last Modified

Last Saved

Revision Number

Application Version

Specification Version

Project UUID

These values shall not require manual editing except the revision number.

---

# PROJECT DASHBOARD

The Project module shall provide a summary including:

Project Name

Current Revision

Design Standard

Building Type

Water Demand

Selected Pump Count

Selected Tank

Calculation Status

Validation Status

Last Autosave

Current Report Status

Overall Completion Percentage

---

# PROJECT COMPLETION TRACKER

Display progress as a percentage.

Suggested milestones:

Project Information

Building Information

Water Source

Demand Analysis

Transfer Pump Design

CPS Design

Pipe Network

Tank Design

Equipment Selection

Material Takeoff

Cost Estimate

Report Generation

Each completed section contributes to the overall completion percentage.

---

# SETTINGS MANAGER

Create a dedicated Settings module.

Supported categories:

General

Engineering

Appearance

Reports

Autosave

Units

Charts

Notifications

PDF

Advanced

---

# GENERAL SETTINGS

Allow configuration of:

Company Name

Company Logo

Company Address

Phone Number

Email

Website

Professional Seal Image

Professional Signature Image

Default Save Location (logical preference only)

Default Report Title

---

# ENGINEERING SETTINGS

Allow users to configure defaults.

Default Water Density

Default Gravitational Acceleration

Default Atmospheric Pressure

Default Pipe Roughness

Default Hazen-Williams C Value

Preferred Safety Factors

Default Pump Efficiency

Preferred Unit System

Engineering Precision

These values become the initial defaults for new projects and remain editable per project.

---

# NUMERICAL PRECISION

Provide selectable precision.

Decimal Places

Options:

0

1

2

3

4

5

Scientific Notation

Calculations shall internally maintain full precision and only round values for display.

---

# AUTOSAVE SETTINGS

Default interval:

5 seconds

User options:

5 seconds

10 seconds

30 seconds

60 seconds

Manual Only

Default shall always be 5 seconds.

---

# AUTOSAVE CONTENT

Autosave shall include:

Entire Project Object

Current Module

Current Page

Scroll Position

Theme

Unit System

Open Panels

Collapsed Panels

Chart Configuration

Calculation History

Undo History

Redo History

Window Layout Preferences

---

# RECOVERY WORKFLOW

When the application starts:

If autosaved data exists:

Display a recovery dialog.

Example:

Recover Previous Session

Project Name

Last Saved Date

Last Saved Time

Software Version

Buttons:

Recover

Discard

View Details

The user must choose before continuing.

---

# SAVE MANAGER

Provide three save modes.

Manual Save

Autosave

Save As

Save As shall export the project as a JSON file.

---

# IMPORT MANAGER

Support importing:

JSON Project Files

Before importing:

Validate schema

Validate version

Validate required fields

Notify the user if compatibility issues are detected.

---

# EXPORT MANAGER

Support exporting:

JSON

CSV

Engineering Tables

Equipment Schedule

Material Takeoff

Cost Estimate

Calculation Summary

Engineering Report PDF

SVG Drawings

Chart Images (PNG)

---

# VALIDATION ENGINE

Create one centralized validation engine.

Every module shall use the same validation framework.

Validation categories:

Missing Input

Invalid Format

Range Check

Engineering Range

Dependency Check

Calculation Error

Unit Error

Logical Error

---

# VALIDATION LEVELS

Each validation message shall include:

Severity

Code

Description

Recommended Action

Affected Module

Timestamp

---

# VALIDATION COLORS

Success

Green

Information

Blue

Warning

Amber

Critical

Red

Disabled

Gray

Maintain consistent colors throughout the application.

---

# VALIDATION PANEL

Provide a global validation panel.

Display:

Current Errors

Warnings

Passed Checks

Pending Inputs

Users can click a validation item to navigate directly to the associated input.

---

# GLOBAL SEARCH INDEX

Index the following:

Projects

Equipment

Pump Models

Pipe Materials

Engineering Terms

Reports

Settings

Formulas

Help Topics

Search shall be instantaneous.

---

# NOTIFICATION SYSTEM

Notifications shall support:

Success

Information

Warning

Error

Progress

Notifications shall include:

Icon

Title

Message

Timestamp

Auto-dismiss timer

Optional action button

---

# APPLICATION LOG

Maintain a project activity log.

Examples:

Project Created

Project Saved

Project Imported

Pump Selected

Tank Updated

Demand Calculated

Report Generated

PDF Exported

Settings Changed

Recovery Completed

The log shall be exportable.

---

# ENGINEERING AUDIT TRAIL

Maintain a calculation audit history.

Each calculation record shall contain:

Calculation Name

Module

Input Values

Formula Version

Calculation Timestamp

User

Result

Validation Status

This audit trail shall be available for inclusion in engineering reports.

---

# HELP SYSTEM

Provide contextual help for every module.

Help shall include:

Purpose

Required Inputs

Definitions

Applicable Equations

Typical Design Workflow

Engineering Notes

Common Design Errors

Related Modules

---

# APPLICATION HEALTH MONITOR

Monitor:

Autosave Status

Memory Usage (where available)

Calculation Queue

Active Charts

Report Generation

Recovery Status

Validation Status

Display a simple status indicator in the footer.

---

# ERROR HANDLING

Unexpected application errors shall:

Log the error

Display a user-friendly message

Preserve project data

Prevent application crashes where possible

Offer retry actions if appropriate

Never expose raw JavaScript stack traces to the user interface.

---

# APPLICATION PREFERENCES

Remember:

Theme

Language (future-ready)

Units

Sidebar Width

Last Module

Dashboard Layout

Window Size Preferences (where browser limitations permit)

Chart Preferences

Notification Preferences

These preferences shall persist independently of project data.

---

# SECURITY PRINCIPLES

Since the application operates offline:

Do not transmit user data.

Do not require online authentication.

Do not depend on cloud services.

Store project information locally unless the user explicitly exports it.

---

# GLOBAL APPLICATION BEHAVIOR

All engineering modules created in later specifications shall automatically inherit:

Project metadata

Settings

Validation

Notifications

Autosave

Recovery

History

Audit trail

Logging

Import/Export behavior

User preferences

This ensures a consistent experience throughout the entire application.

---

# END OF PART 01D

The next document, **FDG-T-CPS-02A.md**, begins the engineering functionality. It will define the complete **Project Information**, **Building Information**, **Water Source Analysis**, and **Domestic Water Demand Analysis** modules, including engineering inputs, calculations, data structures, validation rules, and report content. These modules form the foundation for all subsequent Transfer Pump and Constant Pressure System calculations.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
