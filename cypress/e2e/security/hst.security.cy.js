// cypress/e2e/security/hst.security.cy.js
import { testXss } from '../../support/security';

describe('Security | HST Glossar', () => {
  const url = '/HST/hst.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test the search field for XSS vulnerabilities
    testXss(
      ['#search'],
      {
        resultSelectors: ['table']
      }
    );

    // Additional check for the table content
    cy.fixture('securityPayloads').then(fixtures => {
      const payloads = fixtures.xssPayloads;

      // Check the glossary table for payloads
      cy.get('table').invoke('html').should((html) => {
        payloads.forEach(payload => {
          expect(html).not.to.include(payload);
        });
      });
    });
  });
});