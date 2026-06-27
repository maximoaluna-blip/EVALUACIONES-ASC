# Backend — EVALUACIONES-ASC

> 🚧 **Esqueleto.** El backend se construye y despliega en el **Hito 5**. Este documento ya fija el diseño (hojas, endpoints, contrato) y se completará con IDs y URLs reales cuando se cree.

El backend es un **Google Apps Script** desplegado como Web App, con un **Google Sheet dedicado** como base de datos (decisión [D4](DECISIONES.md)). Sigue el mismo patrón que el backend de las líneas INDUCCION-*.

---

## 1. Identificadores clave

Creado el 2026-06-27 con `clasp` (script enlazado al Sheet). Cuenta: `maximoaluna@gmail.com`.

| Recurso | Valor |
|---|---|
| Google Sheet "ASC Evaluaciones - Backend" (ID) | `1CpEwawI9sHmBca-gioxI8TMUBERLi1QGSlNsFioNpis` |
| Sheet (URL) | https://docs.google.com/spreadsheets/d/1CpEwawI9sHmBca-gioxI8TMUBERLi1QGSlNsFioNpis/edit |
| Apps Script (Script ID) | `1qwSF3yRM1wRtRNsCfZSTj7LUyVg6ml1dzzG84Vg4TlJUgN0GXMP2TW2Q` |
| Editor del script (URL) | https://script.google.com/d/1qwSF3yRM1wRtRNsCfZSTj7LUyVg6ml1dzzG84Vg4TlJUgN0GXMP2TW2Q/edit |
| Web App URL (endpoint `/exec`) | https://script.google.com/macros/s/AKfycbwMegwOg7CRRySbOc_oa8izN3HpMUMwu9oJ8G-y937T8TxV9SKa6i33BvPWWCci4h3cxg/exec |
| Deployment ID (producción) | `AKfycbwMegwOg7CRRySbOc_oa8izN3HpMUMwu9oJ8G-y937T8TxV9SKa6i33BvPWWCci4h3cxg` |
| `AUTH_TOKEN` (enviar / consultar resultado propio) | _(local: `generador/backend.config.json`; también en el proyecto Apps Script)_ |
| `ADMIN_TOKEN` (tablero del formador) | _(secreto — solo en `backend-clasp/Code.js` local y en el proyecto Apps Script; nunca se publica)_ |
| Workspace clasp local | `EVALUACIONES-ASC/backend-clasp/` |

> ⚠️ **Autorización inicial (paso humano único):** el web app corre como el dueño y necesita que `maximoaluna@gmail.com` autorice el acceso a Sheets una vez. Abrir el editor → ejecutar la función `autorizar` → conceder permisos. Después de eso el endpoint responde para siempre (los re-deploys no vuelven a pedirlo salvo que se añadan scopes nuevos).

### Cómo actualizar el backend después
```bash
cd EVALUACIONES-ASC
cp generador/backend-apps-script.js backend-clasp/Code.js
cd backend-clasp
npx @google/clasp push --force
npx @google/clasp deploy -i AKfycbwMegwOg7CRRySbOc_oa8izN3HpMUMwu9oJ8G-y937T8TxV9SKa6i33BvPWWCci4h3cxg --description "..."
```

---

## 2. Hojas del Google Sheet (diseño propuesto)

### Hoja `Respuestas`
Una fila por envío (PRE o POST) de un participante.

| Columna | Ejemplo | Notas |
|---|---|---|
| `timestamp` | 2026-06-27T14:03:00Z | Fecha/hora del servidor |
| `evaluacionId` | metodo-scout | |
| `modo` | pre / post | |
| `correo` | persona@ejemplo.com | **Llave de emparejamiento** |
| `nombre` | … | Solo en PRE |
| `rama` | Tropa (Scouts) | Solo en PRE |
| `experiencia` | 4 | Solo en PRE |
| `respuestas_json` | {"1":1,"5":{...},...} | Respuestas crudas por ítem |
| `pct_eje1` … `pct_total` | 71.4 | % por eje y total |
| `autopercepcion_json` | [4,3,5,4,3,4] | Valores 1–5 |
| `justif_21`, `justif_22` | texto | Evidencia cualitativa |

### Hoja `Resumen` (opcional, generada)
Vista emparejada PRE↔POST por correo, con deltas por eje. Puede calcularse en el tablero en vez de persistirse.

---

## 3. Endpoints (contrato propuesto)

### `POST` — guardar un envío
```jsonc
// Request body
{
  "token": "…",
  "action": "submit",
  "evaluacionId": "metodo-scout",
  "modo": "pre",                 // o "post"
  "identificacion": { "nombre": "…", "correo": "…", "rama": "…", "experiencia": 4 },
  "respuestas": { "1": 1, "5": { "1":"B","2":"C","3":"A","4":"D" }, … },
  "puntajes": { "eje1": 71.4, "eje2": 57.1, …, "total": 64.0 },
  "autopercepcion": [4,3,5,4,3,4],
  "justificaciones": { "21": "…", "22": "…" }
}
// Response
{ "ok": true, "guardado": true }
```

### `GET ?action=resultado&correo=…&token=…` — resultado individual
Devuelve PRE y POST (si existen) de un correo, para mostrar la mejora al participante.

### `GET ?action=dashboard&evaluacionId=…&token=…` — datos del formador
Devuelve agregados por eje (PRE/POST/delta), conteos y justificaciones para el tablero.

> El cálculo de la nota se hace **en el cliente** (engine.js) y se reenvía; el backend lo persiste. El backend puede recalcular como verificación (defensa en profundidad), igual que en la plataforma de cursos.

---

## 4. Cómo desplegar (se detallará en Hito 5)

Patrón previsto (mismo que INDUCCION-*):

1. Crear el Google Sheet "ASC Evaluaciones" (con tu cuenta Google).
2. Crear el proyecto Apps Script (standalone) y pegar `generador/backend-apps-script.js`.
3. Reemplazar el ID del Sheet en el código (`openById('…')`).
4. Desplegar como **Web App** (acceso "Cualquier usuario"), copiar la Web App URL.
5. Pegar la URL y el token en el frontend (config del build).
6. Probar con un envío de prueba (correo `prueba-…@example.com`, fácil de borrar).

> Estos pasos requieren **tu cuenta de Google** (autorización). El código se prepara aquí; tú ejecutas el despliegue siguiendo el paso a paso.

---

## 5. Seguridad y privacidad

- Token compartido en cada llamada (mismo modelo que la plataforma de cursos).
- Datos personales recogidos: nombre, correo, rama, años de experiencia. Mínimos necesarios.
- Los datos de prueba usan correos `…@example.com` para poder borrarlos sin afectar datos reales.
- Considerar (post-Fase 1): rate limiting por correo, y aviso de tratamiento de datos.

---

## 6. Historial de incidentes

- **2026-06-27 · Autorización inicial.** Tras desplegar con clasp, el `/exec` devolvía 403 "Acceso denegado". Causa: el script (que usa `SpreadsheetApp`) requiere autorización OAuth del dueño, que la pantalla de consentimiento de Google solo concede de forma interactiva. **Solución:** ejecutar `autorizar()` una vez desde el editor. clasp puede desplegar pero no consentir scopes de Sheets en nombre del usuario (su token no los incluye).
- **2026-06-27 · CORS en lecturas.** `fetch` GET cross-origin a Apps Script no es legible por el navegador (sin cabeceras CORS). **Solución:** soporte **JSONP** en `doGet` (parámetro `callback`); el guardado usa POST `no-cors` (no necesita leer respuesta porque la nota se calcula en el cliente).

## 7. Seguridad (Hito 7 — resuelto)

- [x] **Secretos fuera del repo público.** `generador/backend-apps-script.js` (con tokens reales) está en `.gitignore`; en el repo se versiona la plantilla redactada `backend-apps-script.template.js`. El `backend-clasp/` y `backend.config.json` también están ignorados. El `ADMIN_TOKEN` no aparece en ningún archivo publicado.
- [x] **El tablero del formador pide el `ADMIN_TOKEN`** (no se incrusta en el HTML público); `dashboard-formador.html` solo lleva la URL (no secreta).
- [x] **Filas de prueba borradas** vía `GET ?action=purgar_pruebas&token=<ADMIN_TOKEN>` (elimina solo correos `*@example.com`).
- Nota: el `AUTH_TOKEN` es necesariamente público (va en `evaluacion.html` para permitir el envío anónimo); es un token de solo-escritura. El `ADMIN_TOKEN` es el único realmente sensible.
- Endurecimiento futuro opcional: mover ambos tokens a **Script Properties** (`PropertiesService`) — requiere un paso manual en Configuración del proyecto, no aporta seguridad extra mientras el código no sea público.

### Endpoint de mantenimiento
`GET ?action=purgar_pruebas&token=<ADMIN_TOKEN>` → borra las filas con correo `*@example.com`. Útil tras pruebas.
