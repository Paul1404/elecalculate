describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';
  let inputs;

  before(() => {
    cy.fixture('matheInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate area from radius', () => {
    cy.visit(url);

    cy.get('#radius').clear().type(inputs.areaFromRadius.radius);
    cy.get('#radiusUnit').select(inputs.areaFromRadius.radiusUnit); // cm
    cy.get('#areaUnit').select(inputs.areaFromRadius.areaUnit); // cm²

    cy.get('#area').should('have.value', inputs.areaFromRadius.expectedArea);
  });

  it('should calculate radius from area', () => {
    cy.visit(url);

    cy.get('#area').clear().type(inputs.radiusFromArea.area);
    cy.get('#areaUnit').select(inputs.radiusFromArea.areaUnit); // cm²
    cy.get('#radiusUnit').select(inputs.radiusFromArea.radiusUnit); // cm

    cy.get('#radius').should('have.value', inputs.radiusFromArea.expectedRadius);
  });

  it('should reset all fields', () => {
    cy.visit(url);

    cy.get('#radius').type(inputs.areaFromRadius.radius);
    cy.get('#area').type(inputs.areaFromRadius.expectedArea);
    cy.get('button').contains('Zurücksetzen').click();

    cy.get('#radius').should('have.value', '');
    cy.get('#area').should('have.value', '');
    cy.get('#radiusUnit').find(':selected').should('have.value', inputs.resetDefaults.radiusUnit);
    cy.get('#areaUnit').find(':selected').should('have.value', inputs.resetDefaults.areaUnit);
  });
});