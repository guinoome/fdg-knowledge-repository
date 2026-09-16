import { initialDeliveries, latestAcceptedTotalizers, products, safetyChecklist, verifiedHistory } from "../data/nj-gas-station.js";

const KEY = "fdg-fuel-station-demo-v3";
let persisted = null;
let storageSnapshot = null;
let blocked = false;
export let storageError = "";

const defaultState = () => ({
  role: "Owner",
  prices: Object.fromEntries(products.map((p) => [p.id, { buyingPrice: p.buyingPrice, sellingPrice: p.sellingPrice }])),
  tanks: Object.fromEntries(products.map((p) => [p.id, p.openingStock])),
  capacities: Object.fromEntries(products.map((p) => [p.id, p.tankCapacity])),
  monthlyExpenses: [],
  monthlyTests: [],
  deliveries: structuredClone(initialDeliveries),
  closeouts: [],
  analyticsRange: "daily",
  checklist: Object.fromEntries(safetyChecklist.map((item) => [item, false])),
  audit: [{ id: crypto.randomUUID(), at: new Date().toISOString(), actor: "System", action: "Demo workspace initialized", detail: "Verified workbook history loaded read-only." }],
});

export function loadState() {
  try {
    storageSnapshot = localStorage.getItem(KEY);
    const stored = JSON.parse(storageSnapshot);
    if (stored && (!Array.isArray(stored.closeouts) || !Array.isArray(stored.deliveries) || !stored.tanks || !Array.isArray(stored.audit)
      || !["Owner", "Station Manager", "Attendant"].includes(stored.role)
      || !stored.checklist || !products.every((p) => Number.isFinite(stored.tanks[p.id]) && stored.tanks[p.id] >= 0
        && Number.isFinite(stored.prices?.[p.id]?.sellingPrice) && Number.isFinite(stored.prices?.[p.id]?.buyingPrice))
      || !stored.closeouts.every((r) => r && typeof r.date === "string" && Number.isFinite(r.sales) && Number.isFinite(r.profit)))) throw new Error("Invalid saved records");
    const state = stored ? { ...defaultState(), ...stored } : defaultState();
    // Preserve old balances; do not replay historical deliveries already included in stock.
    state.inventoryLots ??= Object.fromEntries(products.map((p) => [p.id, [{ id: `carry-in-${p.id}`, date: latestTotalizerRecord(state).date, remaining: state.tanks[p.id], unitCost: state.prices[p.id].buyingPrice, basis: "Unverified carry-in cost — owner reconciliation required" }]]));
    if (!Array.isArray(state.monthlyExpenses) || !Array.isArray(state.monthlyTests) || !products.every((p) => {
      const lots = state.inventoryLots[p.id];
      return Number.isFinite(state.capacities[p.id]) && state.capacities[p.id] >= state.tanks[p.id]
        && Array.isArray(lots) && lots.every((l) => l && Number.isFinite(l.remaining) && l.remaining >= 0 && Number.isFinite(l.unitCost) && l.unitCost >= 0 && typeof l.date === "string")
        && Math.abs(lots.reduce((sum,l) => sum+l.remaining,0)-state.tanks[p.id]) < 0.011;
    })) throw new Error("Stock batches or monthly records need reconciliation");
    persisted = JSON.stringify(state);
    return state;
  } catch {
    blocked = true;
    storageError = "Saved records could not be read. Existing storage is protected; export it before recovery.";
    return defaultState();
  }
}

export function saveState(state) {
  try {
    if (blocked) throw new Error(storageError);
    const next = JSON.stringify(state);
    const current = localStorage.getItem(KEY);
    if (current !== storageSnapshot) throw new Error("Records changed in another tab. Reload before saving.");
    localStorage.setItem(KEY, next);
    persisted = next;
    storageSnapshot = next;
    storageError = "";
  } catch (error) {
    if (persisted) { for (const key of Object.keys(state)) delete state[key]; Object.assign(state, JSON.parse(persisted)); }
    storageError = error.message || "Storage unavailable";
    throw new Error(`Not saved: ${storageError}. Your previous saved records are unchanged.`);
  }
}

export function addAudit(state, action, detail) {
  state.audit.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), actor: state.role, action, detail });
}

export function allReportRows(state) {
  return [...verifiedHistory, ...state.closeouts.filter((r) => !r.workflow || r.workflow === "approved")].sort((a, b) => a.date.localeCompare(b.date));
}

export function latestTotalizerRecord(state) {
  const local = [...state.closeouts]
    .filter((row) => row.closingTotalizers && (!row.workflow || row.workflow === "approved") && row.date > latestAcceptedTotalizers.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .at(-1);
  if (local) return { date: local.date, source: "Latest local closeout", values: { ...local.closingTotalizers } };
  return { date: latestAcceptedTotalizers.date, source: latestAcceptedTotalizers.source, values: { ...latestAcceptedTotalizers.values } };
}

export function reportCsv(state) {
  const columns = ["date", "status", "regularLiters", "premiumLiters", "dieselLiters", "sales", "profit"];
  return [columns.join(","), ...allReportRows(state).map((row) => columns.map((column) => JSON.stringify(row[column] ?? "")).join(","))].join("\n");
}

export function resetDemo() {
  if (blocked) throw new Error(storageError);
  localStorage.removeItem(KEY);
  storageSnapshot = null;
  const state = defaultState();
  state.inventoryLots = Object.fromEntries(products.map((p) => [p.id, [{ id: `carry-in-${p.id}`, date: latestAcceptedTotalizers.date, remaining: state.tanks[p.id], unitCost: state.prices[p.id].buyingPrice, basis: "Unverified carry-in cost — owner reconciliation required" }]]));
  persisted = JSON.stringify(state);
  return state;
}
