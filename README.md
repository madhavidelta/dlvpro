# Delta Vacations Pro - BDD Playwright Automation

A BDD (Behavior-Driven Development) test automation framework for Delta Vacations Pro using Playwright and TypeScript with Cucumber.

## Project Structure

```
dlvpro/
├── features/           # Gherkin feature files
│   └── login.feature  # Login feature scenarios
├── steps/             # Step definitions (TypeScript)
│   └── login.steps.ts # Login step implementations
├── tests/             # Helper utilities
│   └── credentials-helper.ts # Encoded credentials handler
├── reports/           # Test execution reports (generated)
├── playwright.config.ts # Playwright configuration
├── cucumber.js        # Cucumber configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## Features

- ✅ BDD framework with Cucumber and Gherkin syntax
- ✅ Playwright for browser automation
- ✅ TypeScript for type-safe code
- ✅ Secure credential encoding (Base64)
- ✅ Multi-browser support (Chromium, Firefox, WebKit)
- ✅ Comprehensive reporting (HTML, JSON)
- ✅ Parallel test execution
- ✅ Screenshots and videos on failure

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dlvpro
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

### Base URL
The base URL is configured in `playwright.config.ts`:
```typescript
baseURL: 'http://si.deltavacationspro.com/'
```

### Credentials Management

Credentials are securely encoded using Base64 and stored in `tests/credentials-helper.ts`. 

**Current Encoded Credentials:**
- Agency ID: `24test07` → `MjR0ZXN0MDc=`
- Username: `169253` → `MTY5MjUz`
- Password: `Wadtest02` → `V2FkdGVzdDAy`

**To update credentials:**

1. Open `tests/credentials-helper.ts`
2. Use the helper method to encode new values:
```typescript
// Example: Encode a new password
const encoded = CredentialsHelper.encode('newPassword');
console.log(encoded); // Output: bmV3UGFzc3dvcmQ=
```
3. Update the private constants with new encoded values

**Security Note:** Never commit raw credentials to the repository. Always use encoded values.

## Running Tests

### Verify project setup:
```bash
# Check TypeScript compilation
npm run verify:typescript

# Verify credentials encoding/decoding
npm run verify:credentials
```

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests with debugging:
```bash
npm run test:debug
```

### Run tests with HTML report:
```bash
npm run test:report
```

## Test Scenarios

### Login Feature
The login feature (`features/login.feature`) tests the following scenario:

```gherkin
Feature: Login to Delta Vacations
  Scenario: Successful login with valid credentials
    Given a user navigates to the login page
    When the user enters their agency ID, username, and password
    And clicks the login button
    Then the user is redirected to the dashboard
```

## Browser Configuration

The project is configured to run tests on three browsers:
- **Chromium** (Google Chrome)
- **Firefox**
- **WebKit** (Safari)

You can modify browser settings in `playwright.config.ts`.

## Reports

After running tests, reports are generated in:
- `reports/cucumber-report.html` - Cucumber HTML report
- `reports/cucumber-report.json` - Cucumber JSON report
- `playwright-report/` - Playwright HTML report
- `reports/dashboard-screenshot.png` - Screenshot of successful login

## Debugging

### Enable headed mode:
```bash
npm run test:headed
```

### Enable Playwright Inspector:
```bash
npm run test:debug
```

### View test results:
```bash
npx playwright show-report
```

## Troubleshooting

### Issue: Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify website availability

### Issue: Element not found
- Update selectors in `steps/login.steps.ts`
- Check if website structure has changed
- Use Playwright Inspector to identify correct selectors

### Issue: Browser installation fails
```bash
# Install browsers with dependencies
npx playwright install --with-deps chromium firefox webkit
```

## CI/CD Integration

The project is configured for CI/CD with:
- Retry on failure (2 retries in CI)
- Parallel execution (1 worker in CI)
- Screenshots and videos on failure

## Contributing

1. Create a new feature branch
2. Write Gherkin scenarios in `features/` directory
3. Implement step definitions in `steps/` directory
4. Run tests locally
5. Submit pull request

## Best Practices

1. **Keep credentials encoded**: Never commit raw credentials
2. **Write descriptive scenarios**: Use clear Gherkin syntax
3. **Use page objects**: For complex pages, consider page object pattern
4. **Handle waits properly**: Use Playwright's auto-waiting features
5. **Take screenshots**: Capture evidence of test execution
6. **Run tests regularly**: Ensure automation stays up-to-date

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)

## License

ISC

## Support

For issues or questions, please create an issue in the repository.