/* ============================================================================
   FWIS — intake engine
   ----------------------------------------------------------------------------
   Polls every registered adapter, classifies what comes back, and stores it as
   an ordinary FWIS record. The engine is provider-agnostic by construction: it
   only ever sees the RawMessage shape defined in adapter.js.

   Intake items are records like any other — same envelope, same IndexedDB, and
   therefore the same sync, tombstones and conflict handling for free. That is
   the payoff of Stage 1a landing before Stage 1b.

   What this deliberately does NOT do: create incidents or turnovers. Intake
   proposes; a human disposes. FWIS_VISION's pipeline puts Classification
   before Workflow Assignment, and an intake engine that silently opened work
   orders from misread email would be worse than the inbox it replaced.
   ============================================================================ */

import { CONFIG } from "../config.js";
import * as db from "../db.js";
import { classify, toIntakeData } from "./classify.js";
import { normalise, pollableSources, validateAdapter } from "./adapter.js";

export const TYPE = "intake-item";
export const STATUS = { NEW: "New", CLASSIFIED: "Classified", LINKED: "Linked", DISMISSED: "Dismissed" };

const CURSOR_KEY = "fwis.intake.cursors";

export class IntakeEngine {
  constructor({ propertyId, userId, onChange } = {}) {
    this.adapters = new Map();
    this.propertyId = propertyId;
    this.userId = userId;
    this.onChange = onChange || (() => {});
    this.lastError = null;
    this.lastRunAt = null;
  }

  /** Registers an adapter. Rejects a malformed one loudly: a source that fails
   *  to register is recoverable, one that registers and silently never yields
   *  is not. */
  register(adapter) {
    const problems = validateAdapter(adapter);
    if (problems.length) throw new Error(`intake adapter rejected: ${problems.join("; ")}`);
    this.adapters.set(adapter.id, adapter);
    return this;
  }

  /** One pass over every pollable, registered, available source. Returns a
   *  summary rather than throwing, because one broken provider must not stop
   *  the others — a failing Gmail token should never cost you Outlook. */
  async run() {
    const stats = { polled: 0, fetched: 0, created: 0, duplicates: 0, skipped: [], errors: [] };

    for (const source of pollableSources()) {
      const adapter = this.adapters.get(source.id);
      if (!adapter) { stats.skipped.push({ id: source.id, reason: "no adapter registered" }); continue; }

      try {
        if (!(await adapter.available())) {
          stats.skipped.push({ id: source.id, reason: "adapter unavailable" });
          continue;
        }
        stats.polled++;

        const cursors = readCursors();
        const { messages = [], cursor } = await adapter.fetchSince(cursors[source.id] ?? 0);
        stats.fetched += messages.length;

        for (const raw of messages) {
          const msg = normalise(raw, source.id);
          if (!msg) { stats.skipped.push({ id: source.id, reason: "unusable message" }); continue; }

          if (await this.#seen(msg)) { stats.duplicates++; continue; }

          await db.save(db.createRecord({
            type: TYPE,
            propertyId: this.propertyId,
            status: STATUS.NEW,
            data: toIntakeData(msg, classify(msg)),
            userId: this.userId
          }), this.userId);
          stats.created++;
        }

        // Cursor advances only after the batch is stored. Crashing mid-batch
        // re-fetches, and the dedupe below makes that harmless — the opposite
        // order would drop messages permanently.
        writeCursor(source.id, cursor);
      } catch (err) {
        stats.errors.push({ id: source.id, message: err.message || String(err) });
      }
    }

    this.lastRunAt = new Date().toISOString();
    this.lastError = stats.errors.length ? stats.errors[0].message : null;
    this.onChange(stats);
    return stats;
  }

  /** Identity of an ingested message is (source, external id). Checking the
   *  database rather than a local set means a device that syncs someone else's
   *  ingest does not re-create it. */
  async #seen(msg) {
    const existing = await db.all({ type: TYPE, propertyId: this.propertyId, includeDeleted: true });
    return existing.some((r) =>
      r.data?.source?.sourceId === msg.sourceId &&
      r.data?.source?.externalId === msg.externalId);
  }
}

/* ---------------------------------------------------------------- cursors -- */

export function readCursors() {
  try { return JSON.parse(localStorage.getItem(CURSOR_KEY) || "{}"); }
  catch { return {}; }
}

export function writeCursor(sourceId, cursor) {
  const all = readCursors();
  all[sourceId] = cursor;
  localStorage.setItem(CURSOR_KEY, JSON.stringify(all));
}

export function resetCursors() { localStorage.removeItem(CURSOR_KEY); }

/* ------------------------------------------------------------ disposition -- */

/** Marks an item handled. Dismissal and linking are the two ways an item
 *  leaves the queue; both are recorded rather than deleting the item, because
 *  "we saw this and decided it was nothing" is itself operational history. */
export async function dispose(id, status, userId, { linkedRecordId = null, note = "" } = {}) {
  const rec = await db.get(id);
  if (!rec) return null;
  const next = {
    ...rec,
    status,
    data: { ...rec.data, linkedRecordId, disposition: { at: new Date().toISOString(), by: userId, note } }
  };
  return db.save(next, userId);
}

/** Items still needing a human. Ordered newest first — an intake queue is read
 *  from the top, unlike the record list. */
export async function queue(propertyId) {
  const open = CONFIG.enums.intakeStatus.filter((s) => s.open).map((s) => s.value);
  const rows = await db.all({ type: TYPE, propertyId });
  return rows
    .filter((r) => open.includes(r.status))
    .sort((a, b) => String(b.data?.source?.receivedAt || "").localeCompare(String(a.data?.source?.receivedAt || "")));
}
