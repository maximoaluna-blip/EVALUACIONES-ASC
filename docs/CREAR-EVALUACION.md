# Cómo crear o editar una evaluación

Guía paso a paso para crear una evaluación nueva (otro curso) o editar una existente. La regla de oro: **todo vive en el JSON**; el HTML se regenera, nunca se edita a mano.

> Para la especificación campo por campo del JSON, ver [MODELO-DATOS.md](MODELO-DATOS.md).
> Para entender la calificación, ver [MODELO-CALIFICACION.md](MODELO-CALIFICACION.md).

---

## Caso A — Editar la evaluación existente (corregir un ítem, una clave, etc.)

1. Abrir `data/metodo-scout.json`.
2. Editar el campo que corresponda (enunciado, opciones, `respuesta`, `clave`…).
3. Regenerar:
   ```bash
   node generador/build-evaluacion.js metodo-scout
   ```
4. Abrir `evaluacion.html` en el navegador y verificar.
5. Publicar (commit + push a GitHub Pages).

⚠️ **Nunca** edites `evaluacion.html` directamente: el siguiente build lo sobrescribe.

---

## Caso B — Crear una evaluación nueva (otro curso)

1. **Copiar** `data/metodo-scout.json` como `data/<nuevo-id>.json`.
2. Cambiar `evaluacionId`, `titulo`, `subtitulo`.
3. Definir los **ejes** (`ejes[]`): nombre y qué `id` de ítems agrupa cada uno.
4. Escribir los **ítems** (`items[]`) según su tipo:
   - `opcion_unica` → `opciones[]` + `respuesta` (índice base 0).
   - `emparejar` → `columnaA[]`, `columnaB[]`, `respuesta` (mapa A.id→B.id).
   - `caso` → como opción única + bloque `justificacion`.
5. Escribir la **autopercepción** (`autopercepcion.afirmaciones[]`), si aplica.
6. Cada ítem debe tener su `clave` (explicación razonada).
7. Verificar reglas (lo hace el generador): respuestas válidas, ids únicos, `revelarClave.pre = false`.
8. Generar y probar:
   ```bash
   node generador/build-evaluacion.js <nuevo-id>
   ```

---

## Lista de verificación antes de publicar

- [ ] Cada ítem pertenece a exactamente un eje.
- [ ] `respuesta` correcta en cada ítem objetivo (revisar contra la fuente oficial).
- [ ] Las claves razonadas explican el **concepto**, no solo "la b es correcta".
- [ ] `revelarClave.pre` es `false`.
- [ ] Los emparejar tienen una respuesta por cada elemento de `columnaA`.
- [ ] La autopercepción usa escala 1–5 con etiquetas.
- [ ] Probado en **celular y PC**.
- [ ] (Si el contenido es doctrinal) revisado con el agente `auditor-doctrinal-asc`.

---

## Convención de identificadores

- `evaluacionId`: kebab-case, corto y estable (no se cambia tras publicar). Ej.: `metodo-scout`.
- `id` de ítem: número entero único dentro de la evaluación.
- `id` de eje: kebab/short (`eje1`, `eje2`, `casos`, `transversal`).

---

## Tipos de ítem disponibles (Fase 1)

| Tipo | Cuándo usarlo | Puntúa |
|---|---|---|
| `opcion_unica` | Una sola respuesta correcta (incluye "identificar la FALSA" y juicio situacional) | Sí (1/0) |
| `emparejar` | Relacionar conceptos con significados/elementos | Sí (proporcional) |
| `caso` | Situación + elección + justificación escrita | Opción sí, justificación no |
| escala (en `autopercepcion`) | Medir percepción 1–5 | No (se compara) |

> ¿Necesitas un tipo nuevo (p. ej. selección múltiple, ordenar)? Es un cambio de **motor** (`engine.js` + `build-evaluacion.js`), no solo de JSON. Documentarlo como nueva decisión en [DECISIONES.md](DECISIONES.md).
