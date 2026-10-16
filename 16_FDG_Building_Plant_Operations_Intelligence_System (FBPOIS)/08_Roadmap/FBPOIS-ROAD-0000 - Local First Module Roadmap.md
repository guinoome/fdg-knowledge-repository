# FBPOIS-ROAD-0000 — Local-First Module Roadmap
**Status:** Proposed roadmap; not evidence of implementation completion.

## Four separate measures
For each slice record **Blueprint readiness**, **Implementation completion**, **Validation completion**, **Operational maturity** independently; no invented percentages. FPJIS G0–G10 gates apply per bounded work package.

| Sequence | Deliverable | Acceptance outcome |
|---|---|---|
| R0 | Architecture reconciliation + folder path migration | All approved folder names and wikilinks resolve; old content preserved; no ownership conflicts |
| R1 | Local FMIS asset/plant registry + condition history | Create/search/update equipment, immutable status timeline, restart persistence |
| R2 | Local FMIS work-order lifecycle | Request, priority, assign, execute, evidence, verify, close, dashboard updates |
| R3 | Local FMIS preventive maintenance | Schedule, complete, findings → linked WO, overdue metrics |
| R4 | Local FMIS migration + backups | AppSheet dry-run reconciliation; offline restore tested |
| R5 | Local FMIS resources, spares, contractors, procurement linkage | Traceable reservations/issues and delay ownership |
| R6 | Local FMIS management dashboard + reports | Engineering Manager and Chief Engineer see accurate scope-limited maintenance data |
| R7 | FWIS local operational slices | Concerns, logs, shift turnover, room status, utilities with independent ownership |
| R8 | Shared identity + management view | Authorized FWIS + FMIS aggregate, Chief Engineer executive view |
| R9 | Optional LAN/multi-device and external integrations | Only after offline acceptance and conflict model validated |

## Session closure rule
One coding session targets a fully testable user outcome, not a half-built system. Each work package carries requirements, schema, permissions, UI states, errors, tests, evidence, documentation updates and acceptance record.

## Risks / blockers
AppSheet exports and mapping; local multiuser concurrency decision; security/privacy threat model; existing code test results; missing 06/07/08 legacy specifications; historical 04A and patch folder reconciliation.

## Next immediate slice
FMIS local equipment status and work-order workflow; inspect existing prototype and tests, execute on clean machine, then close actual gaps instead of rewriting from scratch.
