// cypress/e2e/security/magnetismus.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Magnetismus.html', () => {
  const url = '/Elektrotechnik/Magnetismus.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test all input fields for XSS vulnerabilities
    testXss(
      ['#Theta', '#N', '#B', '#A', '#H', '#l', '#I'],
      {
        clickSelector: 'input[onclick="calculateParameters()"]',
        resultSelectors: ['#result']
      }
    );
  });
});