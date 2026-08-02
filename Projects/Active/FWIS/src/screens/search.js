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
import { esc, statusBadge, optionsHtml, formatDate, emptyState } from "../ui.js";

const state = { q: "", propertyId: "", status: "", from: "", to: "" };

export async function searchScreen(_params, view) {
  const records = await db.all({ type: T.TYPE });

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
      <label class="field"><span class="lbl">Status</span>
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
    const hits = search(records);
    results.innerHTML = renderResults(hits, records.length);
    results.querySelectorAll("[data-goto-id]").forEach((el) => {
      el.addEventListener("click", () => { location.hash = `/turnover/${el.dataset.gotoId}`; });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); location.hash = `/turnover/${el.dataset.gotoId}`; }
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

function search(records) {
  const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);

  return records.filter((r) => {
    const d = r.data.meta.date;
    if (state.propertyId && r.propertyId !== state.propertyId) return false;
    if (state.status && r.status !== state.status) return false;
    if (state.from && d < state.from) return false;
    if (state.to && d > state.to) return false;
    if (!terms.length) return true;

    const text = T.searchableText(r.data);
    return terms.every((term) => text.includes(term));  // AND across terms
  }).map((r) => ({ record: r, matches: matchedFields(r.data, terms) }));
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
      "Search reads the turnovers stored on this device. Create one first.",
      `<a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>`);
  }
  if (!hits.length) {
    return emptyState("No matches",
      "No turnover contains all of those terms. Try fewer words, or clear the filters.");
  }

  return `<p class="result-count">${hits.length} of ${total} turnover${total === 1 ? "" : "s"}</p>
  <div class="results">
    ${hits.map(({ record: r, matches }) => {
      const t = r.data;
      return `<div class="result" data-goto-id="${esc(r.id)}" tabindex="0" role="link">
        <div class="result-main">
          <b>${esc(t.meta.shiftName)} · ${esc(propertyById(r.propertyId)?.name || "—")}</b>
          <span class="dim">${esc(formatDate(t.meta.date))}
            · ${esc(userName(t.meta.outgoingLeaderId))} → ${esc(userName(t.meta.incomingLeaderId)) || "—"}</span>
          ${matches.length ? `<p class="sm dim">Matched in ${esc(matches.join(", "))}</p>` : ""}
        </div>
        ${statusBadge(r.status)}
      </div>`;
    }).join("")}
  </div>`;
}
