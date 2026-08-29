# Payment Provider Abstraction

Business applications should request provider-neutral capabilities:

Create Payment
Get Payment Status
Validate Payment Event
Refund Payment
Get Settlement
Get Provider Health

Provider-specific APIs, credentials, payloads, and webhooks belong behind adapters.

No provider should become a permanent architectural dependency.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
