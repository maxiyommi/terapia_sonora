# Baseline de métricas — Terapia Sonora

> Capturado: 2026-06-26 (Fase 0 del PLAN_MODERNIZACION_TECNICA)
> Rama: `worktree-modernizacion-tecnica` (basada en `develop`)

## Herramientas verificadas

| Herramienta | Versión |
|---|---|
| ffmpeg | 4.4.2 |
| ffprobe | 4.4.2 |
| python3 | 3.10.12 |
| /browse (gstack) | OK |

## Pesos (du -sh)

| Path | Peso |
|---|---|
| `static` (total desplegable) | 68 MB |
| `static/media/audio` | 64 MB |
| `static/webfonts` | 2,7 MB |
| `static/media/images` | 1,0 MB |

### Audios individuales (bytes)

| Archivo | Bytes |
|---|---|
| heavyRain.wav | 11.560.878 |
| Water.wav | 24.787.854 |
| Rain.wav | 6.106.378 |
| narrowband*.wav (×10) | ~1.913.806 c/u |
| narrow.wav | 880.304 |
| pinkNoise.wav | 1.910.734 |
| whiteNoise.wav | 1.911.886 |

## Screenshots de referencia

- `audit/baseline-desktop.png` (1280×900) — render completo OK
- `audit/baseline-mobile.png` (375×812) — render completo OK

Renderiza correctamente: hero, secciones (¿Qué es Sonora?, Demostración con el mixer, Quiénes somos), íconos de FontAwesome visibles, sliders y botones de narrowband presentes.

## Estado de consola (baseline)

Errores presentes en localhost, **esperados** (no son regresión):
- `AudioContext was not allowed to start` — requiere gesto de usuario (autoplay policy).
- CORS de `cloudflareinsights.com/cdn-cgi/rum` — el beacon de Cloudflare solo funciona en el dominio real.

Cualquier error NUEVO respecto a estos dos será considerado regresión en los gates.
