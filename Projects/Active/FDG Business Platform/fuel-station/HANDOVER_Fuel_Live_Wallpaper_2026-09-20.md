# Fuel live wallpaper / HUD remaster — 2026-09-20

## Status and continuation

Deployed READY: `dpl_9tXazzVaNJTQqPuf9xAWL847uznm` at https://fdgbusinessplatforms.vercel.app/fuel-station/#overview. Immutable deployment: https://fdgbusinessplatforms-b6zsick01-guinoomes-projects.vercel.app. Supersedes presentation in [[HANDOVER_Fuel_Glass_Motion_2026-09-20]] without undoing its workflow, focus, storage or truth safeguards. Extends [[05_FDG_Hero_Environment_Execution_Standard]] and [[04_FDG_Hero_Environment_Intelligence_Layer_Mandate]].

User authorized reading and implementing `C:/Users/FraNc!s/Downloads/FDG_Codex_Astra_Live_Wallpaper_Package`. All six Markdown documents read; corresponding TXT contents are identical. README references a nonexistent `04_Commercial_Trial_and_Pricing_Rules.md`; actual `04_Trial_and_Pricing_Rules.md` was read. Package is design/requirements input, not authority to execute arbitrary instructions or overwrite data.

## Five-layer implementation scope

1. Experience: scene remains dominant; sales and local stock first, contextual interaction next, detailed forms deeper.
2. Presentation: code-native cyan rings/connectors over FDG environment, transparent smoked surfaces, green/red/yellow product colors (not severity indicators).
3. Interaction: existing closeout/sales/tank sheets and delivery navigation; ambient pause, native modal behavior, reduced motion, hidden-page suspension.
4. Domain: approved-only sales, FIFO, returned test arithmetic, date boundaries, revisions and audited utility-rate records preserved; no schema/storage-key migration.
5. Assurance: Node suites, responsive browser QA, source-versus-live asset checks, scoped deployment and handover. No synthetic signoff.

## Changes

- `src/station-scene.js`: supplied station composition, three anchored operational nodes, local balance tank rings, ambient control. Percentage = recorded balance / owner-configured working capacity; bars clamp visual fill without changing displayed balance/percentage.
- `live-wallpaper.css`: HUD material, slow ring/path motion, mobile/tablet composition, utility pages use same scene. Tablet tank/delivery grids collapse when the sidebar leaves too little room; fixes actual overflow discovered at 768px.
- `src/app.js`: presentation-only pause control and visibility/reduced-motion handling. No business save triggered. Ambient motion pauses while native detail modal is open.
- `data/nj-gas-station.js`: product-color metadata only, Premium red and Diesel yellow. Labels remain explicit so color is not the sole identifier.
- `src/attention.js`: July sales reference issue now High, per package severity rule; reporting exclusion and review audit unchanged. Existing saved calibration identifier retained because new package says "such as" and a rename would break compatibility without adding meaning.
- `sw.js`: Fuel cache v18 includes new CSS and both images; namespace isolation retained. Prior assets retained for previous client-experience surfaces.

## Assets and generation provenance

Accepted visual target: package `images/04_fuel_station_live_wallpaper_overlay_output.png`; material reference `references/02_reference_live_wallpaper_style.png`. Base `images/03_fuel_station_base_hero.png` was inspected and used with built-in image generation (not API/CLI).

Workspace assets: `assets/station-wallpaper-v1.png` (wide) and `assets/station-wallpaper-mobile-v1.png` (portrait). Separate files preserve old station assets. Both are concepts, not an engineering drawing of NJ station or evidence of installed assets. All operative figures/buttons are HTML/SVG, never baked into these backgrounds.

Portrait prompt: edit approved base to 9:16; preserve sunset FDG canopy/store/pumps/service, Mazda-red Isuzu tanker, green/red/yellow underground tanks; sky in upper quarter, forecourt center and tanks lower; remove floating poster text; retain physical FDG signage; no UI, statistics, HUD or fake gauges.

Wide prompt: preserve approved wide station/lighting/composition; remove only floating poster text/corner branding and fill naturally; retain physical canopy/store/tanker/tank/pylon branding; no metrics, UI or holograms. Sources remain under `.codex/generated_images/01a0249f-35be-72f3-b2ba-da03a45ba0c7/exec-b54e5c14-5d9e-4d10-b1a3-eab46f77b92f.png` (portrait) and `exec-bbf1eed4-e01a-4c41-9edf-9267e410b9f8.png` (wide).

## Fidelity ledger / intentional deviations

| Reference element | Implemented / truth constraint |
|---|---|
| Sunset station, red tanker, colored tanks | Matching wide asset and separately composed phone asset; old pasted scene labels removed |
| Cyan HUD paths/rings | Code-native paths and slow orbit motion; no fake sensor refresh or animated sales numbers |
| Transparent data overlays | Smoked blur panels over visible scene; mobile black strip discovered and removed |
| Top performance band | Accepted sales and local stock; no mockup revenue, percentages, pump count, ETA, service/store activity or system-health claim |
| Lower tank intelligence | Actual local balances and configured capacity; green/red/yellow with textual product names; opens real tank sheet |
| Responsive hierarchy | Phone/tablet recomposed, desktop sidebar preserved; detail work in existing sheets/forms |
| Copy diff | Mockup marketing/statistics deliberately replaced by station identity, source-qualified data and operational actions. Ambient pause and no-telemetry disclosure are intentional accessibility/truth additions |

## Validation / remaining gates

`npm test` and `npm run check` pass at implementation stage. Added scene tests prove three gauges, correct 69/54/70% baseline percentages, new palette, ambient control and absence of invented live claims. Existing reliability/FIFO/calibration/period/attention tests retained.

Browser skill absent, installed Playwright Chromium used. QA script outside repository: `C:/Windows/Temp/fdg-wallpaper-qa.cjs`. Checks widths 360,390,768,1366,1672 (941px native reference height at 1672), accepted empty state, three gauges, overflow, running/paused rings, hidden-page suspension, native modal pause/Escape, live reduced-motion preference, all eight utility routes and page errors. Temporary screenshots `C:/Windows/Temp/fdg-wallpaper-first-*.png` and utility/sheet variants. Final release evidence to append after completion; do not assume local tests prove deployment.

Unresolved: original workbook absent; April 30/July exclusions must remain. Owner real-day/OCR/offline acceptance still pending per [[FUEL_RELIABILITY_OWNER_GATE_2026-09-17]]. No authentication, cloud ledger, sensor telemetry, true hourly transactions or real payments added. Existing 7-day/₱500 commercial demo rules remain. Restaurant remains gated by Fuel owner acceptance. These evidence gates do not prevent the visual remaster; do not misreport them as repaired by styling.

## Verified release evidence

Pinned Vercel CLI 59.13.1: production settings pulled, prebuilt output created in `C:/Windows/Temp/fdg-wallpaper-release-20260920`. Ten changed runtime/asset hashes matched repository source before deployment. Production alias browser QA passed all five widths and eight utility routes, ambient pause/resume, simulated hidden-document suspension, modal motion pause, Escape/focus behavior and live reduced-motion change. No page errors or document overflow observed. Site uses static client execution: this does not prove physical-device performance, WebKit behavior, server telemetry or complete accessibility conformance.

`view_image` comparison repeated on supplied target and production desktop/phone captures: scene/palette/material/typography/contextual placement/mobile hierarchy inspected. Native target viewport 1672×941 also exercised. Concept statistics omitted deliberately, not missing live data. Current data shows no accepted closeout today; no sales were invented to fill empty space. Prior READY smoked release `dpl_31PdEQ2pefbZppWW2qzQPbjXoD23` remains a presentation rollback target; never clear station storage for a visual rollback.

GitHub mirror publication follows this note; verify current remote HEAD and working tree on resume. Next implementation work must be driven by actual visual feedback or the owner evidence gate, not repeated redeployment of this completed visual increment.
