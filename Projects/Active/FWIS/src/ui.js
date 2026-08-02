/* ============================================================================
   FWIS — Shared UI helpers
   Rendering primitives, escaping, theme, and toasts. No screen-specific logic.
   ============================================================================ */

import { CONFIG, enumValues, severityClassFor, stateClassFor } from "./config.js";

/* ------------------------------------------------------------- escaping --- */

export function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

/** Tagged template that escapes every interpolated value.
 *  Use html`` for anything containing user data. */
export function html(strings, ...values) {
  return strings.reduce((out, s, i) => {
    const v = values[i - 1];
    const safe = Array.isArray(v) ? v.join("") : esc(v);
    return out + safe + s;
  });
}

/** Marks a pre-built HTML string as trusted, for composing fragments. */
export function raw(s) { return { toString: () => s, __raw: true }; }

export function el(tag, className, inner) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (inner !== undefined) node.innerHTML = inner;
  return node;
}

/* --------------------------------------------------------------- fields --- */

export function optionsHtml(values, selected, placeholder = "Select…") {
  const opts = values.map((v) =>
    `<option value="${esc(v)}"${v === selected ? " selected" : ""}>${esc(v)}</option>`
  ).join("");
  return placeholder === null ? opts : `<option value="">${esc(placeholder)}</option>${opts}`;
}

export function enumOptions(name, selected, placeholder) {
  return optionsHtml(enumValues(name), selected, placeholder);
}

/* ---------------------------------------------------------------- badge --- */

export function statusBadge(status) {
  return `<span class="badge"><span class="led on-${stateClassFor(status)}"></span>${esc(status)}</span>`;
}

export function severityPill(enumName, value) {
  const cls = severityClassFor(enumName, value);
  return `<span class="pill text-${cls}">${esc(value)}</span>`;
}

export function ledFor(enumName, value) {
  return `<span class="led on-${severityClassFor(enumName, value)}"></span>`;
}

/* ---------------------------------------------------------------- dates --- */

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso.length <= 10 ? iso + "T00:00:00" : iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit"
  });
}

export function relativeDays(iso) {
  if (!iso) return null;
  const then = new Date(iso.length <= 10 ? iso + "T00:00:00" : iso);
  return Math.floor((Date.now() - then.getTime()) / 86400000);
}

/* ---------------------------------------------------------------- theme --- */

const THEME_KEY = "fwis-theme";

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  setTheme(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
}

export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById("theme-btn");
  if (btn) {
    btn.textContent = theme === "dark" ? "Light" : "Dark";
    btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }
}

export function toggleTheme() {
  setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
}

/* ---------------------------------------------------------------- toast --- */

let toastTimer = null;

export function toast(message, tone = "ok") {
  const host = document.getElementById("toast");
  if (!host) return;
  host.textContent = message;
  host.className = `toast toast-${tone} is-visible`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { host.className = "toast"; }, 3200);
}

/* -------------------------------------------------------------- offline --- */

export function initConnectivity() {
  const paint = () => {
    const off = !navigator.onLine;
    document.body.classList.toggle("is-offline", off);
    const chip = document.getElementById("offline-chip");
    if (chip) chip.hidden = !off;
  };
  addEventListener("online", paint);
  addEventListener("offline", paint);
  paint();
}

/* ------------------------------------------------------------ empty ui --- */

export function emptyState(title, detail, actionHtml = "") {
  return `<div class="empty-state">
    <p class="empty-title">${esc(title)}</p>
    <p class="empty-detail">${esc(detail)}</p>
    ${actionHtml}
  </div>`;
}

/* ------------------------------------------------------------ a11y ------ */

/** Moves focus to the main region after a route change so keyboard and screen
 *  reader users land in the new screen rather than the top of the document. */
export function focusMain() {
  const main = document.getElementById("view");
  if (main) { main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true }); }
}

export const APP = CONFIG.app;
