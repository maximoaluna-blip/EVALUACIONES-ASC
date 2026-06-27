// Smoke — cada página carga (HTTP < 400), renderiza un encabezado y no lanza excepciones JS.
const { test, expect } = require('@playwright/test');

const PAGINAS = [
  { name: 'portada',   url: 'index.html',                marca: 'Evaluación de Apropiación' },
  { name: 'pre',       url: 'evaluacion.html?modo=pre',  marca: 'Evaluación PRE' },
  { name: 'post',      url: 'evaluacion.html?modo=post', marca: 'Evaluación POST' },
  { name: 'dashboard', url: 'dashboard-formador.html',   marca: 'Tablero del formador' },
];

for (const p of PAGINAS) {
  test(`smoke: ${p.name} carga y renderiza`, async ({ page }) => {
    const erroresJs = [];
    page.on('pageerror', (e) => erroresJs.push(String(e)));

    const resp = await page.goto(p.url, { waitUntil: 'domcontentloaded' });
    expect(resp, 'sin respuesta HTTP').toBeTruthy();
    expect(resp.status(), 'status HTTP').toBeLessThan(400);

    // Encabezado visible (las páginas de evaluación se renderizan por JS).
    await expect(page.locator('h1').first()).toBeVisible();
    // Marca específica de la página visible en algún punto.
    await expect(page.getByText(p.marca, { exact: false }).first()).toBeVisible();

    expect(erroresJs, `excepciones JS: ${erroresJs.join(' | ')}`).toEqual([]);
  });
}
