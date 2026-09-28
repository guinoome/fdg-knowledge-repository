// Opt-in hosted TEST QA. Creates only disposable fixtures in the isolated FDG project.
// Run --prepare, apply the returned SQL in that project, then --trial and --checkout.
// Never point this at a live-money environment. Fixture file lives outside the repository.
import assert from 'node:assert/strict';
import {randomBytes,randomUUID} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,relative,isAbsolute} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createClient} from '@supabase/supabase-js';
import {authConfig} from '../account/config.js';
const fixturePath=process.env.FDG_BILLING_FIXTURES;
if(!fixturePath)throw Error('FDG_BILLING_FIXTURES outside repository required');
const repository=fileURLToPath(new URL('../',import.meta.url));
const fixtureRelative=relative(repository,resolve(fixturePath));
if(!fixtureRelative.startsWith('..')&&!isAbsolute(fixtureRelative))throw Error('Never store QA credentials in the repository');
assert.equal(authConfig.url,'https://nyrvzzuunnkdgsbbbjvo.supabase.co');
const origin='https://fdgbusinessplatforms-paymongo-test.vercel.app';
const action=process.argv[2];
assert(['--prepare','--trial','--checkout','--verify'].includes(action));
if(action==='--prepare'){
 const fixtures=[0,1].map(()=>({id:randomUUID(),email:'fdg-qa-'+randomUUID()+'@example.invalid',password:randomBytes(32).toString('base64url')}));
 writeFileSync(fixturePath,JSON.stringify(fixtures),{flag:'wx'});
 const statements=fixtures.map(u=>`insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,confirmation_token,recovery_token,email_change_token_new,email_change) values('00000000-0000-0000-0000-000000000000','${u.id}','authenticated','authenticated','${u.email}',extensions.crypt('${u.password}',extensions.gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{}',now(),now(),'','','',''); insert into auth.identities(provider_id,user_id,identity_data,provider,created_at,updated_at) values('${u.id}','${u.id}','{"sub":"${u.id}","email":"${u.email}","email_verified":true}','email',now(),now());`);
 // Operator must capture this sensitive SQL programmatically; do not print or publish it.
 console.log(JSON.stringify({query:'begin;'+statements.join('\n')+'commit;'}));process.exit(0);
}
const f=JSON.parse(readFileSync(fixturePath,'utf8'));
assert(f.every(x=>x.email.startsWith('fdg-qa-')&&x.email.endsWith('@example.invalid')));
const clients=f.map(()=>createClient(authConfig.url,authConfig.key,{auth:{persistSession:false,autoRefreshToken:false}}));
for(let i=0;i<2;i++){const r=await clients[i].auth.signInWithPassword(f[i]);assert.equal(r.error,null,r.error?.message);f[i].token=r.data.session.access_token;}
async function api(i,body){const r=await fetch(origin+'/api/payments',{method:body?'POST':'GET',headers:{Authorization:'Bearer '+f[i].token,Origin:origin,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});return {status:r.status,data:await r.json()};}
try{
 const initial=await api(0);assert.equal(initial.status,200);assert.equal(initial.data.mode,'test');
 if(action==='--trial'){
  const trial=await api(0,{action:'start_trial',branchName:'Disposable hosted QA 2026-09-28'});assert.equal(trial.status,200);
  const s=trial.data.subscription;assert.equal(s.monthly_centavos,50000);assert.equal(s.livemode,false);
  const early=await api(0,{action:'issue_invoice',id:s.id});assert.equal(early.status,409);
  const other=await api(1);assert(!other.data.subscriptions.some(x=>x.id===s.id));
  assert.equal((await api(1,{action:'issue_invoice',id:s.id})).status,409);
  console.log(JSON.stringify({passed:['real login','configured authenticated billing','trial price','early invoice denial','account isolation'],subscriptionId:s.id,userIds:f.map(x=>x.id),expireFixtureQuery:`update public.fdg_billing_subscriptions set trial_started_at=now()-interval '8 days',trial_ends_at=now()-interval '1 day' where id='${s.id}' and user_id='${f[0].id}' and branch_name='Disposable hosted QA 2026-09-28' and livemode=false;`}));
 }else if(action==='--checkout'){
  const s=initial.data.subscriptions.find(x=>x.branch_name==='Disposable hosted QA 2026-09-28');assert(s);
  const invoice=await api(0,{action:'issue_invoice',id:s.id});assert.equal(invoice.status,200);
  const id=invoice.data.invoice.id;
  const denied=await api(1,{action:'checkout',id});assert.equal(denied.status,409);
  const checkout=await api(0,{action:'checkout',id});assert.equal(checkout.status,200,JSON.stringify(checkout.data));
  assert.equal(checkout.data.mode,'test');assert.equal(new URL(checkout.data.checkoutUrl).hostname,'checkout.paymongo.com');
  const again=await api(0,{action:'checkout',id});assert.equal(again.data.checkoutUrl,checkout.data.checkoutUrl);
  f[0].invoiceId=id;f[0].checkoutUrl=checkout.data.checkoutUrl;
  console.log(JSON.stringify({passed:['invoice issuance','cross-account checkout denied','real provider test checkout','duplicate checkout reused'],invoiceId:id,checkoutUrl:checkout.data.checkoutUrl}));
 }else if(action==='--verify'){
  const own=initial.data.invoices.find(i=>i.id===f[0].invoiceId);assert(own);assert.equal(own.status,'paid');
  const other=await api(1);assert(!other.data.invoices.some(i=>i.id===own.id));
  console.log(JSON.stringify({passed:['server-confirmed paid test invoice','paid invoice account isolation'],invoiceId:own.id}));
 }
}finally{
 for(const client of clients)await client.auth.signOut();
 f.forEach(x=>delete x.token);writeFileSync(fixturePath,JSON.stringify(f));
}
