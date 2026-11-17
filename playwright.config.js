// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Configuração da atividade prática de Playwright (ADS).
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Testes rodam em sequência: o site é público e instável sob carga */
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 1,

  timeout: 60_000,
  expect: { timeout: 10_000 },

  /* Lista no terminal + relatório HTML (sem abrir o navegador sozinho) */
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://www.automationexercise.com',
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    /* Evidências: print de cada teste, trace na repetição e vídeo nas falhas */
    screenshot: 'on',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
