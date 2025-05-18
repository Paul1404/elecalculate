// cypress/e2e/security/werkstoffe.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test Spezifischer Widerstand
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    testXss(
      ['#l', '#R', '#A'],
      {
        clickSelector: 'input[onclick="calculateLeitfaehigkeit()"]',
        resultSelectors: ['#result_Leiter']
      }
    );

    // Test Temperaturabhängigkeit Widerstände
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    testXss(
      ['#R20', '#alpha', '#T', '#Rw', '#Tw', '#Tk'],
      {
        clickSelector: 'input[onclick="calculateTemperaturwiderstand()"]',
        resultSelectors: ['#result_Temp']
      }
    );

    // Test Stromdichte
    cy.contains('.dropdown-header', 'Stromdichte').click();
    testXss(
      ['#I_J', '#J', '#d'],
      {
        clickSelector: 'input[onclick="calculateStromdichte()"]',
        resultSelectors: ['#result_Stromd']
      }
    );
  });
});