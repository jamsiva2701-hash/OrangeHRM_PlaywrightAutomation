# Playwright OrangeHRM Test Automation Framework

A comprehensive **Playwright + Cucumber.js** BDD (Behavior-Driven Development) test automation framework for OrangeHRM employee lifecycle management testing.

## 📋 Overview

This framework automates end-to-end testing of the OrangeHRM application, covering the complete employee lifecycle:
- User login
- Employee creation with profile picture upload
- Job details management
- Employee data validation via API
- Employee deletion
- User logout

## ✨ Key Features

### Automation Framework
- **Playwright**: Modern web automation framework for cross-browser testing
- **Cucumber.js**: BDD framework for readable, maintainable test scenarios
- **Page Object Model (POM)**: Scalable test design pattern
- **7-digit Random Employee ID**: Unique identifier generation for each test run

### Test Capabilities
✓ Login with credentials
✓ Profile picture upload
✓ Employee search and verification
✓ Job title and employment status updates
✓ API validation using ReqRes
✓ Employee deletion
✓ Logout verification

### Reporting & Artifacts
✓ HTML reports with embedded screenshots
✓ API response logging (JSON)
✓ Screenshot capture at validation points
✓ Test execution videos
✓ Console logging
✓ Multiple Cucumber HTML Reporter integration

## 📁 Project Structure

```
Playwright-OrangeHRM-MAIN/
├── .github/
│   └── workflows/               # GitHub CI/CD workflows
│       ├── cucumber-reports.yml
│       └── playwright.yml
├── API/
│   └── ApiBaseClass.js          # REST API client
├── POM/
│   ├── LoginPage.js             # Login page object
│   ├── AddEmployeePage.js       # Add employee page object
│   ├── EditEmployeePage.js      # Edit employee page object
│   ├── EmployeeListPage.js      # Employee list page object
│   └── LogoutPage.js            # Logout page object
├── base/
│   └── BaseClass.js             # Base utilities and helpers
├── Hooks/
│   └── Hooks.js                 # Cucumber hooks (before/after)
├── StepDefination/
│   └── EmployeeLifecycleStep.js # Step definitions for scenarios
├── Features/
│   └── EmployeeLifecycleManagement.feature # BDD scenarios
├── testdata/
│   └── EmployeeData.json        # Test data
├── Files/
│   └── profile.png              # Profile picture for upload
├── Reports/                      # Generated HTML reports
├── api-logs/                     # API response logs (git-ignored)
├── screenshots/                  # Test screenshots (git-ignored)
├── test-videos/                  # Test videos (git-ignored)
├── package.json                  # Dependencies
├── cucumber.json                 # Cucumber configuration
└── generate-report.js            # Report generation script
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/greenstech-omr/Playwright-OrangeHRM.git
cd Framework4PMClass
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

### Configuration

Update test data in `testdata/EmployeeData.json`:
```json
{
  "username": "Admin",
  "password": "admin123",
  "firstName": "Jamuna",
  "lastName": "M",
  "jobTitle": "Account Assistant",
  "employmentStatus": "Full-Time Permanent"
}
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific profile
```bash
npm run test:employee
```

### Generate reports
```bash
npm run generate:reports
```

## 📊 Test Results

### Test Execution Summary
- **Total Steps**: 14
- **Pass Rate**: 100%
- **Execution Time**: ~47 seconds
- **Employees Created**: Dynamic with 7-digit IDs

### Sample Output
```
OrangeHRM Employee Lifecycle Test Execution
==================================================

✓ User launches OrangeHRM application
✓ User logs in with valid credentials
✓ User should verify dashboard is displayed
✓ User adds a new employee from test data
✓ User should verify employee is added successfully
✓ User searches the employee by employee id
✓ User updates job title and employment status
✓ User should verify employee details are updated successfully
✓ User validates the employee details using API
✓ User should verify API details match with UI data
✓ User deletes the employee from UI
✓ User should verify employee is deleted in UI and API
✓ User logs out from OrangeHRM
✓ User should verify login page is displayed

14 steps (14 passed)
0m47.051s (executing steps: 0m47.016s)
```

## 📈 Test Artifacts

### Generated Artifacts per Test Run

1. **API Response Logs**
   - Location: `api-logs/api-response-*.json`
   - Contains: Request/response details, payload, status codes

2. **Screenshots**
   - `screenshots/employee-added-*.png` - Employee creation verification
   - `screenshots/job-details-update-*.png` - Job update verification
   - `screenshots/api-validation-*.png` - API validation verification

3. **Test Videos**
   - Location: `test-videos/`
   - Format: WebM video recording of entire test execution

4. **HTML Reports**
   - `Reports/index.html` - Main report dashboard
   - `Reports/cucumber-report.html` - Detailed report with attachments

## 🔧 Framework Components

### Page Object Models
Each page object encapsulates interactions with a specific page:

```javascript
// Example: AddEmployeePage.js
- uploadProfilePicture()
- addEmployee()
- isEmployeeAdded()
```

### Step Definitions
Human-readable step implementations:

```gherkin
When('User adds a new employee from test data with profile picture', async function () {
  // Implementation
})
```

### Hooks
Before/After test setup and cleanup:

```javascript
Before({ timeout: 60000 }, async function () {
  // Browser and context setup
  // Video recording setup
})
```

### API Testing
RESTful API validation using fetch API:

```javascript
// Example: Validate employee data
apiBaseClass.initRequest()
apiBaseClass.addPayload(employeeData)
const response = await apiBaseClass.sendRequest('POST', '/users')
```

## 📝 Test Scenario

### Feature: Employee Lifecycle Management

```gherkin
Scenario: Verify complete employee lifecycle using UI and API
  Given User launches OrangeHRM application
  When User logs in with valid credentials from test data
  Then User should verify dashboard is displayed
  
  When User adds a new employee from test data with profile picture
  Then User should verify employee is added successfully
  
  When User searches the employee by employee id from test data
  And User updates job title and employment status from test data
  Then User should verify employee details are updated successfully
  
  When User validates the employee details using API
  Then User should verify API details match with UI data
  
  When User deletes the employee from UI
  Then User should verify employee is deleted in UI and API
  
  When User logs out from OrangeHRM
  Then User should verify login page is displayed
```

## 🐛 Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Increase timeout in step definitions
   - Check network connectivity

2. **Element Not Found**
   - Verify selectors in Page Objects
   - Check application UI changes

3. **API Request Failures**
   - Verify API endpoint availability
   - Check request payload format

4. **Report Generation Issues**
   - Clear `Reports/` and `cucumber-results/` directories
   - Reinstall `multiple-cucumber-html-reporter`

## 📚 Dependencies

```json
{
  "@cucumber/cucumber": "^12.3.0",
  "@playwright/test": "^1.56.1",
  "multiple-cucumber-html-reporter": "^3.10.0"
}
```

## 🔐 Security

- Credentials stored in JSON (for demo only, use environment variables in production)
- No sensitive data in logs
- Git-ignored directories for artifacts

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- OrangeHRM for the test application
- Playwright for automation capabilities
- Cucumber for BDD framework
- ReqRes for mock API endpoints

---

**Last Updated**: June 14, 2026
**Version**: 1.0.0
**Status**: Production Ready ✓
