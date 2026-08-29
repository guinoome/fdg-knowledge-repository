# Payment Validation Rules

Where supported by the provider, validate:
- transaction ID
- order ID
- merchant/account context
- amount
- currency
- payment status
- provider
- timestamp
- webhook authenticity/signature
- event uniqueness
- expected transaction state
- refund/chargeback state

Never activate paid fulfillment solely from client-controlled information.

Use idempotency so repeated events cannot create duplicate payments, orders, fulfillment, or revenue records.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
