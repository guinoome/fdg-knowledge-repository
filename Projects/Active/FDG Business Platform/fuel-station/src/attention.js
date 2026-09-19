import { sourceExceptions } from "../data/nj-gas-station.js";
import { escapeHtml as esc } from "./format.js";
import { addAudit } from "./store.js";
import { requireManager } from "./closeouts.js";

const definitions = [
  { id: "premium-test-20250430", severity: "Critical", title: "Premium 30 L test allocation", summary: "Returned test fuel needs source reconciliation.", source: "NJ Gas Station Online.xlsx · April 2025", locator: "Exact source cell not yet verified", action: "Review allocation" },
  { id: "workbook-july2025", severity: "Medium", title: "Broken workbook references", summary: "July 2025 is excluded from trusted reporting.", source: "NJ Gas Station Online.xlsx · July 2025", locator: "Affected cells/import fields not yet verified", action: "Review source" },
  { id: "utility-rate-basis", severity: "Information", title: "Utility rate changes", summary: "Record effective-dated rates and billing evidence.", source: "Workbook electricity formulas · multiple periods", locator: "Rate provenance needs owner verification", action: "Review rate basis" },
];
export const issueStates = ["Open", "Under Review", "Resolved", "Accepted Exception"];
export function attentionIssues(state) {
  return definitions.map((item, index) => ({ ...item, detail: sourceExceptions[index].detail, date: sourceExceptions[index].date,
    review: (state.issueReviews || []).filter(r => r.issueId === item.id).at(-1) }));
}
export function reviewIssue(state, input) {
  requireManager(state);
  if (!definitions.some(i => i.id === input.issueId) || !issueStates.includes(input.status)) throw new Error("Choose a valid issue and review state.");
  if (!String(input.reason || "").trim() || !String(input.evidence || "").trim()) throw new Error("A review reason and source/evidence reference are required.");
  // A review disposition never changes the source dataset or reporting eligibility.
  const record = { id: crypto.randomUUID(), issueId: input.issueId, status: input.status, reason: input.reason.trim().slice(0,1000), evidence: input.evidence.trim().slice(0,500), at: new Date().toISOString(), actor: state.role };
  (state.issueReviews ??= []).push(record);
  addAudit(state, "Source issue review recorded", `${record.issueId}; ${record.status}; ${record.reason}; evidence: ${record.evidence}; reporting exclusion unchanged`);
}
export function attentionCenter(state) {
  const manager = ["Owner", "Station Manager"].includes(state.role);
  return `<p class="attention-intro">Review the evidence. Protect the totals.</p><div class="attention-list">${attentionIssues(state).map(item => `<details class="attention-issue severity-${item.severity.toLowerCase()}" data-issue="${item.id}"><summary><span class="issue-severity">${item.severity}</span><strong>${item.title}</strong><span>${item.summary}</span><small>Review: ${esc(item.review?.status || "Open")} · ${esc(item.date)} · ${esc(item.source)}</small><span class="issue-action">${item.action} <b aria-hidden="true">›</b></span></summary><div class="issue-expanded"><p><b>Review state:</b> ${esc(item.review?.status || "Open")}</p><p>${esc(item.detail)}</p><p><b>Source locator:</b> ${esc(item.locator)}</p><p><b>Reporting protection:</b> Source exceptions remain excluded. A review decision does not repair the workbook or admit a row into trusted totals.</p>${item.id === "premium-test-20250430" ? '<p><b>Reconciliation:</b> 100 L positive meter movement − 30 L returned test fuel = 70 L sold. Never subtract testing from the physical final reading.</p>' : ""}${item.id === "utility-rate-basis" ? '<button data-go="settings" class="secondary">Open utility rate records</button>' : ""}${manager ? `<form data-issue-review="${item.id}"><label>Review state<select name="status">${issueStates.map(s=>`<option${s === (item.review?.status || "Open") ? " selected" : ""}>${s}</option>`).join("")}</select></label><label>Evidence reference / exact source location<input name="evidence" required maxlength="500" /></label><label>Reason<textarea name="reason" required maxlength="1000"></textarea></label><button class="primary">Save review decision</button><p role="status" data-review-message></p></form>` : '<p>Owner or Station Manager review required. These are local demo roles, not authenticated identities.</p>'}<details><summary>Review history</summary>${(state.issueReviews || []).filter(r=>r.issueId===item.id).map(r=>`<p>${esc(r.at)} · ${esc(r.actor)} · ${esc(r.status)}<br>${esc(r.reason)}<br>Evidence: ${esc(r.evidence)}</p>`).join("") || '<p>No review recorded.</p>'}</details></div></details>`).join("")}</div><p class="attention-footnote">${state.closeouts.filter(r=>r.workflow==="pending").length} local closeout(s) await separate approval. Issue reviews remain on this device.</p>`;
}
