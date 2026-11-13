# PCSO Historical Lottery Analysis & Nex–Francis Prediction Trial

**Status:** Experimental / Not a validated predictive system  
**Owner:** Francis Guinoo  
**Analysis lead:** Nex  
**Started:** 2026-11-13  
**Canonical record:** FDG Knowledge Repository

## 1. Objective

Maintain a reproducible, evidence-based analysis of Philippine Charity Sweepstakes Office (PCSO) Lotto results using the complete verifiable historical record for each game, beginning with that game's first official draw and continuing through the latest available result.

The immediate experiment compares Nex-generated selections with Francis's independently chosen selections over a pre-registered 10-draw trial. The longer-term objective is to determine whether any historical-data feature improves out-of-sample match performance relative to uniform random selection.

This is a statistical research and recordkeeping exercise, not a claim that lottery outcomes can be reliably predicted.

## 2. Scope

Analyze each game independently because the number pool, draw schedule, game history and rules differ:

- Lotto 6/42
- Mega Lotto 6/45
- Super Lotto 6/49
- Grand Lotto 6/55
- Ultra Lotto 6/58

For every game, establish the earliest verifiable official draw date, preserve the original six winning numbers and draw date, and record source provenance. Do not assume that a conveniently available dataset covers the full history.

## 3. Data acquisition and provenance

Priority order:

1. PCSO official results and archives.
2. Official PCSO publications or records that can independently corroborate historical results.
3. Secondary archives only as discovery aids or cross-checks, never silently treated as official truth.

Every imported record should carry:

- game identifier;
- draw date;
- six winning numbers, normalized to ascending order while retaining the source representation if needed;
- source URL / document identifier;
- retrieval date;
- verification status;
- correction or discrepancy notes.

Data quality gates:

- validate number count, uniqueness and allowed range for the game;
- detect duplicate draw dates and duplicate records;
- identify missing draw dates only against a verified schedule/calendar;
- reconcile conflicting records against primary sources;
- report coverage start/end dates and unresolved gaps;
- retain raw source snapshots or stable source references where legally and technically possible.

**Do not call the dataset complete until each game's first draw has been verified and all available intervening draws have been reconciled.** Until then, label it partial and state its coverage.

## 4. Candidate analytical features

The following are hypotheses to test, not proven predictive signals:

1. All-time marginal number frequency.
2. Pair and triplet co-occurrence frequencies.
3. Recent frequency windows and long-term versus recent momentum.
4. Number recency / elapsed draws since last appearance.
5. Frequency stability across chronological eras.
6. Combination-level properties and similarity to historical draws.

Avoid the gambler's fallacy: a number being overdue does not make it more likely in the next independent fair draw. Historical frequency, pair association and recency do not by themselves change the theoretical probability of a future combination.

## 5. Initial proposed model — unvalidated

A previous conversational proposal assigned these provisional weights:

| Feature | Initial proposed weight |
|---|---:|
| All-time number frequency | 25% |
| Pair/triple relationships | 20% |
| Long-term vs recent momentum | 15% |
| Historical draw-gap behavior | 15% |
| Conditional frequency across periods | 15% |
| Combination-level historical similarity | 10% |
| **Total** | **100%** |

These weights are arbitrary starting hypotheses, not fitted coefficients, calibrated probabilities or evidence of improved odds. Do not present weighted scores as probability of winning. Revise or discard the weights only through documented, leakage-free validation.

## 6. Validation protocol

- Use chronological walk-forward backtesting: for each historical target draw, train or calculate features using only draws strictly before that target.
- Never use future draws or the target draw when generating a historical prediction.
- Compare the proposed model with uniform random combinations and simple baselines (for example, all-time frequency only).
- Use repeated random baselines and report uncertainty, not a single favorable comparison.
- Evaluate exact match-count distributions (0 through 6), at least 3/4/5/6 matches, and actual prize outcomes under the rules applicable to that draw.
- Report performance by game and by time period; do not pool unlike games.
- Preserve model version, parameters, data cutoff, generated selections, timestamp and target draw before the result is known.
- Reserve a final chronological holdout where feasible. Do not tune on the holdout.
- Report sample size, confidence intervals or appropriate uncertainty, and limitations.
- A small number of draws or a short 10-draw trial cannot establish predictive superiority.

For a fair 6/N game where six distinct numbers are drawn uniformly without replacement, every fixed six-number combination has the same jackpot probability, 1 / C(N,6). The number of matches follows the hypergeometric distribution. Historical analysis cannot be claimed to improve the jackpot probability unless a genuine, independently validated departure from the fair-draw model is demonstrated.

## 7. Nex vs Francis — 10-draw trial

Rules:

1. Record Nex and Francis selections before each target draw.
2. Keep the selections immutable after the draw.
3. Record official winning numbers and source.
4. Calculate exact matches for each participant.
5. Track match-count distribution, prize eligibility and verified prize outcome separately.
6. Use the same game and target draw for both participants.
7. Compare both against a random-selection benchmark.
8. Do not change the scoring rules mid-trial.

### Scorecard

| Trial | Game | Draw date | Nex selection | Francis selection | Winning numbers | Nex matches | Francis matches | Prize result / source |
|---:|---|---|---|---|---|---:|---:|---|
| 1 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 2 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 3 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 4 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 5 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 6 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 7 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 8 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 9 | Pending | Pending | Pending | Pending | Pending | — | — | — |
| 10 | Pending | Pending | Pending | Pending | Pending | — | — | — |

Do not backfill missing Francis selections from memory or infer them. Mark unavailable entries as missing.

## 8. Initial conversational selections to preserve

These are historical conversation artifacts, not verified model outputs and not evidence of a completed all-time analysis.

### Previously cited selections (2026-11-06 conversation)

- 6/42: 05–16–18–19–36–41
- 6/45: 03–04–25–38–42–43
- 6/49: 03–19–29–30–41–44
- 6/55: 06–09–41–42–52–54
- 6/58: 02–14–19–22–43–45

### Later Nex selections stated for 2026-11-13

- Mega Lotto 6/45: 03–19–25–31–38–44
- Ultra Lotto 6/58: 03–14–19–37–44–56

The latter selections were described as experimental picks, but no complete historical dataset, reproducible calculation or backtest supported them. They must not be retroactively labeled probability-weighted model predictions.

## 9. Current state and next actions

**Verified in this repository update:** the research objective, game scope, proposed feature set, provisional weights, validation rules, trial rules and conversational selections have been documented.

**Not yet completed:** acquisition of the complete PCSO historical dataset; verification of each game's first draw; source reconciliation; implementation of calculations; walk-forward backtesting; generation of reproducible model predictions; and any claim of predictive advantage.

Next executable work package:

1. Identify authoritative PCSO historical sources and earliest draw dates for all five games.
2. Acquire and preserve source records game by game.
3. Build a normalized, auditable dataset and data-quality report.
4. Calculate descriptive statistics and pair/triplet counts.
5. Implement leakage-free walk-forward backtesting and random baselines.
6. Only then generate model-ranked combinations and record their provenance.

## 10. Responsible-use boundary

Selections are for a low-stakes statistical experiment only. Do not encourage increased spending, chase losses, or represent any selection as a sure win. No reward or payment is expected from Francis. The experiment's success criterion is transparent, reproducible evidence—not a jackpot promise.

## Related knowledge

- [[00_Nex/00_Master Index|Nex Core Master Index]]
- [[Projects/Projects_Master_Index|Projects Master Index]]
- [[10_FDG_CORE_Intelligence/FDG-CORE-STD-013_MACHINE_LEARNING_AND_PREDICTIVE_INTELLIGENCE_STANDARD|FDG CORE Machine Learning & Predictive Intelligence Standard]]
- [[07_Nex_Core_Intelligence/KNOWLEDGE_RETRIEVAL_AND_MEMORY_STANDARD|Nex Knowledge Retrieval and Memory Standard]]
