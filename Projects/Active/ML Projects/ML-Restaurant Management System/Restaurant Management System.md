# Restaurant Management System (Excel-Based ERP)
## Master Specification for AI-Assisted Development

**Version:** 1.0  
**Purpose:** Build a professional Microsoft Excel Restaurant Management System that automatically generates inventory, sales, costing, and management reports from POS exports with minimal manual work.

---

# 1. Project Objective

Develop a professional Excel workbook that allows restaurant operators to:

- Import daily POS exports.
- Automatically update inventory.
- Calculate ingredient consumption using recipes (BOM).
- Monitor food cost.
- Track profitability.
- Generate executive dashboards.
- Produce management reports.
- Minimize manual encoding.

The workbook should follow ERP principles while remaining simple enough for daily restaurant operations.

---

# 2. Design Principles

The workbook shall be:

- Modular
- Maintainable
- Scalable
- User-friendly
- Fully formula-driven where possible
- Compatible with Microsoft Excel 365
- Power Query ready
- Power Pivot compatible
- Dashboard-driven
- Easy to migrate into a future SQL-based ERP

---

# 3. Workbook Structure

```
Restaurant_Management_System.xlsx

00_Settings
01_POS_Import
02_Product_Master
03_Recipe_BOM
04_Raw_Materials
05_Purchases
06_Stock_Adjustments
07_Wastage
08_Production
09_Inventory_Ledger
10_Sales_Analysis
11_Profit_Analysis
12_Daily_Report
13_Weekly_Report
14_Monthly_Report
15_Dashboard
16_Low_Stock
17_Suppliers
18_Employees
19_Audit_Log
```

---

# 4. Sheet Specifications

---

## 00_Settings

Contains:

- Company Information
- Branch Information
- Tax Rate
- Currency
- Dashboard Parameters
- Report Dates
- Color Themes
- Named Ranges

---

## 01_POS_Import

Purpose:

Raw imported POS export.

Users only:

- Paste POS Export

Never manually edit formulas.

Expected Columns

- Date
- Invoice No
- Product Name
- Category
- Unit
- Current Stock
- Minimum Stock
- Cost
- Selling Price
- Current Stock Value
- Current Stock Cost
- Amount Sold
- Quantity Sold
- Profit

---

## 02_Product_Master

Contains

- Product ID
- Product Name
- Category
- Menu Item
- Raw Material
- Unit
- Selling Price
- Standard Cost
- Tax Rate
- Status

---

## 03_Recipe_BOM

Recipe database.

Example

Burger

- Bun
- Patty
- Cheese
- Lettuce
- Sauce

Pizza

- Dough
- Cheese
- Pepperoni
- Sauce

Fields

- Recipe ID
- Product
- Ingredient
- Quantity Required
- Unit
- Cost
- Effective Date
- Version

---

## 04_Raw_Materials

Fields

- Material ID
- Material Name
- Category
- Unit
- Current Stock
- Minimum Stock
- Reorder Quantity
- Unit Cost
- Supplier
- Batch Number
- Expiry Date
- Shelf Life
- Current Inventory Value

---

## 05_Purchases

Purchase Register

Fields

- Date
- Supplier
- PO Number
- Invoice Number
- Material
- Quantity
- Unit Cost
- Total Cost
- Received By

Automatically updates inventory.

---

## 06_Stock_Adjustments

Adjustment Register

Reasons

- Physical Count
- Damage
- Expired
- Correction
- Transfer

Fields

- Date
- Item
- Quantity
- Reason
- Approved By

---

## 07_Wastage

Tracks food waste.

Reasons

- Burned
- Spoiled
- Expired
- Customer Complaint
- Preparation Error
- Staff Meal

Fields

- Date
- Ingredient
- Quantity
- Cost
- Reason
- Employee

---

## 08_Production

Tracks prepared products.

Example

- Dough Produced
- Burger Patty Produced
- Sauce Produced

Automatically:

- Consumes ingredients
- Adds finished inventory

---

## 09_Inventory_Ledger

Every stock movement.

Movement Types

- Opening Balance
- Purchase
- Sales Consumption
- Production
- Waste
- Adjustment
- Staff Meal
- Transfer
- Return

Fields

- Date
- Item
- Movement Type
- Quantity In
- Quantity Out
- Running Balance

---

## 10_Sales_Analysis

Automatically generated.

KPIs

- Daily Sales
- Weekly Sales
- Monthly Sales
- Best Seller
- Worst Seller
- Category Sales
- Average Transaction
- Peak Sales Hour

---

## 11_Profit_Analysis

Calculate

Revenue

minus

Ingredient Cost

minus

Packaging

minus

Utilities Allocation

minus

Labor Allocation

equals

Gross Profit

Net Profit

Margin %

---

## 12_Daily_Report

Automatic

Includes

- Revenue
- Profit
- Inventory Value
- Waste
- Low Stock
- Top Selling Products

---

## 13_Weekly_Report

Weekly summaries

Growth

Comparison

Sales Trend

Inventory Trend

---

## 14_Monthly_Report

Executive Report

Includes

Revenue

COGS

Gross Profit

Food Cost %

Waste %

Inventory Value

Top Products

Top Categories

Inventory Turnover

---

## 15_Dashboard

Executive Dashboard

KPI Cards

- Revenue Today
- Weekly Revenue
- Monthly Revenue
- Gross Profit
- Net Profit
- Inventory Value
- Food Cost %
- Waste %
- Low Stock

Charts

- Daily Sales Trend
- Monthly Trend
- Product Performance
- Category Sales
- Inventory Value
- Waste Trend
- Profit Trend

Dashboard Filters

- Date
- Category
- Branch
- Employee

---

## 16_Low_Stock

Automatically displays

Items where

Current Stock <= Minimum Stock

Shows

- Supplier
- Lead Time
- Suggested Order Quantity

Conditional Formatting

Red

Orange

Yellow

---

## 17_Suppliers

Fields

- Supplier
- Contact
- Email
- Phone
- Lead Time
- Products Supplied
- Average Cost
- Performance Rating

---

## 18_Employees

Fields

- Employee
- Position
- Sales
- Waste
- Production
- Cashier Performance

---

## 19_Audit_Log

Automatically records

- Import Time
- Imported By
- Rows Imported
- Duplicate Records
- Errors
- Refresh History

---

# 5. Automation Flow

```
POS Export
      ↓
Paste into POS Import
      ↓
Refresh Workbook
      ↓
Update Sales
      ↓
Update Recipe Consumption
      ↓
Update Inventory
      ↓
Update Profit
      ↓
Update Dashboard
      ↓
Update Reports
      ↓
Generate Alerts
```

---

# 6. Advanced Features

## Purchase Order Generator

Automatically generates purchase recommendations based on:

- Current Stock
- Minimum Stock
- Lead Time
- Forecast Demand

---

## ABC Inventory Classification

Classify inventory as

- A
- B
- C

Based on

- Annual Consumption Value
- Usage Frequency

---

## Food Cost Analysis

Calculate

- Food Cost %
- Menu Food Cost
- Category Food Cost
- Daily Food Cost
- Monthly Food Cost

---

## Menu Engineering

Categorize menu items into

- Stars
- Plow Horses
- Puzzles
- Dogs

Based on

- Profitability
- Popularity

---

## Inventory Aging

Monitor

- Days in Inventory
- Shelf Life
- Expiry Risk

Generate expiry alerts.

---

## Variance Analysis

Compare

Theoretical Consumption

vs

Actual Inventory

Report

- Variance Quantity
- Variance Cost
- Shrinkage %
- Investigation Required

---

## Daily Cash Reconciliation

Compare

- POS Sales
- Cash Count
- Card Sales
- Digital Payments

Highlight shortages and overages.

---

## Sales Forecasting

Predict

- Tomorrow
- Next Week
- Next Month

Using historical sales.

---

## Executive KPI Dashboard

Display

Revenue

Gross Profit

Net Profit

Inventory Value

Food Cost %

Waste %

Inventory Turnover

Low Stock

Sales Growth

Profit Growth

---

## Stock Count Module

Support

- Blind Counts
- Scheduled Counts
- Variance Reports
- Inventory Adjustment Approval

---

## Batch & Expiry Management

Track

- Batch Number
- Expiry Date
- Shelf Life
- FEFO

Automatic alerts for expiring inventory.

---

## Supplier Performance

Metrics

- On-Time Delivery
- Price Trend
- Lead Time
- Accuracy
- Supplier Score

---

## Price History

Track

- Historical Purchase Costs
- Inflation
- Cost Trends

---

## Recipe Version Control

Maintain

- Recipe Versions
- Effective Dates
- Cost Changes

---

## Production Planning

Forecast

Daily kitchen production requirements.

Recommend

- Ingredient preparation
- Batch sizes

---

## Waste Cost Analysis

Analyze

- Waste Cost
- Waste %
- Waste by Employee
- Waste by Category
- Waste by Shift

---

## Customer Analytics (Optional)

Track

- Repeat Customers
- Favorite Products
- Customer Lifetime Value
- Average Spending

---

## Employee Performance (Optional)

KPIs

- Sales
- Transactions
- Refunds
- Voids
- Waste
- Productivity

---

# 7. Dashboard KPIs

Sales

- Revenue Today
- Revenue This Week
- Revenue This Month
- Sales Growth

Inventory

- Inventory Value
- Inventory Turnover
- Days of Inventory
- Low Stock Count

Profitability

- Gross Profit
- Net Profit
- Gross Margin
- Food Cost %

Operations

- Waste %
- Production Efficiency
- Purchase Orders Pending
- Supplier Performance

Top Performers

- Best Seller
- Most Profitable Product
- Best Category

Alerts

- Low Stock
- Expiring Inventory
- Negative Margin Products
- Inventory Variance

---

# 8. Development Roadmap

## Phase 1 — Core System

- POS Import
- Product Master
- Raw Materials
- Recipe BOM
- Sales Reports
- Dashboard
- Low Stock Alerts

---

## Phase 2 — Inventory Control

- Purchases
- Inventory Ledger
- Stock Adjustments
- Wastage
- Stock Count
- Purchase Order Generator

---

## Phase 3 — Business Intelligence

- Food Cost Analysis
- Profit Analysis
- ABC Classification
- Menu Engineering
- Forecasting
- Executive Dashboard

---

## Phase 4 — Enterprise Features

- Customer Analytics
- Employee Analytics
- Multi-Branch Support
- Multi-Warehouse Support
- Approval Workflow
- Role-Based Access
- Complete Audit Trail
- SQL ERP Migration Readiness

---

# 9. Technical Requirements

- Microsoft Excel 365 compatible.
- Use structured Excel Tables for all datasets.
- Use dynamic array formulas where appropriate.
- Minimize volatile functions.
- Support Power Query for data import.
- Use PivotTables and PivotCharts for reporting.
- Employ named ranges and structured references.
- Apply conditional formatting for alerts.
- Maintain separation between raw data, calculations, and presentation layers.
- Design for future migration to a relational database without changing business logic.

---

# 10. Expected Deliverables

1. Fully functional Excel workbook.
2. Automated dashboards and reports.
3. Interactive KPI dashboard.
4. Inventory management system.
5. Recipe/BOM costing engine.
6. Profitability analysis.
7. Purchasing and reorder recommendations.
8. Waste and variance monitoring.
9. Executive reporting suite.
10. Documentation describing workbook architecture, formulas, assumptions, and future ERP migration considerations.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
