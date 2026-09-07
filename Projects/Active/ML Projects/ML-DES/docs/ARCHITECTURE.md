# Architecture (high-level)

- Modular microservices-friendly architecture
- Backend: Python Flask for API prototypes, replaceable with FastAPI or Node.js
- Frontend: Static-first with SPA capability (React/Vue) for advanced themes
- Storage: object store for media, relational DB for structured data
- Deployment: containerized services, CDN for assets, optional desktop sync client

## Components
- `dashboard` (aggregates projects)
- `project` (per-event isolated data + media)
- `media-hub` (object storage + approvals)
- `rsvp` (forms + guest management)

## Notes
Design for exportability and offline-first sync.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[Projects/Projects_Master_Index|Projects Master Index]] → this document
