describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';
  let inputs;

  before(() => {
    cy.fixture('kreisberechnungInputs').then((data) => {
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

  it('should not execute or render XSS payloads in inputs', () => {
    cy.visit(url);

    inputs.xssPayloads.forEach(payload => {
      cy.get('#radius').clear().type(payload, { delay: 0 });
      cy.get('#area').clear().type(payload, { delay: 0 });

      // The value should be empty or invalid (input type="number" will reject non-numeric)
      cy.get('#radius').should('not.have.value', payload);
      cy.get('#area').should('not.have.value', payload);
    });

    Cypress.on('window:alert', (msg) => {
      throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});