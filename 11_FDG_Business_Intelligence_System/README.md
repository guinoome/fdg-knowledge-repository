# 11_FBIS — FDG Business Intelligence System

FBIS is the authoritative FDG intelligence system for business and commercial operations.

Scope:
- Business intelligence
- Sales intelligence
- Orders and transactions
- Pricing intelligence
- Payment intelligence
- Voucher and discount intelligence
- Customer commercial intelligence
- Revenue intelligence
- Refunds and cancellations
- Settlement and reconciliation
- Commercial dashboards and reporting
- Continuous commercial learning

Architectural rule:
FBIS owns the commercial domain. FDG platforms consume FBIS capabilities instead of independently recreating commercial rules.

Payment processing is an execution capability. Payment intelligence, validation, transaction governance, voucher logic, reconciliation, and payment analytics belong to FBIS.

Design priority:
Correctness > security > auditability > maintainability > interoperability > automation > extensibility.
