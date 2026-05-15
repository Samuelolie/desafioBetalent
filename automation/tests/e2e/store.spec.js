import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';
import { StorePage } from '../pages/Store';

test.describe('Gerenciamento do Carrinho - Sauce Demo', () => {
    let login;
    let store;
    const product = 'Sauce Labs Fleece Jacket';

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        store = new StorePage(page);

        await login.login(process.env.SUCESSUSER, process.env.PASSWORD);
    });

    test('Deve adicionar um item ao carrinho com sucesso', async () => {
        await test.step('Adicionar o produto', async () => {
            await store.addShoppingCart(product);
        });

        await test.step('Verificar se o produto está no sumário do carrinho', async () => {
            const itemNoCarrinho = await store.goToCartAndVerify(product);
            await expect(itemNoCarrinho).toBeVisible();
        });
    });

    test('Deve remover um item do carrinho com sucesso', async ({ page }) => {
        await test.step('Adicionar item e validar badge', async () => {
            await store.addShoppingCart(product);
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
        });

        await test.step('Remover item e validar se o badge sumiu', async () => {
            await store.removeShoppingCart(product);
            await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
        });
    });
});