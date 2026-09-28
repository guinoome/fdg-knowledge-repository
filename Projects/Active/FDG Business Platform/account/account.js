import { createClient } from '@supabase/supabase-js';
import { authConfig } from './config.js';
import { createBilling } from './billing.js';
import { authErrorMessage, bindPasswordVisibility } from './auth-feedback.js';

const $ = id => document.getElementById(id);
const hidePasswords = bindPasswordVisibility(document);
// PKCE verifier must survive an email opening in another tab; session tokens must not.
const authStorage = {
  getItem: key => (key.endsWith('-code-verifier') ? localStorage : sessionStorage).getItem(key),
  setItem: (key,value) => (key.endsWith('-code-verifier') ? localStorage : sessionStorage).setItem(key,value),
  removeItem: key => (key.endsWith('-code-verifier') ? localStorage : sessionStorage).removeItem(key)
};
const client = createClient(authConfig.url, authConfig.key, { auth: { storage: authStorage, storageKey: authConfig.storageKey, flowType: 'pkce', autoRefreshToken: true, detectSessionInUrl: true } });
const billing = createBilling(client, $('billing'));
const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel('fdg-account-events') : null;
const accountParams = new URLSearchParams(location.search);
let user = null, recovering = false, signingUp = accountParams.get('mode') === 'signup', generation = 0, checkTimer, profileDirty = false;
$('profile-form').addEventListener('input', () => { profileDirty = true; });
const message = text => { $('status').textContent = text; };
function hidePrivate() {
  hidePasswords();
  billing.clear();
  generation++; user = null; profileDirty = false;
  $('identity').textContent = ''; $('profile-form').reset();
  $('signed-in').hidden = true; $('password-form').hidden = true;
}
function showLogin() {
  hidePrivate(); recovering = false; $('signed-out').hidden = false;
  $('login-form').hidden = false; $('recovery-form').hidden = true;
}
async function logout(broadcast = true) {
  showLogin(); $('login-form').reset();
  const { error } = await client.auth.signOut({ scope: 'global' });
  // Never retain local private content if network revocation fails.
  await client.auth.signOut({ scope: 'local' });
  sessionStorage.removeItem(authConfig.storageKey);
  localStorage.removeItem(`${authConfig.storageKey}-code-verifier`);
  if (broadcast) channel?.postMessage('signed-out');
  message(error ? 'Signed out on this device. Server revocation could not be confirmed; reconnect to revoke other sessions.' : 'Signed out.');
}
async function verify() {
  const run = ++generation;
  if (!navigator.onLine) { hidePrivate(); message('Offline. Reconnect to verify your account.'); return; }
  const { data: { user: verified }, error } = await client.auth.getUser();
  if (run !== generation) return;
  if (error || !verified) { showLogin(); message('Sign in to your FDG account.'); return; }
  const active = await client.rpc('fdg_session_is_active');
  if (run !== generation) return;
  if (active.error || !active.data) { hidePrivate(); showLogin(); message('Session expired or unavailable. Sign in again.'); return; }
  user = verified; $('signed-out').hidden = true;
  if (recovering) { billing.clear(); $('password-form').hidden = false; $('signed-in').hidden = true; message('Recovery verified. Choose a new password.'); return; }
  const { data, error: profileError } = await client.from('fdg_client_profiles').select('display_name').eq('user_id', user.id).maybeSingle();
  if (run !== generation) return;
  if (profileError) { showLogin(); message('Could not verify your profile. Please reconnect and sign in again.'); return; }
  $('password-form').hidden = true; $('signed-in').hidden = false;
  $('identity').textContent = verified.email;
  if (!profileDirty) $('profile-form').elements.display_name.value = data?.display_name || '';
  billing.show(verified.id);
  message('Account verified. Your profile and test billing are private. Operational workspaces remain demonstrations.');
}
function bind(formId, action) {
  $(formId).addEventListener('submit', async event => {
    event.preventDefault(); const form = event.currentTarget;
    const button = form.querySelector('[type=submit]'); button.disabled = true;
    try { await action(form); } catch { message('The request could not be completed. Check your connection and try again.'); }
    finally { button.disabled = false; }
  });
}
bind('login-form', async form => {
  const email = form.elements.email.value.trim(), password = form.elements.password.value;
  if (signingUp && password.length < 12) return message('Use at least 12 characters for a new password.');
  const result = signingUp
    ? await client.auth.signUp({ email, password, options: { emailRedirectTo: authConfig.redirect } })
    : await client.auth.signInWithPassword({ email, password });
  form.elements.password.value = '';
  if (result.error) return message(signingUp ? authErrorMessage(result.error) : 'Sign-in failed. Check your email, password and email confirmation, or try again later.');
  if (signingUp) return message('If this address is eligible, check your email to confirm your account.');
  recovering = false; await verify();
});
bind('profile-form', async form => {
  if (!user) return;
  const id = user.id;
  const row = { user_id: id, display_name: form.elements.display_name.value.trim() };
  // Use insert/update separately: column grants deliberately prevent changing user_id.
  const existing = await client.from('fdg_client_profiles').select('user_id').eq('user_id', id).maybeSingle();
  if (existing.error) return message('Profile could not be saved. Verify your session and try again.');
  const result = existing.data ? await client.from('fdg_client_profiles').update({ display_name: row.display_name }).eq('user_id',id).select('user_id') : await client.from('fdg_client_profiles').insert(row).select('user_id');
  if (user?.id !== id) return;
  if (!result.error && result.data?.length) profileDirty = false;
  message(result.error || !result.data?.length ? 'Not saved. Your session may have expired; sign in again.' : 'Profile saved securely.');
});
bind('recovery-form', async form => {
  const { error } = await client.auth.resetPasswordForEmail(form.elements.email.value.trim(), { redirectTo: authConfig.redirect });
  message(error ? authErrorMessage(error, 'recovery') : 'If the account is eligible, a recovery email will arrive. Open it in this same browser profile.');
});
bind('password-form', async form => {
  if (!recovering || !user) return message('Open a valid recovery link first.');
  if (form.elements.password.value !== form.elements.confirm.value) return message('Passwords do not match.');
  const { error } = await client.auth.updateUser({ password: form.elements.password.value });
  if (error) return message('Password could not be updated. Request a fresh recovery link or choose a stronger password.');
  form.reset(); await logout(); message('Password updated. Sign in with your new password.');
});
$('recover').onclick = () => { hidePasswords(); $('login-form').hidden = true; $('recovery-form').hidden = false; $('recovery-form').elements.email.focus(); };
$('back-login').onclick = () => { $('login-form').hidden = false; $('recovery-form').hidden = true; };
function syncAccountMode() {
  hidePasswords();
  $('form-title').textContent = signingUp ? (accountParams.get('intent') === 'trial' ? 'Start your free trial' : 'Create your account') : 'Welcome back';
  $('form-helper').textContent = signingUp ? 'Create your private FDG account. Each operating module and branch keeps its own access and subscription scope.' : 'Sign in to your private client profile. Operational modules remain separate demonstrations.';
  $('login-form').querySelector('[type=submit]').textContent = signingUp ? 'Create account' : 'Sign in';
  $('login-form').elements.password.autocomplete = signingUp ? 'new-password' : 'current-password';
  $('login-form').elements.password.minLength = signingUp ? 12 : 1;
  $('password-help').hidden = !signingUp;
  $('signup').textContent = signingUp ? 'Already have an account?' : 'Create account';
}
$('signup').onclick = () => {
  signingUp = !signingUp;
  syncAccountMode();
};
$('logout').onclick = () => logout(); $('cancel-recovery').onclick = () => logout();
channel && (channel.onmessage = async event => {
  if (event.data !== 'signed-out') return;
  showLogin(); await client.auth.signOut({scope:'local'}); message('Signed out in another tab.');
});
client.auth.onAuthStateChange(event => {
  if (event === 'PASSWORD_RECOVERY') recovering = true;
  if (event === 'SIGNED_OUT') { showLogin(); return; }
  // Run outside the SDK callback to avoid the auth-lock deadlock.
  clearTimeout(checkTimer); checkTimer = setTimeout(verify, 0);
});
window.addEventListener('offline', () => { hidePrivate(); message('Offline. Private profile hidden until online verification.'); });
window.addEventListener('online', verify);
window.addEventListener('pagehide', hidePrivate);
window.addEventListener('pageshow', verify);
document.addEventListener('visibilitychange', () => { if (document.hidden) hidePrivate(); else verify(); });
setInterval(() => { if (!document.hidden) verify(); }, 60000);
syncAccountMode();
verify();
