// cypress/plugins/index.js

/**
 * Cypress Plugins File
 * --------------------
 * This file is used to load plugins and define custom tasks for Cypress.
 *
 * Key Features:
 *   - Adds a 'log' task for logging messages to the terminal (useful for debugging).
 *   - Adds a 'readFixturePretty' task to synchronously read and pretty-print
 *     a fixture JSON file from the cypress/fixtures directory.
 *     This is used for adding fixture context to Mochawesome reports.
 *
 * Usage:
 *   - The 'log' task can be called from your tests or support files with:
 *       cy.task('log', 'Your message here');
 *   - The 'readFixturePretty' task can be called with:
 *       cy.task('readFixturePretty', 'fixtureFileNameWithoutDotJson')
 *     and will return a pretty-printed JSON string or an error message.
 */

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  // Task for logging to the terminal (for debugging)
  on('task', {
    log(message) {
      // Print the message to the terminal
      console.log(message);
      return null;
    },

    /**
     * Reads and pretty-prints a fixture JSON file from cypress/fixtures.
     * @param {string} fixtureFileName - The fixture file name (without .json extension)
     * @returns {string} - Pretty-printed JSON or an error message
     */
    readFixturePretty(fixtureFileName) {
      const fixturePath = path.join(
        config.projectRoot,
        'cypress',
        'fixtures',
        `${fixtureFileName}.json`
      );
      try {
        const data = fs.readFileSync(fixturePath, 'utf8');
        // Validate and pretty-print
        return JSON.stringify(JSON.parse(data), null, 2);
      } catch (err) {
        return `Could not read fixture: ${err.message}`;
      }
    }
  });
};