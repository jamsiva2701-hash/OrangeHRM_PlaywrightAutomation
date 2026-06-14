import { BaseClass } from '../base/BaseClass.js';

export class LoginPage extends BaseClass {
    constructor(page) {
        super(page);
        this.txtUserName = 'input[name="username"]';
        this.txtPassword = 'input[name="password"]';
        this.btnLogin = 'button[type="submit"]';
        this.dashboardHeader = '.oxd-topbar-header-breadcrumb h6';
    }

    async login(userName, password) {
        console.log('Logging in...');
        await this.page.fill(this.txtUserName, userName);
        await this.page.fill(this.txtPassword, password);
        await this.page.click(this.btnLogin);
        await this.page.waitForLoadState('networkidle', { timeout: 60000 });
        await this.page.waitForTimeout(2000);
        console.log(`Logged in with username: ${userName}`);
    }

    async isDashboardDisplayed() {
        try {
            await this.page.waitForSelector(this.dashboardHeader, { timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async getDashboardText() {
        await this.waitForElement(this.dashboardHeader);
        return await this.page.locator(this.dashboardHeader).textContent();
    }
}
