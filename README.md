# EVALUACIONES-ASC — Plataforma de Evaluaciones Pre/Post

## Asociación Scouts de Colombia · Dirección Nacional de Adultos en el Movimiento

Aplicación web (celular y PC, sin instalación) para **generar y aplicar evaluaciones PRE y POST** a participantes de cursos de formación, **calificarlas automáticamente** y entregar **retroalimentación** al participante y al formador.

> **Estado:** 🚧 En construcción — Fase 1 (curso *Método Scout · Un Día*).
> **Fecha de inicio:** 2026-06-27.

---

## ¿Qué problema resuelve?

Hoy las evaluaciones de apropiación se aplican por Google Forms, que **no empareja PRE con POST**, no calcula la mejora por eje ni entrega retroalimentación automática. Esta plataforma:

1. Aplica la **misma evaluación antes (PRE) y después (POST)** del curso.
2. **Empareja** la respuesta de cada persona por su correo.
3. Califica automáticamente y calcula la **mejora PRE→POST por eje** (evidencia de aprendizaje).
4. Entrega **retroalimentación** al participante y un **tablero** al formador.

La distinción que mide esta herramienta es **APROPIACIÓN conceptual**, complementaria a la **VIVENCIA/participación** (que se mide con otros instrumentos, p. ej. el Pasaporte de Travesía).

---

## Arquitectura (resumen)

```
Participante  →  GitHub Pages (HTML estático)  →  Google Apps Script  →  Google Sheet
   (celular/PC)                                ←──  JSON responses   ←──   (dedicado)
```

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin frameworks). Responsive.
- **Fuente de verdad:** un archivo JSON por evaluación (`data/<id>.json`).
- **Generador:** Node.js (`generador/build-evaluacion.js`) — JSON → HTML.
- **Backend:** Google Apps Script + Google Sheet **dedicado** (separado de producción de cursos).

Detalle completo en [`docs/INDICE-PROYECTO.md`](docs/INDICE-PROYECTO.md).

---

## Estructura del repositorio

```
EVALUACIONES-ASC/
├── README.md                       ← Este archivo (entrada)
├── index.html                      ← Portada: elegir PRE o POST           [Hito 3]
├── evaluacion.html                 ← App de evaluación (generada)          [Hito 2-4]
├── dashboard-formador.html         ← Tablero PRE→POST por eje              [Hito 6]
│
├── data/
│   └── metodo-scout.json           ← Fuente de verdad de la evaluación     ✅
│
├── generador/
│   ├── build-evaluacion.js         ← JSON → evaluacion.html               [Hito 2]
│   ├── templates/
│   │   ├── engine.js               ← Motor: render + calificación         [Hito 2]
│   │   └── styles.css              ← Estilos scout responsive             [Hito 2]
│   └── backend-apps-script.template.js ← Código del backend (sin tokens)  ✅
│
├── assets/                         ← Logos, favicon, tema
│
└── docs/                           ← Documentación del proyecto
    ├── INDICE-PROYECTO.md          ← Índice maestro: arquitectura y estado ✅
    ├── MODELO-DATOS.md             ← Especificación del JSON de evaluación ✅
    ├── MODELO-CALIFICACION.md      ← Cómo se califica (modelo definitivo)  ✅
    ├── CREAR-EVALUACION.md         ← Guía para crear una evaluación nueva  ✅
    ├── BACKEND.md                  ← Backend: Sheet, Apps Script, deploy   ✅(esqueleto)
    ├── DECISIONES.md               ← Bitácora de decisiones (ADR)          ✅
    └── ROADMAP.md                  ← Hitos y fases                         ✅
```

---

## Inicio rápido (cuando el Hito 2 esté listo)

```bash
# 1. Editar la evaluación (fuente de verdad)
#    data/metodo-scout.json

# 2. Generar la app de evaluación
node generador/build-evaluacion.js metodo-scout

# 3. Abrir evaluacion.html en el navegador para probar (local)
```

---

## Documentación

| Documento | Para qué sirve |
|---|---|
| [`docs/INDICE-PROYECTO.md`](docs/INDICE-PROYECTO.md) | Arquitectura completa, estado, flujo de datos |
| [`docs/MODELO-DATOS.md`](docs/MODELO-DATOS.md) | Especificación del JSON (cada campo y tipo de ítem) |
| [`docs/MODELO-CALIFICACION.md`](docs/MODELO-CALIFICACION.md) | Reglas de calificación y comparación PRE→POST |
| [`docs/CREAR-EVALUACION.md`](docs/CREAR-EVALUACION.md) | Manual para crear/editar una evaluación |
| [`docs/BACKEND.md`](docs/BACKEND.md) | IDs, hojas del Sheet, despliegue del backend |
| [`docs/DECISIONES.md`](docs/DECISIONES.md) | Por qué se tomó cada decisión clave |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Hitos, fases y pendientes |
