# FDG-T-CPS-07A.md

# FDGuinoo Trans-CPS Calculator

## Part 07A

### Application Framework, HTML Architecture, JavaScript Structure, Offline Storage and Production Implementation Specification

---

# OBJECTIVE

This document defines the software architecture for the final application.

The objective is to produce a **single production-ready HTML application** named:

```text
FDG-T-CPS.html
```

The application shall execute completely offline in any modern Chromium-based browser without requiring installation, backend services, cloud connectivity, or external databases.

---

# FINAL OUTPUT

The generated deliverable shall be:

```text
FDG-T-CPS.html
```

The HTML file shall contain the complete application.

Support files shall be organized separately for maintainability during development, but the final production build shall be bundled into one HTML document.

---

# DEVELOPMENT STRUCTURE

During development, organize the project as:

```text
FDG-T-CPS/

│
├── index.html
├── css/
│     main.css
│     dashboard.css
│     forms.css
│     tables.css
│     reports.css
│     charts.css
│
├── js/
│     app.js
│     router.js
│     ui.js
│     validation.js
│     storage.js
│     calculations.js
│     report.js
│     charts.js
│     svg.js
│     export.js
│
├── data/
│     pipeDatabase.json
│     pumpDatabase.json
│     fittings.json
│     valves.json
│
├── assets/
│     logo.svg
│     icons/
│     fonts/
│
└── build/
      FDG-T-CPS.html
```

The build process shall inline CSS, JavaScript, SVG, and JSON resources into the final HTML file.

---

# HTML REQUIREMENTS

Use HTML5 semantic elements.

Required structure:

```html
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport">
<title>FDGuinoo Trans-CPS Calculator</title>
</head>

<body>

<header>

<aside>

<main>

<footer>

</body>
</html>
```

Avoid deprecated HTML elements.

---

# CSS REQUIREMENTS

Organize styles into logical sections.

Recommended order:

Reset

Variables

Typography

Layout

Navigation

Cards

Forms

Tables

Charts

SVG

Dialogs

Print

Dark Theme

Animations

Responsive Rules

Use CSS variables for colors and spacing.

---

# JAVASCRIPT ARCHITECTURE

Organize into independent modules.

Suggested modules:

Application

Router

Project

Validation

Autosave

Storage

Calculations

Pump Engine

Hydraulic Engine

Report Generator

Charts

SVG Renderer

Import

Export

Notification Manager

Theme Manager

Settings Manager

Undo Manager

History Manager

Each module shall expose only the required public methods.

---

# APPLICATION STARTUP

Application startup sequence:

```text
Load HTML

↓

Load Settings

↓

Load Theme

↓

Load Local Project

↓

Recover Autosave

↓

Initialize Modules

↓

Validate Data

↓

Render Dashboard

↓

Ready
```

Display a loading indicator during initialization.

---

# ROUTING

Implement a client-side router.

Each sidebar item corresponds to one module.

Changing modules shall not reload the page.

Browser refresh shall preserve the current module when possible.

---

# APPLICATION STATE

Maintain a single centralized state object.

Example categories:

Project

Building

Water Source

Demand

Transfer Pumps

Booster

Hydraulic Network

Pump Selection

Equipment

Reports

Settings

UI

History

The state shall be the single source of truth.

---

# LOCAL STORAGE

Use LocalStorage for lightweight preferences.

Store:

Theme

Sidebar Width

Recent Projects

Window Preferences

Language

Notification Preferences

Autosave Interval

Do not store engineering project data in LocalStorage if it exceeds practical size limits.

---

# INDEXEDDB

Use IndexedDB for project persistence.

Store:

Project Files

Autosave Snapshots

Pump Database

Pipe Database

Material Database

Report Cache

Revision History

Audit Trail

Support versioned database upgrades.

---

# AUTOSAVE

Default interval:

Every 5 seconds

Autosave shall occur only when project data changes.

Display status:

Saving...

Saved

Failed

Last Saved Time

---

# RECOVERY

When unsaved data exists:

Display:

Recover Previous Session

Discard Previous Session

View Autosave Details

Recovery shall restore:

Project

Current Module

Open Panels

Scroll Position

Charts

History

Settings

---

# IMPORT

Support:

JSON Project

CSV Tables

SVG Drawings (future)

Validate schema before importing.

Reject incompatible versions gracefully.

---

# EXPORT

Support:

JSON

CSV

PDF

PNG

SVG

Future support:

DXF

Excel

---

# VALIDATION ENGINE

Run validation:

On Input

Before Calculation

Before Save

Before Export

Before PDF

Validation shall not block data entry but shall block engineering reports if critical errors exist.

---

# UNDO / REDO

Implement history stacks.

Minimum history depth:

100 actions

Support:

Input Changes

Table Edits

Equipment Changes

Settings

Project Metadata

Autosave shall preserve history.

---

# NOTIFICATION SYSTEM

Display non-blocking notifications.

Categories:

Success

Information

Warning

Error

Progress

Notifications shall auto-dismiss unless user interaction is required.

---

# SEARCH ENGINE

Provide instant global search.

Search:

Projects

Equipment

Reports

Settings

Pump Models

Pipe Materials

Engineering Terms

Use indexed search for performance.

---

# SVG ENGINE

Render engineering schematics using SVG.

Support:

Zoom

Pan

Selection

Labels

Grid

Snap

Export

Print

SVG drawings shall remain resolution independent.

---

# CHART ENGINE

Preferred library:

Chart.js (bundled locally)

Support:

Line

Bar

Pie

Scatter

Radar

Area

Charts shall update reactively when calculations change.

---

# REPORT ENGINE

Generate reports directly from application state.

No duplicate calculations.

Support:

Preview

Print

PDF

Section Selection

Custom Branding

---

# PERFORMANCE REQUIREMENTS

Initial Load:

< 3 seconds on modern hardware

Autosave:

< 500 ms

Module Switching:

Instant

Report Generation:

Progress indicator required

Memory usage shall remain stable during extended sessions.

---

# RESPONSIVE DESIGN

Desktop:

Three-panel layout

Tablet:

Two-panel layout

Mobile:

Single-column layout

Engineering calculations shall remain fully functional.

---

# OFFLINE REQUIREMENTS

The application shall function without:

Internet connection

Backend server

API

Cloud database

External authentication

All engineering functionality shall remain available offline.

---

# ERROR HANDLING

Unexpected errors shall:

Log internally

Display user-friendly messages

Prevent data loss

Offer retry actions

Never expose raw JavaScript exceptions to the user interface.

---

# CODING STANDARDS

Use:

ES2022+

Strict mode

CamelCase for variables

PascalCase for classes

Meaningful function names

JSDoc comments for public methods

Avoid global variables except the application bootstrap.

---

# SECURITY PRINCIPLES

Do not transmit project data.

Do not include analytics.

Do not include tracking scripts.

Escape user-generated content before rendering.

Validate imported files before processing.

---

# PRINT STYLES

Provide dedicated print CSS.

Hide:

Sidebar

Toolbar

Notifications

Display:

Report

Tables

Charts

SVG

Headers

Footers

Optimize for A4 printing.

---

# VERSIONING

Display:

Application Version

Specification Version

Database Version

Build Date

Revision

These values shall appear in the About dialog and report footer.

---

# ABOUT DIALOG

Include:

Application Name

Version

Build Date

Developer

License

Supported Standards

Specification Version

Copyright

---

# FINAL BUILD REQUIREMENTS

The production build shall:

* Be delivered as **FDG-T-CPS.html**
* Operate completely offline
* Autosave every 5 seconds
* Generate professional A4 PDF reports
* Include all engineering modules defined in this specification
* Support import/export
* Include SVG visualization
* Include interactive charts
* Use IndexedDB for project storage
* Require no installation
* Require no backend server
* Be suitable for engineering use and future expansion

---

# CLAUDE / ANTIGRAVITY IMPLEMENTATION DIRECTIVE

When generating the final application:

1. Implement every requirement contained in all preceding specification documents without omission.
2. Do not replace engineering calculations with placeholders.
3. All formulas shall display intermediate steps, units, and engineering remarks.
4. All modules shall be fully integrated through a centralized application state.
5. The application shall be production-ready rather than a prototype.
6. Any feature that cannot be completed in one generation shall be completed incrementally until the application satisfies the entire specification.
7. Preserve backwards compatibility for future specification revisions.

---

# END OF PART 07A

## Specification Status

With **FDG-T-CPS-07A.md**, the **Phase 1 Core Specification** is complete.

The recommended continuation is **Phase 2**, which would elevate the application from a calculator to a professional engineering suite by adding:

* **FDG-T-CPS-08A.md**: Complete Engineering Formula Library (every equation with derivations, symbols, units, references, and validation ranges)
* **FDG-T-CPS-08B.md**: International Standards Library (NPCP, IPC, UPC, ASPE, AWWA, NFPA references where applicable)
* **FDG-T-CPS-09A.md**: Intelligent Engineering Recommendation Engine and AI-assisted design review
* **FDG-T-CPS-10A.md**: Comprehensive Test Cases, QA Validation Suite, Benchmark Projects, and Acceptance Criteria

These additional phases would make the application comparable in scope and engineering rigor to commercial hydraulic design software rather than a standalone calculator.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
