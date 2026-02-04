# UI Mode Guide

## Running Tests with Visible Browser (UI Mode)

This guide explains how to run your BDD Playwright tests with a visible browser window, allowing you to watch the automation in action.

## Overview

By default, tests run in **headless mode** (no visible browser), which is faster and suitable for CI/CD pipelines. However, during development, debugging, or demonstrations, you may want to see the browser in action.

## Commands

### Run Tests with UI (Visible Browser)

```bash
# Option 1: Using the UI alias
npm run test:ui

# Option 2: Using the headed alias
npm run test:headed
```

Both commands will:
- Launch a visible Chromium browser
- Execute all test scenarios
- Slow down actions by 100ms for better visibility
- Run tests sequentially (--parallel 1) for better observation

### Run Tests in Headless Mode (No UI)

```bash
# Default mode - faster, suitable for CI/CD
npm test
```

## How It Works

The UI mode is controlled by the `HEADED` environment variable:

```typescript
// In steps/login.steps.ts
const headless = process.env.HEADED !== 'true';

browser = await chromium.launch({
  headless: headless,
  slowMo: headless ? 0 : 100  // Slow down actions in UI mode
});
```

- `HEADED=true` → Browser window is visible (`headless=false`)
- `HEADED` not set or any other value → Headless mode (`headless=true`)

## Use Cases

### 1. Development & Debugging
When writing new test scenarios, use UI mode to:
- Watch the browser navigate through your application
- Verify that selectors are finding the correct elements
- Understand why a test might be failing

```bash
npm run test:ui
```

### 2. Demonstrations
Show stakeholders how the automation works:

```bash
npm run test:ui
```

The browser will open and you'll see:
1. Navigation to the login page
2. Form fields being filled
3. Login button being clicked
4. Redirection to the dashboard

### 3. Troubleshooting
If tests are failing in headless mode but you're not sure why:

```bash
# Run in UI mode to see what's happening
npm run test:ui
```

### 4. CI/CD Pipelines
Keep using headless mode for speed and resource efficiency:

```bash
npm test
```

## Comparison

| Feature | Headless Mode | UI Mode |
|---------|--------------|---------|
| **Command** | `npm test` | `npm run test:ui` |
| **Browser Visible** | ❌ No | ✅ Yes |
| **Speed** | ⚡ Faster | 🐢 Slower (slowMo: 100ms) |
| **Resource Usage** | 💡 Lower | 💻 Higher |
| **Best For** | CI/CD, Automated runs | Development, Debugging, Demos |

## Advanced Usage

### Custom Slow Motion Speed

To modify the slow motion speed, edit `steps/login.steps.ts`:

```typescript
browser = await chromium.launch({
  headless: headless,
  slowMo: headless ? 0 : 500  // Change 100 to 500 for slower actions
});
```

### Run with Different Browser

Currently configured for Chromium. To use other browsers, modify the import in `steps/login.steps.ts`:

```typescript
// For Firefox
import { firefox } from '@playwright/test';
browser = await firefox.launch({ headless: headless });

// For WebKit (Safari)
import { webkit } from '@playwright/test';
browser = await webkit.launch({ headless: headless });
```

## Screenshots

Even in headless mode, screenshots are captured:
- On test failure: Automatically captured by Playwright
- On success: `reports/dashboard-screenshot.png` (login verification)

## Tips

1. **Focus on One Test**: Use tags in Cucumber to run specific scenarios in UI mode
2. **Use Debug Mode**: For even more control, use `npm run test:debug` to open Playwright Inspector
3. **Watch Network**: Open browser DevTools (F12) during UI mode to monitor network requests
4. **Resize Window**: The viewport is set to 1920x1080 by default in `steps/login.steps.ts`

## Troubleshooting

### Issue: Browser doesn't open in UI mode

**Cause**: HEADED environment variable might not be set correctly

**Solution**: Ensure you're using the correct command:
```bash
npm run test:ui
# or
npm run test:headed
```

### Issue: Tests run too fast to observe

**Solution**: Increase the slowMo value:
```typescript
slowMo: headless ? 0 : 500  // Increase from 100 to 500
```

### Issue: Browser opens but closes immediately

**Cause**: Tests completed successfully

**Solution**: This is normal behavior. The browser closes after tests complete.

### Issue: Need to pause execution

**Solution**: Use Playwright's debug mode:
```bash
npm run test:debug
```

## Summary

- **Development/Debugging**: Use `npm run test:ui` to see the browser
- **CI/CD/Automation**: Use `npm test` for headless execution
- **Deep Debugging**: Use `npm run test:debug` for Playwright Inspector

The UI mode makes test development and debugging significantly easier by providing visual feedback on what the automation is doing!
