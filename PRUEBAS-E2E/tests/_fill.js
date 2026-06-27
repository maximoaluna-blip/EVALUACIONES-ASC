// Rellena la evaluación en el navegador leyendo window.__EVAL_DATA__.
// correct=true → todas correctas; correct=false → falla las objetivas a propósito.

async function fillEvaluation(page, { modo, correct = true, correo = 'e2e@example.com' }) {
  await page.waitForFunction(() => !!window.__EVAL_DATA__ && !!document.getElementById('evalForm'));
  await page.evaluate(({ modo, correct, correo }) => {
    const D = window.__EVAL_DATA__;
    if (modo === 'pre') {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
      set('campo-nombre', 'E2E Test');
      set('campo-correo', correo);
      const rama = document.getElementById('campo-rama');
      if (rama && rama.options.length > 1) rama.value = rama.options[1].value;
      set('campo-experiencia', '3');
      const chk = document.getElementById('consentChk'); if (chk) chk.checked = true;
    } else {
      const c = document.getElementById('campo-correo'); if (c) c.value = correo;
    }
    D.items.forEach((it) => {
      if (it.tipo === 'opcion_unica' || it.tipo === 'caso') {
        const val = correct ? it.respuesta : (it.respuesta + 1) % it.opciones.length;
        const r = document.querySelector('input[name="item-' + it.id + '"][value="' + val + '"]');
        if (r) r.checked = true;
        if (it.tipo === 'caso') { const t = document.getElementById('justif-' + it.id); if (t) t.value = 'justificación e2e'; }
      } else if (it.tipo === 'emparejar') {
        it.columnaA.forEach((a) => {
          const s = document.getElementById('match-' + it.id + '-' + a.id);
          if (!s) return;
          const otra = (it.columnaB.find((b) => b.id !== it.respuesta[a.id]) || {}).id;
          s.value = correct ? it.respuesta[a.id] : otra;
        });
      }
    });
    if (D.autopercepcion) {
      D.autopercepcion.afirmaciones.forEach((_, i) => {
        const r = document.querySelector('input[name="ap-' + i + '"][value="4"]');
        if (r) r.checked = true;
      });
    }
  }, { modo, correct, correo });
}

module.exports = { fillEvaluation };
