// cypress/e2e/security/gleichstrom.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Gleichstrom.html', () => {
  const url = '/Elektrotechnik/Gleichstrom.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // 1. Ohmsches Gesetz
    cy.contains('.dropdown-header', 'Ohmsches Gesetz').click();
    testXss(
      ['#U', '#R'],
      {
        clickSelector: 'input[onclick="calculateParametersURI()"]',
        resultSelectors: ['#result']
      }
    );

    // 2. Spannungsteiler unbelastet
    cy.contains('.dropdown-header', 'Spannungsteiler').click();
    cy.get('#modeSwitch').uncheck({ force: true });
    testXss(
      ['#R1_unb', '#R2_unb', '#Uin_unb'],
      {
        clickSelector: 'input[onclick="calculateParametersUnb_Spannungsteiler()"]',
        resultSelectors: ['#result_unb']
      }
    );

    // 3. Spannungsteiler belastet
    cy.get('#modeSwitch').check({ force: true });
    testXss(
      ['#R1_bel', '#R2_bel', '#RL_bel', '#Uin_bel'],
      {
        clickSelector: 'input[onclick="calculateParametersBel_Spannungsteiler()"]',
        resultSelectors: ['#result_bel']
      }
    );

    // 4. Serie- und Parallelschaltung
    cy.contains('.dropdown-header', 'Serie- und Parallelschaltung').click();

    // Serie
    cy.contains('.opv-button span', 'Serie').click();
    testXss(
      ['#r1', '#r2'],
      {
        clickSelector: 'input[onclick="calculate(\'serie_schaltung\')"]',
        resultSelectors: ['#result_S_P']
      }
    );

    // Parallel
    cy.contains('.opv-button span', 'Parallel').click();
    testXss(
      ['#r1', '#r2'],
      {
        clickSelector: 'input[onclick="calculate(\'parallel_schaltung\')"]',
        resultSelectors: ['#result_S_P']
      }
    );
  });
});