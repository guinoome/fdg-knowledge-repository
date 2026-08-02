/* ============================================================================
   FWIS — session bridge
   ----------------------------------------------------------------------------
   For sources with no readable API. The user is already signed in to Viber or
   Messenger in a browser; a bridge running where that session lives reads what
   is on screen and posts it here. FWIS receives, deduplicates, classifies and
   stores it exactly like anything else.

   This file is the RECEIVING half, and it is the half that can be built today.

   ---------------------------------------------------------------------------
   Why the sender cannot live in this app
   ---------------------------------------------------------------------------
   A web page cannot read another origin's tab. The Same-Origin Policy is the
   browser's central security guarantee — if a page could read your open mail
   tab, so could every page. There is no permission, flag or clever framing
   that lifts it for a normal web app, and anything claiming otherwise is
   describing a browser vulnerability.

   So the sender must run somewhere that legitimately has access:

     browser extension   granted host permissions for specific origins by the
                         user at install. The sanctioned mechanism, and the
                         only one that works alongside the PWA.

     desktop shell       the messaging site loaded in a webview the app itself
                         owns, so reading it is reading your own document.

     local automation    a scripted browser profile on the user's machine.

   All three are a SECOND delivery surface. FWIS is currently one PWA, and
   CLAUDE.md records "one codebase covering all three surfaces" as a resolved
   Founder decision — so choosing a bridge host amends that decision and is
   not a call this file makes. It is logged in CLAUDE.md as open.

   ---------------------------------------------------------------------------
   What is built here
   ---------------------------------------------------------------------------
   The contract and the receiver, so that when a bridge host is chosen, the
   sender writes to a documented target instead of the app being redesigned
   around whatever it turns out to send.

   Wire format, posted via window.postMessage or handed to receive() directly:

     { fwisBridge: 1, sourceId, messages: [RawMessage], batchId }

   The receiver buffers batches; a bridge adapter drains the buffer on the next
   engine run. That indirection is deliberate — pushed delivery and polled
   delivery converge before the engine sees either, so the engine keeps one
   code path and dedupe still applies to both.
   ============================================================================ */

import { CONFIG } from "../config.js";
import { normalise, sourceConfig, CAPABILITY } from "./adapter.js";

export const PROTOCOL = 1;

/** Buffered batches per source, drained by the adapter below. */
const buffers = new Map();
let connectedAt = null;
let rejected = [];

/* --------------------------------------------------------------- receive -- */

/** Accepts a batch from a bridge host. Returns a result rather than throwing:
 *  the sender is out-of-process and cannot handle an exception, but it can log
 *  a rejection reason. */
export function receive(payload, { origin = null } = {}) {
  if (!CONFIG.intake.bridge.enabled) return reject("bridge is disabled");
  if (!payload || payload.fwisBridge !== PROTOCOL) return reject("not a bridge payload");

  if (origin !== null && !CONFIG.intake.bridge.allowedOrigins.includes(origin)) {
    // An unrecognised origin is the case worth being strict about: accepting
    // messages from any page would let a hostile tab inject fabricated
    // operational records into the engineering log.
    return reject(`origin not allowed: ${origin}`);
  }

  const source = sourceConfig(payload.sourceId);
  if (!source) return reject(`unknown source: ${payload.sourceId}`);
  if (source.capability !== CAPABILITY.SESSION_BRIDGE) {
    return reject(`${source.name} is not a bridge source`);
  }

  const incoming = Array.isArray(payload.messages) ? payload.messages : [];
  const clean = incoming.map((m) => normalise(m, payload.sourceId)).filter(Boolean);

  const buf = buffers.get(payload.sourceId) || [];
  buf.push(...clean);
  buffers.set(payload.sourceId, buf);
  connectedAt = new Date().toISOString();

  return { accepted: clean.length, discarded: incoming.length - clean.length, error: null };
}

function reject(error) {
  rejected.push({ at: new Date().toISOString(), error });
  return { accepted: 0, discarded: 0, error };
}

/* --------------------------------------------------------------- adapter -- */

/** Adapter over the buffer. Same three members as any other adapter, so the
 *  engine cannot tell a bridged source from an API one. */
export function bridgeSource(id) {
  return {
    id,

    /** A bridge that has never checked in is not available. This is what makes
     *  "Viber is configured but the bridge is not running" visible instead of
     *  looking like a source with nothing to say. */
    async available() {
      return CONFIG.intake.bridge.enabled && connectedAt !== null;
    },

    /** Drains rather than pages. The buffer is already only what the host has
     *  sent since last time, so the cursor is vestigial — kept to satisfy the
     *  contract, and because a future host may want to resume. */
    async fetchSince(cursor = 0) {
      const buf = buffers.get(id) || [];
      buffers.set(id, []);
      return { messages: buf, cursor: (Number(cursor) || 0) + buf.length };
    }
  };
}

/* ---------------------------------------------------------------- wiring -- */

/** Listens for bridge batches posted into the page. Returns a teardown. */
export function listen(target = globalThis) {
  const handler = (event) => {
    if (!event?.data || event.data.fwisBridge !== PROTOCOL) return;
    receive(event.data, { origin: event.origin });
  };
  target.addEventListener?.("message", handler);
  return () => target.removeEventListener?.("message", handler);
}

export function bridgeStatus() {
  return {
    enabled: CONFIG.intake.bridge.enabled,
    connectedAt,
    buffered: [...buffers.entries()].map(([id, b]) => ({ id, count: b.length })),
    rejected: rejected.slice(-10)
  };
}

export function resetBridge() {
  buffers.clear();
  connectedAt = null;
  rejected = [];
}
