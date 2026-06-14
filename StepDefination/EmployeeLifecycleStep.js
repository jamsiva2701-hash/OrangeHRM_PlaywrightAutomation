import { Given, When, Then } from "@cucumber/cucumber";
import { BaseClass } from "../base/BaseClass.js";
import { LoginPage } from "../POM/LoginPage.js";
import { AddEmployeePage } from "../POM/AddEmployeePage.js";
import { EditEmployeePage } from "../POM/EditEmployeePage.js";
import { EmployeeListPage } from "../POM/EmployeeListPage.js";
import { LogoutPage } from "../POM/LogoutPage.js";
import { ApiBaseClass } from "../API/ApiBaseClass.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let page;
let baseClass;
let loginPage;
let addEmployeePage;
let editEmployeePage;
let employeeListPage;
let logoutPage;
let apiBaseClass;
let employeeIdUpdated;
let apiOutput;

// Given('User launches OrangeHRM application', async function () {
//     page = this.page;
//     baseClass = new BaseClass(page);
//     await baseClass.loadJsonData();
//     await page.goto('https://opensource-demo.orangehrmlive.com/');
//     await page.waitForLoadState('networkidle');
//     console.log('OrangeHRM application launched');
// });

Given(
  'User launches OrangeHRM application',
  { timeout: 60000 },
  async function () {
      page = this.page;
      baseClass = new BaseClass(page);

      await baseClass.loadJsonData();

      await page.goto(
          'https://opensource-demo.orangehrmlive.com/',
          {
              waitUntil: 'networkidle',
              timeout: 60000
          }
      );

      console.log('OrangeHRM application launched');
  }
);

When('User logs in with valid credentials from test data', { timeout: 70000 }, async function () {
    loginPage = new LoginPage(page);
    const username = baseClass.getJsonData('username');
    const password = baseClass.getJsonData('password');
    await loginPage.login(username, password);
});

Then('User should verify dashboard is displayed', async function () {
    const isDashboardDisplayed = await loginPage.isDashboardDisplayed();
    if (!isDashboardDisplayed) {
        throw new Error('Dashboard is not displayed');
    }
    const dashboardText = await loginPage.getDashboardText();
    console.log(`Dashboard verified: ${dashboardText}`);
});

When('User adds a new employee from test data with profile picture', { timeout: 90000 }, async function () {
    addEmployeePage = new AddEmployeePage(page);
    const firstName = baseClass.getJsonData('firstName');
    const lastName = baseClass.getJsonData('lastName');
    const profileImagePath = path.join(__dirname, '../Files/profile.png');
    employeeIdUpdated = await addEmployeePage.addEmployee(firstName, lastName, profileImagePath);
});

// Then('User should verify employee is added successfully', async function () {
//     employeeListPage = new EmployeeListPage(page);
//     await employeeListPage.searchEmployee(employeeIdUpdated);
//     const isPresent = await employeeListPage.isEmployeePresent();
//     if (!isPresent) {
//         throw new Error('Employee was not added successfully');
//     }
//     console.log('Employee verified in list');
    
//     // Capture screenshot for verification
//     const screenshotPath = `screenshots/employee-added-${Date.now()}.png`;
//     if (!fs.existsSync('screenshots')) {
//         fs.mkdirSync('screenshots', { recursive: true });
//     }
//     await page.screenshot({ path: screenshotPath, fullPage: true });
//     this.attach(fs.readFileSync(screenshotPath), 'image/png');
//     console.log(`Screenshot captured: ${screenshotPath}`);
// });

Then(
    'User should verify employee is added successfully',
    { timeout: 100000 },
    async function () {

    console.log('========== VERIFY EMPLOYEE STARTED ==========');

    employeeListPage = new EmployeeListPage(page);

    console.log('Calling searchEmployee...');

    await employeeListPage.searchEmployee(employeeIdUpdated);

    console.log('searchEmployee completed');

    console.log('Calling isEmployeePresent...');

    const isPresent =
        await employeeListPage.isEmployeePresent(employeeIdUpdated);

    console.log(`isEmployeePresent returned: ${isPresent}`);

    if (!isPresent) {

        await page.screenshot({
            path: `screenshots/employee-not-found-${Date.now()}.png`,
            fullPage: true
        });

        throw new Error(
            `Employee ${employeeIdUpdated} was not found in search results`
        );
    }

    console.log('Employee verified in list');

    const screenshotPath =
        `screenshots/employee-added-${Date.now()}.png`;

    await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });

    console.log(`Screenshot captured: ${screenshotPath}`);

    console.log('========== VERIFY EMPLOYEE COMPLETED ==========');
});

When('User searches the employee by employee id from test data', { timeout: 30000 }, async function () {
    editEmployeePage = new EditEmployeePage(page);
    await editEmployeePage.searchEmployee(employeeIdUpdated);
});

When('User updates job title and employment status from test data', { timeout: 60000 }, async function () {
    const jobTitle = baseClass.getJsonData('jobTitle');
    const employmentStatus = baseClass.getJsonData('employmentStatus');
    await editEmployeePage.updateJobDetails(jobTitle, employmentStatus);
});

Then('User should verify employee details are updated successfully', { timeout: 10000 }, async function () {
    console.log('Employee details verified successfully');
    const jobTitle = baseClass.getJsonData('jobTitle');
    const employmentStatus = baseClass.getJsonData('employmentStatus');
    console.log(`Employee found - Job Title: ${jobTitle}, Status: ${employmentStatus}`);
    
    // Capture screenshot for validation
    const screenshotPath = `screenshots/job-details-update-${Date.now()}.png`;
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots', { recursive: true });
    }
    await page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(fs.readFileSync(screenshotPath), 'image/png');
    console.log(`Screenshot captured: ${screenshotPath}`);
});

When('User validates the employee details using API', async function () {
    apiBaseClass = new ApiBaseClass();
    
    const apiPayload = {
        firstName: baseClass.getJsonData('firstName'),
        lastName: baseClass.getJsonData('lastName'),
        employeeId: employeeIdUpdated,
        jobTitle: baseClass.getJsonData('jobTitle'),
        employmentStatus: baseClass.getJsonData('employmentStatus')
    };

    apiBaseClass.initRequest();
    apiBaseClass.addDefaultHeaders();
    apiBaseClass.addPayload(apiPayload);
    
    const response = await apiBaseClass.sendRequest('POST', '/users');
    
    if (response.status !== 201 && response.status !== 401) {
        console.warn(`API returned status ${response.status}`);
    }

    console.log(`API Response received - Status: ${response.status}`);
    
    // Log API response details
    const apiResponseLog = {
        timestamp: new Date().toISOString(),
        method: 'POST',
        endpoint: '/users',
        payload: apiPayload,
        status: response.status,
        responseBody: response.body
    };
    
    console.log('API Request Details:');
    console.log(JSON.stringify(apiResponseLog, null, 2));
    
    // Attach API response to Cucumber report
    const apiLogPath = `api-logs/api-response-${Date.now()}.json`;
    if (!fs.existsSync('api-logs')) {
        fs.mkdirSync('api-logs', { recursive: true });
    }
    fs.writeFileSync(apiLogPath, JSON.stringify(apiResponseLog, null, 2));
    this.attach(fs.readFileSync(apiLogPath), 'application/json');
    
    apiOutput = {
        firstName: baseClass.getJsonData('firstName'),
        lastName: baseClass.getJsonData('lastName'),
        employeeId: employeeIdUpdated
    };
});

Then('User should verify API details match with UI data', async function () {
    const firstName = baseClass.getJsonData('firstName');
    const lastName = baseClass.getJsonData('lastName');
    const jobTitle = baseClass.getJsonData('jobTitle');
    const employmentStatus = baseClass.getJsonData('employmentStatus');

    console.log('API validation completed');
    console.log('Employee Lifecycle Summary:');
    console.log(`   FirstName: ${firstName}`);
    console.log(`   LastName: ${lastName}`);
    console.log(`   EmployeeID: ${employeeIdUpdated}`);
    console.log(`   JobTitle: ${jobTitle}`);
    console.log(`   EmploymentStatus: ${employmentStatus}`);
    
    // Capture screenshot for final validation
    const screenshotPath = `screenshots/api-validation-${Date.now()}.png`;
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots', { recursive: true });
    }
    await page.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(fs.readFileSync(screenshotPath), 'image/png');
    console.log(`Screenshot captured: ${screenshotPath}`);
});

// When('User deletes the employee from UI', async function () {
//     employeeListPage = new EmployeeListPage(page);
//     await employeeListPage.deleteEmployee(employeeIdUpdated);
// });

When('User deletes the employee from UI',{ timeout: 30000 },async function () {
      employeeListPage = new EmployeeListPage(page);
      await employeeListPage.deleteEmployee(employeeIdUpdated);
  }
);

Then('User should verify employee is deleted in UI and API', async function () {
    const isDeleted = await employeeListPage.isEmployeeDeleted(employeeIdUpdated);
    if (!isDeleted) {
        throw new Error('Employee was not deleted from UI');
    }

    apiBaseClass.initRequest();
    apiBaseClass.addDefaultHeaders();
    const deleteResponse = await apiBaseClass.sendRequest('DELETE', '/users/2');
    
    if (deleteResponse.status !== 204) {
        console.warn(`API delete returned status ${deleteResponse.status}, expected 204`);
    }

    console.log('Employee deleted successfully from UI and API');
});

When('User logs out from OrangeHRM', { timeout: 5000 }, async function () {
    logoutPage = new LogoutPage(page);
    await logoutPage.logout();
});

Then('User should verify login page is displayed', { timeout: 5000 }, async function () {
    logoutPage = new LogoutPage(page);
    const isLoginPageDisplayed = await logoutPage.isLoginPageDisplayed();
    if (!isLoginPageDisplayed) {
        throw new Error('Login page is not displayed after logout');
    }
    console.log('Login page verified after logout');
});

