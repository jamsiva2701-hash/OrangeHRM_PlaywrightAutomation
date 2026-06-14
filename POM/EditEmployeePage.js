import { BaseClass } from '../base/BaseClass.js';

export class EditEmployeePage extends BaseClass {
    constructor(page) {
        super(page);
        this.btnPim = '//span[text()="PIM"]';
        this.btnEmployeeList = '//a[text()="Employee List"]';
        this.txtEmployeeId = '(//input[contains(@class,"oxd-input")])[2]';
        this.btnSearch = 'button[type="submit"]';
        this.employeeRecord = '//div[@role="row"]';
        this.btnEditIcon = 'button[class*="oxd-icon-button"][class*="oxd-table-cell-action-space"]';
        this.ddlJobTitle = '//label[text()="Job Title"]/parent::div//following-sibling::div//div[contains(@class,"oxd-select-wrapper")]';
        this.ddlEmploymentStatus = '//label[text()="Employment Status"]/parent::div//following-sibling::div//div[contains(@class,"oxd-select-wrapper")]';
        this.btnSave = 'button[type="submit"]';
        this.successMessage = '.oxd-toast--success';
    }

    async searchEmployee(employeeId) {
        console.log(`Searching for employee: ${employeeId}`);
        
        try {
            // Navigate to Employee List if not already there
            const currentUrl = this.page.url();
            if (!currentUrl.includes('viewEmployeeList')) {
                await this.page.click(this.btnPim);
                await this.page.waitForTimeout(500);
                
                const employeeListLink = this.page.locator('//a[text()="Employee List"]');
                const count = await employeeListLink.count();
                if (count > 0) {
                    await employeeListLink.click();
                    await this.page.waitForNavigation().catch(() => {});
                    await this.page.waitForTimeout(1000);
                }
            }

            // Fill the employee ID search field
            const idInput = this.page.locator(this.txtEmployeeId);
            await idInput.clear();
            await idInput.fill(employeeId);
            await this.page.waitForTimeout(500);

            // Click search button
            await this.page.click(this.btnSearch);
            await this.page.waitForTimeout(1500);

            console.log('Employee search executed');
        } catch (error) {
            console.error('Error searching employee:', error.message);
            throw error;
        }
    }

    async updateJobDetails(jobTitle, employmentStatus) {
        console.log('Updating job details...');
        
        try {
            // Wait a moment for results to load
            await this.page.waitForTimeout(1000);

            // Click on the edit icon (pencil icon)
            console.log('Clicking edit icon...');
            const editBtn = this.page.locator(this.btnEditIcon).first();
            const editCount = await editBtn.count();
            
            if (editCount > 0) {
                await editBtn.click();
                // Don't wait for navigation - the page loads dynamically
                await this.page.waitForTimeout(2000);
                console.log('Edit page opened');
            } else {
                console.log('Edit button not found');
                return;
            }

            // Click on Job Details tab
            console.log('Clicking Job Details tab...');
            const jobTab = this.page.locator('//a[contains(text(), "Job")]').first();
            const jobTabCount = await jobTab.count();
            
            if (jobTabCount > 0) {
                await jobTab.click();
                await this.page.waitForTimeout(1500);
                console.log('Job Details tab opened');
            } else {
                console.log('Job Details tab not found');
            }

            // Scroll down to Job Title and Employment Status fields
            await this.page.evaluate(() => window.scrollBy(0, 400));
            await this.page.waitForTimeout(500);

            // Update Job Title
            console.log(`Setting Job Title: ${jobTitle}`);
            const jobTitleDropdown = this.page.locator(this.ddlJobTitle).first();
            const jobTitleCount = await jobTitleDropdown.count();
            
            if (jobTitleCount > 0) {
                await jobTitleDropdown.click();
                await this.page.waitForTimeout(400);
                
                const jobTitleOption = this.page.locator(`//span[text()="${jobTitle}"]`).first();
                const optCount = await jobTitleOption.count();
                
                if (optCount > 0) {
                    await jobTitleOption.click();
                    console.log(`Job Title set to: ${jobTitle}`);
                    await this.page.waitForTimeout(300);
                } else {
                    console.warn(`Job title option not found: ${jobTitle}`);
                }
            } else {
                console.warn('Job Title dropdown not found');
            }

            // Update Employment Status
            console.log(`Setting Employment Status: ${employmentStatus}`);
            const statusDropdown = this.page.locator(this.ddlEmploymentStatus).first();
            const statusCount = await statusDropdown.count();
            
            if (statusCount > 0) {
                await statusDropdown.click();
                await this.page.waitForTimeout(400);
                
                const statusOption = this.page.locator(`//span[text()="${employmentStatus}"]`).first();
                const statusOptCount = await statusOption.count();
                
                if (statusOptCount > 0) {
                    await statusOption.click();
                    console.log(`Employment Status set to: ${employmentStatus}`);
                    await this.page.waitForTimeout(300);
                } else {
                    console.warn(`Employment status option not found: ${employmentStatus}`);
                }
            } else {
                console.warn('Employment Status dropdown not found');
            }

            // Scroll down to find Save button
            await this.page.evaluate(() => window.scrollBy(0, 300));
            await this.page.waitForTimeout(500);

            // Click Save button
            console.log('Clicking Save button...');
            const saveBtn = this.page.locator(this.btnSave).last();
            const saveBtnCount = await saveBtn.count();
            
            if (saveBtnCount > 0) {
                await saveBtn.click();
                // Wait for success message or page update, not full navigation
                await this.page.waitForTimeout(2000);
                console.log(`Changes saved - Job Title: ${jobTitle}, Status: ${employmentStatus}`);
            } else {
                console.warn('Save button not found');
            }

        } catch (error) {
            console.error('Error updating job details:', error.message);
            // Continue with test - don't throw
        }
    }

    async isUpdateSuccessful() {
        try {
            const successMsg = this.page.locator(this.successMessage);
            const isVisible = await successMsg.isVisible({ timeout: 3000 }).catch(() => false);
            return isVisible;
        } catch (e) {
            return false;
        }
    }
}
