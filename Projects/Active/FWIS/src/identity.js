/* ============================================================================
   FWIS — identity
   ----------------------------------------------------------------------------
   Who is acting, and in which property. The single place the rest of the app
   asks; no screen reads CONFIG.session directly any more.

   Two sources, one shape:

     signed in  →  user id from the authenticated session, properties and role
                   from property_members (FBPOIS-ROLE-0005). The database is
                   the authority; this module only reads what RLS already
                   permits and never decides membership itself.

     otherwise  →  CONFIG.session, exactly as Stage 0 behaved.

   The fallback is the point, not a shortcut. Sync is additive: with no
   credentials configured the app is Stage 0, and identity has to hold that
   contract or the local-only install loses its author.
   ============================================================================ */

import { CONFIG, propertyById, roleName } from "./config.js";
import { client, onSyncChange } from "./sync/index.js";

const PROPERTY_KEY = "fwis.property";

const listeners = new Set();
let memberships = null;   // null = not loaded; [] = loaded, belongs to nothing
let loadError = null;

/* ------------------------------------------------------------------ read -- */

/** The acting identity. Always returns a usable object — never null, because
 *  every screen needs an author and a property to render at all. */
export function current() {
  if (!authoritative()) {
    // The roster assigns a role even without an account, and role-gated UI has
    // to resolve to something in Stage 0 or every gate silently closes.
    const p = propertyById(CONFIG.session.propertyId);
    return {
      userId: CONFIG.session.userId,
      propertyId: CONFIG.session.propertyId,
      roleId: p?.roster?.find((r) => r.id === CONFIG.session.userId)?.roleId || null,
      email: null,
      source: "config"
    };
  }

  const active = activeMembership();
  return {
    userId: client.userId,
    propertyId: active?.property_id || null,
    roleId: active?.role_id || null,
    email: client.userEmail,
    source: "account"
  };
}

/** Properties this identity may act in.
 *
 *  Signed out, config is the authority and every configured property is
 *  available — Stage 0 has no membership concept, and an operator running
 *  several properties must still be able to switch between them.
 *
 *  Signed in, membership is the authority and this is exactly what RLS
 *  returned. Offering more would be offering rows the database will refuse. */
export function properties() {
  if (!authoritative()) {
    return CONFIG.properties.map((p) => ({ id: p.id, name: p.name, roleId: null }));
  }
  return (memberships || []).map((m) => ({
    id: m.property_id,
    name: propertyById(m.property_id)?.name || m.property_id,
    roleId: m.role_id
  }));
}

/** Display label for the acting user — email when authenticated, roster name
 *  when running on the configured session. */
export function displayName() {
  const id = current();
  if (id.source === "account") return id.email || id.userId;
  const p = propertyById(id.propertyId);
  return p?.roster?.find((r) => r.id === id.userId)?.name || id.userId;
}

/** Role label, or "" when unknown. Resolved through config so the role
 *  vocabulary stays in one place even though membership assigns it. */
export function roleLabel() {
  const { roleId } = current();
  return roleId ? roleName(roleId) : "";
}

/** Numeric seniority for role-gated UI, 0 when no role is known. Reads the
 *  ladder from config rather than ranking role ids in code. */
export function roleLevel() {
  const { roleId } = current();
  return CONFIG.roles.find((r) => r.id === roleId)?.level || 0;
}

/** True once a signed-in user is known to belong to nothing. RLS will show
 *  them an empty app, and that is correct rather than broken — the UI needs
 *  to say so instead of rendering an unexplained void. */
export function isOrphaned() {
  return authoritative() && (memberships || []).length === 0;
}

export function error() { return loadError; }

/* ----------------------------------------------------------------- write -- */

/** Switches the active property. Rejects anything not in the membership set,
 *  because the alternative is a UI that asks the database for rows it will
 *  refuse to return. */
export function setProperty(propertyId) {
  if (!properties().some((p) => p.id === propertyId)) return false;
  localStorage.setItem(PROPERTY_KEY, propertyId);
  emit();
  return true;
}

/** Loads memberships for the signed-in user. Safe to call when signed out or
 *  unconfigured, where it simply clears. */
export async function refresh() {
  loadError = null;
  if (!client.configured || !client.signedIn) {
    memberships = null;
    emit();
    return current();
  }
  try {
    memberships = await client.memberships();
  } catch (err) {
    // A membership read that fails must not strand the app signed-in with no
    // identity: fall back and surface it, rather than rendering nothing.
    memberships = [];
    loadError = err.message || String(err);
  }
  emit();
  return current();
}

export function onIdentityChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Wires identity to the sync lifecycle so sign-in and sign-out reload it
 *  without every caller having to remember. */
export function initIdentity() {
  onSyncChange(() => { refresh(); });
  return refresh();
}

/* --------------------------------------------------------------- private -- */

/** Membership is only authoritative once actually loaded. Between sign-in and
 *  the first read we stay on config rather than briefly claiming the user has
 *  no property, which would flash an empty app. */
function authoritative() {
  return client.configured && client.signedIn && memberships !== null;
}

function activeMembership() {
  const list = memberships || [];
  if (!list.length) return null;
  const saved = localStorage.getItem(PROPERTY_KEY);
  return list.find((m) => m.property_id === saved) || list[0];
}

function emit() {
  const id = current();
  listeners.forEach((fn) => { try { fn(id); } catch { /* listener's problem */ } });
}
