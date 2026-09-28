# FDG Landing Page Remaster Decision — 2026-09-27

## Decision

Use a dedicated first-viewport landing composition instead of the operational side-rail shell on `#home`:

`FDG hero environment + live HTML conversion layer + truthful glass proof + below-fold module discovery`

All non-home routes retain the existing operational shell, data model, local workflow logic, authentication boundary, module/branch scope, subscription isolation, and payment fail-closed behavior.

## Evidence and constraints

- The final handover package requires the exact headline **One Platform. Many Businesses. Brighter Tomorrows.**
- The first viewport must contain the hero, navigation, Explore Platforms, Start Free 7-Day Trial, Log In, compact truthful proof, and a scroll cue.
- `Discover Our Business Platforms` starts below the first viewport and is revealed by scrolling or the Explore action.
- Claims are limited to repository facts: one account, multi-branch readiness, seven-day trial, and plans starting at ₱500 per module or branch.
- Fuel Operations remains the first connected workspace. Other modules remain roadmap previews.
- Google OAuth is not presented because the current Supabase client has no verified Google provider flow. A fake button would violate the truth boundary.

## Implementation

- `src/views.js`: dedicated landing structure and catalog-driven module cards; non-home routing preserved.
- `src/app.js`: scroll-target and mobile glass-menu behavior.
- `styles.css`: responsive environment-first composition, glass navigation/proof, restrained motion, view-based reveals, and reduced-motion handling.
- `account/index.html` and `account/account.js`: trial query enters real signup mode with accurate helper copy; normal login remains unchanged.
- `assets/fdg-business-platform-hero-v2.png`: generated from the approved desktop composition as a clean background without embedded website UI.
- `sw.js`: cache version advanced and new hero included in the public shell.
- `tests/platform-smoke.mjs`: approved headline, discovery, trial route, canonical catalog, and no-fabricated-metrics checks.

## Generated asset provenance

- Source reference: final desktop landing composition supplied in the landing/auth handover package.
- Generation mode: precise object edit.
- Prompt intent: preserve the dusk FDG ecosystem and operational businesses; remove all website UI, metrics, labels, lines, and web chrome; reconstruct a 16:9 environment with a darker open left side for live text.
- Original generated file: `C:\Users\FraNc!s\.codex\generated_images\01a0249f-35be-72f3-b2ba-da03a45ba0c7\exec-fe321612-47c9-4bae-a7a8-02e12e5cfcfd.png`.
- Project asset: `assets/fdg-business-platform-hero-v2.png`.

## Visual fidelity ledger

1. **Environment and hierarchy:** preserves the approved navy dusk ecosystem, dark left copy field, illuminated FDG headquarters, and operating businesses on the right.
2. **First viewport:** keeps the hero, headline, two principal CTAs, navigation, truthful proof strip, and scroll cue within 1440×900, 1024×768, and 390×844 viewports.
3. **Responsive composition:** desktop/tablet retain horizontal navigation and a four-part proof rail; mobile uses a two-row proof grid and a compact glass menu rather than a scaled desktop rail.
4. **Truthful proof:** replaces the reference image's invented `6+`, `500+`, `10K+`, and `2.5x` metrics with repository-backed platform facts.
5. **Progressive disclosure:** module discovery begins after the hero and contains all nine canonical catalog modules; the Explore button scrolls directly to it.
6. **Conversion:** trial links use `/account/?mode=signup&intent=trial`; Log In uses `/account/`. The account page visibly distinguishes signup from login.
7. **Motion and accessibility:** hero drift and view reveals are restrained and disabled under `prefers-reduced-motion`; focus-visible behavior is retained.

## Options rejected

- Embedding the supplied mockup as the page: visually close but non-functional, inaccessible, and contains invented metrics.
- Reusing the operational side rail on the landing page: pushes the environment and conversion path away from the approved client-facing composition.
- Adding a non-functional Continue with Google button: provider support is not verified in the current auth implementation.
- Rebuilding existing catalog, auth, subscriptions, payment, or Fuel logic: outside the smallest defensible remaster and would increase regression risk.

## Reversal

The change is isolated to the `home` render path, landing styles/interaction, signup presentation, hero asset, cache entry, and landing assertions. Non-home operational routes remain separately renderable. Reversal can remove the dedicated home branch and restore the prior `homeView` without a data migration.
