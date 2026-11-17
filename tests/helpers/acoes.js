// Ações reutilizáveis entre os testes (cadastro, login, logout, exclusão de conta).
const { expect } = require('@playwright/test');

async function abrirHome(page) {
  await page.goto('/');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page.locator('#slider')).toBeVisible();
}

async function irParaLogin(page) {
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page).toHaveURL(/\/login/);
}

async function iniciarCadastro(page, usuario) {
  await page.locator('[data-qa="signup-name"]').fill(usuario.nome);
  await page.locator('[data-qa="signup-email"]').fill(usuario.email);
  await page.locator('[data-qa="signup-button"]').click();
}

async function preencherCadastro(page, usuario) {
  await page.locator('#id_gender2').check();
  await page.locator('[data-qa="password"]').fill(usuario.senha);
  await page.locator('[data-qa="days"]').selectOption(usuario.diaNasc);
  await page.locator('[data-qa="months"]').selectOption(usuario.mesNasc);
  await page.locator('[data-qa="years"]').selectOption(usuario.anoNasc);
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();
  await page.locator('[data-qa="first_name"]').fill(usuario.primeiroNome);
  await page.locator('[data-qa="last_name"]').fill(usuario.sobrenome);
  await page.locator('[data-qa="company"]').fill(usuario.empresa);
  await page.locator('[data-qa="address"]').fill(usuario.endereco);
  await page.locator('[data-qa="address2"]').fill(usuario.endereco2);
  await page.locator('[data-qa="country"]').selectOption(usuario.pais);
  await page.locator('[data-qa="state"]').fill(usuario.estado);
  await page.locator('[data-qa="city"]').fill(usuario.cidade);
  await page.locator('[data-qa="zipcode"]').fill(usuario.cep);
  await page.locator('[data-qa="mobile_number"]').fill(usuario.celular);
}

async function verificarLogado(page, nome) {
  await expect(page.locator('li', { hasText: 'Logged in as' })).toContainText(nome);
}

// Fluxo completo de cadastro; ao final o usuário fica logado na home.
async function criarConta(page, usuario) {
  await abrirHome(page);
  await irParaLogin(page);
  await iniciarCadastro(page, usuario);
  await expect(page.getByText(/enter account information/i)).toBeVisible();
  await preencherCadastro(page, usuario);
  await page.locator('[data-qa="create-account"]').click();
  await expect(page.locator('[data-qa="account-created"]')).toHaveText('Account Created!');
  await page.locator('[data-qa="continue-button"]').click();
  await verificarLogado(page, usuario.nome);
}

async function fazerLogin(page, usuario) {
  await page.goto('/login');
  await page.locator('[data-qa="login-email"]').fill(usuario.email);
  await page.locator('[data-qa="login-password"]').fill(usuario.senha);
  await page.locator('[data-qa="login-button"]').click();
  await verificarLogado(page, usuario.nome);
}

async function fazerLogout(page) {
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/\/login/);
}

async function excluirConta(page) {
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.locator('[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
  await page.locator('[data-qa="continue-button"]').click();
}

module.exports = {
  abrirHome,
  irParaLogin,
  iniciarCadastro,
  preencherCadastro,
  verificarLogado,
  criarConta,
  fazerLogin,
  fazerLogout,
  excluirConta,
};
