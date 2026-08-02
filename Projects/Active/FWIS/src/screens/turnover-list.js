/* ============================================================================
   Screen C — Turnover List
   FWIS-SPEC-0003 v1.1 §Screens, Screen C. Index of records for a property,
   filterable by status and date, linking into Screen B.
   ============================================================================ */

import { propertyById, userName, workflow } from "../config.js";
import * as identity from "../identity.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import { esc, statusBadge, optionsHtml, formatDate, emptyState } from "../ui.js";

const filters = { propertyId: "", status: "", from: "", to: "" };

export async function listScreen(_params, view) {
  if (!filters.propertyId) filters.propertyId = identity.current().propertyId;

  const all = await db.all({ type: T.TYPE });
  const rows = all.filter(matches);

  view.innerHTML = `
  <div class="list-screen">
    <header class="screen-head">
      <div>
        <h2>Shift turnovers</h2>
        <p class="sub">${rows.length} of ${all.length} record${all.length === 1 ? "" : "s"}</p>
      </div>
      <a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>
    </header>

    <form class="filters" id="filters">
      <label class="field"><span class="lbl">Property</span>
        <select name="propertyId">
          <option value="">All properties</option>
          ${identity.properties().map((p) =>
            `<option value="${p.id}"${p.id === filters.propertyId ? " selected" : ""}>${esc(p.name)}</option>`).join("")}
        </select></label>
      <label class="field"><span class="lbl">Status</span>
        <select name="status">
          <option value="">All statuses</option>
          ${optionsHtml(workflow().states.map((s) => s.value), filters.status, null)}
        </select></label>
      <label class="field"><span class="lbl">From</span>
        <input type="date" name="from" value="${esc(filters.from)}"></label>
      <label class="field"><span class="lbl">To</span>
        <input type="date" name="to" value="${esc(filters.to)}"></label>
      <button type="button" class="btn btn-sm" id="clear-filters">Clear</button>
    </form>

    ${rows.length ? table(rows) : emptyState(
      all.length ? "No turnovers match these filters" : "No turnovers yet",
      all.length ? "Widen the date range or clear the status filter."
                 : "Create the first shift turnover to begin building the operational record.",
      all.length ? "" : `<a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>`)}
  </div>`;

  view.querySelectorAll("#filters [name]").forEach((input) => {
    input.addEventListener("change", () => {
      filters[input.name] = input.value;
      listScreen(_params, view);
    });
  });

  view.querySelector("#clear-filters").addEventListener("click", () => {
    filters.propertyId = ""; filters.status = ""; filters.from = ""; filters.to = "";
    listScreen(_params, view);
  });

  // Row activation via delegation rather than inline handlers, so the page
  // stays compatible with a strict Content-Security-Policy.
  const body = view.querySelector("tbody");
  if (body) {
    const open = (tr) => { if (tr?.dataset.id) location.hash = `/turnover/${tr.dataset.id}`; };
    body.addEventListener("click", (e) => open(e.target.closest("tr")));
    body.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(e.target.closest("tr")); }
    });
  }
}

function matches(r) {
  const d = r.data.meta.date;
  if (filters.propertyId && r.propertyId !== filters.propertyId) return false;
  if (filters.status && r.status !== filters.status) return false;
  if (filters.from && d < filters.from) return false;
  if (filters.to && d > filters.to) return false;
  return true;
}

function table(rows) {
  return `<table class="tbl tbl-linked">
    <thead><tr>
      <th>Date</th><th>Shift</th><th>Property</th><th>Outgoing → Incoming</th>
      <th>Flags</th><th>Status</th>
    </tr></thead>
    <tbody>
      ${rows.map((r) => {
        const t = r.data;
        const flags = T.flagCount(t);
        return `<tr data-id="${esc(r.id)}" tabindex="0" role="link"
                    aria-label="Open turnover ${esc(formatDate(t.meta.date))} ${esc(t.meta.shiftName)}">
          <td class="mono">${esc(formatDate(t.meta.date))}</td>
          <td>${esc(t.meta.shiftName)}</td>
          <td>${esc(propertyById(r.propertyId)?.name || "—")}</td>
          <td class="dim">${esc(userName(t.meta.outgoingLeaderId))} → ${esc(userName(t.meta.incomingLeaderId)) || "—"}</td>
          <td>${flags ? `<span class="pill text-red">${flags}</span>` : `<span class="dim">—</span>`}</td>
          <td>${statusBadge(r.status)}</td>
        </tr>`;
      }).join("")}
    </tbody>
  </table>`;
}
