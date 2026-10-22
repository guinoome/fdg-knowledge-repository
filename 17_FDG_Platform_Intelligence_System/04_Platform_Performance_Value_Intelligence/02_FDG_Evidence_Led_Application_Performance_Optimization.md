---
document_id: FPIS-PERF-0001
title: FDG Evidence-Led Application Performance Optimization and Acceptance Pack
owner_domain: FPIS Platform Performance & Value Intelligence
project_acceptance_owner: FPJIS Nonfunctional Experience and Accessibility Standard
security_owner: FSIS
collaboration_owner: FMCIS
document_type: Cross-provider reusable performance work card
status: Draft candidate - no production performance audit or implementation performed
created: 2026-10-22
source_media: User-supplied video 1000011697.mp4 (32.90 seconds)
evidence_class: Visual checklist plus official public technical documentation; no FDG measured results
build_authorized: false
deployment_authorized: false
supersedes: None
---

# FPIS-PERF-0001 — Evidence-Led Application Performance Engineering

> Knowledge path: [[FDG Ecosystem]] → [[17_FDG_Platform_Intelligence_System/00_FPI_Home|FPIS]] → [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/00_Index|Performance & Value]] → this source-backed candidate.

## Context, Origin, Reasoning, Evidence

**Origin:** The founder shared a ~33-second creator video on 2026-10-22 showing 16 web-application performance tips. The video includes checkmarks next to recommended techniques and crosses next to things to eliminate. Creator claims and green checks are *general suggestions only*, not evidence that a particular FDG application is slow, that a fix is effective, or that a tool is deployed. The specific 16 items appear in §2.

**Problem to solve:** FDG builders and collaborators can generate visually attractive applications that are slow to load, sluggish on real phones, waste API/database resources, fail under large asset registers, or lose offline user work. A large collection of generic optimization tips can also cause regressions, privacy leaks, costs and complexity. We need a small, **measured, testable optimization contract** rather than a rule to apply every item blindly.

**Canonical ownership:** FPIS diagnoses and recommends performance/value enhancements; FPJIS governs requirements, acceptance and authorized code work; FSIS owns privacy/security implications; FBIS evaluates commercial impact; FMCIS routes bounded work to authorized builders and reviewers. This **extends** [[17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/01_Platform_Performance_Value_Intelligence|existing FPIS performance intelligence]] and [[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/04_Nonfunctional_Experience_and_Accessibility_Standard|approved FPJIS nonfunctional standard]], not creating a new FDG intelligence system.

**Reference evidence (checked 2026-10-22):**
- Google/web.dev Core Web Vitals methodology: https://web.dev/articles/vitals — at 75th percentile of real eligible page loads, good LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1; separate mobile/desktop.
- LCP optimization: https://web.dev/articles/optimize-lcp — **do not lazy-load the primary LCP/hero image**; prioritize its discoverability and delivery.
- MDN HTTP caching controls: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control — private/personalized responses must not be shared across users; assess \`private\`, \`no-store\` or validated revalidation per sensitivity.
- Next.js framework-specific caches: https://nextjs.org/docs/15/app/guides/caching — version-specific semantics and explicit revalidation must be inspected against the *actually installed version*, not copied from an old article.
- Supabase performance: https://supabase.com/docs/guides/platform/performance and https://supabase.com/docs/guides/database/connection-management — measure database workloads and size connection pools for actual compute/concurrency.
- Security acceptance: [[12_FDG_Security_Intelligence_System/08_Cybersecurity/FSIS-0803 - Agent Generated App Security Verification and Acceptance Pack|FSIS-0803]], especially role/tenant isolation, offline exports and cached private data.

## 1. Performance is a user outcome, not a green checklist

Observe **critical user journeys** before writing optimizations: first useful mobile paint, sign-in and authorized branch switch, open/scroll/search an asset list, open a maintenance report, save a technician observation without network, re-open a saved draft, sync without duplication, submit a valid quote/lead and recover from a failed request.

Specify per journey:
- who and which role / tenant / facility / branch;
- device class, OS/browser, online/offline or throttled network, dataset volume and concurrency;
- test fixture identity and whether results are local lab or real field telemetry;
- operation and target latency/budget (approved per work package, not arbitrary universal claims);
- median (p50), tail latency (p95) and failure/error rate if measurable; log sample size and units;
- cold vs warm cache, first vs subsequent interaction, success and degraded/failure outcomes;
- privacy, correctness, accessibility and cost invariants;
- baseline, changed hypothesis, before/after identical conditions and rollback.

**Reference public-page thresholds:** use Core Web Vitals LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at p75 for suitable public web experiences. These are Google "good" reference boundaries, *not proof that FDG achieves them*. Do not call a Lighthouse lab score a measured field p75. For business dashboards, native/desktop and offline workflows use measured task-specific budgets instead of imposing public SEO metrics where inapplicable.

## 2. All 16 creator-video items, corrected for FDG

| ID | Video tip | Use when measurements justify it | Critical correction / negative test |
| --- | --- | --- | --- |
| P01 | Cache API responses | Repeat read-only responses with expensive source operations | Scope to auth/tenant/branch/role and freshness; invalidate on mutation, entitlement and logout; prohibit shared personalized cache. Test cross-tenant and stale authorization; default no-store for sensitive responses unless consciously designed otherwise |
| P02 | Index the database | Measured expensive filter/join/sort on large tables | Use actual query plan and rows via EXPLAIN (ANALYZE) on safe fixture; profile RLS overhead. Index adds storage/write costs; test insert/update regression and migration rollback; never add indexes by guess |
| P03 | Compress images | Image transfer is part of measured slow startup or data use | Responsive source sizes and modern compression; preserve legible MEP/electrical nameplates, safety labels and inspection evidence; keep engineering originals where required |
| P04 | Loading skeletons | Users need meaningful visible loading affordance | Perceived response is not actual speed. Preserve focus/announcements and size to avoid CLS; errors/empty/offline need truthful, non-infinite states |
| P05 | Debounce input handlers | Repeated typing triggers costly search/API execution | Debounce *search* when appropriate, not critical save, safety alarms or financial submission. Flush/cancel on unmount/blur; latest input must be processed. Test fast typing/IME and last-keystroke correctness |
| P06 | Split code into chunks | Bundle analyzer shows costly initial JS unrelated to first task | Lazy-load low-priority routes/features while keeping primary navigation/critical actions fast; avoid creating waterfall and offline dependencies. Test first-load and offline revisit |
| P07 | Add CDN | Distributed *public static* content suffers distance/transfer delays | Not mandatory for local-first/edge-only apps. CDN cache/privacy/cost and invalidation must be verified; never CDN-share tenant reports, receipts or inspection photos |
| P08 | Paginate large lists | Hundreds/thousands of assets, work orders, transactions or audit rows cause expensive reads/render | Prefer accessible pagination, bounded queries and stable ordering; test empty, filter/search and concurrent inserts; preserve exact totals when feasible or label approximate |
| P09 | Compress API payloads | Payload size is a significant measured bottleneck | First project columns/select fields, batch and avoid redundant polling; then negotiate gzip/Brotli where server/client support. Test CPU/battery tradeoff, cache behavior and API schema stability |
| P10 | Remove unnecessary re-renders | Profiler proves a component recomputes on unrelated state changes | Narrow state/selectors, memoize only demonstrated hot paths. Do not blanket-use React memo/hooks or hide stale engineer approval/readings |
| P11 | Minify JS and CSS | Production build lacks asset minification/tree shaking | Use existing bundler's production build settings; validate source maps privacy, content hashes, debugging, source licenses and actual resulting file-size difference |
| P12 | Add lazy loading | Images and optional components genuinely below the fold consume initial bandwidth | **Never lazy-load the actual LCP hero image or critical first-screen control.** Test real phone start and skeleton/placeholder stability; offline required assets must remain accessible |
| P13 | Defer non-critical scripts | Long tasks and render-blocking third-party scripts delay first useful work | Defer only non-essential extras; do not delay consent, auth, accessibility or essential offline bootstrap. Verify order, no broken events and third-party privacy |
| P14 | Remove unused dependencies | Bundle/dependency audit shows unused packages or vulnerable baggage | Remove with tests and ownership review; check indirect imports, licenses and offline capabilities. Don't blindly update the entire dependency tree |
| P15 | Database connection pooling | Actual DB connection churn or saturated pool shown in observability | Supabase/Supavisor/serverless vs local PostgreSQL need different policies; test max concurrency, transactional behavior, authentication and reserved DB services. More pooled connections can worsen overload |
| P16 | Add load balancer | Sustained concurrent production traffic exceeds validated instance capacity | **Not a universal first action.** Require measured scale/availability target, stateless/session strategy, sync/WebSocket affinity if relevant, health probes, cost and rollout/rollback authority |

**Order guidance:** Analyze user tasks and heavy resources → fix obvious excessive payload/index/overfetch → optimize critical route/bundle → reduce repeated work → scale architecture only with demand. Do not turn this priority order into a requirement to do all sixteen.

## 3. FDG-specific priorities — proposals, not confirmed performance defects

| Product/domain | First investigation | High-risk correctness invariants |
| --- | --- | --- |
| FDG Business Platform marketing hub | Mobile hero/LCP, font/image transfer, route chunks, first meaningful click and working sign-up/quotation CTA | Preserve truthful offers, Google login, tenant/branch isolation and subscription entitlement; no cached private account data in public CDN |
| FBPOIS / FWIS / FMIS | Technician phone first-screen task, photo capture, 500+ asset register as *synthetic fixture*, offline save and pending sync backlogs | No missing photos/checklists, revoked access, duplicate sync, stale asset severity/approval or wrong facility data |
| FDG Solar Visayas quotation | Responsive calculator latency, repeat computation, dependency weight, precise numerical save and preview | No changes to inverter sizing, financial units, assumptions, BOM and authorized quote approval because of a perf patch |
| FEIS engineering/QTO | Drawing/image loading and bounded document list/render under representative files | Preserve scale, units, traceability, measurement evidence and accepted engineering accuracy |
| Service reporting / Pilot 001 | Sample maintenance evidence and PDF/report generation time and reliability in a controlled local demo | Not a production website/paid customer, preserve original records, review/sign-off and confidentiality |
| Future business verticals | Test critical sales/order flow and role-based assets before scaling | No leaked branch/order data, inaccurate stock or payment state |

**No real site/app profiling was performed by the social video or this document.** Example dataset sizes are test fixtures, not claims about actual live FDG data.

## 4. Reusable bounded performance work package (FPIS-PERF-WP-001)

**P0 — Permission and scope**: Retrieve relevant approved project state, exact repository path, affected files, FPJIS work card, constraints, owner, test fixture and existing code. Do not begin a speculative rewrite or change third-party dependencies absent authorization. Claude and Codex workstation P0 skill setup, if applicable, is separate.

**P1 — Baseline**: Measure representative user journey (cold/warm, mobile/desktop/offline, dataset size, concurrency); capture devtools/network trace, bundle/report/query plan where available; record p50/p95/sample size/units and error behavior. If not available, mark \`NO_BASELINE — AUDIT BLOCKED\`. No invented milliseconds, pass statuses or fabricated Lighthouse reports.

**P2 — Hypothesis and security**: Pick ONE bottleneck and ONE smallest reversible change. Assess private/tenant caching, branch authorization, exact engineering record integrity, sync queue durability, database migration, actual host/serverless resource limits, accessibility and rollback. Require FSIS review for cache/role boundary changes.

**P3 — Execute only within approved scope**: Assign bounded low-cost worker and independent reviewer when actually available. Change permitted files only; test regression of key affected workflows and worst-case/offline/error paths. Never "improve" numbers by removing validation, safety checks, evidence or approval. If no authorization/dispatch tool, provide a real work card and \`BLOCKED\`, not invented agents.

**P4 — Verify**: Re-run exact baseline scenario conditions and compare absolute/percentage change **only if data exist**. Record cold/warm/field vs lab separately, extra requests, JS size and data transfer, user-perceived task completion, correctness, cost and confidence. Negative tests include wrong tenant cached result, branch switch and logout, stale report, a failed retry/offline resumption, rapid input, pagination consistency, storage limit, and screen-reader/keyboard behavior as applicable.

**P5 — Decide and return**: \`ADOPT / REVERT / EXPERIMENT MORE / NO CHANGE\`, with measured benefit/cost and residual risks, tested rollback, code SHA, actual test logs, owner acceptance and next smallest action. FPIS records the general pattern; FPJIS records project-specific change and acceptance, and existing release/deployment gates remain intact.

### Example work card (agent/provider neutral)

\`\`\`text
FDG-PERF: <FPJIS task ID> / <current repo SHA>
USER JOURNEY: <one measured slow action and user/device>
BASELINE: <commands, fixture, results p50/p95, sample count; lab/field>
BOTTLENECK & CAUSE: <trace, query plan or profiler evidence>
AUTHORIZED FILES: <exact owned paths; prohibited boundaries>
CHANGE HYPOTHESIS: <one reversible intervention P01..P16>
CORRECTNESS/SECURITY: <tenant/branch, critical records, offline, accessibility>
ACCEPTANCE: <specific project NFR target, no regression; test conditions>
TESTS: <exact commands, observed positive + negative outputs>
RESULT: <measured before/after, cost, net benefit, fail/blocked>
REVIEW: <worker and independent reviewer with evidence>
ROLLBACK / RELEASE: <revert proof, separate FPJIS approval required>
\`\`\`

## 5. Acceptance criteria — measured, not guessed

- [ ] PERF-AC-01: Target user journey and size/device/network test conditions are explicit.
- [ ] PERF-AC-02: Baseline actual values/source exist, or work blocked for missing measurements.
- [ ] PERF-AC-03: Proposed code change is tied to a real bottleneck and authorized scope.
- [ ] PERF-AC-04: Before/after comparison uses repeatable workload, states sample counts and avoids cherry-picked favorable numbers.
- [ ] PERF-AC-05: Tenant/branch/auth/role cache isolation or database authorizations remain verified with negative tests.
- [ ] PERF-AC-06: Engineering/report/quote calculations and evidence unchanged except explicitly approved logic changes.
- [ ] PERF-AC-07: Offline save, state restoration, conflict/sync recovery and low-connectivity states work where in scope.
- [ ] PERF-AC-08: Accessibility, focus, error/loading/empty states and mobile layout remain functional.
- [ ] PERF-AC-09: Dependency, server/pool/CDN/cloud cost do not create unexplained new risk/spend.
- [ ] PERF-AC-10: Performance claim can be reproduced with actual tests, rollback identified and human/review disposition recorded.
- [ ] PERF-AC-11: No complete/tested/deployed status is claimed from a generated screenshot, idea video or unrun benchmark.
- [ ] PERF-AC-12: Knowledge learning returned to the correct FPIS/FPJIS domain with link/commit evidence; original source evidence classified.

## 6. Session receipt and decision rule

\`\`\`text
FDG-PERF STATUS: RESEARCH_ONLY / MEASUREMENT_BLOCKED / IN_TEST / TESTED_CANDIDATE / ACCEPTED / REVERTED
Scope and existing app/project:
User workflow, fixture, device, network:
Baseline actual measurements:
Change and files:
Before/after measurements and sample count:
Security + privacy + offline negative tests:
Actual tests run / not run:
Observed regression:
Reviewer and authority:
New infra/dependencies/cost:
Rollback:
Commit and knowledge handoff:
Next separately approved action:
\`\`\`

**No benchmark, app optimization, skill installation, production deployment or release was executed when this document was created.** Acceptance requires future authorized implementation on current real code plus working evidence.
