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
  issueReviews: [],
  utilityRates: [],
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
    if (state.meterSetup) {
      const setup = state.meterSetup;
      if (!Array.isArray(setup.sets) || !setup.sets.length || setup.sets.length > 100 || new Set(setup.sets.map(s => s.id)).size !== setup.sets.length || !/^\d{4}-\d{2}-\d{2}$/.test(setup.date) || typeof setup.reference !== "string" || !setup.sets.every(s => /^[A-Za-z0-9_-]{1,40}$/.test(s.id) && typeof s.forecourt === "string" && Array.isArray(s.products) && s.products.length >= 1 && s.products.length <= 3 && new Set(s.products.map(p => p.product)).size === s.products.length && s.products.every(p => products.some(item => item.id === p.product) && Number.isFinite(p.opening) && p.opening >= 0))) throw new Error("Invalid commissioned equipment");
      const ids = setup.sets.flatMap(s => s.products.map(p => `${s.id}--${p.product}`));
      if (!state.closeouts.every(r => !r.meterReadings || (Object.keys(r.meterReadings).length === ids.length && ids.every(id => {
        const m = r.meterReadings[id];
        return m && [m.opening,m.closing,m.test,m.liters].every(n => Number.isFinite(n) && n >= 0) && m.closing >= m.opening && Math.abs(m.closing-m.opening-m.test-m.liters) < 0.011;
      })))) throw new Error("Invalid saved meter readings");
    } else if (state.closeouts.some(r => r.meterReadings)) throw new Error("Meter configuration missing");
    // Preserve old balances; do not replay historical deliveries already included in stock.
    state.inventoryLots ??= Object.fromEntries(products.map((p) => [p.id, [{ id: `carry-in-${p.id}`, date: latestTotalizerRecord(state).date, remaining: state.tanks[p.id], unitCost: state.prices[p.id].buyingPrice, basis: "Unverified carry-in cost — owner reconciliation required" }]]));
    if (!Array.isArray(state.issueReviews) || !Array.isArray(state.utilityRates) || !Array.isArray(state.monthlyExpenses) || !Array.isArray(state.monthlyTests) || !products.every((p) => {
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
