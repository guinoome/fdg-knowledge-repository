# Fuel — physical dispenser meters and compact chrome

## Scope and preservation

User clarified one physical totalizer per product per dispenser. Implemented owner commissioning of 1–100 sets, 1–3 distinct products per set, named forecourts, unique dispenser IDs and explicit baseline evidence. No old product reading is split or copied into a physical meter. Commissioning must occur at the latest accepted closing date; missing days cannot be bypassed. New initial baselines are editable only during owner commissioning; subsequent openings carry automatically from approved physical readings.

Daily form, photo assistance, preview, pending review, approval, latest-day correction, rejection and reload support individual registers. Product accounting totals remain for compatibility with reports/FIFO, explicitly distinct from physical readings. Review displays each physical meter. Calibration requires the exact dispenser ID/product; 100 movement minus 30 returned testing means 70 sold. Commissioning does not post stock. Once any metered submission exists, hardware reconfiguration is locked pending a reviewed equipment-change migration. This prevents rewriting identities referenced by revisions. Existing local storage key and legacy history preserved; invalid equipment/readings protect storage rather than overwriting it.

Menu and Controls replace the persistent sidebar/header. Navigation overlays the scene, closes on selection/outside click/Escape; closed navigation is inert. Controls stay open during interaction, not timer-hidden. Mobile dock remains. Existing wallpaper, colors, operational hotspots and utility forms preserved. SW19 includes meters module.

## Validation

- Root npm test and npm run check passed during implementation; new meters suite covers distinct readings, calibration allocation, approval carry-forward, FIFO stock delta, correction, rejection, commissioning roles/date/duplicates and reload.
- Playwright fallback: Browser skill not available. Isolated browser contexts at 390×900 and 1366×900 exercised Settings → two dispensers → reload → closeout → approve → correct → approve. Result 160 L aggregate from independent meters. No production records used.
- Menu, Escape, Controls and horizontal overflow checks passed; no page errors. Screenshots inspected using view_image against the user's sidebar example.
- Fidelity: removed occupied sidebar width; replaced tall header with two compact controls; preserved green/cyan glass palette; retained hero crop/physical scene; kept mobile dock and short forms. Intentional added copy: Menu, Controls, commissioning labels and evidence warnings. No replacement imagery or fabricated live state.

## Limits and next gate

Still local demo, not secure multi-device operation. Real station commissioning needs owner-verified baseline photographs and one full operating day; current historical baseline cannot be called today's opening. OCR accuracy/browser support not field-validated. Equipment changes after transactions, rollover/replacement meters and independent nozzle registers within one dispenser/product need separate reviewed workflows. Source workbook exceptions remain excluded, not silently repaired. No Restaurant work started.

Account/payment plan: [[CLIENT_ACCOUNTS_PAYMENT_PLAN_2026-09-21]]. Providers and ML-DEP left unchanged.

## Release status

Rollback warning: after metered submissions exist, do not downgrade to a product-only writer. Preserve/export browser records and deploy a compatible forward fix or a reviewed migration. An old visual release alone is not a safe operational rollback for this new data contract.

Production READY: `dpl_4Wcr3HSJcpSnJ2B2exnSzqGfEdPF`, alias https://fdgbusinessplatforms.vercel.app, immutable https://fdgbusinessplatforms-o2c663g93-guinoomes-projects.vercel.app. Pinned CLI 59.13.1 pulled production settings and built in `C:/Windows/Temp/fdg-meters-release-20260921`; nine changed runtime file hashes matched source before prebuilt deployment. Live alias metered operating-day/correction tests passed at 390 and 1366 pixels in isolated local-storage contexts. No provider data or real station records changed. Static browser page-error checks are not a server observability audit. Git publication is recorded by the scoped commit containing this handover; verify remote HEAD on resume.

Five-width wallpaper/utility regression (360,390,768,1366,1672) passed locally; includes pause, reduced motion, dialog Escape/focus and all eight utility routes. Account/payment implementation remains unstarted by design. New meters regression is part of both npm test entry points.
