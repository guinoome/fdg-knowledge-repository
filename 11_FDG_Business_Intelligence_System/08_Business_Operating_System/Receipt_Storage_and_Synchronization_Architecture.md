---
title: Receipt Storage and Synchronization Architecture
status: Active
date: 2026-09-29
---

# Receipt Storage and Synchronization Architecture

[[08_Business_Operating_System/08_Business_Operating_System_Master_Index|08 Business Operating System Master Index]]
[[08_Business_Operating_System/FDG_Receipt_Expense_Intelligence|FDG Receipt & Expense Intelligence]]

## Goal

Support client-selectable storage while keeping receipt capture reliable, offline-capable, auditable, and provider-replaceable.

## Supported Storage Pattern

Mobile / PWA Capture
↔ Local Offline Store
↔ Sync Engine
↔ Approved Client / Platform Storage

Possible approved destinations:

- local storage
- Google Drive
- Google Sheets
- platform database
- client-owned database/storage
- hybrid combinations

## Google-Oriented Default

Where a client signs in with Google/Gmail and no different storage architecture has been selected:

- Google Drive may hold receipt/invoice files
- Google Sheets may hold appropriate structured client-facing records
- a platform database may still be required for relational state, audit events, sync metadata, conflict handling, or high-volume transactions

Do not force binary evidence or complex relational data into Google Sheets when it is not reliable for the use case.

## Offline Rule

Receipt capture should work without connectivity:

1. save receipt locally
2. store extracted draft locally
3. mark as Waiting to Sync
4. sync when network returns
5. verify destination write
6. mark Synchronized

## Sync States

- Saved Locally
- Waiting to Sync
- Syncing
- Synchronized
- Sync Failed
- Review Required

Never silently discard a captured receipt.

## Conflict Rule

If two authoritative versions conflict:

> Conflict — Review Required

Do not silently overwrite one person's verified work.

## Architecture Principles

- Local-First
- Offline-Capable
- Agent-Neutral
- Provider-Replaceable
- Evidence-Preserving
- Audit-Ready
