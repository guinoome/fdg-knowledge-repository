# FBIS Reference Architecture

```text
FDG Ecosystem
      |
      v
FDG Platforms
      |
      v
FBIS Commercial Intelligence
      |
      +-- Orders
      +-- Pricing
      +-- Sales
      +-- Vouchers
      +-- Payments
      +-- Refunds
      +-- Reconciliation
      +-- Revenue
      |
      v
Reusable Commercial Services
      |
      +-- Payment Provider Adapter
      +-- Notification Adapter
      +-- Accounting Export
      |
      v
External Providers
```

Provider-specific implementation must remain replaceable.
