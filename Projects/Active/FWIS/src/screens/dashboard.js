/* ============================================================================
   Dashboard — the Chief Engineer's landing screen
   ----------------------------------------------------------------------------
   Per FWIS_VISION, this must answer five questions without opening another
   application: what happened, what is happening, what needs attention, what is
   overdue, what needs escalation. Each block below answers one of them.

   Stage 0 derives everything from locally stored records. Nothing is fabricated
   — an empty vault shows an empty dashboard, not placeholder numbers.
   ============================================================================ */

import { CONFIG, propertyById, userName, severityClassFor } from "../config.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import { esc, statusBadge, formatDate, relativeDays, emptyState } from "../ui.js";

export async function dashboardScreen(_params, view) {
  const propertyId = CONFIG.session.propertyId;
  const prop = propertyById(propertyId);
  const records = await db.all({ type: T.TYPE, propertyId });

  if (!records.length) {
    view.innerHTML = `
      <header class="screen-head">
        <div><h2>Dashboard</h2><p class="sub">${esc(prop.name)}</p></div>
      </header>
      ${emptyState(
        "Nothing recorded yet",
        "The dashboard summarises real turnover records. Create the first one and it will populate.",
        `<a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>`)}`;
    return;
  }

  const open = records.filter((r) => T.isOpen(r.status));
  const attention = records.filter((r) => T.needsAttention(r.status));
  const escalated = records.filter((r) => T.requiresEscalation(r.data) && T.isOpen(r.status));
  const week = records.filter((r) => (relativeDays(r.data.meta.date) ?? 99) <= 7);

  view.innerHTML = `
  <header class="screen-head">
    <div>
      <h2>Dashboard</h2>
      <p class="sub">${esc(prop.name)} · ${records.length} turnover${records.length === 1 ? "" : "s"} on this device</p>
    </div>
    <a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>
  </header>

  <section class="kpis" aria-label="Key figures">
    ${kpi("Turnovers this week", week.length, "neutral")}
    ${kpi("Needs attention", attention.length, attention.length ? "amber" : "green")}
    ${kpi("Escalated", escalated.length, escalated.length ? "red" : "green")}
    ${kpi("Open tasks", openTasks(open).length, "neutral")}
  </section>

  <div class="dash-grid">
    ${block("Needs attention", "What needs action now",
      attention.length
        ? attention.map((r) => attentionRow(r)).join("")
        : `<p class="hint">Nothing awaiting acceptance or escalated.</p>`)}

    ${block("Plant status", "Latest reported condition per plant",
      plantTable(records, prop))}

    ${block("Outstanding tasks", "Carried across open turnovers",
      taskTable(open))}

    ${block("Recent turnovers", "What happened",
      records.slice(0, 6).map((r) => recentRow(r)).join(""))}
  </div>`;

  view.querySelectorAll("[data-goto-id]").forEach((el) => {
    el.addEventListener("click", () => { location.hash = `/turnover/${el.dataset.gotoId}`; });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); location.hash = `/turnover/${el.dataset.gotoId}`; }
    });
  });
}

/* ------------------------------------------------------------------ bits -- */

function kpi(label, value, tone) {
  return `<div class="kpi">
    <span class="kpi-n text-${tone === "neutral" ? "grey" : tone}">${value}</span>
    <span class="kpi-l">${esc(label)}</span>
  </div>`;
}

function block(title, sub, body) {
  return `<section class="dash-block">
    <header><h3>${esc(title)}</h3><p class="sub sm">${esc(sub)}</p></header>
    ${body}
  </section>`;
}

function attentionRow(r) {
  const t = r.data;
  const met = T.metEscalationTriggers(t);
  const age = relativeDays(t.meta.date);
  return `<div class="dash-row" data-goto-id="${esc(r.id)}" tabindex="0" role="link">
    <div>
      <b>${esc(t.meta.shiftName)}</b>
      <span class="dim">${esc(formatDate(t.meta.date))}${age > 0 ? ` · ${age}d ago` : ""}</span>
      ${met.length ? `<p class="sm text-red">${esc(met.map((x) => x.label).join(" · "))}</p>` : ""}
    </div>
    ${statusBadge(r.status)}
  </div>`;
}

function recentRow(r) {
  const t = r.data;
  const flags = T.flagCount(t);
  return `<div class="dash-row" data-goto-id="${esc(r.id)}" tabindex="0" role="link">
    <div>
      <b>${esc(t.meta.shiftName)}</b>
      <span class="dim">${esc(formatDate(t.meta.date))} · ${esc(userName(t.meta.outgoingLeaderId))}</span>
    </div>
    <div class="dash-row-end">
      ${flags ? `<span class="pill text-red">${flags}</span>` : ""}
      ${statusBadge(r.status)}
    </div>
  </div>`;
}

/** Most recent reported status per plant, across all turnovers. */
function plantTable(records, prop) {
  const latest = new Map();
  // records are newest-first; first write wins.
  for (const r of records) {
    for (const p of r.data.plants) {
      if (p.status && !latest.has(p.name)) {
        latest.set(p.name, { status: p.status, date: r.data.meta.date, remarks: p.remarks });
      }
    }
  }
  if (!latest.size) return `<p class="hint">No plant status reported yet.</p>`;

  const rows = [...latest.entries()]
    .sort((a, b) => rank(b[1].status) - rank(a[1].status))
    .map(([name, v]) => `<tr${T.isEscalatingPlant(v.status) ? ' class="flagged"' : ""}>
      <td class="mono">${esc(name)}</td>
      <td><span class="led on-${severityClassFor("plantStatus", v.status)}"></span> ${esc(v.status)}</td>
      <td class="dim sm">${esc(formatDate(v.date))}</td>
    </tr>`).join("");

  return `<table class="tbl"><thead><tr><th>Plant</th><th>Status</th><th>As of</th></tr></thead>
    <tbody>${rows}</tbody></table>`;
}

function rank(status) {
  return { Shutdown: 4, Critical: 4, Warning: 3, Maintenance: 2, Normal: 1 }[status] || 0;
}

function openTasks(openRecords) {
  return openRecords.flatMap((r) =>
    r.data.tasks
      .filter((x) => x.status !== "Completed")
      .map((x) => ({ ...x, recordId: r.id, date: r.data.meta.date })));
}

function taskTable(openRecords) {
  const tasks = openTasks(openRecords)
    .sort((a, b) => rankPriority(b.priority) - rankPriority(a.priority));
  if (!tasks.length) return `<p class="hint">No outstanding tasks on open turnovers.</p>`;

  return `<table class="tbl"><thead><tr><th>Task</th><th>Priority</th><th>Assigned</th><th>Due</th></tr></thead>
    <tbody>${tasks.slice(0, 8).map((x) => {
      const overdue = x.expectedCompletion && x.expectedCompletion < new Date().toISOString().slice(0, 10);
      return `<tr${T.isCriticalTask(x.priority) ? ' class="flagged"' : ""}>
        <td>${esc(x.description)}</td>
        <td><span class="pill text-${severityClassFor("taskPriority", x.priority)}">${esc(x.priority)}</span></td>
        <td class="dim">${esc(x.assignedTo)}</td>
        <td class="${overdue ? "text-red" : "dim"}">${esc(formatDate(x.expectedCompletion)) || "—"}${overdue ? " · overdue" : ""}</td>
      </tr>`;
    }).join("")}</tbody></table>`;
}

function rankPriority(p) {
  return { Critical: 4, High: 3, Medium: 2, Low: 1 }[p] || 0;
}
