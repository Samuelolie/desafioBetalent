import { expect } from '@playwright/test';

export class StorePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
    }

    /**
     * Adiciona um produto ao carrinho com base no nome
     * @param {string} productName 
     */
    async addShoppingCart(productName) {
        const productRow = this.inventoryItems.filter({ hasText: productName });
        await productRow.locator('button:has-text("Add to cart")').click();
    }

    /**
     * Remove um produto do carrinho
     * @param {string} productName 
     */
    async removeShoppingCart(productName) {
        const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
        await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
    }

    /**
     * Navega para o carrinho e retorna o locator do nome do produto para validação
     * @param {string} productName 
     */
    async goToCartAndVerify(productName) {
        await this.cartIcon.click();
        return this.cartItemName.filter({ hasText: productName });
    }
}