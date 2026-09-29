// Deterministic SDK regression: all identities, tokens, storage and HTTP responses
// are synthetic. No requests leave this process and no mailbox is contacted.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createClient } from '@supabase/supabase-js';
import { authConfig, emailRedirectForOrigin } from '../account/config.js';

const preview = 'https://fdgbusinessplatforms-paymongo-test.vercel.app';
const production = new URL(authConfig.redirect).origin;
const email = 'fdg-origin-regression@example.invalid';
const userId = '11111111-1111-4111-8111-111111111111';
const accountSource = readFileSync(new URL('../account/account.js', import.meta.url), 'utf8');
const recoveryStart = accountSource.indexOf("bind('recovery-form',");
const recoveryEnd = accountSource.indexOf("bind('password-form',", recoveryStart);
assert(recoveryStart >= 0 && recoveryEnd > recoveryStart, 'The real recovery handler must be tested');
const recoverySource = accountSource.slice(recoveryStart, recoveryEnd);

function harness() {
  const origins = new Map(), requests = [];
  let challenge;
  function tab(origin) {
    if (!origins.has(origin)) origins.set(origin, new Map());
    const local = origins.get(origin), session = new Map();
    const store = key => key.endsWith('-code-verifier') ? local : session;
    const client = createClient('https://fdg-auth.example.invalid', 'synthetic-public-key', {
      auth: {
        storageKey: authConfig.storageKey, flowType: 'pkce',
        persistSession: true, autoRefreshToken: false, detectSessionInUrl: false,
        storage: {
          getItem: key => store(key).get(key) ?? null,
          setItem: (key, value) => store(key).set(key, value),
          removeItem: key => store(key).delete(key)
        }
      },
      global: { fetch: async (input, options) => {
        const url = new URL(input), body = JSON.parse(options.body);
        assert.equal(url.origin, 'https://fdg-auth.example.invalid');
        assert.equal(options.method, 'POST');
        requests.push({ origin, path: url.pathname, redirect: url.searchParams.get('redirect_to') });
        if (url.pathname === '/auth/v1/recover') {
          assert.equal(body.email, email);
          assert.equal(body.code_challenge_method, 's256');
          challenge = body.code_challenge;
          return Response.json({});
        }
        assert.equal(url.pathname, '/auth/v1/token', 'Unexpected SDK HTTP operation');
        assert.equal(url.searchParams.get('grant_type'), 'pkce');
        assert.equal(body.auth_code, 'synthetic-recovery-code');
        assert.equal(createHash('sha256').update(body.code_verifier).digest('base64url'), challenge);
        return Response.json({
          access_token: 'synthetic-access-token', refresh_token: 'synthetic-refresh-token',
          expires_in: 3600, expires_at: 4102444800, token_type: 'bearer',
          user: { id: userId, email, aud: 'authenticated', role: 'authenticated',
            app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
        });
      } }
    });
    return { client, local, session };
  }
  return { tab, requests };
}

async function submitRecovery(origin, client) {
  let action, feedback;
  runInNewContext(recoverySource, {
    bind: (id, handler) => { assert.equal(id, 'recovery-form'); action = handler; },
    client, emailRedirect: emailRedirectForOrigin(origin),
    unsupportedEmailOrigin: 'Use the canonical FDG account page.',
    message: value => { feedback = value; },
    authErrorMessage: () => { throw new Error('Unexpected synthetic recovery failure'); }
  });
  await action({ elements: { email: { value: email } } });
  return feedback;
}

// Preserve the failure reproduction: a production callback cannot use a
// verifier created on the test alias, even in the same browser profile.
{
  const { tab, requests } = harness();
  const start = tab(preview);
  assert.equal((await start.client.auth.resetPasswordForEmail(email, { redirectTo: authConfig.redirect })).error, null);
  assert(start.local.has(`${authConfig.storageKey}-code-verifier`));
  const callback = tab(production);
  const result = await callback.client.auth.exchangeCodeForSession('synthetic-recovery-code');
  assert.equal(result.error?.code, 'pkce_code_verifier_not_found');
  assert.equal(requests.length, 1, 'Missing verifier must fail before token exchange');
}

// Both approved origins now return to their own storage scope. A new tab shares
// the verifier, but session tokens remain in that tab's session storage only.
for (const origin of [preview, production]) {
  const { tab, requests } = harness();
  const start = tab(origin);
  assert.match(await submitRecovery(origin, start.client), /recovery email/);
  assert(start.local.has(`${authConfig.storageKey}-code-verifier`));
  assert.equal(requests[0].redirect, origin + '/account/');
  const callback = tab(new URL(requests[0].redirect).origin);
  const events = [];
  const { data: listener } = callback.client.auth.onAuthStateChange(event => events.push(event));
  const result = await callback.client.auth.exchangeCodeForSession('synthetic-recovery-code');
  assert.equal(result.error, null);
  assert.equal(result.data.user.id, userId);
  assert(events.includes('PASSWORD_RECOVERY'));
  assert.equal(requests.length, 2);
  assert.equal(requests[1].path, '/auth/v1/token');
  assert(!callback.local.has(`${authConfig.storageKey}-code-verifier`), 'Consumed verifier must be removed');
  assert(!callback.local.has(authConfig.storageKey), 'Session tokens must not enter shared local storage');
  assert(callback.session.has(authConfig.storageKey));
  assert(!start.session.has(authConfig.storageKey), 'The requesting tab must not inherit the callback session');
  listener.subscription.unsubscribe();
}

// Exercise the application's actual recovery handler, not just the chooser:
// unsupported origins must stop before generating a verifier or requesting mail.
for (const origin of ['https://fdgbusinessplatforms-unapproved.vercel.app', 'http://localhost:8137']) {
  const { tab, requests } = harness();
  const start = tab(origin);
  assert.equal(await submitRecovery(origin, start.client), 'Use the canonical FDG account page.');
  assert.equal(requests.length, 0);
  assert.equal(start.local.size, 0);
  assert.equal(start.session.size, 0);
}

console.log('PASS auth email origins: cross-origin failure reproduced, same-origin SDK recovery exchange, private session storage, unsupported-origin no-send guard.');
