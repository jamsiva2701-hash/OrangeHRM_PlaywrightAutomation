import fs from 'fs';
import path from 'path';

export class BaseClass {
    constructor(page) {
        this.page = page;
        this.testData = null;
    }

    async loadJsonData() {
        try {
            const dataPath = path.join(process.cwd(), 'testdata/EmployeeData.json');
            const data = fs.readFileSync(dataPath, 'utf-8');
            this.testData = JSON.parse(data);
            console.log('Test data loaded successfully');
        } catch (error) {
            console.error('Failed to load test data:', error.message);
            throw error;
        }
    }

    getJsonData(key) {
        if (!this.testData) {
            throw new Error('Test data not loaded. Call loadJsonData() first.');
        }
        return this.testData[key];
    }

    async waitForLoader() {
        try {
            await this.page.waitForSelector('div[contains(@class,"oxd-form-loader")]', { 
                state: 'hidden',
                timeout: 30000 
            });
        } catch (e) {
            console.log('Loader not found or already hidden');
        }
    }

    async waitForElement(selector, timeout = 30000) {
        return this.page.waitForSelector(selector, { timeout });
    }

    async screenshot(fileName) {
        const screenshotPath = `./screenshots/${fileName}.png`;
        await this.page.screenshot({ path: screenshotPath });
        console.log(`✓ Screenshot saved: ${screenshotPath}`);
        return screenshotPath;
    }
}
