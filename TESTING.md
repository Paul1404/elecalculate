# Elecalculate Testing

This document explains the testing setup for the Elecalculate project.

## Dependencies

- **cypress**: End-to-end testing framework
- **mochawesome**: Reporter that generates JSON test results
- **mochawesome-merge**: Tool to merge multiple Mochawesome JSON files
- **mochawesome-report-generator**: Generates HTML reports from Mochawesome JSON
- **start-server-and-test**: Utility to start server before tests and stop after

## Test Organization

Tests are organized into two categories:

- **Functional Tests**: Located in `cypress/e2e/functional/` - these tests verify that calculations and features work correctly
- **Security Tests**: Located in `cypress/e2e/security/` - these tests verify that the application is protected against security vulnerabilities like XSS

## Scripts

| Script | Description |
|--------|-------------|
| `serve` | Start a Python HTTP server on port 80 to serve the application files |
| `cy:clean` | Remove all previous test results to ensure clean reporting |
| `cy:run` | Start the server, run all Cypress tests with Mochawesome reporter, then stop server |
| `cy:run:functional` | Run only functional tests with Mochawesome reporter |
| `cy:run:security` | Run only security tests with Mochawesome reporter |
| `cy:open` | Start the server, open Cypress interactive UI with Chromium browser |
| `cy:merge` | Combine all individual JSON result files into a single merged JSON report |
| `cy:report` | Generate a HTML report from the merged JSON file |
| `test` | Complete test workflow: clean old results, run all tests, merge reports, generate HTML |
| `test:functional` | Run only functional tests with complete reporting workflow |
| `test:security` | Run only security tests with complete reporting workflow |

## Cypress Configuration

The Cypress configuration in `cypress.config.js` is set up to:

- Find test files matching the pattern `cypress/e2e/**/*.cy.{js,ts}`
- Use the support file at `cypress/support/e2e.js` for custom commands and behaviors
- Set the base URL to `http://localhost:80`
- Use Mochawesome reporter to generate JSON results
- Save individual JSON reports to `cypress/results`
- Take screenshots when tests fail
- Disable video recording to save space and speed up tests
- Set a consistent viewport size of 1280x720

## Test Utilities

The project includes reusable test utilities:

- **Security Testing**: Located in `cypress/support/security.js` - provides functions for testing security vulnerabilities
- **Fixtures**: Test data is stored in `cypress/fixtures/` including security test payloads in `securityPayloads.json`

## Running Tests

To run all tests:
```bash
npm run test
```

To run only functional tests:
```bash
npm run test:functional
```

To run only security tests:
```bash
npm run test:security
```

## Test Workflow

The complete test workflow:

1. Clean previous results
2. Run Cypress tests with Mochawesome reporter
3. Generate individual JSON files for each spec
4. Merge all JSON files into a single report
5. Generate a beautiful HTML report in `cypress/reports/html`

## Handling JavaScript Errors

The support file contains exception handling for known issues with the slideshow functionality, preventing these errors from failing tests while still catching other unexpected errors.

## Security Testing

Security tests focus on ensuring the application is protected against common vulnerabilities:

- **XSS (Cross-Site Scripting)**: Tests verify that malicious input is properly sanitized and not executed
- **Input Validation**: Tests verify that inputs are properly validated and sanitized

Security tests use a reusable utility function that:
1. Attempts to inject malicious payloads into inputs
2. Verifies that these payloads are not reflected in the output
3. Ensures no JavaScript execution occurs from the payloads