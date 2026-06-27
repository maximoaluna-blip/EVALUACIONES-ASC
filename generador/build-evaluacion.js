#!/usr/bin/env node
/* ============================================================
   BUILD-EVALUACION.JS · EVALUACIONES-ASC
   Genera evaluacion.html a partir de data/<id>.json
   Uso: node generador/build-evaluacion.js <evaluacionId>
   Sin dependencias externas (solo módulos nativos de Node).
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');
const DATA_DIR = path.join(BASE, 'data');
const TPL_DIR = path.join(__dirname, 'templates');
const OUT = path.join(BASE, 'evaluacion.html');

// ---- argumento ----
const id = process.argv[2];
if (!id) {
  console.error('❌ Uso: node generador/build-evaluacion.js <evaluacionId>');
  try {
    const fichas = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    console.error('   Disponibles:', fichas.map(f => f.replace('.json', '')).join(', ') || '(ninguna)');
  } catch (e) {}
  process.exit(1);
}

const jsonPath = path.join(DATA_DIR, id + '.json');
if (!fs.existsSync(jsonPath)) { console.error('❌ No existe: ' + jsonPath); process.exit(1); }

let data;
try { data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')); }
catch (e) { console.error('❌ JSON inválido: ' + e.message); process.exit(1); }

// ---- validación (ver docs/MODELO-DATOS.md §7) ----
function validate(d) {
  const errs = [];
  if (!d.evaluacionId) errs.push('Falta evaluacionId');
  if (!d.titulo) errs.push('Falta titulo');
  if (!Array.isArray(d.ejes) || !d.ejes.length) errs.push('Falta ejes');
  if (!Array.isArray(d.items) || !d.items.length) errs.push('Falta items');

  if (d.config && d.config.revelarClave && d.config.revelarClave.pre === true) {
    errs.push('config.revelarClave.pre debe ser false (revelar la clave en PRE invalida el POST)');
  }

  const ids = {};
  const ejeDeItem = {};
  (d.items || []).forEach(it => {
    if (it.id == null) errs.push('Un ítem no tiene id');
    if (ids[it.id]) errs.push('id de ítem duplicado: ' + it.id);
    ids[it.id] = true;
    if (!it.clave) errs.push('Ítem ' + it.id + ': falta clave razonada');
    if (!it.eje) errs.push('Ítem ' + it.id + ': falta eje');

    if (it.tipo === 'opcion_unica' || it.tipo === 'caso') {
      if (!Array.isArray(it.opciones) || it.opciones.length < 2) errs.push('Ítem ' + it.id + ': necesita al menos 2 opciones');
      if (typeof it.respuesta !== 'number' || it.respuesta < 0 || it.respuesta >= (it.opciones || []).length)
        errs.push('Ítem ' + it.id + ': respuesta fuera de rango');
      if (it.tipo === 'caso' && !it.justificacion) errs.push('Ítem ' + it.id + ' (caso): falta bloque justificacion');
    } else if (it.tipo === 'emparejar') {
      if (!Array.isArray(it.columnaA) || !Array.isArray(it.columnaB)) errs.push('Ítem ' + it.id + ': faltan columnaA/columnaB');
      const bIds = {}; (it.columnaB || []).forEach(b => bIds[b.id] = true);
      (it.columnaA || []).forEach(a => {
        if (!it.respuesta || !(a.id in it.respuesta)) errs.push('Ítem ' + it.id + ': falta respuesta para ' + a.id);
        else if (!bIds[it.respuesta[a.id]]) errs.push('Ítem ' + it.id + ': respuesta ' + it.respuesta[a.id] + ' no existe en columnaB');
      });
    } else {
      errs.push('Ítem ' + it.id + ': tipo desconocido "' + it.tipo + '"');
    }
  });

  // cada ítem pertenece a exactamente un eje declarado
  const itemsEnEjes = {};
  (d.ejes || []).forEach(e => {
    if (!Array.isArray(e.items)) { errs.push('Eje ' + e.id + ': falta lista items'); return; }
    e.items.forEach(itId => {
      if (itemsEnEjes[itId]) errs.push('Ítem ' + itId + ' está en más de un eje');
      itemsEnEjes[itId] = true;
      if (!ids[itId]) errs.push('Eje ' + e.id + ' referencia ítem inexistente: ' + itId);
    });
  });
  (d.items || []).forEach(it => { if (!itemsEnEjes[it.id]) errs.push('Ítem ' + it.id + ' no está en ningún eje'); });

  return errs;
}

const errors = validate(data);
if (errors.length) {
  console.error('❌ Validación fallida:');
  errors.forEach(e => console.error('   - ' + e));
  process.exit(1);
}

// ---- ensamblar HTML ----
const css = fs.readFileSync(path.join(TPL_DIR, 'styles.css'), 'utf-8');
const engine = fs.readFileSync(path.join(TPL_DIR, 'engine.js'), 'utf-8');
// se inyecta como JSON seguro dentro de <script>
const dataJson = JSON.stringify(data).replace(/</g, '\\u003c');

// Config del backend (opcional). Si no existe, la app funciona en local sin guardar.
let backendJson = '{}';
const backendPath = path.join(__dirname, 'backend.config.json');
if (fs.existsSync(backendPath)) {
  try {
    backendJson = JSON.stringify(JSON.parse(fs.readFileSync(backendPath, 'utf-8'))).replace(/</g, '\\u003c');
    console.log('   Backend: conectado');
  } catch (e) { console.warn('   ⚠ backend.config.json inválido, se ignora'); }
} else {
  console.log('   Backend: no configurado (modo local, no guarda)');
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.titulo}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
<main class="wrap"><div id="app"></div></main>
<script>window.__EVAL_DATA__ = ${dataJson};
window.__EVAL_BACKEND__ = ${backendJson};</script>
<script>
${engine}
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html, 'utf-8');
const kb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
console.log('✅ Generado: evaluacion.html (' + kb + ' KB)');
console.log('   Evaluación: ' + data.titulo);
console.log('   Ítems: ' + data.items.length + ' · Ejes: ' + data.ejes.length +
  ' · Autopercepción: ' + ((data.autopercepcion && data.autopercepcion.afirmaciones.length) || 0));
console.log('   Pruébalo: abre evaluacion.html?modo=pre  (o ?modo=post)');
