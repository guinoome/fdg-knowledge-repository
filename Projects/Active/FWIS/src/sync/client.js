/* ============================================================================
   FWIS — Supabase client
   ----------------------------------------------------------------------------
   A thin fetch wrapper over Supabase Auth (GoTrue) and PostgREST, rather than
   the supabase-js dependency.

   Why: Stage 0 ships with no build step and no runtime dependencies, and the
   service worker precaches every asset for offline use. Pulling a bundled SDK
   from a CDN would break both. Stage 1a needs sign-in, token refresh, select
   and upsert — a few hundred lines against a documented HTTP API.

   Revisit if realtime subscriptions are needed: websockets are where hand
   rolling stops paying for itself.
   ============================================================================ */

const SESSION_KEY = "fwis-session";

export class SupabaseError extends Error {
  constructor(message, { status = 0, code = "", details = "" } = {}) {
    super(message);
    this.name = "SupabaseError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
  /** Optimistic-concurrency rejection raised by the guard_revision trigger. */
  get isStaleRevision() { return this.code === "40001"; }
  /** Immutability rejection raised by guard_accepted_immutable. */
  get isImmutable() { return this.code === "42501"; }
}

export class SupabaseClient {
  constructor({ url, anonKey }) {
    this.url = (url || "").replace(/\/+$/, "");
    this.anonKey = anonKey || "";
    this.session = readSession();
  }

  get configured() { return Boolean(this.url && this.anonKey); }
  get signedIn() { return Boolean(this.session?.access_token); }
  get userId() { return this.session?.user?.id || null; }
  get userEmail() { return this.session?.user?.email || null; }

  /* ------------------------------------------------------------------ auth */

  async signIn(email, password) {
    const res = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: this.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new SupabaseError(body.error_description || body.msg || "Sign-in failed", { status: res.status });
    }
    this.#setSession(body);
    return this.session;
  }

  async signUp(email, password) {
    const res = await fetch(`${this.url}/auth/v1/signup`, {
      method: "POST",
      headers: { apikey: this.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new SupabaseError(body.error_description || body.msg || "Sign-up failed", { status: res.status });
    }
    // With email confirmation enabled Supabase returns a user but no session.
    if (body.access_token) this.#setSession(body);
    return body;
  }

  signOut() {
    this.session = null;
    localStorage.removeItem(SESSION_KEY);
  }

  /** Refreshes shortly before expiry so a long offline spell does not strand
   *  the session mid-sync. */
  async ensureFreshSession() {
    if (!this.session?.refresh_token) return false;
    const expiresAt = (this.session.expires_at || 0) * 1000;
    if (Date.now() < expiresAt - 60_000) return true;

    const res = await fetch(`${this.url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: this.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: this.session.refresh_token })
    });
    if (!res.ok) { this.signOut(); return false; }
    this.#setSession(await res.json());
    return true;
  }

  #setSession(body) {
    this.session = {
      ...body,
      expires_at: body.expires_at || Math.floor(Date.now() / 1000) + (body.expires_in || 3600)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(this.session));
  }

  /* ------------------------------------------------------------------ rest */

  async #rest(path, { method = "GET", body, headers = {} } = {}) {
    await this.ensureFreshSession();
    const res = await fetch(`${this.url}/rest/v1/${path}`, {
      method,
      headers: {
        apikey: this.anonKey,
        Authorization: `Bearer ${this.session?.access_token || this.anonKey}`,
        "Content-Type": "application/json",
        ...headers
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new SupabaseError(err.message || `Request failed (${res.status})`, {
        status: res.status, code: err.code || "", details: err.details || ""
      });
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  }

  /** Records changed since `cursor`, oldest first, paged. */
  async pull(cursor = 0, limit = 200) {
    const q = new URLSearchParams({
      select: "*",
      server_seq: `gt.${cursor}`,
      order: "server_seq.asc",
      limit: String(limit)
    });
    return (await this.#rest(`records?${q}`)) || [];
  }

  /** Inserts or updates one record. Returns the stored row. */
  async push(row) {
    const out = await this.#rest("records?on_conflict=id", {
      method: "POST",
      body: [row],
      headers: { Prefer: "resolution=merge-duplicates,return=representation" }
    });
    return Array.isArray(out) ? out[0] : out;
  }

  /** Development helper — grants demo property membership to the new user. */
  async joinDemoProperties() {
    return this.#rest("rpc/dev_join_demo_properties", { method: "POST", body: {} });
  }
}

function readSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
  catch { return null; }
}
