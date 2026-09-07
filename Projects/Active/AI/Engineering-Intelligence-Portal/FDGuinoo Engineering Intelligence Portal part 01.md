# Engineering Operations Center (EOC)

# PART 01
# System Architecture

Version: 1.0

---

# 1. Purpose

The Engineering Operations Center (EOC) is designed as the primary operational platform for the Hotel Chief Engineer.

The application consolidates engineering operational information from multiple business systems into one intelligent workspace.

The system does NOT replace hotel software.

Instead, it functions as the operational intelligence layer above existing systems.

---

# 2. High Level Architecture

                    External Systems
────────────────────────────────────────────────────

Microsoft Outlook

Engineering Shared Folder

FCS

SCM

SRF

Inventory Files

PM Reports

Contractor Reports

Housekeeping Reports

Front Office Reports

Utility Reports

Engineering Notes

────────────────────────────────────────────────────

               Synchronization Engine

────────────────────────────────────────────────────

Data Collection

↓

Validation

↓

Normalization

↓

Duplicate Detection

↓

Relationship Mapping

↓

Priority Calculation

↓

AI Analysis

↓

Engineering Database

────────────────────────────────────────────────────

             Engineering Operations Center

────────────────────────────────────────────────────

Dashboard

Daily Summary

OOO/OOS

Work Orders

Procurement

Inventory

Preventive Maintenance

Manpower

Contractors

Reports

Engineering Notebook

Settings

────────────────────────────────────────────────────

Export Engine

PDF

PNG

Excel

CSV

Print

---

# 3. Design Philosophy

The application shall become the first screen opened every morning.

The user should not need to open Outlook, FCS, SCM or multiple spreadsheets before the Engineering Briefing.

---

# 4. Core Principles

Single Source of Truth

No duplicated data.

Everything searchable.

Everything linked.

Everything timestamped.

Everything exportable.

Everything traceable.

---

# 5. System Layers

Layer 1

Presentation Layer

Purpose

Dashboard

Reports

Charts

Tables

Search

Exports

Responsive UI

---

Layer 2

Business Logic

Purpose

Priority Engine

AI Summary

Calculations

Validation

Automation

Notifications

KPIs

Engineering Rules

---

Layer 3

Synchronization Engine

Purpose

Collect

Merge

Validate

Normalize

Monitor

Schedule

Update

---

Layer 4

Database

Purpose

Permanent storage

Historical records

Relationships

Snapshots

Search

Analytics

---

# 6. Technology Stack

Frontend

Next.js

React

TypeScript

Tailwind CSS

Shadcn UI

Backend

Next.js Server Actions

Node.js

Database

PostgreSQL

Prisma ORM

Deployment

GitHub

Vercel

PDF Generation

React PDF

PNG Export

html-to-image

Excel

ExcelJS

Charts

Recharts

Search

Fuse.js

Icons

Lucide Icons

Date Handling

Day.js

Validation

Zod

---

# 7. Folder Structure

/app

/dashboard

/daily-summary

/rooms

/fcs

/scm

/inventory

/pm

/manpower

/contractors

/reports

/notebook

/settings

/api

/components

/layout

/charts

/cards

/tables

/forms

/dialogs

/navigation

/search

/lib

/database

/ai

/sync

/export

/utils

/hooks

/types

/public

/logos

/icons

/templates

/uploads

/reports

---

# 8. Engineering Database

The database is the heart of the application.

Every module references the same database.

No duplicated records.

Every engineering issue receives one unique identifier.

Example

ENG-2026-000001

Regardless of where the issue originated

Email

FCS

OOO

Inventory

Contractor

everything links to the same Engineering Record.

---

# 9. Data Relationships

One Room

may have

Many Work Orders

One Work Order

may require

Many Materials

One Material

may belong to

Many Purchase Requests

One Purchase Request

may create

One Purchase Order

One Purchase Order

may supply

Many Rooms

Every relationship shall remain connected.

---

# 10. Synchronization Philosophy

The application continuously synchronizes data.

No manual "Import" button shall be required for normal daily operation.

Synchronization methods depend on the capabilities of each source system.

Where direct APIs are available, use API-based synchronization.

Where APIs are unavailable, support reliable automated retrieval methods such as monitored folders or scheduled processing.

The goal is to minimize manual intervention.

---

# 11. AI Intelligence Layer

The AI layer never replaces engineering judgment.

Its responsibilities are to:

Summarize

Prioritize

Classify

Detect duplicates

Suggest follow-up

Highlight risks

Generate executive reports

Identify trends

Recommend actions

Engineering decisions remain with the Chief Engineer.

---

# 12. Dashboard Philosophy

The dashboard shall never become cluttered.

If information exceeds one screen,

move it into its own module.

Dashboard

answers

"What needs my attention?"

Modules

answer

"Tell me everything."

---

# 13. Navigation Philosophy

Maximum

Three clicks.

Example

Dashboard

↓

Room Operations

↓

Room 1812

Every record shall be accessible within three clicks.

---

# 14. Search Philosophy

One search bar.

Searches everything.

Room

Equipment

Technician

Supplier

Contractor

Work Order

PR

PO

SRF

Inventory

Reports

Engineering Notes

Attachments

Search results shall show the originating module and allow direct navigation.

---

# 15. Snapshot Architecture

Two operational modes exist.

LIVE Mode

Continuously updated.

SNAPSHOT Mode

Generated automatically at

07:45 AM

The Snapshot becomes

Engineering Briefing

HOD Briefing

Historical Record

Daily KPI Reference

The Live Dashboard continues updating after the snapshot.

---

# 16. Performance Requirements

Dashboard load time

Target

<2 seconds

Search

<1 second

Synchronization

Background

No UI interruption

PDF generation

<10 seconds

PNG export

<5 seconds

---

# 17. Scalability

Although intended for one user,

the architecture shall support future expansion without redesign.

Future options include

Multiple hotels

Engineering teams

Role-based access

Cloud database

API integrations

Mobile application

Predictive maintenance

---

# 18. Engineering Standards

Every issue shall have

Owner

Status

Priority

Last Update

Business Impact

Next Action

Reason Open

Target Completion

History

Attachments

Nothing shall exist without accountability.

---

# 19. Architectural Goals

Reduce morning preparation.

Reduce duplicate work.

Reduce forgotten follow-ups.

Improve engineering visibility.

Improve operational awareness.

Provide executive-level reporting.

Maintain complete engineering history.

Support future AI capabilities.

The system shall become the Chief Engineer's primary operational workspace rather than simply another reporting tool.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
