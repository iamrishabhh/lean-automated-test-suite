import { Page, expect } from '@playwright/test';
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private usernameInput = this.page.locator('#user-name');
    private passwordInput = this.page.locator('#password');
    private loginButton = this.page.locator('#login-button');
    private burgerMenu = this.page.locator('#react-burger-menu-btn');
    private logoutButton = this.page.locator('#logout_sidebar_link');

    constructor(page: Page) {
        super(page);
    }

    async visitPage() {
        await this.open('/');
    }

    async loginToApplication(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logoutApplication(){
        await this.burgerMenu.click()
        await this.logoutButton.click();
    }
}