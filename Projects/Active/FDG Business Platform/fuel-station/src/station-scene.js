import { products, sourceExceptions } from "../data/nj-gas-station.js";
import { allReportRows, latestTotalizerRecord } from "./store.js";
import { capacity } from "./operations.js";
import { attentionCenter } from "./attention.js";
import { salesPeriod } from "./sales-period.js";
import { localDate, number, peso, escapeHtml, shortDate } from "./format.js";

const action = (route, label, icon) => `<button data-go="${route}"><span data-icon="${icon}"></span>${label}<span data-icon="arrow"></span></button>`;

export function stationOverview(state) {
  const today = salesPeriod(allReportRows(state), "daily", localDate());
  const stock = Object.values(state.tanks).reduce((sum, value) => sum + value, 0);
  const pending = state.closeouts.filter(row => row.workflow === "pending").length;
  return `<section class="station-environment" aria-label="Station overview">
    <picture class="environment-picture"><source media="(max-width: 600px)" srcset="./assets/station-environment-mobile-v1.png" /><img src="./assets/station-environment-v1.png" alt="Illustrative FDG forecourt: cashier kiosk to the left, dispensers at the center and reserve tank to the right" fetchpriority="high" width="1536" height="1024" /></picture>
    <header class="scene-heading glass"><h1>NJ Gas Station</h1><p>Habay · Station overview</p><time datetime="${localDate()}">${shortDate(localDate())}</time></header>
    <button class="scene-sales glass" data-scene-open="sales" aria-label="View sales chart"><span>Sales today</span><strong>${today.count ? peso(today.sales) : "No record"}</strong><span class="scene-volume">Liters sold <b>${today.count ? number(Object.values(today.products).reduce((a,b)=>a+b,0))+" L" : "—"}</b></span><small>${today.count ? (today.local ? "Includes local demo records" : "Workbook verified") : "No accepted closeout for today"}</small><span class="scene-link">View sales <span data-icon="arrow"></span></span></button>
    <div class="scene-zones" aria-label="Station zones">
      <button class="scene-hotspot zone-cashier glass" data-scene-open="closeout"><strong>Cashier</strong><span>Closeout <span data-icon="arrow"></span></span></button>
      <button class="scene-hotspot zone-pumps glass" data-scene-open="sales"><strong>Forecourt</strong><span>Fuel sales <span data-icon="arrow"></span></span></button>
      <button class="scene-hotspot zone-tanks glass" data-scene-open="tanks"><strong>Reserve</strong><span>Tanks <span data-icon="arrow"></span></span></button>
    </div>
    <button class="scene-attention glass" data-scene-open="attention"><span class="attention-mark">!</span><span><strong>${pending ? pending+" pending · " : ""}${sourceExceptions.length} source issues</strong><small>Review before approval</small></span><span data-icon="arrow"></span></button>
    <button class="scene-stock glass" data-scene-open="tanks"><span>Wet stock · local balance</span><strong>${number(stock,0)} L</strong><span class="stock-mini">${products.map(p=>`<span><b>${p.name}</b><i><em style="width:${Math.min(100, Math.max(0,state.tanks[p.id]/capacity(state,p.id)*100))}%;background:${p.color}"></em></i><small>${number(state.tanks[p.id],0)} L</small></span>`).join("")}</span></button>
    <nav class="scene-actions" aria-label="Station quick actions"><button class="scene-primary" data-go="closeout"><span data-icon="closeout"></span>New closeout</button><button class="glass" data-go="deliveries"><span data-icon="deliveries"></span>Receive delivery</button><button class="glass" data-scene-open="sales"><span data-icon="reports"></span>Sales chart</button></nav>
    <p class="scene-provenance">Concept environment · local records · no telemetry</p>
    <dialog class="scene-dialog" aria-labelledby="scene-detail-title"><div class="scene-dialog-content"></div></dialog>
  </section>`;
}

export function sceneDetail(state, kind, renderSales) {
  const prior = latestTotalizerRecord(state);
  const title = {sales:"Fuel sales",tanks:"Tanks & stock",closeout:"Daily closeout",attention:`Needs attention · ${sourceExceptions.length}`}[kind] || "Station details";
  let body = "";
  if (kind === "sales") body = renderSales(state) + action("reports","Open reports & records","reports");
  if (kind === "tanks") body = `<p>Recorded local balances, not sensor readings.</p><div class="detail-tanks">${products.map(p=>`<article><span style="--product:${p.color}">${p.name}</span><strong>${number(state.tanks[p.id])} L</strong><meter min="0" max="${capacity(state,p.id)}" value="${state.tanks[p.id]}" aria-label="${p.name} recorded tank level"></meter><small>${number(capacity(state,p.id),0)} L working capacity</small></article>`).join("")}</div>` + action("tanks","Open tanks & inventory","tanks") + action("deliveries","Receive delivery","deliveries");
  if (kind === "closeout") body = `<p>Opening readings carry forward automatically from the latest accepted close.</p><div class="detail-baseline"><span>${escapeHtml(prior.source)}</span><strong>${shortDate(prior.date)}</strong>${products.map(p=>`<p>${p.name}<b>${number(prior.values[p.id])}</b></p>`).join("")}</div><p>Enter the final reading or review a photo-assisted reading. Returned tests are deducted from positive meter movement. Submission awaits manager review.</p>` + action("closeout","Record final readings","closeout");
  if (kind === "attention") body = attentionCenter(state) + action("reports","Review closeouts","reports") + action("audit","Open safety & audit","audit");
  return `<header class="detail-heading"><h2 id="scene-detail-title">${title}</h2><button data-close-scene aria-label="Close station details">Close <span aria-hidden="true">×</span></button></header><div class="detail-body">${body}</div>`;
}
