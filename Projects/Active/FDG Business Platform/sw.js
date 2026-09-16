const CACHE = "fdg-business-platform-v9";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./src/app.js",
  "./src/views.js",
  "./src/store.js",
  "./src/icons.js",
  "./data/catalog.js",
  "./fuel-station/data/nj-gas-station.js",
  "./assets/icon.svg",
  "./assets/fdg-business-ecosystem-hero-v1.png",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("fdg-business-platform-") && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy)));
    }
    return response;
  }).catch(() => caches.open(CACHE).then(async (cache) => (await cache.match(event.request)) || (event.request.mode === "navigate" ? cache.match("./index.html") : Response.error()))));
});
