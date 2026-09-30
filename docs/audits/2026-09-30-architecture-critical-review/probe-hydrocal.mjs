/**
 * Diagnostic probe of the reviewed HydroCal source; never an engineering acceptance test.
 * Executes ONLY extracted declarations from the pinned blob, with browser dependencies stubbed.
 * Usage: node probe-hydrocal.mjs /path/to/FDG-FP-HydroCal.html > reproductions.json
 * Reproduced=true means a historical defect/unsafe rule was observed, NOT a test pass.
 * Core function executed in isolated JavaScript; Node file wrapper not executed in this review.
 */
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

export function probeHydroCal(html) {
 const extract = (pattern, label) => {
  const match = html.match(pattern);
  if (!match) throw new Error("Pinned source layout missing: " + label);
  return match[0];
 };
 const pipe = extract(/^const PIPE_DATA = \{[\s\S]*?^\};\r?\nconst PIPE_SIZES_SORTED = [^\r\n]+/m, "pipe catalogue");
 const eng = extract(/^const Eng = \{[\s\S]*?^\};/m, "Eng");
 const hydraulic = extract(/^const Hydraulic = \{[\s\S]*?^\};/m, "Hydraulic");
 const Eng = Function(pipe + "\n" + eng + "\nreturn Eng;")();
 const near = (a, b) => Math.abs(a - b) < 1e-9;
 const pressure = 100, Q = 500, eff = 80;
 const actualPower = Eng.pumpBHP(Q, pressure, eff);
 const head = pressure * 2.31;
 const referencePower = Q * head / (3960 * eff / 100);
 const residualMatch = hydraulic.match(/const residualP = ([^;\r\n]+);/);
 if (!residualMatch) throw new Error("Residual expression not found");
 const fallback = Function("App", "totalLoss", "return " + residualMatch[1])({state: {waterSupply: {staticPressure: 0}}}, 0);
 const storage = Eng.storageVolume(100, 60, 60, 40);
 const recommended = Eng.recommendPipe(10000, 1);
 function runHydraulic(staticPressure, elev) {
  const numbers = {hydQ: 200, hydC: 120, hydD: 4.026, hydL: 0, hydFittings: 0, hydElev: elev};
  const nodes = {};
  const $ = id => nodes[id] ??= {value: String(numbers[id] ?? ""), style: {}, innerHTML: ""};
  const App = {state: {waterSupply: {staticPressure}, calculations: {}, fireCode: "diagnostic"}, pushHistory() {}, logCalculation() {}};
  const calculation = Function("Eng", "App", "$", "numVal", "validateInputs", "toast", "FIRE_CODES", "fmt", hydraulic + "\nreturn Hydraulic;")(
   Eng, App, $, id => numbers[id], () => true, () => {}, [{id: "diagnostic", name: "diagnostic fixture", params: {velocityMax: 32}}], (n, digits = 2) => Number(n).toFixed(digits)
  );
  calculation.calculate();
  return {result: App.state.calculations.hydraulic, output: $("hydraulicCalcOutput").innerHTML};
 }
 const zero = runHydraulic(0, 0), adverse = runHydraulic(80, 300);
 const npshRule = /npshA\s*>\s*10/.test(html) && /Eng\.npshA\(14\.7,\s*suction,\s*0\.5,\s*2\)/.test(html);
 return [
  {id: "HC-01", kind: "source-function execution", inputs: {flow_gpm: Q, pressure_psi: pressure, efficiency_percent: eff}, actual_bhp: actualPower, reference_water_head_ft: head, reference_bhp: referencePower, understatement_percent: (1 - actualPower / referencePower) * 100, reproduced: near(actualPower, 15.782828282828282) && near(referencePower, 36.458333333333336)},
  {id: "HC-02", kind: "source-expression execution", static_pressure: 0, actual_fallback: fallback, expected: 0, reproduced: fallback === 80},
  {id: "HC-03", kind: "source-function execution; helper-level only", inputs: {flow_gpm: 100, minutes: 60, reserve_percent: 60, dead_percent: 40}, actual_gallons: storage, expected: "Reject zero usable fraction", reproduced: storage === 6000},
  {id: "HC-04", kind: "source rule check; missing engineering context independently inspected", actual_decision_rule: "npshA > 10 with fixed atmospheric, vapor and friction inputs", expected: "Manufacturer NPSHR and applicable margin evidence; no universal available-head PASS", reproduced: npshRule},
  {id: "HC-05", kind: "source-function execution", inputs: {flow_gpm: 10000, max_velocity_ft_s: 1}, actual: recommended, expected: "No catalogue size meets the limit; do not recommend a passing size", reproduced: recommended.nominal === 12 && recommended.velocity > 1},
  {id: "HC-02B", kind: "actual Hydraulic.calculate with DOM stubs; form validation not exercised", inputs: {flow_gpm: 200, static_pressure_psi: 0, length_ft: 0, elevation_ft: 0}, actual_residual_psi: zero.result.residualP, expected_residual_psi: 0, reproduced: zero.result.residualP === 80},
  {id: "HC-06", kind: "actual Hydraulic.calculate with DOM stubs", inputs: {flow_gpm: 200, static_pressure_psi: 80, length_ft: 0, elevation_ft: 300}, actual_residual_psi: adverse.result.residualP, velocity_pass: adverse.result.velOk, rendered_all_acceptable: adverse.output.includes("All hydraulic parameters acceptable."), expected: "No global acceptable verdict with negative residual pressure", reproduced: adverse.result.residualP < 0 && adverse.result.velOk && adverse.output.includes("All hydraulic parameters acceptable.")}
 ];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
 const file = process.argv[2];
 if (!file) throw new Error("Pass the path to the reviewed HydroCal HTML snapshot");
 const bytes = readFileSync(file);
 const hash = createHash("sha1").update(Buffer.from("blob " + bytes.length + "\0")).update(bytes).digest("hex");
 if (hash !== "73a66de056ffd36fb38bd1fdc56ad5398ed7e590") throw new Error("Unexpected Git blob; use the pinned reviewed snapshot");
 console.log(JSON.stringify(probeHydroCal(bytes.toString("utf8")), null, 2));
}
