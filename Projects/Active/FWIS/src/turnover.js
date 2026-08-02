/* ============================================================================
   FWIS — Shift Turnover domain model
   ----------------------------------------------------------------------------
   Record shape, validation, and escalation evaluation for FWIS-SPEC-0003 v1.1.
   Screens stay thin; the rules live here so compose, detail, list, dashboard
   and search all agree on what a turnover means.
   ============================================================================ */

import { CONFIG, propertyById, workflow, enumEntry } from "./config.js";
import { newId } from "./db.js";

export const TYPE = "shift-turnover";
export const TOTAL_STEPS = 7;

export const STEP_TITLES = [
  "Shift & Personnel", "Plant Status", "Utilities", "Outstanding Tasks",
  "Incidents & Concerns", "Room Status", "Notes & Attachments"
];

/* ------------------------------------------------------------- creation --- */

export function blankTurnover(propertyId, userId) {
  const prop = propertyById(propertyId);
  const shift = CONFIG.enums.shiftName[CONFIG.enums.shiftName.length - 1];

  return {
    meta: {
      propertyId,
      buildingId: prop.buildings[0].id,
      departmentId: prop.departments[0].id,
      shiftName: shift.value,
      date: new Date().toISOString().slice(0, 10),
      shiftStart: shift.defaultStart,
      shiftEnd: shift.defaultEnd,
      outgoingLeaderId: userId,
      incomingLeaderId: ""
    },
    personnel: { present: [], absent: [], overtime: [], relief: [] },
    contractors: [],
    tasks: [],
    plants: plantsFor(propertyId),
    utilities: utilitiesFor(propertyId),
    incidents: incidentsFor(propertyId),
    concerns: concernsFor(propertyId),
    rooms: [],
    notes: [],
    attachments: [],
    acceptance: null,
    clarificationCount: 0
  };
}

export function plantsFor(propertyId, previous = []) {
  const prev = new Map(previous.map((p) => [p.name, p]));
  return propertyById(propertyId).plants.map((p) => {
    const was = prev.get(p.name);
    return {
      rowId: newId(), plantId: p.id, name: p.name,
      status: was?.status || "", remarks: was?.remarks || "", custom: false
    };
  });
}

export function utilitiesFor(propertyId, previous = []) {
  const prev = new Map(previous.map((u) => [u.name, u]));
  return propertyById(propertyId).utilities.map((u) => {
    const was = prev.get(u.name);
    return {
      rowId: newId(), utilityId: u.id, name: u.name, unit: u.unit,
      reading: was?.reading ?? "", changes: was?.changes || "",
      abnormal: was?.abnormal || false, remarks: was?.remarks || ""
    };
  });
}

export function incidentsFor(propertyId) {
  return (CONFIG.mockFeeds.incidents[propertyId] || []).map((i) => ({ ...i, requiredAction: "" }));
}

export function concernsFor(propertyId) {
  return (CONFIG.mockFeeds.concerns[propertyId] || []).map((c) => ({ ...c, notes: "" }));
}

/** Re-scopes a turnover after its property changes. Anything belonging to the
 *  old property is rebuilt rather than carried across. */
export function rescope(t) {
  const prop = propertyById(t.meta.propertyId);
  t.meta.buildingId = prop.buildings[0].id;
  t.meta.departmentId = prop.departments[0].id;
  t.plants = plantsFor(t.meta.propertyId, t.plants);
  t.utilities = utilitiesFor(t.meta.propertyId, t.utilities);
  t.incidents = incidentsFor(t.meta.propertyId);
  t.concerns = concernsFor(t.meta.propertyId);

  const names = rosterNames(t.meta.propertyId);
  for (const key of Object.keys(t.personnel)) {
    t.personnel[key] = t.personnel[key].filter((n) => names.includes(n));
  }
  t.tasks.forEach((task) => { if (!names.includes(task.assignedTo)) task.assignedTo = ""; });
  if (!prop.roster.some((u) => u.id === t.meta.incomingLeaderId)) t.meta.incomingLeaderId = "";
  return t;
}

export function rosterNames(propertyId) {
  return propertyById(propertyId).roster.map((u) => u.name);
}

/* ----------------------------------------------------------- validation --- */

/** Required fields per the FWIS-SPEC-0003 v1.1 field tables. */
export function validateStep(t, step) {
  const e = [];
  switch (step) {
    case 1: {
      const m = t.meta;
      if (!m.propertyId) e.push("Property is required.");
      if (!m.buildingId) e.push("Building is required.");
      if (!m.departmentId) e.push("Department is required.");
      if (!m.shiftName) e.push("Shift name is required.");
      if (!m.date) e.push("Date is required.");
      if (!m.shiftStart) e.push("Shift start is required.");
      if (!m.shiftEnd) e.push("Shift end is required.");
      if (!m.incomingLeaderId) e.push("Incoming shift leader is required.");
      if (t.personnel.present.length < 1) e.push("At least one person must be marked present.");
      break;
    }
    case 2:
      t.plants.forEach((p) => {
        if (!p.name) e.push("Plant name is required.");
        else if (!p.status) e.push(`Plant status is required for ${p.name}.`);
      });
      break;
    case 3:
      t.utilities.forEach((u) => {
        if (u.reading === "" || u.reading === null) e.push(`Current reading is required for ${u.name}.`);
      });
      break;
    case 4:
      t.tasks.forEach((task, i) => {
        if (!task.description) e.push(`Task ${i + 1}: description is required.`);
        if (!task.priority) e.push(`Task ${i + 1}: priority is required.`);
        if (!task.assignedTo) e.push(`Task ${i + 1}: assigned personnel is required.`);
        if (!task.status) e.push(`Task ${i + 1}: current status is required.`);
      });
      break;
    case 6:
      t.rooms.forEach((r, i) => {
        if (!r.room) e.push(`Room ${i + 1}: room number is required.`);
        if (!r.status) e.push(`Room ${i + 1}: status is required.`);
      });
      break;
    case 7:
      t.attachments.forEach((a, i) => {
        if (!a.type) e.push(`Attachment ${i + 1} (${a.fileName}): type is required.`);
      });
      break;
    default: break;
  }
  return e;
}

export function validateAll(t) {
  let all = [];
  for (let s = 1; s <= TOTAL_STEPS; s++) all = all.concat(validateStep(t, s));
  return all;
}

export function isComplete(t) { return validateAll(t).length === 0; }

/* ----------------------------------------------------------- escalation --- */

function triggersOfType(type) {
  return workflow().escalationTriggers.filter((x) => x.type === type);
}

export function isEscalatingPlant(status) {
  return !!status && triggersOfType("plantStatusIn").some((x) => x.values.includes(status));
}

export function isEscalatingIncident(severity) {
  return !!severity && triggersOfType("incidentSeverityIn").some((x) => x.values.includes(severity));
}

/** Critical tasks are highlighted per the spec's Business Rules; they are not
 *  themselves an escalation trigger. */
export function isCriticalTask(priority) { return priority === "Critical"; }

/** Config triggers currently met by this record. */
export function metEscalationTriggers(t) {
  return workflow().escalationTriggers.filter((trigger) => {
    switch (trigger.type) {
      case "plantStatusIn":
        return t.plants.some((p) => trigger.values.includes(p.status));
      case "incidentSeverityIn":
        return t.incidents.some((i) => trigger.values.includes(i.severity));
      case "clarificationCountOver":
        return (t.clarificationCount || 0) > trigger.value;
      case "acceptanceSlaHours":
        return slaBreached(t, trigger.value);
      default:
        return false;
    }
  });
}

function slaBreached(t, hours) {
  if (!t.submittedAt || t.acceptance) return false;
  return (Date.now() - new Date(t.submittedAt).getTime()) > hours * 3600000;
}

export function requiresEscalation(t) { return metEscalationTriggers(t).length > 0; }

export function flagCount(t) {
  return t.plants.filter((p) => isEscalatingPlant(p.status)).length
    + t.tasks.filter((x) => isCriticalTask(x.priority)).length
    + t.incidents.filter((i) => isEscalatingIncident(i.severity)).length;
}

/* --------------------------------------------------------------- status --- */

export function nextStatusOnSubmit(t) {
  return requiresEscalation(t) ? "Escalated" : "Pending Acceptance";
}

export function draftStatus(t) { return isComplete(t) ? "Ready" : "Draft"; }

export function isOpen(status) { return !!workflow().states.find((s) => s.value === status)?.open; }

export function needsAttention(status) {
  return !!workflow().states.find((s) => s.value === status)?.needsAttention;
}

export function approvalChainNames() {
  return workflow().approvalChain.map((s) => s.roleId);
}

/* -------------------------------------------------------------- summary --- */

export function summaryLine(t) {
  const prop = propertyById(t.meta.propertyId);
  return `${t.meta.shiftName} · ${prop?.name || "—"} · ${t.meta.date}`;
}

export function acceptanceRequiresComment(status) {
  return !!enumEntry("acceptanceStatus", status)?.requiresComment;
}

/* ---------------------------------------------------------------- text ---- */

/** Flattens a turnover into a searchable string. Kept here so search never
 *  has to know the record's internal shape. */
export function searchableText(t) {
  const prop = propertyById(t.meta.propertyId);
  const parts = [
    prop?.name, t.meta.shiftName, t.meta.date,
    ...t.personnel.present, ...t.personnel.absent,
    ...t.contractors.flatMap((c) => [c.name, c.company, c.purpose]),
    ...t.tasks.flatMap((x) => [x.description, x.priority, x.assignedTo, x.status, x.remarks]),
    ...t.plants.flatMap((p) => [p.name, p.status, p.remarks]),
    ...t.utilities.flatMap((u) => [u.name, u.changes, u.remarks]),
    ...t.incidents.flatMap((i) => [i.id, i.category, i.severity, i.status, i.engineer, i.requiredAction]),
    ...t.concerns.flatMap((c) => [c.id, c.category, c.status, c.notes]),
    ...t.rooms.flatMap((r) => [r.room, r.status, r.remarks]),
    ...t.notes.flatMap((n) => [n.note, n.category]),
    ...t.attachments.flatMap((a) => [a.fileName, a.type, a.caption])
  ];
  return parts.filter(Boolean).join(" ").toLowerCase();
}
