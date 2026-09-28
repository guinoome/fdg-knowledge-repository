import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {settings, verifySignature, safeCheckoutUrl, paidCheckoutId, paymentProof, paymongo, PaymentError} from '../server/paymongo.js';
import {paymentHandlers} from '../server/payment-handlers.js';

// All credentials, provider responses and dependencies here are synthetic; no provider proof is claimed.
const env={FDG_PAYMENTS_ENABLED:'true',FDG_PAYMONGO_MODE:'test',FDG_PAYMONGO_SECRET_KEY:'sk_test_fixture',FDG_PAYMONGO_WEBHOOK_SECRET:'fixture-signing-secret',FDG_SUPABASE_SECRET_KEY:'fixture-db-secret',FDG_PAYMONGO_METHODS:'gcash',FDG_APP_ORIGIN:'https://fdgbusinessplatforms.vercel.app'};
const invoiceId='11111111-1111-4111-8111-111111111111', attemptId='22222222-2222-4222-8222-222222222222';
const ownerId='33333333-3333-4333-8333-333333333333';
const checkoutId='cs_fixture', paymentId='pay_fixture';
const invoice={id:invoiceId,amount_centavos:50000,currency:'PHP'};
const attempt={id:attemptId,state:'creating'};
const checkoutUrl='https://checkout.paymongo.com/fixture';
const resource=()=>({data:{id:checkoutId,attributes:{livemode:false,metadata:{application:'fdg-business-platform',invoice_id:invoiceId},reference_number:attemptId,payments:[{id:paymentId,attributes:{status:'paid',amount:50000,currency:'PHP',livemode:false,refunds:[]}}]}}});
const event=()=>({data:{id:'evt_fixture',attributes:{type:'checkout_session.payment.paid',livemode:false,data:{id:checkoutId}}}});
function signature(raw,time=Math.floor(Date.now()/1000)) {return `t=${time},te=${createHmac('sha256',env.FDG_PAYMONGO_WEBHOOK_SECRET).update(time+'.').update(raw).digest('hex')}`;}
function webhook(payload=event(),header) {const raw=JSON.stringify(payload);return new Request(env.FDG_APP_ORIGIN+'/api/paymongo-webhook',{method:'POST',body:raw,headers:{'paymongo-signature':header??signature(raw)}});}
function request(body,headers={}) {return new Request(env.FDG_APP_ORIGIN+'/api/payments',{method:'POST',body:JSON.stringify(body),headers:{authorization:'Bearer fixture.token',origin:env.FDG_APP_ORIGIN,'content-type':'application/json',...headers}});}
function harness(overrides={}) {
 const calls=[];
 const deps={
  authenticate:async()=>({user:{id:ownerId},client:{rpc:async(name,args)=>{calls.push({name,args});return {data:{id:invoiceId}};}}}),
  admin:{rpc:async(name,args)=>{calls.push({name,args});return {data:name==='fdg_test_claim_checkout'?{fresh:true,invoice,attempt}:'paid'};}},
  provider:{create:async(i,a)=>{calls.push({name:'provider.create',invoice:i,attempt:a});return {id:checkoutId,url:checkoutUrl};},retrieve:async()=>{calls.push({name:'provider.retrieve'});return resource();}},
  ...overrides
 };
 return {calls,handlers:paymentHandlers({env,dependencies:()=>deps,logger:{warn(){}}})};
}

test('disabled, live mode and live keys fail closed',()=>{
 for(const patch of [{FDG_PAYMENTS_ENABLED:'false'},{FDG_PAYMONGO_MODE:'live'},{FDG_PAYMONGO_SECRET_KEY:'sk_live_fixture'},{FDG_PAYMONGO_WEBHOOK_SECRET:''},{FDG_SUPABASE_SECRET_KEY:''},{FDG_PAYMONGO_METHODS:'unapproved'}]) assert.throws(()=>settings({...env,...patch}));
 assert.equal(settings(env).origin,env.FDG_APP_ORIGIN);
});
test('checkout redirect is limited to the exact PayMongo HTTPS host',()=>{
 assert.equal(safeCheckoutUrl(checkoutUrl),checkoutUrl);
 for(const url of ['http://checkout.paymongo.com/test','https://checkout.paymongo.com.evil.test/','https://user@checkout.paymongo.com/','https://checkout.paymongo.com:444/','javascript:alert(1)'])assert.equal(safeCheckoutUrl(url),null);
});
test('signature verifies exact bytes, test signature, bounded timestamp and rejects duplicates',()=>{
 const raw=Buffer.from('{"a":1}'),time=100000;
 assert(verifySignature(raw,signature(raw,time),env.FDG_PAYMONGO_WEBHOOK_SECRET,time));
 for(const header of [signature(raw,time-301),signature(raw,time+301),signature(raw,time)+`,t=${time}`,signature(raw,time).replace('te=','li='),'t=123,te=invalid']) assert(!verifySignature(raw,header,env.FDG_PAYMONGO_WEBHOOK_SECRET,time));
 assert(!verifySignature(Buffer.from('{"a":2}'),signature(raw,time),env.FDG_PAYMONGO_WEBHOOK_SECRET,time));
});
test('current and legacy event envelopes supported; live or malformed paid events rejected',()=>{
 assert.equal(paidCheckoutId(event()),checkoutId);
 assert.equal(paidCheckoutId({data:event().data.attributes}),checkoutId);
 assert.equal(paidCheckoutId({data:{type:'payment.failed'}}),null);
 assert.throws(()=>paidCheckoutId({data:{type:'checkout_session.payment.paid',livemode:true,data:{id:checkoutId}}}));
});
test('provider evidence must match mode, app, reference and a single non-refunded PHP payment',()=>{
 assert.equal(paymentProof(resource(),checkoutId).amount,50000);
 const mutations=[r=>r.data.id='cs_other',r=>r.data.attributes.livemode=true,r=>r.data.attributes.metadata.application='ml-printing',r=>r.data.attributes.reference_number='bad',r=>r.data.attributes.payments={},r=>r.data.attributes.payments.push(r.data.attributes.payments[0]),r=>r.data.attributes.payments[0].attributes.livemode=true,r=>r.data.attributes.payments[0].attributes.currency='USD',r=>r.data.attributes.payments[0].attributes.refunds=[{}],r=>r.data.attributes.payments[0].attributes.disputed=true,r=>r.data.attributes.payments[0].attributes.status='failed'];
 for(const change of mutations){const r=resource();change(r);assert.throws(()=>paymentProof(r,checkoutId));}
});
test('adapter sends server invoice amount, durable reference and idempotency key',async()=>{
 let sent;
 const provider=paymongo(settings(env),async(url,options)=>{sent={url,options};return Response.json({data:{id:checkoutId,attributes:{checkout_url:checkoutUrl,livemode:false}}});});
 assert.equal((await provider.create(invoice,attempt)).url,checkoutUrl);
 assert.equal(sent.url,'https://api.paymongo.com/v2/checkout_sessions');
 assert.equal(sent.options.headers['Idempotency-Key'],'fdg-test-'+attemptId);
 const body=JSON.parse(sent.options.body).data.attributes;
 assert.equal(body.line_items[0].amount,50000);assert.equal(body.reference_number,attemptId);
 assert.equal(body.metadata.invoice_id,invoiceId);assert.equal(body.send_email_receipt,false);
 assert(!body.success_url.includes('paid=true'));
});
test('adapter sanitizes provider errors and rejects live checkout response',async()=>{
 for(const fetcher of [async()=>{throw new Error('sensitive detail');},async()=>new Response('secret',{status:400}),async()=>Response.json({data:{id:checkoutId,attributes:{checkout_url:checkoutUrl,livemode:true}}})]){
  await assert.rejects(()=>paymongo(settings(env),fetcher).create(invoice,attempt),e=>e instanceof PaymentError&&!e.message.includes('sensitive'));
 }
});
test('account endpoint requires auth, same origin and valid JSON body',async()=>{
 const {handlers,calls}=harness();
 assert.equal((await handlers.account(request({action:'checkout',id:invoiceId},{authorization:''}))).status,401);
 assert.equal((await handlers.account(request({action:'checkout',id:invoiceId},{origin:'https://evil.test'}))).status,403);
 assert.equal((await handlers.account(request({action:'checkout',id:invoiceId},{'content-type':'text/plain'}))).status,415);
 assert.equal((await handlers.account(request({action:'checkout',id:'invalid'}))).status,400);
 assert.equal(calls.length,0);
});
test('expired session cannot claim a checkout',async()=>{
 const {handlers,calls}=harness({authenticate:async()=>{throw new PaymentError('session_expired',401);}});
 assert.equal((await handlers.account(request({action:'checkout',id:invoiceId}))).status,401);assert.equal(calls.length,0);
});
test('checkout derives owner and price from server, ignoring forged client fields',async()=>{
 const {handlers,calls}=harness();
 const r=await handlers.account(request({action:'checkout',id:invoiceId,user_id:'victim',amount:1}));
 assert.equal(r.status,200);assert.equal((await r.json()).mode,'test');
 assert.equal(calls[0].args.p_user_id,ownerId);
 assert.equal(calls.find(c=>c.name==='provider.create').invoice.amount_centavos,50000);
 assert(calls.some(c=>c.name==='fdg_test_save_checkout'));
});
test('existing checkout reused; ambiguous attempt blocks a second provider create',async()=>{
 for(const state of ['ready','creating','review','paid']){
  const {handlers,calls}=harness({admin:{rpc:async()=>({data:{fresh:false,invoice,attempt:{...attempt,state,checkout_url:checkoutUrl}}})}});
  const r=await handlers.account(request({action:'checkout',id:invoiceId}));
  assert.equal(r.status,state==='ready'?200:409);assert(!calls.some(c=>c.name==='provider.create'));
 }
});
test('ambiguous provider timeout records review and does not retry',async()=>{
 const {handlers,calls}=harness({provider:{create:async()=>{throw new PaymentError('provider_unavailable',502);}}});
 assert.equal((await handlers.account(request({action:'checkout',id:invoiceId}))).status,502);
 assert(calls.some(c=>c.name==='fdg_test_review_checkout'));
});
test('invalid webhook signature performs no provider or database work',async()=>{
 const {handlers,calls}=harness();assert.equal((await handlers.webhook(webhook(event(),'invalid'))).status,401);assert.equal(calls.length,0);
});
test('shared merchant events from another app are ignored without settlement',async()=>{
 const other=resource();other.data.attributes.metadata.application='ml-printing';
 const {handlers,calls}=harness({provider:{retrieve:async()=>other}});
 const r=await handlers.webhook(webhook());assert.equal(r.status,200);assert.equal((await r.json()).ignored,true);assert.equal(calls.length,0);
});
test('signed event retrieves provider evidence and invokes atomic settlement',async()=>{
 const {handlers,calls}=harness();const r=await handlers.webhook(webhook());
 assert.equal(r.status,200);assert.equal((await r.json()).status,'paid');
 assert.equal(calls[0].name,'provider.retrieve');
 const settlement=calls.find(c=>c.name==='fdg_test_settle_invoice');
 assert.equal(settlement.args.p_amount,50000);assert.equal(settlement.args.p_invoice_id,invoiceId);assert.match(settlement.args.p_payload_sha256,/^[a-f0-9]{64}$/);
});
test('duplicate receipt acknowledged; provider outage and DB mismatch remain retryable failures',async()=>{
 const duplicate=harness({admin:{rpc:async()=>({data:'duplicate'})}});
 assert.equal((await (await duplicate.handlers.webhook(webhook())).json()).status,'duplicate');
 const unavailable=harness({provider:{retrieve:async()=>{throw new PaymentError('provider_unavailable',502);}}});
 assert.equal((await unavailable.handlers.webhook(webhook())).status,502);
 const mismatch=harness({admin:{rpc:async()=>({error:{message:'Amount mismatch'}})}});
 const result=await mismatch.handlers.webhook(webhook());assert.equal(result.status,409);assert.deepEqual(await result.json(),{error:'billing_action_unavailable'});
});
test('oversized requests are rejected before JSON parsing',async()=>{
 const {handlers}=harness();
 assert.equal((await handlers.account(request({action:'start_trial',branchName:'a'.repeat(17000)}))).status,413);
 assert.equal((await handlers.webhook(new Request(env.FDG_APP_ORIGIN,{method:'POST',body:'a'.repeat(262145)}))).status,413);
});
