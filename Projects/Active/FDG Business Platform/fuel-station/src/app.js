import { products } from "../data/nj-gas-station.js";
import { peso } from "./format.js";
import { icon } from "./icons.js";
import { addAudit, loadState, reportCsv, resetDemo, saveState } from "./store.js";
import { views } from "./views.js";

let state = loadState();
let currentView = "experience";
const workspace = document.querySelector("#workspace");
const nav = document.querySelector("#primary-nav");
const toast = document.querySelector("#toast");
const roleSelect = document.querySelector("#role-select");
const mobileDock = document.querySelector("#mobile-dock");
const storageState = document.querySelector("#storage-state");
roleSelect.value = state.role;

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function go(view, { updateHash = true } = {}) {
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
  let sales = 0;
  let margin = 0;
  products.forEach((product) => {
    const opening = Number(form.elements[`${product.id}-opening`].value || 0);
    const closing = Number(form.elements[`${product.id}-closing`].value || 0);
    const test = Number(form.elements[`${product.id}-test`].value || 0);
    const volume = closing - opening - test;
    form.querySelector(`[data-volume="${product.id}"]`).textContent = `${volume.toFixed(2)} L`;
    sales += Math.max(0, volume) * state.prices[product.id].sellingPrice;
    margin += Math.max(0, volume) * (state.prices[product.id].sellingPrice - state.prices[product.id].buyingPrice);
  });
  const costs = ["electricity", "manpower", "otherCost"].reduce((sum, name) => sum + Number(form.elements[name].value || 0), 0);
  const cash = Number(form.elements.cashCollected.value || 0);
  form.querySelector("#expected-sales").textContent = peso(sales);
  form.querySelector("#gross-margin").textContent = peso(margin - costs);
  form.querySelector("#cash-variance").textContent = peso(cash - sales);
  return { sales, profit: margin - costs, cashVariance: cash - sales };
}

function handleCloseout(form) {
  const preview = closeoutPreview(form);
  const row = { id: crypto.randomUUID(), date: form.elements.date.value, status: "local", sales: preview.sales, profit: preview.profit, cashVariance: preview.cashVariance };
  let invalid = false;
  let insufficientStock = false;
  products.forEach((product) => {
    const volume = Number(form.elements[`${product.id}-closing`].value) - Number(form.elements[`${product.id}-opening`].value) - Number(form.elements[`${product.id}-test`].value);
    row[`${product.id}Liters`] = volume;
    if (volume < 0) invalid = true;
    if (volume > state.tanks[product.id]) insufficientStock = true;
  });
  if (invalid) return notify("Closeout held: a calculated fuel volume is negative.");
  if (insufficientStock) return notify("Closeout held: recorded sales exceed available wet stock.");
  if (state.closeouts.some((item) => item.date === row.date)) return notify("Closeout held: this local operating date already exists.");
  products.forEach((product) => { state.tanks[product.id] -= row[`${product.id}Liters`]; });
  state.closeouts.push(row);
  addAudit(state, "Daily closeout saved for review", `${row.date}; expected sales ${peso(row.sales)}; cash variance ${peso(row.cashVariance)}.`);
  saveState(state);
  notify("Closeout saved locally for manager review.");
  go("reports");
}

function handleDelivery(form) {
  const data = new FormData(form);
  const product = data.get("product");
  const liters = Number(data.get("liters"));
  const unitCost = Number(data.get("unitCost"));
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
  workspace.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => go(button.dataset.go)));
  const closeout = workspace.querySelector("#closeout-form");
  closeout?.addEventListener("input", () => closeoutPreview(closeout));
  closeout?.addEventListener("submit", (event) => { event.preventDefault(); handleCloseout(closeout); });
  const delivery = workspace.querySelector("#delivery-form");
  delivery?.addEventListener("submit", (event) => { event.preventDefault(); handleDelivery(delivery); });
  const pricing = workspace.querySelector("#pricing-form");
  pricing?.addEventListener("submit", (event) => { event.preventDefault(); handlePricing(pricing); });
  workspace.querySelector("#export-report")?.addEventListener("click", exportCsv);
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
  storageState.innerHTML = `<span class="status-dot"></span>${offline ? "Offline · saved locally" : "Saved locally"}`;
}

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
