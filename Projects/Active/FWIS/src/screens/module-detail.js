/* ============================================================================
   Generic module detail
   ----------------------------------------------------------------------------
   Read view for any module record, plus the lifecycle control.

   Only transitions declared on the current workflow state are offered.
   FBPOIS-WF-0000 specifies a state machine, and a UI that lets a user jump an
   incident straight from Reported to Closed has quietly replaced it with a
   dropdown.

   Every transition is recorded with who, when, from, to and why — FWIS-SPEC-0007
   §5 requires that audit trail, and every module inherits it here rather than
   implementing its own.
   ============================================================================ */

import * as M from "../modules/model.js";
import * as identity from "../identity.js";
import * as db from "../db.js";
import { esc, statusBadge, formatDate, formatDateTime, toast, emptyState, severityPill } from "../ui.js";
import { navigate, refresh } from "../router.js";
import { userName } from "../config.js";

export function moduleDetailScreen(routeId) {
  return async function screen(params, view) {
    const mod = M.moduleByRoute(routeId);
    if (!mod) { view.innerHTML = emptyState("Unknown module", `No module is routed at ${esc(routeId)}.`); return; }

    const record = await db.get(params.id);
    if (!record) {
      view.innerHTML = `<div class="error-state"><h2>${esc(mod.label)} not found</h2>
        <p>It may have been deleted.</p>
        <p><a class="btn" href="#/${esc(mod.route)}">Back to ${esc(mod.plural.toLowerCase())}</a></p></div>`;
      return;
    }

    const me = identity.current();
    const fields = M.visibleFields(mod, record.status);
    const next = M.allowedTransitions(mod, record.status);
    const terminal = next.length === 0;

    view.innerHTML = `
    <header class="screen-head">
      <div>
        <h2><span class="mono">${esc(record.data.ref || "—")}</span></h2>
        <p class="sub">${esc(mod.label)} · ${esc(mod.spec)} · ${statusBadge(record.status, mod.workflow)}</p>
      </div>
      <div class="head-actions">
        <a class="btn" href="#/${esc(mod.route)}">Back</a>
        ${terminal ? "" : `<a class="btn" href="#/${esc(mod.route)}/${esc(record.id)}/edit">Edit</a>`}
      </div>
    </header>

    <section class="detail-sec">
      <h3>Details</h3>
      <dl class="kv">
        ${fields.map((f) => {
          const v = M.displayValue(mod, f, record.data, record.propertyId);
          const shown = f.type === "date" ? formatDate(record.data[f.id]) : v;
          return `<div><dt>${esc(f.label)}</dt><dd>${
            !shown ? `<span class="dim">—</span>`
            : (f.type === "enum" && f.enumName === mod.severityEnum)
              ? severityPill(f.enumName, record.data[f.id])
              : esc(shown)
          }</dd></div>`;
        }).join("")}
      </dl>
    </section>

    ${terminal ? `<section class="detail-sec">
        <h3>Lifecycle</h3>
        <p class="hint">This ${esc(mod.label.toLowerCase())} is ${esc(record.status.toLowerCase())} and has no further transitions.</p>
      </section>`
      : `<section class="detail-sec acceptance">
        <h3>Advance this ${esc(mod.label.toLowerCase())}</h3>
        <p class="sub sm">From <b>${esc(record.status)}</b>, the workflow permits ${next.length === 1 ? "one transition" : `${next.length} transitions`}.</p>
        <form id="transition">
          <label class="field"><span class="lbl">Move to <em>required</em></span>
            <select name="to">
              <option value="">Select…</option>
              ${next.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("")}
            </select></label>
          <label class="field span-2"><span class="lbl">Comment</span>
            <textarea name="comment" rows="2" placeholder="Why is it moving?"></textarea></label>
          <p class="form-error" id="t-error" hidden></p>
          <button class="btn btn-primary" type="submit">Apply</button>
        </form>
      </section>`}

    <section class="detail-sec">
      <h3>History</h3>
      ${historyHtml(record)}
    </section>`;

    const form = view.querySelector("#transition");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = view.querySelector("#t-error");
      const to = form.to.value;
      if (!to) { err.hidden = false; err.textContent = "Choose a status to move to."; return; }

      // Required fields can appear on a later state, so entering that state
      // must not be possible while they are blank.
      const missing = M.validate(mod, record.data, to);
      if (missing.length) {
        err.hidden = false;
        err.textContent = `${to} requires: ${missing.join(", ")}. Edit the record first.`;
        return;
      }

      try {
        await db.save(M.applyTransition(record, mod, to, me.userId, form.comment.value), me.userId);
        toast(`${record.data.ref} → ${to}`);
        refresh();
      } catch (ex) {
        err.hidden = false;
        err.textContent = ex.message;
      }
    });
  };
}

function historyHtml(record) {
  const h = record.data.history || [];
  if (!h.length) return `<p class="hint">Created, with no status changes yet.</p>`;
  return `<div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>When</th><th>Who</th><th>From</th><th>To</th><th>Comment</th></tr></thead>
    <tbody>${h.slice().reverse().map((e) => `<tr>
      <td class="dim sm">${esc(formatDateTime(e.at))}</td>
      <td>${esc(userName(e.by) || e.by)}</td>
      <td class="dim">${esc(e.from)}</td>
      <td><b>${esc(e.to)}</b></td>
      <td>${e.comment ? esc(e.comment) : `<span class="dim">—</span>`}</td>
    </tr>`).join("")}</tbody></table></div>`;
}
