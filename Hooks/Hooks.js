import { Before, After, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

let browser;

BeforeAll(async function () {
    console.log("\n==================================================");
    console.log("OrangeHRM Employee Lifecycle Test Execution");
    console.log("==================================================\n");
});

Before({ timeout: 60000 }, async function () {
    console.log("Starting test scenario...\n");
    browser = await chromium.launch({ headless: false });
    // const context = await browser.newContext({
    //     recordVideo: { dir: './test-videos/' }
    // });
    const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
        dir: './test-videos/',
        size: { width: 1920, height: 1080 }
    }
});
    const page = await context.newPage();
    this.page = page;
    this.context = context;
    this.browser = browser;
});

After(async function () {
    console.log("\nTest scenario completed\n");
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
    if (browser) {
        await browser.close();
    }
});

AfterAll(async function () {
    console.log("\n==================================================");
    console.log("Test Execution Completed");
    console.log("Check Reports folder for HTML report");
    console.log("==================================================\n");
});
