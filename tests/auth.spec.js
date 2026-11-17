// TC01 a TC05: cadastro e autenticação
const { test, expect } = require('./helpers/base');
const { gerarUsuario } = require('./helpers/usuario');
const {
  abrirHome,
  irParaLogin,
  iniciarCadastro,
  preencherCadastro,
  verificarLogado,
  criarConta,
  fazerLogin,
  fazerLogout,
  excluirConta,
} = require('./helpers/acoes');

test.describe('Cadastro e autenticação', () => {
  test(
    'TC01 - Register User',
    {
      annotation: {
        type: 'descrição',
        description:
          'Cadastra um novo usuário com dados fictícios, confirma o login e exclui a conta.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();

      await abrirHome(page);
      await irParaLogin(page);

      await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
      await iniciarCadastro(page, usuario);

      await expect(page.getByText(/enter account information/i)).toBeVisible();
      await preencherCadastro(page, usuario);
      await page.locator('[data-qa="create-account"]').click();

      await expect(page.locator('[data-qa="account-created"]')).toHaveText('Account Created!');
      await page.locator('[data-qa="continue-button"]').click();

      await verificarLogado(page, usuario.nome);
      await excluirConta(page);
    }
  );

  test(
    'TC02 - Login User with correct email and password',
    {
      annotation: {
        type: 'descrição',
        description:
          'Faz login com e-mail e senha corretos de uma conta recém-criada e depois exclui a conta.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();
      await criarConta(page, usuario);
      await fazerLogout(page);

      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      await fazerLogin(page, usuario);
      await excluirConta(page);
    }
  );

  test(
    'TC03 - Login User with incorrect email and password',
    {
      annotation: {
        type: 'descrição',
        description:
          'Tenta fazer login com credenciais inexistentes e verifica a mensagem de erro.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();

      await abrirHome(page);
      await irParaLogin(page);
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

      await page.locator('[data-qa="login-email"]').fill(usuario.email);
      await page.locator('[data-qa="login-password"]').fill('senha-incorreta');
      await page.locator('[data-qa="login-button"]').click();

      await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    }
  );

  test(
    'TC04 - Logout User',
    {
      annotation: {
        type: 'descrição',
        description:
          'Faz login com uma conta válida, executa o logout e verifica o retorno à tela de login.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();
      await criarConta(page, usuario);
      await fazerLogout(page);

      await fazerLogin(page, usuario);
      await page.getByRole('link', { name: 'Logout' }).click();

      await expect(page).toHaveURL(/\/login/);
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

      // Limpeza: remove a conta criada para o teste
      await fazerLogin(page, usuario);
      await excluirConta(page);
    }
  );

  test(
    'TC05 - Register User with existing email',
    {
      annotation: {
        type: 'descrição',
        description:
          'Tenta cadastrar um usuário com um e-mail já existente e verifica a mensagem de erro.',
      },
    },
    async ({ page }) => {
      const usuario = gerarUsuario();
      await criarConta(page, usuario);
      await fazerLogout(page);

      await irParaLogin(page);
      await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
      await iniciarCadastro(page, usuario);

      await expect(page.getByText('Email Address already exist!')).toBeVisible();

      // Limpeza: remove a conta criada para o teste
      await fazerLogin(page, usuario);
      await excluirConta(page);
    }
  );
});
