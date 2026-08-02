/* ============================================================================
   FWIS — sample intake adapter
   ----------------------------------------------------------------------------
   A working adapter with no provider behind it. It exists for the same reason
   sync/fake-backend.js does: the engine deserves to be tested against something
   that behaves like a source, before any credential exists.

   It is also the reference implementation. An Outlook adapter is this file with
   a Graph call where the array is, and the same three members.
   ============================================================================ */

const MESSAGES = [
  {
    externalId: "sample-0001",
    receivedAt: "2026-08-02T06:12:00.000Z",
    from: "duty.tech@example.com",
    subject: "CHW Pump 03 tripped overnight",
    body: "Chilled water pump 3 stopped around 02:40. Standby pump carrying load. Needs inspection this morning.",
    threadId: "t-1001"
  },
  {
    externalId: "sample-0002",
    receivedAt: "2026-08-02T07:05:00.000Z",
    from: "front.office@example.com",
    subject: "Water leak reported room 812",
    body: "Guest reports water leaking from ceiling. URGENT - flooding the corridor carpet.",
    threadId: "t-1002"
  },
  {
    externalId: "sample-0003",
    receivedAt: "2026-08-02T08:20:00.000Z",
    from: "security@example.com",
    subject: "Sprinkler panel fault indication",
    body: "Fire sprinkler panel showing fault on zone 4. Please attend immediately.",
    threadId: "t-1003"
  },
  {
    externalId: "sample-0004",
    receivedAt: "2026-08-02T09:00:00.000Z",
    from: "admin@example.com",
    subject: "Staff canteen menu this week",
    body: "Please find attached the menu for this week.",
    threadId: "t-1004"
  }
];

export function sampleSource(messages = MESSAGES) {
  return {
    id: "sample",

    async available() { return true; },

    /** Cursor is an index into the list — the simplest thing that still models
     *  "give me what I have not seen", which is what a real cursor does. */
    async fetchSince(cursor = 0) {
      const start = Number(cursor) || 0;
      return { messages: messages.slice(start), cursor: messages.length };
    }
  };
}

/** An adapter that reports itself unavailable, so the engine's handling of a
 *  source that cannot run right now is testable rather than assumed. */
export function unavailableSource(id = "sample") {
  return {
    id,
    async available() { return false; },
    async fetchSince() { throw new Error("should not be polled when unavailable"); }
  };
}
