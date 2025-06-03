import addContext from 'mochawesome/addContext';

// Take a screenshot after every test
afterEach(function () {
  cy.screenshot(this.currentTest.title, { capture: 'runner' });
});

// Attach screenshot to Mochawesome report for every test
Cypress.on('test:after:run', (test, runnable) => {
  const screenshotFileName = `${test.title}.png`;
  const specFileName = Cypress.spec.name;
  const relativePath = `screenshots/${specFileName}/${screenshotFileName}`;
  addContext({ test }, relativePath);

  // If the test failed, also attach the error message
  if (test.state === 'failed' && test.err && test.err.message) {
    addContext({ test }, `Error: ${test.err.message}`);
  }
});

// Log uncaught exceptions and failed commands for easier debugging
Cypress.on('uncaught:exception', (err, runnable) => {
  // This will show up in the Cypress terminal output and in the report logs
  // Add Context here to attach it to the report
  addContext({ test: runnable }, `Uncaught Exception: ${err.message}`);
  // Returning false here prevents Cypress from failing the test on known errors
  return false;
});

Cypress.on('fail', (error, runnable) => {
  // This will show up in the Cypress terminal output
  // Also add Context here to attach it to the report
  addContext({ test: runnable }, `Cypress Command Failed: ${error.message}`);
  throw error; // Let the test fail as usual
});