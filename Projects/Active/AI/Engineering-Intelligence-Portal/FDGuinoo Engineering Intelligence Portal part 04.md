# Engineering Operations Center (EOC)

# PART 04
# Room Operations Module (OOO / OOS Management)

Version: 1.0

---

# 1. Purpose

The Room Operations Module is the authoritative workspace for monitoring, managing, and recovering guest rooms that are Out of Order (OOO) or Out of Service (OOS).

Its primary objective is to reduce room downtime and improve revenue recovery by providing complete visibility into every affected room.

Every room shall contain its complete operational history from the moment it is removed from inventory until it is returned to sale.

The Chief Engineer shall never need to ask:

"What is happening with Room 1812?"

The answer shall already exist inside the room record.

---

# 2. Objectives

The module shall:

Track every OOO room.

Track every OOS room.

Track every released room.

Track engineering progress.

Track procurement delays.

Track contractor activities.

Track housekeeping readiness.

Track room recovery.

Provide management visibility.

Calculate room downtime.

Calculate estimated recovery.

Calculate revenue impact.

---

# 3. Room Lifecycle

Every room shall follow a standardized lifecycle.

Available

↓

Guest Reported Issue

↓

Inspection

↓

Engineering Assessment

↓

Decision

↓

OOO or OOS

↓

Repair

↓

Testing

↓

Housekeeping Cleaning

↓

Housekeeping Inspection

↓

Rooms Division Verification

↓

Returned to Inventory

↓

History Archive

Every transition shall be timestamped.

---

# 4. Room Categories

The system shall support:

Out of Order (OOO)

Out of Service (OOS)

VIP Hold

Preventive Maintenance

Deep Cleaning Support

Renovation

Engineering Observation

Contractor Access

Blocked

Released

Archived

---

# 5. Dashboard Summary

The Room Operations dashboard shall display:

Current OOO

Current OOS

Released Today

Released This Week

Average Downtime

Longest Open Room

Revenue Loss Estimate

VIP Rooms Affected

Rooms Awaiting Parts

Rooms Awaiting Contractors

Rooms Awaiting Housekeeping

Rooms Awaiting Verification

---

# 6. Room Record

Each room becomes a complete engineering record.

Required Information

Room Number

Building

Floor

Room Type

Current Status

Priority

Business Impact

Date Opened

Days Open

Owner

Assigned Supervisor

Assigned Technician

Contractor

Expected Completion

Estimated Release

Current Progress

Last Update

---

# 7. Engineering Information

Every room shall include:

Problem Description

Engineering Findings

Root Cause

Temporary Measures

Permanent Solution

Materials Required

Materials Received

Testing Result

Commissioning Result

Engineering Remarks

---

# 8. Procurement Information

Linked automatically.

Purchase Request

Purchase Order

Supplier

Expected Delivery

Actual Delivery

Reason for Delay

Current Procurement Stage

Buyer

Follow-up History

---

# 9. Contractor Information

Company

Supervisor

Contact

Scope

Progress

Inspection Status

Safety Status

Permit Status

Completion Percentage

Remarks

---

# 10. Housekeeping Status

Cleaning Required

Cleaning Started

Cleaning Completed

Inspection Pending

Inspection Passed

Ready for Sale

---

# 11. Timeline

Every update shall automatically generate a timeline.

Example

05:55

Guest reported no cooling.

06:05

Duty Engineer inspected room.

06:18

FCU motor confirmed defective.

06:32

Material unavailable.

06:40

PR linked.

06:55

Buyer notified.

07:15

Supplier confirmed stock.

09:20

Material delivered.

10:00

Repair completed.

10:35

Performance testing passed.

10:50

Housekeeping cleaning.

11:20

Room inspected.

11:35

Released.

No manual timeline editing.

---

# 12. Revenue Impact

Automatically calculate.

Inputs

Room Category

ADR

Days OOO

Occupancy

Output

Estimated Revenue Lost

Potential Revenue Recovery

---

# 13. Attention Score

Calculated automatically.

Factors

VIP

Guest Complaint

Days Open

Revenue

Safety

Material Delay

Contractor Delay

Repeat Failure

High score appears at top.

---

# 14. Required Actions

Every room must contain

Current Action

Next Action

Responsible Person

Due Date

Escalation Level

Management Support Needed

Example

Current

Waiting Motor

Next

Follow supplier

Owner

Buyer

Due

Today

---

# 15. Daily Updates

Every room requires

Daily Progress Update

Reason Still Open

Work Completed Today

Work Remaining

Expected Completion

Last Updated By

Update Time

No room may remain open without a current daily update.

---

# 16. Aging Analysis

Automatically classify

0–1 Day

Normal

2–3 Days

Monitor

4–7 Days

Attention

8–14 Days

Critical

15+ Days

Executive Review

---

# 17. Engineering KPIs

Average Downtime

Average Recovery Time

Average Procurement Delay

Rooms Released Today

Rooms Released This Week

Oldest OOO

Oldest OOS

Repeat Failures

Revenue Recovery

---

# 18. Daily AI Summary

Automatically generated.

Example

Three rooms remain OOO.

One room is awaiting FCU motor delivery.

One room has completed engineering works and is awaiting housekeeping.

One VIP room is expected to return today.

Average room downtime has improved by 18%.

---

# 19. Filters

Status

Building

Floor

Priority

Owner

Supervisor

Technician

Supplier

Contractor

Days Open

Business Impact

VIP

---

# 20. Search

Search by

Room Number

Guest Complaint

Equipment

PR

PO

Technician

Contractor

Supplier

Engineering Finding

Remarks

---

# 21. Attachments

Support

Photos

Videos

Inspection Reports

Testing Reports

Commissioning Reports

Email Correspondence

Supplier Quotations

Purchase Documents

Engineering Drawings

---

# 22. Related Records

Each room shall automatically display related information.

Linked Work Orders

Linked Purchase Requests

Linked Purchase Orders

Linked Inventory Items

Linked Contractors

Linked Engineering Notes

Linked Emails

Linked Reports

---

# 23. Automation

The module shall automatically:

Update room age.

Calculate revenue impact.

Calculate Attention Score.

Generate reminders.

Detect missing updates.

Identify procurement delays.

Notify overdue actions.

Track release progress.

---

# 24. Acceptance Criteria

The module shall be considered complete when:

Every room has one complete operational history.

Every room displays engineering, procurement, housekeeping, and contractor information in one location.

No duplicate room records exist.

Revenue impact is calculated automatically.

Timeline is generated automatically.

Management can understand room status without reading multiple reports.

The module becomes the definitive source of room recovery information for the Chief Engineer.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
