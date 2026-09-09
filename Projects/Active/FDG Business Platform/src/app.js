import { getModule } from "../data/catalog.js";
import { cancelSubscription, completeTrial, loadState, resetPlatformDemo, saveState, startActivation } from "./store.js";
import { renderApp } from "./views.js";

let state = loadState();

function routeFromHash() {
  const raw = location.hash.replace(/^#\/?/, "") || "home";
  const separator = raw.includes("=") ? "=" : "/";
  const [page, id] = raw.split(separator);
  return { page, id };
}

function go(page, id = "") {
  location.hash = `#${page}${id ? `=${id}` : ""}`;
}

function render() {
  const route = routeFromHash();
  if (route.page === "activate" && (!state.activation || (route.id && state.activation.moduleId !== route.id))) {
    startActivation(state, route.id || "fuel");
  }
  if (["home", "discover"].includes(route.page) && route.id) state.selectedCategory = route.id;
  if (route.page === "platforms" && route.id) state.platformFilter = decodeURIComponent(route.id);
  document.querySelector("#app").innerHTML = renderApp(state, route);
  document.body.dataset.currentRoute = route.page;
  requestAnimationFrame(() => document.querySelector("main")?.focus({ preventScroll: true }));
}

function toast(message) {
  const target = document.querySelector("#toast");
  if (!target) return;
  target.textContent = message;
  target.classList.add("is-visible");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => target.classList.remove("is-visible"), 3200);
}

function handleClick(event) {
  const route = event.target.closest("button[data-route], a[data-route]");
  if (route) return go(route.dataset.route);

  const category = event.target.closest("[data-category]");
  if (category) {
    state.selectedCategory = category.dataset.category;
    saveState(state);
    return render();
  }

  const explore = event.target.closest("[data-explore]");
  if (explore) return go("platform", explore.dataset.explore);

  const activate = event.target.closest("[data-activate]");
  if (activate) {
    startActivation(state, activate.dataset.activate);
    return go("activate", activate.dataset.activate);
  }

  const next = event.target.closest("[data-activation-next]");
  if (next && state.activation) {
    const selected = document.querySelector('input[name="plan"]:checked');
    if (selected) state.activation.planId = selected.value;
    state.activation.step = Number(next.dataset.activationNext);
    saveState(state);
    return render();
  }

  const back = event.target.closest("[data-activation-back]");
  if (back && state.activation) {
    state.activation.step = Number(back.dataset.activationBack);
    saveState(state);
    return render();
  }

  if (event.target.closest("[data-complete-trial]")) {
    const id = completeTrial(state);
    go("platforms");
    window.setTimeout(() => toast(`Local trial ${id} created. No payment was made.`), 50);
    return;
  }

  const platformFilter = event.target.closest("[data-platform-filter]");
  if (platformFilter) {
    state.platformFilter = platformFilter.dataset.platformFilter;
    saveState(state);
    return render();
  }

  const billing = event.target.closest("[data-billing]");
  if (billing) return go("billing", billing.dataset.billing);

  const cancel = event.target.closest("[data-cancel]");
  if (cancel) return go("cancel", cancel.dataset.cancel);

  const confirmCancel = event.target.closest("[data-confirm-cancel]");
  if (confirmCancel) {
    cancelSubscription(state, confirmCancel.dataset.confirmCancel);
    go("platforms");
    window.setTimeout(() => toast("Only that local module subscription was cancelled."), 50);
    return;
  }

  const addBranch = event.target.closest("[data-add-branch]");
  if (addBranch) {
    const subscription = state.subscriptions.find((item) => item.id === addBranch.dataset.addBranch);
    if (subscription) {
      startActivation(state, subscription.moduleId);
      state.activation.businessName = subscription.businessName;
      state.activation.planId = subscription.planId;
      state.activation.step = 2;
      saveState(state);
      return go("activate", subscription.moduleId);
    }
  }

  if (event.target.closest("[data-clear-search]")) {
    state.catalogQuery = "";
    saveState(state);
    return render();
  }

  if (event.target.closest("[data-local-invite]")) return toast("Invitation drafting is local-only in this release; no email was sent.");

  if (event.target.closest("[data-reset-demo]")) {
    state = resetPlatformDemo();
    render();
    return toast("Local prototype state reset.");
  }

  if (event.target.closest("[data-menu]")) document.querySelector(".side-rail")?.classList.toggle("is-open");
}

function handleSubmit(event) {
  if (event.target.id === "activation-branch-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    state.activation.businessName = String(data.get("businessName") ?? "").trim();
    state.activation.branchName = String(data.get("branchName") ?? "").trim();
    state.activation.branches = Math.min(20, Math.max(1, Number(data.get("branches")) || 1));
    state.activation.step = 3;
    saveState(state);
    return render();
  }
  if (event.target.id === "support-brief-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    toast(`Local brief ready: ${data.get("business")}, ${data.get("priority")}, ${data.get("branches")} branch scope.`);
  }
}

function handleInput(event) {
  if (event.target.id !== "catalog-search") return;
  state.catalogQuery = event.target.value;
  saveState(state);
  window.clearTimeout(render.searchTimer);
  render.searchTimer = window.setTimeout(() => {
    const position = event.target.selectionStart;
    render();
    const input = document.querySelector("#catalog-search");
    input?.focus();
    input?.setSelectionRange(position, position);
  }, 120);
}

window.addEventListener("hashchange", () => {
  if (routeFromHash().page === "activate" && state.activation?.moduleId !== routeFromHash().id) startActivation(state, routeFromHash().id || "fuel");
  window.scrollTo({ top: 0, behavior: "instant" });
  render();
});

window.addEventListener("online", () => toast("Online. Local prototype state is available."));
window.addEventListener("offline", () => toast("Offline. The cached platform shell remains available."));
document.addEventListener("click", handleClick);
document.addEventListener("submit", handleSubmit);
document.addEventListener("input", handleInput);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});

if (!location.hash) location.hash = "#home";
render();
