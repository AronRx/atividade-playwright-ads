// Teste base do projeto: estende o Playwright Test bloqueando anúncios e
// scripts de rastreamento, que atrapalham os cliques e a navegação do site.
const base = require('@playwright/test');

const BLOQUEADOS =
  /googlesyndication|doubleclick|googleadservices|adservice\.google|pagead|fundingchoices|googletagmanager|google-analytics/;

const test = base.test.extend({
  page: async ({ page }, use) => {
    await page.route(BLOQUEADOS, (route) => route.abort());
    await use(page);
  },
});

module.exports = { test, expect: base.expect };
