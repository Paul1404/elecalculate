// cypress/plugins/index.js

/**
 * Cypress plugins file.
 * - No need to add custom tasks for context logging when using cypress-mochawesome-reporter.
 * - You can still add other tasks (like 'log') for debugging or custom needs.
 */
module.exports = (on, config) => {
  // Task for logging to the terminal (for debugging)
  on('task', {
    log(message) {
      console.log(message);
      return null;
    }
  });
};