# EVALUACIONES-ASC — Índice del Proyecto

## Asociación Scouts de Colombia · Dirección Nacional de Adultos en el Movimiento

**Proyecto:** Plataforma web para generar, aplicar, calificar y retroalimentar evaluaciones **PRE y POST** de cursos de formación.

**Primer caso de uso (Fase 1):** Curso *Método Scout (Un Día)* — Evaluación de Apropiación.

**Estado:** ✅ Fase 1 en producción (2026-06-27) → https://maximoaluna-blip.github.io/EVALUACIONES-ASC/

**Documentos relacionados:** [README](../README.md) · [Modelo de datos](MODELO-DATOS.md) · [Modelo de calificación](MODELO-CALIFICACION.md) · [Crear evaluación](CREAR-EVALUACION.md) · [Backend](BACKEND.md) · [Decisiones](DECISIONES.md) · [Roadmap](ROADMAP.md)

---

## 1. Objetivo y alcance

### Qué hace
- Aplica una **evaluación PRE** (línea base, antes del curso) y una **evaluación POST** (al cierre).
- Empareja PRE↔POST **por correo electrónico** de cada participante.
- **Califica automáticamente** los ítems objetivos y calcula el % por eje.
- Calcula la **mejora PRE→POST** por eje, total y autopercepción (evidencia de aprendizaje).
- Entrega **retroalimentación al participante** y un **tablero al formador**.

### Qué NO hace (límites de alcance)
- No mide vivencia/participación (eso es complementario, con otros instrumentos).
- No califica texto libre: las justificaciones se guardan como evidencia cualitativa, **no puntúan**.
- No requiere login ni contraseñas en Fase 1 (la llave es el correo).

---

## 2. Arquitectura

```
Participante (celular/PC)
        │
        ▼
GitHub Pages — HTML estático (index, evaluacion, dashboard)
        │   fetch/POST (JSON)
        ▼
Google Apps Script (Web App)  ──►  Google Sheet dedicado "ASC Evaluaciones"
        ◄── JSON responses ───
```

| Capa | Tecnología | Notas |
|---|---|---|
| Frontend | HTML5 + CSS3 + JS vanilla | Sin frameworks. Responsive (mobile-first). |
| Fuente de verdad | JSON (`data/<id>.json`) | Una evaluación = un JSON. |
| Generación | Node.js (`build-evaluacion.js`) | JSON → `evaluacion.html`. |
| Backend | Google Apps Script | Web App pública con token. |
| Base de datos | Google Sheet dedicado | Separado de la plataforma de cursos. |
| Hosting | GitHub Pages | Branch `main`, deploy automático. |

**Por qué este stack:** reutiliza el patrón ya probado en las líneas INDUCCION-* (mismo frontend, mismo tipo de backend), corre en celular y PC sin instalación, es gratuito y no añade infraestructura nueva. Ver [DECISIONES.md](DECISIONES.md).

---

## 3. Flujo de datos (PRE y POST)

```
PRE  (antes del curso)
  1. Participante abre index.html → elige "PRE"
  2. Completa Sección 0 (identificación) + ítems + autopercepción
  3. evaluacion.html califica en el navegador
  4. Envía al backend: { modo:"pre", correo, respuestas, puntajes }
  5. Backend guarda fila en hoja "Respuestas"
  6. Participante ve SU puntaje por eje (SIN clave razonada)

POST (al cierre del curso)
  1. Participante abre index.html → elige "POST"
  2. Mismos ítems (sin Sección 0) + autopercepción
  3. evaluacion.html califica en el navegador
  4. Envía al backend: { modo:"post", correo, respuestas, puntajes }
  5. Backend guarda fila + empareja con el PRE del mismo correo
  6. Participante ve puntaje + mejora PRE→POST + CLAVE RAZONADA completa

FORMADOR
  - dashboard-formador.html consulta el backend (token)
  - Ve PRE vs POST por eje, deltas, alertas de ejes sin mejora y justificaciones
```

Regla clave de validez: **la clave razonada se revela solo en POST**, nunca en PRE (si se revelara en PRE, el POST dejaría de medir aprendizaje). Ver [MODELO-CALIFICACION.md](MODELO-CALIFICACION.md).

---

## 4. Estructura de la evaluación (Fase 1)

| Sección | Contenido | Cuenta para nota |
|---|---|---|
| 0 · Identificación | Nombre, correo, rama, experiencia (solo PRE) | No |
| A · Conceptos | 20 ítems en 4 bloques (3 ejes + transversal) | **Sí** |
| B · Casos | 2 casos de juicio pedagógico (opción + justificación) | Opción sí; justificación no |
| C · Autopercepción | 6 afirmaciones, escala 1–5 | No (se compara promedio) |

**Ejes y reparto de ítems:**
- Eje 1 · Principios educativos → ítems 1–7
- Eje 2 · El Método Scout → ítems 8–14
- Eje 3 · El Método en las ramas → ítems 15–19
- Transversal · Aprendizaje por la experiencia → ítem 20
- Sección B · Casos → ítems 21–22

Tipos de ítem: **opción única** (incluye "identificar la FALSA" y "juicio situacional"), **emparejar**, **caso** (opción + justificación), **escala** (autopercepción).

---

## 5. Estado por hito

| Hito | Entregable | Estado |
|---|---|---|
| 1 | Modelo JSON de la evaluación (`data/metodo-scout.json`) | ✅ Hecho |
| 2 | Motor de ítems + generador + prueba local | ✅ Hecho |
| 3 | Lógica PRE/POST e identificación por correo + envío | ✅ Hecho |
| 4 | Retroalimentación (por eje, nivel, clave en POST, delta PRE→POST) | ✅ Hecho |
| 5 | Backend (Sheet + Apps Script + JSONP) | ✅ Hecho y desplegado |
| 6 | Tablero del formador | ✅ Hecho |
| 7 | Pruebas (celular/PC) y despliegue GitHub Pages | ⬜ Pendiente |

Detalle en [ROADMAP.md](ROADMAP.md).

---

## 6. Cuentas y credenciales

| Recurso | Estado |
|---|---|
| Google Sheet "ASC Evaluaciones - Backend" | ✅ Creado (ver [BACKEND.md](BACKEND.md)) |
| Apps Script + Web App desplegada | ✅ Desplegada y autorizada |
| Tokens (`AUTH_TOKEN`, `ADMIN_TOKEN`) | ✅ Definidos (ver [BACKEND.md](BACKEND.md)) |
| Repositorio GitHub | ✅ https://github.com/maximoaluna-blip/EVALUACIONES-ASC |
| URL Producción (GitHub Pages) | ✅ https://maximoaluna-blip.github.io/EVALUACIONES-ASC/ |

IDs y URLs completos en [BACKEND.md](BACKEND.md). ⚠️ Antes de publicar el repo: mover tokens a Script Properties.

---

## 7. Convenciones del proyecto

- **Una evaluación = un JSON** en `data/`. Nunca se edita el HTML generado a mano.
- **El correo es la llave** de emparejamiento PRE↔POST. Debe ser el mismo en ambos.
- **La nota es 100% objetiva**: solo cuenta lo auto-calificable. Texto libre = evidencia.
- **La clave razonada solo se revela en POST.**
- Español de Colombia; terminología scout oficial de la ASC.
