# Pruebas E2E — EVALUACIONES-ASC

Suite de Playwright + axe que valida la app de evaluaciones. Corre en **GitHub Actions** en cada push/PR a `main` (`.github/workflows/pruebas-e2e.yml`) y también en local.

## Qué cubre

| Spec | Valida |
|---|---|
| `smoke.spec.js` | Portada, PRE, POST y tablero cargan, renderizan y no lanzan errores JS. |
| `a11y.spec.js` | Accesibilidad WCAG A/AA (axe), sin violaciones serious/critical. Solo escritorio. |
| `responsive.spec.js` | Sin scroll horizontal en escritorio y móvil (Pixel 5). |
| `e2e-flujo.spec.js` | Flujo PRE (califica, **no** revela clave, envía `modo=pre`) y POST (revela clave, muestra **delta** PRE→POST, envía `modo=post`). |

**El backend siempre se intercepta** (`tests/_backend.js`): las pruebas nunca escriben en el Google Sheet real, apunten a donde apunten. Los envíos POST se capturan para verificar el contrato; las lecturas JSONP se simulan.

## Correr en local

```bash
cd PRUEBAS-E2E
npm install
npx playwright install chromium

# Servir el repo (en otra terminal, desde la raíz EVALUACIONES-ASC):
python -m http.server 8099

# Correr la suite contra ese servidor:
ASC_BASE_URL=http://localhost:8099/ npm test
```

Sin `ASC_BASE_URL`, la suite corre contra producción (GitHub Pages). Aun así, el flujo PRE/POST intercepta el backend y no escribe datos reales.

## Proyectos

- `desktop-chromium` — Chrome de escritorio.
- `movil-android` — Pixel 5 (a11y se omite aquí; corre solo en escritorio).
