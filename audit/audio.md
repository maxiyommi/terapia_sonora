# Reporte de optimización de audio — Fase 2

> 2026-06-26. Objetivo: reducir peso manteniendo calidad clínica **sin pérdida (lossless)**.

## Decisión tomada: FLAC **bit-exacto** (estéreo), sin downmix a mono

Se midió cada archivo individualmente (diferencia L−R con `volumedetect`) y se convirtió
**todo a FLAC `compression_level 8`**, conservando los canales originales.

**Verificación de losslessness:** para cada archivo, el MD5 del PCM decodificado del FLAC
es **idéntico** al del WAV original (`ffmpeg -i X -f md5 -`). Los 16 archivos pasaron
bit-exacto. Es lossless real, no perceptual.

### Por qué NO se hizo downmix a mono (todavía)

Los estímulos dual-mono (narrowbands, pink, white, heavyRain) tienen una diferencia
L−R de ~−68 dB (ruido de fondo, inaudible) pero **L ≠ R bit a bit**. Un downmix a mono
promedia (L+R)/2 y **deja de ser bit-exacto** respecto a cualquiera de los canales
(verificado: el MD5 del mono no coincide con el del canal izquierdo). Sería solo
"perceptualmente lossless", lo que **viola la regla dura de losslessness** y requiere
validación clínica A/B (responsable: Magali). Se deja como mejora opcional pendiente
de OK clínico (ver abajo).

## Resultados

| Archivo | Canales | L−R max (dB) | WAV (bytes) | FLAC (bytes) | Lossless |
|---|---|---|---|---|---|
| heavyRain | 2 (dual-mono) | −51.4 | 11.560.878 | 6.296.349 | ✅ bit-exacto |
| narrowband250 | 2 (dual-mono) | −67.4 | 1.911.950 | 897.340 | ✅ |
| narrowband500 | 2 (dual-mono) | −68.0 | 1.913.806 | 925.360 | ✅ |
| narrowband1k | 2 (dual-mono) | −68.0 | 1.913.806 | 955.512 | ✅ |
| narrowband2k | 2 (dual-mono) | −67.4 | 1.913.806 | 977.188 | ✅ |
| narrowband3k | 2 (dual-mono) | −68.0 | 1.913.806 | 985.480 | ✅ |
| narrowband4k | 2 (dual-mono) | −68.0 | 1.913.806 | 988.914 | ✅ |
| narrowband6k | 2 (dual-mono) | −66.8 | 1.913.806 | 992.160 | ✅ |
| narrowband8k | 2 (**estéreo real**) | **−1.9** | 1.913.808 | 1.535.744 | ✅ |
| narrowband10k | 2 (dual-mono) | −68.0 | 1.913.806 | 986.172 | ✅ |
| narrowband12k | 2 (dual-mono) | −68.0 | 1.913.806 | 981.848 | ✅ |
| narrow | 1 (ya mono) | — | 880.304 | 661.491 | ✅ |
| pinkNoise | 2 (dual-mono) | −68.0 | 1.910.734 | 817.374 | ✅ |
| whiteNoise | 2 (dual-mono) | −68.0 | 1.911.886 | 946.541 | ✅ |
| Rain | 2 (**estéreo real**) | −0.0 | 6.106.378 | 4.416.110 | ✅ |
| Water | 2 (**estéreo real**) | −2.8 | 24.787.854 | 18.266.497 | ✅ |

**Total audio: 63,3 MB → 39,7 MB → reducción ~37,2% (100% bit-exacto lossless).**
`static/` total: 68 MB → 41 MB.

## Pendiente de validación clínica (Magali) — opcionales

Estas mejoras aumentan el ahorro pero **no son bit-exactas** / requieren criterio clínico.
No se aplicaron para no violar la regla de losslessness sin OK humano.

1. **Downmix a mono de los 12 dual-mono** (narrowbands ≠8k, pink, white, heavyRain):
   llevaría el total a ~36,2 MB (**−42,7%**, +3,5 MB de ahorro). Descarta la diferencia
   L−R de −68 dB (inaudible). Decisión clínica + escucha A/B.
2. **narrowband8k es estéreo real (−1.9 dB)**, anómalo: todos los demás narrowbands son
   dual-mono. Probable mala exportación. Se dejó **estéreo** para mantener losslessness.
   Si clínicamente debe ser mono, hay que re-exportar el estímulo original (no inventar
   el canal faltante).
3. **Loops de ruidos estacionarios** (`Water` 140 s, `heavyRain` 60 s, `Rain` 34 s):
   recortar a ~20–30 s con crossfade y `loop=true`. Gran ahorro adicional, pero requiere
   prueba de que el loop no introduce artefactos + OK clínico (T2.5 del plan).

## Backup

Los 16 WAV originales (másters) están en `audio_source/` (gitignored) y en el historial
de git (commit previo a esta fase). Nada se perdió.
