# Conversation Master Synthesis — Visual Experience to Field PM

## 1. Design problem established
The conversation began by rejecting generic dashboard aesthetics and repetitive AI/SaaS styling. The target became a product experience that looks deliberately engineered, commercially persuasive, domain-native, and visually distinctive.

The preferred benchmark behavior was not “more effects.” It was a combination of:
- strong visual storytelling;
- immediate value communication;
- realistic industry context;
- credible evidence;
- responsive product experience;
- clear next actions.

Related: [[FPIS]], [[FDG Engineering Visual Language]], [[Marketing + UI UX = Business Growth]].

## 2. FPIS role clarified
[[FPIS]] should own **how** information is experienced, not the engineering truth itself.

Engineering/business modules own domain meaning. FPIS owns reusable experience primitives such as:
- navigation;
- responsive composition;
- components;
- design tokens;
- 3D interaction patterns;
- motion semantics;
- data visualization;
- accessibility;
- public/client experience;
- field/mobile patterns;
- white-label experience profiles.

This evolved into [[FPIS Platform Experience Visualization and Design Intelligence]].

## 3. Engineering modules must feel different
The shared platform foundation should not make every module look identical.

Examples developed:
- Testing & Commissioning → topology, readiness, live tests, findings, retest, handover.
- Energy Audit → energy X-ray, Sankey flows, losses, opportunities, payback, evidence chain.
- BIM → spatial coordination and clashes.
- RCA → causal/evidence graph.
- QTO → drawing/model with extracted quantities and evidence confidence.
- Maintenance → asset condition, evidence, PM workflow, findings and corrective actions.

Related: [[FDG Engineering Module Experience Standard]].

## 4. Responsive rule
A key rule was established:

**Progressive rearrangement, not progressive information loss.**

The same engineering information must remain available across desktop browser, tablet, mobile browser, and installable mobile PWA. The composition changes; the engineering meaning does not.

Related: [[FDG Responsive Experience Standard]].

## 5. 3D and motion became part of the design language
3D and animation were treated as engineering communication rather than decoration.

Examples:
- airflow/water/energy flow animation;
- live measurement pulse;
- failure propagation;
- design ghost geometry vs installed solid geometry;
- before/after split views;
- exploded system views;
- timeline scrub;
- energy/thermal heat surfaces;
- findings hotspots.

Related: [[FDG 3D Interaction and Motion Standard]].

## 6. Business platform concepts expanded
The same premium experience doctrine was applied to business operations under [[FBPOIS]] / business platform concepts:
- gas station;
- micro fuel station;
- sari-sari store;
- restaurant;
- tire shop for motorcycle/car/commercial tires;
- multi-branch fuel network with delivery fleet;
- multi-branch bakery with central production.

A reusable [[Network Operations Layer — Multi-Branch and Fleet]] emerged for branches, fleet, inventory, sales, people, alerts, and profitability.

## 7. Marketing was added to the experience architecture
The conversation later clarified that the already-generated business visuals were largely “after marketing” designs because they already used outcome messaging, client attraction, emotional framing, and conversion-oriented hierarchy.

Marketing should influence:
- public landing experiences;
- product demos;
- case studies;
- onboarding;
- persuasion and CTA hierarchy;
- value proof;
- retention/expansion experiences.

Marketing must not alter protected engineering truth, status semantics, evidence, acceptance criteria, or operational meaning.

Related: [[Marketing + UI UX = Business Growth]].

## 8. White-label and Experience Composer architecture
Client branding can change the visible experience without creating code forks.

Principle:
**Configurable experience, not configurable engineering truth.**

The client may control brand identity and experience profile while the underlying platform protects engineering semantics and attribution/provenance.

Related: [[Experience Composer and White-Label Governance]].

## 9. Motion demos evolved
Initial locally generated MP4s were correctly identified as slideshow-style motion concepts rather than genuine product demos. The next requirement became product-like movement: taps, 3D rotation, animated flows, hotspots, map/truck movement, state transitions, voiceover, and sound.

Three explainer demos were then created and their links are preserved in this package:
- Testing & Commissioning
- Energy Audit
- Business Platform network journey

Related: [[Asset Inventory — Full Conversation]].

## 10. Preventive Maintenance became the first live FEIS field deployment candidate
The conversation then moved from visual concepts into a practical first deployment: a reusable [[FEIS Preventive Maintenance Engine]] with [[Fire Pump PM Template 001]] as the first template.

The architecture explicitly avoids building an isolated “Fire Pump app.”

Reusable services include:
- PM Template Engine;
- Maintenance Evidence Capture Engine;
- Measurement Engine;
- Checklist Engine;
- Findings Engine;
- Deterministic Recommendation Engine;
- Retest/acceptance logic;
- client representative e-signature;
- report generation;
- offline local project storage;
- automatic synchronization.

## 11. Evidence capture generalized beyond Fire Pumps
The same evidence system should support:
- Fire Pump;
- Electrical Room;
- Generator Room;
- Chiller Plant;
- Pump Room;
- Boiler Room;
- AHU / Mechanical Room;
- Water Treatment;
- STP;
- Kitchen Equipment;
- Other Assets.

Evidence may include photos, video, readings, comments, attachments, nameplates, leaks, findings, room condition, and test-stage evidence. Attachments are optional where not useful.

Related: [[FDG Maintenance Evidence Capture Engine]].

## 12. Findings and recommendations become data-driven
A major rule was established:

Observation + Reading + Checklist Result + Asset Data + Acceptance Rule
→ Finding → Severity → Recommended Action → Priority/Due Date → Retest Requirement

The first recommendation layer should be deterministic and defensible. Generative intelligence may later improve language or correlation, but the engineering basis must remain visible.

Related: [[Deterministic Findings and Recommendation Engine]].

## 13. Photo-to-3D concept
Technicians can capture actual room/equipment conditions such as pump status, nameplates, leaks, controllers, gauges, and findings. The longer-term pipeline can use those captured photos for assisted spatial reconstruction and a generated 3D room/equipment model.

Generated geometry must remain **Pending Verification** until reviewed by a technician/engineer. It must never silently become as-built truth.

Related: [[Photo OCR and 3D Reconstruction Pipeline]].

## 14. First deployment strategy
The deployment philosophy became:

**Working first. Safe local data second. Patch continuously. Advanced intelligence progressively.**

Target platform:
- GitHub source;
- Vercel deployment;
- installable PWA/mobile web;
- camera access;
- QR scanning;
- offline caching;
- IndexedDB/local project storage;
- auto-sync when online;
- e-signature capture;
- one codebase.

Related: [[FEIS PM PWA Offline-First Architecture]], [[Functional-First Patch Deployment Strategy]].

## 15. Technician ownership rule
Every technician has an account. The signed-in technician is automatically tagged as Main Technician in the report. Other technicians may be entered manually. Report date defaults to the actual/current date but remains editable; system created/updated/synced timestamps remain separate.

Related: [[Technician Account, Report Ownership and Signatures]].
