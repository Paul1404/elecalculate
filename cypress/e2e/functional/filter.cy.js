// cypress/e2e/functional/filter.cy.js
describe('Elektrotechnik | Filter.html', () => {
  const url = '/Elektrotechnik/Filter.html';
  let inputs;

  before(() => {
    cy.fixture('filterInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Blindwiderstand XC for Hochpass RC', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Hochpass RC').click();
    cy.get('#f-HP_RC').clear().type(inputs.hochpassRC.f);
    cy.get('#C-HP_RC').clear().type(inputs.hochpassRC.C);
    cy.get('input[onclick="calculate_HP_RC()"]').click();
    cy.get('#result_HP_RC').invoke('text').should('include', inputs.expected.hochpassRC_XC);
  });

  it('should calculate Blindwiderstand XL for Hochpass RL', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Hochpass RL').click();
    cy.get('#f-HP_RL').clear().type(inputs.hochpassRL.f);
    cy.get('#L-HP_RL').clear().type(inputs.hochpassRL.L);
    cy.get('input[onclick="calculate_HP_RL()"]').click();
    cy.get('#result_HP_RL').invoke('text').should('include', inputs.expected.hochpassRL_XL);
  });

  it('should calculate Blindwiderstand XC for Tiefpass RC', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Tiefpass RC').click();
    cy.get('#f-TP_RC').clear().type(inputs.tiefpassRC.f);
    cy.get('#C-TP_RC').clear().type(inputs.tiefpassRC.C);
    cy.get('input[onclick="calculate_TP_RC()"]').click();
    cy.get('#result_TP_RC').invoke('text').should('include', inputs.expected.tiefpassRC_XC);
  });

  it('should calculate Blindwiderstand XL for Tiefpass RL', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Tiefpass RL').click();
    cy.get('#f-TP_RL').clear().type(inputs.tiefpassRL.f);
    cy.get('#L-TP_RL').clear().type(inputs.tiefpassRL.L);
    cy.get('input[onclick="calculate_TP_RL()"]').click();
    cy.get('#result_TP_RL').invoke('text').should('include', inputs.expected.tiefpassRL_XL);
  });

  it('should calculate Grenzfrequenz for Hochpass RC', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Hochpass RC').click();
    cy.get('#R-HP_RC').clear().type(inputs.hochpassRC.R);
    cy.get('#C-HP_RC').clear().type(inputs.hochpassRC.C);
    cy.get('input[onclick="calculate_HP_RC()"]').click();
    cy.get('#result_HP_RC').invoke('text').should('include', inputs.expected.hochpassRC_fg);
  });

  it('should calculate Grenzfrequenz for Tiefpass RC', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Tiefpass RC').click();
    cy.get('#R-TP_RC').clear().type(inputs.tiefpassRC.R);
    cy.get('#C-TP_RC').clear().type(inputs.tiefpassRC.C);
    cy.get('input[onclick="calculate_TP_RC()"]').click();
    cy.get('#result_TP_RC').invoke('text').should('include', inputs.expected.tiefpassRC_fg);
  });
});