---
document_id: FPJIS-FUTURE-0003
title: FDG Automotive Experience Marketplace and Quarterly Subscription
created: 2026-10-24
status: FUTURE_COMMERCIAL_ROADMAP / DESIGN_ONLY / NOT_APPROVED_FOR_BILLING_OR_BUILD
category: Future Projects - Automotive Experience
owner_domain: FPJIS Reference Library
related_projects: FPJIS-FUTURE-0001 and FPJIS-FUTURE-0002
business_direction: useful core product first; optional later premium purchases and quarterly subscriptions; in-place upgrade
payment_acceptance_enabled: false
catalog_purchase_enabled: false
billing_provider_connected: false
subscription_autorenew_enabled: false
automated_agent_task: false
---

# FPJIS-FUTURE-0003 — FDG Automotive Experience Marketplace & Quarterly Subscription

> [[FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|FPJIS]] → [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/README|Reference Library]] → **FPJIS-FUTURE-0003**. Product capabilities sourced from [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0002 - FDG RPM Synchronized Vehicle Sound Experience|FPJIS-FUTURE-0002 sound experience]] and [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0001 - CleanYourTV and Connected Device Display Exploration|FPJIS-FUTURE-0001 dashboard display personalization]]. Existing platform standards: [[20_FPJIS_FDG_Project_Intelligence_System/13_Entitlement_Blueprints/Entitlement_Blueprint|FPJIS entitlement]], [[20_FPJIS_FDG_Project_Intelligence_System/14_Subscription_Blueprints/Subscription_Blueprint|FPJIS subscription]], [[20_FPJIS_FDG_Project_Intelligence_System/15_Payment_Blueprints/Payment_Blueprint|FPJIS payment]], and [[17_FDG_Platform_Intelligence_System/03_LICENSING/01_Entitlement_Notification_Model|FPIS offline license]].

## Founder commercial direction — 2026-10-24

**MVP FIRST.** Create a delightful and useful **FDG automotive personalization experience** before launching or demanding subscriptions. At initial implementation, provide original inclusive dashboard/gauge themes and synthetic sports-engine sound presets usable without online billing. Architect the library, product catalog, account/license adapter and entitlement enforcement **from the beginning**, behind disabled monetization flags. When separately authorized and technically/legal ready to launch premium commerce, existing clients must be able to **upgrade in place** to individually purchased visual/RPM gauge/sound packs and/or an optional **quarterly (three-month) Premium Pass**. No forced reinstall, no migration losses, no retroactive confiscation of base benefits or separately purchased permanent packs.

This is a **product/commercial roadmap**, not a mandate to activate subscriptions immediately, to establish a new FDG entity, or to modify a real vehicle. Physical vehicle and OEM compatibility gates of FUTURE-0001/0002 still apply.

## Offering / packaging (candidate, not priced or on sale)

| Product tier | Contents and access | Durability |
| --- | --- | --- |
| **CORE (initial release)** | Fully functional permitted app-only dashboard/cockpit styling, basic customizable RPM/gauge theme in simulator or OEM-authorized non-safety area, selection of FDG-original sport engine sounds, roar OFF/ON, sound cap/call preferences, startup preference, PIN-protected FDG-only restore. Use only supported device paths | Available without active paid subscription; local-first/offline after installation and approved ownership |
| **PREMIUM VISUAL PACK — one-time** | Extra original dashboard appearance, layouts, dial/RPM gauge skin, colors, noncritical animation sets. No changing real RPM data or obscuring mandatory telltales | Customer keeps purchased content rights under disclosed purchase terms, even when no quarterly subscription |
| **PREMIUM SOUND PACK — one-time** | Additional original synthesized V8/V10/V12/turbo personalities, timbre variants, intake/exhaust harmonics and user-adjustable audio themes | Purchased access persists across subscription expiry; dependent on compatible running base software and device |
| **COMBO PACK — one-time** | Coordinated non-safety RPM visuals + engine profile theme with coherent artwork/sonic identity | Same persistent a-la-carte purchase entitlement |
| **QUARTERLY PREMIUM PASS — optional** | Time-limited broad premium library (eligible themes, RPM appearance, sounds, combos), rotating catalog and potentially new presets during entitlement period | Defined three-month term; optional prepaid or renewing billing only after payment/privacy/consumer review. Only pass-exclusive benefits expire |
| **FUTURE SPECIAL PACKS** | Partner-branded, bespoke/customer-requested packs only if original/IP-cleared and supported by existing app architecture | Product and license terms reviewed separately; not promised now |

**No prices or discounts approved yet.** Do not infer the generic FDG Business Platform's per-branch starting price is suitable here. Validate Philippine/other market price, payment fees, VAT/invoicing, recurring-payment consent and customer demand separately. “Quarterly” should mean a three-month billing interval; exact end-date, proration, grace, prepaid vs auto-renew and local currency rules require explicit commercial decisions.

## Core commercial principles

1. **Core stays usable.** Paid status never gates user's original base sound/theme selection, manual roar OFF, maximum volume, required alerts, authorized read-only telemetry restrictions, user settings export, or **PIN-protected Restore Original Vehicle Experience**. Restore and disable work offline after cancellation or nonpayment; subscription never unlocks access to safety-critical vehicle modifications.
2. **Purchase ≠ subscription.** One-time assets have independent durable `OWNED_PACK` grants. A premium subscription grants `PREMIUM_PASS_ACTIVE` to a defined catalog collection for a defined term. Do not erase owned purchases if a pass lapses.
3. **Optional premium.** No subscription paywall at product launch; do not label a product free then charge unexpectedly. User chooses packs or quarterly access, with clear comparison and owned content marked as owned.
4. **In-place upgrade.** User keeps the same app installation and profile, local sound presets, selected active themes, audio volume cap, call mute preference, consent, device identity and pre-FDG restoration baseline. Activate premium via verified entitlements, not a separate modified/firmware-level app.
5. **Offline capable, provider replaceable.** Cloud account, payment verification and catalog sync are separate from locally cached authenticated grants and locally running synthesizer. No required cloud telemetry of driver behavior. Normal driving/playback and essential app controls operate even when the network is unavailable.
6. **Safe premium transition.** A subscription expiry or pack entitlement change never disrupts a moving vehicle's display or makes an abrupt sound change. Apply a transition safely on app next launch or verified parked state, with UI-safe fallback to approved CORE visual/audio presets. Only FDG optional content switches, not actual vehicle speed/gear/battery values or alert overlays.
7. **Never sell unsupported vehicle capability.** Purchasing a dashboard skin does not guarantee access to proprietary cluster rendering; only compatible supported OEM APIs or separate FDG screen simulations. Show compatibility, OS/firmware requirements and limitations before purchase; honest refunds/dispute channels.
8. **Rights clean.** Premium media code, stems and recordings must meet original FDG synthesis / per-asset vetted CC0/public domain provenance rule from FUTURE-0002. Premium sound claims do not imply automaker endorsement or permission to use brand names.

## Launch sequence / rollout gates

**P0 — V0 Product Exists: OFFLINE DEMO** (no live vehicle, no billing)
- Build a compelling **functional** interactive simulated EV/diesel cockpit with multiple usable included original non-safety gauge skins and sound profiles (minimum variety to be selected/tested by specialist) and full sound engine behaviors from FUTURE-0002.
- Include a *versioned pack manifest/catalog parser* and local grant resolver now, with `BILLING_ENABLED = false`, `SHOP_CHECKOUT_ENABLED = false`, `SUBSCRIPTION_PURCHASE_ENABLED = false`. All initial CORE entitlements granted locally. Premium products may be shown in an unobtrusive **Preview / Coming Later** area only if genuinely demonstrated; never take a payment or promise dates.
- Demonstrate offline operation, local preset continuity, read-only synthetic telemetry source, safe restore with PIN and no subscription dependency. This first phase is **not authorized for execution by this record**.

**P1 — Usable compatible-device MVP / controlled users**
- Only after OEM compatibility and owner authorization: deploy supported Android/phone/accessory/app-only experience, with basic original free themes and roar sounds. No direct vehicle safety or ECU access; actual RPM only through whitelisted read-only approved adapter.
- Prove genuine end-to-end experience, quality and paid-upgrade interest with testers **before** charging. Observe opt-in qualitative feedback without uploading driving telemetry.
- Maintain feature flags and entitlement semantics even when all users receive CORE. No buyer receipts or billing integration required for the free pilot.

**P2 — Monetization readiness without activation**
- Define catalog SKUs, a-la-carte purchase IDs, quarterly plan IDs, asset pack authorship/provenance, entitlement metadata, verified client/vehicle association, device compatibility and migration tests.
- Integrate behind disabled feature flags the **shared FPJIS/FPIS entitlement-payment abstraction**, not a new independent billing engine. Support app-store-native billing where mandated, provider-specific adapters when permitted, receipt verification, subscription events, signed offline entitlement cache and refunds/revocation policy. Do not assert that checkout, payment APIs, purchases or server are live merely because schemas exist.
- Perform app distribution, jurisdiction, merchant, data security/privacy, tax, warranty and platform policy review. Obtain explicit founder approval of launch pricing and commercial terms.

**P3 — Founder-authorized premium launch**
- First enable verified sale of selected sound/visual/combo packs where devices supported, and optionally launch a **3-month Premium Pass** after commercial and infrastructure acceptance. Consumer consent specifies prepaid vs recurring subscription, cancellation/renewal, charge dates, pack ownership and what expires.
- Existing users see an **Upgrade / Premium Library** action when parked or in phone/desktop management flow, sign in/claim an account where required, and receive entitlement synced to their current app installation. Their free features and saved settings continue.
- Prohibit in-motion payment dialogs or shopping flows. A valid signed entitlement may be presented to the vehicle app without a privileged vehicle API.

**P4 — Expand library and proven economics**
- Add new original packs, combo packs and optional visual/sound synchronized themes based on purchases, usage with consent, support cost and compatibility evidence.
- Track revenue per supported model, subscription renewal/cancellation, support/refund cost, approval/rejection by stores/OEMs, pack conversion and sound quality/retention. Avoid unsupported growth projections or invented margins.

## Content delivery / infotainment performance companion — deferred

- [[20_FPJIS_FDG_Project_Intelligence_System/24_Reference_Library/FPJIS-FUTURE-0004 - FDG Automotive Thin Client and WiFi Content Delivery|FPJIS-FUTURE-0004 — Lightweight Runtime and Wi-Fi Content Packs]] defines the **small runtime + selected Wi-Fi downloadable asset packs** approach. No full premium catalog preloaded onto a client's infotainment. Sound/RPM visuals run **locally from cached validated assets** after download; no real-time Wi-Fi streaming for acceleration audio. The content manager can live on an authorized phone or approved AAOS app; compatibility is OEM dependent. Storage savings do not alone solve rendering/audio latency, so release requires device-specific benchmarks. CORE and owner restore work offline and billing remains disabled until a separately approved commercial release.

## Reusable architecture and data contract

~~~text
FDG Automotive Experience App (offline capable / non-safety)
  ├─ CORE themes + CORE synthetic sound (bundled/offline)
  ├─ Device Compatibility Registry (OS, OEM authorized APIs, tested features)
  ├─ Sound/Gauge Profile Store and Protected pre-FDG Restore Baseline
  ├─ Signed Content Pack Loader (original assets and metadata; no executable code by default)
  ├─ Local Entitlement Resolver ← signed cached grants / offline validation
  │    └─ SAFE DEFAULT = CORE; permanent owned packs persist independently
  └─ Premium Library UX (preview only while MONETIZATION_DISABLED)
               ↑
        Product Catalog / verified entitlement adapter (inactive at MVP)
               ↑
   Payment & subscription provider adapter (disabled until commercial approval)
      → verified transaction / subscription state
      → server-side independent verification and entitlement issuance
      → signed entitlement sync (when online)
      → offline local verification + controlled grace/expiration policy
~~~

### Candidate stable objects (provider-neutral, no payment platform committed)

- `product_pack`: `pack_id`, `version`, `asset_hashes`, `type` (THEME_RPM / THEME_DASHBOARD / SOUND / COMBO), `title`, `scope`, `supported_models`, `creator_provenance`, `terms_version`, `base_app_min_version`, `availability`.
- `plan`: `plan_id` (CORE / QUARTERLY_PREMIUM), `billing_period`, `renewal_kind` (not-yet-decided PREPAID or AUTO_RENEW), `eligibility`, `market`, `terms_version`, `pricing_version`, `status`.
- `entitlement`: `grant_id`, `customer_id`, `device_or_vehicle_binding`, `product_or_plan_id`, `grant_kind` (CORE / OWNED_PACK / TIME_LIMITED_PASS / TRIAL / PROMO), `issued_at`, `valid_from`, `valid_until`, `offline_valid_until`, `signer_id`, `revocation_version`, `grant_status`.
- `verified_purchase`: `transaction_ref`, `provider`, `verification_status`, `customer_id`, `product_id`, `receipt_reference`, `refund_or_chargeback_status`, `verified_at`. **Payment verification, not a client-side toggle, issues entitlement.**
- `customer_settings`: `driver_profile_id`, `selected_sound_pack_id`, `selected_visual_pack_id`, `roar_enabled`, `volume_cap`, `during_calls`, `resume_last`, `last_safe_core_fallback`; stored separate from commercial rights.
- `entitlement_state`: `CORE`, `OWNED`, `PASS_ACTIVE`, `PASS_GRACE`, `PASS_EXPIRED`, `SUSPENDED`; never conflate network disconnection or asset download errors with subscription expiry.

A stable `pack_id` is never repurposed. New sound/gauge variants use immutable pack versions and hash-verified signed manifests; migrate safely with backwards-compatible settings. No untrusted remote scripts/plugins that could gain privileged car access. Protect the owner restoration PIN and baseline independently of subscription entitlement. Decide multi-car licensing/transfer, family drivers, device loss and sale-of-vehicle rules before accepting money; never assume one account automatically licenses unlimited cars.

## Future upgrade workflow and non-destructive downgrade

1. Existing client opens `Theme & Sound Library` in the app or approved phone/desktop portal → sees current CORE, permanently **Owned**, quarterly **Included with Pass**, and device-incompatible items clearly separated.
2. Customer selects individually purchaseable pack or quarterly pass → sees exact device compatibility, applicable recurring/prepaid terms and clear disclosure of what remains after cancellation. Consent and checkout occur via an approved off-driving flow.
3. Verified payment/provider event produces a signed grant → client's existing app receives it over sync; offline validated grants and purchased assets remain locally accessible. If disconnected, show **Pending verification** and do not create a false purchase; keep CORE uninterrupted.
4. Customer can immediately choose acquired theme and sound profiles in the existing profile. Save rollback to last compatible CORE preset. No reinstall, wipe, VIN rewrite, accelerator control or telemetry permission escalation.
5. Renewal adds entitlement; cancellation stops future renewal according to plan terms while pass remains valid through paid-through date. On expiry, remove only access to time-limited pack benefits at a non-driving-safe transition and select CORE or **owned** profile, keeping locally saved preference so a renewed entitlement can restore it. Restore Original Vehicle Experience and safety alerts remain fully functional.
6. Refund/chargeback and account/device transfers require verification, state-specific appeals/support and deterministic offline conflict resolution; do not remotely disable driving-critical audio/display functionality.

## Customer and business protection gates

- **No forced subscription for safety, restore, compatibility or essential core controls.** No remote immobilization, engine intervention, forced audio outage in motion or OEM dashboard data overlay gating.
- **Original ownership:** produce proprietary original FDG synth stems/code, traceable source/license ledger, and per-pack signing. CC0 only with verified source; “free download” is not proof of reusable commercial rights.
- **No surprise auto-renewal:** quarterly means a clearly disclosed 3-month billing interval with explicit opt-in to auto-renew or prepaid renew. Provide cancellations, invoice/receipt, trial/grace, refund, price-change and consumer support behavior per current applicable jurisdiction/store requirements.
- **Platform restrictions:** Android Automotive OS has different car app approval categories and OEM support boundaries. Google [Android for Cars app categories](https://developer.android.com/training/cars/apps/library) restrict Play-distributable driving experiences. Google [AAOS Play Billing](https://developer.android.com/training/cars/platforms/automotive-os/google-play) is supported on Google-built-in cars but purchase typically completes via a second device. [Google subscriptions](https://developer.android.com/google/play/billing/subscriptions) supports plan changes, auto-renew and prepaid base plans; behavior is platform-dependent. These references show **possible mechanisms**, not assurance that FDG's dashboard theme or sound app category would receive Google Play or OEM approval. Confirm laws/store policy again at deployment time.
- **Future product questions not decided:** Product name and branding, local prices, catalog size, vehicle/account/device binding, payment service, quarterly terms, tax treatment, author licensing, refunds, premium grace and OTA package compatibility all require signed decisions before P3.
- **No active charge:** do not configure merchant keys, payments, renewal jobs, test/real subscriptions, paywalls or client notification automations now. This record does not authorize an engineering implementation.
- **Existing FDG architecture:** FPJIS defines entitlement as the authority for free/paid capabilities; **payment verification changes entitlement, not UI alone**. FPIS signed offline verification separates connectivity, synchronization and subscription. Reuse those contracts instead of duplicating FEIS/FBPOIS billing or tying a vehicle license to a gas-station/business branch subscription.

## Future acceptance / release criteria

| Test | Evidence required |
| --- | --- |
| CORE-first offline pilot | Core theme + RPM visuals (only in approved area/simulator) + original roar run with all billing flags disabled, no account requirement for daily operation |
| Preview/no sales | No checkout/provider request/payment secrets; Coming Later items explicitly not for sale |
| Genuine customer in-place paid upgrade | Signed verified entitlement unlocked only the purchased pack/pass on an existing app install, retaining sound/visual selection, call handling and PIN restore |
| OWNED vs subscription distinction | Expired quarterly pass removes pass-only access at safe transition; CORE and **individually owned** packs persist |
| Cold offline + network recovery | Authenticated grants locally verifiable; offline grace and clock-tamper rules documented; unknown payment remains Pending; no mandatory cloud to mute/restore |
| Subscription cancellation/upgrade | Clear terms, prepaid/auto-renew informed choice, end-date, receipt, grace, proration/plan changes verified against chosen provider |
| Non-invasive safety | Safety warnings, speed/gear data source, display readability, accelerator/ECU read-only constraints and independent ROAR OFF unchanged by entitlement state |
| Vehicle/browser/OS compatibility | Only approved automotive platforms and OEM APIs; no unsupported claims for AAOS Play distribution or custom OEM cluster theming |
| Commercial governance | Product/source IP review, prices and taxes approved, consumer terms and refunds accepted, founder authorizes checkout and marketing |

**Disposition 2026-10-24:** Commercial potential and staged architecture captured; product first, monetization ready in design, all billing disabled until separately approved. No code, subscription billing, payment processor, store deployment or real vehicle integration has been executed by this reference document.
