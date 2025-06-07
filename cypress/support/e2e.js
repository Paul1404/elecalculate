// cypress/support/e2e.js

/**
 * Cypress Support File
 * --------------------
 * This file sets up global behavior for all Cypress E2E tests.
 *
 * Features:
 *   - Takes a screenshot after every test for visual reporting.
 *   - Reads the relevant fixture file (named after the spec file + 'Inputs')
 *     and adds its pretty-printed contents as context to the Mochawesome report.
 *   - Handles missing or invalid fixtures gracefully (never fails the test).
 *   - Logs all actions and errors to the terminal for easy debugging.
 *
 * How it works:
 *   - The fixture file is expected to be in cypress/fixtures/
 *     and named after the spec file (e.g., "my_specInputs.json" for "my_spec.cy.js").
 *   - The fixture is loaded using a custom Cypress task (see cypress.config.js).
 *   - The fixture content is added to the Mochawesome report for every test.
 */

import 'cypress-mochawesome-reporter/register';

afterEach(function () {
  // Always take a screenshot after each test for visual reporting
  cy.screenshot(this.currentTest.title, { capture: 'runner' });

  // Get the current spec's base name (without .cy.js)
  cy.window().then((win) => {
    const testFileName = win.Cypress?.spec?.fileName;
    if (!testFileName) {
      cy.task('log', '❌ Could not get test file name from Cypress.spec');
      return;
    }
    const fixtureFileName = `${testFileName}Inputs`;

    cy.task('log', `Looking for fixture: ${fixtureFileName}`);

    // Use the custom task to read and pretty-print the fixture file from disk
    cy.task('readFixturePretty', fixtureFileName).then((fixtureText) => {
        const summary = [
            'Fixture file loaded for this spec:',
            `  ${fixtureFileName}.json`,
            '',
            '--- Fixture Data (JSON) ---',
            fixtureText,
            '--------------------------',
            '',
            'Tip: This is the full fixture as used by the test suite.',
            `To update test data, edit "${fixtureFileName}.json" in cypress/fixtures/.`
          ].join('\n');
        cy.addTestContext({
            title: `Fixture: ${fixtureFileName}.json`,
            value: summary
          });
    });
  });
});