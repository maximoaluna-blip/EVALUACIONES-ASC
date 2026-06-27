// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Por defecto corre contra el sitio público (GitHub Pages). En CI/local se
// sobrescribe con ASC_BASE_URL para apuntar al build servido en localhost.
// Las pruebas de flujo SIEMPRE interceptan el backend (stub): nunca escriben
// en el Google Sheet real, apunten donde apunten.
const BASE_URL =
  process.env.ASC_BASE_URL ||
  'https://maximoaluna-blip.github.io/EVALUACIONES-ASC/';

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'movil-android',
      use: { ...devices['Pixel 5'] },
      // a11y corre solo en escritorio para no duplicar.
      grepInvert: /@solo-escritorio/,
    },
  ],
});
