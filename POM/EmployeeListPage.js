import { BaseClass } from '../base/BaseClass.js';

export class EmployeeListPage extends BaseClass {
    constructor(page) {
        super(page);

        this.noRecordsFound = '//span[text()="No Records Found"]';
        this.employeeRecord = '//div[@role="rowgroup"]//div[@role="row"]';

        this.btnPim = '//span[text()="PIM"]';

        // Employee Id Search field
        this.txtEmployeeId = '(//input[contains(@class,"oxd-input")])[2]';

        this.btnSearch = 'button[type="submit"]';

        this.btnDelete = '(//button[i[contains(@class,"bi-trash")]])[1]';

        this.btnConfirmDelete = 'button.oxd-button--label-danger';
    }

    async searchEmployee(employeeId) {
        console.log(`Searching for employee: ${employeeId}`);

        await this.page.click(this.btnPim);

        await this.page.waitForLoadState('networkidle');

        const idInput = this.page.locator(this.txtEmployeeId);

        await idInput.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await idInput.clear();
        await idInput.fill(employeeId);

        console.log(`Filled Employee ID: ${employeeId}`);

        await this.page.click(this.btnSearch);

        await this.page.waitForLoadState('networkidle');

        console.log('Search completed');

        await this.page.screenshot({
            path: `screenshots/search-${employeeId}.png`,
            fullPage: true
        });
    }

    async isEmployeePresent(employeeId) {
        try {

            console.log('Waiting for employee record...');

            const employeeLocator =
                `//div[@role="cell"]//*[contains(text(),"${employeeId}")]`;

            await this.page.waitForSelector(employeeLocator, {
                timeout: 30000
            });

            console.log('Employee record found');

            return true;

        } catch (e) {

            console.log('Employee record NOT found');
            console.log(e.message);

            await this.page.screenshot({
                path: `screenshots/employee-not-found-${Date.now()}.png`,
                fullPage: true
            });

            return false;
        }
    }

    async deleteEmployee(employeeId) {

        console.log(`Deleting employee: ${employeeId}`);

        await this.searchEmployee(employeeId);

        await this.page.waitForSelector(this.btnDelete, {
            state: 'visible',
            timeout: 30000
        });

        console.log('Delete button visible');

        await this.page.click(this.btnDelete);

        console.log('Delete button clicked');

        await this.page.waitForSelector(this.btnConfirmDelete, {
            state: 'visible',
            timeout: 30000
        });

        console.log('Confirmation popup visible');

        await this.page.click(this.btnConfirmDelete);

        console.log('Confirm delete clicked');

        await this.page.waitForLoadState('networkidle');

        console.log(`Employee deleted: ${employeeId}`);
    }

    async isEmployeeDeleted(employeeId) {

        try {

            const noRecords = this.page.locator(this.noRecordsFound);

            if (await noRecords.isVisible().catch(() => false)) {
                return true;
            }

            const employeeLocator =
                `//div[@role="cell"]//*[contains(text(),"${employeeId}")]`;

            const count =
                await this.page.locator(employeeLocator).count();

            return count === 0;

        } catch (e) {

            console.log('Error while validating deletion');
            console.log(e.message);

            return true;
        }
    }
}