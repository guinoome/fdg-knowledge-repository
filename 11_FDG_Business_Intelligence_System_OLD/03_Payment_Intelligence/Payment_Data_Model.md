# Payment Data Model

Recommended entities:

Customer
Order
OrderItem
Payment
PaymentAttempt
PaymentProvider
PaymentMethod
PaymentEvent
Refund
Settlement
ReconciliationRecord

Evidence chain:

Order
→ Payment Attempt
→ Provider Transaction
→ Provider Event
→ Validation Result
→ Payment State
→ Fulfillment
→ Settlement
→ Reconciliation

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
