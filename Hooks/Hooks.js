import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status
} from "@cucumber/cucumber";

import { chromium } from "@playwright/test";

// Global timeout for all scenarios and hooks
setDefaultTimeout(120 * 1000);

let browser;

BeforeAll(async function () {
  console.log("\n==================================================");
  console.log("OrangeHRM Employee Lifecycle Test Execution");
  console.log("==================================================\n");
});

Before({ timeout: 120000 }, async function () {
  console.log("Starting test scenario...\n");

  browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: "./test-videos/",
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  this.browser = browser;
  this.context = context;
  this.page = page;
});

After({ timeout: 120000 }, async function (scenario) {
  try {
    // Capture screenshot only on failure
    if (scenario.result?.status === Status.FAILED) {
      const screenshot = await this.page.screenshot({
        path: `screenshots/failed-${Date.now()}.png`,
        fullPage: true
      });

      if (this.attach) {
        await this.attach(screenshot, "image/png");
      }
    }

    console.log("\nTest scenario completed\n");

    if (this.page) {
      await this.page.close();
    }

    if (this.context) {
      await this.context.close(); // Important for video save
    }

    if (this.browser) {
      await this.browser.close();
    }
  } catch (error) {
    console.error("Error in After Hook:", error);
  }
});

AfterAll(async function () {
  console.log("\n==================================================");
  console.log("Test Execution Completed");
  console.log("Check Reports folder for HTML report");
  console.log("==================================================\n");
});