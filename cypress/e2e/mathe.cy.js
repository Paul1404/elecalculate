describe('Mathe.html Kreisberechnung', () => {
  const url = '/Allgemein/Mathe.html';

  it('should calculate area from radius', () => {
    cy.visit(url);

    cy.get('#radius').clear().type('2');
    cy.get('#radiusUnit').select('0.01'); // cm
    cy.get('#areaUnit').select('0.0001'); // cm²

    cy.get('#area').should('have.value', '12.57');
  });

  it('should calculate radius from area', () => {
    cy.visit(url);

    cy.get('#area').clear().type('12.57');
    cy.get('#areaUnit').select('0.0001'); // cm²
    cy.get('#radiusUnit').select('0.01'); // cm

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

  it('should not execute or render XSS payloads in inputs', () => {
    cy.visit(url);

    // Try to inject XSS payloads
    const payloads = [
      '<img src=x onerror=alert(1)>',
      '<svg/onload=alert(1)>',
      '<script>alert(1)</script>'
    ];

    payloads.forEach(payload => {
      cy.get('#radius').clear().type(payload, { delay: 0 });
      cy.get('#area').clear().type(payload, { delay: 0 });

      // The value should be empty or invalid (input type="number" will reject non-numeric)
      cy.get('#radius').should('not.have.value', payload);
      cy.get('#area').should('not.have.value', payload);
    });

    // No alert should be triggered (fail the test if it is)
    Cypress.on('window:alert', (msg) => {
      throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});
