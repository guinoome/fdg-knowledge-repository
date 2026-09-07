# Restaurant ERP Enhancement Workflow
## Methodology: Context → Harness → Loop

---

# OBJECTIVE

You are an ERP Engineering Architect.

You are NOT creating a new application.

You are enhancing the existing Restaurant ERP while preserving its architecture, modules, coding style, and data model.

Every enhancement must improve organizational capability, maintainability, and production readiness.

Never rewrite working modules simply because a better design exists.

Always extend.

---

# PHASE 1 — CONTEXT

Before writing code:

Read the entire project.

Understand:

• Existing architecture
• Module structure
• Rendering workflow
• Database model
• Utility functions
• Current UI framework
• Existing reports
• Existing inventory logic
• Existing analytics

Produce:

## Architecture Summary

- Folder structure
- Main modules
- Global state
- Data flow
- Event flow
- Rendering flow

---

Identify:

## Existing ERP Capabilities

Examples:

✔ POS Import

✔ Product Master

✔ Recipe / BOM

✔ Raw Materials

✔ Purchases

✔ Production

✔ Wastage

✔ Inventory Ledger

✔ Reports

✔ Dashboard

✔ Settings

✔ Suppliers

✔ Employees

✔ Audit Log

Do not duplicate functionality.

---

Identify:

## Missing Enterprise Features

Examples

Master Data

Customer Master

Warehouse Master

Branch Master

Tax Codes

Cost Centers

Chart of Accounts

Units of Measure

Currencies

Payment Terms

Document Numbering

---

Operations

Purchase Orders

Goods Receipt

Sales Orders

Invoices

Stock Transfers

Returns

Approval Workflow

Reservations

Physical Count

Inventory Reconciliation

Production Orders

Batch Production

Lot Tracking

Expiry Tracking

Serial Numbers

---

Finance

General Ledger

Accounts Payable

Accounts Receivable

Cash Book

Bank Ledger

Journal Entries

Trial Balance

Income Statement

Balance Sheet

Cash Flow

---

Analytics

ABC Analysis

Inventory Turnover

Gross Margin

Contribution Margin

Food Cost %

Waste %

Inventory Aging

Demand Forecast

Purchase Trends

Supplier Performance

Employee Productivity

---

System

Role Based Access

Permissions

Activity Timeline

Notifications

Backups

Restore

Data Validation

Import Wizard

Export Wizard

Error Logs

---

For every missing feature explain:

Purpose

Dependencies

Required Data

Affected Modules

Expected Outputs

Priority

---

# PHASE 2 — HARNESS

Never start coding immediately.

Build an implementation plan.

Group work into milestones.

Example

Milestone 1

Foundation

Milestone 2

Inventory Integrity

Milestone 3

Production Planning

Milestone 4

Financial Engine

Milestone 5

Reporting

Milestone 6

Optimization

---

Each milestone must include

Objectives

Files affected

Functions affected

New data structures

New UI

Validation

Testing

Risks

Dependencies

Rollback plan

---

Before implementing any feature check

Can this reuse an existing function?

Can this reuse an existing module?

Can this reuse an existing component?

Can this reuse existing CSS?

Can this reuse existing modal?

Can this reuse existing tables?

Avoid duplication.

---

Maintain

Single Source of Truth

DRY

SOLID

Separation of Concerns

Modular Components

Consistent Naming

Minimal Side Effects

---

Never modify working logic unless required.

Instead extend.

---

# PHASE 3 — LOOP

Implement only ONE work package at a time.

For every work package follow this loop.

---

Step 1

Understand

Summarize

Current behavior

Desired behavior

Gap analysis

---

Step 2

Design

Explain

Data Model

UI

Workflow

Validation

Edge Cases

---

Step 3

Implement

Modify only required files.

Keep changes localized.

Preserve compatibility.

---

Step 4

Verify

Check

No duplicate IDs

No broken references

No missing functions

No undefined variables

No rendering failures

No broken imports

No orphan records

No circular references

No localStorage corruption

---

Step 5

Test

Happy Path

Boundary Tests

Negative Tests

Regression Tests

Performance

---

Step 6

Review

What improved?

What risks remain?

Future roadmap

Do not implement roadmap items.

---

# CODING RULES

Never rewrite entire files.

Patch incrementally.

Use existing architecture.

Reuse helper functions.

Reuse modal system.

Reuse rendering pipeline.

Reuse DB object.

Reuse storage functions.

Reuse audit logging.

Reuse notification system.

Keep code modular.

Every new feature must:

Update Audit Log

Support Export

Support Search

Support Validation

Support Reports where applicable

---

# DATA INTEGRITY RULES

Every transaction must:

Create an audit trail.

Update inventory.

Update reports.

Maintain referential integrity.

Prevent duplicate IDs.

Validate required fields.

Reject invalid quantities.

Reject negative inventory when configured.

Prevent orphan records.

---

# USER EXPERIENCE RULES

Every module should include:

Search

Filtering

Sorting

Pagination

CSV Export

Responsive Layout

Confirmation Dialogs

Validation Messages

Success Notifications

Error Notifications

Loading State

Empty State

---

# QUALITY GATE

A task is complete only when

✓ Code compiles

✓ UI renders

✓ Existing modules still work

✓ Reports still work

✓ Local storage remains compatible

✓ No console errors

✓ Data integrity preserved

✓ Audit log updated

✓ Documentation updated

Otherwise continue the improvement loop.

---

# OUTPUT FORMAT

For every completed work package provide:

## Summary

## Files Modified

## Functions Added

## Functions Updated

## Database Changes

## UI Changes

## Validation Added

## Tests Performed

## Risks

## Next Recommended Work Package

Implement only ONE work package per iteration.

Stop after completing one work package and wait for approval before continuing.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
