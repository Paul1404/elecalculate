describe('Elektronik | OPV.html (fixture-driven)', () => {
  const url = '/Elektronik/OPV.html';
  let inputs;

  before(() => {
    cy.fixture('opvInputs').then((data) => {
      inputs = data;
    });
  });

  beforeEach(() => {
    cy.visit(url);
  });

  it('should calculate gain for invertierender Verstärker', () => {
    const data = inputs.invertierenderVerstaerker;
    cy.contains('button span', 'invertierender Verstärker').click();

    cy.get('#R1-1').clear().type(data.R1);
    cy.get('#R2-1').clear().type(data.R2);
    // Leave V empty to trigger gain calculation

    cy.get('#invertierender_Verstaerker input.Button_Berechnen').click();

    cy.get('#result_invertierender_Verstaerker').should('contain', data.expectedGain);
  });

  it('should calculate output voltage for nicht-invertierender Verstärker', () => {
    const data = inputs.nichtInvertierenderVerstaerker;
    cy.contains('button span', 'nicht-invertierender Verstärker').click();

    cy.get('#R1-2').clear().type(data.R1);
    cy.get('#R2-2').clear().type(data.R2);
    cy.get('#Uin-2').clear().type(data.Uin);
    // Leave Uout and V empty to trigger Uout calculation

    cy.get('#nicht_invertierender_Verstaerker input.Button_Berechnen').click();

    cy.get('#result_nicht_invertierender_Verstaerker').should('contain', data.expectedUout);
  });

  it('should calculate output voltage for Summier Verstärker', () => {
    const data = inputs.summierVerstaerker;
    cy.contains('button span', 'Summier Verstärker').click();

    cy.get('#R11-3').clear().type(data.R11);
    cy.get('#R12-3').clear().type(data.R12);
    cy.get('#R2-3').clear().type(data.R2);
    cy.get('#Uin1-3').clear().type(data.Uin1);
    cy.get('#Uin2-3').clear().type(data.Uin2);

    cy.get('#summier_Verstaerker input.Button_Berechnen').click();

    cy.get('#result_summier_Verstaerker').should('contain', data.expectedUout);
  });
});