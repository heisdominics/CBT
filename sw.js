/* Offline support: caches every file of the site on first visit.
   When you change any file or question, raise VERSION so students get the update. */
var VERSION = "utme-cbt-v1";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "css/styles.css",
  "js/core.js",
  "js/bank-english.js",
  "js/bank-maths.js",
  "js/bank-physics.js",
  "js/bank-chemistry.js",
  "js/bank-biology.js",
  "js/bank-literature.js",
  "js/bank-government.js",
  "js/bank-crs.js",
  "js/bank-more.js",
  "js/app.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).catch(function () { return caches.match("index.html"); });
    })
  );
});
