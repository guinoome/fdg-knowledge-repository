# FDG Business Platforms

FDG's governed workspace for domain-native business operating products. The local folder inside the FDG Knowledge Repository is the source of truth; this GitHub repository is its implementation mirror.

## Active platform

- [FDG Fuel Station Operations](fuel-station/README.md) — a premium, mobile-first, local-first operating prototype for NJ Gas Station — Habay, grounded in supplied client records and governed by FPIS experience guidance.
- [Build preflight](BUILD_PREFLIGHT.md) — platform family, evidence boundary, architecture choices, and release constraints.
- [Design concepts](design/concepts/) — approved visual exploration retained as design evidence.

Live prototype: [fdgbusinessplatforms.vercel.app](https://fdgbusinessplatforms.vercel.app/#experience)

## Fuel-station experience

The current release supports source-grounded wet-stock visibility, daily totalizer closeout, deliveries, pricing, safety checks, local audit history, CSV export, and installable/offline reopening. Its public-facing experience explains operational value while its signed-in workspace demonstrates the real workflow.

This remains a prototype. It does not claim production authentication, regulatory compliance, live integrations, payment processing, or secure multi-tenant authorization.

## Local run

```powershell
Set-Location fuel-station
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Validation

```powershell
Set-Location fuel-station
npm test
npm run check
```

The scripts install no dependencies.

## Repository relationship

Knowledge governance, architecture decisions, and cross-system links remain in the local FDG Knowledge Repository. Product source, design evidence, and implementation handovers are mirrored here so the active platform can be reviewed and deployed independently without creating a second authority.
