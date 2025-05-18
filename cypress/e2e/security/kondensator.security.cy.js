// cypress/e2e/security/kondensator.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Kondensator.html', () => {
  const url = '/Elektrotechnik/Kondensator.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // 1. Kondensator berechnungen
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    testXss(
      ['#Q', '#U', '#C', '#E', '#s'],
      {
        clickSelector: 'input[onclick="calculateCapacitorParameters()"]',
        resultSelectors: ['#result']
      }
    );

    // 2. RC-Glied
    cy.contains('.dropdown-header', 'RC-Glied').click();
    testXss(
      ['#R_RC', '#C_RC'],
      {
        clickSelector: 'input[onclick="calculateRC()"]',
        resultSelectors: ['#result_RC']
      }
    );
  });
});