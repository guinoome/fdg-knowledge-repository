import assert from 'node:assert/strict';
import {authErrorMessage, bindPasswordVisibility} from '../account/auth-feedback.js';
assert.match(authErrorMessage({code:'over_email_send_rate_limit',status:429}), /Email sending is temporarily limited/);
assert.match(authErrorMessage({status:429}), /Too many requests/);
assert.match(authErrorMessage({code:'email_address_not_authorized'}), /connect its email-sending service/);
assert.match(authErrorMessage({code:'weak_password'}), /12 characters/);
assert.match(authErrorMessage({name:'AuthRetryableFetchError'}), /connection/);
assert.match(authErrorMessage({},'recovery'), /Recovery email/);
assert(!authErrorMessage({message:'PRIVATE EMAIL OR TOKEN'}).includes('PRIVATE'));
const inputs = new Map(), listeners = new Map();
const buttons = ['login-password','new-password','confirm-password'].map(id => {
  inputs.set('#'+id, {type:'password',value:'test-only-value'});
  const attrs = new Map([['aria-controls',id]]), events = new Map();
  return {getAttribute:k=>attrs.get(k),setAttribute:(k,v)=>attrs.set(k,v),addEventListener:(k,v)=>events.set(k,v),click:()=>events.get('click')()};
});
const hide = bindPasswordVisibility({querySelectorAll:()=>buttons,querySelector:s=>inputs.get(s),addEventListener:(k,v)=>listeners.set(k,v)});
for(const [i,button] of buttons.entries()) {
  button.click();
  assert.equal([...inputs.values()][i].type,'text');
  assert.equal(button.textContent,'Hide password');
  assert.equal(button.getAttribute('aria-pressed'),'true');
  button.click();
  assert.equal([...inputs.values()][i].type,'password');
  assert.equal(button.textContent,'Show password');
}
for(const reset of [hide,listeners.get('submit'),listeners.get('reset')]) {
  buttons.forEach(b=>b.click()); reset();
  for(const input of inputs.values()){assert.equal(input.type,'password');assert.equal(input.value,'test-only-value');}
}
console.log('PASS auth feedback: rate/setup distinction, safe fallback, independent show/hide, reset/submit/privacy masking.');
