# Engineering Operations Center (EOC)

# PART 08
# Preventive Maintenance & Asset Reliability Center

Version: 1.0

---

# 1. Purpose

The Preventive Maintenance & Asset Reliability Center manages the complete lifecycle of preventive maintenance activities while measuring equipment reliability, maintainability, and operational performance.

The objective is not simply to complete PM schedules.

The objective is to maximize equipment availability while minimizing failures, guest complaints, emergency repairs, and operating costs.

---

# 2. Objectives

The module shall

Manage PM schedules.

Generate PM worklists.

Track compliance.

Track overdue PM.

Monitor equipment reliability.

Measure maintenance effectiveness.

Reduce emergency repairs.

Support asset life extension.

Provide engineering analytics.

Generate executive summaries.

---

# 3. PM Lifecycle

Every PM activity follows one lifecycle.

Scheduled

↓

Assigned

↓

Preparation

↓

Material Verification

↓

Execution

↓

Inspection

↓

Functional Testing

↓

Performance Verification

↓

Supervisor Review

↓

Completed

↓

Reliability Monitoring

↓

Next Schedule Generated

Every stage shall be timestamped.

---

# 4. Dashboard Summary

Display

PM Due Today

PM Due This Week

PM Overdue

PM Completed Today

PM Compliance

Equipment Reliability

Critical Equipment

Repeat Failures

Missed PM

PM Backlog

Upcoming Shutdowns

---

# 5. PM Record

Each PM shall contain

PM Number

Asset ID

Equipment Name

Equipment Category

Building

Floor

Room

Frequency

Priority

Maintenance Strategy

Status

Assigned Supervisor

Assigned Technician

Scheduled Date

Completion Date

Estimated Hours

Actual Hours

Difficulty Score

Last Updated

---

# 6. Asset Information

Every PM links to

Asset Register

Manufacturer

Model

Serial Number

Installation Date

Warranty

Expected Service Life

Replacement Cost

Current Condition

Criticality

Asset Owner

---

# 7. PM Frequencies

Daily

Weekly

Biweekly

Monthly

Quarterly

Semiannual

Annual

Custom Calendar

Runtime Based

Condition Based

Meter Based

---

# 8. Maintenance Strategy

Time-Based

Condition-Based

Predictive

Reliability-Centered

Statutory Inspection

Manufacturer Recommendation

Custom Program

---

# 9. PM Checklist

Each asset shall have a standardized checklist.

Example (FCU)

Visual Inspection

Drain Cleaning

Coil Cleaning

Filter Cleaning

Motor Inspection

Bearing Check

Electrical Tightening

Current Measurement

Voltage Measurement

Noise Check

Vibration Check

Insulation Check

Thermostat Test

Final Functional Test

Supervisor Verification

Digital signatures supported.

---

# 10. Materials

Every PM shall record

Required Materials

Inventory Availability

Issued Materials

Replacement Parts

Lubricants

Cleaning Chemicals

Special Tools

Consumables

---

# 11. Measurements

Support recording

Voltage

Current

Power

Temperature

Pressure

Flow

Vibration

Noise

RPM

Insulation Resistance

Water Quality

Airflow

Any measured parameter shall be trended over time.

---

# 12. Reliability Tracking

Automatically calculate

Mean Time Between Failures (MTBF)

Mean Time To Repair (MTTR)

Failure Frequency

Emergency Repair Ratio

Repeat Failures

Equipment Availability

Downtime

These indicators update continuously.

---

# 13. PM Effectiveness

Every completed PM shall continue to be monitored.

Example

PM Completed

↓

Equipment Failed

↓

Failure after 3 days

↓

PM Effectiveness reduced

The system shall distinguish between

PM completed

and

PM effective.

---

# 14. Critical Equipment

Tier 1

Life Safety

Tier 2

Revenue Critical

Tier 3

Guest Comfort

Tier 4

Operations Support

Tier 5

General Equipment

Higher tiers receive

Higher priority

Shorter PM intervals

Executive visibility

---

# 15. Shutdown Planning

Support

Shutdown Required

Guest Coordination

Department Coordination

Estimated Downtime

Approval Status

Affected Operations

Contingency Plan

---

# 16. AI Reliability Analysis

Automatically identify

Repeated failures

Poor-performing assets

Increasing maintenance cost

Recommended replacement

Changing maintenance frequency

Emerging failure trends

Seasonal failures

Abnormal measurements

---

# 17. KPIs

PM Compliance

PM Effectiveness

MTBF

MTTR

Equipment Availability

Emergency Repairs

Repeat Failures

Overdue PM

Average Completion Time

Maintenance Cost

---

# 18. Filters

Equipment

Category

Building

Frequency

Technician

Supervisor

Criticality

Status

Date

---

# 19. Search

Search by

PM Number

Equipment

Asset ID

Manufacturer

Model

Room

Building

Technician

Checklist Item

---

# 20. Attachments

Support

Photos

Videos

Thermal Images

Vibration Reports

Oil Analysis

Calibration Certificates

Commissioning Reports

Inspection Reports

Manufacturer Manuals

---

# 21. Related Records

Automatically display

Asset History

Corrective Work Orders

Engineering Cases

Inventory Usage

PR

PO

Supplier

Contractor

Warranty Claims

Previous PM Records

---

# 22. Automation

Automatically

Generate PM schedules.

Issue reminders.

Calculate MTBF.

Calculate MTTR.

Update reliability.

Detect overdue PM.

Recommend schedule changes.

Generate executive summaries.

---

# 23. Daily AI Summary

Example

PM Compliance

97.4%

PM Due Today

18

Completed

16

Overdue

2

Critical Equipment PM

100%

Equipment Showing Declining Reliability

Cooling Tower Fan No.2

Recommended Action

Detailed inspection during next shutdown.

---

# 24. Acceptance Criteria

The module shall be considered complete when

Every asset has a complete maintenance history.

PM completion and PM effectiveness are measured separately.

Reliability indicators are automatically calculated.

Equipment trends are visible.

Engineering can justify replacement decisions using historical data.

The module becomes the engineering reliability management platform rather than only a PM scheduler.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
