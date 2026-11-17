// TC06: formulário Contact Us
const path = require('path');
const { test, expect } = require('./helpers/base');
const { gerarUsuario } = require('./helpers/usuario');
const { abrirHome } = require('./helpers/acoes');

test.describe('Contact Us', () => {
  test(
    'TC06 - Contact Us Form',
    {
      annotation: {
        type: 'descrição',
        description:
          'Preenche o formulário de contato com anexo, envia, confirma a mensagem de sucesso e volta à home.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();
      const arquivo = path.resolve(__dirname, 'fixtures', 'arquivo-teste.txt');

      await abrirHome(page);
      await page.getByRole('link', { name: 'Contact us' }).click();
      await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();

      // A mensagem de sucesso é criada por um script jQuery no evento "submit" do formulário.
      // Se o clique em Submit vier antes de os scripts executarem, o navegador envia o
      // formulário de verdade e a mensagem nunca aparece. Por isso espera os scripts rodarem.
      await page.waitForLoadState('domcontentloaded');

      await page.locator('[data-qa="name"]').fill(usuario.nome);
      await page.locator('[data-qa="email"]').fill(usuario.email);
      await page.locator('[data-qa="subject"]').fill('Assunto de teste automatizado');
      await page.locator('[data-qa="message"]').fill('Mensagem ficticia enviada pelo Playwright.');
      await page.locator('input[name="upload_file"]').setInputFiles(arquivo);

      // O site abre um alerta de confirmação ("Press OK to proceed!") ao enviar
      page.once('dialog', (dialog) => dialog.accept());
      await page.locator('[data-qa="submit-button"]').click();

      await expect(page.locator('.status.alert.alert-success')).toHaveText(
        'Success! Your details have been submitted successfully.'
      );

      await page.locator('#form-section a.btn-success').click();
      await expect(page).toHaveURL('/');
    }
  );
});
