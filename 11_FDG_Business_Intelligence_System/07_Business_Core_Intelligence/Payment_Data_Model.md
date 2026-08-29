# Payment Data Model

Entities: Customer, Order, OrderItem, Payment, PaymentAttempt, PaymentProvider, PaymentMethod, PaymentEvent, Refund, Settlement, ReconciliationRecord.

Evidence chain: Order → Payment Attempt → Provider Transaction → Provider Event → Validation Result → Payment State → Fulfillment → Settlement → Reconciliation.

---

## FBIS Connectivity
- System: [[11_FDG_Business_Intelligence_System_Master_Index]]
- Domain: [[07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07_Business_Core_Intelligence_Master_Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07 Business Core Intelligence Master Index]] → this document
