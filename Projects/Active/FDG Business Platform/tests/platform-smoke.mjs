import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CATEGORIES, MODULES, getModule, planTotal } from "../data/catalog.js";

assert.equal(CATEGORIES[0].id, "all", "catalog must retain an all-businesses category");
assert.equal(new Set(MODULES.map((module) => module.id)).size, MODULES.length, "module IDs must be unique");
assert.ok(MODULES.length >= 9, "mandate catalog must cover the prioritized business families");

for (const module of MODULES) {
  assert.ok(module.category && module.name && module.description && module.billingModel, `${module.id} must define its catalog contract`);
  assert.ok(module.plans.length > 0, `${module.id} must have configuration-driven plans`);
  for (const plan of module.plans) {
    assert.ok(Number.isInteger(plan.basePrice) && Number.isInteger(plan.branchPrice), `${module.id}/${plan.id} prices must use integer centavos`);
    assert.ok(planTotal(plan, 2) === plan.basePrice + plan.branchPrice, `${module.id}/${plan.id} branch pricing must be deterministic`);
  }
}

assert.equal(getModule("fuel").maturity, "Connected", "Fuel Operations must remain the first connected module");
assert.ok(MODULES.filter((module) => module.id !== "fuel").every((module) => module.maturity !== "Connected"), "roadmap modules must not claim connected workspaces");

const views = readFileSync(new URL("../src/views.js", import.meta.url), "utf8");
const store = readFileSync(new URL("../src/store.js", import.meta.url), "utf8");
const sw = readFileSync(new URL("../sw.js", import.meta.url), "utf8");

for (const route of ["home", "discover", "platforms", "portfolio", "account", "permissions", "billing", "cancel", "activate"]) {
  assert.ok(views.includes(`\"${route}\"`) || views.includes(`route.page === \"${route}\"`), `view routing must include ${route}`);
}
assert.match(views, /No payment provider is connected/, "payment boundary must be explicit");
assert.match(views, /must not terminate the FDG account or another subscription/, "cancellation isolation must be visible");
assert.match(store, /scope: id/, "module-specific audit scope must be retained");
assert.match(store, /moduleId:/, "subscription records must retain module scope");
assert.match(store, /branchName:/, "subscription records must retain branch scope");
assert.match(sw, /fdg-business-platform-v\d+/, "PWA shell must be versioned");

console.log("PASS: unified account, catalog, pricing, scope, lifecycle, and PWA invariants");
