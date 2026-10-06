---
document_id: FPJIS-FPCV-0700
title: Offline-First Runtime and GitHub Blueprint
status: Blueprint
created: 2026-10-07
---

# Offline-First Runtime and GitHub Blueprint

## Objective

Allow the future workspace to be developed, tested and operated locally without paying for hosting or depending on a cloud backend. Preserve a clean path to later hosted deployment without rewriting the domain.

## Architectural Rule

```text
GitHub Knowledge Repository
        ↓ read/reference
Blueprint + Rules + Sanitized Knowledge
        ↓
Local Application Runtime
        ↓
Local Operational Data Store
        ↓
Export / Backup / Restore
        ↓
Optional Remote Sync Adapter — disabled until approved
```

## Recommended Initial Technical Shape

This is a blueprint recommendation, not build authorization.

### Frontend
- TypeScript
- modern component framework (React/Vue/Svelte acceptable if execution package selects one)
- responsive PWA
- service worker for static shell/cache
- no mandatory external API for core operation

### Local Persistence
Preferred web-compatible adapter:
- IndexedDB through a typed repository/data-access layer

Alternative local adapters may be used if justified:
- SQLite in desktop/local runtime
- OPFS/PGlite for advanced local relational needs

Domain code must depend on a storage interface, not a specific provider.

### Attachments
Local attachment adapter with:
- stable attachment ID;
- metadata record;
- size/type limits;
- hash where practical;
- orphan detection;
- export inclusion.

### Future Backend
Possible later adapters:
- Supabase;
- PostgreSQL API;
- other provider.

No backend provider may leak into domain rules.

## Storage Interface

Conceptual:
```ts
interface CommercialValidationStore {
  opportunities: Repository<Opportunity>
  offers: Repository<Offer>
  prospects: Repository<Prospect>
  pilots: Repository<Pilot>
  marketSignals: Repository<MarketSignal>
  evidence: Repository<Evidence>
  decisions: Repository<GateDecision>
  exportBackup(): Promise<PortableBackup>
  importBackup(pkg: PortableBackup): Promise<ImportResult>
}
```

Implementation language may vary; the contract is architectural.

## Offline-Capable Minimum

Without internet, user must be able to:
- open existing local workspace;
- view portfolio;
- create/update opportunity;
- create/update prospect;
- record interactions;
- create market-signal draft;
- execute pilot checklist;
- log time;
- attach allowed evidence;
- view pricing rules;
- produce local report/summary where implemented;
- export backup.

Actions that inherently require internet display:
- Pending External Action;
- Pending Sync;
- Source Verification Required.

## GitHub Relationship

GitHub is canonical for:
- blueprint package;
- standards;
- accepted reusable knowledge;
- source-controlled application code when coding begins;
- fixtures and sanitized demo data;
- test definitions;
- release evidence;
- handovers.

GitHub is **not** the operational store for:
- client names/private contacts;
- raw client files;
- private payment evidence;
- credentials;
- secrets.

## Repository-to-App Knowledge Bundle

At build time, the application may consume a generated/sanitized knowledge bundle containing:
- offer definitions;
- authority references;
- pricing rule defaults;
- status vocabularies;
- acceptance criteria;
- source registry.

Bundle must record:
- source commit;
- generated_at;
- included documents;
- bundle version.

The app must show its loaded knowledge version.

## Sync Architecture — Future

If remote sync becomes authorized:
```text
Local write
→ local revision
→ outbox event
→ authenticated sync
→ server validation
→ acknowledgment
→ local sync state
```

Conflict:
`Conflict — Review Required`

Never use last-write-wins for material commercial records without explicit design approval.

## Backup Requirements

Local workspace must support:
- manual full backup;
- export before migration;
- restore validation;
- version compatibility;
- no dependence on one browser profile without export path.

Optional auto-backup may be introduced after filesystem/runtime constraints are known.

## Provider Replacement Test

A compliant implementation can replace:
- hosting;
- database;
- model;
- payment provider;
- email provider

without rewriting opportunity, offer, pilot and gate semantics.

## No-Hidden-Cloud Rule

Local validation shall not silently depend on:
- remote database;
- remote auth;
- analytics SaaS;
- third-party CDN unavailable offline;
- model API.

If optional services are used, loss of those services must expose a controlled degraded state.

> **Knowledge path:** [[20_FPJIS_FDG_Project_Intelligence_System/33_First_Payout_Commercial_Validation_Blueprints/00_Master_Index|FPCV Master Index]] → this document.
