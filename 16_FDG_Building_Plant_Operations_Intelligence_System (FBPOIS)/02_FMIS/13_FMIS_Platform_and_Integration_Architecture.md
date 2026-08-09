# FMIS-0013 — Platform and Integration Architecture

## Target FBPOIS Platform

```text
Windows App
Android App
Web Portal
      ↓
FDG API Server
      ↓
Sync Engine
      ↓
PostgreSQL
      ├── Google Sheets Sync (optional)
      ├── Excel Import
      ├── Excel Export
      ├── PDF Export
      ├── Power BI
      └── Future Intelligence / AI Collaborators
```

FMIS is one domain operating within this platform.

## Deployment Direction

Support Windows, Android, web, multi-user, offline-first operation, synchronization, private infrastructure, private data centers, and future multi-data-center deployment.

## Database Direction

Google Sheets may remain during transition. PostgreSQL or another relational database is the intended system-of-record direction as the platform matures.

## Potential Integration Sources

Work-order systems, SCM/procurement, spreadsheets, Google Drive, email, shared folders, BMS, SCADA, BACnet, Modbus, IoT, Power BI.

Only implemented integrations may be represented as live.

## Synchronization

The synchronization layer should support automatic/incremental sync, retries, duplicate detection, conflict handling, history, source health, and error logging.
