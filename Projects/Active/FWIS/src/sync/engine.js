/* ============================================================================
   FWIS — Sync engine
   ----------------------------------------------------------------------------
   Pull-then-push against a transport (the Supabase client in production, an
   in-memory fake in tests). Offline-first: the local store is always the thing
   the UI reads, and sync reconciles it in the background.

   Conflict policy — derived from FWIS-SPEC-0003 Business Rules, not invented:

     "Historical records shall never be modified after acceptance. Corrections
      shall be recorded as amendments with audit history."

   So:
   - A remote record in Accepted or Closed state always wins. A local edit
     against it cannot be applied; it is preserved as a conflict payload and the
     user is told to file an amendment.
   - Otherwise a genuine divergence (both sides advanced) is NOT resolved
     silently. The server copy becomes the record and the local copy is kept
     alongside it, because priority 3 (data integrity & auditability) outranks
     priority 5 (simplicity): losing an engineer's shift notes to a
     last-writer-wins race is worse than asking someone to reconcile.
   - A clean case — only one side advanced — applies without ceremony.
   ============================================================================ */

import * as db from "../db.js";

const CURSOR_KEY = "fwis-sync-cursor";

export const SYNC_STATE = {
  LOCAL: "local",       // has unpushed changes
  SYNCED: "synced",     // matches the server
  CONFLICT: "conflict"  // diverged; needs a human
};

/* -------------------------------------------------------------- row mapping */

/** Client envelope (camelCase) → database row (snake_case). */
export function toRow(rec) {
  return {
    id: rec.id,
    type: rec.type,
    property_id: rec.propertyId,
    status: rec.status,
    data: rec.data,
    created_at: rec.createdAt,
    updated_at: rec.updatedAt,
    created_by: rec.createdBy,
    updated_by: rec.updatedBy,
    revision: rec.revision,
    deleted_at: rec.deletedAt
  };
}

/** Database row → client envelope. */
export function fromRow(row) {
  return {
    id: row.id,
    type: row.type,
    propertyId: row.property_id,
    status: row.status,
    data: row.data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    revision: row.revision,
    deletedAt: row.deleted_at,
    serverSeq: row.server_seq,
    syncState: SYNC_STATE.SYNCED
  };
}

/* ------------------------------------------------------------------ cursor */

export function readCursor() { return Number(localStorage.getItem(CURSOR_KEY) || 0); }
export function writeCursor(seq) { localStorage.setItem(CURSOR_KEY, String(seq)); }
export function resetCursor() { localStorage.removeItem(CURSOR_KEY); }

/* ------------------------------------------------------- conflict decisions */

const IMMUTABLE_STATES = new Set(["Accepted", "Closed"]);

/**
 * Decides what to do with an incoming server record against the local copy.
 * Pure — no I/O — so the policy is testable on its own.
 *
 * @returns {"insert"|"accept-remote"|"keep-local"|"conflict-immutable"|"conflict-diverged"}
 */
export function decideMerge(local, remote) {
  if (!local) return "insert";

  // No local changes pending: the server is authoritative.
  if (local.syncState !== SYNC_STATE.LOCAL) return "accept-remote";

  // Local has unpushed edits. Did the server move too?
  if (remote.revision < local.revision) return "keep-local";

  if (IMMUTABLE_STATES.has(remote.status)) return "conflict-immutable";

  return "conflict-diverged";
}

function conflictRecord(local, remote, kind) {
  return {
    ...fromRow(toRow(remote)),
    serverSeq: remote.server_seq ?? remote.serverSeq,
    syncState: SYNC_STATE.CONFLICT,
    conflict: {
      kind,
      at: new Date().toISOString(),
      serverRevision: remote.revision,
      localRevision: local.revision,
      localData: local.data,      // never discarded
      localUpdatedAt: local.updatedAt
    }
  };
}

/* ================================================================== engine */

export class SyncEngine {
  /**
   * @param transport { pull(cursor, limit), push(row), userId }
   */
  constructor(transport, { onChange = () => {}, pageSize = 200 } = {}) {
    this.transport = transport;
    this.onChange = onChange;
    this.pageSize = pageSize;
    this.running = false;
    this.lastError = null;
    this.lastSyncAt = null;
  }

  async sync() {
    if (this.running) return { skipped: true };
    this.running = true;
    this.lastError = null;
    this.onChange({ phase: "syncing" });

    const stats = { pulled: 0, pushed: 0, conflicts: 0, errors: 0 };
    try {
      await this.#pull(stats);
      await this.#push(stats);
      this.lastSyncAt = new Date().toISOString();
      this.onChange({ phase: "idle", stats });
    } catch (err) {
      this.lastError = err;
      stats.errors++;
      this.onChange({ phase: "error", error: err, stats });
    } finally {
      this.running = false;
    }
    return stats;
  }

  /* ------------------------------------------------------------------ pull */

  async #pull(stats) {
    let cursor = readCursor();

    for (;;) {
      const rows = await this.transport.pull(cursor, this.pageSize);
      if (!rows.length) break;

      for (const row of rows) {
        const local = await db.getRaw(row.id);
        const action = decideMerge(local, row);

        switch (action) {
          case "insert":
          case "accept-remote":
            await db.put(fromRow(row));
            stats.pulled++;
            break;

          case "keep-local":
            // Local is ahead; the push phase will send it.
            break;

          case "conflict-immutable":
          case "conflict-diverged":
            await db.put(conflictRecord(local, row, action));
            stats.conflicts++;
            break;
        }
        cursor = Math.max(cursor, row.server_seq);
      }

      writeCursor(cursor);
      if (rows.length < this.pageSize) break;
    }
  }

  /* ------------------------------------------------------------------ push */

  async #push(stats) {
    const dirty = (await db.allRaw()).filter((r) => r.syncState === SYNC_STATE.LOCAL);

    for (const rec of dirty) {
      try {
        const stored = await this.transport.push(toRow(rec));
        await db.put({ ...fromRow(stored), syncState: SYNC_STATE.SYNCED });
        if (stored.server_seq) writeCursor(Math.max(readCursor(), stored.server_seq));
        stats.pushed++;
      } catch (err) {
        // RLS refused the write outright — the caller is not (or is no longer)
        // a member of the record's property. Permanent: pulling the remote
        // copy would fail too, and retrying every 60s forever helps nobody.
        // Park it honestly instead of calling it an immutability conflict,
        // which is what a shared 42501 used to make this look like.
        if (err.isForbidden) {
          await db.put({ ...rec, syncState: SYNC_STATE.CONFLICT,
            conflict: { kind: "forbidden", at: new Date().toISOString(), message: err.message } });
          stats.conflicts++;
          continue;
        }
        // The database rejected the write. Both cases mean the server holds a
        // version this client never saw, so pull it and record a conflict
        // rather than retrying into the same wall.
        if (err.isStaleRevision || err.isImmutable) {
          const [remote] = await this.transport.pull(rec.serverSeq ? rec.serverSeq - 1 : 0, 1)
            .then((rows) => rows.filter((r) => r.id === rec.id));
          if (remote) {
            await db.put(conflictRecord(rec, remote,
              err.isImmutable ? "conflict-immutable" : "conflict-diverged"));
            stats.conflicts++;
          } else {
            await db.put({ ...rec, syncState: SYNC_STATE.CONFLICT,
              conflict: { kind: "rejected", at: new Date().toISOString(), message: err.message } });
            stats.conflicts++;
          }
        } else {
          throw err;   // network or auth: abort the cycle, keep the record dirty
        }
      }
    }
  }
}

/* -------------------------------------------------------------- scheduling */

/** Syncs on start, on reconnect, and on an interval. Deliberately not realtime:
 *  a shift turnover is not a collaborative document, and polling keeps the
 *  client dependency-free. */
export function startAutoSync(engine, { intervalMs = 60_000 } = {}) {
  let timer = null;
  const tick = () => { if (navigator.onLine) engine.sync(); };

  tick();
  timer = setInterval(tick, intervalMs);
  addEventListener("online", tick);

  return () => { clearInterval(timer); removeEventListener("online", tick); };
}
