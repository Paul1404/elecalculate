// cypress/support/utils/security.js
export const testXss = (selectors, options = {}) => {
  const {
    clickSelector = null,
    resultSelectors = []
  } = options;

  // Get XSS payloads from fixture
  cy.fixture('securityPayloads').then(fixtures => {
    const payloads = fixtures.xssPayloads;

    // Store original alert function
    cy.window().then((win) => {
      const originalAlert = win.alert;
      win.alert = () => {
        // Suppress alerts during testing
      };

      // Restore after test
      Cypress.on('test:after:run', () => {
        win.alert = originalAlert;
      });
    });

    // Test each selector with each payload
    selectors.forEach(selector => {
      cy.get(selector).should('exist');

      payloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });

        if (clickSelector) {
          cy.get(clickSelector).click();
        }
      });
    });

    // Check result areas don't contain payloads
    if (resultSelectors.length > 0) {
      resultSelectors.forEach(resultSelector => {
        cy.get(resultSelector).invoke('html').should((html) => {
          payloads.forEach(payload => {
            expect(html).not.to.include(payload);
          });
        });
      });
    }
  });
};