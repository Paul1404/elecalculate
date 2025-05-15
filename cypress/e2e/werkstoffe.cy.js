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
      expect(text).to.include('1000.00Mm/(Ω ∗ mm');
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
      expect(text).to.include('108.00Ω');
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
      expect(text).to.include('112.84μm');
      expect(text).to.include('10000.00 μm');
    });
  });
});
