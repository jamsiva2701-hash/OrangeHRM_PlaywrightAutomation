import { BaseClass } from '../base/BaseClass.js';

export class LogoutPage extends BaseClass {
    constructor(page) {
        super(page);
        this.userProfileButton = 'img[alt="profile picture"]';
        this.logoutLink = '//a[text()="Logout"]';
        this.loginPageTitle = '//h5[text()="Login"]';
    }

    async logout() {
        console.log('Logging out...');
        
        try {
            // Click on user profile dropdown button
            console.log('Clicking user profile...');
            const profileBtn = this.page.locator(this.userProfileButton).first();
            const profileCount = await profileBtn.count();
            
            if (profileCount > 0) {
                await profileBtn.click();
                console.log('User profile menu opened');
                await this.page.waitForTimeout(500);
                
                // Click logout link
                console.log('Clicking logout link...');
                const logoutBtn = this.page.locator(this.logoutLink).first();
                const logoutCount = await logoutBtn.count();
                
                if (logoutCount > 0) {
                    await logoutBtn.click();
                    console.log('Logout link clicked');
                    await this.page.waitForTimeout(2000);
                    console.log('Logout completed');
                } else {
                    console.log('Logout link not found');
                }
            } else {
                console.log('User profile button not found');
            }
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    }

    async isLoginPageDisplayed() {
        try {
            await this.page.waitForSelector(this.loginPageTitle, { timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    async getCurrentUrl() {
        return this.page.url();
    }
}
