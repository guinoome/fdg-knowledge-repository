/* ============================================================================
   FWIS — intake adapter contract
   ----------------------------------------------------------------------------
   Every communication source reaches FWIS through the same shape. The engine
   never knows which provider it is talking to, so adding Gmail after Outlook
   is one adapter, not a second intake path.

   An adapter implements:

     id                 → matches a config.intake.sources entry
     available()        → can this run right now (credentials, consent, network)
     fetchSince(cursor) → { messages: [RawMessage], cursor }

   RawMessage is the whole vocabulary the engine understands:

     { sourceId, externalId, receivedAt, from, subject, body, threadId }

   `externalId` must be stable for the lifetime of the message on its provider.
   It is how the engine refuses to ingest the same thing twice, so an adapter
   that invents a fresh id per poll will duplicate every record it touches.

   ---------------------------------------------------------------------------
   Capability — why this file admits some sources cannot work
   ---------------------------------------------------------------------------
   The vision lists Outlook, Gmail, Teams, Viber, Messenger and more. They are
   not equivalent, and the difference is a platform constraint rather than a
   scoping choice:

     "readable"       the provider exposes an authorised API for reading the
                      signed-in user's own messages. Outlook and Teams via
                      Microsoft Graph, Gmail via the Google API. These can be
                      polled, and an adapter is the only work.

     "inbound-only"   the platform offers no way to read an individual's
                      conversations. Viber and Messenger are business/bot
                      platforms: a message reaches you only if a user sends it
                      to a channel you own, delivered by webhook. There is no
                      OAuth scope that grants "read my chats", so no amount of
                      adapter work produces one.

   Sources marked inbound-only are therefore not pollable. They are kept in
   config, and surfaced as unavailable with the reason, because a source that
   is silently missing looks like a bug while a source that explains itself is
   a decision. When a webhook receiver exists, those sources arrive through it
   and land in the same record shape.
   ============================================================================ */

import { CONFIG } from "../config.js";

export const CAPABILITY = {
  READABLE: "readable",
  INBOUND_ONLY: "inbound-only"
};

/** Config entry for a source, or undefined. */
export function sourceConfig(id) {
  return CONFIG.intake.sources.find((s) => s.id === id);
}

/** Sources an adapter could poll — enabled, and readable by the platform. */
export function pollableSources() {
  return CONFIG.intake.sources.filter(
    (s) => s.enabled && s.capability === CAPABILITY.READABLE
  );
}

/** Why a source cannot be polled, or "" when it can. Used by the UI so an
 *  unavailable source states its reason rather than just missing. */
export function unavailableReason(id) {
  const s = sourceConfig(id);
  if (!s) return "Unknown source";
  if (s.capability === CAPABILITY.INBOUND_ONLY) {
    return `${s.name} has no API for reading personal conversations; it can only receive messages sent to a channel you own`;
  }
  if (!s.enabled) return `${s.name} is not enabled`;
  return "";
}

/** Structural check for an adapter. Cheap, and it turns a misspelled method
 *  into a clear failure at registration instead of a confusing empty poll. */
export function validateAdapter(adapter) {
  const problems = [];
  if (!adapter || typeof adapter !== "object") return ["adapter is not an object"];
  if (!adapter.id) problems.push("missing id");
  if (!sourceConfig(adapter.id)) problems.push(`no config.intake.sources entry for "${adapter.id}"`);
  if (typeof adapter.available !== "function") problems.push("missing available()");
  if (typeof adapter.fetchSince !== "function") problems.push("missing fetchSince()");
  return problems;
}

/** Normalises whatever an adapter returned into the engine's vocabulary, so a
 *  sloppy adapter cannot put a half-shaped message into the database. Returns
 *  null when the message is unusable. */
export function normalise(raw, sourceId) {
  if (!raw) return null;
  const externalId = String(raw.externalId || "").trim();
  if (!externalId) return null;
  return {
    sourceId,
    externalId,
    receivedAt: raw.receivedAt || new Date().toISOString(),
    from: String(raw.from || "").trim(),
    subject: String(raw.subject || "").trim(),
    body: String(raw.body || "").trim(),
    threadId: raw.threadId ? String(raw.threadId) : null
  };
}
