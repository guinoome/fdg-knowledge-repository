/* ============================================================================
   Generic module form — create and edit
   ----------------------------------------------------------------------------
   Builds a form from a module's field declarations. Required-field gating,
   per-property option lists and the reference number all come from the model,
   so a new module is a config entry rather than a new screen.
   ============================================================================ */

import * as M from "../modules/model.js";
import * as identity from "../identity.js";
import * as db from "../db.js";
import { esc, optionsHtml, toast, emptyState } from "../ui.js";
import { navigate } from "../router.js";

export function moduleFormScreen(routeId) {
  return async function screen(params, view) {
    const mod = M.moduleByRoute(routeId);
    if (!mod) { view.innerHTML = emptyState("Unknown module", `No module is routed at ${esc(routeId)}.`); return; }

    const me = identity.current();
    const propertyId = me.propertyId;

    const existing = params.id ? await db.get(params.id) : null;
    if (params.id && !existing) {
      view.innerHTML = emptyState("Not found", "This record may have been deleted.");
      return;
    }

    const status = existing?.status || M.flowOf(mod).initial;
    const data = existing ? { ...existing.data } : M.blankData(mod, propertyId, me.userId);
    const fields = M.visibleFields(mod, status);

    view.innerHTML = `
    <header class="screen-head">
      <div>
        <h2>${existing ? "Edit" : "New"} ${esc(mod.label.toLowerCase())}</h2>
        <p class="sub">${esc(mod.spec)}${existing ? ` · <span class="mono">${esc(data.ref)}</span>` : ""}</p>
      </div>
    </header>

    <form id="mod-form" class="wizard-form" novalidate>
      <div class="grid-2">
        ${fields.map((f) => fieldHtml(mod, f, data, propertyId)).join("")}
      </div>
      <p class="form-error" id="form-error" hidden></p>
      <div class="wizard-nav">
        <a class="btn" href="#/${esc(mod.route)}">Cancel</a>
        <button class="btn btn-primary" type="submit">${existing ? "Save changes" : `Create ${esc(mod.label.toLowerCase())}`}</button>
      </div>
    </form>`;

    const form = view.querySelector("#mod-form");
    const errBox = view.querySelector("#form-error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const next = read(mod, form, fields, data);
      const missing = M.validate(mod, next, status);
      if (missing.length) {
        errBox.hidden = false;
        errBox.textContent = `Required: ${missing.join(", ")}`;
        return;
      }
      errBox.hidden = true;

      if (existing) {
        await db.save({ ...existing, data: { ...existing.data, ...next } }, me.userId);
        toast(`${mod.label} saved`);
        navigate(`/${mod.route}/${existing.id}`);
      } else {
        const saved = await M.create(mod, next, propertyId, me.userId);
        toast(`${mod.label} ${saved.data.ref} created`);
        navigate(`/${mod.route}/${saved.id}`);
      }
    });
  };
}

function read(mod, form, fields, previous) {
  const out = { ...previous };
  for (const f of fields) {
    const el = form.elements[f.id];
    if (!el) continue;
    out[f.id] = f.type === "boolean" ? el.checked
      : f.type === "number" ? (el.value === "" ? "" : Number(el.value))
      : el.value;
  }
  return out;
}

function fieldHtml(mod, f, data, propertyId) {
  const req = f.required ? ` <em>required</em>` : "";
  const value = data[f.id] ?? "";

  if (f.type === "textarea") {
    return `<label class="field span-2"><span class="lbl">${esc(f.label)}${req}</span>
      <textarea name="${esc(f.id)}" rows="3">${esc(String(value))}</textarea></label>`;
  }
  if (f.type === "boolean") {
    return `<label class="field check"><input type="checkbox" name="${esc(f.id)}"${value ? " checked" : ""}>
      <span>${esc(f.label)}</span></label>`;
  }
  if (["enum", "user", "building", "department", "plant", "utility"].includes(f.type)) {
    const opts = M.fieldOptions(mod, f, propertyId);
    return `<label class="field"><span class="lbl">${esc(f.label)}${req}</span>
      <select name="${esc(f.id)}">
        <option value="">Select…</option>
        ${opts.map((o) => `<option value="${esc(o.id)}"${o.id === value ? " selected" : ""}>${esc(o.name)}</option>`).join("")}
      </select></label>`;
  }
  const type = f.type === "number" ? "number" : f.type === "date" ? "date" : f.type === "time" ? "time" : "text";
  return `<label class="field"><span class="lbl">${esc(f.label)}${req}</span>
    <input type="${type}" name="${esc(f.id)}" value="${esc(String(value))}"></label>`;
}
