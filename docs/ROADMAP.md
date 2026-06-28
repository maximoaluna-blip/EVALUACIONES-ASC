# Roadmap — EVALUACIONES-ASC

Plan de construcción por hitos. Fase 1 = curso *Método Scout (Un Día)* de punta a punta.

---

> **Estado al cierre (2026-06-27): Fase 1 COMPLETA y en producción; piloto lanzado.**
> App: https://maximoaluna-blip.github.io/EVALUACIONES-ASC/ · Sheet limpio (0 registros) listo para datos reales.

## Fase 1 — Evaluación Método Scout (✅ completa)

| Hito | Entregable | Depende de | Estado |
|---|---|---|---|
| 1 | **Modelo JSON** de la evaluación (`data/metodo-scout.json`), validado | — | ✅ Hecho |
| 2 | **Motor de ítems + generador**: render de los 4 tipos, calificación por eje, `evaluacion.html` probable en local | 1 | ✅ Hecho |
| 3 | **Lógica PRE/POST**: modo PRE (con Sección 0) vs POST, identificación por correo, envío al backend | 2 | ✅ Hecho (envío real verificado en navegador) |
| 4 | **Retroalimentación**: PRE = puntaje por eje; POST = puntaje + clave + nivel + **delta PRE→POST** | 2, 3, 5 | ✅ Hecho (delta vía JSONP verificado: PRE 59.1%→POST 100% ▲+40.9) |
| 5 | **Backend**: Sheet dedicado + Apps Script + persistencia + JSONP | 3 | ✅ Hecho (desplegado, autorizado, 4 envíos de prueba guardados) |
| 6 | **Tablero del formador**: PRE vs POST por eje, alertas, justificaciones | 5 | ✅ Hecho (`dashboard-formador.html`; pide ADMIN_TOKEN, verificado con datos reales) |
| 7 | **Seguridad y despliegue**: secretos fuera del repo, limpieza de pruebas, publicación en GitHub Pages | 4, 5, 6 | ✅ Hecho — en vivo en https://maximoaluna-blip.github.io/EVALUACIONES-ASC/ |

### Definición de "terminado" (Fase 1) — cumplida
- Una persona puede hacer el PRE en su celular, recibir su puntaje por eje, y luego el POST con su mejora y la clave. ✅
- El formador ve, en un tablero, la mejora del grupo por eje y las alertas. ✅
- Todo desplegado y probado en celular y PC. ✅

---

## Endurecimiento pre-piloto (✅ 2026-06-27)

| Ajuste | Estado |
|---|---|
| `LockService` en `doPost` (escrituras concurrentes seguras para una cohorte completa) | ✅ backend v5, probado en vivo |
| Consentimiento de datos obligatorio en PRE (Ley 1581 / Habeas Data) | ✅ + test e2e |
| UX de cierre: "Volver al inicio" + (POST) "Guardar/imprimir" con `@media print` | ✅ |
| Limpieza de filas de prueba (endpoint `purgar` por correo) | ✅ Sheet en 0 |
| Suite E2E ampliada a 23 pruebas (smoke, a11y AA, responsive, flujo PRE/POST, consentimiento) | ✅ verde local + CI |

## Calidad aplicada
- **Doctrinal:** ✅ auditada (0 críticos). Ver [AUDITORIA-DOCTRINAL.md](AUDITORIA-DOCTRINAL.md).
- **Operativa (E2E + a11y):** ✅ 23 tests en CI.
- **Pedagógica:** ⬜ pendiente/opcional — disponible el pipeline `/auditar-pedagogia` (calidad de ítems: comprensión/aplicación vs. memoria, distractores). Aún no ejecutado sobre esta evaluación.

---

## Fase 2 — Generalización (post Fase 1)
- Generador genérico para cualquier curso (cargar otro JSON sin tocar código).
- Portada que liste varias evaluaciones disponibles.
- Export del tablero del formador (PDF/CSV).
- Posible reutilización del PORTAL-ADMIN-ASC para ver evaluaciones junto con cursos.

## Fase 3 — Mejoras (futuro / a evaluar)
- Auditoría **pedagógica** de los ítems (`/auditar-pedagogia`).
- Rate limiting y anti-duplicados por correo.
- Reportes individuales en PDF para cada participante.
- Integración con la plataforma de cursos (lanzar la evaluación desde el curso).
- Subir las actions del workflow de Node 20 a `@v5` cuando salga (aviso de deprecación de GitHub).

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Cohorte enviando a la vez → escrituras chocan | ✅ `LockService` serializa las escrituras (backend v5). |
| Participante usa correos distintos en PRE y POST → no empareja | Nota visible en el campo correo; el tablero marca "incompletos". |
| Revelar clave en PRE invalida el POST | Bloqueado por diseño: `revelarClave.pre = false`. |
| Datos personales sin consentimiento | ✅ Casilla obligatoria de tratamiento de datos en PRE (Ley 1581). |
| Cambios en el backend rompen el frontend | Contrato de endpoints en [BACKEND.md](BACKEND.md) + suite E2E en CI. |
| Errores doctrinales en ítems/claves | ✅ Auditoría doctrinal previa (`auditor-doctrinal-asc`). |
| Variedad de dispositivos reales (Safari iOS / Android antiguos) | ⬜ No probado físicamente; primeros participantes en dispositivos diversos. |
