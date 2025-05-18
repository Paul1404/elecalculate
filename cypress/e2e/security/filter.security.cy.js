// cypress/e2e/security/filter.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Filter.html', () => {
  const url = '/Elektrotechnik/Filter.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test Hochpass RC
    cy.contains('.filter-button span', 'Hochpass RC').click();
    testXss(
      ['#f-HP_RC', '#C-HP_RC', '#R-HP_RC'],
      {
        clickSelector: 'input[onclick="calculate_HP_RC()"]',
        resultSelectors: ['#result_HP_RC']
      }
    );

    // Test Tiefpass RC
    cy.contains('.filter-button span', 'Tiefpass RC').click();
    testXss(
      ['#f-TP_RC', '#C-TP_RC', '#R-TP_RC'],
      {
        clickSelector: 'input[onclick="calculate_TP_RC()"]',
        resultSelectors: ['#result_TP_RC']
      }
    );

    // Test Hochpass RL
    cy.contains('.filter-button span', 'Hochpass RL').click();
    testXss(
      ['#f-HP_RL', '#L-HP_RL'],
      {
        clickSelector: 'input[onclick="calculate_HP_RL()"]',
        resultSelectors: ['#result_HP_RL']
      }
    );

    // Test Tiefpass RL
    cy.contains('.filter-button span', 'Tiefpass RL').click();
    testXss(
      ['#f-TP_RL', '#L-TP_RL'],
      {
        clickSelector: 'input[onclick="calculate_TP_RL()"]',
        resultSelectors: ['#result_TP_RL']
      }
    );
  });
});