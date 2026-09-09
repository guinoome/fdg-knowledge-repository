# Deterministic Findings and Recommendation Engine

## First-principles rule
The first recommendation engine should be deterministic, traceable and defensible.

Observation
+ Reading
+ Checklist Result
+ Asset Data
+ Acceptance Rule
→ Finding
→ Severity
→ Recommended Action
→ Priority / Due Date
→ Retest Requirement

## Why deterministic first
- every conclusion can point to input evidence;
- safer for engineering work;
- easy to audit;
- works offline;
- does not depend on an external model;
- reusable across PM templates.

## Generative assistance later
A language model may later:
- improve wording;
- summarize related findings;
- suggest correlations;
- prepare executive narratives.

It must not erase or replace the rule/evidence basis. The UI should distinguish **Rule-derived recommendation** from **Suggested interpretation**.

## Example structure
Rule ID → triggering observation/check/reading → acceptance basis → finding → severity → action → retest.

The actual threshold/acceptance value must come from the approved project standard or configured rule library, not from an invented default.
