# FDG-T-CPS-01B.md

# FDGuinoo Trans-CPS Calculator

## Part 01B

### Software Architecture, Code Standards, Data Model and Application Framework

---

# OBJECTIVE

This document defines the mandatory software architecture that shall be used throughout the application.

The objective is to produce commercial-grade engineering software that remains maintainable despite existing inside a single HTML document.

Although the final application consists of one HTML file, the internal JavaScript architecture shall be modular and object-oriented.

---

# APPLICATION STRUCTURE

Internally organize the application into the following logical sections:

```
FDG-T-CPS.html

├── HTML Layout
├── CSS Theme
├── SVG Icons
├── JavaScript Classes
├── Utility Functions
├── Calculation Engine
├── UI Controller
├── Storage Manager
├── Report Generator
├── Chart Manager
├── Drawing Engine
├── Validation Engine
├── Export Manager
└── Application Bootstrap
```

The code shall be grouped using comments so future maintenance is straightforward.

---

# APPLICATION BOOTSTRAP

Create a master application controller.

```
Application

↓

Initialize

↓

Load Settings

↓

Restore Project

↓

Initialize UI

↓

Initialize Charts

↓

Initialize Events

↓

Initialize Calculators

↓

Ready
```

The application shall never require refreshing after startup.

---

# OBJECT ORIENTED DESIGN

Use ES6 Classes.

Recommended classes include:

```
Application

Project

Settings

StorageManager

UIManager

NavigationManager

ValidationManager

CalculationManager

PumpCalculator

PipeCalculator

TankCalculator

DemandCalculator

PressureCalculator

ChartManager

DrawingManager

PDFManager

ExportManager

ImportManager

HistoryManager

NotificationManager

ThemeManager
```

Each class shall have a single responsibility.

---

# MASTER DATA MODEL

Maintain one central project object.

Example hierarchy:

```
Project

Project Information

Building Information

Water Source

Transfer System

Constant Pressure System

Pump Data

Pipe Network

Tank

Demand

Charts

Material Takeoff

Cost Estimate

Reports

Settings
```

Every module shall read and write to this object.

Never duplicate engineering data.

---

# APPLICATION STATE

Maintain one application state object.

Example:

```
Current Page

Selected Module

Current Theme

Current Units

Undo Stack

Redo Stack

Project Status

Unsaved Changes

Autosave Timer

Current Report
```

---

# CALCULATION PHILOSOPHY

Every calculation shall follow:

```
Read Inputs

↓

Validate

↓

Convert Units

↓

Calculate

↓

Verify Results

↓

Generate Warnings

↓

Update Interface

↓

Update Charts

↓

Update Report
```

Never calculate directly inside event listeners.

Always call calculation functions.

---

# UNIT SYSTEM

Support two complete unit systems.

Metric

Imperial

Changing unit systems shall instantly update:

Input labels

Calculated values

Charts

Reports

Tables

Engineering summaries

No page refresh allowed.

---

# UNIT CONVERSION ENGINE

Develop one dedicated conversion library.

Supported conversions include:

Length

Area

Volume

Flow

Velocity

Pressure

Head

Power

Mass

Density

Temperature

Energy

Time

Every engineering module shall use this conversion library.

---

# INPUT VALIDATION

Every field shall support:

Required

Optional

Minimum

Maximum

Engineering Range

Format Validation

Real-Time Validation

Example:

```
Pipe Diameter

Valid

Invalid

Recommended

Warning

Critical
```

---

# ENGINEERING WARNING LEVELS

Provide standardized warning levels.

Information

Notice

Warning

Critical

Engineering Failure

Each warning shall have its own color and icon.

---

# HISTORY MANAGEMENT

Implement:

Undo

Redo

Maximum history depth:

100 actions

History shall include:

Inputs

Selections

Settings

Calculations

---

# AUTOSAVE

Automatically save the project every:

5 seconds

Save:

Project

Theme

Units

Current page

Charts

Settings

History

Autosave shall never interrupt calculations.

---

# RECOVERY

If an autosaved project exists:

Display:

```
Recover Previous Project?

Last Saved

Date

Time

Recover

Discard
```

---

# LOCAL STORAGE

Use Local Storage.

Recommended structure:

```
FDG-T-CPS_Project

FDG-T-CPS_Settings

FDG-T-CPS_History

FDG-T-CPS_Autosave

FDG-T-CPS_Theme
```

---

# JSON IMPORT

Allow importing complete projects.

Imported data shall restore:

Project Information

Inputs

Calculations

Charts

Equipment

Reports

Settings

---

# JSON EXPORT

Export the entire project.

Include metadata:

Application Version

Specification Version

Creation Date

Revision

Engineer

Units

---

# CSV EXPORT

Support exporting:

Material Takeoff

Equipment Schedule

Calculation Tables

Cost Estimate

Demand Tables

Pump Schedule

Pipe Schedule

---

# APPLICATION EVENTS

Use centralized event handling.

Examples:

```
Input Changed

↓

Validate

↓

Calculate

↓

Refresh Charts

↓

Refresh Report

↓

Autosave
```

Avoid duplicated event listeners.

---

# NOTIFICATION SYSTEM

Provide notifications for:

Autosave Complete

Import Successful

Export Successful

Calculation Complete

Validation Error

Recovery Successful

Notifications shall disappear automatically after a configurable duration.

---

# PERFORMANCE REQUIREMENTS

Target:

Startup

< 3 seconds

Recalculation

< 100 milliseconds

Chart Update

< 150 milliseconds

PDF Generation

< 10 seconds

Large Project Restore

< 5 seconds

---

# RESPONSIVE DESIGN

Support:

Desktop

Laptop

Tablet

Mobile

Desktop shall be the primary optimization target.

---

# ACCESSIBILITY

Support:

Keyboard Navigation

Visible Focus Indicators

ARIA Labels where appropriate

High Contrast Theme

Scalable Fonts

---

# CODE COMMENTING

Each major section shall begin with:

```
======================================================
MODULE NAME
Purpose
Dependencies
Author
======================================================
```

Each class shall contain:

Purpose

Methods

Dependencies

Usage Notes

---

# APPLICATION VERSION

Display:

```
FDGuinoo Trans-CPS Calculator

Version 1.0.0

Professional Engineering Edition
```

Future revisions shall update automatically.

---

# ENGINEERING TRACEABILITY

Every calculation shall be reproducible.

The software shall never display a final value without showing:

Input Values

Formula Used

Variable Definitions

Intermediate Results

Final Result

Engineering Remarks

---

# END OF PART 01B

The next specification (FDG-T-CPS-01C.md) will define the complete user interface, navigation system, dashboard, engineering workspace, themes, icons, layouts, and interaction behavior for every screen.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
