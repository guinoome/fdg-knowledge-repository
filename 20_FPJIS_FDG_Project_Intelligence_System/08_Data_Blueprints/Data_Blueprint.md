# Data Blueprint

Define:
- data entities
- ownership
- source
- lifecycle
- validation
- retention
- classification
- relationships
- required fields
- optional fields
- derived fields
- audit requirements
- import/export
- backup requirements
- deletion requirements

> **Knowledge path:** [[FDG Ecosystem|FDG Ecosystem]] → [[20_FPJIS_FDG_Project_Intelligence_System/README|README]] → this document

## Implementation-Grade Data Contract Extension — 2026-10-10

For each material entity define:

~~~text
stable ID policy
purpose
owner
source of truth
fields
types
units
nullability
defaults
enumerations
validation
invariants
relationships
uniqueness
derived fields/formulas
state
revision/version
actor/timestamps
classification
retention
deletion/archive
provenance
import/export
audit
offline behavior
~~~

Derived values must preserve their basis and missing-input behavior.

Implementation teams should not infer units, nullability, defaults, enum values, or source-of-truth ownership.

See:
[[20_FPJIS_FDG_Project_Intelligence_System/35_Core_Completion_and_Roadmap/07_Data_API_Event_and_Migration_Contract_Standard|Data, API, Event & Migration Contract Standard]].
