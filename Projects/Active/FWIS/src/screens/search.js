/* ============================================================================
   Search
   ----------------------------------------------------------------------------
   Per FWIS_VISION, search is a core function, not an add-on: across equipment,
   building, property, room, plant, utility, incident, technician, department,
   date, status and keyword.

   Stage 0 searches locally stored records. Matching is term-AND across a
   flattened text projection of each record (see turnover.searchableText), with
   facets applied on top. Hits report which fields matched so a result is
   explainable rather than opaque.
   ============================================================================ */

import { CONFIG, propertyById, userName, workflow } from "../config.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import * as M from "../modules/model.js";
import { esc, statusBadge, optionsHtml, formatDate, emptyState } from "../ui.js";

const state = { q: "", propertyId: "", status: "", from: "", to: "", kind: "" };

export async function searchScreen(_params, view) {
  const records = await db.all({ type: T.TYPE });

  // Every operational module is searchable too — FWIS_VISION calls search a
  // core function across incidents, concerns, rooms and plant, not a turnover
  // feature. Each module already exposes a text projection, so this is a
  // gather rather than a per-module special case.
  const moduleHits = [];
  for (const mod of M.allModules()) {
    for (const r of await db.all({ type: mod.type })) moduleHits.push({ mod, record: r });
  }

  view.innerHTML = `
  <div class="search-screen">
    <header class="screen-head">
      <div><h2>Search</h2><p class="sub">Across every turnover stored on this device</p></div>
    </header>

    <form class="searchbar" id="searchbar" role="search">
      <input type="search" name="q" id="q" value="${esc(state.q)}" autocomplete="off"
             placeholder="Equipment, room, plant, technician, incident number, keyword…"
             aria-label="Search turnovers">
    </form>

    <form class="filters" id="facets">
      <label class="field"><span class="lbl">Property</span>
        <select name="propertyId"><option value="">All</option>
          ${CONFIG.properties.map((p) => `<option value="${p.id}"${p.id === state.propertyId ? " selected" : ""}>${esc(p.name)}</option>`).join("")}
        </select></label>
      <label class="field"><span class="lbl">Record type</span>
        <select name="kind"><option value="">All types</option>
          <option value="shift-turnover"${state.kind === "shift-turnover" ? " selected" : ""}>Shift Turnovers</option>
          ${M.allModules().map((m) => `<option value="${esc(m.type)}"${m.type === state.kind ? " selected" : ""}>${esc(m.plural)}</option>`).join("")}
        </select></label>
      <label class="field"><span class="lbl">Turnover status</span>
        <select name="status"><option value="">All</option>
          ${optionsHtml(workflow().states.map((s) => s.value), state.status, null)}
        </select></label>
      <label class="field"><span class="lbl">From</span>
        <input type="date" name="from" value="${esc(state.from)}"></label>
      <label class="field"><span class="lbl">To</span>
        <input type="date" name="to" value="${esc(state.to)}"></label>
      <button type="button" class="btn btn-sm" id="clear">Clear</button>
    </form>

    <div id="results" aria-live="polite"></div>
  </div>`;

  const results = view.querySelector("#results");
  const input = view.querySelector("#q");

  function run() {
    const hits = [...search(records), ...searchModules(moduleHits)];
    results.innerHTML = renderResults(hits, records.length + moduleHits.length);
    results.querySelectorAll("[data-goto]").forEach((el) => {
      const go = () => { location.hash = el.dataset.goto; };
      el.addEventListener("click", go);
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  }

  view.querySelector("#searchbar").addEventListener("submit", (e) => e.preventDefault());
  input.addEventListener("input", () => { state.q = input.value; run(); });

  view.querySelectorAll("#facets [name]").forEach((f) => {
    f.addEventListener("change", () => { state[f.name] = f.value; run(); });
  });

  view.querySelector("#clear").addEventListener("click", () => {
    state.q = ""; state.propertyId = ""; state.status = ""; state.from = ""; state.to = "";
    searchScreen(_params, view);
  });

  run();
  input.focus();
}

/* ---------------------------------------------------------------- search -- */

function terms() { return state.q.toLowerCase().split(/\s+/).filter(Boolean); }

function search(records) {
  if (state.kind && state.kind !== T.TYPE) return [];
  const t = terms();

  return records.filter((r) => {
    const d = r.data.meta.date;
    if (state.propertyId && r.propertyId !== state.propertyId) return false;
    if (state.status && r.status !== state.status) return false;
    if (state.from && d < state.from) return false;
    if (state.to && d > state.to) return false;
    if (!t.length) return true;

    const text = T.searchableText(r.data);
    return t.every((term) => text.includes(term));  // AND across terms
  }).map((r) => ({ kind: "turnover", record: r, matches: matchedFields(r.data, t) }));
}

function searchModules(entries) {
  const t = terms();
  return entries.filter(({ mod, record: r }) => {
    if (state.kind && state.kind !== mod.type) return false;
    if (state.propertyId && r.propertyId !== state.propertyId) return false;
    const d = r.data.date || "";
    if (state.from && d && d < state.from) return false;
    if (state.to && d && d > state.to) return false;
    if (!t.length) return true;
    const text = M.searchableText(mod, r);
    return t.every((term) => text.includes(term));
  }).map(({ mod, record }) => ({ kind: "module", mod, record }));
}

/** Names the fields a term hit, so the result explains itself. */
function matchedFields(t, terms) {
  if (!terms.length) return [];
  const fields = {
    Plant: t.plants.map((p) => `${p.name} ${p.status} ${p.remarks}`).join(" "),
    Utility: t.utilities.map((u) => `${u.name} ${u.changes} ${u.remarks}`).join(" "),
    Task: t.tasks.map((x) => `${x.description} ${x.assignedTo} ${x.remarks}`).join(" "),
    Incident: t.incidents.map((i) => `${i.id} ${i.category} ${i.engineer} ${i.requiredAction}`).join(" "),
    Concern: t.concerns.map((c) => `${c.id} ${c.category} ${c.notes}`).join(" "),
    Room: t.rooms.map((r) => `${r.room} ${r.status} ${r.remarks}`).join(" "),
    Note: t.notes.map((n) => `${n.note} ${n.category}`).join(" "),
    Attachment: t.attachments.map((a) => `${a.fileName} ${a.type} ${a.caption}`).join(" "),
    Personnel: [...t.personnel.present, ...t.personnel.absent].join(" ")
  };
  return Object.entries(fields)
    .filter(([, v]) => terms.some((term) => v.toLowerCase().includes(term)))
    .map(([k]) => k);
}

/* ---------------------------------------------------------------- render -- */

function renderResults(hits, total) {
  if (!total) {
    return emptyState("Nothing to search yet",
      "Search reads every record stored on this device — turnovers, incidents, concerns, availability, plant and utility logs. Create one first.",
      `<a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>`);
  }
  if (!hits.length) {
    return emptyState("No matches",
      "No record contains all of those terms. Try fewer words, or clear the filters.");
  }

  return `<p class="result-count">${hits.length} of ${total} record${total === 1 ? "" : "s"}</p>
  <div class="results">
    ${hits.map((hit) => hit.kind === "turnover" ? turnoverResult(hit) : moduleResult(hit)).join("")}
  </div>`;
}

function turnoverResult({ record: r, matches }) {
  const t = r.data;
  return `<div class="result" data-goto="/turnover/${esc(r.id)}" tabindex="0" role="link">
    <div class="result-main">
      <b>${esc(t.meta.shiftName)} · ${esc(propertyById(r.propertyId)?.name || "—")}</b>
      <span class="dim">${esc(formatDate(t.meta.date))}
        · ${esc(userName(t.meta.outgoingLeaderId))} → ${esc(userName(t.meta.incomingLeaderId)) || "—"}</span>
      ${matches.length ? `<p class="sm dim">Matched in ${esc(matches.join(", "))}</p>` : ""}
    </div>
    <div class="result-end"><span class="pill">Turnover</span>${statusBadge(r.status)}</div>
  </div>`;
}

function moduleResult({ mod, record: r }) {
  const title = r.data.title || r.data.description || mod.label;
  return `<div class="result" data-goto="/${esc(mod.route)}/${esc(r.id)}" tabindex="0" role="link">
    <div class="result-main">
      <b><span class="mono">${esc(r.data.ref || "—")}</span> · ${esc(String(title).slice(0, 80))}</b>
      <span class="dim">${esc(formatDate(r.data.date))} · ${esc(propertyById(r.propertyId)?.name || "—")}</span>
    </div>
    <div class="result-end"><span class="pill">${esc(mod.label)}</span>${statusBadge(r.status, mod.workflow)}</div>
  </div>`;
}
