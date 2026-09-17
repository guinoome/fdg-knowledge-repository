import assert from "node:assert/strict";
import { stationOverview, sceneDetail } from "../src/station-scene.js";
import { views, salesExplorer } from "../src/views.js";
import { loadState } from "../src/store.js";
import { localDate } from "../src/format.js";
globalThis.localStorage = {getItem:()=>null};
const state=loadState();
const empty=stationOverview(state);
assert.match(empty,/Concept environment/);
assert.match(empty,/No record/);
assert.match(empty,/19,550 L/);
assert.doesNotMatch(empty,/command-hero|fpis-fuel-operations-sample/);
for (const kind of ["sales","tanks","closeout","attention"]) {
  assert.match(empty,new RegExp('data-scene-open="'+kind+'"'));
  assert.match(sceneDetail(state,kind,salesExplorer),/scene-detail-title/);
}
state.closeouts.push({date:localDate(),workflow:"pending",status:"local",sales:999,regularLiters:10,premiumLiters:0,dieselLiters:0});
assert.match(stationOverview(state),/No record/);
assert.match(stationOverview(state),/1 pending/);
state.closeouts[0].workflow="approved";
assert.match(stationOverview(state),/₱999/);
assert.match(stationOverview(state),/Includes local demo records/);
assert.ok(views.settings && views.operations);
assert.match(views.settings(state),/capacity-form/);
state.role="Attendant";
assert.doesNotMatch(views.settings(state),/id="capacity-form"/);
console.log("PASS scene source truth, hotspot detail routes, no pending sales and settings role boundary");
