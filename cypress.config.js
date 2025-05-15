const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
    baseUrl: 'http://localhost:80', // <-- match the server port!
  },
});
