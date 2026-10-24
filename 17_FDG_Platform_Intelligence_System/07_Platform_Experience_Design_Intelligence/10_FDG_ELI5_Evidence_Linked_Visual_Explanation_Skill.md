---
document_id: FPIS-UX-0010
title: FDG ELI5 Evidence-Linked One-Page Visual Explanation
created: 2026-10-25
status: FOUNDER_DIRECTED_CAPABILITY_DESIGN / PROJECT_SKILL_PREPARED_NOT_RUNTIME_VERIFIED
owner_domain: FPIS Platform Experience and FDG Creative Studio
source_video: 1000012000.mp4
source_sha256: f826340ac503d9fe5b760a7c774a3d9c6dad1d6acf7625d88132d36eeff454ba
source_duration_seconds: 53.633333
source_pattern: Video describes /eli5 turning an uploaded document into a single visual page with big pictures and few words
upstream_official_skill_verified: false
implementation_approved_by_document: false
---

# FPIS-UX-0010 — FDG ELI5 / Evidence-Linked Visual Explainers

> [[FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/00_Index|FPIS Experience]] → [[17_FDG_Platform_Intelligence_System/07_Platform_Experience_Design_Intelligence/06_FDG_Creative_and_Communication_Studio|FDG Creative Studio]] → this reusable capability.

## Observed video and FDG adaptation

The uploaded clip describes an **`/eli5` command** with a user document and a topic question, shown as “turn any confusing document into a one-page visual”. An illustrative DNS-resolution diagram and later financial/advertising spend sheet combine steps, color, simple sections and comparison tables. The presenter cites an online post claiming internal use at Anthropic; **this video does NOT verify an official Anthropic-distributed `/eli5` skill, a downloadable audited package, or factual accuracy of its example monetary figures**. The screen briefly displays “Bypass permissions”; this is **never an FDG implementation instruction** and must not be copied.

**FDG interpretation:** implement our **original, provider-neutral `fdg-eli5-evidence-visual` project skill**, not an unverified third-party install. Convert complex but authorized input into a **one-page, phone-readable, premium visual explanation** with correct data, transparent assumptions and links back to sources. Make this a capability within FDG Creative Studio, consumed by FEIS engineering modules, FPIS dashboards, FBPOIS operations, FDG solar quotations, payroll/business analytics and customer communication, rather than a duplicate new intelligence system.

## Input → validation → visualization → acceptance

```text
Approved source document / measurements / engineering calculations
       ↓
CORE source & evidence intake (extract exact values, units, dates, claims)
       ↓
Question + audience + single key takeaway + known/unknown boundary
       ↓
Select visual grammar (flow, timeline, anatomy, bar, comparison, Sankey)
       ↓
Compose a *single* responsive page with sparse words, meaningful labels,
charts/diagrams, assumptions, caption, citations, data table and caveats
       ↓
Check data/math/licensing/accessibility + independent domain review
       ↓
FDG-owned one-page visual + expandable evidence/source trail
```

## Design rules

1. **Explain, don't decorate.** Begin with the user's precise question and intended audience (technician, engineer, client, owner, CFO). Prefer one dominant explanatory diagram/chart supported by 2–4 subordinate steps rather than a wall of text or ornamental AI-style graphics.
2. **Source fidelity.** Every numeric claim inherits source file/path/page/date, observed versus calculated versus hypothetical status, quantity units, time range and denominator, scenario assumptions and rounding. Unknown = `NOT PROVIDED`; do not invent precise percentages, capacities, costs or engineering measurements for visual impact.
3. **Proper chart choice.** Flowcharts for process, timelines for sequence, bars/dot charts for comparable magnitudes, Sankey for reconciled flows with totals, line charts for time series, fault trees for RCA; diagrams for topology/equipment. Never draw an energy Sankey with unbalanced flows and never show false temporal continuity. Avoid pie/3D chart decor when it misleads.
4. **Data validation.** Independently recompute rates, dimensions and totals from source whenever possible. Show method/denominator in an expandable evidence panel. No inaccurate “$1.75 per $1” type caption without verifying actual values. Label sample/demo values **ILLUSTRATIVE — NOT ACTUAL CUSTOMER DATA**.
5. **Accessibility.** Headings, tested color contrast, readable mobile typography, no meaning conveyed by color alone, keyboard-readable controls, alt text for decorative images and **short + long descriptions for complex charts**, plus an accessible data table or text equivalent. Respect reduced motion and print/export.
6. **Premium visual identity.** Follow FPIS Adaptive Hybrid, realistic engineering hierarchies, restrained glass overlays and non-generic style. Layout must remain useful on phones, prints and PDF exports; no static screenshot pan marketed as interactive app.
7. **Sensitive source safety.** Legal strategy/privileged counsel records, HR payroll, customer PII, medical, site security and proprietary facility data require source-owner authorization, masking, local-first execution where possible and no external model transmission without FSIS/FLIS clearance. Never use `Bypass permissions`.
8. **IP/source rights.** New layout, charts, diagram geometry and icons must be FDG-original or permission-reviewed. Don't directly copy the creator's design, licensed image/font, trademark, source site or whole video screenshot into a commercial asset. Preserve attribution/record of approved licensed data.
9. **Not automatic publication.** One-page output remains DRAFT until domain specialist approves technical meaning and evidence, then relevant client/founder approves external release. The explainer is supplementary, not a replacement for legally required full terms, engineering reports, safety procedures, signed computations or underlying source document.
10. **Local-first and provider-replaceable.** Prefer a portable standalone HTML/SVG one-page with optional embedded static assets, print styling, high-DPI export and accessible text; optional future app visualization uses approved offline data adapters, no live server required.

## Reusable examples for FDG

| Domain | Visual product | Evidence that must remain attached |
| --- | --- | --- |
| FDG Solar Visayas | One-page energy flow: daytime load, PV production, battery and utility purchases + customer ROI | Month-by-month equations, sun hours, inverter/BOM assumptions, hardware capabilities and Philippine utility prices |
| FEIS Testing & Commissioning | System readiness topology and incomplete test evidence map | Commissioning checkpoints, asset IDs, acceptance rules, dated measurements, reviewer signoff |
| FBPOIS/FWIS | Engineering plant health, fault/shift handover and role-based priority summary | Verified asset state, timestamps, source events, conflicts, severity and ownership |
| FDG Maintenance PM | Fire-pump churn/pressure test, asset condition and corrective-action flow | Actual readings, standards acceptance criteria, photos and engineer recommendation |
| FDG Business Platforms | Branch revenue/cost/profit waterfall, subscription ownership and customer retention | Source transactions, calculation formulas, fee/return policy, accounting periods |
| FLIS legal & compliance | Permit application lifecycle and obligations timeline | Jurisdiction, authority, versioned rules, source citations, legal-review qualifications |

## Portable agent-skill contract

A project-local Claude/Codex skill named `fdg-eli5-evidence-visual` is acceptable as a **routing instruction**, not a declaration that Anthropic's rumored `/eli5` exists. A completed task produces:
- Audience/question; source file pointers and permissions; brief content model.
- One-page visual in requested supported format, **with evidence-linked text alternative**, real data or explicit sample values.
- Audit sheet: exact figures, independent math check, chart type justification, units, caveats, referenced source material/asset rights.
- Tests: mobile 360 px and desktop, print/no clipped text, alt text/long description, WCAG-relevant contrast, reduced-motion, downstream safe export and no leaked personal data.
- Record acceptance by relevant specialist; output status `VISUAL_DRAFT`, `VISUAL_QA_PASSED`, or `VISUAL_EVIDENCE_BLOCKED`.

## Primary references

- W3C [WCAG 2.2](https://www.w3.org/TR/wcag/) and W3C WAI [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/) require useful accessible equivalents to images and charts.
- University of Washington [Accessible data visualization guidance](https://www.washington.edu/accesstech/dataviz/) recommends essential findings, descriptive visuals and alternative table/data views.
- No external ELI5 plugin package has been installed or verified, and the present video is **not evidence that the financial claims in its example chart are real**.

**Status:** Original FDG reusable design contract documented. No graphical product, dataset, plugin installation or production output has been commissioned by this record alone.
