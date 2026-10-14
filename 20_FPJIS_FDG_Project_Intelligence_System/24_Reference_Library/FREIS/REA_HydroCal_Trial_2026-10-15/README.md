# REA / HydroCal feasibility trial
Date: 2026-10-14 UTC (2026-10-15 Asia/Manila)
Status: BLOCKED feasibility trial; no adoption recommendation.
Related: [[FREIS]]; [[FDG_TOP_TIER_ARCHITECTURE_COMPILER_PROTOCOL]]

## Decision
Keep REA experimental. This run does not establish calculation reconstruction accuracy, generated-test quality, or time savings. REA successfully inventoried the built HTML but explicitly omitted its inline JavaScript. Analysis of an extracted script then failed a required Linux process-ownership check. Do not bypass that check.

## Target and provenance
Repository: guinoome/fdg-knowledge-repository.
Application: Projects/Active/AI/FDG-FP/FDG-FP-HydroCal.html.
Pinned Git blob: 73a66de056ffd36fb38bd1fdc56ad5398ed7e590.
Application SHA-256: 8f82e9aed90c0fe7617fcbba0abced5ff921cb2b14308476b27b77e7ed5212d1.
Existing probe: docs/audits/2026-09-30-architecture-critical-review/probe-hydrocal.mjs.
Probe Git blob: 6774d8363bbd595c9024cb9c8d81d35ff244d6b9.
Bounded candidate: pump brake horsepower calculation, Eng.pumpBHP, and its caller unit conversion/validation behavior.
Source line 1048 contains the helper; callers occur at 2053, 2096 and 2113 in the pinned file.
The built artifact is readable HTML with embedded source, not an opaque compiled executable.

## Method and limitations
Installed rea-agents@6.5.0 locally with lifecycle scripts and optional dependencies disabled. Node v24.19.0, npm 11.9.0. Installation reported 31 seconds. This configuration is part of the experiment and may differ from a default installation.
The evaluator read the existing diagnostic before REA analysis. This invalidates a blind reconstruction claim. No separate independent reconstruction agent was run.
The first local source copy acquired a trailing newline; the probe correctly rejected the changed blob. Restoring the exact source bytes resolved that guard failure. The guard was not disabled.
REA is an evidence analyzer in this invocation; it did not itself produce a natural-language reconstruction or generated tests.
No application code was changed.

## Observations
| Stage | Observation | Meaning |
|---|---|---|
| Existing probe | Seven diagnostic entries reproduced | Historical defects/unsafe rules reproduced; not seven passing engineering tests |
| Raw HTML analysis | Exit 0; 1.216 seconds | Inventory successful, calculation code unavailable |
| Inline code coverage | REA reports one inline body beginning line 932 was not analyzed | No basis for claiming calculation reconstruction |
| Extracted-script analysis | Exit 1; 0.966 seconds | Blocked before usable calculation evidence |
| Required check | ps -axo pid=,ppid=,pgid=,uid=,stat=,command= failed: fatal library error, lookup self | Environment/provider prerequisite failure; not proof the tool cannot analyze JavaScript elsewhere |

The extraction copied the final inline script bytes without rewriting. See extraction.json within the evidence bundle for byte offsets and digest.
REA assigned an electron-renderer graph kind to HTML. Treat this as tool classification, not proof HydroCal is an Electron application.
Raw HTML evidence ID: ev_da7e6e481e929cfbed1fc4c4f39e4e721c9728afcba153e552b49b5838bc5442.

## Requested measures
| Measure | Result |
|---|---|
| Normal-case reconstruction correctness | Not measured: no reconstruction |
| Boundary-case correctness | Not measured: no reconstruction |
| Unsupported assumptions / missed behavior | Inline calculation behavior explicitly absent; classification requires caution; no reconstruction to score |
| Evidence traceability | Partial: artifact hashes, evidence ID, coverage limitation, extraction mapping and failure recorded; no calculation claim-to-source trace |
| Time against ordinary inspection | Inconclusive: command durations only, no controlled source-inspection baseline |
| Correction effort | Exact-byte restoration, timing utility replacement, manual inline extraction; active human time not recorded |
| Generated-test quality | Not measured: no REA-generated tests |

Existing HC-01 reports actual BHP 15.782828282828282 for 500 gpm, 100 psi, 80 percent efficiency versus its water-head reference 36.458333333333336. This is a finding from the pre-existing diagnostic, not new engineering validation. The helper uses Q*H/(3960*(eff/100)); fidelity to that helper and correctness of caller units are distinct questions.
Other probe observations cover zero-pressure fallback, zero usable storage fraction, a fixed NPSH rule, an infeasible pipe recommendation, and misleading acceptance with negative residual pressure. They provide candidate holdouts, not evidence of REA performance.

## Repeatable bounded benchmark package
Owner: top-tier architect/auditor. Implementer may be any approved agent. Use identical frozen acceptance criteria for every agent.
1. Freeze the application blob, existing tests, environment, REA version and dependency lockfile. Record checksums. Use a clean supported environment where REA's ownership check succeeds.
2. Architect defines only pump horsepower scope: inputs, displayed units, helper, callers, validation, rounding and output. Exclude other calculators.
3. Keep original source, diagnostic results and holdout oracle from the reconstruction agent. Because HTML includes source, explicitly define allowed artifact access and report this as application-assisted reconstruction, not source-blind binary reverse engineering.
4. Give REA-assisted arm the artifact and the same task statement as baseline. Give baseline ordinary source-inspection tools without REA. Use separate fresh contexts, identical model/version and budgets; alternate order across repeated trials.
5. Require reconstruction.md, reconstructed function, generated tests, claim-evidence map, uncertainty register and time log. Every behavioral assertion must cite artifact digest plus location or a reproducible observed input/output.
6. Auditor runs frozen holdouts against original and reconstruction. Score behavioral fidelity separately from engineering validity. Unexpected original behavior must be documented, not silently fixed.
7. Report normal and boundary passes as numerator/denominator; enumerate unsupported assumptions and missed behaviors. Measure traceable claims / all factual claims; report active work, setup, tool waiting, correction minutes and iteration counts separately.
8. Auditor accepts only when all required behavior cases agree, all material claims are supported or marked unknown, and no critical omitted behavior remains. Tool-value decision additionally requires repeatable reduction in total time/correction effort at comparable correctness. A single run cannot establish general benefit.
9. Return evidence, source/test diffs and audit decision to the repository. Rejected packages include exact failing inputs and recovery steps.

### Frozen holdout design
Use independent reference calculations and source-observed behavior; do not derive every oracle from the reconstruction.
- Normal valid inputs: multiple flow/head/efficiency combinations, including the historical 500/100/80 scenario.
- Zero flow and zero head.
- Efficiency zero, negative, just above zero, 100 and above 100.
- Negative flow/head; decimals; large finite values.
- Missing, blank and nonnumeric form values; numeric strings at the UI boundary.
- Explicit pressure-to-head unit handling at each caller.
- UI rounding versus underlying precision; nonfinite results and validation messages.
Classify helper-level cases separately from reachable UI cases. Freeze expected outputs or expected rejections from original behavior before reconstruction; separately freeze reviewed engineering expectations. Exact string output for UI, numeric tolerance justified per calculation for numeric results.

### Recovery
If process inspection fails, preserve the diagnostic and rerun on a supported host. Do not shim ps or disable ownership enforcement.
If inline script coverage is absent, document extraction and map bytes/lines back to the pinned artifact. Count this work as REA setup/correction time.
If an agent must see the oracle, mark its run contaminated and restart with a fresh context for blinded comparisons.
If an engineering defect is found, open a separate remediation package; do not alter the benchmark original mid-run.

## Reproduction
Install: npm install --prefix rea-trial/tool --ignore-scripts --omit=optional --no-audit --no-fund rea-agents@6.5.0
Run existing diagnostic: node probe-hydrocal.mjs /path/to/pinned/FDG-FP-HydroCal.html
Analyze original directory: rea-trial/tool/node_modules/.bin/rea analyze-javascript-application /absolute/path/to/target --json
Analyze extracted script directory using the same command and /absolute/path/to/derived.
Elapsed times are single subprocess wall-clock measurements, not statistical performance results.

## Evidence
[evidence-bundle.json](evidence-bundle.json) contains original diagnostic results, full raw-HTML REA result, timings, extraction metadata and the extracted-script failure.
The large partial graph attached to the failed analysis is omitted; its original result SHA-256 is retained. No successful reconstruction output has been omitted.
