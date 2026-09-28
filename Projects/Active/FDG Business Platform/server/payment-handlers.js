import {createClient} from '@supabase/supabase-js';
import {authConfig} from '../account/config.js';
import {PaymentError, settings, paymongo, isUuid, safeCheckoutUrl, verifySignature, paidCheckoutId, paymentProof, digest} from './paymongo.js';

const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function rawBody(req,limit) {
  const chunks=[];let size=0;const reader=req.body?.getReader();if(!reader)return Buffer.alloc(0);
  try { while(true){ const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();throw new PaymentError('request_too_large',413);}chunks.push(Buffer.from(value)); } } finally { reader.releaseLock(); }
  return Buffer.concat(chunks);
}
const rpc=async(client,name,args)=>{const r=await client.rpc(name,args);if(r.error)throw new PaymentError('billing_action_unavailable',409);return r.data;};
export function defaultDependencies(config) {
  const authOptions={persistSession:false,autoRefreshToken:false,detectSessionInUrl:false};
  return {
    admin:createClient(authConfig.url,config.dbKey,{auth:authOptions}),
    provider:paymongo(config),
    async authenticate(token) {
      const client=createClient(authConfig.url,authConfig.key,{auth:authOptions,global:{headers:{Authorization:`Bearer ${token}`}}});
      const r=await client.auth.getUser(token);
      if(r.error || !r.data.user?.email_confirmed_at)throw new PaymentError('sign_in_required',401);
      const active=await client.rpc('fdg_session_is_active');
      if(active.error || active.data!==true)throw new PaymentError('session_expired',401);
      return {client,user:r.data.user};
    }
  };
}
// Dependency injection tests the actual HTTP handlers without making test fixtures look like provider proof.
export function paymentHandlers({env=process.env,dependencies=defaultDependencies,logger=console}={}) {
  async function protect(action) {try{return await action();}catch(e){const known=e instanceof PaymentError;logger.warn('FDG payment request failed',{code:known?e.code:'internal_error'});return json({error:known?e.code:'payment_service_unavailable'},known?e.status:503);}}
  return {
    account:req=>protect(async()=>{
      if(!['GET','POST'].includes(req.method))return json({error:'method_not_allowed'},405);
      const config=settings(env);
      if(req.method==='POST' && req.headers.get('origin')!==config.origin)throw new PaymentError('origin_not_allowed',403);
      const token=req.headers.get('authorization')?.match(/^Bearer ([A-Za-z0-9._-]+)$/)?.[1];
      if(!token)throw new PaymentError('sign_in_required',401);
      const deps=dependencies(config),{client,user}=await deps.authenticate(token);
      if(req.method==='GET') {
        const [s,i]=await Promise.all([client.from('fdg_billing_subscriptions').select('*').order('trial_started_at',{ascending:false}).limit(100),client.from('fdg_billing_invoices').select('*').order('created_at',{ascending:false}).limit(100)]);
        if(s.error||i.error)throw new PaymentError('billing_unavailable',503);
        return json({mode:'test',subscriptions:s.data,invoices:i.data});
      }
      if(!req.headers.get('content-type')?.startsWith('application/json'))throw new PaymentError('json_required',415);
      let body;try{body=JSON.parse((await rawBody(req,16384)).toString('utf8'));}catch(e){if(e instanceof PaymentError)throw e;throw new PaymentError('invalid_json');}
      if(!body || typeof body!=='object')throw new PaymentError('invalid_request');
      if(body.action==='start_trial') {
        if(typeof body.branchName!=='string' || !body.branchName.trim() || body.branchName.trim().length>80)throw new PaymentError('invalid_branch');
        return json({subscription:await rpc(client,'fdg_test_start_subscription',{p_branch_name:body.branchName})});
      }
      if(!isUuid(body.id))throw new PaymentError('invalid_reference');
      if(body.action==='issue_invoice')return json({invoice:await rpc(client,'fdg_test_issue_invoice',{p_subscription_id:body.id})});
      if(body.action==='stop_renewals'){await rpc(client,'fdg_test_stop_renewals',{p_subscription_id:body.id});return json({stopped:true});}
      if(body.action!=='checkout')throw new PaymentError('invalid_action');
      const claim=await rpc(deps.admin,'fdg_test_claim_checkout',{p_invoice_id:body.id,p_user_id:user.id});
      if(!claim.fresh) {
        const url=safeCheckoutUrl(claim.attempt.checkout_url);
        if(claim.attempt.state==='ready' && url)return json({checkoutUrl:url,mode:'test'});
        throw new PaymentError('checkout_needs_review',409);
      }
      try {
        const checkout=await deps.provider.create(claim.invoice,claim.attempt);
        await rpc(deps.admin,'fdg_test_save_checkout',{p_attempt_id:claim.attempt.id,p_checkout_id:checkout.id,p_checkout_url:checkout.url});
        return json({checkoutUrl:checkout.url,mode:'test'});
      } catch(e) {
        // Never automatically retry an ambiguous provider create. A signed paid webhook can still reconcile it.
        await deps.admin.rpc('fdg_test_review_checkout',{p_attempt_id:claim.attempt.id}).catch(()=>{});
        throw e;
      }
    }),
    webhook:req=>protect(async()=>{
      if(req.method!=='POST')return json({error:'method_not_allowed'},405);
      const config=settings(env),raw=await rawBody(req,262144);
      if(!verifySignature(raw,req.headers.get('paymongo-signature'),config.webhookSecret))throw new PaymentError('invalid_signature',401);
      let payload;try{payload=JSON.parse(raw.toString('utf8'));}catch{throw new PaymentError('invalid_json');}
      const id=paidCheckoutId(payload);if(!id)return json({received:true,ignored:true});
      const deps=dependencies(config),resource=await deps.provider.retrieve(id);
      // Ignore other apps sharing this merchant account without changing their records.
      if(resource?.data?.attributes?.metadata?.application!=='fdg-business-platform')return json({received:true,ignored:true});
      const proof=paymentProof(resource,id);
      const status=await rpc(deps.admin,'fdg_test_settle_invoice',{p_attempt_id:proof.attemptId,p_invoice_id:proof.invoiceId,p_checkout_id:proof.checkoutId,p_payment_id:proof.paymentId,p_amount:proof.amount,p_currency:proof.currency,p_payload_sha256:digest(raw)});
      return json({received:true,status});
    })
  };
}
