/* ============================================================================
   Screen B — Turnover Detail / Review
   FWIS-SPEC-0003 v1.1 §Screens, Screen B. Single-page read view of all eleven
   components, with the Acceptance panel pinned at the bottom while the record
   is still awaiting the incoming shift.
   ============================================================================ */

import { CONFIG, propertyById, roleName, userName, nameIn, workflow, severityClassFor } from "../config.js";
import * as db from "../db.js";
import * as T from "../turnover.js";
import { esc, statusBadge, enumOptions, formatDate, formatDateTime, toast } from "../ui.js";
import { navigate, refresh } from "../router.js";

export async function detailScreen(params, view) {
  const userId = CONFIG.session.userId;
  const record = await db.get(params.id);

  if (!record) {
    view.innerHTML = `<div class="error-state"><h2>Turnover not found</h2>
      <p>It may have been deleted.</p>
      <p><a class="btn" href="#/turnovers">Back to turnovers</a></p></div>`;
    return;
  }

  const t = record.data;
  const prop = propertyById(t.meta.propertyId);
  const awaiting = T.needsAttention(record.status) && !t.acceptance;
  const met = T.metEscalationTriggers(t);

  view.innerHTML = `
  <article class="detail">
    <header class="detail-head">
      <div>
        <a class="back-link" href="#/turnovers">← All turnovers</a>
        <h2>${esc(t.meta.shiftName)} · ${esc(prop.name)}</h2>
        <p class="sub">${esc(formatDate(t.meta.date))} · ${esc(t.meta.shiftStart)}–${esc(t.meta.shiftEnd)}
          · ${esc(nameIn(prop.buildings, t.meta.buildingId))}
          · ${esc(nameIn(prop.departments, t.meta.departmentId))}</p>
      </div>
      <div class="detail-actions">
        ${statusBadge(record.status)}
        ${T.isOpen(record.status)
          ? `<a class="btn" href="#/turnover/${esc(record.id)}/edit">Edit</a>` : ""}
      </div>
    </header>

    ${met.length ? `<div class="callout callout-warn">
      <b>Escalation required.</b> Triggered by ${esc(met.map((x) => x.label).join(" and "))}.
      Per FBPOIS-ROLE-0004 this routes through
      ${esc(workflow().approvalChain.map((s) => roleName(s.roleId)).join(" → "))},
      in addition to standard incoming-shift acceptance.
    </div>` : ""}

    ${section("Handover", `
      <dl class="kv">
        <div><dt>Outgoing</dt><dd>${esc(userName(t.meta.outgoingLeaderId))}</dd></div>
        <div><dt>Incoming</dt><dd>${esc(userName(t.meta.incomingLeaderId))}</dd></div>
        <div><dt>Present</dt><dd>${esc(t.personnel.present.join(", ") || "—")}</dd></div>
        <div><dt>Absent</dt><dd>${esc(t.personnel.absent.join(", ") || "—")}</dd></div>
        <div><dt>Overtime</dt><dd>${esc(t.personnel.overtime.join(", ") || "—")}</dd></div>
        <div><dt>Relief</dt><dd>${esc(t.personnel.relief.join(", ") || "—")}</dd></div>
      </dl>
      ${t.contractors.length ? `<table class="tbl"><thead><tr><th>Contractor</th><th>Company</th><th>Purpose</th></tr></thead>
        <tbody>${t.contractors.map((c) => `<tr><td>${esc(c.name)}</td><td>${esc(c.company)}</td><td>${esc(c.purpose)}</td></tr>`).join("")}</tbody></table>` : ""}
    `)}

    ${section("Plant status", `<table class="tbl"><thead><tr><th>Plant</th><th>Status</th><th>Remarks</th></tr></thead><tbody>
      ${t.plants.map((p) => `<tr${T.isEscalatingPlant(p.status) ? ' class="flagged"' : ""}>
        <td class="mono">${esc(p.name)}</td>
        <td><span class="led on-${severityClassFor("plantStatus", p.status)}"></span> ${esc(p.status)}</td>
        <td>${esc(p.remarks) || "—"}</td></tr>`).join("")}
    </tbody></table>`)}

    ${section("Utilities", `<table class="tbl"><thead><tr><th>Utility</th><th>Reading</th><th>Abnormal</th><th>Notes</th></tr></thead><tbody>
      ${t.utilities.map((u) => `<tr>
        <td class="mono">${esc(u.name)}</td>
        <td class="mono">${esc(u.reading)} <span class="dim">${esc(u.unit)}</span></td>
        <td>${u.abnormal ? '<span class="text-amber">Yes</span>' : "No"}</td>
        <td>${esc([u.changes, u.remarks].filter(Boolean).join(" · ")) || "—"}</td></tr>`).join("")}
    </tbody></table>`)}

    ${section("Outstanding tasks", t.tasks.length
      ? `<table class="tbl"><thead><tr><th>Description</th><th>Priority</th><th>Assigned</th><th>Status</th><th>Due</th></tr></thead><tbody>
        ${t.tasks.map((x) => `<tr${T.isCriticalTask(x.priority) ? ' class="flagged"' : ""}>
          <td>${esc(x.description)}</td>
          <td><span class="pill text-${severityClassFor("taskPriority", x.priority)}">${esc(x.priority)}</span></td>
          <td>${esc(x.assignedTo)}</td><td>${esc(x.status)}</td>
          <td>${esc(formatDate(x.expectedCompletion)) || "—"}</td></tr>`).join("")}
      </tbody></table>`
      : `<p class="hint">No outstanding tasks.</p>`)}

    ${section("Active incidents", t.incidents.length
      ? t.incidents.map((i) => `<div class="card${T.isEscalatingIncident(i.severity) ? " flagged" : ""}">
          <div class="card-top">
            <span class="led on-${severityClassFor("incidentSeverity", i.severity)}"></span>
            <span class="mono">${esc(i.id)}</span>
            <span class="pill text-${severityClassFor("incidentSeverity", i.severity)}">${esc(i.severity)}</span>
          </div>
          <p class="card-meta">${esc(i.category)} · <b>${esc(i.status)}</b> · ${esc(i.engineer)}</p>
          ${i.requiredAction ? `<p class="note">${esc(i.requiredAction)}</p>` : ""}
        </div>`).join("")
      : `<p class="hint">No active incidents.</p>`)}

    ${section("Engineering concerns", t.concerns.length
      ? t.concerns.map((c) => `<div class="card">
          <div class="card-top"><span class="mono">${esc(c.id)}</span></div>
          <p class="card-meta">${esc(c.category)} · <b>${esc(c.status)}</b></p>
          ${c.notes ? `<p class="note">${esc(c.notes)}</p>` : ""}
        </div>`).join("")
      : `<p class="hint">No unresolved concerns.</p>`)}

    ${section("Room status", t.rooms.length
      ? `<table class="tbl"><thead><tr><th>Room</th><th>Status</th><th>Remarks</th></tr></thead><tbody>
        ${t.rooms.map((r) => `<tr><td class="mono">${esc(r.room)}</td>
          <td><span class="led on-${severityClassFor("roomStatus", r.status)}"></span> ${esc(r.status)}</td>
          <td>${esc(r.remarks) || "—"}</td></tr>`).join("")}
      </tbody></table>`
      : `<p class="hint">No rooms flagged.</p>`)}

    ${section("Engineering notes", t.notes.length
      ? t.notes.map((n) => `<div class="card">
          ${n.category ? `<span class="pill">${esc(n.category)}</span>` : ""}
          <p class="note">${esc(n.note)}</p></div>`).join("")
      : `<p class="hint">No notes recorded.</p>`)}

    ${section("Attachments", t.attachments.length
      ? `<ul class="filelist">${t.attachments.map((a) => `<li>
          <span class="mono">${esc(a.fileName)}</span>
          <span class="dim">${a.sizeKb} KB · ${esc(a.type)}</span>
          ${a.caption ? `<span class="cap">${esc(a.caption)}</span>` : ""}</li>`).join("")}</ul>`
      : `<p class="hint">No attachments.</p>`)}

    ${t.acceptance ? `
      <section class="accept-done">
        <h3>Acceptance</h3>
        <p><b>${esc(t.acceptance.status)}</b> by ${esc(userName(t.acceptance.userId))}
           on ${esc(formatDateTime(t.acceptance.at))}</p>
        ${t.acceptance.comments ? `<p class="note">${esc(t.acceptance.comments)}</p>` : ""}
      </section>` : ""}

    ${awaiting ? acceptPanel() : ""}

    <footer class="detail-foot">
      <span class="dim sm">Record ${esc(record.id)} · revision ${record.revision}
        · updated ${esc(formatDateTime(record.updatedAt))} · stored locally (${esc(record.syncState)})</span>
    </footer>
  </article>`;

  if (awaiting) bindAccept();

  function bindAccept() {
    const sel = view.querySelector('[name="acceptStatus"]');
    const comment = view.querySelector('[name="acceptComments"]');
    const err = view.querySelector("#accept-err");

    sel.addEventListener("change", () => {
      const need = T.acceptanceRequiresComment(sel.value);
      comment.closest(".field").classList.toggle("required", need);
      view.querySelector("#comment-req").hidden = !need;
    });

    view.querySelector("#accept-btn").addEventListener("click", async () => {
      const status = sel.value;
      if (!status) { err.textContent = "Select an acceptance status."; return; }
      if (T.acceptanceRequiresComment(status) && !comment.value.trim()) {
        err.textContent = "Comments are required when requesting clarification.";
        return;
      }

      if (status === "Clarification Requested") {
        t.clarificationCount = (t.clarificationCount || 0) + 1;
        t.acceptance = null;
        await db.save({ ...record, status: "Clarification Requested", data: t }, userId);
        toast("Clarification requested — returned to the outgoing leader", "warn");
      } else {
        t.acceptance = {
          userId, at: new Date().toISOString(), status, comments: comment.value.trim()
        };
        await db.save({ ...record, status: "Accepted", data: t }, userId);
        toast("Turnover accepted — responsibility transferred");
      }
      refresh();
    });
  }
}

function acceptPanel() {
  return `
  <section class="accept">
    <h3>Acceptance</h3>
    <p class="sub">Acknowledging transfers operational responsibility for this shift.</p>
    <div class="accept-row">
      <label class="field"><span class="lbl">Decision <em>required</em></span>
        <select name="acceptStatus">${enumOptions("acceptanceStatus", "")}</select></label>
      <label class="field"><span class="lbl">Comments <em id="comment-req" hidden>required</em></span>
        <input type="text" name="acceptComments" placeholder="Optional unless requesting clarification"></label>
      <button type="button" class="btn btn-go" id="accept-btn">Record decision</button>
    </div>
    <p class="err" id="accept-err" role="alert" aria-live="assertive"></p>
  </section>`;
}

function section(title, body) {
  return `<section class="detail-sec"><h3>${esc(title)}</h3>${body}</section>`;
}
