describe('Elektrotechnik | Spule.html', () => {
  const url = '/Elektrotechnik/Spule.html';
  let inputs;

  before(() => {
    cy.fixture('spuleInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Strom I from Phi, N, and L', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();
    cy.get('#Phi').clear().type(inputs.strom.Phi);
    cy.get('#N').clear().type(inputs.strom.N);
    cy.get('#L').clear().type(inputs.strom.L);
    cy.get('input[onclick="calculateInductorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Strom I output:', text);
      expect(text).to.include(inputs.strom.expected);
    });
  });

  it('should calculate Induktivität L from ur, N, A, and l', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();
    cy.get('#ur').clear().type(inputs.induktivitaet.ur);
    cy.get('#N').clear().type(inputs.induktivitaet.N);
    cy.get('#A').clear().type(inputs.induktivitaet.A);
    cy.get('#l').clear().type(inputs.induktivitaet.l);
    cy.get('input[onclick="calculateInductorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Induktivität L output:', text);
      expect(text).to.include(inputs.induktivitaet.expected);
    });
  });

  it('should calculate Magnetischer Fluss Phi from L, I, and N', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();
    cy.get('#L').clear().type(inputs.magnetischerFluss.L);
    cy.get('#I').clear().type(inputs.magnetischerFluss.I);
    cy.get('#N').clear().type(inputs.magnetischerFluss.N);
    cy.get('input[onclick="calculateInductorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Magnetischer Fluss Phi output:', text);
      expect(text).to.include(inputs.magnetischerFluss.expected);
    });
  });

  it('should calculate Induzierte Spannung U from Phi, t, and N', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();
    cy.get('#Phi').clear().type(inputs.induzierteSpannung.Phi);
    cy.get('#t').clear().type(inputs.induzierteSpannung.t);
    cy.get('#N').clear().type(inputs.induzierteSpannung.N);
    cy.get('input[onclick="calculateInductorParameters()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Induzierte Spannung U output:', text);
      const found = inputs.induzierteSpannung.expected.some(val => text.includes(val));
      expect(found).to.be.true;
    });
  });

  it('should not execute or render XSS payloads in any input/result', () => {
    cy.visit(url);
    cy.contains('.dropdown-header', 'Spulen berechnungen').click();

    [
      '#Phi', '#N', '#L', '#ur', '#A', '#l', '#I', '#t'
    ].forEach(selector => {
      inputs.xssPayloads.forEach(payload => {
        cy.get(selector).clear().type(payload, { delay: 0 });
      });
    });

    cy.get('input[onclick="calculateInductorParameters()"]').click();

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