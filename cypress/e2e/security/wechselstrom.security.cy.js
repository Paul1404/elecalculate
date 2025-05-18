// cypress/e2e/security/wechselstrom.security.cy.js
import { testXss } from '../../support/security';

describe('Security | Wechselstrom.html', () => {
  const url = '/Elektrotechnik/Wechselstrom.html';

  it('should be protected against XSS attacks', () => {
    cy.visit(url);

    // Test Sinus
    cy.contains('.img-button span', 'Sinus').click();
    testXss(
      ['#up-Sinus', '#upp-Sinus'],
      {
        clickSelector: 'input[onclick="calculate_Sinus()"]',
        resultSelectors: ['#result_Sinus']
      }
    );

    // Test Dreieck
    cy.contains('.img-button span', 'Dreieck').click();
    testXss(
      ['#up-Dreieck', '#upp-Dreieck'],
      {
        clickSelector: 'input[onclick="calculate_Dreieck()"]',
        resultSelectors: ['#result_Dreieck']
      }
    );

    // Test PWM
    cy.contains('.img-button span', 'PWM').click();
    testXss(
      ['#up-PWM', '#g-PWM'],
      {
        clickSelector: 'input[onclick="calculate_PWM()"]',
        resultSelectors: ['#result_PWM']
      }
    );

    // skipping Rechteck since it was skipped in the original test due to JS errors
  });
});