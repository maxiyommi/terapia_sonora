# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

Landing page + web app **"Sonora"** (https://www.tuterapiasonora.com.ar/): una herramienta de terapia acústica para tratar acúfenos/tinnitus, hiperacusia e hipoacusias. El corazón del proyecto es un **mixer de audio** que combina capas de ruido (pink, white, narrowband, tonegen, lluvia, agua) para simular una terapia presencial.

## Stack y arquitectura

- **Sin build system.** HTML estático + CSS + JavaScript vanilla + jQuery. Todas las librerías están **vendoreadas a mano** en `static/` (no hay `npm`, `package.json`, ni bundler).
- **Página única:** `index.html` contiene la landing completa y la sección "Demostración" con el mixer. Es donde convergen casi todos los cambios.
- **Deploy:** GitHub Pages sirve directamente desde la rama **`master`**. El dominio se resuelve vía `CNAME` (DNS en Namecheap), HTTPS forzado. No hay paso de compilación: lo que está en `master` es lo que se publica.
- **Librerías externas (CDN) en `index.html`:** Tone.js 13.0.1 y GSAP (cdnjs), beacon de Cloudflare Web Analytics, Google Fonts (Jost). El resto (jQuery, Bootstrap 4.4.1, magnific-popup, morphext, FontAwesome) está local en `static/`.

### El mixer de audio (núcleo del proyecto)

Tres archivos JS, cargados **en este orden** al final de `index.html` (el orden importa: Tone.js global → main → components):

1. **`static/js/mixer_audioMain.js`** — crea el `AudioContext` global y hace `Tone.context = audioCtx`. Define `play()`/`pause()` que arrancan/paran **todas** las capas a la vez (`noisePink`, `noiseWhite`, `noiseNarrow`, `noiseTonegen`, `noiseRain`, `noiseHeavyRain`, `noiseWater`). Maneja el botón Play.
2. **`static/js/mixer_components.js`** — crea cada nodo de audio con Tone.js (`Tone.Player`, `Tone.Buffer`, `Tone.Gain`, `Tone.Oscillator`) y conecta cada slider HTML (`data-action="volume-*"`) a su `gainNode`. La ganancia se calcula como `Math.pow(10, value/20)` (escala dB). Las variables de las capas (`noisePink`, etc.) son **globales** y se consumen desde `mixer_audioMain.js`.
3. **`static/js/scripts.js`** — JS de la plantilla (no del mixer): preloader, scroll suave con jQuery Easing, texto rotativo (Morphext), lightboxes (magnific-popup).

**Narrowband:** la capa narrowband tiene un selector de banda. Se precargan 10 `Tone.Buffer` (250 Hz–12 kHz) y el botón activo intercambia el buffer de `noiseNarrow` en caliente. Los archivos viven en `static/media/audio/narrowband*.wav`.

**Audios:** `static/media/audio/` tiene 16 `.wav` (~64 MB, el grueso del peso del sitio). Las rutas están hardcodeadas como strings en `mixer_components.js` (`"./static/media/audio/NOMBRE.wav"`). Si cambian los archivos de audio, hay que actualizar esas rutas con `grep -n "\.wav" static/js/*.js`.

### Convención para agregar un módulo al mixer

Ver `README_mixer.md`: cada capa necesita (1) controles HTML dentro de `flex_consola` con clases/ids propios y `data-action`, (2) un `.css` por módulo (todos casi idénticos, customizables), y (3) lógica en JS que asocie sliders ↔ `gainNode` vía `querySelector`. Todo el mixer se basa en el componente `input[type=range]`, cuyo styling es dependiente del navegador.

## Cómo correr y testear localmente

No hay tests automatizados ni linter. La verificación es manual en navegador.

```bash
python3 -m http.server 8765 --bind 127.0.0.1
# abrir http://127.0.0.1:8765/index.html
```

(Alternativa: extensión **Live Server** de VS Code sobre `index.html`.)

**Para QA de navegador usar la skill `/browse` de gstack** (nunca las herramientas `mcp__claude-in-chrome__*`). Features que siempre hay que verificar tras un cambio: navbar + scroll suave, texto rotativo (morphext), popups (magnific-popup), animación del botón play, y el mixer completo (play/pause + cada capa + cambio de banda narrowband + faders de ganancia).

> En localhost el beacon de Cloudflare Analytics da un error de CORS esperado (solo funciona en el dominio real). No es una regresión.

## Git y deploy

- Rama por defecto para PRs: **`master`** (= producción / GitHub Pages). Branch de trabajo habitual: `develop`.
- Flujo: `feature/...` → `develop` → PR a `master`. **El merge a `master` (producción) lo decide el humano**; no pushear ni abrir PR sin confirmación explícita.
- Commits en español. Trailer de los commits de Claude:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

## Plan activo

`PLAN_MODERNIZACION_TECNICA.md` es un plan ejecutable de modernización técnica (audio lossless/FLAC, minificación, SEO, SRI, PWA) con una **restricción dura: impacto cero en diseño visual y en features**. Si se trabaja en ese plan, leerlo completo primero — define guardrails, fases con gates de QA, y un checklist idempotente.
