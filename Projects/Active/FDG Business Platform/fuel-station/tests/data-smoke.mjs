import assert from "node:assert/strict";
import fs from "node:fs";
import { integrationMap, latestAcceptedTotalizers, products, sourceExceptions, verifiedHistory } from "../data/nj-gas-station.js";
import { experienceConfig } from "../data/experience-config.js";
import { latestTotalizerRecord, reportCsv } from "../src/store.js";

assert.equal(products.length, 3, "The client model has three fuel products");
assert.equal(new Set(products.map((item) => item.id)).size, products.length, "Product IDs must be unique");
assert.ok(products.every((item) => item.tankCapacity > item.openingStock), "Opening stock must remain below working capacity");
assert.ok(products.every((item) => item.sellingPrice > item.buyingPrice), "Seed selling prices must exceed seed buying prices");

assert.equal(verifiedHistory.length, 4, "Only the selected verified source rows should seed the dashboard");
assert.ok(verifiedHistory.every((item) => item.status === "verified"), "Historical seed rows require explicit evidence status");
assert.ok(verifiedHistory.every((item) => item.regularLiters >= 0 && item.premiumLiters >= 0 && item.dieselLiters >= 0), "Trusted source rows cannot contain negative fuel volume");
assert.ok(sourceExceptions.some((item) => item.date === "2025-04-30"), "The Premium totalizer reversal must remain visible");
assert.ok(sourceExceptions.some((item) => item.date === "2025-07"), "The broken July source period must remain visible");

assert.equal(latestAcceptedTotalizers.date, "2025-04-29", "Opening totalizers must use the latest accepted source row");
assert.deepEqual(latestAcceptedTotalizers.values, { regular: 68202.44, premium: 132379.26, diesel: 32833.33 }, "Accepted closing totalizers must remain source-exact");
assert.deepEqual(latestTotalizerRecord({ closeouts: [] }).values, latestAcceptedTotalizers.values, "A new station closeout must inherit the workbook-accepted closing readings");
assert.deepEqual(latestTotalizerRecord({ closeouts: [{ date: "2026-09-10", closingTotalizers: { regular: 68212.44, premium: 132389.26, diesel: 32843.33 } }] }).values, { regular: 68212.44, premium: 132389.26, diesel: 32843.33 }, "A later local closeout must become the next automatic opening");

assert.deepEqual(integrationMap.map((item) => item.system), ["FPIS", "FBPOIS", "FBIS", "FSIS", "FWAIS"], "The five functional intelligence owners must stay explicit");
assert.equal(experienceConfig.capabilityState.integrations, "Not connected", "The prototype cannot imply a live integration");
assert.equal(experienceConfig.evidence.latestVerifiedDate, verifiedHistory.at(-1).date, "Public proof must use the latest selected verified source record");

const viewsSource = fs.readFileSync(new URL("../src/views.js", import.meta.url), "utf8");
const appSource = fs.readFileSync(new URL("../src/app.js", import.meta.url), "utf8");
assert.ok(!viewsSource.includes("integrationMap"), "The FDG ownership map must stay out of the client-facing runtime");
assert.ok(!viewsSource.includes('-opening\"'), "Closeout must not render an editable opening-totalizer field");
assert.ok(viewsSource.includes("data-opening"), "Closeout must show the inherited opening reading");
assert.ok(viewsSource.includes("data-ocr-input"), "Final totalizer entry must offer optional local OCR assistance");
assert.ok(viewsSource.includes("hourly") && viewsSource.includes("annually") && viewsSource.includes("data-analytics-range"), "Sales analysis must expose hourly through annual ranges");
assert.ok(viewsSource.includes("Hourly source not connected"), "Hourly analysis must disclose its source boundary rather than fabricate a live feed");
assert.ok(appSource.includes("latestTotalizerRecord"), "Closeout calculation and saving must use the inherited opening record");

const csv = reportCsv({ closeouts: [{ date: "2026-09-09", status: "local", regularLiters: 10, premiumLiters: 8, dieselLiters: 12, sales: 1800, profit: 240 }] });
const csvLines = csv.split("\n");
assert.equal(csvLines[0], "date,status,regularLiters,premiumLiters,dieselLiters,sales,profit", "CSV header must remain stable");
assert.equal(csvLines.length, verifiedHistory.length + 2, "CSV must include all verified rows and the local closeout");
assert.equal(csvLines.at(-1), '"2026-09-09","local",10,8,12,1800,240', "CSV local row must preserve evidence state and values");

console.log("PASS: fuel-station data, anomaly, and integration invariants");
