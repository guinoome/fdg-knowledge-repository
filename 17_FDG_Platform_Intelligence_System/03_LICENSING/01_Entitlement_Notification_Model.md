# Entitlement and Renewal Notification Model

## State separation

Keep these independent:
- Internet connectivity
- subscription entitlement
- synchronization state
- protection/backup state

## Entitlement

```text
FDG License Authority
        ↓ signed entitlement
FDG Edge
        ↓
local verification
```

The entitlement should contain only the minimum data required for safe offline verification, such as tenant identity, subscription state, expiration, enabled modules, and offline validity parameters.

## Renewal communication

Use polite service language:

- 7 days — Friendly Reminder
- 3 days — Renewal Reminder
- 1 day — Final Renewal Reminder
- Expiration — Subscription Expired / service restriction notice

Candidate channels:
- dashboard
- administrative dashboard
- email

Exact grace period and restricted-mode behavior require validation.
