import { CATEGORIES, MODULES, getModule, peso, planTotal } from "../data/catalog.js";
import { verifiedHistory, sourceExceptions } from "../fuel-station/data/nj-gas-station.js";
import { icon } from "./icons.js";

const navItems = [
  ["home", "Home", "home"],
  ["discover", "Discover", "discover"],
  ["platforms", "My Platforms", "platforms"],
  ["portfolio", "Portfolio", "opportunity"],
  ["resources", "Resources", "resources"],
  ["support", "Support", "support"],
  ["account", "Account", "account"],
];

const mobileItems = [
  ["home", "Home", "home"],
  ["discover", "Explore", "discover"],
  ["platforms", "My Platforms", "platforms"],
  ["search", "Search", "discover"],
  ["account", "Account", "account"],
];

export function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function logo() {
  return `<span class="brand-mark"><b>/</b><strong>FDG</strong><span>BUSINESS<br>PLATFORM</span></span>`;
}

function statusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function routeActive(route, id) {
  if (id === "discover" && ["discover", "platform", "activate", "search"].includes(route.page)) return "is-active";
  if (id === "platforms" && ["platforms", "billing", "cancel", "permissions"].includes(route.page)) return "is-active";
  return route.page === id ? "is-active" : "";
}

function shellNav(route) {
  return navItems.map(([id, label, glyph]) => `<button class="rail-link ${routeActive(route, id)}" data-route="${id}" ${routeActive(route, id) ? 'aria-current="page"' : ""}>${icon(glyph)}<span>${label}</span></button>`).join("");
}

function mobileNav(route) {
  return mobileItems.map(([id, label, glyph]) => `<button class="mobile-link ${routeActive(route, id)}" data-route="${id}" ${routeActive(route, id) ? 'aria-current="page"' : ""}>${icon(glyph)}<span>${label}</span></button>`).join("");
}

function categoryRail(state, compact = false) {
  const page = compact ? "discover" : "home";
  return `<div class="category-rail ${compact ? "is-compact" : ""}" aria-label="Business categories">${CATEGORIES.map((category) => `<a href="#${page}=${category.id}" class="category-button ${state.selectedCategory === category.id ? "is-selected" : ""}" aria-current="${state.selectedCategory === category.id ? "true" : "false"}"><span>${icon(category.id === "all" ? "platforms" : getModule(MODULES.find((item) => item.category === category.id)?.id ?? "fuel").icon)}</span>${escapeHtml(category.label)}</a>`).join("")}</div>`;
}

function moduleVisual(module, size = "standard") {
  return `<div class="module-visual tone-${module.tone} ${size}">${icon(module.icon)}<span>${escapeHtml(module.shortName)}</span></div>`;
}

function moduleRow(module) {
  const plan = module.plans[0];
  return `<article class="module-row tone-border-${module.tone}">
    ${moduleVisual(module)}
    <div class="module-copy"><div class="module-meta"><span>${escapeHtml(module.category.replace("food", "Food & beverage"))}</span><span>${escapeHtml(module.availability)}</span></div><h3>${escapeHtml(module.name)}</h3><p>${escapeHtml(module.description)}</p><strong>${escapeHtml(module.outcome)}</strong></div>
    <div class="module-commercial"><small>Illustrative from</small><b>${peso(plan.basePrice)}<span>/mo</span></b><small>${escapeHtml(module.billingModel)}</small><div class="row-actions"><a class="button button-quiet" href="#platform=${module.id}">Explore</a>${module.id === "fuel" || module.id === "micro-fuel" ? `<a class="button button-primary" href="#activate=${module.id}">Activate</a>` : `<span class="roadmap-note">Roadmap preview</span>`}</div></div>
  </article>`;
}

function homeView(state) {
  const category = CATEGORIES.find((item) => item.id === state.selectedCategory) ?? CATEGORIES[0];
  const featured = MODULES.filter((module) => state.selectedCategory === "all" || module.category === state.selectedCategory).slice(0, 4);
  return `<main>
    <section class="ecosystem-hero" data-category-scene="${state.selectedCategory}">
      <img src="./assets/fdg-business-ecosystem-hero-v1.png" alt="Original FDG concept of connected Filipino business operations" fetchpriority="high">
      <div class="hero-copy"><p class="truth-label">Interactive ecosystem · prototype</p><h1>One account.<br>Every business you’re building.</h1><p>Discover industry-specific operating platforms designed for real people, real operations, and responsible growth.</p><div class="hero-actions"><button class="button button-lime" data-route="discover">Explore platforms ${icon("arrow")}</button><button class="button button-outline" data-route="platforms">My Platforms</button></div><div class="hero-trust"><span>${icon("shield")} One shared identity</span><span>${icon("branch")} Separate module and branch scopes</span></div></div>
      <div class="hero-caption"><span>FDG-owned concept environment</span><b>No live integrations connected</b></div>
    </section>
    <section class="ecosystem-selector section-shell"><div class="section-heading"><div><h2>Explore by business outcome</h2><p>${escapeHtml(category.lead)}</p></div><button class="text-link" data-route="discover">View full catalog ${icon("arrow")}</button></div>${categoryRail(state)}
      <div class="opportunity-track">${featured.map((module) => `<a class="opportunity-card tone-${module.tone}" href="#platform=${module.id}">${icon(module.icon)}<span><small>${escapeHtml(module.availability)}</small><strong>${escapeHtml(module.shortName)}</strong><em>${escapeHtml(module.outcome)}</em></span>${icon("arrow")}</a>`).join("")}</div>
    </section>
    <section class="account-story section-shell"><div class="story-copy"><h2>Start with one branch. Keep the path to a portfolio open.</h2><p>Your FDG account stays with you while each activated business keeps its own plan, users, permissions, data, and operational workspace.</p><button class="button button-dark" data-route="platforms">See the portfolio bridge ${icon("arrow")}</button></div><div class="growth-path"><span><b>01</b>One entrepreneur</span><i></i><span><b>02</b>One business</span><i></i><span><b>03</b>Multiple branches</span><i></i><span><b>04</b>Enterprise network</span></div></section>
    <section class="how-it-works section-shell"><div class="section-heading"><div><h2>Discover. Activate. Operate.</h2><p>A short path into a dedicated domain workspace.</p></div></div><ol><li><b>1</b><h3>Find the right platform</h3><p>Search by business, workflow, or growth goal.</p></li><li><b>2</b><h3>Activate independently</h3><p>Choose a module plan and branch scope without buying the whole ecosystem.</p></li><li><b>3</b><h3>Open real operations</h3><p>Enter a domain-native workspace. Fuel Operations is connected first.</p></li></ol></section>
    <section class="truth-band"><div><strong>Prototype boundary</strong><p>Identity, subscriptions, permissions, cancellation, and payment states are local workflow demonstrations. No charge is made and no production identity is claimed.</p></div><button class="button button-lime" data-route="account">Review account model</button></section>
  </main>`;
}

function discoverView(state) {
  const query = state.catalogQuery.trim().toLowerCase();
  const modules = MODULES.filter((module) => (state.selectedCategory === "all" || module.category === state.selectedCategory) && (!query || `${module.name} ${module.description} ${module.outcome}`.toLowerCase().includes(query)));
  return `<main class="page-shell"><header class="page-intro"><div><p>Choose the work you need now</p><h1>Find your next operating platform.</h1><span>Every vertical keeps its own workflows. Your account keeps the portfolio connected.</span></div><button class="button button-dark" data-route="platforms">My Platforms ${icon("arrow")}</button></header>
    <section class="catalog-controls"><label class="search-control">${icon("discover")}<input id="catalog-search" type="search" value="${escapeHtml(state.catalogQuery)}" placeholder="Search a business, workflow, or outcome" aria-label="Search platforms"></label>${categoryRail(state, true)}</section>
    <section class="catalog-list" aria-live="polite">${modules.length ? modules.map(moduleRow).join("") : `<div class="empty-state"><h2>No platform matches that search.</h2><p>Try a broader business type or clear the search.</p><button class="button button-dark" data-clear-search>Clear search</button></div>`}</section>
    <p class="pricing-disclaimer">All displayed prices are illustrative configuration values for this prototype, not a commercial offer.</p>
  </main>`;
}

function platformDetailView(moduleId) {
  const module = getModule(moduleId);
  return `<main class="page-shell detail-page"><section class="detail-hero tone-${module.tone}"><div><a class="back-link" href="#discover">← Discover platforms</a><p>${escapeHtml(module.availability)}</p><h1>${escapeHtml(module.name)}</h1><h2>${escapeHtml(module.outcome)}</h2><span>${escapeHtml(module.description)}</span><div class="hero-actions">${module.id === "fuel" || module.id === "micro-fuel" ? `<a class="button button-lime" href="#activate=${module.id}">Activate platform ${icon("arrow")}</a>` : `<span class="button button-muted">Roadmap preview</span>`}${module.id === "fuel" ? `<a class="button button-outline" href="./fuel-station/#experience">See working Fuel experience</a>` : ""}</div></div>${moduleVisual(module, "large")}</section>
    <section class="detail-body"><div class="detail-narrative"><h2>Built around the work—not around a generic dashboard.</h2><p>${escapeHtml(module.description)}</p><div class="feature-flow">${module.plans[0].features.map((feature, index) => `<span><b>0${index + 1}</b>${escapeHtml(feature)}</span>`).join("")}</div></div><aside class="pricing-panel"><span>Illustrative configuration</span><h3>${escapeHtml(module.plans[0].name)}</h3><b>${peso(module.plans[0].basePrice)}<small>/month</small></b><p>${escapeHtml(module.billingModel)} · ${module.plans[0].includedUsers} included users</p><ul>${module.plans[0].features.map((feature) => `<li>${icon("check")}${escapeHtml(feature)}</li>`).join("")}</ul></aside></section>
    <section class="scope-diagram"><h2>One identity. Separate operating scope.</h2><div><span>FDG account</span>${icon("arrow")}<span>${escapeHtml(module.shortName)} subscription</span>${icon("arrow")}<span>Module instance</span>${icon("arrow")}<span>Branch data</span></div><p>Every operational record is designed to retain organization, module, branch/site, owner/user, and timestamp identifiers.</p></section>
  </main>`;
}

function activationView(state, moduleId) {
  const resolvedModuleId = moduleId || state.activation?.moduleId || "fuel";
  const module = getModule(resolvedModuleId);
  const activation = state.activation?.moduleId === resolvedModuleId ? state.activation : { moduleId: resolvedModuleId, step: 1, planId: module.plans[0].id, branches: 1, businessName: "", branchName: "" };
  const plan = module.plans.find((item) => item.id === activation.planId) ?? module.plans[0];
  const steps = ["Plan", "Branch", "Review", "Payment boundary"];
  let body = "";
  if (activation.step === 1) body = `<div class="activation-copy"><h2>Choose a module plan</h2><p>Plans belong to this module. Other FDG subscriptions remain independent.</p></div><div class="plan-options">${module.plans.map((item) => `<label class="plan-option ${activation.planId === item.id ? "is-selected" : ""}"><input type="radio" name="plan" value="${item.id}" ${activation.planId === item.id ? "checked" : ""}><span><strong>${escapeHtml(item.name)}</strong><b>${peso(item.basePrice)}<small>/month</small></b><em>${item.includedUsers} users included · ${peso(item.branchPrice)} per additional branch</em></span></label>`).join("")}</div><button class="button button-primary activation-next" data-activation-next="2">Continue to branch ${icon("arrow")}</button>`;
  if (activation.step === 2) body = `<div class="activation-copy"><h2>Name the first operating scope</h2><p>This creates a separate module instance and branch context under the same prototype account.</p></div><form id="activation-branch-form" class="activation-form"><label>Business name<input name="businessName" required value="${escapeHtml(activation.businessName)}" placeholder="Example: Habay Ventures"></label><label>First branch or site<input name="branchName" required value="${escapeHtml(activation.branchName)}" placeholder="Example: Main Branch"></label><label>Branches / units<input name="branches" required type="number" min="1" max="20" value="${activation.branches}"></label><button class="button button-primary" type="submit">Review subscription ${icon("arrow")}</button></form>`;
  if (activation.step === 3) body = `<div class="activation-copy"><h2>Review the module subscription</h2><p>Nothing is charged. This verifies scope and price calculation before the payment boundary.</p></div><dl class="review-list"><div><dt>FDG account</dt><dd>${escapeHtml(state.account.organization)}</dd></div><div><dt>Module</dt><dd>${escapeHtml(module.name)}</dd></div><div><dt>Plan</dt><dd>${escapeHtml(plan.name)}</dd></div><div><dt>Business / branch</dt><dd>${escapeHtml(activation.businessName)} · ${escapeHtml(activation.branchName)}</dd></div><div><dt>Branch count</dt><dd>${activation.branches}</dd></div><div class="total"><dt>Illustrative monthly total</dt><dd>${peso(planTotal(plan, activation.branches))}</dd></div></dl><button class="button button-primary activation-next" data-activation-next="4">Continue to payment boundary ${icon("arrow")}</button>`;
  if (activation.step === 4) body = `<div class="payment-boundary">${icon("shield")}<p>Prototype payment boundary</p><h2>No payment provider is connected.</h2><span>No card, wallet, bank, or personal payment data is requested or transmitted. Continue only to create a local trial record on this device.</span><button class="button button-lime" data-complete-trial>Create local prototype trial</button><button class="button button-quiet" data-activation-back="3">Back to review</button></div>`;
  return `<main class="page-shell activation-page"><a class="back-link" href="#platform=${module.id}">← ${escapeHtml(module.shortName)}</a><section class="activation-shell"><header><div>${moduleVisual(module)}</div><div><p>Activate independently</p><h1>${escapeHtml(module.name)}</h1></div></header><nav class="stepper" aria-label="Activation progress">${steps.map((label, index) => `<span class="${activation.step >= index + 1 ? "is-done" : ""}"><b>${index + 1}</b>${label}</span>`).join("")}</nav><div class="activation-body">${body}</div></section></main>`;
}

function subscriptionRow(subscription) {
  const module = getModule(subscription.moduleId);
  const plan = module.plans.find((item) => item.id === subscription.planId) ?? module.plans[0];
  return `<article class="subscription-row"><div class="subscription-identity">${moduleVisual(module)}<div><span>${escapeHtml(subscription.businessName)}</span><h3>${escapeHtml(module.shortName)} · ${escapeHtml(subscription.branchName)}</h3><small>${escapeHtml(plan.name)} · ${escapeHtml(subscription.interval)} · ${subscription.branchCount} branch${subscription.branchCount === 1 ? "" : "es"}</small></div></div><div class="subscription-state"><span class="status status-${statusClass(subscription.status)}">${escapeHtml(subscription.status)}</span><small>${escapeHtml(subscription.billingStatus)}</small></div><div class="subscription-actions">${subscription.workspace && subscription.status !== "Cancelled" ? `<a class="button button-primary" href=".${subscription.workspace}">Open platform ${icon("arrow")}</a>` : `<button class="button button-muted" disabled>${subscription.status === "Cancelled" ? "Read-only policy pending" : "Workspace not connected"}</button>`}<a class="button button-quiet" href="#billing=${subscription.id}">Manage</a></div></article>`;
}

function platformsView(state) {
  const filters = ["All", "Active", "Trial", "Setup incomplete", "Cancelled"];
  const visible = state.subscriptions.filter((item) => state.platformFilter === "All" || item.status === state.platformFilter);
  return `<main class="page-shell"><header class="page-intro"><div><p>Your portfolio bridge</p><h1>My Platforms</h1><span>One prototype identity. Separate module instances, branch scopes, users, and billing states.</span></div><button class="button button-primary" data-route="discover">${icon("plus")} Add platform</button></header><div class="local-banner">${icon("shield")}<span><b>Local prototype account</b>No production authentication or billing provider is connected.</span></div><div class="filter-tabs">${filters.map((filter) => `<button class="${state.platformFilter === filter ? "is-selected" : ""}" data-platform-filter="${filter}">${filter}</button>`).join("")}</div><section class="subscription-list">${visible.length ? visible.map(subscriptionRow).join("") : `<div class="empty-state"><h2>No platforms in this state.</h2><p>Choose another filter or explore the catalog.</p></div>`}</section><section class="portfolio-actions"><button data-route="portfolio">${icon("opportunity")}<span><b>Portfolio analytics</b>Compare domains without forcing them into one score.</span>${icon("arrow")}</button><button data-route="permissions">${icon("shield")}<span><b>People & permissions</b>Review roles by module and branch.</span>${icon("arrow")}</button></section></main>`;
}

function portfolioView(state) {
  const active = state.subscriptions.filter((item) => ["Active", "Trial"].includes(item.status));
  const branches = active.reduce((sum, item) => sum + item.branchCount, 0);
  const latest = verifiedHistory.at(-1);
  return `<main class="page-shell"><header class="page-intro"><div><p>Domain-aware portfolio view</p><h1>See the portfolio without flattening the businesses.</h1><span>Shared scope and status live together. Operational KPIs stay in their proper domain.</span></div><button class="button button-dark" data-route="platforms">My Platforms</button></header><section class="portfolio-overview"><div><span>Module instances</span><b>${state.subscriptions.length}</b><small>Local prototype records</small></div><div><span>Active or trial</span><b>${active.length}</b><small>Independent statuses</small></div><div><span>Branches in active scope</span><b>${branches}</b><small>No enterprise claim</small></div></section><section class="domain-analytics"><article class="fuel-proof"><header>${icon("fuel")}<div><span>Fuel Operations</span><h2>Workbook-grounded operating proof</h2></div></header><div class="fuel-proof-grid"><div><span>Latest verified date</span><b>${latest.date}</b></div><div><span>Fuel sales</span><b>${new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(latest.sales)}</b></div><div><span>Volume</span><b>${(latest.regularLiters + latest.premiumLiters + latest.dieselLiters).toFixed(2)} L</b></div><div><span>Source exceptions</span><b>${sourceExceptions.length}</b></div></div><a class="button button-primary" href="./fuel-station/#overview">Open Fuel Operations ${icon("arrow")}</a></article><article class="future-domains"><span>Other domains remain separate</span><h2>Food, retail, service, bookings, and mobility will earn their own measures.</h2><p>The platform will not present incomparable revenue, occupancy, fleet, and inventory signals as one invented health score.</p><button class="button button-quiet" data-route="discover">Review roadmap modules</button></article></section></main>`;
}

function billingView(state, id) {
  const subscription = state.subscriptions.find((item) => item.id === id) ?? state.subscriptions[0];
  const module = getModule(subscription.moduleId);
  const plan = module.plans.find((item) => item.id === subscription.planId) ?? module.plans[0];
  return `<main class="page-shell"><a class="back-link" href="#platforms">← My Platforms</a><section class="billing-detail"><header>${moduleVisual(module)}<div><p>Module-specific billing</p><h1>${escapeHtml(module.name)}</h1><span>${escapeHtml(subscription.businessName)} · ${escapeHtml(subscription.branchName)}</span></div><span class="status status-${statusClass(subscription.status)}">${escapeHtml(subscription.status)}</span></header><div class="billing-columns"><dl class="review-list"><div><dt>Plan</dt><dd>${escapeHtml(plan.name)}</dd></div><div><dt>Billing model</dt><dd>${escapeHtml(module.billingModel)}</dd></div><div><dt>Illustrative configured price</dt><dd>${peso(planTotal(plan, subscription.branchCount))}/mo</dd></div><div><dt>Billing status</dt><dd>${escapeHtml(subscription.billingStatus)}</dd></div><div><dt>Next billing date</dt><dd>${escapeHtml(subscription.nextBillingDate)}</dd></div></dl><aside><h2>Independent lifecycle</h2><p>Changing or cancelling this module must not terminate the FDG account or another subscription.</p>${subscription.status !== "Cancelled" ? `<a class="button button-dark" href="#activate=${subscription.moduleId}">${icon("plus")} Add branch</a><a class="button button-danger" href="#cancel=${subscription.id}">Cancel this module</a>` : `<span class="button button-muted">Cancelled module</span>`}</aside></div></section></main>`;
}

function cancelView(state, id) {
  const subscription = state.subscriptions.find((item) => item.id === id) ?? state.subscriptions[0];
  const module = getModule(subscription.moduleId);
  const others = state.subscriptions.filter((item) => item.id !== id && item.status !== "Cancelled");
  return `<main class="page-shell"><section class="cancel-panel">${icon("shield")}<p>Cancellation isolation check</p><h1>Cancel only ${escapeHtml(module.shortName)}?</h1><span>This local prototype action changes <b>${escapeHtml(subscription.businessName)} · ${escapeHtml(subscription.branchName)}</b> to Cancelled. It does not contact a payment provider or delete operational data.</span><div class="kept-active"><strong>The FDG account remains available.</strong>${others.map((item) => `<span>${icon("check")}${escapeHtml(getModule(item.moduleId).shortName)} · ${escapeHtml(item.branchName)} remains ${escapeHtml(item.status)}</span>`).join("")}</div><div class="cancel-actions"><button class="button button-danger" data-confirm-cancel="${subscription.id}">Confirm local cancellation</button><a class="button button-quiet" href="#billing=${subscription.id}">Keep subscription</a></div></section></main>`;
}

function permissionsView(state) {
  return `<main class="page-shell"><header class="page-intro"><div><p>Module and branch scope</p><h1>People & permissions</h1><span>One person may hold different roles in different operating workspaces.</span></div><button class="button button-dark" data-route="platforms">My Platforms</button></header><section class="permission-table"><div class="permission-head"><span>Person</span><span>Module</span><span>Branch</span><span>Role</span><span>State</span></div>${state.memberships.map((member) => `<div class="permission-row"><strong>${escapeHtml(member.name)}<small>${escapeHtml(member.email)}</small></strong><span>${escapeHtml(getModule(member.moduleId).shortName)}</span><span>${escapeHtml(member.branch)}</span><span>${escapeHtml(member.role)}</span><span>${escapeHtml(member.status)}</span></div>`).join("")}</section><section class="scope-note"><div>${icon("shield")}<span><b>Enforcement boundary</b>These roles are a local UI model. Production authorization must be enforced server-side for every mutation, not only hidden in the interface.</span></div><button class="button button-primary" data-local-invite>Add local invitation</button></section></main>`;
}

function accountView(state) {
  return `<main class="page-shell"><header class="page-intro"><div><p>Shared identity · separate subscriptions</p><h1>Account & billing overview</h1><span>The ecosystem account helps you navigate. Each module owns its plan and lifecycle.</span></div><span class="account-mode">${escapeHtml(state.account.mode)}</span></header><section class="account-profile"><div class="avatar">JD</div><div><span>Signed-in prototype</span><h2>${escapeHtml(state.account.person)}</h2><p>${escapeHtml(state.account.organization)} · ${escapeHtml(state.account.id)}</p></div><button class="button button-quiet" data-reset-demo>Reset local demo</button></section><section class="account-principles"><article>${icon("account")}<h3>One account</h3><p>One identity can participate in several independently scoped workspaces.</p></article><article>${icon("billing")}<h3>Module billing</h3><p>Every subscription retains its own plan, interval, status, and price configuration.</p></article><article>${icon("shield")}<h3>Protected boundaries</h3><p>Operational data is designed to remain scoped by organization, module, branch, user, and time.</p></article></section><section class="billing-overview"><div class="section-heading"><div><h2>Subscription overview</h2><p>Convenience view only—the main platform is not an accounting portal.</p></div></div>${state.subscriptions.map((item) => { const module = getModule(item.moduleId); return `<button data-billing="${item.id}">${icon(module.icon)}<span><b>${escapeHtml(module.shortName)}</b><small>${escapeHtml(item.businessName)} · ${escapeHtml(item.branchName)}</small></span><em>${escapeHtml(item.status)}</em>${icon("arrow")}</button>`; }).join("")}</section><section class="payment-note"><h2>Payment behavior</h2><p>No payment provider is connected. This prototype never asks for payment credentials, never makes a charge, and records activation or cancellation only in local browser storage.</p></section></main>`;
}

function resourcesView() {
  return `<main class="page-shell"><header class="page-intro"><div><p>Product education</p><h1>Know what is working, planned, and protected.</h1><span>Clear boundaries build more trust than invented capability.</span></div></header><section class="resource-list"><article><span>01</span><div><h2>Working first: Fuel Operations</h2><p>Workbook-grounded closeout, wet stock, deliveries, pricing, safety, reports, and local audit history.</p><a href="./fuel-station/#experience">View Fuel experience ${icon("arrow")}</a></div></article><article><span>02</span><div><h2>Shared layer: local prototype</h2><p>Discovery, portfolio navigation, price configuration, branch scope, permissions, billing state, and cancellation isolation.</p></div></article><article><span>03</span><div><h2>Production security: not connected</h2><p>Authentication, server authorization, payment settlement, immutable ledgers, recovery, and regulatory validation remain separate hardening milestones.</p></div></article></section></main>`;
}

function supportView() {
  return `<main class="page-shell"><section class="support-stage"><div><p>Start with the operating problem</p><h1>Prepare a focused platform walkthrough.</h1><span>This form builds a private, on-device brief. It does not submit or transmit information.</span></div><form id="support-brief-form"><label>Business type<select name="business"><option>Fuel station</option><option>Restaurant</option><option>Neighborhood retail</option><option>Tire and auto service</option><option>Logistics</option></select></label><label>First priority<select name="priority"><option>Daily control and closeout</option><option>Inventory and replenishment</option><option>Multi-branch visibility</option><option>Bookings and service flow</option></select></label><label>Current branches<input type="number" name="branches" min="1" max="100" value="1"></label><button class="button button-lime" type="submit">Build local walkthrough brief</button></form></section></main>`;
}

function pageContent(state, route) {
  if (route.page === "discover" || route.page === "search") return discoverView(state);
  if (route.page === "platform") return platformDetailView(route.id);
  if (route.page === "activate") return activationView(state, route.id);
  if (route.page === "platforms") return platformsView(state);
  if (route.page === "portfolio") return portfolioView(state);
  if (route.page === "billing") return billingView(state, route.id);
  if (route.page === "cancel") return cancelView(state, route.id);
  if (route.page === "permissions") return permissionsView(state);
  if (route.page === "account") return accountView(state);
  if (route.page === "resources") return resourcesView();
  if (route.page === "support") return supportView();
  return homeView(state);
}

export function renderApp(state, route) {
  return `<div class="app-shell"><aside class="side-rail"><button class="logo-button" data-route="home" aria-label="FDG Business Platform home">${logo()}</button><nav>${shellNav(route)}</nav><div class="rail-statement"><i></i><p>Different businesses.<br><b>One account.</b><br>A stronger tomorrow.</p></div><span class="prototype-marker">PROTOTYPE · LOCAL STATE</span></aside><div class="app-main"><header class="topbar"><button class="mobile-menu" data-menu aria-label="Open navigation">${icon("menu")}</button><button class="mobile-logo" data-route="home">${logo()}</button><button class="global-search" data-route="search">${icon("discover")}<span>Search platforms, opportunities, or help</span></button><div class="topbar-account"><span><b>${escapeHtml(state.account.person)}</b><small>${escapeHtml(state.account.organization)}</small></span><button data-route="account" aria-label="Open account">JD</button></div></header>${pageContent(state, route)}<nav class="mobile-dock" aria-label="Primary navigation">${mobileNav(route)}</nav></div></div><div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}
