/*
  Service Worker — Sonora (Terapia Sonora)
  Estrategia:
   - index.html / navegación: network-first (siempre la última versión; cae a caché offline).
   - assets estáticos same-origin (CSS/JS/fonts/imágenes): cache-first.
   - audios .flac: cache-first en runtime (NO se precachean para no bajar ~40 MB en la
     primera visita; se cachean a medida que el lazy-load los pide).
   - cross-origin (cdnjs, Google Fonts, Cloudflare): no se intercepta (va a red normal).
*/
var VERSION = "sonora-v1";
var SHELL_CACHE = VERSION + "-shell";
var RUNTIME_CACHE = VERSION + "-runtime";

/* App shell: liviano, sin audios. */
var SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./static/css/bootstrap.min.css",
  "./static/css/fontawesome-all.css",
  "./static/css/magnific-popup.css",
  "./static/css/styles.css",
  "./static/css/morphext.css",
  "./static/css/mixer_basic.css",
  "./static/css/mixer_components.css",
  "./static/js/jquery.min.js",
  "./static/js/bootstrap.min.js",
  "./static/js/jquery.easing.min.js",
  "./static/js/morphext.min.js",
  "./static/js/jquery.magnific-popup.js",
  "./static/js/scripts.js",
  "./static/js/mixer_audioMain.js",
  "./static/js/mixer_components.js",
  "./static/webfonts/fa-solid-900.woff2",
  "./static/webfonts/fa-regular-400.woff2",
  "./static/webfonts/fa-brands-400.woff2",
  "./static/media/images/logo.png",
  "./static/media/images/favicon.ico"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      /* addAll falla si un recurso falla; usamos add individual tolerante. */
      return Promise.all(
        SHELL_ASSETS.map(function (url) {
          return cache.add(url).catch(function () { /* ignora faltantes */ });
        })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k.indexOf(VERSION) !== 0; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  /* Solo manejamos same-origin; cross-origin (cdnjs/fonts/cloudflare) va a red normal. */
  if (url.origin !== self.location.origin) return;

  var isNavigation = req.mode === "navigate" ||
    url.pathname === "/" || url.pathname.endsWith("/index.html");

  if (isNavigation) {
    /* network-first */
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(SHELL_CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) {
          return r || caches.match("./index.html");
        });
      })
    );
    return;
  }

  /* cache-first para assets y audios (.flac incluidos) */
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(RUNTIME_CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
