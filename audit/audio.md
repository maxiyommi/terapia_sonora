# Reporte de optimización de audio — Fase 2 (+ corrección clínica)

> 2026-06-26. Objetivo: reducir peso manteniendo calidad clínica. Tras revisión de escucha
> de Magali/responsable, se aplica criterio clínico: **todos los audios deben tener L y R
> al mismo nivel** (presentación diótica, idéntica en ambos oídos).

## Decisión final: FLAC **mono** (L = R garantizado) para todos los estímulos

Se midió cada archivo individualmente (diferencia L−R y nivel por canal) y se convirtió
**todo a FLAC mono** `compression_level 8`. Al ser mono, cada archivo se reproduce con
**nivel idéntico en L y R** por construcción.

### Corrección de `narrowband8k` (bug audible)

`narrowband8k` se escuchaba más fuerte del lado derecho. La medición por canal lo confirmó:

| Canal | mean_volume | Diagnóstico |
|---|---|---|
| L (izquierdo) | −26,2 dB | **~14 dB más bajo (exportación defectuosa)** |
| R (derecho) | −12,2 dB | nivel correcto |

Sus vecinos (`narrowband6k`, `narrowband10k`) están en **−12 dB en ambos canales**. Por eso
**el canal derecho de 8k es el correcto** (coincide con la calibración de la serie). La
corrección NO fue promediar (L+R)/2 —daría un nivel intermedio, más bajo que el resto—,
sino **tomar el canal derecho (el bueno) y volverlo mono**. Resultado: `narrowband8k`
quedó en **−12,2 dB**, alineado con toda la serie.

### Uniformidad de la serie narrowband tras la corrección

Todas en ~−12 dB (mean): 250 (−12,6), 500 (−12,3), 1k (−12,2), 2k (−12,0), 3k (−12,0),
4k (−12,1), 6k (−12,0), **8k (−12,2)**, 10k (−12,4), 12k (−12,7). Serie pareja.

## Resultados de peso

| Archivo | Origen | FLAC mono (bytes) |
|---|---|---|
| heavyRain | dual-mono → mono | ~4,1 MB |
| narrowband250…12k (×10) | dual-mono → mono (8k desde canal R) | ~0,78 MB c/u |
| narrow | ya mono | ~0,66 MB |
| pinkNoise | dual-mono → mono | ~0,78 MB |
| whiteNoise | dual-mono → mono | ~0,95 MB |
| Rain | estéreo → mono | ~2,0 MB |
| Water | estéreo → mono | ~9 MB |

**Total audio: 63,3 MB → ~25 MB → reducción ~61%.** `static/` total: 68 MB → 26 MB.

## Notas / pendientes

- **Rain y Water** eran grabaciones **estéreo** (ambiente: lluvia y agua). Siguiendo la
  regla "L y R al mismo nivel en todos los audios" también se pasaron a **mono**. Si para
  esos dos sonidos de ambiente preferís conservar el estéreo (imagen espacial), avisá y los
  revierto a estéreo FLAC (solo esos dos). Los másters originales están intactos.
- **Loops** de ruidos estacionarios (Water/heavyRain/Rain): ahorro adicional posible
  recortando a ~20–30 s con crossfade; requiere validación de que el loop no introduce
  artefactos (T2.5, opcional).

## Backup

Los 16 WAV originales (másters) están en `audio_source/` (gitignored) y en el historial
de git. La corrección de 8k y los downmix se hicieron siempre desde esos originales.
