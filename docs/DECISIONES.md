# Bitácora de decisiones (ADR)

Registro de las decisiones de diseño importantes y **por qué** se tomaron. Formato ligero tipo ADR (Architecture Decision Record).

---

## D1 · Reutilizar el stack existente (HTML estático + Apps Script + Sheets)
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** Se necesita una app que corra en celular y PC para aplicar evaluaciones.
**Decisión:** Reutilizar el patrón ya probado en las líneas INDUCCION-* en vez de introducir un framework o backend nuevo.
**Por qué:** Corre en cualquier dispositivo sin instalación, es gratis, no añade infraestructura, y el equipo ya lo mantiene.
**Consecuencias:** Frontend en JS vanilla; backend en Google Apps Script; base de datos en Google Sheets.

---

## D2 · El participante ve la clave razonada completa, pero solo en POST
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** La propuesta original dice "el formulario NO muestra las respuestas". El usuario pidió que el participante sí vea las respuestas correctas al final.
**Decisión:** Revelar la clave razonada completa **únicamente al terminar el POST**. En el PRE, el participante solo ve su puntaje por eje.
**Por qué:** Si la clave se mostrara tras el PRE, la persona llegaría al POST conociéndola y el POST dejaría de medir aprendizaje. Revelarla solo en POST satisface el deseo didáctico sin romper la validez de la medición.
**Consecuencias:** `config.revelarClave = { pre: false, post: true }`. La lógica del engine condiciona el render de la clave al modo.

---

## D3 · Repositorio propio `EVALUACIONES-ASC`
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** ¿Integrar las evaluaciones a un curso existente o tener proyecto propio?
**Decisión:** Repositorio y GitHub Pages propios, independientes de los cursos.
**Por qué:** Las evaluaciones son transversales a muchos cursos; un proyecto propio evita acoplarlas a un curso concreto y las hace reutilizables.
**Consecuencias:** Nuevo repo a crear en GitHub; landing y despliegue propios.

---

## D4 · Google Sheet dedicado para las evaluaciones
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** ¿Guardar respuestas en el Sheet de producción de cursos o en uno nuevo?
**Decisión:** Google Sheet + Apps Script **dedicados** a evaluaciones.
**Por qué:** No mezclar datos de evaluaciones con registros/certificados de producción; facilita el análisis y borrar datos de prueba sin riesgo para producción.
**Consecuencias:** Crear un Sheet y un deployment nuevos (Hito 5). IDs en [BACKEND.md](BACKEND.md).

---

## D5 · Las justificaciones en texto libre no puntúan
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** Los casos B-1 y B-2 piden "justifica en una frase". Eso requeriría interpretación humana.
**Decisión:** La justificación se guarda como **evidencia cualitativa** y se muestra al formador, pero **no afecta la nota**. Lo que puntúa es la opción elegida.
**Por qué:** La propia clave de la propuesta califica B-1/B-2 por su letra (`b`/`b`), no por la redacción. Así la nota queda objetiva y PRE↔POST comparable, sin trabajo manual de corrección.
**Consecuencias:** `justificacion.puntua = false`. Se evaluó usar IA para valorar el texto y se descartó por añadir complejidad y dependencia externa.

---

## D6 · Alcance de la Fase 1: solo el curso Método Scout
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** ¿Construir primero un generador genérico o resolver un caso completo?
**Decisión:** Entregar de punta a punta la evaluación del curso *Método Scout (Un Día)* antes de generalizar.
**Por qué:** Tener algo funcionando y validado pronto reduce riesgo; el JSON ya está diseñado para generalizarse después sin reescribir.
**Consecuencias:** El generador se construye orientado a este caso, pero con el JSON como contrato para futuras evaluaciones.

---

## D7 · `LockService` para escrituras concurrentes
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** Una cohorte que cierra el curso puede enviar el POST casi a la vez; sin control, dos `appendRow` simultáneos pueden chocar.
**Decisión:** Envolver la escritura de `doPost` en `LockService.getScriptLock()` (espera hasta 20 s).
**Por qué:** Es la práctica recomendada de Apps Script para escrituras concurrentes en un Sheet; elimina el riesgo de pérdida/corrupción de filas sin infraestructura extra.
**Consecuencias:** Backend v5. Cada envío espera su turno; imperceptible para el usuario.

---

## D8 · Consentimiento de datos obligatorio en PRE
**Fecha:** 2026-06-27 · **Estado:** Aceptada

**Contexto:** Se recogen datos personales (nombre, correo, rama, experiencia) y la Ley 1581 de 2012 (Habeas Data) exige autorización informada.
**Decisión:** Casilla obligatoria en el PRE (donde se recogen los datos) con texto de tratamiento; sin marcarla no se envía. Vive en el JSON (`consentimiento`).
**Por qué:** Cumplimiento legal mínimo + transparencia con el participante. Se exige solo en PRE porque es donde se capturan los datos.
**Consecuencias:** Render + validación en el engine; cubierto por una prueba E2E.

---

## Plantilla para nuevas decisiones

```
## D# · Título corto
**Fecha:** AAAA-MM-DD · **Estado:** Propuesta | Aceptada | Reemplazada por D#

**Contexto:** …
**Decisión:** …
**Por qué:** …
**Consecuencias:** …
```
