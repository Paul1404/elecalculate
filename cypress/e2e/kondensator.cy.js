describe('Elektrotechnik | Kondensator.html', () => {
  const url = '/Elektrotechnik/Kondensator.html';
  let inputs;

  before(() => {
    cy.fixture('kondensatorInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Kapazität C from Q and U', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#Q').clear().type(inputs.kapazitaet.Q);
    cy.get('#U').clear().type(inputs.kapazitaet.U);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Kondensator Kapazität output:', text);
      expect(text).to.include(inputs.kapazitaet.expected);
    });
  });

  it('should calculate Spannung U from E and s', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#E').clear().type(inputs.spannung.E);
    cy.get('#s').clear().type(inputs.spannung.s);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Kondensator Spannung output:', text);
      expect(text).to.include(inputs.spannung.expected);
    });
  });

  it('should calculate Energie W from C and U', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    cy.get('#C').clear().type(inputs.energie.C);
    cy.get('#U').clear().type(inputs.energie.U);
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Kondensator Energie output:', text);
      expect(text).to.include(inputs.energie.expected);
    });
  });

  it('should calculate Zeitkonstante tau for RC-Glied', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'RC-Glied').click();
    cy.get('#R_RC').clear().type(inputs.zeitkonstante.R_RC);
    cy.get('#C_RC').clear().type(inputs.zeitkonstante.C_RC);
    cy.get('input[onclick="calculateRC()"]').click();
    cy.get('#result_RC').invoke('text').then(text => {
      cy.log('RC-Glied Zeitkonstante output:', text);
      expect(text).to.include(inputs.zeitkonstante.expected);
    });
  });

  it('should not execute or render XSS payloads in any input/result', () => {
    cy.visit(url);

    // 1. Kondensator berechnungen
    cy.contains('.dropdown-header', 'Kondensator berechnungen').click();
    ['#Q', '#U', '#C', '#E', '#s'].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateCapacitorParameters()"]').click();

    // 2. RC-Glied
    cy.contains('.dropdown-header', 'RC-Glied').click();
    ['#R_RC', '#C_RC'].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });
    cy.get('input[onclick="calculateRC()"]').click();

    // Check all result areas for payloads
    ['#result', '#result_RC'].forEach(selector => {
      cy.get(selector).invoke('html').should((html) => {
        inputs.xssPayloads.forEach(payload => {
          expect(html).not.to.include(payload);
        });
      });
    });

    // Fail the test if any alert is triggered
    Cypress.on('window:alert', (msg) => {
      throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});