/* ============================================================
   EVALUACIONES-ASC · Motor de evaluación (cliente)
   Renderiza los ítems, califica por eje y gestiona el flujo PRE/POST.
   El builder inyecta los datos en window.__EVAL_DATA__.
   NOTA: la calificación se hace en el cliente para dar feedback
   inmediato; el backend (Hito 5) la re-verifica y persiste.
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.__EVAL_DATA__;
  if (!DATA) { console.error('No hay datos de evaluación.'); return; }

  var CFG = DATA.config || {};
  var shuffleMap = {}; // itemId -> orden barajado de índices/ids

  // ---------- utilidades ----------
  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function getModo() {
    var p = new URLSearchParams(location.search).get('modo');
    return (p === 'pre' || p === 'post') ? p : null;
  }
  function ejeDe(itemId) {
    for (var i = 0; i < DATA.ejes.length; i++) {
      if (DATA.ejes[i].items.indexOf(itemId) !== -1) return DATA.ejes[i];
    }
    return null;
  }

  // ---------- selector de modo ----------
  function renderChooser() {
    el('app').innerHTML =
      '<div class="modo-chooser">' +
      '<h2>' + esc(DATA.titulo) + '</h2>' +
      '<p>Elige cuándo estás respondiendo esta evaluación:</p>' +
      '<div class="modo-botones">' +
      '<a class="modo-btn" href="?modo=pre"><strong>PRE</strong><span>Antes del curso (línea base)</span></a>' +
      '<a class="modo-btn" href="?modo=post"><strong>POST</strong><span>Al terminar el curso</span></a>' +
      '</div></div>';
  }

  // ---------- render de la evaluación ----------
  function renderEval(modo) {
    var html = '';

    // Encabezado
    html += '<div class="eval-header">' +
      '<h1>' + esc(DATA.titulo) + '</h1>' +
      (DATA.subtitulo ? '<p class="sub">' + esc(DATA.subtitulo) + '</p>' : '') +
      (DATA.organizacion ? '<p class="org">' + esc(DATA.organizacion) + '</p>' : '') +
      '<span class="badge-modo ' + modo + '">' + (modo === 'pre' ? 'Evaluación PRE' : 'Evaluación POST') + '</span>' +
      '</div>';

    html += '<form id="evalForm" novalidate>';

    // Identificación (solo PRE)
    if (modo === 'pre' && DATA.identificacion) {
      html += renderIdentificacion(DATA.identificacion);
    } else if (modo === 'post' && DATA.identificacion) {
      // En POST pedimos solo el correo (llave de emparejamiento)
      html += '<div class="eje"><div class="eje-titulo">Identificación</div>' +
        '<div class="item"><div class="campo">' +
        '<label for="campo-correo">Correo electrónico ' +
        '<span class="nota">— usa el mismo que en el PRE para emparejar tus resultados.</span></label>' +
        '<input type="email" id="campo-correo" name="correo" required></div></div></div>';
    }

    // Ítems agrupados por eje
    DATA.ejes.forEach(function (eje) {
      var items = DATA.items.filter(function (it) { return it.eje === eje.id; });
      if (!items.length) return;
      html += '<div class="eje"><div class="eje-titulo">' + esc(eje.nombre) + '</div>';
      items.forEach(function (it) { html += renderItem(it); });
      html += '</div>';
    });

    // Autopercepción (Sección C)
    if (DATA.autopercepcion) {
      html += renderAutopercepcion(DATA.autopercepcion);
    }

    html += '<button type="submit" class="btn" id="btnEnviar">Calificar mis respuestas</button>';
    html += '</form>';
    html += '<div id="resultados"></div>';
    html += '<p class="footer">' + esc(DATA.organizacion || '') + (DATA.anio ? ' · ' + DATA.anio : '') + '</p>';

    el('app').innerHTML = html;
    attachHandlers();
  }

  function renderIdentificacion(idf) {
    var h = '<div class="eje"><div class="eje-titulo">' + esc(idf.descripcion || 'Identificación') + '</div><div class="item">';
    (idf.campos || []).forEach(function (c) {
      h += '<div class="campo"><label for="campo-' + esc(c.id) + '">' + esc(c.etiqueta) +
        (c.nota ? ' <span class="nota">— ' + esc(c.nota) + '</span>' : '') + '</label>';
      if (c.tipo === 'seleccion') {
        h += '<select id="campo-' + esc(c.id) + '" name="' + esc(c.id) + '"' + (c.requerido ? ' required' : '') + '>' +
          '<option value="">Selecciona…</option>';
        (c.opciones || []).forEach(function (o) { h += '<option value="' + esc(o) + '">' + esc(o) + '</option>'; });
        h += '</select>';
      } else {
        var tipo = c.tipo === 'numero' ? 'number' : (c.tipo === 'email' ? 'email' : 'text');
        h += '<input type="' + tipo + '" id="campo-' + esc(c.id) + '" name="' + esc(c.id) + '"' +
          (c.requerido ? ' required' : '') +
          (c.min != null ? ' min="' + c.min + '"' : '') +
          (c.max != null ? ' max="' + c.max + '"' : '') + '>';
      }
      h += '</div>';
    });
    h += '</div></div>';
    return h;
  }

  function renderItem(it) {
    var num = '<strong>' + it.id + '.</strong> ';
    var tag = '';
    if (it.subtipo === 'identificar_falsa') tag = '<span class="meta-tag">Identifica la FALSA</span>';
    else if (it.subtipo === 'juicio_situacional') tag = '<span class="meta-tag">Caso</span>';
    else if (it.tipo === 'emparejar') tag = '<span class="meta-tag">Emparejar</span>';
    else if (it.tipo === 'caso') tag = '<span class="meta-tag">Caso</span>';

    var h = '<fieldset class="item" id="item-' + it.id + '" data-tipo="' + it.tipo + '">' +
      '<legend class="enunciado">' + num + esc(it.enunciado) + tag + '</legend>';

    if (it.tipo === 'opcion_unica' || it.tipo === 'caso') {
      var orden = CFG.barajarOpciones ? shuffle(it.opciones.map(function (_, i) { return i; })) : it.opciones.map(function (_, i) { return i; });
      shuffleMap[it.id] = orden;
      orden.forEach(function (origIdx) {
        h += '<label class="opcion"><input type="radio" name="item-' + it.id + '" value="' + origIdx + '">' +
          '<span class="txt">' + esc(it.opciones[origIdx]) + '</span></label>';
      });
      if (it.tipo === 'caso' && it.justificacion) {
        h += '<div class="justif"><label for="justif-' + it.id + '">' + esc(it.justificacion.etiqueta || 'Justifica tu elección') + '</label>' +
          '<textarea id="justif-' + it.id + '" name="justif-' + it.id + '"></textarea></div>';
      }
    } else if (it.tipo === 'emparejar') {
      var ordenB = CFG.barajarOpciones ? shuffle(it.columnaB.slice()) : it.columnaB.slice();
      it.columnaA.forEach(function (a) {
        h += '<div class="empareja-fila" data-a="' + esc(a.id) + '">' +
          '<span class="a">' + esc(a.texto) + '</span>' +
          '<select id="match-' + it.id + '-' + esc(a.id) + '" name="match-' + it.id + '-' + esc(a.id) + '"' +
          ' aria-label="Empareja: ' + esc(a.texto) + '">' +
          '<option value="">Selecciona…</option>';
        ordenB.forEach(function (b) { h += '<option value="' + esc(b.id) + '">' + esc(b.texto) + '</option>'; });
        h += '</select></div>';
      });
    }
    h += '</fieldset>';
    return h;
  }

  function renderAutopercepcion(ap) {
    var esc1 = ap.escala || { min: 1, max: 5, etiquetaMin: '', etiquetaMax: '' };
    var h = '<div class="eje"><div class="eje-titulo">' + esc(ap.descripcion || 'Autopercepción') + '</div>';
    (ap.afirmaciones || []).forEach(function (af, idx) {
      h += '<div class="item escala-item" data-ap="' + idx + '">' +
        '<div class="afirm">' + esc(af) + '</div><div class="escala-opts">';
      for (var v = esc1.min; v <= esc1.max; v++) {
        h += '<label data-val="' + v + '"><input type="radio" name="ap-' + idx + '" value="' + v + '"><span>' + v + '</span></label>';
      }
      h += '</div><div class="escala-leyenda"><span>' + esc(esc1.etiquetaMin) + '</span><span>' + esc(esc1.etiquetaMax) + '</span></div></div>';
    });
    h += '</div>';
    return h;
  }

  // ---------- interacción ----------
  function attachHandlers() {
    // resaltar opción seleccionada
    document.querySelectorAll('.opcion input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        var fs = inp.closest('fieldset');
        fs.querySelectorAll('.opcion').forEach(function (o) { o.classList.remove('sel'); });
        inp.closest('.opcion').classList.add('sel');
      });
    });
    document.querySelectorAll('.escala-opts label').forEach(function (lab) {
      lab.addEventListener('click', function () {
        var cont = lab.parentNode;
        cont.querySelectorAll('label').forEach(function (l) { l.classList.remove('sel'); });
        lab.classList.add('sel');
      });
    });
    var form = el('evalForm');
    if (form) form.addEventListener('submit', onSubmit);
  }

  // ---------- calificación ----------
  function gradeItem(it) {
    if (it.tipo === 'opcion_unica' || it.tipo === 'caso') {
      var sel = document.querySelector('input[name="item-' + it.id + '"]:checked');
      if (!sel) return { points: 0, answered: false };
      var chosen = parseInt(sel.value, 10);
      return { points: chosen === it.respuesta ? 1 : 0, answered: true, chosen: chosen };
    }
    if (it.tipo === 'emparejar') {
      var total = it.columnaA.length, correct = 0, answered = true, picks = {};
      it.columnaA.forEach(function (a) {
        var s = el('match-' + it.id + '-' + a.id);
        var val = s ? s.value : '';
        picks[a.id] = val;
        if (!val) answered = false;
        if (val && val === it.respuesta[a.id]) correct++;
      });
      var mode = CFG.emparejarMode || 'proporcional';
      var pts = mode === 'todo_o_nada' ? (correct === total ? 1 : 0) : (correct / total);
      return { points: pts, answered: answered, correct: correct, total: total, picks: picks };
    }
    return { points: 0, answered: false };
  }

  function gradeAll() {
    var perItem = {}, ejeAgg = {}, totalP = 0, totalPos = 0;
    DATA.ejes.forEach(function (e) { ejeAgg[e.id] = { points: 0, possible: 0, nombre: e.nombre }; });
    DATA.items.forEach(function (it) {
      var g = gradeItem(it);
      perItem[it.id] = g;
      if (ejeAgg[it.eje]) { ejeAgg[it.eje].points += g.points; ejeAgg[it.eje].possible += 1; }
      totalP += g.points; totalPos += 1;
    });
    var pct = {};
    Object.keys(ejeAgg).forEach(function (k) {
      pct[k] = ejeAgg[k].possible ? Math.round((ejeAgg[k].points / ejeAgg[k].possible) * 1000) / 10 : 0;
    });
    pct.total = totalPos ? Math.round((totalP / totalPos) * 1000) / 10 : 0;
    return { perItem: perItem, ejeAgg: ejeAgg, pct: pct };
  }

  function collectAutopercepcion() {
    if (!DATA.autopercepcion) return [];
    return DATA.autopercepcion.afirmaciones.map(function (_, idx) {
      var sel = document.querySelector('input[name="ap-' + idx + '"]:checked');
      return sel ? parseInt(sel.value, 10) : null;
    });
  }

  function collectIdentificacion(modo) {
    var idObj = {};
    if (modo === 'pre' && DATA.identificacion) {
      DATA.identificacion.campos.forEach(function (c) {
        var node = el('campo-' + c.id);
        if (node) idObj[c.id] = node.value.trim();
      });
    } else {
      var cor = el('campo-correo');
      if (cor) idObj.correo = cor.value.trim();
    }
    return idObj;
  }

  function collectJustificaciones() {
    var j = {};
    DATA.items.forEach(function (it) {
      if (it.tipo === 'caso') {
        var t = el('justif-' + it.id);
        if (t) j[it.id] = t.value.trim();
      }
    });
    return j;
  }

  // ---------- validación ----------
  function validar(modo, grade, autop, idObj) {
    var faltan = [];
    // identificación
    if (modo === 'pre' && DATA.identificacion) {
      DATA.identificacion.campos.forEach(function (c) {
        if (c.requerido && !idObj[c.id]) faltan.push('campo "' + c.etiqueta + '"');
      });
    } else if (!idObj.correo) {
      faltan.push('tu correo electrónico');
    }
    // ítems
    DATA.items.forEach(function (it) {
      if (!grade.perItem[it.id].answered) faltan.push('ítem ' + it.id);
    });
    // autopercepción
    autop.forEach(function (v, i) { if (v == null) faltan.push('autopercepción #' + (i + 1)); });
    return faltan;
  }

  // ---------- envío ----------
  function onSubmit(e) {
    e.preventDefault();
    var modo = getModo();
    var grade = gradeAll();
    var autop = collectAutopercepcion();
    var idObj = collectIdentificacion(modo);
    var justif = collectJustificaciones();

    var faltan = validar(modo, grade, autop, idObj);
    if (faltan.length) {
      mostrarAviso('Te falta responder: ' + faltan.slice(0, 6).join(', ') +
        (faltan.length > 6 ? ' y ' + (faltan.length - 6) + ' más.' : '.'), 'warn');
      // llevar al primer faltante si es un ítem
      var m = faltan[0].match(/ítem (\d+)/);
      if (m) { var node = el('item-' + m[1]); if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }

    var payload = {
      evaluacionId: DATA.evaluacionId,
      modo: modo,
      identificacion: idObj,
      puntajes: grade.pct,
      autopercepcion: autop,
      justificaciones: justif,
      respuestas: serializarRespuestas(grade)
    };

    var btn = el('btnEnviar');
    if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }

    enviarBackend(payload).then(function () {
      if (modo === 'post') {
        // Recuperar el PRE del backend para calcular el delta
        recuperarPrevio(idObj.correo).then(function (res) {
          mostrarResultados(modo, grade, autop, res);
        });
      } else {
        mostrarResultados(modo, grade, autop, null);
      }
    });
  }

  // ---------- comunicación con el backend ----------
  function backendCfg() {
    var B = window.__EVAL_BACKEND__;
    return (B && B.url) ? B : null;
  }

  function enviarBackend(payload) {
    var B = backendCfg();
    if (!B) { console.log('[EVAL] Sin backend (modo local). Payload:', payload); return Promise.resolve(false); }
    var body = JSON.stringify(Object.assign({ token: B.token }, payload));
    return fetch(B.url, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body
    }).then(function () { return true; }).catch(function (err) { console.warn('[EVAL] Error al guardar:', err); return false; });
  }

  function recuperarPrevio(correo) {
    var B = backendCfg();
    if (!B || !correo) return Promise.resolve(null);
    var url = B.url + '?action=resultado&token=' + encodeURIComponent(B.token) +
      '&evaluacionId=' + encodeURIComponent(DATA.evaluacionId) +
      '&correo=' + encodeURIComponent(correo);
    return jsonp(url).catch(function () { return null; });
  }

  function jsonp(url) {
    return new Promise(function (resolve, reject) {
      var cbName = '__eval_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
      var script = document.createElement('script');
      var timer = setTimeout(function () { cleanup(); reject(new Error('timeout')); }, 12000);
      function cleanup() { clearTimeout(timer); try { delete window[cbName]; } catch (e) { window[cbName] = undefined; } if (script.parentNode) script.parentNode.removeChild(script); }
      window[cbName] = function (data) { cleanup(); resolve(data); };
      script.onerror = function () { cleanup(); reject(new Error('jsonp error')); };
      script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + cbName;
      document.body.appendChild(script);
    });
  }

  function serializarRespuestas(grade) {
    var r = {};
    DATA.items.forEach(function (it) {
      var g = grade.perItem[it.id];
      r[it.id] = (it.tipo === 'emparejar') ? g.picks : g.chosen;
    });
    return r;
  }

  function mostrarAviso(msg, tipo) {
    var box = el('resultados');
    box.innerHTML = '<div class="aviso ' + (tipo || 'info') + '">' + esc(msg) + '</div>';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ---------- resultados / retroalimentación ----------
  function mostrarResultados(modo, grade, autop, serverData) {
    var revelar = modo === 'post' && CFG.revelarClave && CFG.revelarClave.post;
    var pre = (serverData && serverData.pre) ? serverData.pre : null;
    var preP = (pre && pre.puntajes) ? pre.puntajes : null;

    var h = '<div class="resultados">';
    h += '<h2>' + (modo === 'pre' ? 'Tu línea base (PRE)' : 'Tus resultados (POST)') + '</h2>';
    h += '<div class="res-total">' + grade.pct.total + '%<small>Conocimiento total (Secciones A y B)' +
      (preP ? deltaTxt(grade.pct.total, preP.total) : '') + '</small></div>';

    // barras por eje + mensaje cualitativo + delta (si hay PRE)
    DATA.ejes.forEach(function (e) {
      var p = grade.pct[e.id];
      var nv = nivelEje(p);
      var d = (preP && preP[e.id] != null) ? deltaTxt(p, preP[e.id]) : '';
      h += '<div class="barra-eje"><div class="lbl"><span>' + esc(e.nombre) +
        ' <span class="nivel ' + nv.clase + '">' + nv.txt + '</span></span><span>' + p + '%' + d + '</span></div>' +
        '<div class="barra-track"><div class="barra-fill" style="width:' + p + '%"></div></div></div>';
    });

    if (modo === 'pre') {
      h += '<div class="aviso info">Esta es tu <strong>línea base</strong>. Al terminar el curso, responde la evaluación <strong>POST</strong> con el mismo correo para ver cuánto avanzaste. ' +
        'Las respuestas correctas se mostrarán al final del POST.</div>';
    } else if (preP) {
      h += '<div class="aviso info">Comparado con tu PRE, tu conocimiento total pasó de <strong>' + preP.total +
        '%</strong> a <strong>' + grade.pct.total + '%</strong>' + deltaTxt(grade.pct.total, preP.total) +
        '. A continuación, la <strong>clave razonada</strong>.</div>';
    } else {
      h += '<div class="aviso info">¡Gracias! Tu formador podrá comparar tu PRE y tu POST por eje. ' +
        '(No encontramos un PRE con este correo, así que no se muestra tu avance.) A continuación, la <strong>clave razonada</strong>.</div>';
    }

    // clave razonada solo en POST
    if (revelar) {
      h += '<h2 style="margin-top:24px">Clave razonada</h2>';
      DATA.items.forEach(function (it) {
        var g = grade.perItem[it.id];
        var ok = g.points >= (it.tipo === 'emparejar' ? 1 : 1);
        var estado = it.tipo === 'emparejar'
          ? (g.correct + '/' + g.total + ' correctos')
          : (g.points === 1 ? '✔ Correcta' : '✘ Incorrecta');
        h += '<div class="clave-box"><div class="lbl">Ítem ' + it.id + ' — ' + estado + '</div>' +
          renderRespuestaCorrecta(it) +
          '<div>' + esc(it.clave) + '</div></div>';
      });
    }

    h += '</div>';
    var box = el('resultados');
    box.innerHTML = h;
    // ocultar el botón de enviar tras calificar
    var btn = el('btnEnviar'); if (btn) btn.style.display = 'none';
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function deltaTxt(post, pre) {
    var d = Math.round((post - pre) * 10) / 10;
    if (d > 0) return ' <span class="delta up">▲ +' + d + '</span>';
    if (d < 0) return ' <span class="delta down">▼ ' + d + '</span>';
    return ' <span class="delta flat">＝ 0</span>';
  }

  function nivelEje(p) {
    if (p >= 80) return { txt: 'Dominado', clase: 'ok' };
    if (p >= 50) return { txt: 'En proceso', clase: 'medio' };
    return { txt: 'Conviene repasar', clase: 'bajo' };
  }

  function renderRespuestaCorrecta(it) {
    if (it.tipo === 'opcion_unica' || it.tipo === 'caso') {
      return '<div><em>Respuesta correcta:</em> ' + esc(it.opciones[it.respuesta]) + '</div>';
    }
    if (it.tipo === 'emparejar') {
      var mapTxt = it.columnaA.map(function (a) {
        var bId = it.respuesta[a.id];
        var b = it.columnaB.filter(function (x) { return x.id === bId; })[0];
        return esc(a.texto) + ' → ' + (b ? esc(b.texto) : esc(bId));
      }).join('; ');
      return '<div><em>Emparejamiento correcto:</em> ' + mapTxt + '</div>';
    }
    return '';
  }

  // ---------- arranque ----------
  function init() {
    var modo = getModo();
    if (!modo) { renderChooser(); return; }
    renderEval(modo);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
