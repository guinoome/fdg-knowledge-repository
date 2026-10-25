/**
 * FDG-owned, optional, read-only business-operations provider port.
 * NO Ever Gauzy code, SDK, graphics, schema or dependency imported.
 * NOT wired into the active FDG app; strictly a synthetic evaluation.
 */
function nonempty(s, field) {
  if (typeof s !== 'string' || !s.trim() || s.length > 256) {
    throw new TypeError(field + ' is required');
  }
  return s;
}
function scoped(context) {
  if (!context || typeof context !== 'object') throw new TypeError('scope required');
  return {
    fdgTenantId: nonempty(context.fdgTenantId, 'fdgTenantId'),
    providerOrganizationId: nonempty(context.providerOrganizationId, 'providerOrganizationId'),
  };
}
function paging(options = {}) {
  const {offset = 0, limit = 20} = options;
  if (!Number.isInteger(offset) || offset < 0 ||
      !Number.isInteger(limit) || limit < 1 || limit > 100) {
    throw new RangeError('invalid pagination');
  }
  return {offset, limit};
}
function normalize(raw, context, source) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) ||
      raw.organizationId !== context.providerOrganizationId) {
    throw new Error('provider organization boundary mismatch');
  }
  if (typeof raw.id !== 'string' || !raw.id.trim() ||
      typeof raw.name !== 'string' || !raw.name.trim()) {
    throw new Error('invalid provider project');
  }
  return Object.freeze({
    source,
    fdgTenantId: context.fdgTenantId,
    providerOrganizationId: raw.organizationId,
    externalId: raw.id,
    name: raw.name,
    active: raw.isActive === true,
  });
}
function result(items, total, offset) {
  if (!Number.isSafeInteger(total) || total < offset + items.length || total < 0) {
    throw new Error('invalid pagination total');
  }
  return Object.freeze({
    readOnly: true,
    items: Object.freeze(items),
    total,
    nextOffset: offset + items.length < total ? offset + items.length : null,
  });
}
/**
 * Read-only Gauzy REST port: GET /api/organization-projects
 * requires independently verified FDG tenant -> Gauzy org mapping and
 * a dedicated minimal-permission token; these are NOT implemented here.
 */
export function createGauzyReadOnlyProvider({baseUrl, tokenProvider, transport = globalThis.fetch} = {}) {
  if (typeof tokenProvider !== 'function' || typeof transport !== 'function') {
    throw new TypeError('tokenProvider and transport functions required');
  }
  const base = new URL(baseUrl);
  if (base.protocol !== 'https:' || base.username || base.password ||
      base.search || base.hash || !base.hostname ||
      (base.pathname.endsWith('/') ? base.pathname.slice(0, -1) : base.pathname) !== '/api') {
    throw new Error('a clean HTTPS /api URL is required');
  }
  return Object.freeze({
    kind: 'gauzy-rest-readonly',
    async listProjects(context, options) {
      const scope = scoped(context);
      const {offset, limit} = paging(options);
      const token = await tokenProvider(scope);
      if (typeof token !== 'string' || !token || token.includes(String.fromCharCode(10)) || token.includes(String.fromCharCode(13))) {
        throw new Error('integration authorization unavailable');
      }
      const url = new URL(base.toString());
      url.pathname += '/organization-projects';
      url.searchParams.set('where[organizationId]', scope.providerOrganizationId);
      url.searchParams.set('skip', String(offset));
      url.searchParams.set('take', String(limit));
      const reply = await transport(url.toString(), {
        method: 'GET',
        headers: Object.freeze({Authorization: 'Bearer ' + token, Accept: 'application/json'}),
        redirect: 'error',
      });
      if (!reply || !Number.isInteger(reply.status)) throw new Error('invalid response');
      if ([401, 403].includes(reply.status)) throw new Error('provider authorization rejected');
      if (reply.status === 429) throw new Error('provider rate limited');
      if (reply.status !== 200) throw new Error('provider unavailable');
      const body = await reply.json();
      if (!body || !Array.isArray(body.items) || body.items.length > limit) {
        throw new Error('invalid provider response shape');
      }
      return result(body.items.map(p => normalize(p, scope, 'gauzy')), body.total, offset);
    },
  });
}
/** Offline deterministic alternative implementing the same provider contract. */
export function createLocalFixtureProvider(records) {
  if (!Array.isArray(records)) throw new TypeError('records must be an array');
  const snapshot = structuredClone(records);
  return Object.freeze({
    kind: 'fdg-local-fixture',
    async listProjects(context, options) {
      const scope = scoped(context);
      const {offset, limit} = paging(options);
      const matching = snapshot.filter(p =>
        p.fdgTenantId === scope.fdgTenantId &&
        p.organizationId === scope.providerOrganizationId);
      return result(matching.slice(offset, offset + limit)
        .map(p => normalize(p, scope, 'local-fixture')), matching.length, offset);
    },
  });
}
