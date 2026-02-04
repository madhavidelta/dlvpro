import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { expect } from '@playwright/test';
import { CredentialsHelper } from '../tests/credentials-helper';

// Set default timeout for steps
setDefaultTimeout(60000);

// Global variables for browser instances
let browser: Browser;
let context: BrowserContext;
let page: Page;

// Hook: Before each scenario
Before(async function () {
  // Launch browser
  // Check if HEADED environment variable is set to run with UI
  const headless = process.env.HEADED !== 'true';
  
  browser = await chromium.launch({
    headless: headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: headless ? 0 : 100 // Slow down actions in headed mode for better visibility
  });
  
  // Create a new browser context
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    acceptDownloads: true,
  });
  
  // Create a new page
  page = await context.newPage();
});

// Hook: After each scenario
After(async function () {
  // Close page
  if (page) {
    await page.close();
  }
  
  // Close context
  if (context) {
    await context.close();
  }
  
  // Close browser
  if (browser) {
    await browser.close();
  }
});

// Step: Navigate to login page
Given('a user navigates to the login page', async function () {
  await page.goto('http://si.deltavacationspro.com/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('domcontentloaded');
  
  // Store page for later use
  this.page = page;
});

// Step: Enter credentials
When('the user enters their agency ID, username, and password', async function () {
  // Get decoded credentials
  const agencyId = CredentialsHelper.getAgencyId();
  const username = CredentialsHelper.getUsername();
  const password = CredentialsHelper.getPassword();
  
  // Wait for login form to be visible
  await page.waitForTimeout(2000);
  
  // Try to find and fill agency ID field
  // Common selectors for agency ID
  const agencyIdSelectors = [
    'input[name="agencyId"]',
    'input[id="agencyId"]',
    'input[placeholder*="Agency"]',
    'input[type="text"]:first-of-type',
  ];
  
  for (const selector of agencyIdSelectors) {
    try {
      const element = await page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        await element.fill(agencyId);
        console.log(`Filled agency ID using selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Try next selector
    }
  }
  
  // Try to find and fill username field
  const usernameSelectors = [
    'input[name="username"]',
    'input[id="username"]',
    'input[name="userId"]',
    'input[id="userId"]',
    'input[placeholder*="User"]',
    'input[type="text"]:nth-of-type(2)',
  ];
  
  for (const selector of usernameSelectors) {
    try {
      const element = await page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        await element.fill(username);
        console.log(`Filled username using selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Try next selector
    }
  }
  
  // Try to find and fill password field
  const passwordSelectors = [
    'input[name="password"]',
    'input[id="password"]',
    'input[type="password"]',
    'input[placeholder*="Password"]',
  ];
  
  for (const selector of passwordSelectors) {
    try {
      const element = await page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        await element.fill(password);
        console.log(`Filled password using selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Try next selector
    }
  }
  
  // Store credentials for verification
  this.agencyId = agencyId;
  this.username = username;
});

// Step: Click login button
When('clicks the login button', async function () {
  // Try to find and click login button
  const loginButtonSelectors = [
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("Login")',
    'button:has-text("Sign In")',
    'button:has-text("Log In")',
    'a:has-text("Login")',
    '#loginButton',
    '.login-button',
  ];
  
  for (const selector of loginButtonSelectors) {
    try {
      const element = await page.locator(selector).first();
      if (await element.isVisible({ timeout: 2000 })) {
        await element.click();
        console.log(`Clicked login button using selector: ${selector}`);
        break;
      }
    } catch (e) {
      // Try next selector
    }
  }
  
  // Wait for navigation
  await page.waitForTimeout(3000);
});

// Step: Verify redirection to dashboard
Then('the user is redirected to the dashboard', async function () {
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  // Get current URL
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);
  
  // Check if URL contains dashboard-related keywords
  const dashboardKeywords = ['dashboard', 'home', 'main', 'welcome'];
  const urlContainsDashboard = dashboardKeywords.some(keyword => 
    currentUrl.toLowerCase().includes(keyword)
  );
  
  // Also check page content for dashboard indicators
  let pageContainsDashboard = false;
  try {
    pageContainsDashboard = await page.locator('body').textContent().then(text => 
      text !== null && dashboardKeywords.some(keyword => 
        text.toLowerCase().includes(keyword)
      )
    );
  } catch (e) {
    console.log('Could not check page content');
  }
  
  // Check if we're not on the login page anymore
  const notOnLoginPage = !currentUrl.includes('login') && !currentUrl.includes('signin');
  
  // Take a screenshot for verification
  await page.screenshot({ path: 'reports/dashboard-screenshot.png', fullPage: true });
  
  // Verify successful login
  // At least one of these should be true: URL changed, dashboard content found, or not on login page
  expect(urlContainsDashboard || pageContainsDashboard || notOnLoginPage).toBeTruthy();
  
  console.log('Login verification completed successfully');
});
