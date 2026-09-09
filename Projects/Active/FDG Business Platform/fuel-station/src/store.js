import { initialDeliveries, latestAcceptedTotalizers, products, safetyChecklist, verifiedHistory } from "../data/nj-gas-station.js";

const KEY = "fdg-fuel-station-demo-v3";

const defaultState = () => ({
  role: "Owner",
  prices: Object.fromEntries(products.map((p) => [p.id, { buyingPrice: p.buyingPrice, sellingPrice: p.sellingPrice }])),
  tanks: Object.fromEntries(products.map((p) => [p.id, p.openingStock])),
  deliveries: initialDeliveries,
  closeouts: [],
  analyticsRange: "daily",
  checklist: Object.fromEntries(safetyChecklist.map((item) => [item, false])),
  audit: [{ id: crypto.randomUUID(), at: new Date().toISOString(), actor: "System", action: "Demo workspace initialized", detail: "Verified workbook history loaded read-only." }],
});

export function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    return stored ? { ...defaultState(), ...stored } : defaultState();
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function addAudit(state, action, detail) {
  state.audit.unshift({ id: crypto.randomUUID(), at: new Date().toISOString(), actor: state.role, action, detail });
}

export function allReportRows(state) {
  return [...verifiedHistory, ...state.closeouts].sort((a, b) => a.date.localeCompare(b.date));
}

export function latestTotalizerRecord(state) {
  const local = [...state.closeouts]
    .filter((row) => row.closingTotalizers)
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
  localStorage.removeItem(KEY);
  return defaultState();
}
