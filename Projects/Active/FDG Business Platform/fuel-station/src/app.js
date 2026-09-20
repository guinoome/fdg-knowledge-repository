import { products } from "../data/nj-gas-station.js";
import { peso, localDate } from "./format.js";
import { icon } from "./icons.js";
import { addAudit, latestTotalizerRecord, loadState, reportCsv, resetDemo, saveState } from "./store.js";
import { views, salesExplorer } from "./views.js";
import { sceneDetail } from "./station-scene.js";
import { glassDialog } from "./glass-motion.js";
import { reviewIssue, attentionLabel } from "./attention.js";
import { addUtilityRate, reviewUtilityRate } from "./utility-rates.js";
import { submitCloseout, reviewCloseout, requireManager, validateOperatingDate } from "./closeouts.js";
import { storageError } from "./store.js";
import { totalizerCandidates } from "./ocr.js";
import { meterEntries, commissionMeters, dispenserRow } from "./meters.js";
import { addDeliveryLot, capacity, saveCapacity, saveMonthlyRecord, consumeLots, registeredTests, voidCalibration } from "./operations.js";
let correctionId = null;

let state = loadState();
let currentView = "experience";
const workspace = document.querySelector("#workspace");
const nav = document.querySelector("#primary-nav");
const toast = document.querySelector("#toast");
const roleSelect = document.querySelector("#role-select");
const mobileDock = document.querySelector("#mobile-dock");
const storageState = document.querySelector("#storage-state");
const saveAlert = document.createElement("p");
saveAlert.setAttribute("role", "alert");
saveAlert.style.cssText = "margin:12px 20px;padding:16px;border:2px solid #a32727;background:#fff4f4;color:#721c24";
saveAlert.hidden = true;
workspace.before(saveAlert);
roleSelect.value = state.role;

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

// Presentation preference only: never writes to station records or implies sync.
const wallpaperMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function updateWallpaperControl() {
  const button = workspace.querySelector('[data-wallpaper-toggle]');
  if (!button) return;
  const paused = document.body.dataset.wallpaperPaused === 'true';
  button.disabled = wallpaperMotion.matches;
  button.setAttribute('aria-pressed', String(paused || wallpaperMotion.matches));
  button.textContent = wallpaperMotion.matches ? 'Reduced motion enabled' : paused ? 'Resume ambient motion' : 'Pause ambient motion';
}
workspace.addEventListener('click', event => {
  if (!event.target.closest('[data-wallpaper-toggle]')) return;
  document.body.dataset.wallpaperPaused = String(document.body.dataset.wallpaperPaused !== 'true');
  updateWallpaperControl();
});
wallpaperMotion.addEventListener('change', updateWallpaperControl);
document.addEventListener('visibilitychange', () => { document.body.dataset.pageHidden = String(document.hidden); });

function go(view, { updateHash = true, preserveCorrection = false } = {}) {
  if (!preserveCorrection) correctionId = null;
  currentView = views[view] ? view : "overview";
  if (updateHash && window.location.hash !== `#${currentView}`) {
    window.history.replaceState(null, "", `#${currentView}`);
  }
  document.body.dataset.mode = currentView === "experience" ? "experience" : "operations";
  document.body.dataset.view = currentView;
  workspace.innerHTML = views[currentView](state);
  nav.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === currentView));
  mobileDock.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === currentView));
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#sidebar").inert = true;
  document.querySelector("#menu-button").setAttribute('aria-expanded', 'false');
  renderIcons(workspace);
  bindViewEvents();
  updateWallpaperControl();
  updateConnectionState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildReviewBrief(form) {
  const data = new FormData(form);
  const output = workspace.querySelector("#review-brief-output");
  output.hidden = false;
  output.querySelector("[data-brief='station']").textContent = data.get("station") || "Your station";
  output.querySelector("[data-brief='priority']").textContent = data.get("priority");
  output.querySelector("[data-brief='next']").textContent = "Next: validate one real closeout, measure time and correction rate, then decide the production data architecture.";
  addAudit(state, "Local client review brief prepared", `${data.get("station") || "Unnamed station"}; priority: ${data.get("priority")}. No information was transmitted.`);
  saveState(state);
  notify("Review brief prepared locally. Nothing was sent.");
  output.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeoutPreview(form) {
  const prices = state.closeouts.find((r) => r.id === correctionId)?.prices || state.prices;
  let sales = 0;
  let margin = 0;
  let costReady = true;
  const volumes = Object.fromEntries(products.map(p => [p.id, 0]));
  meterEntries(state).forEach((product) => {
    const opening = Number(form.querySelector(`[data-opening="${product.id}"]`).dataset.value);
    const closing = Number(form.elements[`${product.id}-closing`].value || opening);
    const test = Number(form.elements[`${product.id}-test`].value || 0);
    const volume = closing - opening - test;
    form.querySelector(`[data-volume="${product.id}"]`).textContent = `${volume.toFixed(2)} L`;
    volumes[product.product] += volume;
  });
  products.forEach(product => {
    const volume = volumes[product.id];
    sales += Math.max(0, volume) * prices[product.id].sellingPrice;
    try {
      const lots = structuredClone(state.inventoryLots[product.id]);
      const original = state.closeouts.find((r) => r.id === correctionId && r.workflow === "approved");
      for (const allocation of original?.fifoAllocations?.[product.id] || []) lots.find((l) => l.id === allocation.lotId).remaining += allocation.liters;
      margin += Math.max(0,volume) * prices[product.id].sellingPrice - consumeLots(lots,Math.max(0,volume),form.elements.date.value).cost;
    } catch { costReady = false; }
  });
  const costs = Number(form.elements.otherCost.value || 0);
  const cash = Number(form.elements.cashCollected.value || 0);
  form.querySelector("#expected-sales").textContent = peso(sales);
  form.querySelector("#gross-margin").textContent = costReady ? peso(margin - costs) : "Cost reconciliation needed";
  form.querySelector("#cash-variance").textContent = peso(cash - sales);
  return { sales, profit: margin - costs, cashVariance: cash - sales };
}

function handleCloseout(form) {
  try {
    for (const box of form.querySelectorAll("[data-ocr-confirm]")) {
      if (!box.checked) throw new Error("Confirm each photo-assisted final reading before submitting.");
    }
    const data = new FormData(form);
    const input = Object.fromEntries(data);
    input.closing = Object.fromEntries(products.map((p) => [p.id, data.get(`${p.id}-closing`)]));
    input.tests = Object.fromEntries(products.map((p) => [p.id, data.get(`${p.id}-test`)]));
    if (state.meterSetup) input.meters = Object.fromEntries(meterEntries(state).map(m => [m.id, { closing: data.get(`${m.id}-closing`), test: data.get(`${m.id}-test`) }]));
    input.replaces = correctionId;
    input.photoReviewed = [...form.querySelectorAll("[data-ocr-confirm]")].map((box) => box.dataset.ocrConfirm);
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
    submitCloseout(state, input, today);
    saveState(state);
    correctionId = null;
    go("reports");
    notify("Submitted for review. Stock changes only after approval.");
  } catch (error) { showSaveError(error); }
}


async function handleTotalizerPhoto(input) {
  const productId = input.dataset.ocrInput;
  const file = input.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/") || file.size > 15 * 1024 * 1024) { input.value = ""; return notify("Choose an image smaller than 15 MB."); }
  const status = workspace.querySelector(`[data-ocr-status="${productId}"]`);
  const closingInput = workspace.querySelector(`[name="${productId}-closing"]`);
  const opening = Number(workspace.querySelector(`[data-opening="${productId}"]`).dataset.value);
  const assist = input.closest(".ocr-assist");
  assist.querySelector("[data-photo-review]")?.remove();
  const review = document.createElement("div");
  review.dataset.photoReview = "";
  const preview = document.createElement("img");
  preview.alt = "Selected meter photo for reading verification";
  preview.style.cssText = "max-width:100%;max-height:200px;object-fit:contain";
  const url = URL.createObjectURL(file); preview.src = url; preview.onload = () => URL.revokeObjectURL(url);
  const label = document.createElement("label");
  const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.dataset.ocrConfirm = productId; checkbox.required = true;
  checkbox.style.cssText = "position:static;clip:auto;width:20px;height:20px";
  label.append(checkbox, "I compared the final reading with this photo."); review.append(preview, label); assist.append(review);
  closingInput.addEventListener("input", () => { checkbox.checked = false; });
  if (!("TextDetector" in window)) {
    status.textContent = "Photo preview only; not stored. OCR is unavailable in this browser. Enter and confirm the final reading manually.";
    return notify("Photo ready. Confirm the final totalizer manually in this browser.");
  }
  status.textContent = "Reading photo on this device…";
  try {
    const bitmap = await createImageBitmap(file);
    const blocks = await new window.TextDetector().detect(bitmap);
    bitmap.close?.();
    if (!input.isConnected || input.files?.[0] !== file) return;
    const candidates = totalizerCandidates(blocks, opening);
    if (candidates.length !== 1) {
      status.textContent = "No unique reading was detected. Compare the photo and enter the final totalizer manually.";
      return notify("OCR needs manual confirmation; no plausible final reading was found.");
    }
    closingInput.value = candidates[0].toFixed(2);
    closingInput.dispatchEvent(new Event("input", { bubbles: true }));
    status.textContent = `OCR proposed ${candidates[0].toFixed(2)}. Compare it with the photo and edit before saving.`;
    notify("OCR proposed a reading. Confirm it against the meter photo.");
  } catch {
    status.textContent = "The photo could not be read on this device. Enter the final totalizer manually.";
    notify("OCR could not read this photo. Manual entry remains available.");
  }
}

function handleDelivery(form) {
  requireManager(state);
  const data = new FormData(form);
  const product = data.get("product");
  const liters = Number(data.get("liters"));
  const unitCost = Number(data.get("unitCost"));
  validateOperatingDate(data.get("date"), localDate());
  if (data.get("date") <= latestTotalizerRecord(state).date) throw new Error("Delivery date must be after the latest posted close; earlier movements require reviewed reconciliation.");
  if (!products.some((p) => p.id === product) || !Number.isFinite(liters) || liters <= 0 || !Number.isFinite(unitCost) || unitCost < 0 || !String(data.get("reference") || "").trim()) throw new Error("Enter a valid product, volume, cost, and delivery reference.");
  const delivery = { id: `DEL-${String(state.deliveries.length + 1).padStart(3, "0")}`, date: data.get("date"), product, liters, unitCost, reference: data.get("reference"), status: "posted" };
  const tankLimit = capacity(state, product);
  if (state.tanks[product] + liters > tankLimit) return notify("Delivery held: volume would exceed the tank working capacity.");
  delivery.id = crypto.randomUUID();
  addDeliveryLot(state, delivery);
  state.deliveries.unshift(delivery);
  state.tanks[product] += liters;
  addAudit(state, "Fuel delivery posted", `${delivery.id}; ${product}; ${liters.toFixed(2)} L; ${delivery.reference}.`);
  saveState(state);
  notify("Delivery posted and wet-stock balance updated.");
  go("deliveries");
}

function handlePricing(form) {
  requireManager(state);
  const data = new FormData(form);
  const nextPrices = structuredClone(state.prices);
  products.forEach((product) => { const selling = Number(data.get(`${product.id}-sell`)); if (!Number.isFinite(selling) || selling < 0) throw new Error("Enter valid selling prices."); nextPrices[product.id].sellingPrice = selling; });
  state.prices = nextPrices;
  addAudit(state, "Fuel prices changed", data.get("reason"));
  saveState(state);
  notify("Prices updated with an audit reason.");
  go("pricing");
}

function exportCsv() {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([reportCsv(state)], { type: "text/csv" }));
  link.download = `nj-gas-station-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function bindViewEvents() {
  const setup = workspace.querySelector('#meter-setup');
  setup?.querySelector('[data-add-dispenser]').addEventListener('click', () => {
    const list = setup.querySelector('[data-dispenser-list]');
    list.insertAdjacentHTML('beforeend', dispenserRow(list.children.length + 1));
  });
  setup?.addEventListener('click', event => event.target.closest('[data-remove-dispenser]')?.closest('[data-dispenser]').remove());
  setup?.addEventListener('submit', event => {
    event.preventDefault();
    try {
      const sets = [...setup.querySelectorAll('[data-dispenser]')].map(field => ({ id: field.querySelector('[name=dispenser]').value.trim(), forecourt: field.querySelector('[name=forecourt]').value, products: [...field.querySelectorAll('[data-product]:checked')].map(box => ({ product: box.dataset.product, opening: field.querySelector(`[data-baseline="${box.dataset.product}"]`).value })) }));
      commissionMeters(state, { sets, date: setup.elements.date.value, reference: setup.elements.reference.value });
      saveState(state); go('settings'); notify('Dispenser meters commissioned locally. Stock and history unchanged.');
    } catch (error) { showSaveError(error); }
  });
  workspace.querySelector("[data-utility-add]")?.addEventListener("submit", event => {
    event.preventDefault();
    try { addUtilityRate(state,Object.fromEntries(new FormData(event.target))); saveState(state); go(currentView); notify("Pending utility rate saved locally."); } catch(error) { showSaveError(error); }
  });
  workspace.querySelectorAll("[data-utility-review]").forEach(form=>form.addEventListener("submit",event=>{
    event.preventDefault();
    try { reviewUtilityRate(state,form.dataset.utilityReview,event.submitter.value,form.elements.reason.value); saveState(state); go(currentView); notify("Rate review saved. Monthly expenses unchanged."); } catch(error) { showSaveError(error); }
  }));
  workspace.querySelectorAll("[data-void-test]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    try { voidCalibration(state,form.dataset.voidTest,form.elements.reason.value); saveState(state); go(currentView); notify("Test voided; audit history retained."); } catch (error) { showSaveError(error); }
  }));
  workspace.querySelectorAll("[data-monthly-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    try { saveMonthlyRecord(state, { ...Object.fromEntries(new FormData(form)), kind: form.dataset.monthlyForm }, localDate()); saveState(state); go(currentView); notify("Monthly record saved."); } catch (error) { showSaveError(error); }
  }));
  workspace.querySelector("#capacity-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    try { saveCapacity(state,Object.fromEntries(new FormData(event.target))); saveState(state); go(currentView); notify("Working capacity saved."); } catch (error) { showSaveError(error); }
  });
  workspace.querySelectorAll("[data-review-form]").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    try { reviewCloseout(state, form.dataset.reviewForm, event.submitter.value, form.elements.reason.value); saveState(state); go("reports"); notify("Review saved."); } catch (error) { showSaveError(error); }
  }));
  workspace.querySelectorAll("[data-correct]").forEach((button) => button.addEventListener("click", () => {
    const row = state.closeouts.find((r) => r.id === button.dataset.correct);
    correctionId = row.id; go("closeout", { preserveCorrection: true });
    const form = workspace.querySelector("#closeout-form");
    form.elements.reason.required = true;
    form.querySelector(".prior-close-note strong").textContent = `Correction of revision ${row.revision || 1}: ${row.openingSource}`;
    form.querySelector(".prior-close-note small").textContent = "Original opening and price snapshot retained. A new revision will be submitted for review.";
    form.elements.date.value = row.date; form.elements.date.readOnly = true;
    for (const p of meterEntries(state, row)) {
      if (!form.elements[`${p.id}-closing`]) { notify('Legacy correction requires reconciliation after commissioning.'); return; }
      form.elements[`${p.id}-closing`].value = row.meterReadings?.[p.id]?.closing ?? row.closingTotalizers[p.id];
      form.elements[`${p.id}-test`].value = row.meterReadings?.[p.id]?.test ?? row.tests?.[p.id] ?? 0;
      form.elements[`${p.id}-closing`].min = p.opening;
      const opening = form.querySelector(`[data-opening="${p.id}"]`); opening.dataset.value = p.opening; opening.textContent = p.opening.toLocaleString("en-PH");
    }
    form.elements.otherCost.value = row.costs?.otherCost || 0;
    form.elements.cashCollected.value = row.cashCollected || 0;
    closeoutPreview(form);
  }));
  workspace.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => go(button.dataset.go)));
  const sceneDialog = workspace.querySelector(".scene-dialog");
  const sceneMotion = sceneDialog ? glassDialog(sceneDialog) : null;
  workspace.querySelectorAll("[data-scene-open]").forEach(button => button.addEventListener("click", () => {
    const kind = button.dataset.sceneOpen;
    sceneDialog.classList.toggle("attention-dialog",kind === "attention");
    const paint = () => {
      sceneDialog.querySelector(".scene-dialog-content").innerHTML = sceneDetail(state, kind, salesExplorer);
      renderIcons(sceneDialog);
      sceneDialog.querySelectorAll("[data-issue-review]").forEach(form=>form.addEventListener("submit",event=>{
        event.preventDefault();
        const id=form.dataset.issueReview;
        try {
          reviewIssue(state,{...Object.fromEntries(new FormData(form)),issueId:id}); saveState(state); paint();
          const pending = state.closeouts.filter(row => row.workflow === "pending").length;
          workspace.querySelector("[data-attention-label]").textContent = `${pending ? pending+" pending · " : ""}${attentionLabel(state)}`;
          const detail=sceneDialog.querySelector(`[data-issue="${id}"]`); detail.open=true;
          const archive = detail.closest(".attention-archive"); if (archive) archive.open = true;
          const message=detail.querySelector("[data-review-message]"); message.textContent="Review saved locally. Reporting eligibility is unchanged.";
          detail.querySelector("summary").focus();
        } catch(error) { form.querySelector("[data-review-message]").textContent=error.message; }
      }));
      sceneDialog.querySelector("[data-close-scene]").addEventListener("click", () => sceneMotion.close());
      sceneDialog.querySelectorAll("[data-go]").forEach(link => link.addEventListener("click", () => sceneMotion.close(() => go(link.dataset.go))));
      sceneDialog.querySelectorAll("[data-analytics-range]").forEach(tab => tab.addEventListener("click", () => {
        state.analyticsRange = tab.dataset.analyticsRange; paint();
        sceneDialog.querySelector(`[data-analytics-range="${state.analyticsRange}"]`).focus();
      }));
      sceneDialog.querySelector("[data-sales-date]")?.addEventListener("change", event => {
        if (!event.target.value || !event.target.checkValidity()) return;
        state.analyticsDate = event.target.value; paint(); sceneDialog.querySelector("[data-sales-date]").focus();
      });
      sceneDialog.querySelector("[data-sales-today]")?.addEventListener("click", () => { state.analyticsDate = localDate(); paint(); sceneDialog.querySelector("[data-sales-today]").focus(); });
    };
    paint(); sceneMotion.open(button);
  }));
  const closeout = workspace.querySelector("#closeout-form");
  const syncTests = () => {
    for (const p of meterEntries(state)) {
      const field = closeout.elements[`${p.id}-test`];
      const registered = registeredTests(state,closeout.elements.date.value,p.product).filter(r => !p.dispenser || r.pump === p.dispenser);
      if (registered.length) { field.value = registered.reduce((sum,r) => sum+r.liters,0); field.readOnly = true; field.dataset.registered = "true"; }
      else { if (field.dataset.registered) field.value = 0; field.readOnly = false; delete field.dataset.registered; }
    }
    closeoutPreview(closeout);
  };
  if (closeout) { closeout.elements.date.addEventListener("input",syncTests); syncTests(); }
  closeout?.addEventListener("input", () => closeoutPreview(closeout));
  closeout?.addEventListener("submit", (event) => { event.preventDefault(); handleCloseout(closeout); });
  closeout?.querySelectorAll("[data-ocr-input]").forEach((input) => input.addEventListener("change", () => handleTotalizerPhoto(input)));
  const delivery = workspace.querySelector("#delivery-form");
  delivery?.addEventListener("submit", (event) => { event.preventDefault(); handleDelivery(delivery); });
  const pricing = workspace.querySelector("#pricing-form");
  pricing?.addEventListener("submit", (event) => { event.preventDefault(); handlePricing(pricing); });
  workspace.querySelector("#export-report")?.addEventListener("click", exportCsv);
  workspace.querySelector("#export-backup")?.addEventListener("click", () => {
    try {
      const raw = localStorage.getItem("fdg-fuel-station-demo-v3");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([raw ?? "null"], { type: "application/json" }));
      link.download = `fuel-local-backup-${Date.now()}.json`; link.click(); URL.revokeObjectURL(link.href);
      notify("Backup exported. Keep it private; it includes local operational records.");
    } catch (error) { showSaveError(error); }
  });
  workspace.querySelectorAll("[data-analytics-range]").forEach((button) => button.addEventListener("click", () => { state.analyticsRange = button.dataset.analyticsRange; go(currentView); }));
  workspace.querySelector("[data-sales-date]")?.addEventListener("change", (event) => {
    if (!event.target.value || !event.target.checkValidity()) return;
    state.analyticsDate = event.target.value; go(currentView);
  });
  workspace.querySelector("[data-sales-today]")?.addEventListener("click", () => {
    state.analyticsDate = localDate(); go(currentView);
  });
  const reviewBrief = workspace.querySelector("#review-brief-form");
  reviewBrief?.addEventListener("submit", (event) => { event.preventDefault(); buildReviewBrief(reviewBrief); });
  workspace.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => workspace.querySelector(`#${button.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" })));
  workspace.querySelectorAll("[data-check]").forEach((box) => box.addEventListener("change", () => { state.checklist[box.dataset.check] = box.checked; addAudit(state, box.checked ? "Safety check completed" : "Safety check reopened", box.dataset.check); saveState(state); go("audit"); }));
  workspace.querySelector("#reset-demo")?.addEventListener("click", () => { if (!window.confirm("Reset only the local browser demo data?")) return; state = resetDemo(); roleSelect.value = state.role; go("audit"); notify("Local demo data reset."); });
}

nav.addEventListener("click", (event) => { const button = event.target.closest("[data-view]"); if (button) go(button.dataset.view); });
mobileDock.addEventListener("click", (event) => { const button = event.target.closest("[data-view]"); if (button) go(button.dataset.view); });
roleSelect.addEventListener("change", () => { state.role = roleSelect.value; addAudit(state, "Demo role changed", `Active role: ${state.role}. UI restrictions are illustrative; production authorization must be enforced server-side.`); saveState(state); go(currentView); });
const menuButton = document.querySelector('#menu-button');
const sidebar = document.querySelector('#sidebar');
function toggleMenu(open) {
  sidebar.classList.toggle('open', open); sidebar.inert = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  if (open) sidebar.querySelector('.nav-item.active')?.focus(); else menuButton.focus();
}
menuButton.addEventListener('click', () => toggleMenu(sidebar.inert));
const controlsButton = document.querySelector('#controls-button');
const controls = document.querySelector('#workspace-controls');
controlsButton.addEventListener('click', () => {
  controls.hidden = !controls.hidden;
  controlsButton.setAttribute('aria-expanded', String(!controls.hidden));
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || document.querySelector('dialog[open]')) return;
  if (!sidebar.inert) toggleMenu(false);
  else if (!controls.hidden) { controls.hidden = true; controlsButton.setAttribute('aria-expanded','false'); controlsButton.focus(); }
});
document.addEventListener('click', event => {
  if (!sidebar.inert && !sidebar.contains(event.target) && !menuButton.contains(event.target)) toggleMenu(false);
});
document.querySelector("#client-view").addEventListener("click", () => go("experience"));
document.querySelector("#global-search").addEventListener("input", (event) => { const query = event.target.value.toLowerCase().trim(); nav.querySelectorAll("[data-view]").forEach((button) => { button.hidden = query && !button.textContent.toLowerCase().includes(query); }); });

function updateConnectionState() {
  const offline = !navigator.onLine;
  document.querySelector("#offline-banner").classList.toggle("show", offline);
  storageState.textContent = storageError ? `Storage needs attention: ${storageError}` : offline ? "Offline · local records" : "Local records";
  saveAlert.hidden = !storageError;
  saveAlert.textContent = storageError ? `Records are not saved: ${storageError}. Keep this form open to retry. For another-tab conflicts, copy your entered values before reloading. Backup local records from Reports.` : "";
}

function showSaveError(error) {
  roleSelect.value = state.role;
  storageState.textContent = error.message;
  storageState.setAttribute("role", "alert");
  saveAlert.hidden = false;
  saveAlert.textContent = error.message;
  notify(error.message);
}
window.addEventListener("error", (event) => { if (event.error) showSaveError(event.error); });

window.addEventListener("online", updateConnectionState);
window.addEventListener("offline", updateConnectionState);
window.addEventListener("hashchange", () => {
  const requestedView = window.location.hash.slice(1);
  if (views[requestedView] && requestedView !== currentView) go(requestedView, { updateHash: false });
});
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => notify("Offline shell could not be registered in this browser."));

renderIcons();
updateConnectionState();

const requestedView = window.location.hash.slice(1);
state.analyticsDate = localDate();
state.analyticsRange = "daily";
go(views[requestedView] ? requestedView : "overview");
