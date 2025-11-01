self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => clients.claim());

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  // Non interferire con Laravel o CDN
  if (
    url.includes("albo-fornitori.duckdns.org") ||
    url.startsWith("https://unpkg.com/") ||
    url.startsWith("https://cdn.tailwindcss.com")
  ) {
    return;
  }
  // Cache-first per file statici
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
