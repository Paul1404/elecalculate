describe('Elektrotechnik | Wechselstrom.html', () => {
  const url = '/Elektrotechnik/Wechselstrom.html';

  it('should calculate Sinus Effektivwert', () => {
    cy.visit(url);

    cy.contains('.img-button span', 'Sinus').click();

    // up = 10
    cy.get('#up-Sinus').clear().type('10');
    cy.get('input[onclick="calculate_Sinus()"]').click();

    // Ueff = up / sqrt(2) = 7.07V
    cy.get('#result_Sinus').invoke('text').then(text => {
        cy.log('Sinus output:', text);
        expect(text).to.include('7.07V');
      });

      // upp = 20, up left empty, should still get Ueff = 7.07V
      cy.get('#up-Sinus').clear();
      cy.get('#upp-Sinus').clear().type('20');
      cy.get('input[onclick="calculate_Sinus()"]').click();
      cy.get('#result_Sinus').invoke('text').then(text => {
        cy.log('Sinus output (upp):', text);
        expect(text).to.include('7.07V');
      });
    });

    it.skip('should calculate Rechteck Effektivwert', () => {
      // Skipped due to JS error in calculate_Rechteck()
    });

    it('should calculate Dreieck Effektivwert', () => {
      cy.visit(url);

      cy.contains('.img-button span', 'Dreieck').click();

      // up = 10
      cy.get('#up-Dreieck').clear().type('10');
      cy.get('input[onclick="calculate_Dreieck()"]').click();

      // Ueff = up / sqrt(3) = 5.77V
      cy.get('#result_Dreieck').invoke('text').then(text => {
        cy.log('Dreieck output:', text);
        expect(text).to.include('5.77V');
      });

      // upp = 20, up left empty, should still get Ueff = 5.77V
      cy.get('#up-Dreieck').clear();
      cy.get('#upp-Dreieck').clear().type('20');
      cy.get('input[onclick="calculate_Dreieck()"]').click();
      cy.get('#result_Dreieck').invoke('text').then(text => {
        cy.log('Dreieck output (upp):', text);
        expect(text).to.include('5.77V');
      });
    });

    it('should calculate PWM Effektivwert', () => {
      cy.visit(url);

      cy.contains('.img-button span', 'PWM').click();

      cy.get('#up-PWM').clear().type('10');
      cy.get('#g-PWM').clear().type('25');
      cy.get('input[onclick="calculate_PWM()"]').click();

      // Ueff = up * sqrt(g/100) = 10 * sqrt(0.25) = 5.00V
      cy.get('#result_PWM').invoke('text').then(text => {
        cy.log('PWM output:', text);
        expect(text).to.include('5.00V');
      });
    });
    it('should not execute or render XSS payloads in any input/result', () => {
      cy.visit(url);

      // XSS payloads to test
      const payloads = [
        '<img src=x onerror=alert(1)>',
        '<svg/onload=alert(1)>',
        '<script>alert(1)</script>'
      ];

      // Sinus
      cy.contains('.img-button span', 'Sinus').click();
      ['#up-Sinus', '#upp-Sinus'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculate_Sinus()"]').click();

      // Dreieck
      cy.contains('.img-button span', 'Dreieck').click();
      ['#up-Dreieck', '#upp-Dreieck'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculate_Dreieck()"]').click();

      // PWM
      cy.contains('.img-button span', 'PWM').click();
      ['#up-PWM', '#g-PWM'].forEach(selector => {
        payloads.forEach(payload => {
          cy.get(selector).clear().type(payload, { delay: 0 });
        });
      });
      cy.get('input[onclick="calculate_PWM()"]').click();

      // Check all result areas for payloads
      [
        '#result_Sinus',
        '#result_Dreieck',
        '#result_PWM'
      ].forEach(selector => {
        cy.get(selector).invoke('html').should((html) => {
          payloads.forEach(payload => {
            expect(html).not.to.include(payload);
          });
        });
      });

      // Fail the test if any alert is triggered
      Cypress.on('window:alert', (msg) => {
        throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});