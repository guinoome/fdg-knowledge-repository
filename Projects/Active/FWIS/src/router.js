/* ============================================================================
   FWIS — Hash router
   ----------------------------------------------------------------------------
   Hash routing rather than History API so the app works when opened from a
   static host or a subdirectory with no server rewrite rules — Stage 0 has no
   backend to configure.
   ============================================================================ */

import { focusMain } from "./ui.js";

const routes = [];
let notFound = () => "<p>Not found.</p>";
let current = null;

/** @param pattern e.g. "/turnover/:id" */
export function route(pattern, handler) {
  const keys = [];
  const regex = new RegExp(
    "^" + pattern.replace(/:([A-Za-z0-9_]+)/g, (_, k) => { keys.push(k); return "([^/]+)"; }) + "$"
  );
  routes.push({ pattern, regex, keys, handler });
}

export function setNotFound(handler) { notFound = handler; }

export function navigate(path, { replace = false } = {}) {
  const target = "#" + path;
  if (replace) location.replace(target);
  else location.hash = path;
}

export function currentPath() {
  return location.hash.replace(/^#/, "") || "/";
}

function match(path) {
  for (const r of routes) {
    const m = path.match(r.regex);
    if (m) {
      const params = {};
      r.keys.forEach((k, i) => { params[k] = decodeURIComponent(m[i + 1]); });
      return { handler: r.handler, params, pattern: r.pattern };
    }
  }
  return null;
}

async function render() {
  const path = currentPath();
  const view = document.getElementById("view");
  const hit = match(path);

  // Let the outgoing screen tear down listeners/timers.
  if (current?.dispose) { try { current.dispose(); } catch { /* non-fatal */ } }
  current = null;

  try {
    const result = hit
      ? await hit.handler(hit.params, view)
      : await notFound(path, view);

    // A screen may either return HTML, or render itself and return a
    // controller object with an optional dispose().
    if (typeof result === "string") view.innerHTML = result;
    else if (result && typeof result === "object") current = result;
  } catch (err) {
    console.error("[router]", err);
    view.innerHTML = `<div class="error-state">
      <h2>Something went wrong</h2>
      <p>${(err && err.message) || "Unknown error"}</p>
    </div>`;
  }

  paintActiveNav(path);
  focusMain();
  scrollTo({ top: 0 });
}

function paintActiveNav(path) {
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const target = a.getAttribute("data-nav");
    const active = target === "/" ? path === "/" : path.startsWith(target);
    a.classList.toggle("is-active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

export function startRouter() {
  addEventListener("hashchange", render);
  if (!location.hash) navigate("/", { replace: true });
  return render();
}

export function refresh() { return render(); }
