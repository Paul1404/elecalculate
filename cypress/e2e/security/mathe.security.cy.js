// cypress/e2e/security/mathe.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // For numeric inputs, we need a modified approach since they reject non-numeric input
    cy.fixture('securityPayloads').then(fixtures => {
      const payloads = fixtures.xssPayloads;

      // Test each input field
      ['#radius', '#area'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });

          // The value should be empty or invalid (input type="number" will reject non-numeric)
          cy.get(selector).should('not.have.value', payload);
        });
      });

      // Test select elements
      ['#radiusUnit', '#areaUnit'].forEach(selector => {
        // Check if any option contains XSS payloads
        cy.get(`${selector} option`).each(($option) => {
          const optionText = $option.text();
          payloads.forEach(payload => {
            expect(optionText).not.to.include(payload);
          });
        });
      });

      // Check for any alerts
      Cypress.on('window:alert', (msg) => {
        throw new Error('Unexpected alert triggered: ' + msg);
      });
    });
  });
});