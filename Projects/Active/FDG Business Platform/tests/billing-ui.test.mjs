import test from 'node:test';
import assert from 'node:assert/strict';
import {createBilling} from '../account/billing.js';

// Small DOM fixture for control state only. Rendered layout is checked separately.
function fixture(fetcher) {
  const status={textContent:''}, list={replaceChildren(){},append(){}}, handlers={};
  const branch={value:'Fixture branch',disabled:false}, submit={dataset:{},disabled:false};
  const refresh={dataset:{action:'refresh'},disabled:false};
  const form={elements:{branch},reset(){branch.value='';},querySelectorAll(){return [branch];},addEventListener(type,fn){handlers[type]=fn;}};
  const root={hidden:true,querySelector(selector){return {'[data-billing-status]':status,'[data-billing-list]':list,form}[selector];},querySelectorAll(){return [submit,refresh];},addEventListener(type,fn){handlers[type]=fn;}};
  const client={auth:{getSession:async()=>({data:{session:{user:{id:'fixture-owner'},access_token:'synthetic-token'}}})}};
  const billing=createBilling(client,root,{fetcher,navigate(){throw new Error('Unexpected checkout');}});
  const clickRefresh=()=>handlers.click({target:{closest:()=>refresh}});
  const submitTrial=()=>handlers.submit({preventDefault(){}});
  return {billing,root,status,branch,submit,refresh,clickRefresh,submitTrial};
}
const flush=async()=>{for(let i=0;i<4;i++)await new Promise(setImmediate);};

test('unconfigured billing disables trial; refresh can restore verified availability',async()=>{
  let connected=false;
  const requests=[];
  const f=fixture(async(url,options)=>{
    requests.push(options.method);
    return connected ? Response.json({mode:'test',subscriptions:[],invoices:[]}) : Response.json({error:'payments_not_configured'},{status:503});
  });
  f.billing.show('fixture-owner');
  assert(f.submit.disabled && f.branch.disabled);
  await flush();
  assert.match(f.status.textContent,/Subscriptions are not enabled/);
  assert(f.submit.disabled && f.branch.disabled);
  assert.equal(f.refresh.disabled,false);
  f.submitTrial(); await flush();
  assert.deepEqual(requests,['GET'],'Unavailable form must never attempt a trial POST');
  connected=true;
  const previous=globalThis.document;
  globalThis.document={createElement:()=>({})};
  try { f.clickRefresh(); await flush(); } finally { globalThis.document=previous; }
  assert.equal(f.submit.disabled,false);
  assert.equal(f.branch.disabled,false);
  assert.match(f.status.textContent,/TEST MODE/);
  f.billing.clear();
  assert(f.root.hidden && f.submit.disabled && f.branch.disabled);
});

test('late unavailable response cannot restore controls after account clear',async()=>{
  let release;
  const f=fixture(()=>new Promise(resolve=>{release=resolve;}));
  f.billing.show('fixture-owner'); await flush();
  f.billing.clear();
  release(Response.json({error:'payments_not_configured'},{status:503})); await flush();
  assert(f.root.hidden && f.submit.disabled && f.branch.disabled);
  assert.equal(f.status.textContent,'');
});
