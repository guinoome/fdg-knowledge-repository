/* ============================================================================
   FWIS — application entry point
   ============================================================================ */

import { CONFIG } from "./config.js";
import { route, setNotFound, startRouter, navigate } from "./router.js";
import { initTheme, toggleTheme, initConnectivity, esc } from "./ui.js";

import { dashboardScreen } from "./screens/dashboard.js";
import { listScreen } from "./screens/turnover-list.js";
import { composeScreen } from "./screens/turnover-compose.js";
import { detailScreen } from "./screens/turnover-detail.js";
import { searchScreen } from "./screens/search.js";

/* ---------------------------------------------------------------- routes -- */

route("/", dashboardScreen);
route("/turnovers", listScreen);
route("/turnover/new", (p, v) => composeScreen({}, v));
route("/turnover/:id", detailScreen);
route("/turnover/:id/edit", composeScreen);
route("/search", searchScreen);

setNotFound((path) => `<div class="error-state">
  <h2>Page not found</h2>
  <p>Nothing is routed at <code>${esc(path)}</code>.</p>
  <p><a class="btn" href="#/">Back to dashboard</a></p>
</div>`);

/* ------------------------------------------------------------------ boot -- */

function boot() {
  initTheme();
  initConnectivity();

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

boot();

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
