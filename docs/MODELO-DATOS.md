# Modelo de datos — Especificación del JSON de evaluación

Cada evaluación se define en **un solo archivo** `data/<evaluacionId>.json`. Es la **única fuente de verdad**: el HTML se genera a partir de él y nunca se edita a mano. Este documento describe cada campo.

Referencia viva: [`data/metodo-scout.json`](../data/metodo-scout.json).

---

## 1. Estructura general

```jsonc
{
  "evaluacionId": "metodo-scout",        // identificador único (kebab-case)
  "titulo": "…",                          // título visible
  "subtitulo": "…",
  "organizacion": "Asociación Scouts de Colombia",
  "anio": 2026,
  "enfoque": "…",                         // nota pedagógica (texto libre)
  "config": { … },                        // ver §2
  "identificacion": { … },                // Sección 0 (solo PRE) — ver §3
  "ejes": [ … ],                          // bloques de calificación — ver §4
  "items": [ … ],                         // preguntas — ver §5
  "autopercepcion": { … }                 // Sección C (escala) — ver §6
}
```

---

## 2. `config` — comportamiento de la evaluación

```jsonc
"config": {
  "barajarOpciones": true,               // baraja opciones por sesión (Fisher-Yates)
  "umbralReferencia": 70,                // % de referencia (informativo, no bloquea)
  "revelarClave": { "pre": false, "post": true },  // CLAVE: solo en POST
  "emparejarMode": "proporcional",       // calificación de "emparejar"
  "emparejarParcial": true               // permite puntaje parcial en emparejar
}
```

| Campo | Tipo | Significado |
|---|---|---|
| `barajarOpciones` | bool | Si `true`, las opciones se reordenan al azar (la respuesta correcta se sigue rastreando por su contenido, no por su posición). |
| `umbralReferencia` | número | % de referencia que se muestra al participante. No bloquea el avance. |
| `revelarClave.pre` | bool | **Debe ser `false`.** Revelar la clave en PRE invalida el POST. |
| `revelarClave.post` | bool | Si `true`, tras el POST se muestra la clave razonada completa. |
| `emparejarMode` | `"proporcional"` \| `"todo_o_nada"` | Cómo se puntúa un ítem de emparejar. |
| `emparejarParcial` | bool | Atajo equivalente a `emparejarMode: "proporcional"`. |

---

## 3. `identificacion` — Sección 0 (solo PRE)

```jsonc
"identificacion": {
  "seccion": "0",
  "soloEn": "pre",                       // se muestra únicamente en modo PRE
  "descripcion": "…",
  "campos": [
    { "id": "nombre",      "etiqueta": "…", "tipo": "texto",     "requerido": true },
    { "id": "correo",      "etiqueta": "…", "tipo": "email",     "requerido": true, "nota": "…" },
    { "id": "rama",        "etiqueta": "…", "tipo": "seleccion", "requerido": true, "opciones": [ … ] },
    { "id": "experiencia", "etiqueta": "…", "tipo": "numero",    "requerido": true, "min": 0, "max": 80 }
  ]
}
```

Tipos de campo: `texto`, `email`, `numero` (con `min`/`max`), `seleccion` (con `opciones`).
El campo `correo` es **obligatorio y es la llave** de emparejamiento PRE↔POST.

---

## 4. `ejes` — bloques de calificación

```jsonc
"ejes": [
  { "id": "eje1", "nombre": "Eje 1 · Principios educativos", "seccion": "A", "items": [1,2,3,4,5,6,7] },
  …
]
```

Cada eje agrupa ítems para calcular su **% propio** y la **mejora PRE→POST** por eje. El array `items` lista los `id` de los ítems que pertenecen al eje. Todo ítem debe pertenecer a exactamente un eje.

---

## 5. `items` — preguntas

Campos comunes a todos los ítems:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | número | Único dentro de la evaluación. |
| `eje` | string | `id` del eje al que pertenece. |
| `seccion` | `"A"` \| `"B"` | Sección de la propuesta. |
| `tipo` | string | `opcion_unica` \| `emparejar` \| `caso`. |
| `subtipo` | string (opcional) | `identificar_falsa` \| `juicio_situacional` (informativo). |
| `dificultad` | `"media"` \| `"alta"` | Informativo. |
| `enunciado` | string | La pregunta. |
| `clave` | string | Explicación razonada (se muestra solo en POST). |

### 5.1 `opcion_unica`

```jsonc
{
  "id": 1, "eje": "eje1", "seccion": "A", "tipo": "opcion_unica", "dificultad": "media",
  "enunciado": "…",
  "opciones": [ "a…", "b…", "c…", "d…" ],
  "respuesta": 1,                        // índice base 0 de la opción correcta (1 = "b")
  "clave": "…"
}
```

Incluye los subtipos `identificar_falsa` (la respuesta es la afirmación FALSA) y `juicio_situacional`. Se califican igual: 1 si el índice elegido = `respuesta`, 0 si no.

### 5.2 `emparejar`

```jsonc
{
  "id": 5, "eje": "eje1", "seccion": "A", "tipo": "emparejar", "dificultad": "media",
  "enunciado": "…",
  "columnaA": [ { "id": "1", "texto": "Conocer" }, … ],   // ítems a emparejar
  "columnaB": [ { "id": "A", "texto": "comprender…" }, … ], // opciones
  "respuesta": { "1": "B", "2": "C", "3": "A", "4": "D" }, // A.id → B.id correcto
  "clave": "…"
}
```

Calificación **proporcional**: `aciertos / total de pares`. Ej.: 3 de 4 = 0.75. (Con `emparejarMode: "todo_o_nada"` sería 1 solo si todos los pares son correctos.)

### 5.3 `caso`

```jsonc
{
  "id": 21, "eje": "casos", "seccion": "B", "tipo": "caso", "dificultad": "alta",
  "enunciado": "…",
  "opciones": [ … ],
  "respuesta": 1,                        // la opción SÍ puntúa (como opcion_unica)
  "justificacion": {
    "requerida": true,
    "etiqueta": "Justifica tu elección en una frase",
    "puntua": false                      // el texto NO cuenta para la nota
  },
  "clave": "…"
}
```

La **opción** se califica como opción única. La **justificación** se guarda como evidencia cualitativa para el formador; **no afecta la nota** (`puntua: false`).

---

## 6. `autopercepcion` — Sección C

```jsonc
"autopercepcion": {
  "seccion": "C",
  "descripcion": "…",
  "escala": { "min": 1, "max": 5, "etiquetaMin": "nada de acuerdo", "etiquetaMax": "totalmente de acuerdo" },
  "afirmaciones": [ "Comprendo por qué…", … ]
}
```

**No es nota.** Cada afirmación se responde 1–5; se reporta el **promedio por afirmación** y la **diferencia PRE→POST** del promedio. Mide percepción, no conocimiento.

---

## 7. Reglas de validación (las verifica el generador)

1. Todos los `id` de ítem son únicos y aparecen en exactamente un eje.
2. En `opcion_unica`/`caso`, `respuesta` es un índice válido de `opciones`.
3. En `emparejar`, hay una entrada en `respuesta` por cada elemento de `columnaA`, y cada valor existe en `columnaB`.
4. `revelarClave.pre` es `false`.
5. Existe al menos un eje y todos los ítems tienen `clave`.
