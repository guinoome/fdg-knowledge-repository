// Run after aging ONLY the disposable fixture's auth.sessions.created_at by 13 hours.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { authConfig } from '../account/config.js';
if (!process.env.FDG_AUTH_FIXTURES) throw Error('Disposable fixture path required');
const session = JSON.parse(readFileSync(process.env.FDG_AUTH_FIXTURES + '.session','utf8'));
const headers = {apikey:authConfig.key,Authorization:`Bearer ${session.access_token}`};
const active = await fetch(`${authConfig.url}/rest/v1/rpc/fdg_session_is_active`,{method:'POST',headers});
assert.equal(await active.json(),false);
const profile = await fetch(`${authConfig.url}/rest/v1/fdg_client_profiles?select=*`,{headers});
assert.deepEqual(await profile.json(),[]);
const write = await fetch(`${authConfig.url}/rest/v1/fdg_client_profiles?user_id=eq.${session.user.id}`,{method:'PATCH',headers:{...headers,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify({display_name:'expired mutation'})});
assert.deepEqual(await write.json(),[]);
console.log('PASS: server-enforced 12-hour expiry denies private reads and writes with an otherwise valid JWT.');
