# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

This guide will help you get the BDD Playwright automation project up and running quickly.

## Prerequisites

- Node.js v16 or higher installed
- npm (comes with Node.js)

## Installation Steps

### 1. Clone and Setup
```bash
# Navigate to project directory
cd dlvpro

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### 2. Verify Installation
```bash
# Check TypeScript compilation
npm run verify:typescript

# Verify credentials encoding/decoding
npm run verify:credentials
```

Expected output for credentials verification:
```
=== Testing Credentials Helper ===

Decoded Credentials:
Agency ID: 24test07
Username: 169253
Password: Wadtest02

=== Verification ===
Credentials match: ✓ PASS
```

### 3. Run Tests
```bash
# Run tests in headless mode (default)
npm test

# Run tests with visible browser
npm run test:headed

# Run tests with debugging enabled
npm run test:debug

# Generate HTML report
npm run test:report
```

## Project Structure Overview

```
dlvpro/
├── features/              # Gherkin feature files
│   └── login.feature     # Login scenarios
├── steps/                # Step definitions
│   └── login.steps.ts    # Login automation
├── tests/                # Helper utilities
│   ├── credentials-helper.ts
│   └── test-credentials.ts
├── reports/              # Test reports (auto-generated)
├── playwright.config.ts  # Playwright settings
├── cucumber.js           # Cucumber settings
└── package.json          # Dependencies & scripts
```

## Understanding the Login Test

The login test automates the following steps:

1. **Navigate** to http://si.deltavacationspro.com/
2. **Enter** Agency ID (decoded from Base64 at runtime)
3. **Enter** Username (decoded from Base64 at runtime)
4. **Enter** Password (decoded from Base64 at runtime)
5. **Click** the login button
6. **Verify** successful redirection to dashboard

## Credentials Management

Credentials are stored as Base64-encoded values in `tests/credentials-helper.ts`:

- **Agency ID**: `MjR0ZXN0MDc=` → decodes to `24test07`
- **Username**: `MTY5MjUz` → decodes to `169253`
- **Password**: `V2FkdGVzdDAy` → decodes to `Wadtest02`

### Update Credentials

1. Open `tests/credentials-helper.ts`
2. Update the encoded constants:
```typescript
private static readonly ENCODED_AGENCY_ID = 'your_encoded_value';
private static readonly ENCODED_USERNAME = 'your_encoded_value';
private static readonly ENCODED_PASSWORD = 'your_encoded_value';
```

3. To encode new values, use the helper method:
```typescript
const encoded = CredentialsHelper.encode('newValue');
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm test` | Run all tests |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Run with Playwright Inspector |
| `npm run verify:credentials` | Verify credential encoding |
| `npm run verify:typescript` | Check TypeScript compilation |
| `npx playwright install` | Install browser binaries |

## Test Reports

After running tests, find reports in:
- `reports/cucumber-report.html` - Cucumber report
- `reports/cucumber-report.json` - JSON report
- `reports/dashboard-screenshot.png` - Login result screenshot

## Troubleshooting

### Issue: Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Browser not installed
```bash
# Install all browsers
npx playwright install
```

### Issue: TypeScript errors
```bash
# Check for compilation errors
npm run verify:typescript
```

## Next Steps

1. ✅ Verify setup is complete
2. ✅ Run the existing login test
3. 📝 Add more test scenarios in `features/`
4. 🔧 Implement step definitions in `steps/`
5. 🧪 Run tests regularly

## Support

- See `README.md` for detailed documentation
- See `VERIFICATION.md` for setup verification results
- Check feature files for test scenarios
- Review step definitions for implementation details

## Tips

- Use `test:headed` mode when developing new tests
- Enable `test:debug` to inspect element selectors
- Keep credentials encoded for security
- Write clear Gherkin scenarios
- Use descriptive step definitions

---

**Ready to automate! 🎉**

Run `npm test` to see your first automated login test in action!
