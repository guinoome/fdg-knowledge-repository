import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {checkCapabilities} from './capability-check.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(readFileSync(new URL('../capabilities-2026-10-01.json',import.meta.url),'utf8'));
test('Current inventory agrees with source, including explicitly absent role implementation',()=>{
  const r=checkCapabilities(root,manifest);
  assert.equal(r.ok,true); assert.equal(r.mismatches.length,0); assert.equal(r.releaseAllowed,false);
});
test('An unsupported implemented claim fails the inventory check',()=>{
  const changed=structuredClone(manifest);
  changed.capabilities[1].observations[0].expected=true;
  const r=checkCapabilities(root,changed);
  assert.equal(r.ok,false); assert.match(r.mismatches[0],/authz.js/);
  const labelOnly=structuredClone(manifest);
  labelOnly.capabilities[1].sourceState='present';
  assert.equal(checkCapabilities(root,labelOnly).ok,false);
});
test('Production release remains blocked even if a manifest label says approved',()=>{
  const changed=structuredClone(manifest); changed.release={approved:true,blockers:[]};
  const r=checkCapabilities(root,changed,true);
  assert.equal(r.ok,false); assert.equal(r.releaseAllowed,false);
});
test('Invalid and out-of-scope observations cannot be treated as evidence',()=>{
  const changed=structuredClone(manifest);
  changed.capabilities[0].observations[0].path='../outside.sql';
  assert.equal(checkCapabilities(root,changed).ok,false);
  assert.equal(checkCapabilities(root,{}).ok,false);
});
