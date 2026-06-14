import { generate } from 'multiple-cucumber-html-reporter';

generate({
  jsonDir: './cucumber-results/',
  reportPath: './Reports/',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest',
    },
    device: 'Local test machine',
    platform: {
      name: 'macOS',
      version: 'Sonoma',
    },
  },
  customData: {
    title: 'OrangeHRM Employee Lifecycle Test Report',
    data: [
      { label: 'Project', value: 'OrangeHRM Automation' },
      { label: 'Framework', value: 'Playwright + Cucumber' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Environment', value: 'Development' },
    ],
  },
});

console.log('✅ HTML Report generated successfully at Reports/index.html');
