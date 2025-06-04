/**
 * Cypress plugins file for Mochawesome context logging.
 * - Adds a 'log' task for debugging
 * - Adds context from the test (set in support file) to the Mochawesome report
 */
const addContext = require('mochawesome/addContext');

module.exports = (on, config) => {
  // Task for logging to the terminal (optional, for debugging)
  on('task', {
    log(message) {
      console.log(message);
      return null;
    }
  });

  // Add context to Mochawesome report after each test
  on('test:after:run', (test, runnable) => {
    if (test.ctx && test.ctx._mochawesomeContext) {
      addContext({ test }, test.ctx._mochawesomeContext);
    }
    // Optionally, add more context (e.g., screenshots) here
  });
};