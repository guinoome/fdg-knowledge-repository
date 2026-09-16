import { products } from "../data/nj-gas-station.js";
import { addAudit, latestTotalizerRecord } from "./store.js";

const round = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const nonnegative = (value) => {
  if (value === "" || value == null || !Number.isFinite(Number(value)) || Number(value) < 0) throw new Error("Enter valid non-negative readings and costs.");
  return Number(value);
};
export function requireManager(state) {
  if (!["Owner", "Station Manager"].includes(state.role)) throw new Error("Owner or Station Manager role required.");
}
export function validateOperatingDate(date, today) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0,10) !== date || date > today) throw new Error("Choose a valid operating date no later than today.");
}
export function submitCloseout(state, input, today) {
  requireManager(state);
  const replacing = state.closeouts.find((r) => r.id === input.replaces);
  if (input.replaces && (!replacing || !["approved", "rejected"].includes(replacing.workflow))) throw new Error("Choose an approved or rejected record to correct.");
  if (state.closeouts.some((r) => r.workflow === "pending")) throw new Error("Review the pending closeout before submitting another.");
  const prior = latestTotalizerRecord(state);
  if (replacing?.workflow === "rejected" && replacing.replaces && state.closeouts.some((r) => r.id === replacing.replaces && r.workflow === "approved")) throw new Error("Create the next correction from the still-approved original record.");
  validateOperatingDate(input.date, today);
  if (replacing?.workflow === "approved" && replacing.date !== prior.date) throw new Error("Only the latest approved closeout can be corrected; earlier dates require a reviewed ledger rebuild.");
  if (replacing && input.date !== replacing.date) throw new Error("A correction must retain its original operating date.");
  if ((!replacing || replacing.workflow === "rejected") && input.date <= prior.date) throw new Error(`The date must be after the latest posted close (${prior.date}).`);
  if (!replacing || replacing.workflow === "rejected") {
    const followingDay = new Date(`${prior.date}T00:00:00Z`);
    followingDay.setUTCDate(followingDay.getUTCDate() + 1);
    if (input.date !== followingDay.toISOString().slice(0,10)) throw new Error(`Daily closeout must follow ${prior.date} by one day. Reconcile missing days or the opening baseline first; a cumulative interval is not one day's sales.`);
  }
  if (state.closeouts.some((r) => r.date === input.date && r.id !== replacing?.id && ["approved", "pending"].includes(r.workflow))) throw new Error("This operating date already has a closeout.");
  if (replacing && !input.reason?.trim()) throw new Error("A correction reason is required.");
  const opening = replacing?.workflow === "approved" ? replacing.openingTotalizers : prior.values;
  const prices = replacing?.prices || structuredClone(state.prices);
  const row = { id: crypto.randomUUID(), date: input.date, status: "local", workflow: "pending", replaces: replacing?.id || null, reason: input.reason?.trim() || "", openingTotalizers: { ...opening }, openingSource: replacing?.openingSource || `${prior.source}; ${prior.date}`, closingTotalizers: {}, tests: {}, prices, sales: 0, profit: 0, createdAt: new Date().toISOString(), submittedBy: state.role, revision: (replacing?.revision || 0) + 1 };
  row.photoReviewed = (input.photoReviewed || []).filter((id) => products.some((p) => p.id === id));
  row.photoRetention = "Review only; image not persisted";
  for (const p of products) {
    const closing = nonnegative(input.closing[p.id]);
    const test = nonnegative(input.tests[p.id]);
    const liters = round(closing - opening[p.id] - test);
    if (liters < 0) throw new Error(`${p.name}: final reading minus calibration is below the opening.`);
    row.closingTotalizers[p.id] = closing; row.tests[p.id] = test; row[`${p.id}Liters`] = liters;
    row.sales += round(liters * prices[p.id].sellingPrice);
    row.profit += round(liters * (prices[p.id].sellingPrice - prices[p.id].buyingPrice));
  }
  row.costs = Object.fromEntries(["electricity", "manpower", "otherCost"].map((k) => [k, nonnegative(input[k])]));
  row.cashCollected = nonnegative(input.cashCollected);
  row.sales = round(row.sales); row.profit = round(row.profit - Object.values(row.costs).reduce((a,b) => a+b,0)); row.cashVariance = round(row.cashCollected - row.sales);
  state.closeouts.push(row);
  addAudit(state, "Closeout submitted", `${row.date}; revision ${row.revision}; no stock posted; ${row.reason}`);
  return row;
}
export function reviewCloseout(state, id, decision, reason) {
  requireManager(state);
  const row = state.closeouts.find((r) => r.id === id);
  if (!row || row.workflow !== "pending") throw new Error("This closeout is no longer pending.");
  if (!["approved", "rejected"].includes(decision) || !reason?.trim()) throw new Error("Record a review decision and reason.");
  const previous = state.closeouts.find((r) => r.id === row.replaces);
  if (decision === "approved") {
    const balances = {};
    for (const p of products) {
      const old = previous?.workflow === "approved" ? previous[`${p.id}Liters`] : 0;
      balances[p.id] = round(state.tanks[p.id] + old - row[`${p.id}Liters`]);
      if (balances[p.id] < 0 || balances[p.id] > p.tankCapacity) throw new Error(`${p.name}: resulting stock is outside tank limits.`);
    }
    Object.assign(state.tanks, balances);
    if (previous?.workflow === "approved") previous.workflow = "superseded";
  }
  row.workflow = decision; row.reviewedAt = new Date().toISOString(); row.reviewedBy = state.role; row.reviewReason = reason.trim();
  addAudit(state, `Closeout ${decision}`, `${row.date}; revision ${row.revision}; ${row.reviewReason}`);
}
