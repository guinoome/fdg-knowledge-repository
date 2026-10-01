# FDG findings remediation and verification — 2026-10-01

Document ID: FAIS-REMEDIATION-2026-10-01
Version: 1.0
Status: Corrections implemented; independent release validation remains open
Owner: Francis; implementation by Codex in this work package
Approver: No engineering, security or canonical architecture approval claimed
Effective Date: Remediation record 2026-10-01
Supersedes: None

## Outcome

Corrected the reproduced HydroCal source defects, qualified FWIS capability claims with executable evidence checks, and prepared explicit architecture ownership/approval decisions. Original Markdown content remains as exact prefixes with dated addenda. The original HydroCal source is retained byte-for-byte as a non-executable history file.

This records a bounded corrective package. It does not assert every application or engineering formula in the repository is validated.

Source baseline: 2425ee27785c67b2e0740e745d9e793f1552ef84. Original audit: [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|2026-09-30 review]]. Proposal contents and decisions: [[05_Knowledge_Architecture/FDG_ARCHITECTURE_REVIEW_PACKET_2026-10-01|Founder review packet]].

## Finding disposition

| Finding | Correction / reconciliation | Remaining closure condition |
| --- | --- | --- |
| ACR-01 | Pressure-to-head conversion applied to main pump, curve and jockey; displayed substitution corrected; input domain checked | Independent engineering review and intended-use validation; not complete motor selection |
| ACR-02 | Preserve measured zero/missing source; retain adverse pressure despite passing velocity; exhausted pipe catalogue returns null; invalid storage domain rejects | Browser/form/real-PDF interaction verification and intended-use validation; helper tests do not validate every code table |
| ACR-03 | Remove hard-coded NPSH acceptance; retain insufficient evidence; label simulated curve and jockey assumptions; PDF/CSV are drafts | Site/fluid/manufacturer/code applicability and qualified review; no replacement universal NPSH margin |
| ACR-04 | Current capability manifest, four checks and dated corrections distinguish membership guards from absent role controls; examined fetched refs and cited historical commits | Missing role implementation, real PostgreSQL positive/negative tests and independent security release review remain open |
| ACR-05 | Current paths retained; FLIS claims decomposed into structure, admission and legal-content scopes | Founder resolves the remaining scope/evidence gap; no retroactive approval invented |
| ACR-06 | Record-level owner/writer/consumer matrix and proposed CBC/ECC/FBPOIS integration seam | D1 review; actual deployment bindings and pilot tests before implementation |
| ACR-07 | Explicit authority register, scoped approval record and resolver rules; Draft framework gets a proposed clarification; missing-date queue generated | D2/D3 and source owners provide genuine decisions/evidence; no bulk status/date changes |
| ACR-08 | Existing 274-occurrence navigation overlay retained; new links use exact repository paths | Legacy references remain preserved; scanner candidates are not all automatically repairable |
| ACR-09 | Main/PR navigation and authority explicitly distinguished | Separate FPIS PR review; no equivalence or merge presumed |
| ACR-10 | Commercial evidence gate retained with specific external evidence needs | Verified seller/entity, IP, accounting and offering facts; architecture withheld until gate passes |
| ACR-11 | Reasoning contract gains separate capability-evidence dimensions and result-dependency/change-impact behavior; bounded regression suite implemented | Full CORE engine, authority resolver, tenant controls, uncertainty and operational validation are not built by this package |

## HydroCal implementation

Changed Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html. Historical source: Projects/Active/AI/FDG-FP/history/FDG-FP-HydroCal.pre-2026-10-01.html.txt, verified Git blob 73a66de056ffd36fb38bd1fdc56ad5398ed7e590.

- Conventional water reference converts differential psi to feet using 2.31 before the GPM/feet-head power equation. The diagnostic 500 GPM, 100 psi, 80% case is 36.458333 BHP, not 15.782828.
- Required numeric blanks/nonfinite values reject. Zero is entered explicitly and no longer becomes an invented 80 psi supply.
- Static-reference residual is distinguished from demand-flow supply adequacy. Negative residual remains a failed finding.
- Pipe catalogue exhaustion produces no feasible candidate in both direct sizing and dependent hose-reel output.
- New results carry method version 2026-10-01.1, input/source snapshots, time and review-required release state.
- Reload/import retain historical numbers and require explicit recalculation. Recalculation archives the predecessor. The first saved-project load preserves original JSON; inability to write that backup prevents autosave from overwriting the original.
- Input/context changes invalidate affected results. Stale outputs cannot produce a new PDF/CSV draft. JSON export remains available to preserve evidence.
- Reports identify unverified proposed approvers and lack compliance certification. Missing optional chart/PDF libraries are disclosed; local calculation/JSON paths remain available.

Formula evidence was checked against the [Xylem/Bell & Gossett formula reference](https://www.xylem.com/siteassets/brand/bell-amp-gossett/resources/technical-brochure/bx-420c.pdf), physical page 5. NPSH evidence boundary was checked against [Hydraulic Institute guidance](https://www.pumps.org/2025/03/18/understanding-the-2024-updates-to-ansi-hi-9-6-1-rotodynamic-pumps-guideline-for-npsh-margin/). These references do not certify the application.

## Executed verification

Runtime: Node v24.19.0, Linux workspace. Commands from repository root:

```bash
node --test Projects/Active/AI/FDG-FP/verify/*.test.mjs
node --test Projects/Active/FWIS/verify/capability-check.test.mjs
node Projects/Active/FWIS/verify/capability-check.mjs
node Projects/Active/FWIS/verify/capability-check.mjs --release
node docs/audits/2026-10-01-remediation/verify-repository.mjs
git diff 2425ee27785c67b2e0740e745d9e793f1552ef84 --check -- . ':(exclude)Projects/Active/AI/FDG-FP/history/FDG-FP-HydroCal.pre-2026-10-01.html.txt'
```

| Check | Result / scope |
| --- | --- |
| Calculator regression tests | 20 passed: helpers, actual hydraulic/pump/pipe/report methods with fixtures, predecessor retention and export blocking |
| FWIS capability tests | 4 passed: source inventory, false capability claim, label-only release bypass and invalid evidence path |
| FWIS normal inventory | Exit 0 means inventory agrees with source; not security certification |
| FWIS release check | Exit 1 expected: release remains blocked; not deployed enforcement |
| Preservation/link verification | Machine-readable repository-verification.json records current counts, exact-prefix checks, added link resolution and target hashes |
| Approval evidence queue | approval-evidence-queue.json records exact Approved headers lacking effective dates; no inferred approval dates |
| Diff whitespace | No errors in active code/new knowledge; historical source copy deliberately retains 12 original trailing-whitespace lines to preserve exact bytes |

Test output is retained in hydrocal-tests.tap and fwis-capability-tests.tap beside this record. Those files contain executed results, not predicted counts.

The final scan covers 1,997 files and 1,238 Markdown documents. All 21 modified pre-existing Markdown documents retain their exact original bytes as prefixes. All 100 added wikilinks resolve uniquely; there are no duplicate IDs in the 259 recognized header identities. The 544 unresolved and 173 ambiguous historical reference candidates remain unchanged. The approval-date queue still contains 156 records; no date was invented to reduce that count.

## Verification limits and remaining work

Browser execution was attempted using installed Playwright, but neither its Chromium executable nor a system browser was available. No browser dependency was installed. Therefore desktop/mobile screenshots, real DOM interaction, console-clean browser boot, actual PDF layout, service-worker behavior and end-to-end import/export are **not verified** here.

DOM/storage/PDF sinks execute actual extracted application methods but cannot establish browser behavior. Optional CDN chart/PDF loading, full import hardening and other existing application code/code-edition tables remain outside the tested slice. Do not deploy this as a validated engineering tool based solely on these tests.

No PostgreSQL/Supabase live test environment or deployed schema was accessed. Historical FWIS test totals are not rerun proof. The new release check is an explicit review command, not an installed CI/deployment gate.

The same implementer authored and checked these changes. Significant safety/security closure still needs an independent reviewer. No equipment action, database migration, production deployment, PR merge, legal-entity decision or commercial commitment occurred.

## Knowledge preservation and navigation

Existing Markdown is appended, not rewritten. The original calculator implementation remains accessible as historical evidence; the active implementation is corrected. New architecture documents preserve Proposed status until an actual scoped decision.

All new wikilinks are checked for unique file resolution. Legacy unresolved/ambiguous references remain in historical text; this package does not pretend they disappeared or replace unknown targets with misleading stubs.

Related: [[05_Knowledge_Architecture/FDG_AUTHORITY_RECONCILIATION_REGISTER_2026-10-01|Authority reconciliation]] · [[09_FDG_Ecosystem_Integration_Hub/FDG_SHARED_RECORD_CONTRACT_2026-10-01|Ownership contract]] · [[Projects/Active/FWIS/CURRENT_CAPABILITIES_2026-10-01|FWIS evidence]].

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[docs/audits/2026-09-30-architecture-critical-review/FDG_ARCHITECTURE_CRITICAL_REVIEW|Original audit]] → this remediation record
