/* ============================================================================
   FWIS — service worker
   ----------------------------------------------------------------------------
   Offline reliability is priority 4. Stage 0 has no backend, so every asset is
   local and can be precached outright.

   Strategy:
   - Navigations: network first, falling back to the cached shell. Keeps the app
     fresh when online and usable in a plant room with no signal.
   - Same-origin assets: cache first. They only change on deploy, and the cache
     name is versioned so a deploy invalidates them.
   - Cross-origin (fonts): stale-while-revalidate, never blocking a cold start.

   Records live in IndexedDB, not here — this only covers the application shell.
   ============================================================================ */

const VERSION = "fwis-stage1a-v1";
const SHELL = `${VERSION}-shell`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./src/main.js",
  "./src/config.js",
  "./src/db.js",
  "./src/router.js",
  "./src/ui.js",
  "./src/turnover.js",
  "./src/screens/dashboard.js",
  "./src/screens/turnover-list.js",
  "./src/screens/turnover-compose.js",
  "./src/screens/turnover-detail.js",
  "./src/screens/search.js",
  "./src/screens/sign-in.js",
  "./src/sync/index.js",
  "./src/sync/client.js",
  "./src/sync/engine.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL)
      // addAll is atomic: one bad URL would leave the app uncached, so failures
      // are logged per-asset instead of failing the whole install.
      .then((cache) => Promise.all(
        PRECACHE.map((url) => cache.add(url).catch((err) =>
          console.warn("[sw] precache skipped", url, err.message)))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("./index.html", { ignoreSearch: true }))
    );
    return;
  }

  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(request, copy));
        return res;
      }))
    );
    return;
  }

  // Cross-origin: serve cached immediately, refresh in the background.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(request, copy));
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
