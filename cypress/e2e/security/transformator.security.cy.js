// cypress/e2e/security/transformator.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Transformator.html', () => {
  const url = '/Elektrotechnik/Transformator.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test all input fields for XSS vulnerabilities
    testXss(
      ['#I1', '#I2', '#U1', '#U2', '#ue', '#P1', '#P2', '#eta', '#N1', '#N2'],
      {
        clickSelector: 'input[onclick="calculateParameters()"]',
        resultSelectors: ['#result']
      }
    );
  });
});