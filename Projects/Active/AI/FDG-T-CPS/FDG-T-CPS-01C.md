# FDG-T-CPS-01C.md

# FDGuinoo Trans-CPS Calculator

## Part 01C

### User Interface, Dashboard, Navigation, Workspace and Theme Specification

---

# OBJECTIVE

This document defines the complete visual design and interaction model for the application.

The goal is to create an engineering application that feels comparable to commercial MEP software while remaining simple, fast, and intuitive.

The interface shall prioritize engineering productivity over decorative elements.

---

# USER INTERFACE PRINCIPLES

The interface shall be:

* Professional
* Minimal
* Consistent
* Responsive
* Fast
* Information-rich
* Easy to navigate
* Suitable for long engineering sessions

The application should resemble engineering software rather than a public website.

---

# DESIGN LANGUAGE

Adopt a modern engineering design language.

Characteristics:

* White background
* Red primary accent
* Light gray panels
* Rounded corners (6 to 10 px)
* Soft shadows
* Consistent spacing
* Neutral typography
* Flat icons
* Clean tables

Avoid excessive gradients, animations, or decorative graphics.

---

# COLOR PALETTE

### Light Theme

Background:

* #FFFFFF

Panel:

* #F7F7F7

Primary:

* #C62828

Primary Hover:

* #B71C1C

Success:

* #2E7D32

Warning:

* #F9A825

Danger:

* #C62828

Information:

* #1565C0

Border:

* #DDDDDD

Text:

* #212121

Secondary Text:

* #616161

---

### Dark Theme

Background:

* #1E1E1E

Panel:

* #2C2C2C

Primary:

* #EF5350

Text:

* #F5F5F5

Border:

* #444444

Warning:

* #FFB300

Success:

* #66BB6A

Information:

* #64B5F6

---

# TYPOGRAPHY

Use system fonts.

Preferred stack:

```
Segoe UI

Roboto

Arial

sans-serif
```

Font sizes:

Title

30px

Section

22px

Subsection

18px

Normal Text

14px

Small Notes

12px

Tables

13px

---

# APPLICATION HEADER

Display at the top:

```
FDGuinoo Trans-CPS Calculator

Professional Engineering Edition
```

Right side:

* Current Project
* Current User
* Unit System
* Theme Toggle
* Autosave Status
* Current Time

---

# SIDEBAR NAVIGATION

Permanent collapsible sidebar.

Icons with labels.

Sections:

```
Dashboard

Project

Building

Water Source

Demand

Transfer Pumps

Constant Pressure

Booster Pumps

Pipe Network

Hydraulics

Storage Tanks

Pressure Tanks

Equipment

Material Takeoff

Cost Estimate

Charts

Reports

Settings

About
```

Only one module is active at a time.

---

# MAIN WORKSPACE

The workspace shall occupy the remaining screen width.

Structure:

```
Breadcrumb

↓

Module Title

↓

Toolbar

↓

Input Panel

↓

Calculation Panel

↓

Visualization Panel

↓

Engineering Remarks
```

Scrolling shall occur only inside the workspace.

Sidebar and header remain fixed.

---

# DASHBOARD

The dashboard is the landing page.

Display engineering summary cards.

Cards include:

* Active Project
* Water Demand
* Transfer Flow Rate
* Booster Flow Rate
* Total Dynamic Head
* Selected Pump
* Storage Volume
* Material Cost
* Last Saved
* Report Status

Each card opens the related module.

---

# TOOLBAR

Every module shall include a toolbar with:

* New
* Open
* Save
* Export
* Print
* Generate Report
* Undo
* Redo
* Search
* Help

Buttons shall include icons and tooltips.

---

# INPUT PANELS

Organize inputs using cards.

Example:

```
Project Information

Water Source

Pump Parameters

Pipe Data

Design Criteria
```

Each card is collapsible.

Cards remember their expanded/collapsed state.

---

# FORM CONTROLS

Supported controls:

* Text Box
* Number Input
* Drop-down List
* Multi-select
* Toggle Switch
* Checkbox
* Radio Button
* Date Picker
* File Upload
* Slider (where appropriate)

All controls shall have:

* Label
* Unit
* Placeholder
* Validation Message
* Help Tooltip

---

# ENGINEERING TABLES

Use professional tables.

Features:

* Sticky header
* Sortable columns
* Filter
* Search
* Pagination
* Export to CSV

Tables shall automatically resize with the window.

---

# CALCULATION PANEL

Every engineering module includes:

```
Inputs

↓

Formula

↓

Substitution

↓

Intermediate Results

↓

Final Result

↓

Remarks
```

Allow users to collapse the formula section if desired.

---

# STATUS BAR

Bottom of application.

Display:

* Ready
* Autosave Countdown
* Current Units
* Validation Status
* Current Module
* Software Version

---

# BREADCRUMB

Example:

```
Dashboard

>

Transfer Pumps

>

Pump Selection
```

Users can return to previous modules.

---

# SEARCH

Global search shall locate:

Projects

Modules

Equipment

Reports

Pump Models

Materials

Formulas

Calculations

Results update as the user types.

---

# DARK MODE

Switch instantly.

No page refresh.

Persist preference using Local Storage.

---

# ICONS

Use SVG icons.

Categories:

Project

Pump

Pipe

Valve

Tank

Pressure

Flow

Chart

Settings

Report

Export

Import

Warning

Success

Failure

Information

---

# CHART AREA

Dedicated visualization panel.

Support:

* Line Charts
* Bar Charts
* Pie Charts
* Scatter Charts

Charts resize automatically.

Provide export as PNG.

---

# SVG SYSTEM VIEWER

Dedicated engineering drawing panel.

Will later display:

* Pumps
* Tanks
* Pipes
* Valves
* Flow Arrows
* Pressure Zones
* Building Connections

SVG drawings shall zoom and pan smoothly.

---

# HELP SYSTEM

Each module contains a help button.

Display:

* Purpose
* Required Inputs
* Engineering Notes
* Formula References
* Common Mistakes

Help opens in a side panel instead of a popup.

---

# ENGINEERING WARNINGS

Display inline.

Examples:

🟢 Pass

🟡 Warning

🔴 Critical

Every warning links to the related input.

---

# NOTIFICATIONS

Top-right notification stack.

Examples:

* Project Saved
* Calculation Complete
* Validation Error
* PDF Generated
* Import Successful
* Autosave Complete

Notifications automatically disappear after several seconds.

---

# LOADING INDICATORS

Display progress indicators for:

* Large calculations
* PDF generation
* Project import
* Project recovery

Avoid blocking the entire interface unless necessary.

---

# RESPONSIVE BEHAVIOR

Desktop:

* Full sidebar
* Multi-column layout

Tablet:

* Collapsible sidebar
* Two-column layout

Mobile:

* Drawer navigation
* Single-column layout

Engineering calculations remain fully functional on all devices.

---

# KEYBOARD SHORTCUTS

Implement:

Ctrl + N → New Project

Ctrl + O → Open Project

Ctrl + S → Save Project

Ctrl + P → Print Report

Ctrl + Z → Undo

Ctrl + Y → Redo

Ctrl + F → Search

F1 → Help

Esc → Close Dialog

Shortcuts shall be listed in the Help section.

---

# ACCESSIBILITY

Support:

* Keyboard navigation
* High-contrast mode
* Focus indicators
* Scalable fonts
* Screen reader-friendly labels where practical

---

# APPLICATION FOOTER

Display:

```
FDGuinoo Trans-CPS Calculator

Professional Engineering Edition

Version 1.0.0

© FDGuinoo Engineering
```

Include build date and current year.

---

# UI DESIGN GOAL

The completed application shall visually resemble professional engineering software used for MEP design and hydraulic analysis.

Every screen should emphasize clarity, engineering data, and efficient workflow rather than visual complexity.

---

# END OF PART 01C

The next document, **FDG-T-CPS-01D.md**, will define the Project Management system, project metadata, autosave and recovery workflow, settings management, validation engine, notification system, and global application behavior that every engineering module will inherit.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
