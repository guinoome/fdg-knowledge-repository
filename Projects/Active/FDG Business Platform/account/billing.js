// Test billing is separate from demonstration activation and operational access.
export function createBilling(client, root, {fetcher=fetch, navigate=url=>location.assign(url)}={}) {
  const status=root.querySelector('[data-billing-status]');
  const list=root.querySelector('[data-billing-list]');
  const form=root.querySelector('form');
  let owner=null, generation=0, controller=null, busy=false, available=false;
  const date=value=>new Intl.DateTimeFormat('en-PH',{dateStyle:'medium',timeZone:'Asia/Manila'}).format(new Date(value));
  const messages={
    payments_not_configured:'Subscriptions are not enabled on this site yet. No payment has been taken. FDG must finish payment setup before you can start a trial or checkout.',
    checkout_needs_review:'This checkout needs FDG review. Do not create another payment; contact FDG with the invoice reference.',
    session_expired:'Your session expired. Sign in again before using billing.',
    sign_in_required:'Sign in again before using billing.',
    provider_unavailable:'PayMongo could not confirm the checkout. Do not pay twice. Refresh or contact FDG to review the invoice.',
    billing_action_unavailable:'This action could not be confirmed. An invoice may not be due yet. Refresh before trying again.'
  };
  function syncControls() {
    root.querySelectorAll('button').forEach(b=>b.disabled=busy || (!available && b.dataset.action!=='refresh'));
    form.querySelectorAll('input').forEach(input=>input.disabled=busy || !available);
  }
  function clear() {
    owner=null;generation++;controller?.abort();controller=null;busy=false;available=false;
    list.replaceChildren();form.reset();status.textContent='';root.hidden=true;
    syncControls();
  }
  async function api(body,signal) {
    const {data:{session}}=await client.auth.getSession();
    if(!session || session.user.id!==owner)throw new Error('sign_in_required');
    const response=await fetcher('/api/payments',{
      method:body?'POST':'GET',cache:'no-store',credentials:'omit',signal,
      headers:{Authorization:`Bearer ${session.access_token}`,...(body?{'Content-Type':'application/json'}:{})},
      ...(body?{body:JSON.stringify(body)}:{})
    });
    let data;try{data=await response.json();}catch{throw new Error('payments_not_configured');}
    if(!response.ok)throw new Error(data.error||'billing_unavailable');
    return data;
  }
  function button(label,action,id) {
    const b=document.createElement('button');b.type='button';b.className='quiet';b.textContent=label;
    b.dataset.action=action;b.dataset.id=id;return b;
  }
  function text(tag,content,className) {
    const node=document.createElement(tag);node.textContent=content;if(className)node.className=className;return node;
  }
  function render(data) {
    if(data.mode!=='test' || !Array.isArray(data.subscriptions) || !Array.isArray(data.invoices))throw new Error('billing_unavailable');
    list.replaceChildren();
    if(!data.subscriptions.length)list.append(text('p','No test branches yet. Start with Fuel Operations.','note'));
    for(const s of data.subscriptions) {
      const item=document.createElement('article');item.className='billing-item';
      item.append(text('h4',s.branch_name),text('p','Fuel Operations · ₱500 / month · TEST'));
      item.append(text('p',s.renewals_enabled?`Trial ends ${date(s.trial_ends_at)}. Payments are manual; no automatic debit.`:'Future test renewals stopped. Existing invoices are unchanged.','note'));
      const actions=document.createElement('div');actions.className='actions';
      if(s.renewals_enabled)actions.append(button('Check invoice due','issue_invoice',s.id),button('Stop future renewals','stop_renewals',s.id));
      item.append(actions);
      for(const i of data.invoices.filter(i=>i.subscription_id===s.id)){
        const row=document.createElement('section');row.className='billing-invoice';
        row.append(text('p',`${date(i.period_start)} – ${date(i.period_end)} · ₱${(i.amount_centavos/100).toFixed(2)} · ${i.status==='paid'?'Paid in TEST MODE':'Awaiting test payment'}`),text('p',`Reference: ${i.id}`,'note'));
        if(i.status==='open')row.append(button('Open test checkout','checkout',i.id));
        item.append(row);
      }
      list.append(item);
    }
  }
  async function run(action) {
    if(!owner || busy || (action && !available))return;
    busy=true;const run=++generation;controller?.abort();controller=new AbortController();
    syncControls();
    status.textContent='Checking secure test billing…';
    try {
      const result=action?await api(action,controller.signal):null;
      if(run!==generation)return;
      if(action?.action==='checkout'){
        const url=new URL(result.checkoutUrl);
        if(result.mode!=='test'||url.protocol!=='https:'||url.hostname!=='checkout.paymongo.com'||url.username||url.password||url.port)throw new Error('invalid_checkout');
        status.textContent='Opening PayMongo test checkout. Use test payment details only.';
        navigate(url.href);return;
      }
      const data=await api(null,controller.signal);
      if(run!==generation)return;
      render(data);
      available=true;
      status.textContent='TEST MODE — no real money. Payment status is confirmed by the server, not the return link.';
    } catch(error) {
      if(run!==generation)return;
      available=false;
      list.replaceChildren();
      status.textContent=messages[error.message]||'Billing could not be verified. Refresh or contact FDG; do not pay twice.';
    } finally {
      if(run===generation){busy=false;syncControls();}
    }
  }
  root.addEventListener('click',event=>{
    const b=event.target.closest('button[data-action]');if(!b)return;
    if(b.dataset.action==='refresh')run();else run({action:b.dataset.action,id:b.dataset.id});
  });
  form.addEventListener('submit',event=>{event.preventDefault();run({action:'start_trial',branchName:form.elements.branch.value.trim()});});
  return {clear,show(userId){if(owner===userId)return;clear();owner=userId;root.hidden=false;run();}};
}
