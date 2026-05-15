import { expect } from '@playwright/test';
import data from '../support/fixtures/message.json' with { type: 'json' };;

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(user, password) {
        await this.navigate();
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}