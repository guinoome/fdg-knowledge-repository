/* ============================================================================
   Sign in — Stage 1a
   Only reachable when Supabase is configured. Without credentials the app is
   local-only and this screen explains that rather than offering a dead form.
   ============================================================================ */

import * as sync from "../sync/index.js";
import { esc, toast } from "../ui.js";
import { navigate } from "../router.js";

export async function signInScreen(_params, view) {
  if (!sync.isEnabled()) {
    view.innerHTML = `
      <div class="signin">
        <h2>Sync is not configured</h2>
        <p class="sub">This device is running local-only. Records are stored here and never leave.</p>
        <p class="sub sm">To enable multi-device sync, set <code>supabase.url</code> and
           <code>supabase.anonKey</code> in <code>src/config.js</code> and apply
           <code>supabase/schema.sql</code>. See the project README.</p>
        <p><a class="btn" href="#/">Back to dashboard</a></p>
      </div>`;
    return;
  }

  if (sync.isSignedIn()) {
    view.innerHTML = `
      <div class="signin">
        <h2>Signed in</h2>
        <p class="sub">${esc(sync.client.userEmail || "")}</p>
        <div class="signin-actions">
          <button type="button" class="btn" id="sync-now">Sync now</button>
          <button type="button" class="btn" id="sign-out">Sign out</button>
        </div>
        <p class="err" id="msg" role="status" aria-live="polite"></p>
      </div>`;

    view.querySelector("#sync-now").addEventListener("click", async () => {
      const stats = await sync.syncNow();
      toast(stats
        ? `Synced — ${stats.pulled} in, ${stats.pushed} out${stats.conflicts ? `, ${stats.conflicts} conflict(s)` : ""}`
        : "Sync unavailable", stats?.conflicts ? "warn" : "ok");
    });

    view.querySelector("#sign-out").addEventListener("click", async () => {
      await sync.signOut();
      toast("Signed out — this device is now local-only");
      navigate("/");
    });
    return;
  }

  view.innerHTML = `
    <div class="signin">
      <h2>Sign in</h2>
      <p class="sub">Signing in syncs this device with your properties. Records stay usable offline either way.</p>
      <form id="signin-form" class="signin-form">
        <label class="field"><span class="lbl">Email</span>
          <input type="email" name="email" autocomplete="username" required></label>
        <label class="field"><span class="lbl">Password</span>
          <input type="password" name="password" autocomplete="current-password" required></label>
        <div class="signin-actions">
          <button type="submit" class="btn btn-primary" id="submit">Sign in</button>
        </div>
      </form>
      <p class="err" id="msg" role="alert" aria-live="assertive"></p>
    </div>`;

  const form = view.querySelector("#signin-form");
  const msg = view.querySelector("#msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    const btn = view.querySelector("#submit");
    btn.disabled = true;
    btn.textContent = "Signing in…";

    try {
      const email = form.email.value.trim();
      const stats = await sync.signIn(email, form.password.value);
      toast(`Signed in — ${stats?.pulled ?? 0} record(s) pulled`);
      navigate("/");
    } catch (err) {
      msg.textContent = err.message || "Sign-in failed.";
      btn.disabled = false;
      btn.textContent = "Sign in";
    }
  });
}
