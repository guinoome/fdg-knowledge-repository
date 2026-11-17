---
title: "ML-DEP Agent Handover — READ BEFORE CODING"
version: "1.0"
status: "BASELINED"
---
# ML-DEP Agent Handover — READ BEFORE CODING

## Mandatory defect-diagnosis and repair control — FAIS-SSA-1001 v1.1

**Required for every collaborator receiving this handover:** [[22_FDG_Audit_Intelligence_System/10_System_and_Software_Audit/FAIS-SSA-1001 - Evidence-First Software Defect Diagnosis and Minimal Repair Protocol|FAIS-SSA-1001 v1.1 — Enhanced Evidence-First Defect Diagnosis and Software Assurance Protocol]] is the approved, mandatory FDG standard whenever the assigned work investigates or corrects a bug, regression, unexpected behavior, failed test/acceptance, calculation/data discrepancy, or runtime/integration defect. Read the canonical protocol before diagnosing or modifying code. This applies regardless of model, provider, IDE, coding agent or environment.

- Start with evidence and a pinned source/build baseline. Capture observed versus expected behavior, exact reproduction/input, relevant environment, logs and impact. Mark unavailable facts UNKNOWN.
- Keep defect diagnosis read-only. Do not patch, refactor, rename, reformat, upgrade dependencies, migrate data or experiment destructively in production before the causal diagnosis is supported and the authorized project/domain owner approves a bounded repair scope.
- Separate symptom, proximate cause, contributing condition and demonstrated root cause. Rank and test hypotheses; compare last-known-good/first-known-bad revisions when relevant; trace exact data to the first divergence.
- Classify P0–P3 and apply the protocol's risk-triggered safety, security, data-integrity, independent-review, numerical/engineering, release and rollback controls where triggered. Do not impose high-risk ceremony on low-risk cosmetic defects, and do not waive mandatory baseline controls.
- After approval, make the smallest scoped correction. Demonstrate RED on the defective baseline and GREEN on the corrected revision where feasible, then run relevant regression/impact checks. Search for the same defect pattern elsewhere without performing unauthorized bulk edits.
- Report actual commands and test results only. Distinguish executed, passed, failed, skipped, blocked and not run. Include exact commits, changed files/lines, evidence, remaining unknowns and protocol version in the handover.
- The diagnostician/implementer/verifier roles and production-release controls are separated according to consequence and risk. The implementer is not sole acceptance authority for high-consequence work.

**Trigger boundary:** This standard governs defect diagnosis and repair; it does not replace the approved feature work package or authorize new feature scope. If a defect is discovered during feature work, pause the affected change and enter this protocol for that defect. Resume only under the authorized scope. FPJIS governs project execution and acceptance; FMCIS governs collaborator allocation and coordination; FAIS governs audit evidence, defect assurance and verification. Project-specific controls may be stricter, never weaker.

**Receiving-collaborator acknowledgement:** Record FAIS-SSA-1001 v1.1 in the task-start/preflight record and identify any access, evidence or authority blocker before work. Do not claim compliance based only on reading this short summary; the canonical protocol governs.


## STOP
Do not begin coding when you receive this package.

First **READ → INSPECT → RECONCILE → TEST → REPORT → THEN CODE**.

Local path:
`C:\Users\FraNc!s\Documents\Obsidian\FDG Knowledge Repository\Projects\Active\ML Projects\ML Digital Event Platform (ML-DEP)`

Remote: `https://github.com/guinoome/mlprinting`

Connected: Vercel + Supabase. Verify current state.

## Mandatory preflight
1. Read all baseline files in mandatory order.
2. Inspect local repository read-only: status, branch, HEAD, modified/untracked files, schema/migrations/tests/docs.
3. Never reset/clean/rebase/force-checkout/delete during discovery.
4. Reconcile local vs remote main. Create `PRECHECK_LOCAL_GITHUB_DIFF.md`. Merge; do not replace.
5. Run current install/build/typecheck/lint/tests/E2E as supported. Record BEFORE failures.
6. Reconcile Supabase schema/migrations/RLS/auth/storage. Never expose secrets. Create `PRECHECK_SUPABASE_STATE.md`.
7. Reconcile Vercel project/repo/branch/latest deployment/build/env-var names/public behavior. Create `PRECHECK_VERCEL_STATE.md`.
8. Create `WP20_READINESS_REPORT.md` with READY / READY WITH RECORDED LIMITATIONS / BLOCKED. If BLOCKED, do not code.

## Baseline rules
ML-DEP is one configurable experience engine, not 50 apps. Customer journey: Choose → Fill → Upload → Preview → Approve → Pay → Done. Motion: M2–M3 default, M4 selective, reduced motion mandatory. Portfolio: 18 CORE / 24 SIGNATURE / 8 IMMERSIVE. Customer controls content/approved personalization; platform controls layout, motion, interaction implementation and responsive behavior.

## Reuse before build
Inspect and reuse current builder, marketplace, renderer, layout registry, hero/video, RSVP, countdown, QR, music, media, recommendation, print/digital foundations and current test patterns. Do not recreate a solved capability because an old document says it was missing.

## First implementation sequence
WP20-100 Experience Engine → WP20-200 Visual Primitives → WP20-300 Motion → WP20-400 Interactions → WP20-500A Capiz Window → WP20-500B Neon Eighteen → WP20-500C In Loving Memory. Only after all three proofs validate may WP20-600 scale the Final 50.

## Change control
If baseline appears wrong, create a Change Request with evidence and impact. Do not silently redefine requirements.

## Definition of Done
Scoped implementation complete; no architecture drift; tests/build/typecheck/lint as applicable; mobile/reduced-motion/performance/security validated where applicable; evidence and docs updated; baseline deviation NONE or approved CR.
