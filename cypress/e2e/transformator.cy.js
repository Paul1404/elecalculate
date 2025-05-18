describe('Elektrotechnik | Transformator.html', () => {
  const url = '/Elektrotechnik/Transformator.html';
  let inputs;

  before(() => {
    cy.fixture('transformatorInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Übersetzungsverhältnis (ue) from I1 and I2', () => {
    cy.visit(url);
    cy.get('#I1').clear().type(inputs.uebersetzungsverhaeltnis.I1);
    cy.get('#I2').clear().type(inputs.uebersetzungsverhaeltnis.I2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Übersetzungsverhältnis output:', text);
      expect(text).to.include(inputs.uebersetzungsverhaeltnis.expected);
    });
  });

  it('should calculate Spannung U2 from U1 and ue', () => {
    cy.visit(url);
    cy.get('#U1').clear().type(inputs.spannungU2.U1);
    cy.get('#ue').clear().type(inputs.spannungU2.ue);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Spannung U2 output:', text);
      expect(text).to.include(inputs.spannungU2.expected);
    });
  });

  it('should calculate Leistung P2 from P1 and eta', () => {
    cy.visit(url);
    cy.get('#P1').clear().type(inputs.leistungP2.P1);
    cy.get('#eta').clear().type(inputs.leistungP2.eta);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Leistung P2 output:', text);
      expect(text).to.include(inputs.leistungP2.expected);
    });
  });

  it('should calculate Windungszahl N2 from N1 and ue', () => {
    cy.visit(url);
    cy.get('#N1').clear().type(inputs.windungszahlN2.N1);
    cy.get('#ue').clear().type(inputs.windungszahlN2.ue);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Windungszahl N2 output:', text);
      expect(text).to.include(inputs.windungszahlN2.expected);
    });
  });

  it('should calculate Wirkungsgrad eta from P1 and P2', () => {
    cy.visit(url);
    cy.get('#P1').clear().type(inputs.wirkungsgradEta.P1);
    cy.get('#P2').clear().type(inputs.wirkungsgradEta.P2);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Wirkungsgrad eta output:', text);
      expect(text).to.include(inputs.wirkungsgradEta.expected);
    });
  });

  it('should not execute or render XSS payloads in any input/result', () => {
    cy.visit(url);

    [
      '#I1', '#I2', '#U1', '#U2', '#ue', '#P1', '#P2', '#eta', '#N1', '#N2'
    ].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });

    cy.get('input[onclick="calculateParameters()"]').click();

    cy.get('#result').invoke('html').should((html) => {
      inputs.xssPayloads.forEach(payload => {
        expect(html).not.to.include(payload);
      });
    });

    Cypress.on('window:alert', (msg) => {
      throw new Error('Unexpected alert triggered: ' + msg);
    });
  });
});