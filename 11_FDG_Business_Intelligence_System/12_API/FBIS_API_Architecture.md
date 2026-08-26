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
