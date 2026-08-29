# Provider Webhook Contract

Inbound provider events should pass through:

Receive
→ Authenticate
→ Parse
→ Validate schema
→ Check idempotency
→ Normalize
→ Match order/payment
→ Validate business conditions
→ Record event
→ Transition state
→ Trigger fulfillment if authorized
→ Audit

Unknown or invalid events become exceptions.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
