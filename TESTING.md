# Elecalculate Testing

This document explains the testing setup for the Elecalculate project, including functional and security (XSS) tests.

---

## Dependencies

- **cypress**: End-to-end testing framework
- **mochawesome**: Reporter that generates JSON test results
- **mochawesome-merge**: Tool to merge multiple Mochawesome JSON files
- **mochawesome-report-generator**: Generates HTML reports from Mochawesome JSON
- **start-server-and-test**: Utility to start server before tests and stop after

Install all dependencies with:

```bash
npm install
```

---

## Test Organization

Tests are organized into two main categories:

- **Functional Tests**:
  Located in `cypress/e2e/functional/`
  These tests verify that calculations, UI features, and workflows function as intended.

- **Security Tests**:
  Located in `cypress/e2e/security/`
  These tests verify that the application is protected against security vulnerabilities, especially XSS.

- **Fixtures**:
  Test data and payloads are stored in `cypress/fixtures/` (e.g., `securityPayloads.json`).

- **Test Utilities**:
  Reusable helpers (e.g., for XSS testing) are in `cypress/support/`.

---

## Available Scripts

| Script                  | Description                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| `npm run serve`         | Start a local Python HTTP server on port 80                                  |
| `npm run cy:clean`      | Remove all previous test results and screenshots                             |
| `npm run cy:run`        | Start server, run all Cypress tests (functional & security), then stop server|
| `npm run cy:run:functional` | Run only functional tests with Mochawesome reporter                   |
| `npm run cy:run:security`  | Run only security tests (e.g., XSS) with Mochawesome reporter          |
| `npm run cy:open`       | Start server and open Cypress interactive UI (Chromium)                      |
| `npm run cy:merge`      | Merge all individual Mochawesome JSON reports into one                       |
| `npm run cy:report`     | Generate an HTML report from the merged JSON                                 |
| `npm test`              | Full workflow: clean, run all tests, merge, and generate HTML report         |
| `npm run test:functional` | Full workflow for functional tests only                                  |
| `npm run test:security` | Full workflow for security tests only                                        |

**Tip:**
- All reports are saved in `cypress/reports/html`.
- You can run scripts individually or as a full workflow.

---

## Cypress Configuration

The Cypress configuration (`cypress.config.js`) is set up to:

- Find test files matching `cypress/e2e/**/*.cy.{js,ts}`
- Use the support file at `cypress/support/e2e.js` for custom commands and global error handling
- Set the base URL to `http://localhost:80`
- Use Mochawesome reporter to generate JSON results
- Save individual JSON reports to `cypress/results`
- Take screenshots on test failure
- Disable video recording (to save space and speed up tests)
- Set a consistent viewport size (1280x720)

---

## Running Tests

**All tests (functional + security):**
```bash
npm test
```

**Only functional tests:**
```bash
npm run test:functional
```

**Only security tests:**
```bash
npm run test:security
```

**Interactive mode (Cypress UI):**
```bash
npm run cy:open
```

---

## Test Workflow

The complete test workflow (triggered by `npm test` or similar):

1. Clean previous results (`cy:clean`)
2. Start the server and run Cypress tests with Mochawesome reporter
3. Generate individual JSON files for each spec
4. Merge all JSON files into a single report (`cy:merge`)
5. Generate a comprehensive HTML report in `cypress/reports/html` (`cy:report`)

---

## Handling JavaScript Errors

The Cypress support file (`cypress/support/e2e.js`) contains exception handling for known issues (e.g., slideshow errors), preventing these from failing tests while still catching unexpected errors.

---

## Security Testing

Security tests focus on ensuring the application is protected against common vulnerabilities:

- **XSS (Cross-Site Scripting):**
  Tests inject malicious payloads into inputs and verify that they are properly sanitized and not executed.
- **Input Validation:**
  Tests ensure that all user inputs are validated and sanitized.

**Reusable XSS Utility:**
- Located in `cypress/support/security.js`
- Loads payloads from `cypress/fixtures/securityPayloads.json`
- For each input:
  1. Injects malicious payloads
  2. Triggers calculation or form submission
  3. Verifies that payloads are not reflected in the output
  4. Ensures no JavaScript execution occurs (e.g., no alerts)

---

## Continuous Integration (CI)

- The provided scripts and reporting are CI-ready.
- You can integrate them into GitHub Actions, GitLab CI, or other CI/CD systems.
- Reports can be archived or published as build artifacts.

---

## Contributing

- Add new functional tests to `cypress/e2e/functional/`
- Add new security tests to `cypress/e2e/security/`
- Add new payloads to `cypress/fixtures/securityPayloads.json` as needed
- For advanced test utilities, use or extend `cypress/support/`

---

## Troubleshooting

- If you encounter issues with the server or ports, ensure no other process is using port 80.
- For Windows users, you may need to adjust the `serve` script or run as administrator.