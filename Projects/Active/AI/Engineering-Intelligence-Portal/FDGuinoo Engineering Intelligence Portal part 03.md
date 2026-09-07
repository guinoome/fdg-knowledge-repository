# Engineering Operations Center (EOC)

# PART 03
# Chief Engineer Dashboard Specification

Version: 1.0

---

# 1. Purpose

The Chief Engineer Dashboard is the operational command center of the Engineering Operations Center (EOC).

It is the first page opened every morning and shall answer one question:

> **"What requires my attention right now?"**

The dashboard is not intended to display all engineering data.

Instead, it summarizes operational conditions and directs the Chief Engineer to the appropriate module when more detail is required.

---

# 2. Dashboard Objectives

The dashboard shall enable the Chief Engineer to:

• Understand hotel engineering status within 30 seconds.

• Review overnight operational changes.

• Identify revenue-impacting issues.

• Review procurement bottlenecks.

• Monitor manpower availability.

• Prepare for the 08:30 Engineering Briefing.

• Prepare for the 09:30 HOD Meeting.

• Avoid opening multiple systems.

---

# 3. Dashboard Design Rules

The dashboard shall:

Display summaries only.

Avoid large tables.

Avoid excessive scrolling.

Provide direct navigation.

Refresh automatically.

Display synchronization status.

Remain readable on one screen.

---

# 4. Dashboard Layout

-------------------------------------------------------

Top Header

-------------------------------------------------------

Operational Health Cards

-------------------------------------------------------

Today's Critical Priorities

-------------------------------------------------------

Engineering Activity Timeline

-------------------------------------------------------

Module Summary Cards

-------------------------------------------------------

Footer Status

-------------------------------------------------------

---

# 5. Header

Displays

Hotel Name

Current Date

Current Time

Snapshot Status

Synchronization Status

Search

Notifications

Quick Actions

---

Example

Hotel ABC

Monday

28 June 2026

07:42

LIVE

Last Sync

07:41

Snapshot

Pending

---

# 6. Operational Health Cards

Display only high-level indicators.

Cards

Hotel Occupancy

VIP Arrivals

VIP Departures

OOO Rooms

OOS Rooms

Emergency Work Orders

Inventory Alerts

Critical Procurement

PM Compliance

Safety Alerts

Contractor Delays

Manpower Availability

---

Example

OOO

3

↓

Yesterday

5

---

Inventory Alerts

6

Critical

---

PM Compliance

96%

---

Safety

0

---

# 7. Engineering Health Score

Overall Engineering Health

Displayed as

0–100

Calculated using weighted operational indicators.

Suggested weighting

Room Availability

25%

Critical Work Orders

20%

PM Compliance

15%

Inventory Health

10%

Procurement Performance

10%

Guest Complaints

10%

Safety

5%

Manpower Availability

5%

Interpretation

90–100

Excellent

75–89

Good

60–74

Needs Attention

Below 60

Critical

---

# 8. Today's Critical Priorities

This section shall automatically list the highest Attention Score records.

Maximum

10 items.

Columns

Priority

Issue

Owner

Age

Impact

Next Action

ETA

Module

Example

98

Room 1812 FCU Failure

HVAC Supervisor

2 Days

Revenue

Waiting Motor Delivery

Today

OOO

---

96

PR-2458

Buyer

3 Days

Room Recovery

Follow Purchasing

Today

SCM

---

# 9. Daily Operational Summary

A concise executive overview.

Example

Occupancy remains above 90%.

Three OOO rooms remain open.

One VIP room requires engineering support.

Two purchase requests are delaying room recovery.

Preventive maintenance compliance remains above target.

No safety incidents reported.

This section shall be generated automatically by the AI engine.

---

# 10. Module Summary Cards

Each module shall display:

Current Count

Critical Count

Trend

Last Updated

Open Module

Modules

Room Operations

FCS

SCM

Inventory

PM

Manpower

Contractors

Reports

---

Example

FCS

Open

42

Critical

5

Updated

07:41

---

# 11. Engineering Activity Timeline

Displays engineering activity in reverse chronological order.

Example

07:43

Room 1812 Released

07:40

PO Approved

07:37

VIP Complaint Received

07:35

Motor Delivered

07:31

Emergency WO Assigned

07:28

Inventory Updated

Selecting an event opens the associated record.

---

# 12. Notifications

Categories

Critical

Revenue

Safety

Inventory

Procurement

Engineering

Contractor

Notifications remain visible until acknowledged or resolved.

---

# 13. Synchronization Status

Every connected source shall display:

Status

Last Sync

Records Processed

Errors

Example

Outlook

Connected

07:41

SCM

Connected

07:40

FCS

Connected

07:39

Inventory

Connected

07:42

Shared Folder

Connected

07:41

If synchronization fails, the dashboard shall display the affected source without interrupting operation.

---

# 14. Snapshot Status

Displays

LIVE

Before 07:45

SNAPSHOT

After 07:45

Information

Snapshot Created

07:45

Version

2026-06-28

Once generated, the snapshot becomes read-only.

---

# 15. Quick Actions

Toolbar actions

Refresh Data

Generate Summary

Export Dashboard

Search

Open Daily Summary

Open Notebook

Settings

Future AI Chat

---

# 16. Global Search

Always accessible.

Searches

Rooms

Equipment

Work Orders

PR

PO

SRF

Inventory

Suppliers

Technicians

Reports

Notebook

---

# 17. Dashboard Footer

Displays

Last Synchronization

Application Version

Database Status

Storage Usage

Pending Background Jobs

Upcoming Snapshot Time

---

# 18. Performance Requirements

Dashboard load

Less than 2 seconds.

Background refresh

No page reload.

Charts

Less than 1 second.

Search

Less than 1 second.

---

# 19. User Experience Requirements

The Chief Engineer shall be able to:

Understand operational status within 30 seconds.

Locate any critical issue within 10 seconds.

Navigate to any module within three clicks.

Review all priorities without scrolling.

Prepare for meetings in less than five minutes.

---

# 20. Acceptance Criteria

The dashboard shall be considered complete when it:

Automatically refreshes connected data.

Displays engineering status on one screen.

Summarizes every operational module.

Ranks issues using the Attention Score.

Supports drill-down navigation.

Provides clear synchronization status.

Generates the 07:45 snapshot.

Requires no manual report consolidation.

Serves as the single operational homepage for daily engineering management.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
