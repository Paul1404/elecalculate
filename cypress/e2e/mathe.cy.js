describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';

  it('should calculate area from radius', () => {
    cy.visit(url);

    // Enter radius 2 (cm)
    cy.get('#radius').clear().type('2');
    cy.get('#radiusUnit').select('0.01'); // cm
    cy.get('#areaUnit').select('0.0001'); // cm²

    // Area = pi * r^2 = pi * 2^2 = 12.57 (cm²)
    cy.get('#area').should('have.value', '12.57');
  });

  it('should calculate radius from area', () => {
    cy.visit(url);

    // Enter area 12.57 (cm²)
    cy.get('#area').clear().type('12.57');
    cy.get('#areaUnit').select('0.0001'); // cm²
    cy.get('#radiusUnit').select('0.01'); // cm

    // Radius = sqrt(area/pi) = sqrt(12.57/pi) = 2.00 (cm)
    cy.get('#radius').should('have.value', '2.00');
  });

  it('should reset all fields', () => {
    cy.visit(url);

    cy.get('#radius').type('2');
    cy.get('#area').type('12.57');
    cy.get('button').contains('Zurücksetzen').click();

    cy.get('#radius').should('have.value', '');
    cy.get('#area').should('have.value', '');
    cy.get('#radiusUnit').find(':selected').should('have.value', '0.01');
    cy.get('#areaUnit').find(':selected').should('have.value', '0.0001');
  });
});
