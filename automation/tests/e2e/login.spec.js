import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';

test.describe('Autenticação - Sauce Demo', () => {
    let login;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
    });

    test('Deve realizar login com sucesso', async ({ page }) => {
        await login.login(process.env.SUCESSUSER, process.env.PASSWORD);

        await test.step('Validar se o redirecionamento ocorreu', async () => {
            await expect(page).toHaveURL(/inventory.html/);
        });
    });

    test('Deve exibir mensagem de erro para usuário bloqueado', async () => {
        await login.login(process.env.BLOCKUSER, process.env.PASSWORD);

        await test.step('Validar mensagem de bloqueio', async () => {
            await expect(login.errorMessage).toHaveText(/Sorry, this user has been locked out/);
        });
    });

    test('Deve exibir mensagem de erro para senha incorreta', async () => {
        await login.login(process.env.SUCESSUSER, 'senha_errada');

        await test.step('Validar mensagem de credenciais incorretas', async () => {
            await expect(login.errorMessage).toHaveText(/Username and password do not match/);
        });
    });
});