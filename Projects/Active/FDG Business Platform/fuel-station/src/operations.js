import { products } from "../data/nj-gas-station.js";
import { addAudit } from "./store.js";

export const money = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const amount = (n) => {
  if (n === "" || n == null || !Number.isFinite(Number(n)) || Number(n) < 0) throw new Error("Enter a non-negative amount.");
  return Number(n);
};
const manager = (state) => { if (!["Owner", "Station Manager"].includes(state.role)) throw new Error("Manager role required."); };
export const capacity = (state, id) => state.capacities?.[id] ?? products.find((p) => p.id === id).tankCapacity;
export const activeBuyingPrice = (state, id) => state.inventoryLots?.[id]?.find((lot) => lot.remaining > 0)?.unitCost ?? state.prices[id].buyingPrice;
export const registeredTests = (state, date, product) => (state.monthlyTests || []).filter((r) => !r.voided && r.testDate === date && r.product === product && r.returnStatus === "returned");
export function voidCalibration(state, id, reason) {
  manager(state);
  const record = state.monthlyTests.find((r) => r.id === id);
  if (!record || record.voided || !reason?.trim()) throw new Error("Choose an active test record and enter a reason.");
  if (state.closeouts.some((r) => r.date === record.testDate && ["approved", "pending"].includes(r.workflow))) throw new Error("Review/correct the submitted closeout first; this test record cannot be voided independently.");
  record.voided = true; record.voidReason = reason.trim(); record.status = "Voided — retained for audit";
  addAudit(state,"Calibration record voided",`${record.id}; ${reason}`);
}

export function consumeLots(lots, liters, date) {
  let remaining = liters, cost = 0;
  const allocations = [];
  for (const lot of lots.filter((lot) => lot.date <= date).sort((a,b) => a.date.localeCompare(b.date))) {
    const used = Math.min(lot.remaining, remaining);
    if (used <= 0) continue;
    lot.remaining = money(lot.remaining - used); remaining = money(remaining - used);
    cost += used * lot.unitCost;
    allocations.push({ lotId: lot.id, liters: used, unitCost: lot.unitCost, basis: lot.basis });
  }
  if (remaining > 0.001) throw new Error("Not enough dated stock batches. Reconcile the opening inventory or deliveries first.");
  return { cost: money(cost), allocations };
}

export function addDeliveryLot(state, delivery) {
  state.inventoryLots[delivery.product].push({ id: delivery.id, date: delivery.date, remaining: delivery.liters, unitCost: delivery.unitCost, basis: "Recorded delivery buying price" });
  state.inventoryLots[delivery.product].sort((a,b) => a.date.localeCompare(b.date));
}

export function saveCapacity(state, input) {
  if (state.role !== "Owner") throw new Error("Only the Owner can change working capacity.");
  if (!products.some((p) => p.id === input.product) || !input.reason?.trim()) throw new Error("Product and reason are required.");
  const liters = amount(input.liters);
  if (liters <= 0 || liters < state.tanks[input.product]) throw new Error("Capacity must be positive and cannot be below recorded stock.");
  const old = capacity(state, input.product);
  state.capacities[input.product] = liters;
  addAudit(state, "Working capacity changed", `${input.product}: ${old} → ${liters} L; ${input.reason}`);
}

export function saveMonthlyRecord(state, input, today) {
  manager(state);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(input.month) || input.month > today.slice(0,7) || !input.reason?.trim()) throw new Error("Choose a valid non-future month and enter a source/reason.");
  const common = { id: crypto.randomUUID(), month: input.month, reason: input.reason.trim(), at: new Date().toISOString(), actor: state.role };
  if (input.kind === "expenses") {
    const previous = state.monthlyExpenses.filter((r) => r.month === input.month).at(-1);
    state.monthlyExpenses.push({ ...common, electricity: amount(input.electricity), manpower: amount(input.manpower), revision: (previous?.revision || 0) + 1 });
    addAudit(state, "Monthly expenses recorded", `${input.month}; electricity ${input.electricity}; manpower ${input.manpower}; ${input.reason}`);
  } else if (input.kind === "calibration") {
    if (!products.some((p) => p.id === input.product) || !["returned", "not-returned", "unconfirmed"].includes(input.returnStatus)) throw new Error("Choose a product and fuel-return status.");
    const liters = amount(input.liters);
    if (!liters) throw new Error("Enter a positive test volume, not negative sales.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(input.testDate) || Number.isNaN(Date.parse(input.testDate)) || new Date(input.testDate).toISOString().slice(0,10) !== input.testDate || !input.testDate.startsWith(input.month) || input.testDate > today) throw new Error("Enter the actual test date within this month, no later than today.");
    if (state.closeouts.some((r) => r.date === input.testDate && ["pending","approved"].includes(r.workflow))) throw new Error("This day is already submitted. Review/correct its closeout rather than adding another calibration deduction.");
    if (!input.reference?.trim()) throw new Error("A test reference is required to prevent duplicate deductions.");
    if (state.monthlyTests.some((r) => !r.voided && r.testDate === input.testDate && r.product === input.product && r.reference === input.reference.trim())) throw new Error("This test reference is already recorded for this product/date.");
    state.monthlyTests.push({ ...common, testDate: input.testDate, product: input.product, liters, returnStatus: input.returnStatus, status: input.returnStatus === "returned" ? "Awaiting dated closeout" : "Review only — not posted", reference: input.reference.trim() });
    addAudit(state, "Monthly test evidence recorded", `${input.month}; ${input.product}; ${liters} L; ${input.returnStatus}; no stock or sales posted; ${input.reason}`);
  } else throw new Error("Unknown monthly record type.");
}
