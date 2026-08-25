# Payment Blueprint

## Objective

Prefer payment flows that minimize unnecessary intermediary fees and payment-processing burden while remaining technically and legally appropriate.

Preferred direction:
USER
→ DIRECT PAYMENT
→ PAYMENT REFERENCE / TRANSACTION DATA
→ VALIDATION
→ VERIFIED
→ ENTITLEMENT ACTIVATED

Supported candidate methods:
- GCash
- QR
- Bank Transfer
- Cards
- E-wallets
- Other

## Payment Capability Matrix

For each method evaluate:
- direct-to-owner availability
- API availability
- webhook availability
- transaction reference
- automated verification
- manual verification fallback
- fees
- settlement
- refunds
- regional availability
- legal/compliance requirements

Never promise live validation unless the payment method provides a reliable verification mechanism.

## Architecture

Projects should communicate with a payment abstraction layer rather than hard-code provider-specific logic throughout the product.
