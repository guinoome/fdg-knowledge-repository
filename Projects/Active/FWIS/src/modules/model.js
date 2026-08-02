/* ============================================================================
   FWIS — operational module model
   ----------------------------------------------------------------------------
   One model behind seven specifications. Incident Management, Concerns Tracker,
   OOO/OOS, Group Communications, Plant Operations, Utilities Monitoring and
   Daily Operations all describe the same skeleton: a numbered record, where it
   happened, a category, a priority, a description, a reporter, an owner, and a
   lifecycle whose every status change is audited.

   The differences between them are entirely data — which fields, which enums,
   which states — so they live in config.modules and this file renders any of
   them. Seven bespoke screens would have meant seven places to fix every bug.

   State transitions are constrained by `next` on each workflow state, because
   FBPOIS-WF-0000 specifies a state machine. A status reachable from anywhere
   is not a state machine, it is a dropdown.
   ============================================================================ */

import { CONFIG, propertyById, workflow, userName, nameIn } from "../config.js";
import * as db from "../db.js";

export function moduleById(id) { return CONFIG.modules[id]; }
export function moduleByType(type) {
  return Object.values(CONFIG.modules).find((m) => m.type === type);
}
export function moduleByRoute(route) {
  return Object.values(CONFIG.modules).find((m) => m.route === route);
}
export function allModules() { return Object.values(CONFIG.modules); }

/** Workflow definition for a module. */
export function flowOf(mod) { return workflow(mod.workflow); }

export function stateOf(mod, status) {
  return flowOf(mod).states.find((s) => s.value === status);
}

/** Statuses reachable from here. An empty list means terminal. */
export function allowedTransitions(mod, status) {
  return stateOf(mod, status)?.next || [];
}

export function isOpen(mod, status) { return Boolean(stateOf(mod, status)?.open); }
export function needsAttention(mod, status) { return Boolean(stateOf(mod, status)?.needsAttention); }

/* ------------------------------------------------------------------ shape -- */

export function blankData(mod, propertyId, userId) {
  const today = new Date();
  const data = {
    ref: "",
    propertyId,
    history: []
  };
  for (const f of mod.fields) {
    data[f.id] =
      f.type === "boolean" ? false
      : f.type === "date" ? today.toISOString().slice(0, 10)
      : f.type === "time" ? `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`
      : f.type === "user" && (f.id === "reporterId") ? userId
      : "";
  }
  return data;
}

/** Reference number, e.g. INC-2026-0007.
 *
 *  Derived from what this device can see. Two devices creating a record
 *  offline can therefore mint the same reference — the record id stays unique,
 *  so nothing is lost or overwritten, but the human-facing number can collide
 *  until a server-side sequence exists. Recorded as a known gap rather than
 *  papered over with a random suffix that would stop it being a sequence. */
export async function nextRef(mod, propertyId, now = new Date()) {
  const year = now.getFullYear();
  const existing = await db.all({ type: mod.type, propertyId, includeDeleted: true });
  const used = existing
    .map((r) => String(r.data?.ref || ""))
    .filter((ref) => ref.startsWith(`${mod.prefix}-${year}-`))
    .map((ref) => Number(ref.split("-")[2]) || 0);
  const next = (used.length ? Math.max(...used) : 0) + 1;
  return `${mod.prefix}-${year}-${String(next).padStart(4, "0")}`;
}

/* ------------------------------------------------------------- validation -- */

/** Required fields that are empty, as human-readable labels. Fields gated by
 *  `showFrom` are only required once the record has reached that state, so a
 *  reporter is never asked for a root cause. */
export function validate(mod, data, status = flowOf(mod).initial) {
  return mod.fields
    .filter((f) => f.required && isVisible(mod, f, status))
    .filter((f) => {
      const v = data[f.id];
      return v === "" || v === null || v === undefined;
    })
    .map((f) => f.label);
}

export function isComplete(mod, data, status) { return validate(mod, data, status).length === 0; }

/** A field appears once the record reaches its `showFrom` state, and stays. */
export function isVisible(mod, field, status) {
  if (!field.showFrom) return true;
  const states = flowOf(mod).states.map((s) => s.value);
  return states.indexOf(status) >= states.indexOf(field.showFrom);
}

export function visibleFields(mod, status) {
  return mod.fields.filter((f) => isVisible(mod, f, status));
}

/* ------------------------------------------------------------ transitions -- */

/** Applies a status change, recording who, when, from, to and why.
 *  SPEC-0007 §5 requires exactly this audit trail; every module gets it because
 *  none of them implement it themselves. */
export function applyTransition(record, mod, toStatus, userId, comment = "") {
  const allowed = allowedTransitions(mod, record.status);
  if (!allowed.includes(toStatus)) {
    throw new Error(`${record.status} → ${toStatus} is not a permitted transition for ${mod.label}`);
  }
  const entry = {
    at: new Date().toISOString(),
    by: userId,
    from: record.status,
    to: toStatus,
    comment: String(comment || "")
  };
  return {
    ...record,
    status: toStatus,
    data: { ...record.data, history: [...(record.data.history || []), entry] }
  };
}

/* --------------------------------------------------------------- options -- */

/** Choices for a field, resolved against the property so every module is
 *  per-property scoped without knowing that it is. */
export function fieldOptions(mod, field, propertyId) {
  const prop = propertyById(propertyId);
  switch (field.type) {
    case "enum":     return CONFIG.enums[field.enumName].map((e) => ({ id: e.value, name: e.value }));
    case "user":     return (prop?.roster || []).map((u) => ({ id: u.id, name: u.name }));
    case "building": return (prop?.buildings || []).map((b) => ({ id: b.id, name: b.name }));
    case "department": return (prop?.departments || []).map((d) => ({ id: d.id, name: d.name }));
    case "plant":    return (prop?.plants || []).map((p) => ({ id: p.id, name: p.name }));
    case "utility":  return (prop?.utilities || []).map((u) => ({ id: u.id, name: u.name }));
    default:         return [];
  }
}

/** Human-readable value for display and search. */
export function displayValue(mod, field, data, propertyId) {
  const raw = data[field.id];
  if (raw === "" || raw === null || raw === undefined) return "";
  if (field.type === "boolean") return raw ? "Yes" : "No";
  if (field.type === "user") return userName(raw) || raw;
  const prop = propertyById(propertyId);
  if (field.type === "building") return nameIn(prop?.buildings || [], raw) || raw;
  if (field.type === "department") return nameIn(prop?.departments || [], raw) || raw;
  if (field.type === "plant") return nameIn(prop?.plants || [], raw) || raw;
  if (field.type === "utility") return nameIn(prop?.utilities || [], raw) || raw;
  return String(raw);
}

/** Severity token for a module record, so colour derives from config rather
 *  than from a status name mapped in code. */
export function severityOf(mod, data) {
  if (!mod.severityField) return "neutral";
  const value = data[mod.severityField];
  const entry = CONFIG.enums[mod.severityEnum]?.find((e) => e.value === value);
  return entry?.severity || "neutral";
}

/* ---------------------------------------------------------------- storage -- */

export async function create(mod, data, propertyId, userId) {
  const ref = await nextRef(mod, propertyId);
  return db.save(db.createRecord({
    type: mod.type,
    propertyId,
    status: flowOf(mod).initial,
    data: { ...data, ref, propertyId, history: [] },
    userId
  }), userId);
}

export async function list(mod, propertyId) {
  const rows = await db.all({ type: mod.type, propertyId });
  return rows.sort((a, b) =>
    String(b.data?.date || "").localeCompare(String(a.data?.date || "")) ||
    String(b.data?.ref || "").localeCompare(String(a.data?.ref || "")));
}

export async function openRecords(mod, propertyId) {
  return (await list(mod, propertyId)).filter((r) => isOpen(mod, r.status));
}

/** Everything a record contributes to search, per module. */
export function searchableText(mod, record) {
  const parts = [record.data?.ref, record.status];
  for (const f of mod.fields) parts.push(displayValue(mod, f, record.data, record.propertyId));
  return parts.filter(Boolean).join(" ").toLowerCase();
}
