# FEIS PM PWA Offline-First Architecture

## First deployment target
GitHub → Vercel → installable PWA/mobile web.

## Required first-hours capabilities
- responsive technician UI
- camera access
- QR scanning
- service-worker app shell cache
- IndexedDB/local project data
- offline checklist/measurement/evidence capture
- local photo persistence/compression
- sync queue
- automatic retry when network returns
- client representative signature capture
- report preview / local draft
- one shared codebase

## Local-first data model
Technician Phone
→ IndexedDB / Local Project Store
  - Projects
  - Assets
  - Checklists
  - Measurements
  - Evidence/Photos
  - Findings
  - Recommendations
  - Signatures
  - Sync Queue
→ Cloud API / Database when online

## Visible sync states
- Saved on device ✓
- Offline
- N items waiting to sync
- Synchronizing…
- Cloud synchronized ✓
- Sync failed — retry queued

## Principle
A technician must be able to finish a PM even if connectivity disappears inside a plant room/basement. Connectivity is needed for cloud sharing, centralized analytics or external intelligence—not for the core field workflow.

## Native apps later
Android/iOS packaging may come later if deeper device integration becomes necessary. The PWA remains the fastest first deployment and the shared codebase.
