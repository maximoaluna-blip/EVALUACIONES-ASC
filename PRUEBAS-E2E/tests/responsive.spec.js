// Responsive — sin scroll horizontal y con el encabezado visible, en escritorio y móvil
// (el proyecto movil-android usa viewport de Pixel 5).
const { test, expect } = require('@playwright/test');

const PAGINAS = ['index.html', 'evaluacion.html?modo=pre', 'dashboard-formador.html'];

for (const url of PAGINAS) {
  test(`responsive: ${url} sin overflow horizontal`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1').first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, 'scroll horizontal (px de exceso)').toBeLessThanOrEqual(2);
  });
}
