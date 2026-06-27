// Intercepta TODAS las llamadas al backend de Apps Script (script.google.com/macros/...)
// para que el flujo PRE/POST corra contra el frontend SIN escribir en el Google Sheet real.
//
// - POST (envío): captura el payload (contrato frontend→backend) y responde {ok:true}.
// - GET con ?callback= (JSONP, usado para recuperar el PRE y calcular el delta): responde
//   `callback({...})`. Si la acción es "resultado", devuelve el `preStub` que se le pase.
//
// Devuelve el array `capturado` que se va llenando con los POST.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function stubBackend(page, { preStub = null } = {}) {
  const capturado = [];
  await page.route('**/macros/s/**', async (route) => {
    const req = route.request();
    const metodo = req.method();

    if (metodo === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: CORS, body: '' });
      return;
    }

    if (metodo === 'POST') {
      try {
        const data = JSON.parse(req.postData() || 'null');
        if (data) capturado.push(data);
      } catch (e) { /* payload no-JSON */ }
      await route.fulfill({
        status: 200, headers: CORS, contentType: 'application/json',
        body: JSON.stringify({ ok: true, guardado: true, stub: true }),
      });
      return;
    }

    // GET — incluye JSONP (script src con &callback=)
    const u = new URL(req.url());
    const cb = u.searchParams.get('callback');
    const action = u.searchParams.get('action');
    let payload = { ok: true, stub: true };
    if (action === 'resultado') {
      payload = { ok: true, correo: u.searchParams.get('correo'), pre: preStub, post: null };
    }
    const body = cb ? `${cb}(${JSON.stringify(payload)})` : JSON.stringify(payload);
    await route.fulfill({
      status: 200, headers: CORS,
      contentType: cb ? 'application/javascript' : 'application/json',
      body,
    });
  });
  return capturado;
}

function porModo(capturado, modo) {
  return capturado.filter((p) => p && p.modo === modo);
}

module.exports = { stubBackend, porModo };
