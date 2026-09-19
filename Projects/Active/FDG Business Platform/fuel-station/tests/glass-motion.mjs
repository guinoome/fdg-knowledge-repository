import assert from 'node:assert/strict';
import { glassDialog } from '../src/glass-motion.js';
function fixture(reduced = false) {
 const events = {}; const completions = []; let focused = 0;
 const dialog = { open:false, addEventListener:(type,handler)=>events[type]=handler,
  showModal(){this.open=true;}, close(){this.open=false;},
  animate(){return {finished:new Promise(resolve=>completions.push(resolve))};} };
 const trigger={isConnected:true,focus(){focused++;}};
 const motion=glassDialog(dialog,{matchMedia:()=>({matches:reduced})});
 return {dialog,events,completions,trigger,motion,focused:()=>focused};
}
const f=fixture(); f.motion.open(f.trigger); assert.equal(f.dialog.open,true);
f.completions.shift()();
let navigations=0;
const closing=f.motion.close(()=>navigations++);
await f.motion.close(()=>navigations++); // Double activation cannot navigate twice.
assert.equal(f.dialog.open,true); assert.equal(navigations,0);
f.completions.shift()(); await closing;
assert.equal(f.dialog.open,false); assert.equal(navigations,1); assert.equal(f.focused(),1);
const r=fixture(true); r.motion.open(r.trigger); assert.equal(r.completions.length,0);
let prevented=false; r.events.cancel({preventDefault(){prevented=true;}});
await Promise.resolve(); await Promise.resolve();
assert.equal(prevented,true); assert.equal(r.dialog.open,false); assert.equal(r.focused(),1);
const detached=fixture(true); detached.motion.open(detached.trigger); detached.trigger.isConnected=false;
await detached.motion.close(); assert.equal(detached.focused(),0);
console.log('PASS glass motion: native modal lifetime, single navigation, reduced motion, Escape and focus');
