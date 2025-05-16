describe('Allgemein | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';

  it('should calculate Spezifischer Widerstand with correct value', () => {
    cy.visit(url);

    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type('1');
    cy.get('#R').clear().type('10');
    cy.get('#A').clear().type('0.0001');
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();

    cy.get('#result_Leiter').invoke('text').then(text => {
      cy.log('Spezifischer Widerstand output:', text);
      expect(text).to.include('1000.000Mm/(Ω ∗ mm');
    });
  });

  it('should calculate Temperaturabhängigkeit Widerstände with correct value', () => {
    cy.visit(url);

    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    cy.get('#R20').clear().type('100');
    cy.get('#alpha').clear().type('0.004');
    cy.get('#T').clear().type('20');
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();

    cy.get('#result_Temp').invoke('text').then(text => {
      cy.log('Temperaturabhängigkeit Widerstände output:', text);
      expect(text).to.include('108.000Ω');
    });
  });

  it('should calculate Stromdichte with correct value', () => {
    cy.visit(url);

    cy.contains('.dropdown-header', 'Stromdichte').click();
    cy.get('#I_J').clear().type('0.01');
    cy.get('#J').clear().type('1');
    cy.get('input[onclick="calculateStromdichte()"]').click();

    cy.get('#result_Stromd').invoke('text').then(text => {
      cy.log('Stromdichte output:', text);
      expect(text).to.include('112.838μm');
      expect(text).to.include('10000.00 μm2');
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

    // 1. Spezifischer Widerstand
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    ['#l', '#R', '#A'].forEach(selector => {
      payloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();

    // 2. Temperaturabhängigkeit Widerstände (now includes Tw, Tk, Rw)
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    ['#R20', '#alpha', '#T', '#Rw', '#Tw', '#Tk'].forEach(selector => {
      payloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();

    // 3. Stromdichte (includes d for new formula)
    cy.contains('.dropdown-header', 'Stromdichte').click();
    ['#I_J', '#J', '#d'].forEach(selector => {
      payloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateStromdichte()"]').click();

    // Check all result areas for payloads
    [
      '#result_Leiter',
      '#result_Temp',
      '#result_Stromd'
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
