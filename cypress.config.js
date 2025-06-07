// cypress.config.js

const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

/**
 * Cypress Configuration File
 * -------------------------
 * This file configures Cypress for E2E testing, including:
 *   - Spec file patterns
 *   - Support file path
 *   - Base URL
 *   - Video recording and compression
 *   - Mochawesome reporter setup
 *   - Viewport size
 *   - Custom tasks for logging and fixture pretty-printing
 *   - Plugin registration
 */

module.exports = defineConfig({
  e2e: {
    // Pattern to find test files, including subdirectories
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    // Path to support file with custom commands and global behavior
    supportFile: 'cypress/support/e2e.js',

    // Base URL for the application under test
    baseUrl: 'http://localhost:8080',

    // Enable video recording and compression for test runs
    video: true,
    videoCompression: true,

    // Use cypress-mochawesome-reporter for advanced context/logging
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/results',  // Directory to save individual JSON reports
      charts: true,
      saveAllAttempts: false,
      overwrite: false,              // Don't overwrite previous reports
      html: false,                   // Don't generate HTML for individual specs
      json: true                     // Generate JSON for each spec file
    },

    // Set viewport size for consistent test environment
    viewportWidth: 1280,
    viewportHeight: 720,

    /**
     * Register plugins and custom tasks for Cypress.
     * - Adds 'log' task for terminal logging.
     * - Adds 'readFixturePretty' task for pretty-printing fixture JSON files.
     * - Registers the cypress-mochawesome-reporter plugin.
     */
    setupNodeEvents(on, config) {
      // Task for logging to the terminal (for debugging)
      on('task', {
        log(message) {
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

      // Register the cypress-mochawesome-reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    }
  },
});