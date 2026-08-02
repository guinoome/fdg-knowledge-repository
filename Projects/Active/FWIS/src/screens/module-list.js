/* ============================================================================
   Generic module list
   ----------------------------------------------------------------------------
   Renders the index for any module declared in config.modules. Columns come
   from the declaration, so Incident Management and the Concerns Tracker share
   this file rather than each owning a near-identical copy of it.
   ============================================================================ */

import * as M from "../modules/model.js";
import * as identity from "../identity.js";
import { esc, statusBadge, optionsHtml, formatDate, emptyState, severityPill } from "../ui.js";

const filters = {};   // per module: { status, q }

export function moduleListScreen(routeId) {
  return async function screen(_params, view) {
    const mod = M.moduleByRoute(routeId);
    if (!mod) { view.innerHTML = emptyState("Unknown module", `No module is routed at ${esc(routeId)}.`); return; }

    const propertyId = identity.current().propertyId;
    const f = filters[mod.id] || (filters[mod.id] = { status: "", q: "" });
    const all = await M.list(mod, propertyId);
    const rows = all.filter((r) => matches(mod, r, f));

    view.innerHTML = `
    <header class="screen-head">
      <div>
        <h2>${esc(mod.plural)}</h2>
        <p class="sub">${esc(mod.spec)} · ${all.length} record${all.length === 1 ? "" : "s"}</p>
      </div>
      <a class="btn btn-primary" href="#/${esc(mod.route)}/new">+ New ${esc(mod.label.toLowerCase())}</a>
    </header>

    <form class="filters" id="filters">
      <label class="field"><span class="lbl">Status</span>
        <select name="status">
          <option value="">All statuses</option>
          ${optionsHtml(M.flowOf(mod).states.map((s) => s.value), f.status, null)}
        </select></label>
      <label class="field"><span class="lbl">Search</span>
        <input name="q" type="search" value="${esc(f.q)}" placeholder="Reference, description…"></label>
    </form>

    ${rows.length ? table(mod, rows, propertyId) : emptyState(
      all.length ? "No matches" : `No ${esc(mod.plural.toLowerCase())} yet`,
      all.length
        ? "No record matches these filters."
        : `Nothing has been recorded for this property.`,
      all.length ? "" : `<a class="btn btn-primary" href="#/${esc(mod.route)}/new">+ New ${esc(mod.label.toLowerCase())}</a>`)}`;

    const form = view.querySelector("#filters");
    form?.addEventListener("input", () => {
      f.status = form.status.value;
      f.q = form.q.value;
      screen(_params, view);
    });

    view.querySelectorAll("[data-id]").forEach((tr) => {
      const go = () => { location.hash = `/${mod.route}/${tr.dataset.id}`; };
      tr.addEventListener("click", go);
      tr.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
    });
  };
}

function matches(mod, r, f) {
  if (f.status && r.status !== f.status) return false;
  if (f.q && !M.searchableText(mod, r).includes(f.q.toLowerCase())) return false;
  return true;
}

function table(mod, rows, propertyId) {
  const head = mod.listColumns.map((c) => `<th>${esc(columnLabel(mod, c))}</th>`).join("");
  const body = rows.map((r) => `
    <tr data-id="${esc(r.id)}" tabindex="0" role="link">
      ${mod.listColumns.map((c) => `<td>${cell(mod, c, r, propertyId)}</td>`).join("")}
    </tr>`).join("");
  return `<div class="tbl-wrap"><table class="tbl tbl-linked">
    <thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function columnLabel(mod, col) {
  if (col === "ref") return "Reference";
  if (col === "status") return "Status";
  return mod.fields.find((f) => f.id === col)?.label || col;
}

function cell(mod, col, r, propertyId) {
  if (col === "ref") return `<span class="mono">${esc(r.data.ref || "—")}</span>`;
  if (col === "status") return statusBadge(r.status, mod.workflow);

  const field = mod.fields.find((f) => f.id === col);
  if (!field) return "";
  const value = M.displayValue(mod, field, r.data, propertyId);
  if (!value) return `<span class="dim">—</span>`;
  if (field.type === "date") return esc(formatDate(r.data[col]));
  if (field.type === "enum" && field.enumName === mod.severityEnum) {
    return severityPill(field.enumName, r.data[col]);
  }
  return esc(value);
}
