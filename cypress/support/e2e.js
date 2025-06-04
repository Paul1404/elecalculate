// cypress/support/e2e.js

import 'cypress-mochawesome-reporter/register';

/**
 * Universal afterEach hook for Cypress E2E tests.
 * - Takes a screenshot after every test (named after the test title)
 * - Collects all input values and result fields from the page
 * - Formats the log for readability and attaches it to the Mochawesome report
 * - Includes the test title and page URL for full context
 * - Uses cy.then() to ensure cy.addContext runs with the correct test context
 */
afterEach(function () {
  const testContext = this; // Capture the correct test context

  // Always take a screenshot after each test for visual reporting
  cy.screenshot(testContext.currentTest.title, { capture: 'runner' });

  // Collect and log all relevant input and result data for the test
  cy.document().then((doc) => {
    // Get the current test title and page URL for context
    const testTitle = testContext.currentTest.title;
    const pageUrl = doc.location.pathname;

    // Gather all text and number input values on the page
    const inputs = Array.from(doc.querySelectorAll('input[type="text"], input[type="number"]'))
      .map(input => `  - ${input.id || input.name}: ${input.value}`)
      .join('\n');

    // Gather all result fields (elements with IDs starting with 'result_')
    const results = Array.from(doc.querySelectorAll('[id^="result_"]'))
      .map(result => `  - ${result.id}: ${result.innerText}`)
      .join('\n');

    // Build a readable, Markdown-formatted log for the report
    let logText = `#### Test: ${testTitle}\n#### Page: ${pageUrl}\n`;
    if (inputs) {
      logText += `**Inputs:**\n${inputs}\n`;
    }
    if (results) {
      logText += `**Results:**\n${results}`;
    }

    // Only log if there is something to log
    if (logText.trim()) {
      cy.log(logText); // Log to Cypress output
      // Use cy.then to ensure cy.addContext runs after Cypress commands and with the correct test context
      cy.then(() => {
        cy.addContext(logText); // Provided by cypress-mochawesome-reporter
      });
    }
  });
});