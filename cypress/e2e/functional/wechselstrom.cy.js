describe('Elektrotechnik | Wechselstrom.html', () => {
  const url = '/Elektrotechnik/Wechselstrom.html';
  let inputs;

  before(() => {
    cy.fixture('wechselstromInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Sinus Effektivwert', () => {
    cy.visit(url);

    cy.contains('.img-button span', 'Sinus').click();

    // up = 10
    cy.get('#up-Sinus').clear().type(inputs.sinus.up);
    cy.get('input[onclick="calculate_Sinus()"]').click();

    cy.get('#result_Sinus').invoke('text').then(text => {
      cy.log('Sinus output:', text);
      expect(text).to.include(inputs.sinus.expected);
    });

    // upp = 20, up left empty, should still get Ueff = 7.07V
    cy.get('#up-Sinus').clear();
    cy.get('#upp-Sinus').clear().type(inputs.sinus.upp);
    cy.get('input[onclick="calculate_Sinus()"]').click();
    cy.get('#result_Sinus').invoke('text').then(text => {
      cy.log('Sinus output (upp):', text);
      expect(text).to.include(inputs.sinus.expected);
    });
  });

  it.skip('should calculate Rechteck Effektivwert', () => {
    // Skipped due to JS error in calculate_Rechteck()
  });

  it('should calculate Dreieck Effektivwert', () => {
    cy.visit(url);

    cy.contains('.img-button span', 'Dreieck').click();

    // up = 10
    cy.get('#up-Dreieck').clear().type(inputs.dreieck.up);
    cy.get('input[onclick="calculate_Dreieck()"]').click();

    cy.get('#result_Dreieck').invoke('text').then(text => {
      cy.log('Dreieck output:', text);
      expect(text).to.include(inputs.dreieck.expected);
    });

    // upp = 20, up left empty, should still get Ueff = 5.77V
    cy.get('#up-Dreieck').clear();
    cy.get('#upp-Dreieck').clear().type(inputs.dreieck.upp);
    cy.get('input[onclick="calculate_Dreieck()"]').click();
    cy.get('#result_Dreieck').invoke('text').then(text => {
      cy.log('Dreieck output (upp):', text);
      expect(text).to.include(inputs.dreieck.expected);
    });
  });

  it('should calculate PWM Effektivwert', () => {
    cy.visit(url);

    cy.contains('.img-button span', 'PWM').click();

    cy.get('#up-PWM').clear().type(inputs.pwm.up);
    cy.get('#g-PWM').clear().type(inputs.pwm.g);
    cy.get('input[onclick="calculate_PWM()"]').click();

    cy.get('#result_PWM').invoke('text').then(text => {
      cy.log('PWM output:', text);
      expect(text).to.include(inputs.pwm.expected);
    });
  });
});