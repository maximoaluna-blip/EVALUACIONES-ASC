# Roadmap — EVALUACIONES-ASC

Plan de construcción por hitos. Fase 1 = curso *Método Scout (Un Día)* de punta a punta.

---

## Fase 1 — Evaluación Método Scout (en curso)

| Hito | Entregable | Depende de | Estado |
|---|---|---|---|
| 1 | **Modelo JSON** de la evaluación (`data/metodo-scout.json`), validado | — | ✅ Hecho |
| 2 | **Motor de ítems + generador**: render de los 4 tipos, calificación por eje, `evaluacion.html` probable en local | 1 | ✅ Hecho |
| 3 | **Lógica PRE/POST**: modo PRE (con Sección 0) vs POST, identificación por correo, envío al backend | 2 | ✅ Hecho (envío real verificado en navegador) |
| 4 | **Retroalimentación**: PRE = puntaje por eje; POST = puntaje + clave + nivel + **delta PRE→POST** | 2, 3, 5 | ✅ Hecho (delta vía JSONP verificado: PRE 59.1%→POST 100% ▲+40.9) |
| 5 | **Backend**: Sheet dedicado + Apps Script + persistencia + JSONP | 3 | ✅ Hecho (desplegado, autorizado, 4 envíos de prueba guardados) |
| 6 | **Tablero del formador**: PRE vs POST por eje, alertas, justificaciones | 5 | ✅ Hecho (`dashboard-formador.html`; pide ADMIN_TOKEN, verificado con datos reales) |
| 7 | **Pruebas y despliegue**: verificación en celular/PC + publicación en GitHub Pages | 4, 5, 6 | ⬜ Pendiente (antes: mover tokens a Script Properties) |

### Definición de "terminado" (Fase 1)
- Una persona puede hacer el PRE en su celular, recibir su puntaje por eje, y luego el POST con su mejora y la clave.
- El formador ve, en un tablero, la mejora del grupo por eje y las alertas.
- Todo desplegado y probado en celular y PC.

---

## Hitos que NO dependen de la cuenta Google
Se pueden construir y mostrar en local sin desplegar nada: **2, 3, 4** (y la maqueta del 6). El backend (5) y el despliegue (7) requieren tu intervención.

---

## Fase 2 — Generalización (post Fase 1)
- Generador genérico para cualquier curso (cargar otro JSON sin tocar código).
- Portada que liste varias evaluaciones disponibles.
- Export del tablero del formador (PDF/CSV).
- Posible reutilización del PORTAL-ADMIN-ASC para ver evaluaciones junto con cursos.

## Fase 3 — Mejoras (futuro / a evaluar)
- Aviso y registro de tratamiento de datos personales.
- Rate limiting y anti-duplicados por correo.
- Reportes individuales en PDF para cada participante.
- Integración con la plataforma de cursos (lanzar la evaluación desde el curso).

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Participante usa correos distintos en PRE y POST → no empareja | Nota visible en el campo correo; el tablero marca "incompletos". |
| Revelar clave en PRE invalida el POST | Bloqueado por diseño: `revelarClave.pre = false`. |
| Cambios en el backend rompen el frontend | Contrato de endpoints documentado en [BACKEND.md](BACKEND.md); pruebas antes de publicar. |
| Errores doctrinales en ítems/claves | Revisión con el agente `auditor-doctrinal-asc` antes de publicar. |
