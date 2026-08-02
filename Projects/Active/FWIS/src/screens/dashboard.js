/* ============================================================================
   Engineering Dashboard — FWIS-SPEC-0002
   ----------------------------------------------------------------------------
   The Chief Engineer's operational command centre. FWIS_VISION requires it to
   answer five questions without opening another application: what happened,
   what is happening, what needs attention, what is overdue, what needs
   escalation.

   SPEC-0002 §Scope is the constraint that shapes this whole file:

       "The dashboard is a presentation layer only. It retrieves information
        from other FWIS modules but does not own operational data."

   Most of those modules are unbuilt. So every panel declares its source, and a
   panel with no module behind it says exactly that — naming the specification
   it waits for. A dashboard that invented plausible numbers for eight unbuilt
   modules would look finished and be worthless, which is the specific failure
   this file refuses.

   Panels appear in config.dashboard.widgetOrder (§Personalization), and each
   is gated by role level (§Permissions).
   ============================================================================ */

import { CONFIG, propertyById, userName, severityClassFor, roleName } from "../config.js";
import * as identity from "../identity.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import * as intake from "../intake/engine.js";
import { esc, statusBadge, formatDate, relativeDays, emptyState } from "../ui.js";

export async function dashboardScreen(_params, view) {
  const me = identity.current();
  const propertyId = me.propertyId;
  const prop = propertyById(propertyId);

  if (!prop) {
    view.innerHTML = emptyState("No property",
      "This account is not a member of any property, so there is nothing to show. Ask an administrator for access.");
    return;
  }

  const records = await db.all({ type: T.TYPE, propertyId });
  const queue = await intake.queue(propertyId).catch(() => []);

  const ctx = {
    me, prop, records, queue,
    level: identity.roleLevel(),
    open: records.filter((r) => T.isOpen(r.status)),
    attention: records.filter((r) => T.needsAttention(r.status)),
    escalated: records.filter((r) => T.requiresEscalation(r.data) && T.isOpen(r.status)),
    plants: latestPlantStatus(records),
    utilities: latestUtilities(records),
    tasks: openTasks(records.filter((r) => T.isOpen(r.status)))
  };

  const panels = {
    kpis: () => kpiPanel(ctx),
    attention: () => attentionPanel(ctx),
    plants: () => plantPanel(ctx),
    utilities: () => utilityPanel(ctx),
    assignments: () => assignmentPanel(ctx),
    concerns: () => concernPanel(ctx),
    incidents: () => incidentPanel(ctx),
    rooms: () => roomPanel(ctx),
    turnovers: () => turnoverPanel(ctx),
    announcements: () => announcementPanel(ctx),
    weather: () => weatherPanel(ctx),
    quickActions: () => quickActionPanel(ctx)
  };

  // KPIs span the full width; everything else flows in the grid. Order comes
  // from config so reordering the dashboard is not a code change.
  const order = CONFIG.dashboard.widgetOrder;
  view.innerHTML = `
  ${contextBar(ctx)}
  ${order.includes("kpis") ? panels.kpis() : ""}
  <div class="dash-grid">
    ${order.filter((id) => id !== "kpis").map((id) => panels[id]?.() || "").join("")}
  </div>`;

  wireNavigation(view);
  wirePropertySwitch(view);
}

/* ------------------------------------------------------- 1. context bar -- */
/* SPEC-0002 §Layout: Property | Date | Shift | User. §1 requires that users
   only see authorised properties — identity.properties() is already exactly
   that set, so this control cannot offer a tenant the database would refuse. */

function contextBar(ctx) {
  const options = identity.properties();
  const today = new Date();
  const shift = currentShift();

  return `
  <header class="screen-head">
    <div>
      <h2>Engineering Dashboard</h2>
      <p class="sub">
        ${options.length > 1
          ? `<select id="dash-property" class="inline-select" aria-label="Property">
               ${options.map((p) => `<option value="${esc(p.id)}"${p.id === ctx.prop.id ? " selected" : ""}>${esc(p.name)}</option>`).join("")}
             </select>`
          : esc(ctx.prop.name)}
        · ${esc(formatDate(today.toISOString().slice(0, 10)))}
        · ${esc(shift)}
        · ${esc(identity.displayName())}${ctx.me.roleId ? ` <span class="pill">${esc(roleName(ctx.me.roleId))}</span>` : ""}
      </p>
    </div>
    <a class="btn btn-primary" href="#/turnover/new">+ New turnover</a>
  </header>`;
}

/** Which configured shift covers the current time. Reads the shift table from
 *  config, including the night shift that wraps past midnight. */
export function currentShift(now = new Date()) {
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const found = CONFIG.enums.shiftName.find((s) => {
    const { defaultStart: a, defaultEnd: b } = s;
    return a < b ? hhmm >= a && hhmm < b : hhmm >= a || hhmm < b;
  });
  return found?.value || CONFIG.enums.shiftName[0].value;
}

/* -------------------------------------------------------------- 2. KPIs -- */
/* §2: configurable metrics, each supporting drill-down. A KPI whose module is
   unbuilt shows a dash rather than a zero — "none" and "not measured" are
   different answers and conflating them is how a dashboard lies. */

function kpiPanel(ctx) {
  const availability = plantAvailability(ctx);
  const cards = [
    kpi("Active tasks", ctx.tasks.length, ctx.tasks.length ? "amber" : "green", "#/turnovers"),
    kpi("Needs attention", ctx.attention.length, ctx.attention.length ? "amber" : "green", "#/turnovers"),
    kpi("Escalated", ctx.escalated.length, ctx.escalated.length ? "red" : "green", "#/turnovers"),
    kpi("Open concerns", countFixture("concerns", ctx.prop.id), "neutral"),
    kpi("Critical incidents", criticalIncidents(ctx.prop.id), criticalIncidents(ctx.prop.id) ? "red" : "green"),
    kpi("Intake queue", ctx.queue.length, ctx.queue.length ? "amber" : "green"),
    availability === null
      ? kpiUnmeasured("Plant availability")
      : kpi("Plant availability", `${availability}%`, availability < 100 ? "amber" : "green"),
    kpiUnmeasured("OOO rooms"),
    kpiUnmeasured("OOS rooms")
  ];
  return `<section class="kpis" aria-label="Key figures">${cards.join("")}</section>`;
}

function kpi(label, value, tone, href = "") {
  const inner = `<span class="kpi-n text-${tone === "neutral" ? "grey" : tone}">${esc(String(value))}</span>
    <span class="kpi-l">${esc(label)}</span>`;
  return href
    ? `<a class="kpi kpi-link" href="${esc(href)}">${inner}</a>`
    : `<div class="kpi">${inner}</div>`;
}

/** A metric with no module behind it. Distinct from zero, and it says why. */
function kpiUnmeasured(label) {
  return `<div class="kpi kpi-muted" title="No source module yet">
    <span class="kpi-n text-grey">—</span>
    <span class="kpi-l">${esc(label)}</span>
    <span class="kpi-note">not measured</span>
  </div>`;
}

/** Percentage of configured plants not reported Critical or Shutdown. Null
 *  when nothing has been reported — an unreported plant is unknown, not
 *  healthy, and averaging unknowns into 100% would be the most dangerous
 *  number on the screen. */
export function plantAvailability(ctx) {
  const reported = [...ctx.plants.values()];
  if (!reported.length) return null;
  const bad = reported.filter((p) => CONFIG.dashboard.plantUnavailableStatuses.includes(p.status)).length;
  return Math.round(((reported.length - bad) / reported.length) * 100);
}

/* --------------------------------------------------------- 3. attention -- */

function attentionPanel(ctx) {
  if (!ctx.records.length) {
    return block("Needs attention", "What needs action now", CONFIG.dashboard.modules["shift-turnover"],
      `<p class="hint">No turnover records on this device yet. <a href="#/turnover/new">Create the first one</a>.</p>`);
  }
  return block("Needs attention", "What needs action now", CONFIG.dashboard.modules["shift-turnover"],
    ctx.attention.length
      ? ctx.attention.map(attentionRow).join("")
      : `<p class="hint">Nothing awaiting acceptance or escalated.</p>`);
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

/* ------------------------------------------------------ 4. plant status -- */
/* §3. Every configured plant is listed, including ones never reported, because
   a plant missing from the table reads as "fine" when it means "unknown". */

function plantPanel(ctx) {
  const rows = ctx.prop.plants.map((p) => {
    const v = ctx.plants.get(p.name);
    if (!v) {
      return `<tr class="muted"><td class="mono">${esc(p.name)}</td>
        <td><span class="led"></span> <span class="dim">Not reported</span></td>
        <td class="dim sm">—</td></tr>`;
    }
    return `<tr${T.isEscalatingPlant(v.status) ? ' class="flagged"' : ""}>
      <td class="mono">${esc(p.name)}</td>
      <td><span class="led on-${severityClassFor("plantStatus", v.status)}"></span> ${esc(v.status)}</td>
      <td class="dim sm">${esc(formatDate(v.date))}</td>
    </tr>`;
  }).join("");

  return block("Plant operations", "Latest reported condition per plant",
    CONFIG.dashboard.modules["plant-operations"],
    `<table class="tbl"><thead><tr><th>Plant</th><th>Status</th><th>As of</th></tr></thead>
      <tbody>${rows}</tbody></table>
     <p class="hint sm">Status is carried from shift turnovers. Live plant telemetry arrives with FWIS-SPEC-0012.</p>`,
    { wide: true });
}

/* --------------------------------------------------------- 5. utilities -- */
/* §4 wants current reading, daily and monthly consumption, cost and budget.
   Turnovers carry a reading only, so the rest are absent rather than derived
   from one data point. */

function utilityPanel(ctx) {
  const rows = ctx.prop.utilities.map((u) => {
    const v = ctx.utilities.get(u.name);
    return `<tr${v?.abnormal ? ' class="flagged"' : ""}>
      <td class="mono">${esc(u.name)}</td>
      <td>${v?.reading ? `${esc(String(v.reading))} <span class="dim">${esc(u.unit)}</span>` : `<span class="dim">Not reported</span>`}</td>
      <td class="dim sm">${v ? esc(formatDate(v.date)) : "—"}</td>
      <td class="dim sm">—</td>
      <td class="dim sm">—</td>
    </tr>`;
  }).join("");

  return block("Utilities monitoring", "Latest reading per utility",
    CONFIG.dashboard.modules["utilities-monitoring"],
    `<table class="tbl">
       <thead><tr><th>Utility</th><th>Reading</th><th>As of</th><th>Daily</th><th>Cost</th></tr></thead>
       <tbody>${rows}</tbody></table>
     <p class="hint sm">Consumption, cost and budget utilisation need metered history — FWIS-SPEC-0011. A single turnover reading cannot produce them.</p>`,
    { wide: true });
}

/* ------------------------------------------------------- 6. assignments -- */
/* §5. Tasks live on turnovers until Daily Operations exists. */

function assignmentPanel(ctx) {
  if (!ctx.tasks.length) {
    return block("Engineering assignments", "Open tasks carried across turnovers",
      CONFIG.dashboard.modules["daily-operations"],
      `<p class="hint">No outstanding tasks on open turnovers.</p>`);
  }
  const rows = ctx.tasks
    .sort((a, b) => rankPriority(b.priority) - rankPriority(a.priority))
    .slice(0, 8)
    .map((x) => {
      const overdue = x.expectedCompletion && x.expectedCompletion < new Date().toISOString().slice(0, 10);
      return `<tr${T.isCriticalTask(x.priority) ? ' class="flagged"' : ""} data-goto-id="${esc(x.recordId)}" tabindex="0" role="link">
        <td>${esc(x.description)}</td>
        <td><span class="pill text-${severityClassFor("taskPriority", x.priority)}">${esc(x.priority)}</span></td>
        <td class="dim">${esc(x.assignedTo)}</td>
        <td class="${overdue ? "text-red" : "dim"}">${esc(formatDate(x.expectedCompletion)) || "—"}${overdue ? " · overdue" : ""}</td>
      </tr>`;
    }).join("");

  return block("Engineering assignments", "Open tasks carried across turnovers",
    CONFIG.dashboard.modules["daily-operations"],
    `<table class="tbl"><thead><tr><th>Task</th><th>Priority</th><th>Assigned</th><th>Due</th></tr></thead>
      <tbody>${rows}</tbody></table>`, { wide: true });
}

/* ---------------------------------------------------------- 7. concerns -- */

function concernPanel(ctx) {
  const list = CONFIG.mockFeeds.concerns[ctx.prop.id] || [];
  return block("Concerns", "Open items awaiting resolution",
    CONFIG.dashboard.modules["concerns-tracker"],
    list.length
      ? `<table class="tbl"><thead><tr><th>Reference</th><th>Category</th><th>Status</th></tr></thead>
          <tbody>${list.map((c) => `<tr>
            <td class="mono">${esc(c.id)}</td><td>${esc(c.category)}</td><td>${esc(c.status)}</td>
          </tr>`).join("")}</tbody></table>`
      : `<p class="hint">No open concerns for this property.</p>`);
}

/* --------------------------------------------------------- 8. incidents -- */

function incidentPanel(ctx) {
  const list = CONFIG.mockFeeds.incidents[ctx.prop.id] || [];
  return block("Recent incidents", "Active and monitored events",
    CONFIG.dashboard.modules["incident-management"],
    list.length
      ? `<table class="tbl"><thead><tr><th>Reference</th><th>Category</th><th>Severity</th><th>Status</th><th>Engineer</th></tr></thead>
          <tbody>${list.map((i) => `<tr${T.isEscalatingIncident(i.severity) ? ' class="flagged"' : ""}>
            <td class="mono">${esc(i.id)}</td>
            <td>${esc(i.category)}</td>
            <td><span class="pill text-${severityClassFor("incidentSeverity", i.severity) || "grey"}">${esc(i.severity)}</span></td>
            <td>${esc(i.status)}</td>
            <td class="dim">${esc(i.engineer)}</td>
          </tr>`).join("")}</tbody></table>`
      : `<p class="hint">No incidents recorded for this property.</p>`, { wide: true });
}

/* ------------------------------------------------------------- 9. rooms -- */

function roomPanel() {
  return block("Room engineering status", "OOO, OOS, under repair, inspection required",
    CONFIG.dashboard.modules["room-status"],
    pending("FWIS-SPEC-0008 — OOO &amp; OOS Management",
      "Room status is not derivable from turnovers: a turnover records the rooms touched during one shift, not the standing state of every room."));
}

/* --------------------------------------------------------- 10. turnover -- */

function turnoverPanel(ctx) {
  const recent = ctx.records.slice(0, CONFIG.dashboard.recentLimit);
  return block("Shift turnover", "Most recent handovers",
    CONFIG.dashboard.modules["shift-turnover"],
    recent.length
      ? recent.map((r) => {
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
        }).join("")
      : `<p class="hint">No turnovers yet.</p>`);
}

/* ---------------------------------------------------- 11. announcements -- */

function announcementPanel() {
  return block("Announcements", "Advisories, safety notices, planned shutdowns",
    CONFIG.dashboard.modules.announcements,
    pending("FWIS-SPEC-0005 — Group Communications",
      "Announcements are published, not derived. Nothing in FWIS currently publishes them."));
}

/* ---------------------------------------------------------- 12. weather -- */

function weatherPanel() {
  return block("Weather", "Conditions and alerts",
    CONFIG.dashboard.modules.weather,
    pending("External weather API",
      "Marked optional by SPEC-0002 §11. Deliberately unbuilt: it is the only panel that depends on a third party and adds nothing to engineering decisions until the rest is real."));
}

/* ---------------------------------------------------- 13. quick actions -- */
/* §12: configurable by role. Actions above the user's level are omitted;
   actions whose module is unbuilt render disabled and name what they wait
   for, so the roadmap is visible from the product. */

function quickActionPanel(ctx) {
  const actions = CONFIG.dashboard.quickActions.filter((a) => ctx.level >= a.minLevel);
  if (!actions.length) {
    return block("Quick actions", "Shortcuts for your role", "live",
      `<p class="hint">No actions are available at your role level.</p>`);
  }
  return block("Quick actions", "Shortcuts for your role", "live",
    `<div class="quick-actions">${actions.map((a) => {
      const state = CONFIG.dashboard.modules[a.module];
      return state === "live" && a.href
        ? `<a class="btn" href="${esc(a.href)}">${esc(a.label)}</a>`
        : `<button class="btn" disabled title="Awaiting ${esc(a.module)}">${esc(a.label)}</button>`;
    }).join("")}</div>`, { wide: true });
}

/* ------------------------------------------------------------------ bits -- */

function block(title, sub, source, body, { wide = false } = {}) {
  return `<section class="dash-block${wide ? " span-2" : ""}">
    <header>
      <h3>${esc(title)} ${sourceBadge(source)}</h3>
      <p class="sub sm">${esc(sub)}</p>
    </header>
    ${body}
  </section>`;
}

/** Names where a panel's data comes from. The dashboard owns no data
 *  (SPEC-0002 §Scope), so saying "this is a stand-in" is part of being
 *  correct rather than a caveat bolted on. */
function sourceBadge(source) {
  if (source === "live") return "";
  if (source === "fixture") return `<span class="src-badge src-fixture" title="Configured sample data standing in for an unbuilt module">sample data</span>`;
  return `<span class="src-badge src-pending" title="No source module yet">no source yet</span>`;
}

function pending(spec, why) {
  return `<div class="pending-panel">
    <p><b>Waiting on ${spec}.</b></p>
    <p class="hint">${why}</p>
  </div>`;
}

function countFixture(kind, propertyId) {
  return (CONFIG.mockFeeds[kind]?.[propertyId] || []).length;
}

function criticalIncidents(propertyId) {
  return (CONFIG.mockFeeds.incidents[propertyId] || []).filter((i) => T.isEscalatingIncident(i.severity)).length;
}

/** Most recently reported status per plant. Records arrive newest-first, so
 *  the first write wins. */
export function latestPlantStatus(records) {
  const latest = new Map();
  for (const r of records) {
    for (const p of r.data.plants || []) {
      if (p.status && !latest.has(p.name)) {
        latest.set(p.name, { status: p.status, date: r.data.meta.date, remarks: p.remarks });
      }
    }
  }
  return latest;
}

export function latestUtilities(records) {
  const latest = new Map();
  for (const r of records) {
    for (const u of r.data.utilities || []) {
      if ((u.reading !== "" && u.reading != null) && !latest.has(u.name)) {
        latest.set(u.name, { reading: u.reading, unit: u.unit, abnormal: u.abnormal, date: r.data.meta.date });
      }
    }
  }
  return latest;
}

function openTasks(openRecords) {
  return openRecords.flatMap((r) =>
    (r.data.tasks || [])
      .filter((x) => x.status !== "Completed")
      .map((x) => ({ ...x, recordId: r.id, date: r.data.meta.date })));
}

function rankPriority(p) {
  return CONFIG.enums.taskPriority.length - CONFIG.enums.taskPriority.findIndex((x) => x.value === p);
}

function wireNavigation(view) {
  view.querySelectorAll("[data-goto-id]").forEach((el) => {
    const go = () => { location.hash = `/turnover/${el.dataset.gotoId}`; };
    el.addEventListener("click", go);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  });
}

function wirePropertySwitch(view) {
  const sel = view.querySelector("#dash-property");
  if (!sel) return;
  sel.addEventListener("change", () => identity.setProperty(sel.value));
}
