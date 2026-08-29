# FMIS-0004 — Plant and Equipment Model

## Hierarchy

```text
Property
↓
Building
↓
Floor
↓
Area / Room
↓
Plant / System
↓
Asset
↓
Equipment
↓
Component
```

The hierarchy and plant taxonomy must remain configurable.

Typical plant categories may include HVAC, Electrical, Plumbing, Fire Protection, Water Treatment, Vertical Transportation, Building Services, Mechanical Systems, and Utility Systems.

## Equipment Record

Support equipment ID, name, manufacturer, model, serial number, location, plant, asset, criticality, operational status, installation/commissioning information, PM plan, maintenance history, failure history, and documents.

## Criticality

Criticality may consider life safety, operational dependency, revenue impact, redundancy, failure consequence, regulatory importance, and guest/customer impact.

## Plant Status

Configurable examples:

- Normal
- Running
- Standby
- Reduced Capacity
- Degraded
- Under Maintenance
- Out of Service
- Failed
- Unknown

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[16_FDG_Building_Plant_Operations_Intelligence_System (FBPOIS)/02_FMIS/00_FMIS_Master_Index|00 FMIS Master Index]] → this document
