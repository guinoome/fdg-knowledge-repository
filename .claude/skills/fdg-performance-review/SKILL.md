---
name: fdg-performance-review
description: Run a bounded evidence-led FDG application performance review, identify one measurable bottleneck, protect offline/tenant correctness and demand reproducible tests before proposing an optimization.
disable-model-invocation: true
---

# FDG Performance Review (Claude Code)

Read `17_FDG_Platform_Intelligence_System/04_Platform_Performance_Value_Intelligence/02_FDG_Evidence_Led_Application_Performance_Optimization.md`, the project owner's approved FPJIS work package and the current `CLAUDE.md` / `AGENTS.md` as appropriate. This skill is a checklist/work-card guide, NOT an automatic profiler or an installed performance scanner.

1. Name one actual slow user outcome, current source branch, permitted files and test environment. Confirm requirements and collaborating owner.
2. Measure a realistic **baseline** with actual fixture/device/network; identify mobile/desktop/offline mode, warm/cold cache, sample size and p50/p95 where feasible. Without execution access return `MEASUREMENT_BLOCKED`; never invent improvements.
3. Select *one* relevant video-derived optimization P01–P16 with before/after hypothesis. Do not implement CDN, cache, indexes, connection pool or load balancing merely because the video lists them.
4. Preserve role and tenant isolation, private cache boundaries, accurate engineering calculations, offline persistence, accessibility and permission constraints. Check relevant FSIS-0803 requirements.
5. Under an authorized bounded work package, run real positive/negative regression tests, benchmark identical conditions, and document cost, privacy, rollback and any new operational burden. If no authorized code/worker access, issue a task card instead of making up execution.
6. Return `ADOPT / REVERT / EXPERIMENT MORE / BLOCKED` with exact tested evidence, responsible reviewer, commit, unrun checks and next action. Do not publish a performance claim or deploy without separate approval.

For site Core Web Vitals, use p75 field data when available (LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1) rather than treating Lighthouse lab output as field proof. Never lazy-load the actual LCP hero asset; never shared-cache private tenant responses. `/fdg-performance-review` is manually invoked.
