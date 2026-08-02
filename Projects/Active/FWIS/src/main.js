/* ============================================================================
   FWIS — application entry point
   ============================================================================ */

import { CONFIG } from "./config.js";
import { route, setNotFound, startRouter, navigate } from "./router.js";
import { initTheme, toggleTheme, initConnectivity, esc } from "./ui.js";
import * as sync from "./sync/index.js";

import { dashboardScreen } from "./screens/dashboard.js";
import { listScreen } from "./screens/turnover-list.js";
import { composeScreen } from "./screens/turnover-compose.js";
import { detailScreen } from "./screens/turnover-detail.js";
import { searchScreen } from "./screens/search.js";
import { signInScreen } from "./screens/sign-in.js";

/* ---------------------------------------------------------------- routes -- */

route("/", dashboardScreen);
route("/turnovers", listScreen);
route("/turnover/new", (p, v) => composeScreen({}, v));
route("/turnover/:id", detailScreen);
route("/turnover/:id/edit", composeScreen);
route("/search", searchScreen);
route("/account", signInScreen);

setNotFound((path) => `<div class="error-state">
  <h2>Page not found</h2>
  <p>Nothing is routed at <code>${esc(path)}</code>.</p>
  <p><a class="btn" href="#/">Back to dashboard</a></p>
</div>`);

/* ------------------------------------------------------------------ boot -- */

function boot() {
  initTheme();
  initConnectivity();
  initSyncChip();

  document.getElementById("theme-btn").addEventListener("click", toggleTheme);
  document.getElementById("app-stage").textContent = CONFIG.app.stage;

  // Keyboard shortcut: "/" focuses search from anywhere outside a text field.
  addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.metaKey || e.ctrlKey) return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    e.preventDefault();
    navigate("/search");
  });

  return startRouter();
}

/** Surfaces sync state, and hides itself entirely when sync is not configured
 *  so a local-only install shows no dead affordance. */
function initSyncChip() {
  const chip = document.getElementById("sync-chip");
  const link = document.getElementById("account-link");
  if (!chip || !link) return;

  const paint = (s = sync.status()) => {
    if (s.mode === "local-only") { chip.hidden = true; link.hidden = true; return; }
    link.hidden = false;
    chip.hidden = false;
    if (s.mode === "signed-out") { chip.textContent = "Not signed in"; chip.dataset.tone = "warn"; return; }
    if (s.phase === "syncing")   { chip.textContent = "Syncing…";      chip.dataset.tone = "info"; return; }
    if (s.lastError)             { chip.textContent = "Sync failed";   chip.dataset.tone = "error"; return; }
    const n = s.stats?.conflicts || 0;
    chip.textContent = n ? `${n} conflict${n === 1 ? "" : "s"}` : "Synced";
    chip.dataset.tone = n ? "warn" : "ok";
  };

  sync.onSyncChange(paint);
  paint();
}

boot();

// Sync starts after the first render so a slow or failing network never delays
// the UI. A signed-out or unconfigured install simply does nothing here.
sync.start().catch((err) => console.warn("[fwis] sync did not start:", err.message));

/* -------------------------------------------------------- service worker -- */
// Registered after boot so a failure here never blocks the app rendering.
// Service workers require a secure context: https:// or localhost. Opening the
// files over file:// leaves the app fully functional but not installable.

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((err) => {
      console.warn("[fwis] service worker registration failed:", err.message);
    });
  });
}
