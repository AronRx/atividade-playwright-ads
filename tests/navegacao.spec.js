// TC07 a TC10: navegação, produtos, busca e assinatura
const { test, expect } = require('./helpers/base');
const { abrirHome } = require('./helpers/acoes');
const { gerarUsuario } = require('./helpers/usuario');

test.describe('Navegação, produtos e assinatura', () => {
  test(
    'TC07 - Verify Test Cases Page',
    {
      annotation: {
        type: 'descrição',
        description: 'Acessa a página Test Cases pelo menu e verifica a URL e o título da página.',
      },
    },
    async ({ page }) => {
      await abrirHome(page);
      await page.locator('header').getByRole('link', { name: 'Test Cases' }).click();

      await expect(page).toHaveURL(/\/test_cases/);
      await expect(page.locator('h2.title', { hasText: 'Test Cases' })).toBeVisible();
    }
  );

  test(
    'TC08 - Verify All Products and product detail page',
    {
      annotation: {
        type: 'descrição',
        description:
          'Abre a lista de produtos, entra no detalhe do primeiro produto e verifica seus dados.',
      },
    },
    async ({ page }) => {
      await abrirHome(page);
      await page.locator('header').getByRole('link', { name: 'Products' }).click();

      await expect(page).toHaveURL(/\/products/);
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
      await expect(page.locator('.features_items .product-image-wrapper').first()).toBeVisible();

      await page.locator('a[href^="/product_details/"]').first().click();
      await expect(page).toHaveURL(/\/product_details\//);

      const detalhes = page.locator('.product-information');
      await expect(detalhes).toBeVisible();
      await expect(detalhes.locator('h2')).toBeVisible();
      await expect(detalhes).toContainText('Category:');
      await expect(detalhes).toContainText('Rs.');
      await expect(detalhes).toContainText('Availability:');
      await expect(detalhes).toContainText('Condition:');
      await expect(detalhes).toContainText('Brand:');
    }
  );

  test(
    'TC09 - Search Product',
    {
      annotation: {
        type: 'descrição',
        description: 'Pesquisa um produto pelo nome e verifica se o resultado exibido corresponde.',
      },
    },
    async ({ page }) => {
      const termo = 'Blue Top';

      await abrirHome(page);
      await page.locator('header').getByRole('link', { name: 'Products' }).click();
      await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

      // Espera a página carregar por completo: o clique na lupa depende de scripts do site
      await page.waitForLoadState('load');
      await page.locator('#search_product').fill(termo);

      // Se o script da busca ainda não estava pronto, o clique não faz nada: repete até a busca rodar
      await expect(async () => {
        await page.locator('#submit_search').click();
        await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible({
          timeout: 10_000,
        });
      }).toPass({ timeout: 40_000 });
      const resultados = page.locator('.features_items .product-image-wrapper');
      await expect(resultados.first()).toBeVisible();
      await expect(resultados.first()).toContainText(termo);
    }
  );

  test(
    'TC10 - Verify Subscription in home page',
    {
      annotation: {
        type: 'descrição',
        description:
          'Rola até o rodapé da home, assina a newsletter com e-mail fictício e verifica a confirmação.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();

      await abrirHome(page);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();

      await page.locator('#susbscribe_email').fill(usuario.email);
      await page.locator('#subscribe').click();

      await expect(page.locator('#success-subscribe')).toContainText(
        'You have been successfully subscribed!'
      );
    }
  );
});
