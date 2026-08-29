# FBIS API Architecture

Capability groups:
- Products
- Pricing
- Orders
- Vouchers
- Payments
- Payment Validation
- Refunds
- Reconciliation
- Revenue
- Reporting

Provider webhooks terminate at controlled integration endpoints and are normalized before entering the FBIS domain.

Business APIs should remain provider-neutral.

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[11_FDG_Business_Intelligence_System_OLD/11_FDG_Business_Intelligence_System_Master_Index|11 FDG Business Intelligence System Master Index]] → this document
