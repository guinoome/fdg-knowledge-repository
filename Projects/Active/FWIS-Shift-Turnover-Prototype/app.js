"use strict";

/* ============================================================================
   FWIS — Shift Turnover, Screen A (Compose)
   Implements FWIS-SPEC-0003 v1.1 §Screens, Screen A.

   No organizational data, enumeration, limit, or workflow rule is defined in
   this file. Everything comes from config.js (see CLAUDE.md, "No hardcoding").
   ============================================================================ */

/* ----------------------------------------------------------------- config */

let CFG = null;
const WORKFLOW_ID = "shift-turnover";

function loadConfig() {
  // Swap this for `await (await fetch('/api/config')).json()` when a backend exists.
  CFG = window.FWIS_CONFIG;
  if (!CFG) throw new Error("FWIS_CONFIG not loaded — config.js must load before app.js");
}

function workflow() { return CFG.workflows[WORKFLOW_ID]; }

function enumValues(name) { return CFG.enums[name].map((e) => e.value); }

function enumEntry(name, value) { return CFG.enums[name].find((e) => e.value === value); }

/** Severity token → LED colour class. The only colour decision in the app;
 *  enum values map to severity in config, never to a colour here. */
const SEVERITY_CLASS = { ok: "green", warn: "amber", alarm: "red", info: "blue", neutral: "grey" };

function severityClassFor(enumName, value) {
  const entry = enumEntry(enumName, value);
  return SEVERITY_CLASS[entry && entry.severity] || "grey";
}

function property() { return CFG.properties.find((p) => p.id === state.meta.propertyId); }

function rosterNames() { return (property() ? property().roster : []).map((u) => u.name); }

function userName(userId) {
  for (const p of CFG.properties) {
    const u = p.roster.find((r) => r.id === userId);
    if (u) return u.name;
  }
  return "";
}

const STORAGE_KEY = "fwis-shift-turnover-draft";
const THEME_KEY = "fwis-theme";

/* ------------------------------------------------------------------ state */

let currentStep = 1;
const TOTAL_STEPS = 7;

const state = {
  meta: {
    propertyId: "", buildingId: "", departmentId: "",
    shiftName: "", date: "", shiftStart: "", shiftEnd: "",
    outgoingLeaderId: "", incomingLeaderId: ""
  },
  personnel: { present: [], absent: [], overtime: [], relief: [] },
  contractors: [],
  tasks: [],
  plants: [],
  utilities: [],
  incidents: [],
  concerns: [],
  rooms: [],
  notes: [],
  attachments: [],
  status: "Draft"
};

function uid() { return "r" + Math.random().toString(36).slice(2, 9); }

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function optionsHtml(values, selected) {
  return values.map((v) =>
    `<option value="${escapeHtml(v)}" ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`
  ).join("");
}

/* ============================================================================
   Property-scoped data — rebuilt whenever the property changes.
   Plants, utilities, roster and feeds all belong to a property, so switching
   property must rebuild them rather than carry stale rows across.
   ============================================================================ */

function applyPropertyScope({ preserveEntries = false } = {}) {
  const prop = property();
  if (!prop) return;

  const prevPlants = preserveEntries ? new Map(state.plants.map((p) => [p.name, p])) : new Map();
  const prevUtils = preserveEntries ? new Map(state.utilities.map((u) => [u.name, u])) : new Map();

  state.plants = prop.plants.map((p) => {
    const prev = prevPlants.get(p.name);
    return { id: uid(), plantId: p.id, name: p.name, status: prev ? prev.status : "", remarks: prev ? prev.remarks : "", custom: false };
  });

  state.utilities = prop.utilities.map((u) => {
    const prev = prevUtils.get(u.name);
    return {
      id: uid(), utilityId: u.id, name: u.name, unit: u.unit,
      reading: prev ? prev.reading : "", changes: prev ? prev.changes : "",
      abnormal: prev ? prev.abnormal : false, remarks: prev ? prev.remarks : ""
    };
  });

  state.incidents = (CFG.mockFeeds.incidents[prop.id] || []).map((i) => ({ ...i, requiredAction: "" }));
  state.concerns = (CFG.mockFeeds.concerns[prop.id] || []).map((c) => ({ ...c, notes: "" }));

  // Personnel and task assignees must exist in this property's roster.
  const names = rosterNames();
  Object.keys(state.personnel).forEach((k) => {
    state.personnel[k] = state.personnel[k].filter((n) => names.includes(n));
  });
  state.tasks.forEach((t) => { if (!names.includes(t.assignedTo)) t.assignedTo = ""; });
  if (!names.includes(userName(state.meta.incomingLeaderId))) state.meta.incomingLeaderId = "";
}

/* ============================================================================
   Init
   ============================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  initTheme();

  state.meta.propertyId = CFG.session.propertyId;
  state.meta.outgoingLeaderId = CFG.session.userId;
  state.meta.date = new Date().toISOString().slice(0, 10);

  const prop = property();
  state.meta.buildingId = prop.buildings[0].id;
  state.meta.departmentId = prop.departments[0].id;

  const defaultShift = CFG.enums.shiftName[CFG.enums.shiftName.length - 1];
  state.meta.shiftName = defaultShift.value;
  state.meta.shiftStart = defaultShift.defaultStart;
  state.meta.shiftEnd = defaultShift.defaultEnd;

  applyPropertyScope();

  buildStaticSelects();
  bindMetaFields();
  bindTagFields();
  bindRepeaters();
  bindAttachments();
  bindNav();
  bindTopbar();
  bindConfirmation();

  loadDraft();
  renderAll();
  goToStep(1);
});

function renderAll() {
  syncMetaInputs();
  refreshPropertyDependentSelects();
  ["present", "absent", "overtime", "relief"].forEach(renderTagList);
  renderContractors();
  renderPlants();
  renderUtilities();
  renderTasks();
  renderIncidents();
  renderConcerns();
  renderRooms();
  renderNotes();
  renderAttachments();
  updateRecordStatus();
  updateFlagBoard();
  updateLeds();
}

/* ============================================================================
   Theme — vision doc requires light and dark mode.
   ============================================================================ */

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById("theme-btn");
  if (btn) {
    btn.textContent = theme === "dark" ? "Light" : "Dark";
    btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
}

/* ============================================================================
   Static selects — populated once from config
   ============================================================================ */

function buildStaticSelects() {
  const f = document.getElementById("turnover-form");

  f.querySelector('[name="propertyId"]').innerHTML =
    CFG.properties.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("");

  f.querySelector('[name="shiftName"]').innerHTML =
    `<option value="">Select…</option>` + optionsHtml(enumValues("shiftName"));

  const att = CFG.attachments;
  document.getElementById("attachment-input").setAttribute("accept", att.acceptedExtensions.join(","));
  document.getElementById("attachment-hint").textContent =
    `${att.acceptedExtensions.map((e) => e.replace(".", "").toUpperCase()).join(", ")} · max ${att.maxFileSizeMb} MB each · max ${att.maxFiles} files`;

  document.getElementById("escalation-criteria").textContent =
    workflow().escalationTriggers.map((t) => t.label).join(" · ");
}

/** Selects whose options depend on the selected property. */
function refreshPropertyDependentSelects() {
  const prop = property();
  const f = document.getElementById("turnover-form");

  f.querySelector('[name="buildingId"]').innerHTML =
    prop.buildings.map((b) => `<option value="${b.id}" ${b.id === state.meta.buildingId ? "selected" : ""}>${escapeHtml(b.name)}</option>`).join("");

  f.querySelector('[name="departmentId"]').innerHTML =
    prop.departments.map((d) => `<option value="${d.id}" ${d.id === state.meta.departmentId ? "selected" : ""}>${escapeHtml(d.name)}</option>`).join("");

  const outgoingName = userName(state.meta.outgoingLeaderId);
  f.querySelector('[name="incomingLeader"]').innerHTML =
    `<option value="">Select from roster…</option>` +
    prop.roster.filter((u) => u.id !== state.meta.outgoingLeaderId)
      .map((u) => `<option value="${u.id}" ${u.id === state.meta.incomingLeaderId ? "selected" : ""}>${escapeHtml(u.name)} · ${escapeHtml(roleName(u.roleId))}</option>`).join("");

  f.querySelector('[name="outgoingLeader"]').value = outgoingName;

  document.querySelectorAll("[data-tag-select]").forEach((sel) => {
    sel.innerHTML = `<option value="">Add person…</option>` + optionsHtml(rosterNames());
  });
}

function roleName(roleId) {
  const r = CFG.roles.find((x) => x.id === roleId);
  return r ? r.name : "";
}

function syncMetaInputs() {
  const f = document.getElementById("turnover-form");
  f.querySelector('[name="propertyId"]').value = state.meta.propertyId;
  f.querySelector('[name="shiftName"]').value = state.meta.shiftName;
  f.querySelector('[name="date"]').value = state.meta.date;
  f.querySelector('[name="shiftStart"]').value = state.meta.shiftStart;
  f.querySelector('[name="shiftEnd"]').value = state.meta.shiftEnd;
}

/* ============================================================================
   Step navigation
   ============================================================================ */

function bindNav() {
  document.getElementById("back-btn").addEventListener("click", () => goToStep(currentStep - 1));
  document.getElementById("next-btn").addEventListener("click", () => {
    const errors = validateStep(currentStep);
    if (errors.length) { showValidationMessage(errors[0]); return; }
    goToStep(currentStep + 1);
  });
  document.getElementById("submit-btn").addEventListener("click", handleSubmit);
  document.querySelectorAll(".step-btn").forEach((btn) => {
    btn.addEventListener("click", () => goToStep(Number(btn.dataset.goto)));
  });
}

function goToStep(step) {
  if (step < 1 || step > TOTAL_STEPS) return;
  currentStep = step;

  document.querySelectorAll(".step").forEach((s) => { s.hidden = Number(s.dataset.step) !== currentStep; });
  document.querySelectorAll("li[data-step]").forEach((li) => {
    li.classList.toggle("is-active", Number(li.dataset.step) === currentStep);
  });

  document.getElementById("back-btn").disabled = currentStep === 1;
  document.getElementById("next-btn").hidden = currentStep === TOTAL_STEPS;
  document.getElementById("submit-btn").hidden = currentStep !== TOTAL_STEPS;

  showValidationMessage("");
  updateLeds();
  updateFlagBoard();
  updateRecordStatus();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showValidationMessage(msg) {
  document.getElementById("validation-msg").textContent = msg;
}

/* ============================================================================
   Validation — required fields per FWIS-SPEC-0003 v1.1 field tables
   ============================================================================ */

function validateStep(step) {
  const errors = [];
  switch (step) {
    case 1: {
      const m = state.meta;
      if (!m.propertyId) errors.push("Property is required.");
      if (!m.buildingId) errors.push("Building is required.");
      if (!m.departmentId) errors.push("Department is required.");
      if (!m.shiftName) errors.push("Shift name is required.");
      if (!m.date) errors.push("Date is required.");
      if (!m.shiftStart) errors.push("Shift start is required.");
      if (!m.shiftEnd) errors.push("Shift end is required.");
      if (!m.incomingLeaderId) errors.push("Incoming shift leader is required.");
      if (state.personnel.present.length < 1) errors.push("At least one person must be marked present.");
      break;
    }
    case 2:
      state.plants.forEach((p) => {
        if (!p.name) errors.push("Plant name is required.");
        else if (!p.status) errors.push(`Plant status is required for ${p.name}.`);
      });
      break;
    case 3:
      state.utilities.forEach((u) => {
        if (u.reading === "" || u.reading === null) errors.push(`Current reading is required for ${u.name}.`);
      });
      break;
    case 4:
      state.tasks.forEach((t, i) => {
        if (!t.description) errors.push(`Task ${i + 1}: description is required.`);
        if (!t.priority) errors.push(`Task ${i + 1}: priority is required.`);
        if (!t.assignedTo) errors.push(`Task ${i + 1}: assigned personnel is required.`);
        if (!t.status) errors.push(`Task ${i + 1}: current status is required.`);
      });
      break;
    case 6:
      state.rooms.forEach((r, i) => {
        if (!r.room) errors.push(`Room ${i + 1}: room number is required.`);
        if (!r.status) errors.push(`Room ${i + 1}: status is required.`);
      });
      break;
    case 7:
      state.attachments.forEach((a, i) => {
        if (!a.type) errors.push(`Attachment ${i + 1} (${a.fileName}): type is required.`);
      });
      break;
    default: break;
  }
  return errors;
}

function validateAll() {
  let errors = [];
  for (let s = 1; s <= TOTAL_STEPS; s++) errors = errors.concat(validateStep(s));
  return errors;
}

/* ============================================================================
   Step 1 — Shift Information & Personnel Handover
   ============================================================================ */

function bindMetaFields() {
  const f = document.getElementById("turnover-form");

  f.querySelector('[name="propertyId"]').addEventListener("change", (e) => {
    state.meta.propertyId = e.target.value;
    const prop = property();
    state.meta.buildingId = prop.buildings[0].id;
    state.meta.departmentId = prop.departments[0].id;
    applyPropertyScope();
    renderAll();
    showValidationMessage("");
  });

  f.querySelector('[name="shiftName"]').addEventListener("change", (e) => {
    state.meta.shiftName = e.target.value;
    const entry = enumEntry("shiftName", e.target.value);
    if (entry) {
      state.meta.shiftStart = entry.defaultStart;
      state.meta.shiftEnd = entry.defaultEnd;
      f.querySelector('[name="shiftStart"]').value = entry.defaultStart;
      f.querySelector('[name="shiftEnd"]').value = entry.defaultEnd;
    }
    updateRecordStatus();
  });

  [["buildingId", "buildingId"], ["departmentId", "departmentId"], ["incomingLeader", "incomingLeaderId"]]
    .forEach(([selName, key]) => {
      f.querySelector(`[name="${selName}"]`).addEventListener("change", (e) => {
        state.meta[key] = e.target.value; updateRecordStatus();
      });
    });

  ["date", "shiftStart", "shiftEnd"].forEach((name) => {
    f.querySelector(`[name="${name}"]`).addEventListener("change", (e) => {
      state.meta[name] = e.target.value; updateRecordStatus();
    });
  });
}

function bindTagFields() {
  ["present", "absent", "overtime", "relief"].forEach((field) => {
    document.querySelector(`[data-tag-add="${field}"]`).addEventListener("click", () => {
      const select = document.querySelector(`[data-tag-select="${field}"]`);
      const name = select.value;
      if (!name || state.personnel[field].includes(name)) return;
      state.personnel[field].push(name);
      select.value = "";
      renderTagList(field);
      updateRecordStatus();
      updateLeds();
    });
  });
}

function renderTagList(field) {
  const list = document.querySelector(`[data-tag-list="${field}"]`);
  list.innerHTML = "";
  state.personnel[field].forEach((name) => {
    const chip = document.createElement("span");
    chip.className = "tag-chip";
    chip.innerHTML = `${escapeHtml(name)} <button type="button" aria-label="Remove ${escapeHtml(name)}">×</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      state.personnel[field] = state.personnel[field].filter((n) => n !== name);
      renderTagList(field);
      updateRecordStatus();
      updateLeds();
    });
    list.appendChild(chip);
  });
}

/* ============================================================================
   Repeatable sections
   ============================================================================ */

function bindRepeaters() {
  document.getElementById("add-contractor-btn").addEventListener("click", () => {
    state.contractors.push({ id: uid(), name: "", company: "", purpose: "" });
    renderContractors();
  });
  document.getElementById("add-plant-btn").addEventListener("click", () => {
    state.plants.push({ id: uid(), plantId: null, name: "", status: "", remarks: "", custom: true });
    renderPlants();
  });
  document.getElementById("add-task-btn").addEventListener("click", () => {
    state.tasks.push({ id: uid(), description: "", priority: "", assignedTo: "", status: "", expectedCompletion: "", remarks: "" });
    renderTasks();
  });
  document.getElementById("add-room-btn").addEventListener("click", () => {
    state.rooms.push({ id: uid(), room: "", status: "", remarks: "" });
    renderRooms();
  });
  document.getElementById("add-note-btn").addEventListener("click", () => {
    state.notes.push({ id: uid(), note: "", category: "" });
    renderNotes();
  });
}

function renderContractors() {
  const c = document.getElementById("contractor-rows");
  c.innerHTML = "";
  if (!state.contractors.length) {
    c.innerHTML = `<p class="empty-hint">No contractors present this shift.</p>`;
    return;
  }
  state.contractors.forEach((row) => {
    const el = document.createElement("div");
    el.className = "repeat-row row-grid-3";
    el.innerHTML = `
      <label class="field"><span class="field-label">Name</span><input type="text" data-f="name" value="${escapeHtml(row.name)}" /></label>
      <label class="field"><span class="field-label">Company</span><input type="text" data-f="company" value="${escapeHtml(row.company)}" /></label>
      <label class="field"><span class="field-label">Purpose</span><input type="text" data-f="purpose" value="${escapeHtml(row.purpose)}" /></label>
      <button type="button" class="btn btn-danger-ghost row-remove">Remove</button>`;
    el.querySelectorAll("input").forEach((i) => i.addEventListener("input", () => { row[i.dataset.f] = i.value; }));
    el.querySelector(".row-remove").addEventListener("click", () => {
      state.contractors = state.contractors.filter((x) => x.id !== row.id);
      renderContractors();
    });
    c.appendChild(el);
  });
}

function renderPlants() {
  const c = document.getElementById("plant-rows");
  c.innerHTML = "";
  state.plants.forEach((p) => {
    const el = document.createElement("div");
    el.className = "panel-row";
    el.innerHTML = `
      <span class="plant-name">
        <span class="led ${p.status ? "on-" + severityClassFor("plantStatus", p.status) : ""}"></span>
        ${p.custom
          ? `<input type="text" data-f="name" value="${escapeHtml(p.name)}" placeholder="Plant name" />`
          : escapeHtml(p.name)}
      </span>
      <select data-f="status" aria-label="Status for ${escapeHtml(p.name || "new plant")}">
        <option value="">Select…</option>${optionsHtml(enumValues("plantStatus"), p.status)}
      </select>
      <input type="text" data-f="remarks" placeholder="Remarks" value="${escapeHtml(p.remarks)}" />
      ${p.custom ? `<button type="button" class="btn btn-danger-ghost row-remove">Remove</button>` : ""}`;

    if (p.custom) {
      el.querySelector('[data-f="name"]').addEventListener("input", (e) => { p.name = e.target.value; updateRecordStatus(); });
      el.querySelector(".row-remove").addEventListener("click", () => {
        state.plants = state.plants.filter((x) => x.id !== p.id);
        renderPlants(); updateFlagBoard(); updateLeds();
      });
    }
    el.querySelector('[data-f="status"]').addEventListener("change", (e) => {
      p.status = e.target.value;
      renderPlants(); updateFlagBoard(); updateRecordStatus(); updateLeds();
    });
    el.querySelector('[data-f="remarks"]').addEventListener("input", (e) => { p.remarks = e.target.value; });

    el.classList.toggle("flagged", isEscalatingPlant(p.status));
    c.appendChild(el);
  });
}

function renderUtilities() {
  const c = document.getElementById("utility-rows");
  c.innerHTML = "";
  state.utilities.forEach((u) => {
    const el = document.createElement("div");
    el.className = "repeat-row";
    el.innerHTML = `
      <div class="row-grid-3">
        <span class="utility-name">${escapeHtml(u.name)} <span class="unit">(${escapeHtml(u.unit)})</span></span>
        <label class="field"><span class="field-label">Current reading <em>required</em></span>
          <input type="number" step="any" data-f="reading" value="${escapeHtml(u.reading)}" /></label>
        <label class="field checkbox-field">
          <input type="checkbox" data-f="abnormal" ${u.abnormal ? "checked" : ""} />
          <span class="field-label">Abnormal consumption</span>
        </label>
      </div>
      <div class="row-grid-2">
        <label class="field"><span class="field-label">Significant changes</span><input type="text" data-f="changes" value="${escapeHtml(u.changes)}" /></label>
        <label class="field"><span class="field-label">Operational remarks</span><input type="text" data-f="remarks" value="${escapeHtml(u.remarks)}" /></label>
      </div>`;
    el.querySelector('[data-f="reading"]').addEventListener("input", (e) => { u.reading = e.target.value; updateRecordStatus(); updateLeds(); });
    el.querySelector('[data-f="abnormal"]').addEventListener("change", (e) => { u.abnormal = e.target.checked; });
    el.querySelector('[data-f="changes"]').addEventListener("input", (e) => { u.changes = e.target.value; });
    el.querySelector('[data-f="remarks"]').addEventListener("input", (e) => { u.remarks = e.target.value; });
    c.appendChild(el);
  });
}

function renderTasks() {
  const c = document.getElementById("task-rows");
  c.innerHTML = "";
  if (!state.tasks.length) c.innerHTML = `<p class="empty-hint">No outstanding tasks for this shift.</p>`;

  state.tasks.forEach((t) => {
    const el = document.createElement("div");
    el.className = "repeat-row";
    el.innerHTML = `
      <label class="field"><span class="field-label">Description <em>required</em></span>
        <input type="text" data-f="description" value="${escapeHtml(t.description)}" /></label>
      <div class="row-grid-3">
        <label class="field"><span class="field-label">Priority <em>required</em></span>
          <select data-f="priority"><option value="">Select…</option>${optionsHtml(enumValues("taskPriority"), t.priority)}</select></label>
        <label class="field"><span class="field-label">Assigned personnel <em>required</em></span>
          <select data-f="assignedTo"><option value="">Select…</option>${optionsHtml(rosterNames(), t.assignedTo)}</select></label>
        <label class="field"><span class="field-label">Current status <em>required</em></span>
          <select data-f="status"><option value="">Select…</option>${optionsHtml(enumValues("taskStatus"), t.status)}</select></label>
      </div>
      <div class="row-grid-2">
        <label class="field"><span class="field-label">Expected completion</span><input type="date" data-f="expectedCompletion" value="${escapeHtml(t.expectedCompletion)}" /></label>
        <label class="field"><span class="field-label">Remarks</span><input type="text" data-f="remarks" value="${escapeHtml(t.remarks)}" /></label>
      </div>
      <button type="button" class="btn btn-danger-ghost row-remove">Remove task</button>`;

    el.querySelectorAll("[data-f]").forEach((input) => {
      const evt = input.tagName === "SELECT" || input.type === "date" ? "change" : "input";
      input.addEventListener(evt, () => {
        t[input.dataset.f] = input.value;
        el.classList.toggle("flagged", isEscalatingTaskPriority(t.priority));
        updateFlagBoard(); updateRecordStatus(); updateLeds();
      });
    });
    el.classList.toggle("flagged", isEscalatingTaskPriority(t.priority));
    el.querySelector(".row-remove").addEventListener("click", () => {
      state.tasks = state.tasks.filter((x) => x.id !== t.id);
      renderTasks(); updateFlagBoard(); updateLeds();
    });
    c.appendChild(el);
  });
}

function renderIncidents() {
  const c = document.getElementById("incident-rows");
  c.innerHTML = "";
  if (!state.incidents.length) { c.innerHTML = `<p class="empty-hint">No active incidents as of shift end.</p>`; return; }
  state.incidents.forEach((i) => {
    const cls = severityClassFor("incidentSeverity", i.severity);
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card-top">
        <span class="led on-${cls}"></span>
        <span class="card-id">${escapeHtml(i.id)}</span>
        <span class="severity-pill text-${cls}">${escapeHtml(i.severity)}</span>
      </div>
      <div class="card-meta">${escapeHtml(i.category)} · <span>${escapeHtml(i.status)}</span> · Responsible: <span>${escapeHtml(i.engineer)}</span></div>
      <label class="field"><span class="field-label">Required action for next shift</span>
        <input type="text" data-f="requiredAction" value="${escapeHtml(i.requiredAction)}" /></label>`;
    el.querySelector('[data-f="requiredAction"]').addEventListener("input", (e) => { i.requiredAction = e.target.value; });
    el.classList.toggle("flagged", isEscalatingIncident(i.severity));
    c.appendChild(el);
  });
}

function renderConcerns() {
  const c = document.getElementById("concern-rows");
  c.innerHTML = "";
  if (!state.concerns.length) { c.innerHTML = `<p class="empty-hint">No unresolved concerns.</p>`; return; }
  state.concerns.forEach((x) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card-top"><span class="card-id">${escapeHtml(x.id)}</span></div>
      <div class="card-meta">${escapeHtml(x.category)} · <span>${escapeHtml(x.status)}</span></div>
      <label class="field"><span class="field-label">Notes for next shift</span>
        <input type="text" data-f="notes" value="${escapeHtml(x.notes)}" /></label>`;
    el.querySelector('[data-f="notes"]').addEventListener("input", (e) => { x.notes = e.target.value; });
    c.appendChild(el);
  });
}

function renderRooms() {
  const c = document.getElementById("room-rows");
  c.innerHTML = "";
  if (!state.rooms.length) c.innerHTML = `<p class="empty-hint">No rooms flagged this shift.</p>`;
  state.rooms.forEach((r) => {
    const el = document.createElement("div");
    el.className = "repeat-row row-grid-3";
    el.innerHTML = `
      <label class="field"><span class="field-label">Room number <em>required</em></span><input type="text" data-f="room" value="${escapeHtml(r.room)}" /></label>
      <label class="field"><span class="field-label">Status <em>required</em></span>
        <select data-f="status"><option value="">Select…</option>${optionsHtml(enumValues("roomStatus"), r.status)}</select></label>
      <label class="field"><span class="field-label">Remarks</span><input type="text" data-f="remarks" value="${escapeHtml(r.remarks)}" /></label>
      <button type="button" class="btn btn-danger-ghost row-remove">Remove</button>`;
    el.querySelectorAll("[data-f]").forEach((input) => {
      input.addEventListener(input.tagName === "SELECT" ? "change" : "input", () => {
        r[input.dataset.f] = input.value; updateRecordStatus(); updateLeds();
      });
    });
    el.querySelector(".row-remove").addEventListener("click", () => {
      state.rooms = state.rooms.filter((x) => x.id !== r.id);
      renderRooms(); updateLeds();
    });
    c.appendChild(el);
  });
}

function renderNotes() {
  const c = document.getElementById("note-rows");
  c.innerHTML = "";
  if (!state.notes.length) c.innerHTML = `<p class="empty-hint">No engineering notes recorded.</p>`;
  state.notes.forEach((n) => {
    const el = document.createElement("div");
    el.className = "repeat-row";
    el.innerHTML = `
      <label class="field"><span class="field-label">Note</span><textarea data-f="note">${escapeHtml(n.note)}</textarea></label>
      <div class="row-grid-2">
        <label class="field"><span class="field-label">Category</span>
          <select data-f="category"><option value="">Select…</option>${optionsHtml(enumValues("noteCategory"), n.category)}</select></label>
        <button type="button" class="btn btn-danger-ghost row-remove align-end">Remove note</button>
      </div>`;
    el.querySelector('[data-f="note"]').addEventListener("input", (e) => { n.note = e.target.value; });
    el.querySelector('[data-f="category"]').addEventListener("change", (e) => { n.category = e.target.value; });
    el.querySelector(".row-remove").addEventListener("click", () => {
      state.notes = state.notes.filter((x) => x.id !== n.id);
      renderNotes();
    });
    c.appendChild(el);
  });
}

/* ------------------------------------------------------------- attachments */

function bindAttachments() {
  document.getElementById("attachment-input").addEventListener("change", (e) => {
    const { maxFiles, maxFileSizeMb } = CFG.attachments;
    const rejected = [];
    Array.from(e.target.files).forEach((file) => {
      if (state.attachments.length >= maxFiles) { rejected.push(`${file.name} (limit ${maxFiles} files)`); return; }
      if (file.size > maxFileSizeMb * 1024 * 1024) { rejected.push(`${file.name} (over ${maxFileSizeMb} MB)`); return; }
      state.attachments.push({ id: uid(), fileName: file.name, sizeKb: Math.round(file.size / 1024), type: "", caption: "" });
    });
    e.target.value = "";
    renderAttachments();
    showValidationMessage(rejected.length ? `Not attached: ${rejected.join(", ")}` : "");
    updateLeds();
  });
}

function renderAttachments() {
  const c = document.getElementById("attachment-rows");
  c.innerHTML = "";
  state.attachments.forEach((a) => {
    const el = document.createElement("div");
    el.className = "repeat-row row-grid-3";
    el.innerHTML = `
      <span class="file-name">${escapeHtml(a.fileName)}<br><span class="unit">${a.sizeKb} KB</span></span>
      <label class="field"><span class="field-label">Type <em>required</em></span>
        <select data-f="type"><option value="">Select…</option>${optionsHtml(enumValues("attachmentType"), a.type)}</select></label>
      <label class="field"><span class="field-label">Caption</span><input type="text" data-f="caption" value="${escapeHtml(a.caption)}" /></label>
      <button type="button" class="btn btn-danger-ghost row-remove">Remove</button>`;
    el.querySelector('[data-f="type"]').addEventListener("change", (e) => { a.type = e.target.value; updateRecordStatus(); updateLeds(); });
    el.querySelector('[data-f="caption"]').addEventListener("input", (e) => { a.caption = e.target.value; });
    el.querySelector(".row-remove").addEventListener("click", () => {
      state.attachments = state.attachments.filter((x) => x.id !== a.id);
      renderAttachments(); updateRecordStatus(); updateLeds();
    });
    c.appendChild(el);
  });
}

/* ============================================================================
   Escalation — evaluated from config triggers, never hardcoded conditions
   ============================================================================ */

function triggersOfType(type) {
  return workflow().escalationTriggers.filter((t) => t.type === type);
}

function isEscalatingPlant(status) {
  return status && triggersOfType("plantStatusIn").some((t) => t.values.includes(status));
}
function isEscalatingIncident(severity) {
  return severity && triggersOfType("incidentSeverityIn").some((t) => t.values.includes(severity));
}
function isEscalatingTaskPriority(priority) {
  // Task priority is not itself an escalation trigger, but Critical tasks are
  // highlighted per the spec's Business Rules.
  return priority === "Critical";
}

/** Returns the config trigger objects currently met. */
function metEscalationTriggers() {
  return workflow().escalationTriggers.filter((t) => {
    if (t.type === "plantStatusIn") return state.plants.some((p) => t.values.includes(p.status));
    if (t.type === "incidentSeverityIn") return state.incidents.some((i) => t.values.includes(i.severity));
    return false; // SLA and clarification-count triggers require post-submission state
  });
}

function countFlags() {
  return state.plants.filter((p) => isEscalatingPlant(p.status)).length
    + state.tasks.filter((t) => isEscalatingTaskPriority(t.priority)).length
    + state.incidents.filter((i) => isEscalatingIncident(i.severity)).length;
}

/* ============================================================================
   Status indicators
   ============================================================================ */

function updateLeds() {
  for (let s = 1; s <= TOTAL_STEPS; s++) {
    const led = document.querySelector(`[data-led="${s}"]`);
    if (!led) continue;
    const invalid = validateStep(s).length > 0;
    led.className = "led " + (invalid ? (s < currentStep ? "on-red" : "") : "on-green");
  }
}

function updateFlagBoard() {
  const count = countFlags();
  const el = document.getElementById("flag-count");
  el.textContent = String(count);
  el.classList.toggle("has-flags", count > 0);
}

function updateRecordStatus() {
  if (state.status === "Submitted") return;
  state.status = validateAll().length === 0 ? "Ready" : "Draft";
  paintStatusBadge(state.status);
}

function paintStatusBadge(status) {
  const badge = document.getElementById("status-badge");
  const entry = workflow().states.find((s) => s.value === status);
  const cls = SEVERITY_CLASS[entry && entry.severity] || "grey";
  badge.querySelector(".led").className = "led on-" + cls;
  badge.querySelector(".status-label").textContent = status;
}

/* ============================================================================
   Draft persistence
   ============================================================================ */

function bindTopbar() {
  document.getElementById("save-draft-btn").addEventListener("click", saveDraft);
  document.getElementById("theme-btn").addEventListener("click", () => {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: CFG.schemaVersion, state }));
  const btn = document.getElementById("save-draft-btn");
  const original = btn.textContent;
  btn.textContent = "Saved";
  setTimeout(() => { btn.textContent = original; }, 1200);
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    // Drafts written against an older config schema are discarded rather than
    // silently half-restored.
    if (saved.schemaVersion !== CFG.schemaVersion) { localStorage.removeItem(STORAGE_KEY); return; }
    if (saved.state.status === "Submitted") return;
    Object.assign(state, saved.state);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/* ============================================================================
   Submit
   ============================================================================ */

function handleSubmit() {
  const errors = validateAll();
  if (errors.length) {
    for (let s = 1; s <= TOTAL_STEPS; s++) {
      if (validateStep(s).length) { goToStep(s); break; }
    }
    showValidationMessage(errors[0]);
    return;
  }

  state.status = "Submitted";
  const record = assembleRecord();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: CFG.schemaVersion, state }));
  paintStatusBadge("Submitted");

  const prop = property();
  document.getElementById("record-id").textContent =
    `ST-${state.meta.date.replace(/-/g, "")}-${prop.id.replace("prop-", "").toUpperCase()}`;

  document.getElementById("confirmation-summary").textContent =
    `${state.meta.shiftName} at ${prop.name} handed from ${userName(state.meta.outgoingLeaderId)} ` +
    `to ${userName(state.meta.incomingLeaderId)} on ${state.meta.date}.`;

  const met = metEscalationTriggers();
  const escEl = document.getElementById("confirmation-escalation");
  if (met.length) {
    const chain = workflow().approvalChain.map((s) => roleName(s.roleId)).join(" → ");
    escEl.hidden = false;
    escEl.textContent =
      `Escalation triggered by ${met.map((t) => t.label).join(" and ")}. ` +
      `Per FBPOIS-ROLE-0004 this routes through ${chain}, in addition to standard incoming-shift acceptance.`;
  } else {
    escEl.hidden = true;
  }

  document.getElementById("confirmation-json").textContent = JSON.stringify(record, null, 2);
  document.getElementById("confirmation").hidden = false;
  document.getElementById("new-turnover-btn").focus();
}

function assembleRecord() {
  const prop = property();
  const nameOf = (list, id) => { const x = list.find((i) => i.id === id); return x ? x.name : ""; };

  return {
    workflow: WORKFLOW_ID,
    status: state.status,
    schemaVersion: CFG.schemaVersion,
    shift_information: {
      property: prop.name,
      building: nameOf(prop.buildings, state.meta.buildingId),
      department: nameOf(prop.departments, state.meta.departmentId),
      shift_name: state.meta.shiftName,
      date: state.meta.date,
      shift_start: state.meta.shiftStart,
      shift_end: state.meta.shiftEnd,
      outgoing_shift_leader: userName(state.meta.outgoingLeaderId),
      incoming_shift_leader: userName(state.meta.incomingLeaderId)
    },
    personnel_handover: { ...state.personnel, contractors: state.contractors.map(({ id, ...r }) => r) },
    outstanding_tasks: state.tasks.map(({ id, ...r }) => r),
    plant_status: state.plants.map(({ id, custom, ...r }) => r),
    utilities_status: state.utilities.map(({ id, ...r }) => r),
    active_incidents: state.incidents,
    engineering_concerns: state.concerns,
    room_engineering_status: state.rooms.map(({ id, ...r }) => r),
    engineering_notes: state.notes.map(({ id, ...r }) => r),
    attachments: state.attachments.map(({ id, ...r }) => r),
    escalation: {
      required: metEscalationTriggers().length > 0,
      triggered_by: metEscalationTriggers().map((t) => t.id),
      approval_chain: workflow().approvalChain
    }
  };
}

function bindConfirmation() {
  document.getElementById("new-turnover-btn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  });
}
