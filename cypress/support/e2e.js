// cypress/support/e2e.js

// Register cypress-mochawesome-reporter to enable cy.addTestContext()
import 'cypress-mochawesome-reporter/register';

/**
 * Universal afterEach hook for Cypress E2E tests.
 * - Takes a screenshot after every test (named after the test title)
 * - Loads fixture based on test file name + 'Inputs.json'
 * - Collects input/output values based on fixture data
 * - Logs everything in plain text format
 */
afterEach(function () {
  const testContext = this;

  // Always take a screenshot after each test for visual reporting
  cy.screenshot(testContext.currentTest.title, { capture: 'runner' });

  // Get the test file name (without .cy.js extension)
  const testFileName = testContext.currentTest.file
    .split('/')
    .pop()
    .replace('.cy.js', '');

  const fixtureFileName = `${testFileName}Inputs`;

  // Load the corresponding fixture file
  cy.fixture(fixtureFileName).then((testData) => {
    cy.document().then((doc) => {
      const testTitle = testContext.currentTest.title;
      const pageUrl = doc.location.pathname;

      // Find matching test data in the fixture
      const relevantTestData = findTestDataForCurrentTest(testData, testTitle);

      if (relevantTestData) {
        const { inputs, expected } = relevantTestData;

        // Collect actual input values
        const actualInputs = Object.keys(inputs).map(key => {
          const element = doc.getElementById(key) || doc.querySelector(`[name="${key}"]`);
          const value = element ? element.value : '[not found]';
          return `${key}: ${value}`;
        });

        // Collect actual result values
        const actualResults = Object.keys(expected).map(key => {
          const element = doc.getElementById(`result_${key}`) ||
                         doc.getElementById(key) ||
                         doc.querySelector(`[data-result="${key}"]`);
          const value = element ? element.innerText : '[not found]';
          return `${key}: ${value}`;
        });

        // Build plain text log
        let logText = `Test: ${testTitle}\n`;
        logText += `Page: ${pageUrl}\n`;
        logText += `Fixture: ${fixtureFileName}.json\n\n`;

        if (actualInputs.length > 0) {
          logText += `Inputs:\n${actualInputs.map(line => `  ${line}`).join('\n')}\n\n`;
        }

        if (actualResults.length > 0) {
          logText += `Results:\n${actualResults.map(line => `  ${line}`).join('\n')}\n\n`;
        }

        logText += `Expected:\n${Object.entries(expected)
          .map(([key, value]) => `  ${key}: ${value}`)
          .join('\n')}`;

        cy.log(logText);
        cy.then(() => {
          cy.addTestContext(logText);
        });
      }
    });
  }).catch(() => {
    // Fixture file doesn't exist, skip logging
    cy.log(`No fixture found: ${fixtureFileName}.json`);
  });
});

/**
 * Find test data that matches the current test
 * @param {Object} testData - The fixture data
 * @param {string} testTitle - Current test title
 * @returns {Object|null} - Matching test data or null
 */
function findTestDataForCurrentTest(testData, testTitle) {
  // Try exact match first
  if (testData[testTitle]) {
    return separateInputsAndExpected(testData[testTitle]);
  }

  // Try to find by partial match (case insensitive)
  const normalizedTitle = testTitle.toLowerCase().replace(/\s+/g, '');

  for (const [key, data] of Object.entries(testData)) {
    const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
    if (normalizedKey.includes(normalizedTitle) ||
        normalizedTitle.includes(normalizedKey)) {
      return separateInputsAndExpected(data);
    }
  }

  return null;
}

/**
 * Separate inputs from expected results
 * @param {Object} data - Test data object
 * @returns {Object} - Object with inputs and expected properties
 */
function separateInputsAndExpected(data) {
  const { expected, ...inputs } = data;
  return { inputs, expected: expected || {} };
}