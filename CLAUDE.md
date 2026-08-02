# CLAUDE.md — Evaluaciones ASC (app de evaluación PRE/POST)

> Contexto operativo de **este repo**. Forma parte del ecosistema `APP PARA APRENDIZAJE` — documentos rectores compartidos (stack general, terminología, ADRs) viven en el repo raíz **`DOCS-MAESTRAS-ASC`** (`CLAUDE.md`, `ECOSISTEMA.md`, `DECISIONES.md`, `GLOSARIO-ASC.md`).
> **Dueño:** Máximo Aluna (`maximoaluna@gmail.com`, GitHub `maximoaluna-blip`). **Idioma:** español neutro colombiano.

## 1. Qué es

App complementaria de **evaluación PRE/POST** de cursos de formación ASC: aplica la misma evaluación antes y después del curso, empareja las respuestas por correo, califica automáticamente y mide la **mejora PRE→POST por eje**. Mide **apropiación conceptual** — es distinto de la vivencia/participación (otros instrumentos, p. ej. el Pasaporte de Travesía) y **no certifica** ni reemplaza la evaluación 360° formal. En vivo: https://maximoaluna-blip.github.io/EVALUACIONES-ASC/

## 2. Arquitectura (resumen; detalle en `docs/INDICE-PROYECTO.md`)

- HTML5 + CSS3 + JS vanilla, sin frameworks. Responsive (celular/PC).
- **Fuente de verdad = `data/<id>.json`** por evaluación. Generador `generador/build-evaluacion.js` (Node) — JSON → HTML.
- **Backend propio**: Google Apps Script + Google Sheet **dedicado**, separado del backend compartido de las 3 líneas de cursos (Adultos/DI/PJ). Tokens y credenciales viven en `docs/CREDENCIALES-PRIVADAS.md` (gitignored) — nunca los pongas en este archivo ni en commits.
- Motor de calificación propio (`generador/templates/engine.js`) — no reutiliza el `engine.js` de las líneas de cursos, porque el modelo de datos (ítems PRE/POST, emparejamiento, comparación por eje) es distinto.

## 3. Reglas no negociables

1. **No confundir con certificación**: esta app mide apropiación conceptual antes/después, no otorga certificados `ASC-AAAA-XXXXX`. Si un curso necesita certificar, eso vive en su línea (Adultos/DI/PJ), no aquí.
2. **Backend separado a propósito**: no fusionar el Sheet/Apps Script de esta app con el de las líneas de cursos, aunque comparta el mismo dueño de Google Workspace — evita que un bug en una evaluación afecte registros de certificación.
3. **Doble compuerta de calidad**: auditoría doctrinal (`auditor-doctrinal-asc`, ver `docs/AUDITORIA-DOCTRINAL.md`) + suite `PRUEBAS-E2E/` en verde. Corre en GitHub Actions en cada push/PR.
4. **Justificaciones de casos abiertos no puntúan** — son evidencia cualitativa, la nota es 100% objetiva (ver `docs/MODELO-CALIFICACION.md`).
5. **La clave razonada completa solo se revela en POST** — mostrarla en PRE invalidaría la medición.

## 4. Flujo para crear o actualizar una evaluación

1. Editar/crear la evaluación en `data/<id>.json` siguiendo `docs/MODELO-DATOS.md`.
2. Generar: `node generador/build-evaluacion.js <id>`.
3. Probar `evaluacion.html` en local (modo PRE y POST).
4. Auditoría doctrinal si hay contenido nuevo citando doctrina.
5. Verificar la suite `PRUEBAS-E2E/` en verde.
6. Commit + push a `main` → GitHub Pages redespliega (~1 min). Verificar en producción antes de anunciar "publicado".

## 5. Estado (12-jul-2026)

Fase 1 en producción/piloto (evaluación *Método Scout · Un Día*, 28 ítems auditados doctrinalmente, 0 críticos). Backend con `LockService`, consentimiento de datos (Ley 1581), certificado de calificación con delta PRE→POST. Suite E2E (23 tests) en CI. Pendiente (Fase 2): generalizar a otros cursos, export del tablero, registro de tratamiento de datos. Detalle completo y siempre actualizado en `docs/ROADMAP.md`.
