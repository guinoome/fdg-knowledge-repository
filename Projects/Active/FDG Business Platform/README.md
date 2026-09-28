# FDG Business Platform

Landing remaster: [[HANDOVER_Landing_Remaster_2026-09-27]] · [[docs/LANDING_PAGE_REMASTER_DECISION_2026-09-27]]. The premium FDG ecosystem hero is published; discovery begins below the fold. Real Log In and trial signup routes, responsive desktop/tablet/mobile compositions, automated checks, build and production desktop/mobile visual acceptance passed.

Connected TEST milestone: [[HANDOVER_PayMongo_Connected_2026-09-28]] — PHP500/module/branch/month after seven days, manually paid. On `fdgbusinessplatforms-paymongo-test.vercel.app/account/`, hosted QRPh simulation, signed provider settlement, duplicate replay protection, account isolation, paid-state refresh and logout passed. Only the approved test alias is public; immutable Preview remains protected. Unsigned webhook calls return 401. Production billing remains disabled; no real charges or ML Printing changes. Direct GCash/Maya are inactive. [[HANDOVER_Real_Authentication_2026-09-27]] retains the SMTP/recovery gate.

Fuel refinement: [[FUEL_REMASTER_ATTENTION_ROLLOUT_2026-09-17]] · [[HANDOVER_Fuel_Attention_Rollout_2026-09-17]]. Seven-day prototype trials, entry plans from ₱500/month/module or branch, and reviewed Fuel evidence workflows. Existing quotes preserved; operational demo entitlements remain separate from TEST account billing.

The FDG Business Platform is a premium, mobile-first ecosystem hub for discovering and opening domain-native operating modules through one account. This folder is the authoritative implementation inside the local FDG Knowledge Repository; GitHub is a mirror.

Live platform: [fdgbusinessplatforms.vercel.app](https://fdgbusinessplatforms.vercel.app/)

## Current release

- Fuel scene-first Home: glass data overlays, contextual hotspots, mobile bottom sheets and existing workflow controls. See [[HANDOVER_Fuel_Hero_Environment_2026-09-17]].

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

Operational modules remain an interactive product and architecture prototype. Their demo subscription, invitation, cancellation, billing and Fuel records stay in local browser storage. Real client authentication, server-isolated profiles and isolated TEST billing are implemented separately under `/account/`; see their current handovers for verification and email-delivery gates. Client login does not authenticate the demo role selector or migrate demo records. No live-money payment, regulatory compliance, secure operational multi-tenancy or cloud Fuel ledger is claimed.

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
- [Landing remaster decision and fidelity record](docs/LANDING_PAGE_REMASTER_DECISION_2026-09-27.md)
- [Current handover](CURRENT_HANDOVER.md)
- [Build preflight](BUILD_PREFLIGHT.md)
- [Design references](design/references/)

The project implements the repository relationship:

`FPIS experience primitives → FDG Business ecosystem hub → module subscription → module instance → branch-scoped operational data`
