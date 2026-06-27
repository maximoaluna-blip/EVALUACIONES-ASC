// Accesibilidad con axe-core — WCAG 2.0/2.1 A y AA. Reporta serious/critical. Solo escritorio.
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const IMPACTOS = new Set(['serious', 'critical']);

const PAGINAS = [
  { name: 'portada', url: 'index.html', espera: 'h1' },
  { name: 'evaluacion-pre', url: 'evaluacion.html?modo=pre', espera: '#evalForm' },
  { name: 'dashboard', url: 'dashboard-formador.html', espera: '#loginCard' },
];

test.describe('@solo-escritorio accesibilidad', () => {
  for (const p of PAGINAS) {
    test(`a11y: ${p.name}`, async ({ page }, testInfo) => {
      await page.goto(p.url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector(p.espera);

      const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      const graves = r.violations.filter((v) => IMPACTOS.has(v.impact));
      const resumen = graves
        .map((v) => `[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodo/s)`)
        .join('\n');
      if (graves.length) testInfo.annotations.push({ type: 'a11y', description: resumen });
      expect(graves, `violaciones serious/critical:\n${resumen}`).toEqual([]);
    });
  }
});
