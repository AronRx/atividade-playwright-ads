# Atividade Playwright ADS

Automação dos 10 primeiros casos de teste (TC01 a TC10) do site [Automation Exercise](https://www.automationexercise.com/test_cases), usando **JavaScript** e **Playwright Test**.

Disciplina: Teste e Qualidade de Software

## Integrantes

- Kaio Erick Barros de Vasconcelos
- Guilherme Aron de Jesus Teixeira

## Pré-requisitos

- [Node.js](https://nodejs.org/pt-br) (versão LTS)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/) com a extensão *Playwright Test for VSCode* (opcional)

## Instalação

```bash
git clone https://github.com/SEU-USUARIO/atividade-playwright-ads.git
cd atividade-playwright-ads
npm install
npx playwright install chromium
```

## Execução

| Comando | O que faz |
| --- | --- |
| `npm test` | Executa todos os testes |
| `npm run test:headed` | Executa mostrando o navegador |
| `npm run test:ui` | Abre a interface visual do Playwright |
| `npm run report` | Abre o relatório HTML da última execução |
| `npx playwright test tests/auth.spec.js` | Executa apenas um arquivo |
| `npx playwright test --grep "TC06"` | Executa apenas um caso de teste |

O relatório HTML é gerado em `playwright-report/` ao final de cada execução.

## Estrutura do projeto

```
tests/
├── auth.spec.js        # TC01 a TC05: cadastro, login, logout, e-mail existente
├── contact.spec.js     # TC06: formulário Contact Us (com upload)
├── navegacao.spec.js   # TC07 a TC10: test cases, produtos, busca, assinatura
├── fixtures/
│   └── arquivo-teste.txt   # arquivo enviado no upload do TC06
└── helpers/
    ├── base.js         # test estendido: bloqueia anúncios que atrapalham os testes
    ├── usuario.js      # gera dados fictícios e únicos a cada execução
    └── acoes.js        # ações reutilizáveis (criar conta, login, logout, excluir conta)
playwright.config.js    # configuração do Playwright
```

## Casos de teste automatizados

| ID | Cenário | Arquivo |
| --- | --- | --- |
| TC01 | Register User | `auth.spec.js` |
| TC02 | Login User with correct email and password | `auth.spec.js` |
| TC03 | Login User with incorrect email and password | `auth.spec.js` |
| TC04 | Logout User | `auth.spec.js` |
| TC05 | Register User with existing email | `auth.spec.js` |
| TC06 | Contact Us Form | `contact.spec.js` |
| TC07 | Verify Test Cases Page | `navegacao.spec.js` |
| TC08 | Verify All Products and product detail page | `navegacao.spec.js` |
| TC09 | Search Product | `navegacao.spec.js` |
| TC10 | Verify Subscription in home page | `navegacao.spec.js` |

## Dados de teste

- Todos os dados são **fictícios** e gerados a cada execução (e-mails `@example.com` com timestamp).
- Os testes que precisam de conta existente (TC02, TC04, TC05) criam a própria conta e a excluem ao final, então podem ser executados várias vezes sem conflito.
- Não há esperas fixas (`waitForTimeout`): os testes usam a espera automática do Playwright.
