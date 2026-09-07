# Engineering Operations Center (EOC)

# PART 07
# Engineering Supply Intelligence Center (Inventory Management)

Version: 1.0

---

# 1. Purpose

The Engineering Supply Intelligence Center provides complete visibility of engineering materials, spare parts, consumables and critical inventory.

The objective is to ensure Engineering never experiences unnecessary operational delays caused by unavailable materials.

The system shall shift inventory management from reactive purchasing to predictive planning.

Inventory shall support engineering operations rather than simply recording stock quantities.

---

# 2. Objectives

The module shall

Maintain complete inventory records.

Monitor stock levels.

Predict stock shortages.

Trigger procurement early.

Track engineering consumption.

Monitor supplier performance.

Support room recovery.

Support preventive maintenance.

Support emergency repairs.

Reduce stockouts.

Reduce emergency purchases.

Improve inventory planning.

---

# 3. Inventory Lifecycle

Every inventory item follows one lifecycle.

Engineering Requirement

↓

Inventory Check

↓

Available

↓

Issue Material

↓

Engineering Usage

↓

Stock Updated

OR

Unavailable

↓

Procurement Trigger

↓

Receiving

↓

Inspection

↓

Warehouse Storage

↓

Available Stock

Every movement shall be recorded.

---

# 4. Dashboard Summary

Display

Total Inventory Items

Critical Stock

Below Reorder Point

Out of Stock

Pending PR

Pending Delivery

Receiving Today

Fast Moving

Slow Moving

Obsolete Stock

Inventory Value

Monthly Consumption

Inventory Health Score

---

# 5. Inventory Record

Each inventory item shall contain

Inventory ID

Item Code

Description

Category

Subcategory

OEM Number

Manufacturer

Brand

Unit

Location

Bin Number

Minimum Stock

Maximum Stock

Current Stock

Reserved Quantity

Available Quantity

Reorder Level

Lead Time

Preferred Supplier

Alternative Supplier

Unit Cost

Average Cost

Inventory Value

Last Updated

---

# 6. Categories

Electrical

Mechanical

HVAC

Plumbing

Civil

Painting

Carpentry

Fire Protection

ELV

General Maintenance

Cleaning Chemicals

Lubricants

Safety Equipment

Tools

Consumables

Office Supplies

---

# 7. Stock Status

Healthy

Monitor

Reorder Required

Critical

Out of Stock

Obsolete

Discontinued

Automatically determined.

---

# 8. Reorder Logic

The system shall calculate

Daily Consumption

Weekly Consumption

Monthly Consumption

Average Usage

Lead Time

Safety Stock

Recommended Order Quantity

Example

Current Stock

8 pcs

Average Monthly Usage

12 pcs

Lead Time

30 Days

Recommendation

Generate PR Immediately

No manual calculation required.

---

# 9. 80 Percent Procurement Rule

Each inventory item shall contain

Minimum Operating Stock

Warning Level

Critical Level

Example

Minimum Stock

20

Warning

16

Critical

10

Current

15

Result

Automatic Procurement Alert

The threshold shall be configurable.

---

# 10. Procurement Integration

Automatically link

Inventory

↓

PR

↓

SRF

↓

PO

↓

Supplier

↓

Receiving

↓

Warehouse

↓

Engineering

Every inventory shortage shall display procurement progress.

---

# 11. Consumption Tracking

Every issued item shall record

Date

Technician

Department

Room

Equipment

Work Order

Engineering Case

Project

Quantity

Purpose

Remarks

No inventory movement without traceability.

---

# 12. Engineering Dependency

Each inventory item shall display

Which Rooms

Which Work Orders

Which Projects

Which PM

Which Equipment

are waiting for the material.

Example

FCU Motor

Waiting

Room 1812

Room 1821

WO-2025

PM-104

Emergency Repair

This allows Engineering to prioritize procurement.

---

# 13. Supplier Information

Preferred Supplier

Alternative Supplier

Average Delivery

Lead Time

Performance Score

Warranty

Last Purchase

Contract Status

Price Trend

---

# 14. Inventory Timeline

Automatically generated

Example

June 12

Purchased

June 14

Received

June 16

Issued to Room 1812

June 18

Issued to PM

June 22

Remaining Stock

12 pcs

June 25

Reorder Alert Generated

---

# 15. AI Intelligence

Automatically identify

Frequently Used Items

Seasonal Demand

Repeated Emergency Purchases

Unused Inventory

Dead Stock

Slow Moving

High Value Inventory

Supplier Risks

Potential Stockouts

Recommended Safety Stock

---

# 16. Inventory Health Score

Calculated

Current Stock

Consumption

Lead Time

Criticality

Emergency Usage

Supplier Reliability

Pending Procurement

Display

0–100

Higher score indicates healthier inventory.

---

# 17. Alerts

Critical Stock

Reorder Required

Supplier Delay

Receiving Delay

High Consumption

Unexpected Usage

Expired Items

Warranty Expiring

Inventory Audit Due

---

# 18. KPIs

Inventory Value

Critical Items

Out of Stock

Average Lead Time

Average Consumption

Emergency Purchases

Inventory Turnover

Dead Stock Value

Stock Accuracy

Receiving Accuracy

---

# 19. Filters

Category

Supplier

Location

Status

Criticality

Stock Level

Building

Department

Project

Warranty

---

# 20. Search

Search by

Item Code

Description

OEM Number

Manufacturer

Brand

Supplier

Equipment

Room

WO

Engineering Case

---

# 21. Attachments

Support

Datasheets

Catalogs

Photos

Installation Manuals

Safety Data Sheets

Warranty

Invoices

Receiving Reports

Inspection Reports

---

# 22. Related Records

Automatically display

Engineering Cases

Rooms

Work Orders

PR

SRF

PO

Suppliers

PM

Contractors

Receiving

---

# 23. Automation

Automatically

Monitor stock.

Calculate consumption.

Predict shortages.

Generate procurement alerts.

Calculate reorder quantity.

Monitor supplier delays.

Update engineering dependencies.

Generate AI recommendations.

Create executive summaries.

---

# 24. Daily AI Summary

Example

Inventory Health

92%

Critical Stock

6 Items

Below Reorder

18 Items

Out of Stock

2 Items

Emergency Purchases

1

Highest Consumption

PVC Solvent Cement

Supplier Delay

FCU Motor

Estimated Stockout

Contactors

Within 5 Days

---

# 25. Acceptance Criteria

The module shall be considered complete when

Engineering always knows current stock status.

Procurement begins before stock becomes critical.

Every inventory movement is traceable.

Every shortage displays operational impact.

Engineering can identify affected rooms, work orders, and projects from one inventory record.

The module becomes the primary inventory planning tool for the Engineering Department.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
