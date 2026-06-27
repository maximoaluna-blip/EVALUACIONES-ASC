# Modelo de calificación

Documento de referencia del **cómo se califica**. Es el modelo definitivo acordado para la Fase 1. Cualquier cambio aquí debe reflejarse en `engine.js` y en el backend.

---

## 1. Principio rector

> **La nota numérica es 100% objetiva y automática.** Solo cuenta lo que tiene una respuesta correcta inequívoca. El texto libre se guarda como evidencia, pero **no puntúa**. La autopercepción mide percepción, no conocimiento.

Esto garantiza que el % PRE y el % POST sean **directamente comparables** y que la mejora sea atribuible al curso, no a la subjetividad del corrector.

---

## 2. Calificación por tipo de ítem

| Tipo | Ítems (Fase 1) | Regla | Puntos |
|---|---|---|---|
| Opción única | 1,2,4,6,8,10,11,13,15,16,18,19,20 | Índice elegido = `respuesta` | 1 ó 0 |
| Identificar la FALSA | 3, 9 | Igual que opción única | 1 ó 0 |
| Juicio situacional | 14, 17 | Igual que opción única | 1 ó 0 |
| **Emparejar** | 5, 7, 12 | **Proporcional**: aciertos ÷ total de pares | 0 … 1 |
| Caso — opción | 21, 22 | Igual que opción única | 1 ó 0 |
| Caso — justificación | 21, 22 | Texto libre | **No puntúa** |
| Autopercepción (escala) | 6 afirmaciones | — | **No es nota** |

Ejemplo de emparejar: ítem 5 tiene 4 pares. Si la persona acierta 3, el ítem aporta **0.75**.

---

## 3. Cálculo por eje y total

```
puntos_eje      = Σ puntos de los ítems del eje
posibles_eje    = nº de ítems del eje      (cada ítem vale máximo 1, incl. emparejar)
%_eje           = puntos_eje / posibles_eje × 100

%_total         = Σ puntos de A y B / nº de ítems de A y B × 100
```

**Ejes y posibles (Fase 1):**

| Eje | Ítems | Posibles |
|---|---|---|
| Eje 1 · Principios educativos | 1–7 | 7 |
| Eje 2 · El Método Scout | 8–14 | 7 |
| Eje 3 · El Método en las ramas | 15–19 | 5 |
| Transversal · Aprendizaje por la experiencia | 20 | 1 |
| Sección B · Casos | 21–22 | 2 |
| **Total conocimiento (A + B)** | 1–22 | **22** |

> El umbral de 70% es **referencia informativa** para el participante; no bloquea ni reprueba. La métrica importante es la **mejora**, no el nivel absoluto.

---

## 4. Autopercepción (Sección C)

No se califica como conocimiento. Por cada afirmación:

```
promedio_afirmacion(PRE)   = valor 1–5 marcado en PRE
promedio_afirmacion(POST)  = valor 1–5 marcado en POST
delta_autopercepcion       = promedio(POST) − promedio(PRE)
```

A nivel de grupo, el formador ve el **promedio del grupo** por afirmación en PRE y POST.

---

## 5. Evidencia de aprendizaje (PRE → POST)

La señal central de la herramienta:

```
delta_eje    = %_eje(POST) − %_eje(PRE)
delta_total  = %_total(POST) − %_total(PRE)
```

Interpretación (según la propuesta de evaluación):

- **delta positivo claro en un eje** → ese bloque del curso logró su resultado.
- **eje sin mejora (delta ≈ 0 o negativo)** → señal de alerta: ese bloque necesita ajuste.

El emparejamiento PRE↔POST se hace **por correo electrónico**. Si una persona solo tiene PRE o solo POST, se reporta como "incompleto" y no entra en el cálculo de delta.

---

## 6. Qué ve cada quien

| Momento / rol | Puntaje | Mejora PRE→POST | Clave razonada | Justificaciones |
|---|---|---|---|---|
| Participante tras **PRE** | Sí (por eje) | — | **No** | — |
| Participante tras **POST** | Sí (por eje) | Sí | **Sí (completa)** | — |
| **Formador** (tablero) | Sí (grupo + individual) | Sí (por eje, con alertas) | Sí | Sí (lectura cualitativa) |

> Regla de validez: **la clave razonada NUNCA se muestra en PRE.** Si se mostrara, el participante llegaría al POST conociendo las respuestas y el POST dejaría de medir aprendizaje.

---

## 7. Decisiones de diseño relacionadas

- Mostrar clave completa al participante **solo en POST** → [DECISIONES.md #D2](DECISIONES.md).
- Justificaciones como evidencia, sin puntuar → [DECISIONES.md #D5](DECISIONES.md).
