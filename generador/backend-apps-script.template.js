// ============================================================================
// PLANTILLA SIN SECRETOS (segura para repo publico).
// La copia con los tokens reales vive en backend-clasp/Code.js (gitignored) y
// desplegada en el proyecto Apps Script. Reemplaza CAMBIAR_TOKEN_* por los
// valores reales en la copia local. Ver docs/BACKEND.md.
// ============================================================================
// ============================================================================
// BACKEND · EVALUACIONES-ASC · Asociación Scouts de Colombia
// Google Apps Script (corre en servidores de Google, NO en Node).
// Script ENLAZADO al Google Sheet "ASC Evaluaciones".
// Guarda envíos PRE/POST y sirve resultados al participante y al formador.
// Solo usa SpreadsheetApp (sin Gmail/Drive) para minimizar permisos.
// ============================================================================

// --- Configuración ---
var AUTH_TOKEN  = 'CAMBIAR_TOKEN_PUBLICO';        // token para enviar y consultar el propio resultado
var ADMIN_TOKEN = 'CAMBIAR_TOKEN_ADMIN';  // token para el tablero del formador (datos del grupo)
var HOJA = 'Respuestas';
var HEADERS = [
  'timestamp', 'evaluacionId', 'modo', 'correo', 'nombre', 'rama', 'experiencia',
  'pct_total', 'puntajes_json', 'autopercepcion_json', 'justificaciones_json', 'respuestas_json'
];

// --- Helpers ---
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(HOJA);
  if (!sh) {
    sh = ss.insertSheet(HOJA);
    sh.appendRow(HEADERS);
    var hr = sh.getRange(1, 1, 1, HEADERS.length);
    hr.setFontWeight('bold').setBackground('#622599').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj, callback) {
  var body = JSON.stringify(obj);
  if (callback) {
    // JSONP: permite lectura entre orígenes (GitHub Pages → Apps Script)
    return ContentService.createTextOutput(callback + '(' + body + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body)
    .setMimeType(ContentService.MimeType.JSON);
}

function rowsToObjects_(sh) {
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var head = values[0];
  var out = [];
  for (var i = 1; i < values.length; i++) {
    var o = {};
    for (var j = 0; j < head.length; j++) o[head[j]] = values[i][j];
    out.push(o);
  }
  return out;
}

function safeParse_(s) { try { return JSON.parse(s); } catch (e) { return null; } }

/**
 * Ejecutar UNA VEZ desde el editor de Apps Script para conceder la
 * autorización del script (acceso al Sheet). Crea la hoja "Respuestas"
 * con sus encabezados y confirma que todo quedó listo.
 */
function autorizar() {
  var sh = getSheet_();
  return 'OK · Hoja "' + sh.getName() + '" lista en "' +
    SpreadsheetApp.getActiveSpreadsheet().getName() + '".';
}

// --- POST: guardar un envío ---
function doPost(e) {
  // Bloqueo: evita que dos envíos simultáneos (p. ej. al cerrar un curso) choquen
  // al escribir en la hoja. Cada escritura espera su turno hasta 20 s.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (errLock) {
    return json_({ ok: false, error: 'Servidor ocupado, vuelve a intentar en unos segundos.' });
  }
  try {
    var body = (e && e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : {};
    if (body.token !== AUTH_TOKEN) return json_({ ok: false, error: 'Token inválido' });
    if (body.action && body.action !== 'submit') return json_({ ok: false, error: 'Acción no soportada' });

    var idf = body.identificacion || {};
    var correo = (idf.correo || '').toString().trim().toLowerCase();
    if (!correo) return json_({ ok: false, error: 'Falta correo' });
    var modo = body.modo === 'post' ? 'post' : 'pre';

    var sh = getSheet_();
    sh.appendRow([
      new Date(),
      body.evaluacionId || '',
      modo,
      correo,
      idf.nombre || '',
      idf.rama || '',
      idf.experiencia || '',
      (body.puntajes && body.puntajes.total != null) ? body.puntajes.total : '',
      JSON.stringify(body.puntajes || {}),
      JSON.stringify(body.autopercepcion || []),
      JSON.stringify(body.justificaciones || {}),
      JSON.stringify(body.respuestas || {})
    ]);

    return json_({ ok: true, guardado: true, modo: modo });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// --- GET: consultar resultados / tablero / ping ---
function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var action = p.action || 'ping';
  var cb = p.callback || '';

  if (action === 'ping') {
    return json_({ ok: true, service: 'EVALUACIONES-ASC', sheet: SpreadsheetApp.getActiveSpreadsheet().getName() }, cb);
  }

  // Resultado individual: PRE y POST más recientes de un correo (para mostrar el delta)
  if (action === 'resultado') {
    if (p.token !== AUTH_TOKEN) return json_({ ok: false, error: 'Token inválido' }, cb);
    var correo = (p.correo || '').toString().trim().toLowerCase();
    var evalId = p.evaluacionId || '';
    if (!correo) return json_({ ok: false, error: 'Falta correo' }, cb);
    var rows = rowsToObjects_(getSheet_()).filter(function (r) {
      return String(r.correo).toLowerCase() === correo && (!evalId || r.evaluacionId === evalId);
    });
    var pre = null, post = null;
    rows.forEach(function (r) {
      var rec = {
        timestamp: r.timestamp, modo: r.modo, pct_total: r.pct_total,
        puntajes: safeParse_(r.puntajes_json), autopercepcion: safeParse_(r.autopercepcion_json)
      };
      if (r.modo === 'pre') pre = rec; else if (r.modo === 'post') post = rec;
    });
    return json_({ ok: true, correo: correo, pre: pre, post: post }, cb);
  }

  // Tablero del formador: todos los registros de una evaluación (requiere ADMIN_TOKEN)
  if (action === 'dashboard') {
    if (p.token !== ADMIN_TOKEN) return json_({ ok: false, error: 'Token de administrador inválido' }, cb);
    var evalId2 = p.evaluacionId || '';
    var all = rowsToObjects_(getSheet_()).filter(function (r) { return !evalId2 || r.evaluacionId === evalId2; });
    var registros = all.map(function (r) {
      return {
        timestamp: r.timestamp, modo: r.modo, correo: r.correo, nombre: r.nombre,
        rama: r.rama, experiencia: r.experiencia, pct_total: r.pct_total,
        puntajes: safeParse_(r.puntajes_json), autopercepcion: safeParse_(r.autopercepcion_json),
        justificaciones: safeParse_(r.justificaciones_json)
      };
    });
    return json_({ ok: true, total: registros.length, registros: registros }, cb);
  }

  // Mantenimiento: borrar todas las filas de un correo concreto. Requiere ADMIN_TOKEN.
  if (action === 'purgar') {
    if (p.token !== ADMIN_TOKEN) return json_({ ok: false, error: 'Token de administrador inválido' }, cb);
    var correoDel = (p.correo || '').toString().trim().toLowerCase();
    if (!correoDel) return json_({ ok: false, error: 'Falta correo' }, cb);
    var shD = getSheet_();
    var valsD = shD.getDataRange().getValues();
    var nD = 0;
    for (var k = valsD.length - 1; k >= 1; k--) {
      if (String(valsD[k][3] || '').toLowerCase() === correoDel) { shD.deleteRow(k + 1); nD++; }
    }
    return json_({ ok: true, borradas: nD }, cb);
  }

  // Mantenimiento: borrar filas de prueba (correos *@example.com). Requiere ADMIN_TOKEN.
  if (action === 'purgar_pruebas') {
    if (p.token !== ADMIN_TOKEN) return json_({ ok: false, error: 'Token de administrador inválido' }, cb);
    var sh = getSheet_();
    var values = sh.getDataRange().getValues();
    var borradas = 0;
    for (var i = values.length - 1; i >= 1; i--) { // de abajo hacia arriba; saltar encabezado
      var correoCol = String(values[i][3] || '').toLowerCase();
      if (correoCol.indexOf('@example.com') !== -1) { sh.deleteRow(i + 1); borradas++; }
    }
    return json_({ ok: true, borradas: borradas }, cb);
  }

  return json_({ ok: false, error: 'Acción desconocida' }, cb);
}
