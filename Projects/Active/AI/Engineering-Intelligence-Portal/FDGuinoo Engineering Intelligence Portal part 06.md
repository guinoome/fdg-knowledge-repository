# Engineering Operations Center (EOC)

# PART 06
# Procurement Intelligence Center (SCM / SRF / PR / PO)

Version: 1.0

---

# 1. Purpose

The Procurement Intelligence Center manages the complete engineering procurement lifecycle from demand identification through material receipt.

The module does not replace SCM.

Instead, it continuously synchronizes procurement information and transforms it into operational intelligence.

Its primary objective is to eliminate procurement blind spots that delay engineering operations, room recovery, preventive maintenance, and project execution.

The module shall always answer:

What is being purchased?

Why is it needed?

Who owns it?

What operation is waiting for it?

Where is the request now?

What is delaying it?

When will it arrive?

---

# 2. Procurement Lifecycle

Every procurement request shall follow one standardized workflow.

Engineering Requirement

↓

Stock Verification

↓

Inventory Available?

↓

YES

Issue Material

↓

Close Requirement

OR

NO

↓

Purchase Request (PR)

↓

Department Approval

↓

Buyer Assignment

↓

Sourcing Request Form (SRF)

↓

Supplier Invitation

↓

Quotation Received

↓

Technical Evaluation

↓

Recommendation

↓

Purchase Order

↓

Supplier Confirmation

↓

Delivery

↓

Warehouse Receiving

↓

Inspection

↓

Material Issued

↓

Engineering Completion

↓

Close Procurement

Every stage shall be timestamped.

---

# 3. Procurement Dashboard

Display

Open PR

Open SRF

Open PO

Overdue PR

Overdue SRF

Overdue PO

Delayed Deliveries

Critical Procurement

Average Lead Time

Average Approval Time

Average Delivery Time

Supplier Performance

Buyer Workload

Revenue Impact

---

# 4. Procurement Record

Each procurement item shall contain

Procurement ID

PR Number

SRF Number

PO Number

Date Requested

Requester

Department

Buyer

Supplier

Status

Priority

Attention Score

Business Impact

Current Stage

Estimated Delivery

Actual Delivery

Last Updated

---

# 5. Engineering Requirement

Every procurement record shall answer

Why is this item required?

Required For

Room

Equipment

Project

Preventive Maintenance

Emergency Repair

Contractor

General Stock

Engineering Description

Failure Description

Root Cause

Operational Impact

Revenue Impact

Safety Impact

---

# 6. Material Details

Required Fields

Item Description

Manufacturer

Brand

OEM Part Number

Internal Stock Code

Category

Subcategory

Unit

Quantity Requested

Quantity Approved

Estimated Cost

Actual Cost

Warranty

Preferred Supplier

Alternative Supplier

---

# 7. Approval Workflow

Engineering

↓

Department Head

↓

Finance

↓

Procurement

↓

Buyer

↓

Management

↓

Purchase Order

Workflow shall be configurable.

---

# 8. Procurement Timeline

Generated automatically.

Example

06:20

Inventory checked.

06:25

Stock unavailable.

06:30

PR Generated.

06:40

Engineering Approved.

07:10

Buyer Assigned.

09:25

SRF Issued.

11:30

Supplier Submitted Quotation.

13:00

Technical Evaluation Completed.

15:20

PO Approved.

Next Day

Supplier Confirmed Delivery.

No manual timeline creation.

---

# 9. Attention Score

Calculated from

Emergency Repair

VIP Impact

OOO Room

Equipment Criticality

Safety

Lead Time

Supplier Delay

Approval Delay

Inventory Level

Business Impact

The dashboard shall always display the highest-risk procurement first.

---

# 10. Lead Time Tracking

Automatically calculate

Engineering Approval Time

Buyer Assignment Time

Supplier Response Time

Quotation Time

Approval Time

PO Creation Time

Delivery Time

Receiving Time

Overall Procurement Time

Compare against targets.

---

# 11. Procurement Status

Draft

Pending Approval

Approved

Buyer Assigned

Sourcing

Quotation Pending

Quotation Received

Technical Evaluation

Recommendation

PO Processing

Supplier Confirmed

In Transit

Received

Issued

Completed

Cancelled

---

# 12. Supplier Information

Every supplier record shall contain

Supplier Name

Category

Contact Person

Email

Phone

Performance Score

Average Delivery Time

Late Deliveries

Rejected Deliveries

Warranty Claims

Preferred Status

Remarks

---

# 13. Buyer Performance

Automatically calculate

Active PR

Active SRF

Average Processing Time

Average Approval Time

Delayed Procurement

Completed Procurement

Supplier Follow-ups

Performance Trend

---

# 14. Procurement Delays

Delay Categories

Waiting Approval

Waiting Buyer

Waiting Supplier

Waiting Quotation

Waiting Evaluation

Waiting Finance

Waiting Delivery

Waiting Receiving

Waiting Inspection

Every delay requires

Reason

Owner

Expected Resolution

Management Assistance

---

# 15. Revenue Impact

The system shall automatically identify procurement requests delaying

OOO Recovery

OOS Recovery

VIP Rooms

Emergency Repairs

Critical Equipment

Guest Comfort

Revenue Protection

---

# 16. AI Procurement Analysis

Automatically identify

Frequently delayed suppliers

Frequently delayed approvals

Repeated purchases

Long lead items

Single-source suppliers

High-value purchases

Urgent procurement trends

Engineering bottlenecks

---

# 17. Procurement KPIs

Average PR Approval

Average SRF Completion

Average PO Processing

Average Delivery Time

Average Procurement Cycle

Emergency Procurement

Delayed Procurement

Supplier Performance

Buyer Performance

Procurement Success Rate

---

# 18. Filters

Status

Priority

Buyer

Supplier

Department

Category

Building

Room

Equipment

Business Impact

Revenue Impact

Date

---

# 19. Search

Search by

PR Number

SRF Number

PO Number

Supplier

Buyer

Item Description

OEM Part Number

Equipment

Room

Project

Remarks

---

# 20. Related Records

Automatically link

Engineering Case

Work Orders

Room Records

Inventory

Suppliers

Emails

Contractors

Attachments

Invoices

Receiving Reports

---

# 21. Attachments

Support

Supplier Quotations

Technical Specifications

Catalogs

Datasheets

Emails

Photos

Purchase Documents

Inspection Reports

Delivery Receipts

Invoices

Warranty Documents

---

# 22. Automation

Automatically

Detect procurement delays.

Calculate lead times.

Generate reminders.

Identify overdue approvals.

Notify buyers.

Notify engineering.

Update related Work Orders.

Update related Rooms.

Update Attention Score.

Generate executive summaries.

---

# 23. Daily AI Summary

Example

Open Procurement

38

Critical Procurement

5

Delayed Deliveries

3

OOO Rooms Waiting Materials

2

Emergency Purchases

1

Average Procurement Cycle

11.2 Days

Highest Risk Supplier

ABC Industrial

Highest Buyer Workload

Buyer 2

Most Requested Item

FCU Capacitor

---

# 24. Acceptance Criteria

The Procurement Intelligence Center shall be considered complete when

Every procurement item tells its complete lifecycle.

Engineering immediately understands procurement status without opening SCM.

Procurement delays affecting hotel operations are automatically identified.

Revenue-impacting purchases receive higher priority.

Every procurement item links directly to rooms, work orders, engineering cases, inventory, suppliers, and contractors.

The module becomes the definitive procurement decision-support platform for Engineering.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
