/* ============================================================================
   FWIS — in-memory backend
   ----------------------------------------------------------------------------
   Implements the same transport contract as SupabaseClient, and reproduces the
   database-side rules from supabase/schema.sql:

   - server_seq assigned server-side from a monotonic counter
   - updated_at stamped server-side
   - guard_revision: an update must carry a strictly greater revision
   - guard_accepted_immutable: Accepted/Closed content cannot change

   It exists so the sync engine's conflict handling can be tested without a
   live Supabase. It is a stand-in for the wire contract, NOT proof that the
   SQL is correct — that still needs a real Postgres.
   ============================================================================ */

import { SupabaseError } from "./client.js";

export class FakeBackend {
  constructor({ userId = "user-1", rows = [] } = {}) {
    this.userId = userId;
    this.seq = 0;
    this.rows = new Map();
    rows.forEach((r) => this.#store(r));
  }

  #store(row) {
    const stored = { ...row, server_seq: ++this.seq, updated_at: new Date().toISOString() };
    this.rows.set(row.id, stored);
    return stored;
  }

  async pull(cursor = 0, limit = 200) {
    return [...this.rows.values()]
      .filter((r) => r.server_seq > cursor)
      .sort((a, b) => a.server_seq - b.server_seq)
      .slice(0, limit)
      .map((r) => ({ ...r }));
  }

  async push(row) {
    const existing = this.rows.get(row.id);

    if (existing) {
      // guard_accepted_immutable
      if (["Accepted", "Closed"].includes(existing.status) &&
          JSON.stringify(existing.data) !== JSON.stringify(row.data)) {
        throw new SupabaseError("record is accepted and immutable", { status: 400, code: "42501" });
      }
      // guard_revision
      if (row.revision <= existing.revision) {
        throw new SupabaseError(
          `stale revision: incoming ${row.revision} is not newer than stored ${existing.revision}`,
          { status: 409, code: "40001" });
      }
      // created_at / created_by are never rewritten
      return { ...this.#store({ ...row, created_at: existing.created_at, created_by: existing.created_by }) };
    }

    return { ...this.#store(row) };
  }

  /** Simulates another device writing directly to the server. */
  writeAsOtherDevice(row) {
    const existing = this.rows.get(row.id);
    return this.#store({
      ...row,
      revision: (existing?.revision || 0) + 1,
      updated_by: "user-2"
    });
  }
}
