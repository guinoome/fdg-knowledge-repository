import {createHmac, timingSafeEqual, createHash} from 'node:crypto';

export class PaymentError extends Error {
  constructor(code, status=400) { super(code); this.code=code; this.status=status; }
}
export const isUuid = value => typeof value==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
export function settings(env=process.env) {
  // Live money requires a separate reviewed milestone, not just an environment toggle.
  if (env.FDG_PAYMENTS_ENABLED!=='true' || env.FDG_PAYMONGO_MODE!=='test' || !/^sk_test_[A-Za-z0-9]+$/.test(env.FDG_PAYMONGO_SECRET_KEY||'') || !env.FDG_PAYMONGO_WEBHOOK_SECRET || !env.FDG_SUPABASE_SECRET_KEY) throw new PaymentError('payments_not_configured',503);
  const methods=(env.FDG_PAYMONGO_METHODS||'').split(',').filter(Boolean);
  if (!methods.length || methods.some(x=>!['gcash','paymaya','qrph'].includes(x))) throw new PaymentError('payment_methods_not_configured',503);
  const appUrl=new URL(env.FDG_APP_ORIGIN || 'https://fdgbusinessplatforms.vercel.app');
  if (appUrl.protocol!=='https:' && !(env.NODE_ENV!=='production' && ['127.0.0.1','localhost'].includes(appUrl.hostname))) throw new PaymentError('invalid_origin',503);
  return {key:env.FDG_PAYMONGO_SECRET_KEY,webhookSecret:env.FDG_PAYMONGO_WEBHOOK_SECRET,dbKey:env.FDG_SUPABASE_SECRET_KEY,methods:[...new Set(methods)],origin:appUrl.origin};
}
export function safeCheckoutUrl(value) {
  try { const u=new URL(value); return u.protocol==='https:' && u.hostname==='checkout.paymongo.com' && !u.username && !u.password && !u.port ? u.href : null; } catch { return null; }
}
export function verifySignature(raw, header, secret, now=Math.floor(Date.now()/1000)) {
  if (typeof header!=='string' || !secret || header.length>1024) return false;
  const parts={};
  for(const item of header.split(',')) { const [key,...value]=item.trim().split('='); if(Object.hasOwn(parts,key)) return false; parts[key]=value.join('='); }
  if (!/^\d+$/.test(parts.t||'') || !/^[a-f0-9]{64}$/i.test(parts.te||'')) return false;
  const timestamp=Number(parts.t); if(!Number.isSafeInteger(timestamp) || Math.abs(now-timestamp)>300) return false;
  const expected=createHmac('sha256',secret).update(parts.t+'.').update(raw).digest();
  return timingSafeEqual(expected,Buffer.from(parts.te,'hex'));
}
export function paidCheckoutId(payload) {
  const event=payload?.data?.attributes || payload?.data;
  if (event?.type!=='checkout_session.payment.paid') return null;
  if (event.livemode===true || !/^cs_[A-Za-z0-9]+$/.test(event.data?.id||'')) throw new PaymentError('invalid_payment_event');
  return event.data.id;
}
export function paymentProof(resource, checkoutId) {
  const data=resource?.data, a=data?.attributes;
  if(data?.id!==checkoutId || a?.livemode!==false || a?.metadata?.application!=='fdg-business-platform' || !isUuid(a?.reference_number) || !isUuid(a?.metadata?.invoice_id)) throw new PaymentError('checkout_scope_mismatch',409);
  const paid=Array.isArray(a.payments) ? a.payments.filter(x=>x?.attributes?.status==='paid') : [];
  if(!Array.isArray(paid) || paid.length!==1) throw new PaymentError('payment_not_verified',409);
  const p=paid[0], v=p.attributes;
  if(!/^pay_[A-Za-z0-9]+$/.test(p.id) || v.livemode!==false || v.currency!=='PHP' || !Number.isSafeInteger(v.amount) || v.amount<=0 || v.disputed===true || (v.refunds?.length||0)>0) throw new PaymentError('payment_requires_review',409);
  return {attemptId:a.reference_number,invoiceId:a.metadata.invoice_id,checkoutId,paymentId:p.id,amount:v.amount,currency:v.currency};
}
export function paymongo(config, fetcher=fetch) {
  async function request(path, options={}) {
    let response;
    try { response=await fetcher('https://api.paymongo.com'+path,{...options,headers:{Authorization:`Basic ${Buffer.from(config.key+':').toString('base64')}`,'Content-Type':'application/json',...options.headers},signal:AbortSignal.timeout(10000),redirect:'error',cache:'no-store'}); }
    catch { throw new PaymentError('provider_unavailable',502); }
    if(!response.ok) throw new PaymentError('provider_unavailable',502);
    try { return await response.json(); } catch { throw new PaymentError('invalid_provider_response',502); }
  }
  return {
    async create(invoice, attempt) {
      const result=await request('/v2/checkout_sessions',{method:'POST',headers:{'Idempotency-Key':`fdg-test-${attempt.id}`},body:JSON.stringify({data:{attributes:{
        reference_number:attempt.id,metadata:{application:'fdg-business-platform',invoice_id:invoice.id},
        line_items:[{name:'FDG Fuel Operations — one branch / one month (TEST)',amount:invoice.amount_centavos,currency:'PHP',quantity:1}],
        payment_method_types:config.methods,send_email_receipt:false,show_line_items:true,
        success_url:`${config.origin}/account/?payment=return`,cancel_url:`${config.origin}/account/?payment=cancelled`
      }}})});
      const id=result?.data?.id, url=safeCheckoutUrl(result?.data?.attributes?.checkout_url);
      if(!/^cs_[A-Za-z0-9]+$/.test(id||'') || !url || result?.data?.attributes?.livemode!==false) throw new PaymentError('invalid_provider_response',502);
      return {id,url};
    },
    async retrieve(id) { if(!/^cs_[A-Za-z0-9]+$/.test(id)) throw new PaymentError('invalid_checkout'); return request('/v1/checkout_sessions/'+encodeURIComponent(id)); }
  };
}
export const digest = raw => createHash('sha256').update(raw).digest('hex');
