# FMIS-0014 — Configuration and Extensibility

FMIS must be configurable rather than hardcoded to one property.

## Configurable Domains

- Properties
- Buildings
- Floors
- Areas
- Rooms
- Plants
- Systems
- Assets
- Equipment
- Equipment categories
- Trades
- Sub-trades
- PM frequencies
- PM templates
- Priorities
- Statuses
- Workflows
- Roles
- Permissions
- Cost centers
- Contractors
- Suppliers
- Materials
- Spare parts

## Plant Parameters

Parameters may define:

- name
- unit
- data type
- normal range
- warning range
- critical range
- frequency
- source
- responsible role

This establishes a foundation for future condition monitoring.

## User / Subscription Limits

Future platform controls may limit users, properties, buildings, assets, storage, integrations, analytics, or AI collaborators.

These are platform/commercial controls, not core maintenance rules.

## Extensibility Rule

Adding a plant type, parameter, workflow, or role should not require rewriting core maintenance logic whenever practical.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
