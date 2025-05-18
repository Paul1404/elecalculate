// cypress/e2e/security/verstaerkung_daempfung.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Verstaerkung_Daempfung.html', () => {
  const url = '/Elektrotechnik/Verstaerkung_Daempfung.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test all input fields for XSS vulnerabilities
    testXss(
      ['#I1', '#I2', '#g', '#U1', '#P1'],
      {
        clickSelector: 'input[onclick="calculateParameters()"]',
        resultSelectors: ['#result']
      }
    );
  });
});