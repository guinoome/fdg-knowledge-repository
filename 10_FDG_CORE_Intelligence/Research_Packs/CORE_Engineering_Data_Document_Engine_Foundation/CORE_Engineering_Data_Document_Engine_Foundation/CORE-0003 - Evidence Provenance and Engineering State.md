# CORE-0003 — Evidence, Provenance and Engineering State

## CORE provenance

Every material engineering claim should be traceable through:

**Context → Origin → Reasoning → Evidence**

Where applicable, evidence should be classifiable against the FDG Evidence Ladder.

## Evidence chain

For verification workflows:

**Requirement → Method → Instrument → Measurement → Acceptance Criterion → Result → Evidence → Finding/Deficiency → Corrective Action → Retest → Witness → Acceptance**

A PASS/FAIL checkbox without this chain is insufficient for high-integrity commissioning.

## Evidence preservation

Original evidence should be preserved. Derived artifacts such as annotations, crops, OCR text or compressed images must link back to the original.

Recommended metadata:

- evidence ID;
- content hash/checksum;
- origin/source;
- capture/import timestamp;
- actor/device/system;
- file MIME/type;
- project/asset/system links;
- original filename;
- transformation lineage;
- confidentiality/data classification.

## Engineering state machine

A generic baseline:

```text
Draft/Captured
→ Validated
→ Reviewed
→ Approved
→ Issued
→ Superseded / Closed / Withdrawn
```

Modules may extend this through controlled state-machine contracts.

A technician-entered value is not automatically an approved engineering fact. A machine-generated finding is not automatically an accepted engineering conclusion.

## Actor provenance

Material actions must distinguish:

- Human
- Sensor / IoT
- Imported dataset
- Deterministic calculation
- Rule engine
- External system
- AI / Agent

Generated content must retain its generation method, inputs/references where feasible, model/tool identity when material, and review/approval state.

## No silent AI authority

AI may assist extraction, classification, comparison, drafting, anomaly detection and recommendation. It must not silently promote hypotheses or generated values into approved engineering facts.

## Related

[[FDG CORE]] · [[CORE-0009 - Methodology Validation and Computation Registry]] · [[FDG Audit Intelligence System]]
