// cypress/e2e/security/spule.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Spule.html', () => {
  const url = '/Elektrotechnik/Spule.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test Spulen berechnungen
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();
    testXss(
      ['#Phi', '#N', '#L', '#ur', '#A', '#l', '#I', '#t'],
      {
        clickSelector: 'input[onclick="calculateInductorParameters()"]',
        resultSelectors: ['#result']
      }
    );
  });
});