/* ============================================================================
   FWIS — sync wiring
   ----------------------------------------------------------------------------
   Owns the single SupabaseClient and SyncEngine for the app, and keeps the
   whole thing optional: with no credentials in config.js the app is exactly
   Stage 0 — local-only, fully functional, no sign-in, no sync chip.

   Sync is additive. It must never be the reason the app fails to start.
   ============================================================================ */

import { CONFIG } from "../config.js";
import { SupabaseClient } from "./client.js";
import { SyncEngine, startAutoSync, SYNC_STATE, resetCursor } from "./engine.js";
import * as db from "../db.js";

export const client = new SupabaseClient(CONFIG.supabase || {});

let engine = null;
let stopAuto = null;
const listeners = new Set();

export function isEnabled() { return client.configured; }
export function isSignedIn() { return client.configured && client.signedIn; }

export function onSyncChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(state) { listeners.forEach((fn) => { try { fn(state); } catch { /* listener's problem */ } }); }

export function status() {
  if (!client.configured) return { mode: "local-only" };
  if (!client.signedIn) return { mode: "signed-out" };
  return {
    mode: "sync",
    running: engine?.running || false,
    lastSyncAt: engine?.lastSyncAt || null,
    lastError: engine?.lastError || null
  };
}

export async function start() {
  if (!isSignedIn()) return null;
  engine = new SyncEngine(client, { onChange: (s) => emit({ ...status(), ...s }) });
  stopAuto = startAutoSync(engine);
  emit(status());
  return engine;
}

export function stop() {
  if (stopAuto) { stopAuto(); stopAuto = null; }
  engine = null;
}

/** Manual trigger, e.g. from a "Sync now" control. */
export async function syncNow() {
  if (!engine) return null;
  return engine.sync();
}

export async function signIn(email, password) {
  await client.signIn(email, password);
  await start();
  return syncNow();
}

export async function signOut() {
  stop();
  client.signOut();
  resetCursor();
  emit(status());
}

/** Records the user must reconcile by hand. */
export async function conflicts() {
  return (await db.allRaw()).filter((r) => r.syncState === SYNC_STATE.CONFLICT);
}

export { SYNC_STATE };
