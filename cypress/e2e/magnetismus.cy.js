describe('Elektrotechnik | Magnetismus.html', () => {
  const url = '/Elektrotechnik/Magnetismus.html';
  let inputs;

  before(() => {
    cy.fixture('magnetismusInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Strom I from Theta and N', () => {
    cy.visit(url);
    cy.get('#Theta').clear().type(inputs.strom.Theta);
    cy.get('#N').clear().type(inputs.strom.N);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Strom I output:', text);
      expect(text).to.include(inputs.strom.expected);
    });
  });

  it('should calculate Kraft F from B and A', () => {
    cy.visit(url);
    cy.get('#B').clear().type(inputs.kraft.B);
    cy.get('#A').clear().type(inputs.kraft.A);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Kraft F output:', text);
      expect(text).to.include(inputs.kraft.expected);
    });
  });

  it('should calculate Durchflutung Theta from H and l', () => {
    cy.visit(url);
    cy.get('#H').clear().type(inputs.durchflutung.H);
    cy.get('#l').clear().type(inputs.durchflutung.l);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Durchflutung Theta output:', text);
      expect(text).to.include(inputs.durchflutung.expected);
    });
  });

  it('should calculate Windungszahl N from Theta and I', () => {
    cy.visit(url);
    cy.get('#Theta').clear().type(inputs.windungszahl.Theta);
    cy.get('#I').clear().type(inputs.windungszahl.I);
    cy.get('input[onclick="calculateParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Windungszahl N output:', text);
      expect(text).to.include(inputs.windungszahl.expected);
    });
  });

  it('should not execute or render XSS payloads in any input/result', () => {
    cy.visit(url);

    [
      '#Theta', '#N', '#B', '#A', '#H', '#l', '#I'
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