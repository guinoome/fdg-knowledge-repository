# Payment Validation Rules

Where supported, validate transaction ID, order ID, merchant/account context, amount, currency, payment status, provider, timestamp, webhook authenticity/signature, event uniqueness, expected transaction state, and refund/chargeback state.

Never activate paid fulfillment solely from client-controlled information. Use idempotency so repeated events cannot create duplicate payments, orders, fulfillment, or revenue records.

---

## FBIS Connectivity
- System: [[11_FDG_Business_Intelligence_System_Master_Index]]
- Domain: [[07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07_Business_Core_Intelligence_Master_Index]]

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System/07_Business_Core_Intelligence/07_Business_Core_Intelligence_Master_Index|07 Business Core Intelligence Master Index]] → this document
