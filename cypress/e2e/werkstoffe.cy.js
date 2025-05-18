describe('Allgemein | Werkstoffe.html', () => {
  const url = '/Allgemein/Werkstoffe.html';
  let inputs;

  before(() => {
    cy.fixture('werkstoffeInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Spezifischer Widerstand with correct value', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    cy.get('#l').clear().type(inputs.spezifischerWiderstand.l);
    cy.get('#R').clear().type(inputs.spezifischerWiderstand.R);
    cy.get('#A').clear().type(inputs.spezifischerWiderstand.A);
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();

    cy.get('#result_Leiter').invoke('text').then(text => {
      cy.log('Spezifischer Widerstand output:', text);
      expect(text).to.include(inputs.spezifischerWiderstand.expected);
    });
  });

  it('should calculate Temperaturabhängigkeit Widerstände with correct value', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    cy.get('#R20').clear().type(inputs.temperaturabhaengigkeit.R20);
    cy.get('#alpha').clear().type(inputs.temperaturabhaengigkeit.alpha);
    cy.get('#T').clear().type(inputs.temperaturabhaengigkeit.T);
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();

    cy.get('#result_Temp').invoke('text').then(text => {
      cy.log('Temperaturabhängigkeit Widerstände output:', text);
      expect(text).to.include(inputs.temperaturabhaengigkeit.expected);
    });
  });

  it('should calculate Stromdichte with correct value', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Stromdichte').click();
    cy.get('#I_J').clear().type(inputs.stromdichte.I_J);
    cy.get('#J').clear().type(inputs.stromdichte.J);
    cy.get('input[onclick="calculateStromdichte()"]').click();

    cy.get('#result_Stromd').invoke('text').then(text => {
      cy.log('Stromdichte output:', text);
      expect(text).to.include(inputs.stromdichte.expected1);
      expect(text).to.include(inputs.stromdichte.expected2);
    });
  });

  it('should not execute or render XSS payloads in any input/result', () => {
    cy.visit(url);

    // 1. Spezifischer Widerstand
    cy.contains('.dropdown-header', 'Spezifischer Widerstand').click();
    ['#l', '#R', '#A'].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateLeitfaehigkeit()"]').click();

    // 2. Temperaturabhängigkeit Widerstände (now includes Tw, Tk, Rw)
    cy.contains('.dropdown-header', 'Temperaturabhängigkeit Widerstände').click();
    ['#R20', '#alpha', '#T', '#Rw', '#Tw', '#Tk'].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateTemperaturwiderstand()"]').click();

    // 3. Stromdichte (includes d for new formula)
    cy.contains('.dropdown-header', 'Stromdichte').click();
    ['#I_J', '#J', '#d'].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
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
        inputs.xssPayloads.forEach(payload => {
          expect(html).not.to.include(payload);
        });
      });
    });

    Cypress.on('window:alert', (msg) => {
      throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});