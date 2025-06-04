// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Pattern to find test files, including subdirectories
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    // Path to support file with custom commands and global behavior
    supportFile: 'cypress/support/e2e.js',

    // Base URL for the application under test
    baseUrl: 'http://localhost:8080',

    // Use cypress-mochawesome-reporter for advanced context/logging
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/results',  // Directory to save individual JSON reports
      overwrite: false,              // Don't overwrite previous reports
      html: false,                   // Don't generate HTML for individual specs
      json: true                     // Generate JSON for each spec file
    },

    // Take screenshots when tests fail
    screenshotOnRunFailure: true,

    // Don't record videos to save space and speed up tests
    video: false,

    // Set viewport size for consistent test environment
    viewportWidth: 1280,
    viewportHeight: 720,

    // Register the cypress-mochawesome-reporter plugin
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  },
});