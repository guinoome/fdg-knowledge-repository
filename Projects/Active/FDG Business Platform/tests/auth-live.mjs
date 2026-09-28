// Explicit opt-in integration test. Only provision disposable users in the isolated FDG project.
// FDG_AUTH_FIXTURES points to a private JSON file: [{id,email,password}, ...]. Never commit it.
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { authConfig } from '../account/config.js';
if (!process.env.FDG_AUTH_FIXTURES) throw Error('Disposable fixture file required. Never use client credentials.');
const fixtures = JSON.parse(readFileSync(process.env.FDG_AUTH_FIXTURES, 'utf8'));
assert.equal(fixtures.length, 2);
assert(fixtures.every(x => x.email.startsWith('fdg-qa-') && x.email.endsWith('@example.invalid')));
const make = () => createClient(authConfig.url, authConfig.key, { auth: { persistSession: false, autoRefreshToken: false } });
const a = make(), b = make(), anon = make();
const ok = (result, label) => assert.equal(result.error, null, `${label}: ${result.error?.message}`);
for (const [i, client] of [a,b].entries()) {
  ok(await client.auth.signInWithPassword(fixtures[i]), 'Real password sign-in');
  ok(await client.from('fdg_client_profiles').upsert({user_id:fixtures[i].id,display_name:`QA ${i}`}, {ignoreDuplicates:true}), 'Own profile insert');
  ok(await client.from('fdg_client_profiles').update({display_name:`QA ${i}`}).eq('user_id',fixtures[i].id),'Reset own QA profile');
}
assert((await make().auth.signInWithPassword({...fixtures[0],password:'incorrect-test-password'})).error);
assert((await a.auth.updateUser({password:'weak123'})).error, 'Server must reject a password shorter than 12 characters');
assert((await anon.from('fdg_client_profiles').select('*')).error, 'Anonymous must be denied');
const own = await a.from('fdg_client_profiles').select('*'); ok(own,'Own select');
assert.deepEqual(own.data.map(x=>x.user_id),[fixtures[0].id]);
assert.deepEqual((await a.from('fdg_client_profiles').select('*').eq('user_id', fixtures[1].id)).data,[]);
assert.deepEqual((await a.from('fdg_client_profiles').update({display_name:'attack'}).eq('user_id',fixtures[1].id).select()).data,[]);
assert((await a.from('fdg_client_profiles').insert({user_id:fixtures[1].id,display_name:'attack'})).error);
assert((await a.from('fdg_client_profiles').update({user_id:fixtures[1].id}).eq('user_id',fixtures[0].id)).error);
assert((await a.from('fdg_client_profiles').delete().eq('user_id',fixtures[0].id)).error);
assert((await a.from('fdg_client_profiles').update({created_at:'2000-01-01'}).eq('user_id',fixtures[0].id)).error);
assert((await a.from('fdg_client_profiles').update({display_name:'x'.repeat(121)}).eq('user_id',fixtures[0].id)).error);
ok(await a.from('fdg_client_profiles').update({display_name:'QA updated'}).eq('user_id',fixtures[0].id), 'Own update');
assert.equal((await b.from('fdg_client_profiles').select('display_name').single()).data.display_name,'QA 1');
ok(await a.auth.refreshSession(), 'Refresh');
const oldSession = (await a.auth.getSession()).data.session;
ok(await a.auth.signOut({scope:'global'}), 'Global logout');
const headers = {apikey:authConfig.key,Authorization:`Bearer ${oldSession.access_token}`};
const revoked = await fetch(`${authConfig.url}/rest/v1/rpc/fdg_session_is_active`,{method:'POST',headers});
assert.equal(await revoked.json(), false, 'Revoked access token must fail server session gate');
const leaked = await fetch(`${authConfig.url}/rest/v1/fdg_client_profiles?select=*`,{headers});
assert.deepEqual(await leaked.json(),[]);
assert((await make().auth.refreshSession({refresh_token:oldSession.refresh_token})).error, 'Revoked refresh token must fail');
// Leave one QA-only session for the controlled server-expiry phase.
const sessionB = (await b.auth.getSession()).data.session;
writeFileSync(process.env.FDG_AUTH_FIXTURES + '.session', JSON.stringify(sessionB));
console.log('PASS: real login, invalid password, own profile CRUD limits, anonymous denial, cross-account isolation, refresh, logout revocation.');
await a.removeAllChannels(); await b.removeAllChannels();
process.exit(0);
