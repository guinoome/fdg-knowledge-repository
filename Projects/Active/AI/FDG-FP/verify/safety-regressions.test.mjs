import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';

const html = readFileSync(new URL('../FDG-FP-HydroCal.html', import.meta.url), 'utf8');
const extract = pattern => {
  const match = html.match(pattern);
  assert.ok(match, 'Expected source declaration exists');
  return match[0];
};
const catalogue = extract(/^const PIPE_DATA = \{[\s\S]*?^\};\r?\nconst PIPE_SIZES_SORTED = [^\r\n]+/m);
const engineering = extract(/^const Eng = \{[\s\S]*?^\};/m);
const Eng = vm.runInNewContext(catalogue + '\n' + engineering + '\nEng');
const near = (actual, expected, tolerance = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, actual + ' versus ' + expected);

test('ACR-01: 500 US GPM, 100 psi, 80% gives 36.458333 BHP for stated water reference', () => {
  near(Eng.pressureToHeadFt(100), 231);
  near(Eng.pumpBHPFromPsi(500, 100, 80), 36.458333333333336);
  near(Eng.pumpBHP(500, 231, 80), 36.458333333333336);
});
test('Pressure conversion accounts for specific gravity without double multiplying pressure power', () => {
  near(Eng.pressureToHeadFt(100, 2), 115.5);
  near(Eng.pumpBHPFromPsi(500, 100, 80, 2), 36.458333333333336);
});
test('Pump helper rejects undefined, nonfinite and invalid efficiency/domain', () => {
  for (const args of [[500,100,0],[500,100,101],[-1,100,80],[500,-1,80],[500,100,NaN],[500,Infinity,80],[500,100,80,0]]) {
    assert.throws(() => Eng.pumpBHPFromPsi(...args), {name:'RangeError'});
  }
});
test('Zero-flow curve point remains valid, without division by zero efficiency', () => {
  near(Eng.pumpBHPFromPsi(0, 100, 80), 0);
});
test('ACR-02c: an exhausted catalogue returns no feasible candidate', () => {
  assert.equal(Eng.recommendPipe(10000, 1), null);
});
test('A feasible catalogue query still returns a useful result', () => {
  assert.equal(Eng.recommendPipe(200, 15).nominal, 2.5);
  assert.ok(Eng.recommendPipe(200, 15).velocity <= 15);
});
test('Pipe helper rejects invalid inputs rather than fabricating a candidate', () => {
  for (const args of [[0,15],[200,0],[NaN,15],[200,Infinity]]) {
    assert.throws(() => Eng.recommendPipe(...args), {name:'RangeError'});
  }
});
test('ACR-02d: storage domain failures are explicit; valid reserve remains calculated', () => {
  for (const args of [[100,60,60,40],[100,60,70,40],[100,0,20,10],[100,60,-1,10],[Infinity,60,20,10]]) {
    assert.throws(() => Eng.storageVolume(...args), {name:'RangeError'});
  }
  near(Eng.storageVolume(100,60,20,10), 8571.42857142857);
});
test('All executable inline scripts parse', () => {
  for (const [i,m] of [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].entries()) {
    new vm.Script(m[1], {filename:'HydroCal-inline-'+i});
  }
});
test('The exact historical source remains preserved as a non-executable evidence snapshot', () => {
  const bytes = readFileSync(new URL('../history/FDG-FP-HydroCal.pre-2026-10-01.html.txt', import.meta.url));
  const hash = createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
  assert.equal(hash, '73a66de056ffd36fb38bd1fdc56ad5398ed7e590');
});
