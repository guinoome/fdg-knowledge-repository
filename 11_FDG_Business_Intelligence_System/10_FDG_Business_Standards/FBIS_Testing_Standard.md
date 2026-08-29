# FBIS Testing Standard

Required test classes: unit, pricing, voucher, order lifecycle, payment lifecycle, webhook verification, idempotency, duplicate events, refund, reconciliation, authorization, retry/failure, recovery.

Critical scenarios include successful/failed payment, duplicate/invalid webhook, amount mismatch, wrong order ID, expired voucher, voucher race condition, 100% discount, partial refund, provider timeout, provider unavailable.

---

## FBIS Connectivity
- System: [[11_FDG_Business_Intelligence_System_Master_Index]]
- Domain: [[10_FDG_Business_Standards/10_FDG_Business_Standards_Master_Index|10_FDG_Business_Standards_Master_Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/10_FDG_Business_Standards/10_FDG_Business_Standards_Master_Index|10 FDG Business Standards Master Index]] → this document
