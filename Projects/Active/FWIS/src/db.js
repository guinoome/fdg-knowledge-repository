/* ============================================================================
   FWIS — Local persistence (IndexedDB)
   ----------------------------------------------------------------------------
   Stage 0 has no backend. Records live on the device.

   Per CLAUDE.md, Stage 0 must not paint Stage 1 into a corner: every record is
   written inside a sync-ready envelope — client-generated stable id, created/
   updated timestamps, last-writer identity, a monotonic revision, a soft-delete
   tombstone, and a syncState field. Nothing syncs yet; when it does, the schema
   does not have to change.

   The envelope is deliberately generic (`type` + `data`) so incidents, concerns
   and work orders land in the same store without a migration.
   ============================================================================ */

const DB_NAME = "fwis";
const DB_VERSION = 1;
const STORE = "records";

let _db = null;

function openDb() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("type", "type");
        store.createIndex("propertyId", "propertyId");
        store.createIndex("status", "status");
        store.createIndex("updatedAt", "updatedAt");
        store.createIndex("type_property", ["type", "propertyId"]);
        store.createIndex("syncState", "syncState");
      }
    };

    req.onsuccess = () => { _db = req.result; resolve(_db); };
    req.onerror = () => reject(req.error);
  });
}

function tx(mode, fn) {
  return openDb().then((db) => new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    let result;
    try { result = fn(store); } catch (err) { reject(err); return; }
    t.oncomplete = () => resolve(result && result.__value !== undefined ? result.__value : result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

function request(req) {
  const box = { __value: undefined };
  req.onsuccess = () => { box.__value = req.result; };
  return box;
}

/* ------------------------------------------------------------------ ids --- */

export function newId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  // Fallback for older engines — still stable and collision-resistant enough
  // for a single-device Stage 0.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function nowIso() { return new Date().toISOString(); }

/* -------------------------------------------------------------- envelope --- */

/** Wraps a record body in the sync-ready envelope. */
export function createRecord({ type, propertyId, status, data, userId }) {
  const ts = nowIso();
  return {
    id: newId(),
    type,
    propertyId,
    status,
    data,
    createdAt: ts,
    updatedAt: ts,
    createdBy: userId,
    updatedBy: userId,
    revision: 1,
    deletedAt: null,
    syncState: "local"
  };
}

/* ------------------------------------------------------------------- api --- */

export async function put(record) {
  return tx("readwrite", (store) => request(store.put(record)));
}

/** Writes an updated record, advancing the last-writer metadata. */
export async function save(record, userId) {
  const next = {
    ...record,
    updatedAt: nowIso(),
    updatedBy: userId,
    revision: (record.revision || 0) + 1,
    syncState: "local"
  };
  await put(next);
  return next;
}

export async function get(id) {
  const r = await tx("readonly", (store) => request(store.get(id)));
  return r && !r.deletedAt ? r : null;
}

export async function all({ type, propertyId, includeDeleted = false } = {}) {
  const rows = await tx("readonly", (store) => request(store.getAll()));
  return (rows || []).filter((r) => {
    if (!includeDeleted && r.deletedAt) return false;
    if (type && r.type !== type) return false;
    if (propertyId && r.propertyId !== propertyId) return false;
    return true;
  }).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Soft delete — leaves a tombstone so the deletion is itself syncable. */
export async function remove(id, userId) {
  const existing = await tx("readonly", (store) => request(store.get(id)));
  if (!existing) return null;
  return save({ ...existing, deletedAt: nowIso() }, userId);
}

export async function clearAll() {
  return tx("readwrite", (store) => request(store.clear()));
}

export async function count(filter) {
  return (await all(filter)).length;
}
