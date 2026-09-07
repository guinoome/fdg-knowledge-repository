# Engineering Operations Center (EOC)

# PART 05
# Engineering Work Order Management (FCS Intelligence Module)

Version: 1.0

---

# 1. Purpose

The Work Order Management Module is the operational execution center of the Engineering Operations Center.

Its purpose is not to replace FCS.

Instead, it continuously synchronizes Work Orders from FCS and enriches them with engineering intelligence that supports operational decision making.

Every Work Order becomes a complete engineering case file.

---

# 2. Objectives

The module shall

Synchronize Work Orders

Track engineering progress

Track manpower

Track procurement

Track contractor involvement

Track delays

Track repeat failures

Track engineering history

Provide management visibility

Provide engineering analytics

Generate AI summaries

---

# 3. Work Order Lifecycle

Every Work Order follows the same lifecycle.

Reported

↓

Received

↓

Assigned

↓

Investigation

↓

Diagnosis

↓

Planning

↓

Waiting Material (Optional)

↓

Waiting Contractor (Optional)

↓

Repair

↓

Testing

↓

Quality Verification

↓

Completed

↓

Closed

↓

Archived

Every transition shall be timestamped.

---

# 4. Work Order Categories

Emergency

Urgent

Routine

Guest Complaint

Preventive Maintenance

Corrective Maintenance

Predictive Maintenance

Safety

Energy

Project

Inspection

Contractor

Warranty

Housekeeping Request

Front Office Request

Management Request

---

# 5. Dashboard Summary

Display

Open WO

Closed Today

Emergency WO

Urgent WO

Waiting Materials

Waiting Contractor

Waiting Approval

Overdue

Repeat Defects

Average Resolution Time

Oldest Open WO

Average Technician Workload

---

# 6. Work Order Record

Required Information

Work Order Number

FCS Number

Source

Date Reported

Reported By

Department

Room

Equipment

Building

Floor

Priority

Status

Attention Score

Business Impact

---

# 7. Engineering Details

Description

Engineering Findings

Root Cause

Failure Mode

Immediate Action

Permanent Action

Testing Results

Completion Remarks

---

# 8. Assignment

Assigned Supervisor

Assigned Technician

Supporting Technician

Contractor

Required Skill

Trade

Electrical

Mechanical

HVAC

Civil

Painting

Plumbing

Carpentry

ELV

Automation

---

# 9. Skill Weighting

Each Work Order shall receive

Difficulty

1-10

Estimated Hours

Required Skill

Complexity

Risk Level

Criticality

This shall contribute to technician performance analysis.

Example

Replace Lamp

Difficulty

1

Estimated Hours

0.25

Replace FCU Motor

Difficulty

8

Estimated Hours

5

Chiller Troubleshooting

Difficulty

10

Estimated Hours

12

---

# 10. Procurement Link

Every WO can link to

Inventory Item

Purchase Request

SRF

Purchase Order

Supplier

Delivery

Receiving

Material Cost

No manual duplication.

---

# 11. Timeline

Generated automatically.

Example

06:05

WO Received

06:10

Assigned HVAC Supervisor

06:22

Diagnosis Completed

06:35

Material Required

06:40

Inventory Out of Stock

06:45

PR Generated

07:05

Buyer Assigned

08:15

Supplier Confirmed

10:30

Material Delivered

11:15

Repair Started

13:00

Testing Passed

13:30

Closed

---

# 12. Delay Tracking

Track

Waiting Material

Waiting Approval

Waiting Contractor

Waiting Access

Waiting Shutdown

Waiting Guest

Waiting Supplier

Waiting Management

Waiting Housekeeping

Every delay requires

Reason

Owner

Target Date

Management Support

---

# 13. Repeat Defect Detection

Automatically detect

Same Room

Same Equipment

Same Failure

Same Component

Within

30

60

90

180

365 Days

AI shall flag

Potential Root Cause Not Eliminated

---

# 14. SLA Monitoring

Emergency

Target

30 Minutes

Urgent

2 Hours

Routine

24 Hours

PM

Scheduled

Dashboard shall show

Within SLA

Approaching SLA

Exceeded SLA

---

# 15. Technician Performance

Automatically calculate

Completed WO

Average Resolution Time

Average Difficulty

Skill Distribution

Repeat Repairs

Rework

Overtime

Efficiency Score

Quality Score

No manual scoring.

---

# 16. AI Engineering Analysis

AI shall automatically identify

Recurring failures

Equipment trends

High failure rooms

High failure technicians

High failure suppliers

Material shortages

Potential engineering risks

---

# 17. Engineering KPIs

Open WO

Closed WO

Average Resolution Time

Average Response Time

Emergency Response

Repeat Failures

Material Delays

Contractor Delays

Technician Productivity

Workload Distribution

---

# 18. Filters

Status

Priority

Trade

Supervisor

Technician

Building

Floor

Room

Equipment

Date

Department

Business Impact

---

# 19. Search

Search by

WO Number

FCS Number

Equipment

Room

Technician

Supplier

Failure

Part Number

Engineering Remarks

---

# 20. Attachments

Support

Photos

Videos

Thermal Images

Inspection Reports

Commissioning Reports

Email Threads

Supplier Quotations

Drawings

Manuals

---

# 21. Related Records

Automatically link

Room Record

Inventory

PR

SRF

PO

Supplier

Emails

Contractor

PM History

Engineering Notes

Previous WO

---

# 22. Automation

Automatically

Update Aging

Calculate Attention Score

Monitor SLA

Generate Timeline

Detect Repeat Failures

Generate Follow-up Reminders

Identify Missing Updates

Generate Daily Summary

---

# 23. Daily AI Summary

Example

Open Work Orders

47

Emergency

2

Urgent

6

Waiting Materials

5

Waiting Contractor

2

Repeat Defects

3

Average Resolution Time

5.8 Hours

Most Common Failure

FCU Condensate Blockage

Highest Workload

HVAC Team

Material Delays Affecting Revenue

2

---

# 24. Acceptance Criteria

The Work Order Module shall be considered complete when

Every Work Order tells its complete engineering story.

Every Work Order links to procurement, inventory, manpower, contractors and room operations.

Technician workload is measurable.

Repeat failures are automatically detected.

AI can summarize the operational condition without manual analysis.

The module becomes the single engineering reference for all corrective maintenance activities.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
