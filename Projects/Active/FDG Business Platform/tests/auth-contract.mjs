import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { authConfig } from '../account/config.js';
import './auth-feedback.mjs';
const read = path => readFileSync(new URL('../'+path,import.meta.url),'utf8');
assert.equal(new URL(authConfig.url).hostname,'nyrvzzuunnkdgsbbbjvo.supabase.co');
assert(authConfig.key.startsWith('sb_publishable_'));
assert.equal(authConfig.redirect,'https://fdgbusinessplatforms.vercel.app/account/');
const sql=read('supabase/migrations/202609270001_client_accounts.sql');
for(const token of ['force row level security',"interval '12 hours'",'email_confirmed_at is not null',"set search_path = ''",'user_id=(select auth.uid())','s.user_id = auth.uid()']) assert(sql.includes(token),token);
assert(read('supabase/migrations/202609270002_profile_timestamp_ownership.sql').includes('grant insert(user_id, display_name)'));
const headers=JSON.parse(read('vercel.json')).headers.find(x=>x.source==='/account/(.*)').headers;
assert.equal(headers.find(x=>x.key==='Cache-Control').value,'no-store');
assert(headers.find(x=>x.key==='Content-Security-Policy').value.includes("script-src 'self'"));
assert(read('sw.js').includes("url.pathname.startsWith('/account/')"));
// The official SDK contains the key-prefix name in its validation code, not a credential.
assert(!/sb_secret_[A-Za-z0-9_-]{20,}/.test(read('account/account.bundle.js')));
assert(read('account/account.bundle.js').length>10000,'Auth bundle must exist');
console.log('PASS: auth project, redirect, public-key-only configuration, RLS/session contract, private cache and CSP invariants.');
