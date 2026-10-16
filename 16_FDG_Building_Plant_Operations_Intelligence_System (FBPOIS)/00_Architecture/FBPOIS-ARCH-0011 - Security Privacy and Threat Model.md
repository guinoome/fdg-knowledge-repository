# FBPOIS-ARCH-0011 — Security, Privacy and Threat Model
**Status:** Build security baseline; FPJIS review required before G5
**Threat surfaces:** shared Windows workstations, local DB/files, lost removable backups, privileged administrator, malicious attachments, imported AppSheet spreadsheets, future LAN clients, cross-domain data leakage, compromised user account.
## Assets and threats
| Asset | Threat | Control | Evidence |
|---|---|---|---|
| User credentials | password theft/guessing | Argon2id or equivalent maintained hash, lockout/rate limit, no plaintext | SEC-001 credential inspection |
| Maintenance/operations records | unauthorized reads/edits | deny-by-default service RBAC and scope filtering | SEC-002 role matrix |
| Cross-role dashboards | counts reveal hidden data | authorize aggregations, search, exports and cache | SEC-003 scoped dashboard test |
| Local SQLite | theft/tampering | OS account isolation, encrypted device/storage as appropriate, integrity check | SEC-004 physical threat review |
| Attachments | malware/path traversal | content limits, canonical paths, checksum, safe open/export | SEC-005 hostile filename tests |
| Imports | formula injection/duplicate IDs | validate schemas, escape CSV/Excel formula cells, idempotent import | SEC-006 malicious import |
| Backup | loss/leakage | consistent snapshot, encrypted second copy, restore drill, separate keys | SEC-007 restore evidence |
| Approvals | self-approval/falsification | separation of duties, immutable event log, reason and evidence | SEC-008 negative workflow |
| Future LAN | eavesdropping/replay | authenticated transport, TLS and replay/idempotency controls | SEC-009 future gate |
| Privacy | unnecessary exposure/retention | minimization, purpose, retention, scoped export and audit | SEC-010 privacy review |

## Trust boundaries
Local user ↔ UI ↔ application service ↔ owned domain repository ↔ local DB/attachments; import file and external connectors are untrusted inputs. Future LAN and cloud integrations are separate authorization gates.

## Governance
Admin privileges do not automatically confer engineering record visibility. Record actor, context, origin, reasoning, evidence, authorization and timestamps. Define retention, breach response, user deactivation, device loss and data subject handling before production rollout. Never represent draft threat controls as implemented.
