# Métricas finales — Modernización técnica

> 2026-06-26. Rama `feature/modernizacion-tecnica` (worktree `worktree-modernizacion-tecnica`).

## Peso del sitio desplegable

| Métrica | Antes | Después | Cambio |
|---|---|---|---|
| `static/` total | 68 MB | 26 MB | **−62%** |
| Audio (`static/media/audio`) | 63,3 MB (16 WAV) | ~25 MB (16 FLAC mono) | −61% (mono diótico, ver audio.md) |
| Webfonts | 2,7 MB (5 formatos) | 172 KB (solo woff2) | **−94%** |
| Imágenes | 1,0 MB | 356 KB | −65% (huérfanas + recompresión) |
| CSS | ~390 KB (bootstrap sin minificar) | 304 KB | minificado |

## Carga inicial de la página (lo que ve el usuario)

| Métrica | Antes | Después |
|---|---|---|
| Audio descargado en el load inicial | ~64 MB (todos los WAV al construir el mixer) | **0 bytes** (lazy load) |
| Payload inicial (sin audio) | — | **~276 KB** / 41 recursos |
| `.flac` pedidos al cargar (scroll arriba) | n/a | **0** (se cargan al acercarse al mixer) |

El audio (~40 MB) ahora se descarga recién cuando el usuario se acerca a la sección
"Demostración" (IntersectionObserver, rootMargin 400px) o toca Play. Quien nunca usa el
mixer no descarga audio.

> Nota: no hay Lighthouse CLI en el entorno. La métrica de payload inicial sale de
> `performance.getEntriesByType('resource')` en `/browse`. En localhost `transferSize`
> reporta 0, por eso se usa `encodedBodySize`.

## QA integral (gate final) — todo verde

- **Render**: idéntico al baseline en desktop (1280) y mobile (375). Único diff de píxeles:
  el texto rotativo del hero (morphext), que cambia entre capturas. Resto bit-visual igual.
- **Consola**: sin errores nuevos. Solo los 2 esperados de localhost (AudioContext autoplay
  y CORS del beacon de Cloudflare), presentes también en el baseline.
- **Mixer**: play/pause arranca/para las 7 capas; cambio de banda narrowband (250…12k,
  incluido 8k) sin errores; faders convierten dB→ganancia correctamente (−20 dB → 0.1000);
  tonegen (oscilador) responde al control de frecuencia.
- **Popups** (magnific-popup): abren y cierran OK.
- **Texto rotativo** (morphext) y **scroll** suave: OK.
- **Libs**: jQuery 3.7.1, Tone r13 (con SRI), GSAP 3.12.5 (con SRI).
- **PWA**: Service Worker registrado, activo y controlando; shell precacheado; `.flac`
  cacheados en runtime; segunda carga servible desde caché.
- **Audio**: 16 FLAC mono (L=R idéntico por construcción, criterio clínico). Corregido el
  bug de `narrowband8k` (canal izquierdo venía 14 dB más bajo → se reconstruyó desde el
  canal derecho, el correcto). Serie narrowband uniforme en ~−12 dB. Ver `audit/audio.md`.

## Pendiente de decisión humana (no bloquea la entrega)

- **Rain y Water**: confirmado en **mono** (decisión clínica). Todos los audios quedan L=R.
- **Loops** de ruidos estacionarios (Water/heavyRain/Rain): gran ahorro extra, requiere
  validación clínica de que el loop no introduce artefactos.

## Entrega

Commits atómicos por fase en `feature/modernizacion-tecnica`. **No se pushea ni se abre PR
sin confirmación humana.** Flujo previsto: `feature/...` → `develop` → PR a `master`
(producción / GitHub Pages).
