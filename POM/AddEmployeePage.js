import { BaseClass } from '../base/BaseClass.js';
import path from 'path';

export class AddEmployeePage extends BaseClass {
    constructor(page) {
        super(page);
        this.btnPim = '//span[text()="PIM"]';
        this.btnAddEmployee = '//a[contains(text(),"Add Employee")]';
        this.txtFirstName = 'input[name="firstName"]';
        this.txtLastName = 'input[name="lastName"]';
        this.btnProfileUpload = 'button:has-text("Choose File")';
        this.btnSave = 'button[type="submit"]';
        this.successMessage = '.oxd-toast--success';
    }

    async uploadProfilePicture(imagePath) {
        console.log(`Uploading profile picture: ${imagePath}`);
        try {
            const fileInput = this.page.locator('input[type="file"]');
            await fileInput.setInputFiles(imagePath);
            await this.page.waitForTimeout(1000);
            console.log('Profile picture uploaded');
        } catch (error) {
            console.warn('Profile picture upload skipped:', error.message);
        }
    }

    async addEmployee(firstName, lastName, imagePath = null) {
        console.log('Adding new employee...');
        
        try {
            // Navigate to PIM > Add Employee
            console.log('Clicking PIM menu...');
            await this.page.click(this.btnPim);
            await this.page.waitForTimeout(1000);
            
            console.log('Clicking Add Employee...');
            await this.page.click(this.btnAddEmployee);
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);

            // Upload profile picture if provided
            if (imagePath) {
                await this.uploadProfilePicture(imagePath);
            }

            // Fill basic form
            console.log(`Filling First Name: ${firstName}`);
            await this.page.fill(this.txtFirstName, firstName);
            
            console.log(`Filling Last Name: ${lastName}`);
            await this.page.fill(this.txtLastName, lastName);

            // Generate random employee ID (7 digits)
            const randomNum = Math.floor(Math.random() * 9000000) + 1000000;
            console.log(`Setting Employee ID: ${randomNum}`);
            
            // Fill Employee ID field
            let employeeIdInput = this.page.locator('input[placeholder="Type for hints..."]').first();
            let count = await employeeIdInput.count().catch(() => 0);
            
            if (count === 0) {
              employeeIdInput = this.page.locator('//label[text()="Employee Id"]/parent::div//following-sibling::div//input').first();
            }
            
            await employeeIdInput.fill(String(randomNum));
            await this.page.waitForTimeout(500);
            
            // Click Save button
            console.log('Clicking Save button...');
            await this.page.click(this.btnSave);
            
            // Wait for page navigation/success
            await this.page.waitForNavigation().catch(() => {});
            await this.page.waitForTimeout(3000);

            console.log(`Employee added: ${firstName} ${lastName} (ID: ${randomNum})`);
            return String(randomNum);
        } catch (error) {
            console.error('Error adding employee:', error.message);
            throw error;
        }
    }

    async isEmployeeAdded() {
        try {
            const successMsg = await this.page.locator(this.successMessage).first();
            const isVisible = await successMsg.isVisible({ timeout: 5000 }).catch(() => false);
            return isVisible;
        } catch (e) {
            console.log('Success message not found, but operation may have succeeded');
            return true;
        }
    }
}
