# FDG Business Platform

The FDG Business Platform is a premium, mobile-first ecosystem hub for discovering and opening domain-native operating modules through one account. This folder is the authoritative implementation inside the local FDG Knowledge Repository; GitHub is a mirror.

Live platform: [fdgbusinessplatforms.vercel.app](https://fdgbusinessplatforms.vercel.app/)

## Current release

- Interactive client-magnet home and business-module discovery.
- `My Platforms` portfolio bridge with Active, Trial, Setup incomplete, and Cancelled states.
- One-account prototype with module-, branch-, role-, and billing-scope demonstrations.
- Config-driven per-module and per-branch pricing examples.
- Four-step activation flow ending at an explicit no-provider payment boundary.
- Module-scoped cancellation that preserves the account and other subscriptions.
- Domain-aware portfolio analytics grounded only in the supplied fuel workbook data.
- Mobile-first PWA shell with local state and offline application caching.
- Existing [Fuel Operations](fuel-station/README.md) workspace preserved at `/fuel-station/`.

Fuel Operations is the first connected operational module. Micro Fuel Station is an activation preview. Restaurant, neighborhood retail, tire and auto, pickleball, logistics, bakery, and mobility are labelled roadmap modules; they are not represented as completed products.

## Truth and security boundary

This release is an interactive product and architecture prototype. Identity, subscription, invitation, cancellation, and billing records stay in local browser storage. No production authentication, payment provider, live integration, regulatory compliance, or secure multi-tenant authorization is claimed. Production writes will require server-side authorization, durable audit handling, and a reviewed payment integration.

## Run locally

```powershell
python -m http.server 4173
```

Open `http://localhost:4173`. Fuel Operations remains available at `http://localhost:4173/fuel-station/`.

## Validation

```powershell
npm test
npm run check
```

The validation scripts install no dependencies. Browser QA covers desktop and a 390 × 844 mobile viewport.

## Architecture and governance

- [Unified account and modular subscription architecture](docs/UNIFIED_ACCOUNT_MODULAR_ARCHITECTURE.md)
- [Active merge mandate](docs/FDG_Business_Platform_Unified_Account_Modular_Subscription_Merge_Mandate.md)
- [Visual fidelity ledger](docs/UNIFIED_PLATFORM_VISUAL_FIDELITY_LEDGER.md)
- [Current handover](CURRENT_HANDOVER.md)
- [Build preflight](BUILD_PREFLIGHT.md)
- [Design references](design/references/)

The project implements the repository relationship:

`FPIS experience primitives → FDG Business ecosystem hub → module subscription → module instance → branch-scoped operational data`
