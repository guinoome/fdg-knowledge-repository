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

     "session-bridge" the platform has no API for reading an individual's
                      conversations, but the user can already see those
                      messages in a logged-in browser tab. A bridge running
                      where that tab lives reads what is on screen and posts it
                      to FWIS. Viber and Messenger are here: both are
                      business/bot platforms with no OAuth scope granting
                      "read my chats", so a session bridge is the only route
                      that does not require the other party to message a
                      channel you own.

     "inbound-only"   webhook-only. A message arrives solely because someone
                      sent it to a channel you own. Nothing to poll and nothing
                      to bridge; it either arrives or it does not.

   Both readable and session-bridge sources run through the same loop below and
   produce the same RawMessage. The engine cannot tell them apart, which is the
   point: how a message was obtained is a transport detail, not a data model.

   A source that cannot run states why. A source that is silently missing looks
   like a bug; one that explains itself is a decision.
   ============================================================================ */

import { CONFIG } from "../config.js";

export const CAPABILITY = {
  READABLE: "readable",
  SESSION_BRIDGE: "session-bridge",
  INBOUND_ONLY: "inbound-only"
};

/** Capabilities the engine can drive. Everything else arrives on its own. */
const ACTIVE = [CAPABILITY.READABLE, CAPABILITY.SESSION_BRIDGE];

/** Config entry for a source, or undefined. */
export function sourceConfig(id) {
  return CONFIG.intake.sources.find((s) => s.id === id);
}

/** Sources the engine will drive this run — enabled, and reachable either by
 *  provider API or by session bridge. One list, because the engine treats the
 *  two transports identically. */
export function pollableSources() {
  return CONFIG.intake.sources.filter((s) => s.enabled && ACTIVE.includes(s.capability));
}

/** Sources that need a bridge rather than an API. */
export function bridgeSources() {
  return CONFIG.intake.sources.filter((s) => s.capability === CAPABILITY.SESSION_BRIDGE);
}

/** Why a source cannot run, or "" when it can. Used by the UI so an
 *  unavailable source states its reason rather than just missing. */
export function unavailableReason(id) {
  const s = sourceConfig(id);
  if (!s) return "Unknown source";
  if (s.capability === CAPABILITY.INBOUND_ONLY) {
    return `${s.name} can only receive messages sent to a channel you own`;
  }
  if (s.capability === CAPABILITY.SESSION_BRIDGE && !CONFIG.intake.bridge.enabled) {
    return `${s.name} has no API for reading personal conversations; it needs the FWIS bridge running where you are signed in`;
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
