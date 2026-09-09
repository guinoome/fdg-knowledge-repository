# CORE-0009 — Methodology, Validation and Computation Registry

## Methodology registry

Engineering methods should be identifiable and versioned rather than buried invisibly in code.

Example:

```text
Method ID: FDG-HVAC-AIRFLOW-001
Version: 2.1
Status: Approved
Applicability: ...
Inputs: ...
Equations/logic: ...
Units: ...
References: ...
Assumptions: ...
Limitations: ...
Validation cases: ...
Owner/reviewer: ...
```

A calculated result can therefore identify exactly which method and version produced it.

## Shared validation mechanism, domain-owned rules

CORE may provide the validation/rules execution mechanism.

Modules own the domain rules.

```text
T&C        → acceptance rules
Energy     → baseline/performance rules
PM         → maintenance rules
Inspection → inspection criteria
CORE       → executes, records and traces outcomes
```

## Calculation reproducibility

Persist or reconstruct:

- inputs;
- units;
- assumptions;
- method/version;
- intermediate results where material;
- output;
- software/runtime version where material;
- validation status;
- reviewer/approval.

## Reference authority

A methodology may cite codes, standards, specifications and manufacturer data, but CORE should not copy restricted copyrighted content without permission. Store bibliographic/requirement references and authorized extracts only as allowed.

## Related

[[FDG CORE]] · [[FDG Engineering Intelligence System]] · [[CORE-0003 - Evidence Provenance and Engineering State]]
