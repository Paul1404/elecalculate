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
});