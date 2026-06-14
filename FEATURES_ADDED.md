# Features Added: API Response Logging & Screenshots

## Overview
The test framework now includes API response logging and screenshot capture capabilities for comprehensive test documentation and debugging.

## Features Implemented

### 1. **API Response Logging**
- **File**: `api-logs/api-response-*.json`
- **Content**: Captures detailed API request/response information including:
  - Timestamp of the API call
  - HTTP Method (POST, DELETE, etc.)
  - API endpoint
  - Request payload with employee details
  - Response status code
  - Response body
- **Storage**: JSON format in `api-logs/` directory
- **Attachment**: Automatically attached to Cucumber reports

### 2. **Screenshot Capture**
Screenshots are captured at three critical validation points:

#### a. Employee Added Verification
- **File**: `screenshots/employee-added-*.png`
- **Trigger**: After employee is successfully added
- **Purpose**: Visual verification of employee creation

#### b. Job Details Update Verification
- **File**: `screenshots/job-details-update-*.png`
- **Trigger**: After job title and employment status are updated
- **Purpose**: Visual confirmation of job details modification

#### c. API Validation Verification
- **File**: `screenshots/api-validation-*.png`
- **Trigger**: After API validation step completes
- **Purpose**: Final state verification before deletion

### 3. **Report Integration**
- Screenshots are embedded as PNG images in the HTML report
- API responses are embedded as JSON in the HTML report
- All attachments appear in the Cucumber HTML report under respective steps
- Attachment types:
  - `image/png` for screenshots
  - `application/json` for API responses

## Directory Structure
```
/api-logs/          - API response JSON files (git-ignored)
/screenshots/       - Screenshot PNG files (git-ignored)
/test-videos/       - Test execution videos (git-ignored)
/Reports/           - Final HTML reports with attachments
```

## Test Execution Summary
- **Framework**: Playwright + Cucumber.js
- **Test Scenario**: Complete employee lifecycle management
- **Artifacts Generated**:
  - HTML reports with embedded screenshots
  - API response logs for debugging
  - Test execution videos
  - Console logs

## Step-by-Step Flow
1. **Launch Application** → Dashboard screenshot
2. **Add Employee** → Employee verified with screenshot
3. **Update Job Details** → Changes captured in screenshot
4. **Validate via API** → API response logged + screenshot
5. **Delete Employee** → Deletion verified
6. **Logout** → Session terminated

## Usage
```bash
npm test
# OR
npm run test:employee
```

Reports are generated automatically to:
- `Reports/index.html` - Main HTML report
- `Reports/cucumber-report.html` - Detailed report with attachments

## Debugging
- Check `api-logs/` for API request/response details
- Review `screenshots/` for visual test execution
- Watch `test-videos/` for recorded execution flow
