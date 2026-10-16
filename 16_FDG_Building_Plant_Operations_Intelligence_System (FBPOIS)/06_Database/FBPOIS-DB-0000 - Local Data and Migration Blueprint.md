# FBPOIS-DB-0000 — Local Data and Migration Blueprint
**Status:** Proposed, implementation-contract baseline pending source data profiling

## Deployment topology
**Phase L1 (single device):** FMIS desktop application → application service/domain rules → local SQLite database (WAL mode; one host owns writes) → local attachment store. All business operations must work disconnected. Never put SQLite on an unreliable shared network drive or imply it is a multiuser server.
**Phase L2 (LAN):** trusted local application clients → authenticated local service → server-managed PostgreSQL or equivalent → local attachment service. LAN access is not cloud deployment.
**Phase L3:** FBPOIS federated integration via governed contracts; separate FWIS/FMIS ownership; synchronization only after local integrity is proven.

## Canonical entities and ownership
| Entity | Authority |
|---|---|
| organization, property, building, floor, area, room, person/role | Shared Data Platform |
| plant, asset, equipment, component, condition, PM plan, PM run, work order, failure, spares, contractor maintenance event | FMIS |
| shift, concern, incident, operational log, room OOO/OOS, communication, utility operational reading | FWIS |
| cross-domain reference, sync event, audit event | Shared contracts with source-owner attribution |

Use stable UUID/ULID primary keys; human-facing WO/PM numbers are separate unique scoped references. Every operational row has owner scope, created_at, updated_at, created_by, revision, origin/source, and lifecycle status where applicable. Foreign keys and uniqueness must be enforced. Maintain event history for state transitions and approvals.

## Required tables / contracts
`organizations, properties, buildings, locations, users, roles, role_assignments, plants, assets, equipment, equipment_status_events, pm_plans, pm_runs, work_orders, work_order_events, failure_events, parts, stock_movements, reservations, suppliers, contractors, procurement_links, attachments, audit_events, import_batches, external_id_mappings`.
Each has a documented schema, constraints, indexes, owner, privacy class and test cases before the corresponding vertical slice is authorized.

## Evidence and integrity
Store attachments in a controlled directory, indexed by immutable attachment ID, checksum (SHA-256), owner record, capture metadata, content type, uploader and time. Use atomic file writes and orphan reconciliation. Never embed external API credentials in imported records. Status history is append-only; corrections use auditable amendment events.

## AppSheet migration
1. Export source data and attachments; preserve originals read-only with checksum and timestamp.
2. Inventory tables, columns, AppSheet expressions, references, enumerations, actions, bots, formulas, users, roles and source sheets.
3. Map each source field to canonical target, conversion rule, null policy, external ID, owner and validation.
4. Dry-run import into disposable local DB; detect duplicates, broken references, date/time zone ambiguities, invalid values and missing evidence.
5. Reconcile source/target counts by table and sampled asset/WO/PM histories.
6. Obtain human sign-off; cutover only after backup and rollback drill.
7. Maintain read-only AppSheet fallback until accepted cutover.

## Backup and restore acceptance
Local scheduled consistent database snapshot plus attachment manifest, checksum verification, offline second copy, restore to clean installation, sampled record/attachment verification, documented recovery point and recovery time measured rather than promised. Encrypt sensitive backups and separate keys from backups. Test simulated corruption and disk-full behavior.

## Security
Parameterized queries, password hashes via maintained password hashing library (Argon2id preferred), scoped authorization in service layer, least-privilege filesystem permissions, audit events, secret-free exports by default. Local-first does not mean security-free.

## Contract tests
- DB restart preserves all committed records.
- Foreign key violations are rejected.
- Unauthorized cross-property access is denied.
- Work-order closure requires prescribed evidence/verification.
- Status transition history remains reconstructible.
- Import replay is idempotent.
- Restore reproduces DB rows and attachment checksums.
- No external network is required for baseline workflows.
