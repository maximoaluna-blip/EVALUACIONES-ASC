# Auditoría pedagógica — Evaluación PRE/POST *Método Scout (Un Día)*

> **Fecha:** 14-sep-2026 · **Auditor:** `auditor-pedagogico-asc` (informe íntegro, sin edición) · **Veredicto: REQUIERE MEJORA** · **Estado de las correcciones:** ninguna aplicada al instrumento vivo — ver §B6 y `DECISIONES.md`. Las reescrituras se preparan como **v2 en archivo aparte** (`data/metodo-scout-v2.json`), pendiente de auditoría doctrinal y de decisión del dueño sobre el cambio de cohorte.
>
> Es la tercera auditoría de la app (doctrinal ✅ `AUDITORIA-DOCTRINAL.md`, funcional ✅ `PRUEBAS-E2E/`). Se pidió con el brief de adaptar las dimensiones D1–D9 del auditor al formato de evaluación PRE/POST, no de curso.

**Insumos leídos:** `data/metodo-scout.json` (fuente de verdad) · `generador/templates/engine.js` y `generador/build-evaluacion.js` (lo que el motor muestra y valida) · `index.html` y `dashboard-formador.html` · `docs/MODELO-CALIFICACION.md`, `docs/CREAR-EVALUACION.md`, `docs/MODELO-DATOS.md`, `docs/DECISIONES.md`, `docs/AUDITORIA-DOCTRINAL.md`, `docs/ROADMAP.md`, `docs/INDICE-PROYECTO.md`.
**Rúbrica:** `PORTAL-ADULTOS-ASC/MARCO-METODOLOGICO-PEDAGOGICO.md` §2.4, §2.5 (5 reglas medibles), §8.1, §8.3, §8.5-bis · `CHECKLIST-CALIDAD-CURSO.md` §A, §A-bis, §B · `GLOSARIO-ASC.md` §E-bis · reglas propias de la app (nota 100 % objetiva; clave solo en POST; delta por eje). Referencia de lo que el ecosistema enseña sobre el Método: `INDUCCION-PROGRAMA-JOVENES/01-Diseno-Cursos/Curso-04-El-Metodo-Scout-y-sus-8-Elementos.md`.
**Medición ejecutada:** script de sesgo de longitud + solape enunciado→respuesta correcta sobre los 19 ítems de opción.

Adaptación de las dimensiones: D2 (hook), D5 (microlearning) y D6 (anti-definición) no aplican a un instrumento de evaluación. D1 se desdobla en calidad de ítem + validez PRE→POST; D3 se lee como "casos" y "justificación"; D7 como autopercepción; D8 como cobertura por eje; D9 como coherencia entre lo que promete el instrumento ("comprensión, no memorización") y lo que el motor muestra.

---

## Veredicto pedagógico

**REQUIERE MEJORA** — el instrumento es doctrinalmente correcto y los escenarios son reconocibles, pero **tal como está, se puede aprobar sin saber**: la opción correcta es la más larga en **18 de 19** ítems de opción (95 %; la regla del marco tolera hasta 50 %), varias respuestas traen la clave adentro entre paréntesis, y seis afirmaciones de autopercepción —que se muestran en el mismo formulario del PRE— le dictan al participante la respuesta de los ítems 8, 9, 16 y 19. El efecto combinado es un **PRE inflado** que comprime el delta PRE→POST, que es justamente la señal para la que existe la app (MODELO-CALIFICACION §1 y §5).

Como el piloto ya corrió, la corrección debe aplicarse **entre cohortes, no dentro de una** (ver B6): cambiar ítems a mitad de una cohorte rompe la comparabilidad PRE↔POST.

**Resumen numérico:**
- Nivel cognitivo nominal: 5 APLICACIÓN (23 %) · 12 COMPRENSIÓN (55 %) · 5 RECALL (23 %). Nominalmente 77 % comprensión/aplicación, **pero el nivel efectivo baja** porque en 12 ítems la correcta se reconoce por pista (longitud, eco del enunciado, paréntesis explicativo o par excluyente) sin usar el concepto.
- Sesgo de longitud: 18/19 (95 %). En 12/19 la correcta es ≥ 50 % más larga que cualquier otra opción (ratios hasta 2,7×).
- Solape enunciado→correcta: bajo en general (jaccard ≤ 0,27); el problema no es copia del enunciado sino **longitud y clave incrustada**.
- Hallazgos: **6 altos · 7 medios · 6 bajos**.

---

## D1 · Tabla de ítems

Sesgo = longitud de la correcta ÷ la más larga de las otras (>1 = la correcta es la más larga). "Pista" = qué delata la correcta sin saber el concepto.

| Ítem · eje · tipo | Nivel cognitivo | Sesgo / pista | Distractores | Veredicto |
|---|---|---|---|---|
| 1 · eje1 · opción | COMPRENSIÓN (distinguir) | **1,97×** · la correcta repite las 3 palabras del enunciado (educar/instruir/recrear) | 2 buenos (técnicas, reconocimientos), 1 flojo (aire libre) | Reescribir (H1, M2) |
| 2 · eje1 · opción | **RECALL** (eslogan) | 1,00× (sin sesgo) | plausibles pero es memoria de frase | Reescribir a escenario (M3) |
| 3 · eje1 · FALSA | COMPRENSIÓN | 1,19× · **par mutuamente excluyente** (c contradice d): se acierta por lógica interna | — | Reescribir (M1) |
| 4 · eje1 · opción | COMPRENSIÓN | **1,86×** | 2 buenos (reglamento, prohibiciones), 1 aceptable | Balancear (H1) |
| 5 · eje1 · emparejar | **RECALL** (vocabulario) | B de 29–45 chars; "vivir juntos"→"convivir" es léxico | — | Reescribir a escenas (M3, B2) |
| 6 · eje1 · opción | COMPRENSIÓN (definición) | 1,27× | 3 aceptables | Convertir a escenario (H1) |
| 7 · eje1 · emparejar | **RECALL** (definición) | 3 pares: sabiendo 2, el 3.º cae por eliminación (proporcional da 1,0) | — | Reescribir a escenas (M3, B4) |
| 8 · eje2 · opción | **RECALL** (definición de libro) | **1,71×** · además la autopercepción #3 dice "sistema cohesivo, no lista de actividades" | buenos (actividades, Promesa, insignias) | Reescribir (H1, H2, M3) |
| 9 · eje2 · FALSA | COMPRENSIÓN | 1,00× · **par excluyente** (a vs b) + la opción d confirma el ítem 8 | — | Reescribir (M1, M6) |
| 10 · eje2 · opción | COMPRENSIÓN (describir→nombrar) | **2,13×** · paréntesis "(facilitar sin protagonizar)" = clave adentro | 3 etiquetas sueltas, ninguna plausible | Reescribir (H5) |
| 11 · eje2 · opción | COMPRENSIÓN (describir→nombrar) | 0,96× (única sin sesgo) | etiquetas sueltas | Aceptable; pulir (B1) |
| 12 · eje2 · emparejar | COMPRENSIÓN nominal | **"comunidad"↔"comunidad"**, "cooperativo"↔"equipos"; la 4.ª cae por eliminación | — | Reescribir (H3) |
| 13 · eje2 · opción | COMPRENSIÓN/aplicación-lite | **1,80×** | 1 muy bueno (sobreexplicar), 2 aceptables | Balancear (H1) |
| 14 · eje2 · juicio | **APLICACIÓN** | **2,49×** · paréntesis "(al protagonizar, impide el descubrimiento)" = clave adentro | 1 absurdo (Promesa y Ley), 2 flojos | Reescribir (H5) |
| 15 · eje3 · opción | COMPRENSIÓN | **2,71×** · la correcta trae la lista de unidades | 2 buenos (sinónimos, invertida), 1 absurdo (uniforme/lema) | Reescribir (H1) |
| 16 · eje3 · opción | COMPRENSIÓN | **2,65×** · la correcta enumera 5 cosas; la autopercepción #6 enumera 3 de ellas | 2 buenos, 1 absurdo | Reescribir (H1, H2) |
| 17 · eje3 · juicio | **APLICACIÓN** | 1,19× | **muy buenos** (estilo Manada, dirigir, retos físicos) | Balancear longitud; conservar |
| 18 · eje3 · juicio | **APLICACIÓN** | **1,82×** | buenos (cross-rama) | Balancear (H1, B2) |
| 19 · eje3 · opción | COMPRENSIÓN/opinión ("lo MÁS importante") | **1,72×** · autopercepción #5 casi calca la correcta | flojos | Reescribir (M7, H2) |
| 20 · transv. · opción | RECALL/tautología ("mirar/reflexionar sirve para… reflexionar") | **2,63×** | 1 bueno (pasar rápido), 2 flojos | Reescribir (M2, H6) |
| 21 · casos · caso | **APLICACIÓN** | 1,49× · enunciado con juicio incorporado ("silencio absoluto") | 1 bueno (idea vieja), 2 absurdos (posponer, examen) | Reescribir (H4) |
| 22 · casos · caso | **APLICACIÓN** | **2,00×** · comillas irónicas en "para que quede mejor"; la correcta trae su justificación | 1 bueno (garantizar calidad), 2 absurdos ("solo marco simbólico", "solo naturaleza") | Reescribir (H4) |

---

## Hallazgos

### ALTOS (debilitan la medición; corregir antes de la siguiente cohorte)

**H1 · Sesgo de longitud en 18/19 ítems de opción** · D1
- Problema: quien marque siempre la opción más larga obtiene ~95 % en A+B sin haber leído. El barajado (`engine.js` l.144) neutraliza la posición, no la longitud. En un PRE/POST esto es peor que en un quiz de lección: infla el PRE y borra el delta que la app promete medir.
- Regla: marco §2.5 regla 2 y CHECKLIST §A-bis ("la correcta no es la más larga en más de la mitad"); memoria del proyecto "medir longitud, no posición".
- Evidencia: ratios 1,97 (ít.1), 1,86 (4), 1,71 (8), 2,13 (10), 1,80 (13), 2,49 (14), 2,71 (15), 2,65 (16), 1,82 (18), 1,72 (19), 2,63 (20), 2,00 (22).
- Reescritura: ver "Reescrituras por ítem" — en cada propuesta las cuatro opciones quedan dentro de ±15 % de longitud. Además conviene que `build-evaluacion.js` **avise** cuando la correcta sea la más larga en >50 % de los ítems (paridad con el build de las líneas; es decisión de motor, se anota sin proponer código).

**H2 · La Sección C (autopercepción) filtra respuestas dentro del mismo PRE** · D1/D7 (validez)
- Problema: las 6 afirmaciones se renderizan en la misma página que los ítems (`engine.js` l.82–93: ejes primero, luego autopercepción; el participante puede volver arriba antes de enviar). Cuatro de ellas contienen la respuesta o su vocabulario exacto:
  - #3 *"Entiendo el Método como un **sistema cohesivo, no como una lista de actividades**"* → ítem 8 (correcta: "todo **cohesivo**"; distractor a: "conjunto de **actividades**") e ítem 9.
  - #5 *"Comprendo cómo **piensa y aprende el NNAJ** de la rama"* → ítem 19 (correcta: "cómo **piensa, siente y vive el NNAJ**").
  - #6 *"Sé adaptar una misma actividad a la edad (**lenguaje, autonomía, desafío**)"* → ítem 16 (correcta enumera "**lenguaje, autonomía**, … **desafío**").
  - #1 *"Comprendo por qué **la educación es el corazón de la Misión**"* → ítem 2 (correcta: "La educación de los jóvenes").
- Regla: es el mismo principio de DECISIONES D2 y MODELO-CALIFICACION §6 ("la clave razonada NUNCA se muestra en PRE"): aquí se muestra por la puerta de atrás. Además #1 y #3 son afirmaciones **inducidas** (dan por cierta la doctrina; quien discrepa no puede responder) y #2 es doble ("distingo… **y lo aplico**").
- Reescritura (mismo orden, misma escala 1–5, redacción neutra y sin vocabulario de las respuestas):
  1. "Puedo explicar con mis palabras cuál es el centro de la Misión del Movimiento Scout."
  2. "Distingo con claridad educar de instruir y de recrear."
  3. "Puedo explicar con mis palabras qué es el Método Scout."
  4. "Puedo decir qué le aporta cada elemento del Método a los jóvenes de mi unidad."
  5. "Conozco bien cómo aprenden los niños, niñas o jóvenes de la edad de mi unidad."
  6. "Me siento capaz de llevar una misma actividad a otra rama sin que pierda sentido."
- Alternativa de motor (decisión humana): mostrar la Sección C solo después de enviar A+B. La reescritura sola ya cierra la fuga.

**H3 · Ítem 12 (emparejar "alta") se resuelve por coincidencia de palabras** · D1
- Problema: "conexión con la vida real y la **comunidad**" → "participación en la **comunidad**"; "aprendizaje **cooperativo**" → "sistema de **equipos**"; el cuarto par cae por eliminación. Es el único emparejar marcado "alta" y es el más fácil de adivinar.
- Regla: marco §2.5 regla 4 ("plantea un escenario, no pide recitar"); CHECKLIST §A-bis.
- Reescritura (columna A pasa a escenas; columna B queda con etiquetas cortas y parejas, sin pista de longitud):
  - columnaA: 1 "La patrulla se reparte tareas y monta sola el campamento" · 2 "Los lobatos entran a la Selva y el relato 'los agarra' desde el primer minuto" · 3 "La Comunidad detecta un problema del barrio y decide actuar sobre él" · 4 "Cada scout escoge su siguiente reto según lo que ya logró"
  - columnaB: A "marco simbólico y naturaleza" · B "sistema de equipos" · C "participación en la comunidad" · D "progresión personal"
  - respuesta: {"1":"B","2":"A","3":"C","4":"D"}
  - clave: "Cada escena tiene varios elementos, pero uno predomina: la patrulla que se organiza sola es el sistema de equipos; el relato que atrapa es el marco simbólico (con la naturaleza como escenario); actuar sobre un problema real del barrio es participación en la comunidad; elegir el reto según lo logrado es progresión personal. Si emparejaste por la palabra que se repetía y no por la escena, este ítem te lo mostró."

**H4 · Casos B (21 y 22): no discriminan grados de juicio** · D3
- Problema: de tres distractores, dos son absurdos ("reemplazar el relato por un examen escrito", "solo la naturaleza"); el enunciado ya trae el veredicto ("exige **silencio absoluto**", *"para que quede mejor"* entre comillas irónicas); y la opción correcta lleva su propia justificación ("debió acompañar y preguntar, no decidir por ellos"), de modo que la justificación escrita que se pide después ya está redactada. Un caso debe separar al que aplica bien el apoyo del adulto del que lo aplica a medias, no al que lee del que no lee.
- Regla: marco §2.5 ("pequeños escenarios") y §8.1 punto 5 (orientación al problema); CHECKLIST §A ("un distractor con la idea vieja") — aquí falta el distractor de **la mejora parcial**, que es la confusión real de un adulto formado a medias.
- Reescritura ítem 21:
  - enunciado: "En una Manada (7 a 10 años), un dirigente dedica 20 minutos a explicar los valores de la Ley, de pie frente a los lobatos, y les pide atención completa. Varios se distraen. Te pide consejo. ¿Qué le recomiendas?"
  - opciones: 0 "Mantener la charla pero bajarla a 10 minutos y cerrar con preguntas para verificar que entendieron." · 1 "Meter el valor en un juego o en un relato de la Selva, donde lo vivan sin que nadie se lo explique." · 2 "Dejar los valores para cuando estén en Tropa; a esta edad basta con que jueguen y se diviertan." · 3 "Pedir más silencio y repetir la explicación: si no aprenden a escuchar ahora, no lo harán después."
  - respuesta: 1
  - clave: "En Manada el valor se vive en juego y relato, no se explica: así aprende un niño de 7 a 10. Acortar la charla (a) alivia el síntoma, pero sigue siendo instrucción; posponer los valores (c) confunde 'no explicar' con 'no educar'; exigir silencio (d) es educar desde el temor."
- Reescritura ítem 22:
  - enunciado: "Un equipo de Nómadas Scout (15 a 17 años) presenta un proyecto con fallas claras de planeación. El adulto lo reescribe completo antes de la siguiente reunión y se los devuelve listo. ¿Qué le dirías?"
  - opciones: 0 "Que hizo bien: el adulto responde por la calidad y la seguridad, y el equipo aprende del ejemplo." · 1 "Que debió devolverlo con preguntas, para que ellos vieran las fallas y decidieran cómo corregirlas." · 2 "Que bastaba con marcar las fallas en rojo y dejar que ellos pasaran en limpio la corrección." · 3 "Que lo importante es que el proyecto salga; si el equipo lo ejecuta, la autonomía queda a salvo."
  - respuesta: 1
  - clave: "A los 15–17 el joven decide y el adulto acompaña con preguntas: reescribir por ellos anula el apoyo del adulto y la autonomía de la edad. Marcar en rojo (c) sigue decidiendo por ellos, solo que en más pasos; 'que lo ejecuten' (d) confunde autonomía con obediencia; la seguridad (a) se cuida sin quitarles la decisión."
  - Nota: la etiqueta de la justificación ("Justifica tu elección en una frase") queda bien; con estas opciones la frase ya no viene escrita en la opción.

**H5 · Ítems 10 y 14: la clave está dentro de la opción correcta** · D1 (validez)
- Problema: "el apoyo del adulto **(facilitar sin protagonizar)**" y "el aprender haciendo y el apoyo del adulto **(al protagonizar, impide el descubrimiento)**" son la `clave` recortada. Es la clave razonada mostrada en PRE, que la app prohíbe (MODELO-CALIFICACION §6). En el 14, además, la única opción con paréntesis es la correcta.
- Reescritura ítem 10:
  - enunciado: "En la planeación del campamento, Juliana (dirigente) hace preguntas, consigue el mapa y el permiso, pero deja que la patrulla decida la ruta y el menú. ¿Qué elemento del Método está encarnando Juliana, sobre todo?"
  - opciones: 0 "El apoyo del adulto." · 1 "El aprender haciendo." · 2 "La progresión personal." · 3 "La participación en la comunidad."
  - respuesta: 0
  - clave: "Juliana facilita sin protagonizar: crea condiciones (mapa, permiso, preguntas) y no decide por la patrulla; eso es apoyo del adulto. La patrulla, sí, aprende haciendo —por eso esa opción tienta—, pero la pregunta es por el papel de Juliana. Si ella fijara ruta y menú 'para que salga bien', anularía el elemento."
- Reescritura ítem 14:
  - enunciado: sin cambio ("Para 'ahorrar tiempo', un dirigente enseña él mismo cada nudo paso a paso y corrige a cada participante. ¿Qué está debilitando, sobre todo?")
  - opciones: 0 "La progresión personal y el sistema de equipos." · 1 "El aprender haciendo y el apoyo del adulto." · 2 "La Promesa y la Ley, y el marco simbólico." · 3 "La naturaleza y la participación en la comunidad."
  - respuesta: 1
  - clave: "Al enseñar de frente y corregir a todos, el adulto protagoniza: el joven no descubre (aprender haciendo) y el adulto pasa de facilitar a dirigir (apoyo del adulto). Roza también el sistema de equipos —el guía podría enseñar a su patrulla—, pero lo primero que se rompe es el descubrimiento."

**H6 · Eje "Transversal" con un solo ítem: delta binario y feedback sobredimensionado** · D1/D9
- Problema: el eje se reporta con % propio, delta y etiqueta ("Dominado"/"Conviene repasar", `engine.js` l.486–490) y el tablero alerta "ejes sin mejora" (`dashboard-formador.html` l.182). Con un ítem, el % solo puede ser 0 o 100 y el delta −100/0/+100: una persona que falló por distracción queda como "Conviene repasar" y un eje entero del curso queda marcado "sin mejora" por una pregunta.
- Regla: marco §2.4 ("con una sola pregunta el umbral se vuelve binario y deja de discriminar"); MODELO-CALIFICACION §5 interpreta el delta por eje como señal del bloque del curso — con n=1 esa señal es ruido.
- Reescritura: llevar el eje a 3 ítems (el 20 reescrito en M2 + los dos siguientes), o fundirlo en el eje 2 y dejar de reportarlo por separado (decisión humana).
  - Nuevo ítem 23 (transversal, opcion_unica, media): enunciado "Al cierre del campamento, ¿cuál de estas preguntas del dirigente ayuda MÁS a convertir lo vivido en aprendizaje?" · opciones: 0 "¿Qué patrulla ganó el rally y con cuántos puntos?" · 1 "¿Qué harían distinto si repitiéramos la caminata mañana?" · 2 "¿Ya empacaron todos la carpa y revisaron el terreno?" · 3 "¿Les gustó el campamento? Levanten la mano." · respuesta 1 · clave "Mirar la experiencia es preguntar por lo que pasó y por lo que se haría distinto: eso abre el aprendizaje. Los puntos (a) miden, no enseñan; el empaque (c) es logística; '¿les gustó?' (d) toca la emoción pero no la convierte en aprendizaje."
  - Nuevo ítem 24 (transversal, juicio_situacional, alta): enunciado "Un dirigente de Tropa dice: 'Yo no hago evaluación con los scouts; con vivirlo aprenden'. ¿Qué le falta a su forma de trabajar?" · opciones: 0 "Nada: en el escultismo la experiencia educa por sí sola." · 1 "El momento de mirar juntos lo vivido antes de pasar a lo siguiente." · 2 "Un examen corto al final de cada actividad para verificar." · 3 "Que el adulto explique al inicio qué deben aprender." · respuesta 1 · clave "Vivir sin mirar deja el aprendizaje al azar; el ciclo se cierra cuando el grupo nombra lo que sintió, lo que salió bien y lo que cambiaría. No hace falta examen (c) ni explicación previa (d): hace falta la reflexión después."

### MEDIOS (mejora deseable)

**M1 · Ítems 3 y 9 ("identificar la FALSA"): el par mutuamente excluyente delata la falsa** · D1
- Problema: en el 3, la c ("la realización individual es el fin último, sin aporte") niega a la d ("articula ambas"); en el 9, la b ("uno es superior") niega a la a ("igualmente importantes"). Basta ver que dos opciones se contradicen para saber que la falsa es una de ellas; como la otra es "positiva", se acierta sin doctrina. Regla: CHECKLIST §A ("distractor con la idea vieja") — la falsa debe ser una **media verdad creíble**, no la única frase negativa.
- Reescritura ítem 3: enunciado sin cambio · opciones: 0 "Busca que cada persona se realice plenamente como individuo, según sus capacidades." · 1 "Busca que cada persona asuma un papel constructivo y activo en la sociedad." · 2 "Se cumple cuando el joven completa su progresión y recibe la insignia máxima de su rama." · 3 "Realización personal y compromiso con la comunidad se buscan a la vez, no por turnos." · respuesta 2 · clave "FALSA la c: la Misión no se 'cumple' con una insignia; es un horizonte que articula realización personal y papel constructivo en la sociedad. Las insignias reconocen pasos en ese camino, no lo agotan."
- Reescritura ítem 9: enunciado sin cambio · opciones: 0 "Sus ocho elementos son igualmente importantes; ninguno manda sobre los otros." · 1 "Cada rama prioriza los elementos que le sirven y deja los demás para ramas mayores." · 2 "Se aplican combinados y equilibrados a lo largo del tiempo, no todos en cada actividad." · 3 "Usar solo dos o tres elementos sueltos, aunque bien hechos, no es aplicar el Método." · respuesta 1 · clave "FALSA la b: los ocho elementos permanecen en todas las ramas; lo que cambia es cómo se viven. Ninguna rama 'guarda' elementos para después. Sí es cierto que no todos aparecen con igual intensidad en cada actividad: el equilibrio se mira en el tiempo."

**M2 · Ítems 1 y 20: la correcta repite el enunciado** · D1
- Problema: en el 1 la correcta es la única que contiene las tres palabras del enunciado (educar, instruir, recrear); en el 20 el enunciado dice "el momento de mirar/**reflexionar** sirve para…" y la correcta empieza "**reflexionar** sobre lo vivido" (tautología). Regla: marco §2.5 regla 5 (correcta no calcada).
- Reescritura ítem 1: enunciado "En la reunión de dirigentes, cuatro personas cuentan qué hacen los sábados. ¿Cuál de ellas está EDUCANDO en el sentido scout?" · opciones: 0 "Camilo: 'les enseño nudos, primeros auxilios y señales, paso a paso, hasta que los dominen todos'." · 1 "Diana: 'les propongo retos, ellos deciden cómo resolverlos y luego miramos juntos qué aprendieron'." · 2 "Andrés: 'les preparo juegos bien divertidos cada semana para que vuelvan con ganas el otro sábado'." · 3 "Laura: 'entreno a la tropa todo el semestre para que gane el concurso regional de campismo'." · respuesta 1 · clave "Educar es acompañar el desarrollo integral y la autoeducación: Diana pone a los jóvenes a decidir y a mirar lo aprendido. Camilo instruye (transmite técnica), Andrés recrea (entretiene) y Laura persigue reconocimientos. Las tres cosas caben en el escultismo, pero como medios; el fin es educar."
- Reescritura ítem 20: enunciado "Terminó la caminata. Los scouts llegan cansados y contentos. ¿Cuál de estas acciones del dirigente convierte esa vivencia en aprendizaje?" · opciones: 0 "Pasar de una vez al almuerzo y a la siguiente actividad para aprovechar el ánimo." · 1 "Sentarse en círculo diez minutos: qué sintieron, qué salió bien, qué harían distinto." · 2 "Anotar quién llegó primero y quién se quejó, para tenerlo en cuenta en la progresión." · 3 "Dejarlos descansar en silencio: la experiencia habla por sí sola." · respuesta 1 · clave "Vivir no basta: la experiencia se vuelve aprendizaje cuando se mira (nombrar emociones, aciertos y errores). Pasar de largo la desperdicia; calificarla la convierte en examen; 'dejar que hable sola' confía en que ocurra lo que el adulto debe provocar."

**M3 · Recall puro: ítems 2, 8 (definición de libro) y emparejar 5 y 7 (vocabulario)** · D1
- Problema: el 2 pide un eslogan; el 8 pide reconocer la definición canónica ("sistema de autoeducación… todo cohesivo"); el 5 empareja pilares con sinónimos ("vivir juntos"→"convivir", "conocer"→"comprender"); el 7 empareja tres términos con tres definiciones. Regla: marco §2.5 ("comprensión, no memorización mecánica… pequeños escenarios"); §8.1 punto 5.
- Reescritura ítem 2: enunciado "Un padre de familia te dice: 'Lo que más me gusta del grupo es que mi hijo acampa y aprende a valerse solo'. Según la Misión del Movimiento, ¿qué le precisas?" · opciones: 0 "Que acampar y valerse solo son, justamente, el fin que persigue el escultismo." · 1 "Que eso son medios; el fin de la Misión es contribuir a la educación de su hijo." · 2 "Que lo central es que su hijo gane insignias que muestren todo lo que aprende." · 3 "Que lo importante es que aprenda el orden y la disciplina que da el uniforme." · respuesta 1 · clave "La educación es el corazón de la Misión; la naturaleza, las insignias y el uniforme son medios para lograrla. Cuando un medio se vuelve el fin, el grupo puede ser muy activo y educar poco."
- Reescritura ítem 8: enunciado "Un dirigente nuevo te dice: 'El Método Scout es básicamente hacer buenas actividades al aire libre y con insignias'. ¿Qué le precisas?" · opciones: 0 "Que tiene razón, siempre que las actividades sean atractivas y estén bien planeadas." · 1 "Que el Método es un sistema: varios elementos que solo funcionan cuando van juntos." · 2 "Que le falta lo esencial: el Método es, sobre todo, la Promesa y la Ley." · 3 "Que le falta el sistema de insignias, que es lo que vuelve scout una actividad." · respuesta 1 · clave "El Método es un sistema de autoeducación cuyos elementos interactúan como un todo; ninguna parte sola —actividades, Promesa, insignias— es 'el Método'. Reducirlo a actividades al aire libre es la confusión más común en dirigentes nuevos."
- Reescritura ítem 5 (escenas en A, pilares en B): columnaA: 1 "Un scout entiende por qué el río crece después de la lluvia" · 2 "Una patrulla monta sola la carpa por primera vez" · 3 "Dos lobatos que no se soportaban terminan el juego como equipo" · 4 "Una rover decide, con criterio propio, qué quiere de su proyecto" · columnaB: A "Vivir juntos" · B "Conocer" · C "Hacer" · D "Ser" · respuesta {"1":"B","2":"C","3":"A","4":"D"} · clave "Conocer es comprender el mundo (el río); hacer es el saber práctico en la acción (la carpa); vivir juntos es cooperar y convivir (los dos lobatos); ser es autonomía y juicio propio (la rover). Los cuatro se dan a la vez: el ejercicio es ver cuál predomina."
- Reescritura ítem 7 (escenas en A, términos en B; añade un 4.º par para evitar el acierto por eliminación — ver B4): columnaA: 1 "Akela deja que el lobato elija su siguiente reto y solo le pregunta cómo va" · 2 "Scouts de distintos barrios, colegios y edades aprenden unos de otros en la misma patrulla" · 3 "El dirigente corrige sin gritar y reconoce el esfuerzo antes que el error" · 4 "El dirigente anuncia que quien no cumpla pierde el campamento" · columnaB: A "Coeducación" · B "Autoeducación" · C "Educación por el amor" · D "Educación por el temor" · respuesta {"1":"B","2":"A","3":"C","4":"D"} · clave "Autoeducación: el protagonista decide y el adulto crea condiciones. Coeducación: se aprende entre pares y con la diversidad. Educación por el amor: desde el vínculo y el ejemplo. La cuarta escena es su contrario —el castigo como motor— y está aquí para que no se acierte por descarte." (El 4.º par requiere visto bueno doctrinal: ver nota final.)

**M4 · Las claves confirman, no enseñan** · D1 (clave en POST)
- Problema: 18 de 22 claves son la opción correcta comprimida (ej. ít.10: "Facilitar y acompañar sin resolver por los jóvenes = apoyo del adulto."; ít.17: "Con Rovers el adulto asesora sin interferir en la autonomía."). Solo la del ítem 1 explica por qué fallan los distractores. Como el POST ya imprime "Respuesta correcta: …" justo encima (`engine.js` l.453–455), la clave duplica en vez de añadir el **porqué** y la **trampa**. Regla: CREAR-EVALUACION checklist ("las claves explican el concepto, no solo 'la b es correcta'"); marco §8.3 (anclar a lo previo).
- Reescritura: todas las claves propuestas en este informe siguen el patrón *concepto → por qué la correcta → por qué tienta cada distractor*. Para los ítems no reescritos arriba:
  - ít.4: "La Promesa y la Ley son un compromiso personal y libre con un sistema de valores: se viven en la práctica y se renuevan con la edad. Usadas como reglamento para vigilar o como trámite para 'subir de rama' dejan de educar y pasan a controlar."
  - ít.6: "Desafío sin sobrecarga = reto a la medida de cada quien: ni tan fácil que aburra ni tan difícil que abrume. 'La misma exigencia para todos' suena justa, pero deja a unos sin reto y a otros sin posibilidad."
  - ít.11: "Pequeños grupos que deciden, cooperan y asumen responsabilidades: eso es el sistema de equipos. Que la patrulla esté en el bosque no lo convierte en 'naturaleza', ni que cada quien avance en 'progresión personal': el elemento se define por lo que hace el grupo."
  - ít.13: "El marco simbólico funciona cuando se vive y resuena, no cuando se explica: sobreexplicarlo lo mata, y es la trampa más frecuente en adultos. Se adapta a la edad —la fantasía de Manada no es el estilo del Clan— y necesita continuidad: ni solo en campamento ni cambiado cada reunión."
  - ít.15: "Rama = identidad educativa de una edad (qué se busca, con qué lenguaje, cuánta autonomía). Unidad = el grupo concreto donde eso se vive (esta Manada, esta Tropa). Confundirlas hace copiar la 'forma' de la unidad sin entender el 'para qué' de la rama."
  - ít.16: "Permanecen los ocho elementos y los valores de la Promesa y la Ley. Cambian el lenguaje, la autonomía, el tamaño y forma de los pequeños grupos, el nivel de desafío y el rol del adulto. 'Cada rama tiene su propio método' es la idea vieja: hay un solo Método, vivido distinto."
  - ít.17: "Con Rovers (18–20) el adulto asesora cuidando el sentido y la seguridad, sin meterse en sus decisiones. Animar con fantasía y celebrar cada paso es estilo de Manada; imponer retos físicos caricaturiza la Tropa; dirigir 'porque tengo más experiencia' es la tentación más común del adulto."
  - ít.18: "A los 5–6 años se aprende jugando, con afecto y con el adulto cerca; las experiencias son breves porque la atención lo es. Las charlas —aunque sean cortas— y los proyectos autónomos pertenecen a edades mayores; los retos por equipos con técnica son de Tropa."

**M5 · Cobertura desigual frente a lo que el curso enseña** · D8
- Problema: tres de los ocho elementos —**naturaleza, progresión personal y participación en la comunidad**— nunca son respuesta correcta de un ítem propio (solo aparecen como pares del emparejar 12 y como distractores); la **Tropa (11–14)** no aparece en ningún ítem del Eje 3 ni en los casos (Cachorros 18, Manada 21, Nómadas 22, Rovers 17); y la Promesa y la Ley se mide en el Eje 1, así que el delta del Eje 2 no la recoge. Un eje 2 sin mejora no dirá si el problema está en los elementos que sí se preguntan o en los que no. Regla: MODELO-CALIFICACION §5 (el delta por eje diagnostica el bloque del curso) — solo diagnostica lo que cubre.
- Reescritura (dos ítems nuevos para el Eje 2, plano del joven, sin cruzar acepciones):
  - Ítem 25 (eje2, juicio_situacional, alta): enunciado "Una Tropa (11 a 14 años) hace todas sus reuniones en el salón parroquial; el dirigente dice que 'la naturaleza' está cubierta porque una vez al año van a un parque. ¿Qué le precisarías?" · opciones: 0 "Que está bien: el elemento naturaleza se cumple con el campamento anual." · 1 "Que la naturaleza es contacto constructivo y frecuente con el entorno, no una salida al año." · 2 "Que lo que le falta no es naturaleza sino técnica de campismo en el salón." · 3 "Que basta con decorar el salón con el marco simbólico para compensar." · respuesta 1 · clave "La naturaleza es un elemento propio del Método: un contacto constructivo y sostenido con el entorno, donde los otros elementos ganan intensidad. Una salida al año no lo cubre; la técnica en el salón (c) y la decoración (d) lo sustituyen por su apariencia."
  - Ítem 26 (eje2, juicio_situacional, alta): enunciado "En una Tropa, todos los scouts reciben la misma insignia el mismo día 'para que nadie se sienta menos'. ¿Qué elemento se está desdibujando?" · opciones: 0 "La progresión personal: cada quien avanza a su ritmo y reconoce sus propios logros." · 1 "El sistema de equipos: las insignias deberían entregarse por patrulla." · 2 "El marco simbólico: la insignia perdió su ceremonia." · 3 "Ninguno: la igualdad en el reconocimiento protege la autoestima." · respuesta 0 · clave "La progresión personal es avanzar a la propia medida y reconocer logros reales de cada uno; entregar lo mismo a todos borra ese camino. La igualdad que protege (d) es la del trato, no la del logro; la insignia por patrulla (b) confunde elementos."

**M6 · Pistas cruzadas entre ítems** · D1
- Problema: la d del ítem 9 ("aplicar solo algunos elementos sueltos no es aplicar el Método") confirma la respuesta del 8; "decidir por ellos" aparece en el enunciado del 10 y en la correcta del 22; "protagonizar" en las correctas de 10 y 14. Quien lee todo el formulario antes de responder (lo permite el diseño de una sola página) usa un ítem para contestar otro.
- Reescritura: queda resuelta con las propuestas de H4, H5 y M1 (se eliminaron las frases repetidas). Si se conserva algún ítem en su versión actual, revisar que no comparta la frase clave con otro.

**M7 · Ítem 19 pide una opinión ("lo MÁS importante")** · D1
- Problema: un enunciado de ranking sin escenario se contesta por "lo que suena más pedagógico"; y la autopercepción #5 lo calca (ver H2).
- Reescritura: enunciado "Dos dirigentes van a asumir una Tropa. Pedro llega con un fichero de 200 juegos y técnicas; Ana llega habiendo estudiado cómo piensan y qué buscan los jóvenes de 11 a 14 años. ¿Quién tiene la base más sólida para aplicar bien el Método, y por qué?" · opciones: 0 "Pedro: sin actividades atractivas ningún método funciona en la práctica." · 1 "Ana: entender al joven de esa edad es lo que da sentido a cualquier actividad." · 2 "Ninguno: lo decisivo es tener bien montado el marco simbólico de la unidad." · 3 "Pedro: cumplir muchas actividades es lo que hace avanzar la progresión." · respuesta 1 · clave "Comprender cómo piensa, siente y vive el NNAJ de la etapa es la base: sin eso, técnicas y juegos se aplican a ciegas. El fichero de Pedro es útil, pero es un medio; Ana sabrá elegir de él lo que educa."

### BAJOS (pulido)

**B1 · Ítem 11** — el único sin sesgo de longitud; funciona. Pulido opcional para hacerlo escena: "El sábado, la patrulla Águilas se reparte quién trae la carpa, quién cocina y quién lidera la marcha, y resuelve sola una discusión. ¿Qué elemento se está viviendo sobre todo?" (mismas opciones, respuesta 1).

**B2 · «Competencia» a secas en plano PJ (ítems 5 y 18)** — "competencias prácticas" (5) y "Competencias por equipos con técnica" (18). No cruzan el plano del adulto, pero GLOSARIO §E-bis pide reformular cuando el contexto admita lectura cruzada. Propuesta ya incorporada: "saber hacer, aprender en la acción" (5, si se conserva el formato original) y "Retos por equipos con algo de técnica" (18). Ningún ítem ni afirmación de autopercepción cruza el plano adulto/joven: la autopercepción habla del adulto sobre su práctica y los ítems del joven, como corresponde.

**B3 · Coherencia instrumento ↔ motor (D9)** — `index.html` promete "mide la comprensión de los conceptos (no la memorización)" y la pantalla de resultados titula "**Conocimiento** total (Secciones A y B)" (`engine.js` l.419). Sugerencia: "Comprensión total (Secciones A y B)". Y las etiquetas "Dominado / En proceso / Conviene repasar" sobre un eje de 1 ítem se resuelven con H6. El resto del feedback es coherente: el PRE avisa que las respuestas se verán al final del POST; el botón "Calificar mis respuestas" describe lo que ocurre.

**B4 · Ítem 7 con 3 pares** — con calificación proporcional, quien sabe 2 obtiene 1,0 porque el tercero cae por eliminación. Resuelto con el 4.º par de M3.

**B5 · Ítems 4, 6, 13, 15, 16, 17, 18** — conservan enunciado y sentido; solo requieren **balanceo de longitud** (H1). Opciones propuestas:
- ít.4: 0 "un reglamento externo que el adulto impone y vigila para mantener el orden." · 1 "un compromiso libre con unos valores, que se vive y se renueva al crecer." · 2 "un requisito administrativo que se cumple para poder pasar a la siguiente rama." · 3 "una lista de conductas prohibidas que el joven debe aprenderse de memoria." · respuesta 1.
- ít.6 (a escenario): enunciado "En una salida, Mateo (Tropa) monta la carpa en cinco minutos porque lo ha hecho veinte veces, y Sara, recién llegada, se frustra y se rinde. ¿Qué le faltó a la actividad para respetar el 'desafío sin sobrecarga'?" · 0 "Ser igual de exigente para todos: así nadie se siente tratado de forma distinta." · 1 "Retos a la medida: uno que estire a Mateo y otro que Sara pueda lograr con apoyo." · 2 "Ser más sencilla, para que todos la terminen rápido y nadie se frustre." · 3 "Ser más exigente, porque el escultismo forma el carácter a punta de dificultad." · respuesta 1.
- ít.13: 0 "Explicarlo con todo detalle para que todos lo entiendan igual." · 1 "Proponerlo y vivirlo sin sobreexplicarlo, ajustado a la edad." · 2 "Reservarlo para los campamentos, donde el ambiente lo hace creíble." · 3 "Renovarlo en cada reunión para que los jóvenes no se aburran de él." · respuesta 1.
- ít.15: 0 "Son sinónimos: en la práctica se usan indistintamente y no cambia nada." · 1 "La rama es la propuesta educativa para una edad; la unidad es el grupo concreto donde se vive." · 2 "La rama es el grupo concreto de un grupo scout; la unidad es la franja de edad." · 3 "La rama es el nombre oficial y la unidad es el apodo que cada grupo le pone." · respuesta 1.
- ít.16: 0 "Permanecen los elementos del Método y los valores; cambia cómo se viven según la edad." · 1 "Cambia el Método completo: cada rama tiene su propio método adaptado a su edad." · 2 "Permanece todo igual: lo único que cambia es el nombre de la unidad y su uniforme." · 3 "Cambian los valores según la edad y permanecen las técnicas y las actividades." · respuesta 0.
- ít.17: 0 "Dirigir y decidir las actividades por ellos, porque tú tienes más experiencia." · 1 "Animar con juegos de fantasía y celebrar de cerca cada pequeño paso que dan." · 2 "Asesorar, cuidando el sentido y la seguridad, sin meterte en sus decisiones." · 3 "Imponerles retos físicos fuertes y darles instrucciones técnicas constantes." · respuesta 2.
- ít.18: 0 "Charlas cortas y ejemplos sencillos sobre los valores, para que los entiendan." · 1 "Juego, fantasía, afecto y un adulto muy cercano, en experiencias cortas." · 2 "Pequeños proyectos de servicio que ellos elijan y saquen adelante solos." · 3 "Retos por equipos con algo de técnica, para que empiecen a medirse entre sí." · respuesta 1.

**B6 · Operativo: no cambiar el instrumento a mitad de cohorte** — el delta solo vale si PRE y POST usan los mismos ítems. Aplicar la nueva versión cuando la cohorte actual haya cerrado su POST, y distinguirla en el backend (nuevo `evaluacionId`, p. ej. `metodo-scout-v2`, o campo de versión — es decisión de motor/tablero, porque el tablero agrupa por `evaluacionId`). Conviene registrarlo como D9 en `docs/DECISIONES.md`.

---

## Bien logrado (conservar)

- **Escenarios reconocibles y con edad explícita** (14, 17, 18, 21, 22): el adulto se ve a sí mismo en el caso; los rangos de edad en el enunciado anclan la respuesta en la rama, no en la memoria.
- **Distractores "idea vieja" presentes** en 1, 4, 8, 13, 15, 16, 17, 18, 21, 22 (reglamento externo, "cada rama tiene su método", "explicarlo con detalle", "está bien, necesitan escuchar en silencio", "el adulto garantiza la calidad"). El ítem 17 es el mejor del instrumento: sus tres distractores son estilos de otras ramas.
- **Validez protegida por diseño**: barajado activo, clave solo en POST (D2), el build rechaza `revelarClave.pre = true`, y el aviso del PRE explica qué pasará después.
- **Ningún cruce de plano adulto/joven**: los ítems hablan del joven; la autopercepción, del adulto sobre su práctica.
- **Lenguaje cercano** y tuteo sostenido en enunciados, avisos y botones; el modelo de nota objetiva + justificación cualitativa (D5) está bien explicado al participante.

---

## Nota para el auditor doctrinal (no cuenta como hallazgo pedagógico)

- Ítem 7 define **coeducación** como "se aprende entre pares y en la convivencia con la diversidad". En varios documentos ASC el término se usa para educación mixta (niños y niñas juntos). La auditoría doctrinal previa lo marcó conforme; conviene reconfirmar antes de reescribirlo a escenas, y validar el 4.º par propuesto ("educación por el temor" como contrario).
- Ítem 12 empareja "emoción y motivación" con **dos** elementos juntos ("marco simbólico y naturaleza"). Confirmar que esa agrupación es la del curso presencial y no un atajo del instrumento.
- Ítem 5 usa los cuatro pilares de Delors (conocer, hacer, vivir juntos, ser); verificar que el curso *Un Día* los enseña con esa formulación (la auditoría previa solo corrigió el rótulo).
- Ítems nuevos propuestos (23–26): redactados desde la doctrina vigente (Modelo 2026: naturaleza como elemento propio; progresión personal como avance a la propia medida), pero deben pasar por `auditor-doctrinal-asc` antes de entrar al JSON.

---

## Aplicación en v2 (corrector, 14-sep-2026)

> **Corrector:** `corrector-pedagogico-asc` · **Archivo nuevo:** `data/metodo-scout-v2.json` (`evaluacionId: "metodo-scout-v2"`, campo `version` = 2 / 2026-09-14 / origen este informe / estado "borrador"). **El instrumento vivo no se tocó:** `data/metodo-scout.json` y `evaluacion.html` conservan su hash y su fecha (27-jun-2026); no se recompiló ni se publicó nada (regla B6).

### Qué se aplicó en la v2 (texto literal del informe)

- **21 de 22 ítems reescritos** (todos menos el 7): H1/B5 (4, 6, 13, 15, 16, 17, 18) · H2 (las 6 afirmaciones de autopercepción) · H3 (12) · H4 (21, 22) · H5 (10, 14) · M1 (3, 9) · M2 (1, 20) · M3 (2, 5, 8) · M4 (claves nuevas de 4, 6, 11, 13, 15, 16, 17, 18) · M7 (19) · B1 (11) · B2 (18; en el 5 queda absorbido por M3, porque la columna B pasa a los cuatro pilares sin la palabra "competencias").
- Conservados en todos los ítems: `id`, `eje`, `seccion`, `tipo`, `subtipo`, `dificultad` y el bloque `justificacion` de los casos. `ejes`, `config`, `titulo` y `subtitulo` idénticos al original. Los `respuesta` se verificaron uno por uno contra la opción/pares nuevos (22/22 correctos).
- **Bloque `pendienteDoctrinal` (NO entra en `items` ni en `ejes`):** ítem 7 reescrito con su 4.º par ("Educación por el temor") e ítems nuevos 23 y 24 (transversal) y 25 y 26 (eje 2), cada uno con `motivo`. El validador del generador ignora ese bloque, pero el JSON completo se inlinea en el HTML: antes de publicar una v2 aprobada hay que vaciarlo o mover sus ítems a `items`.

### Verificación mecánica

- **(a) JSON válido:** sí (UTF-8 sin BOM, LF). Pasa `validate()` del generador: 22 ítems · 5 ejes · 6 afirmaciones.
- **(b) Sesgo de longitud** (correcta ÷ la más larga de las otras, sobre los 19 ítems de opción):
  - Original: **16/19 (84 %)** con "estrictamente más larga"; **18/19 (95 %)** contando los empates a 1,00× (ítems 2 y 9) — esa es la cifra del informe.
  - v2: **7/19 (37 %)** estricta (ítems 2 = 1,03 · 3 = 1,04 · 6 = 1,01 · 15 = 1,19 · 16 = 1,05 · 19 = 1,04 · 22 = 1,02); **10/19 (53 %)** si se cuentan los tres empates exactos (1, 20 y 21 a 1,00×). Ratio máximo 1,19 (ítem 15); ningún ítem supera 1,20. Con la lectura estricta queda dentro del ≤ 50 %; con empates queda 3 puntos por encima, pero un empate no da pista (la "más larga" son dos opciones).
- **(c) Eco enunciado → correcta** (palabra clave del enunciado presente en la correcta y en ningún distractor): desaparecen los ecos del original (ítem 1: instruir; 10: adulto; 20: experiencia/reflexionar). Residuales en v2: ítem 2 ("Misión": el enunciado dice "Según la Misión…" y solo la correcta la repite) e ítem 6 (nombres "Mateo" y "Sara" solo en la correcta — son personajes del escenario, no un concepto, pero es la única opción que los nombra). Ambos son texto literal del informe; se dejan para decisión del auditor/dueño.
- **(d) Autopercepción vs. correctas de 2, 8, 9, 16, 19:** desaparece el vocabulario específico de las respuestas (cohesivo/sistema, lenguaje/autonomía/desafío, piensa/NNAJ, educación). Solapes residuales solo en términos genéricos del dominio: "Misión" (#1 ↔ 2), "Método" (#3, #4 ↔ 8, 16), "edad" (#5 ↔ 16, 19), "actividad/sentido" (#6 ↔ 19) y "rama" (#6 ↔ 9, cuya correcta es la afirmación FALSA, así que no filtra). Ninguno dicta la respuesta.
- **(e) Build de prueba:** `generador/build-evaluacion.js` acepta el `<id>` del JSON pero **escribe siempre en `evaluacion.html`** (`OUT` fijo). No se corrió contra el proyecto; se corrió una **copia del script en el scratchpad** con `BASE`/`OUT` redirigidos (mismo `validate()`, mismas plantillas). Resultado: **validación OK**, HTML de prueba generado en el scratchpad (59,6 KB). `evaluacion.html` del proyecto intacto (hash verificado antes y después).

### Dudas del corrector (no aplicadas, sin texto del auditor)

1. Los **enunciados de los emparejar 5 y 12** (y del 7 en pendiente) se conservaron literales porque el informe no dio uno nuevo; con escenas en la columna A, "Empareja cada uno de los cuatro aprendizajes… con su sentido" (5) y "Empareja cada principio del aprendizaje con el elemento…" (12) ya no describen bien la tarea. Conviene que el auditor proponga el enunciado.
2. En el ítem 26 pendiente, la correcta es la más larga de sus opciones (sesgo de longitud): balancear al aprobarla.

### Marcado para decisión humana (no aplicado)

- **B6 · Cambio de cohorte:** la v2 solo entra cuando la cohorte actual cierre su POST; distinguirla en backend/tablero por `evaluacionId` (`metodo-scout-v2`) o campo de versión. Registrar como D9 en `DECISIONES.md`.
- **H1 · Motor:** que `build-evaluacion.js` avise cuando la correcta sea la más larga en > 50 % de los ítems.
- **H2 · Motor:** mostrar la Sección C (autopercepción) solo después de enviar A+B.
- **H6 · Eje transversal:** fundirlo en el eje 2 o ampliarlo a 3 ítems (23 y 24 pendientes de doctrina).
- **B3 · Motor:** cabecera "Conocimiento total (Secciones A y B)" → "Comprensión total (Secciones A y B)" en `engine.js`.
- **Doctrina:** ítem 7 (acepción de "coeducación" + 4.º par) e ítems 23–26 deben pasar por `auditor-doctrinal-asc` antes de salir de `pendienteDoctrinal`.

---

## Correcciones doctrinales aplicadas en v2 (corrector, 14-sep-2026)

> **Corrector:** `corrector-doctrinal-asc`, sobre el informe del `auditor-doctrinal-asc` a la v2. **Ámbito:** solo `data/metodo-scout-v2.json`. `data/metodo-scout.json` y `evaluacion.html` conservan su hash (`fd4a2ee5…` / `92010639…`); no se compiló al proyecto ni se hizo commit. Fuentes citadas por el auditor: Modelo de Aplicación 2026 (DNPJ-2026-024), Características Esenciales (WOSM), *La educación por el amor…* (B-P, 1922), Guía Clan 2026, PNPJ.

### En `items`

- **7 · `columnaB[A].texto`** (C1 · Modelo p. 90 §14.1; Esenciales p. 14): «se aprende entre pares y en la convivencia con la diversidad» → «niños y niñas se educan juntos, con las mismas oportunidades y sin roles según el género».
- **7 · `clave`** (misma fuente; la clave describía la coeducación con la acepción vieja): «coeducación=entre pares» → «coeducación=niños y niñas juntos, con las mismas oportunidades».
- **12 · `columnaB[A].texto`** (M1 · Modelo p. 15 §3.1.6/§3.1.7): «marco simbólico y naturaleza» → «marco simbólico».
- **12 · `clave`** (M1): «es el marco simbólico (con la naturaleza como escenario);» → «es el marco simbólico;».
- **12 · `enunciado`** (M1/m4): «Empareja cada principio del aprendizaje con el elemento del Método que mejor lo encarna.» → «Empareja cada escena con el elemento del Método que más se ve en ella.»
- **17 · opción correcta** (m1 · Guía Clan pp. 53–54; Modelo p. 22): «Asesorar, cuidando el sentido y la seguridad, sin meterte en sus decisiones.» → «Asesorar, cuidando el sentido y la seguridad, sin decidir por ellos.»
- **17 · `clave`** (misma fuente; la clave repetía literalmente la frase corregida): «sin meterse en sus decisiones.» → «sin decidir por ellos.»
- **21 · `clave`** (m2): «exigir silencio (d) es educar desde el temor.» → «pedir más silencio y repetir (d) insiste en lo que ya falló: instrucción y obediencia.»
- **16 · `clave`** (m3): «'Cada rama tiene su propio método' es la idea vieja: hay un solo Método, vivido distinto.» → «'Cada rama tiene su propio método' es una confusión frecuente: hay un solo Método, vivido distinto.» (se conservan las comillas simples que usa todo el archivo).
- **5 · `enunciado`** (m4): «Empareja cada uno de los cuatro aprendizajes de la educación (conocer, hacer, vivir juntos y ser) con su sentido.» → «Empareja cada escena con el aprendizaje que más se ve en ella (conocer, hacer, vivir juntos o ser).»

### En `pendienteDoctrinal` (nada pasó a `items`: sigue siendo decisión del dueño — H6/M5)

- **7-bis · `columnaA[2].texto`** (C1): «Scouts de distintos barrios, colegios y edades aprenden unos de otros en la misma patrulla» → «En la patrulla, niños y niñas se turnan por igual para cocinar, liderar la marcha y decidir la ruta».
- **7-bis · `clave`** (C1): «Coeducación: se aprende entre pares y con la diversidad.» → «Coeducación: niños y niñas crecen juntos con las mismas oportunidades y responsabilidades; esa mezcla enriquece a todos.» El 4.º par «Educación por el temor» queda como estaba: **aprobado** (B-P 1922, pp. 1, 5, 12).
- **7-bis · `enunciado`** (m4): «Empareja cada concepto con su significado.» → «Empareja cada escena con el concepto que la describe.»
- **24 · `opciones[3]`** (M2 · Modelo pp. 59–60): «Que el adulto explique al inicio qué deben aprender.» → «Que el adulto cierre cada actividad diciéndoles qué debieron aprender.»
- **24 · `clave`** (M2): «No hace falta examen (c) ni explicación previa (d): hace falta la reflexión después.» → «No hace falta un examen (c), y el “discurso final” del adulto (d) tampoco sirve: la reflexión la hacen ellos, con preguntas.»
- **25 · `clave`** (m5, opcional aplicado · PNPJ p. 23; Modelo p. 15): «…donde los otros elementos ganan intensidad. Una salida al año…» → «…donde los otros elementos ganan intensidad, y se puede vivir también en la ciudad: un parque, una cancha, el cielo de la cuadra. Una salida al año…»
- **Campo `motivo` → `estadoDoctrinal`** en los 5 elementos: 23, 25, 26 = «APROBADO 14-sep-2026 (auditor doctrinal) — pendiente decisión del dueño para entrar al instrumento»; 7-bis y 24 = «CORREGIDO 14-sep-2026 según auditoría — pendiente decisión del dueño». La nota del ítem 26 sobre su sesgo de longitud (la correcta es la más larga) ya no vive en el JSON: queda registrada aquí y en "Dudas del corrector" más arriba, para balancear al aprobarla.

### Verificación mecánica

- **JSON válido** (UTF-8 sin BOM, LF). `respuesta` verificadas una por una tras los cambios: 22/22 en `items` y 5/5 en `pendienteDoctrinal` siguen apuntando a la opción/pares correctos (ítem 17 → «Asesorar…»; ítem 7 → 2:A coeducación; ítem 12 → 2:A marco simbólico; 24 → b).
- **Sesgo de longitud** (19 ítems de opción, correcta ÷ la más larga de las otras): sin cambio respecto a la v2 previa — **7/19 (37 %)** estricta (2 = 1,03 · 3 = 1,04 · 6 = 1,01 · 15 = 1,19 · 16 = 1,05 · 19 = 1,04 · 22 = 1,02) y **10/19 (53 %)** contando los empates a 1,00× (1, 20, 21). Ratio máximo 1,19 (ítem 15). La opción corregida del 17 quedó más corta que un distractor (0,89×).
- **Build de prueba:** copia de `generador/build-evaluacion.js` en el scratchpad con `BASE`, `TPL_DIR`, `backendPath` y `OUT` redirigidos (mismo `validate()`, mismas plantillas). Resultado: **validación OK** — 22 ítems · 5 ejes · 6 afirmaciones; HTML de prueba de 59,4 KB en el scratchpad. `evaluacion.html` del proyecto intacto (hash verificado antes y después).
- **Lenguaje:** ninguna corrección volvió el texto más técnico; las frases nuevas son las del auditor, en el mismo registro cercano del instrumento.

### Sin aplicar (fuera del alcance del corrector)

- Mover 7-bis, 23, 24, 25 o 26 a `items`/`ejes` (H6/M5): decisión del dueño.
- Balancear la longitud de la correcta del ítem 26 (sin texto del auditor).
