describe('Elektrotechnik | Schwingkreis.html', () => {
  const url = '/Elektrotechnik/Schwingkreis.html';
  let inputs;

  before(() => {
    cy.fixture('schwingkreisInputs').then((data) => {
      inputs = data;
    });
  });

  it('should calculate Blindwiderstand XL for Serienschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Serie Schwingkreis').click();
    cy.get('#f-serie').clear().type(inputs.serie.XL.f);
    cy.get('#L-serie').clear().type(inputs.serie.XL.L);
    cy.get('input[onclick="calculateSerie()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Serienschwingkreis XL output:', text);
      expect(text).to.include(inputs.serie.XL.expected);
    });
  });

  it('should calculate Blindwiderstand XC for Serienschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Serie Schwingkreis').click();
    cy.get('#f-serie').clear().type(inputs.serie.XC.f);
    cy.get('#C-serie').clear().type(inputs.serie.XC.C);
    cy.get('input[onclick="calculateSerie()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Serienschwingkreis XC output:', text);
      expect(text).to.include(inputs.serie.XC.expected);
    });
  });

  it('should calculate Resonanzfrequenz for Serienschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Serie Schwingkreis').click();
    cy.get('#L-serie').clear().type(inputs.serie.resonanz.L);
    cy.get('#C-serie').clear().type(inputs.serie.resonanz.C);
    cy.get('input[onclick="calculateSerie()"]').click();
    cy.get('#result').invoke('text').then(text => {
      cy.log('Serienschwingkreis Resonanzfrequenz output:', text);
      const found = inputs.serie.resonanz.expected.some(val => text.includes(val));
      expect(found).to.be.true;
    });
  });

  it('should calculate Blindwiderstand XL for Parallelschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Parallel Schwingkreis').click();
    cy.get('#f-parallel').clear().type(inputs.parallel.XL.f);
    cy.get('#L-parallel').clear().type(inputs.parallel.XL.L);
    cy.get('input[onclick="calculateParallel()"]').click();
    cy.get('#result_parallel').invoke('text').then(text => {
      cy.log('Parallelschwingkreis XL output:', text);
      expect(text).to.include(inputs.parallel.XL.expected);
    });
  });

  it('should calculate Blindwiderstand XC for Parallelschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Parallel Schwingkreis').click();
    cy.get('#f-parallel').clear().type(inputs.parallel.XC.f);
    cy.get('#C-parallel').clear().type(inputs.parallel.XC.C);
    cy.get('input[onclick="calculateParallel()"]').click();
    cy.get('#result_parallel').invoke('text').then(text => {
      cy.log('Parallelschwingkreis XC output:', text);
      expect(text).to.include(inputs.parallel.XC.expected);
    });
  });

  it('should calculate Resonanzfrequenz for Parallelschwingkreis', () => {
    cy.visit(url);
    cy.contains('.filter-button span', 'Parallel Schwingkreis').click();
    cy.get('#L-parallel').clear().type(inputs.parallel.resonanz.L);
    cy.get('#C-parallel').clear().type(inputs.parallel.resonanz.C);
    cy.get('input[onclick="calculateParallel()"]').click();
    cy.get('#result_parallel').invoke('text').then(text => {
      cy.log('Parallelschwingkreis Resonanzfrequenz output:', text);
      const found = inputs.parallel.resonanz.expected.some(val => text.includes(val));
      expect(found).to.be.true;
    });
  });
});