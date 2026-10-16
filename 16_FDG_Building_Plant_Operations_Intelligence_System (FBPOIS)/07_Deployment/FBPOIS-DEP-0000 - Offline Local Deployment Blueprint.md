# FBPOIS-DEP-0000 — Offline Local Deployment Blueprint
**Status:** Proposed baseline; deploy only after slice-level FPJIS authorization.

## Product boundary
FMIS and FWIS install/run independently. Their future combined management dashboard must be a separate authorized view, not a merged operational database. Initial priority: FMIS replaces AppSheet maintenance workflows locally; FWIS can be completed independently.

## L1 packaging
- Desktop-first offline FMIS, installable on Windows with bundled runtime and all required local dependencies. A Python/Tkinter/SQLite prototype already exists; review and reuse only verified components.
- Application data under OS-appropriate user/application data path, not bundled executable folder.
- First-run local admin setup with credential hashing, scope assignment and secure default settings.
- Startup integrity checks and migration version check; refuse unsafe schema downgrades.
- Visible backup status, restore wizard, storage capacity alerts and diagnostic export.
- No required telemetry, internet login, hosted license check or network call.
- PDF/Excel export operates offline; clearly separate generated reports from authoritative records.
- Installer/update preserves DB and attachments; signed packages where feasible.

## Later local-network mode
When concurrent users are required, introduce authenticated LAN service and server-owned database; do not synchronize multiple independent SQLite files via folder copy. Specify conflict handling and permission checks before enabling multi-device sync. Android/PWA can follow once the local service and offline capture rules are validated.

## Core operational tests
1. Fresh install on disconnected clean Windows machine.
2. First-run admin setup, role login and locked-account handling.
3. Create asset → work order → assign → execute → verify → close → dashboard/report.
4. PM due → execute → finding → corrective WO.
5. Shutdown/restart mid-work; no committed data loss.
6. Backup/restore on a second machine without internet.
7. Import dry-run/reconciliation from real AppSheet exports.
8. Deny unauthorized role and property access.
9. Export reports and verify numbers against DB.
10. Upgrade application/schema with rollback and data preservation.

## Future FBPOIS integration
Local-first → LAN-enabled → optional external publishing. Remote sync, cloud connectors, Viber/Messenger/Teams/email and centralized identity remain explicitly deferred and never block local core functions.

## Release authority
Every slice requires FPJIS G5/G6 authorization and recorded G7 local validation before being called ready for operations. Production replacement of AppSheet additionally requires supervised parallel-run and signed cutover.
