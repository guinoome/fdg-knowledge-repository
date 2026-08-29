# Provider Webhook Contract

Receive → Authenticate → Parse → Validate schema → Check idempotency → Normalize → Match order/payment → Validate business conditions → Record event → Transition state → Trigger fulfillment if authorized → Audit.

Unknown or invalid events become exceptions.

---

## FBIS Connectivity
- System: [[11_FDG_Business_Intelligence_System_Master_Index]]
- Domain: [[06_Business_Architecture/06_Business_Architecture_Master_Index|06_Business_Architecture_Master_Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/06_Business_Architecture/06_Business_Architecture_Master_Index|06 Business Architecture Master Index]] → this document
