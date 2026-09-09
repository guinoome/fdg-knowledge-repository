const CACHE = "fdg-fuel-station-v2";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./premium.css",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./src/app.js",
  "./src/views.js",
  "./src/store.js",
  "./src/format.js",
  "./src/icons.js",
  "./data/nj-gas-station.js",
  "./data/experience-config.js",
  "./design/reference/fpis-fuel-operations-sample.png",
  "./design/reference/fdg_micro_station_operations_showcase.png",
  "./design/reference/before_and_after_smarter_station_marketing.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached ?? fetch(event.request).then((response) => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => event.request.mode === "navigate" ? caches.match("./index.html") : Response.error())));
});
