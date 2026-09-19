# Fuel glass motion — 2026-09-20

Extends [[HANDOVER_Fuel_Attention_Rollout_2026-09-17]], implements [[05_FDG_Hero_Environment_Execution_Standard]], governed by [[04_FDG_Hero_Environment_Intelligence_Layer_Mandate]]. Earlier requirements and evidence remain in [[FUEL_REMASTER_ATTENTION_ROLLOUT_2026-09-17]].

## Scope and preserved behavior

Fuel presentation refinement, not a new operational ledger. Preserved all calculations, accepted-only reporting, dates, calibration returns, FIFO costs, saved-data keys, approval/revision behavior, source exclusions, navigation and hero assets. No records migrated or cleared.

## Changes

- Shared `src/glass-motion.js`: native dialog entrance (320ms) and exit (180ms), retained focus/inert semantics, Escape/backdrop handling, focus restoration, single navigation on repeated close.
- CSS: staggered 480ms entrance, short issue-detail reveal, interactive glass edge highlights; lighter scene/utility surfaces with blur and inset highlights. No continuous simulated-live animation. Reduced-motion disables motion; unsupported blur receives an opaque readable fallback.
- Crucial material rule: entrance uses backwards rather than forwards fill. Persisting an opacity animation on a parent creates a backdrop boundary and prevents child glass from blurring the station.
- Dark information panels keep their dark surface so white text remains legible.
- Fuel service worker v14 caches the new module; no local-storage reset.

## Validation and fidelity ledger

Local Node regression suite and syntax checks passed. Additional motion tests cover native modal lifetime, duplicate close navigation, reduced motion, Escape and focus restoration.

Browser plugin unavailable. Playwright 1.62.1 with installed Chromium shell 1228 used (default expected shell 1234 absent; no browser installed). Local origin 127.0.0.1:8137, isolated contexts, service workers blocked for source validation. 390×844 and 1366×768: correct Fuel title and nonblank content, no page errors, no horizontal overflow on tested tank view; entrance animation, Attention expansion, Escape/focus restoration, tank drilldown/navigation, reduced-motion instant close passed. No operational records written.

Reference `design/reference/hero-environment-concept-v1.png` and latest screenshots inspected using view_image. Screenshots must settle after entrance before assessing text contrast.

| Comparison | Evidence / decision |
| --- | --- |
| Scene visibility | Forecourt remains dominant; no hero color wash added |
| Glass material | Softer transparency, brighter edge and background blur; dark callout contrast repaired |
| Mobile hierarchy | Today sales and stock first, three anchored hotspots, thumb-friendly actions and bottom sheet |
| Typography / copy | No visible copy changed; source-derived values intentionally supersede mockup figures/date |
| Motion | Actual running dialog animations measured; reduced-motion measured at zero animations |
| Workflow | Escape restores originating focus; tank drilldown navigates only after sheet closes |

Screenshots outside repository: `C:/Windows/Temp/fdg-motion-390.png`, `fdg-motion-1366.png`, `fdg-motion-attention-390.png`, `fdg-motion-tanks-1366.png`. Temporary QA script `C:/Windows/Temp/fdg-glass-motion-qa.cjs` supports local/live origin selection. Extended runtime checks passed at 360×844, 390×844, 1366×768 and native concept 1536×1024, including all eight utility routes' overflow checks. No claim of owner/device acceptance or full-platform visual signoff.

## Remaining goal requirements — do not mark complete

- Motion release published and verified (see below); this item is complete, not a remaining implementation task.
- Full phone/device and every-route visual acceptance, including actual owner phone reduced-motion settings and PWA refresh.
- Original workbook required to identify broken July cells and reconcile April 30; review UI must not admit corrupt source rows.
- Genuine meter-photo OCR/manual fallback and one complete owner-approved operating day remain unverified.
- Hourly reporting and secure authenticated multi-device/cloud operations are separate implementation milestones, not current capabilities.
- One-login, paid activation, per-module/branch billing and payment/cancellation remain prototype flows; no real payment enforcement claimed.
- Restaurant then Sari-Sari must follow Fuel owner gate, each with its own domain hero/workflow. The present Fuel visual changes do not complete those modules.

## Release

Vercel READY `dpl_69LHDda8LtppxoX6BVEYGfZB4jbc`, alias https://fdgbusinessplatforms.vercel.app; immutable https://fdgbusinessplatforms-7ux7gvd5z-guinoomes-projects.vercel.app. Built app, motion module, stylesheet and SW hashes matched source before publication; live motion/CSS/SW content matched source after publication. Rollback presentation to prior `dpl_EU6AZ3WKN3vKFyQ1mgY7KGZ7H8n9`, never by clearing station records.

Implementation vault commit `e0e9a58`, subtree `01199210a76ac525fe4c4337819731024642ebe9`; business mirror `main` implementation merge `8ab0e01da7728ac1affd53fb755b61c963093886`, push and ls-remote verified. This release-note update follows that implementation commit.

The same browser interaction suite passed against the production alias at all four widths: entrance, running sheet animation, issue expansion, Escape/focus, tank navigation, eight utility routes without horizontal overflow, reduced-motion suppression, zero page errors. Latest production screenshots inspected, including mobile 390×844. Accepted concept was inspected at native 1536×1024 alongside rendered evidence. Known intentional differences: actual source-derived dates/stock, existing FDG slash brand and illustrative station asset retained. Screenshots cannot demonstrate motion alone; runtime animation assertions supply that evidence. Real owner device and genuine data validation remain pending.

Next: audit outstanding comments against the full mandate (do not repeat this completed release), improve any remaining in-scope presentation/flow gaps; obtain original workbook and owner day evidence before admitting untrusted data or beginning Restaurant. No production QA records were created; fresh isolated browser contexts only.
