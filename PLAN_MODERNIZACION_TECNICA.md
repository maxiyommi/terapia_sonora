# Plan de Modernización Técnica — Terapia Sonora

> **Tipo:** Plan ejecutable por un squad de agentes (Claude Code).
> **Creado:** 2026-06-26
> **Estado:** `COMPLETADO` (2026-06-26) — resultados en `audit/final.md`. Pendiente solo: merge humano + decisiones clínicas opcionales (downmix mono / loops / narrowband8k).
> **Alcance:** SOLO actualización tecnológica, rendimiento, seguridad y buenas prácticas.
> **Restricción dura:** impacto **cero** en diseño visual y en features. Nada de rediseños, nada de funciones nuevas.

---

## 0. Cómo ejecutar este plan (leer primero)

Este archivo es autosuficiente: una sesión nueva de Claude Code, sin contexto previo, puede ejecutarlo de punta a punta.

**Para arrancar la ejecución, en una sesión nueva en la raíz del proyecto, decí:**

> "Ejecutá el plan de `PLAN_MODERNIZACION_TECNICA.md`."

El agente que reciba esa orden asume el rol de **Orquestador** y debe:

1. Leer este archivo **completo**.
2. Leer la sección **§1 Reglas de oro** y respetarlas en todo momento.
3. Revisar el **§9 Checklist de progreso**: si hay tareas marcadas `[x]`, ya están hechas — verificar su estado real y saltarlas (el plan es **idempotente**).
4. Ejecutar las fases **en orden** (§6). Dentro de cada fase, lanzar los agentes del squad (§4) que el plan indique, en paralelo cuando no haya dependencias.
5. Después de cada fase, correr el **gate de QA** correspondiente (§7). No avanzar si el gate falla.
6. Al terminar, actualizar el `Estado` del header y el checklist, y dejar todo en una rama lista para PR (§8).

**Cómo se materializa el "squad":** el Orquestador usa la herramienta `Agent` (subagentes). Cada agente del §4 se invoca con su "Prompt base" + la tarea concreta de la fase. Para trabajo paralelo, lanzar varios `Agent` en un solo mensaje. Para edición concurrente de archivos compartidos (sobre todo `index.html`), ver §1.7.

---

## 1. Reglas de oro (guardrails)

1. **No tocar el diseño.** Ningún cambio puede alterar la apariencia ni el layout. La verificación es por screenshot antes/después (§7).
2. **No tocar features.** El mixer, los popups, el scroll, el texto rotativo y todo comportamiento deben seguir funcionando idénticos.
3. **Audio solo sin pérdida (lossless).** Prohibido MP3/Opus/AAC ni cualquier códec con pérdida. Permitido: FLAC (lossless), downmix a mono **solo** en archivos dual-mono verificados, y loops de ruido estacionario. Todo cambio de audio se valida bit a bit o con escucha A/B (§ Fase 2).
4. **Cada cambio se testea antes de avanzar.** Sin QA verde no se hace commit de esa fase.
5. **Idempotencia.** Antes de aplicar una tarea, verificar si ya está aplicada. Re-ejecutar el plan no debe romper nada ni duplicar cambios.
6. **Git:** trabajar en la rama `feature/modernizacion-tecnica` (creada desde `develop`). Un commit atómico por tarea o por grupo coherente. No pushear ni abrir PR sin confirmación humana (ver §8).
7. **Edición de `index.html`:** muchos agentes lo tocan. Para evitar conflictos, **serializar** las ediciones de `index.html` (un agente a la vez sobre ese archivo) o que el Orquestador consolide los cambios. No correr dos agentes que editen `index.html` en paralelo.
8. **Preservar los originales de audio.** Antes de convertir, copiar los `.wav` actuales a `audio_source/` (agregar `audio_source/` a `.gitignore`) o etiquetarlos en git. Nunca perder los másters sin compresión.
9. **Deploy:** el sitio se sirve por **GitHub Pages desde la rama `master`**. Estos cambios viven en `feature/...` → `develop` → PR a `master`. El merge a `master` (producción) lo decide el humano.

---

## 2. Contexto del proyecto (autosuficiente)

- **Qué es:** landing page + web app "Sonora", una herramienta de terapia acústica (mixer de audio para acúfenos/hiperacusia/hipoacusia). Sitio en https://www.tuterapiasonora.com.ar/
- **Repo local:** raíz del proyecto actual. **Deploy:** GitHub Pages desde `master`. Dominio vía CNAME (Namecheap DNS), HTTPS forzado.
- **Stack:** HTML estático + CSS + JavaScript vanilla + jQuery. Sin build system (todas las libs están vendoreadas a mano en `static/`).
- **Estructura relevante:**
  - `index.html` — única página (landing + sección "Demostración" con el mixer).
  - `static/js/` — `jquery.min.js`, `bootstrap.min.js`, `jquery.magnific-popup.js`, `jquery.easing.min.js`, `morphext.min.js`, `scripts.js` (custom), `mixer_audioMain.js` (play/pause del mixer), `mixer_components.js` (crea los nodos de audio con Tone.js — **núcleo del mixer**).
  - `static/css/` — `bootstrap.css` (¡sin minificar!), `fontawesome-all.css`, `magnific-popup.css`, `styles.css`, `mixer_basic.css`, `mixer_components.css`, `morphext.css`.
  - `static/media/audio/` — 16 archivos `.wav` (~64 MB, el grueso del peso del sitio).
  - `static/media/images/` — imágenes. `static/webfonts/` — FontAwesome (~2.7 MB en 5 formatos).
- **Librerías externas (CDN) en `index.html`:** Tone.js 13.0.1 y GSAP 3.6.0 (ambos desde cdnjs), beacon de Cloudflare Web Analytics, y Google Fonts (Jost).
- **Versiones actuales:** jQuery 3.7.1 (ya actualizado), Bootstrap 4.4.1, FontAwesome Free 5.10.1, Tone.js 13.0.1, GSAP 3.6.0, magnific-popup 1.1.0.

---

## 3. Resumen del alcance (qué entra y qué no)

Este plan cubre **"esto" (optimización de audio)** + los **11 aspectos** evaluados antes:

| # | Aspecto | Fase | Decisión |
|---|---------|------|----------|
| 0 | Optimización de audio lossless (FLAC + mono + loops + lazy) | F2 + F3 | ✅ incluido |
| 1 | Usar `bootstrap.min.css` en vez de `bootstrap.css` | F1 | ✅ incluido |
| 2 | Adelgazar FontAwesome (quitar formatos legacy, dejar woff2) | F1 | ✅ incluido |
| 3 | Arreglos SEO/metadata (og:image roto, description, favicon, robots, sitemap) | F1 | ✅ incluido |
| 4 | Bugs triviales (`morphext.css` duplicado, `console.log`, imágenes a WebP) | F1 | ✅ incluido |
| 5 | GSAP 3.6.0 → 3.12.x (CDN, drop-in) | F1 | ✅ incluido |
| 6 | Lazy loading de audios | F3 | ✅ incluido |
| 7 | PWA + Service Worker (caché offline) | F3 | ✅ incluido |
| 8 | SRI (integrity) en los `<script>` de CDN | F1 | ✅ incluido |
| 9 | Tone.js 13 → 15 | — | ❌ DESCARTADO (ver §5) |
| 10 | Bootstrap 4 → 5 | — | ❌ DESCARTADO; opcional 4.6.2 (ver §5) |
| 11 | Migrar a framework moderno (React/Astro/Vite) | — | ❌ DESCARTADO (ver §5) |

---

## 4. El squad de agentes especialistas

Cada agente recibe su "Prompt base" + la tarea concreta. Todos respetan §1.

### Orquestador (Tech Lead)
- **Rol:** coordina fases, gestiona git, consolida ediciones de `index.html`, corre los gates de QA, actualiza el checklist.
- **No delega:** decisiones de git (rama, commits) y los gates de avance.

### A1 — Ingeniero de Audio
- **Prompt base:** "Sos ingeniero de audio. Tu objetivo es reducir el peso de los audios SIN pérdida de calidad audible, para una herramienta clínica de terapia acústica. Solo lossless. Validás cada archivo individualmente con `ffprobe`/`ffmpeg`. Nunca asumís que un archivo es mono sin medirlo."
- **Toca:** `static/media/audio/*`, `static/js/mixer_components.js` (rutas), `audio_source/`.
- **Entrega:** audios optimizados + rutas actualizadas + reporte de verificación (peso antes/después, prueba de losslessness).

### A2 — Frontend & Assets
- **Prompt base:** "Optimizás assets sin cambiar el diseño: minificación, formatos de fuente, imágenes, limpieza de bugs de markup."
- **Toca:** `index.html` (links CSS/JS), `static/css/`, `static/webfonts/`, `static/media/images/`, `static/js/*` (limpieza de `console.log`).

### A3 — SEO & Metadata
- **Prompt base:** "Mejorás metadata, SEO técnico y crawlability sin cambiar contenido visible."
- **Toca:** `index.html` (`<head>` meta/OG), `robots.txt`, `sitemap.xml`, `manifest.json`, favicons.

### A4 — Seguridad
- **Prompt base:** "Cerrás riesgos de seguridad y dependencias con buenas prácticas, sin romper funcionalidad."
- **Toca:** `index.html` (atributos `integrity`/`crossorigin` en CDN), revisión de dependencias.

### A5 — Performance & PWA
- **Prompt base:** "Mejorás tiempos de carga sin tocar diseño: carga diferida, service worker, caché, hints de recursos."
- **Toca:** `static/js/mixer_*.js` (lazy load), `index.html`, `sw.js`, `manifest.json`.
- **Depende de:** A1 (necesita la lista final de audios para la caché).

### A6 — QA & Testing
- **Prompt base:** "Verificás que nada se rompió: consola sin errores, diseño idéntico (screenshot diff), features intactas, audio lossless, peso reducido."
- **Herramientas:** `/browse` (gstack) para QA de navegador, `ffprobe`/`ffmpeg` para audio, screenshots antes/después, métricas de peso.
- **Actúa:** al final de cada fase (gate) y en el cierre (QA integral).

---

## 5. Aspectos evaluados y DESCARTADOS (no ejecutar)

Documentados para que una sesión futura no los reintroduzca por error.

- **Tone.js 13 → 15:** ❌ El mixer tiene ~46 usos de la API vieja (`Tone.context = audioCtx`, `new Tone.Buffer`, `new Tone.Player`, `new Tone.Oscillator`). v14/v15 cambiaron la API (manejo de contexto, `Tone.start()` obligatorio, buffers). Migrar implica reescribir el motor de audio: alto riesgo de **romper una feature clínica**, sin beneficio visible. Viola "impacto cero en features". **Solo** reconsiderar si aparece un bug que exija una versión nueva.
- **Bootstrap 4 → 5:** ❌ BS5 cambia markup (`data-toggle`→`data-bs-toggle`, clases renombradas) y eliminaría jQuery, pero el resto del sitio (scripts.js, magnific-popup, morphext) sigue dependiendo de jQuery, así que no se gana. Riesgo de regresión visual. **Opcional seguro:** subir a **4.6.2** (último de la rama 4, drop-in) — solo si el gate visual queda 100% verde. No es obligatorio.
- **Framework moderno (React/Astro/Vite):** ❌ Reescritura completa para una página estática + mixer. Sin impacto para el usuario final. Fuera de alcance.

---

## 6. Fases de ejecución

Grafo de dependencias:

```
F0 (setup) ──> F1 (quick wins) ──> F2 (audio) ──> F3 (perf/PWA) ──> F4 (QA integral + cierre)
                    │                                  ▲
                    └──────────────────────────────────┘  (F3 lazy/SW depende de audios de F2)
```

### Fase 0 — Setup & Baseline  *(Orquestador)*
- [ ] **T0.1** Verificar que estás en la raíz del proyecto y que `git status` está limpio. Crear rama: `git checkout develop && git pull --ff-only && git checkout -b feature/modernizacion-tecnica`.
- [ ] **T0.2** Verificar herramientas: `ffmpeg -version`, `ffprobe -version`, `python3 --version`, navegador (`/browse`). Si falta `ffmpeg`, A1 no puede operar — reportar y pausar Fase 2.
- [ ] **T0.3** Baseline de métricas (guardar en `audit/baseline.md`): peso total del repo desplegable (`du -sh static`), peso de audios (`du -sh static/media/audio`), peso de webfonts, y screenshots de referencia (desktop + mobile) vía `/browse` levantando `python3 -m http.server 8765` y navegando a `http://127.0.0.1:8765/index.html`.
- **Gate:** rama creada, baseline guardado, screenshots de referencia tomados.

### Fase 1 — Quick wins, seguridad y buenas prácticas  *(A2 + A3 + A4, coordinados por el Orquestador)*
> Todos tocan `index.html`: el Orquestador serializa las ediciones (§1.7).

**A2 — Frontend & Assets:**
- [ ] **T1.1** Cambiar en `index.html` el link `static/css/bootstrap.css` por `static/css/bootstrap.min.css`. Si no existe el `.min`, generarlo (descargar Bootstrap 4.4.1 oficial minificado o minificar el actual). Verificar visualmente.
- [ ] **T1.2** Eliminar el `<link>` duplicado de `morphext.css` (aparece dos veces seguidas en el `<head>`).
- [ ] **T1.3** Quitar todos los `console.log` de `static/js/mixer_audioMain.js` y `static/js/mixer_components.js` (hay ~43). No quitar lógica, solo logs.
- [ ] **T1.4** FontAwesome: editar `static/css/fontawesome-all.css` para que `@font-face` use **solo `woff2`** (eliminar referencias a `eot`/`svg`/`ttf` y, opcional, `woff`). Borrar de `static/webfonts/` los formatos no usados (`*.eot`, `*.svg`, `*.ttf`). Verificar que los íconos siguen renderizando. *(Ahorro ~2 MB.)*
- [ ] **T1.5** Optimizar imágenes: convertir PNG/JPEG grandes a **WebP** con fallback, o recomprimir sin pérdida visible. Revisar `header-course_old.png` (314 KB, probablemente sin uso → eliminar si no se referencia) y `Magali.jpeg` (223 KB). No cambiar dimensiones ni recortes.

**A3 — SEO & Metadata:**
- [ ] **T1.6** Arreglar `og:image`: hoy apunta a `https://tuterapiasonora.com.ar/img/logo.png` (ruta `/img/` **inexistente** → preview roto al compartir). Apuntar a una imagen real (`https://www.tuterapiasonora.com.ar/static/media/images/logo.png` u og-image dedicada).
- [ ] **T1.7** Reescribir `meta description` (hoy "Landing page del proyecto SONORA") por una descripción real orientada a búsqueda (terapia sonora / acúfenos / hiperacusia). Sin cambiar contenido visible de la página.
- [ ] **T1.8** Agregar `apple-touch-icon`, `theme-color` (ya existe, verificar), y un `link rel="canonical"`.
- [ ] **T1.9** Crear `robots.txt` y `sitemap.xml` en la raíz.

**A4 — Seguridad:**
- [ ] **T1.10** Agregar `integrity` + `crossorigin="anonymous"` a los `<script>` de CDN (Tone.js 13.0.1 y GSAP). Obtener los hashes SRI desde cdnjs (cada archivo en cdnjs publica su SRI). Verificar que el sitio sigue cargando.
- [ ] **T1.11** (mismo bloque) **GSAP 3.6.0 → 3.12.5**: actualizar la URL del CDN a la 3.12.5 y su SRI. Es drop-in dentro de v3. Verificar que la animación del timer sigue funcionando.
- [ ] **T1.12** Revisar que no queden secretos/tokens sensibles en el repo (el token de Cloudflare Web Analytics es público por diseño, OK).

- **Gate F1 (A6):** screenshot diff desktop+mobile = sin cambios visuales; `/browse console --errors` sin errores nuevos; íconos visibles; mixer abre y reproduce; popups y scroll OK. Commit(s) de la fase.

### Fase 2 — Optimización de audio lossless  *(A1, luego gate A6)*
> Objetivo: reducir ~64 MB manteniendo calidad clínica bit-exacta. Ver datos medidos en §10.

- [ ] **T2.1** Backup: copiar `static/media/audio/*.wav` a `audio_source/` y agregar `audio_source/` al `.gitignore`. (O crear tag `audio-originales`.)
- [ ] **T2.2** **Medir cada archivo individualmente** (no asumir). Para cada `.wav`: duración, canales, y nivel de la diferencia L−R:
  ```bash
  ffmpeg -i ARCHIVO.wav -af "pan=mono|c0=c0-c1,volumedetect" -f null - 2>&1 | grep max_volume
  ```
  Clasificar: `max_volume < -45 dB` ⇒ **dual-mono** (downmix a mono = lossless). Si no ⇒ **estéreo real** (mantener estéreo). ⚠️ Ojo: en la medición inicial `narrowband8k.wav` dio -1.9 dB (estéreo real) a diferencia del resto de narrowbands (dual-mono). **Verificar este caso**: puede ser un archivo mal exportado; decidir con criterio (y validación clínica) si se trata como mono o se deja estéreo.
- [ ] **T2.3** Convertir a **FLAC lossless**:
  - Dual-mono verificados → `ffmpeg -i in.wav -ac 1 -c:a flac -compression_level 8 out.flac`
  - Estéreo real → `ffmpeg -i in.wav -c:a flac -compression_level 8 out.flac`
- [ ] **T2.4** **Verificar losslessness** (clave):
  - Estéreo (sin downmix): el FLAC debe ser bit-idéntico al WAV. `ffmpeg -i in.wav -f md5 -` == `ffmpeg -i out.flac -f md5 -`.
  - Mono (downmix de dual-mono): comparar el mono FLAC con el canal izquierdo del WAV original: `ffmpeg -i in.wav -map_channel 0.0.0 -f md5 -` == `ffmpeg -i out.flac -f md5 -`. Si no coincide exacto, validar por escucha A/B y dejarlo documentado.
- [ ] **T2.5** **(Opcional, requiere validación humana/clínica)** Loops de ruidos estacionarios largos para más ahorro sin pérdida audible: `Water.wav` (140 s), `heavyRain.wav` (60 s), `Rain.wav` (34 s) → recortar a ~20–30 s con crossfade para loop sin clicks, y activar `loop=true` en el `Tone.Player` correspondiente. **No hacer sin OK del responsable clínico** (Magali) ni sin prueba de que el loop no introduce artefactos. Marcar como sub-tarea opcional.
- [ ] **T2.6** Actualizar rutas en `static/js/mixer_components.js` (y donde corresponda) de `.wav` → `.flac`. Buscar todas las referencias: `grep -n "\.wav" static/js/*.js`.
- [ ] **T2.7** Reporte en `audit/audio.md`: tabla peso antes/después por archivo, formato resultante, prueba de losslessness, y cuáles quedaron mono/estéreo/loop.
- **Gate F2 (A6):** el mixer reproduce **todas** las capas (pink, white, narrow, tonegen, rain, heavyRain, water) sin errores de consola; los `Tone.Player` cargan los `.flac`; el cambio de banda del narrowband funciona; sin regresión audible (validación clínica si se tocó contenido). Peso de audio reducido (objetivo: ≥40% sin loops; más con loops). Commit.

### Fase 3 — Performance & PWA  *(A5, depende de F2; luego gate A6)*
- [ ] **T3.1** **Lazy loading de audios:** que los `Tone.Player`/`Tone.Buffer` se instancien/carguen **on-demand** (cuando el usuario activa esa capa o toca play), no todos al cargar la página. Mantener exactamente el mismo comportamiento percibido. Verificar en `/browse network` que al cargar la página no se descargan los audios hasta interactuar.
- [ ] **T3.2** **Resource hints** en `index.html`: `preconnect` a `fonts.googleapis.com`/`fonts.gstatic.com` y a `cdnjs.cloudflare.com`. (Opcional) `defer` en scripts que no bloqueen, respetando el orden de dependencias de jQuery — solo si el gate visual queda verde.
- [ ] **T3.3** **PWA:** crear `manifest.json` (nombre, íconos, theme-color, display) y enlazarlo en `index.html`.
- [ ] **T3.4** **Service Worker** (`sw.js`): registrar; estrategia cache-first para assets estáticos y audios `.flac`, network-first para `index.html`. La lista de audios a cachear sale del resultado de F2. Verificar que tras la primera visita el sitio carga desde caché (offline básico).
- **Gate F3 (A6):** la página abre sin descargar los 64/N MB de audio por adelantado (lazy OK); el mixer sigue funcionando; SW registrado y cacheando; segunda carga más rápida; sin regresión visual ni de features. Commit.

### Fase 4 — QA integral & cierre  *(A6 + Orquestador)*
- [ ] **T4.1** QA integral con `/browse`: recorrer toda la página, abrir el mixer, probar cada capa y el cambio de banda, abrir popups (magnific), probar scroll y texto rotativo. `console --errors` limpio.
- [ ] **T4.2** Regresión visual final: screenshot diff desktop + mobile contra el baseline de F0. Diferencia esperada: **ninguna**.
- [ ] **T4.3** Métricas finales en `audit/final.md`: peso total antes/después, peso de audio, peso de fonts, y (si hay herramienta) Lighthouse performance antes/después.
- [ ] **T4.4** Actualizar este archivo: `Estado: COMPLETADO`, marcar el checklist §9, y dejar resumen de resultados.
- [ ] **T4.5** Preparar entrega: asegurar commits atómicos y limpios en `feature/modernizacion-tecnica`. **No pushear ni abrir PR sin confirmación humana** (§8).
- **Gate final:** todos los gates anteriores verdes + diseño idéntico + features intactas + peso reducido + audio lossless verificado.

---

## 7. Estrategia de testing (autosuficiente)

**Levantar el sitio localmente:**
```bash
python3 -m http.server 8765 --bind 127.0.0.1
# luego abrir http://127.0.0.1:8765/index.html
```

**QA de navegador (gstack /browse):**
```bash
$B goto http://127.0.0.1:8765/index.html
$B console --errors            # errores de JS
$B network                     # qué se descarga y cuándo (verificar lazy load)
$B js "window.jQuery ? jQuery.fn.jquery : 'no'"   # libs cargadas
$B screenshot /tmp/después.png # comparar contra baseline
```
> Nota: en localhost el beacon de Cloudflare da un error de CORS esperado (solo funciona en el dominio real). No es regresión.

**Verificación de audio:**
- Formato/duración: `ffprobe -v error -show_entries stream=sample_rate,channels,bits_per_sample -show_entries format=duration -of default=noprint_wrappers=1 ARCHIVO`
- Dual-mono: ver T2.2.
- Losslessness: ver T2.4 (comparación de MD5 del PCM decodificado).

**Regresión visual:** screenshots desktop (1280px) y mobile (375px) antes (F0) y después (cada gate). La diferencia debe ser nula.

**Features a verificar siempre:** navbar + scroll suave, texto rotativo (morphext), popups (magnific-popup), animación del botón play, mixer (play/pause + cada capa + cambio de banda narrowband + faders de ganancia).

---

## 8. Git & entrega

- Rama: `feature/modernizacion-tecnica` (desde `develop`).
- Commits atómicos por tarea/grupo, mensajes claros en español, con el trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **Push y PR:** SOLO con confirmación humana explícita. El flujo previsto es `feature/...` → `develop` → PR a `master` (producción / GitHub Pages). El merge a `master` lo decide el humano.
- La alerta de Dependabot se cierra cuando los cambios llegan a la rama por defecto (`master`).

---

## 9. Checklist de progreso (idempotente — marcar al completar)

**Fase 0 — Setup**
- [x] T0.1 rama creada
- [x] T0.2 herramientas verificadas
- [x] T0.3 baseline + screenshots

**Fase 1 — Quick wins / seguridad**
- [x] T1.1 bootstrap.min.css
- [x] T1.2 morphext.css duplicado eliminado
- [x] T1.3 console.log eliminados
- [x] T1.4 FontAwesome solo woff2 + limpieza webfonts
- [x] T1.5 imágenes optimizadas
- [x] T1.6 og:image arreglado
- [x] T1.7 meta description
- [x] T1.8 apple-touch-icon / canonical
- [x] T1.9 robots.txt + sitemap.xml
- [x] T1.10 SRI en CDN
- [x] T1.11 GSAP 3.12.5
- [x] T1.12 revisión de secretos
- [x] Gate F1 verde

**Fase 2 — Audio**
- [x] T2.1 backup audio_source/
- [x] T2.2 medición individual
- [x] T2.3 conversión a FLAC
- [x] T2.4 verificación losslessness
- [ ] T2.5 (opcional) loops — PENDIENTE OK clínico (Magali)
- [x] T2.6 rutas .wav→.flac en JS
- [x] T2.7 reporte audio.md
- [x] Gate F2 verde

**Fase 3 — Performance / PWA**
- [x] T3.1 lazy loading
- [x] T3.2 resource hints
- [x] T3.3 manifest.json
- [x] T3.4 service worker
- [x] Gate F3 verde

**Fase 4 — QA integral / cierre**
- [x] T4.1 QA integral
- [x] T4.2 regresión visual final
- [x] T4.3 métricas finales
- [x] T4.4 plan actualizado
- [x] T4.5 entrega lista

---

## 10. Apéndice A — Datos de audio medidos (2026-06-26)

Formato base: PCM 16-bit, estéreo (salvo `narrow.wav` que ya es mono). Clasificación por nivel de diferencia L−R.

| Archivo | Dur (s) | Sample rate | L−R max (dB) | Clasificación |
|---|---|---|---|---|
| narrowband250.wav | 10 | 48000 | −67.4 | DUAL-MONO → mono lossless |
| narrowband500.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrowband1k.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrowband2k.wav | 10 | 48000 | −67.4 | DUAL-MONO → mono lossless |
| narrowband3k.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrowband4k.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrowband6k.wav | 10 | 48000 | −66.8 | DUAL-MONO → mono lossless |
| narrowband8k.wav | 10 | 48000 | **−1.9** | ⚠️ ESTÉREO REAL (anómalo, verificar) |
| narrowband10k.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrowband12k.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| whiteNoise.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| pinkNoise.wav | 10 | 48000 | −68.0 | DUAL-MONO → mono lossless |
| narrow.wav | 10 | 44100 | (ya mono) | YA MONO |
| heavyRain.wav | 60 | 48000 | −51.4 | CASI MONO (validar; candidato a loop) |
| Rain.wav | 35 | 44100 | −0.0 | ESTÉREO REAL (candidato a loop) |
| Water.wav | 140 | 44100 | −2.8 | ESTÉREO REAL (candidato a loop) |

**Ahorro estimado (FLAC, medido sobre muestras):**
- Estímulos dual-mono → mono FLAC: ~0.7–0.8 MB c/u (desde 1.8 MB).
- `Water`: 23.6 MB → 17.5 MB (FLAC estéreo) / 8.8 MB (mono). `Rain`: 5.8 → 4.2 / 2.0. `heavyRain`: 11.0 → 6.0 / 4.1.
- Total: ~64 MB → **~35 MB** (FLAC, sin loops) ó **~12–16 MB** (con loops de ~20 s, con validación clínica).

## 11. Apéndice B — Versiones objetivo

| Lib | Actual | Objetivo | Nota |
|---|---|---|---|
| jQuery | 3.7.1 | 3.7.1 | ya OK |
| Bootstrap | 4.4.1 (sin min) | 4.4.1 **minificado** (opcional 4.6.2) | NO migrar a 5 |
| FontAwesome | 5.10.1 (5 formatos) | 5.10.1 (solo woff2) | no cambiar versión, adelgazar |
| Tone.js | 13.0.1 | 13.0.1 | NO actualizar (riesgo features) |
| GSAP | 3.6.0 | 3.12.5 | drop-in v3 |
| magnific-popup | 1.1.0 | 1.1.0 | OK |

## 12. Apéndice C — Compatibilidad FLAC
FLAC se decodifica nativamente vía Web Audio (`AudioContext.decodeAudioData`) en Chrome 56+, Firefox 51+, Edge y Safari 11+. `Tone.Player` usa `decodeAudioData` internamente, así que no requiere cambios en Tone.js. Si se necesitara soporte de navegadores muy viejos, mantener un fallback `.wav` (no previsto en este plan).
