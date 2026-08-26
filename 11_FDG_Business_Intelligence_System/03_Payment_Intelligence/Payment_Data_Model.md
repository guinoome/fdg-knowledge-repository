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
