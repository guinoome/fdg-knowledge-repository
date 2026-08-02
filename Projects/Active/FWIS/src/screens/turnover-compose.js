/* ============================================================================
   Screen A — Compose Turnover
   FWIS-SPEC-0003 v1.1 §Screens, Screen A. Seven-step wizard, one step per
   stage of the spec's workflow diagram.
   ============================================================================ */

import {
  CONFIG, propertyById, roleName, userName, nameIn, workflow, severityClassFor
} from "../config.js";
import * as identity from "../identity.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import { esc, optionsHtml, enumOptions, toast, formatDate } from "../ui.js";
import { navigate } from "../router.js";

export async function composeScreen(params, view) {
  const { userId, propertyId } = identity.current();

  let record = null;
  if (params.id) {
    record = await db.get(params.id);
    if (!record) {
      view.innerHTML = `<div class="error-state"><h2>Turnover not found</h2>
        <p>It may have been deleted.</p>
        <p><a class="btn" href="#/turnovers">Back to turnovers</a></p></div>`;
      return;
    }
  }

  const t = record ? record.data : T.blankTurnover(propertyId, userId);
  let step = 1;

  view.innerHTML = shell();
  const $ = (sel) => view.querySelector(sel);
  const $$ = (sel) => Array.from(view.querySelectorAll(sel));

  /* ------------------------------------------------------------- render -- */

  function renderStep() {
    $("#step-body").innerHTML = stepMarkup(step, t);
    bindStep();
    $("#step-eyebrow").textContent = `Step ${step} of ${T.TOTAL_STEPS}`;
    $("#step-title").textContent = T.STEP_TITLES[step - 1];
    $("#step-sub").textContent = STEP_SUBS[step - 1];
    $("#back-btn").disabled = step === 1;
    $("#next-btn").hidden = step === T.TOTAL_STEPS;
    $("#submit-btn").hidden = step !== T.TOTAL_STEPS;
    $("#validation-msg").textContent = "";
    paintRail();
    paintFlags();
    paintStatus();
  }

  function paintRail() {
    $$("#rail li").forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle("is-active", n === step);
      const led = li.querySelector(".led");
      const invalid = T.validateStep(t, n).length > 0;
      led.className = "led " + (invalid ? (n < step ? "on-red" : "") : "on-green");
    });
  }

  function paintFlags() {
    const n = T.flagCount(t);
    const box = $("#flag-count");
    box.textContent = String(n);
    box.classList.toggle("has-flags", n > 0);
  }

  function paintStatus() {
    const status = T.draftStatus(t);
    const badge = $("#compose-status");
    badge.innerHTML = `<span class="led on-${status === "Ready" ? "green" : "amber"}"></span>${status}`;
  }

  /* -------------------------------------------------------------- bind --- */

  function bindStep() {
    switch (step) {
      case 1: bindStep1(); break;
      case 2: bindPlants(); break;
      case 3: bindUtilities(); break;
      case 4: bindTasks(); break;
      case 5: bindFeeds(); break;
      case 6: bindRooms(); break;
      case 7: bindNotesAttachments(); break;
    }
  }

  /* -- step 1 -- */
  function bindStep1() {
    $('[name="propertyId"]').addEventListener("change", (e) => {
      t.meta.propertyId = e.target.value;
      T.rescope(t);
      renderStep();
    });

    $('[name="shiftName"]').addEventListener("change", (e) => {
      t.meta.shiftName = e.target.value;
      const entry = CONFIG.enums.shiftName.find((s) => s.value === e.target.value);
      if (entry) {
        t.meta.shiftStart = entry.defaultStart;
        t.meta.shiftEnd = entry.defaultEnd;
        $('[name="shiftStart"]').value = entry.defaultStart;
        $('[name="shiftEnd"]').value = entry.defaultEnd;
      }
      paintRail(); paintStatus();
    });

    [["buildingId", "buildingId"], ["departmentId", "departmentId"],
     ["incomingLeaderId", "incomingLeaderId"], ["date", "date"],
     ["shiftStart", "shiftStart"], ["shiftEnd", "shiftEnd"]]
      .forEach(([name, key]) => {
        $(`[name="${name}"]`).addEventListener("change", (e) => {
          t.meta[key] = e.target.value; paintRail(); paintStatus();
        });
      });

    ["present", "absent", "overtime", "relief"].forEach((field) => {
      $(`[data-tag-add="${field}"]`).addEventListener("click", () => {
        const sel = $(`[data-tag-select="${field}"]`);
        const name = sel.value;
        if (!name || t.personnel[field].includes(name)) return;
        t.personnel[field].push(name);
        sel.value = "";
        renderTags(field);
        paintRail(); paintStatus();
      });
      renderTags(field);
    });

    $("#add-contractor").addEventListener("click", () => {
      t.contractors.push({ rowId: db.newId(), name: "", company: "", purpose: "" });
      renderContractors();
    });
    renderContractors();
  }

  function renderTags(field) {
    const host = $(`[data-tag-list="${field}"]`);
    host.innerHTML = "";
    t.personnel[field].forEach((name) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.innerHTML = `${esc(name)} <button type="button" aria-label="Remove ${esc(name)}">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        t.personnel[field] = t.personnel[field].filter((n) => n !== name);
        renderTags(field); paintRail(); paintStatus();
      });
      host.appendChild(chip);
    });
  }

  function renderContractors() {
    const host = $("#contractor-rows");
    host.innerHTML = t.contractors.length ? "" : `<p class="hint">No contractors present this shift.</p>`;
    t.contractors.forEach((c) => {
      const row = document.createElement("div");
      row.className = "row row-3";
      row.innerHTML = `
        <label class="field"><span class="lbl">Name</span><input type="text" data-f="name" value="${esc(c.name)}"></label>
        <label class="field"><span class="lbl">Company</span><input type="text" data-f="company" value="${esc(c.company)}"></label>
        <label class="field"><span class="lbl">Purpose</span><input type="text" data-f="purpose" value="${esc(c.purpose)}"></label>
        <button type="button" class="btn btn-danger row-x">Remove</button>`;
      row.querySelectorAll("input").forEach((i) =>
        i.addEventListener("input", () => { c[i.dataset.f] = i.value; }));
      row.querySelector(".row-x").addEventListener("click", () => {
        t.contractors = t.contractors.filter((x) => x.rowId !== c.rowId);
        renderContractors();
      });
      host.appendChild(row);
    });
  }

  /* -- step 2 -- */
  function bindPlants() {
    $("#add-plant").addEventListener("click", () => {
      t.plants.push({ rowId: db.newId(), plantId: null, name: "", status: "", remarks: "", custom: true });
      renderStep();
    });
    $$("#plant-rows .panel").forEach((row) => {
      const p = t.plants.find((x) => x.rowId === row.dataset.row);
      row.querySelector('[data-f="status"]').addEventListener("change", (e) => {
        p.status = e.target.value; renderStep();
      });
      row.querySelector('[data-f="remarks"]').addEventListener("input", (e) => { p.remarks = e.target.value; });
      const nameInput = row.querySelector('[data-f="name"]');
      if (nameInput) nameInput.addEventListener("input", (e) => { p.name = e.target.value; paintRail(); });
      const rm = row.querySelector(".row-x");
      if (rm) rm.addEventListener("click", () => {
        t.plants = t.plants.filter((x) => x.rowId !== p.rowId); renderStep();
      });
    });
  }

  /* -- step 3 -- */
  function bindUtilities() {
    $$("#utility-rows .row").forEach((row) => {
      const u = t.utilities.find((x) => x.rowId === row.dataset.row);
      row.querySelector('[data-f="reading"]').addEventListener("input", (e) => {
        u.reading = e.target.value; paintRail(); paintStatus();
      });
      row.querySelector('[data-f="abnormal"]').addEventListener("change", (e) => { u.abnormal = e.target.checked; });
      row.querySelector('[data-f="changes"]').addEventListener("input", (e) => { u.changes = e.target.value; });
      row.querySelector('[data-f="remarks"]').addEventListener("input", (e) => { u.remarks = e.target.value; });
    });
  }

  /* -- step 4 -- */
  function bindTasks() {
    $("#add-task").addEventListener("click", () => {
      t.tasks.push({ rowId: db.newId(), description: "", priority: "", assignedTo: "", status: "", expectedCompletion: "", remarks: "" });
      renderStep();
    });
    $$("#task-rows .row").forEach((row) => {
      const task = t.tasks.find((x) => x.rowId === row.dataset.row);
      row.querySelectorAll("[data-f]").forEach((input) => {
        const evt = input.tagName === "SELECT" || input.type === "date" ? "change" : "input";
        input.addEventListener(evt, () => {
          task[input.dataset.f] = input.value;
          if (input.dataset.f === "priority") renderStep();
          else { paintRail(); paintStatus(); }
        });
      });
      row.querySelector(".row-x").addEventListener("click", () => {
        t.tasks = t.tasks.filter((x) => x.rowId !== task.rowId); renderStep();
      });
    });
  }

  /* -- step 5 -- */
  function bindFeeds() {
    $$("#incident-rows [data-f]").forEach((input) => {
      const inc = t.incidents.find((x) => x.id === input.closest(".card").dataset.row);
      input.addEventListener("input", () => { inc.requiredAction = input.value; });
    });
    $$("#concern-rows [data-f]").forEach((input) => {
      const c = t.concerns.find((x) => x.id === input.closest(".card").dataset.row);
      input.addEventListener("input", () => { c.notes = input.value; });
    });
  }

  /* -- step 6 -- */
  function bindRooms() {
    $("#add-room").addEventListener("click", () => {
      t.rooms.push({ rowId: db.newId(), room: "", status: "", remarks: "" });
      renderStep();
    });
    $$("#room-rows .row").forEach((row) => {
      const r = t.rooms.find((x) => x.rowId === row.dataset.row);
      row.querySelectorAll("[data-f]").forEach((input) => {
        input.addEventListener(input.tagName === "SELECT" ? "change" : "input", () => {
          r[input.dataset.f] = input.value; paintRail(); paintStatus();
        });
      });
      row.querySelector(".row-x").addEventListener("click", () => {
        t.rooms = t.rooms.filter((x) => x.rowId !== r.rowId); renderStep();
      });
    });
  }

  /* -- step 7 -- */
  function bindNotesAttachments() {
    $("#add-note").addEventListener("click", () => {
      t.notes.push({ rowId: db.newId(), note: "", category: "" });
      renderStep();
    });
    $$("#note-rows .row").forEach((row) => {
      const n = t.notes.find((x) => x.rowId === row.dataset.row);
      row.querySelector('[data-f="note"]').addEventListener("input", (e) => { n.note = e.target.value; });
      row.querySelector('[data-f="category"]').addEventListener("change", (e) => { n.category = e.target.value; });
      row.querySelector(".row-x").addEventListener("click", () => {
        t.notes = t.notes.filter((x) => x.rowId !== n.rowId); renderStep();
      });
    });

    $("#attachment-input").addEventListener("change", (e) => {
      const { maxFiles, maxFileSizeMb } = CONFIG.attachments;
      const rejected = [];
      Array.from(e.target.files).forEach((file) => {
        if (t.attachments.length >= maxFiles) { rejected.push(`${file.name} (limit ${maxFiles})`); return; }
        if (file.size > maxFileSizeMb * 1024 * 1024) { rejected.push(`${file.name} (over ${maxFileSizeMb} MB)`); return; }
        t.attachments.push({
          rowId: db.newId(), fileName: file.name,
          sizeKb: Math.round(file.size / 1024), type: "", caption: ""
        });
      });
      e.target.value = "";
      renderStep();
      if (rejected.length) $("#validation-msg").textContent = `Not attached: ${rejected.join(", ")}`;
    });

    $$("#attachment-rows .row").forEach((row) => {
      const a = t.attachments.find((x) => x.rowId === row.dataset.row);
      row.querySelector('[data-f="type"]').addEventListener("change", (e) => {
        a.type = e.target.value; paintRail(); paintStatus();
      });
      row.querySelector('[data-f="caption"]').addEventListener("input", (e) => { a.caption = e.target.value; });
      row.querySelector(".row-x").addEventListener("click", () => {
        t.attachments = t.attachments.filter((x) => x.rowId !== a.rowId); renderStep();
      });
    });
  }

  /* ---------------------------------------------------------- persistence */

  async function persist(status) {
    if (record) {
      record = await db.save({ ...record, status, data: t }, userId);
    } else {
      record = db.createRecord({
        type: T.TYPE, propertyId: t.meta.propertyId, status, data: t, userId
      });
      await db.put(record);
    }
    return record;
  }

  /* --------------------------------------------------------------- nav -- */

  $("#back-btn").addEventListener("click", () => { if (step > 1) { step--; renderStep(); } });

  $("#next-btn").addEventListener("click", () => {
    const errs = T.validateStep(t, step);
    if (errs.length) { $("#validation-msg").textContent = errs[0]; return; }
    if (step < T.TOTAL_STEPS) { step++; renderStep(); }
  });

  $$("#rail button").forEach((b) =>
    b.addEventListener("click", () => { step = Number(b.dataset.goto); renderStep(); }));

  $("#save-draft").addEventListener("click", async () => {
    await persist(T.draftStatus(t));
    toast("Draft saved");
  });

  $("#submit-btn").addEventListener("click", async () => {
    const errs = T.validateAll(t);
    if (errs.length) {
      for (let s = 1; s <= T.TOTAL_STEPS; s++) {
        if (T.validateStep(t, s).length) { step = s; renderStep(); break; }
      }
      $("#validation-msg").textContent = errs[0];
      return;
    }
    t.submittedAt = new Date().toISOString();
    const status = T.nextStatusOnSubmit(t);
    const saved = await persist(status);
    toast(status === "Escalated" ? "Submitted — escalation triggered" : "Turnover submitted");
    navigate(`/turnover/${saved.id}`);
  });

  renderStep();
}

/* ============================================================================
   Markup
   ============================================================================ */

const STEP_SUBS = [
  "Confirm the shift being handed over and who was on duty.",
  "One row per plant configured for this property. Critical or Shutdown is flagged.",
  "Record the latest reading for each utility at this property.",
  "Incomplete activities the incoming shift continues. None is valid.",
  "Carried in from Incident Management and the Concerns Tracker as of shift end.",
  "Rooms out of order, out of service, or under repair.",
  "Observations for the incoming shift, plus supporting files."
];

function shell() {
  const rail = T.STEP_TITLES.map((title, i) => `
    <li data-step="${i + 1}">
      <button type="button" data-goto="${i + 1}">
        <span class="led"></span><span class="n">${i + 1}</span><span class="t">${esc(title)}</span>
      </button>
    </li>`).join("");

  return `
  <div class="compose">
    <aside class="rail">
      <ol id="rail">${rail}</ol>
      <div class="flagboard">
        <div class="flagboard-t">Flagged critical</div>
        <div class="flagboard-n" id="flag-count">0</div>
        <div class="flagboard-d">${esc(workflow().escalationTriggers.map((x) => x.label).join(" · "))}</div>
      </div>
    </aside>

    <section class="compose-main">
      <header class="compose-head">
        <div>
          <span class="eyebrow" id="step-eyebrow"></span>
          <h2 id="step-title"></h2>
          <p class="sub" id="step-sub"></p>
        </div>
        <div class="compose-actions">
          <span class="badge" id="compose-status"></span>
          <button type="button" class="btn" id="save-draft">Save draft</button>
        </div>
      </header>

      <form id="step-body" novalidate></form>

      <footer class="compose-nav">
        <p class="err" id="validation-msg" role="alert" aria-live="assertive"></p>
        <div class="compose-nav-btns">
          <button type="button" class="btn" id="back-btn">← Back</button>
          <button type="button" class="btn btn-primary" id="next-btn">Next →</button>
          <button type="button" class="btn btn-go" id="submit-btn" hidden>Submit turnover</button>
        </div>
      </footer>
    </section>
  </div>`;
}

function stepMarkup(step, t) {
  switch (step) {
    case 1: return step1(t);
    case 2: return step2(t);
    case 3: return step3(t);
    case 4: return step4(t);
    case 5: return step5(t);
    case 6: return step6(t);
    case 7: return step7(t);
    default: return "";
  }
}

function step1(t) {
  const prop = propertyById(t.meta.propertyId);
  const tagField = (key, label, note = "") => `
    <div class="tagfield">
      <span class="lbl">${esc(label)}${note ? ` <em>${esc(note)}</em>` : ""}</span>
      <div class="chips" data-tag-list="${key}"></div>
      <div class="tagadd">
        <select data-tag-select="${key}" aria-label="Add to ${esc(label)}">
          ${optionsHtml(T.rosterNames(t.meta.propertyId), "", "Add person…")}
        </select>
        <button type="button" class="btn btn-sm" data-tag-add="${key}">Add</button>
      </div>
    </div>`;

  return `
  <fieldset class="grid-2">
    <legend>Shift information</legend>
    <label class="field"><span class="lbl">Property <em>required</em></span>
      <select name="propertyId">${identity.properties().map((p) =>
        `<option value="${p.id}"${p.id === t.meta.propertyId ? " selected" : ""}>${esc(p.name)}</option>`).join("")}</select></label>
    <label class="field"><span class="lbl">Building <em>required</em></span>
      <select name="buildingId">${prop.buildings.map((b) =>
        `<option value="${b.id}"${b.id === t.meta.buildingId ? " selected" : ""}>${esc(b.name)}</option>`).join("")}</select></label>
    <label class="field"><span class="lbl">Department <em>required</em></span>
      <select name="departmentId">${prop.departments.map((d) =>
        `<option value="${d.id}"${d.id === t.meta.departmentId ? " selected" : ""}>${esc(d.name)}</option>`).join("")}</select></label>
    <label class="field"><span class="lbl">Shift name <em>required</em></span>
      <select name="shiftName">${enumOptions("shiftName", t.meta.shiftName)}</select></label>
    <label class="field"><span class="lbl">Date <em>required</em></span>
      <input type="date" name="date" value="${esc(t.meta.date)}"></label>
    <label class="field"><span class="lbl">Shift start <em>required</em></span>
      <input type="time" name="shiftStart" value="${esc(t.meta.shiftStart)}"></label>
    <label class="field"><span class="lbl">Shift end <em>required</em></span>
      <input type="time" name="shiftEnd" value="${esc(t.meta.shiftEnd)}"></label>
    <label class="field"><span class="lbl">Outgoing shift leader <em>required</em></span>
      <input type="text" value="${esc(userName(t.meta.outgoingLeaderId))}" readonly></label>
    <label class="field"><span class="lbl">Incoming shift leader <em>required</em></span>
      <select name="incomingLeaderId"><option value="">Select from roster…</option>
        ${prop.roster.filter((u) => u.id !== t.meta.outgoingLeaderId).map((u) =>
          `<option value="${u.id}"${u.id === t.meta.incomingLeaderId ? " selected" : ""}>${esc(u.name)} · ${esc(roleName(u.roleId))}</option>`).join("")}
      </select></label>
  </fieldset>

  <fieldset class="stack">
    <legend>Personnel handover</legend>
    ${tagField("present", "Personnel present", "required, min 1")}
    ${tagField("absent", "Personnel absent")}
    ${tagField("overtime", "Overtime personnel")}
    ${tagField("relief", "Relief personnel")}
    <div>
      <span class="lbl">Contractor presence</span>
      <div id="contractor-rows" class="rows"></div>
      <button type="button" class="btn btn-sm" id="add-contractor">+ Add contractor</button>
    </div>
  </fieldset>`;
}

function step2(t) {
  const rows = t.plants.map((p) => `
    <div class="panel${T.isEscalatingPlant(p.status) ? " flagged" : ""}" data-row="${p.rowId}">
      <span class="panel-name">
        <span class="led ${p.status ? "on-" + severityClassFor("plantStatus", p.status) : ""}"></span>
        ${p.custom
          ? `<input type="text" data-f="name" value="${esc(p.name)}" placeholder="Plant name">`
          : esc(p.name)}
      </span>
      <select data-f="status" aria-label="Status for ${esc(p.name || "new plant")}">
        ${enumOptions("plantStatus", p.status)}</select>
      <input type="text" data-f="remarks" placeholder="Remarks" value="${esc(p.remarks)}">
      ${p.custom ? `<button type="button" class="btn btn-danger row-x">Remove</button>` : ""}
    </div>`).join("");

  return `<div id="plant-rows" class="rows">${rows}</div>
    <button type="button" class="btn btn-sm" id="add-plant">+ Add plant</button>`;
}

function step3(t) {
  const rows = t.utilities.map((u) => `
    <div class="row" data-row="${u.rowId}">
      <div class="row-3">
        <span class="mono">${esc(u.name)} <span class="dim">(${esc(u.unit)})</span></span>
        <label class="field"><span class="lbl">Current reading <em>required</em></span>
          <input type="number" step="any" data-f="reading" value="${esc(u.reading)}"></label>
        <label class="field check"><input type="checkbox" data-f="abnormal"${u.abnormal ? " checked" : ""}>
          <span class="lbl">Abnormal consumption</span></label>
      </div>
      <div class="row-2">
        <label class="field"><span class="lbl">Significant changes</span>
          <input type="text" data-f="changes" value="${esc(u.changes)}"></label>
        <label class="field"><span class="lbl">Operational remarks</span>
          <input type="text" data-f="remarks" value="${esc(u.remarks)}"></label>
      </div>
    </div>`).join("");
  return `<div id="utility-rows" class="rows">${rows}</div>`;
}

function step4(t) {
  const rows = t.tasks.map((x) => `
    <div class="row${T.isCriticalTask(x.priority) ? " flagged" : ""}" data-row="${x.rowId}">
      <label class="field"><span class="lbl">Description <em>required</em></span>
        <input type="text" data-f="description" value="${esc(x.description)}"></label>
      <div class="row-3">
        <label class="field"><span class="lbl">Priority <em>required</em></span>
          <select data-f="priority">${enumOptions("taskPriority", x.priority)}</select></label>
        <label class="field"><span class="lbl">Assigned <em>required</em></span>
          <select data-f="assignedTo">${optionsHtml(T.rosterNames(t.meta.propertyId), x.assignedTo)}</select></label>
        <label class="field"><span class="lbl">Status <em>required</em></span>
          <select data-f="status">${enumOptions("taskStatus", x.status)}</select></label>
      </div>
      <div class="row-2">
        <label class="field"><span class="lbl">Expected completion</span>
          <input type="date" data-f="expectedCompletion" value="${esc(x.expectedCompletion)}"></label>
        <label class="field"><span class="lbl">Remarks</span>
          <input type="text" data-f="remarks" value="${esc(x.remarks)}"></label>
      </div>
      <button type="button" class="btn btn-danger row-x">Remove task</button>
    </div>`).join("");

  return `<div id="task-rows" class="rows">${rows || `<p class="hint">No outstanding tasks for this shift.</p>`}</div>
    <button type="button" class="btn btn-sm" id="add-task">+ Add task</button>`;
}

function step5(t) {
  const incidents = t.incidents.map((i) => `
    <div class="card${T.isEscalatingIncident(i.severity) ? " flagged" : ""}" data-row="${esc(i.id)}">
      <div class="card-top">
        <span class="led on-${severityClassFor("incidentSeverity", i.severity)}"></span>
        <span class="mono">${esc(i.id)}</span>
        <span class="pill text-${severityClassFor("incidentSeverity", i.severity)}">${esc(i.severity)}</span>
      </div>
      <p class="card-meta">${esc(i.category)} · <b>${esc(i.status)}</b> · Responsible: <b>${esc(i.engineer)}</b></p>
      <label class="field"><span class="lbl">Required action for next shift</span>
        <input type="text" data-f="requiredAction" value="${esc(i.requiredAction)}"></label>
    </div>`).join("");

  const concerns = t.concerns.map((c) => `
    <div class="card" data-row="${esc(c.id)}">
      <div class="card-top"><span class="mono">${esc(c.id)}</span></div>
      <p class="card-meta">${esc(c.category)} · <b>${esc(c.status)}</b></p>
      <label class="field"><span class="lbl">Notes for next shift</span>
        <input type="text" data-f="notes" value="${esc(c.notes)}"></label>
    </div>`).join("");

  return `
    <h3 class="sub-h">Active incidents</h3>
    <div id="incident-rows" class="rows">${incidents || `<p class="hint">No active incidents as of shift end.</p>`}</div>
    <h3 class="sub-h">Engineering concerns</h3>
    <div id="concern-rows" class="rows">${concerns || `<p class="hint">No unresolved concerns.</p>`}</div>`;
}

function step6(t) {
  const rows = t.rooms.map((r) => `
    <div class="row row-3" data-row="${r.rowId}">
      <label class="field"><span class="lbl">Room number <em>required</em></span>
        <input type="text" data-f="room" value="${esc(r.room)}"></label>
      <label class="field"><span class="lbl">Status <em>required</em></span>
        <select data-f="status">${enumOptions("roomStatus", r.status)}</select></label>
      <label class="field"><span class="lbl">Remarks</span>
        <input type="text" data-f="remarks" value="${esc(r.remarks)}"></label>
      <button type="button" class="btn btn-danger row-x">Remove</button>
    </div>`).join("");

  return `<div id="room-rows" class="rows">${rows || `<p class="hint">No rooms flagged this shift.</p>`}</div>
    <button type="button" class="btn btn-sm" id="add-room">+ Add room</button>`;
}

function step7(t) {
  const notes = t.notes.map((n) => `
    <div class="row" data-row="${n.rowId}">
      <label class="field"><span class="lbl">Note</span><textarea data-f="note">${esc(n.note)}</textarea></label>
      <div class="row-2">
        <label class="field"><span class="lbl">Category</span>
          <select data-f="category">${enumOptions("noteCategory", n.category)}</select></label>
        <button type="button" class="btn btn-danger row-x end">Remove note</button>
      </div>
    </div>`).join("");

  const att = CONFIG.attachments;
  const files = t.attachments.map((a) => `
    <div class="row row-3" data-row="${a.rowId}">
      <span class="mono sm">${esc(a.fileName)}<br><span class="dim">${a.sizeKb} KB</span></span>
      <label class="field"><span class="lbl">Type <em>required</em></span>
        <select data-f="type">${enumOptions("attachmentType", a.type)}</select></label>
      <label class="field"><span class="lbl">Caption</span>
        <input type="text" data-f="caption" value="${esc(a.caption)}"></label>
      <button type="button" class="btn btn-danger row-x">Remove</button>
    </div>`).join("");

  return `
    <h3 class="sub-h">Engineering notes</h3>
    <div id="note-rows" class="rows">${notes || `<p class="hint">No engineering notes recorded.</p>`}</div>
    <button type="button" class="btn btn-sm" id="add-note">+ Add note</button>

    <h3 class="sub-h">Attachments</h3>
    <label class="filedrop" for="attachment-input">
      <input type="file" id="attachment-input" multiple hidden accept="${esc(att.acceptedExtensions.join(","))}">
      <span>Choose files</span>
      <span class="dim sm">${esc(att.acceptedExtensions.map((e) => e.replace(".", "").toUpperCase()).join(", "))}
        · max ${att.maxFileSizeMb} MB each · max ${att.maxFiles} files</span>
    </label>
    <div id="attachment-rows" class="rows">${files}</div>`;
}
