import { products } from "../data/nj-gas-station.js";
import { addAudit, latestTotalizerRecord } from "./store.js";
import { escapeHtml, number } from "./format.js";

// Physical registers are never inferred by dividing a historical product totalizer.
export function commissionMeters(state, input) {
  if (state.role !== "Owner") throw new Error("Only the Owner can commission dispenser meters.");
  if (state.closeouts.some(r => r.workflow === "pending" || r.meterReadings)) throw new Error("Equipment is locked after a metered submission. A reviewed equipment-change migration is required.");
  if (input.date !== latestTotalizerRecord(state).date || !input.reference?.trim()) throw new Error("Verify readings at the latest accepted closing date and provide source evidence. Missing operating days cannot be skipped.");
  if (!Array.isArray(input.sets) || !input.sets.length || input.sets.length > 100) throw new Error("Configure 1–100 dispenser sets.");
  const ids = new Set();
  const sets = input.sets.map(set => {
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(set.id) || ids.has(set.id)) throw new Error("Each dispenser needs a unique ID using letters, numbers, dash or underscore.");
    ids.add(set.id);
    if (!set.forecourt?.trim() || set.forecourt.length > 80) throw new Error("Enter a forecourt name for every dispenser.");
    if (!Array.isArray(set.products) || !set.products.length || set.products.length > 3 || new Set(set.products.map(p => p.product)).size !== set.products.length) throw new Error("Each dispenser must carry 1–3 distinct products.");
    return { id: set.id, forecourt: set.forecourt.trim(), products: set.products.map(p => {
      if (!products.some(product => product.id === p.product) || p.opening === "" || p.opening == null || !Number.isFinite(Number(p.opening)) || Number(p.opening) < 0) throw new Error("Every selected product needs a verified non-negative opening reading.");
      return { product: p.product, opening: Number(p.opening) };
    }) };
  });
  const previous = state.meterSetup || null;
  state.meterSetupHistory = [...(state.meterSetupHistory || []), ...(previous ? [previous] : [])];
  state.meterSetup = { sets, date: input.date, reference: input.reference.trim(), at: new Date().toISOString(), actor: state.role };
  addAudit(state, "Dispenser meters commissioned", JSON.stringify(state.meterSetup));
}

export function meterEntries(state, correction = null) {
  if (!state.meterSetup || (correction && !correction.meterReadings)) return products.map(p => ({ ...p, product: p.id, opening: correction?.openingTotalizers[p.id] ?? latestTotalizerRecord(state).values[p.id] }));
  const latest = state.closeouts.filter(r => r.workflow === "approved" && r.meterReadings).sort((a,b) => a.date.localeCompare(b.date)).at(-1);
  return state.meterSetup.sets.flatMap(set => set.products.map(p => {
    const product = products.find(item => item.id === p.product);
    const id = `${set.id}--${p.product}`;
    return { ...product, id, product: p.product, dispenser: set.id, name: `${set.forecourt} / ${set.id} · ${product.name}`, opening: correction?.meterReadings?.[id]?.opening ?? latest?.meterReadings?.[id]?.closing ?? p.opening };
  }));
}

export function dispenserRow(index = 1) {
  return `<fieldset data-dispenser><legend>Dispenser set</legend><label>Dispenser ID<input name="dispenser" value="D${index}" pattern="[A-Za-z0-9_-]{1,40}" required /></label><label>Forecourt<input name="forecourt" value="Forecourt 1" maxlength="80" required /></label><p>Select 1–3 products and enter each physical opening totalizer.</p>${products.map(p => `<label><span><input type="checkbox" data-product="${p.id}" /> ${p.name}</span><input type="number" data-baseline="${p.id}" aria-label="${p.name} opening totalizer" min="0" step="0.01" placeholder="Verified reading" /></label>`).join("")}<button type="button" class="secondary" data-remove-dispenser>Remove set</button></fieldset>`;
}

export function meterEvidence(row) {
  if (!row.meterReadings) return products.map(p => `${p.name}: ${number(row.openingTotalizers?.[p.id] || 0)} → ${number(row.closingTotalizers?.[p.id] || 0)}; ${number(row[p.id+'Liters'])} L`).join(' · ');
  return Object.entries(row.meterReadings).map(([id,m]) => `${escapeHtml(id)}: ${number(m.opening)} → ${number(m.closing)} − ${number(m.test)} L testing = ${number(m.liters)} L sold`).join('<br>');
}

export function meterSettings(state) {
  const locked = state.closeouts.some(r => r.workflow === "pending" || r.meterReadings);
  return `<section class="panel form-panel"><h2>Forecourts & dispenser meters</h2><p>One independent physical totalizer per product per dispenser. Historical product-level readings are retained, not assigned to new equipment. Opening evidence must match the latest accepted day: ${escapeHtml(latestTotalizerRecord(state).date)}. Commissioning does not change stock or sales.</p>${state.meterSetup ? `<p>${state.meterSetup.sets.length} dispenser set(s) commissioned · ${escapeHtml(state.meterSetup.reference)}</p>${meterEntries(state).map(m => `<p>${escapeHtml(m.name)} · opening ${number(m.opening)} L</p>`).join("")}` : "<p>No dispenser meters commissioned. Existing closeouts use legacy product-level readings.</p>"}${state.role === "Owner" && !locked ? `<form id="meter-setup"><div data-dispenser-list>${dispenserRow()}</div><button type="button" class="secondary" data-add-dispenser>Add dispenser set</button><label>Verified opening date<input name="date" type="date" required value="${latestTotalizerRecord(state).date}" /></label><label>Reading evidence / commissioning reason<input name="reference" maxlength="500" required /></label><button class="primary">Commission dispenser meters</button></form>` : `<p>${locked ? "Equipment changes now require a reviewed migration; recorded meter identities cannot be overwritten." : "Owner role required to commission meters."}</p>`}</section>`;
}
