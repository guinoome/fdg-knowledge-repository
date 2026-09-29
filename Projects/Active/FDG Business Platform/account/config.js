// Publishable browser key, not an administrator credential. RLS is mandatory.
export const authConfig = {
  url: 'https://nyrvzzuunnkdgsbbbjvo.supabase.co',
  key: 'sb_publishable_xMFLNdJwQh5OKMxQchRkvQ_G4P_QksN',
  storageKey: 'fdg-client-auth-v1',
  redirect: 'https://fdgbusinessplatforms.vercel.app/account/'
};

// PKCE verification must return to the same approved origin that requested mail.
// Do not derive callbacks from arbitrary preview hosts or a user-supplied return URL.
const emailOrigins = new Set([
  'https://fdgbusinessplatforms.vercel.app',
  'https://fdgbusinessplatforms-paymongo-test.vercel.app'
]);
export function emailRedirectForOrigin(origin) {
  return emailOrigins.has(origin) ? `${origin}/account/` : null;
}
