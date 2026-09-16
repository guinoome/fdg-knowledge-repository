import { products, safetyChecklist, sourceExceptions, verifiedHistory } from "../data/nj-gas-station.js";
import { reportInputs } from "./report-inputs.js";
import { capacity, activeBuyingPrice } from "./operations.js";
import { experienceConfig } from "../data/experience-config.js";
import { allReportRows, latestTotalizerRecord } from "./store.js";
import { dateTime, escapeHtml, localDate, number, peso, shortDate } from "./format.js";

const title = (eyebrow, heading, copy, actions = "") => `<div class="page-heading"><div><span class="eyebrow">${eyebrow}</span><h1>${heading}</h1><p>${copy}</p></div>${actions}</div>`;
const productName = (id) => products.find((p) => p.id === id)?.name ?? id;

const analyticsRanges = ["hourly", "daily", "weekly", "monthly", "annually"];

function periodKey(date, range) {
  const day = new Date(`${date}T00:00:00Z`);
  if (range === "daily") return date;
  if (range === "monthly") return date.slice(0, 7);
  if (range === "annually") return date.slice(0, 4);
  const thursday = new Date(day);
  thursday.setUTCDate(day.getUTCDate() + 4 - (day.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((thursday - yearStart) / 86400000) + 1) / 7);
  return `${thursday.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function salesSeries(state, range) {
  if (range === "hourly") return [];
  const groups = new Map();
  allReportRows(state).forEach((row) => {
    const key = periodKey(row.date, range);
    const current = groups.get(key) ?? { key, regular: 0, premium: 0, diesel: 0, sales: 0, profit: 0, statuses: new Set() };
    current.regular += Number(row.regularLiters || 0);
    current.premium += Number(row.premiumLiters || 0);
    current.diesel += Number(row.dieselLiters || 0);
    current.sales += Number(row.sales || 0);
    current.profit += Number(row.profit || 0);
    current.statuses.add(row.status);
    groups.set(key, current);
  });
  return [...groups.values()].sort((a, b) => a.key.localeCompare(b.key)).slice(-10);
}

function salesExplorer(state) {
  const range = analyticsRanges.includes(state.analyticsRange) ? state.analyticsRange : "daily";
  const series = salesSeries(state, range);
  const maxLiters = Math.max(1, ...series.map((item) => item.regular + item.premium + item.diesel));
  return `<section class="sales-explorer panel">
    <header class="sales-explorer-head"><div><span class="eyebrow">Product movement intelligence</span><h2>See what each fuel product is doing over time.</h2><p>Interactive history from verified workbook rows and clearly labelled local closeouts.</p></div><span class="analysis-pulse"><i></i>Interactive timeline</span></header>
    <div class="range-tabs" role="group" aria-label="Sales analysis period">${analyticsRanges.map((item) => `<button class="${range === item ? "active" : ""}" data-analytics-range="${item}" aria-pressed="${range === item}">${item[0].toUpperCase()}${item.slice(1)}</button>`).join("")}</div>
    ${series.length ? `<div class="sales-chart" aria-label="${range} product sales volume chart">${series.map((item) => { const regular = (item.regular / maxLiters) * 100; const premium = (item.premium / maxLiters) * 100; const diesel = (item.diesel / maxLiters) * 100; return `<article><div class="chart-label"><strong>${escapeHtml(item.key)}</strong><span>${number(item.regular + item.premium + item.diesel)} L · ${peso(item.sales)}</span></div><div class="stacked-track" title="Regular ${number(item.regular)} L; Premium ${number(item.premium)} L; Diesel ${number(item.diesel)} L"><i class="regular" style="--segment:${regular}%"></i><i class="premium" style="--segment:${premium}%"></i><i class="diesel" style="--segment:${diesel}%"></i></div><small>${item.statuses.has("local") ? "Includes local demo closeout" : "Workbook verified"}</small></article>`; }).join("")}</div>` : `<div class="analytics-empty"><strong>Hourly source not connected</strong><p>Hourly analysis requires timestamped POS or shift transactions. The platform will not invent an hourly curve from daily totals.</p></div>`}
    <footer class="chart-legend">${products.map((product) => `<span><i style="background:${product.color}"></i>${product.name}</span>`).join("")}<em>Bar length = liters sold · label = recorded sales</em></footer>
  </section>`;
}

export function experienceView() {
  const latest = verifiedHistory.at(-1);
  const totalLiters = latest.regularLiters + latest.premiumLiters + latest.dieselLiters;
  return `<div class="prospect-page">
    <header class="prospect-nav">
      <button class="prospect-brand" data-scroll="top" aria-label="FDG Business Platform home"><span>/</span><strong>FDG</strong><small>BUSINESS PLATFORM</small></button>
      <nav aria-label="Prospect navigation"><button data-scroll="proof">Proof</button><button data-scroll="workflow">How it works</button><button data-scroll="scale">Scale path</button></nav>
      <button class="prospect-nav-cta" data-go="overview">Explore operations <span data-icon="arrow"></span></button>
    </header>

    <section class="prospect-hero" id="top">
      <div class="hero-copy">
        <div class="trust-line"><span>${experienceConfig.evidence.label}</span><span>${experienceConfig.capabilityState.storage}</span></div>
        <h1>Know every liter.<br />Close every shift.<br /><em>Grow with confidence.</em></h1>
        <p>See fuel, stock, deliveries, safety, and profit in one operating picture—grounded in records you can verify.</p>
        <div class="hero-actions"><button class="hero-primary" data-go="overview">Explore the working demo <span data-icon="arrow"></span></button><button class="hero-secondary" data-scroll="proof">See the proof</button></div>
        <div class="hero-assurance"><span><b>01</b> No invented live feeds</span><span><b>02</b> Your source stays visible</span><span><b>03</b> Mobile work comes first</span></div>
      </div>
      <figure class="hero-media">
        <img src="./design/reference/fdg_micro_station_operations_showcase.png" alt="FPIS concept showing an FDG micro fuel station and connected mobile operations screens" fetchpriority="high" />
        <figcaption><span>FPIS experience concept</span><strong>${experienceConfig.tenant.name} — ${experienceConfig.tenant.location}</strong><small>Visual direction · not a live station photograph</small></figcaption>
      </figure>
    </section>

    <section class="proof-band" id="proof">
      <div class="proof-intro"><span>Verified client record · ${shortDate(experienceConfig.evidence.latestVerifiedDate)}</span><h2>A stronger station starts with numbers you can trace.</h2><p>The prototype separates workbook evidence from locally entered demo records, so persuasive presentation never outruns operational truth.</p></div>
      <div class="proof-numbers"><div><strong>${peso(latest.sales)}</strong><span>daily fuel sales</span><small>Workbook verified</small></div><div><strong>${number(totalLiters)} L</strong><span>volume recorded</span><small>Three fuel grades</small></div><div><strong>${peso(latest.profit)}</strong><span>net daily profit</span><small>Workbook verified</small></div></div>
    </section>

    <section class="value-story" id="workflow">
      <div class="story-heading"><span>From workbook to operating control</span><h2>Keep the familiarity. Remove the fragile parts.</h2><p>The platform follows the station’s real language—totalizers, calibration, wet stock, deliveries, costs, cash, and manager review—then makes the decision path visible.</p></div>
      <div class="workflow-rail">
        <article><b>01</b><div><h3>Record the shift</h3><p>Carry forward the latest accepted close, then capture final totalizers, calibration, utilities, manpower, and cash.</p></div></article>
        <article><b>02</b><div><h3>Explain every liter</h3><p>Connect sales, deliveries, tests, and tank movement instead of accepting a mysterious balance.</p></div></article>
        <article><b>03</b><div><h3>Hold what looks wrong</h3><p>Negative totalizers, broken references, and capacity conflicts stay visible for review.</p></div></article>
        <article><b>04</b><div><h3>Close with evidence</h3><p>Preserve actor, reason, time, source status, and variance before a manager approves.</p></div></article>
      </div>
      <button class="story-action" data-go="closeout">Walk through a closeout <span data-icon="arrow"></span></button>
    </section>

    <section class="comparison-story">
      <figure><img src="./design/reference/before_and_after_smarter_station_marketing.png" loading="lazy" alt="FPIS before-and-after concept contrasting a basic operations dashboard with a client-magnet fuel business experience" /><figcaption>FPIS concept comparison · presentation direction, not measured client outcomes</figcaption></figure>
      <div><span>More than a prettier interface</span><h2>Operations prove the value. Experience makes the value visible.</h2><p>A prospect should understand the platform before an FDG representative finishes the first explanation. An operator should then enter the same product and finish real work without marketing getting in the way.</p><ul><li>Evidence remains attached to every claim.</li><li>Operational actions stay direct and role-aware.</li><li>Client presentation and working controls share one product identity.</li></ul></div>
    </section>

    <section class="scale-story" id="scale">
      <div><span>Planned capability · no live network connection</span><h2>Start with Habay. Keep the path to a network open.</h2><p>The information model is shaped for one station today and future branch, regional, and enterprise views without turning fuel operations into a generic business dashboard.</p></div>
      <div class="network-line"><article class="active"><b>01</b><strong>Single station</strong><small>Closeout · stock · margin</small></article><i></i><article><b>02</b><strong>Multi-branch</strong><small>Compare · replenish · support</small></article><i></i><article><b>03</b><strong>Regional network</strong><small>Route · risk · performance</small></article><i></i><article><b>04</b><strong>Enterprise</strong><small>Portfolio · governance · growth</small></article></div>
    </section>

    <section class="review-brief" id="review">
      <div><span>Local discovery tool</span><h2>Prepare the first station review.</h2><p>Create a private on-device brief for the next operating walkthrough. Nothing is submitted or transmitted.</p></div>
      <form id="review-brief-form"><label>Station or business name<input name="station" placeholder="Your station" autocomplete="organization" /></label><label>First priority<select name="priority"><option>Daily closeout and cash control</option><option>Wet-stock and delivery control</option><option>Profitability visibility</option><option>Multi-branch readiness</option></select></label><button class="hero-primary" type="submit">Build my local review brief <span data-icon="arrow"></span></button></form>
      <article id="review-brief-output" hidden><span>Prepared locally</span><h3 data-brief="station"></h3><p>Priority: <strong data-brief="priority"></strong></p><p data-brief="next"></p><button data-go="overview">Enter the working demo</button></article>
    </section>

    <footer class="prospect-footer"><div class="prospect-brand"><span>/</span><strong>FDG</strong><small>BUSINESS PLATFORM</small></div><p>${experienceConfig.provider.attribution} · Prototype · No production integrations connected</p><button data-go="overview">Open station operations <span data-icon="arrow"></span></button></footer>
  </div>`;
}

export function overviewView(state) {
  const latest = verifiedHistory.at(-1);
  const totalLiters = latest.regularLiters + latest.premiumLiters + latest.dieselLiters;
  const stock = Object.values(state.tanks).reduce((a, b) => a + b, 0);
  return `${title("Station command", "One station. Every critical decision in view.", "NJ Gas Station — Habay · Workbook evidence and local demo actions remain clearly separated.", '<button class="primary" data-go="closeout">Close today’s shift <span data-icon="arrow"></span></button>')}
    <section class="command-hero">
      <figure class="command-media"><img src="./design/reference/fpis-fuel-operations-sample.png" alt="FPIS fuel operations design reference" /><figcaption><span>FPIS concept view</span><small>Presentation reference · not live telemetry</small></figcaption></figure>
      <aside class="decision-rail"><span class="decision-source">Workbook verified · ${shortDate(latest.date)}</span><h2>${peso(latest.sales)}</h2><p>Latest verified daily fuel sales across ${number(totalLiters)} liters.</p><div class="decision-margin"><span>Net daily profit</span><strong>${peso(latest.profit)}</strong><small>${number((latest.profit / latest.sales) * 100, 1)}% of sales</small></div><div class="decision-alert"><b>${sourceExceptions.length}</b><span>source exceptions kept out of trusted totals</span></div><button data-go="audit">Review evidence and exceptions <span data-icon="arrow"></span></button></aside>
    </section>
    <section class="signal-strip" aria-label="Station operating signals"><div><span>Total wet stock</span><strong>${number(stock, 0)} L</strong><small>Local demo balance</small></div>${products.map((p) => { const pct = Math.min(100, (state.tanks[p.id] / capacity(state, p.id)) * 100); return `<div class="fuel-signal" style="--fuel:${p.color};--level:${pct}%"><span>${p.name}</span><strong>${number(state.tanks[p.id], 0)} L</strong><small>${number(pct, 0)}% capacity</small><i></i></div>`; }).join("")}</section>
    <section class="command-lower">
      <article class="exception-command"><header><div><span>What needs a decision</span><h2>Exceptions before automation</h2></div><button data-go="audit">Open control log</button></header>${sourceExceptions.map((item) => `<div class="exception-row"><span class="severity ${item.severity}">!</span><div><strong>${item.title}</strong><p>${item.detail}</p></div><small>${item.date}</small></div>`).join("")}</article>
      <article class="closeout-command"><span>Today’s operating path</span><h2>Close the shift with proof.</h2><ol><li><b>1</b><p><strong>Record</strong> totalizers and calibration</p></li><li><b>2</b><p><strong>Reconcile</strong> wet stock and cash</p></li><li><b>3</b><p><strong>Review</strong> exceptions before approval</p></li></ol><button class="primary" data-go="closeout">Begin closeout <span data-icon="arrow"></span></button></article>
    </section>`;
}

export function closeoutView(state) {
  const restricted = state.role === "Attendant";
  const prior = latestTotalizerRecord(state);
  return `${title("Shift control", "Daily closeout", "Turn totalizer readings and operating costs into a reviewable station record.", '<span class="permission-note">Manager approval required</span>')}
    <form id="closeout-form" class="panel form-panel">
      <div class="form-header"><div><h2>Final reading and cash reconciliation</h2><p>Opening readings come from the latest recorded close. Enter or scan only the final totalizer; every OCR proposal remains editable and requires confirmation.</p></div><label>Date<input name="date" type="date" required value="${localDate()}" /></label></div>
      <div class="prior-close-note"><span>Automatic opening source</span><strong>${escapeHtml(prior.source)}</strong><small>${shortDate(prior.date)} · April 30 remains excluded because of the recorded Premium reversal.</small></div>
      <div class="product-entry-grid">${products.map((p) => `<fieldset><legend><i style="background:${p.color}"></i>${p.name}</legend><div class="opening-reading"><span>Opening totalizer · automatic</span><strong data-opening="${p.id}" data-value="${prior.values[p.id]}">${number(prior.values[p.id])}</strong><small>Locked from latest recorded close</small></div><label>Final totalizer<input name="${p.id}-closing" type="number" min="${prior.values[p.id]}" step="0.01" inputmode="decimal" required placeholder="Enter final reading" /></label><div class="ocr-assist"><input id="${p.id}-totalizer-photo" data-ocr-input="${p.id}" type="file" accept="image/*" capture="environment" /><label for="${p.id}-totalizer-photo">Capture or choose meter photo</label><small data-ocr-status="${p.id}">Photo stays on this device. OCR runs only when the browser supports on-device text detection.</small></div><label>Test / calibration (L)<input name="${p.id}-test" type="number" min="0" step="0.01" inputmode="decimal" value="0" required /></label><div class="computed"><span>Calculated volume</span><strong data-volume="${p.id}">0.00 L</strong></div></fieldset>`).join("")}</div>
      <p>Calibration volumes are assumed returned to the same tank. Unreturned test fuel needs a reviewed stock adjustment; do not use this workflow for that case. Photo previews are not stored; only confirmation metadata is saved.</p>
      <p>Daily closeout must be the day immediately after the accepted opening source. Missing days or an outdated baseline must be reconciled first; do not label accumulated meter movement as one day's sales.</p>
      <label>Correction reason (required for revisions)<input name="reason" maxlength="500" placeholder="Explain what changed and why" /></label>
      <p>Electricity and manpower are entered monthly in Reports. Daily contribution excludes those monthly costs; buying cost is allocated by FIFO stock batch on approval.</p>
      <div class="cost-grid"><label>Other daily cost<input name="otherCost" type="number" min="0" step="0.01" value="0" /></label><label>Cash collected<input name="cashCollected" type="number" min="0" step="0.01" value="0" /></label></div>
      <div class="closeout-summary"><div><span>Expected sales</span><strong id="expected-sales">₱0.00</strong></div><div><span>Estimated daily contribution</span><strong id="gross-margin">₱0.00</strong></div><div><span>Cash variance</span><strong id="cash-variance">₱0.00</strong></div><button class="primary" type="submit" ${restricted ? "disabled" : ""}>${restricted ? "Manager role required" : "Save for manager review"}</button></div>
    </form>`;
}

export function tanksView(state) {
  return `${title("Wet stock", "Tanks & inventory", "Recorded balances, capacity exposure, and movement controls for the three workbook fuel grades.")}
    <div class="tank-grid">${products.map((p) => { const level = state.tanks[p.id]; const pct = Math.min(100, (level / capacity(state, p.id)) * 100); return `<article class="panel tank-card"><div class="tank-visual"><div style="height:${pct}%;background:${p.color}"></div><span>${number(pct, 0)}%</span></div><div><span class="eyebrow">${p.name}</span><h2>${number(level, 0)} L</h2><p>Working capacity ${number(capacity(state, p.id), 0)} L</p><div class="detail-row"><span>Buying price</span><strong>${peso(activeBuyingPrice(state, p.id))}/L</strong></div><div class="detail-row"><span>Selling price</span><strong>${peso(state.prices[p.id].sellingPrice)}/L</strong></div><div class="detail-row"><span>Unit margin</span><strong>${peso(state.prices[p.id].sellingPrice - activeBuyingPrice(state, p.id))}</strong></div></div></article>`; }).join("")}</div>
    <article class="panel governance-callout"><span>FBIS data rule</span><h2>Every balance must be explainable by movements.</h2><p>Production implementation should derive stock from an immutable movement ledger: opening balance + posted deliveries − verified sales − test/calibration ± approved adjustments.</p></article>`;
}

export function deliveriesView(state) {
  const restricted = state.role === "Attendant";
  return `${title("Inbound fuel", "Deliveries", "Log a delivery reference, product, volume and cost before it changes wet-stock position.")}
    <div class="split-grid"><form id="delivery-form" class="panel form-panel"><h2>Post a delivery</h2><p class="form-copy">This demo records the movement and audit event together in local storage.</p><label>Date<input name="date" type="date" required value="${localDate()}" /></label><label>Product<select name="product">${products.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}</select></label><label>Volume (L)<input name="liters" type="number" min="0.01" step="0.01" required /></label><label>Unit cost<input name="unitCost" type="number" min="0" step="0.01" required /></label><label>Supplier / reference<input name="reference" required placeholder="Delivery receipt or supplier reference" /></label><button class="primary full" type="submit" ${restricted ? "disabled" : ""}>${restricted ? "Manager role required" : "Post delivery"}</button></form>
    <article class="panel"><div class="panel-header"><div><span class="eyebrow">Movement ledger</span><h2>Recent deliveries</h2></div></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Reference</th><th>Product</th><th class="numeric">Liters</th><th class="numeric">Value</th></tr></thead><tbody>${state.deliveries.map((d) => `<tr><td>${shortDate(d.date)}</td><td><strong>${escapeHtml(d.reference)}</strong><small>${d.id}</small></td><td>${productName(d.product.toLowerCase())}</td><td class="numeric">${number(d.liters)}</td><td class="numeric">${peso(d.liters * d.unitCost)}</td></tr>`).join("")}</tbody></table></div></article></div>`;
}

export function pricingView(state) {
  const restricted = state.role === "Attendant";
  return `${title("Controlled commercial input", "Fuel pricing", "Make margins visible and keep each price change attributable.", '<span class="permission-note">Owner / manager only</span>')}
    <form id="pricing-form" class="pricing-grid">${products.map((p) => { const current = state.prices[p.id]; return `<article class="panel price-card"><div class="product-badge" style="--product:${p.color}"><i></i>${p.name}</div><label>Current FIFO buying cost / L (read-only)<input name="${p.id}-buy" type="number" min="0" step="0.01" value="${activeBuyingPrice(state, p.id)}" readonly /></label><label>Selling price / L<input name="${p.id}-sell" type="number" min="0" step="0.01" value="${current.sellingPrice}" ${restricted ? "disabled" : ""} /></label><div class="margin-box"><span>Current unit margin</span><strong>${peso(current.sellingPrice - activeBuyingPrice(state, p.id))}</strong></div></article>`; }).join("")}<div class="pricing-actions"><label>Reason for change<input name="reason" required placeholder="Supplier adjustment, market review…" ${restricted ? "disabled" : ""} /></label><button class="primary" ${restricted ? "disabled" : ""}>Save price change</button></div></form>`;
}

function reviewQueue(state) {
  const manager = ["Owner", "Station Manager"].includes(state.role);
  return `<section class="panel form-panel"><h2>Closeout review and revisions</h2><p>Pending records do not change stock or reported sales. Earlier revisions remain in the audit history.</p>${state.closeouts.map((row) => `<article style="border-top:1px solid #ddd;padding:16px 0"><h3>${escapeHtml(row.date)} · ${escapeHtml(row.workflow || "Legacy posted — approval not recorded")} · revision ${row.revision || 1}</h3><p>Sales ${peso(row.sales)} · Cash variance ${peso(row.cashVariance || 0)}</p><p>${products.map((p) => `${p.name}: ${number(row.openingTotalizers?.[p.id] || 0)} → ${number(row.closingTotalizers?.[p.id] || 0)}; ${number(row[p.id+"Liters"])} L`).join(" · ")}</p><p>${escapeHtml(row.reason || row.reviewReason || "")}</p>${row.workflow === "pending" && manager ? `<form data-review-form="${row.id}"><label>Review reason<input name="reason" required maxlength="500" /></label><button class="primary" name="decision" value="approved">Approve and post stock</button> <button class="secondary" name="decision" value="rejected">Reject without posting</button></form>` : ""}${manager && ["approved","rejected"].includes(row.workflow) ? `<button class="secondary" data-correct="${row.id}">Create correction</button>` : ""}</article>`).join("") || "<p>No closeouts awaiting review.</p>"}</section>`;
}

export function reportsView(state) {
  const rows = allReportRows(state);
  return `${title("Operational evidence", "Reports", "Verified client history and locally recorded closeouts remain distinguishable.", '<button class="secondary" id="export-report">Export CSV ↓</button><button class="secondary" id="export-backup">Backup local records ↓</button>')}
    ${reviewQueue(state)}
    ${reportInputs(state)}
    ${salesExplorer(state)}
    <article class="panel report-records"><div class="report-summary"><div><span>Trusted source rows</span><strong>${verifiedHistory.length}</strong></div><div><span>Demo closeouts</span><strong>${state.closeouts.length}</strong></div><div><span>Excluded source issues</span><strong>${sourceExceptions.length}</strong></div></div>${state.closeouts.length ? "" : '<div class="local-empty"><span data-icon="closeout"></span><div><strong>No local closeout yet</strong><p>Workbook history remains read-only. Complete a shift closeout to add the first clearly labelled Local Demo record.</p></div><button data-go="closeout">Start closeout</button></div>'}<div class="table-wrap"><table><thead><tr><th>Date</th><th>Evidence</th><th class="numeric">Regular</th><th class="numeric">Premium</th><th class="numeric">Diesel</th><th class="numeric">Sales</th><th class="numeric">Profit</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${shortDate(row.date)}</td><td><span class="evidence-pill ${row.status === "verified" ? "verified" : "local"}">${row.status === "verified" ? "Workbook verified" : "Local demo"}</span></td><td class="numeric">${number(row.regularLiters)} L</td><td class="numeric">${number(row.premiumLiters)} L</td><td class="numeric">${number(row.dieselLiters)} L</td><td class="numeric"><strong>${peso(row.sales)}</strong></td><td class="numeric">${peso(row.profit)}</td></tr>`).join("")}</tbody></table></div></article>`;
}

export function auditView(state) {
  return `${title("Safety, control and traceability", "Safety & audit", "A review surface for shift checks, source exceptions, and local mutation history.", '<button class="secondary" id="reset-demo">Reset local demo</button>')}
    <div class="audit-grid"><article class="panel"><div class="panel-header"><div><span class="eyebrow">Before closeout</span><h2>Safety checklist</h2></div><span class="subtle">${Object.values(state.checklist).filter(Boolean).length}/${safetyChecklist.length} complete</span></div><div class="checklist">${safetyChecklist.map((item) => `<label><input type="checkbox" data-check="${escapeHtml(item)}" ${state.checklist[item] ? "checked" : ""}/><span><strong>${item}</strong><small>Recorded locally with current role</small></span></label>`).join("")}</div></article>
    <article class="panel"><div class="panel-header"><div><span class="eyebrow">FSIS-aligned evidence</span><h2>Audit trail</h2></div></div><div class="timeline">${state.audit.map((event) => `<div><span></span><section><strong>${escapeHtml(event.action)}</strong><small>${escapeHtml(event.actor)} · ${dateTime(event.at)}</small><p>${escapeHtml(event.detail)}</p></section></div>`).join("")}</div></article></div>`;
}

export const views = { experience: experienceView, overview: overviewView, closeout: closeoutView, tanks: tanksView, deliveries: deliveriesView, pricing: pricingView, reports: reportsView, audit: auditView };
