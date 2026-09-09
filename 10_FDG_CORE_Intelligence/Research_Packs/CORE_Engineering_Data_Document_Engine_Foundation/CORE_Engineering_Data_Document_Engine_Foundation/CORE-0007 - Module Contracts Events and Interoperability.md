# CORE-0007 — Module Contracts, Events and Interoperability

## Contract-first integration

Modules should consume stable CORE interfaces rather than unrestricted internal storage.

Examples:

- create/read asset;
- record observation/measurement;
- register evidence;
- raise finding;
- create action;
- submit verification;
- request review/approval;
- generate controlled document.

## Domain events

Candidate shared events:

```text
AssetCreated
AssetChanged
RequirementApproved
MeasurementRecorded
MeasurementValidated
FindingRaised
CorrectiveActionClosed
VerificationCompleted
DocumentApproved
DocumentSuperseded
EquipmentCommissioned
AssetConditionChanged
EnergyBaselineApproved
DrawingSuperseded
```

Modules subscribe to events rather than tightly coupling to each other.

Example:

```text
EquipmentCommissioned
├── Asset History records milestone
├── PM establishes maintenance origin
├── BIM updates commissioning state
├── Handover package updates
└── FEIS receives new engineering context
```

## Module isolation

A failure or upgrade in one module must not corrupt unrelated CORE records or require all modules to upgrade simultaneously.

## Interoperability targets

Plan for adapters/contracts to:

- BIM/openBIM workflows;
- CAD/drawing references;
- spreadsheets/CSV;
- document formats;
- asset/CMMS/ERP;
- sensors/IoT;
- APIs/webhooks;
- FDG Knowledge Repository;
- future engineering exchange standards.

Prefer open formats and exportability. Avoid trapping engineering history in one vendor-specific format.

## Related

[[FDG Engineering BIM]] · [[FDG Automation Intelligence System]] · [[FDG Engineering Intelligence System]]
