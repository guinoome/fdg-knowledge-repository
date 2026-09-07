# Engineering Operations Center (EOC)

# PART 02
# User Interface & User Experience (UI/UX) Specification

Version: 1.0

---

# 1. Design Philosophy

The Engineering Operations Center shall present operational information in a clean, professional, and executive-focused interface.

The interface shall prioritize decision-making rather than data entry.

Users should immediately understand:

• Current hotel engineering status

• Critical operational issues

• Revenue-impacting concerns

• Required follow-ups

• Engineering workload

The interface shall minimize distractions and maximize readability.

---

# 2. Design Principles

The interface shall follow these principles.

## Simple

Avoid unnecessary graphics.

Avoid decorative elements.

Only display useful operational information.

---

## Fast

Frequently used actions must be immediately accessible.

Maximum three clicks to reach any engineering record.

---

## Consistent

Every module shall follow identical layouts.

Tables

Filters

Buttons

Cards

Status colors

Typography

Spacing

must remain consistent throughout the application.

---

## Information First

The interface shall prioritize information instead of controls.

Users spend more time reading than editing.

---

## Responsive

The application shall work equally well on

Desktop

Tablet

Mobile

---

# 3. Theme

Default

Dark Theme

Reason

Engineering departments often work in low-light environments.

Dark backgrounds reduce eye fatigue.

Recommended Colors

Background

Near Black

Cards

Dark Gray

Primary

Blue

Success

Green

Warning

Amber

Critical

Red

Information

Cyan

Text

White

Secondary Text

Gray

---

# 4. Layout

---------------------------------------------------

Top Navigation Bar

---------------------------------------------------

Sidebar

|

|

Main Workspace

|

|

---------------------------------------------------

Status Bar

---------------------------------------------------

---

# 5. Sidebar

Permanent.

Collapsed on smaller screens.

Sections

Dashboard

Daily Summary

Room Operations

Work Orders

Procurement

Inventory

Preventive Maintenance

Manpower

Contractors

Reports

Engineering Notebook

Search

Settings

---

# 6. Top Navigation

Contains

Hotel Name

Current Date

Current Time

Synchronization Status

Search Bar

Notifications

Snapshot Status

Profile Icon

---

Example

Hotel XYZ

07:36

LIVE

Last Sync

07:35

Search...

Notifications

---

# 7. Dashboard Layout

Top Section

Engineering Health

Hotel Health

Room Status

Critical Issues

Revenue Impact

Middle Section

Today's Priorities

Open Actions

Engineering Timeline

Bottom Section

Module Summary Cards

OOO

FCS

SCM

Inventory

PM

Manpower

---

# 8. Dashboard Cards

Every card shall contain

Title

Current Value

Trend

Last Updated

Quick Action

Example

OOO Rooms

4

↑1

Updated 07:35

Open Module

---

# 9. Status Indicators

Success

Green

Information

Blue

Warning

Amber

Critical

Red

Inactive

Gray

Synchronization

Animated Blue

---

# 10. Tables

All tables shall support

Sorting

Filtering

Column Selection

Export

Search

Pagination

Sticky Header

Resizable Columns

---

# 11. Filters

Every module shall include

Status

Priority

Owner

Date

Category

Department

Supplier

Room

Technician

Contractor

Saved Filters

---

# 12. Search

Global Search

Accessible everywhere.

Searches

Rooms

Equipment

WO

PR

PO

SRF

Inventory

Emails

Reports

Contractors

Notes

Attachments

---

# 13. Engineering Timeline

One of the most important interface components.

Displays

Newest activity first.

Example

07:41

Room 1812 Released

07:38

PO Approved

07:35

VIP Complaint

07:29

Inventory Received

07:25

Emergency WO Assigned

Every item links directly to the source record.

---

# 14. Notifications

Grouped by category.

Critical

Revenue

Inventory

Safety

Procurement

Contractors

Engineering

Notifications remain until acknowledged.

---

# 15. Attention Score

Every engineering issue shall display

Attention Score

0-100

Display

90-100

Critical

70-89

High

40-69

Medium

0-39

Low

The score determines sorting.

---

# 16. Charts

Charts shall support

Daily

Weekly

Monthly

Yearly

Preferred chart types

Line

Bar

Area

Pie

Donut

Heat Map

Gauge

Avoid unnecessary animations.

---

# 17. Forms

Forms shall be minimal.

Maximum use of

Dropdowns

Auto Complete

Date Picker

Auto-fill

Linked Records

Manual typing shall be minimized.

---

# 18. Attachments

Every engineering record shall support

Images

PDF

Excel

Word

Videos

Emails

Drawings

Files displayed within the same record.

No separate browsing required.

---

# 19. Record View

Every record shall contain

Summary

Timeline

Attachments

History

Comments

Owner

Related Records

Actions

No secondary windows.

Everything visible in one place.

---

# 20. Daily Summary Page

One-page executive briefing.

Maximum reading time

Two minutes.

Sections

Hotel Status

Critical Issues

Room Recovery

Engineering

Procurement

Inventory

Safety

Action Register

Prepared automatically at

07:45

---

# 21. Export

Every page shall support

PDF

PNG

Excel

CSV

Print

Exports shall preserve layout.

---

# 22. Mobile Design

The mobile interface shall not duplicate desktop layouts.

Instead

Cards

Swipe Navigation

Expandable Sections

Quick Search

Quick Filters

Large touch targets

---

# 23. Loading States

Display

Skeleton Loaders

Progress Bars

Synchronization Status

Users shall always know when information is updating.

---

# 24. Error Handling

Errors shall explain

What happened

Why

What the user should do

Avoid technical error messages.

---

# 25. Accessibility

Support

Keyboard Navigation

High Contrast

Scalable Fonts

Screen Readers

Color-independent status indicators

---

# 26. User Experience Goals

The interface shall allow the Chief Engineer to

Understand hotel engineering status within 30 seconds.

Locate any engineering record within 10 seconds.

Identify critical issues immediately.

Prepare for Engineering Briefing within five minutes.

Prepare for HOD Meeting without opening additional systems.

The interface shall reduce cognitive load by presenting only actionable information while allowing detailed investigation through structured drill-down navigation.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
