// Flujo del participante — PRE y POST de extremo a extremo, con el backend interceptado
// (no escribe en el Sheet real). Verifica calificación, reglas PRE/POST y el contrato de envío.
const { test, expect } = require('@playwright/test');
const { stubBackend, porModo } = require('./_backend');
const { fillEvaluation } = require('./_fill');

test('PRE: califica, NO revela clave y envía payload modo=pre', async ({ page }) => {
  const capturado = await stubBackend(page);
  await page.goto('evaluacion.html?modo=pre', { waitUntil: 'domcontentloaded' });

  await fillEvaluation(page, { modo: 'pre', correct: true });
  await page.locator('#evalForm').evaluate((f) => f.requestSubmit());

  // Resultados visibles, con total.
  await expect(page.locator('.resultados')).toBeVisible();
  await expect(page.locator('.res-total')).toContainText('%');
  // Regla de validez: en PRE NO se revela la clave razonada.
  await expect(page.locator('.clave-box')).toHaveCount(0);

  // Contrato de envío al backend.
  await expect.poll(() => porModo(capturado, 'pre').length).toBeGreaterThan(0);
  const env = porModo(capturado, 'pre')[0];
  expect(env.token, 'token presente').toBeTruthy();
  expect(env.evaluacionId).toBe('metodo-scout');
  expect(env.identificacion.correo).toBe('e2e@example.com');
  expect(env.puntajes.total, 'puntaje total numérico').toEqual(expect.any(Number));
});

test('POST: revela clave, muestra delta PRE→POST y envía payload modo=post', async ({ page }) => {
  // El backend devuelve un PRE bajo para que el delta sea positivo y visible.
  const preStub = {
    timestamp: '2026-06-27T00:00:00Z', modo: 'pre', pct_total: 40,
    puntajes: { eje1: 40, eje2: 40, eje3: 40, transversal: 40, casos: 40, total: 40 },
    autopercepcion: [2, 2, 2, 2, 2, 2],
  };
  const capturado = await stubBackend(page, { preStub });
  await page.goto('evaluacion.html?modo=post', { waitUntil: 'domcontentloaded' });

  await fillEvaluation(page, { modo: 'post', correct: true });
  await page.locator('#evalForm').evaluate((f) => f.requestSubmit());

  await expect(page.locator('.resultados')).toBeVisible();
  // En POST se revela la clave (una caja por ítem).
  const totalItems = await page.evaluate(() => window.__EVAL_DATA__.items.length);
  await expect(page.locator('.clave-box')).toHaveCount(totalItems);
  // Hay delta de mejora visible.
  await expect(page.locator('.delta.up').first()).toBeVisible();

  await expect.poll(() => porModo(capturado, 'post').length).toBeGreaterThan(0);
  const env = porModo(capturado, 'post')[0];
  expect(env.modo).toBe('post');
  expect(env.identificacion.correo).toBe('e2e@example.com');
});
