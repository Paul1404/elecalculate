describe('Elektronik | OPV.html', () => {
  const url = '/Elektronik/OPV.html';

  it('should calculate gain for invertierender Verstärker', () => {
    cy.visit(url);
    cy.contains('button span', 'invertierender Verstärker').click();

    cy.get('#R1-1').clear().type('10k');
    cy.get('#R2-1').clear().type('100k');
    // Leave V empty to trigger gain calculation

    cy.get('#invertierender_Verstaerker input.Button_Berechnen').click();

    cy.get('#result_invertierender_Verstaerker').should('contain', '-10.000');
  });

  it('should calculate output voltage for nicht-invertierender Verstärker', () => {
    cy.visit(url);
    cy.contains('button span', 'nicht-invertierender Verstärker').click();

    cy.get('#R1-2').clear().type('10k');
    cy.get('#R2-2').clear().type('100k');
    cy.get('#Uin-2').clear().type('2');
    // Leave Uout and V empty to trigger Uout calculation

    cy.get('#nicht_invertierender_Verstaerker input.Button_Berechnen').click();

    cy.get('#result_nicht_invertierender_Verstaerker').should('contain', '22.000');
  });
});