import { requireManager } from "./closeouts.js";
import { addAudit } from "./store.js";
import { escapeHtml as esc } from "./format.js";
const rateLabel = n => new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:2,maximumFractionDigits:4}).format(n);

const units = { electricity: "kWh", water: "m³", internet: "month" };
const validDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d || "") && Number.isFinite(Date.parse(d)) && new Date(d).toISOString().slice(0,10) === d;
export function addUtilityRate(state, input) {
  requireManager(state);
  if (!Object.hasOwn(units,input.utility) || input.rate === "" || input.rate == null || !Number.isFinite(Number(input.rate)) || Number(input.rate) < 0) throw new Error("Choose a utility and a valid non-negative rate.");
  if (!validDate(input.from) || (input.to && (!validDate(input.to) || input.to < input.from))) throw new Error("Enter valid effective dates; the end cannot precede the start.");
  if (!String(input.source || "").trim()) throw new Error("A bill, contract, or admin source reference is required.");
  const prior = input.supersedes ? (state.utilityRates || []).find(r=>r.id===input.supersedes) : null;
  if (input.supersedes && (!prior || prior.status !== "approved" || prior.utility !== input.utility || prior.from !== input.from)) throw new Error("A correction must reference an approved rate for the same utility and start date.");
  const row = { id: crypto.randomUUID(), utility: input.utility, rate: Number(input.rate), unit: units[input.utility], from: input.from, to: input.to || null, source: input.source.trim().slice(0,500), enteredBy: state.role, at: new Date().toISOString(), status: "pending" };
  (state.utilityRates ??= []).push(row);
  if (prior) row.supersedes = prior.id;
  addAudit(state,"Utility rate proposed",`${row.id}; ${row.utility}; ${row.rate}/${row.unit}; ${row.from} to ${row.to || "open ended"}; ${row.source}`);
  return row;
}
export function reviewUtilityRate(state, id, status, reason) {
  requireManager(state);
  const row = (state.utilityRates || []).find(r=>r.id===id);
  if (!row || row.status !== "pending" || !["approved","rejected"].includes(status) || !String(reason || "").trim()) throw new Error("Choose a pending record and enter a review reason.");
  const prior = row.supersedes ? state.utilityRates.find(r=>r.id===row.supersedes) : null;
  if (status === "approved" && row.supersedes && prior?.status !== "approved") throw new Error("The referenced rate has changed; review a new correction.");
  if (status === "approved" && state.utilityRates.some(r=>r.id!==id && r.id!==row.supersedes && r.status==="approved" && r.utility===row.utility && r.from <= (row.to || "9999-12-31") && row.from <= (r.to || "9999-12-31"))) throw new Error("An approved rate already covers this interval. Reconcile the effective dates; overlapping rates cannot be approved.");
  row.status=status;
  row.review = { at: new Date().toISOString(), actor: state.role, reason: reason.trim().slice(0,1000) };
  if (status === "approved" && prior) { prior.status="superseded"; prior.supersededBy=row.id; }
  addAudit(state,"Utility rate reviewed",`${id}; ${status}; ${row.review.reason}`);
}
export function utilityRatesView(state) {
  const manager=["Owner","Station Manager"].includes(state.role);
  return `<section class="panel form-panel utility-rates"><h2>Utility rate records</h2><p>Effective-dated evidence, not hidden formula constants. Rates do not automatically change monthly expenses or historical reports; enter the actual monthly bill separately.</p><details><summary>Add a rate for review</summary>${manager ? `<form data-utility-add class="cost-grid"><label>Utility<select name="utility">${Object.entries(units).map(([u,unit])=>`<option value="${u}">${u} · ₱/${unit}</option>`).join("")}</select></label><label>Rate (₱ per unit)<input name="rate" type="number" min="0" step="0.0001" required /></label><label>Effective from<input name="from" type="date" required /></label><label>Effective to (inclusive, optional)<input name="to" type="date" /></label><label>Correct an approved rate (optional)<select name="supersedes"><option value="">New rate</option>${(state.utilityRates || []).filter(r=>r.status==="approved").map(r=>`<option value="${esc(r.id)}">${esc(r.utility)} · ${esc(r.from)} · ${rateLabel(r.rate)}</option>`).join("")}</select></label><label>Bill / contract / admin source<input name="source" maxlength="500" required /></label><button class="primary">Save pending rate</button></form>` : '<p>Owner or Station Manager role required.</p>'}</details>${(state.utilityRates || []).map(r=>`<details class="utility-record"><summary>${esc(r.utility)} · ${rateLabel(r.rate)}/${esc(r.unit)} · ${esc(r.status)}</summary><p>${esc(r.from)} → ${esc(r.to || "Open ended")}<br>Source: ${esc(r.source)}<br>Entered by ${esc(r.enteredBy)} · ${esc(r.at)}</p>${r.review ? `<p>Review: ${esc(r.review.actor)} · ${esc(r.review.at)} · ${esc(r.review.reason)}</p>` : ""}${r.status === "pending" && manager ? `<form data-utility-review="${esc(r.id)}"><label>Review reason<input name="reason" required maxlength="1000" /></label><button class="primary" value="approved">Approve rate</button> <button class="secondary" value="rejected">Reject rate</button></form>` : ""}</details>`).join("") || '<p>No utility rates recorded. Sample rates have not been imported.</p>'}<p class="subtle">Local review workflow only. Approved records are retained; interval corrections require reconciliation, not silent overwrites.</p></section>`;
}
