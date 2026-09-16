import { products } from "../data/nj-gas-station.js";
import { peso, localDate } from "./format.js";
import { icon } from "./icons.js";
import { addAudit, latestTotalizerRecord, loadState, reportCsv, resetDemo, saveState } from "./store.js";
import { views } from "./views.js";
import { submitCloseout, reviewCloseout, requireManager, validateOperatingDate } from "./closeouts.js";
import { storageError } from "./store.js";
import { totalizerCandidates } from "./ocr.js";
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

function go(view, { updateHash = true, preserveCorrection = false } = {}) {
  if (!preserveCorrection) correctionId = null;
  currentView = views[view] ? view : "overview";
  if (updateHash && window.location.hash !== `#${currentView}`) {
    window.history.replaceState(null, "", `#${currentView}`);
  }
  document.body.dataset.mode = currentView === "experience" ? "experience" : "operations";
  workspace.innerHTML = views[currentView](state);
  nav.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === currentView));
  mobileDock.querySelectorAll("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === currentView));
  document.querySelector("#sidebar").classList.remove("open");
  renderIcons(workspace);
  bindViewEvents();
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
  products.forEach((product) => {
    const opening = Number(form.querySelector(`[data-opening="${product.id}"]`).dataset.value);
    const closing = Number(form.elements[`${product.id}-closing`].value || opening);
    const test = Number(form.elements[`${product.id}-test`].value || 0);
    const volume = closing - opening - test;
    form.querySelector(`[data-volume="${product.id}"]`).textContent = `${volume.toFixed(2)} L`;
    sales += Math.max(0, volume) * prices[product.id].sellingPrice;
    margin += Math.max(0, volume) * (prices[product.id].sellingPrice - prices[product.id].buyingPrice);
  });
  const costs = ["electricity", "manpower", "otherCost"].reduce((sum, name) => sum + Number(form.elements[name].value || 0), 0);
  const cash = Number(form.elements.cashCollected.value || 0);
  form.querySelector("#expected-sales").textContent = peso(sales);
  form.querySelector("#gross-margin").textContent = peso(margin - costs);
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
  const capacity = products.find((item) => item.id === product).tankCapacity;
  if (state.tanks[product] + liters > capacity) return notify("Delivery held: volume would exceed the tank working capacity.");
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
  products.forEach((product) => { state.prices[product.id] = { buyingPrice: Number(data.get(`${product.id}-buy`)), sellingPrice: Number(data.get(`${product.id}-sell`)) }; });
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
    for (const p of products) {
      form.elements[`${p.id}-closing`].value = row.closingTotalizers[p.id];
      form.elements[`${p.id}-test`].value = row.tests?.[p.id] || 0;
      form.elements[`${p.id}-closing`].min = row.openingTotalizers[p.id];
      const opening = form.querySelector(`[data-opening="${p.id}"]`); opening.dataset.value = row.openingTotalizers[p.id]; opening.textContent = row.openingTotalizers[p.id].toLocaleString("en-PH");
    }
    for (const name of ["electricity","manpower","otherCost"]) form.elements[name].value = row.costs?.[name] || 0;
    form.elements.cashCollected.value = row.cashCollected || 0;
    closeoutPreview(form);
  }));
  workspace.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => go(button.dataset.go)));
  const closeout = workspace.querySelector("#closeout-form");
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
  workspace.querySelectorAll("[data-analytics-range]").forEach((button) => button.addEventListener("click", () => { state.analyticsRange = button.dataset.analyticsRange; saveState(state); go("reports"); }));
  const reviewBrief = workspace.querySelector("#review-brief-form");
  reviewBrief?.addEventListener("submit", (event) => { event.preventDefault(); buildReviewBrief(reviewBrief); });
  workspace.querySelectorAll("[data-scroll]").forEach((button) => button.addEventListener("click", () => workspace.querySelector(`#${button.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" })));
  workspace.querySelectorAll("[data-check]").forEach((box) => box.addEventListener("change", () => { state.checklist[box.dataset.check] = box.checked; addAudit(state, box.checked ? "Safety check completed" : "Safety check reopened", box.dataset.check); saveState(state); go("audit"); }));
  workspace.querySelector("#reset-demo")?.addEventListener("click", () => { if (!window.confirm("Reset only the local browser demo data?")) return; state = resetDemo(); roleSelect.value = state.role; go("audit"); notify("Local demo data reset."); });
}

nav.addEventListener("click", (event) => { const button = event.target.closest("[data-view]"); if (button) go(button.dataset.view); });
mobileDock.addEventListener("click", (event) => { const button = event.target.closest("[data-view]"); if (button) go(button.dataset.view); });
roleSelect.addEventListener("change", () => { state.role = roleSelect.value; addAudit(state, "Demo role changed", `Active role: ${state.role}. UI restrictions are illustrative; production authorization must be enforced server-side.`); saveState(state); go(currentView); });
document.querySelector("#menu-button").addEventListener("click", () => document.querySelector("#sidebar").classList.toggle("open"));
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
go(views[requestedView] ? requestedView : "experience");
