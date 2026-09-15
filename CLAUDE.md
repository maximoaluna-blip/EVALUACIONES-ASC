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
3. **Triple compuerta de calidad**: auditoría doctrinal (`auditor-doctrinal-asc`, ver `docs/AUDITORIA-DOCTRINAL.md` y `docs/AUDITORIA-DOCTRINAL-V2.md`) + auditoría pedagógica (`auditor-pedagogico-asc`, ver `docs/AUDITORIA-PEDAGOGICA.md`: medir **sesgo de longitud** y solape enunciado→respuesta, no solo el nivel cognitivo nominal) + suite `PRUEBAS-E2E/` en verde. La suite corre en GitHub Actions en cada push/PR.
3-bis. **Los ítems no se cambian dentro de una cohorte** (D9): un cambio a mitad de cohorte rompe la comparabilidad PRE↔POST. Las versiones nuevas del instrumento (`data/<id>-v2.json`) se despliegan entre cohortes.
4. **Justificaciones de casos abiertos no puntúan** — son evidencia cualitativa, la nota es 100% objetiva (ver `docs/MODELO-CALIFICACION.md`).
5. **La clave razonada completa solo se revela en POST** — mostrarla en PRE invalidaría la medición.

## 4. Flujo para crear o actualizar una evaluación

1. Editar/crear la evaluación en `data/<id>.json` siguiendo `docs/MODELO-DATOS.md`.
2. Generar: `node generador/build-evaluacion.js <id>`.
3. Probar `evaluacion.html` en local (modo PRE y POST).
4. Auditoría doctrinal si hay contenido nuevo citando doctrina.
5. Verificar la suite `PRUEBAS-E2E/` en verde.
6. Commit + push a `main` → GitHub Pages redespliega (~1 min). Verificar en producción antes de anunciar "publicado".

## 5. Estado (14-sep-2026)

Fase 1 en producción/piloto (evaluación *Método Scout · Un Día*, 22 ítems + 6 de autopercepción, auditados doctrinalmente en junio, 0 críticos). Backend con `LockService`, consentimiento de datos (Ley 1581), certificado de calificación con delta PRE→POST. Suite E2E (23 tests) en CI.

**14-sep-2026 — auditoría pedagógica ejecutada (`docs/AUDITORIA-PEDAGOGICA.md`): REQUIERE MEJORA.** Sesgo de longitud en 18/19 ítems de opción; 6 hallazgos altos. El corrector pedagógico produjo **`data/metodo-scout-v2.json`** (`evaluacionId: metodo-scout-v2`, 22 ítems reescritos, sesgo 7/19, más un bloque `pendienteDoctrinal` con los ítems 7-bis y 23–26 propuestos), y el auditor doctrinal la revisó (`docs/AUDITORIA-DOCTRINAL-V2.md`, **APTA CON CORRECCIONES**, ya aplicadas). **La v1 sigue en producción sin tocar**; el hallazgo C1 de esa auditoría (ítem 7, definición de «coeducación» — niños y niñas educados **juntos con igualdad**, Modelo 2026 p. 90) afecta a la v1 publicada. **Decisiones pendientes del dueño:** reemplazar v1 por v2 entre cohortes, incorporar o no los ítems 23–26. Pendiente (Fase 2): generalizar a otros cursos, export del tablero, registro de tratamiento de datos. Detalle en `docs/ROADMAP.md`.
