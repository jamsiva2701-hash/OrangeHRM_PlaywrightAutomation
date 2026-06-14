import { BaseClass } from '../base/BaseClass.js';

export class EmployeeListPage extends BaseClass {
    constructor(page) {
        super(page);
        this.noRecordsFound = '//span[text()="No Records Found"]';
        this.employeeRecord = '//div[@role="rowgroup"]//div[@role="row"]';
        this.btnPim = '//span[text()="PIM"]';
        this.txtEmployeeId = '(//input[contains(@class,"oxd-input")])[2]';
        this.btnSearch = 'button[type="submit"]';
        this.btnDelete = '(//button[i[contains(@class,"bi-trash")]])[1]';
        this.btnConfirmDelete = 'button.oxd-button--label-danger';
    }

    async searchEmployee(employeeId) {
        console.log(`Searching for employee: ${employeeId}`);
        
        await this.page.click(this.btnPim);
        await this.page.waitForTimeout(500);
        
        const idInput = this.page.locator(this.txtEmployeeId);
        await idInput.clear();
        await idInput.fill(employeeId);

        await this.page.click(this.btnSearch);
        await this.page.waitForTimeout(1000);
    }

    async isEmployeePresent() {
        try {
            await this.page.waitForSelector(this.employeeRecord, { timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    // async deleteEmployee(employeeId) {
    //     console.log(`Deleting employee: ${employeeId}`);
        
    //     await this.searchEmployee(employeeId);
        
    //     await this.page.click(this.btnDelete);
    //     await this.page.waitForTimeout(300);
        
    //     await this.page.click(this.btnConfirmDelete);
    //     await this.page.waitForTimeout(2000);

    //     console.log(`Employee deleted: ${employeeId}`);
    // }

    async deleteEmployee(employeeId) {
    console.log(`Deleting employee: ${employeeId}`);

    await this.searchEmployee(employeeId);
    console.log('Search completed');

    await this.page.click(this.btnDelete);
    console.log('Delete button clicked');

    await this.page.click(this.btnConfirmDelete);
    console.log('Confirm delete clicked');

    console.log(`Employee deleted: ${employeeId}`);
}

   

    async isEmployeeDeleted(employeeId) {
        try {
            const noRecords = this.page.locator(this.noRecordsFound);
            const isVisible = await noRecords.isVisible().catch(() => false);
            
            if (isVisible) {
                return true;
            }

            const employeeIdCell = `//div[@role="cell"]//div[text()="${employeeId}"]`;
            const elements = await this.page.locator(employeeIdCell).count();
            
            return elements === 0;
        } catch (e) {
            return true;
        }
    }
}
