// cypress/e2e/security/schwingkreis.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Schwingkreis.html', () => {
  const url = '/Elektrotechnik/Schwingkreis.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test Serienschwingkreis
    cy.contains('.filter-button span', 'Serie Schwingkreis').click();
    testXss(
      ['#f-serie', '#L-serie', '#C-serie'],
      {
        clickSelector: 'input[onclick="calculateSerie()"]',
        resultSelectors: ['#result']
      }
    );

    // Test Parallelschwingkreis
    cy.contains('.filter-button span', 'Parallel Schwingkreis').click();
    testXss(
      ['#f-parallel', '#L-parallel', '#C-parallel'],
      {
        clickSelector: 'input[onclick="calculateParallel()"]',
        resultSelectors: ['#result_parallel']
      }
    );
  });
});